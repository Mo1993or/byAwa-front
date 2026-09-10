import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductGrid } from "@/components/ProductCard";
import { categoriesQuery, productsQuery, type ProductFilters } from "@/lib/marketplace";

type SearchParams = { q?: string };

export const Route = createFileRoute("/recherche")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
  }),
  head: () => ({
    meta: [
      { title: "Recherche — BYAWA" },
      {
        name: "description",
        content: "Recherchez parmi des milliers de produits BYAWA : filtrez par prix, catégorie, note et tri.",
      },
      { property: "og:title", content: "Recherche — BYAWA" },
      { property: "og:description", content: "Trouvez le produit qu'il vous faut sur BYAWA." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [term, setTerm] = useState(q ?? "");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<NonNullable<ProductFilters["sort"]>>("best");

  const { data: categories = [] } = useQuery(categoriesQuery());
  const { data: products = [], isLoading } = useQuery(
    productsQuery({
      search: q || undefined,
      categorySlug: category === "all" ? undefined : category,
      sort,
    }),
  );

  return (
    <div className="container-byawa py-8">
      <h1 className="text-2xl font-bold">
        {q ? `Résultats pour « ${q} »` : "Rechercher sur BYAWA"}
      </h1>

      <form
        className="mt-5 flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          void navigate({ search: { q: term } });
        }}
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Nom de produit, marque, catégorie…"
            className="h-11 pl-10"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-11 sm:w-56">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categories
              .filter((c) => !c.parent_id)
              .map((c) => (
                <SelectItem key={c.id} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(v) => setSort(v as NonNullable<ProductFilters["sort"]>)}>
          <SelectTrigger className="h-11 sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="best">Pertinence</SelectItem>
            <SelectItem value="price_asc">Prix croissant</SelectItem>
            <SelectItem value="price_desc">Prix décroissant</SelectItem>
            <SelectItem value="new">Nouveautés</SelectItem>
            <SelectItem value="rated">Mieux notés</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" size="lg" className="h-11">
          Rechercher
        </Button>
      </form>

      <p className="mt-4 text-sm text-muted-foreground">
        {isLoading ? "Recherche en cours…" : `${products.length} produit(s) trouvé(s)`}
      </p>

      <div className="mt-6">
        {products.length === 0 && !isLoading ? (
          <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
            Aucun résultat. Essayez un autre mot-clé ou changez de catégorie.
          </p>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}
