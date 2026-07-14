import { pickName, type PocSnapshot } from "@/lib/poc-data";
import { useI18n } from "@/lib/i18n";

export function TimelinePanel({ data }: { data: PocSnapshot }) {
  const { t, lang } = useI18n();
  const all = data.work_packages.flatMap((w) => [
    new Date(w.planned_start).getTime(),
    new Date(w.planned_end).getTime(),
    w.actual_start ? new Date(w.actual_start).getTime() : 0,
    w.actual_end ? new Date(w.actual_end).getTime() : 0,
  ]).filter(Boolean);
  const min = Math.min(...all);
  const max = Math.max(...all);
  const span = Math.max(max - min, 1);

  const pct = (tm: number) => ((tm - min) / span) * 100;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-display text-lg font-bold text-primary">{t("poc.timeline")}</h3>
      <div className="mt-4 space-y-3">
        {data.work_packages.map((wp) => {
          const ps = new Date(wp.planned_start).getTime();
          const pe = new Date(wp.planned_end).getTime();
          const as = wp.actual_start ? new Date(wp.actual_start).getTime() : null;
          const ae = wp.actual_end ? new Date(wp.actual_end).getTime() : as ? Date.now() : null;
          return (
            <div key={wp.id}>
              <div className="mb-1 flex items-baseline justify-between gap-2 text-xs">
                <span className="font-medium text-foreground">{pickName(wp, lang)}</span>
                <span className="text-muted-foreground" dir="ltr">
                  {wp.planned_start} → {wp.planned_end}
                </span>
              </div>
              <div className="relative h-6 rounded bg-secondary/60">
                <div
                  className="absolute top-0.5 h-2 rounded bg-muted-foreground/40"
                  style={{ insetInlineStart: `${pct(ps)}%`, width: `${pct(pe) - pct(ps)}%` }}
                  title={t("poc.timeline.planned")}
                />
                {as && ae && (
                  <div
                    className="absolute bottom-0.5 h-2 rounded bg-primary"
                    style={{ insetInlineStart: `${pct(as)}%`, width: `${Math.max(pct(ae) - pct(as), 0.5)}%` }}
                    title={t("poc.timeline.actual")}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><span className="h-2 w-4 rounded bg-muted-foreground/40" />{t("poc.timeline.planned")}</span>
        <span className="flex items-center gap-2"><span className="h-2 w-4 rounded bg-primary" />{t("poc.timeline.actual")}</span>
      </div>
    </div>
  );
}
