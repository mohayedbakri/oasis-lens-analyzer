import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { nav, site } from "@/lib/site";
import logoAsset from "@/assets/rsic-logo.png.asset.json";

const socials = [
  { name: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { name: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { name: "X", href: "https://x.com", Icon: XIcon },
  { name: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { name: "TikTok", href: "https://tiktok.com", Icon: TikTokIcon },
  { name: "YouTube", href: "https://youtube.com", Icon: Youtube },
];

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2H21l-6.52 7.45L22 22h-6.78l-4.77-6.24L4.8 22H2l7-8L2 2h6.91l4.32 5.73L18.244 2Zm-2.38 18h1.88L8.22 4H6.22l9.644 16Z" />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.6 6.7a5.6 5.6 0 0 1-3.3-1.07A5.6 5.6 0 0 1 14.2 2h-3.3v13.3a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12V9.5a5.9 5.9 0 1 0 5.12 5.85V9.1a8.9 8.9 0 0 0 5.4 1.82V7.6c-.01 0-.01-.9 0-.9Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="grain mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 font-display text-xl font-bold">
            <img
              src={logoAsset.url}
              alt="RSIC — شعار المجمعات الصناعية الريفية المجتمعية"
              className="h-12 w-auto"
            />
            {site.nameAr}
          </div>
          <p className="mt-4 max-w-md text-sm leading-loose text-primary-foreground/80">
            {site.description}
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
            روابط
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-primary-foreground/80 hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
            تواصل
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>
              <a href={`tel:${site.phone.replace(/\s+/g, "")}`} dir="ltr" className="hover:text-accent">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} dir="ltr" className="hover:text-accent">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/20 text-primary-foreground/80 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-2 text-xs text-primary-foreground/60 sm:flex-row">
            <span>© {new Date().getFullYear()} {site.nameShort}. جميع الحقوق محفوظة.</span>
            <span>{site.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
