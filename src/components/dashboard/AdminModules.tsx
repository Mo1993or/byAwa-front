import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { formatDate, formatPrice } from "@/lib/format";

function Panel({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold text-slate-900">{title}</h2>
          {description ? <p className="text-sm text-slate-500">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Empty({ label }: { label: string }) {
  return <p className="surface-card p-10 text-center text-muted-foreground">{label}</p>;
}

/* ------------------------------- Catégories ------------------------------- */

export function AdminCategories() {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

  const { data: categories = [] } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id,name,slug,parent_id,is_active,position,commission_rate")
        .order("position");
      if (error) throw error;
      return data ?? [];
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      const slug = name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const { error } = await supabase
        .from("categories")
        .insert({ name, slug, parent_id: parent || null, position: categories.length + 1 });
      if (error) throw error;
    },
    onSuccess: () => {
      setName("");
      setParent("");
      toast.success("Catégorie créée");
      void qc.invalidateQueries({ queryKey: ["admin-categories"] });
      void qc.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: { is_active?: boolean; commission_rate?: number | null } }) => {
      const { error } = await supabase.from("categories").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin-categories"] });
      void qc.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const roots = categories.filter((c) => !c.parent_id);

  return (
    <Panel title="Catégories" description="Arborescence des rayons et commission par catégorie.">
      <div className="surface-card flex flex-wrap items-end gap-3 p-4">
        <div className="min-w-45 flex-1">
          <label className="text-xs text-muted-foreground" htmlFor="cat-name">Nom</label>
          <Input id="cat-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex. Épicerie" />
        </div>
        <div className="min-w-45 flex-1">
          <label className="text-xs text-muted-foreground" htmlFor="cat-parent">Rayon parent</label>
          <select
            id="cat-parent"
            value={parent}
            onChange={(e) => setParent(e.target.value)}
            className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">— Racine —</option>
            {roots.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <Button disabled={!name.trim() || create.isPending} onClick={() => create.mutate()}>
          Ajouter
        </Button>
      </div>

      <div className="space-y-2">
        {categories.length === 0 ? (
          <Empty label="Aucune catégorie." />
        ) : (
          categories.map((c) => (
            <div key={c.id} className="surface-card flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  {c.parent_id ? <span className="text-muted-foreground">↳ </span> : null}
                  {c.name}
                </p>
                <p className="text-xs text-muted-foreground">/{c.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-muted-foreground" htmlFor={`comm-${c.id}`}>Commission %</label>
                <Input
                  id={`comm-${c.id}`}
                  type="number"
                  min={0}
                  max={50}
                  defaultValue={c.commission_rate ?? ""}
                  className="h-9 w-24"
                  onBlur={(e) =>
                    update.mutate({
                      id: c.id,
                      patch: { commission_rate: e.target.value === "" ? null : Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Active</span>
                <Switch
                  checked={c.is_active}
                  onCheckedChange={(v) => update.mutate({ id: c.id, patch: { is_active: v } })}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </Panel>
  );
}

/* -------------------------------- Bannières ------------------------------- */

export function AdminBanners() {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");

  const { data: banners = [] } = useQuery({
    queryKey: ["admin-banners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("banners")
        .select("id,title,subtitle,image_url,link,is_active,position")
        .order("position");
      if (error) throw error;
      return data ?? [];
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("banners")
        .insert({ title, image_url: image || null, link: link || null, position: banners.length + 1 });
      if (error) throw error;
    },
    onSuccess: () => {
      setTitle("");
      setImage("");
      setLink("");
      toast.success("Bannière ajoutée");
      void qc.invalidateQueries({ queryKey: ["admin-banners"] });
      void qc.invalidateQueries({ queryKey: ["banners"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: { is_active?: boolean } }) => {
      const { error } = await supabase.from("banners").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin-banners"] });
      void qc.invalidateQueries({ queryKey: ["banners"] });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("banners").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Bannière supprimée");
      void qc.invalidateQueries({ queryKey: ["admin-banners"] });
      void qc.invalidateQueries({ queryKey: ["banners"] });
    },
  });

  return (
    <Panel title="Bannières" description="Visuels mis en avant sur la page d'accueil.">
      <div className="surface-card flex flex-wrap items-end gap-3 p-4">
        <div className="min-w-45 flex-1">
          <label className="text-xs text-muted-foreground" htmlFor="ban-title">Titre</label>
          <Input id="ban-title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="min-w-45 flex-1">
          <label className="text-xs text-muted-foreground" htmlFor="ban-img">Image (URL)</label>
          <Input id="ban-img" value={image} onChange={(e) => setImage(e.target.value)} placeholder="/images/banners/banner-1.jpg" />
        </div>
        <div className="min-w-45 flex-1">
          <label className="text-xs text-muted-foreground" htmlFor="ban-link">Lien</label>
          <Input id="ban-link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="/categorie/mode" />
        </div>
        <Button disabled={!title.trim() || create.isPending} onClick={() => create.mutate()}>Ajouter</Button>
      </div>

      <div className="space-y-2">
        {banners.length === 0 ? (
          <Empty label="Aucune bannière." />
        ) : (
          banners.map((b) => (
            <div key={b.id} className="surface-card flex flex-wrap items-center gap-3 p-4">
              {b.image_url ? (
                <img src={b.image_url} alt={b.title} className="size-14 rounded-lg border object-cover" />
              ) : null}
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{b.title}</p>
                <p className="truncate text-xs text-muted-foreground">{b.link ?? "Aucun lien"}</p>
              </div>
              <Switch checked={b.is_active} onCheckedChange={(v) => update.mutate({ id: b.id, patch: { is_active: v } })} />
              <Button variant="outline" size="sm" onClick={() => remove.mutate(b.id)}>Supprimer</Button>
            </div>
          ))
        )}
      </div>
    </Panel>
  );
}

/* --------------------------------- Coupons -------------------------------- */

export function AdminCoupons() {
  const qc = useQueryClient();
  const [code, setCode] = useState("");
  const [type, setType] = useState("percent");
  const [value, setValue] = useState("10");
  const [min, setMin] = useState("0");

  const { data: coupons = [] } = useQuery({
    queryKey: ["admin-coupons"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("coupons")
        .select("id,code,discount_type,discount_value,min_amount,usage_limit,used_count,is_active,expires_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("coupons").insert({
        code: code.trim().toUpperCase(),
        discount_type: type,
        discount_value: Number(value),
        min_amount: Number(min),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setCode("");
      toast.success("Coupon créé");
      void qc.invalidateQueries({ queryKey: ["admin-coupons"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: { is_active?: boolean } }) => {
      const { error } = await supabase.from("coupons").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["admin-coupons"] }),
  });

  return (
    <Panel title="Coupons" description="Codes promotionnels valables sur la marketplace.">
      <div className="surface-card flex flex-wrap items-end gap-3 p-4">
        <div>
          <label className="text-xs text-muted-foreground" htmlFor="cp-code">Code</label>
          <Input id="cp-code" value={code} onChange={(e) => setCode(e.target.value)} className="w-40 uppercase" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground" htmlFor="cp-type">Type</label>
          <select
            id="cp-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 h-9 w-36 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="percent">Pourcentage</option>
            <option value="fixed">Montant fixe</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground" htmlFor="cp-val">Valeur</label>
          <Input id="cp-val" type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-28" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground" htmlFor="cp-min">Panier min.</label>
          <Input id="cp-min" type="number" value={min} onChange={(e) => setMin(e.target.value)} className="w-32" />
        </div>
        <Button disabled={!code.trim() || create.isPending} onClick={() => create.mutate()}>Créer</Button>
      </div>

      <div className="space-y-2">
        {coupons.length === 0 ? (
          <Empty label="Aucun coupon." />
        ) : (
          coupons.map((c) => (
            <div key={c.id} className="surface-card flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="font-mono font-bold">{c.code}</p>
                <p className="text-xs text-muted-foreground">
                  {c.discount_type === "percent" ? `${c.discount_value}%` : formatPrice(Number(c.discount_value))} · min.{" "}
                  {formatPrice(Number(c.min_amount))} · utilisé {c.used_count}
                  {c.usage_limit ? `/${c.usage_limit}` : ""}
                </p>
              </div>
              <Switch checked={c.is_active} onCheckedChange={(v) => update.mutate({ id: c.id, patch: { is_active: v } })} />
            </div>
          ))
        )}
      </div>
    </Panel>
  );
}

/* --------------------------------- Support -------------------------------- */

const TICKET_STATUSES = ["open", "pending", "resolved", "closed"] as const;

export function AdminSupport() {
  const qc = useQueryClient();
  const { data: tickets = [] } = useQuery({
    queryKey: ["admin-tickets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("support_tickets")
        .select("id,subject,message,status,created_at,order_id")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data ?? [];
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: (typeof TICKET_STATUSES)[number] }) => {
      const { error } = await supabase.from("support_tickets").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Ticket mis à jour");
      void qc.invalidateQueries({ queryKey: ["admin-tickets"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Panel title="Support" description="Tickets envoyés par les clients et vendeurs.">
      <div className="space-y-2">
        {tickets.length === 0 ? (
          <Empty label="Aucun ticket." />
        ) : (
          tickets.map((t) => (
            <div key={t.id} className="surface-card flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{t.subject}</p>
                <p className="line-clamp-2 text-xs text-muted-foreground">{t.message}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{formatDate(t.created_at)}</p>
              </div>
              <select
                value={t.status}
                onChange={(e) =>
                  update.mutate({ id: t.id, status: e.target.value as (typeof TICKET_STATUSES)[number] })
                }
                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                aria-label="Statut du ticket"
              >
                {TICKET_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          ))
        )}
      </div>
    </Panel>
  );
}

/* --------------------------------- Retours -------------------------------- */

const RETURN_STATUSES = ["requested", "approved", "refused", "received", "refunded"] as const;

export function AdminReturns() {
  const qc = useQueryClient();
  const { data: returns = [] } = useQuery({
    queryKey: ["admin-returns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("returns")
        .select("id,reason,status,refund_amount,created_at,orders(order_number,total)")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data ?? [];
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: (typeof RETURN_STATUSES)[number] }) => {
      const { error } = await supabase.from("returns").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Retour mis à jour");
      void qc.invalidateQueries({ queryKey: ["admin-returns"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Panel title="Retours & remboursements" description="Demandes de retour à instruire.">
      <div className="space-y-2">
        {returns.length === 0 ? (
          <Empty label="Aucune demande de retour." />
        ) : (
          returns.map((r) => (
            <div key={r.id} className="surface-card flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  {r.orders?.order_number ? `Commande ${r.orders.order_number}` : "Commande"}
                </p>
                <p className="line-clamp-2 text-xs text-muted-foreground">{r.reason}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {formatDate(r.created_at)}
                  {r.refund_amount ? ` · remboursement ${formatPrice(Number(r.refund_amount))}` : ""}
                </p>
              </div>
              <select
                value={r.status}
                onChange={(e) =>
                  update.mutate({ id: r.id, status: e.target.value as (typeof RETURN_STATUSES)[number] })
                }
                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                aria-label="Statut du retour"
              >
                {RETURN_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          ))
        )}
      </div>
    </Panel>
  );
}
