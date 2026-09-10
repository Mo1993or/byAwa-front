import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as supabase } from "./client-fmFI4d4G.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { F as LayoutGrid, L as Image, N as LoaderCircle, P as LifeBuoy, T as Package, _ as ShieldAlert, a as Truck, b as Save, d as Star, l as Ticket, m as ShoppingBag, n as Wallet, r as Users, u as Store, v as Settings, x as RotateCcw, z as House } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as Button, c as SITE_SETTING_DEFAULTS, l as siteSettingsQuery, u as useAuth, w as Input } from "./router-CinPgn2I.mjs";
import { n as TabsContent } from "./tabs-CCJRliUM.mjs";
import { n as formatDate, r as formatPrice } from "./format-igmN2sYS.mjs";
import { n as formatPhone, t as displayEmail } from "./phone-DO4nSPZj.mjs";
import { t as SmartImage } from "./SmartImage-W4xELWJj.mjs";
import { a as DashboardShell, o as StatCard, s as StatGrid } from "./DashboardShell-DDRDh37s.mjs";
import { n as ImageUploader, t as DashboardTabs } from "./ImageUploader-Ci6Hvvcl.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { a as useMonthlySeries, i as TrendChart, n as ChartGrid, r as MonthlyBarChart, t as BreakdownChart } from "./DashboardCharts-m2Y4aErK.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DZB60fVs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function Panel({ title, description, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold text-slate-900",
				children: title
			}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-slate-500",
				children: description
			}) : null] }), action]
		}), children]
	});
}
function Empty({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "surface-card p-10 text-center text-muted-foreground",
		children: label
	});
}
function AdminCategories() {
	const qc = useQueryClient();
	const [name, setName] = (0, import_react.useState)("");
	const [parent, setParent] = (0, import_react.useState)("");
	const { data: categories = [] } = useQuery({
		queryKey: ["admin-categories"],
		queryFn: async () => {
			const { data, error } = await supabase.from("categories").select("id,name,slug,parent_id,is_active,position,commission_rate").order("position");
			if (error) throw error;
			return data ?? [];
		}
	});
	const create = useMutation({
		mutationFn: async () => {
			const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
			const { error } = await supabase.from("categories").insert({
				name,
				slug,
				parent_id: parent || null,
				position: categories.length + 1
			});
			if (error) throw error;
		},
		onSuccess: () => {
			setName("");
			setParent("");
			toast.success("Catégorie créée");
			qc.invalidateQueries({ queryKey: ["admin-categories"] });
			qc.invalidateQueries({ queryKey: ["categories"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const update = useMutation({
		mutationFn: async ({ id, patch }) => {
			const { error } = await supabase.from("categories").update(patch).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin-categories"] });
			qc.invalidateQueries({ queryKey: ["categories"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const roots = categories.filter((c) => !c.parent_id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Catégories",
		description: "Arborescence des rayons et commission par catégorie.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card flex flex-wrap items-end gap-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-45 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-muted-foreground",
						htmlFor: "cat-name",
						children: "Nom"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "cat-name",
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Ex. Épicerie"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-45 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-muted-foreground",
						htmlFor: "cat-parent",
						children: "Rayon parent"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						id: "cat-parent",
						value: parent,
						onChange: (e) => setParent(e.target.value),
						className: "mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "— Racine —"
						}), roots.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.name
						}, c.id))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: !name.trim() || create.isPending,
					onClick: () => create.mutate(),
					children: "Ajouter"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: categories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { label: "Aucune catégorie." }) : categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card flex flex-wrap items-center gap-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-semibold",
							children: [c.parent_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "↳ "
							}) : null, c.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: ["/", c.slug]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground",
							htmlFor: `comm-${c.id}`,
							children: "Commission %"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: `comm-${c.id}`,
							type: "number",
							min: 0,
							max: 50,
							defaultValue: c.commission_rate ?? "",
							className: "h-9 w-24",
							onBlur: (e) => update.mutate({
								id: c.id,
								patch: { commission_rate: e.target.value === "" ? null : Number(e.target.value) }
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "Active"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: c.is_active,
							onCheckedChange: (v) => update.mutate({
								id: c.id,
								patch: { is_active: v }
							})
						})]
					})
				]
			}, c.id))
		})]
	});
}
function AdminBanners() {
	const qc = useQueryClient();
	const [title, setTitle] = (0, import_react.useState)("");
	const [image, setImage] = (0, import_react.useState)("");
	const [link, setLink] = (0, import_react.useState)("");
	const { data: banners = [] } = useQuery({
		queryKey: ["admin-banners"],
		queryFn: async () => {
			const { data, error } = await supabase.from("banners").select("id,title,subtitle,image_url,link,is_active,position").order("position");
			if (error) throw error;
			return data ?? [];
		}
	});
	const create = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("banners").insert({
				title,
				image_url: image || null,
				link: link || null,
				position: banners.length + 1
			});
			if (error) throw error;
		},
		onSuccess: () => {
			setTitle("");
			setImage("");
			setLink("");
			toast.success("Bannière ajoutée");
			qc.invalidateQueries({ queryKey: ["admin-banners"] });
			qc.invalidateQueries({ queryKey: ["banners"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const update = useMutation({
		mutationFn: async ({ id, patch }) => {
			const { error } = await supabase.from("banners").update(patch).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin-banners"] });
			qc.invalidateQueries({ queryKey: ["banners"] });
		}
	});
	const remove = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("banners").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Bannière supprimée");
			qc.invalidateQueries({ queryKey: ["admin-banners"] });
			qc.invalidateQueries({ queryKey: ["banners"] });
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Bannières",
		description: "Visuels mis en avant sur la page d'accueil.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card flex flex-wrap items-end gap-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-45 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-muted-foreground",
						htmlFor: "ban-title",
						children: "Titre"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "ban-title",
						value: title,
						onChange: (e) => setTitle(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-45 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-muted-foreground",
						htmlFor: "ban-img",
						children: "Image (URL)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "ban-img",
						value: image,
						onChange: (e) => setImage(e.target.value),
						placeholder: "/images/banners/banner-1.jpg"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-45 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-muted-foreground",
						htmlFor: "ban-link",
						children: "Lien"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "ban-link",
						value: link,
						onChange: (e) => setLink(e.target.value),
						placeholder: "/categorie/mode"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: !title.trim() || create.isPending,
					onClick: () => create.mutate(),
					children: "Ajouter"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: banners.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { label: "Aucune bannière." }) : banners.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card flex flex-wrap items-center gap-3 p-4",
				children: [
					b.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: b.image_url,
						alt: b.title,
						className: "size-14 rounded-lg border object-cover"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: b.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: b.link ?? "Aucun lien"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: b.is_active,
						onCheckedChange: (v) => update.mutate({
							id: b.id,
							patch: { is_active: v }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => remove.mutate(b.id),
						children: "Supprimer"
					})
				]
			}, b.id))
		})]
	});
}
function AdminCoupons() {
	const qc = useQueryClient();
	const [code, setCode] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("percent");
	const [value, setValue] = (0, import_react.useState)("10");
	const [min, setMin] = (0, import_react.useState)("0");
	const { data: coupons = [] } = useQuery({
		queryKey: ["admin-coupons"],
		queryFn: async () => {
			const { data, error } = await supabase.from("coupons").select("id,code,discount_type,discount_value,min_amount,usage_limit,used_count,is_active,expires_at").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const create = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("coupons").insert({
				code: code.trim().toUpperCase(),
				discount_type: type,
				discount_value: Number(value),
				min_amount: Number(min)
			});
			if (error) throw error;
		},
		onSuccess: () => {
			setCode("");
			toast.success("Coupon créé");
			qc.invalidateQueries({ queryKey: ["admin-coupons"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const update = useMutation({
		mutationFn: async ({ id, patch }) => {
			const { error } = await supabase.from("coupons").update(patch).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => void qc.invalidateQueries({ queryKey: ["admin-coupons"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Coupons",
		description: "Codes promotionnels valables sur la marketplace.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card flex flex-wrap items-end gap-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs text-muted-foreground",
					htmlFor: "cp-code",
					children: "Code"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "cp-code",
					value: code,
					onChange: (e) => setCode(e.target.value),
					className: "w-40 uppercase"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs text-muted-foreground",
					htmlFor: "cp-type",
					children: "Type"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					id: "cp-type",
					value: type,
					onChange: (e) => setType(e.target.value),
					className: "mt-1 h-9 w-36 rounded-md border border-input bg-background px-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "percent",
						children: "Pourcentage"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "fixed",
						children: "Montant fixe"
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs text-muted-foreground",
					htmlFor: "cp-val",
					children: "Valeur"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "cp-val",
					type: "number",
					value,
					onChange: (e) => setValue(e.target.value),
					className: "w-28"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs text-muted-foreground",
					htmlFor: "cp-min",
					children: "Panier min."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "cp-min",
					type: "number",
					value: min,
					onChange: (e) => setMin(e.target.value),
					className: "w-32"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: !code.trim() || create.isPending,
					onClick: () => create.mutate(),
					children: "Créer"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: coupons.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { label: "Aucun coupon." }) : coupons.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card flex flex-wrap items-center gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono font-bold",
						children: c.code
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							c.discount_type === "percent" ? `${c.discount_value}%` : formatPrice(Number(c.discount_value)),
							" · min.",
							" ",
							formatPrice(Number(c.min_amount)),
							" · utilisé ",
							c.used_count,
							c.usage_limit ? `/${c.usage_limit}` : ""
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: c.is_active,
					onCheckedChange: (v) => update.mutate({
						id: c.id,
						patch: { is_active: v }
					})
				})]
			}, c.id))
		})]
	});
}
var TICKET_STATUSES = [
	"open",
	"pending",
	"resolved",
	"closed"
];
function AdminSupport() {
	const qc = useQueryClient();
	const { data: tickets = [] } = useQuery({
		queryKey: ["admin-tickets"],
		queryFn: async () => {
			const { data, error } = await supabase.from("support_tickets").select("id,subject,message,status,created_at,order_id").order("created_at", { ascending: false }).limit(100);
			if (error) throw error;
			return data ?? [];
		}
	});
	const update = useMutation({
		mutationFn: async ({ id, status }) => {
			const { error } = await supabase.from("support_tickets").update({ status }).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Ticket mis à jour");
			qc.invalidateQueries({ queryKey: ["admin-tickets"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Support",
		description: "Tickets envoyés par les clients et vendeurs.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: tickets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { label: "Aucun ticket." }) : tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card flex flex-wrap items-center gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: t.subject
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "line-clamp-2 text-xs text-muted-foreground",
							children: t.message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: formatDate(t.created_at)
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: t.status,
					onChange: (e) => update.mutate({
						id: t.id,
						status: e.target.value
					}),
					className: "h-9 rounded-md border border-input bg-background px-3 text-sm",
					"aria-label": "Statut du ticket",
					children: TICKET_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: s,
						children: s
					}, s))
				})]
			}, t.id))
		})
	});
}
var RETURN_STATUSES = [
	"requested",
	"approved",
	"refused",
	"received",
	"refunded"
];
function AdminReturns() {
	const qc = useQueryClient();
	const { data: returns = [] } = useQuery({
		queryKey: ["admin-returns"],
		queryFn: async () => {
			const { data, error } = await supabase.from("returns").select("id,reason,status,refund_amount,created_at,orders(order_number,total)").order("created_at", { ascending: false }).limit(100);
			if (error) throw error;
			return data ?? [];
		}
	});
	const update = useMutation({
		mutationFn: async ({ id, status }) => {
			const { error } = await supabase.from("returns").update({ status }).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Retour mis à jour");
			qc.invalidateQueries({ queryKey: ["admin-returns"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Retours & remboursements",
		description: "Demandes de retour à instruire.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: returns.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { label: "Aucune demande de retour." }) : returns.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card flex flex-wrap items-center gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: r.orders?.order_number ? `Commande ${r.orders.order_number}` : "Commande"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "line-clamp-2 text-xs text-muted-foreground",
							children: r.reason
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: [formatDate(r.created_at), r.refund_amount ? ` · remboursement ${formatPrice(Number(r.refund_amount))}` : ""]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: r.status,
					onChange: (e) => update.mutate({
						id: r.id,
						status: e.target.value
					}),
					className: "h-9 rounded-md border border-input bg-background px-3 text-sm",
					"aria-label": "Statut du retour",
					children: RETURN_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: s,
						children: s
					}, s))
				})]
			}, r.id))
		})
	});
}
var SECTIONS = [
	{
		title: "Bandeau d'annonce",
		description: "Message affiché tout en haut de la page d'accueil (laisser vide pour le masquer).",
		fields: [{
			key: "home_announcement",
			label: "Annonce",
			hint: "Ex : Livraison offerte à Dakar ce week-end"
		}]
	},
	{
		title: "Section principale (héro)",
		description: "Titre, texte et boutons de la première section de la page d'accueil.",
		fields: [
			{
				key: "home_hero_title",
				label: "Titre"
			},
			{
				key: "home_hero_subtitle",
				label: "Sous-titre",
				area: true
			},
			{
				key: "home_hero_cta_label",
				label: "Bouton principal"
			},
			{
				key: "home_hero_cta2_label",
				label: "Bouton secondaire"
			},
			{
				key: "home_stat_products",
				label: "Chiffre « Produits »"
			},
			{
				key: "home_stat_cities",
				label: "Chiffre « Villes livrées »"
			}
		]
	},
	{
		title: "Coordonnées visibles sur le site",
		description: "Affichées sur la page d'accueil et dans le pied de page.",
		fields: [
			{
				key: "contact_phone",
				label: "Numéro de téléphone",
				hint: "Ex : +221 77 123 45 67"
			},
			{
				key: "contact_whatsapp",
				label: "WhatsApp",
				hint: "Numéro international, sans espaces"
			},
			{
				key: "contact_email",
				label: "E-mail"
			},
			{
				key: "contact_address",
				label: "Adresse"
			},
			{
				key: "contact_hours",
				label: "Horaires"
			},
			{
				key: "social_facebook",
				label: "Lien Facebook"
			},
			{
				key: "social_instagram",
				label: "Lien Instagram"
			}
		]
	}
];
/** Édition du contenu de la page d'accueil et des informations de contact. */
function AdminHomeSettings() {
	const queryClient = useQueryClient();
	const { data, isLoading } = useQuery(siteSettingsQuery());
	const [form, setForm] = (0, import_react.useState)({ ...SITE_SETTING_DEFAULTS });
	(0, import_react.useEffect)(() => {
		if (data) setForm(data);
	}, [data]);
	const set = (key, value) => setForm((f) => ({
		...f,
		[key]: value
	}));
	const save = useMutation({
		mutationFn: async () => {
			const rows = Object.keys(SITE_SETTING_DEFAULTS).map((key) => ({
				key,
				value: form[key] ?? ""
			}));
			const { error } = await supabase.from("settings").upsert(rows, { onConflict: "key" });
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Page d'accueil mise à jour");
			queryClient.invalidateQueries({ queryKey: ["site-settings"] });
			queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
		},
		onError: (e) => toast.error("Enregistrement impossible", { description: e.message })
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "surface-card flex items-center justify-center p-10 text-muted-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			SECTIONS.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card space-y-4 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold",
					children: section.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: section.description
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: section.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: field.area ? "sm:col-span-2" : void 0,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium text-muted-foreground",
								htmlFor: field.key,
								children: field.label
							}),
							field.area ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: field.key,
								rows: 3,
								className: "mt-1",
								value: form[field.key],
								onChange: (e) => set(field.key, e.target.value)
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: field.key,
								className: "mt-1",
								value: form[field.key],
								placeholder: field.hint,
								onChange: (e) => set(field.key, e.target.value)
							}),
							field.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: field.hint
							}) : null
						]
					}, field.key))
				})]
			}, section.title)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card space-y-3 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold",
					children: "Image principale"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Visuel affiché à droite du titre sur la page d'accueil."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
					value: form.home_hero_image ? [form.home_hero_image] : [],
					onChange: (images) => set("home_hero_image", images[0] ?? ""),
					max: 1
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky bottom-4 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					onClick: () => save.mutate(),
					disabled: save.isPending,
					children: [save.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), "Enregistrer la page d'accueil"]
				})
			})
		]
	});
}
var ORDER_STATUSES = [
	"placed",
	"paid",
	"preparing",
	"shipped",
	"delivering",
	"delivered",
	"cancelled",
	"returned"
];
function AdminDashboard() {
	const { isAdmin, loading } = useAuth();
	const queryClient = useQueryClient();
	const invalidate = (keys) => keys.forEach((k) => queryClient.invalidateQueries({ queryKey: [k] }));
	const { data: vendors = [] } = useQuery({
		queryKey: ["admin-vendors"],
		enabled: isAdmin,
		queryFn: async () => {
			const { data, error } = await supabase.from("vendors").select("id,shop_name,slug,city,status,logo_url,commission_rate,created_at,phone,email,membership_fee,membership_status,membership_method,membership_reference,membership_paid_at").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: products = [] } = useQuery({
		queryKey: ["admin-products"],
		enabled: isAdmin,
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("id,name,price,stock,status,images,created_at,vendor_id,vendors(shop_name)").order("created_at", { ascending: false }).limit(200);
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: orders = [] } = useQuery({
		queryKey: ["admin-orders"],
		enabled: isAdmin,
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("id,order_number,total,status,payment_status,shipping_city,created_at").order("created_at", { ascending: false }).limit(200);
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: withdrawals = [] } = useQuery({
		queryKey: ["admin-withdrawals"],
		enabled: isAdmin,
		queryFn: async () => {
			const { data, error } = await supabase.from("withdrawals").select("id,amount,method,details,status,created_at,vendors(shop_name)").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: zonesCount = 0 } = useQuery({
		queryKey: ["admin-zones"],
		enabled: isAdmin,
		queryFn: async () => {
			const { count, error } = await supabase.from("delivery_zones").select("id", {
				count: "exact",
				head: true
			});
			if (error) throw error;
			return count ?? 0;
		}
	});
	const { data: profiles = [] } = useQuery({
		queryKey: ["admin-profiles"],
		enabled: isAdmin,
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("id,first_name,last_name,phone,email,is_blocked,created_at").order("created_at", { ascending: false }).limit(300);
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: drivers = [] } = useQuery({
		queryKey: ["admin-drivers"],
		enabled: isAdmin,
		queryFn: async () => {
			const { data, error } = await supabase.from("drivers").select("id,full_name,phone,city,vehicle,is_available,is_active,earnings,created_at").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: reviews = [] } = useQuery({
		queryKey: ["admin-reviews"],
		enabled: isAdmin,
		queryFn: async () => {
			const { data, error } = await supabase.from("reviews").select("id,rating,comment,author_name,is_approved,is_reported,created_at,products(name)").order("created_at", { ascending: false }).limit(200);
			if (error) throw error;
			return data ?? [];
		}
	});
	const setProfileBlocked = useMutation({
		mutationFn: async ({ id, blocked }) => {
			const { error } = await supabase.from("profiles").update({ is_blocked: blocked }).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Compte mis à jour");
			invalidate(["admin-profiles"]);
		},
		onError: (e) => toast.error("Action impossible", { description: e.message })
	});
	const setDriverActive = useMutation({
		mutationFn: async ({ id, active }) => {
			const { error } = await supabase.from("drivers").update({ is_active: active }).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Livreur mis à jour");
			invalidate(["admin-drivers"]);
		},
		onError: (e) => toast.error("Action impossible", { description: e.message })
	});
	const setReviewApproved = useMutation({
		mutationFn: async ({ id, approved }) => {
			const { error } = await supabase.from("reviews").update({
				is_approved: approved,
				is_reported: false
			}).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Avis mis à jour");
			invalidate(["admin-reviews"]);
		},
		onError: (e) => toast.error("Action impossible", { description: e.message })
	});
	const setVendorCommission = useMutation({
		mutationFn: async ({ id, rate }) => {
			const { error } = await supabase.from("vendors").update({ commission_rate: rate }).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Commission mise à jour");
			invalidate(["admin-vendors"]);
		},
		onError: (e) => toast.error("Action impossible", { description: e.message })
	});
	const { data: settings = [] } = useQuery({
		queryKey: ["admin-settings"],
		enabled: isAdmin,
		queryFn: async () => {
			const { data, error } = await supabase.from("settings").select("key,value");
			if (error) throw error;
			return data ?? [];
		}
	});
	const settingValue = (key, fallback) => settings.find((s) => s.key === key)?.value ?? fallback;
	const saveSetting = useMutation({
		mutationFn: async ({ key, value }) => {
			const { error } = await supabase.from("settings").upsert({
				key,
				value
			}, { onConflict: "key" });
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Réglage enregistré");
			invalidate(["admin-settings"]);
		},
		onError: (e) => toast.error("Action impossible", { description: e.message })
	});
	const setVendorMembership = useMutation({
		mutationFn: async ({ id, status, fee }) => {
			const patch = {};
			if (status) {
				patch.membership_status = status;
				patch.membership_paid_at = status === "paid" || status === "waived" ? (/* @__PURE__ */ new Date()).toISOString() : null;
			}
			if (fee !== void 0) patch.membership_fee = fee;
			const { error } = await supabase.from("vendors").update(patch).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Adhésion mise à jour");
			invalidate(["admin-vendors"]);
		},
		onError: (e) => toast.error("Action impossible", { description: e.message })
	});
	const setVendorStatus = useMutation({
		mutationFn: async ({ id, status, reason }) => {
			const { error } = await supabase.from("vendors").update({
				status,
				rejection_reason: reason ?? null
			}).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Statut vendeur mis à jour");
			invalidate(["admin-vendors"]);
		},
		onError: (e) => toast.error("Action impossible", { description: e.message })
	});
	const setProductStatus = useMutation({
		mutationFn: async ({ id, status, reason }) => {
			const { error } = await supabase.from("products").update({
				status,
				rejection_reason: reason ?? null
			}).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Produit mis à jour");
			invalidate(["admin-products"]);
		},
		onError: (e) => toast.error("Action impossible", { description: e.message })
	});
	const setOrderStatus = useMutation({
		mutationFn: async ({ id, status }) => {
			const { error } = await supabase.from("orders").update({ status }).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Commande mise à jour");
			invalidate(["admin-orders"]);
		},
		onError: (e) => toast.error("Action impossible", { description: e.message })
	});
	const setWithdrawalStatus = useMutation({
		mutationFn: async ({ id, status }) => {
			const { error } = await supabase.from("withdrawals").update({ status }).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Retrait mis à jour");
			invalidate(["admin-withdrawals"]);
		},
		onError: (e) => toast.error("Action impossible", { description: e.message })
	});
	const gmvSeries = useMonthlySeries(orders, (o) => o.created_at, [{
		key: "gmv",
		value: (o) => Number(o.total ?? 0)
	}]);
	const ordersSeries = useMonthlySeries(orders, (o) => o.created_at, [{
		key: "orders",
		value: () => 1
	}]);
	const vendorsSeries = useMonthlySeries(vendors, (v) => v.created_at, [{
		key: "vendors",
		value: () => 1
	}]);
	const productsSeries = useMonthlySeries(products, (p) => p.created_at, [{
		key: "products",
		value: () => 1
	}]);
	const activitySeries = ordersSeries.map((row, i) => ({
		...row,
		vendors: Number(vendorsSeries[i]?.["vendors"] ?? 0),
		products: Number(productsSeries[i]?.["products"] ?? 0)
	}));
	const orderStatusBreakdown = ORDER_STATUSES.map((s) => ({
		name: s,
		value: orders.filter((o) => String(o.status) === s).length
	}));
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-byawa py-16 text-muted-foreground",
		children: "Chargement…"
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "mx-auto size-12 text-destructive" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-2xl font-bold",
				children: "Accès réservé aux administrateurs"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Votre compte ne dispose pas des droits nécessaires pour accéder à cette page."
			})
		]
	});
	const pendingVendors = vendors.filter((v) => v.status === "pending" || v.status === "verifying");
	const pendingProducts = products.filter((p) => p.status === "pending");
	const pendingWithdrawals = withdrawals.filter((w) => w.status === "requested");
	const gmv = orders.reduce((sum, o) => sum + Number(o.total ?? 0), 0);
	const monthStart = /* @__PURE__ */ new Date();
	monthStart.setDate(1);
	monthStart.setHours(0, 0, 0, 0);
	const monthGmv = orders.filter((o) => new Date(o.created_at) >= monthStart).reduce((sum, o) => sum + Number(o.total ?? 0), 0);
	const avgBasket = orders.length > 0 ? gmv / orders.length : 0;
	const openOrders = orders.filter((o) => [
		"placed",
		"paid",
		"preparing",
		"shipped",
		"delivering"
	].includes(String(o.status))).length;
	const activeDrivers = drivers.filter((d) => d.is_active).length;
	const pendingReviews = reviews.filter((r) => !r.is_approved || r.is_reported);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardShell, {
		title: "Administration BYAWA",
		subtitle: "Vue globale et pilotage de la marketplace.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatGrid, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: Store,
					label: "Vendeurs",
					value: vendors.length,
					description: `${pendingVendors.length} à valider`,
					tone: pendingVendors.length ? "warning" : "default"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: Package,
					label: "Produits",
					value: products.length,
					description: "Catalogue global"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: ShoppingBag,
					label: "Commandes",
					value: orders.length,
					description: `${openOrders} en cours`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: Users,
					label: "GMV cumulée",
					value: formatPrice(gmv),
					description: `${formatPrice(monthGmv)} ce mois`,
					tone: "primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: Wallet,
					label: "Retraits",
					value: pendingWithdrawals.length,
					description: "en attente",
					tone: pendingWithdrawals.length ? "warning" : "default"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: Truck,
					label: "Livreurs",
					value: drivers.length,
					description: `${activeDrivers} actifs`
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatGrid, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Panier moyen",
					value: formatPrice(avgBasket)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Comptes clients",
					value: profiles.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Zones de livraison",
					value: zonesCount
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Avis à modérer",
					value: pendingReviews.length
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChartGrid, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
					title: "Tendance du chiffre d'affaires",
					subtitle: "GMV des 6 derniers mois",
					data: gmvSeries,
					dataKey: "gmv",
					label: "GMV",
					formatter: formatPrice
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthlyBarChart, {
					title: "Évolution mensuelle",
					subtitle: "Commandes et nouveaux vendeurs",
					data: activitySeries,
					series: [
						{
							key: "orders",
							label: "Commandes"
						},
						{
							key: "products",
							label: "Produits"
						},
						{
							key: "vendors",
							label: "Vendeurs"
						}
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreakdownChart, {
					title: "Répartition des commandes",
					subtitle: "Par statut",
					data: orderStatusBreakdown
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardTabs, {
					navTitle: "Modules super admin",
					defaultValue: "vendeurs",
					items: [
						{
							value: "vendeurs",
							label: "Vendeurs",
							icon: Store,
							badge: pendingVendors.length
						},
						{
							value: "produits",
							label: "Produits",
							icon: Package,
							badge: pendingProducts.length
						},
						{
							value: "commandes",
							label: "Commandes",
							icon: ShoppingBag
						},
						{
							value: "livreurs",
							label: "Livreurs",
							icon: Truck
						},
						{
							value: "utilisateurs",
							label: "Utilisateurs",
							icon: Users
						},
						{
							value: "categories",
							label: "Catégories",
							icon: LayoutGrid
						},
						{
							value: "bannieres",
							label: "Bannières",
							icon: Image
						},
						{
							value: "accueil",
							label: "Page d'accueil",
							icon: House
						},
						{
							value: "coupons",
							label: "Coupons",
							icon: Ticket
						},
						{
							value: "avis",
							label: "Avis",
							icon: Star,
							badge: pendingReviews.length
						},
						{
							value: "support",
							label: "Support",
							icon: LifeBuoy
						},
						{
							value: "retours",
							label: "Retours",
							icon: RotateCcw
						},
						{
							value: "finance",
							label: "Finance",
							icon: Wallet,
							badge: pendingWithdrawals.length
						},
						{
							value: "reglages",
							label: "Réglages",
							icon: Settings
						}
					],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "livreurs",
							className: "mt-0 space-y-3",
							children: drivers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "surface-card p-10 text-center text-muted-foreground",
								children: "Aucun livreur."
							}) : drivers.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-card flex flex-wrap items-center gap-3 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-semibold",
											children: d.full_name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												formatPhone(d.phone),
												" · ",
												d.city ?? "—",
												" · ",
												d.vehicle ?? "—"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-secondary px-3 py-1 text-xs",
										children: d.is_available ? "disponible" : "indisponible"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-primary",
										children: formatPrice(d.earnings)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: d.is_active ? "ghost" : "default",
										className: "ml-auto",
										onClick: () => setDriverActive.mutate({
											id: d.id,
											active: !d.is_active
										}),
										children: d.is_active ? "Désactiver" : "Activer"
									})
								]
							}, d.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "utilisateurs",
							className: "mt-0 space-y-3",
							children: profiles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-card flex flex-wrap items-center gap-3 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-semibold",
											children: [p.first_name, p.last_name].filter(Boolean).join(" ") || "Client BYAWA"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												formatPhone(p.phone),
												" · ",
												displayEmail(p.email) ?? "sans e-mail",
												" ·",
												" ",
												formatDate(p.created_at)
											]
										})]
									}),
									p.is_blocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-destructive/10 px-3 py-1 text-xs text-destructive",
										children: "bloqué"
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: p.is_blocked ? "default" : "ghost",
										className: "ml-auto",
										onClick: () => setProfileBlocked.mutate({
											id: p.id,
											blocked: !p.is_blocked
										}),
										children: p.is_blocked ? "Débloquer" : "Bloquer"
									})
								]
							}, p.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "avis",
							className: "mt-0 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									pendingReviews.length,
									" avis à modérer sur ",
									reviews.length,
									"."
								]
							}), reviews.map((r) => {
								const product = r.products;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "surface-card p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold",
												children: [r.rating, "/5"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm",
												children: r.author_name ?? "Client"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: product?.name ?? "—"
											}),
											r.is_reported ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-destructive/10 px-3 py-1 text-xs text-destructive",
												children: "signalé"
											}) : null,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-secondary px-3 py-1 text-xs",
												children: r.is_approved ? "publié" : "en attente"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "ml-auto flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													disabled: r.is_approved && !r.is_reported,
													onClick: () => setReviewApproved.mutate({
														id: r.id,
														approved: true
													}),
													children: "Publier"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													variant: "ghost",
													onClick: () => setReviewApproved.mutate({
														id: r.id,
														approved: false
													}),
													children: "Masquer"
												})]
											})
										]
									}), r.comment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm",
										children: r.comment
									}) : null]
								}, r.id);
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "vendeurs",
							className: "mt-0 space-y-3",
							children: vendors.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "surface-card p-10 text-center text-muted-foreground",
								children: "Aucun vendeur."
							}) : vendors.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-card flex flex-wrap items-center gap-3 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
										src: v.logo_url,
										alt: v.shop_name,
										className: "size-11 rounded-xl object-cover"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-semibold",
											children: v.shop_name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												v.city ?? "—",
												" · ",
												v.phone ?? v.email ?? "—",
												" · ",
												formatDate(v.created_at)
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-secondary px-3 py-1 text-xs uppercase",
										children: v.status
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `rounded-full px-3 py-1 text-xs ${v.membership_status === "paid" || v.membership_status === "waived" ? "bg-primary/15 text-primary" : v.membership_status === "pending" ? "bg-amber-500/15 text-amber-600" : "bg-destructive/10 text-destructive"}`,
										children: ["Adhésion ", v.membership_status === "paid" ? `payée (${formatPrice(Number(v.membership_fee ?? 0))})` : v.membership_status === "waived" ? "offerte" : v.membership_status === "pending" ? `à vérifier${v.membership_reference ? ` · réf ${v.membership_reference}` : ""}` : `non payée (${formatPrice(Number(v.membership_fee ?? 0))})`]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ml-auto flex flex-wrap gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												disabled: v.status === "approved",
												onClick: () => setVendorStatus.mutate({
													id: v.id,
													status: "approved"
												}),
												children: "Approuver"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "outline",
												onClick: () => {
													const reason = window.prompt("Motif du refus ?") ?? "";
													if (reason) setVendorStatus.mutate({
														id: v.id,
														status: "rejected",
														reason
													});
												},
												children: "Refuser"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "ghost",
												onClick: () => setVendorStatus.mutate({
													id: v.id,
													status: "suspended"
												}),
												children: "Suspendre"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "secondary",
												disabled: v.membership_status === "paid",
												onClick: () => setVendorMembership.mutate({
													id: v.id,
													status: "paid"
												}),
												children: "Adhésion payée"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "ghost",
												disabled: v.membership_status === "waived",
												onClick: () => setVendorMembership.mutate({
													id: v.id,
													status: "waived"
												}),
												children: "Offrir"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													min: 0,
													step: 500,
													defaultValue: Number(v.membership_fee ?? 0),
													className: "h-9 w-28 rounded-md border border-input bg-background px-2 text-sm",
													onBlur: (e) => {
														const fee = Number(e.target.value);
														if (fee !== Number(v.membership_fee ?? 0)) setVendorMembership.mutate({
															id: v.id,
															fee
														});
													},
													"aria-label": `Frais d'adhésion ${v.shop_name}`
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted-foreground",
													children: "FCFA adhésion"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													min: 0,
													max: 50,
													defaultValue: Number(v.commission_rate ?? 10),
													className: "h-9 w-20 rounded-md border border-input bg-background px-2 text-sm",
													onBlur: (e) => {
														const rate = Number(e.target.value);
														if (rate !== Number(v.commission_rate ?? 10)) setVendorCommission.mutate({
															id: v.id,
															rate
														});
													},
													"aria-label": `Commission ${v.shop_name}`
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted-foreground",
													children: "% comm."
												})]
											})
										]
									})
								]
							}, v.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "produits",
							className: "mt-0 space-y-3",
							children: products.map((p) => {
								const vendor = p.vendors;
								const images = p.images ?? [];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "surface-card flex flex-wrap items-center gap-3 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
											src: images[0],
											alt: p.name,
											className: "size-12 rounded-lg object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate font-medium",
												children: p.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: [
													vendor?.shop_name ?? "—",
													" · stock ",
													p.stock
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-secondary px-3 py-1 text-xs",
											children: p.status
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-primary",
											children: formatPrice(p.price)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "ml-auto flex flex-wrap gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													disabled: p.status === "approved",
													onClick: () => setProductStatus.mutate({
														id: p.id,
														status: "approved"
													}),
													children: "Publier"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													variant: "outline",
													onClick: () => {
														const reason = window.prompt("Motif du refus ?") ?? "";
														if (reason) setProductStatus.mutate({
															id: p.id,
															status: "rejected",
															reason
														});
													},
													children: "Refuser"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													variant: "ghost",
													onClick: () => setProductStatus.mutate({
														id: p.id,
														status: "disabled"
													}),
													children: "Désactiver"
												})
											]
										})
									]
								}, p.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "commandes",
							className: "mt-0 space-y-3",
							children: orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "surface-card p-10 text-center text-muted-foreground",
								children: "Aucune commande."
							}) : orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-card flex flex-wrap items-center gap-3 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold",
										children: ["#", o.order_number]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground",
										children: [
											o.shipping_city ?? "—",
											" · ",
											formatDate(o.created_at)
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-secondary px-3 py-1 text-xs",
										children: o.payment_status
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-primary",
										children: formatPrice(o.total)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: "ml-auto h-9 rounded-md border border-input bg-background px-3 text-sm",
										value: o.status,
										onChange: (e) => setOrderStatus.mutate({
											id: o.id,
											status: e.target.value
										}),
										children: ORDER_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: s,
											children: s
										}, s))
									})
								]
							}, o.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "finance",
							className: "mt-0 space-y-3",
							children: withdrawals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "surface-card p-10 text-center text-muted-foreground",
								children: "Aucune demande de retrait."
							}) : withdrawals.map((w) => {
								const vendor = w.vendors;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "surface-card flex flex-wrap items-center gap-3 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: vendor?.shop_name ?? "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-primary",
											children: formatPrice(w.amount)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted-foreground",
											children: [
												w.method ?? "—",
												" · ",
												w.details ?? "—",
												" · ",
												formatDate(w.created_at)
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-secondary px-3 py-1 text-xs",
											children: w.status
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "ml-auto flex gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													variant: "outline",
													onClick: () => setWithdrawalStatus.mutate({
														id: w.id,
														status: "processing"
													}),
													children: "En cours"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													onClick: () => setWithdrawalStatus.mutate({
														id: w.id,
														status: "paid"
													}),
													children: "Payé"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													variant: "ghost",
													onClick: () => setWithdrawalStatus.mutate({
														id: w.id,
														status: "rejected"
													}),
													children: "Refuser"
												})
											]
										})
									]
								}, w.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "reglages",
							className: "mt-0 space-y-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-card space-y-4 p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-lg font-bold",
										children: "Frais d'adhésion vendeur"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Montant demandé à chaque nouvelle boutique lors de son inscription."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-end gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs text-muted-foreground",
											htmlFor: "fee",
											children: "Montant (FCFA)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "fee",
											type: "number",
											min: 0,
											step: 500,
											defaultValue: settingValue("vendor_membership_fee", "10000"),
											className: "mt-1 block h-10 w-40 rounded-md border border-input bg-background px-3 text-sm",
											onBlur: (e) => saveSetting.mutate({
												key: "vendor_membership_fee",
												value: String(Number(e.target.value))
											})
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs text-muted-foreground",
											htmlFor: "comm",
											children: "Commission par défaut (%)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "comm",
											type: "number",
											min: 0,
											max: 50,
											defaultValue: settingValue("global_commission_rate", "10"),
											className: "mt-1 block h-10 w-40 rounded-md border border-input bg-background px-3 text-sm",
											onBlur: (e) => saveSetting.mutate({
												key: "global_commission_rate",
												value: String(Number(e.target.value))
											})
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs text-muted-foreground",
										htmlFor: "instr",
										children: "Instructions de paiement affichées au vendeur"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "instr",
										rows: 3,
										defaultValue: settingValue("membership_payment_instructions", ""),
										className: "mt-1 w-full rounded-md border border-input bg-background p-3 text-sm",
										onBlur: (e) => saveSetting.mutate({
											key: "membership_payment_instructions",
											value: e.target.value
										})
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Les modifications sont enregistrées automatiquement. La commission d'une boutique déjà créée se règle dans l'onglet Vendeurs."
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "categories",
							className: "mt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCategories, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "bannieres",
							className: "mt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBanners, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "coupons",
							className: "mt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCoupons, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "support",
							className: "mt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSupport, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "retours",
							className: "mt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminReturns, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "accueil",
							className: "mt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminHomeSettings, {})
						})
					]
				})
			})
		]
	});
}
//#endregion
export { AdminDashboard as component };
