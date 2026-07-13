import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { RefreshCw, Radio } from "lucide-react";
import { SudanMap } from "@/components/poc/dashboard/SudanMap";
import { RoadmapSidebar } from "@/components/poc/dashboard/RoadmapSidebar";
import { TasksPanel } from "@/components/poc/dashboard/TasksPanel";
import { StateDetailDrawer } from "@/components/poc/dashboard/StateDetailDrawer";
import { KpiStrip } from "@/components/poc/KpiStrip";
import { FundingPanel } from "@/components/poc/FundingPanel";
import { MilestonesPanel } from "@/components/poc/MilestonesPanel";
import { TimelinePanel } from "@/components/poc/TimelinePanel";
import { DocumentsPanel } from "@/components/poc/DocumentsPanel";
import { WorkPackageFilters } from "@/components/poc/WorkPackageFilters";
import { GlobalIndicesStrip } from "@/components/poc/GlobalIndicesStrip";
import { pocQueryOptions, type PocSnapshot } from "@/lib/poc-data";
import { useI18n } from "@/lib/i18n";
import type { StageId } from "@/lib/oasis-data";

const searchSchema = z.object({
  stage: fallback(
    z.enum(["feasibility", "planning", "financing", "build", "operate", "scale"]).optional(),
    undefined,
  ),
  state: fallback(z.string().optional(), undefined),
  q: fallback(z.string().optional(), undefined),
  category: fallback(
    z.enum(["agreement", "due_diligence", "mou", "procurement", "civil", "training"]).optional(),
    undefined,
  ),
  status: fallback(z.enum(["planned", "in_progress", "done", "blocked"]).optional(), undefined),
});

export const Route = createFileRoute("/poc/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Oasis Lens Analyzer — National RSIC Dashboard" },
      {
        name: "description",
        content:
          "National RSIC dashboard: interactive Sudan map, roadmap, measurable tasks, and the live Al-Burgig work-package tracking matrix.",
      },
      { property: "og:title", content: "Oasis Lens Analyzer — National RSIC Dashboard" },
      {
        property: "og:description",
        content: "Sudan map, RSIC roadmap, tasks, and live work-package tracking in one view.",
      },
    ],
    links: [{ rel: "canonical", href: "/poc" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(pocQueryOptions),
  component: NationalDashboard,
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
  return {
    ...data,
    work_packages: wps,
    funding: data.funding.filter((f) => wpIds.has(f.work_package_id)),
    documents: data.documents.filter((d) => wpIds.has(d.work_package_id)),
  };
}

function NationalDashboard() {
  const { lang, t } = useI18n();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const stage: StageId | null = search.stage ?? null;
  const stateId: string | null = search.state ?? null;
  const [drawerId, setDrawerId] = useState<string | null>(null);

  const setStage = (s: StageId | null) =>
    navigate({ search: (p: z.infer<typeof searchSchema>) => ({ ...p, stage: s ?? undefined }) });
  const setState = (id: string | null) =>
    navigate({ search: (p: z.infer<typeof searchSchema>) => ({ ...p, state: id ?? undefined }) });

  const { data, refetch, isFetching, dataUpdatedAt } = useSuspenseQuery(pocQueryOptions);
  const q = search.q ?? "";
  const category = search.category ?? "all";
  const status = search.status ?? "all";
  const filtered = useMemo(
    () => applyFilters(data, q, search.category, search.status),
    [data, q, search.category, search.status],
  );
  const isFiltered = !!(q || search.category || search.status);
  const matchCount = filtered.work_packages.length;

  const [updatedLabel, setUpdatedLabel] = useState<string>("—");
  useEffect(() => {
    const dateLocale = lang === "ar" ? "ar-EG" : "en-US";
    setUpdatedLabel(new Date(dataUpdatedAt).toLocaleString(dateLocale));
  }, [dataUpdatedAt, lang]);

  return (
    <section className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <GlobalIndicesStrip />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="order-2 lg:order-1">
          <RoadmapSidebar activeStage={stage} onSelect={setStage} />
        </div>
        <div className="order-1 space-y-6 lg:order-2">
          <SudanMap
            selectedStateId={stateId}
            filterStage={stage}
            onSelect={(id) => {
              setState(id);
              setDrawerId(id);
            }}
          />
          <TasksPanel
            activeStage={stage}
            activeStateId={stateId}
            onSelectState={setState}
          />
        </div>
      </div>

      <div className="space-y-6 border-t border-border pt-8">
        <div>
          <p className="section-number text-xs">{t("poc.eyebrow")}</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-primary">
            {t("poc.title")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("poc.desc.suffix")}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Radio className={`h-4 w-4 ${data.source === "sheet" ? "text-primary" : "text-muted-foreground"}`} />
            <span>
              {t("poc.source")}: {data.source === "sheet" ? t("poc.source.sheet") : t("poc.source.fallback")}
            </span>
            <span className="mx-2">·</span>
            <span dir="ltr" suppressHydrationWarning>
              {t("poc.lastUpdate")}: {updatedLabel}
            </span>
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm hover:border-primary disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            {t("poc.refresh")}
          </button>
        </div>

        <KpiStrip data={data} />

        <WorkPackageFilters q={q} category={category} status={status} />
        {isFiltered && (
          <p className="text-xs text-muted-foreground">
            {matchCount === 0
              ? t("poc.matchNone")
              : t("poc.match", { n: matchCount, t: data.work_packages.length })}
          </p>
        )}

        <MilestonesPanel data={filtered} />
        <TimelinePanel data={filtered} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FundingPanel data={filtered} />
          </div>
          <DocumentsPanel data={filtered} />
        </div>
      </div>

      <StateDetailDrawer stateId={drawerId} onClose={() => setDrawerId(null)} />
    </section>
  );
}
