import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-fmFI4d4G.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as byawa_logo_default, T as Button, s as Route$16, u as useAuth, w as Input } from "./router-CinPgn2I.mjs";
import { a as phoneToLoginEmail, i as normalizePhone, r as isValidPhone } from "./phone-DO4nSPZj.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CHkcUTZQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lovableAuth = createLovableAuth();
var lovable = { auth: { signInWithOAuth: async (provider, opts) => {
	const result = await lovableAuth.signInWithOAuth(provider, {
		...opts,
		extraParams: { ...opts?.extraParams }
	});
	if (result.redirected) return result;
	if (result.error) return result;
	try {
		await supabase.auth.setSession(result.tokens);
	} catch (e) {
		return { error: e instanceof Error ? e : new Error(String(e)) };
	}
	return result;
} } };
var ADMIN_ROLES = [
	"super_admin",
	"admin",
	"orders_manager",
	"vendors_manager",
	"delivery_manager",
	"support_manager"
];
/**
* Espace d'accueil après connexion : les espaces pro (vendeur, livreur, admin)
* sont prioritaires sur l'espace client.
*/
function homeRouteForRoles(roles) {
	if (roles.some((r) => ADMIN_ROLES.includes(r))) return "/admin";
	if (roles.includes("vendor")) return "/vendeur";
	if (roles.includes("driver")) return "/livreur";
	return "/compte";
}
function AuthPage() {
	const { mode } = Route$16.useSearch();
	const navigate = useNavigate();
	const { user, roles, rolesLoaded } = useAuth();
	const [isSignup, setIsSignup] = (0, import_react.useState)(mode === "signup");
	const [method, setMethod] = (0, import_react.useState)("phone");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [firstName, setFirstName] = (0, import_react.useState)("");
	const [lastName, setLastName] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (user && rolesLoaded) navigate({ to: homeRouteForRoles(roles) });
	}, [
		user,
		roles,
		rolesLoaded,
		navigate
	]);
	const submit = async (e) => {
		e.preventDefault();
		if (method === "phone" && !isValidPhone(phone)) {
			toast.error("Numéro invalide", { description: "Exemple : 77 123 45 67" });
			return;
		}
		const loginEmail = method === "phone" ? phoneToLoginEmail(phone) : email.trim();
		setLoading(true);
		try {
			if (isSignup) {
				const { error } = await supabase.auth.signUp({
					email: loginEmail,
					password,
					options: {
						emailRedirectTo: window.location.origin,
						data: {
							first_name: firstName,
							last_name: lastName,
							phone: method === "phone" ? normalizePhone(phone) : null
						}
					}
				});
				if (error) throw error;
				if (method === "phone") {
					const { error: signInError } = await supabase.auth.signInWithPassword({
						email: loginEmail,
						password
					});
					if (signInError) throw signInError;
				}
				toast.success("Compte créé", { description: "Bienvenue sur BYAWA." });
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email: loginEmail,
					password
				});
				if (error) throw error;
				toast.success("Bienvenue sur BYAWA");
			}
		} catch (err) {
			toast.error("Échec", { description: err instanceof Error ? err.message : "Réessayez." });
		} finally {
			setLoading(false);
		}
	};
	const google = async () => {
		const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
		if (result.error) {
			toast.error("Connexion Google impossible");
			return;
		}
		if (result.redirected) return;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-byawa flex justify-center py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: byawa_logo_default,
							alt: "BYAWA",
							width: 150,
							height: 36,
							className: "mx-auto h-9 w-auto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-5 text-2xl font-bold",
							children: isSignup ? "Créer un compte BYAWA" : "Connexion à votre compte"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Un numéro de téléphone suffit — aucune adresse e-mail requise."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card mb-4 flex items-center justify-between gap-3 border-primary/30 bg-primary/5 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold",
						children: "Vous êtes commerçant ?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Ouvrez votre boutique BYAWA — inscription vendeur prioritaire."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/devenir-vendeur",
							children: "Devenir vendeur"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card space-y-4 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							className: "w-full",
							onClick: () => void google(),
							children: "Continuer avec Google"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
								" ou ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2 rounded-lg bg-muted p-1",
							children: [["phone", "Téléphone"], ["email", "Email"]].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMethod(value),
								className: `rounded-md px-3 py-2 text-sm font-medium transition ${method === value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`,
								children: label
							}, value))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submit,
							className: "space-y-4",
							children: [
								isSignup ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "firstName",
										children: "Prénom"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "firstName",
										value: firstName,
										onChange: (e) => setFirstName(e.target.value),
										required: true
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "lastName",
										children: "Nom"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "lastName",
										value: lastName,
										onChange: (e) => setLastName(e.target.value),
										required: true
									})] })]
								}) : null,
								method === "phone" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "phone",
										children: "Numéro de téléphone"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "phone",
										type: "tel",
										inputMode: "tel",
										value: phone,
										onChange: (e) => setPhone(e.target.value),
										placeholder: "77 123 45 67",
										required: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "Aucune confirmation par e-mail : votre compte est actif immédiatement."
									})
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "vous@exemple.com",
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "password",
									children: "Mot de passe"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "password",
									type: "password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									minLength: 6,
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "lg",
									className: "w-full",
									disabled: loading,
									children: loading ? "Patientez…" : isSignup ? "Créer mon compte" : "Se connecter"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-center text-sm text-muted-foreground",
							children: [
								isSignup ? "Vous avez déjà un compte ?" : "Nouveau sur BYAWA ?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "font-semibold text-primary",
									onClick: () => setIsSignup((v) => !v),
									children: isSignup ? "Se connecter" : "Créer un compte"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-sm text-muted-foreground",
					children: "Déjà vendeur ? Connectez-vous ci-dessus avec votre numéro : vous arriverez directement dans votre espace boutique."
				})
			]
		})
	});
}
//#endregion
export { AuthPage as component };
