import { Link, useNavigate } from "@tanstack/react-router";
import { Star, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { discountPercent, formatPrice } from "@/lib/format";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/lib/marketplace";
import { SmartImage } from "@/components/SmartImage";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const navigate = useNavigate();
  const discount = discountPercent(Number(product.price), Number(product.compare_at_price));
  const image = product.images?.[0] ?? null;

  return (
    <article className="group surface-card relative flex h-full flex-col overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)]">
      <Link
        to="/produit/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <SmartImage
          src={image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount ? (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
            -{discount}%
          </span>
        ) : null}
        {product.stock === 0 ? (
          <span className="absolute right-3 top-3 rounded-full bg-night px-2.5 py-1 text-xs font-semibold text-night-foreground">
            Rupture
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.vendors ? (
          <Link
            to="/boutique/$slug"
            params={{ slug: product.vendors.slug }}
            className="text-xs font-medium text-muted-foreground hover:text-primary"
          >
            {product.vendors.shop_name}
          </Link>
        ) : null}

        <Link
          to="/produit/$slug"
          params={{ slug: product.slug }}
          className="line-clamp-2 text-sm font-semibold leading-snug hover:text-primary"
        >
          {product.name}
        </Link>

        <div className="mt-auto space-y-2 pt-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-gold text-gold" />
            <span className="font-semibold text-foreground">{Number(product.rating).toFixed(1)}</span>
            <span>({product.reviews_count})</span>
            <span className="ml-auto">{product.sales_count} vendus</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold">{formatPrice(product.price)}</span>
            {product.compare_at_price ? (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            ) : null}
          </div>

          <Button
            size="sm"
            className="w-full"
            disabled={product.stock === 0}
            onClick={() => {
              add({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image,
                price: Number(product.price),
                stock: product.stock,
                vendorId: product.vendor_id,
                vendorName: product.vendors?.shop_name ?? "Boutique",
                vendorSlug: product.vendors?.slug ?? "",
              });
              toast.success("Ajouté au panier", { description: product.name });
              void navigate({ to: "/panier" });
            }}
          >
            <ShoppingCart className="size-4" />
            Ajouter
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
