import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { formatPrice } from "@/lib/format";
import { createOrder } from "@/lib/orders.functions";

export const Route = createFileRoute("/commander")({
  head: () => ({
    meta: [
      { title: "Commander sans compte — BYAWA" },
      {
        name: "description",
        content: "Finalisez votre commande BYAWA en quelques secondes, avec ou sans compte, et payez à la livraison.",
      },
      { property: "og:title", content: "Commander sans compte — BYAWA" },
      { property: "og:description", content: "Commande express BYAWA : livraison suivie partout au Sénégal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

const PAYMENTS = [
  { id: "cod", label: "Paiement à la livraison" },
  { id: "wave", label: "Wave" },
  { id: "orange_money", label: "Orange Money" },
];

function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const submitOrder = useServerFn(createOrder);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Dakar",
    zone: "",
    street: "",
    details: "",
    paymentMethod: "cod",
  });

  useEffect(() => {
    if (user?.email) setForm((f) => (f.email ? f : { ...f, email: user.email! }));
  }, [user]);

  const vendors = Array.from(new Set(lines.map((l) => l.vendorId)));
  const deliveryFee = vendors.length * 1500;

  if (lines.length === 0) {
    return (
      <div className="container-byawa py-20 text-center">
        <h1 className="text-2xl font-bold">Votre panier est vide</h1>
        <Button asChild className="mt-6" size="lg">
          <Link to="/categories">Explorer le catalogue</Link>
        </Button>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitOrder({
        data: {
          lines: lines.map((l) => ({ productId: l.productId, quantity: l.quantity })),
          ...form,
        },
      });
      clear();
      toast.success("Commande enregistrée", { description: res.orderNumber });
      navigate({ to: "/suivi", search: { ref: res.trackToken } });
    } catch (err) {
      toast.error("Commande impossible", {
        description: err instanceof Error ? err.message : "Réessayez dans un instant.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-byawa py-10">
      <h1 className="text-3xl font-bold">Finaliser ma commande</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Pas besoin de compte : renseignez vos coordonnées de livraison et suivez votre commande avec le code reçu.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="surface-card space-y-4 p-6">
            <h2 className="text-lg font-bold">Coordonnées</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet *</Label>
                <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  required
                  placeholder="+221 77 000 00 00"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">E-mail (facultatif)</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
          </section>

          <section className="surface-card space-y-4 p-6">
            <h2 className="text-lg font-bold">Adresse de livraison</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">Ville *</Label>
                <Input id="city" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zone">Quartier / zone</Label>
                <Input id="zone" value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="street">Rue / repère</Label>
                <Input id="street" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="details">Instructions pour le livreur</Label>
                <Textarea id="details" rows={3} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
              </div>
            </div>
          </section>

          <section className="surface-card space-y-3 p-6">
            <h2 className="text-lg font-bold">Paiement</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {PAYMENTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setForm({ ...form, paymentMethod: p.id })}
                  className={`rounded-xl border p-4 text-sm font-medium transition-colors ${
                    form.paymentMethod === p.id ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Le paiement mobile est confirmé par le vendeur après la commande.
            </p>
          </section>
        </div>

        <aside className="surface-card h-fit space-y-4 p-6 lg:sticky lg:top-32">
          <h2 className="text-lg font-bold">Récapitulatif</h2>
          <ul className="space-y-2 text-sm">
            {lines.map((l) => (
              <li key={l.productId} className="flex justify-between gap-3">
                <span className="line-clamp-1 text-muted-foreground">
                  {l.quantity} × {l.name}
                </span>
                <span className="font-medium">{formatPrice(l.price * l.quantity)}</span>
              </li>
            ))}
          </ul>
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Sous-total</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Livraison estimée</span>
            <span className="font-medium">{formatPrice(deliveryFee)}</span>
          </div>
          <Separator />
          <div className="flex items-baseline justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-display text-2xl font-extrabold text-primary">{formatPrice(subtotal + deliveryFee)}</span>
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            Confirmer la commande
          </Button>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" /> Vendeurs vérifiés BYAWA
          </p>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Truck className="size-4 text-primary" /> Suivi livreur en temps réel après validation
          </p>
        </aside>
      </form>
    </div>
  );
}
