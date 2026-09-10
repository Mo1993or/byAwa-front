import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Category = {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  icon: string | null;
  image_url: string | null;
  position: number;
};

export type VendorLite = {
  id: string;
  shop_name: string;
  slug: string;
  city: string | null;
  logo_url: string | null;
  rating: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  brand: string | null;
  price: number;
  compare_at_price: number | null;
  stock: number;
  images: string[];
  rating: number;
  reviews_count: number;
  sales_count: number;
  is_featured: boolean;
  category_id: string | null;
  vendor_id: string;
  created_at: string;
  vendors?: VendorLite | null;
  categories?: { name: string; slug: string } | null;
};

const PRODUCT_SELECT =
  "id,name,slug,description,brand,price,compare_at_price,stock,images,rating,reviews_count,sales_count,is_featured,category_id,vendor_id,created_at,vendors(id,shop_name,slug,city,logo_url,rating),categories(name,slug)";

export const categoriesQuery = () =>
  queryOptions({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from("categories")
        .select("id,parent_id,name,slug,icon,image_url,position")
        .eq("is_active", true)
        .order("position");
      if (error) throw error;
      return (data ?? []) as Category[];
    },
    staleTime: 5 * 60 * 1000,
  });

export const bannersQuery = () =>
  queryOptions({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("banners")
        .select("id,title,subtitle,image_url,link,position")
        .eq("is_active", true)
        .order("position");
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });

export const vendorsQuery = () =>
  queryOptions({
    queryKey: ["vendors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vendors")
        .select("id,shop_name,slug,city,zone,logo_url,cover_url,description,rating,is_featured")
        .eq("status", "approved")
        .order("rating", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 30 * 1000,
  });

export const vendorQuery = (slug: string) =>
  queryOptions({
    queryKey: ["vendor", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vendors")
        .select("*")
        .eq("slug", slug)
        .eq("status", "approved")
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 30 * 1000,
  });

export type ProductFilters = {
  categorySlug?: string | undefined;
  vendorSlug?: string | undefined;
  search?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  sort?: "relevance" | "price_asc" | "price_desc" | "new" | "best" | "rated" | undefined;
  featured?: boolean | undefined;
  limit?: number | undefined;
  adminView?: boolean | undefined;
};

export const productsQuery = (filters: ProductFilters = {}) =>
  queryOptions({
    queryKey: ["products", filters],
    queryFn: async (): Promise<Product[]> => {
      let categoryIds: string[] | null = null;
      if (filters.categorySlug) {
        const { data: cats, error: catErr } = await supabase
          .from("categories")
          .select("id,parent_id,slug");
        if (catErr) throw catErr;
        const root = (cats ?? []).find((c) => c.slug === filters.categorySlug);
        if (!root) return [];
        categoryIds = [
          root.id,
          ...(cats ?? []).filter((c) => c.parent_id === root.id).map((c) => c.id),
        ];
      }

      let vendorId: string | null = null;
      if (filters.vendorSlug) {
        const { data: vendor } = await supabase
          .from("vendors")
          .select("id")
          .eq("slug", filters.vendorSlug)
          .maybeSingle();
        if (!vendor) return [];
        vendorId = vendor.id;
      }

      let query = supabase.from("products").select(PRODUCT_SELECT);

      // Par défaut, on ne montre que les produits approuvés au public.
      // Exception : sur la page d'une boutique spécifique, on laisse la logique de filtrage (status) 
      // être gérée par les RLS ou on filtre explicitement si on veut restreindre au public.
      // Les produits sont maintenant approuvés par défaut à la création,
      // mais on garde le filtre "approved" pour exclure les produits désactivés/brouillons.
      if (!filters.adminView) {
        query = query.eq("status", "approved");
      }

      if (categoryIds) query = query.in("category_id", categoryIds);
      if (vendorId) query = query.eq("vendor_id", vendorId);
      if (filters.featured) query = query.eq("is_featured", true);
      if (filters.search) {
        query = query.or(
          `name.ilike.%${filters.search}%,brand.ilike.%${filters.search}%,description.ilike.%${filters.search}%`,
        );
      }
      if (filters.minPrice != null) query = query.gte("price", filters.minPrice);
      if (filters.maxPrice != null) query = query.lte("price", filters.maxPrice);

      switch (filters.sort) {
        case "price_asc":
          query = query.order("price", { ascending: true });
          break;
        case "price_desc":
          query = query.order("price", { ascending: false });
          break;
        case "new":
          query = query.order("created_at", { ascending: false });
          break;
        case "rated":
          query = query.order("rating", { ascending: false });
          break;
        default:
          query = query.order("sales_count", { ascending: false });
      }

      const { data, error } = await query.limit(filters.limit ?? 48);
      if (error) throw error;
      return (data ?? []) as unknown as Product[];
    },
  });

export const productQuery = (slug: string) =>
  queryOptions({
    queryKey: ["product", slug],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from("products")
        .select(PRODUCT_SELECT)
        .eq("slug", slug)
        .eq("status", "approved")
        .maybeSingle();
      if (error) throw error;
      return (data as unknown as Product) ?? null;
    },
  });

export const reviewsQuery = (productId: string) =>
  queryOptions({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("id,rating,comment,author_name,created_at")
        .eq("product_id", productId)
        .eq("is_approved", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
