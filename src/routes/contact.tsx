import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageShell, PageHeader } from "@/components/layout/PageShell";
import { site } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — RSIC" },
      { name: "description", content: "Contact the RSIC initiative team." },
      { property: "og:title", content: "Contact — RSIC" },
      { property: "og:description", content: "Contact form and details." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const schema = z.object({
    name: z.string().trim().min(2, t("contact.f.err.name")).max(100),
    email: z.string().trim().email(t("contact.f.err.email")).max(255),
    message: z.string().trim().min(10, t("contact.f.err.message")).max(2000),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        if (issue.path[0]) fieldErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }
    setErrors({});
    setStatus("sent");
    e.currentTarget.reset();
  }

  return (
    <PageShell>
      <PageHeader eyebrow={t("contact.eyebrow")} title={t("contact.title")} />
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <aside className="space-y-4 lg:col-span-1">
          <div>
            <h2 className="text-sm font-bold uppercase text-muted-foreground">{t("contact.phone")}</h2>
            <a href={`tel:${site.phone.replace(/\s+/g, "")}`} dir="ltr" className="mt-1 block text-lg text-primary">
              {site.phone}
            </a>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase text-muted-foreground">{t("contact.email")}</h2>
            <a href={`mailto:${site.email}`} dir="ltr" className="mt-1 block text-lg text-primary">
              {site.email}
            </a>
          </div>
        </aside>
        <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-2" noValidate>
          <Field label={t("contact.f.name")} name="name" error={errors.name} />
          <Field label={t("contact.f.email")} name="email" type="email" error={errors.email} dir="ltr" />
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-foreground">
              {t("contact.f.message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none"
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="rounded-md bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
          >
            {t("contact.f.submit")}
          </button>
          {status === "sent" && <p className="text-sm text-primary">{t("contact.f.sent")}</p>}
        </form>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  dir,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        dir={dir}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
