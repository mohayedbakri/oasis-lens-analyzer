import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export type PostKind = "news" | "article" | "report";
export type PostStatus = "draft" | "published";

export interface PostRow {
  id: string;
  kind: PostKind;
  slug: string;
  title_ar: string;
  title_en: string;
  excerpt_ar: string | null;
  excerpt_en: string | null;
  body_ar: string | null;
  body_en: string | null;
  cover_url: string | null;
  pdf_url: string | null;
  status: PostStatus;
  published_at: string | null;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
}

function serverPublic() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

// ---------- Public reads ----------

export const listPublishedPosts = createServerFn({ method: "GET" })
  .inputValidator((input: { kind?: PostKind }) =>
    z.object({ kind: z.enum(["news", "article", "report"]).optional() }).parse(input),
  )
  .handler(async ({ data }) => {
    const sb = serverPublic();
    let q = sb
      .from("posts")
      .select(
        "id,kind,slug,title_ar,title_en,excerpt_ar,excerpt_en,cover_url,pdf_url,status,published_at,views,likes,created_at,updated_at",
      )
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false });
    if (data.kind) q = q.eq("kind", data.kind);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return (rows ?? []) as Omit<PostRow, "body_ar" | "body_en">[];
  });

export const getPublishedPost = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const sb = serverPublic();
    const { data: row, error } = await sb
      .from("posts")
      .select("*")
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row ?? null) as PostRow | null;
  });

export const bumpPostView = createServerFn({ method: "POST" })
  .inputValidator((input: { slug: string }) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const sb = serverPublic();
    await sb.rpc("increment_post_views", { _slug: data.slug });
    return { ok: true };
  });

// ---------- Admin ----------

async function assertAdmin(context: { supabase: ReturnType<typeof serverPublic>; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

const upsertSchema = z.object({
  id: z.string().uuid().optional(),
  kind: z.enum(["news", "article", "report"]),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, digits, or hyphens"),
  title_ar: z.string().min(1).max(300),
  title_en: z.string().max(300).default(""),
  excerpt_ar: z.string().max(1000).default(""),
  excerpt_en: z.string().max(1000).default(""),
  body_ar: z.string().max(50000).default(""),
  body_en: z.string().max(50000).default(""),
  cover_url: z.string().url().nullable().optional(),
  pdf_url: z.string().url().nullable().optional(),
  status: z.enum(["draft", "published"]),
  published_at: z.string().datetime().nullable().optional(),
});

export const listAllPostsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as never);
    const { data, error } = await context.supabase
      .from("posts")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as PostRow[];
  });

export const upsertPostAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => upsertSchema.parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context as never);
    const payload = {
      ...data,
      published_at:
        data.status === "published" ? (data.published_at ?? new Date().toISOString()) : null,
    };
    const { data: row, error } = await context.supabase
      .from("posts")
      .upsert(payload, { onConflict: "id" })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row as PostRow;
  });

export const deletePostAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context as never);
    const { error } = await context.supabase.from("posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Query options ----------

export const publishedPostsQuery = (kind?: PostKind) =>
  queryOptions({
    queryKey: ["posts", "published", kind ?? "all"],
    queryFn: () => listPublishedPosts({ data: { kind } }),
  });

export const publishedPostQuery = (slug: string) =>
  queryOptions({
    queryKey: ["posts", "slug", slug],
    queryFn: () => getPublishedPost({ data: { slug } }),
  });

export const adminPostsQuery = queryOptions({
  queryKey: ["admin", "posts"],
  queryFn: () => listAllPostsAdmin(),
});
