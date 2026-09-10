import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { T as Button, h as productsQuery, p as categoriesQuery, r as Route$1, w as Input } from "./router-CinPgn2I.mjs";
import { t as ProductGrid } from "./ProductCard-BjbuZOZu.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categorie._slug-71dCkPqZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { slug } = Route$1.useParams();
	const [sort, setSort] = (0, import_react.useState)("best");
	const [minPrice, setMinPrice] = (0, import_react.useState)("");
	const [maxPrice, setMaxPrice] = (0, import_react.useState)("");
	const { data: categories = [] } = useQuery(categoriesQuery());
	const category = categories.find((c) => c.slug === slug);
	const siblings = categories.filter((c) => c.parent_id === (category?.parent_id ?? category?.id));
	const { data: products = [], isLoading } = useQuery(productsQuery({
		categorySlug: slug,
		sort,
		minPrice: minPrice ? Number(minPrice) : void 0,
		maxPrice: maxPrice ? Number(maxPrice) : void 0
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mb-4 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-primary",
						children: "Accueil"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-2",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/categories",
						className: "hover:text-primary",
						children: "Catégories"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-2",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: category?.name ?? slug
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: category?.name ?? slug
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: isLoading ? "Chargement…" : `${products.length} produit(s) disponible(s)`
			}),
			siblings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: siblings.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/categorie/$slug",
					params: { slug: s.slug },
					className: `rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${s.slug === slug ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`,
					children: s.name
				}, s.id))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-28",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs text-muted-foreground",
							children: "Prix min"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: minPrice,
							onChange: (e) => setMinPrice(e.target.value),
							inputMode: "numeric",
							placeholder: "0"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-28",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs text-muted-foreground",
							children: "Prix max"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: maxPrice,
							onChange: (e) => setMaxPrice(e.target.value),
							inputMode: "numeric",
							placeholder: "500000"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-52",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs text-muted-foreground",
							children: "Trier par"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: sort,
							onValueChange: (v) => setSort(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "best",
									children: "Meilleures ventes"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "new",
									children: "Nouveautés"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "price_asc",
									children: "Prix croissant"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "price_desc",
									children: "Prix décroissant"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "rated",
									children: "Mieux notés"
								})
							] })]
						})]
					}),
					minPrice || maxPrice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => {
							setMinPrice("");
							setMaxPrice("");
						},
						children: "Réinitialiser"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: products.length === 0 && !isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground",
					children: "Aucun produit dans cette catégorie pour le moment."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGrid, { products })
			})
		]
	});
}
//#endregion
export { CategoryPage as component };
