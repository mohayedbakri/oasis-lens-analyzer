import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { RefreshCw, Radio } from "lucide-react";
import { pocQueryOptions, type PocSnapshot, type Unit } from "@/lib/poc-data";
import { pickLocality } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { KpiStrip } from "@/components/poc/KpiStrip";
import { FundingPanel } from "@/components/poc/FundingPanel";
import { MilestonesPanel } from "@/components/poc/MilestonesPanel";
import { TimelinePanel } from "@/components/poc/TimelinePanel";
import { DocumentsPanel } from "@/components/poc/DocumentsPanel";
import { Complex3D } from "@/components/poc/Complex3D";
import { UnitDetailDrawer } from "@/components/poc/UnitDetailDrawer";
import { WorkPackageFilters } from "@/components/poc/WorkPackageFilters";

const burgigSearchSchema = z.object({
  q: fallback(z.string().optional(), undefined),
  category: fallback(
    z.enum(["agreement", "due_diligence", "mou", "procurement", "civil", "training"]).optional(),
    undefined,
  ),
  status: fallback(z.enum(["planned", "in_progress", "done", "blocked"]).optional(), undefined),
});

export const Route = createFileRoute("/poc/burgig")({
  validateSearch: zodValidator(burgigSearchSchema),
  head: () => ({
    meta: [
      { title: "Al-Burgig PoC — Live Dashboard | RSIC" },
      {
        name: "description",
        content:
          "Live transparency dashboard for the flagship factory in Al-Burgig: funding, work packages, schedule, and an interactive 3D complex model.",
      },
      { property: "og:title", content: "Al-Burgig PoC — Live Dashboard" },
      { property: "og:description", content: "Interactive 3D model and live KPIs for RSIC's first factory." },
    ],
    links: [{ rel: "canonical", href: "/poc/burgig" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(pocQueryOptions),
  component: BurgigPage,
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

function BurgigPage() {
  const { lang, t } = useI18n();
  const { data, refetch, isFetching, dataUpdatedAt } = useSuspenseQuery(pocQueryOptions);
  const search = Route.useSearch();
  const q = search.q ?? "";
  const category = search.category ?? "all";
  const status = search.status ?? "all";
  const [selected, setSelected] = useState<Unit | null>(null);
  const loc = pickLocality(lang);

  const filtered = useMemo(
    () => applyFilters(data, q, search.category, search.status),
    [data, q, search.category, search.status],
  );

  const isFiltered = !!(q || search.category || search.status);
  const matchCount = filtered.work_packages.length;

  // Client-only formatted date to avoid SSR/CSR hydration mismatch.
  const [updatedLabel, setUpdatedLabel] = useState<string>("—");
  useEffect(() => {
    const dateLocale = lang === "ar" ? "ar-EG" : "en-US";
    setUpdatedLabel(new Date(dataUpdatedAt).toLocaleString(dateLocale));
  }, [dataUpdatedAt, lang]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-border bg-secondary/40 p-4">
        <p className="section-number text-xs">{t("poc.eyebrow")}</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-primary">
          {t("poc.title")} — {loc.locality}, {loc.state}
        </h1>
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

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="mb-3 font-display text-xl font-bold text-primary">{t("poc.three.title")}</h2>
          <p className="mb-3 text-sm text-muted-foreground">{t("poc.three.hint")}</p>
          <Complex3D units={data.units} onSelect={setSelected} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <WorkPackageFilters q={q} category={category} status={status} />
          {isFiltered && (
            <p className="text-xs text-muted-foreground">
              {matchCount === 0
                ? t("poc.matchNone")
                : t("poc.match", { n: matchCount, t: data.work_packages.length })}
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

      <UnitDetailDrawer
        unit={selected}
        data={data}
        onOpenChange={(o) => !o && setSelected(null)}
      />
    </div>
  );
}
