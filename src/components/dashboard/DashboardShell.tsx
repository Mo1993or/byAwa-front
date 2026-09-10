import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function DashboardShell({
  title,
  subtitle,
  children,
  badge,
  actions,
  icon: Icon,
  avatarUrl,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  badge?: ReactNode;
  actions?: ReactNode;
  icon?: LucideIcon;
  avatarUrl?: string | null;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="container-byawa py-4">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:flex md:justify-between">
            <div className="flex min-w-0 items-center gap-3.5">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={title}
                  className="size-11 shrink-0 rounded-2xl border border-slate-200 object-cover"
                />
              ) : Icon ? (
                <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[0_6px_16px_-6px_color-mix(in_oklab,var(--primary)_70%,transparent)]">
                  <Icon className="size-5" />
                </div>
              ) : null}
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-2">
                  <h1 className="truncate font-display text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                    {title}
                  </h1>
                  {badge}
                </div>
                {subtitle && (
                  <p className="truncate text-xs font-medium text-slate-500">{subtitle}</p>
                )}
              </div>
            </div>
            {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container-byawa flex flex-col gap-6 py-6 md:gap-8 md:py-8">{children}</main>
    </div>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  description,
  hint,
  tone,
}: {
  icon?: LucideIcon;
  label: string;
  value: string | number;
  description?: string;
  hint?: string;
  tone?: "default" | "primary" | "warning";
}) {
  const tileClass =
    tone === "warning"
      ? "bg-amber-500/12 text-amber-600"
      : tone === "primary"
        ? "bg-primary/12 text-primary"
        : "bg-slate-900/8 text-slate-700";

  return (
    <Card className="group relative gap-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-0 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_14px_30px_-18px_rgba(15,23,42,0.35)]">
      <CardContent className="flex flex-col items-start gap-2.5 p-3.5 md:gap-4 md:p-5">
        {Icon ? (
          <div className={cn("grid size-10 shrink-0 place-items-center rounded-xl md:size-11", tileClass)}>
            <Icon className="size-5" />
          </div>
        ) : null}
        <div className="w-full min-w-0">
          <CardTitle className="truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 md:text-[11px]">
            {label}
          </CardTitle>
          <div className="mt-1 truncate font-display text-lg font-bold tracking-tight text-slate-900 md:mt-2 md:text-[28px]">
            {value}
          </div>
          {(description || hint) && (
            <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium leading-tight text-slate-500 md:mt-2 md:text-xs">
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  tone === "warning" ? "bg-amber-500" : tone === "primary" ? "bg-primary" : "bg-slate-300",
                )}
              />
              <span className="truncate">{description || hint}</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-6">
      {children}
    </div>
  );
}


export const dashTabsListClass =
  "flex w-full overflow-x-auto no-scrollbar justify-start gap-2 rounded-none border-b border-slate-200 bg-transparent p-0 mb-8";

export const dashTabTriggerClass =
  "relative h-10 rounded-none border-b-2 border-transparent px-4 pb-2 pt-2 text-sm font-semibold text-slate-500 transition-all hover:text-slate-900 data-[state=active]:border-primary data-[state=active]:text-slate-900 data-[state=active]:shadow-none cursor-pointer";

export function StepHeader({ step, total, labels }: { step: number; total: number; labels: string[] }) {
  return (
    <ol className="flex items-center gap-3">
      {labels.slice(0, total).map((label, i) => {
        const index = i + 1;
        const active = index === step;
        const done = index < step;
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold",
                (done || active) ? "bg-primary text-primary-foreground" : "bg-slate-100 text-slate-400"
              )}
            >
              {index}
            </span>
            <span
              className={cn(
                "truncate text-xs font-semibold",
                active ? "text-slate-900" : "text-slate-400"
              )}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
