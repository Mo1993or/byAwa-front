import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AppRole =
  | "super_admin"
  | "admin"
  | "orders_manager"
  | "vendors_manager"
  | "delivery_manager"
  | "support_manager"
  | "vendor"
  | "driver"
  | "customer";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  roles: AppRole[];
  loading: boolean;
  rolesLoaded: boolean;
  isAdmin: boolean;
  isVendor: boolean;
  isDriver: boolean;
  refreshRoles: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  roles: [],
  loading: true,
  rolesLoaded: false,
  isAdmin: false,
  isVendor: false,
  isDriver: false,
  refreshRoles: async () => {},
  signOut: async () => {},
});

const ADMIN_ROLES: AppRole[] = [
  "super_admin",
  "admin",
  "orders_manager",
  "vendors_manager",
  "delivery_manager",
  "support_manager",
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    // Filet de sécurité : ne jamais rester bloqué sur "Chargement…"
    const timeout = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 8000);

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      if (!nextSession?.user) setRoles([]);
      setLoading(false);
    });

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setSession(data.session);
        setUser(data.session?.user ?? null);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
      clearTimeout(timeout);
      sub.subscription.unsubscribe();
    };
  }, []);

  const userId = user?.id ?? null;
  const [rolesLoaded, setRolesLoaded] = useState(false);

  const refreshRoles = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    if (error) return;
    setRoles(((data ?? []) as { role: AppRole }[]).map((r) => r.role));
    setRolesLoaded(true);
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      setRolesLoaded(false);
      return;
    }
    let cancelled = false;
    setRolesLoaded(false);
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error) setRoles(((data ?? []) as { role: AppRole }[]).map((r) => r.role));
        setRolesLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const value: AuthContextValue = {
    user,
    session,
    roles,
    loading,
    rolesLoaded,
    isAdmin: roles.some((r) => ADMIN_ROLES.includes(r)),
    isVendor: roles.includes("vendor"),
    isDriver: roles.includes("driver"),
    refreshRoles,
    signOut: async () => {
      await supabase.auth.signOut();
      setRoles([]);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
