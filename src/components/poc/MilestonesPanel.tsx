import type { PocSnapshot } from "@/lib/poc-data";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Clock, AlertTriangle } from "lucide-react";
import { wpStatusLabelAr } from "./status";

const icon = {
  done: CheckCircle2,
  in_progress: Clock,
  planned: Circle,
  blocked: AlertTriangle,
} as const;

const tone = {
  done: "text-accent",
  in_progress: "text-primary",
  planned: "text-muted-foreground",
  blocked: "text-destructive",
} as const;

export function MilestonesPanel({ data }: { data: PocSnapshot }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-display text-lg font-bold text-primary">المعالم الرئيسية</h3>
      <ul className="mt-4 divide-y divide-border">
        {data.work_packages.map((wp) => {
          const Icon = icon[wp.status];
          return (
            <li key={wp.id} className="flex items-center gap-3 py-3">
              <Icon className={`h-5 w-5 shrink-0 ${tone[wp.status]}`} />
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-foreground">{wp.name_ar}</span>
                  <span className="text-xs text-muted-foreground">
                    {wpStatusLabelAr[wp.status]} · {wp.progress_pct}%
                  </span>
                </div>
                <Progress value={wp.progress_pct} className="mt-2 h-1.5" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
