import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, Store, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { formatPrice } from "@/lib/format";
import { SmartImage } from "@/components/SmartImage";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Mon panier — BYAWA" },
      { name: "description", content: "Vérifiez vos articles, les vendeurs et le total avant de commander sur BYAWA." },
      { property: "og:title", content: "Mon panier — BYAWA" },
      { property: "og:description", content: "Panier multi-vendeurs BYAWA." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, setQuantity, remove, clear } = useCart();
  const { user } = useAuth();

  const vendors = Array.from(new Set(lines.map((l) => l.vendorId)));
  const deliveryFee = vendors.length;

  if (lines.length === 0) {
    return (
      <div className="container-byawa py-20 text-center">
        <ShoppingBag className="mx-auto size-14 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Votre panier est vide</h1>
        <p className="mt-2 text-muted-foreground">Parcourez le catalogue et ajoutez vos premiers articles.</p>
        <Button asChild className="mt-6" size="lg">
          <Link to="/categories">Explorer le catalogue</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-byawa py-8">
      <h1 className="text-3xl font-bold">Mon panier</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {lines.length} article(s) · {vendors.length} vendeur(s)
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          {vendors.map((vendorId) => {
            const vendorLines = lines.filter((l) => l.vendorId === vendorId);
            const first = vendorLines[0]!;
            const vendorTotal = vendorLines.reduce((s, l) => s + l.price * l.quantity, 0);
            return (
              <section key={vendorId} className="surface-card overflow-hidden">
                <header className="flex items-center gap-2 border-b border-border bg-secondary px-5 py-3">
                  <Store className="size-4 text-primary" />
                  <Link
                    to="/boutique/$slug"
                    params={{ slug: first.vendorSlug }}
                    className="text-sm font-semibold hover:text-primary"
                  >
                    {first.vendorName}
                  </Link>
                  <span className="ml-auto text-sm font-semibold">{formatPrice(vendorTotal)}</span>
                </header>

                <ul className="divide-y divide-border">
                  {vendorLines.map((line) => (
                    <li key={line.productId} className="flex gap-4 p-4">
                      <SmartImage
                        src={line.image}
                        alt={line.name}
                        className="size-20 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <Link
                          to="/produit/$slug"
                          params={{ slug: line.slug }}
                          className="line-clamp-2 text-sm font-medium hover:text-primary"
                        >
                          {line.name}
                        </Link>
                        <p className="mt-1 text-sm font-bold text-primary">{formatPrice(line.price)}</p>

                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center rounded-lg border border-border">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              onClick={() => setQuantity(line.productId, line.quantity - 1)}
                            >
                              <Minus className="size-3.5" />
                            </Button>
                            <span className="w-9 text-center text-sm font-semibold">{line.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              onClick={() => setQuantity(line.productId, line.quantity + 1)}
                            >
                              <Plus className="size-3.5" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => remove(line.productId)}
                          >
                            <Trash2 className="size-4" /> Retirer
                          </Button>
                        </div>
                      </div>
                      <span className="hidden text-sm font-semibold sm:block">
                        {formatPrice(line.price * line.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          <Button variant="ghost" className="text-destructive" onClick={clear}>
            <Trash2 className="size-4" /> Vider le panier
          </Button>
        </div>

        <aside className="surface-card h-fit space-y-4 p-6 lg:sticky lg:top-32">
          <h2 className="text-lg font-bold">Récapitulatif</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Livraison estimée ({vendors.length} vendeur(s))</span>
              <span className="font-medium">{formatPrice(deliveryFee)}</span>
            </div>
          </div>
          <Separator />
          <div className="flex items-baseline justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-display text-2xl font-extrabold text-primary">
              {formatPrice(subtotal + deliveryFee)}
            </span>
          </div>

          <Button asChild size="lg" className="w-full">
            <Link to="/commander">Commander maintenant</Link>
          </Button>

          {user ? null : (
            <p className="text-center text-xs text-muted-foreground">
              Commande possible sans compte —{" "}
              <Link to="/auth" className="font-medium text-primary hover:underline">
                se connecter
              </Link>{" "}
              pour retrouver l'historique.
            </p>
          )}

          <p className="text-xs text-muted-foreground">
            Le montant final (livraison par zone, coupons, commissions) est calculé côté serveur lors du
            passage de commande.
          </p>
        </aside>
      </div>
    </div>
  );
}
