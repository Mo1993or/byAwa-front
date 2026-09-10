import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Store,
  Package,
  ShoppingBag,
  Truck,
  ShieldAlert,
  Wallet,
  Users,
  Star,
  LayoutGrid,
  Image as ImageIcon,
  Ticket,
  LifeBuoy,
  RotateCcw,
  Settings,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { formatDate, formatPrice } from "@/lib/format";
import { displayEmail, formatPhone } from "@/lib/phone";

import { SmartImage } from "@/components/SmartImage";
import {
  DashboardShell,
  StatCard,
  StatGrid,
} from "@/components/dashboard/DashboardShell";
import { DashboardTabs } from "@/components/dashboard/DashboardNav";
import {
  AdminCategories,
  AdminBanners,
  AdminCoupons,
  AdminSupport,
  AdminReturns,
} from "@/components/dashboard/AdminModules";
import { AdminHomeSettings } from "@/components/dashboard/AdminHomeSettings";
import {
  ChartGrid,
  TrendChart,
  MonthlyBarChart,
  BreakdownChart,
  useMonthlySeries,
} from "@/components/dashboard/DashboardCharts";



export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Administration — BYAWA" },
      {
        name: "description",
        content:
          "Pilotage global de la marketplace BYAWA : vendeurs, produits, commandes, livraisons et finance.",
      },
      { property: "og:title", content: "Administration — BYAWA" },
      { property: "og:description", content: "Tableau de bord administrateur BYAWA." },
    ],
  }),
  component: AdminDashboard,
});

const ORDER_STATUSES = [
  "placed",
  "paid",
  "preparing",
  "shipped",
  "delivering",
  "delivered",
  "cancelled",
  "returned",
] as const;

function AdminDashboard() {
  const { isAdmin, loading } = useAuth();
  const queryClient = useQueryClient();
  const invalidate = (keys: string[]) =>
    keys.forEach((k) => queryClient.invalidateQueries({ queryKey: [k] }));

  const { data: vendors = [] } = useQuery({
    queryKey: ["admin-vendors"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vendors")
        .select(
          "id,shop_name,slug,city,status,logo_url,commission_rate,created_at,phone,email,membership_fee,membership_status,membership_method,membership_reference,membership_paid_at",
        )
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: products = [] } = useQuery({
    queryKey: ["admin-products"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id,name,price,stock,status,images,created_at,vendor_id,vendors(shop_name)")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["admin-orders"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id,order_number,total,status,payment_status,shipping_city,created_at")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: withdrawals = [] } = useQuery({
    queryKey: ["admin-withdrawals"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("withdrawals")
        .select("id,amount,method,details,status,created_at,vendors(shop_name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: zonesCount = 0 } = useQuery({
    queryKey: ["admin-zones"],
    enabled: isAdmin,
    queryFn: async () => {
      const { count, error } = await supabase
        .from("delivery_zones")
        .select("id", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });

  const { data: profiles = [] } = useQuery({
    queryKey: ["admin-profiles"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id,first_name,last_name,phone,email,is_blocked,created_at")
        .order("created_at", { ascending: false })
        .limit(300);
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: drivers = [] } = useQuery({
    queryKey: ["admin-drivers"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("drivers")
        .select("id,full_name,phone,city,vehicle,is_available,is_active,earnings,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["admin-reviews"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("id,rating,comment,author_name,is_approved,is_reported,created_at,products(name)")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return data ?? [];
    },
  });

  const setProfileBlocked = useMutation({
    mutationFn: async ({ id, blocked }: { id: string; blocked: boolean }) => {
      const { error } = await supabase.from("profiles").update({ is_blocked: blocked }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Compte mis à jour");
      invalidate(["admin-profiles"]);
    },
    onError: (e: Error) => toast.error("Action impossible", { description: e.message }),
  });

  const setDriverActive = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await supabase.from("drivers").update({ is_active: active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Livreur mis à jour");
      invalidate(["admin-drivers"]);
    },
    onError: (e: Error) => toast.error("Action impossible", { description: e.message }),
  });

  const setReviewApproved = useMutation({
    mutationFn: async ({ id, approved }: { id: string; approved: boolean }) => {
      const { error } = await supabase
        .from("reviews")
        .update({ is_approved: approved, is_reported: false })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Avis mis à jour");
      invalidate(["admin-reviews"]);
    },
    onError: (e: Error) => toast.error("Action impossible", { description: e.message }),
  });

  const setVendorCommission = useMutation({
    mutationFn: async ({ id, rate }: { id: string; rate: number }) => {
      const { error } = await supabase.from("vendors").update({ commission_rate: rate }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Commission mise à jour");
      invalidate(["admin-vendors"]);
    },
    onError: (e: Error) => toast.error("Action impossible", { description: e.message }),
  });

  const { data: settings = [] } = useQuery({
    queryKey: ["admin-settings"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase.from("settings").select("key,value");
      if (error) throw error;
      return data ?? [];
    },
  });
  const settingValue = (key: string, fallback: string) =>
    settings.find((s) => s.key === key)?.value ?? fallback;

  const saveSetting = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase.from("settings").upsert({ key, value }, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Réglage enregistré");
      invalidate(["admin-settings"]);
    },
    onError: (e: Error) => toast.error("Action impossible", { description: e.message }),
  });

  const setVendorMembership = useMutation({
    mutationFn: async ({
      id,
      status,
      fee,
    }: {
      id: string;
      status?: "unpaid" | "pending" | "paid" | "waived";
      fee?: number;
    }) => {
      const patch: {
        membership_status?: string;
        membership_paid_at?: string | null;
        membership_fee?: number;
      } = {};
      if (status) {
        patch.membership_status = status;
        patch.membership_paid_at =
          status === "paid" || status === "waived" ? new Date().toISOString() : null;
      }
      if (fee !== undefined) patch.membership_fee = fee;
      const { error } = await supabase.from("vendors").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Adhésion mise à jour");
      invalidate(["admin-vendors"]);
    },
    onError: (e: Error) => toast.error("Action impossible", { description: e.message }),
  });


  const setVendorStatus = useMutation({
    mutationFn: async ({
      id,
      status,
      reason,
    }: {
      id: string;
      status: "approved" | "rejected" | "suspended" | "verifying";
      reason?: string;
    }) => {
      const { error } = await supabase
        .from("vendors")
        .update({ status, rejection_reason: reason ?? null })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Statut vendeur mis à jour");
      invalidate(["admin-vendors"]);
    },
    onError: (e: Error) => toast.error("Action impossible", { description: e.message }),
  });

  const setProductStatus = useMutation({
    mutationFn: async ({
      id,
      status,
      reason,
    }: {
      id: string;
      status: "approved" | "rejected" | "disabled";
      reason?: string;
    }) => {
      const { error } = await supabase
        .from("products")
        .update({ status, rejection_reason: reason ?? null })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Produit mis à jour");
      invalidate(["admin-products"]);
    },
    onError: (e: Error) => toast.error("Action impossible", { description: e.message }),
  });

  const setOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("orders")
        .update({ status: status as (typeof ORDER_STATUSES)[number] })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Commande mise à jour");
      invalidate(["admin-orders"]);
    },
    onError: (e: Error) => toast.error("Action impossible", { description: e.message }),
  });

  const setWithdrawalStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "processing" | "paid" | "rejected" }) => {
      const { error } = await supabase.from("withdrawals").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Retrait mis à jour");
      invalidate(["admin-withdrawals"]);
    },
    onError: (e: Error) => toast.error("Action impossible", { description: e.message }),
  });

  const gmvSeries = useMonthlySeries(orders, (o) => o.created_at, [
    { key: "gmv", value: (o) => Number(o.total ?? 0) },
  ]);
  const ordersSeries = useMonthlySeries(orders, (o) => o.created_at, [
    { key: "orders", value: () => 1 },
  ]);
  const vendorsSeries = useMonthlySeries(vendors, (v) => v.created_at, [
    { key: "vendors", value: () => 1 },
  ]);
  const productsSeries = useMonthlySeries(products, (p) => p.created_at, [
    { key: "products", value: () => 1 },
  ]);
  const activitySeries = ordersSeries.map((row, i) => ({
    ...row,
    vendors: Number(vendorsSeries[i]?.["vendors"] ?? 0),
    products: Number(productsSeries[i]?.["products"] ?? 0),
  }));
  const orderStatusBreakdown = ORDER_STATUSES.map((s) => ({
    name: s,
    value: orders.filter((o) => String(o.status) === s).length,
  }));

  if (loading) return <div className="container-byawa py-16 text-muted-foreground">Chargement…</div>;


  if (!isAdmin) {
    return (
      <div className="container-byawa py-20 text-center">
        <ShieldAlert className="mx-auto size-12 text-destructive" />
        <h1 className="mt-4 text-2xl font-bold">Accès réservé aux administrateurs</h1>
        <p className="mt-2 text-muted-foreground">
          Votre compte ne dispose pas des droits nécessaires pour accéder à cette page.
        </p>
      </div>
    );
  }

  const pendingVendors = vendors.filter((v) => v.status === "pending" || v.status === "verifying");
  const pendingProducts = products.filter((p) => p.status === "pending");
  const pendingWithdrawals = withdrawals.filter((w) => w.status === "requested");
  const gmv = orders.reduce((sum, o) => sum + Number(o.total ?? 0), 0);
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const monthOrders = orders.filter((o) => new Date(o.created_at) >= monthStart);
  const monthGmv = monthOrders.reduce((sum, o) => sum + Number(o.total ?? 0), 0);
  const avgBasket = orders.length > 0 ? gmv / orders.length : 0;
  const openOrders = orders.filter((o) =>
    ["placed", "paid", "preparing", "shipped", "delivering"].includes(String(o.status)),
  ).length;
  const activeDrivers = drivers.filter((d) => d.is_active).length;
  const pendingReviews = reviews.filter((r) => !r.is_approved || r.is_reported);

  return (
    <DashboardShell
      title="Administration BYAWA"
      subtitle="Vue globale et pilotage de la marketplace."
    >
      <StatGrid>
        <StatCard icon={Store} label="Vendeurs" value={vendors.length} description={`${pendingVendors.length} à valider`} tone={pendingVendors.length ? "warning" : "default"} />
        <StatCard icon={Package} label="Produits" value={products.length} description="Catalogue global" />
        <StatCard icon={ShoppingBag} label="Commandes" value={orders.length} description={`${openOrders} en cours`} />
        <StatCard icon={Users} label="GMV cumulée" value={formatPrice(gmv)} description={`${formatPrice(monthGmv)} ce mois`} tone="primary" />
        <StatCard icon={Wallet} label="Retraits" value={pendingWithdrawals.length} description="en attente" tone={pendingWithdrawals.length ? "warning" : "default"} />
        <StatCard icon={Truck} label="Livreurs" value={drivers.length} description={`${activeDrivers} actifs`} />
      </StatGrid>


      <StatGrid>
        <StatCard label="Panier moyen" value={formatPrice(avgBasket)} />
        <StatCard label="Comptes clients" value={profiles.length} />
        <StatCard label="Zones de livraison" value={zonesCount} />
        <StatCard label="Avis à modérer" value={pendingReviews.length} />
      </StatGrid>

      <ChartGrid>
        <TrendChart
          title="Tendance du chiffre d'affaires"
          subtitle="GMV des 6 derniers mois"
          data={gmvSeries}
          dataKey="gmv"
          label="GMV"
          formatter={formatPrice}
        />
        <MonthlyBarChart
          title="Évolution mensuelle"
          subtitle="Commandes et nouveaux vendeurs"
          data={activitySeries}
          series={[
            { key: "orders", label: "Commandes" },
            { key: "products", label: "Produits" },
            { key: "vendors", label: "Vendeurs" },
          ]}
        />
        <BreakdownChart
          title="Répartition des commandes"
          subtitle="Par statut"
          data={orderStatusBreakdown}
        />
      </ChartGrid>




      <div className="mt-4">
        <DashboardTabs
          navTitle="Modules super admin"
          defaultValue="vendeurs"
          items={[
            { value: "vendeurs", label: "Vendeurs", icon: Store, badge: pendingVendors.length },
            { value: "produits", label: "Produits", icon: Package, badge: pendingProducts.length },
            { value: "commandes", label: "Commandes", icon: ShoppingBag },
            { value: "livreurs", label: "Livreurs", icon: Truck },
            { value: "utilisateurs", label: "Utilisateurs", icon: Users },
            { value: "categories", label: "Catégories", icon: LayoutGrid },
            { value: "bannieres", label: "Bannières", icon: ImageIcon },
            { value: "accueil", label: "Page d'accueil", icon: Home },
            { value: "coupons", label: "Coupons", icon: Ticket },
            { value: "avis", label: "Avis", icon: Star, badge: pendingReviews.length },
            { value: "support", label: "Support", icon: LifeBuoy },
            { value: "retours", label: "Retours", icon: RotateCcw },
            { value: "finance", label: "Finance", icon: Wallet, badge: pendingWithdrawals.length },
            { value: "reglages", label: "Réglages", icon: Settings },
          ]}
        >

        <TabsContent value="livreurs" className="mt-0 space-y-3">
          {drivers.length === 0 ? (
            <p className="surface-card p-10 text-center text-muted-foreground">Aucun livreur.</p>
          ) : (
            drivers.map((d) => (
              <div key={d.id} className="surface-card flex flex-wrap items-center gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{d.full_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPhone(d.phone)} · {d.city ?? "—"} · {d.vehicle ?? "—"}
                  </p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs">
                  {d.is_available ? "disponible" : "indisponible"}
                </span>
                <span className="font-bold text-primary">{formatPrice(d.earnings)}</span>
                <Button
                  size="sm"
                  variant={d.is_active ? "ghost" : "default"}
                  className="ml-auto"
                  onClick={() => setDriverActive.mutate({ id: d.id, active: !d.is_active })}
                >
                  {d.is_active ? "Désactiver" : "Activer"}
                </Button>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="utilisateurs" className="mt-0 space-y-3">
          {profiles.map((p) => (
            <div key={p.id} className="surface-card flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate font-semibold">
                  {[p.first_name, p.last_name].filter(Boolean).join(" ") || "Client BYAWA"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatPhone(p.phone)} · {displayEmail(p.email) ?? "sans e-mail"} ·{" "}
                  {formatDate(p.created_at)}
                </p>
              </div>
              {p.is_blocked ? (
                <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs text-destructive">
                  bloqué
                </span>
              ) : null}
              <Button
                size="sm"
                variant={p.is_blocked ? "default" : "ghost"}
                className="ml-auto"
                onClick={() => setProfileBlocked.mutate({ id: p.id, blocked: !p.is_blocked })}
              >
                {p.is_blocked ? "Débloquer" : "Bloquer"}
              </Button>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="avis" className="mt-0 space-y-3">
          <p className="text-sm text-muted-foreground">
            {pendingReviews.length} avis à modérer sur {reviews.length}.
          </p>
          {reviews.map((r) => {
            const product = r.products as { name?: string } | null;
            return (
              <div key={r.id} className="surface-card p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-semibold">{r.rating}/5</span>
                  <span className="text-sm">{r.author_name ?? "Client"}</span>
                  <span className="text-xs text-muted-foreground">{product?.name ?? "—"}</span>
                  {r.is_reported ? (
                    <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs text-destructive">
                      signalé
                    </span>
                  ) : null}
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs">
                    {r.is_approved ? "publié" : "en attente"}
                  </span>
                  <div className="ml-auto flex gap-2">
                    <Button
                      size="sm"
                      disabled={r.is_approved && !r.is_reported}
                      onClick={() => setReviewApproved.mutate({ id: r.id, approved: true })}
                    >
                      Publier
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setReviewApproved.mutate({ id: r.id, approved: false })}
                    >
                      Masquer
                    </Button>
                  </div>
                </div>
                {r.comment ? <p className="mt-2 text-sm">{r.comment}</p> : null}
              </div>
            );
          })}
        </TabsContent>


        <TabsContent value="vendeurs" className="mt-0 space-y-3">
          {vendors.length === 0 ? (
            <p className="surface-card p-10 text-center text-muted-foreground">Aucun vendeur.</p>
          ) : (
            vendors.map((v) => (
              <div key={v.id} className="surface-card flex flex-wrap items-center gap-3 p-4">
                <SmartImage src={v.logo_url} alt={v.shop_name} className="size-11 rounded-xl object-cover" />
                <div className="min-w-0">
                  <p className="truncate font-semibold">{v.shop_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {v.city ?? "—"} · {v.phone ?? v.email ?? "—"} · {formatDate(v.created_at)}
                  </p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs uppercase">{v.status}</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    v.membership_status === "paid" || v.membership_status === "waived"
                      ? "bg-primary/15 text-primary"
                      : v.membership_status === "pending"
                        ? "bg-amber-500/15 text-amber-600"
                        : "bg-destructive/10 text-destructive"
                  }`}
                >
                  Adhésion {v.membership_status === "paid"
                    ? `payée (${formatPrice(Number(v.membership_fee ?? 0))})`
                    : v.membership_status === "waived"
                      ? "offerte"
                      : v.membership_status === "pending"
                        ? `à vérifier${v.membership_reference ? ` · réf ${v.membership_reference}` : ""}`
                        : `non payée (${formatPrice(Number(v.membership_fee ?? 0))})`}
                </span>
                <div className="ml-auto flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    disabled={v.status === "approved"}
                    onClick={() => setVendorStatus.mutate({ id: v.id, status: "approved" })}
                  >
                    Approuver
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const reason = window.prompt("Motif du refus ?") ?? "";
                      if (reason) setVendorStatus.mutate({ id: v.id, status: "rejected", reason });
                    }}
                  >
                    Refuser
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setVendorStatus.mutate({ id: v.id, status: "suspended" })}
                  >
                    Suspendre
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={v.membership_status === "paid"}
                    onClick={() => setVendorMembership.mutate({ id: v.id, status: "paid" })}
                  >
                    Adhésion payée
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={v.membership_status === "waived"}
                    onClick={() => setVendorMembership.mutate({ id: v.id, status: "waived" })}
                  >
                    Offrir
                  </Button>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      step={500}
                      defaultValue={Number(v.membership_fee ?? 0)}
                      className="h-9 w-28 rounded-md border border-input bg-background px-2 text-sm"
                      onBlur={(e) => {
                        const fee = Number(e.target.value);
                        if (fee !== Number(v.membership_fee ?? 0)) {
                          setVendorMembership.mutate({ id: v.id, fee });
                        }
                      }}
                      aria-label={`Frais d'adhésion ${v.shop_name}`}
                    />
                    <span className="text-xs text-muted-foreground">FCFA adhésion</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={50}
                      defaultValue={Number(v.commission_rate ?? 10)}
                      className="h-9 w-20 rounded-md border border-input bg-background px-2 text-sm"
                      onBlur={(e) => {
                        const rate = Number(e.target.value);
                        if (rate !== Number(v.commission_rate ?? 10)) {
                          setVendorCommission.mutate({ id: v.id, rate });
                        }
                      }}
                      aria-label={`Commission ${v.shop_name}`}
                    />
                    <span className="text-xs text-muted-foreground">% comm.</span>
                  </div>
                </div>


              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="produits" className="mt-0 space-y-3">
          {products.map((p) => {
            const vendor = p.vendors as { shop_name?: string } | null;
            const images = (p.images ?? []) as string[];
            return (
              <div key={p.id} className="surface-card flex flex-wrap items-center gap-3 p-4">
                <SmartImage src={images[0]} alt={p.name} className="size-12 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="truncate font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {vendor?.shop_name ?? "—"} · stock {p.stock}
                  </p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs">{p.status}</span>
                <span className="font-bold text-primary">{formatPrice(p.price)}</span>
                <div className="ml-auto flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    disabled={p.status === "approved"}
                    onClick={() => setProductStatus.mutate({ id: p.id, status: "approved" })}
                  >
                    Publier
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const reason = window.prompt("Motif du refus ?") ?? "";
                      if (reason) setProductStatus.mutate({ id: p.id, status: "rejected", reason });
                    }}
                  >
                    Refuser
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setProductStatus.mutate({ id: p.id, status: "disabled" })}
                  >
                    Désactiver
                  </Button>
                </div>
              </div>
            );
          })}
        </TabsContent>

        <TabsContent value="commandes" className="mt-0 space-y-3">
          {orders.length === 0 ? (
            <p className="surface-card p-10 text-center text-muted-foreground">Aucune commande.</p>
          ) : (
            orders.map((o) => (
              <div key={o.id} className="surface-card flex flex-wrap items-center gap-3 p-4">
                <span className="font-semibold">#{o.order_number}</span>
                <span className="text-xs text-muted-foreground">
                  {o.shipping_city ?? "—"} · {formatDate(o.created_at)}
                </span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs">{o.payment_status}</span>
                <span className="font-bold text-primary">{formatPrice(o.total)}</span>
                <select
                  className="ml-auto h-9 rounded-md border border-input bg-background px-3 text-sm"
                  value={o.status}
                  onChange={(e) => setOrderStatus.mutate({ id: o.id, status: e.target.value })}
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="finance" className="mt-0 space-y-3">
          {withdrawals.length === 0 ? (
            <p className="surface-card p-10 text-center text-muted-foreground">
              Aucune demande de retrait.
            </p>
          ) : (
            withdrawals.map((w) => {
              const vendor = w.vendors as { shop_name?: string } | null;
              return (
                <div key={w.id} className="surface-card flex flex-wrap items-center gap-3 p-4">
                  <span className="font-semibold">{vendor?.shop_name ?? "—"}</span>
                  <span className="font-bold text-primary">{formatPrice(w.amount)}</span>
                  <span className="text-xs text-muted-foreground">
                    {w.method ?? "—"} · {w.details ?? "—"} · {formatDate(w.created_at)}
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs">{w.status}</span>
                  <div className="ml-auto flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setWithdrawalStatus.mutate({ id: w.id, status: "processing" })}
                    >
                      En cours
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setWithdrawalStatus.mutate({ id: w.id, status: "paid" })}
                    >
                      Payé
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setWithdrawalStatus.mutate({ id: w.id, status: "rejected" })}
                    >
                      Refuser
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </TabsContent>

        <TabsContent value="reglages" className="mt-0 space-y-4">
          <div className="surface-card space-y-4 p-6">
            <div>
              <h2 className="font-display text-lg font-bold">Frais d'adhésion vendeur</h2>
              <p className="text-sm text-muted-foreground">
                Montant demandé à chaque nouvelle boutique lors de son inscription.
              </p>
            </div>
            <div className="flex flex-wrap items-end gap-3">
              <div>
                <label className="text-xs text-muted-foreground" htmlFor="fee">
                  Montant (FCFA)
                </label>
                <input
                  id="fee"
                  type="number"
                  min={0}
                  step={500}
                  defaultValue={settingValue("vendor_membership_fee", "10000")}
                  className="mt-1 block h-10 w-40 rounded-md border border-input bg-background px-3 text-sm"
                  onBlur={(e) =>
                    saveSetting.mutate({ key: "vendor_membership_fee", value: String(Number(e.target.value)) })
                  }
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground" htmlFor="comm">
                  Commission par défaut (%)
                </label>
                <input
                  id="comm"
                  type="number"
                  min={0}
                  max={50}
                  defaultValue={settingValue("global_commission_rate", "10")}
                  className="mt-1 block h-10 w-40 rounded-md border border-input bg-background px-3 text-sm"
                  onBlur={(e) =>
                    saveSetting.mutate({ key: "global_commission_rate", value: String(Number(e.target.value)) })
                  }
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground" htmlFor="instr">
                Instructions de paiement affichées au vendeur
              </label>
              <textarea
                id="instr"
                rows={3}
                defaultValue={settingValue("membership_payment_instructions", "")}
                className="mt-1 w-full rounded-md border border-input bg-background p-3 text-sm"
                onBlur={(e) =>
                  saveSetting.mutate({ key: "membership_payment_instructions", value: e.target.value })
                }
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Les modifications sont enregistrées automatiquement. La commission d'une boutique déjà créée se
              règle dans l'onglet Vendeurs.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="mt-0"><AdminCategories /></TabsContent>
        <TabsContent value="bannieres" className="mt-0"><AdminBanners /></TabsContent>
        <TabsContent value="coupons" className="mt-0"><AdminCoupons /></TabsContent>
        <TabsContent value="support" className="mt-0"><AdminSupport /></TabsContent>
        <TabsContent value="retours" className="mt-0"><AdminReturns /></TabsContent>
        <TabsContent value="accueil" className="mt-0"><AdminHomeSettings /></TabsContent>
        </DashboardTabs>
      </div>
    </DashboardShell>


  );
}
