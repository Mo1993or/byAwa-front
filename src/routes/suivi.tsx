import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, MapPin, Package, Phone, Truck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SmartImage } from "@/components/SmartImage";
import { formatDate, formatPrice } from "@/lib/format";
import { trackOrder, type TrackedOrder } from "@/lib/orders.functions";

export const Route = createFileRoute("/suivi")({
  validateSearch: (search: Record<string, unknown>): { ref?: string } =>
    typeof search['ref'] === "string" ? { ref: search['ref'] } : {},
  head: () => ({
    meta: [
      { title: "Suivre ma commande et mon livreur — BYAWA" },
      {
        name: "description",
        content: "Suivez l'état de votre commande BYAWA, la préparation du vendeur et la progression de votre livreur en temps réel.",
      },
      { property: "og:title", content: "Suivre ma commande — BYAWA" },
      { property: "og:description", content: "Suivi de commande et de livraison BYAWA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrackPage,
});

const ORDER_STEPS = [
  { key: "placed", label: "Commande reçue" },
  { key: "paid", label: "Paiement confirmé" },
  { key: "preparing", label: "En préparation" },
  { key: "shipped", label: "Expédiée" },
  { key: "delivering", label: "Livreur en route" },
  { key: "delivered", label: "Livrée" },
];

const DELIVERY_LABEL: Record<string, string> = {
  to_prepare: "À préparer par le vendeur",
  ready: "Colis prêt",
  assigned: "Livreur assigné",
  delivering: "Livreur en route",
  delivered: "Colis livré",
  failed: "Livraison échouée",
};

function TrackPage() {
  const { ref } = Route.useSearch();
  const fetchTracking = useServerFn(trackOrder);
  const [reference, setReference] = useState(ref ?? "");
  const [data, setData] = useState<TrackedOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function lookup(value: string) {
    if (!value.trim()) return;
    setLoading(true);
    setError(null);
    try {
      setData(await fetchTracking({ data: { reference: value.trim() } }));
    } catch (err) {
      setData(null);
      setError(err instanceof Error ? err.message : "Commande introuvable");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (ref) void lookup(ref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  const currentIndex = data ? ORDER_STEPS.findIndex((s) => s.key === data.order.status) : -1;

  return (
    <div className="container-byawa py-10">
      <h1 className="text-3xl font-bold">Suivre ma commande</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Entrez votre code de suivi ou votre numéro de commande — aucun compte nécessaire.
      </p>

      <form
        className="surface-card mt-6 flex flex-col gap-3 p-6 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          void lookup(reference);
        }}
      >
        <div className="flex-1 space-y-2">
          <Label htmlFor="ref">Code de suivi ou n° de commande</Label>
          <Input id="ref" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="BY-XXXX-123" />
        </div>
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : null} Suivre
        </Button>
      </form>

      {error ? <p className="mt-6 text-sm text-destructive">{error}</p> : null}

      {data ? (
        <div className="mt-8 space-y-6">
          <section className="surface-card p-6">
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-xl font-bold">Commande {data.order.order_number}</h2>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">{data.order.status}</span>
              <span className="ml-auto font-display text-xl font-extrabold text-primary">
                {formatPrice(data.order.total)}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Passée le {formatDate(data.order.created_at)} · Code de suivi{" "}
              <span className="font-mono font-semibold text-foreground">{data.order.track_token}</span>
            </p>

            <ol className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {ORDER_STEPS.map((step, i) => {
                const done = currentIndex >= i;
                return (
                  <li
                    key={step.key}
                    className={`rounded-xl border p-3 text-xs font-medium ${
                      done ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
                    }`}
                  >
                    {done ? <CheckCircle2 className="mb-1 size-4" /> : <Package className="mb-1 size-4" />}
                    {step.label}
                  </li>
                );
              })}
            </ol>

            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" />
              {[data.order.shipping_name, data.order.shipping_street, data.order.shipping_zone, data.order.shipping_city]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </section>

          {data.vendorOrders.map((vo) => {
            const delivery = vo.deliveries?.[0];
            const driver = delivery?.drivers;
            return (
              <section key={vo.id} className="surface-card p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-semibold">{vo.vendors?.shop_name ?? "Boutique"}</h3>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs">{vo.status}</span>
                  <span className="ml-auto text-sm font-semibold">{formatPrice(vo.subtotal)}</span>
                </div>

                <ul className="mt-4 space-y-3">
                  {vo.order_items?.map((it, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <SmartImage src={it.product_image} alt={it.product_name} className="size-14 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-sm font-medium">{it.product_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {it.quantity} × {formatPrice(it.unit_price)}
                        </p>
                      </div>
                      <span className="text-sm font-semibold">{formatPrice(it.total)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 rounded-xl border border-border bg-secondary/50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <Truck className="size-4 text-primary" />
                    {DELIVERY_LABEL[delivery?.status ?? "to_prepare"] ?? "En traitement"}
                  </p>
                  {driver ? (
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <User className="size-4" /> {driver.full_name} · {driver.vehicle ?? "Livreur BYAWA"}
                      </p>
                      {driver.phone ? (
                        <p className="flex items-center gap-2">
                          <Phone className="size-4" />
                          <a href={`tel:${driver.phone}`} className="hover:text-primary">
                            {driver.phone}
                          </a>
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Un livreur vous sera assigné dès que le vendeur aura préparé le colis.
                    </p>
                  )}
                  {delivery?.delivered_at ? (
                    <p className="mt-2 text-sm text-muted-foreground">Livré le {formatDate(delivery.delivered_at)}</p>
                  ) : null}
                </div>
              </section>
            );
          })}

          {data.events.length > 0 ? (
            <section className="surface-card p-6">
              <h3 className="font-semibold">Historique</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {data.events.map((e, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-medium text-foreground">{e.status}</span>
                    <span>{e.note}</span>
                    <span className="ml-auto">{formatDate(e.created_at)}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      ) : null}

      <p className="mt-10 text-sm text-muted-foreground">
        Besoin d'aide ? <Link to="/aide" className="font-medium text-primary hover:underline">Contactez le support BYAWA</Link>
      </p>
    </div>
  );
}
