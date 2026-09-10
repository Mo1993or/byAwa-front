import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Facebook, Instagram, Mail, Phone, MapPin, Clock } from "lucide-react";
import logo from "@/assets/byawa-logo.png";
import { siteSettingsQuery } from "@/lib/site-settings";

export function Footer() {
  const { data: site } = useQuery(siteSettingsQuery());
  return (
    <footer className="mt-16 bg-night text-night-foreground">

      <div className="container-byawa grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <img src={logo} alt="BYAWA" width={140} height={34} loading="lazy" className="h-8 w-auto" />
          <p className="text-sm text-night-foreground/70">
            La marketplace généraliste qui connecte les vendeurs africains à leurs clients :
            mode, électronique, maison, alimentation et bien plus.
          </p>
          <div className="flex gap-3 pt-1">
            <a
              href={site?.social_facebook || "#"}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="rounded-full bg-white/10 p-2 hover:bg-primary"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href={site?.social_instagram || "#"}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-white/10 p-2 hover:bg-primary"
            >
              <Instagram className="size-4" />
            </a>

          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">Acheter</h3>
          <ul className="space-y-2 text-sm text-night-foreground/70">
            <li><Link to="/categories" className="hover:text-primary">Toutes les catégories</Link></li>
            <li><Link to="/boutiques" className="hover:text-primary">Nos boutiques</Link></li>
            <li><Link to="/recherche" search={{ q: "" }} className="hover:text-primary">Recherche avancée</Link></li>
            <li><Link to="/panier" className="hover:text-primary">Mon panier</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">Vendre & Livrer</h3>
          <ul className="space-y-2 text-sm text-night-foreground/70">
            <li><Link to="/devenir-vendeur" className="hover:text-primary">Devenir vendeur</Link></li>
            <li><Link to="/vendre" className="hover:text-primary">Commissions & retraits</Link></li>
            <li><Link to="/aide" className="hover:text-primary">Devenir livreur</Link></li>
            <li><Link to="/suivi" className="hover:text-primary">Suivre ma commande</Link></li>
            <li><Link to="/aide" className="hover:text-primary">Centre d'aide</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">Contact</h3>
          <ul className="space-y-3 text-sm text-night-foreground/70">
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-primary" />
              <a href={`tel:${(site?.contact_phone ?? "").replace(/[^+\d]/g, "")}`} className="hover:text-primary">
                {site?.contact_phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-primary" />
              <a href={`mailto:${site?.contact_email ?? ""}`} className="hover:text-primary">
                {site?.contact_email}
              </a>
            </li>
            <li className="flex items-center gap-2"><MapPin className="size-4 text-primary" /> {site?.contact_address}</li>
            {site?.contact_hours ? (
              <li className="flex items-center gap-2"><Clock className="size-4 text-primary" /> {site.contact_hours}</li>
            ) : null}

          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-byawa flex flex-col gap-3 py-5 text-xs text-night-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BYAWA. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to="/politique-de-confidentialite" className="hover:text-primary hover:underline">
              Politique de confidentialité
            </Link>
            <Link to="/aide" className="hover:text-primary hover:underline">
              Centre d'aide
            </Link>
          </div>
          <p>Paiement sécurisé · Vendeurs vérifiés · Livraison suivie</p>
        </div>
      </div>
    </footer>
  );
}
