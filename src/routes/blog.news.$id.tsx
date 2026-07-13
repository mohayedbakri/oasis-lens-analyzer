import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { PostDetail } from "@/components/blog/PostDetail";
import { newsByLang } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/blog/news/$id")({
  loader: ({ params }) => {
    const item = newsByLang.en.find((n) => n.id === params.id);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const { item } = loaderData;
    return {
      meta: [
        { title: `${item.title} — RSIC News` },
        { name: "description", content: item.excerpt },
        { property: "og:title", content: item.title },
        { property: "og:description", content: item.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: NewsDetailPage,
  notFoundComponent: NewsNotFound,
});

function NewsDetailPage() {
  const { lang } = useI18n();
  const { id } = Route.useParams();
  const list = newsByLang[lang];
  const item = list.find((n) => n.id === id) ?? list[0];
  const related = list.filter((n) => n.id !== item.id).slice(0, 4);

  return (
    <PageShell>
      <PostDetail
        kind="news"
        date={item.date}
        title={item.title}
        body={item.body}
        related={related.map((r) => ({ id: r.id, title: r.title, date: r.date }))}
      />
    </PageShell>
  );
}

function NewsNotFound() {
  const { t } = useI18n();
  return (
    <PageShell>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-primary">{t("blog.notFound.title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("blog.notFound.desc")}</p>
        <Link
          to="/blog"
          search={{ tab: "news" }}
          className="mt-8 inline-block rounded-md bg-accent px-5 py-2.5 font-bold text-accent-foreground"
        >
          {t("blog.backToBlog")}
        </Link>
      </div>
    </PageShell>
  );
}
