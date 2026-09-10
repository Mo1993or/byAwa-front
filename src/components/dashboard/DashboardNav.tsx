import { useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Menu } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DashboardNavItem = {
  value: string;
  label: string;
  icon?: LucideIcon;
  badge?: number;
};

function NavButton({
  item,
  active,
  onSelect,
}: {
  item: DashboardNavItem;
  active: boolean;
  onSelect: (v: string) => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={() => onSelect(item.value)}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
        active
          ? "bg-primary text-primary-foreground shadow-[0_8px_18px_-10px_color-mix(in_oklab,var(--primary)_85%,transparent)]"
          : "text-slate-300 hover:bg-white/8 hover:text-white",
      )}
    >
      {Icon ? <Icon className="size-4 shrink-0" /> : null}
      <span className="min-w-0 flex-1 truncate text-left">{item.label}</span>
      {item.badge ? (
        <span
          className={cn(
            "grid min-w-5 place-items-center rounded-full px-1.5 text-[10px] font-bold",
            active ? "bg-white/25 text-primary-foreground" : "bg-amber-500 text-slate-900",
          )}
        >
          {item.badge}
        </span>
      ) : null}
    </button>
  );
}


/**
 * Dashboard tabs rendered as a vertical sidebar (desktop) and a hamburger
 * sheet menu (mobile / tablet).
 */
export function DashboardTabs({
  items,
  defaultValue,
  navTitle = "Modules",
  children,
}: {
  items: DashboardNavItem[];
  defaultValue?: string;
  navTitle?: string;
  children: ReactNode;
}) {
  const [value, setValue] = useState(defaultValue ?? items[0]?.value ?? "");
  const [open, setOpen] = useState(false);
  const current = items.find((i) => i.value === value);

  return (
    <Tabs value={value} onValueChange={setValue} className="flex flex-col gap-4 lg:flex-row lg:gap-8">
      {/* Mobile: hamburger */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="h-11 w-full justify-start gap-3 rounded-xl border-slate-200 bg-white font-semibold text-slate-900"
            >
              <Menu className="size-4 text-primary" />
              <span className="truncate">{current?.label ?? navTitle}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[82vw] max-w-xs border-none bg-[#0F172A] p-0">
            <SheetHeader className="border-b border-white/10 p-4">
              <SheetTitle className="font-display text-base text-white">{navTitle}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 overflow-y-auto p-3">
              {items.map((item) => (
                <NavButton
                  key={item.value}
                  item={item}
                  active={item.value === value}
                  onSelect={(v) => {
                    setValue(v);
                    setOpen(false);
                  }}
                />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: sidebar */}
      <aside className="hidden w-60 shrink-0 lg:block">
        <nav className="sticky top-24 flex flex-col gap-1 rounded-2xl bg-[#0F172A] p-3 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.9)]">
          <p className="px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            {navTitle}
          </p>
          {items.map((item) => (
            <NavButton key={item.value} item={item} active={item.value === value} onSelect={setValue} />
          ))}
        </nav>
      </aside>


      <div className="min-w-0 flex-1">{children}</div>
    </Tabs>
  );
}
