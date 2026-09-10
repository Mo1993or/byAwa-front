import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/ImageUploader";
import {
  SITE_SETTING_DEFAULTS,
  siteSettingsQuery,
  type SiteSettingKey,
  type SiteSettings,
} from "@/lib/site-settings";

type Field = { key: SiteSettingKey; label: string; hint?: string; area?: boolean };

const SECTIONS: { title: string; description: string; fields: Field[] }[] = [
  {
    title: "Bandeau d'annonce",
    description: "Message affiché tout en haut de la page d'accueil (laisser vide pour le masquer).",
    fields: [{ key: "home_announcement", label: "Annonce", hint: "Ex : Livraison offerte à Dakar ce week-end" }],
  },
  {
    title: "Section principale (héro)",
    description: "Titre, texte et boutons de la première section de la page d'accueil.",
    fields: [
      { key: "home_hero_title", label: "Titre" },
      { key: "home_hero_subtitle", label: "Sous-titre", area: true },
      { key: "home_hero_cta_label", label: "Bouton principal" },
      { key: "home_hero_cta2_label", label: "Bouton secondaire" },
      { key: "home_stat_products", label: "Chiffre « Produits »" },
      { key: "home_stat_cities", label: "Chiffre « Villes livrées »" },
    ],
  },
  {
    title: "Coordonnées visibles sur le site",
    description: "Affichées sur la page d'accueil et dans le pied de page.",
    fields: [
      { key: "contact_phone", label: "Numéro de téléphone", hint: "Ex : +221 77 123 45 67" },
      { key: "contact_whatsapp", label: "WhatsApp", hint: "Numéro international, sans espaces" },
      { key: "contact_email", label: "E-mail" },
      { key: "contact_address", label: "Adresse" },
      { key: "contact_hours", label: "Horaires" },
      { key: "social_facebook", label: "Lien Facebook" },
      { key: "social_instagram", label: "Lien Instagram" },
    ],
  },
];

/** Édition du contenu de la page d'accueil et des informations de contact. */
export function AdminHomeSettings() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(siteSettingsQuery());
  const [form, setForm] = useState<SiteSettings>({ ...SITE_SETTING_DEFAULTS });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const set = (key: SiteSettingKey, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const save = useMutation({
    mutationFn: async () => {
      const rows = (Object.keys(SITE_SETTING_DEFAULTS) as SiteSettingKey[]).map((key) => ({
        key,
        value: form[key] ?? "",
      }));
      const { error } = await supabase.from("settings").upsert(rows, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Page d'accueil mise à jour");
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
    },
    onError: (e: Error) => toast.error("Enregistrement impossible", { description: e.message }),
  });

  if (isLoading) {
    return (
      <div className="surface-card flex items-center justify-center p-10 text-muted-foreground">
        <Loader2 className="size-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {SECTIONS.map((section) => (
        <div key={section.title} className="surface-card space-y-4 p-6">
          <div>
            <h2 className="font-display text-lg font-bold">{section.title}</h2>
            <p className="text-sm text-muted-foreground">{section.description}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {section.fields.map((field) => (
              <div key={field.key} className={field.area ? "sm:col-span-2" : undefined}>
                <label className="text-xs font-medium text-muted-foreground" htmlFor={field.key}>
                  {field.label}
                </label>
                {field.area ? (
                  <Textarea
                    id={field.key}
                    rows={3}
                    className="mt-1"
                    value={form[field.key]}
                    onChange={(e) => set(field.key, e.target.value)}
                  />
                ) : (
                  <Input
                    id={field.key}
                    className="mt-1"
                    value={form[field.key]}
                    placeholder={field.hint}
                    onChange={(e) => set(field.key, e.target.value)}
                  />
                )}
                {field.hint ? <p className="mt-1 text-xs text-muted-foreground">{field.hint}</p> : null}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="surface-card space-y-3 p-6">
        <div>
          <h2 className="font-display text-lg font-bold">Image principale</h2>
          <p className="text-sm text-muted-foreground">
            Visuel affiché à droite du titre sur la page d'accueil.
          </p>
        </div>
        <ImageUploader
          value={form.home_hero_image ? [form.home_hero_image] : []}
          onChange={(images) => set("home_hero_image", images[0] ?? "")}
          max={1}
        />
      </div>

      <div className="sticky bottom-4 flex justify-end">
        <Button size="lg" onClick={() => save.mutate()} disabled={save.isPending}>
          {save.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Enregistrer la page d'accueil
        </Button>
      </div>
    </div>
  );
}
