import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { D as Minus, S as Plus, c as Trash2, m as ShoppingBag, u as Store } from "../_libs/lucide-react.mjs";
import { T as Button, d as useCart, u as useAuth } from "./router-CinPgn2I.mjs";
import { r as formatPrice } from "./format-igmN2sYS.mjs";
import { t as SmartImage } from "./SmartImage-W4xELWJj.mjs";
import { t as Separator } from "./separator-B3hsz7IR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/panier-CMsKigeD.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const { lines, subtotal, setQuantity, remove, clear } = useCart();
	const { user } = useAuth();
	const vendors = Array.from(new Set(lines.map((l) => l.vendorId)));
	const deliveryFee = vendors.length * 1500;
	if (lines.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "mx-auto size-14 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-2xl font-bold",
				children: "Votre panier est vide"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Parcourez le catalogue et ajoutez vos premiers articles."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/categories",
					children: "Explorer le catalogue"
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: "Mon panier"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					lines.length,
					" article(s) · ",
					vendors.length,
					" vendeur(s)"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [vendors.map((vendorId) => {
						const vendorLines = lines.filter((l) => l.vendorId === vendorId);
						const first = vendorLines[0];
						const vendorTotal = vendorLines.reduce((s, l) => s + l.price * l.quantity, 0);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "surface-card overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "flex items-center gap-2 border-b border-border bg-secondary px-5 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-4 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/boutique/$slug",
										params: { slug: first.vendorSlug },
										className: "text-sm font-semibold hover:text-primary",
										children: first.vendorName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-auto text-sm font-semibold",
										children: formatPrice(vendorTotal)
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "divide-y divide-border",
								children: vendorLines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-4 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
											src: line.image,
											alt: line.name,
											className: "size-20 shrink-0 rounded-lg object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/produit/$slug",
													params: { slug: line.slug },
													className: "line-clamp-2 text-sm font-medium hover:text-primary",
													children: line.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 text-sm font-bold text-primary",
													children: formatPrice(line.price)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-2 flex items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center rounded-lg border border-border",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																variant: "ghost",
																size: "icon",
																className: "size-8",
																onClick: () => setQuantity(line.productId, line.quantity - 1),
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "w-9 text-center text-sm font-semibold",
																children: line.quantity
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																variant: "ghost",
																size: "icon",
																className: "size-8",
																onClick: () => setQuantity(line.productId, line.quantity + 1),
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" })
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														variant: "ghost",
														size: "sm",
														className: "text-destructive",
														onClick: () => remove(line.productId),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Retirer"]
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden text-sm font-semibold sm:block",
											children: formatPrice(line.price * line.quantity)
										})
									]
								}, line.productId))
							})]
						}, vendorId);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						className: "text-destructive",
						onClick: clear,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Vider le panier"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "surface-card h-fit space-y-4 p-6 lg:sticky lg:top-32",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold",
							children: "Récapitulatif"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Sous-total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: formatPrice(subtotal)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [
										"Livraison estimée (",
										vendors.length,
										" vendeur(s))"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: formatPrice(deliveryFee)
								})]
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/commander",
								children: "Commander maintenant"
							})
						}),
						user ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-center text-xs text-muted-foreground",
							children: [
								"Commande possible sans compte —",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									className: "font-medium text-primary hover:underline",
									children: "se connecter"
								}),
								" ",
								"pour retrouver l'historique."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Le montant final (livraison par zone, coupons, commissions) est calculé côté serveur lors du passage de commande."
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { CartPage as component };
