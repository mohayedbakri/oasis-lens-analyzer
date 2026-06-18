import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { RefreshCw, Radio } from "lucide-react";
import { PageShell, PageHeader } from "@/components/layout/PageShell";
import { pocQueryOptions, type PocSnapshot, type Unit } from "@/lib/poc-data";
import { pocConfig } from "@/lib/site";
import { KpiStrip } from "@/components/poc/KpiStrip";
import { FundingPanel } from "@/components/poc/FundingPanel";
import { MilestonesPanel } from "@/components/poc/MilestonesPanel";
import { TimelinePanel } from "@/components/poc/TimelinePanel";
import { DocumentsPanel } from "@/components/poc/DocumentsPanel";
import { Complex3D } from "@/components/poc/Complex3D";
import { UnitDetailDrawer } from "@/components/poc/UnitDetailDrawer";
import { WorkPackageFilters } from "@/components/poc/WorkPackageFilters";

const pocSearchSchema = z.object({
  q: fallback(z.string().optional(), undefined),
  category: fallback(
    z.enum(["agreement", "due_diligence", "mou", "procurement", "civil", "training"]).optional(),
    undefined,
  ),
  status: fallback(
    z.enum(["planned", "in_progress", "done", "blocked"]).optional(),
    undefined,
  ),
});

export const Route = createFileRoute("/poc")({
  validateSearch: zodValidator(pocSearchSchema),
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

function applyFilters(
  data: PocSnapshot,
  q: string,
  category: string | undefined,
  status: string | undefined,
): PocSnapshot {
  const needle = q.trim().toLowerCase();
  const wps = data.work_packages.filter((w) => {
    if (category && w.category !== category) return false;
    if (status && w.status !== status) return false;
    if (needle) {
      const hay = `${w.name_ar} ${w.id} ${w.category} ${w.status}`.toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    return true;
  });
  const wpIds = new Set(wps.map((w) => w.id));
  const docs = data.documents.filter((d) => {
    if (!wpIds.has(d.work_package_id)) return false;
    if (needle && !`${d.title_ar} ${d.type}`.toLowerCase().includes(needle)) {
      // keep doc if its WP matched even when needle doesn't hit doc text
      return wpIds.has(d.work_package_id);
    }
    return true;
  });
  return {
    ...data,
    work_packages: wps,
    funding: data.funding.filter((f) => wpIds.has(f.work_package_id)),
    documents: docs,
  };
}

function PocPage() {
  const { data, refetch, isFetching, dataUpdatedAt } = useSuspenseQuery(pocQueryOptions);
  const search = Route.useSearch();
  const q = search.q ?? "";
  const category = search.category ?? "all";
  const status = search.status ?? "all";
  const [selected, setSelected] = useState<Unit | null>(null);

  const filtered = useMemo(
    () => applyFilters(data, q, search.category, search.status),
    [data, q, search.category, search.status],
  );

  const isFiltered = !!(q || search.category || search.status);
  const matchCount = filtered.work_packages.length;

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
          <div className="lg:col-span-2 space-y-4">
            <WorkPackageFilters q={q} category={category} status={status} />
            {isFiltered && (
              <p className="text-xs text-muted-foreground">
                {matchCount === 0
                  ? "لا توجد نتائج مطابقة."
                  : `عرض ${matchCount} من ${data.work_packages.length} حزمة عمل.`}
              </p>
            )}
            <MilestonesPanel data={filtered} />
          </div>
        </div>

        <TimelinePanel data={filtered} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FundingPanel data={filtered} />
          </div>
          <DocumentsPanel data={filtered} />
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
