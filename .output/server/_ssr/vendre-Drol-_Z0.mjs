import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { E as PackageCheck, Z as ChartColumn, a as Truck, et as ArrowRight, g as ShieldCheck, n as Wallet, r as Users } from "../_libs/lucide-react.mjs";
import { T as Button } from "./router-CinPgn2I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vendre-Drol-_Z0.js
var import_jsx_runtime = require_jsx_runtime();
var steps = [
	{
		title: "Inscription",
		text: "Renseignez votre boutique, vos documents et vos coordonnées de paiement."
	},
	{
		title: "Vérification",
		text: "L'équipe BYAWA valide votre dossier sous 48h."
	},
	{
		title: "Publication",
		text: "Ajoutez vos produits, photos, stocks et variantes."
	},
	{
		title: "Ventes & retraits",
		text: "Recevez les commandes, suivez votre wallet et demandez vos retraits."
	}
];
var benefits = [
	{
		icon: Users,
		title: "Des milliers de visiteurs",
		text: "Profitez du trafic de la marketplace."
	},
	{
		icon: Wallet,
		title: "Portefeuille vendeur",
		text: "Solde, commissions et retraits transparents."
	},
	{
		icon: PackageCheck,
		title: "Gestion produits",
		text: "Stock, variantes, promotions et validations."
	},
	{
		icon: Truck,
		title: "Livraison intégrée",
		text: "Zones, tarifs et livreurs gérés par BYAWA."
	},
	{
		icon: ChartColumn,
		title: "Statistiques",
		text: "Chiffre d'affaires, ventes et performance."
	},
	{
		icon: ShieldCheck,
		title: "Données protégées",
		text: "Vous ne voyez que vos propres commandes."
	}
];
function SellPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "gradient-hero text-night-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-byawa space-y-6 py-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "max-w-3xl text-3xl font-extrabold sm:text-5xl",
							children: "Ouvrez votre boutique sur BYAWA et vendez partout au Sénégal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-2xl text-night-foreground/80",
							children: "Commission transparente, paiements suivis, livraison intégrée et un tableau de bord complet pour piloter votre activité."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/devenir-vendeur",
									children: ["Créer ma boutique ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/vendeur",
									children: "J'ai déjà une boutique"
								})
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "container-byawa py-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold",
					children: "Comment ça marche"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-6 grid gap-4 md:grid-cols-4",
					children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "surface-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gradient-flame inline-flex size-9 items-center justify-center rounded-full font-bold text-primary-foreground",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-semibold",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: s.text
							})
						]
					}, s.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "container-byawa pb-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold",
					children: "Ce que BYAWA vous apporte"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: benefits.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex rounded-xl bg-accent p-2.5 text-accent-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-semibold",
								children: b.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: b.text
							})
						]
					}, b.title))
				})]
			})
		]
	});
}
//#endregion
export { SellPage as component };
