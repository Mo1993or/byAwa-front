import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Package, MapPin, Heart, Bell, LifeBuoy, Store, User } from "lucide-react";
import { Button } from "@/components/ui/button";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { formatDate, formatPrice } from "@/lib/format";
import { DashboardShell, StatCard, StatGrid } from "@/components/dashboard/DashboardShell";
import {
  ChartGrid,
  TrendChart,
  MonthlyBarChart,
  BreakdownChart,
  useMonthlySeries,
} from "@/components/dashboard/DashboardCharts";

import { displayEmail } from "@/lib/phone";

export const Route = createFileRoute("/_authenticated/compte")({
  head: () => ({
    meta: [
      { title: "Mon espace client — BYAWA" },
      { name: "description", content: "Suivez vos commandes, adresses, favoris et notifications sur BYAWA." },
      { property: "og:title", content: "Mon espace client — BYAWA" },
      { property: "og:description", content: "Votre tableau de bord client BYAWA." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user, roles } = useAuth();

  const { data: orders = [] } = useQuery({
    queryKey: ["my-orders", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id,order_number,total,status,payment_status,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: addresses = [] } = useQuery({
    queryKey: ["my-addresses", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase.from("addresses").select("*");
      if (error) throw error;
      return data ?? [];
    },
  });

  const spendSeries = useMonthlySeries(orders, (o) => o.created_at, [
    { key: "depenses", value: (o) => Number(o.total ?? 0) },
    { key: "commandes", value: () => 1 },
  ]);
  const statusBreakdown = [
    { name: "En cours", value: orders.filter((o) => ["placed", "paid", "preparing", "shipped", "delivering"].includes(String(o.status))).length },
    { name: "Livrées", value: orders.filter((o) => o.status === "delivered").length },
    { name: "Annulées", value: orders.filter((o) => o.status === "cancelled").length },
    { name: "Retournées", value: orders.filter((o) => o.status === "returned").length },
  ];
  const totalSpent = orders.reduce((s, o) => s + Number(o.total ?? 0), 0);

  return (
    <DashboardShell
      title={displayEmail(user?.email) ?? "Mon compte"}
      subtitle={`Rôles : ${roles.length ? roles.join(", ") : "client"}`}
      icon={User}
      actions={
        <Button asChild size="sm" variant="outline">
          <Link to="/devenir-vendeur">Vendre sur BYAWA</Link>
        </Button>
      }
    >
      <StatGrid>
        <StatCard icon={Package} label="Commandes" value={orders.length} />
        <StatCard icon={MapPin} label="Adresses" value={addresses.length} />
        <StatCard icon={Heart} label="Total dépensé" value={formatPrice(totalSpent)} tone="primary" />
        <StatCard icon={Bell} label="Notifications" value={0} />
      </StatGrid>

      <ChartGrid>
        <TrendChart
          title="Tendance de mes dépenses"
          subtitle="Montant dépensé sur 6 mois"
          data={spendSeries}
          dataKey="depenses"
          label="Dépenses"
          formatter={formatPrice}
        />
        <MonthlyBarChart
          title="Évolution mensuelle"
          subtitle="Nombre de commandes par mois"
          data={spendSeries}
          series={[{ key: "commandes", label: "Commandes" }]}
        />
        <BreakdownChart
          title="Répartition de mes commandes"
          subtitle="Par statut"
          data={statusBreakdown}
        />
      </ChartGrid>




      <section className="pt-2">
        <h2 className="text-xl font-bold">Mes commandes</h2>
        {orders.length === 0 ? (
          <div className="surface-card mt-4 p-10 text-center">
            <p className="text-muted-foreground">Vous n'avez pas encore passé de commande.</p>
            <Button asChild className="mt-5">
              <Link to="/categories">Commencer mes achats</Link>
            </Button>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {orders.map((o) => (
              <li key={o.id} className="surface-card flex flex-wrap items-center gap-4 p-4">
                <span className="font-semibold">#{o.order_number}</span>
                <span className="text-sm text-muted-foreground">{formatDate(o.created_at)}</span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">{o.status}</span>
                <span className="ml-auto font-bold text-primary">{formatPrice(o.total)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="grid gap-4 pt-2 sm:grid-cols-2">
        <Link to="/devenir-vendeur" className="surface-card flex items-center gap-3 p-5 hover:border-primary">
          <Store className="size-5 text-primary" />
          <div>
            <p className="font-semibold">Ouvrir une boutique</p>
            <p className="text-sm text-muted-foreground">Vendez vos produits sur BYAWA</p>
          </div>
        </Link>
        <Link to="/aide" className="surface-card flex items-center gap-3 p-5 hover:border-primary">
          <LifeBuoy className="size-5 text-primary" />
          <div>
            <p className="font-semibold">Support & réclamations</p>
            <p className="text-sm text-muted-foreground">Nous sommes là pour vous aider</p>
          </div>
        </Link>
      </section>
    </DashboardShell>
  );
}
