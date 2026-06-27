import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader } from "@/components/layout/PageShell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — RSIC" },
      { name: "description", content: "Support the RSIC initiative with a secure, transparent donation." },
      { property: "og:title", content: "Donate — RSIC" },
      { property: "og:description", content: "Secure, transparent donation via a trusted payment gateway." },
      { property: "og:url", content: "/donate" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: DonatePage,
});

const presets = [100, 250, 500, 1000, 2500];

function DonatePage() {
  const { t } = useI18n();
  const [amount, setAmount] = useState<number>(250);
  const [custom, setCustom] = useState<string>("");
  const [recurring, setRecurring] = useState<"once" | "monthly">("once");

  const final = custom ? Number(custom) : amount;

  return (
    <PageShell>
      <PageHeader eyebrow={t("donate.eyebrow")} title={t("donate.title")} description={t("donate.desc")} />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
          <fieldset>
            <legend className="text-sm font-bold text-foreground">{t("donate.type")}</legend>
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

          <fieldset className="mt-6">
            <legend className="text-sm font-bold text-foreground">{t("donate.amount")}</legend>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setAmount(p);
                    setCustom("");
                  }}
                  className={`rounded-md border px-3 py-3 text-base font-bold transition-colors ${
                    amount === p && !custom
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-background text-foreground hover:border-accent"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <label htmlFor="custom" className="block text-sm font-semibold text-foreground">
                {t("donate.custom.label")}
              </label>
              <input
                id="custom"
                type="number"
                min={10}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="0"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none"
              />
            </div>
          </fieldset>

          <div className="mt-8 rounded-md bg-secondary p-4 text-sm text-foreground">
            {t("donate.summary")}{" "}
            <span className="font-bold text-primary">{final || 0}</span>{" "}
            {t("donate.summary.currency")}{" "}
            {recurring === "monthly" ? t("donate.summary.monthly") : t("donate.summary.once")}.
          </div>

          <button
            type="button"
            disabled={!final || final < 10}
            className="mt-6 w-full rounded-md bg-accent px-6 py-3.5 text-base font-bold text-accent-foreground transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("donate.continue")}
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">{t("donate.note")}</p>
        </div>
      </section>
    </PageShell>
  );
}
