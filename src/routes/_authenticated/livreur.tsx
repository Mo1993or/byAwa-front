import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Truck, CheckCircle2, Clock, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useAuth } from "@/hooks/useAuth";
import { formatPrice } from "@/lib/format";
import {
  DashboardShell,
  StatCard,
  StatGrid,
  dashTabsListClass,
  dashTabTriggerClass,
} from "@/components/dashboard/DashboardShell";
import {
  ChartGrid,
  TrendChart,
  MonthlyBarChart,
  BreakdownChart,
  useMonthlySeries,
} from "@/components/dashboard/DashboardCharts";


import { cn } from "@/lib/utils";


type DeliveryStatus = Database["public"]["Enums"]["delivery_status"];

export const Route = createFileRoute("/_authenticated/livreur")({
  head: () => ({
    meta: [
      { title: "Espace livreur — BYAWA" },
      { name: "description", content: "Consultez vos livraisons du jour, mettez à jour les statuts et suivez vos revenus." },
      { property: "og:title", content: "Espace livreur — BYAWA" },
      { property: "og:description", content: "Tableau de bord livreur BYAWA." },
    ],
  }),
  component: DriverDashboard,
});

function DriverDashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: driver, isLoading } = useQuery({
    queryKey: ["my-driver", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("drivers")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: deliveries = [] } = useQuery({
    queryKey: ["driver-deliveries", driver?.id],
    enabled: Boolean(driver?.id),
    refetchInterval: 30000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deliveries")
        .select(
          "id,status,fee,mode,created_at,vendor_orders(vendors(shop_name),orders(order_number,shipping_name,shipping_phone,shipping_city,shipping_zone,shipping_street,total))",
        )
        .eq("driver_id", driver!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const nextStatus: Record<string, { value: DeliveryStatus; label: string }> = {
    assigned: { value: "delivering", label: "Démarrer la livraison" },
    delivering: { value: "delivered", label: "Marquer comme livrée" },
  };

  async function updateStatus(id: string, status: DeliveryStatus) {
    const { error } = await supabase
      .from("deliveries")
      .update({ status, ...(status === "delivered" ? { delivered_at: new Date().toISOString() } : {}) })
      .eq("id", id);
    if (error) {
      toast.error("Mise à jour impossible", { description: error.message });
      return;
    }
    toast.success("Statut mis à jour");
    void queryClient.invalidateQueries({ queryKey: ["driver-deliveries", driver?.id] });
  }

  async function toggleAvailability() {
    if (!driver) return;
    const { error } = await supabase.from("drivers").update({ is_available: !driver.is_available }).eq("id", driver.id);
    if (error) {
      toast.error("Mise à jour impossible", { description: error.message });
      return;
    }
    void queryClient.invalidateQueries({ queryKey: ["my-driver", user?.id] });
  }

  const deliverySeries = useMonthlySeries(deliveries, (d) => d.created_at, [
    { key: "livraisons", value: () => 1 },
    { key: "revenus", value: (d) => Number(d.fee ?? 0) },
  ]);
  const statusBreakdown = [
    { name: "À préparer", value: deliveries.filter((d) => d.status === "to_prepare").length },
    { name: "Assignées", value: deliveries.filter((d) => d.status === "assigned").length },
    { name: "En cours", value: deliveries.filter((d) => d.status === "delivering").length },
    { name: "Livrées", value: deliveries.filter((d) => d.status === "delivered").length },
    { name: "Échouées", value: deliveries.filter((d) => d.status === "failed").length },
  ];

  if (isLoading) return <div className="container-byawa py-16 text-muted-foreground">Chargement…</div>;


  if (!driver) {
    return (
      <div className="container-byawa py-20 text-center">
        <h1 className="text-2xl font-bold">Compte livreur non activé</h1>
        <p className="mt-2 text-muted-foreground">
          Contactez l'équipe BYAWA à contact@byawa.com pour activer votre espace livreur.
        </p>
      </div>
    );
  }

  const inProgress = deliveries.filter((d) => d.status === "delivering" || d.status === "assigned");
  const done = deliveries.filter((d) => d.status === "delivered");

  return (
    <DashboardShell
      title={driver.full_name}
      subtitle={`${driver.city ?? "Sénégal"}`}
      icon={Truck}
      badge={
        <span
          className={cn(
            "rounded-full px-3 py-1 text-[11px] font-bold uppercase border",
            driver.is_available 
              ? "bg-success/10 text-success border-success/20" 
              : "bg-muted text-muted-foreground border-border"
          )}
        >
          {driver.is_available ? "En ligne" : "Hors ligne"}
        </span>
      }
      actions={
        <Button variant="outline" size="sm" onClick={() => void toggleAvailability()}>
          {driver.is_available ? "Passer hors ligne" : "Passer en ligne"}
        </Button>
      }
    >
      <StatGrid>
        <StatCard icon={Truck} label="Livraisons totales" value={deliveries.length} />
        <StatCard icon={Clock} label="En cours" value={inProgress.length} tone={inProgress.length ? "warning" : "default"} />
        <StatCard icon={CheckCircle2} label="Terminées" value={done.length} />
        <StatCard icon={Wallet} label="Revenus" value={formatPrice(driver.earnings)} tone="primary" />
      </StatGrid>
      <ChartGrid>
        <TrendChart
          title="Tendance des revenus"
          subtitle="Gains de livraison sur 6 mois"
          data={deliverySeries}
          dataKey="revenus"
          label="Revenus"
          formatter={formatPrice}
        />
        <MonthlyBarChart
          title="Évolution mensuelle"
          subtitle="Nombre de livraisons par mois"
          data={deliverySeries}
          series={[{ key: "livraisons", label: "Livraisons" }]}
        />
        <BreakdownChart
          title="Répartition des livraisons"
          subtitle="Par statut"
          data={statusBreakdown}
        />
      </ChartGrid>


      <div className="mt-4">
        <Tabs defaultValue="livraisons">
          <TabsList className={dashTabsListClass}>
            <TabsTrigger className={dashTabTriggerClass} value="livraisons">Mes livraisons</TabsTrigger>
            <TabsTrigger className={dashTabTriggerClass} value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="livraisons" className="mt-6">
            <h2 className="text-xl font-bold">Mes livraisons</h2>

        {deliveries.length === 0 ? (
          <p className="surface-card mt-4 p-10 text-center text-muted-foreground">
            Aucune livraison ne vous est encore assignée.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {deliveries.map((d) => {
              const order = d.vendor_orders?.orders;
              const action = nextStatus[d.status];
              return (
                <li key={d.id} className="surface-card space-y-3 p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-medium">
                      {order?.order_number ?? `Livraison ${d.id.slice(0, 8)}`}
                    </span>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs">{d.status}</span>
                    <span className="text-sm text-muted-foreground">
                      {d.vendor_orders?.vendors?.shop_name ?? d.mode}
                    </span>
                    <span className="ml-auto font-bold text-primary">{formatPrice(d.fee)}</span>
                  </div>
                  {order ? (
                    <p className="text-sm text-muted-foreground">
                      {[order.shipping_name, order.shipping_phone, order.shipping_street, order.shipping_zone, order.shipping_city]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  ) : null}
                  {action ? (
                    <Button size="sm" onClick={() => void updateStatus(d.id, action.value)}>
                      {action.label}
                    </Button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
        </TabsContent>
        <TabsContent value="performance" className="mt-6">
          <div className="surface-card p-10 text-center text-muted-foreground">
            Statistiques de performance détaillées à venir.
          </div>
        </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>

  );
}
