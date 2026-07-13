import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { PageShell, PageBanner } from "@/components/layout/PageShell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/poc")({
  component: PocLayout,
});

function PocLayout() {
  const { t } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isBurgig = pathname.startsWith("/poc/burgig");

  return (
    <PageShell>
      <PageBanner />
      <div className="border-b border-border bg-secondary/50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <p className="section-number mb-2 text-xs">{t("oasis.top.eyebrow")}</p>
            <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">
              {isBurgig ? t("poc.title") : t("oasis.top.title")}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              {isBurgig ? t("poc.desc.suffix") : t("oasis.top.desc")}
            </p>
          </div>
          <nav
            className="inline-flex rounded-full border border-border bg-card p-1 text-sm"
            aria-label={t("oasis.top.viewSwitch")}
          >
            <Link
              to="/poc"
              className={`rounded-full px-4 py-1.5 font-bold transition ${
                !isBurgig ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {t("oasis.top.national")}
            </Link>
            <Link
              to="/poc/burgig"
              className={`rounded-full px-4 py-1.5 font-bold transition ${
                isBurgig ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {t("oasis.top.burgig")}
            </Link>
          </nav>
        </div>
      </div>
      <Outlet />
    </PageShell>
  );
}
