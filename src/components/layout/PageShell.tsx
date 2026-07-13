import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import bannerAsset from "@/assets/rsic-banner.jpg.asset.json";
import { useI18n } from "@/lib/i18n";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageBanner({ overlay = false }: { overlay?: boolean }) {
  const { lang } = useI18n();
  const alt =
    lang === "ar"
      ? "مجمع برقيق الصناعي الريفي النموذجي"
      : "RSIC pilot industrial complex — Al-Burgig";
  return (
    <div className="relative w-full overflow-hidden border-b border-border bg-secondary">
      <img
        src={bannerAsset.url}
        alt={alt}
        className="h-40 w-full object-cover sm:h-56 lg:h-72"
        loading="eager"
      />
      {overlay && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.4), color-mix(in srgb, var(--primary) 60%, transparent))",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  banner = true,
  overlay = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  banner?: boolean;
  overlay?: boolean;
}) {
  return (
    <>
      {banner && <PageBanner overlay={overlay} />}
      <section className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          {eyebrow && <p className="section-number mb-3 text-sm">{eyebrow}</p>}
          <h1 className="text-4xl font-bold text-primary sm:text-5xl">{title}</h1>
          {description && (
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{description}</p>
          )}
        </div>
      </section>
    </>
  );
}

