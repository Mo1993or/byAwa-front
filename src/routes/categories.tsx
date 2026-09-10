import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { categoriesQuery } from "@/lib/marketplace";
import { SmartImage } from "@/components/SmartImage";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Toutes les catégories — BYAWA" },
      {
        name: "description",
        content:
          "Parcourez toutes les catégories BYAWA : mode, électronique, électroménager, maison, cuisine, beauté, sport, alimentation et plus.",
      },
      { property: "og:title", content: "Toutes les catégories — BYAWA" },
      { property: "og:description", content: "Le catalogue complet de la marketplace BYAWA." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { data: categories = [], isLoading } = useQuery(categoriesQuery());
  const roots = categories.filter((c) => !c.parent_id);

  return (
    <div className="container-byawa py-10">
      <h1 className="text-3xl font-bold">Toutes les catégories</h1>
      <p className="mt-2 text-muted-foreground">
        Explorez l'ensemble du catalogue BYAWA, catégorie par catégorie.
      </p>

      {isLoading ? <p className="mt-8 text-muted-foreground">Chargement…</p> : null}

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {roots.map((root) => {
          const children = categories.filter((c) => c.parent_id === root.id);
          return (
            <section key={root.id} className="surface-card overflow-hidden">
              <Link to="/categorie/$slug" params={{ slug: root.slug }} className="block">
                <SmartImage
                  src={root.image_url}
                  alt={root.name}
                  width={768}
                  height={768}
                  className="h-36 w-full object-cover"
                />
              </Link>
              <div className="p-5">
              <Link
                to="/categorie/$slug"
                params={{ slug: root.slug }}
                className="font-display text-lg font-bold hover:text-primary"
              >
                {root.name}
              </Link>
              <ul className="mt-3 space-y-1.5">
                {children.map((child) => (
                  <li key={child.id}>
                    <Link
                      to="/categorie/$slug"
                      params={{ slug: child.slug }}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {child.name}
                    </Link>
                  </li>
                ))}
                {children.length === 0 ? (
                  <li className="text-sm text-muted-foreground">Voir les produits</li>
                ) : null}
              </ul>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
