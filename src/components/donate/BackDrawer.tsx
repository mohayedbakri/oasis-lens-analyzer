import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import type { CatalogPiece } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";

const presets = [1, 2, 5, 10];

export function BackDrawer({
  piece,
  onOpenChange,
}: {
  piece: CatalogPiece | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { lang, t } = useI18n();
  const [multiplier, setMultiplier] = useState<number>(1);
  const [custom, setCustom] = useState<string>("");
  const [recurring, setRecurring] = useState<"once" | "monthly">("once");

  useEffect(() => {
    if (piece) {
      setMultiplier(1);
      setCustom("");
      setRecurring("once");
    }
  }, [piece]);

  const unit = piece?.price_usd ?? 0;
  const final = custom ? Number(custom) : unit * multiplier;
  const open = !!piece;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={lang === "ar" ? "left" : "right"} className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="text-start">
          <SheetTitle className="text-primary">{piece?.name[lang]}</SheetTitle>
          <SheetDescription>
            {piece?.code[lang]} · <span dir="ltr">${unit.toLocaleString()} {t("donate.drawer.perUnit")}</span>
          </SheetDescription>
        </SheetHeader>

        {piece && (
          <div className="mt-6 space-y-6">
            <img
              src={piece.image}
              alt={piece.name[lang]}
              width={1024}
              height={768}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />

            <fieldset>
              <legend className="text-sm font-bold text-foreground">
                {t("donate.type")}
              </legend>
              <div className="mt-3 inline-flex rounded-md border border-border p-1">
                {(["once", "monthly"] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setRecurring(k)}
                    className={`rounded px-4 py-2 text-sm font-semibold transition-colors ${
                      recurring === k
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {k === "once" ? t("donate.once") : t("donate.monthly")}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-bold text-foreground">
                {t("donate.drawer.units")}
              </legend>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {presets.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setMultiplier(n);
                      setCustom("");
                    }}
                    className={`rounded-md border px-3 py-3 text-base font-bold transition-colors ${
                      multiplier === n && !custom
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-background text-foreground hover:border-accent"
                    }`}
                  >
                    ×{n}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <label htmlFor="back-custom" className="block text-sm font-semibold text-foreground">
                  {t("donate.custom.label")}
                </label>
                <input
                  id="back-custom"
                  type="number"
                  min={1}
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="0"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none"
                />
              </div>
            </fieldset>

            <div className="rounded-md bg-secondary p-4 text-sm text-foreground">
              {t("donate.summary")}{" "}
              <span className="font-bold text-primary" dir="ltr">
                ${final.toLocaleString()}
              </span>{" "}
              {recurring === "monthly" ? t("donate.summary.monthly") : t("donate.summary.once")}.
            </div>

            <button
              type="button"
              disabled={!final || final < 1}
              className="w-full rounded-md bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t("donate.continue")}
            </button>
            <p className="text-center text-xs text-muted-foreground">{t("donate.note")}</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
