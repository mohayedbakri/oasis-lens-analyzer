import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Newspaper, X } from "lucide-react";
import { newsByLang } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function NewsFloating() {
  const { lang, t } = useI18n();
  const news = newsByLang[lang];
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {open && (
        <div className="mb-3 w-80 max-w-[calc(100vw-3rem)] overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2 font-display font-bold">
              <Newspaper className="h-4 w-4" />
              {t("news.floating.title")}
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label={t("news.close")}
              className="rounded p-1 hover:bg-primary-foreground/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <ul className="max-h-96 divide-y divide-border overflow-y-auto">
            {news.map((n) => (
              <li key={n.id}>
                <Link
                  to="/blog"
                  search={{ tab: "news" }}
                  hash={`news-${n.id}`}
                  onClick={() => setOpen(false)}
                  className="block p-4 text-start transition-colors hover:bg-secondary/40"
                >
                  <div className="text-xs text-muted-foreground" dir="ltr">
                    {n.date}
                  </div>
                  <h4 className="mt-1 text-sm font-bold text-foreground">{n.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {n.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-bold text-accent-foreground shadow-xl transition-transform hover:scale-[1.03]"
        aria-expanded={open}
      >
        <Newspaper className="h-5 w-5" />
        <span>{t("news.button")}</span>
        <span className="grid h-6 min-w-6 place-items-center rounded-full bg-primary px-2 text-xs text-primary-foreground">
          {news.length}
        </span>
      </button>
    </div>
  );
}
