import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  ShoppingCart,
  User,
  LayoutGrid,
  Store,
  Truck,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Menu,
} from "lucide-react";
import logo from "@/assets/byawa-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categoriesQuery } from "@/lib/marketplace";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const { user, isAdmin, isVendor, isDriver, signOut } = useAuth();
  const { data: categories = [] } = useQuery(categoriesQuery());
  const roots = categories.filter((c) => !c.parent_id);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim()) return;
    navigate({ to: "/recherche", search: { q: term } });
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      {/* Top Bar - Hidden on small mobile */}
      <div className="bg-night text-night-foreground hidden sm:block">
        <div className="container-byawa flex h-8 items-center justify-between text-[10px] uppercase tracking-wider font-bold">
          <p>Livraison partout au Sénégal · Paiement à la livraison disponible</p>
          <div className="flex items-center gap-4">
            <Link to="/devenir-vendeur" className="hover:text-primary transition-colors">
              Vendre sur BYAWA
            </Link>
            <Link to="/aide" className="hover:text-primary transition-colors">
              Aide & Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-border bg-card/98 backdrop-blur-md">
        <div className="container-byawa flex h-16 items-center gap-4 lg:gap-8">
          {/* Hamburger - mobile & tablet */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden -ml-2" aria-label="Ouvrir le menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[86vw] max-w-sm p-0">
              <SheetHeader className="border-b p-4">
                <SheetTitle className="text-base">Menu BYAWA</SheetTitle>
              </SheetHeader>
              <div className="flex h-full flex-col gap-1 overflow-y-auto p-3 pb-24">
                <Link to="/" onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary/60">
                  Accueil
                </Link>
                <Link to="/categories" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary/60">
                  <LayoutGrid className="size-4 text-primary" /> Tous les rayons
                </Link>
                <Link to="/boutiques" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary/60">
                  <Store className="size-4 text-primary" /> Boutiques
                </Link>

                <p className="px-3 pb-1 pt-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Rayons
                </p>
                {roots.map((c) => (
                  <Link
                    key={c.id}
                    to="/categorie/$slug"
                    params={{ slug: c.slug }}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  >
                    {c.name}
                    <ChevronRight className="size-4" />
                  </Link>
                ))}

                <p className="px-3 pb-1 pt-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Mon espace
                </p>
                {user ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary/60">
                        <ShieldCheck className="size-4 text-primary" /> Super admin
                      </Link>
                    )}
                    {isVendor && (
                      <Link to="/vendeur" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary/60">
                        <Store className="size-4 text-primary" /> Espace vendeur
                      </Link>
                    )}
                    {isDriver && (
                      <Link to="/livreur" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary/60">
                        <Truck className="size-4 text-primary" /> Espace livreur
                      </Link>
                    )}
                    <Link to="/compte" onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary/60">
                      Mon compte client
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        void signOut();
                      }}
                      className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="size-4" /> Se déconnecter
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/devenir-vendeur" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-primary hover:bg-secondary/60">
                      <Store className="size-4" /> Devenir vendeur
                    </Link>
                    <Link
                      to="/auth"
                      search={{ mode: "signin" }}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-secondary/60"
                    >
                      Connexion vendeur / client
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img src={logo} alt="BYAWA" width={120} height={28} className="h-7 w-auto sm:h-8" />
          </Link>

          {/* Search Bar - Desktop & Tablet */}
          <form onSubmit={submit} className="relative hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full group">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Rechercher un produit, une marque, une boutique…"
                className="h-10 rounded-full pl-11 pr-24 bg-secondary/50 border-transparent focus:bg-card focus:border-primary transition-all shadow-none focus:ring-0"
                aria-label="Rechercher"
              />
              <Button type="submit" size="sm" className="absolute right-1 top-1 h-8 rounded-full px-4 text-xs font-bold">
                Rechercher
              </Button>
            </div>
          </form>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            {/* Search Icon for Mobile */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => navigate({ to: "/recherche" })}>
              <Search className="size-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 px-2 sm:px-3 gap-2 hover:bg-secondary/50 rounded-full">
                  <User className="size-5" />
                  <span className="hidden sm:inline text-sm font-semibold">{user ? "Mon compte" : "Connexion"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-xl border-border">
                {user ? (
                  <>
                    {(isVendor || isDriver || isAdmin) && (
                      <>
                        <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          Espaces Pro
                        </div>
                        {isAdmin && (
                          <DropdownMenuItem asChild>
                            <Link to="/admin" className="cursor-pointer font-medium flex items-center gap-2">
                              <ShieldCheck className="size-4 text-primary" /> Administration
                            </Link>
                          </DropdownMenuItem>
                        )}
                        {isVendor && (
                          <DropdownMenuItem asChild>
                            <Link to="/vendeur" className="cursor-pointer font-medium flex items-center gap-2">
                              <Store className="size-4 text-primary" /> Espace Vendeur
                            </Link>
                          </DropdownMenuItem>
                        )}
                        {isDriver && (
                          <DropdownMenuItem asChild>
                            <Link to="/livreur" className="cursor-pointer font-medium flex items-center gap-2">
                              <Truck className="size-4 text-primary" /> Espace Livreur
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      Espace Client
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/compte" className="cursor-pointer font-medium">Tableau de bord</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => void signOut()} className="cursor-pointer text-destructive focus:text-destructive font-bold">
                      <LogOut className="size-4 mr-2" /> Se déconnecter
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      Vendeurs
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/devenir-vendeur" className="cursor-pointer font-bold text-primary flex items-center gap-2">
                        <Store className="size-4" /> Inscription vendeur
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/auth" search={{ mode: "signin" }} className="cursor-pointer font-medium">
                        Connexion vendeur
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      Clients
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/auth" className="cursor-pointer font-medium">Se connecter</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/auth" search={{ mode: "signup" }} className="cursor-pointer font-medium">
                        Créer un compte client
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild variant="ghost" className="h-10 px-2 sm:px-3 relative gap-2 hover:bg-secondary/50 rounded-full">
              <Link to="/panier">
                <ShoppingCart className="size-5" />
                <span className="hidden sm:inline text-sm font-semibold">Panier</span>
                {count > 0 ? (
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground shadow-sm animate-in zoom-in duration-300">
                    {count}
                  </span>
                ) : null}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Horizontal Category Navigation - Desktop & Mobile Horizontal Scroll */}
      <nav className="hidden lg:block bg-card border-b border-border">
        <div className="container-byawa flex h-12 items-center">
          {/* All Categories Trigger - Desktop only */}
          <Link
            to="/categories"
            className="hidden lg:flex items-center gap-2 h-full px-4 text-sm font-bold border-r border-border hover:bg-secondary/50 transition-colors shrink-0"
          >
            <LayoutGrid className="size-4 text-primary" />
            <span>Rayons</span>
          </Link>

          {/* The Horizontal Scroll Menu */}
          <div className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar py-1 px-2 lg:px-4">
            {/* Mobile "Toutes" link */}
            <Link
              to="/categories"
              className="lg:hidden shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              Rayons
            </Link>

            {roots.map((c) => (
              <Link
                key={c.id}
                to="/categorie/$slug"
                params={{ slug: c.slug }}
                className="shrink-0 px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-full transition-all"
              >
                {c.name}
              </Link>
            ))}
            
            <Link
              to="/boutiques"
              className="ml-auto shrink-0 px-3 py-1.5 text-xs sm:text-sm font-bold text-primary hover:bg-primary/5 rounded-full transition-all flex items-center gap-1.5"
            >
              <Store className="size-3.5" />
              <span>Boutiques</span>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Mobile Search - Visible only on mobile when on home or generic pages */}
      <div className="md:hidden bg-card px-4 pb-3 pt-1 border-b border-border">
        <form onSubmit={submit} className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Rechercher sur BYAWA..."
            className="h-9 rounded-full pl-9 bg-secondary/50 border-transparent focus:bg-card focus:border-primary transition-all text-sm"
            aria-label="Rechercher"
          />
        </form>
      </div>
    </header>
  );
}
