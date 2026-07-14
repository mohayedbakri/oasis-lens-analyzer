import { ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { GLOBAL_INDICES, SESRIC_CONTEXT } from "@/lib/global-indices";

export function GlobalIndicesStrip() {
  const { lang, t } = useI18n();
  const isAr = lang === "ar";

  return (
    <section aria-labelledby="indices-heading" className="space-y-4">
      <div>
        <p className="section-number text-xs">{t("oasis.indices.eyebrow")}</p>
        <h2
          id="indices-heading"
          className="mt-1 font-display text-2xl font-bold text-primary"
        >
          {t("oasis.indices.title")}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("oasis.indices.subtitle")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {GLOBAL_INDICES.map((idx) => {
          const pct = Math.round((1 - (idx.rank - 1) / idx.total) * 100);
          return (
            <article
              key={idx.id}
              className="flex flex-col rounded-lg border border-border bg-card p-5 shadow-sm transition hover:border-primary"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {idx.code}
                  </p>
                  <h3 className="mt-1 font-display text-base font-bold text-foreground">
                    {isAr ? idx.nameAr : idx.nameEn}
                  </h3>
                </div>
                <span
                  className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  dir="ltr"
                >
                  {idx.year}
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2" dir="ltr">
                <span className="font-display text-3xl font-bold text-foreground">
                  {idx.rank}
                </span>
                <span className="text-sm text-muted-foreground">
                  / {idx.total}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t("oasis.indices.rank")}
                {idx.score ? (
                  <>
                    {" · "}
                    {t("oasis.indices.score")}:{" "}
                    <span dir="ltr">{idx.score}</span>
                  </>
                ) : null}
              </p>

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary/70"
                  style={{ width: `${pct}%` }}
                  aria-hidden
                />
              </div>

              <p className="mt-3 flex-1 text-sm text-muted-foreground">
                {isAr ? idx.blurbAr : idx.blurbEn}
              </p>

              <a
                href={idx.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                {t("oasis.indices.source")}: {idx.publisher}
                <ExternalLink className="h-3 w-3" />
              </a>
            </article>
          );
        })}
      </div>

      <p className="rounded-md border border-dashed border-border bg-muted/40 p-3 text-xs text-muted-foreground">
        {isAr ? SESRIC_CONTEXT.labelAr : SESRIC_CONTEXT.labelEn}
        <a
          href={SESRIC_CONTEXT.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {isAr ? "\u00a0SESRIC ↗" : "SESRIC ↗"}
        </a>
      </p>
    </section>
  );
}
