import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/layout/PageShell";
import { pilotFactories } from "@/lib/site";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "النموذج والمصانع الرائدة — RSIC" },
      {
        name: "description",
        content:
          "النموذج الأولي للمجمع الصناعي الريفي المجتمعي في محلية البرقيق — مصانع التمور والأعلاف والسماد العضوي.",
      },
      { property: "og:title", content: "النموذج والمصانع الرائدة — RSIC" },
      {
        property: "og:description",
        content: "نموذج RSIC الأولي والمصانع الرائدة في الشمالية.",
      },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

const sizing = [
  { tier: "صغيرة (Small)", pct: "70%", size: "250 – 500 م²", role: "خلق وظائف سريعة وتغطية الاحتياجات المحلية." },
  { tier: "متوسطة (Medium)", pct: "20%", size: "500 – 1,500 م²", role: "وحدات تصنيع وتحويل متوسطة كمواد التعبئة." },
  { tier: "كبيرة (Large)", pct: "10%", size: "1,500 – 5,000 م²", role: "الإنتاج الضخم للصادر والأسواق الإقليمية والدولية." },
];

function ProjectsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="النموذج والمصانع"
        title="النموذج الأولي — محلية البرقيق، الشمالية"
        description="تبدأ المبادرة بـ 7 مصانع متكاملة في الشمالية، يتقدمها مصنع التمور الرائد، كنموذج محسوب وقابل للتوسع."
      />

      {/* Pilot factories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="section-number text-sm">المصانع الرائدة</p>
        <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
          أولوية استراتيجية مبنية على الموارد المحلية
        </h2>
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

      {/* Factory sizing */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="section-number text-sm">توزيع المصانع داخل المجمع</p>
          <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
            40–50 مصنعاً بثلاثة أحجام متكاملة
          </h2>
          <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full text-right">
              <thead className="bg-secondary text-primary">
                <tr>
                  <th className="px-4 py-3 text-sm font-bold">الفئة</th>
                  <th className="px-4 py-3 text-sm font-bold">النسبة</th>
                  <th className="px-4 py-3 text-sm font-bold">الحجم التقريبي</th>
                  <th className="px-4 py-3 text-sm font-bold">الوظيفة الاقتصادية</th>
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

      {/* National rollout */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="section-number text-sm">خطة الانتشار الوطني</p>
        <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
          من نموذج تجريبي إلى شبكة وطنية
        </h2>
        <ol className="mt-8 space-y-4">
          {[
            { n: "01", t: "المرحلة التجريبية", d: "إطلاق النموذج الأولي في محلية البرقيق وتدقيق المقترح الفني والمالي." },
            { n: "02", t: "التنوع الولائي", d: "توسيع المجمعات في باقي الولايات بناءً على دروس النموذج الأولي." },
            { n: "03", t: "الانتشار الوطني", d: "إنشاء 378 مجمعاً (2–3 مجمعات في كل من الـ189 محلية) بإجمالي ~17,010 مصنعاً." },
            { n: "04", t: "التوسع على مستوى الأمة", d: "نقل النموذج إلى دول الجنوب المماثلة في الموارد والتحديات." },
          ].map((s) => (
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
