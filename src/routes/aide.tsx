import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/aide")({
  head: () => ({
    meta: [
      { title: "Centre d'aide — BYAWA" },
      {
        name: "description",
        content: "Questions fréquentes BYAWA : commandes, livraison, paiement, retours, vendeurs et livreurs.",
      },
      { property: "og:title", content: "Centre d'aide — BYAWA" },
      { property: "og:description", content: "Trouvez rapidement une réponse à vos questions sur BYAWA." },
    ],
  }),
  component: HelpPage,
});

const faqs = [
  {
    q: "Comment passer une commande ?",
    a: "Ajoutez vos articles au panier, choisissez votre adresse de livraison, sélectionnez le mode de livraison puis validez le paiement. Vous recevez un numéro de commande et pouvez suivre chaque étape depuis votre espace client.",
  },
  {
    q: "Puis-je commander chez plusieurs vendeurs en une fois ?",
    a: "Oui. Le panier BYAWA est multi-vendeurs : votre commande globale est automatiquement découpée en commandes vendeur, chacune avec son suivi et sa livraison.",
  },
  {
    q: "Quels sont les délais et frais de livraison ?",
    a: "Les frais dépendent de la ville et de la zone : de 1 500 FCFA à Dakar-Plateau jusqu'à 6 000 FCFA à Ziguinchor, avec des délais de 1 à 4 jours.",
  },
  {
    q: "Comment devenir vendeur ?",
    a: "Créez un compte, complétez le formulaire boutique (documents, coordonnées, politique de livraison) puis attendez la validation de l'équipe BYAWA sous 48h.",
  },
  {
    q: "Comment fonctionne la commission ?",
    a: "BYAWA prélève une commission configurable (globale, par catégorie ou par vendeur). Elle est affichée sur chaque commande vendeur : prix produit, commission BYAWA, montant net vendeur.",
  },
  {
    q: "Comment récupérer mes revenus en tant que vendeur ?",
    a: "Vos ventes alimentent votre portefeuille vendeur. Vous demandez un retrait, l'administrateur le traite et le statut passe de demandé à payé.",
  },
  {
    q: "Puis-je retourner un produit ?",
    a: "Oui, une demande de retour peut être créée depuis le détail de la commande dans les 7 jours suivant la livraison, avec motif. Après validation, le remboursement est déclenché.",
  },
  {
    q: "Comment devenir livreur BYAWA ?",
    a: "Contactez le support avec vos informations (ville, véhicule, disponibilité). Une fois votre compte livreur activé, vous accédez à l'espace livreur pour accepter et suivre vos livraisons.",
  },
];

function HelpPage() {
  return (
    <div className="container-byawa max-w-3xl py-12">
      <h1 className="text-3xl font-bold">Centre d'aide</h1>
      <p className="mt-2 text-muted-foreground">
        Les réponses aux questions les plus fréquentes sur BYAWA.
      </p>

      <Accordion type="single" collapsible className="mt-8">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="surface-card mt-10 p-6">
        <h2 className="text-lg font-bold">Besoin d'aide supplémentaire ?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Écrivez-nous à contact@byawa.com ou appelez le +221 77 298 60 05, du lundi au dimanche de 8h à 20h.
        </p>
      </div>
    </div>
  );
}
