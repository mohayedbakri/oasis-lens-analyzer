import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useMetrics, type Kind } from "@/lib/metrics";
import { useI18n } from "@/lib/i18n";

export function CommentsSection({ kind, id }: { kind: Kind; id: string }) {
  const { comments, addComment } = useMetrics(kind, id);
  const { t, lang } = useI18n();
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(name, text);
    setText("");
  };

  const fmt = (ts: number) =>
    new Date(ts).toLocaleString(lang === "ar" ? "ar" : "en", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <section id="comments" className="mt-16 border-t border-border pt-8">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-primary">
        <MessageCircle className="h-5 w-5" />
        {t("comments.title")} ({comments.length})
      </h2>

      <form onSubmit={submit} className="mb-8 space-y-3 rounded-lg border border-border bg-card p-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("comments.name")}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          maxLength={60}
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("comments.placeholder")}
          rows={3}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          maxLength={1000}
          required
        />
        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-foreground hover:scale-[1.02]"
        >
          {t("comments.submit")}
        </button>
      </form>

      {comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("comments.empty")}</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="rounded-lg border border-border bg-card p-4">
              <div className="mb-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                <span className="font-bold text-foreground">{c.name}</span>
                <span dir="ltr">{fmt(c.ts)}</span>
              </div>
              <p className="whitespace-pre-wrap text-sm text-foreground">{c.text}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
