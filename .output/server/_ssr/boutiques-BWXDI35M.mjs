import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as MapPin, d as Star } from "../_libs/lucide-react.mjs";
import { v as vendorsQuery } from "./router-CinPgn2I.mjs";
import { t as SmartImage } from "./SmartImage-W4xELWJj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/boutiques-BWXDI35M.js
var import_jsx_runtime = require_jsx_runtime();
function VendorsPage() {
	const { data: vendors = [], isLoading } = useQuery(vendorsQuery());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: "Nos boutiques"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: isLoading ? "Chargement…" : `${vendors.length} boutiques vérifiées par l'équipe BYAWA.`
			}),
			!isLoading && vendors.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card mt-8 p-10 text-center text-muted-foreground",
				children: [
					"Aucune boutique vérifiée pour le moment.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/devenir-vendeur",
						className: "font-semibold text-primary",
						children: "Ouvrez la vôtre"
					}),
					"."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: vendors.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/boutique/$slug",
					params: { slug: v.slug },
					className: "surface-card group overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)]",
					children: [v.cover_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
						src: v.cover_url,
						alt: v.shop_name,
						className: "h-32 w-full object-cover"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								v.logo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
									src: v.logo_url,
									alt: v.shop_name,
									className: "size-12 shrink-0 rounded-full object-cover"
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-semibold group-hover:text-primary",
										children: v.shop_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex items-center gap-1 text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }),
											" ",
											v.city,
											" · ",
											v.zone
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-auto flex items-center gap-1 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-gold text-gold" }), Number(v.rating).toFixed(1)]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "line-clamp-2 text-sm text-muted-foreground",
							children: v.description
						})]
					})]
				}, v.id))
			})
		]
	});
}
//#endregion
export { VendorsPage as component };
