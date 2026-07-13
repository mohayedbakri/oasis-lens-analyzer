import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar, User, ChevronLeft } from "lucide-react";
import { PageBanner } from "@/components/layout/PageShell";
import { useI18n } from "@/lib/i18n";
import { MetricChips } from "@/components/blog/MetricChips";
import { CommentsSection } from "@/components/blog/CommentsSection";
import { useMetrics } from "@/lib/metrics";

type Props = {
  kind: "news" | "articles";
  id: string;
  date: string;
  title: string;
  author?: string;
  body: string[];
  related?: { id: string; title: string; date: string }[];
};

export function PostDetail({ kind, id, date, title, author, body, related = [] }: Props) {
  const { t, lang } = useI18n();
  const isRtl = lang === "ar";
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  const tabKey = kind === "news" ? "news" : "articles";
  const crumbLabel = kind === "news" ? t("blog.tab.news") : t("blog.tab.articles");

  const { registerView } = useMetrics(kind, id);
  useEffect(() => {
    registerView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, id]);

  const commentsRef = useRef<HTMLDivElement>(null);
  const scrollToComments = () => {
    commentsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  return (
    <>
      <PageBanner />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-accent">
            {t("blog.crumb.home")}
          </Link>
          <ChevronLeft className={`h-3 w-3 ${isRtl ? "" : "rotate-180"}`} />
          <Link to="/blog" search={{ tab: tabKey }} className="hover:text-accent">
            {t("blog.eyebrow")}
          </Link>
          <ChevronLeft className={`h-3 w-3 ${isRtl ? "" : "rotate-180"}`} />
          <Link to="/blog" search={{ tab: tabKey }} className="hover:text-accent">
            {crumbLabel}
          </Link>
        </nav>

        <h1 className="text-3xl font-bold leading-tight text-primary sm:text-4xl">{title}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 border-b border-border pb-6 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2" dir="ltr">
            <Calendar className="h-4 w-4" />
            {date}
          </span>
          {author && (
            <span className="inline-flex items-center gap-2">
              <User className="h-4 w-4" />
              {t("blog.by")} {author}
            </span>
          )}
        </div>

        <div className="prose prose-lg mt-8 max-w-none space-y-5 text-lg leading-loose text-foreground">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <Link
            to="/blog"
            search={{ tab: tabKey }}
            className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-bold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <BackIcon className="h-4 w-4" />
            {t("blog.backToBlog")}
          </Link>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-4 text-xl font-bold text-primary">{t("blog.related")}</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    to={kind === "news" ? "/blog/news/$id" : "/blog/articles/$id"}
                    params={{ id: r.id }}
                    className="block rounded-lg border border-border bg-card p-4 transition-all hover:border-accent hover:shadow-md"
                  >
                    <div className="text-xs text-muted-foreground" dir="ltr">
                      {r.date}
                    </div>
                    <h3 className="mt-1 font-bold text-foreground">{r.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
