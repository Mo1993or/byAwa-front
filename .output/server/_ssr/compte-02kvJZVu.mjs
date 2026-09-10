import { t as supabase } from "./client-fmFI4d4G.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as MapPin, B as Heart, P as LifeBuoy, Q as Bell, T as Package, i as User, u as Store } from "../_libs/lucide-react.mjs";
import { T as Button, u as useAuth } from "./router-CinPgn2I.mjs";
import { n as formatDate, r as formatPrice } from "./format-igmN2sYS.mjs";
import { t as displayEmail } from "./phone-DO4nSPZj.mjs";
import { a as DashboardShell, o as StatCard, s as StatGrid } from "./DashboardShell-DDRDh37s.mjs";
import { a as useMonthlySeries, i as TrendChart, n as ChartGrid, r as MonthlyBarChart, t as BreakdownChart } from "./DashboardCharts-m2Y4aErK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compte-02kvJZVu.js
var import_jsx_runtime = require_jsx_runtime();
function AccountPage() {
	const { user, roles } = useAuth();
	const { data: orders = [] } = useQuery({
		queryKey: ["my-orders", user?.id],
		enabled: Boolean(user?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("id,order_number,total,status,payment_status,created_at").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: addresses = [] } = useQuery({
		queryKey: ["my-addresses", user?.id],
		enabled: Boolean(user?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("addresses").select("*");
			if (error) throw error;
			return data ?? [];
		}
	});
	const spendSeries = useMonthlySeries(orders, (o) => o.created_at, [{
		key: "depenses",
		value: (o) => Number(o.total ?? 0)
	}, {
		key: "commandes",
		value: () => 1
	}]);
	const statusBreakdown = [
		{
			name: "En cours",
			value: orders.filter((o) => [
				"placed",
				"paid",
				"preparing",
				"shipped",
				"delivering"
			].includes(String(o.status))).length
		},
		{
			name: "Livrées",
			value: orders.filter((o) => o.status === "delivered").length
		},
		{
			name: "Annulées",
			value: orders.filter((o) => o.status === "cancelled").length
		},
		{
			name: "Retournées",
			value: orders.filter((o) => o.status === "returned").length
		}
	];
	const totalSpent = orders.reduce((s, o) => s + Number(o.total ?? 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardShell, {
		title: displayEmail(user?.email) ?? "Mon compte",
		subtitle: `Rôles : ${roles.length ? roles.join(", ") : "client"}`,
		icon: User,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "sm",
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/devenir-vendeur",
				children: "Vendre sur BYAWA"
			})
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatGrid, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: Package,
					label: "Commandes",
					value: orders.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: MapPin,
					label: "Adresses",
					value: addresses.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: Heart,
					label: "Total dépensé",
					value: formatPrice(totalSpent),
					tone: "primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: Bell,
					label: "Notifications",
					value: 0
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChartGrid, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
					title: "Tendance de mes dépenses",
					subtitle: "Montant dépensé sur 6 mois",
					data: spendSeries,
					dataKey: "depenses",
					label: "Dépenses",
					formatter: formatPrice
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthlyBarChart, {
					title: "Évolution mensuelle",
					subtitle: "Nombre de commandes par mois",
					data: spendSeries,
					series: [{
						key: "commandes",
						label: "Commandes"
					}]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreakdownChart, {
					title: "Répartition de mes commandes",
					subtitle: "Par statut",
					data: statusBreakdown
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Mes commandes"
				}), orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card mt-4 p-10 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Vous n'avez pas encore passé de commande."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/categories",
							children: "Commencer mes achats"
						})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "surface-card flex flex-wrap items-center gap-4 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold",
								children: ["#", o.order_number]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: formatDate(o.created_at)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-secondary px-3 py-1 text-xs font-medium",
								children: o.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto font-bold text-primary",
								children: formatPrice(o.total)
							})
						]
					}, o.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 pt-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/devenir-vendeur",
					className: "surface-card flex items-center gap-3 p-5 hover:border-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: "Ouvrir une boutique"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Vendez vos produits sur BYAWA"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/aide",
					className: "surface-card flex items-center gap-3 p-5 hover:border-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeBuoy, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: "Support & réclamations"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Nous sommes là pour vous aider"
					})] })]
				})]
			})
		]
	});
}
//#endregion
export { AccountPage as component };
