import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { CatalogCategory } from "@/lib/catalog";
import type { PriceBucketId } from "@/lib/catalog";

type CatOption = "all" | CatalogCategory;
type PriceOption = "any" | PriceBucketId;

export function CatalogFilters({
  q,
  category,
  price,
  onSearch,
}: {
  q: string;
  category: CatOption;
  price: PriceOption;
  onSearch: (v: string) => void;
}) {
  const { t } = useI18n();

  const cats: { id: CatOption; label: string }[] = [
    { id: "all", label: t("donate.filter.all") },
    { id: "equipment", label: t("donate.filter.equipment") },
    { id: "infrastructure", label: t("donate.filter.infrastructure") },
    { id: "training", label: t("donate.filter.training") },
    { id: "named", label: t("donate.filter.named") },
  ];

  const prices: { id: PriceOption; label: string }[] = [
    { id: "u100", label: t("donate.price.u100") },
    { id: "u1k", label: t("donate.price.u1k") },
    { id: "u10k", label: t("donate.price.u10k") },
    { id: "any", label: t("donate.price.any") },
  ];

  return (
    <div className="sticky top-16 z-20 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("donate.filter.show")}
          </span>
          {cats.map((c) => {
            const active = category === c.id || (c.id === "all" && category === "all");
            return (
              <Link
                key={c.id}
                from="/donate" to="/donate"
                search={(prev) => ({
                  ...prev,
                  category: c.id === "all" ? undefined : c.id,
                })}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground hover:border-primary"
                }`}
              >
                {c.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("donate.filter.under")}
          </span>
          {prices.map((p) => {
            const active = (price ?? "any") === p.id;
            return (
              <Link
                key={p.id}
                from="/donate" to="/donate"
                search={(prev) => ({
                  ...prev,
                  price: p.id === "any" ? undefined : p.id,
                })}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent text-accent-foreground"
                    : "border border-border bg-card text-foreground hover:border-accent"
                }`}
              >
                {p.label}
              </Link>
            );
          })}

          <div className="ms-auto flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={q}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={t("donate.filter.search")}
              className="w-40 bg-transparent text-sm focus:outline-none sm:w-56"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
