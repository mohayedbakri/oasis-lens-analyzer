import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import {
  SUDAN_STATES,
  TASKS,
  pickState,
  taskTitle,
  taskOwner,
  taskKpi,
  type StageId,
  type TaskStatus,
  type Task,
} from "@/lib/oasis-data";
import { useI18n } from "@/lib/i18n";

const STATUSES: TaskStatus[] = ["planned", "running", "done", "blocked"];

const statusStyles: Record<TaskStatus, string> = {
  planned: "bg-secondary text-muted-foreground",
  running: "bg-primary/15 text-primary",
  done: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  blocked: "bg-destructive/15 text-destructive",
};

export function TasksPanel({
  activeStage,
  activeStateId,
  onSelectState,
}: {
  activeStage: StageId | null;
  activeStateId: string | null;
  onSelectState: (id: string | null) => void;
}) {
  const { lang, t } = useI18n();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<TaskStatus | "all">("all");

  const stateName = (id: string) => {
    const s = SUDAN_STATES.find((x) => x.id === id);
    return s ? pickState(s, lang) : id;
  };
  const statusLabel = (s: TaskStatus) => t("oasis.tasks.status." + s);

  const filtered: Task[] = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return TASKS.filter((tk) => {
      if (activeStage && tk.stage !== activeStage) return false;
      if (activeStateId && tk.stateId !== activeStateId) return false;
      if (status !== "all" && tk.status !== status) return false;
      if (needle) {
        const hay = `${tk.ar} ${tk.en} ${stateName(tk.stateId)} ${tk.status}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, status, activeStage, activeStateId, lang]);

  const hasActive = q || status !== "all" || activeStage || activeStateId;

  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3">
        <div>
          <h3 className="font-display text-lg font-bold text-primary">{t("oasis.tasks.title")}</h3>
          <p className="text-xs text-muted-foreground">{t("oasis.tasks.hint")}</p>
        </div>
        <div className="ms-auto flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("oasis.tasks.search")}
              className="w-56 rounded-md border border-input bg-background px-3 py-1.5 pe-9 text-sm outline-none focus:border-primary"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus | "all")}
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm outline-none focus:border-primary"
          >
            <option value="all">{t("oasis.tasks.allStatuses")}</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {statusLabel(s)}
              </option>
            ))}
          </select>
          {hasActive && (
            <button
              type="button"
              onClick={() => {
                setQ("");
                setStatus("all");
                onSelectState(null);
              }}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-primary hover:text-primary"
            >
              <X className="h-3.5 w-3.5" />
              {t("oasis.tasks.clear")}
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="p-6 text-center text-sm text-muted-foreground">{t("oasis.tasks.empty")}</p>
      ) : (
        <ul className="divide-y divide-border">
          {filtered.map((tk) => (
            <li key={tk.id} className="p-4 hover:bg-secondary/40">
              <div className="flex flex-wrap items-start gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-foreground">{taskTitle(tk, lang)}</h4>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${statusStyles[tk.status]}`}>
                      {statusLabel(tk.status)}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onSelectState(activeStateId === tk.stateId ? null : tk.stateId)
                      }
                      className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground hover:border-primary hover:text-primary"
                    >
                      {stateName(tk.stateId)}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {taskOwner(tk, lang)} · <span dir="ltr">{tk.start} → {tk.target}</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    <b className="text-foreground">KPI:</b> {taskKpi(tk, lang)}
                  </p>
                </div>
                <div className="w-40 shrink-0">
                  <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{t("oasis.tasks.progress")}</span>
                    <span dir="ltr">{tk.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-primary" style={{ width: `${tk.progress}%` }} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
