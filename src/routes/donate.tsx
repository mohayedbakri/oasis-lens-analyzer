import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import { PageShell, PageHeader } from "@/components/layout/PageShell";
import { CatalogHero } from "@/components/donate/CatalogHero";
import { CatalogFilters } from "@/components/donate/CatalogFilters";
import { CatalogCard } from "@/components/donate/CatalogCard";
import { TierLadder } from "@/components/donate/TierLadder";
import { catalog, type CatalogPiece } from "@/lib/catalog";
import { pocQueryOptions } from "@/lib/poc-data";
import { useI18n } from "@/lib/i18n";

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.enum(["equipment", "infrastructure", "training", "named"]).optional(),
  price: z.enum(["u100", "u1k", "u10k"]).optional(),
});

export const Route = createFileRoute("/donate")({
  validateSearch: searchSchema,
  loader: ({ context }) => context.queryClient.ensureQueryData(pocQueryOptions),
  head: () => ({
    meta: [
      { title: "ادعم المبادرة — RSIC" },
      {
        name: "description",
        content: "موّل مصنعاً قطعةً بقطعة — كل دولار مرتبط بآلة أو خط إنتاج داخل مجمع البرقيق.",
      },
      { property: "og:title", content: "ادعم المبادرة — RSIC" },
      { property: "og:url", content: "/donate" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: DonatePage,
});

function priceMatches(price: number, bucket?: string) {
  if (!bucket) return true;
  if (bucket === "u100") return price < 100;
  if (bucket === "u1k") return price < 1000;
  if (bucket === "u10k") return price < 10000;
  return true;
}

function DonatePage() {
  const { lang, t } = useI18n();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/donate" });
  const { data: poc } = useSuspenseQuery(pocQueryOptions);

  const raised = poc.funding.reduce((s, f) => s + f.received_usd, 0);
  const goal = poc.funding.reduce((s, f) => s + f.allocated_usd, 0);
  const launch = new Date("2027-03-01").getTime();
  const daysLeft = Math.max(0, Math.ceil((launch - Date.now()) / (1000 * 60 * 60 * 24)));

  const q = (search.q ?? "").toLowerCase().trim();
  const filtered = catalog.filter((p) => {
    if (search.category && p.category !== search.category) return false;
    if (!priceMatches(p.price_usd, search.price)) return false;
    if (q) {
      const hay = `${p.name.ar} ${p.name.en} ${p.code.ar} ${p.code.en}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const goToSupport = (_p: CatalogPiece) => {
    navigate({ to: "/support" });
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow={t("donate.hero.eyebrow")}
        title={t("donate.hero.title")}
        lede={t("donate.hero.lede")}
      />
      <CatalogHero stats={{ raised, goal, backers: 0, daysLeft }} />
      <CatalogFilters
        q={search.q ?? ""}
        category={search.category ?? "all"}
        price={search.price ?? "any"}
        onSearch={(v) =>
          navigate({ search: (prev) => ({ ...prev, q: v || undefined }) })
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground" dir={lang === "ar" ? "rtl" : "ltr"}>
            {t("donate.empty")}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <CatalogCard key={p.id} piece={p} onBack={goToSupport} />
            ))}
          </div>
        )}
      </section>

      <TierLadder />
    </PageShell>
  );
}
