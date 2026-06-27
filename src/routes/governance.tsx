import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/layout/PageShell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/governance")({
  head: () => ({
    meta: [
      { title: "Governance & Funding — RSIC" },
      { name: "description", content: "The community-ownership model, Community Enterprise structure, and blended-finance strategy of the RSIC initiative." },
      { property: "og:title", content: "Governance & Funding — RSIC" },
      { property: "og:description", content: "Community ownership, blended finance, and transparent governance." },
      { property: "og:url", content: "/governance" },
    ],
    links: [{ rel: "canonical", href: "/governance" }],
  }),
  component: GovernancePage,
});

function GovernancePage() {
  const { t } = useI18n();
  return (
    <PageShell>
      <PageHeader eyebrow={t("gov.eyebrow")} title={t("gov.title")} description={t("gov.desc")} />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="section-number text-sm">{t("gov.entity.eyebrow")}</p>
        <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">{t("gov.entity.title")}</h2>
        <p className="mt-4 leading-loose text-foreground/85">{t("gov.entity.body")}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[t("gov.member1"), t("gov.member2"), t("gov.member3")].map((s) => (
            <div key={s} className="rounded-lg border border-border bg-card p-5 text-center">
              <p className="font-semibold text-foreground">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article>
            <p className="section-number text-sm">{t("gov.council.eyebrow")}</p>
            <h2 className="mt-3 text-xl font-bold text-primary">{t("gov.council.title")}</h2>
            <p className="mt-3 leading-loose text-foreground/85">{t("gov.council.body")}</p>
          </article>
          <article>
            <p className="section-number text-sm">{t("gov.profits.eyebrow")}</p>
            <h2 className="mt-3 text-xl font-bold text-primary">{t("gov.profits.title")}</h2>
            <ol className="mt-3 space-y-2 leading-loose text-foreground/85">
              <li>{t("gov.profits.l1")}</li>
              <li>{t("gov.profits.l2")}</li>
              <li>{t("gov.profits.l3")}</li>
            </ol>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="section-number text-sm">{t("gov.finance.eyebrow")}</p>
        <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">{t("gov.finance.title")}</h2>
        <p className="mt-4 leading-loose text-foreground/85">{t("gov.finance.body")}</p>
      </section>
    </PageShell>
  );
}
