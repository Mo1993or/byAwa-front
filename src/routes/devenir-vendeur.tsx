import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { categoriesQuery } from "@/lib/marketplace";
import { formatPrice } from "@/lib/format";
import { uniqueSlug } from "@/lib/slug";
import { displayEmail, isValidPhone, normalizePhone, phoneToLoginEmail } from "@/lib/phone";
import { StepHeader } from "@/components/dashboard/DashboardShell";


export const Route = createFileRoute("/devenir-vendeur")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Créer ma boutique — BYAWA" },
      {
        name: "description",
        content:
          "Déposez votre dossier vendeur BYAWA : informations boutique, coordonnées, catégorie et modalités de paiement.",
      },
      { property: "og:title", content: "Créer ma boutique — BYAWA" },
      { property: "og:description", content: "Ouvrez votre boutique sur la marketplace BYAWA." },
    ],
  }),
  component: BecomeVendorPage,
});

const CITIES = [
  "Dakar",
  "Thiès",
  "Saint-Louis",
  "Touba",
  "Ziguinchor",
  "Kaolack",
  "Mbour",
  "Rufisque",
  "Diourbel",
  "Louga",
];

function BecomeVendorPage() {
  const { user, loading: authLoading, refreshRoles } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: categories = [] } = useQuery(categoriesQuery());
  const [submitting, setSubmitting] = useState(false);

  const { data: settings = [] } = useQuery({
    queryKey: ["public-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("settings").select("key,value");
      if (error) throw error;
      return data ?? [];
    },
  });
  const setting = (key: string, fallback: string) =>
    settings.find((s) => s.key === key)?.value ?? fallback;
  const membershipFee = Number(setting("vendor_membership_fee", "0"));
  const commissionRate = Number(setting("global_commission_rate", "10"));
  const payInstructions = setting("membership_payment_instructions", "");

  const { data: existing, isLoading } = useQuery({
    queryKey: ["my-vendor", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vendors")
        .select(
          "id,shop_name,status,rejection_reason,membership_fee,membership_status,membership_reference,commission_rate",
        )
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const declarePayment = useMutation({
    mutationFn: async ({ method, reference }: { method: string; reference: string }) => {
      const { error } = await supabase
        .from("vendors")
        .update({ membership_method: method, membership_reference: reference, membership_status: "pending" })
        .eq("id", existing!.id);
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["my-vendor"] });
      toast.success("Paiement signalé", { description: "L'équipe BYAWA va le vérifier." });
    },
    onError: (e: Error) => toast.error("Envoi impossible", { description: e.message }),
  });

  if (authLoading || (Boolean(user?.id) && isLoading)) {
    return <div className="container-byawa py-16 text-muted-foreground">Chargement…</div>;
  }

  if (!user) {
    return <VendorSignup />;
  }


  if (existing) {
    const paid = existing.membership_status === "paid" || existing.membership_status === "waived";
    return (
      <div className="container-byawa py-16">
        <div className="surface-card mx-auto max-w-xl p-8 text-center">
          <Store className="mx-auto size-10 text-primary" />
          <h1 className="mt-4 text-2xl font-bold">{existing.shop_name}</h1>
          <p className="mt-2 text-muted-foreground">
            Votre dossier vendeur est au statut{" "}
            <span className="font-semibold text-foreground">{existing.status}</span>.
          </p>
          {existing.rejection_reason ? (
            <p className="mt-2 text-sm text-destructive">Motif : {existing.rejection_reason}</p>
          ) : null}
          <div className="mt-6 rounded-xl border border-border p-4 text-left">
            <p className="text-sm font-semibold">
              Adhésion : {formatPrice(Number(existing.membership_fee ?? membershipFee))} ·{" "}
              {paid
                ? "réglée"
                : existing.membership_status === "pending"
                  ? "en vérification"
                  : "en attente de paiement"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Commission sur les ventes : {Number(existing.commission_rate ?? commissionRate)} %
            </p>
            {!paid && existing.membership_status !== "pending" ? (
              <form
                className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto]"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const reference = String(fd.get("reference") ?? "").trim();
                  if (!reference) {
                    toast.error("Indiquez la référence du paiement");
                    return;
                  }
                  declarePayment.mutate({
                    method: String(fd.get("method") ?? "wave"),
                    reference,
                  });
                }}
              >
                <select
                  name="method"
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                  aria-label="Moyen de paiement"
                >
                  <option value="wave">Wave</option>
                  <option value="orange_money">Orange Money</option>
                  <option value="free_money">Free Money</option>
                  <option value="cash">Espèces</option>
                </select>
                <input
                  name="reference"
                  placeholder="Référence du paiement"
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                />
                <Button type="submit" size="sm" disabled={declarePayment.isPending}>
                  J'ai payé
                </Button>
              </form>
            ) : null}
            {payInstructions ? (
              <p className="mt-2 text-xs text-muted-foreground">{payInstructions}</p>
            ) : null}
          </div>
          <Button asChild className="mt-6">
            <Link to="/vendeur">Accéder à mon espace vendeur</Link>
          </Button>
        </div>
      </div>
    );
  }


  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      status: "pending",
    });
    setSubmitting(false);
    if (error) {
      toast.error("Envoi impossible", { description: error.message });
      return;
    }
    await queryClient.invalidateQueries({ queryKey: ["my-vendor"] });
    await refreshRoles();
    toast.success("Boutique créée", {
      description: "Votre espace vendeur est actif. La vérification se fait en parallèle.",
    });
    navigate({ to: "/vendeur" });
  };

  const roots = categories.filter((c) => !c.parent_id);

  return (
    <div className="container-byawa py-10">
      <div className="surface-card mb-6 max-w-xl p-4">
        <StepHeader step={2} total={2} labels={["Compte marchand", "Ma boutique"]} />
      </div>
      <h1 className="text-3xl font-bold">Étape 2 — Ma boutique</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Renseignez votre dossier vendeur. Il sera vérifié par l'équipe BYAWA avant publication.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <section className="surface-card space-y-4 p-6">
            <h2 className="font-display text-lg font-bold">Identité de la boutique</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nom de la boutique *" name="shop_name" required />
              <Field label="Nom du responsable *" name="full_name" required />
              <div className="space-y-1.5">
                <Label htmlFor="category_id">Catégorie principale</Label>
                <select
                  id="category_id"
                  name="category_id"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="">— Choisir —</option>
                  {roots.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="city">Ville</Label>
                <select
                  id="city"
                  name="city"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <Field label="Quartier / zone" name="zone" />
              <Field label="Adresse" name="address" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={4} placeholder="Que vendez-vous ?" />
            </div>
          </section>

          <section className="surface-card space-y-4 p-6">
            <h2 className="font-display text-lg font-bold">Contact</h2>
            <p className="text-sm text-muted-foreground">
              Le téléphone est le canal principal : pas besoin d'adresse e-mail ni de confirmation par mail.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Téléphone *" name="phone" type="tel" placeholder="77 123 45 67" required />
              <Field label="WhatsApp" name="whatsapp" type="tel" placeholder="77 123 45 67" />
              <Field label="Email (facultatif)" name="email" type="email" defaultValue={displayEmail(user?.email) ?? ""} />
            </div>
          </section>


          <section className="surface-card space-y-4 p-6">
            <h2 className="font-display text-lg font-bold">Paiement & livraison</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="payout_method">Méthode de versement</Label>
                <select
                  id="payout_method"
                  name="payout_method"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="wave">Wave</option>
                  <option value="orange_money">Orange Money</option>
                  <option value="free_money">Free Money</option>
                  <option value="bank">Virement bancaire</option>
                </select>
              </div>
              <Field label="Numéro / IBAN" name="payout_details" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="delivery_policy">Politique de livraison</Label>
              <Textarea id="delivery_policy" name="delivery_policy" rows={3} />
            </div>
          </section>

          <section className="surface-card space-y-4 p-6">
            <h2 className="font-display text-lg font-bold">Frais d'adhésion & commission</h2>
            <div className="rounded-xl bg-secondary/60 p-4 text-sm">
              <p>
                Frais d'adhésion :{" "}
                <span className="font-bold text-primary">{formatPrice(membershipFee)}</span> (une seule fois, à
                la création de la boutique).
              </p>
              <p className="mt-1">
                Commission BYAWA sur les ventes :{" "}
                <span className="font-semibold">{commissionRate} %</span> — le taux exact de votre boutique est
                fixé par l'administration.
              </p>
              {payInstructions ? (
                <p className="mt-2 text-xs text-muted-foreground">{payInstructions}</p>
              ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="membership_method">Moyen de paiement de l'adhésion</Label>
                <select
                  id="membership_method"
                  name="membership_method"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="wave">Wave</option>
                  <option value="orange_money">Orange Money</option>
                  <option value="free_money">Free Money</option>
                  <option value="cash">Espèces (agence)</option>
                </select>
              </div>
              <Field
                label="Référence du paiement (si déjà payé)"
                name="membership_reference"
                placeholder="Ex : TX123456"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Vous pourrez aussi signaler votre paiement plus tard : la boutique est publiée après validation de
              l'adhésion par l'équipe BYAWA.
            </p>
          </section>
        </div>


        <aside className="space-y-6">
          <section className="surface-card space-y-4 p-6">
            <h2 className="font-display text-lg font-bold">Visuels</h2>
            <Field label="URL du logo" name="logo_url" placeholder="https://…" />
            <Field label="URL de la couverture" name="cover_url" placeholder="https://…" />
            <p className="text-xs text-muted-foreground">
              Vous pourrez modifier ces visuels à tout moment depuis votre espace vendeur.
            </p>
          </section>

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? <Loader2 className="size-4 animate-spin" /> : null}
            Envoyer mon dossier
          </Button>
        </aside>
      </form>
    </div>
  );
}

function VendorSignup() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
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
          options: {
            data: { first_name: firstName, last_name: lastName, phone: normalizePhone(phone) },
          },
        });
        if (error && !/already registered/i.test(error.message)) throw error;
      }
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      });
      if (signInError) throw signInError;
      toast.success("Compte prêt", { description: "Complétez votre dossier boutique." });
    } catch (err) {
      toast.error("Échec", { description: err instanceof Error ? err.message : "Réessayez." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container-byawa grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_420px]">
      <div className="space-y-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
          <Store className="size-3.5" /> Inscription vendeur
        </span>
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
          Ouvrez votre boutique BYAWA en 2 étapes
        </h1>
        <p className="text-muted-foreground">
          Étape 1 : créez votre compte marchand avec votre numéro de téléphone (aucune adresse e-mail ni
          confirmation par mail). Étape 2 : renseignez votre boutique, vos produits et vos coordonnées de
          paiement.
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Boutique en ligne, gestion des stocks et des commandes</li>
          <li>• Portefeuille vendeur, commissions transparentes et retraits Wave / Orange Money</li>
          <li>• Livraison intégrée partout au Sénégal</li>
        </ul>
      </div>

      <div className="w-full">
        <div className="surface-card mb-4 p-4">
          <StepHeader step={1} total={2} labels={["Compte marchand", "Ma boutique"]} />
        </div>
        <div className="mb-6 text-center">
          <h2 className="font-display text-xl font-bold">
            {mode === "signup" ? "Créer mon compte marchand" : "Connexion marchand"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Étape 1 sur 2 — vos identifiants vendeur.
          </p>
        </div>


        <form onSubmit={submit} className="surface-card space-y-4 p-6">
          {mode === "signup" ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="vs-first">Prénom</Label>
                <Input id="vs-first" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="vs-last">Nom</Label>
                <Input id="vs-last" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </div>
          ) : null}

          <div className="space-y-1.5">
            <Label htmlFor="vs-phone">Téléphone</Label>
            <Input
              id="vs-phone"
              type="tel"
              inputMode="tel"
              placeholder="77 123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="vs-password">Mot de passe</Label>
            <Input
              id="vs-password"
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={busy}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : null}
            {mode === "signup" ? "Créer mon compte marchand" : "Se connecter"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {mode === "signup" ? "Vous avez déjà un compte ?" : "Nouveau sur BYAWA ?"}{" "}
            <button
              type="button"
              className="font-semibold text-primary"
              onClick={() => setMode((m) => (m === "signup" ? "signin" : "signup"))}
            >
              {mode === "signup" ? "Se connecter" : "Créer un compte"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  ...rest
}: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...rest} />
    </div>
  );
}
