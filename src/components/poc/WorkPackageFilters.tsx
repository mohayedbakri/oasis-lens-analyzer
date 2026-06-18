import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { categoryLabelAr, statusLabelAr } from "./status";
import type { WpCategory, WpStatus } from "@/lib/poc-data";

const categories: WpCategory[] = [
  "agreement",
  "due_diligence",
  "mou",
  "procurement",
  "civil",
  "training",
];
const statuses: WpStatus[] = ["planned", "in_progress", "done", "blocked"];

export function WorkPackageFilters({
  q,
  category,
  status,
}: {
  q: string;
  category: WpCategory | "all";
  status: WpStatus | "all";
}) {
  const navigate = useNavigate({ from: "/poc" });
  const hasActive = q || category !== "all" || status !== "all";

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={q}
            onChange={(e) =>
              navigate({ search: (prev) => ({ ...prev, q: e.target.value || undefined }) })
            }
            placeholder="ابحث في حزم العمل والوثائق..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 pe-9 text-sm outline-none focus:border-primary"
          />
        </div>

        <select
          value={category}
          onChange={(e) =>
            navigate({
              search: (prev) => ({
                ...prev,
                category: e.target.value === "all" ? undefined : (e.target.value as WpCategory),
              }),
            })
          }
          className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        >
          <option value="all">كل الفئات</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {categoryLabelAr[c]}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) =>
            navigate({
              search: (prev) => ({
                ...prev,
                status: e.target.value === "all" ? undefined : (e.target.value as WpStatus),
              }),
            })
          }
          className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        >
          <option value="all">كل الحالات</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {statusLabelAr[s]}
            </option>
          ))}
        </select>

        {hasActive && (
          <button
            type="button"
            onClick={() =>
              navigate({ search: () => ({ q: undefined, category: undefined, status: undefined }) })
            }
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary"
          >
            <X className="h-3.5 w-3.5" />
            مسح
          </button>
        )}
      </div>
    </div>
  );
}
