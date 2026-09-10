import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { D as Minus, S as Plus, a as Truck, d as Star, g as ShieldCheck, p as ShoppingCart, x as RotateCcw } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as Button, d as useCart, g as reviewsQuery, h as productsQuery, m as productQuery, n as Route } from "./router-CinPgn2I.mjs";
import { n as formatDate, r as formatPrice, t as discountPercent } from "./format-igmN2sYS.mjs";
import { t as SmartImage } from "./SmartImage-W4xELWJj.mjs";
import { t as ProductGrid } from "./ProductCard-BjbuZOZu.mjs";
import { t as Separator } from "./separator-B3hsz7IR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produit._slug-BBGe12zi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { slug } = Route.useParams();
	const { add } = useCart();
	const navigate = useNavigate();
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const [activeImage, setActiveImage] = (0, import_react.useState)(0);
	const { data: product, isLoading } = useQuery(productQuery(slug));
	const { data: reviews = [] } = useQuery({
		...reviewsQuery(product?.id ?? ""),
		enabled: Boolean(product?.id)
	});
	const { data: related = [] } = useQuery({
		...productsQuery({
			vendorSlug: product?.vendors?.slug,
			limit: 5
		}),
		enabled: Boolean(product?.vendors?.slug)
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-byawa py-16 text-muted-foreground",
		children: "Chargement du produit…"
	});
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: "Produit introuvable"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Ce produit n'existe plus ou n'est pas encore validé."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/categories",
					children: "Voir le catalogue"
				})
			})
		]
	});
	const discount = discountPercent(Number(product.price), Number(product.compare_at_price));
	const images = product.images?.length ? product.images : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mb-5 text-sm text-muted-foreground",
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
					product.categories ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/categorie/$slug",
						params: { slug: product.categories.slug },
						className: "hover:text-primary",
						children: product.categories.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-2",
						children: "/"
					})] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: product.name
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 md:grid-cols-[92px_minmax(0,1fr)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "order-2 flex gap-3 md:order-1 md:flex-col",
						children: images.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveImage(i),
							className: `size-20 overflow-hidden rounded-lg border-2 ${i === activeImage ? "border-primary" : "border-border"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
								src: img,
								alt: product.name,
								className: "h-full w-full object-cover"
							})
						}, img))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "order-1 md:order-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-card relative overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
									src: images[activeImage],
									alt: product.name,
									eager: true,
									className: "aspect-square w-full object-cover"
								}), discount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground",
									children: [
										"-",
										discount,
										"%"
									]
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold",
										children: "Description"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "whitespace-pre-line text-sm leading-relaxed text-muted-foreground",
										children: product.description
									}),
									product.brand ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Marque : "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: product.brand
										})]
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-xl font-bold",
									children: [
										"Avis clients (",
										reviews.length,
										")"
									]
								}), reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted-foreground",
									children: "Aucun avis pour l'instant. Soyez le premier à noter ce produit après votre achat."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 space-y-4",
									children: reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "surface-card p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex",
													children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `size-4 ${i < r.rating ? "fill-gold text-gold" : "text-border"}` }, i))
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-medium",
													children: r.author_name ?? "Client BYAWA"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-auto text-xs text-muted-foreground",
													children: formatDate(r.created_at)
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-muted-foreground",
											children: r.comment
										})]
									}, r.id))
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-4 lg:sticky lg:top-32 lg:self-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-card space-y-4 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-bold leading-snug",
									children: product.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-gold text-gold" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: Number(product.rating).toFixed(1)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: [
												"· ",
												product.sales_count,
												" vendus"
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-3xl font-extrabold text-primary",
										children: formatPrice(product.price)
									}), product.compare_at_price ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted-foreground line-through",
										children: formatPrice(product.compare_at_price)
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `text-sm ${product.stock > 0 ? "text-success" : "text-destructive"}`,
									children: product.stock > 0 ? `En stock (${product.stock} disponibles)` : "Rupture de stock"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted-foreground",
										children: "Quantité"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center rounded-lg border border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												onClick: () => setQuantity((q) => Math.max(1, q - 1)),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-10 text-center text-sm font-semibold",
												children: quantity
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												onClick: () => setQuantity((q) => Math.min(product.stock || 1, q + 1)),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "lg",
									className: "w-full",
									disabled: product.stock === 0,
									onClick: () => {
										add({
											productId: product.id,
											slug: product.slug,
											name: product.name,
											image: images[0] ?? null,
											price: Number(product.price),
											stock: product.stock,
											vendorId: product.vendor_id,
											vendorName: product.vendors?.shop_name ?? "Boutique",
											vendorSlug: product.vendors?.slug ?? ""
										}, quantity);
										toast.success("Ajouté au panier", { description: `${quantity} × ${product.name}` });
										navigate({ to: "/panier" });
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "size-5" }), " Ajouter au panier"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "secondary",
									size: "lg",
									className: "w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/panier",
										children: "Voir mon panier"
									})
								})
							]
						}),
						product.vendors ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-card p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wide text-muted-foreground",
								children: "Vendu par"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/boutique/$slug",
								params: { slug: product.vendors.slug },
								className: "mt-2 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
									src: product.vendors.logo_url,
									alt: product.vendors.shop_name,
									className: "size-11 shrink-0 rounded-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold hover:text-primary",
									children: product.vendors.shop_name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										product.vendors.city,
										" · ⭐ ",
										Number(product.vendors.rating).toFixed(1)
									]
								})] })]
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "surface-card space-y-3 p-5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4 text-primary" }), " Livraison sous 1 à 4 jours"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary" }), " Paiement à la livraison possible"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4 text-primary" }), " Retour sous 7 jours"]
								})
							]
						})
					]
				})]
			}),
			related.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-5 text-xl font-bold",
					children: "Autres produits de la boutique"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGrid, { products: related.filter((p) => p.id !== product.id) })]
			}) : null
		]
	});
}
//#endregion
export { ProductPage as component };
