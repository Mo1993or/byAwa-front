import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { p as categoriesQuery } from "./router-CinPgn2I.mjs";
import { t as SmartImage } from "./SmartImage-W4xELWJj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-VIBl5K97.js
var import_jsx_runtime = require_jsx_runtime();
function CategoriesPage() {
	const { data: categories = [], isLoading } = useQuery(categoriesQuery());
	const roots = categories.filter((c) => !c.parent_id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: "Toutes les catégories"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Explorez l'ensemble du catalogue BYAWA, catégorie par catégorie."
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-muted-foreground",
				children: "Chargement…"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
				children: roots.map((root) => {
					const children = categories.filter((c) => c.parent_id === root.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-card overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/categorie/$slug",
							params: { slug: root.slug },
							className: "block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
								src: root.image_url,
								alt: root.name,
								width: 768,
								height: 768,
								className: "h-36 w-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/categorie/$slug",
								params: { slug: root.slug },
								className: "font-display text-lg font-bold hover:text-primary",
								children: root.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-3 space-y-1.5",
								children: [children.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/categorie/$slug",
									params: { slug: child.slug },
									className: "text-sm text-muted-foreground hover:text-primary",
									children: child.name
								}) }, child.id)), children.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-sm text-muted-foreground",
									children: "Voir les produits"
								}) : null]
							})]
						})]
					}, root.id);
				})
			})
		]
	});
}
//#endregion
export { CategoriesPage as component };
