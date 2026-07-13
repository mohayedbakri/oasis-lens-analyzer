import { X } from "lucide-react";
import { SUDAN_STATES, STATE_DATA, ROADMAP_STAGES, pickState, pickStage } from "@/lib/oasis-data";
import { useI18n } from "@/lib/i18n";

const resourceLabels: Record<string, { ar: string; en: string }> = {
  agri: { ar: "زراعية", en: "Agricultural" },
  mineral: { ar: "معدنية", en: "Mineral" },
  livestock: { ar: "حيوانية", en: "Livestock" },
  energy: { ar: "طاقة", en: "Energy" },
  coastal: { ar: "ساحلية", en: "Coastal" },
};

export function StateDetailDrawer({
  stateId,
  onClose,
}: {
  stateId: string | null;
  onClose: () => void;
}) {
  const { lang, t } = useI18n();
  const state = stateId ? SUDAN_STATES.find((s) => s.id === stateId) : null;
  const data = stateId ? STATE_DATA[stateId] : null;
  const open = !!state;

  const stage = data ? ROADMAP_STAGES.find((s) => s.id === data.stage) : null;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-hidden={!open}
        className={`fixed inset-y-0 end-0 z-50 w-full max-w-md overflow-y-auto border-s border-border bg-card shadow-2xl transition-transform ${
          open ? "translate-x-0" : lang === "ar" ? "-translate-x-full" : "translate-x-full"
        }`}
      >
        {state && data && (
          <div className="p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">{t("oasis.drawer.state")}</p>
                <h2 className="font-display text-2xl font-bold text-primary">{pickState(state, lang)}</h2>
                {stage && (
                  <span className="mt-2 inline-block rounded-full bg-accent/15 px-3 py-0.5 text-xs font-bold text-accent">
                    {t("oasis.drawer.currentStage")}: {pickStage(stage, lang)}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t("oasis.drawer.close")}
                className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Kpi label={t("oasis.drawer.kpi.target")} value={String(data.targetComplexes)} />
              <Kpi label={t("oasis.drawer.kpi.active")} value={String(data.activeFactories)} />
              <Kpi label={t("oasis.drawer.kpi.sme")} value={String(data.smeIndex)} />
            </div>

            <Section title={t("oasis.drawer.resources")}>
              <div className="flex flex-wrap gap-1.5">
                {data.resources.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs text-primary"
                  >
                    {resourceLabels[r]?.[lang] ?? r}
                  </span>
                ))}
              </div>
            </Section>

            <Section title={t("oasis.drawer.activities")}>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {(lang === "ar" ? data.activitiesAr : data.activitiesEn).map((a, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title={t("oasis.drawer.opportunities")}>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {(lang === "ar" ? data.opportunitiesAr : data.opportunitiesEn).map((o, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        )}
      </aside>
    </>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3 text-center">
      <div className="font-display text-2xl font-bold text-primary" dir="ltr">
        {value}
      </div>
      <div className="mt-0.5 text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 border-t border-border pt-4">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}
