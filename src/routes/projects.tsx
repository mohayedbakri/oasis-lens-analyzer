import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/layout/PageShell";
import { pilotFactoriesByLang } from "@/lib/site";
import { useI18n, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Model & Flagship Factories — RSIC" },
      { name: "description", content: "The RSIC pilot model in Al-Bergig — flagship dates, animal feed, and organic fertilizer factories." },
      { property: "og:title", content: "Model & Flagship Factories — RSIC" },
      { property: "og:description", content: "The RSIC pilot model and flagship factories in the Northern State." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "RSIC Flagship Factories",
          description: "Flagship factories of the pilot complex in Al-Bergig, Northern State.",
          itemListElement: pilotFactoriesByLang.ar.map((p) => ({
            "@type": "ListItem",
            position: p.rank,
            item: {
              "@type": "Project",
              name: p.name,
              alternateName: p.nameEn,
              description: p.note,
              location: { "@type": "Place", name: "Al-Bergig Locality, Northern State, Sudan" },
            },
          })),
        }),
      },
    ],
  }),
  component: ProjectsPage,
});

const sizingByLang: Record<Lang, { tier: string; pct: string; size: string; role: string }[]> = {
  ar: [
    { tier: "صغيرة (Small)", pct: "70%", size: "250 – 500 م²", role: "خلق وظائف سريعة وتغطية الاحتياجات المحلية." },
    { tier: "متوسطة (Medium)", pct: "20%", size: "500 – 1,500 م²", role: "وحدات تصنيع وتحويل متوسطة كمواد التعبئة." },
    { tier: "كبيرة (Large)", pct: "10%", size: "1,500 – 5,000 م²", role: "الإنتاج الضخم للصادر والأسواق الإقليمية والدولية." },
  ],
  en: [
    { tier: "Small", pct: "70%", size: "250 – 500 m²", role: "Fast job creation and meeting local needs." },
    { tier: "Medium", pct: "20%", size: "500 – 1,500 m²", role: "Mid-scale manufacturing and processing such as packaging." },
    { tier: "Large", pct: "10%", size: "1,500 – 5,000 m²", role: "Large-scale production for export and regional markets." },
  ],
};

const rolloutByLang: Record<Lang, { n: string; t: string; d: string }[]> = {
  ar: [
    { n: "01", t: "المرحلة التجريبية", d: "إطلاق النموذج الأولي في محلية البرقيق وتدقيق المقترح الفني والمالي." },
    { n: "02", t: "التنوع الولائي", d: "توسيع المجمعات في باقي الولايات بناءً على دروس النموذج الأولي." },
    { n: "03", t: "الانتشار الوطني", d: "إنشاء 378 مجمعاً (2–3 مجمعات في كل من الـ189 محلية) بإجمالي ~17,010 مصنعاً." },
    { n: "04", t: "التوسع على مستوى الأمة", d: "نقل النموذج إلى دول الجنوب المماثلة في الموارد والتحديات." },
  ],
  en: [
    { n: "01", t: "Pilot phase", d: "Launch the pilot complex in Al-Bergig and validate the technical and financial proposal." },
    { n: "02", t: "State-level diversification", d: "Roll out complexes across other states based on lessons from the pilot." },
    { n: "03", t: "National rollout", d: "Establish 378 complexes (2–3 per locality across the 189 localities), ~17,010 factories total." },
    { n: "04", t: "Nation-scale expansion", d: "Transfer the model to Global South countries with similar resources and challenges." },
  ],
};

function ProjectsPage() {
  const { lang, t } = useI18n();
  const pilotFactories = pilotFactoriesByLang[lang];
  const sizing = sizingByLang[lang];
  const rollout = rolloutByLang[lang];

  return (
    <PageShell>
      <PageHeader eyebrow={t("projects.eyebrow")} title={t("projects.title")} description={t("projects.desc")} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="section-number text-sm">{t("projects.pilot.eyebrow")}</p>
        <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">{t("projects.pilot.title")}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pilotFactories.map((p) => (
            <article key={p.rank} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent font-bold text-accent-foreground">
                  {p.rank}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {p.nameEn}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">{p.name}</h3>
              <p className="mt-2 text-sm leading-loose text-muted-foreground">{p.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="section-number text-sm">{t("projects.sizing.eyebrow")}</p>
          <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">{t("projects.sizing.title")}</h2>
          <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full text-start">
              <thead className="bg-secondary text-primary">
                <tr>
                  <th className="px-4 py-3 text-sm font-bold">{t("projects.sizing.col1")}</th>
                  <th className="px-4 py-3 text-sm font-bold">{t("projects.sizing.col2")}</th>
                  <th className="px-4 py-3 text-sm font-bold">{t("projects.sizing.col3")}</th>
                  <th className="px-4 py-3 text-sm font-bold">{t("projects.sizing.col4")}</th>
                </tr>
              </thead>
              <tbody>
                {sizing.map((r) => (
                  <tr key={r.tier} className="border-t border-border">
                    <td className="px-4 py-4 font-semibold text-foreground">{r.tier}</td>
                    <td className="px-4 py-4 font-display text-lg font-bold text-accent">{r.pct}</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{r.size}</td>
                    <td className="px-4 py-4 text-sm leading-loose text-foreground/80">{r.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="section-number text-sm">{t("projects.rollout.eyebrow")}</p>
        <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">{t("projects.rollout.title")}</h2>
        <ol className="mt-8 space-y-4">
          {rollout.map((s) => (
            <li key={s.n} className="flex gap-5 rounded-lg border border-border bg-card p-5">
              <span className="section-number shrink-0 text-2xl">{s.n}</span>
              <div>
                <h3 className="text-lg font-bold text-foreground">{s.t}</h3>
                <p className="mt-1 leading-loose text-muted-foreground">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
