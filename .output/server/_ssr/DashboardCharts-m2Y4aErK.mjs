import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./DashboardShell-DDRDh37s.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as PieChart, o as Area, p as Legend, r as BarChart, s as CartesianGrid, t as AreaChart, u as Cell } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DashboardCharts-m2Y4aErK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CHART_COLORS = [
	"hsl(24 95% 53%)",
	"hsl(199 89% 48%)",
	"hsl(142 71% 45%)",
	"hsl(45 93% 47%)",
	"hsl(280 65% 60%)",
	"hsl(0 84% 60%)",
	"hsl(215 20% 65%)"
];
var MONTHS = [
	"Jan",
	"Fév",
	"Mar",
	"Avr",
	"Mai",
	"Juin",
	"Juil",
	"Août",
	"Sep",
	"Oct",
	"Nov",
	"Déc"
];
/** Build a 6-month series from dated records. */
function useMonthlySeries(rows, getDate, metrics, months = 6) {
	return (0, import_react.useMemo)(() => {
		const now = /* @__PURE__ */ new Date();
		const buckets = {};
		const order = [];
		for (let i = months - 1; i >= 0; i--) {
			const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
			const key = `${d.getFullYear()}-${d.getMonth()}`;
			order.push(key);
			buckets[key] = { label: 0 };
			const base = {};
			metrics.forEach((m) => base[m.key] = 0);
			buckets[key] = base;
		}
		rows.forEach((row) => {
			const raw = getDate(row);
			if (!raw) return;
			const d = new Date(raw);
			if (Number.isNaN(d.getTime())) return;
			const key = `${d.getFullYear()}-${d.getMonth()}`;
			if (!buckets[key]) return;
			metrics.forEach((m) => {
				buckets[key][m.key] = (buckets[key][m.key] ?? 0) + m.value(row);
			});
		});
		return order.map((key) => {
			const parts = key.split("-").map(Number);
			return {
				name: MONTHS[parts[1] ?? 0] ?? "",
				year: parts[0] ?? 0,
				...buckets[key] ?? {}
			};
		});
	}, [rows, months]);
}
function ChartCard({ title, subtitle, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: `border-none shadow-sm bg-white ${className ?? ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-sm font-bold text-slate-900",
				children: title
			}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate-500",
				children: subtitle
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "h-[260px] pt-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children
			})
		})]
	});
}
var axisProps = {
	stroke: "hsl(215 16% 65%)",
	fontSize: 11,
	tickLine: false,
	axisLine: false
};
var tooltipStyle = { contentStyle: {
	borderRadius: 12,
	border: "1px solid hsl(214 32% 91%)",
	fontSize: 12,
	boxShadow: "0 8px 20px -8px rgba(0,0,0,.2)"
} };
/** Area chart — trend over time. */
function TrendChart({ title, subtitle, data, dataKey, label, formatter, color = CHART_COLORS[0] }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
		title,
		subtitle,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
			data,
			margin: {
				top: 5,
				right: 5,
				left: -18,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: `grad-${dataKey}`,
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "5%",
						stopColor: color,
						stopOpacity: .35
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "95%",
						stopColor: color,
						stopOpacity: 0
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					strokeDasharray: "3 3",
					vertical: false,
					stroke: "hsl(214 32% 91%)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "name",
					...axisProps
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					...axisProps,
					width: 55
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					...tooltipStyle,
					formatter: (v) => [formatter ? formatter(v) : v, label]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
					type: "monotone",
					dataKey,
					name: label,
					stroke: color,
					strokeWidth: 2.5,
					fill: `url(#grad-${dataKey})`
				})
			]
		})
	});
}
/** Bar chart — monthly evolution, optionally multi-series. */
function MonthlyBarChart({ title, subtitle, data, series, formatter }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
		title,
		subtitle,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data,
			margin: {
				top: 5,
				right: 5,
				left: -18,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					strokeDasharray: "3 3",
					vertical: false,
					stroke: "hsl(214 32% 91%)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "name",
					...axisProps
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					...axisProps,
					width: 55
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					...tooltipStyle,
					formatter: (v) => formatter ? formatter(v) : v
				}),
				series.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					wrapperStyle: { fontSize: 11 },
					iconType: "circle"
				}),
				series.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: s.key,
					name: s.label,
					fill: s.color ?? CHART_COLORS[i % CHART_COLORS.length],
					radius: [
						6,
						6,
						0,
						0
					],
					maxBarSize: 38
				}, s.key))
			]
		})
	});
}
/** Donut chart — distribution. */
function BreakdownChart({ title, subtitle, data, formatter }) {
	const filtered = data.filter((d) => d.value > 0);
	if (filtered.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "border-none shadow-sm bg-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-sm font-bold text-slate-900",
				children: title
			}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate-500",
				children: subtitle
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "flex h-[260px] items-center justify-center text-sm text-slate-400",
			children: "Pas encore de données"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
		title,
		subtitle,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
				data: filtered,
				dataKey: "value",
				nameKey: "name",
				innerRadius: 55,
				outerRadius: 85,
				paddingAngle: 3,
				stroke: "none",
				children: filtered.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: CHART_COLORS[i % CHART_COLORS.length] }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				...tooltipStyle,
				formatter: (v) => formatter ? formatter(v) : v
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
				wrapperStyle: { fontSize: 11 },
				iconType: "circle"
			})
		] })
	});
}
function ChartGrid({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-6 lg:grid-cols-3 mb-10",
		children
	});
}
//#endregion
export { useMonthlySeries as a, TrendChart as i, ChartGrid as n, MonthlyBarChart as r, BreakdownChart as t };
