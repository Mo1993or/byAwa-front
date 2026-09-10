import { i as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as supabase } from "./client-fmFI4d4G.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as Slot, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as QueryClientProvider, n as queryOptions, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { A as MapPin, C as Phone, F as LayoutGrid, G as Circle, I as Instagram, J as ChevronRight, M as LogOut, U as Facebook, W as Clock, X as Check, a as Truck, g as ShieldCheck, i as User, j as Mail, k as Menu, p as ShoppingCart, t as X, u as Store, y as Search, z as House } from "../_libs/lucide-react.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CinPgn2I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CblGBDIW.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var byawa_logo_default = "/assets/byawa-logo-D7VC61Ew.png";
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var PRODUCT_SELECT = "id,name,slug,description,brand,price,compare_at_price,stock,images,rating,reviews_count,sales_count,is_featured,category_id,vendor_id,created_at,vendors(id,shop_name,slug,city,logo_url,rating),categories(name,slug)";
var categoriesQuery = () => queryOptions({
	queryKey: ["categories"],
	queryFn: async () => {
		const { data, error } = await supabase.from("categories").select("id,parent_id,name,slug,icon,image_url,position").eq("is_active", true).order("position");
		if (error) throw error;
		return data ?? [];
	},
	staleTime: 3e5
});
var bannersQuery = () => queryOptions({
	queryKey: ["banners"],
	queryFn: async () => {
		const { data, error } = await supabase.from("banners").select("id,title,subtitle,image_url,link,position").eq("is_active", true).order("position");
		if (error) throw error;
		return data ?? [];
	},
	staleTime: 3e5
});
var vendorsQuery = () => queryOptions({
	queryKey: ["vendors"],
	queryFn: async () => {
		const { data, error } = await supabase.from("vendors").select("id,shop_name,slug,city,zone,logo_url,cover_url,description,rating,is_featured").eq("status", "approved").order("rating", { ascending: false });
		if (error) throw error;
		return data ?? [];
	},
	staleTime: 3e4
});
var vendorQuery = (slug) => queryOptions({
	queryKey: ["vendor", slug],
	queryFn: async () => {
		const { data, error } = await supabase.from("vendors").select("*").eq("slug", slug).eq("status", "approved").maybeSingle();
		if (error) throw error;
		return data;
	},
	staleTime: 3e4
});
var productsQuery = (filters = {}) => queryOptions({
	queryKey: ["products", filters],
	queryFn: async () => {
		let categoryIds = null;
		if (filters.categorySlug) {
			const { data: cats, error: catErr } = await supabase.from("categories").select("id,parent_id,slug");
			if (catErr) throw catErr;
			const root = (cats ?? []).find((c) => c.slug === filters.categorySlug);
			if (!root) return [];
			categoryIds = [root.id, ...(cats ?? []).filter((c) => c.parent_id === root.id).map((c) => c.id)];
		}
		let vendorId = null;
		if (filters.vendorSlug) {
			const { data: vendor } = await supabase.from("vendors").select("id").eq("slug", filters.vendorSlug).maybeSingle();
			if (!vendor) return [];
			vendorId = vendor.id;
		}
		let query = supabase.from("products").select(PRODUCT_SELECT);
		if (!filters.adminView) query = query.eq("status", "approved");
		if (categoryIds) query = query.in("category_id", categoryIds);
		if (vendorId) query = query.eq("vendor_id", vendorId);
		if (filters.featured) query = query.eq("is_featured", true);
		if (filters.search) query = query.or(`name.ilike.%${filters.search}%,brand.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
		if (filters.minPrice != null) query = query.gte("price", filters.minPrice);
		if (filters.maxPrice != null) query = query.lte("price", filters.maxPrice);
		switch (filters.sort) {
			case "price_asc":
				query = query.order("price", { ascending: true });
				break;
			case "price_desc":
				query = query.order("price", { ascending: false });
				break;
			case "new":
				query = query.order("created_at", { ascending: false });
				break;
			case "rated":
				query = query.order("rating", { ascending: false });
				break;
			default: query = query.order("sales_count", { ascending: false });
		}
		const { data, error } = await query.limit(filters.limit ?? 48);
		if (error) throw error;
		return data ?? [];
	}
});
var productQuery = (slug) => queryOptions({
	queryKey: ["product", slug],
	queryFn: async () => {
		const { data, error } = await supabase.from("products").select(PRODUCT_SELECT).eq("slug", slug).eq("status", "approved").maybeSingle();
		if (error) throw error;
		return data ?? null;
	}
});
var reviewsQuery = (productId) => queryOptions({
	queryKey: ["reviews", productId],
	queryFn: async () => {
		const { data, error } = await supabase.from("reviews").select("id,rating,comment,author_name,created_at").eq("product_id", productId).eq("is_approved", true).order("created_at", { ascending: false });
		if (error) throw error;
		return data ?? [];
	}
});
var STORAGE_KEY = "byawa.cart.v1";
var CartContext = (0, import_react.createContext)({
	lines: [],
	count: 0,
	subtotal: 0,
	add: () => {},
	setQuantity: () => {},
	remove: () => {},
	clear: () => {}
});
function CartProvider({ children }) {
	const [lines, setLines] = (0, import_react.useState)([]);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setLines(JSON.parse(raw));
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
	}, [lines, hydrated]);
	const add = (0, import_react.useCallback)((line, quantity = 1) => {
		setLines((prev) => {
			if (prev.find((l) => l.productId === line.productId)) return prev.map((l) => l.productId === line.productId ? {
				...l,
				quantity: Math.min(l.quantity + quantity, Math.max(l.stock, 1))
			} : l);
			return [...prev, {
				...line,
				quantity
			}];
		});
	}, []);
	const setQuantity = (0, import_react.useCallback)((productId, quantity) => {
		setLines((prev) => prev.map((l) => l.productId === productId ? {
			...l,
			quantity: Math.max(0, quantity)
		} : l).filter((l) => l.quantity > 0));
	}, []);
	const remove = (0, import_react.useCallback)((productId) => {
		setLines((prev) => prev.filter((l) => l.productId !== productId));
	}, []);
	const clear = (0, import_react.useCallback)(() => setLines([]), []);
	const value = (0, import_react.useMemo)(() => ({
		lines,
		count: lines.reduce((sum, l) => sum + l.quantity, 0),
		subtotal: lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
		add,
		setQuantity,
		remove,
		clear
	}), [
		lines,
		add,
		setQuantity,
		remove,
		clear
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	return (0, import_react.useContext)(CartContext);
}
var AuthContext = (0, import_react.createContext)({
	user: null,
	session: null,
	roles: [],
	loading: true,
	rolesLoaded: false,
	isAdmin: false,
	isVendor: false,
	isDriver: false,
	refreshRoles: async () => {},
	signOut: async () => {}
});
var ADMIN_ROLES = [
	"super_admin",
	"admin",
	"orders_manager",
	"vendors_manager",
	"delivery_manager",
	"support_manager"
];
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [roles, setRoles] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const timeout = setTimeout(() => {
			if (mounted) setLoading(false);
		}, 8e3);
		const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
			if (!mounted) return;
			setSession(nextSession);
			setUser(nextSession?.user ?? null);
			if (!nextSession?.user) setRoles([]);
			setLoading(false);
		});
		supabase.auth.getSession().then(({ data }) => {
			if (!mounted) return;
			setSession(data.session);
			setUser(data.session?.user ?? null);
		}).catch(() => {}).finally(() => {
			if (mounted) setLoading(false);
		});
		return () => {
			mounted = false;
			clearTimeout(timeout);
			sub.subscription.unsubscribe();
		};
	}, []);
	const userId = user?.id ?? null;
	const [rolesLoaded, setRolesLoaded] = (0, import_react.useState)(false);
	const refreshRoles = (0, import_react.useCallback)(async () => {
		if (!userId) return;
		const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId);
		if (error) return;
		setRoles((data ?? []).map((r) => r.role));
		setRolesLoaded(true);
	}, [userId]);
	(0, import_react.useEffect)(() => {
		if (!userId) {
			setRolesLoaded(false);
			return;
		}
		let cancelled = false;
		setRolesLoaded(false);
		supabase.from("user_roles").select("role").eq("user_id", userId).then(({ data, error }) => {
			if (cancelled) return;
			if (!error) setRoles((data ?? []).map((r) => r.role));
			setRolesLoaded(true);
		});
		return () => {
			cancelled = true;
		};
	}, [userId]);
	const value = {
		user,
		session,
		roles,
		loading,
		rolesLoaded,
		isAdmin: roles.some((r) => ADMIN_ROLES.includes(r)),
		isVendor: roles.includes("vendor"),
		isDriver: roles.includes("driver"),
		refreshRoles,
		signOut: async () => {
			await supabase.auth.signOut();
			setRoles([]);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	return (0, import_react.useContext)(AuthContext);
}
function Header() {
	const navigate = useNavigate();
	const [term, setTerm] = (0, import_react.useState)("");
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const { count } = useCart();
	const { user, isAdmin, isVendor, isDriver, signOut } = useAuth();
	const { data: categories = [] } = useQuery(categoriesQuery());
	const roots = categories.filter((c) => !c.parent_id);
	const submit = (e) => {
		e.preventDefault();
		if (!term.trim()) return;
		navigate({
			to: "/recherche",
			search: { q: term }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 w-full shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-night text-night-foreground hidden sm:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-byawa flex h-8 items-center justify-between text-[10px] uppercase tracking-wider font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Livraison partout au Sénégal · Paiement à la livraison disponible" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/devenir-vendeur",
							className: "hover:text-primary transition-colors",
							children: "Vendre sur BYAWA"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/aide",
							className: "hover:text-primary transition-colors",
							children: "Aide & Support"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border bg-card/98 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-byawa flex h-16 items-center gap-4 lg:gap-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open: menuOpen,
							onOpenChange: setMenuOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "lg:hidden -ml-2",
									"aria-label": "Ouvrir le menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
								side: "left",
								className: "w-[86vw] max-w-sm p-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
									className: "border-b p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
										className: "text-base",
										children: "Menu BYAWA"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex h-full flex-col gap-1 overflow-y-auto p-3 pb-24",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/",
											onClick: () => setMenuOpen(false),
											className: "rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary/60",
											children: "Accueil"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/categories",
											onClick: () => setMenuOpen(false),
											className: "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary/60",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-4 text-primary" }), " Tous les rayons"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/boutiques",
											onClick: () => setMenuOpen(false),
											className: "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary/60",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-4 text-primary" }), " Boutiques"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "px-3 pb-1 pt-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
											children: "Rayons"
										}),
										roots.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/categorie/$slug",
											params: { slug: c.slug },
											onClick: () => setMenuOpen(false),
											className: "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
											children: [c.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
										}, c.id)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "px-3 pb-1 pt-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
											children: "Mon espace"
										}),
										user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/admin",
												onClick: () => setMenuOpen(false),
												className: "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary/60",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary" }), " Super admin"]
											}),
											isVendor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/vendeur",
												onClick: () => setMenuOpen(false),
												className: "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary/60",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-4 text-primary" }), " Espace vendeur"]
											}),
											isDriver && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/livreur",
												onClick: () => setMenuOpen(false),
												className: "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary/60",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4 text-primary" }), " Espace livreur"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/compte",
												onClick: () => setMenuOpen(false),
												className: "rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary/60",
												children: "Mon compte client"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													setMenuOpen(false);
													signOut();
												},
												className: "flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-destructive hover:bg-destructive/10",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Se déconnecter"]
											})
										] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/devenir-vendeur",
											onClick: () => setMenuOpen(false),
											className: "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-primary hover:bg-secondary/60",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-4" }), " Devenir vendeur"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/auth",
											search: { mode: "signin" },
											onClick: () => setMenuOpen(false),
											className: "rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary/60",
											children: "Connexion vendeur / client"
										})] })
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: byawa_logo_default,
								alt: "BYAWA",
								width: 120,
								height: 28,
								className: "h-7 w-auto sm:h-8"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
							onSubmit: submit,
							className: "relative hidden md:flex flex-1 max-w-2xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: term,
										onChange: (e) => setTerm(e.target.value),
										placeholder: "Rechercher un produit, une marque, une boutique…",
										className: "h-10 rounded-full pl-11 pr-24 bg-secondary/50 border-transparent focus:bg-card focus:border-primary transition-all shadow-none focus:ring-0",
										"aria-label": "Rechercher"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										size: "sm",
										className: "absolute right-1 top-1 h-8 rounded-full px-4 text-xs font-bold",
										children: "Rechercher"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-1 sm:gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "md:hidden",
									onClick: () => navigate({ to: "/recherche" }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										className: "h-10 px-2 sm:px-3 gap-2 hover:bg-secondary/50 rounded-full",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline text-sm font-semibold",
											children: user ? "Mon compte" : "Connexion"
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
									align: "end",
									className: "w-56 mt-2 rounded-xl shadow-xl border-border",
									children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										(isVendor || isDriver || isAdmin) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest",
												children: "Espaces Pro"
											}),
											isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: "/admin",
													className: "cursor-pointer font-medium flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary" }), " Administration"]
												})
											}),
											isVendor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: "/vendeur",
													className: "cursor-pointer font-medium flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-4 text-primary" }), " Espace Vendeur"]
												})
											}),
											isDriver && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: "/livreur",
													className: "cursor-pointer font-medium flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4 text-primary" }), " Espace Livreur"]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest",
											children: "Espace Client"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/compte",
												className: "cursor-pointer font-medium",
												children: "Tableau de bord"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											onClick: () => void signOut(),
											className: "cursor-pointer text-destructive focus:text-destructive font-bold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4 mr-2" }), " Se déconnecter"]
										})
									] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest",
											children: "Vendeurs"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/devenir-vendeur",
												className: "cursor-pointer font-bold text-primary flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-4" }), " Inscription vendeur"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/auth",
												search: { mode: "signin" },
												className: "cursor-pointer font-medium",
												children: "Connexion vendeur"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest",
											children: "Clients"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/auth",
												className: "cursor-pointer font-medium",
												children: "Se connecter"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/auth",
												search: { mode: "signup" },
												className: "cursor-pointer font-medium",
												children: "Créer un compte client"
											})
										})
									] })
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "ghost",
									className: "h-10 px-2 sm:px-3 relative gap-2 hover:bg-secondary/50 rounded-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/panier",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "size-5" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden sm:inline text-sm font-semibold",
												children: "Panier"
											}),
											count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground shadow-sm animate-in zoom-in duration-300",
												children: count
											}) : null
										]
									})
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "hidden lg:block bg-card border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-byawa flex h-12 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/categories",
						className: "hidden lg:flex items-center gap-2 h-full px-4 text-sm font-bold border-r border-border hover:bg-secondary/50 transition-colors shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rayons" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar py-1 px-2 lg:px-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/categories",
								className: "lg:hidden shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20",
								children: "Rayons"
							}),
							roots.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/categorie/$slug",
								params: { slug: c.slug },
								className: "shrink-0 px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-full transition-all",
								children: c.name
							}, c.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/boutiques",
								className: "ml-auto shrink-0 px-3 py-1.5 text-xs sm:text-sm font-bold text-primary hover:bg-primary/5 rounded-full transition-all flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Boutiques" })]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:hidden bg-card px-4 pb-3 pt-1 border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: term,
						onChange: (e) => setTerm(e.target.value),
						placeholder: "Rechercher sur BYAWA...",
						className: "h-9 rounded-full pl-9 bg-secondary/50 border-transparent focus:bg-card focus:border-primary transition-all text-sm",
						"aria-label": "Rechercher"
					})]
				})
			})
		]
	});
}
var SITE_SETTING_DEFAULTS = {
	home_announcement: "",
	home_hero_title: "Tout ce qu'il vous faut, au meilleur prix",
	home_hero_subtitle: "Mode, électronique, maison, alimentation : commandez auprès de vendeurs vérifiés et faites-vous livrer partout au Sénégal.",
	home_hero_cta_label: "Explorer le catalogue",
	home_hero_cta2_label: "Ouvrir ma boutique",
	home_hero_image: "",
	home_stat_products: "1 000+",
	home_stat_cities: "14",
	contact_phone: "+221 77 000 00 00",
	contact_whatsapp: "",
	contact_email: "contact@byawa.com",
	contact_address: "Dakar, Sénégal",
	contact_hours: "Lun — Sam, 9h à 19h",
	social_facebook: "",
	social_instagram: ""
};
function siteSettingsQuery() {
	return queryOptions({
		queryKey: ["site-settings"],
		staleTime: 6e4,
		queryFn: async () => {
			const { data, error } = await supabase.from("settings").select("key,value");
			if (error) throw error;
			const merged = { ...SITE_SETTING_DEFAULTS };
			for (const row of data ?? []) if (row.key in merged && row.value?.trim()) merged[row.key] = row.value;
			return merged;
		}
	});
}
function Footer() {
	const { data: site } = useQuery(siteSettingsQuery());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-16 bg-night text-night-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-byawa grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: byawa_logo_default,
							alt: "BYAWA",
							width: 140,
							height: 34,
							loading: "lazy",
							className: "h-8 w-auto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-night-foreground/70",
							children: "La marketplace généraliste qui connecte les vendeurs africains à leurs clients : mode, électronique, maison, alimentation et bien plus."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: site?.social_facebook || "#",
								target: "_blank",
								rel: "noreferrer",
								"aria-label": "Facebook",
								className: "rounded-full bg-white/10 p-2 hover:bg-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: site?.social_instagram || "#",
								target: "_blank",
								rel: "noreferrer",
								"aria-label": "Instagram",
								className: "rounded-full bg-white/10 p-2 hover:bg-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-4" })
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 text-sm font-semibold uppercase tracking-wide",
					children: "Acheter"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-night-foreground/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/categories",
							className: "hover:text-primary",
							children: "Toutes les catégories"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/boutiques",
							className: "hover:text-primary",
							children: "Nos boutiques"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/recherche",
							search: { q: "" },
							className: "hover:text-primary",
							children: "Recherche avancée"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/panier",
							className: "hover:text-primary",
							children: "Mon panier"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 text-sm font-semibold uppercase tracking-wide",
					children: "Vendre & Livrer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-night-foreground/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/devenir-vendeur",
							className: "hover:text-primary",
							children: "Devenir vendeur"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/vendre",
							className: "hover:text-primary",
							children: "Commissions & retraits"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/aide",
							className: "hover:text-primary",
							children: "Devenir livreur"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/suivi",
							className: "hover:text-primary",
							children: "Suivre ma commande"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/aide",
							className: "hover:text-primary",
							children: "Centre d'aide"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 text-sm font-semibold uppercase tracking-wide",
					children: "Contact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-3 text-sm text-night-foreground/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `tel:${(site?.contact_phone ?? "").replace(/[^+\d]/g, "")}`,
								className: "hover:text-primary",
								children: site?.contact_phone
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${site?.contact_email ?? ""}`,
								className: "hover:text-primary",
								children: site?.contact_email
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-primary" }),
								" ",
								site?.contact_address
							]
						}),
						site?.contact_hours ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-primary" }),
								" ",
								site.contact_hours
							]
						}) : null
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-byawa flex flex-col gap-3 py-5 text-xs text-night-foreground/60 sm:flex-row sm:items-center sm:justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" BYAWA. Tous droits réservés."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-x-4 gap-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/politique-de-confidentialite",
							className: "hover:text-primary hover:underline",
							children: "Politique de confidentialité"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/aide",
							className: "hover:text-primary hover:underline",
							children: "Centre d'aide"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Paiement sécurisé · Vendeurs vérifiés · Livraison suivie" })
				]
			})
		})]
	});
}
var baseItems = [
	{
		to: "/",
		label: "Accueil",
		icon: House,
		cart: false
	},
	{
		to: "/recherche",
		label: "Recherche",
		icon: Search,
		cart: false
	},
	{
		to: "/panier",
		label: "Panier",
		icon: ShoppingCart,
		cart: true
	}
];
var accountTab = {
	to: "/compte",
	label: "Compte",
	icon: User,
	cart: false
};
function MobileTabBar() {
	const { count } = useCart();
	const { user, isAdmin, isVendor, isDriver } = useAuth();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const pro = isAdmin ? {
		to: "/admin",
		label: "Admin",
		icon: ShieldCheck,
		cart: false
	} : isVendor ? {
		to: "/vendeur",
		label: "Boutique",
		icon: Store,
		cart: false
	} : isDriver ? {
		to: "/livreur",
		label: "Courses",
		icon: Truck,
		cart: false
	} : null;
	const items = pro ? [
		...baseItems,
		pro,
		accountTab
	] : user ? [...baseItems, accountTab] : [...baseItems, {
		to: "/devenir-vendeur",
		label: "Vendre",
		icon: Store,
		cart: false
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Navigation mobile",
		className: "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-md md:hidden",
		style: { paddingBottom: "env(safe-area-inset-bottom)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: cn("grid", items.length === 5 ? "grid-cols-5" : "grid-cols-4"),
			children: items.map((item) => {
				const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: cn("flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors", active ? "text-primary" : "text-muted-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), item.cart && count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -right-2.5 -top-2 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold leading-4 text-primary-foreground",
							children: count
						}) : null]
					}), item.label]
				}) }, item.to);
			})
		})
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$20 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "BYAWA — Marketplace multi-vendeurs" },
			{
				name: "description",
				content: "BYAWA, la marketplace généraliste : mode, électronique, maison, alimentation. Vendeurs vérifiés et livraison partout au Sénégal."
			},
			{
				name: "author",
				content: "BYAWA"
			},
			{
				property: "og:title",
				content: "BYAWA — Marketplace multi-vendeurs"
			},
			{
				property: "og:description",
				content: "Achetez et vendez sur BYAWA, la marketplace africaine de tous les jours."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap"
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fr",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$20.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col pb-16 md:pb-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileTabBar, {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			richColors: true
		})] }) })
	});
}
var $$splitComponentImporter$19 = () => import("./routes-CpdCTOju.mjs");
var Route$19 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "BYAWA — La marketplace africaine de tous les jours" },
		{
			name: "description",
			content: "Achetez mode, électronique, électroménager, maison et alimentation auprès de vendeurs vérifiés. Livraison partout au Sénégal, paiement à la livraison."
		},
		{
			property: "og:title",
			content: "BYAWA — La marketplace africaine de tous les jours"
		},
		{
			property: "og:description",
			content: "Des milliers de produits, des centaines de boutiques vérifiées, livrés chez vous."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./route-Di7iQBCH.mjs");
var Route$18 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./aide-B8GXUH2R.mjs");
var Route$17 = createFileRoute("/aide")({
	head: () => ({ meta: [
		{ title: "Centre d'aide — BYAWA" },
		{
			name: "description",
			content: "Questions fréquentes BYAWA : commandes, livraison, paiement, retours, vendeurs et livreurs."
		},
		{
			property: "og:title",
			content: "Centre d'aide — BYAWA"
		},
		{
			property: "og:description",
			content: "Trouvez rapidement une réponse à vos questions sur BYAWA."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./auth-CHkcUTZQ.mjs");
var Route$16 = createFileRoute("/auth")({
	validateSearch: (search) => ({ mode: search["mode"] === "signup" ? "signup" : "signin" }),
	head: () => ({ meta: [
		{ title: "Connexion & inscription — BYAWA" },
		{
			name: "description",
			content: "Connectez-vous à votre compte BYAWA ou créez-en un pour commander, vendre ou livrer."
		},
		{
			property: "og:title",
			content: "Connexion & inscription — BYAWA"
		},
		{
			property: "og:description",
			content: "Accédez à votre espace BYAWA."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./boutiques-BWXDI35M.mjs");
var Route$15 = createFileRoute("/boutiques")({
	head: () => ({ meta: [
		{ title: "Boutiques vérifiées — BYAWA" },
		{
			name: "description",
			content: "Découvrez les boutiques vérifiées de BYAWA : mode, high-tech, maison, beauté, alimentation. Achetez directement auprès des vendeurs."
		},
		{
			property: "og:title",
			content: "Boutiques vérifiées — BYAWA"
		},
		{
			property: "og:description",
			content: "Toutes les boutiques partenaires de la marketplace BYAWA."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./categories-VIBl5K97.mjs");
var Route$14 = createFileRoute("/categories")({
	head: () => ({ meta: [
		{ title: "Toutes les catégories — BYAWA" },
		{
			name: "description",
			content: "Parcourez toutes les catégories BYAWA : mode, électronique, électroménager, maison, cuisine, beauté, sport, alimentation et plus."
		},
		{
			property: "og:title",
			content: "Toutes les catégories — BYAWA"
		},
		{
			property: "og:description",
			content: "Le catalogue complet de la marketplace BYAWA."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./commander-l4NROgou.mjs");
var Route$13 = createFileRoute("/commander")({
	head: () => ({ meta: [
		{ title: "Commander sans compte — BYAWA" },
		{
			name: "description",
			content: "Finalisez votre commande BYAWA en quelques secondes, avec ou sans compte, et payez à la livraison."
		},
		{
			property: "og:title",
			content: "Commander sans compte — BYAWA"
		},
		{
			property: "og:description",
			content: "Commande express BYAWA : livraison suivie partout au Sénégal."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./devenir-vendeur-BdhtEzUi.mjs");
var Route$12 = createFileRoute("/devenir-vendeur")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Créer ma boutique — BYAWA" },
		{
			name: "description",
			content: "Déposez votre dossier vendeur BYAWA : informations boutique, coordonnées, catégorie et modalités de paiement."
		},
		{
			property: "og:title",
			content: "Créer ma boutique — BYAWA"
		},
		{
			property: "og:description",
			content: "Ouvrez votre boutique sur la marketplace BYAWA."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./panier-CMsKigeD.mjs");
var Route$11 = createFileRoute("/panier")({
	head: () => ({ meta: [
		{ title: "Mon panier — BYAWA" },
		{
			name: "description",
			content: "Vérifiez vos articles, les vendeurs et le total avant de commander sur BYAWA."
		},
		{
			property: "og:title",
			content: "Mon panier — BYAWA"
		},
		{
			property: "og:description",
			content: "Panier multi-vendeurs BYAWA."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./politique-de-confidentialite-Bgu5CKON.mjs");
var Route$10 = createFileRoute("/politique-de-confidentialite")({
	head: () => ({ meta: [
		{ title: "Confidentialité, livraison et retours — BYAWA" },
		{
			name: "description",
			content: "Découvrez comment BYAWA protège vos données, livre vos commandes et gère les retours au Sénégal."
		},
		{
			property: "og:title",
			content: "Confidentialité, livraison et retours — BYAWA"
		},
		{
			property: "og:description",
			content: "Politique de confidentialité, conditions de livraison et modalités de retour de BYAWA."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./recherche-bx5bKmud.mjs");
var Route$9 = createFileRoute("/recherche")({
	validateSearch: (search) => ({ q: typeof search["q"] === "string" ? search["q"] : "" }),
	head: () => ({ meta: [
		{ title: "Recherche — BYAWA" },
		{
			name: "description",
			content: "Recherchez parmi des milliers de produits BYAWA : filtrez par prix, catégorie, note et tri."
		},
		{
			property: "og:title",
			content: "Recherche — BYAWA"
		},
		{
			property: "og:description",
			content: "Trouvez le produit qu'il vous faut sur BYAWA."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./suivi-BhAUuTM0.mjs");
var Route$8 = createFileRoute("/suivi")({
	validateSearch: (search) => typeof search["ref"] === "string" ? { ref: search["ref"] } : {},
	head: () => ({ meta: [
		{ title: "Suivre ma commande et mon livreur — BYAWA" },
		{
			name: "description",
			content: "Suivez l'état de votre commande BYAWA, la préparation du vendeur et la progression de votre livreur en temps réel."
		},
		{
			property: "og:title",
			content: "Suivre ma commande — BYAWA"
		},
		{
			property: "og:description",
			content: "Suivi de commande et de livraison BYAWA."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./vendre-Drol-_Z0.mjs");
var Route$7 = createFileRoute("/vendre")({
	head: () => ({ meta: [
		{ title: "Devenir vendeur — BYAWA" },
		{
			name: "description",
			content: "Ouvrez votre boutique sur BYAWA : publiez vos produits, gérez vos commandes, suivez vos commissions et retirez vos revenus."
		},
		{
			property: "og:title",
			content: "Devenir vendeur — BYAWA"
		},
		{
			property: "og:description",
			content: "Vendez à des milliers de clients sur la marketplace BYAWA."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin-DZB60fVs.mjs");
var Route$6 = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [
		{ title: "Administration — BYAWA" },
		{
			name: "description",
			content: "Pilotage global de la marketplace BYAWA : vendeurs, produits, commandes, livraisons et finance."
		},
		{
			property: "og:title",
			content: "Administration — BYAWA"
		},
		{
			property: "og:description",
			content: "Tableau de bord administrateur BYAWA."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./compte-02kvJZVu.mjs");
var Route$5 = createFileRoute("/_authenticated/compte")({
	head: () => ({ meta: [
		{ title: "Mon espace client — BYAWA" },
		{
			name: "description",
			content: "Suivez vos commandes, adresses, favoris et notifications sur BYAWA."
		},
		{
			property: "og:title",
			content: "Mon espace client — BYAWA"
		},
		{
			property: "og:description",
			content: "Votre tableau de bord client BYAWA."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./livreur-DNPHr7as.mjs");
var Route$4 = createFileRoute("/_authenticated/livreur")({
	head: () => ({ meta: [
		{ title: "Espace livreur — BYAWA" },
		{
			name: "description",
			content: "Consultez vos livraisons du jour, mettez à jour les statuts et suivez vos revenus."
		},
		{
			property: "og:title",
			content: "Espace livreur — BYAWA"
		},
		{
			property: "og:description",
			content: "Tableau de bord livreur BYAWA."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./vendeur-CyT2TS8z.mjs");
var Route$3 = createFileRoute("/_authenticated/vendeur")({
	head: () => ({ meta: [
		{ title: "Espace vendeur — BYAWA" },
		{
			name: "description",
			content: "Pilotez votre boutique BYAWA : produits, commandes, commissions et portefeuille."
		},
		{
			property: "og:title",
			content: "Espace vendeur — BYAWA"
		},
		{
			property: "og:description",
			content: "Tableau de bord vendeur BYAWA."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./boutique._slug-BuItBbWH.mjs");
var Route$2 = createFileRoute("/boutique/$slug")({
	head: ({ params }) => {
		const label = params.slug.replace(/-/g, " ");
		return { meta: [
			{ title: `Boutique ${label} — BYAWA` },
			{
				name: "description",
				content: `Découvrez les produits de la boutique ${label} sur BYAWA, vendeur vérifié.`
			},
			{
				property: "og:title",
				content: `Boutique ${label} — BYAWA`
			},
			{
				property: "og:description",
				content: `Catalogue complet de la boutique ${label} sur BYAWA.`
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./categorie._slug-71dCkPqZ.mjs");
var Route$1 = createFileRoute("/categorie/$slug")({
	head: ({ params }) => {
		const label = params.slug.replace(/-/g, " ");
		return { meta: [
			{ title: `${label} — BYAWA` },
			{
				name: "description",
				content: `Achetez ${label} sur BYAWA : produits de vendeurs vérifiés, livrés partout au Sénégal.`
			},
			{
				property: "og:title",
				content: `${label} — BYAWA`
			},
			{
				property: "og:description",
				content: `Le meilleur de la catégorie ${label} sur BYAWA.`
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./produit._slug-BBGe12zi.mjs");
var Route = createFileRoute("/produit/$slug")({
	head: ({ params }) => {
		const label = params.slug.replace(/-/g, " ");
		return { meta: [
			{ title: `${label} — BYAWA` },
			{
				name: "description",
				content: `Achetez ${label} sur BYAWA. Vendeur vérifié, livraison suivie, paiement à la livraison.`
			},
			{
				property: "og:title",
				content: `${label} — BYAWA`
			},
			{
				property: "og:description",
				content: `Fiche produit ${label} sur la marketplace BYAWA.`
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$19.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$20
});
var AuthenticatedRouteRoute = Route$18.update({
	id: "/_authenticated",
	getParentRoute: () => Route$20
});
var AideRoute = Route$17.update({
	id: "/aide",
	path: "/aide",
	getParentRoute: () => Route$20
});
var AuthRoute = Route$16.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$20
});
var BoutiquesRoute = Route$15.update({
	id: "/boutiques",
	path: "/boutiques",
	getParentRoute: () => Route$20
});
var CategoriesRoute = Route$14.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => Route$20
});
var CommanderRoute = Route$13.update({
	id: "/commander",
	path: "/commander",
	getParentRoute: () => Route$20
});
var DevenirVendeurRoute = Route$12.update({
	id: "/devenir-vendeur",
	path: "/devenir-vendeur",
	getParentRoute: () => Route$20
});
var PanierRoute = Route$11.update({
	id: "/panier",
	path: "/panier",
	getParentRoute: () => Route$20
});
var PolitiqueDeConfidentialiteRoute = Route$10.update({
	id: "/politique-de-confidentialite",
	path: "/politique-de-confidentialite",
	getParentRoute: () => Route$20
});
var RechercheRoute = Route$9.update({
	id: "/recherche",
	path: "/recherche",
	getParentRoute: () => Route$20
});
var SuiviRoute = Route$8.update({
	id: "/suivi",
	path: "/suivi",
	getParentRoute: () => Route$20
});
var VendreRoute = Route$7.update({
	id: "/vendre",
	path: "/vendre",
	getParentRoute: () => Route$20
});
var AuthenticatedAdminRoute = Route$6.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCompteRoute = Route$5.update({
	id: "/compte",
	path: "/compte",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLivreurRoute = Route$4.update({
	id: "/livreur",
	path: "/livreur",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedVendeurRoute = Route$3.update({
	id: "/vendeur",
	path: "/vendeur",
	getParentRoute: () => AuthenticatedRouteRoute
});
var BoutiqueSlugRoute = Route$2.update({
	id: "/boutique/$slug",
	path: "/boutique/$slug",
	getParentRoute: () => Route$20
});
var CategorieSlugRoute = Route$1.update({
	id: "/categorie/$slug",
	path: "/categorie/$slug",
	getParentRoute: () => Route$20
});
var ProduitSlugRoute = Route.update({
	id: "/produit/$slug",
	path: "/produit/$slug",
	getParentRoute: () => Route$20
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminRoute,
	AuthenticatedCompteRoute,
	AuthenticatedLivreurRoute,
	AuthenticatedVendeurRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AideRoute,
	AuthRoute,
	BoutiquesRoute,
	CategoriesRoute,
	CommanderRoute,
	DevenirVendeurRoute,
	PanierRoute,
	PolitiqueDeConfidentialiteRoute,
	RechercheRoute,
	SuiviRoute,
	VendreRoute,
	BoutiqueSlugRoute,
	CategorieSlugRoute,
	ProduitSlugRoute
};
var routeTree = Route$20._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient({ defaultOptions: {
		queries: {
			staleTime: 6e4,
			gcTime: 3e5,
			retry: 1,
			retryDelay: (attempt) => Math.min(1e3 * 2 ** attempt, 5e3),
			refetchOnWindowFocus: false,
			refetchOnReconnect: true
		},
		mutations: { retry: 0 }
	} });
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { SheetTrigger as C, byawa_logo_default as E, SheetTitle as S, Button as T, vendorQuery as _, Route$8 as a, SheetContent as b, SITE_SETTING_DEFAULTS as c, useCart as d, bannersQuery as f, reviewsQuery as g, productsQuery as h, Route$2 as i, siteSettingsQuery as l, productQuery as m, Route as n, Route$9 as o, categoriesQuery as p, Route$1 as r, Route$16 as s, router_exports as t, useAuth as u, vendorsQuery as v, Input as w, SheetHeader as x, Sheet as y };
