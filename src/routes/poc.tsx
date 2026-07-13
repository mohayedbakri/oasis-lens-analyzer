import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageShell, PageBanner } from "@/components/layout/PageShell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/poc")({
  component: PocLayout,
});

function PocLayout() {
  const { t } = useI18n();
  return (
    <PageShell>
      <PageBanner overlay />
      <div className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="section-number mb-2 text-xs">{t("oasis.top.eyebrow")}</p>
          <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">
            {t("oasis.top.title")}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {t("oasis.top.desc")}
          </p>
        </div>
      </div>
      <Outlet />
    </PageShell>
  );
}
