import type { PocSnapshot } from "@/lib/poc-data";
import { FileText, ExternalLink } from "lucide-react";

export function DocumentsPanel({ data }: { data: PocSnapshot }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-display text-lg font-bold text-primary">الوثائق والاتفاقيات</h3>
      {data.documents.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">لا توجد وثائق منشورة بعد.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {data.documents.map((d) => (
            <li key={d.id}>
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2 text-sm transition-colors hover:border-primary hover:bg-secondary/50"
              >
                <FileText className="h-4 w-4 text-primary" />
                <span className="flex-1 text-foreground">{d.title_ar}</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
