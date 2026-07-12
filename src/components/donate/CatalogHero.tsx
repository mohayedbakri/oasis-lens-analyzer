import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/lib/i18n";

export interface HeroStats {
  raised: number;
  goal: number;
  backers: number;
  daysLeft: number;
}

export function CatalogHero({ stats }: { stats: HeroStats }) {
  const { t } = useI18n();
  const pct = stats.goal > 0 ? Math.round((stats.raised / stats.goal) * 100) : 0;

  return (
    <section className="border-b border-border bg-gradient-to-b from-secondary/60 to-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p className="section-number mb-3 text-sm">{t("donate.hero.eyebrow")}</p>
        <h1 className="text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
          {t("donate.hero.title")}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          {t("donate.hero.lede")}
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-primary sm:text-4xl" dir="ltr">
                ${stats.raised.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
                {t("donate.hero.raisedOf")} ${stats.goal.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary sm:text-4xl" dir="ltr">
                {stats.backers.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("donate.hero.backers")}
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary sm:text-4xl" dir="ltr">
                {stats.daysLeft}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("donate.hero.daysLeft")}
              </p>
            </div>
          </div>
          <Progress value={pct} className="mt-6 h-3" />
          <p className="mt-2 text-xs text-muted-foreground" dir="ltr">
            {pct}%
          </p>
        </div>
      </div>
    </section>
  );
}
