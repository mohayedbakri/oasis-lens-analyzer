import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "الأثر المتوقع — RSIC" },
      {
        name: "description",
        content:
          "الأثر الاقتصادي والاجتماعي والعمراني والجغرافي لمبادرة المجمعات الصناعية الريفية المجتمعية على المحلية والولاية والسودان.",
      },
      { property: "og:title", content: "الأثر المتوقع — RSIC" },
      { property: "og:description", content: "أثر اقتصادي واجتماعي وعمراني قابل للقياس." },
      { property: "og:url", content: "/impact" },
    ],
    links: [{ rel: "canonical", href: "/impact" }],
  }),
  component: ImpactPage,
});

const blocks = [
  {
    eyebrow: "اقتصادياً",
    title: "تحول من اقتصاد خام إلى اقتصاد قيمة",
    items: [
      "خلق عشرات الآلاف من فرص العمل المباشرة في الريف.",
      "مضاعفة القيمة المضافة للمنتجات الريفية محلياً.",
      "تقليل الاستيراد وزيادة الصادرات من المنتجات المُصنّعة.",
      "تحفيز استثمارات وطنية جديدة في الصناعة التحويلية.",
    ],
  },
  {
    eyebrow: "اجتماعياً",
    title: "تنمية تُبقي الإنسان في أرضه",
    items: [
      "تثبيت السكان في مناطقهم عبر توفير فرص كريمة.",
      "تقوية الطبقة الوسطى الريفية.",
      "تمكين الشباب والنساء اقتصادياً.",
      "تعزيز التماسك المجتمعي ونقل المعرفة.",
    ],
  },
  {
    eyebrow: "عمرانياً وجغرافياً",
    title: "توازن جديد بين الريف والمدينة",
    items: [
      "تخفيف الضغط عن المدن المتضخمة.",
      "خلق مراكز نمو متوازنة جغرافياً على مستوى المحلية والولاية.",
      "شبكة لامركزية مترابطة على مستوى السودان والأمة.",
      "تحول هيكلي من اقتصاد ريعي إلى اقتصاد إنتاجي.",
    ],
  },
];

function ImpactPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="الأثر المتوقع"
        title="نتائج قابلة للقياس على ثلاثة مستويات"
        description="من اقتصاد خام إلى اقتصاد قيمة — أثر اقتصادي واجتماعي وعمراني يمتد من المحلية إلى الأمة."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {blocks.map((b, i) => (
            <article key={b.title} className="rounded-lg border border-border bg-card p-6">
              <span className="section-number text-sm">0{i + 1} — {b.eyebrow}</span>
              <h2 className="mt-3 text-xl font-bold text-primary">{b.title}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-loose text-foreground/80">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="section-number text-sm">رؤية وطنية بعيدة المدى</p>
          <h2 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">
            من تنمية مركزية إلى تنمية متوازنة، ومن استهلاك القيمة إلى صناعتها
          </h2>
        </div>
      </section>
    </PageShell>
  );
}
