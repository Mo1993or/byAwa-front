import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { N as LoaderCircle, a as Truck, g as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as Button, d as useCart, u as useAuth, w as Input } from "./router-CinPgn2I.mjs";
import { r as formatPrice } from "./format-igmN2sYS.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { r as useServerFn, t as createOrder } from "./orders.functions-Dd3F-cpA.mjs";
import { t as Separator } from "./separator-B3hsz7IR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/commander-l4NROgou.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAYMENTS = [
	{
		id: "cod",
		label: "Paiement à la livraison"
	},
	{
		id: "wave",
		label: "Wave"
	},
	{
		id: "orange_money",
		label: "Orange Money"
	}
];
function CheckoutPage() {
	const { lines, subtotal, clear } = useCart();
	const { user } = useAuth();
	const navigate = useNavigate();
	const submitOrder = useServerFn(createOrder);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		email: "",
		city: "Dakar",
		zone: "",
		street: "",
		details: "",
		paymentMethod: "cod"
	});
	(0, import_react.useEffect)(() => {
		if (user?.email) setForm((f) => f.email ? f : {
			...f,
			email: user.email
		});
	}, [user]);
	const deliveryFee = Array.from(new Set(lines.map((l) => l.vendorId))).length * 1500;
	if (lines.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold",
			children: "Votre panier est vide"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			size: "lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/categories",
				children: "Explorer le catalogue"
			})
		})]
	});
	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await submitOrder({ data: {
				lines: lines.map((l) => ({
					productId: l.productId,
					quantity: l.quantity
				})),
				...form
			} });
			clear();
			toast.success("Commande enregistrée", { description: res.orderNumber });
			navigate({
				to: "/suivi",
				search: { ref: res.trackToken }
			});
		} catch (err) {
			toast.error("Commande impossible", { description: err instanceof Error ? err.message : "Réessayez dans un instant." });
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: "Finaliser ma commande"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Pas besoin de compte : renseignez vos coordonnées de livraison et suivez votre commande avec le code reçu."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "surface-card space-y-4 p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-bold",
								children: "Coordonnées"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "name",
											children: "Nom complet *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "name",
											required: true,
											value: form.name,
											onChange: (e) => setForm({
												...form,
												name: e.target.value
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "phone",
											children: "Téléphone *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "phone",
											required: true,
											placeholder: "+221 77 000 00 00",
											value: form.phone,
											onChange: (e) => setForm({
												...form,
												phone: e.target.value
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "email",
											children: "E-mail (facultatif)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "email",
											type: "email",
											value: form.email,
											onChange: (e) => setForm({
												...form,
												email: e.target.value
											})
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "surface-card space-y-4 p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-bold",
								children: "Adresse de livraison"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "city",
											children: "Ville *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "city",
											required: true,
											value: form.city,
											onChange: (e) => setForm({
												...form,
												city: e.target.value
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "zone",
											children: "Quartier / zone"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "zone",
											value: form.zone,
											onChange: (e) => setForm({
												...form,
												zone: e.target.value
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "street",
											children: "Rue / repère"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "street",
											value: form.street,
											onChange: (e) => setForm({
												...form,
												street: e.target.value
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "details",
											children: "Instructions pour le livreur"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "details",
											rows: 3,
											value: form.details,
											onChange: (e) => setForm({
												...form,
												details: e.target.value
											})
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "surface-card space-y-3 p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-bold",
									children: "Paiement"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-3 sm:grid-cols-3",
									children: PAYMENTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setForm({
											...form,
											paymentMethod: p.id
										}),
										className: `rounded-xl border p-4 text-sm font-medium transition-colors ${form.paymentMethod === p.id ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"}`,
										children: p.label
									}, p.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Le paiement mobile est confirmé par le vendeur après la commande."
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "surface-card h-fit space-y-4 p-6 lg:sticky lg:top-32",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold",
							children: "Récapitulatif"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2 text-sm",
							children: lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "line-clamp-1 text-muted-foreground",
									children: [
										l.quantity,
										" × ",
										l.name
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: formatPrice(l.price * l.quantity)
								})]
							}, l.productId))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Sous-total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: formatPrice(subtotal)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Livraison estimée"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: formatPrice(deliveryFee)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl font-extrabold text-primary",
								children: formatPrice(subtotal + deliveryFee)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							size: "lg",
							className: "w-full",
							disabled: loading,
							children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Confirmer la commande"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary" }), " Vendeurs vérifiés BYAWA"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4 text-primary" }), " Suivi livreur en temps réel après validation"]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { CheckoutPage as component };
