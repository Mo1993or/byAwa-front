import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DashboardShell-DDRDh37s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
function DashboardShell({ title, subtitle, children, badge, actions, icon: Icon, avatarUrl }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#F8FAFC]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-byawa py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:flex md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-3.5",
						children: [avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: avatarUrl,
							alt: title,
							className: "size-11 shrink-0 rounded-2xl border border-slate-200 object-cover"
						}) : Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[0_6px_16px_-6px_color-mix(in_oklab,var(--primary)_70%,transparent)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "truncate font-display text-lg font-bold tracking-tight text-slate-900 sm:text-xl",
									children: title
								}), badge]
							}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs font-medium text-slate-500",
								children: subtitle
							})]
						})]
					}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex shrink-0 items-center gap-2",
						children: actions
					})]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "container-byawa flex flex-col gap-6 py-6 md:gap-8 md:py-8",
			children
		})]
	});
}
function StatCard({ icon: Icon, label, value, description, hint, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "group relative gap-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-0 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_14px_30px_-18px_rgba(15,23,42,0.35)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col items-start gap-2.5 p-3.5 md:gap-4 md:p-5",
			children: [Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("grid size-10 shrink-0 place-items-center rounded-xl md:size-11", tone === "warning" ? "bg-amber-500/12 text-amber-600" : tone === "primary" ? "bg-primary/12 text-primary" : "bg-slate-900/8 text-slate-700"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 md:text-[11px]",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 truncate font-display text-lg font-bold tracking-tight text-slate-900 md:mt-2 md:text-[28px]",
						children: value
					}),
					(description || hint) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 flex items-center gap-1.5 text-[11px] font-medium leading-tight text-slate-500 md:mt-2 md:text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 shrink-0 rounded-full", tone === "warning" ? "bg-amber-500" : tone === "primary" ? "bg-primary" : "bg-slate-300") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: description || hint
						})]
					})
				]
			})]
		})
	});
}
function StatGrid({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-6",
		children
	});
}
var dashTabsListClass = "flex w-full overflow-x-auto no-scrollbar justify-start gap-2 rounded-none border-b border-slate-200 bg-transparent p-0 mb-8";
var dashTabTriggerClass = "relative h-10 rounded-none border-b-2 border-transparent px-4 pb-2 pt-2 text-sm font-semibold text-slate-500 transition-all hover:text-slate-900 data-[state=active]:border-primary data-[state=active]:text-slate-900 data-[state=active]:shadow-none cursor-pointer";
function StepHeader({ step, total, labels }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "flex items-center gap-3",
		children: labels.slice(0, total).map((label, i) => {
			const index = i + 1;
			const active = index === step;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-1 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold", index < step || active ? "bg-primary text-primary-foreground" : "bg-slate-100 text-slate-400"),
					children: index
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("truncate text-xs font-semibold", active ? "text-slate-900" : "text-slate-400"),
					children: label
				})]
			}, label);
		})
	});
}
//#endregion
export { DashboardShell as a, StepHeader as c, CardTitle as i, dashTabTriggerClass as l, CardContent as n, StatCard as o, CardHeader as r, StatGrid as s, Card as t, dashTabsListClass as u };
