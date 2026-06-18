import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import type { PocSnapshot, Unit } from "@/lib/poc-data";
import { statusLabelAr, wpStatusLabelAr, categoryLabelAr } from "./status";
import { FileText, ExternalLink } from "lucide-react";

export function UnitDetailDrawer({
  unit,
  data,
  onOpenChange,
}: {
  unit: Unit | null;
  data: PocSnapshot;
  onOpenChange: (open: boolean) => void;
}) {
  const open = !!unit;
  const wps = unit ? data.work_packages.filter((w) => w.unit_id === unit.id) : [];
  const docs = unit
    ? data.documents.filter((d) => wps.some((w) => w.id === d.work_package_id))
    : [];
  const fundMap = new Map(data.funding.map((f) => [f.work_package_id, f]));
  const allocated = wps.reduce((s, w) => s + (fundMap.get(w.id)?.allocated_usd ?? 0), 0);
  const received = wps.reduce((s, w) => s + (fundMap.get(w.id)?.received_usd ?? 0), 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="text-start">
          <SheetTitle className="text-primary">{unit?.name_ar}</SheetTitle>
          <SheetDescription>
            {unit ? statusLabelAr[unit.status] : ""}
          </SheetDescription>
        </SheetHeader>

        {unit && (
          <div className="mt-6 space-y-6">
            <div className="rounded-lg border border-border bg-secondary/40 p-4">
              <p className="text-xs text-muted-foreground">التمويل</p>
              <p className="mt-1 text-lg font-bold text-primary" dir="ltr">
                ${received.toLocaleString()} / ${allocated.toLocaleString()}
              </p>
              <Progress
                value={allocated > 0 ? (received / allocated) * 100 : 0}
                className="mt-2 h-2"
              />
            </div>

            <div>
              <h4 className="font-display text-sm font-bold text-primary">حزم العمل</h4>
              <ul className="mt-3 space-y-3">
                {wps.length === 0 && (
                  <li className="text-sm text-muted-foreground">لا توجد حزم عمل مرتبطة.</li>
                )}
                {wps.map((wp) => (
                  <li key={wp.id} className="rounded-lg border border-border bg-card p-3">
                    <div className="flex items-baseline justify-between gap-2 text-sm">
                      <span className="font-medium">{wp.name_ar}</span>
                      <span className="text-xs text-muted-foreground">
                        {wpStatusLabelAr[wp.status]} · {wp.progress_pct}%
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {categoryLabelAr[wp.category]}
                    </p>
                    <Progress value={wp.progress_pct} className="mt-2 h-1.5" />
                  </li>
                ))}
              </ul>
            </div>

            {docs.length > 0 && (
              <div>
                <h4 className="font-display text-sm font-bold text-primary">الوثائق</h4>
                <ul className="mt-3 space-y-2">
                  {docs.map((d) => (
                    <li key={d.id}>
                      <a
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded border border-border px-3 py-2 text-sm hover:border-primary"
                      >
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="flex-1">{d.title_ar}</span>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
