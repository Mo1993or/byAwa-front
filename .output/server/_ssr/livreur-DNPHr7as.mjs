import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as supabase } from "./client-fmFI4d4G.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { K as CircleCheck, W as Clock, a as Truck, n as Wallet } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as Button, u as useAuth } from "./router-CinPgn2I.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.mjs";
import { r as formatPrice } from "./format-igmN2sYS.mjs";
import { a as DashboardShell, l as dashTabTriggerClass, o as StatCard, s as StatGrid, u as dashTabsListClass } from "./DashboardShell-DDRDh37s.mjs";
import { a as useMonthlySeries, i as TrendChart, n as ChartGrid, r as MonthlyBarChart, t as BreakdownChart } from "./DashboardCharts-m2Y4aErK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/livreur-DNPHr7as.js
var import_jsx_runtime = require_jsx_runtime();
function DriverDashboard() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const { data: driver, isLoading } = useQuery({
		queryKey: ["my-driver", user?.id],
		enabled: Boolean(user?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("drivers").select("*").eq("user_id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const { data: deliveries = [] } = useQuery({
		queryKey: ["driver-deliveries", driver?.id],
		enabled: Boolean(driver?.id),
		refetchInterval: 3e4,
		queryFn: async () => {
			const { data, error } = await supabase.from("deliveries").select("id,status,fee,mode,created_at,vendor_orders(vendors(shop_name),orders(order_number,shipping_name,shipping_phone,shipping_city,shipping_zone,shipping_street,total))").eq("driver_id", driver.id).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const nextStatus = {
		assigned: {
			value: "delivering",
			label: "Démarrer la livraison"
		},
		delivering: {
			value: "delivered",
			label: "Marquer comme livrée"
		}
	};
	async function updateStatus(id, status) {
		const { error } = await supabase.from("deliveries").update({
			status,
			...status === "delivered" ? { delivered_at: (/* @__PURE__ */ new Date()).toISOString() } : {}
		}).eq("id", id);
		if (error) {
			toast.error("Mise à jour impossible", { description: error.message });
			return;
		}
		toast.success("Statut mis à jour");
		queryClient.invalidateQueries({ queryKey: ["driver-deliveries", driver?.id] });
	}
	async function toggleAvailability() {
		if (!driver) return;
		const { error } = await supabase.from("drivers").update({ is_available: !driver.is_available }).eq("id", driver.id);
		if (error) {
			toast.error("Mise à jour impossible", { description: error.message });
			return;
		}
		queryClient.invalidateQueries({ queryKey: ["my-driver", user?.id] });
	}
	const deliverySeries = useMonthlySeries(deliveries, (d) => d.created_at, [{
		key: "livraisons",
		value: () => 1
	}, {
		key: "revenus",
		value: (d) => Number(d.fee ?? 0)
	}]);
	const statusBreakdown = [
		{
			name: "À préparer",
			value: deliveries.filter((d) => d.status === "to_prepare").length
		},
		{
			name: "Assignées",
			value: deliveries.filter((d) => d.status === "assigned").length
		},
		{
			name: "En cours",
			value: deliveries.filter((d) => d.status === "delivering").length
		},
		{
			name: "Livrées",
			value: deliveries.filter((d) => d.status === "delivered").length
		},
		{
			name: "Échouées",
			value: deliveries.filter((d) => d.status === "failed").length
		}
	];
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-byawa py-16 text-muted-foreground",
		children: "Chargement…"
	});
	if (!driver) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold",
			children: "Compte livreur non activé"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted-foreground",
			children: "Contactez l'équipe BYAWA à contact@byawa.com pour activer votre espace livreur."
		})]
	});
	const inProgress = deliveries.filter((d) => d.status === "delivering" || d.status === "assigned");
	const done = deliveries.filter((d) => d.status === "delivered");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardShell, {
		title: driver.full_name,
		subtitle: `${driver.city ?? "Sénégal"}`,
		icon: Truck,
		badge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("rounded-full px-3 py-1 text-[11px] font-bold uppercase border", driver.is_available ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground border-border"),
			children: driver.is_available ? "En ligne" : "Hors ligne"
		}),
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			size: "sm",
			onClick: () => void toggleAvailability(),
			children: driver.is_available ? "Passer hors ligne" : "Passer en ligne"
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatGrid, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: Truck,
					label: "Livraisons totales",
					value: deliveries.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: Clock,
					label: "En cours",
					value: inProgress.length,
					tone: inProgress.length ? "warning" : "default"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: CircleCheck,
					label: "Terminées",
					value: done.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: Wallet,
					label: "Revenus",
					value: formatPrice(driver.earnings),
					tone: "primary"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChartGrid, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
					title: "Tendance des revenus",
					subtitle: "Gains de livraison sur 6 mois",
					data: deliverySeries,
					dataKey: "revenus",
					label: "Revenus",
					formatter: formatPrice
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthlyBarChart, {
					title: "Évolution mensuelle",
					subtitle: "Nombre de livraisons par mois",
					data: deliverySeries,
					series: [{
						key: "livraisons",
						label: "Livraisons"
					}]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreakdownChart, {
					title: "Répartition des livraisons",
					subtitle: "Par statut",
					data: statusBreakdown
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "livraisons",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: dashTabsListClass,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								className: dashTabTriggerClass,
								value: "livraisons",
								children: "Mes livraisons"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								className: dashTabTriggerClass,
								value: "performance",
								children: "Performance"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "livraisons",
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold",
								children: "Mes livraisons"
							}), deliveries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "surface-card mt-4 p-10 text-center text-muted-foreground",
								children: "Aucune livraison ne vous est encore assignée."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-3",
								children: deliveries.map((d) => {
									const order = d.vendor_orders?.orders;
									const action = nextStatus[d.status];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "surface-card space-y-3 p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium",
														children: order?.order_number ?? `Livraison ${d.id.slice(0, 8)}`
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-full bg-secondary px-3 py-1 text-xs",
														children: d.status
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm text-muted-foreground",
														children: d.vendor_orders?.vendors?.shop_name ?? d.mode
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "ml-auto font-bold text-primary",
														children: formatPrice(d.fee)
													})
												]
											}),
											order ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground",
												children: [
													order.shipping_name,
													order.shipping_phone,
													order.shipping_street,
													order.shipping_zone,
													order.shipping_city
												].filter(Boolean).join(" · ")
											}) : null,
											action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												onClick: () => void updateStatus(d.id, action.value),
												children: action.label
											}) : null
										]
									}, d.id);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "performance",
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "surface-card p-10 text-center text-muted-foreground",
								children: "Statistiques de performance détaillées à venir."
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
export { DriverDashboard as component };
