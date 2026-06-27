import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/layout/PageShell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — RSIC" },
      { name: "description", content: "About the RSIC initiative: vision, mission, and intellectual framework for a community-led industrial renaissance in Sudan." },
      { property: "og:title", content: "About — RSIC" },
      { property: "og:description", content: "Vision, mission, and framework of the RSIC initiative." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <PageShell>
      <PageHeader eyebrow={t("about.eyebrow")} title={t("about.title")} description={t("about.desc")} />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="section-number text-sm">{t("about.pillars.eyebrow")}</p>
        <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">{t("about.pillars.title")}</h2>
        <ul className="mt-6 space-y-4 text-foreground/85">
          <li className="rounded-lg border border-border bg-card p-5 leading-loose">
            <strong className="text-primary">{t("about.found1.k")}</strong>
            {t("about.found1.v")}
          </li>
          <li className="rounded-lg border border-border bg-card p-5 leading-loose">
            <strong className="text-primary">{t("about.found2.k")}</strong>
            {t("about.found2.v")}
          </li>
          <li className="rounded-lg border border-border bg-card p-5 leading-loose">
            <strong className="text-primary">{t("about.found3.k")}</strong>
            {t("about.found3.v")}
          </li>
        </ul>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article>
            <p className="section-number text-sm">{t("about.vision.eyebrow")}</p>
            <h2 className="mt-3 text-2xl font-bold text-primary">{t("about.vision.title")}</h2>
            <p className="mt-4 leading-loose text-foreground/85">{t("about.vision.body")}</p>
          </article>
          <article>
            <p className="section-number text-sm">{t("about.mission.eyebrow")}</p>
            <h2 className="mt-3 text-2xl font-bold text-primary">{t("about.mission.title")}</h2>
            <p className="mt-4 leading-loose text-foreground/85">{t("about.mission.body")}</p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="section-number text-sm">{t("about.core.eyebrow")}</p>
        <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">{t("about.core.title")}</h2>
        <p className="mt-6 text-xl leading-loose text-foreground/90">
          {t("about.core.l1")}
          <br />
          <span className="font-bold text-accent">{t("about.core.l2")}</span>
        </p>
        <p className="mt-6 leading-loose text-foreground/80">{t("about.core.body")}</p>
      </section>
    </PageShell>
  );
}
