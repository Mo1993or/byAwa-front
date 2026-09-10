import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { A as MapPin, C as Phone, K as CircleCheck, N as LoaderCircle, T as Package, a as Truck, i as User } from "../_libs/lucide-react.mjs";
import { T as Button, a as Route$8, w as Input } from "./router-CinPgn2I.mjs";
import { n as formatDate, r as formatPrice } from "./format-igmN2sYS.mjs";
import { t as SmartImage } from "./SmartImage-W4xELWJj.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as trackOrder, r as useServerFn } from "./orders.functions-Dd3F-cpA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/suivi-BhAUuTM0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ORDER_STEPS = [
	{
		key: "placed",
		label: "Commande reçue"
	},
	{
		key: "paid",
		label: "Paiement confirmé"
	},
	{
		key: "preparing",
		label: "En préparation"
	},
	{
		key: "shipped",
		label: "Expédiée"
	},
	{
		key: "delivering",
		label: "Livreur en route"
	},
	{
		key: "delivered",
		label: "Livrée"
	}
];
var DELIVERY_LABEL = {
	to_prepare: "À préparer par le vendeur",
	ready: "Colis prêt",
	assigned: "Livreur assigné",
	delivering: "Livreur en route",
	delivered: "Colis livré",
	failed: "Livraison échouée"
};
function TrackPage() {
	const { ref } = Route$8.useSearch();
	const fetchTracking = useServerFn(trackOrder);
	const [reference, setReference] = (0, import_react.useState)(ref ?? "");
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function lookup(value) {
		if (!value.trim()) return;
		setLoading(true);
		setError(null);
		try {
			setData(await fetchTracking({ data: { reference: value.trim() } }));
		} catch (err) {
			setData(null);
			setError(err instanceof Error ? err.message : "Commande introuvable");
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		if (ref) lookup(ref);
	}, [ref]);
	const currentIndex = data ? ORDER_STEPS.findIndex((s) => s.key === data.order.status) : -1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: "Suivre ma commande"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Entrez votre code de suivi ou votre numéro de commande — aucun compte nécessaire."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "surface-card mt-6 flex flex-col gap-3 p-6 sm:flex-row sm:items-end",
				onSubmit: (e) => {
					e.preventDefault();
					lookup(reference);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "ref",
						children: "Code de suivi ou n° de commande"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "ref",
						value: reference,
						onChange: (e) => setReference(e.target.value),
						placeholder: "BY-XXXX-123"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					size: "lg",
					disabled: loading,
					children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, " Suivre"]
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-destructive",
				children: error
			}) : null,
			data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-baseline gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "text-xl font-bold",
										children: ["Commande ", data.order.order_number]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-secondary px-3 py-1 text-xs font-medium",
										children: data.order.status
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-auto font-display text-xl font-extrabold text-primary",
										children: formatPrice(data.order.total)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [
									"Passée le ",
									formatDate(data.order.created_at),
									" · Code de suivi",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-semibold text-foreground",
										children: data.order.track_token
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6",
								children: ORDER_STEPS.map((step, i) => {
									const done = currentIndex >= i;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: `rounded-xl border p-3 text-xs font-medium ${done ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`,
										children: [done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mb-1 size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "mb-1 size-4" }), step.label]
									}, step.key);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 flex items-center gap-2 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-primary" }), [
									data.order.shipping_name,
									data.order.shipping_street,
									data.order.shipping_zone,
									data.order.shipping_city
								].filter(Boolean).join(" · ")]
							})
						]
					}),
					data.vendorOrders.map((vo) => {
						const delivery = vo.deliveries?.[0];
						const driver = delivery?.drivers;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "surface-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-semibold",
											children: vo.vendors?.shop_name ?? "Boutique"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-secondary px-3 py-1 text-xs",
											children: vo.status
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-auto text-sm font-semibold",
											children: formatPrice(vo.subtotal)
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 space-y-3",
									children: vo.order_items?.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
												src: it.product_image,
												alt: it.product_name,
												className: "size-14 rounded-lg object-cover"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "line-clamp-1 text-sm font-medium",
													children: it.product_name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-muted-foreground",
													children: [
														it.quantity,
														" × ",
														formatPrice(it.unit_price)
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-semibold",
												children: formatPrice(it.total)
											})
										]
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 rounded-xl border border-border bg-secondary/50 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "flex items-center gap-2 text-sm font-semibold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4 text-primary" }), DELIVERY_LABEL[delivery?.status ?? "to_prepare"] ?? "En traitement"]
										}),
										driver ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 space-y-1 text-sm text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4" }),
													" ",
													driver.full_name,
													" · ",
													driver.vehicle ?? "Livreur BYAWA"
												]
											}), driver.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: `tel:${driver.phone}`,
													className: "hover:text-primary",
													children: driver.phone
												})]
											}) : null]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-muted-foreground",
											children: "Un livreur vous sera assigné dès que le vendeur aura préparé le colis."
										}),
										delivery?.delivered_at ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 text-sm text-muted-foreground",
											children: ["Livré le ", formatDate(delivery.delivered_at)]
										}) : null
									]
								})
							]
						}, vo.id);
					}),
					data.events.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: "Historique"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2 text-sm text-muted-foreground",
							children: data.events.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: e.status
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: e.note }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-auto",
										children: formatDate(e.created_at)
									})
								]
							}, i))
						})]
					}) : null
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 text-sm text-muted-foreground",
				children: ["Besoin d'aide ? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/aide",
					className: "font-medium text-primary hover:underline",
					children: "Contactez le support BYAWA"
				})]
			})
		]
	});
}
//#endregion
export { TrackPage as component };
