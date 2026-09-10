import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { d as Star, p as ShoppingCart } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as Button, d as useCart } from "./router-CinPgn2I.mjs";
import { r as formatPrice, t as discountPercent } from "./format-igmN2sYS.mjs";
import { t as SmartImage } from "./SmartImage-W4xELWJj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-BjbuZOZu.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product }) {
	const { add } = useCart();
	const navigate = useNavigate();
	const discount = discountPercent(Number(product.price), Number(product.compare_at_price));
	const image = product.images?.[0] ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group surface-card relative flex h-full flex-col overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/produit/$slug",
			params: { slug: product.slug },
			className: "relative block aspect-square overflow-hidden bg-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
					src: image,
					alt: product.name,
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				}),
				discount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground",
					children: [
						"-",
						discount,
						"%"
					]
				}) : null,
				product.stock === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-3 top-3 rounded-full bg-night px-2.5 py-1 text-xs font-semibold text-night-foreground",
					children: "Rupture"
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-2 p-4",
			children: [
				product.vendors ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/boutique/$slug",
					params: { slug: product.vendors.slug },
					className: "text-xs font-medium text-muted-foreground hover:text-primary",
					children: product.vendors.shop_name
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/produit/$slug",
					params: { slug: product.slug },
					className: "line-clamp-2 text-sm font-semibold leading-snug hover:text-primary",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto space-y-2 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-gold text-gold" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: Number(product.rating).toFixed(1)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"(",
									product.reviews_count,
									")"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-auto",
									children: [product.sales_count, " vendus"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg font-bold",
								children: formatPrice(product.price)
							}), product.compare_at_price ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground line-through",
								children: formatPrice(product.compare_at_price)
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "w-full",
							disabled: product.stock === 0,
							onClick: () => {
								add({
									productId: product.id,
									slug: product.slug,
									name: product.name,
									image,
									price: Number(product.price),
									stock: product.stock,
									vendorId: product.vendor_id,
									vendorName: product.vendors?.shop_name ?? "Boutique",
									vendorSlug: product.vendors?.slug ?? ""
								});
								toast.success("Ajouté au panier", { description: product.name });
								navigate({ to: "/panier" });
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "size-4" }), "Ajouter"]
						})
					]
				})
			]
		})]
	});
}
function ProductGrid({ products }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
		children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
	});
}
//#endregion
export { ProductGrid as t };
