import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/politique-de-confidentialite")({
  head: () => ({
    meta: [
      { title: "Confidentialité, livraison et retours — BYAWA" },
      {
        name: "description",
        content:
          "Découvrez comment BYAWA protège vos données, livre vos commandes et gère les retours au Sénégal.",
      },
      { property: "og:title", content: "Confidentialité, livraison et retours — BYAWA" },
      {
        property: "og:description",
        content:
          "Politique de confidentialité, conditions de livraison et modalités de retour de BYAWA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "1. Qui sommes-nous ?",
    content:
      "BYAWA est une marketplace généraliste sénégalaise qui met en relation des vendeurs, des livreurs et des clients. Notre siège social est situé à Dakar, Sénégal. La plateforme est exploitée par BYAWA SARL.",
  },
  {
    title: "2. Données collectées",
    content:
      "Nous collectons uniquement les données nécessaires au bon fonctionnement du service : nom, prénom, numéro de téléphone, adresse e-mail, adresse de livraison, historique des commandes, préférences de navigation et informations de paiement (jamais le CVV). Pour les vendeurs et livreurs, nous collectons également les documents d’identification et les coordonnées bancaires pour les retraits.",
  },
  {
    title: "3. Finalités du traitement",
    content:
      "Vos données sont utilisées pour : créer et gérer votre compte, traiter vos commandes, assurer la livraison, permettre les paiements, prévenir la fraude, répondre au support client et améliorer l’expérience utilisateur.",
  },
  {
    title: "4. Destinataires des données",
    content:
      "Vos données sont transmises, lorsque cela est nécessaire, aux vendeurs concernés, aux livreurs partenaires, aux prestataires de paiement et aux services d’hébergement. Nous ne vendons jamais vos données personnelles à des tiers.",
  },
  {
    title: "5. Conservation des données",
    content:
      "Les données de compte sont conservées tant que votre compte est actif. Les données de commande sont conservées pendant la durée légale requise pour la comptabilité et la fiscalité, puis anonymisées ou supprimées.",
  },
  {
    title: "6. Sécurité",
    content:
      "Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données : chiffrement des communications (HTTPS), authentification sécurisée, contrôles d’accès et surveillance régulière de l’infrastructure.",
  },
  {
    title: "7. Vos droits",
    content:
      "Conformément à la législation sénégalaise, vous disposez d’un droit d’accès, de rectification, de suppression et d’opposition concernant vos données. Pour exercer ces droits, contactez-nous à l’adresse indiquée ci-dessous.",
  },
  {
    title: "8. Cookies et technologies similaires",
    content:
      "BYAWA utilise des cookies techniques indispensables au fonctionnement du site et des cookies analytiques pour comprendre l’utilisation de la plateforme. Vous pouvez configurer votre navigateur pour refuser les cookies non essentiels.",
  },
  {
    title: "9. Modifications",
    content:
      "Cette politique peut être mise à jour à tout moment. Les modifications significatives seront notifiées sur la plateforme ou par e-mail. La date de dernière mise à jour figure en bas de page.",
  },
  {
    title: "10. Politique de livraison et de retour",
    content:
      "Les délais et frais de livraison sont indiqués avant validation de chaque commande et dépendent de la zone (Dakar, régions, zones rurales). Un numéro de suivi est attribué dès l’expédition. En cas de produit endommagé, non conforme ou commande erronée, le client dispose de 7 jours après réception pour ouvrir une demande de retour depuis son espace client. Le remboursement est effectué sous 5 à 10 jours ouvrables après validation de la demande, selon le mode de paiement initial.",
  },
];

function PrivacyPage() {
  return (
    <div className="container-byawa max-w-4xl py-10 md:py-14">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Shield className="size-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Politique de confidentialité</h1>
          <p className="text-sm text-muted-foreground">
            Dernière mise à jour : {new Date().getFullYear()}
          </p>
        </div>
      </div>

      <p className="mb-8 text-muted-foreground">
        Chez BYAWA, la protection de vos données personnelles est une priorité. Cette politique
        explique quelles informations nous collectons, comment nous les utilisons et comment vous
        pouvez exercer vos droits.
      </p>

      <div className="space-y-6">
        {sections.map((section) => (
          <section
            key={section.title}
            className="surface-card rounded-2xl border border-border p-5 md:p-6"
          >
            <h2 className="text-lg font-bold md:text-xl">{section.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              {section.content}
            </p>
          </section>
        ))}
      </div>

      <section className="surface-card mt-8 rounded-2xl border border-border p-5 md:p-6">
        <h2 className="text-lg font-bold md:text-xl">11. Contact</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          Pour toute question relative à cette politique ou pour exercer vos droits, contactez notre
          délégué à la protection des données :
        </p>
        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Mail className="size-4 text-primary" />
            <a href="mailto:contact@byawa.com" className="hover:text-primary hover:underline">
              contact@byawa.com
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="size-4 text-primary" />
            <span>+221 77 000 00 00</span>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="size-4 text-primary" />
            <span>Dakar, Sénégal</span>
          </li>
        </ul>
      </section>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Retour à l’accueil
        </Link>
        <Link
          to="/aide"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-accent"
        >
          Centre d’aide
        </Link>
      </div>
    </div>
  );
}
