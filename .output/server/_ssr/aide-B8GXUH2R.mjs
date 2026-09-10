import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { Y as ChevronDown } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/aide-B8GXUH2R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var faqs = [
	{
		q: "Comment passer une commande ?",
		a: "Ajoutez vos articles au panier, choisissez votre adresse de livraison, sélectionnez le mode de livraison puis validez le paiement. Vous recevez un numéro de commande et pouvez suivre chaque étape depuis votre espace client."
	},
	{
		q: "Puis-je commander chez plusieurs vendeurs en une fois ?",
		a: "Oui. Le panier BYAWA est multi-vendeurs : votre commande globale est automatiquement découpée en commandes vendeur, chacune avec son suivi et sa livraison."
	},
	{
		q: "Quels sont les délais et frais de livraison ?",
		a: "Les frais dépendent de la ville et de la zone : de 1 500 FCFA à Dakar-Plateau jusqu'à 6 000 FCFA à Ziguinchor, avec des délais de 1 à 4 jours."
	},
	{
		q: "Comment devenir vendeur ?",
		a: "Créez un compte, complétez le formulaire boutique (documents, coordonnées, politique de livraison) puis attendez la validation de l'équipe BYAWA sous 48h."
	},
	{
		q: "Comment fonctionne la commission ?",
		a: "BYAWA prélève une commission configurable (globale, par catégorie ou par vendeur). Elle est affichée sur chaque commande vendeur : prix produit, commission BYAWA, montant net vendeur."
	},
	{
		q: "Comment récupérer mes revenus en tant que vendeur ?",
		a: "Vos ventes alimentent votre portefeuille vendeur. Vous demandez un retrait, l'administrateur le traite et le statut passe de demandé à payé."
	},
	{
		q: "Puis-je retourner un produit ?",
		a: "Oui, une demande de retour peut être créée depuis le détail de la commande dans les 7 jours suivant la livraison, avec motif. Après validation, le remboursement est déclenché."
	},
	{
		q: "Comment devenir livreur BYAWA ?",
		a: "Contactez le support avec vos informations (ville, véhicule, disponibilité). Une fois votre compte livreur activé, vous accédez à l'espace livreur pour accepter et suivre vos livraisons."
	}
];
function HelpPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa max-w-3xl py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: "Centre d'aide"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Les réponses aux questions les plus fréquentes sur BYAWA."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
				type: "single",
				collapsible: true,
				className: "mt-8",
				children: faqs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
					value: f.q,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
						className: "text-left",
						children: f.q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
						className: "text-muted-foreground",
						children: f.a
					})]
				}, f.q))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card mt-10 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold",
					children: "Besoin d'aide supplémentaire ?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Écrivez-nous à contact@byawa.com ou appelez le +221 77 000 00 00, du lundi au dimanche de 8h à 20h."
				})]
			})
		]
	});
}
//#endregion
export { HelpPage as component };
