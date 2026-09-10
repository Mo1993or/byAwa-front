import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";
import { isValidPhone, normalizePhone, phoneToLoginEmail } from "@/lib/phone";
import { homeRouteForRoles } from "@/lib/home-route";

import logo from "@/assets/byawa-logo.png";

type AuthSearch = { mode?: "signin" | "signup" };

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): AuthSearch => ({
    mode: search["mode"] === "signup" ? "signup" : "signin",
  }),
  head: () => ({
    meta: [
      { title: "Connexion & inscription — BYAWA" },
      { name: "description", content: "Connectez-vous à votre compte BYAWA ou créez-en un pour commander, vendre ou livrer." },
      { property: "og:title", content: "Connexion & inscription — BYAWA" },
      { property: "og:description", content: "Accédez à votre espace BYAWA." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const { user, roles, rolesLoaded } = useAuth();
  const [isSignup, setIsSignup] = useState(mode === "signup");
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && rolesLoaded) void navigate({ to: homeRouteForRoles(roles) });
  }, [user, roles, rolesLoaded, navigate]);

  const submit = async (e: React.FormEvent) => {
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
              phone: method === "phone" ? normalizePhone(phone) : null,
            },
          },
        });
        if (error) throw error;
        if (method === "phone") {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: loginEmail,
            password,
          });
          if (signInError) throw signInError;
        }
        toast.success("Compte créé", { description: "Bienvenue sur BYAWA." });
        // La redirection est gérée dès que les rôles sont connus (espace pro prioritaire).
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password });
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
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Connexion Google impossible");
      return;
    }
    if (result.redirected) return;
  };

  return (
    <div className="container-byawa flex justify-center py-14">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <img src={logo} alt="BYAWA" width={150} height={36} className="mx-auto h-9 w-auto" />
          <h1 className="mt-5 text-2xl font-bold">
            {isSignup ? "Créer un compte BYAWA" : "Connexion à votre compte"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Un numéro de téléphone suffit — aucune adresse e-mail requise.
          </p>
        </div>

        <div className="surface-card mb-4 flex items-center justify-between gap-3 border-primary/30 bg-primary/5 p-4">
          <div>
            <p className="text-sm font-bold">Vous êtes commerçant ?</p>
            <p className="text-xs text-muted-foreground">
              Ouvrez votre boutique BYAWA — inscription vendeur prioritaire.
            </p>
          </div>
          <Button asChild size="sm" className="shrink-0">
            <Link to="/devenir-vendeur">Devenir vendeur</Link>
          </Button>
        </div>

        <div className="surface-card space-y-4 p-6">
          <Button variant="secondary" className="w-full" onClick={() => void google()}>
            Continuer avec Google
          </Button>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> ou <span className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
            {(
              [
                ["phone", "Téléphone"],
                ["email", "Email"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setMethod(value)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  method === value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            {isSignup ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
              </div>
            ) : null}

            {method === "phone" ? (
              <div>
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="77 123 45 67"
                  required
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Aucune confirmation par e-mail : votre compte est actif immédiatement.
                </p>
              </div>
            ) : (
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Patientez…" : isSignup ? "Créer mon compte" : "Se connecter"}
            </Button>
          </form>


          <p className="text-center text-sm text-muted-foreground">
            {isSignup ? "Vous avez déjà un compte ?" : "Nouveau sur BYAWA ?"}{" "}
            <button className="font-semibold text-primary" onClick={() => setIsSignup((v) => !v)}>
              {isSignup ? "Se connecter" : "Créer un compte"}
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Déjà vendeur ? Connectez-vous ci-dessus avec votre numéro : vous arriverez directement dans
          votre espace boutique.
        </p>
      </div>
    </div>
  );
}
