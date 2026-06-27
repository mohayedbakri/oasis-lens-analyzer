import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Factory, Zap, Truck, FlaskConical, Users, Leaf } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { NewsFloating } from "@/components/NewsFloating";
import { pillarsByLang, impactStatsByLang, goalsByLang, siteI18n } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

const pillarIcons = [Factory, Zap, Truck, FlaskConical, Users, Leaf];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RSIC — A community-led rural industrial renaissance in Sudan" },
      { name: "description", content: siteI18n.description.ar },
      { property: "og:title", content: siteI18n.name.ar },
      { property: "og:description", content: siteI18n.description.ar },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { lang, t } = useI18n();
  const pillars = pillarsByLang[lang];
  const impactStats = impactStatsByLang[lang];
  const goals = goalsByLang[lang];

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground grain">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-28">
          <div className="lg:col-span-7">
            <p className="section-number text-sm">{t("home.hero.eyebrow")}</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {siteI18n.tagline[lang]}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-loose text-primary-foreground/85">
              {t("home.hero.lede")}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-bold text-accent-foreground transition-transform hover:scale-[1.02]"
              >
                {siteI18n.donateCta[lang]}
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10"
              >
                {t("home.hero.cta2")}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {impactStats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur"
                >
                  <div className="font-display text-3xl font-bold text-gold sm:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm text-primary-foreground/75">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why now */}
      <section className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="section-number text-sm">{t("home.why.eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
            {t("home.why.title")}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { k: t("home.why.s1.k"), v: t("home.why.s1.v") },
              { k: t("home.why.s2.k"), v: t("home.why.s2.v") },
              { k: t("home.why.s3.k"), v: t("home.why.s3.v") },
            ].map((it) => (
              <div key={it.k} className="rounded-lg border border-border bg-card p-6">
                <div className="font-display text-3xl font-bold text-accent">{it.k}</div>
                <p className="mt-2 leading-loose text-foreground/80">{it.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Six Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="section-number text-sm">{t("home.pillars.eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
            {t("home.pillars.title")}
          </h2>
          <p className="mt-4 leading-loose text-muted-foreground">
            {t("home.pillars.lede")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = pillarIcons[i];
            return (
              <article
                key={p.n}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-md bg-secondary text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="section-number text-2xl opacity-30 group-hover:opacity-100">
                    {p.n}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-loose text-muted-foreground">{p.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Goals */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="section-number text-sm">{t("home.goals.eyebrow")}</p>
            <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
              {t("home.goals.title")}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((g, i) => (
              <article key={g.title} className="rounded-lg border border-border bg-background p-6">
                <span className="section-number text-sm">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold text-foreground">{g.title}</h3>
                <p className="mt-2 text-sm leading-loose text-muted-foreground">{g.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-12 text-center sm:px-6 md:flex-row md:text-start lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              {t("home.cta.title")}
            </h2>
            <p className="mt-2 text-muted-foreground">{t("home.cta.lede")}</p>
          </div>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-bold text-accent-foreground transition-transform hover:scale-[1.02]"
          >
            {siteI18n.donateCta[lang]}
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <NewsFloating />
    </PageShell>
  );
}
