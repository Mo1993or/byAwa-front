import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, ShoppingCart, User, ShieldCheck, Store, Truck } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

type TabItem = { to: string; label: string; icon: typeof Home; cart: boolean };

const baseItems: TabItem[] = [
  { to: "/", label: "Accueil", icon: Home, cart: false },
  { to: "/recherche", label: "Recherche", icon: Search, cart: false },
  { to: "/panier", label: "Panier", icon: ShoppingCart, cart: true },
];

const accountTab: TabItem = { to: "/compte", label: "Compte", icon: User, cart: false };

export function MobileTabBar() {
  const { count } = useCart();
  const { user, isAdmin, isVendor, isDriver } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const pro: TabItem | null = isAdmin
    ? { to: "/admin", label: "Admin", icon: ShieldCheck, cart: false }
    : isVendor
      ? { to: "/vendeur", label: "Boutique", icon: Store, cart: false }
      : isDriver
        ? { to: "/livreur", label: "Courses", icon: Truck, cart: false }
        : null;

  const items = pro
    ? [...baseItems, pro, accountTab]
    : user
      ? [...baseItems, accountTab]
      : [...baseItems, { to: "/devenir-vendeur", label: "Vendre", icon: Store, cart: false }];

  return (
    <nav
      aria-label="Navigation mobile"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className={cn("grid", items.length === 5 ? "grid-cols-5" : "grid-cols-4")}>
        {items.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <span className="relative">
                  <Icon className="size-5" />
                  {item.cart && count > 0 ? (
                    <span className="absolute -right-2.5 -top-2 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold leading-4 text-primary-foreground">
                      {count}
                    </span>
                  ) : null}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
