import { ROADMAP_STAGES, TASKS, pickStage, pickStageDesc, type StageId } from "@/lib/oasis-data";
import { useI18n } from "@/lib/i18n";
import { CheckCircle2, CircleDot, Circle } from "lucide-react";

export function RoadmapSidebar({
  activeStage,
  onSelect,
}: {
  activeStage: StageId | null;
  onSelect: (s: StageId | null) => void;
}) {
  const { lang, t } = useI18n();

  const counts = ROADMAP_STAGES.reduce<Record<string, { total: number; done: number }>>(
    (acc, s) => {
      const items = TASKS.filter((tk) => tk.stage === s.id);
      acc[s.id] = {
        total: items.length,
        done: items.filter((i) => i.status === "done").length,
      };
      return acc;
    },
    {},
  );

  return (
    <aside className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="font-display text-lg font-bold text-primary">{t("oasis.roadmap.title")}</h3>
        {activeStage && (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="text-xs text-muted-foreground hover:text-primary"
          >
            {t("oasis.roadmap.clear")}
          </button>
        )}
      </div>
      <ol className="p-3">
        {ROADMAP_STAGES.map((s, idx) => {
          const isActive = activeStage === s.id;
          const c = counts[s.id];
          const pct = c.total > 0 ? Math.round((c.done / c.total) * 100) : 0;
          const Icon = pct === 100 ? CheckCircle2 : c.total > 0 ? CircleDot : Circle;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onSelect(isActive ? null : s.id)}
                className={`group flex w-full items-start gap-3 rounded-lg px-3 py-3 text-start transition ${
                  isActive ? "bg-primary/10" : "hover:bg-secondary/60"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground group-hover:bg-primary/20"
                  }`}
                >
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    <span className={`text-sm font-bold ${isActive ? "text-primary" : "text-foreground"}`}>
                      {pickStage(s, lang)}
                    </span>
                    <span className="ms-auto text-[10px] text-muted-foreground">
                      {c.done}/{c.total}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {pickStageDesc(s, lang)}
                  </p>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
