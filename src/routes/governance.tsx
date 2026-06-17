import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/layout/PageShell";

export const Route = createFileRoute("/governance")({
  head: () => ({
    meta: [
      { title: "الحوكمة والتمويل — RSIC" },
      {
        name: "description",
        content:
          "نموذج الملكية المجتمعية والشركة المجتمعية (Community Enterprise) واستراتيجية التمويل المختلط في مبادرة RSIC.",
      },
      { property: "og:title", content: "الحوكمة والتمويل — RSIC" },
      { property: "og:description", content: "ملكية مجتمعية وتمويل مختلط وحوكمة شفافة." },
      { property: "og:url", content: "/governance" },
    ],
    links: [{ rel: "canonical", href: "/governance" }],
  }),
  component: GovernancePage,
});

function GovernancePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="الحوكمة والتمويل"
        title="ملكية مجتمعية وشفافية مؤسسية"
        description="نموذج الملكية المجتمعية هو صمام الأمان الفلسفي للمبادرة — ينقل القوة المالية من يد الأفراد إلى كيان مجتمعي مؤسسي مستدام."
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="section-number text-sm">الكيان القانوني</p>
        <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
          الشركة المجتمعية (Community Enterprise)
        </h2>
        <p className="mt-4 leading-loose text-foreground/85">
          تدمج بين مبادئ الرأسمالية (الربحية والكفاءة) ومبادئ الاشتراكية (التركيز على مصلحة المجتمع
          والعدالة في التوزيع)، لتكون أفضل وسيلة قانونية لتمكين المجتمعات من امتلاك القوة المالية بطريقة
          مؤسسية مستدامة.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            "المزارعون والمنتجون المحليون",
            "الشباب والخريجون",
            "الجهات الشريكة والمستثمرون الاجتماعيون",
          ].map((s) => (
            <div key={s} className="rounded-lg border border-border bg-card p-5 text-center">
              <p className="font-semibold text-foreground">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article>
            <p className="section-number text-sm">آلية الحوكمة</p>
            <h2 className="mt-3 text-xl font-bold text-primary">مجلس مجتمعي متخصص</h2>
            <p className="mt-3 leading-loose text-foreground/85">
              تُدار كل مجمعات الولاية من قبل مجلس مجتمعي متخصص (Community Council) يمثل صمام الأمان
              لحماية المبادرة من الفساد والصراع على الموارد، مع شفافية مالية كاملة وتقارير دورية للعموم.
            </p>
          </article>
          <article>
            <p className="section-number text-sm">توزيع العائد</p>
            <h2 className="mt-3 text-xl font-bold text-primary">ثلاثة مسارات للأرباح</h2>
            <ol className="mt-3 space-y-2 leading-loose text-foreground/85">
              <li>1. تطوير الخدمات المجتمعية (تعليم وصحة في المحلية).</li>
              <li>2. نمو المجمع: توسعة المصانع أو بناء مجمعات جديدة.</li>
              <li>3. عائد عادل للأعضاء المساهمين في الكيان.</li>
            </ol>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="section-number text-sm">استراتيجية التمويل</p>
        <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
          التمويل المختلط (Blended Finance)
        </h2>
        <p className="mt-4 leading-loose text-foreground/85">
          مزيج من المساهمة المجتمعية (النفير)، والمنح، والتمويل الاجتماعي، والاستثمار المسؤول — مع إعادة
          استثمار الأرباح داخل المجتمع وفق مبدأ "الدورة المغلقة" لتمويل التوسعات الصناعية وتحديث المعدات
          (CapEx) ودعم الخدمات المجتمعية.
        </p>
      </section>
    </PageShell>
  );
}
