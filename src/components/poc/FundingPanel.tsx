import { pickName, type PocSnapshot } from "@/lib/poc-data";
import { Progress } from "@/components/ui/progress";
import { useStatusLabels } from "./status";
import { useI18n } from "@/lib/i18n";

export function FundingPanel({ data }: { data: PocSnapshot }) {
  const { category } = useStatusLabels();
  const { lang } = useI18n();
  const fundMap = new Map(data.funding.map((f) => [f.work_package_id, f]));
  const byCat = new Map<string, typeof data.work_packages>();
  for (const wp of data.work_packages) {
    const arr = byCat.get(wp.category) ?? [];
    arr.push(wp);
    byCat.set(wp.category, arr);
  }

  return (
    <div className="space-y-6">
      {Array.from(byCat.entries()).map(([cat, wps]) => (
        <div key={cat} className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-display text-lg font-bold text-primary">
            {category[cat as keyof typeof category] ?? cat}
          </h3>
          <div className="mt-4 space-y-4">
            {wps.map((wp) => {
              const f = fundMap.get(wp.id);
              const allocated = f?.allocated_usd ?? 0;
              const received = f?.received_usd ?? 0;
              const pct = allocated > 0 ? Math.round((received / allocated) * 100) : 0;
              return (
                <div key={wp.id}>
                  <div className="flex items-baseline justify-between gap-2 text-sm">
                    <span className="font-medium text-foreground">{pickName(wp, lang)}</span>
                    <span className="text-muted-foreground" dir="ltr">
                      ${received.toLocaleString()} / ${allocated.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={pct} className="mt-2 h-2" />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
