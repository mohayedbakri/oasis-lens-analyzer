import { useState } from "react";
import { SUDAN_STATES, STATE_DATA, pickState, type SudanState } from "@/lib/oasis-data";
import { useI18n } from "@/lib/i18n";

type Props = {
  selectedStateId?: string | null;
  filterStage?: string | null;
  onSelect: (id: string) => void;
};

export function SudanMap({ selectedStateId, filterStage, onSelect }: Props) {
  const { lang, t } = useI18n();
  const [hover, setHover] = useState<{ s: SudanState; x: number; y: number } | null>(null);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <h3 className="font-display text-lg font-bold text-primary">{t("oasis.map.title")}</h3>
          <p className="text-xs text-muted-foreground">{t("oasis.map.hint")}</p>
        </div>
        <MaturityLegend />
      </div>

      <div className="relative aspect-[4/3] w-full bg-secondary/30">
        <svg
          viewBox="0 0 1000 1000"
          className="h-full w-full"
          role="img"
          aria-label={t("oasis.map.title")}
        >
          <g>
            {SUDAN_STATES.map((s) => {
              const d = STATE_DATA[s.id];
              const isSelected = selectedStateId === s.id;
              const isDimmed = filterStage ? d?.stage !== filterStage : false;
              const maturity = d?.maturity ?? 0;
              // teal fill (--primary token) mixed with card bg by maturity
              const fill = `color-mix(in oklab, hsl(var(--primary-hsl, 178 89% 25%)) ${Math.round(
                20 + maturity * 60,
              )}%, hsl(var(--card-hsl, 40 8% 96%)) )`;
              return (
                <path
                  key={s.id}
                  d={s.d}
                  onClick={() => onSelect(s.id)}
                  onMouseEnter={(e) => {
                    const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                    setHover({
                      s,
                      x: ((s.cx / 1000) * rect.width),
                      y: ((s.cy / 1000) * rect.height),
                    });
                  }}
                  onMouseLeave={() => setHover(null)}
                  tabIndex={0}
                  aria-label={pickState(s, lang)}
                  className="cursor-pointer outline-none transition-opacity"
                  style={{
                    fill: isDimmed ? "hsl(var(--muted-hsl, 40 8% 90%))" : fill,
                    stroke: isSelected
                      ? "hsl(var(--accent-hsl, 38 55% 52%))"
                      : "hsl(var(--border-hsl, 40 6% 82%))",
                    strokeWidth: isSelected ? 2.5 : 0.8,
                    opacity: isDimmed ? 0.35 : 1,
                  }}
                />
              );
            })}
            {SUDAN_STATES.map((s) => (
              <text
                key={s.id + "-lbl"}
                x={s.cx}
                y={s.cy}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none fill-foreground/70"
                style={{ fontSize: 14, fontWeight: 600 }}
              >
                {pickState(s, lang)}
              </text>
            ))}
          </g>
        </svg>

        {hover && (
          <div
            className="pointer-events-none absolute z-10 min-w-[180px] -translate-x-1/2 -translate-y-full rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-lg"
            style={{ left: hover.x, top: hover.y - 8 }}
          >
            <div className="font-bold text-foreground">{pickState(hover.s, lang)}</div>
            {STATE_DATA[hover.s.id] && (
              <div className="mt-1 space-y-0.5 text-muted-foreground">
                <div>
                  {t("oasis.map.tt.complexes")}: <b>{STATE_DATA[hover.s.id].targetComplexes}</b>
                </div>
                <div>
                  {t("oasis.map.tt.factories")}: <b>{STATE_DATA[hover.s.id].activeFactories}</b>
                </div>
                <div>
                  {t("oasis.map.tt.sme")}: <b>{STATE_DATA[hover.s.id].smeIndex}</b>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MaturityLegend() {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
      <span>{t("oasis.map.legend.low")}</span>
      <div
        className="h-2 w-24 rounded-full"
        style={{
          background:
            "linear-gradient(to right, hsl(var(--muted-hsl, 40 8% 90%)), hsl(var(--primary-hsl, 178 89% 25%)))",
        }}
      />
      <span>{t("oasis.map.legend.high")}</span>
    </div>
  );
}
