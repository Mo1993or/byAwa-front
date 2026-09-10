import type { AppRole } from "@/hooks/useAuth";

const ADMIN_ROLES: AppRole[] = [
  "super_admin",
  "admin",
  "orders_manager",
  "vendors_manager",
  "delivery_manager",
  "support_manager",
];

/**
 * Espace d'accueil après connexion : les espaces pro (vendeur, livreur, admin)
 * sont prioritaires sur l'espace client.
 */
export function homeRouteForRoles(roles: AppRole[]): "/admin" | "/vendeur" | "/livreur" | "/compte" {
  if (roles.some((r) => ADMIN_ROLES.includes(r))) return "/admin";
  if (roles.includes("vendor")) return "/vendeur";
  if (roles.includes("driver")) return "/livreur";
  return "/compte";
}
