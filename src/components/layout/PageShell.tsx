import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import bannerAsset from "@/assets/rsic-banner.jpg.asset.json";
import logoWhite from "@/assets/rsic-logo-white.png.asset.json";
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
  const isRtl = lang === "ar";
  // Dark side + logo: left in Arabic, right in English
  const darkOnLeft = isRtl;
  return (
    <div className="relative w-full overflow-hidden border-b border-border bg-secondary">
      <img
        src={bannerAsset.url}
        alt={alt}
        className="h-40 w-full object-cover sm:h-56 lg:h-72"
        loading="eager"
      />
      {overlay && (
        <>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: darkOnLeft
                ? "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.55) 35%, color-mix(in srgb, var(--primary) 60%, transparent) 75%, color-mix(in srgb, var(--primary) 40%, transparent) 100%)"
                : "linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.55) 35%, color-mix(in srgb, var(--primary) 60%, transparent) 75%, color-mix(in srgb, var(--primary) 40%, transparent) 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
              opacity: 0.5,
              mixBlendMode: "overlay",
            }}
            aria-hidden="true"
          />

          <div
            className={`pointer-events-none absolute top-4 m-4 sm:top-6 sm:m-6 lg:top-8 lg:m-8 ${
              darkOnLeft ? "left-0" : "right-0"
            }`}
          >
            <img
              src={logoWhite.url}
              alt="RSIC"
              className="h-12 w-auto opacity-95 sm:h-16 lg:h-20"
            />
          </div>
        </>
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

