import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as MapPin, C as Phone, a as Truck, d as Star } from "../_libs/lucide-react.mjs";
import { T as Button, _ as vendorQuery, h as productsQuery, i as Route$2 } from "./router-CinPgn2I.mjs";
import { t as SmartImage } from "./SmartImage-W4xELWJj.mjs";
import { t as ProductGrid } from "./ProductCard-BjbuZOZu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/boutique._slug-BuItBbWH.js
var import_jsx_runtime = require_jsx_runtime();
function VendorPage() {
	const { slug } = Route$2.useParams();
	const { data: vendor, isLoading } = useQuery(vendorQuery(slug));
	const { data: products = [] } = useQuery(productsQuery({ vendorSlug: slug }));
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-byawa py-16 text-muted-foreground",
		children: "Chargement…"
	});
	if (!vendor) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold",
			children: "Boutique introuvable"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/boutiques",
				children: "Voir toutes les boutiques"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative h-48 w-full overflow-hidden bg-night sm:h-64",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
				src: vendor.cover_url,
				alt: vendor.shop_name,
				eager: true,
				className: "h-full w-full object-cover opacity-80"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-byawa -mt-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card flex flex-col gap-4 p-6 sm:flex-row sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
							src: vendor.logo_url,
							alt: vendor.shop_name,
							eager: true,
							className: "size-20 shrink-0 rounded-2xl border-4 border-card object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-bold",
								children: vendor.shop_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }),
											" ",
											vendor.city,
											" · ",
											vendor.zone
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-gold text-gold" }),
											" ",
											Number(vendor.rating).toFixed(1)
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4" }),
											" ",
											products.length,
											" produits"
										]
									})
								]
							})]
						}),
						vendor.whatsapp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `https://wa.me/${vendor.whatsapp.replace(/\D/g, "")}`,
								target: "_blank",
								rel: "noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), " Contacter"]
							})
						}) : null
					]
				}),
				vendor.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground",
					children: vendor.description
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-5 mt-10 text-xl font-bold",
					children: "Produits de la boutique"
				}),
				products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground",
					children: "Cette boutique n'a pas encore de produits publiés."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGrid, { products })
			]
		})]
	});
}
//#endregion
export { VendorPage as component };
