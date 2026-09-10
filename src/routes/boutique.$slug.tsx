import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Phone, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/ProductCard";
import { productsQuery, vendorQuery } from "@/lib/marketplace";
import { SmartImage } from "@/components/SmartImage";

export const Route = createFileRoute("/boutique/$slug")({
  head: ({ params }) => {
    const label = params.slug.replace(/-/g, " ");
    return {
      meta: [
        { title: `Boutique ${label} — BYAWA` },
        { name: "description", content: `Découvrez les produits de la boutique ${label} sur BYAWA, vendeur vérifié.` },
        { property: "og:title", content: `Boutique ${label} — BYAWA` },
        { property: "og:description", content: `Catalogue complet de la boutique ${label} sur BYAWA.` },
      ],
    };
  },
  component: VendorPage,
});

function VendorPage() {
  const { slug } = Route.useParams();
  const { data: vendor, isLoading } = useQuery(vendorQuery(slug));
  const { data: products = [] } = useQuery(productsQuery({ vendorSlug: slug }));

  if (isLoading) return <div className="container-byawa py-16 text-muted-foreground">Chargement…</div>;

  if (!vendor) {
    return (
      <div className="container-byawa py-20 text-center">
        <h1 className="text-2xl font-bold">Boutique introuvable</h1>
        <Button asChild className="mt-6">
          <Link to="/boutiques">Voir toutes les boutiques</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="relative h-48 w-full overflow-hidden bg-night sm:h-64">
        <SmartImage
          src={vendor.cover_url}
          alt={vendor.shop_name}
          eager
          className="h-full w-full object-cover opacity-80"
        />
      </div>

      <div className="container-byawa -mt-14">
        <div className="surface-card flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <SmartImage
            src={vendor.logo_url}
            alt={vendor.shop_name}
            eager
            className="size-20 shrink-0 rounded-2xl border-4 border-card object-cover"
          />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold">{vendor.shop_name}</h1>
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="size-4" /> {vendor.city} · {vendor.zone}
              </span>
              <span className="flex items-center gap-1">
                <Star className="size-4 fill-gold text-gold" /> {Number(vendor.rating).toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Truck className="size-4" /> {products.length} produits
              </span>
            </p>
          </div>
          {vendor.whatsapp ? (
            <Button asChild variant="secondary">
              <a href={`https://wa.me/${vendor.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                <Phone className="size-4" /> Contacter
              </a>
            </Button>
          ) : null}
        </div>

        {vendor.description ? (
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">{vendor.description}</p>
        ) : null}

        <h2 className="mb-5 mt-10 text-xl font-bold">Produits de la boutique</h2>
        {products.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
            Cette boutique n'a pas encore de produits publiés.
          </p>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}
