import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Download, Calendar, User } from "lucide-react";
import { PageShell, PageHeader } from "@/components/layout/PageShell";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { articles, reports, news } from "@/lib/content";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "المدونة — مقالات وتقارير وأخبار RSIC" },
      {
        name: "description",
        content: "المقالات والتقارير والأخبار حول مبادرة المجمعات الصناعية الريفية المجتمعية.",
      },
      { property: "og:title", content: "المدونة — RSIC" },
      { property: "og:description", content: "مقالات، تقارير PDF، وأخبار المبادرة." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "مدونة RSIC",
          description:
            "مقالات وتقارير وأخبار مبادرة المجمعات الصناعية الريفية المجتمعية.",
          inLanguage: "ar",
          blogPost: articles.map((a) => ({
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
  return (
    <PageShell>
      <PageHeader
        eyebrow="المدونة"
        title="مقالات، تقارير، وأخبار"
        description="محتوى المبادرة من تحليلات ودراسات وتحديثات ميدانية."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full max-w-xl grid-cols-3">
            <TabsTrigger value="articles">المقالات</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="news">الأخبار</TabsTrigger>
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
                  key={n.id}
                  className="rounded-lg border border-border bg-card p-6"
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
  const [active, setActive] = useState<(typeof reports)[number]>(reports[0]);

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
                  className={`w-full rounded-lg border p-4 text-right transition-all ${
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
                        <span>{r.pages} صفحة</span>
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
              تحميل PDF
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
