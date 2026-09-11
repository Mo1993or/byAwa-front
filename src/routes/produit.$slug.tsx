import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Minus, Plus, ShoppingCart, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductGrid } from "@/components/ProductCard";
import { discountPercent, formatDate, formatPrice } from "@/lib/format";
import { productQuery, productsQuery, reviewsQuery } from "@/lib/marketplace";
import { useCart } from "@/hooks/useCart";
import { SmartImage } from "@/components/SmartImage";

export const Route = createFileRoute("/produit/$slug")({
  head: ({ params }) => {
  const label = params.slug.replace(/-/g, " ");

  return {
    meta: [
      {
        title: `${label} — BYAWA Marketplace Sénégal`,
      },
      {
        name: "description",
        content:
          `Achetez ${label} au Sénégal sur BYAWA. Découvrez ce produit, son vendeur et profitez de la livraison avec paiement à la livraison.`,
      },
      {
        name: "robots",
        content: "index, follow",
      },
      {
        property: "og:title",
        content: `${label} — BYAWA Marketplace Sénégal`,
      },
      {
        property: "og:description",
        content:
          `Découvrez ${label} sur BYAWA, la marketplace sénégalaise. Livraison au Sénégal et paiement à la livraison.`,
      },
      {
        property: "og:type",
        content: "product",
      },
      {
        property: "og:url",
        content: `https://byawamarketplace.com/produit/${params.slug}`,
      },
    ],
  };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { add } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { data: product, isLoading } = useQuery(productQuery(slug));
  const { data: reviews = [] } = useQuery({
    ...reviewsQuery(product?.id ?? ""),
    enabled: Boolean(product?.id),
  });
  const { data: related = [] } = useQuery({
    ...productsQuery({ vendorSlug: product?.vendors?.slug, limit: 5 }),
    enabled: Boolean(product?.vendors?.slug),
  });

  if (isLoading) {
    return <div className="container-byawa py-16 text-muted-foreground">Chargement du produit…</div>;
  }

  if (!product) {
    return (
      <div className="container-byawa py-20 text-center">
        <h1 className="text-2xl font-bold">Produit introuvable</h1>
        <p className="mt-2 text-muted-foreground">Ce produit n'existe plus ou n'est pas encore validé.</p>
        <Button asChild className="mt-6">
          <Link to="/categories">Voir le catalogue</Link>
        </Button>
      </div>
    );
  }

  const discount = discountPercent(Number(product.price), Number(product.compare_at_price));
  const images = product.images?.length ? product.images : [];
  const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description || `Découvrez ${product.name} sur BYAWA.`,
  image: images,
  sku: product.id,
  brand: product.brand
    ? {
        "@type": "Brand",
        name: product.brand,
      }
    : undefined,
  offers: {
    "@type": "Offer",
    url: `https://byawamarketplace.com/produit/${product.slug}`,
    priceCurrency: "XOF",
    price: Number(product.price),
    availability:
      product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
  },
};

  return (
    <div className="container-byawa py-8">
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(productJsonLd),
  }}
/>
      <nav className="mb-5 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Accueil</Link>
        <span className="px-2">/</span>
        {product.categories ? (
          <>
            <Link to="/categorie/$slug" params={{ slug: product.categories.slug }} className="hover:text-primary">
              {product.categories.name}
            </Link>
            <span className="px-2">/</span>
          </>
        ) : null}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="grid gap-6 md:grid-cols-[92px_minmax(0,1fr)]">
          <div className="order-2 flex gap-3 md:order-1 md:flex-col">
            {images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`size-20 overflow-hidden rounded-lg border-2 ${
                  i === activeImage ? "border-primary" : "border-border"
                }`}
              >
                <SmartImage src={img} alt={product.name} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="order-1 md:order-2">
            <div className="surface-card relative overflow-hidden">
              <SmartImage
                src={images[activeImage]}
                alt={product.name}
                eager
                className="aspect-square w-full object-cover"
              />
              {discount ? (
                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
                  -{discount}%
                </span>
              ) : null}
            </div>

            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-bold">Description</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              {product.brand ? (
                <p className="text-sm">
                  <span className="text-muted-foreground">Marque : </span>
                  <span className="font-medium">{product.brand}</span>
                </p>
              ) : null}
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold">Avis clients ({reviews.length})</h2>
              {reviews.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Aucun avis pour l'instant. Soyez le premier à noter ce produit après votre achat.
                </p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {reviews.map((r) => (
                    <li key={r.id} className="surface-card p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`size-4 ${i < r.rating ? "fill-gold text-gold" : "text-border"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{r.author_name ?? "Client BYAWA"}</span>
                        <span className="ml-auto text-xs text-muted-foreground">{formatDate(r.created_at)}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <div className="surface-card space-y-4 p-5">
            <h1 className="text-2xl font-bold leading-snug">{product.name}</h1>

            <div className="flex items-center gap-2 text-sm">
              <Star className="size-4 fill-gold text-gold" />
              <span className="font-semibold">{Number(product.rating).toFixed(1)}</span>
              <span className="text-muted-foreground">· {product.sales_count} vendus</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-extrabold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.compare_at_price ? (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.compare_at_price)}
                </span>
              ) : null}
            </div>

            <p className={`text-sm ${product.stock > 0 ? "text-success" : "text-destructive"}`}>
              {product.stock > 0 ? `En stock (${product.stock} disponibles)` : "Rupture de stock"}
            </p>

            <Separator />

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Quantité</span>
              <div className="flex items-center rounded-lg border border-border">
                <Button variant="ghost" size="icon" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  <Minus className="size-4" />
                </Button>
                <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.min(product.stock || 1, q + 1))}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              disabled={product.stock === 0}
              onClick={() => {
                add(
                  {
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    image: images[0] ?? null,
                    price: Number(product.price),
                    stock: product.stock,
                    vendorId: product.vendor_id,
                    vendorName: product.vendors?.shop_name ?? "Boutique",
                    vendorSlug: product.vendors?.slug ?? "",
                  },
                  quantity,
                );
                toast.success("Ajouté au panier", { description: `${quantity} × ${product.name}` });
                void navigate({ to: "/panier" });
              }}
            >
              <ShoppingCart className="size-5" /> Ajouter au panier
            </Button>

            <Button asChild variant="secondary" size="lg" className="w-full">
              <Link to="/panier">Voir mon panier</Link>
            </Button>
          </div>

          {product.vendors ? (
            <div className="surface-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Vendu par</p>
              <Link
                to="/boutique/$slug"
                params={{ slug: product.vendors.slug }}
                className="mt-2 flex items-center gap-3"
              >
                <SmartImage
                  src={product.vendors.logo_url}
                  alt={product.vendors.shop_name}
                  className="size-11 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold hover:text-primary">{product.vendors.shop_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.vendors.city} · ⭐ {Number(product.vendors.rating).toFixed(1)}
                  </p>
                </div>
              </Link>
            </div>
          ) : null}

          <ul className="surface-card space-y-3 p-5 text-sm">
            <li className="flex items-center gap-3">
              <Truck className="size-4 text-primary" /> Livraison sous 1 à 4 jours
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="size-4 text-primary" /> Paiement à la livraison possible
            </li>
            <li className="flex items-center gap-3">
              <RotateCcw className="size-4 text-primary" /> Retour sous 7 jours
            </li>
          </ul>
        </aside>
      </div>

      {related.length > 1 ? (
        <section className="mt-14">
          <h2 className="mb-5 text-xl font-bold">Autres produits de la boutique</h2>
          <ProductGrid products={related.filter((p) => p.id !== product.id)} />
        </section>
      ) : null}
    </div>
    
  );
}
