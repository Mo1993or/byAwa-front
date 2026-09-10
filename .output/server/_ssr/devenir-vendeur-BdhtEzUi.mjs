import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-fmFI4d4G.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { N as LoaderCircle, u as Store } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as Button, p as categoriesQuery, u as useAuth, w as Input } from "./router-CinPgn2I.mjs";
import { r as formatPrice } from "./format-igmN2sYS.mjs";
import { a as phoneToLoginEmail, i as normalizePhone, r as isValidPhone, t as displayEmail } from "./phone-DO4nSPZj.mjs";
import { c as StepHeader } from "./DashboardShell-DDRDh37s.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as uniqueSlug } from "./slug-DcEF_CmJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/devenir-vendeur-BdhtEzUi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CITIES = [
	"Dakar",
	"Thiès",
	"Saint-Louis",
	"Touba",
	"Ziguinchor",
	"Kaolack",
	"Mbour",
	"Rufisque",
	"Diourbel",
	"Louga"
];
function BecomeVendorPage() {
	const { user, loading: authLoading, refreshRoles } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: categories = [] } = useQuery(categoriesQuery());
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const { data: settings = [] } = useQuery({
		queryKey: ["public-settings"],
		queryFn: async () => {
			const { data, error } = await supabase.from("settings").select("key,value");
			if (error) throw error;
			return data ?? [];
		}
	});
	const setting = (key, fallback) => settings.find((s) => s.key === key)?.value ?? fallback;
	const membershipFee = Number(setting("vendor_membership_fee", "0"));
	const commissionRate = Number(setting("global_commission_rate", "10"));
	const payInstructions = setting("membership_payment_instructions", "");
	const { data: existing, isLoading } = useQuery({
		queryKey: ["my-vendor", user?.id],
		enabled: Boolean(user?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("vendors").select("id,shop_name,status,rejection_reason,membership_fee,membership_status,membership_reference,commission_rate").eq("user_id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const declarePayment = useMutation({
		mutationFn: async ({ method, reference }) => {
			const { error } = await supabase.from("vendors").update({
				membership_method: method,
				membership_reference: reference,
				membership_status: "pending"
			}).eq("id", existing.id);
			if (error) throw error;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["my-vendor"] });
			toast.success("Paiement signalé", { description: "L'équipe BYAWA va le vérifier." });
		},
		onError: (e) => toast.error("Envoi impossible", { description: e.message })
	});
	if (authLoading || Boolean(user?.id) && isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-byawa py-16 text-muted-foreground",
		children: "Chargement…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VendorSignup, {});
	if (existing) {
		const paid = existing.membership_status === "paid" || existing.membership_status === "waived";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-byawa py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card mx-auto max-w-xl p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "mx-auto size-10 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-2xl font-bold",
						children: existing.shop_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted-foreground",
						children: [
							"Votre dossier vendeur est au statut",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: existing.status
							}),
							"."
						]
					}),
					existing.rejection_reason ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-destructive",
						children: ["Motif : ", existing.rejection_reason]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-xl border border-border p-4 text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-semibold",
								children: [
									"Adhésion : ",
									formatPrice(Number(existing.membership_fee ?? membershipFee)),
									" ·",
									" ",
									paid ? "réglée" : existing.membership_status === "pending" ? "en vérification" : "en attente de paiement"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [
									"Commission sur les ventes : ",
									Number(existing.commission_rate ?? commissionRate),
									" %"
								]
							}),
							!paid && existing.membership_status !== "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto]",
								onSubmit: (e) => {
									e.preventDefault();
									const fd = new FormData(e.currentTarget);
									const reference = String(fd.get("reference") ?? "").trim();
									if (!reference) {
										toast.error("Indiquez la référence du paiement");
										return;
									}
									declarePayment.mutate({
										method: String(fd.get("method") ?? "wave"),
										reference
									});
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										name: "method",
										className: "h-10 rounded-md border border-input bg-background px-3 text-sm",
										"aria-label": "Moyen de paiement",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "wave",
												children: "Wave"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "orange_money",
												children: "Orange Money"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "free_money",
												children: "Free Money"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "cash",
												children: "Espèces"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "reference",
										placeholder: "Référence du paiement",
										className: "h-10 rounded-md border border-input bg-background px-3 text-sm"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										size: "sm",
										disabled: declarePayment.isPending,
										children: "J'ai payé"
									})
								]
							}) : null,
							payInstructions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: payInstructions
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/vendeur",
							children: "Accéder à mon espace vendeur"
						})
					})
				]
			})
		});
	}
	const onSubmit = async (event) => {
		event.preventDefault();
		if (!user) return;
		const form = new FormData(event.currentTarget);
		const shopName = String(form.get("shop_name") ?? "").trim();
		if (shopName.length < 2) {
			toast.error("Le nom de la boutique est requis");
			return;
		}
		const rawPhone = String(form.get("phone") ?? "").trim();
		if (!isValidPhone(rawPhone)) {
			toast.error("Numéro de téléphone invalide", { description: "Exemple : 77 123 45 67" });
			return;
		}
		const rawWhatsapp = String(form.get("whatsapp") ?? "").trim();
		setSubmitting(true);
		const categoryId = String(form.get("category_id") ?? "");
		const { error } = await supabase.from("vendors").insert({
			user_id: user.id,
			shop_name: shopName,
			slug: uniqueSlug(shopName),
			full_name: String(form.get("full_name") ?? "").trim(),
			phone: normalizePhone(rawPhone),
			whatsapp: rawWhatsapp ? normalizePhone(rawWhatsapp) : null,
			email: String(form.get("email") ?? "").trim() || displayEmail(user.email) || null,
			city: String(form.get("city") ?? "").trim() || null,
			zone: String(form.get("zone") ?? "").trim() || null,
			address: String(form.get("address") ?? "").trim() || null,
			category_id: categoryId || null,
			description: String(form.get("description") ?? "").trim() || null,
			logo_url: String(form.get("logo_url") ?? "").trim() || null,
			cover_url: String(form.get("cover_url") ?? "").trim() || null,
			payout_method: String(form.get("payout_method") ?? "").trim() || null,
			payout_details: String(form.get("payout_details") ?? "").trim() || null,
			delivery_policy: String(form.get("delivery_policy") ?? "").trim() || null,
			membership_fee: membershipFee,
			membership_method: String(form.get("membership_method") ?? "").trim() || null,
			membership_reference: String(form.get("membership_reference") ?? "").trim() || null,
			membership_status: String(form.get("membership_reference") ?? "").trim() ? "pending" : "unpaid",
			status: "pending"
		});
		setSubmitting(false);
		if (error) {
			toast.error("Envoi impossible", { description: error.message });
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["my-vendor"] });
		await refreshRoles();
		toast.success("Boutique créée", { description: "Votre espace vendeur est actif. La vérification se fait en parallèle." });
		navigate({ to: "/vendeur" });
	};
	const roots = categories.filter((c) => !c.parent_id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface-card mb-6 max-w-xl p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeader, {
					step: 2,
					total: 2,
					labels: ["Compte marchand", "Ma boutique"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: "Étape 2 — Ma boutique"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Renseignez votre dossier vendeur. Il sera vérifié par l'équipe BYAWA avant publication."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "surface-card space-y-4 p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-lg font-bold",
									children: "Identité de la boutique"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Nom de la boutique *",
											name: "shop_name",
											required: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Nom du responsable *",
											name: "full_name",
											required: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "category_id",
												children: "Catégorie principale"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												id: "category_id",
												name: "category_id",
												className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													children: "— Choisir —"
												}), roots.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: c.id,
													children: c.name
												}, c.id))]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "city",
												children: "Ville"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												id: "city",
												name: "city",
												className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
												children: CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: c,
													children: c
												}, c))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Quartier / zone",
											name: "zone"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Adresse",
											name: "address"
										})
									]
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
										placeholder: "Que vendez-vous ?"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "surface-card space-y-4 p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-lg font-bold",
									children: "Contact"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Le téléphone est le canal principal : pas besoin d'adresse e-mail ni de confirmation par mail."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Téléphone *",
											name: "phone",
											type: "tel",
											placeholder: "77 123 45 67",
											required: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "WhatsApp",
											name: "whatsapp",
											type: "tel",
											placeholder: "77 123 45 67"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Email (facultatif)",
											name: "email",
											type: "email",
											defaultValue: displayEmail(user?.email) ?? ""
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "surface-card space-y-4 p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-lg font-bold",
									children: "Paiement & livraison"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "payout_method",
											children: "Méthode de versement"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "payout_method",
											name: "payout_method",
											className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "wave",
													children: "Wave"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "orange_money",
													children: "Orange Money"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "free_money",
													children: "Free Money"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "bank",
													children: "Virement bancaire"
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Numéro / IBAN",
										name: "payout_details"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "delivery_policy",
										children: "Politique de livraison"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "delivery_policy",
										name: "delivery_policy",
										rows: 3
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "surface-card space-y-4 p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-lg font-bold",
									children: "Frais d'adhésion & commission"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-secondary/60 p-4 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											"Frais d'adhésion :",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-primary",
												children: formatPrice(membershipFee)
											}),
											" (une seule fois, à la création de la boutique)."
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1",
											children: [
												"Commission BYAWA sur les ventes :",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-semibold",
													children: [commissionRate, " %"]
												}),
												" — le taux exact de votre boutique est fixé par l'administration."
											]
										}),
										payInstructions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs text-muted-foreground",
											children: payInstructions
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "membership_method",
											children: "Moyen de paiement de l'adhésion"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "membership_method",
											name: "membership_method",
											className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "wave",
													children: "Wave"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "orange_money",
													children: "Orange Money"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "free_money",
													children: "Free Money"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "cash",
													children: "Espèces (agence)"
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Référence du paiement (si déjà payé)",
										name: "membership_reference",
										placeholder: "Ex : TX123456"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Vous pourrez aussi signaler votre paiement plus tard : la boutique est publiée après validation de l'adhésion par l'équipe BYAWA."
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-card space-y-4 p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-bold",
								children: "Visuels"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "URL du logo",
								name: "logo_url",
								placeholder: "https://…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "URL de la couverture",
								name: "cover_url",
								placeholder: "https://…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Vous pourrez modifier ces visuels à tout moment depuis votre espace vendeur."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						size: "lg",
						className: "w-full",
						disabled: submitting,
						children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Envoyer mon dossier"]
					})]
				})]
			})
		]
	});
}
function VendorSignup() {
	const [mode, setMode] = (0, import_react.useState)("signup");
	const [firstName, setFirstName] = (0, import_react.useState)("");
	const [lastName, setLastName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		if (!isValidPhone(phone)) {
			toast.error("Numéro invalide", { description: "Exemple : 77 123 45 67" });
			return;
		}
		const loginEmail = phoneToLoginEmail(phone);
		setBusy(true);
		try {
			if (mode === "signup") {
				const { error } = await supabase.auth.signUp({
					email: loginEmail,
					password,
					options: { data: {
						first_name: firstName,
						last_name: lastName,
						phone: normalizePhone(phone)
					} }
				});
				if (error && !/already registered/i.test(error.message)) throw error;
			}
			const { error: signInError } = await supabase.auth.signInWithPassword({
				email: loginEmail,
				password
			});
			if (signInError) throw signInError;
			toast.success("Compte prêt", { description: "Complétez votre dossier boutique." });
		} catch (err) {
			toast.error("Échec", { description: err instanceof Error ? err.message : "Réessayez." });
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-byawa grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_420px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-3.5" }), " Inscription vendeur"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-extrabold sm:text-4xl",
					children: "Ouvrez votre boutique BYAWA en 2 étapes"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Étape 1 : créez votre compte marchand avec votre numéro de téléphone (aucune adresse e-mail ni confirmation par mail). Étape 2 : renseignez votre boutique, vos produits et vos coordonnées de paiement."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Boutique en ligne, gestion des stocks et des commandes" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Portefeuille vendeur, commissions transparentes et retraits Wave / Orange Money" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Livraison intégrée partout au Sénégal" })
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "surface-card mb-4 p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeader, {
						step: 1,
						total: 2,
						labels: ["Compte marchand", "Ma boutique"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-bold",
						children: mode === "signup" ? "Créer mon compte marchand" : "Connexion marchand"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Étape 1 sur 2 — vos identifiants vendeur."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "surface-card space-y-4 p-6",
					children: [
						mode === "signup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "vs-first",
									children: "Prénom"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "vs-first",
									value: firstName,
									onChange: (e) => setFirstName(e.target.value),
									required: true
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "vs-last",
									children: "Nom"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "vs-last",
									value: lastName,
									onChange: (e) => setLastName(e.target.value),
									required: true
								})]
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "vs-phone",
								children: "Téléphone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "vs-phone",
								type: "tel",
								inputMode: "tel",
								placeholder: "77 123 45 67",
								value: phone,
								onChange: (e) => setPhone(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "vs-password",
								children: "Mot de passe"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "vs-password",
								type: "password",
								minLength: 6,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							size: "lg",
							className: "w-full",
							disabled: busy,
							children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, mode === "signup" ? "Créer mon compte marchand" : "Se connecter"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-center text-sm text-muted-foreground",
							children: [
								mode === "signup" ? "Vous avez déjà un compte ?" : "Nouveau sur BYAWA ?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "font-semibold text-primary",
									onClick: () => setMode((m) => m === "signup" ? "signin" : "signup"),
									children: mode === "signup" ? "Se connecter" : "Créer un compte"
								})
							]
						})
					]
				})
			]
		})]
	});
}
function Field({ label, name, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: name,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: name,
			name,
			...rest
		})]
	});
}
//#endregion
export { BecomeVendorPage as component };
