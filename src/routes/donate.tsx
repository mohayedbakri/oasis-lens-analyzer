import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { PageShell } from "@/components/layout/PageShell";
import { catalog, inBucket, type CatalogPiece, type PriceBucketId } from "@/lib/catalog";
import { pocQueryOptions } from "@/lib/poc-data";
import { useI18n } from "@/lib/i18n";
import { CatalogHero } from "@/components/donate/CatalogHero";
import { CatalogFilters } from "@/components/donate/CatalogFilters";
import { CatalogCard } from "@/components/donate/CatalogCard";
import { BackDrawer } from "@/components/donate/BackDrawer";
import { TierLadder } from "@/components/donate/TierLadder";

const searchSchema = z.object({
  q: fallback(z.string().optional(), undefined),
  category: fallback(
    z.enum(["equipment", "infrastructure", "training", "named"]).optional(),
    undefined,
  ),
  price: fallback(z.enum(["u100", "u1k", "u10k", "any"]).optional(), undefined),
});

// Static launch target — mirrors the Nafeer reference until wired to a data source.
const LAUNCH_DATE = new Date("2027-03-01T00:00:00Z");
const HERO_GOAL_USD = 7_000_000;
const HERO_BACKERS = 1861;

export const Route = createFileRoute("/donate")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Fund a factory, one piece at a time — RSIC" },
      {
        name: "description",
        content:
          "Back a specific machine, panel, or training seat. Every dollar is tied to a real piece of the Al-Burgig pilot complex.",
      },
      { property: "og:title", content: "Fund a factory, one piece at a time — RSIC" },
      {
        property: "og:description",
        content: "Nafeer-style crowdfund catalog for Sudan's first community-owned industrial complex.",
      },
      { property: "og:url", content: "/donate" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(pocQueryOptions),
  component: DonatePage,
});

function DonatePage() {
  const { t } = useI18n();
  const { data } = useSuspenseQuery(pocQueryOptions);
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const [selected, setSelected] = useState<CatalogPiece | null>(null);
  const [searchInput, setSearchInput] = useState<string>(search.q ?? "");

  // Debounce search into URL
  const setSearch = (v: string) => {
    setSearchInput(v);
    navigate({
      search: (prev) => ({ ...prev, q: v || undefined }),
      replace: true,
    });
  };

  const raised = data.funding.reduce((s, f) => s + f.received_usd, 0);
  const daysLeft = Math.max(
    0,
    Math.ceil((LAUNCH_DATE.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  );

  const q = (search.q ?? "").trim().toLowerCase();
  const category = (search.category ?? "all") as "all" | CatalogPiece["category"];
  const price = (search.price ?? "any") as PriceBucketId;

  const filtered = useMemo(() => {
    return catalog.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!inBucket(p.price_usd, price)) return false;
      if (q) {
        const hay = `${p.name.ar} ${p.name.en} ${p.code.ar} ${p.code.en} ${p.quote.ar} ${p.quote.en}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [q, category, price]);

  return (
    <PageShell>
      <CatalogHero
        stats={{
          raised,
          goal: HERO_GOAL_USD,
          backers: HERO_BACKERS,
          daysLeft,
        }}
      />

      <CatalogFilters
        q={searchInput}
        category={category}
        price={price}
        onSearch={setSearch}
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            {t("donate.empty")}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <CatalogCard key={p.id} piece={p} onBack={setSelected} />
            ))}
          </div>
        )}
      </section>

      <TierLadder />

      <BackDrawer piece={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </PageShell>
  );
}
