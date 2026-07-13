import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { adminPostsQuery } from "@/lib/posts.functions";
import { FileText, Eye, Heart } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(adminPostsQuery),
  component: AdminDashboard,
  errorComponent: ({ error }) => (
    <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
      {error.message}
    </div>
  ),
});

function AdminDashboard() {
  const { data: posts } = useSuspenseQuery(adminPostsQuery);
  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.length - published;
  const views = posts.reduce((s, p) => s + p.views, 0);
  const likes = posts.reduce((s, p) => s + p.likes, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-primary">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your content and engagement.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Published" value={published} icon={<FileText className="h-4 w-4" />} />
        <Stat label="Drafts" value={drafts} icon={<FileText className="h-4 w-4" />} />
        <Stat label="Total views" value={views} icon={<Eye className="h-4 w-4" />} />
        <Stat label="Total likes" value={likes} icon={<Heart className="h-4 w-4" />} />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-foreground">Recent posts</h2>
          <Link
            to="/admin/posts"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Manage all →
          </Link>
        </div>
        <ul className="divide-y divide-border">
          {posts.slice(0, 5).map((p) => (
            <li key={p.id} className="flex items-center justify-between py-3 text-sm">
              <div className="min-w-0">
                <p className="truncate font-semibold text-foreground">{p.title_en || p.title_ar}</p>
                <p className="text-xs text-muted-foreground">
                  {p.kind} · {p.status}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-3 w-3" /> {p.views}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Heart className="h-3 w-3" /> {p.likes}
                </span>
              </div>
            </li>
          ))}
          {posts.length === 0 && (
            <li className="py-6 text-center text-sm text-muted-foreground">
              No posts yet. Head to Posts to create the first one.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-3xl font-bold text-primary">{value.toLocaleString()}</p>
    </div>
  );
}
