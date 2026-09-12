import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Package,
  ShoppingBag,
  Wallet,
  Percent,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  AlertTriangle,
  Clock,
  TrendingUp,
  Star,
  Store,
  LayoutGrid,
  Search,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { formatDate, formatPrice } from "@/lib/format";
import { categoriesQuery } from "@/lib/marketplace";
import { uniqueSlug } from "@/lib/slug";
import { SmartImage } from "@/components/SmartImage";
import { ImageUploader } from "@/components/ImageUploader";

import {
  DashboardShell,
  StatCard,
  StatGrid,
} from "@/components/dashboard/DashboardShell";
import { DashboardTabs } from "@/components/dashboard/DashboardNav";
import {
  ChartGrid,
  TrendChart,
  MonthlyBarChart,
  BreakdownChart,
  useMonthlySeries,
} from "@/components/dashboard/DashboardCharts";



export const Route = createFileRoute("/_authenticated/vendeur")({
  head: () => ({
    meta: [
      { title: "Espace vendeur — BYAWA" },
      {
        name: "description",
        content: "Pilotez votre boutique BYAWA : produits, commandes, commissions et portefeuille.",
      },
      { property: "og:title", content: "Espace vendeur — BYAWA" },
      { property: "og:description", content: "Tableau de bord vendeur BYAWA." },
    ],
  }),
  component: VendorDashboard,
});

const VENDOR_ORDER_STATUSES = [
  "placed",
  "paid",
  "preparing",
  "shipped",
  "delivering",
  "delivered",
  "cancelled",
] as const;
type VendorOrderStatus = (typeof VENDOR_ORDER_STATUSES)[number];

type ProductRow = {

  id: string;
  name: string;
  slug: string;
  description: string | null;
  brand: string | null;
  price: number;
  compare_at_price: number | null;
  stock: number;
  images: string[];
  status: string;
  category_id: string | null;
  rejection_reason: string | null;
};

function VendorDashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: vendor, isLoading } = useQuery({
    queryKey: ["my-vendor", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vendors")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const vendorId = vendor?.id;

  const { data: products = [] } = useQuery({
    queryKey: ["vendor-products", vendorId],
    enabled: Boolean(vendorId),
    queryFn: async (): Promise<ProductRow[]> => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id,name,slug,description,brand,price,compare_at_price,stock,images,status,category_id,rejection_reason",
        )
        .eq("vendor_id", vendorId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as ProductRow[];
    },
  });

  const { data: wallet } = useQuery({
    queryKey: ["vendor-wallet", vendorId],
    enabled: Boolean(vendorId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("vendor_id", vendorId!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: vendorOrders = [] } = useQuery({
    queryKey: ["vendor-orders", vendorId],
    enabled: Boolean(vendorId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vendor_orders")
        .select(
          "id,status,subtotal,net_amount,commission_amount,created_at,orders(order_number,shipping_city,shipping_name),order_items(id,product_name,quantity,total)",
        )
        .eq("vendor_id", vendorId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: withdrawals = [] } = useQuery({
    queryKey: ["vendor-withdrawals", vendorId],
    enabled: Boolean(vendorId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("withdrawals")
        .select("*")
        .eq("vendor_id", vendorId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["vendor-reviews", vendorId],
    enabled: Boolean(vendorId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("id,rating,comment,author_name,created_at,products(name)")
        .eq("vendor_id", vendorId!)
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data ?? [];
    },
  });

  const setVendorOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: VendorOrderStatus }) => {
      const { error } = await supabase.from("vendor_orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Commande mise à jour");
      queryClient.invalidateQueries({ queryKey: ["vendor-orders"] });
    },
    onError: (e: Error) => toast.error("Action impossible", { description: e.message }),
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Produit supprimé");
      queryClient.invalidateQueries({ queryKey: ["vendor-products"] });
    },
    onError: (e: Error) => toast.error("Suppression impossible", { description: e.message }),
  });

  const salesSeries = useMonthlySeries(vendorOrders, (o) => o.created_at, [
    { key: "brut", value: (o) => Number(o.subtotal ?? 0) },
    { key: "net", value: (o) => Number(o.net_amount ?? 0) },
  ]);
  const ordersCountSeries = useMonthlySeries(vendorOrders, (o) => o.created_at, [
    { key: "commandes", value: () => 1 },
  ]);
  const productStatusBreakdown = [
    { name: "Publiés", value: products.filter((p) => p.status === "approved").length },
    { name: "En attente", value: products.filter((p) => p.status === "pending").length },
    { name: "Brouillons", value: products.filter((p) => p.status === "draft").length },
    { name: "Refusés", value: products.filter((p) => p.status === "rejected").length },
  ];

  const [search, setSearch] = useState("");
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  if (isLoading) return <div className="container-byawa py-16 text-muted-foreground">Chargement…</div>;


  if (!vendor) {
    return (
      <div className="container-byawa py-20 text-center">
        <h1 className="text-2xl font-bold">Vous n'avez pas encore de boutique</h1>
        <p className="mt-2 text-muted-foreground">
          Déposez votre dossier vendeur pour commencer à vendre sur BYAWA.
        </p>
        <Button asChild className="mt-0" size="lg">
          <Link to="/devenir-vendeur">Créer ma boutique</Link>
        </Button>
      </div>
    );
  }

  const revenue = vendorOrders.reduce((sum, o) => sum + Number(o.subtotal ?? 0), 0);
  const approved = vendor.status === "approved";
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const monthRevenue = vendorOrders
    .filter((o) => new Date(o.created_at) >= monthStart)
    .reduce((sum, o) => sum + Number(o.net_amount ?? 0), 0);
  const toProcess = vendorOrders.filter((o) =>
    ["placed", "paid", "preparing"].includes(String(o.status)),
  ).length;
  const lowStock = products.filter((p) => p.stock <= 3);
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + Number(r.rating ?? 0), 0) / reviews.length
      : Number(vendor.rating ?? 0);

  return (
    <DashboardShell
      title={vendor.shop_name}
      subtitle={`Espace vendeur · ${vendor.city ?? "Sénégal"} · Commission ${vendor.commission_rate ?? 10} %`}
      avatarUrl={vendor.logo_url}
      badge={
        <span className={cn(
          "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide border",
          vendor.status === "approved" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
          vendor.status === "pending" || vendor.status === "verifying" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
          "bg-slate-500/10 text-slate-600 border-slate-500/20"
        )}>
          {vendor.status === "approved" ? "Boutique Active" : 
           vendor.status === "pending" ? "En attente" : 
           vendor.status === "verifying" ? "Vérification" : vendor.status}
        </span>
      }
      actions={<ProductDialog vendorId={vendor.id} vendorStatus={vendor.status} />}
    >
      <StatGrid>
        <StatCard icon={Package} label="Produits" value={products.length} />
        <StatCard icon={ShoppingBag} label="Commandes" value={vendorOrders.length} />
        <StatCard icon={Clock} label="À traiter" value={toProcess} tone={toProcess > 0 ? "warning" : "default"} />
        <StatCard icon={TrendingUp} label="Net ce mois" value={formatPrice(monthRevenue)} />
        <StatCard icon={Wallet} label="Solde" value={formatPrice(wallet?.balance ?? 0)} tone="primary" />
        <StatCard icon={Star} label="Note moyenne" value={avgRating ? avgRating.toFixed(1) : "—"} description={`${reviews.length} avis`} />
      </StatGrid>

      {!approved && (
        <Card className="border-l-4 border-warning bg-warning/5 mb-4 mt-4">
          <CardContent className="py-4 text-sm text-muted-foreground">
            Votre boutique est en cours de validation. Vous pouvez préparer vos produits : ils seront
            publiés dès l'approbation de votre dossier.
            {vendor.rejection_reason && (
              <span className="mt-1 block text-destructive font-bold">Motif : {vendor.rejection_reason}</span>
            )}
          </CardContent>
        </Card>
      )}

      {lowStock.length > 0 && (
        <Card className="border-l-4 border-destructive bg-destructive/5 mb-4">
          <CardContent className="py-4 text-sm text-destructive flex items-center gap-2">
            <AlertTriangle className="size-4" />
            <span>
              {lowStock.length} produit(s) en stock faible : {lowStock.slice(0, 3).map((p) => p.name).join(", ")}
              {lowStock.length > 3 ? "…" : ""}
            </span>
          </CardContent>
        </Card>
      )}

      <ChartGrid>
        <TrendChart
          title="Tendance des ventes"
          subtitle="Chiffre d'affaires brut sur 6 mois"
          data={salesSeries}
          dataKey="brut"
          label="CA brut"
          formatter={formatPrice}
        />
        <MonthlyBarChart
          title="Évolution mensuelle"
          subtitle="Revenus bruts et nets après commission"
          data={salesSeries}
          series={[
            { key: "brut", label: "Brut" },
            { key: "net", label: "Net" },
          ]}
          formatter={formatPrice}
        />
        <BreakdownChart
          title="Répartition du catalogue"
          subtitle="Statut de vos produits"
          data={productStatusBreakdown}
        />
      </ChartGrid>

      <ChartGrid>
        <MonthlyBarChart
          title="Volume de commandes"
          subtitle="Nombre de commandes par mois"
          data={ordersCountSeries}
          series={[{ key: "commandes", label: "Commandes" }]}
        />
      </ChartGrid>


      {vendor.membership_status !== "paid" && vendor.membership_status !== "waived" && (
        <Card className="border-l-4 border-primary bg-primary/5 mb-8">
          <CardHeader className="py-4">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Frais d'adhésion : {formatPrice(Number(vendor.membership_fee ?? 0))}</span>
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                {vendor.membership_status === "pending" ? "Vérification en cours" : "À régler"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-sm text-muted-foreground">
              Votre boutique sera publiée une fois l'adhésion validée.
            </p>
            {vendor.membership_status !== "pending" && (
              <Button asChild size="sm" className="mt-4">
                <Link to="/devenir-vendeur">Signaler mon paiement</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}


      <div className="mt-4">
        <DashboardTabs
          navTitle="Espace vendeur"
          defaultValue="produits"
          items={[
            { value: "produits", label: "Mes produits", icon: Package },
            { value: "commandes", label: "Commandes", icon: ShoppingBag },
            { value: "avis", label: "Avis clients", icon: Star },
            { value: "portefeuille", label: "Portefeuille", icon: Wallet },
            { value: "boutique", label: "Ma boutique", icon: Store },
          ]}
        >

        <TabsContent value="produits" className="mt-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">Mes produits</h2>
              <p className="text-sm text-muted-foreground">
                Gérez votre inventaire et vos ventes en temps réel.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full max-w-sm sm:w-64">
                <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher..." 
                  className="pl-9" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <ProductDialog vendorId={vendor.id} vendorStatus={vendor.status} />
            </div>
          </div>
          {filteredProducts.length === 0 ? (
            <p className="surface-card mt-4 p-10 text-center text-muted-foreground">
              {search ? "Aucun produit ne correspond à votre recherche." : "Aucun produit pour le moment. Ajoutez votre premier article."}
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {filteredProducts.map((p) => (
                <li key={p.id} className="surface-card flex flex-wrap items-center gap-4 p-4">
                  <SmartImage
                    src={p.images?.[0]}
                    alt={p.name}
                    className="size-14 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Stock : {p.stock}
                      {p.rejection_reason ? ` · Refus : ${p.rejection_reason}` : ""}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-auto">
                    <span className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      p.status === "approved" ? "bg-emerald-500/10 text-emerald-600" :
                      p.status === "pending" ? "bg-amber-500/10 text-amber-600" :
                      p.status === "rejected" ? "bg-rose-500/10 text-rose-600" :
                      "bg-slate-500/10 text-slate-600"
                    )}>
                      {p.status === "approved" ? "En ligne" : 
                       p.status === "pending" ? "En attente" : 
                       p.status === "rejected" ? "Refusé" : p.status}
                    </span>
                    <span className="font-bold text-primary">{formatPrice(p.price)}</span>
                  </div>
                  <ProductDialog
                    vendorId={vendor.id}
                    product={p}
                    trigger={<Button variant="outline" size="icon" aria-label="Modifier">
                      <Pencil className="size-4" />
                    </Button>} vendorStatus={vendor.status}                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Supprimer"
                    onClick={() => deleteProduct.mutate(p.id)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="commandes" className="mt-0">
          <h2 className="text-xl font-bold">Commandes reçues</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Chiffre d'affaires cumulé : <span className="font-semibold">{formatPrice(revenue)}</span>
          </p>
          {vendorOrders.length === 0 ? (
            <p className="surface-card mt-4 p-10 text-center text-muted-foreground">
              Aucune commande pour l'instant.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {vendorOrders.map((o) => {
                const order = o.orders as {
                  order_number?: string;
                  shipping_city?: string;
                  shipping_name?: string;
                } | null;
                const items = (o.order_items ?? []) as {
                  id: string;
                  product_name: string;
                  quantity: number;
                  total: number;
                }[];
                return (
                  <li key={o.id} className="surface-card p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-semibold">#{order?.order_number ?? "—"}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(o.created_at)}</span>
                      <span className="text-xs text-muted-foreground">
                        {order?.shipping_name ?? "Client"} · {order?.shipping_city ?? "—"}
                      </span>
                      <select
                        className="ml-auto h-9 rounded-md border border-input bg-background px-3 text-sm"
                        value={String(o.status)}
                        onChange={(e) =>
                          setVendorOrderStatus.mutate({
                            id: o.id,
                            status: e.target.value as VendorOrderStatus,
                          })
                        }
                      >
                        {VENDOR_ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <span className="font-bold text-primary">{formatPrice(o.net_amount)}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {items.map((i) => `${i.quantity}× ${i.product_name}`).join(", ") || "—"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Brut {formatPrice(o.subtotal)} · commission {formatPrice(o.commission_amount)}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="avis" className="mt-0">
          <h2 className="text-xl font-bold">Avis clients</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Note moyenne : <span className="font-semibold">{avgRating.toFixed(1)}/5</span> ·{" "}
            {reviews.length} avis
          </p>
          {reviews.length === 0 ? (
            <p className="surface-card mt-4 p-10 text-center text-muted-foreground">
              Aucun avis pour le moment.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {reviews.map((r) => {
                const product = r.products as { name?: string } | null;
                return (
                  <li key={r.id} className="surface-card p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1 font-semibold">
                        <Star className="size-4 fill-primary text-primary" />
                        {r.rating}/5
                      </span>
                      <span className="text-sm">{r.author_name ?? "Client BYAWA"}</span>
                      <span className="text-xs text-muted-foreground">{product?.name ?? "—"}</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {formatDate(r.created_at)}
                      </span>
                    </div>
                    {r.comment ? <p className="mt-2 text-sm">{r.comment}</p> : null}
                  </li>
                );
              })}
            </ul>
          )}
        </TabsContent>


        <TabsContent value="portefeuille" className="mt-0">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Solde disponible", value: wallet?.balance ?? 0 },
              { label: "En attente", value: wallet?.pending_balance ?? 0 },
              { label: "Total gagné", value: wallet?.total_earned ?? 0 },
              { label: "Total retiré", value: wallet?.total_withdrawn ?? 0 },
            ].map((w) => (
              <div key={w.label} className="surface-card p-5">
                <p className="text-sm text-muted-foreground">{w.label}</p>
                <p className="mt-1 font-display text-xl font-bold">{formatPrice(w.value)}</p>
              </div>
            ))}
          </div>

          <WithdrawalForm
            vendorId={vendor.id}
            balance={Number(wallet?.balance ?? 0)}
            payoutMethod={vendor.payout_method}
            payoutDetails={vendor.payout_details}
          />

          <h3 className="mt-8 text-lg font-bold">Historique des retraits</h3>
          {withdrawals.length === 0 ? (
            <p className="surface-card mt-3 p-8 text-center text-muted-foreground">
              Aucun retrait demandé.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {withdrawals.map((w) => (
                <li key={w.id} className="surface-card flex flex-wrap items-center gap-3 p-4">
                  <span className="font-semibold">{formatPrice(w.amount)}</span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs">{w.status}</span>
                  <span className="text-xs text-muted-foreground">{w.method}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {formatDate(w.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="boutique" className="mt-0">
          <ShopSettings vendor={vendor} />
        </TabsContent>
        </DashboardTabs>
      </div>
    </DashboardShell>


  );
}

function ProductDialog({
  vendorId,
  vendorStatus,
  product,
  trigger,
}: {
  vendorId: string;
  vendorStatus: string;
  product?: ProductRow;
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const queryClient = useQueryClient();
  const { data: categories = [] } = useQuery(categoriesQuery());

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    
    if (!name) {
      toast.error("Le nom du produit est requis");
      return;
    }
    if (vendorStatus != "approved"){
      toast.error("Votre compte n'est pas encore approuvé par l'adiministrateur. Vous pouvez la contacter sur ce numéro +221 77 298 60 05");
      return;
    }
    const payload = {
      name,
      description: String(form.get("description") ?? "").trim() || null,
      brand: String(form.get("brand") ?? "").trim() || null,
      price: Number(form.get("price") ?? 0),
      compare_at_price: form.get("compare_at_price")
        ? Number(form.get("compare_at_price"))
        : null,
      stock: Number(form.get("stock") ?? 0),
      category_id: String(form.get("category_id") ?? "") || null,
      images,

    };

    setSaving(true);
    const { error } = product
      ? await supabase.from("products").update(payload).eq("id", product.id)
      : await supabase.from("products").insert({
          ...payload,
          vendor_id: vendorId,
          slug: uniqueSlug(name),
          status: "approved" as const,
        });
    setSaving(false);
    if (error) {
      toast.error("Enregistrement impossible", { description: error.message });
      return;
    }
    toast.success(product ? "Produit mis à jour" : "Produit ajouté avec succès");
    queryClient.invalidateQueries({ queryKey: ["vendor-products"] });
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setImages(product?.images ?? []);
      }}
    >
      <DialogTrigger asChild>
        {trigger ?? (
          <Button>
            <Plus className="size-4" /> Ajouter un produit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{product ? "Modifier le produit" : "Nouveau produit"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Nom *</Label>
            <Input id="name" name="name" defaultValue={product?.name ?? ""} required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="price">Prix (FCFA) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min={0}
                defaultValue={product?.price ?? ""}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="compare_at_price">Prix barré</Label>
              <Input
                id="compare_at_price"
                name="compare_at_price"
                type="number"
                min={0}
                defaultValue={product?.compare_at_price ?? ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min={0}
                defaultValue={product?.stock ?? 0}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="brand">Marque</Label>
              <Input id="brand" name="brand" defaultValue={product?.brand ?? ""} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="category_id">Catégorie</Label>
            <select
              id="category_id"
              name="category_id"
              defaultValue={product?.category_id ?? ""}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">— Choisir —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.parent_id ? "— " : ""}
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Photos du produit</Label>
            <ImageUploader value={images} onChange={setImages} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={4} defaultValue={product?.description ?? ""} />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={saving}>
              {saving ? <Loader2 className="size-4 animate-spin" /> : null}
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function WithdrawalForm({
  vendorId,
  balance,
  payoutMethod,
  payoutDetails,
}: {
  vendorId: string;
  balance: number;
  payoutMethod: string | null;
  payoutDetails: string | null;
}) {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);

  return (
    <form
      className="surface-card mt-6 grid gap-4 p-6 sm:grid-cols-[160px_1fr_auto] sm:items-end"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const amount = Number(form.get("amount") ?? 0);
        if (amount <= 0 || amount > balance) {
          toast.error("Montant invalide", { description: "Le montant dépasse votre solde." });
          return;
        }
        setSaving(true);
        const { error } = await supabase.from("withdrawals").insert({
          vendor_id: vendorId,
          amount,
          method: String(form.get("method") ?? payoutMethod ?? "wave"),
          details: String(form.get("details") ?? payoutDetails ?? ""),
        });
        setSaving(false);
        if (error) {
          toast.error("Demande impossible", { description: error.message });
          return;
        }
        toast.success("Demande de retrait envoyée");
        queryClient.invalidateQueries({ queryKey: ["vendor-withdrawals"] });
      }}
    >
      <div className="space-y-1.5">
        <Label htmlFor="amount">Montant à retirer</Label>
        <Input id="amount" name="amount" type="number" min={0} max={balance} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="details">Numéro / compte</Label>
        <Input id="details" name="details" defaultValue={payoutDetails ?? ""} />
      </div>
      <Button type="submit" disabled={saving || balance <= 0}>
        Demander un retrait
      </Button>
    </form>
  );
}

function ShopSettings({ vendor }: { vendor: Record<string, unknown> }) {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const value = (key: string) => (vendor[key] as string | null) ?? "";

  return (
    <form
      className="surface-card grid gap-4 p-6 sm:grid-cols-2"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        setSaving(true);
        const { error } = await supabase
          .from("vendors")
          .update({
            shop_name: String(form.get("shop_name") ?? "").trim(),
            phone: String(form.get("phone") ?? "").trim() || null,
            whatsapp: String(form.get("whatsapp") ?? "").trim() || null,
            city: String(form.get("city") ?? "").trim() || null,
            zone: String(form.get("zone") ?? "").trim() || null,
            address: String(form.get("address") ?? "").trim() || null,
            description: String(form.get("description") ?? "").trim() || null,
            logo_url: String(form.get("logo_url") ?? "").trim() || null,
            cover_url: String(form.get("cover_url") ?? "").trim() || null,
            opening_hours: String(form.get("opening_hours") ?? "").trim() || null,
            payout_details: String(form.get("payout_details") ?? "").trim() || null,
          })
          .eq("id", vendor["id"] as string);
        setSaving(false);
        if (error) {
          toast.error("Mise à jour impossible", { description: error.message });
          return;
        }
        toast.success("Boutique mise à jour");
        queryClient.invalidateQueries({ queryKey: ["my-vendor"] });
        queryClient.invalidateQueries({ queryKey: ["vendors"] });
        queryClient.invalidateQueries({ queryKey: ["vendor"] });
      }}
    >
      {[
        ["shop_name", "Nom de la boutique"],
        ["phone", "Téléphone"],
        ["whatsapp", "WhatsApp"],
        ["city", "Ville"],
        ["zone", "Zone"],
        ["address", "Adresse"],
        ["logo_url", "URL du logo"],
        ["cover_url", "URL de la couverture"],
        ["opening_hours", "Horaires"],
        ["payout_details", "Coordonnées de paiement"],
      ].map(([name, label]) => (
        <div key={name} className="space-y-1.5">
          <Label htmlFor={name!}>{label}</Label>
          <Input id={name!} name={name!} defaultValue={value(name!)} />
        </div>
      ))}
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={4} defaultValue={value("description")} />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="size-4 animate-spin" /> : null}
          Enregistrer
        </Button>
      </div>
    </form>
  );
}
