import { useI18n } from "@/lib/i18n";

interface Tier {
  range: string;
  name: string;
  desc: string;
  reward: string;
}

export function TierLadder() {
  const { t } = useI18n();

  const tiers: Tier[] = [
    {
      range: "$10–$500",
      name: t("donate.tier.t1.name"),
      desc: t("donate.tier.t1.desc"),
      reward: t("donate.tier.t1.reward"),
    },
    {
      range: "$500–$5K",
      name: t("donate.tier.t2.name"),
      desc: t("donate.tier.t2.desc"),
      reward: t("donate.tier.t2.reward"),
    },
    {
      range: "$5K–$25K",
      name: t("donate.tier.t3.name"),
      desc: t("donate.tier.t3.desc"),
      reward: t("donate.tier.t3.reward"),
    },
    {
      range: "$25K–$100K",
      name: t("donate.tier.t4.name"),
      desc: t("donate.tier.t4.desc"),
      reward: t("donate.tier.t4.reward"),
    },
    {
      range: "$100K+",
      name: t("donate.tier.t5.name"),
      desc: t("donate.tier.t5.desc"),
      reward: t("donate.tier.t5.reward"),
    },
  ];

  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="section-number mb-3 text-sm">{t("donate.tier.eyebrow")}</p>
        <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">
          {t("donate.tier.title")}
        </h2>
        <p className="mt-3 text-muted-foreground">{t("donate.tier.lede")}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <p className="text-sm font-bold text-accent" dir="ltr">
                {t.range}
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-primary">{t.name}</h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{t.desc}</p>
              <p className="mt-4 rounded-md bg-secondary px-3 py-2 text-xs font-semibold text-foreground">
                {t.reward}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
