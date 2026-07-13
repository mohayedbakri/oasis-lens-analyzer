import { X } from "lucide-react";
import { SUDAN_STATES, STATE_DATA, ROADMAP_STAGES, pickState, pickStage, getStateIndicators } from "@/lib/oasis-data";
import { useI18n } from "@/lib/i18n";

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
  const ind = stateId ? getStateIndicators(stateId) : null;

  const rows = ind
    ? [
        {
          title: t("oasis.drawer.indicators.selfSuff.title"),
          mapping: t("oasis.drawer.indicators.selfSuff.mapping"),
          points: [
            { label: t("oasis.drawer.indicators.selfSuff.dietary"), value: lang === "ar" ? ind.selfSuff.dietaryAr : ind.selfSuff.dietaryEn },
            { label: t("oasis.drawer.indicators.selfSuff.clothing"), value: lang === "ar" ? ind.selfSuff.clothingAr : ind.selfSuff.clothingEn },
            { label: t("oasis.drawer.indicators.selfSuff.construction"), value: lang === "ar" ? ind.selfSuff.constructionAr : ind.selfSuff.constructionEn },
          ],
        },
        {
          title: t("oasis.drawer.indicators.global.title"),
          mapping: t("oasis.drawer.indicators.global.mapping"),
          points: [
            { label: t("oasis.drawer.indicators.global.raw"), value: lang === "ar" ? ind.global.rawAr : ind.global.rawEn },
            { label: t("oasis.drawer.indicators.global.starter"), value: lang === "ar" ? ind.global.starterAr : ind.global.starterEn },
          ],
        },
      ]
    : [];

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
        className={`fixed inset-y-0 end-0 z-50 w-full max-w-xl overflow-y-auto border-s border-border bg-card shadow-2xl transition-transform ${
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

            <div className="mt-6">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t("oasis.drawer.indicators.title")}
              </h3>

              {/* Desktop table */}
              <div className="hidden overflow-hidden rounded-lg border border-border md:block">
                <div className="grid grid-cols-[1.1fr_1.3fr_1.6fr] gap-px bg-border">
                  <HeadCell>{t("oasis.drawer.indicators.col.indicator")}</HeadCell>
                  <HeadCell>{t("oasis.drawer.indicators.col.mapping")}</HeadCell>
                  <HeadCell>{t("oasis.drawer.indicators.col.points")}</HeadCell>
                  {rows.map((r, i) => (
                    <RowCells key={i} row={r} index={i} />
                  ))}
                </div>
              </div>

              {/* Mobile stacked */}
              <div className="space-y-3 md:hidden">
                {rows.map((r, i) => (
                  <div key={i} className="rounded-lg border border-border bg-background p-4">
                    <div className="mb-2 flex items-baseline gap-2">
                      <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">{i + 1}</span>
                      <h4 className="font-display font-bold text-foreground">{r.title}</h4>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">{r.mapping} <PdfBadge /></p>
                    <ul className="space-y-2">
                      {r.points.map((p, j) => (
                        <li key={j} className="text-sm">
                          <div className="text-xs font-semibold text-muted-foreground">{p.label}</div>
                          <div className="flex items-start gap-2 text-foreground">
                            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                            <span>{p.value} <PdfBadge /></span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

function HeadCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
      {children}
    </div>
  );
}

function RowCells({ row, index }: { row: { title: string; mapping: string; points: { label: string; value: string }[] }; index: number }) {
  return (
    <>
      <div className="bg-background p-3 align-top">
        <div className="flex items-baseline gap-2">
          <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">{index + 1}</span>
          <span className="text-sm font-bold text-foreground">{row.title}</span>
        </div>
      </div>
      <div className="bg-background p-3 align-top text-sm text-muted-foreground">
        <span>{row.mapping} </span>
        <PdfBadge />
      </div>
      <div className="bg-background p-3 align-top">
        <ul className="space-y-2 text-sm">
          {row.points.map((p, j) => (
            <li key={j} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span>
                <span className="text-foreground">{p.value}</span>
                <span className="text-muted-foreground/70"> — {p.label}</span> <PdfBadge />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function PdfBadge() {
  return (
    <span
      aria-hidden="true"
      className="ms-1 inline-block rounded bg-muted px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground align-middle"
    >
      PDF
    </span>
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
