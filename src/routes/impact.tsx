import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/layout/PageShell";
import { useI18n, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Expected Impact — RSIC" },
      { name: "description", content: "Economic, social, and spatial impact of the RSIC initiative at the locality, state, and national level." },
      { property: "og:title", content: "Expected Impact — RSIC" },
      { property: "og:description", content: "Measurable economic, social, and spatial outcomes." },
      { property: "og:url", content: "/impact" },
    ],
    links: [{ rel: "canonical", href: "/impact" }],
  }),
  component: ImpactPage,
});

const blocksByLang: Record<Lang, { eyebrow: string; title: string; items: string[] }[]> = {
  ar: [
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
  ],
  en: [
    {
      eyebrow: "Economic",
      title: "From a raw-materials economy to a value economy",
      items: [
        "Tens of thousands of direct rural jobs created.",
        "Local value added to rural products is multiplied.",
        "Imports reduced and exports of manufactured goods increased.",
        "New domestic investment unlocked in transformative industry.",
      ],
    },
    {
      eyebrow: "Social",
      title: "Development that keeps people on their land",
      items: [
        "Anchors residents in their regions with dignified opportunity.",
        "Strengthens the rural middle class.",
        "Economically empowers youth and women.",
        "Reinforces community cohesion and knowledge transfer.",
      ],
    },
    {
      eyebrow: "Spatial & Geographic",
      title: "A new balance between countryside and city",
      items: [
        "Relieves pressure on overcrowded cities.",
        "Creates geographically balanced growth hubs at the locality and state level.",
        "A decentralized, connected network across Sudan and the wider nation.",
        "Structural shift from a rentier economy to a productive one.",
      ],
    },
  ],
};

function ImpactPage() {
  const { lang, t } = useI18n();
  const blocks = blocksByLang[lang];

  return (
    <PageShell>
      <PageHeader eyebrow={t("impact.eyebrow")} title={t("impact.title")} description={t("impact.desc")} />
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
          <p className="section-number text-sm">{t("impact.long.eyebrow")}</p>
          <h2 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">{t("impact.long.title")}</h2>
        </div>
      </section>
    </PageShell>
  );
}
