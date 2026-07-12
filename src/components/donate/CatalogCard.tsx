import { ArrowUpRight } from "lucide-react";
import type { CatalogPiece } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";

export function CatalogCard({
  piece,
  onBack,
}: {
  piece: CatalogPiece;
  onBack: (p: CatalogPiece) => void;
}) {
  const { lang, t } = useI18n();
  const name = piece.name[lang];
  const altName = piece.name[lang === "ar" ? "en" : "ar"];
  const code = piece.code[lang];
  const quote = piece.quote[lang];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={piece.image}
          alt={name}
          width={1024}
          height={768}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute start-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-primary shadow-sm ring-1 ring-border">
          {code}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-foreground">{name}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground" dir={lang === "ar" ? "ltr" : "rtl"}>
          {altName}
        </p>

        <p className="mt-3 text-3xl font-bold text-primary" dir="ltr">
          ${piece.price_usd.toLocaleString()}
        </p>

        <blockquote className="mt-3 flex-1 border-s-2 border-accent/60 ps-3 text-sm italic text-muted-foreground">
          “{quote}”
        </blockquote>

        <button
          type="button"
          onClick={() => onBack(piece)}
          className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-md bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground transition-transform hover:scale-[1.02]"
        >
          {t("donate.back")}
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
