import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن المبادرة — RSIC" },
      {
        name: "description",
        content:
          "مبادرة المجمعات الصناعية الريفية المجتمعية (RSIC): الرؤية والرسالة والإطار الفكري لنهضة صناعية يقودها المجتمع في السودان.",
      },
      { property: "og:title", content: "عن المبادرة — RSIC" },
      {
        property: "og:description",
        content: "الرؤية والرسالة والإطار الفكري لمبادرة RSIC.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="عن المبادرة"
        title="نهضة صناعية شاملة يقودها المجتمع"
        description="مبادرة وطنية رائدة لإحداث تحول صناعي شامل عبر إنشاء مجمعات صناعية متكاملة في الولايات والمحليات، تُحوّل الموارد المحلية إلى منتجات ذات قيمة مضافة عالية."
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="section-number text-sm">المرتكزات</p>
        <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
          رؤية جديدة لبناء الاقتصاد السوداني
        </h2>
        <ul className="mt-6 space-y-4 text-foreground/85">
          <li className="rounded-lg border border-border bg-card p-5 leading-loose">
            <strong className="text-primary">الاعتماد على الذات</strong> بدلاً من التبعية للاستيراد والمساعدات.
          </li>
          <li className="rounded-lg border border-border bg-card p-5 leading-loose">
            <strong className="text-primary">الملكية المجتمعية</strong> بدلاً من الاحتكار الفردي أو النخبوي.
          </li>
          <li className="rounded-lg border border-border bg-card p-5 leading-loose">
            <strong className="text-primary">تكامل العلم والتقنية مع الإنتاج المحلي والإرث المعرفي</strong> بدلاً من الفصل بينهما.
          </li>
        </ul>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article>
            <p className="section-number text-sm">الرؤية</p>
            <h2 className="mt-3 text-2xl font-bold text-primary">سودانٌ مزدهر</h2>
            <p className="mt-4 leading-loose text-foreground/85">
              "سودانٌ مزدهر، قائمٌ على اقتصادٍ صناعي متين تراحمي ومسؤول ومستدام، تقوده المجتمعات المحلية بالمعرفة
              والتكافل والإبداع، ويرتكز على الأخلاق الفضيلة وحب الخير."
            </p>
          </article>
          <article>
            <p className="section-number text-sm">الرسالة</p>
            <h2 className="mt-3 text-2xl font-bold text-primary">تمكين المجتمعات</h2>
            <p className="mt-4 leading-loose text-foreground/85">
              "تمكين المجتمعات السودانية من بناء وتشغيل مجمعات صناعية ريفية مجتمعية (RSICs) تستخدم وتطور مواردها
              المحلية بكفاءة وتميز تنافسي عالمي، وتحقق الأمن الغذائي والاكتفاء الذاتي، وتخلق فرص عمل حقيقية
              ونوعية، وتعيد الثقة بين المواطن والدولة من خلال نموذج اقتصادي عادل وشفاف ومستدام."
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="section-number text-sm">الفكرة الجوهرية</p>
        <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
          إعادة تموضع الصناعة داخل الريف
        </h2>
        <p className="mt-6 text-xl leading-loose text-foreground/90">
          بدلاً من أن يهاجر الإنسان إلى الصناعة،
          <br />
          <span className="font-bold text-accent">ننقل الصناعة إلى حيث الإنسان والأرض.</span>
        </p>
        <p className="mt-6 leading-loose text-foreground/80">
          كل مجمع صناعي ريفي هو منظومة إنتاج متكاملة تتكون من 40–50 مصنعاً متخصصاً، وخدمات مركزية مشتركة
          (طاقة – مياه – مختبرات – لوجستيات – تدريب – صيانة)، وإدارة تشغيل احترافية موحدة، وشراكة مجتمعية تعزز
          الملكية المحلية والمساءلة.
        </p>
      </section>
    </PageShell>
  );
}
