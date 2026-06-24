import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageShell, PageHeader } from "@/components/layout/PageShell";
import { site } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا — RSIC" },
      { name: "description", content: "تواصل مع فريق مبادرة مجمعات التنمية الريفية الصناعية." },
      { property: "og:title", content: "تواصل معنا — RSIC" },
      { property: "og:description", content: "نموذج التواصل وبيانات الاتصال." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "الاسم قصير جداً").max(100),
  email: z.string().trim().email("بريد إلكتروني غير صالح").max(255),
  message: z.string().trim().min(10, "الرسالة قصيرة جداً").max(2000),
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    // TODO: send via server function once email provider is wired
    setStatus("sent");
    e.currentTarget.reset();
  }

  return (
    <PageShell>
      <PageHeader eyebrow="تواصل" title="نسعد بتواصلك معنا" />
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <aside className="space-y-4 lg:col-span-1">
          <div>
            <h2 className="text-sm font-bold uppercase text-muted-foreground">الهاتف</h2>
            <a href={`tel:${site.phone.replace(/\s+/g, "")}`} dir="ltr" className="mt-1 block text-lg text-primary">
              {site.phone}
            </a>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase text-muted-foreground">البريد</h2>
            <a href={`mailto:${site.email}`} dir="ltr" className="mt-1 block text-lg text-primary">
              {site.email}
            </a>
          </div>
        </aside>
        <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-2" noValidate>
          <Field label="الاسم" name="name" error={errors.name} />
          <Field label="البريد الإلكتروني" name="email" type="email" error={errors.email} dir="ltr" />
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-foreground">
              الرسالة
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
            إرسال
          </button>
          {status === "sent" && (
            <p className="text-sm text-primary">تم استلام رسالتك، سنعود إليك قريباً.</p>
          )}
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
