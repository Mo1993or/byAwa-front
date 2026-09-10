import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BadgeCheck,
  Truck,
  ShieldCheck,
  Headphones,
  Flame,
  Sparkles,
  Store,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/ProductCard";
import { bannersQuery, categoriesQuery, productsQuery, vendorsQuery } from "@/lib/marketplace";
import { siteSettingsQuery } from "@/lib/site-settings";
import { SmartImage } from "@/components/SmartImage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BYAWA — La marketplace africaine de tous les jours" },
      {
        name: "description",
        content:
          "Achetez mode, électronique, électroménager, maison et alimentation auprès de vendeurs vérifiés. Livraison partout au Sénégal, paiement à la livraison.",
      },
      { property: "og:title", content: "BYAWA — La marketplace africaine de tous les jours" },
      {
        property: "og:description",
        content: "Des milliers de produits, des centaines de boutiques vérifiées, livrés chez vous.",
      },
    ],
  }),
  component: Home,
});

function SectionTitle({
  title,
  subtitle,
  to,
  icon,
}: {
  title: string;
  subtitle?: string;
  to?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="flex items-center gap-2 text-xl font-bold sm:text-2xl">
          {icon}
          {title}
        </h2>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {to ? (
        <Button asChild variant="ghost" size="sm" className="shrink-0">
          <Link to={to}>
            Tout voir <ArrowRight className="size-4" />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}

function Home() {
  const { data: banners = [] } = useQuery(bannersQuery());
  const { data: categories = [] } = useQuery(categoriesQuery());
  const { data: featured = [] } = useQuery(productsQuery({ featured: true, limit: 10 }));
  const { data: best = [] } = useQuery(productsQuery({ sort: "best", limit: 10 }));
  const { data: fresh = [] } = useQuery(productsQuery({ sort: "new", limit: 10 }));
  const { data: vendors = [] } = useQuery(vendorsQuery());
  const { data: site } = useQuery(siteSettingsQuery());

  const hero = banners[0];
  const roots = categories.filter((c) => !c.parent_id);
  const phone = site?.contact_phone ?? "";
  const whatsapp = site?.contact_whatsapp ?? "";
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  return (
    <div className="pb-8">
      {site?.home_announcement ? (
        <div className="bg-primary text-primary-foreground">
          <div className="container-byawa flex flex-wrap items-center justify-center gap-2 py-2 text-center text-sm font-medium">
            <Sparkles className="size-4" />
            {site.home_announcement}
          </div>
        </div>
      ) : null}

      {/* HERO */}
      <section className="gradient-hero text-night-foreground">
        <div className="container-byawa grid items-center gap-8 py-12 lg:grid-cols-2 lg:py-20">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
              <Sparkles className="size-3.5 text-gold" /> Plus de {vendors.length} boutiques vérifiées
            </span>
            <h1 className="text-balance-title text-3xl font-extrabold leading-tight sm:text-5xl">
              {site?.home_hero_title ?? hero?.title ?? "Tout ce qu'il vous faut, au meilleur prix"}
            </h1>
            <p className="max-w-xl text-base text-night-foreground/80">
              {site?.home_hero_subtitle ??
                hero?.subtitle ??
                "Mode, électronique, maison, alimentation : commandez auprès de vendeurs vérifiés et faites-vous livrer partout au Sénégal."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/categories">
                  {site?.home_hero_cta_label ?? "Explorer le catalogue"} <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/vendre">{site?.home_hero_cta2_label ?? "Ouvrir ma boutique"}</Link>
              </Button>
            </div>
            {phone ? (
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <a
                  href={telHref}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold hover:bg-white/20"
                >
                  <Phone className="size-4 text-gold" /> {phone}
                </a>
                {whatsapp ? (
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold hover:bg-white/20"
                  >
                    <MessageCircle className="size-4 text-gold" /> WhatsApp
                  </a>
                ) : null}
              </div>
            ) : null}
            <dl className="grid max-w-md grid-cols-3 gap-4 pt-2 text-sm">
              <div>
                <dt className="text-night-foreground/60">Produits</dt>
                <dd className="font-display text-xl font-bold">
                  {best.length ? (site?.home_stat_products ?? "1 000+") : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-night-foreground/60">Catégories</dt>
                <dd className="font-display text-xl font-bold">{roots.length}</dd>
              </div>
              <div>
                <dt className="text-night-foreground/60">Villes livrées</dt>
                <dd className="font-display text-xl font-bold">{site?.home_stat_cities ?? "14"}</dd>
              </div>
            </dl>
          </div>

          <div className="relative overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]">
            <SmartImage
              src={site?.home_hero_image || hero?.image_url || "/images/banners/banner-1.jpg"}
              alt="Marketplace BYAWA"
              eager
              className="h-64 w-full object-cover sm:h-96"
            />
          </div>
        </div>
      </section>


      {/* AVANTAGES */}
      <section className="border-b border-border bg-card">
        <div className="container-byawa grid grid-cols-2 gap-4 py-6 lg:grid-cols-4">
          {[
            { icon: BadgeCheck, title: "Vendeurs vérifiés", text: "Chaque boutique est validée" },
            { icon: Truck, title: "Livraison suivie", text: "Dans 14 villes du pays" },
            { icon: ShieldCheck, title: "Paiement protégé", text: "Payez à la livraison" },
            { icon: Headphones, title: "Support 7j/7", text: "Réclamations et retours" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <span className="rounded-xl bg-accent p-2.5 text-accent-foreground">
                <f.icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-byawa pt-10">
        <SectionTitle title="Catégories populaires" to="/categories" />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {roots.slice(0, 14).map((c) => (
            <Link
              key={c.id}
              to="/categorie/$slug"
              params={{ slug: c.slug }}
              className="surface-card flex flex-col items-center gap-2 p-3 text-center transition-colors hover:border-primary"
            >
              <SmartImage
                src={c.image_url}
                alt={c.name}
                width={768}
                height={768}
                className="size-14 rounded-full object-cover"
              />
              <span className="text-xs font-medium leading-tight">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* OFFRES */}
      <section className="container-byawa pt-12">
        <SectionTitle
          title="Offres du moment"
          subtitle="Sélection mise en avant par BYAWA"
          icon={<Flame className="size-5 text-primary" />}
        />
        <ProductGrid products={featured} />
      </section>

      {/* MEILLEURES VENTES */}
      <section className="container-byawa pt-12">
        <SectionTitle title="Meilleures ventes" subtitle="Les produits les plus commandés" />
        <ProductGrid products={best} />
      </section>

      {/* BOUTIQUES */}
      <section className="container-byawa pt-12">
        <SectionTitle
          title="Boutiques populaires"
          to="/boutiques"
          icon={<Store className="size-5 text-primary" />}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vendors.slice(0, 6).map((v) => (
            <Link
              key={v.id}
              to="/boutique/$slug"
              params={{ slug: v.slug }}
              className="surface-card group overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <SmartImage src={v.cover_url} alt={v.shop_name} className="h-28 w-full object-cover" />
              <div className="flex items-center gap-3 p-4">
                <SmartImage
                  src={v.logo_url}
                  alt={v.shop_name}
                  className="size-12 shrink-0 rounded-full border-2 border-card object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-semibold group-hover:text-primary">{v.shop_name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {v.city} · ⭐ {Number(v.rating).toFixed(1)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NOUVEAUTES */}
      <section className="container-byawa pt-12">
        <SectionTitle title="Nouveautés" subtitle="Les derniers produits publiés" />
        <ProductGrid products={fresh} />
      </section>

      {/* CTA VENDEUR */}
      <section className="container-byawa pt-14">
        <div className="gradient-hero flex flex-col items-start gap-5 rounded-3xl px-6 py-10 text-night-foreground sm:px-12">
          <h2 className="max-w-2xl text-2xl font-bold sm:text-3xl">
            Vendez sur BYAWA et touchez des milliers de clients
          </h2>
          <p className="max-w-2xl text-night-foreground/80">
            Créez votre boutique, publiez vos produits, suivez vos commandes et retirez vos revenus.
            Commission transparente, portefeuille vendeur et livraison intégrée.
          </p>
          <Button asChild size="lg">
            <Link to="/vendre">
              Devenir vendeur <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CONTACT */}
      <section className="container-byawa pt-12">
        <div className="surface-card grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Phone, label: "Téléphone", value: phone, href: phone ? telHref : undefined },
            {
              icon: Mail,
              label: "E-mail",
              value: site?.contact_email ?? "",
              href: site?.contact_email ? `mailto:${site.contact_email}` : undefined,
            },
            { icon: MapPin, label: "Adresse", value: site?.contact_address ?? "" },
            { icon: Clock, label: "Horaires", value: site?.contact_hours ?? "" },
          ]
            .filter((c) => c.value)
            .map((c) => (
              <div key={c.label} className="flex items-start gap-3">
                <span className="rounded-xl bg-accent p-2.5 text-accent-foreground">
                  <c.icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-sm font-semibold hover:text-primary">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>

  );
}
