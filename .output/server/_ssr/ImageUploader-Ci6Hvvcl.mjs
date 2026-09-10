import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as supabase } from "./client-fmFI4d4G.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { N as LoaderCircle, R as ImagePlus, k as Menu, t as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as SheetTrigger, S as SheetTitle, T as Button, b as SheetContent, w as Input, x as SheetHeader, y as Sheet } from "./router-CinPgn2I.mjs";
import { t as Tabs } from "./tabs-CCJRliUM.mjs";
import { t as SmartImage } from "./SmartImage-W4xELWJj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ImageUploader-Ci6Hvvcl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NavButton({ item, active, onSelect }) {
	const Icon = item.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onSelect(item.value),
		"aria-current": active ? "page" : void 0,
		className: cn("group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all", active ? "bg-primary text-primary-foreground shadow-[0_8px_18px_-10px_color-mix(in_oklab,var(--primary)_85%,transparent)]" : "text-slate-300 hover:bg-white/8 hover:text-white"),
		children: [
			Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 flex-1 truncate text-left",
				children: item.label
			}),
			item.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("grid min-w-5 place-items-center rounded-full px-1.5 text-[10px] font-bold", active ? "bg-white/25 text-primary-foreground" : "bg-amber-500 text-slate-900"),
				children: item.badge
			}) : null
		]
	});
}
/**
* Dashboard tabs rendered as a vertical sidebar (desktop) and a hamburger
* sheet menu (mobile / tablet).
*/
function DashboardTabs({ items, defaultValue, navTitle = "Modules", children }) {
	const [value, setValue] = (0, import_react.useState)(defaultValue ?? items[0]?.value ?? "");
	const [open, setOpen] = (0, import_react.useState)(false);
	const current = items.find((i) => i.value === value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		value,
		onValueChange: setValue,
		className: "flex flex-col gap-4 lg:flex-row lg:gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
					open,
					onOpenChange: setOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "h-11 w-full justify-start gap-3 rounded-xl border-slate-200 bg-white font-semibold text-slate-900",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: current?.label ?? navTitle
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
						side: "left",
						className: "w-[82vw] max-w-xs border-none bg-[#0F172A] p-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
							className: "border-b border-white/10 p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
								className: "font-display text-base text-white",
								children: navTitle
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex flex-col gap-1 overflow-y-auto p-3",
							children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
								item,
								active: item.value === value,
								onSelect: (v) => {
									setValue(v);
									setOpen(false);
								}
							}, item.value))
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "hidden w-60 shrink-0 lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "sticky top-24 flex flex-col gap-1 rounded-2xl bg-[#0F172A] p-3 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.9)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500",
						children: navTitle
					}), items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
						item,
						active: item.value === value,
						onSelect: setValue
					}, item.value))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 flex-1",
				children
			})
		]
	});
}
var BUCKET = "product-images";
var TEN_YEARS = 31536e4;
var MAX_SIZE = 5242880;
/** Téléversement d'images produit (galerie + ajout par URL). */
function ImageUploader({ value, onChange, max = 6, className }) {
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [url, setUrl] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const handleFiles = async (files) => {
		if (!files || files.length === 0) return;
		const { data: auth } = await supabase.auth.getUser();
		const userId = auth.user?.id;
		if (!userId) {
			toast.error("Session expirée, reconnectez-vous");
			return;
		}
		const slots = max - value.length;
		if (slots <= 0) {
			toast.error(`Maximum ${max} images`);
			return;
		}
		setUploading(true);
		const added = [];
		for (const file of Array.from(files).slice(0, slots)) {
			if (!file.type.startsWith("image/")) {
				toast.error(`${file.name} n'est pas une image`);
				continue;
			}
			if (file.size > MAX_SIZE) {
				toast.error(`${file.name} dépasse 5 Mo`);
				continue;
			}
			const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
			const path = `${userId}/${crypto.randomUUID()}.${ext}`;
			const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
				cacheControl: "31536000",
				upsert: false
			});
			if (error) {
				toast.error("Téléversement impossible", { description: error.message });
				continue;
			}
			const { data: signed } = await supabase.storage.from(BUCKET).createSignedUrl(path, TEN_YEARS);
			if (signed?.signedUrl) added.push(signed.signedUrl);
		}
		setUploading(false);
		if (inputRef.current) inputRef.current.value = "";
		if (added.length) {
			onChange([...value, ...added]);
			toast.success(`${added.length} image(s) ajoutée(s)`);
		}
	};
	const remove = (index) => onChange(value.filter((_, i) => i !== index));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-3", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2 sm:grid-cols-4",
				children: [value.map((src, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative aspect-square overflow-hidden rounded-lg border bg-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmartImage, {
							src,
							alt: `Image ${index + 1}`,
							className: "size-full object-cover"
						}),
						index === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-1 top-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground",
							children: "Principale"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => remove(index),
							"aria-label": "Supprimer l'image",
							className: "absolute right-1 top-1 rounded-full bg-background/90 p-1 text-foreground shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
						})
					]
				}, `${src}-${index}`)), value.length < max ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => inputRef.current?.click(),
					disabled: uploading,
					className: "flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-muted-foreground/30 text-muted-foreground transition-colors hover:border-primary hover:text-primary",
					children: uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px]",
						children: "Ajouter"
					})] })
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept: "image/*",
				multiple: true,
				className: "hidden",
				onChange: (event) => void handleFiles(event.target.files)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: url,
					onChange: (event) => setUrl(event.target.value),
					placeholder: "…ou coller une URL d'image",
					onKeyDown: (event) => {
						if (event.key === "Enter") event.preventDefault();
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => {
						const clean = url.trim();
						if (!clean) return;
						if (value.length >= max) {
							toast.error(`Maximum ${max} images`);
							return;
						}
						onChange([...value, clean]);
						setUrl("");
					},
					children: "Ajouter"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "JPG/PNG/WebP · 5 Mo max · la première image est la photo principale."
			})
		]
	});
}
//#endregion
export { ImageUploader as n, DashboardTabs as t };
