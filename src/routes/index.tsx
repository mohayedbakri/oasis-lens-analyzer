import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Factory, Zap, Truck, FlaskConical, Users, Leaf } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { NewsFloating } from "@/components/NewsFloating";
import { pillars, impactStats, goals, site } from "@/lib/site";

const pillarIcons = [Factory, Zap, Truck, FlaskConical, Users, Leaf];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RSIC — نهضة صناعية ريفية مجتمعية في السودان" },
      { name: "description", content: site.description },
      { property: "og:title", content: site.nameAr },
      { property: "og:description", content: site.description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground grain">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-28">
          <div className="lg:col-span-7">
            <p className="section-number text-sm">مبادرة وطنية سودانية</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {site.tagline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-loose text-primary-foreground/85">
              بدلاً من أن يهاجر الإنسان إلى الصناعة، ننقل الصناعة إلى حيث الإنسان والأرض —
              شبكة وطنية من 378 مجمعاً صناعياً ريفياً تُعيد بناء السودان من قاعدته المجتمعية.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-bold text-accent-foreground transition-transform hover:scale-[1.02]"
              >
                {site.donateCta}
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10"
              >
                النموذج والمصانع الرائدة
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
          <p className="section-number text-sm">لماذا الآن؟</p>
          <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
            لحظة تاريخية فارقة لإعادة بناء السودان
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { k: "220 مليون", v: "فدان من الأراضي الزراعية، منها 50 مليون قابلة للاستثمار فوراً" },
              { k: "+60%", v: "من السكان من الشباب — قوة بشرية متعلمة ومستعدة للعمل الصناعي" },
              { k: "<7%", v: "مساهمة الصناعة في الناتج المحلي، بعد أن كانت تتجاوز 20% في الثمانينات" },
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
          <p className="section-number text-sm">الأركان الستة</p>
          <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
            ستة أركان تبني مجمعاً صناعياً متكاملاً ومستقلاً
          </h2>
          <p className="mt-4 leading-loose text-muted-foreground">
            كل ركن يخدم المصانع الأساسية ويدعم استدامتها — لتكامل وظيفي واستقلالية تشغيلية حتى في ظل ضعف البنية التحتية.
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
            <p className="section-number text-sm">الأهداف العامة</p>
            <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
              ستة أهداف وطنية تقود التحول
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-12 text-center sm:px-6 md:flex-row md:text-right lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              هذا مشروع أمة... لا مشروع قطاع
            </h2>
            <p className="mt-2 text-muted-foreground">
              دعوة مفتوحة للمساهمين والمهندسين والجامعات والمجتمعات المحلية للمشاركة في النهضة.
            </p>
          </div>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-bold text-accent-foreground transition-transform hover:scale-[1.02]"
          >
            {site.donateCta}
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <NewsFloating />
    </PageShell>
  );
}
