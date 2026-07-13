import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { useI18n } from "@/lib/i18n";
import { HeartHandshake, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "ادعم المبادرة — RSIC" },
      {
        name: "description",
        content: "نشكر اهتمامك بدعم التحول الصناعي، نعمل حالياً على بوابة الدفع.",
      },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/support" }],
  }),
  component: SupportComingSoon,
});

function SupportComingSoon() {
  const { lang, t } = useI18n();
  return (
    <PageShell>
      <section
        className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="rounded-full bg-primary/10 p-5">
          <HeartHandshake className="h-12 w-12 text-primary" />
        </div>
        <h1 className="mt-8 font-display text-4xl font-bold text-foreground sm:text-5xl">
          {t("donate.comingSoon.title")}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {t("donate.comingSoon.body")}
        </p>
        <Link
          to="/donate"
          className="mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          <ArrowLeft className="h-5 w-5" />
          {t("common.backToHome")}
        </Link>
      </section>
    </PageShell>
  );
}
