import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

type LineInput = { productId: string; quantity: number };

export type CheckoutInput = {
  lines: LineInput[];
  name: string;
  phone: string;
  email?: string;
  city: string;
  zone?: string;
  street?: string;
  details?: string;
  paymentMethod: string;
};

function clean(v: unknown, max = 200) {
  return String(v ?? "").trim().slice(0, max);
}

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((input: CheckoutInput) => {
    if (!Array.isArray(input?.lines) || input.lines.length === 0) throw new Error("Panier vide");
    if (input.lines.length > 50) throw new Error("Trop d'articles");
    if (!clean(input.name)) throw new Error("Nom requis");
    if (clean(input.phone).length < 6) throw new Error("Téléphone invalide");
    if (!clean(input.city)) throw new Error("Ville requise");
    return {
      lines: input.lines.map((l) => ({
        productId: String(l.productId),
        quantity: Math.max(1, Math.min(99, Math.floor(Number(l.quantity) || 1))),
      })),
      name: clean(input.name, 120),
      phone: clean(input.phone, 30),
      email: clean(input.email, 160),
      city: clean(input.city, 80),
      zone: clean(input.zone, 80),
      street: clean(input.street, 200),
      details: clean(input.details, 300),
      paymentMethod: input.paymentMethod === "wave" || input.paymentMethod === "orange_money" ? input.paymentMethod : "cod",
    };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Client identifié ? On rattache la commande à son compte.
    let customerId: string | null = null;
    const authHeader = getRequestHeader("authorization");
    const token = authHeader?.replace(/^Bearer\s+/i, "");
    if (token) {
      const { data: userData } = await supabaseAdmin.auth.getUser(token);
      customerId = userData?.user?.id ?? null;
    }

    const ids = data.lines.map((l) => l.productId);
    const { data: products, error: prodErr } = await supabaseAdmin
      .from("products")
      .select("id,name,price,stock,images,vendor_id,status,vendors(commission_rate)")
      .in("id", ids)
      .eq("status", "approved");
    if (prodErr) throw new Error(prodErr.message);
    if (!products || products.length === 0) throw new Error("Aucun produit disponible");

    const items = data.lines
      .map((l) => {
        const p = products.find((x) => x.id === l.productId);
        if (!p) return null;
        const quantity = Math.min(l.quantity, Math.max(p.stock, 1));
        const unit = Number(p.price);
        return {
          product_id: p.id,
          vendor_id: p.vendor_id,
          commission_rate: Number((p.vendors as { commission_rate: number | null } | null)?.commission_rate ?? 10),
          product_name: p.name,
          product_image: (p.images as string[] | null)?.[0] ?? null,
          unit_price: unit,
          quantity,
          total: unit * quantity,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    if (items.length === 0) throw new Error("Aucun produit disponible");

    const vendorIds = Array.from(new Set(items.map((i) => i.vendor_id)));
    const subtotal = items.reduce((s, i) => s + i.total, 0);

    const { data: zone } = await supabaseAdmin
      .from("delivery_zones")
      .select("fee")
      .eq("city", data.city)
      .eq("is_active", true)
      .limit(1)
      .maybeSingle();
    const feePerVendor = Number(zone?.fee ?? 1500);
    const deliveryFee = feePerVendor * vendorIds.length;

    const orderNumber = `BY-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;

    const { data: order, error: orderErr } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_id: customerId,
        guest_name: data.name,
        guest_phone: data.phone,
        guest_email: data.email || null,
        shipping_name: data.name,
        shipping_phone: data.phone,
        shipping_city: data.city,
        shipping_zone: data.zone || null,
        shipping_street: [data.street, data.details].filter(Boolean).join(" — ") || null,
        subtotal,
        delivery_fee: deliveryFee,
        discount: 0,
        total: subtotal + deliveryFee,
        payment_method: data.paymentMethod,
        payment_status: "pending",
        status: "placed",
      })
      .select("id,order_number,track_token")
      .single();
    if (orderErr || !order) throw new Error(orderErr?.message ?? "Commande impossible");

    for (const vendorId of vendorIds) {
      const vItems = items.filter((i) => i.vendor_id === vendorId);
      const vSubtotal = vItems.reduce((s, i) => s + i.total, 0);
      const rate = vItems[0]!.commission_rate;
      const commission = Math.round((vSubtotal * rate) / 100);

      const { data: vOrder, error: vErr } = await supabaseAdmin
        .from("vendor_orders")
        .insert({
          order_id: order.id,
          vendor_id: vendorId,
          subtotal: vSubtotal,
          commission_rate: rate,
          commission_amount: commission,
          net_amount: vSubtotal - commission,
          status: "placed",
        })
        .select("id")
        .single();
      if (vErr || !vOrder) throw new Error(vErr?.message ?? "Commande vendeur impossible");

      await supabaseAdmin.from("order_items").insert(
        vItems.map((i) => ({
          vendor_order_id: vOrder.id,
          product_id: i.product_id,
          product_name: i.product_name,
          product_image: i.product_image,
          unit_price: i.unit_price,
          quantity: i.quantity,
          total: i.total,
        })),
      );

      await supabaseAdmin.from("deliveries").insert({
        vendor_order_id: vOrder.id,
        mode: "byawa",
        fee: feePerVendor,
        status: "to_prepare",
      });
    }

    await supabaseAdmin.from("order_events").insert({
      order_id: order.id,
      status: "placed",
      note: "Commande enregistrée",
    });

    return { orderNumber: order.order_number, trackToken: order.track_token as string };
  });

export type TrackedOrder = Awaited<ReturnType<typeof trackOrder>>;

export const trackOrder = createServerFn({ method: "POST" })
  .inputValidator((input: { reference: string }) => ({ reference: clean(input?.reference, 80) }))
  .handler(async ({ data }) => {
    if (!data.reference) throw new Error("Référence requise");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: order } = await supabaseAdmin
      .from("orders")
      .select(
        "id,order_number,track_token,status,payment_status,total,subtotal,delivery_fee,created_at,shipping_name,shipping_city,shipping_zone,shipping_street",
      )
      .or(`track_token.eq.${data.reference},order_number.eq.${data.reference}`)
      .maybeSingle();
    if (!order) throw new Error("Commande introuvable");

    const { data: vendorOrders } = await supabaseAdmin
      .from("vendor_orders")
      .select(
        "id,status,subtotal,vendors(shop_name,slug,phone),order_items(product_name,product_image,quantity,unit_price,total),deliveries(status,mode,fee,delivered_at,drivers(full_name,phone,vehicle,city))",
      )
      .eq("order_id", order.id);

    const { data: events } = await supabaseAdmin
      .from("order_events")
      .select("status,note,created_at")
      .eq("order_id", order.id)
      .order("created_at", { ascending: true });

    return { order, vendorOrders: vendorOrders ?? [], events: events ?? [] };
  });
