import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { RefreshCw, Radio } from "lucide-react";
import { PageShell, PageHeader } from "@/components/layout/PageShell";
import { pocQueryOptions, type Unit } from "@/lib/poc-data";
import { pocConfig } from "@/lib/site";
import { KpiStrip } from "@/components/poc/KpiStrip";
import { FundingPanel } from "@/components/poc/FundingPanel";
import { MilestonesPanel } from "@/components/poc/MilestonesPanel";
import { TimelinePanel } from "@/components/poc/TimelinePanel";
import { DocumentsPanel } from "@/components/poc/DocumentsPanel";
import { Complex3D } from "@/components/poc/Complex3D";
import { UnitDetailDrawer } from "@/components/poc/UnitDetailDrawer";

export const Route = createFileRoute("/poc")({
  head: () => ({
    meta: [
      { title: "لوحة تحكم مشروع إثبات المفهوم — البرقيق | RSIC" },
      {
        name: "description",
        content:
          "لوحة شفافية لحظية لتتبع تقدّم المصنع الرائد في محلية البرقيق: التمويل، حزم العمل، الجدول الزمني، ونموذج ثلاثي الأبعاد تفاعلي للمجمّع.",
      },
      { property: "og:title", content: "لوحة تحكم مشروع إثبات المفهوم — البرقيق" },
      {
        property: "og:description",
        content: "نموذج ثلاثي الأبعاد ومؤشرات لحظية لتقدّم أول مصنع في مبادرة RSIC.",
      },
      { property: "og:url", content: "/poc" },
    ],
    links: [{ rel: "canonical", href: "/poc" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(pocQueryOptions),
  component: PocPage,
});

function PocPage() {
  const { data, refetch, isFetching, dataUpdatedAt } = useSuspenseQuery(pocQueryOptions);
  const [selected, setSelected] = useState<Unit | null>(null);

  return (
    <PageShell>
      <PageHeader
        eyebrow="شفافية لحظية"
        title="لوحة تحكم مشروع إثبات المفهوم"
        description={`تتبّع تقدّم المصنع الرائد في ${pocConfig.localityNameAr} — ${pocConfig.stateAr}. البيانات تُحدَّث من الميدان عبر Google Sheets.`}
      />

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Radio className={`h-4 w-4 ${data.source === "sheet" ? "text-primary" : "text-muted-foreground"}`} />
            <span>
              المصدر: {data.source === "sheet" ? "Google Sheets (حيّ)" : "بيانات تجريبية"}
            </span>
            <span className="mx-2">·</span>
            <span dir="ltr">
              آخر تحديث: {new Date(dataUpdatedAt).toLocaleString("ar-EG")}
            </span>
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm hover:border-primary disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            تحديث
          </button>
        </div>

        <KpiStrip data={data} />

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="mb-3 font-display text-xl font-bold text-primary">
              نموذج المجمّع ثلاثي الأبعاد
            </h2>
            <p className="mb-3 text-sm text-muted-foreground">
              اسحب للدوران، استخدم العجلة للتكبير، وانقر على أي وحدة لعرض تفاصيل حزم العمل والتمويل.
            </p>
            <Complex3D units={data.units} onSelect={setSelected} />
          </div>
          <div className="lg:col-span-2">
            <MilestonesPanel data={data} />
          </div>
        </div>

        <TimelinePanel data={data} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FundingPanel data={data} />
          </div>
          <DocumentsPanel data={data} />
        </div>
      </section>

      <UnitDetailDrawer
        unit={selected}
        data={data}
        onOpenChange={(o) => !o && setSelected(null)}
      />
    </PageShell>
  );
}
