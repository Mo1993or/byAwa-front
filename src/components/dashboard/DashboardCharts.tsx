import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const CHART_COLORS = [
  "hsl(24 95% 53%)",
  "hsl(199 89% 48%)",
  "hsl(142 71% 45%)",
  "hsl(45 93% 47%)",
  "hsl(280 65% 60%)",
  "hsl(0 84% 60%)",
  "hsl(215 20% 65%)",
];

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

/** Build a 6-month series from dated records. */
export function useMonthlySeries<T>(
  rows: T[],
  getDate: (row: T) => string | null | undefined,
  metrics: { key: string; value: (row: T) => number }[],
  months = 6,
): Record<string, number | string>[] {
  return useMemo(() => {

    const now = new Date();
    const buckets: Record<string, Record<string, number>> = {};
    const order: string[] = [];

    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      order.push(key);
      buckets[key] = { label: 0 } as Record<string, number>;
      const base: Record<string, number> = {};
      metrics.forEach((m) => (base[m.key] = 0));
      buckets[key] = base;
    }

    rows.forEach((row) => {
      const raw = getDate(row);
      if (!raw) return;
      const d = new Date(raw);
      if (Number.isNaN(d.getTime())) return;
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (!buckets[key]) return;
      metrics.forEach((m) => {
        buckets[key]![m.key] = (buckets[key]![m.key] ?? 0) + m.value(row);
      });
    });

    return order.map((key) => {
      const parts = key.split("-").map(Number);
      const month = parts[1] ?? 0;
      return {
        name: MONTHS[month] ?? "",
        year: parts[0] ?? 0,
        ...(buckets[key] ?? {}),
      };
    });

  }, [rows, months]);
}

export function ChartCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string | undefined;
  children: React.ReactNode;
  className?: string | undefined;
}) {
  return (
    <Card className={`border-none shadow-sm bg-white ${className ?? ""}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold text-slate-900">{title}</CardTitle>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </CardHeader>
      <CardContent className="h-[260px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

const axisProps = {
  stroke: "hsl(215 16% 65%)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  contentStyle: {
    borderRadius: 12,
    border: "1px solid hsl(214 32% 91%)",
    fontSize: 12,
    boxShadow: "0 8px 20px -8px rgba(0,0,0,.2)",
  },
};

/** Area chart — trend over time. */
export function TrendChart({
  title,
  subtitle,
  data,
  dataKey,
  label,
  formatter,
  color = CHART_COLORS[0],
}: {
  title: string;
  subtitle?: string | undefined;
  data: Record<string, unknown>[];
  dataKey: string;
  label: string;
  formatter?: (v: number) => string;
  color?: string;
}) {
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.35} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(214 32% 91%)" />
        <XAxis dataKey="name" {...axisProps} />
        <YAxis {...axisProps} width={55} />
        <Tooltip
          {...tooltipStyle}
          formatter={(v: number) => [formatter ? formatter(v) : v, label]}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          name={label}
          stroke={color}
          strokeWidth={2.5}
          fill={`url(#grad-${dataKey})`}
        />
      </AreaChart>
    </ChartCard>
  );
}

/** Bar chart — monthly evolution, optionally multi-series. */
export function MonthlyBarChart({
  title,
  subtitle,
  data,
  series,
  formatter,
}: {
  title: string;
  subtitle?: string | undefined;
  data: Record<string, unknown>[];
  series: { key: string; label: string; color?: string }[];
  formatter?: (v: number) => string;
}) {
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(214 32% 91%)" />
        <XAxis dataKey="name" {...axisProps} />
        <YAxis {...axisProps} width={55} />
        <Tooltip {...tooltipStyle} formatter={(v: number) => (formatter ? formatter(v) : v)} />
        {series.length > 1 && <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />}
        {series.map((s, i) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label}
            fill={s.color ?? CHART_COLORS[i % CHART_COLORS.length]}
            radius={[6, 6, 0, 0]}
            maxBarSize={38}
          />
        ))}
      </BarChart>
    </ChartCard>
  );
}

/** Donut chart — distribution. */
export function BreakdownChart({
  title,
  subtitle,
  data,
  formatter,
}: {
  title: string;
  subtitle?: string | undefined;
  data: { name: string; value: number }[];
  formatter?: (v: number) => string;
}) {
  const filtered = data.filter((d) => d.value > 0);
  if (filtered.length === 0) {
    return (
      <Card className="border-none shadow-sm bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-slate-900">{title}</CardTitle>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </CardHeader>
        <CardContent className="flex h-[260px] items-center justify-center text-sm text-slate-400">
          Pas encore de données
        </CardContent>
      </Card>
    );
  }
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <PieChart>
        <Pie
          data={filtered}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          stroke="none"
        >
          {filtered.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip {...tooltipStyle} formatter={(v: number) => (formatter ? formatter(v) : v)} />
        <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
      </PieChart>
    </ChartCard>
  );
}

/** Line chart — cumulative / comparative evolution. */
export function EvolutionChart({
  title,
  subtitle,
  data,
  series,
  formatter,
}: {
  title: string;
  subtitle?: string | undefined;
  data: Record<string, unknown>[];
  series: { key: string; label: string; color?: string }[];
  formatter?: (v: number) => string;
}) {
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(214 32% 91%)" />
        <XAxis dataKey="name" {...axisProps} />
        <YAxis {...axisProps} width={55} />
        <Tooltip {...tooltipStyle} formatter={(v: number) => (formatter ? formatter(v) : v)} />
        {series.length > 1 && <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />}
        {series.map((s, i) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color ?? CHART_COLORS[i % CHART_COLORS.length]}
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ChartCard>
  );
}

export function ChartGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-6 lg:grid-cols-3 mb-10">{children}</div>;
}
