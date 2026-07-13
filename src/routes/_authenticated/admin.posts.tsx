import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  adminPostsQuery,
  deletePostAdmin,
  upsertPostAdmin,
  type PostRow,
  type PostKind,
  type PostStatus,
} from "@/lib/posts.functions";
import { Plus, Trash2, Pencil, X, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/posts")({
  loader: ({ context }) => context.queryClient.ensureQueryData(adminPostsQuery),
  component: PostsAdmin,
  errorComponent: ({ error }) => (
    <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
      {error.message}
    </div>
  ),
});

type Draft = {
  id?: string;
  kind: PostKind;
  slug: string;
  title_ar: string;
  title_en: string;
  excerpt_ar: string;
  excerpt_en: string;
  body_ar: string;
  body_en: string;
  cover_url: string;
  pdf_url: string;
  status: PostStatus;
};

function empty(): Draft {
  return {
    kind: "article",
    slug: "",
    title_ar: "",
    title_en: "",
    excerpt_ar: "",
    excerpt_en: "",
    body_ar: "",
    body_en: "",
    cover_url: "",
    pdf_url: "",
    status: "draft",
  };
}

function fromRow(r: PostRow): Draft {
  return {
    id: r.id,
    kind: r.kind,
    slug: r.slug,
    title_ar: r.title_ar,
    title_en: r.title_en,
    excerpt_ar: r.excerpt_ar ?? "",
    excerpt_en: r.excerpt_en ?? "",
    body_ar: r.body_ar ?? "",
    body_en: r.body_en ?? "",
    cover_url: r.cover_url ?? "",
    pdf_url: r.pdf_url ?? "",
    status: r.status,
  };
}

function PostsAdmin() {
  const { data: posts } = useSuspenseQuery(adminPostsQuery);
  const qc = useQueryClient();
  const upsert = useServerFn(upsertPostAdmin);
  const del = useServerFn(deletePostAdmin);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const saveMut = useMutation({
    mutationFn: (d: Draft) =>
      upsert({
        data: {
          ...d,
          cover_url: d.cover_url || null,
          pdf_url: d.pdf_url || null,
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "posts"] });
      qc.invalidateQueries({ queryKey: ["posts"] });
      setEditing(null);
      setErr(null);
    },
    onError: (e: Error) => setErr(e.message),
  });

  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "posts"] });
      qc.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">Posts</h1>
          <p className="text-sm text-muted-foreground">
            News, articles, and reports. Bilingual (Arabic + English).
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(empty());
            setErr(null);
          }}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> New post
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-start">Title</th>
              <th className="px-4 py-3 text-start">Kind</th>
              <th className="px-4 py-3 text-start">Status</th>
              <th className="px-4 py-3 text-start">Updated</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-secondary/40">
                <td className="px-4 py-3">
                  <p className="font-semibold text-foreground">{p.title_en || p.title_ar}</p>
                  <p className="text-xs text-muted-foreground">/{p.slug}</p>
                </td>
                <td className="px-4 py-3 capitalize">{p.kind}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      p.status === "published"
                        ? "rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
                        : "rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground"
                    }
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {new Date(p.updated_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-end">
                  <div className="inline-flex gap-2">
                    <button
                      onClick={() => {
                        setEditing(fromRow(p));
                        setErr(null);
                      }}
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${p.title_en || p.title_ar}"?`)) delMut.mutate(p.id);
                      }}
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No posts yet. Click "New post" to create the first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditDrawer
          draft={editing}
          error={err}
          saving={saveMut.isPending}
          onChange={setEditing}
          onSave={() => saveMut.mutate(editing)}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

function EditDrawer({
  draft,
  error,
  saving,
  onChange,
  onSave,
  onClose,
}: {
  draft: Draft;
  error: string | null;
  saving: boolean;
  onChange: (d: Draft) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => onChange({ ...draft, [k]: v });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <div
        className="h-full w-full max-w-2xl overflow-y-auto bg-background p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-primary">
            {draft.id ? "Edit post" : "New post"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 hover:bg-secondary"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Kind">
              <select
                value={draft.kind}
                onChange={(e) => set("kind", e.target.value as PostKind)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="news">News</option>
                <option value="article">Article</option>
                <option value="report">Report</option>
              </select>
            </Field>
            <Field label="Status">
              <select
                value={draft.status}
                onChange={(e) => set("status", e.target.value as PostStatus)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Field>
          </div>

          <Field label="Slug (URL)">
            <input
              value={draft.slug}
              onChange={(e) =>
                set(
                  "slug",
                  e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, ""),
                )
              }
              placeholder="my-post-slug"
              dir="ltr"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </Field>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Title (Arabic)">
              <input
                value={draft.title_ar}
                onChange={(e) => set("title_ar", e.target.value)}
                dir="rtl"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Title (English)">
              <input
                value={draft.title_en}
                onChange={(e) => set("title_en", e.target.value)}
                dir="ltr"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </Field>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Excerpt (Arabic)">
              <textarea
                value={draft.excerpt_ar}
                onChange={(e) => set("excerpt_ar", e.target.value)}
                dir="rtl"
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Excerpt (English)">
              <textarea
                value={draft.excerpt_en}
                onChange={(e) => set("excerpt_en", e.target.value)}
                dir="ltr"
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </Field>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Body (Arabic)">
              <textarea
                value={draft.body_ar}
                onChange={(e) => set("body_ar", e.target.value)}
                dir="rtl"
                rows={10}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Body (English)">
              <textarea
                value={draft.body_en}
                onChange={(e) => set("body_en", e.target.value)}
                dir="ltr"
                rows={10}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </Field>
          </div>

          <Field label="Cover image URL">
            <input
              value={draft.cover_url}
              onChange={(e) => set("cover_url", e.target.value)}
              placeholder="https://..."
              dir="ltr"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </Field>

          {draft.kind === "report" && (
            <Field label="PDF URL">
              <input
                value={draft.pdf_url}
                onChange={(e) => set("pdf_url", e.target.value)}
                placeholder="https://..."
                dir="ltr"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </Field>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={onClose}
              className="rounded-md border border-input bg-background px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
