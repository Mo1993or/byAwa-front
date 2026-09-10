import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as DialogOverlay$1, c as DialogTrigger$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as supabase } from "./client-fmFI4d4G.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { N as LoaderCircle, S as Plus, T as Package, W as Clock, c as Trash2, d as Star, m as ShoppingBag, n as Wallet, o as TriangleAlert, s as TrendingUp, t as X, u as Store, w as Pencil, y as Search } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as Button, p as categoriesQuery, u as useAuth, w as Input } from "./router-CinPgn2I.mjs";
import { n as TabsContent } from "./tabs-CCJRliUM.mjs";
import { n as formatDate, r as formatPrice } from "./format-igmN2sYS.mjs";
import { t as SmartImage } from "./SmartImage-W4xELWJj.mjs";
import { a as DashboardShell, i as CardTitle, n as CardContent, o as StatCard, r as CardHeader, s as StatGrid, t as Card } from "./DashboardShell-DDRDh37s.mjs";
import { n as ImageUploader, t as DashboardTabs } from "./ImageUploader-Ci6Hvvcl.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { a as useMonthlySeries, i as TrendChart, n as ChartGrid, r as MonthlyBarChart, t as BreakdownChart } from "./DashboardCharts-m2Y4aErK.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as uniqueSlug } from "./slug-DcEF_CmJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vendeur-CyT2TS8z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var VENDOR_ORDER_STATUSES = [
	"placed",
	"paid",
	"preparing",
	"shipped",
	"delivering",
	"delivered",
	"cancelled"
];
function VendorDashboard() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const { data: vendor, isLoading } = useQuery({
		queryKey: ["my-vendor", user?.id],
		enabled: Boolean(user?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("vendors").select("*").eq("user_id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const vendorId = vendor?.id;
	const { data: products = [] } = useQuery({
		queryKey: ["vendor-products", vendorId],
		enabled: Boolean(vendorId),
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("id,name,slug,description,brand,price,compare_at_price,stock,images,status,category_id,rejection_reason").eq("vendor_id", vendorId).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: wallet } = useQuery({
		queryKey: ["vendor-wallet", vendorId],
		enabled: Boolean(vendorId),
		queryFn: async () => {
			const { data, error } = await supabase.from("wallets").select("*").eq("vendor_id", vendorId).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const { data: vendorOrders = [] } = useQuery({
		queryKey: ["vendor-orders", vendorId],
		enabled: Boolean(vendorId),
		queryFn: async () => {
			const { data, error } = await supabase.from("vendor_orders").select("id,status,subtotal,net_amount,commission_amount,created_at,orders(order_number,shipping_city,shipping_name),order_items(id,product_name,quantity,total)").eq("vendor_id", vendorId).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: withdrawals = [] } = useQuery({
		queryKey: ["vendor-withdrawals", vendorId],
		enabled: Boolean(vendorId),
		queryFn: async () => {
			const { data, error } = await supabase.from("withdrawals").select("*").eq("vendor_id", vendorId).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: reviews = [] } = useQuery({
		queryKey: ["vendor-reviews", vendorId],
		enabled: Boolean(vendorId),
		queryFn: async () => {
			const { data, error } = await supabase.from("reviews").select("id,rating,comment,author_name,created_at,products(name)").eq("vendor_id", vendorId).order("created_at", { ascending: false }).limit(100);
			if (error) throw error;
			return data ?? [];
		}
	});
	const setVendorOrderStatus = useMutation({
		mutationFn: async ({ id, status }) => {
			const { error } = await supabase.from("vendor_orders").update({ status }).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Commande mise à jour");
			queryClient.invalidateQueries({ queryKey: ["vendor-orders"] });
		},
		onError: (e) => toast.error("Action impossible", { description: e.message })
	});
	const deleteProduct = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("products").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Produit supprimé");
			queryClient.invalidateQueries({ queryKey: ["vendor-products"] });
		},
		onError: (e) => toast.error("Suppression impossible", { description: e.message })
	});
	const salesSeries = useMonthlySeries(vendorOrders, (o) => o.created_at, [{
		key: "brut",
		value: (o) => Number(o.subtotal ?? 0)
	}, {
		key: "net",
		value: (o) => Number(o.net_amount ?? 0)
	}]);
	const ordersCountSeries = useMonthlySeries(vendorOrders, (o) => o.created_at, [{
		key: "commandes",
		value: () => 1
	}]);
	const productStatusBreakdown = [
		{
			name: "Publiés",
			value: products.filter((p) => p.status === "approved").length
		},
		{
			name: "En attente",
			value: products.filter((p) => p.status === "pending").length
		},
		{
			name: "Brouillons",
			value: products.filter((p) => p.status === "draft").length
		},
		{
			name: "Refusés",
			value: products.filter((p) => p.status === "rejected").length
		}
	];
	const [search, setSearch] = (0, import_react.useState)("");
	const filteredProducts = (0, import_react.useMemo)(() => {
		return products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand?.toLowerCase().includes(search.toLowerCase()));
	}, [products, search]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-byawa py-16 text-muted-foreground",
		children: "Chargement…"
	});
	if (!vendor) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: "Vous n'avez pas encore de boutique"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Déposez votre dossier vendeur pour commencer à vendre sur BYAWA."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-0",
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/devenir-vendeur",
					children: "Créer ma boutique"
				})
			})
		]
	});
	const revenue = vendorOrders.reduce((sum, o) => sum + Number(o.subtotal ?? 0), 0);
	const approved = vendor.status === "approved";
	const monthStart = /* @__PURE__ */ new Date();
	monthStart.setDate(1);
	monthStart.setHours(0, 0, 0, 0);
	const monthRevenue = vendorOrders.filter((o) => new Date(o.created_at) >= monthStart).reduce((sum, o) => sum + Number(o.net_amount ?? 0), 0);
	const toProcess = vendorOrders.filter((o) => [
		"placed",
		"paid",
		"preparing"
	].includes(String(o.status))).length;
	const lowStock = products.filter((p) => p.stock <= 3);
	const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + Number(r.rating ?? 0), 0) / reviews.length : Number(vendor.rating ?? 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardShell, {
		title: vendor.shop_name,
		subtitle: `Espace vendeur · ${vendor.city ?? "Sénégal"} · Commission ${vendor.commission_rate ?? 10} %`,
		avatarUrl: vendor.logo_url,
		badge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide border", vendor.status === "approved" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : vendor.status === "pending" || vendor.status === "verifying" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" : "bg-slate-500/10 text-slate-600 border-slate-500/20"),
			children: vendor.status === "approved" ? "Boutique Active" : vendor.status === "pending" ? "En attente" : vendor.status === "verifying" ? "Vérification" : vendor.status
		}),
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDialog, { vendorId: vendor.id }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatGrid, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: Package,
					label: "Produits",
					value: products.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: ShoppingBag,
					label: "Commandes",
					value: vendorOrders.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: Clock,
					label: "À traiter",
					value: toProcess,
					tone: toProcess > 0 ? "warning" : "default"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: TrendingUp,
					label: "Net ce mois",
					value: formatPrice(monthRevenue)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: Wallet,
					label: "Solde",
					value: formatPrice(wallet?.balance ?? 0),
					tone: "primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: Star,
					label: "Note moyenne",
					value: avgRating ? avgRating.toFixed(1) : "—",
					description: `${reviews.length} avis`
				})
			] }),
			!approved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-l-4 border-warning bg-warning/5 mb-4 mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "py-4 text-sm text-muted-foreground",
					children: ["Votre boutique est en cours de validation. Vous pouvez préparer vos produits : ils seront publiés dès l'approbation de votre dossier.", vendor.rejection_reason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-1 block text-destructive font-bold",
						children: ["Motif : ", vendor.rejection_reason]
					})]
				})
			}),
			lowStock.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-l-4 border-destructive bg-destructive/5 mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "py-4 text-sm text-destructive flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						lowStock.length,
						" produit(s) en stock faible : ",
						lowStock.slice(0, 3).map((p) => p.name).join(", "),
						lowStock.length > 3 ? "…" : ""
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChartGrid, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
					title: "Tendance des ventes",
					subtitle: "Chiffre d'affaires brut sur 6 mois",
					data: salesSeries,
					dataKey: "brut",
					label: "CA brut",
					formatter: formatPrice
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthlyBarChart, {
					title: "Évolution mensuelle",
					subtitle: "Revenus bruts et nets après commission",
					data: salesSeries,
					series: [{
						key: "brut",
						label: "Brut"
					}, {
						key: "net",
						label: "Net"
					}],
					formatter: formatPrice
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreakdownChart, {
					title: "Répartition du catalogue",
					subtitle: "Statut de vos produits",
					data: productStatusBreakdown
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartGrid, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthlyBarChart, {
				title: "Volume de commandes",
				subtitle: "Nombre de commandes par mois",
				data: ordersCountSeries,
				series: [{
					key: "commandes",
					label: "Commandes"
				}]
			}) }),
			vendor.membership_status !== "paid" && vendor.membership_status !== "waived" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-l-4 border-primary bg-primary/5 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					className: "py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "text-base font-bold flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Frais d'adhésion : ", formatPrice(Number(vendor.membership_fee ?? 0))] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-normal px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase",
							children: vendor.membership_status === "pending" ? "Vérification en cours" : "À régler"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Votre boutique sera publiée une fois l'adhésion validée."
					}), vendor.membership_status !== "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/devenir-vendeur",
							children: "Signaler mon paiement"
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardTabs, {
					navTitle: "Espace vendeur",
					defaultValue: "produits",
					items: [
						{
							value: "produits",
							label: "Mes produits",
							icon: Package
						},
						{
							value: "commandes",
							label: "Commandes",
							icon: ShoppingBag
						},
						{
							value: "avis",
							label: "Avis clients",
							icon: Star
						},
						{
							value: "portefeuille",
							label: "Portefeuille",
							icon: Wallet
						},
						{
							value: "boutique",
							label: "Ma boutique",
							icon: Store
						}
					],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "produits",
							className: "mt-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold",
									children: "Mes produits"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Gérez votre inventaire et vos ventes en temps réel."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative w-full max-w-sm sm:w-64",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Rechercher...",
											className: "pl-9",
											value: search,
											onChange: (e) => setSearch(e.target.value)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDialog, { vendorId: vendor.id })]
								})]
							}), filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "surface-card mt-4 p-10 text-center text-muted-foreground",
								children: search ? "Aucun produit ne correspond à votre recherche." : "Aucun produit pour le moment. Ajoutez votre premier article."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-3",
								children: filteredProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "surface-card flex flex-wrap items-center gap-4 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
											src: p.images?.[0],
											alt: p.name,
											className: "size-14 rounded-lg object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate font-medium",
												children: p.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: [
													"Stock : ",
													p.stock,
													p.rejection_reason ? ` · Refus : ${p.rejection_reason}` : ""
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-end gap-1 ml-auto",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider", p.status === "approved" ? "bg-emerald-500/10 text-emerald-600" : p.status === "pending" ? "bg-amber-500/10 text-amber-600" : p.status === "rejected" ? "bg-rose-500/10 text-rose-600" : "bg-slate-500/10 text-slate-600"),
												children: p.status === "approved" ? "En ligne" : p.status === "pending" ? "En attente" : p.status === "rejected" ? "Refusé" : p.status
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-primary",
												children: formatPrice(p.price)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDialog, {
											vendorId: vendor.id,
											product: p,
											trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "outline",
												size: "icon",
												"aria-label": "Modifier",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											"aria-label": "Supprimer",
											onClick: () => deleteProduct.mutate(p.id),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
										})
									]
								}, p.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "commandes",
							className: "mt-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold",
									children: "Commandes reçues"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: ["Chiffre d'affaires cumulé : ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: formatPrice(revenue)
									})]
								}),
								vendorOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "surface-card mt-4 p-10 text-center text-muted-foreground",
									children: "Aucune commande pour l'instant."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 space-y-3",
									children: vendorOrders.map((o) => {
										const order = o.orders;
										const items = o.order_items ?? [];
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "surface-card p-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap items-center gap-3",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-semibold",
															children: ["#", order?.order_number ?? "—"]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs text-muted-foreground",
															children: formatDate(o.created_at)
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-xs text-muted-foreground",
															children: [
																order?.shipping_name ?? "Client",
																" · ",
																order?.shipping_city ?? "—"
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
															className: "ml-auto h-9 rounded-md border border-input bg-background px-3 text-sm",
															value: String(o.status),
															onChange: (e) => setVendorOrderStatus.mutate({
																id: o.id,
																status: e.target.value
															}),
															children: VENDOR_ORDER_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: s,
																children: s
															}, s))
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-bold text-primary",
															children: formatPrice(o.net_amount)
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-sm text-muted-foreground",
													children: items.map((i) => `${i.quantity}× ${i.product_name}`).join(", ") || "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-1 text-xs text-muted-foreground",
													children: [
														"Brut ",
														formatPrice(o.subtotal),
														" · commission ",
														formatPrice(o.commission_amount)
													]
												})
											]
										}, o.id);
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "avis",
							className: "mt-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold",
									children: "Avis clients"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										"Note moyenne : ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold",
											children: [avgRating.toFixed(1), "/5"]
										}),
										" ·",
										" ",
										reviews.length,
										" avis"
									]
								}),
								reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "surface-card mt-4 p-10 text-center text-muted-foreground",
									children: "Aucun avis pour le moment."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 space-y-3",
									children: reviews.map((r) => {
										const product = r.products;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "surface-card p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "flex items-center gap-1 font-semibold",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-primary text-primary" }),
															r.rating,
															"/5"
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm",
														children: r.author_name ?? "Client BYAWA"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs text-muted-foreground",
														children: product?.name ?? "—"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "ml-auto text-xs text-muted-foreground",
														children: formatDate(r.created_at)
													})
												]
											}), r.comment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm",
												children: r.comment
											}) : null]
										}, r.id);
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "portefeuille",
							className: "mt-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
									children: [
										{
											label: "Solde disponible",
											value: wallet?.balance ?? 0
										},
										{
											label: "En attente",
											value: wallet?.pending_balance ?? 0
										},
										{
											label: "Total gagné",
											value: wallet?.total_earned ?? 0
										},
										{
											label: "Total retiré",
											value: wallet?.total_withdrawn ?? 0
										}
									].map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "surface-card p-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: w.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-display text-xl font-bold",
											children: formatPrice(w.value)
										})]
									}, w.label))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithdrawalForm, {
									vendorId: vendor.id,
									balance: Number(wallet?.balance ?? 0),
									payoutMethod: vendor.payout_method,
									payoutDetails: vendor.payout_details
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-8 text-lg font-bold",
									children: "Historique des retraits"
								}),
								withdrawals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "surface-card mt-3 p-8 text-center text-muted-foreground",
									children: "Aucun retrait demandé."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 space-y-2",
									children: withdrawals.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "surface-card flex flex-wrap items-center gap-3 p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: formatPrice(w.amount)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-secondary px-3 py-1 text-xs",
												children: w.status
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: w.method
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-auto text-xs text-muted-foreground",
												children: formatDate(w.created_at)
											})
										]
									}, w.id))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "boutique",
							className: "mt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopSettings, { vendor })
						})
					]
				})
			})
		]
	});
}
function ProductDialog({ vendorId, product, trigger }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [images, setImages] = (0, import_react.useState)(product?.images ?? []);
	const queryClient = useQueryClient();
	const { data: categories = [] } = useQuery(categoriesQuery());
	const onSubmit = async (event) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const name = String(form.get("name") ?? "").trim();
		if (!name) {
			toast.error("Le nom du produit est requis");
			return;
		}
		const payload = {
			name,
			description: String(form.get("description") ?? "").trim() || null,
			brand: String(form.get("brand") ?? "").trim() || null,
			price: Number(form.get("price") ?? 0),
			compare_at_price: form.get("compare_at_price") ? Number(form.get("compare_at_price")) : null,
			stock: Number(form.get("stock") ?? 0),
			category_id: String(form.get("category_id") ?? "") || null,
			images
		};
		setSaving(true);
		const { error } = product ? await supabase.from("products").update(payload).eq("id", product.id) : await supabase.from("products").insert({
			...payload,
			vendor_id: vendorId,
			slug: uniqueSlug(name),
			status: "approved"
		});
		setSaving(false);
		if (error) {
			toast.error("Enregistrement impossible", { description: error.message });
			return;
		}
		toast.success(product ? "Produit mis à jour" : "Produit ajouté avec succès");
		queryClient.invalidateQueries({ queryKey: ["vendor-products"] });
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: (next) => {
			setOpen(next);
			if (next) setImages(product?.images ?? []);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: trigger ?? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Ajouter un produit"] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[85vh] overflow-y-auto sm:max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: product ? "Modifier le produit" : "Nouveau produit" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "name",
							children: "Nom *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							name: "name",
							defaultValue: product?.name ?? "",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "price",
									children: "Prix (FCFA) *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "price",
									name: "price",
									type: "number",
									min: 0,
									defaultValue: product?.price ?? "",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "compare_at_price",
									children: "Prix barré"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "compare_at_price",
									name: "compare_at_price",
									type: "number",
									min: 0,
									defaultValue: product?.compare_at_price ?? ""
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "stock",
									children: "Stock"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "stock",
									name: "stock",
									type: "number",
									min: 0,
									defaultValue: product?.stock ?? 0
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "brand",
									children: "Marque"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "brand",
									name: "brand",
									defaultValue: product?.brand ?? ""
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "category_id",
							children: "Catégorie"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "category_id",
							name: "category_id",
							defaultValue: product?.category_id ?? "",
							className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "— Choisir —"
							}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: c.id,
								children: [c.parent_id ? "— " : "", c.name]
							}, c.id))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Photos du produit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
							value: images,
							onChange: setImages
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "description",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "description",
							name: "description",
							rows: 4,
							defaultValue: product?.description ?? ""
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: saving,
						children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Enregistrer"]
					}) })
				]
			})]
		})]
	});
}
function WithdrawalForm({ vendorId, balance, payoutMethod, payoutDetails }) {
	const queryClient = useQueryClient();
	const [saving, setSaving] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "surface-card mt-6 grid gap-4 p-6 sm:grid-cols-[160px_1fr_auto] sm:items-end",
		onSubmit: async (event) => {
			event.preventDefault();
			const form = new FormData(event.currentTarget);
			const amount = Number(form.get("amount") ?? 0);
			if (amount <= 0 || amount > balance) {
				toast.error("Montant invalide", { description: "Le montant dépasse votre solde." });
				return;
			}
			setSaving(true);
			const { error } = await supabase.from("withdrawals").insert({
				vendor_id: vendorId,
				amount,
				method: String(form.get("method") ?? payoutMethod ?? "wave"),
				details: String(form.get("details") ?? payoutDetails ?? "")
			});
			setSaving(false);
			if (error) {
				toast.error("Demande impossible", { description: error.message });
				return;
			}
			toast.success("Demande de retrait envoyée");
			queryClient.invalidateQueries({ queryKey: ["vendor-withdrawals"] });
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "amount",
					children: "Montant à retirer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "amount",
					name: "amount",
					type: "number",
					min: 0,
					max: balance
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "details",
					children: "Numéro / compte"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "details",
					name: "details",
					defaultValue: payoutDetails ?? ""
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: saving || balance <= 0,
				children: "Demander un retrait"
			})
		]
	});
}
function ShopSettings({ vendor }) {
	const queryClient = useQueryClient();
	const [saving, setSaving] = (0, import_react.useState)(false);
	const value = (key) => vendor[key] ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "surface-card grid gap-4 p-6 sm:grid-cols-2",
		onSubmit: async (event) => {
			event.preventDefault();
			const form = new FormData(event.currentTarget);
			setSaving(true);
			const { error } = await supabase.from("vendors").update({
				shop_name: String(form.get("shop_name") ?? "").trim(),
				phone: String(form.get("phone") ?? "").trim() || null,
				whatsapp: String(form.get("whatsapp") ?? "").trim() || null,
				city: String(form.get("city") ?? "").trim() || null,
				zone: String(form.get("zone") ?? "").trim() || null,
				address: String(form.get("address") ?? "").trim() || null,
				description: String(form.get("description") ?? "").trim() || null,
				logo_url: String(form.get("logo_url") ?? "").trim() || null,
				cover_url: String(form.get("cover_url") ?? "").trim() || null,
				opening_hours: String(form.get("opening_hours") ?? "").trim() || null,
				payout_details: String(form.get("payout_details") ?? "").trim() || null
			}).eq("id", vendor["id"]);
			setSaving(false);
			if (error) {
				toast.error("Mise à jour impossible", { description: error.message });
				return;
			}
			toast.success("Boutique mise à jour");
			queryClient.invalidateQueries({ queryKey: ["my-vendor"] });
			queryClient.invalidateQueries({ queryKey: ["vendors"] });
			queryClient.invalidateQueries({ queryKey: ["vendor"] });
		},
		children: [
			[
				["shop_name", "Nom de la boutique"],
				["phone", "Téléphone"],
				["whatsapp", "WhatsApp"],
				["city", "Ville"],
				["zone", "Zone"],
				["address", "Adresse"],
				["logo_url", "URL du logo"],
				["cover_url", "URL de la couverture"],
				["opening_hours", "Horaires"],
				["payout_details", "Coordonnées de paiement"]
			].map(([name, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: name,
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: name,
					name,
					defaultValue: value(name)
				})]
			}, name)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5 sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "description",
					children: "Description"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "description",
					name: "description",
					rows: 4,
					defaultValue: value("description")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sm:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					disabled: saving,
					children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Enregistrer"]
				})
			})
		]
	});
}
//#endregion
export { VendorDashboard as component };
