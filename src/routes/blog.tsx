import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { FileText, Download, Calendar, User } from "lucide-react";
import { PageShell, PageHeader } from "@/components/layout/PageShell";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { articlesByLang, reportsByLang, newsByLang } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

const blogSearchSchema = z.object({
  tab: z.enum(["articles", "reports", "news"]).optional(),
});

export const Route = createFileRoute("/blog")({
  validateSearch: blogSearchSchema,
  head: () => ({
    meta: [
      { title: "Blog — RSIC articles, reports, and news" },
      { name: "description", content: "Articles, reports, and news about the RSIC initiative." },
      { property: "og:title", content: "Blog — RSIC" },
      { property: "og:description", content: "Articles, PDF reports, and initiative news." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "RSIC Blog",
          description: "Articles, reports, and news from the RSIC initiative.",
          inLanguage: "en",
          blogPost: articlesByLang.en.map((a) => ({
            "@type": "BlogPosting",
            headline: a.title,
            datePublished: a.date,
            author: { "@type": "Person", name: a.author },
            description: a.excerpt,
          })),
        }),
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { lang, t } = useI18n();
  const articles = articlesByLang[lang];
  const news = newsByLang[lang];
  const { tab } = Route.useSearch();
  const navigate = Route.useNavigate();
  const activeTab = tab ?? "articles";

  useEffect(() => {
    if (activeTab !== "news") return;
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-2", "ring-accent");
      const timeout = setTimeout(() => el.classList.remove("ring-2", "ring-accent"), 2400);
      return () => clearTimeout(timeout);
    }
  }, [activeTab]);

  return (
    <PageShell>
      <PageHeader eyebrow={t("blog.eyebrow")} title={t("blog.title")} description={t("blog.desc")} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Tabs
          value={activeTab}
          onValueChange={(v) =>
            navigate({ search: { tab: v as "articles" | "reports" | "news" }, replace: true })
          }
          className="w-full"
        >
          <TabsList className="grid w-full max-w-xl grid-cols-3">
            <TabsTrigger value="articles">{t("blog.tab.articles")}</TabsTrigger>
            <TabsTrigger value="reports">{t("blog.tab.reports")}</TabsTrigger>
            <TabsTrigger value="news">{t("blog.tab.news")}</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="mt-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <article
                  key={a.id}
                  className="rounded-lg border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1" dir="ltr">
                      <Calendar className="h-3 w-3" />
                      {a.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {a.author}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-foreground">{a.title}</h3>
                  <p className="mt-2 text-sm leading-loose text-muted-foreground">{a.excerpt}</p>
                </article>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-8">
            <ReportsViewer />
          </TabsContent>

          <TabsContent value="news" className="mt-8">
            <div className="space-y-4">
              {news.map((n) => (
                <article
                  id={`news-${n.id}`}
                  key={n.id}
                  className="scroll-mt-24 rounded-lg border border-border bg-card p-6 transition-shadow"
                >
                  <div className="text-xs text-muted-foreground" dir="ltr">
                    {n.date}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-foreground">{n.title}</h3>
                  <p className="mt-2 text-sm leading-loose text-muted-foreground">{n.excerpt}</p>
                </article>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </PageShell>
  );
}

function ReportsViewer() {
  const { lang, t } = useI18n();
  const reports = reportsByLang[lang];
  const [active, setActive] = useState(reports[0]);

  // re-sync when language changes
  useEffect(() => {
    setActive(reports[0]);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <aside className="lg:col-span-4">
        <ul className="space-y-3">
          {reports.map((r) => {
            const isActive = r.id === active.id;
            return (
              <li key={r.id}>
                <button
                  onClick={() => setActive(r)}
                  className={`w-full rounded-lg border p-4 text-start transition-all ${
                    isActive
                      ? "border-accent bg-accent/10"
                      : "border-border bg-card hover:border-accent/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <FileText className="mt-1 h-5 w-5 shrink-0 text-accent" />
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground">{r.title}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {r.description}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                        <span dir="ltr">{r.date}</span>
                        <span>{r.pages} {t("blog.pages")}</span>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="lg:col-span-8">
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border bg-secondary px-4 py-3">
            <h3 className="font-bold text-foreground">{active.title}</h3>
            <a
              href={active.url}
              download
              className="inline-flex items-center gap-2 rounded-md bg-accent px-3 py-1.5 text-sm font-bold text-accent-foreground hover:scale-[1.02]"
            >
              <Download className="h-4 w-4" />
              {t("blog.download")}
            </a>
          </div>
          <iframe
            key={active.id}
            src={`${active.url}#view=FitH`}
            title={active.title}
            className="h-[70vh] w-full bg-white"
          />
        </div>
      </div>
    </div>
  );
}
