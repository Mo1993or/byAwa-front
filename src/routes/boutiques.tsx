import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Star, MapPin } from "lucide-react";
import { vendorsQuery } from "@/lib/marketplace";
import { SmartImage } from "@/components/SmartImage";

export const Route = createFileRoute("/boutiques")({
  head: () => ({
    meta: [
      { title: "Boutiques vérifiées — BYAWA" },
      {
        name: "description",
        content:
          "Découvrez les boutiques vérifiées de BYAWA : mode, high-tech, maison, beauté, alimentation. Achetez directement auprès des vendeurs.",
      },
      { property: "og:title", content: "Boutiques vérifiées — BYAWA" },
      { property: "og:description", content: "Toutes les boutiques partenaires de la marketplace BYAWA." },
    ],
  }),
  component: VendorsPage,
});

function VendorsPage() {
  const { data: vendors = [], isLoading } = useQuery(vendorsQuery());

  return (
    <div className="container-byawa py-10">
      <h1 className="text-3xl font-bold">Nos boutiques</h1>
      <p className="mt-2 text-muted-foreground">
        {isLoading ? "Chargement…" : `${vendors.length} boutiques vérifiées par l'équipe BYAWA.`}
      </p>

      {!isLoading && vendors.length === 0 ? (
        <div className="surface-card mt-8 p-10 text-center text-muted-foreground">
          Aucune boutique vérifiée pour le moment.{" "}
          <Link to="/devenir-vendeur" className="font-semibold text-primary">
            Ouvrez la vôtre
          </Link>
          .
        </div>
      ) : null}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {vendors.map((v) => (
          <Link
            key={v.id}
            to="/boutique/$slug"
            params={{ slug: v.slug }}
            className="surface-card group overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)]"
          >
            {v.cover_url ? (
              <SmartImage src={v.cover_url} alt={v.shop_name} className="h-32 w-full object-cover" />
            ) : null}
            <div className="space-y-3 p-5">
              <div className="flex items-center gap-3">
                {v.logo_url ? (
                  <SmartImage src={v.logo_url} alt={v.shop_name} className="size-12 shrink-0 rounded-full object-cover" />
                ) : null}
                <div className="min-w-0">
                  <p className="truncate font-semibold group-hover:text-primary">{v.shop_name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" /> {v.city} · {v.zone}
                  </p>
                </div>
                <span className="ml-auto flex items-center gap-1 text-sm">
                  <Star className="size-4 fill-gold text-gold" />
                  {Number(v.rating).toFixed(1)}
                </span>
              </div>
              <p className="line-clamp-2 text-sm text-muted-foreground">{v.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
