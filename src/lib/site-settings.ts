import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const SITE_SETTING_DEFAULTS = {
  home_announcement: "",
  home_hero_title: "Tout ce qu'il vous faut, au meilleur prix",
  home_hero_subtitle:
    "Mode, électronique, maison, alimentation : commandez auprès de vendeurs vérifiés et faites-vous livrer partout au Sénégal.",
  home_hero_cta_label: "Explorer le catalogue",
  home_hero_cta2_label: "Ouvrir ma boutique",
  home_hero_image: "",
  home_stat_products: "1 000+",
  home_stat_cities: "14",
  contact_phone: "+221 77 298 60 05",
  contact_whatsapp: "",
  contact_email: "contact@byawa.com",
  contact_address: "Dakar, Sénégal",
  contact_hours: "Lun — Sam, 9h à 19h",
  social_facebook: "",
  social_instagram: "",
} as const;

export type SiteSettingKey = keyof typeof SITE_SETTING_DEFAULTS;
export type SiteSettings = Record<SiteSettingKey, string>;

export function siteSettingsQuery() {
  return queryOptions({
    queryKey: ["site-settings"],
    staleTime: 60_000,
    queryFn: async (): Promise<SiteSettings> => {
      const { data, error } = await supabase.from("settings").select("key,value");
      if (error) throw error;
      const merged = { ...SITE_SETTING_DEFAULTS } as Record<string, string>;
      for (const row of data ?? []) {
        if (row.key in merged && row.value?.trim()) merged[row.key] = row.value;
      }
      return merged as SiteSettings;
    },
  });
}
