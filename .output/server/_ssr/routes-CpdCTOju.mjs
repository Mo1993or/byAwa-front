import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { $ as BadgeCheck, A as MapPin, C as Phone, H as Flame, O as MessageCircle, V as Headphones, W as Clock, a as Truck, et as ArrowRight, f as Sparkles, g as ShieldCheck, j as Mail, u as Store } from "../_libs/lucide-react.mjs";
import { T as Button, f as bannersQuery, h as productsQuery, l as siteSettingsQuery, p as categoriesQuery, v as vendorsQuery } from "./router-CinPgn2I.mjs";
import { t as SmartImage } from "./SmartImage-W4xELWJj.mjs";
import { t as ProductGrid } from "./ProductCard-BjbuZOZu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CpdCTOju.js
var import_jsx_runtime = require_jsx_runtime();
function SectionTitle({ title, subtitle, to, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "flex items-center gap-2 text-xl font-bold sm:text-2xl",
			children: [icon, title]
		}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: subtitle
		}) : null] }), to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "ghost",
			size: "sm",
			className: "shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to,
				children: ["Tout voir ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
			})
		}) : null]
	});
}
function Home() {
	const { data: banners = [] } = useQuery(bannersQuery());
	const { data: categories = [] } = useQuery(categoriesQuery());
	const { data: featured = [] } = useQuery(productsQuery({
		featured: true,
		limit: 10
	}));
	const { data: best = [] } = useQuery(productsQuery({
		sort: "best",
		limit: 10
	}));
	const { data: fresh = [] } = useQuery(productsQuery({
		sort: "new",
		limit: 10
	}));
	const { data: vendors = [] } = useQuery(vendorsQuery());
	const { data: site } = useQuery(siteSettingsQuery());
	const hero = banners[0];
	const roots = categories.filter((c) => !c.parent_id);
	const phone = site?.contact_phone ?? "";
	const whatsapp = site?.contact_whatsapp ?? "";
	const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-8",
		children: [
			site?.home_announcement ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-primary text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-byawa flex flex-wrap items-center justify-center gap-2 py-2 text-center text-sm font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), site.home_announcement]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "gradient-hero text-night-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-byawa grid items-center gap-8 py-12 lg:grid-cols-2 lg:py-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-gold" }),
									" Plus de ",
									vendors.length,
									" boutiques vérifiées"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-balance-title text-3xl font-extrabold leading-tight sm:text-5xl",
								children: site?.home_hero_title ?? hero?.title ?? "Tout ce qu'il vous faut, au meilleur prix"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xl text-base text-night-foreground/80",
								children: site?.home_hero_subtitle ?? hero?.subtitle ?? "Mode, électronique, maison, alimentation : commandez auprès de vendeurs vérifiés et faites-vous livrer partout au Sénégal."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/categories",
										children: [
											site?.home_hero_cta_label ?? "Explorer le catalogue",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/vendre",
										children: site?.home_hero_cta2_label ?? "Ouvrir ma boutique"
									})
								})]
							}),
							phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: telHref,
									className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold hover:bg-white/20",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4 text-gold" }),
										" ",
										phone
									]
								}), whatsapp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`,
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold hover:bg-white/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4 text-gold" }), " WhatsApp"]
								}) : null]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "grid max-w-md grid-cols-3 gap-4 pt-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-night-foreground/60",
										children: "Produits"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-display text-xl font-bold",
										children: best.length ? site?.home_stat_products ?? "1 000+" : "—"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-night-foreground/60",
										children: "Catégories"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-display text-xl font-bold",
										children: roots.length
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-night-foreground/60",
										children: "Villes livrées"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-display text-xl font-bold",
										children: site?.home_stat_cities ?? "14"
									})] })
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
							src: site?.home_hero_image || hero?.image_url || "/images/banners/banner-1.jpg",
							alt: "Marketplace BYAWA",
							eager: true,
							className: "h-64 w-full object-cover sm:h-96"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container-byawa grid grid-cols-2 gap-4 py-6 lg:grid-cols-4",
					children: [
						{
							icon: BadgeCheck,
							title: "Vendeurs vérifiés",
							text: "Chaque boutique est validée"
						},
						{
							icon: Truck,
							title: "Livraison suivie",
							text: "Dans 14 villes du pays"
						},
						{
							icon: ShieldCheck,
							title: "Paiement protégé",
							text: "Payez à la livraison"
						},
						{
							icon: Headphones,
							title: "Support 7j/7",
							text: "Réclamations et retours"
						}
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-xl bg-accent p-2.5 text-accent-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: f.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: f.text
						})] })]
					}, f.title))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "container-byawa pt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "Catégories populaires",
					to: "/categories"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7",
					children: roots.slice(0, 14).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/categorie/$slug",
						params: { slug: c.slug },
						className: "surface-card flex flex-col items-center gap-2 p-3 text-center transition-colors hover:border-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
							src: c.image_url,
							alt: c.name,
							width: 768,
							height: 768,
							className: "size-14 rounded-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium leading-tight",
							children: c.name
						})]
					}, c.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "container-byawa pt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "Offres du moment",
					subtitle: "Sélection mise en avant par BYAWA",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-5 text-primary" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGrid, { products: featured })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "container-byawa pt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "Meilleures ventes",
					subtitle: "Les produits les plus commandés"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGrid, { products: best })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "container-byawa pt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "Boutiques populaires",
					to: "/boutiques",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-5 text-primary" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: vendors.slice(0, 6).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/boutique/$slug",
						params: { slug: v.slug },
						className: "surface-card group overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
							src: v.cover_url,
							alt: v.shop_name,
							className: "h-28 w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
								src: v.logo_url,
								alt: v.shop_name,
								className: "size-12 shrink-0 rounded-full border-2 border-card object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-semibold group-hover:text-primary",
									children: v.shop_name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: [
										v.city,
										" · ⭐ ",
										Number(v.rating).toFixed(1)
									]
								})]
							})]
						})]
					}, v.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "container-byawa pt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					title: "Nouveautés",
					subtitle: "Les derniers produits publiés"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGrid, { products: fresh })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "container-byawa pt-14",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "gradient-hero flex flex-col items-start gap-5 rounded-3xl px-6 py-10 text-night-foreground sm:px-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "max-w-2xl text-2xl font-bold sm:text-3xl",
							children: "Vendez sur BYAWA et touchez des milliers de clients"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-2xl text-night-foreground/80",
							children: "Créez votre boutique, publiez vos produits, suivez vos commandes et retirez vos revenus. Commission transparente, portefeuille vendeur et livraison intégrée."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/vendre",
								children: ["Devenir vendeur ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "container-byawa pt-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "surface-card grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						{
							icon: Phone,
							label: "Téléphone",
							value: phone,
							href: phone ? telHref : void 0
						},
						{
							icon: Mail,
							label: "E-mail",
							value: site?.contact_email ?? "",
							href: site?.contact_email ? `mailto:${site.contact_email}` : void 0
						},
						{
							icon: MapPin,
							label: "Adresse",
							value: site?.contact_address ?? ""
						},
						{
							icon: Clock,
							label: "Horaires",
							value: site?.contact_hours ?? ""
						}
					].filter((c) => c.value).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-xl bg-accent p-2.5 text-accent-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wide text-muted-foreground",
								children: c.label
							}), c.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: c.href,
								className: "text-sm font-semibold hover:text-primary",
								children: c.value
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: c.value
							})]
						})]
					}, c.label))
				})
			})
		]
	});
}
//#endregion
export { Home as component };
