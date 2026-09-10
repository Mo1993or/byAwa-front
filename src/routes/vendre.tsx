import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Wallet, PackageCheck, BarChart3, Truck, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/vendre")({
  head: () => ({
    meta: [
      { title: "Devenir vendeur — BYAWA" },
      {
        name: "description",
        content:
          "Ouvrez votre boutique sur BYAWA : publiez vos produits, gérez vos commandes, suivez vos commissions et retirez vos revenus.",
      },
      { property: "og:title", content: "Devenir vendeur — BYAWA" },
      { property: "og:description", content: "Vendez à des milliers de clients sur la marketplace BYAWA." },
    ],
  }),
  component: SellPage,
});

const steps = [
  { title: "Inscription", text: "Renseignez votre boutique, vos documents et vos coordonnées de paiement." },
  { title: "Vérification", text: "L'équipe BYAWA valide votre dossier sous 48h." },
  { title: "Publication", text: "Ajoutez vos produits, photos, stocks et variantes." },
  { title: "Ventes & retraits", text: "Recevez les commandes, suivez votre wallet et demandez vos retraits." },
];

const benefits = [
  { icon: Users, title: "Des milliers de visiteurs", text: "Profitez du trafic de la marketplace." },
  { icon: Wallet, title: "Portefeuille vendeur", text: "Solde, commissions et retraits transparents." },
  { icon: PackageCheck, title: "Gestion produits", text: "Stock, variantes, promotions et validations." },
  { icon: Truck, title: "Livraison intégrée", text: "Zones, tarifs et livreurs gérés par BYAWA." },
  { icon: BarChart3, title: "Statistiques", text: "Chiffre d'affaires, ventes et performance." },
  { icon: ShieldCheck, title: "Données protégées", text: "Vous ne voyez que vos propres commandes." },
];

function SellPage() {
  return (
    <div className="pb-6">
      <section className="gradient-hero text-night-foreground">
        <div className="container-byawa space-y-6 py-16">
          <h1 className="max-w-3xl text-3xl font-extrabold sm:text-5xl">
            Ouvrez votre boutique sur BYAWA et vendez partout au Sénégal
          </h1>
          <p className="max-w-2xl text-night-foreground/80">
            Commission transparente, paiements suivis, livraison intégrée et un tableau de bord complet
            pour piloter votre activité.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/devenir-vendeur">
                Créer ma boutique <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/vendeur">J'ai déjà une boutique</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-byawa py-14">
        <h2 className="text-2xl font-bold">Comment ça marche</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="surface-card p-5">
              <span className="gradient-flame inline-flex size-9 items-center justify-center rounded-full font-bold text-primary-foreground">
                {i + 1}
              </span>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-byawa pb-14">
        <h2 className="text-2xl font-bold">Ce que BYAWA vous apporte</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="surface-card p-5">
              <span className="inline-flex rounded-xl bg-accent p-2.5 text-accent-foreground">
                <b.icon className="size-5" />
              </span>
              <h3 className="mt-3 font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
