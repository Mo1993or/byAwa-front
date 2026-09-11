import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductGrid } from "@/components/ProductCard";
import { categoriesQuery, productsQuery, type ProductFilters } from "@/lib/marketplace";

export const Route = createFileRoute("/categorie/$slug")({
  head: ({ params }) => {
  const label = params.slug.replace(/-/g, " ");

  return {
    meta: [
      {
        title: `${label} au Sénégal — BYAWA Marketplace`,
      },
      {
        name: "description",
        content:
          `Découvrez et achetez des produits ${label} sur BYAWA, la marketplace sénégalaise. Produits de vendeurs vérifiés, livraison partout au Sénégal et paiement à la livraison.`,
      },
      {
        name: "robots",
        content: "index, follow",
      },
      {
        property: "og:title",
        content: `${label} au Sénégal — BYAWA Marketplace`,
      },
      {
        property: "og:description",
        content:
          `Découvrez les meilleurs produits ${label} sur BYAWA. Achetez auprès de vendeurs vérifiés avec livraison partout au Sénégal.`,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: `https://byawamarketplace.com/categorie/${params.slug}`,
      },
    ],
  };
},
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const [sort, setSort] = useState<NonNullable<ProductFilters["sort"]>>("best");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { data: categories = [] } = useQuery(categoriesQuery());
  const category = categories.find((c) => c.slug === slug);
  const siblings = categories.filter((c) => c.parent_id === (category?.parent_id ?? category?.id));

  const { data: products = [], isLoading } = useQuery(
    productsQuery({
      categorySlug: slug,
      sort,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    }),
  );

  return (
    <div className="container-byawa py-8">
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Accueil
        </Link>
        <span className="px-2">/</span>
        <Link to="/categories" className="hover:text-primary">
          Catégories
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{category?.name ?? slug}</span>
      </nav>

      <h1 className="text-3xl font-bold">{category?.name ?? slug}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {isLoading ? "Chargement…" : `${products.length} produit(s) disponible(s)`}
      </p>

      {siblings.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {siblings.map((s) => (
            <Link
              key={s.id}
              to="/categorie/$slug"
              params={{ slug: s.slug }}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                s.slug === slug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              }`}
            >
              {s.name}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card p-4">
        <div className="w-28">
          <label className="mb-1 block text-xs text-muted-foreground">Prix min</label>
          <Input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} inputMode="numeric" placeholder="0" />
        </div>
        <div className="w-28">
          <label className="mb-1 block text-xs text-muted-foreground">Prix max</label>
          <Input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} inputMode="numeric" placeholder="500000" />
        </div>
        <div className="w-52">
          <label className="mb-1 block text-xs text-muted-foreground">Trier par</label>
          <Select value={sort} onValueChange={(v) => setSort(v as NonNullable<ProductFilters["sort"]>)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="best">Meilleures ventes</SelectItem>
              <SelectItem value="new">Nouveautés</SelectItem>
              <SelectItem value="price_asc">Prix croissant</SelectItem>
              <SelectItem value="price_desc">Prix décroissant</SelectItem>
              <SelectItem value="rated">Mieux notés</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {minPrice || maxPrice ? (
          <Button
            variant="ghost"
            onClick={() => {
              setMinPrice("");
              setMaxPrice("");
            }}
          >
            Réinitialiser
          </Button>
        ) : null}
      </div>

      <div className="mt-8">
        {products.length === 0 && !isLoading ? (
          <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
            Aucun produit dans cette catégorie pour le moment.
          </p>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}
