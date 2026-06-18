import type { PocSnapshot } from "@/lib/poc-data";
import { Banknote, CheckCircle2, CalendarClock, FileCheck2 } from "lucide-react";

export function KpiStrip({ data }: { data: PocSnapshot }) {
  const allocated = data.funding.reduce((s, f) => s + f.allocated_usd, 0);
  const received = data.funding.reduce((s, f) => s + f.received_usd, 0);
  const fundingPct = allocated > 0 ? Math.round((received / allocated) * 100) : 0;

  const wpDone = data.work_packages.filter((w) => w.status === "done").length;
  const wpPct = data.work_packages.length
    ? Math.round((wpDone / data.work_packages.length) * 100)
    : 0;

  // simple plan adherence: average (actual_end vs planned_end) delta for done wps, in days
  const done = data.work_packages.filter((w) => w.status === "done" && w.actual_end);
  const avgDelta = done.length
    ? Math.round(
        done.reduce((s, w) => {
          const d =
            (new Date(w.actual_end!).getTime() - new Date(w.planned_end).getTime()) /
            86400000;
          return s + d;
        }, 0) / done.length,
      )
    : 0;

  const docs = data.documents.length;

  const cards = [
    {
      label: "نسبة التمويل المستلم",
      value: `${fundingPct}%`,
      sub: `${received.toLocaleString("ar-EG")} / ${allocated.toLocaleString("ar-EG")} دولار`,
      Icon: Banknote,
      color: "text-primary",
    },
    {
      label: "نسبة الإنجاز",
      value: `${wpPct}%`,
      sub: `${wpDone} من ${data.work_packages.length} حزمة عمل`,
      Icon: CheckCircle2,
      color: "text-primary",
    },
    {
      label: "الالتزام بالجدول الزمني",
      value: avgDelta === 0 ? "في الموعد" : `${Math.abs(avgDelta)} يوم ${avgDelta > 0 ? "تأخير" : "تقدم"}`,
      sub: "متوسط الفارق للحزم المنجزة",
      Icon: CalendarClock,
      color: avgDelta > 5 ? "text-destructive" : "text-primary",
    },
    {
      label: "الوثائق الموقّعة",
      value: String(docs),
      sub: "اتفاقيات ومذكرات وعقود",
      Icon: FileCheck2,
      color: "text-primary",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">{c.label}</p>
            <c.Icon className={`h-5 w-5 ${c.color}`} />
          </div>
          <p className="mt-2 text-3xl font-bold text-primary">{c.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
