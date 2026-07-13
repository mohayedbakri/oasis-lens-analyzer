import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar, User, ChevronLeft } from "lucide-react";
import { PageBanner } from "@/components/layout/PageShell";
import { useI18n } from "@/lib/i18n";
import { MetricChips } from "@/components/blog/MetricChips";
import { CommentsSection } from "@/components/blog/CommentsSection";
import { useMetrics } from "@/lib/metrics";
import { postImages } from "@/lib/content";

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


  const relatedTitle =
    kind === "news" ? t("blog.related.news") : t("blog.related.articles");

  return (
    <>
      <PageBanner overlay />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <article className={`lg:col-span-2 lg:row-start-1 ${isRtl ? "lg:col-start-2" : "lg:col-start-1"}`}>
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

            {postImages[id] && (
              <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
                <img
                  src={postImages[id]}
                  alt={title}
                  width={1280}
                  height={720}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6 text-sm text-muted-foreground">
              <div className="flex flex-wrap items-center gap-4">
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
              <MetricChips kind={kind} id={id} interactive size="md" onCommentClick={scrollToComments} />
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

            <div ref={commentsRef}>
              <CommentsSection kind={kind} id={id} />
            </div>
          </article>

          {related.length > 0 && (
            <aside className="lg:col-span-1 lg:col-start-1 lg:row-start-1">
              <div className="rounded-lg bg-primary p-5 text-primary-foreground lg:sticky lg:top-24">
                <h2 className="mb-4 border-b border-primary-foreground/20 pb-3 text-xl font-bold">
                  {relatedTitle}
                </h2>
                <ul className="divide-y divide-primary-foreground/15">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link
                        to={kind === "news" ? "/blog/news/$id" : "/blog/articles/$id"}
                        params={{ id: r.id }}
                        className="group flex gap-3 py-3 transition-opacity hover:opacity-80"
                      >
                        {postImages[r.id] && (
                          <div className="h-16 w-20 shrink-0 overflow-hidden rounded bg-primary-foreground/10">
                            <img
                              src={postImages[r.id]}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-3 text-sm font-bold leading-snug group-hover:underline">
                            {r.title}
                          </h3>
                          <div className="mt-1 text-xs text-primary-foreground/70" dir="ltr">
                            {r.date}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
