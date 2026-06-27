import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, { ar: string; en: string }>;

const dict: Dict = {
  "nav./": { ar: "الرئيسية", en: "Home" },
  "nav./about": { ar: "عن المبادرة", en: "About" },
  "nav./projects": { ar: "النموذج والمصانع", en: "Model & Factories" },
  "nav./impact": { ar: "الأثر المتوقع", en: "Impact" },
  "nav./governance": { ar: "الحوكمة والتمويل", en: "Governance & Funding" },
  "nav./blog": { ar: "المدونة", en: "Blog" },
  "nav./poc": { ar: "لوحة المشروع", en: "Project Dashboard" },
  "nav./contact": { ar: "تواصل معنا", en: "Contact" },
  "cta.donate": { ar: "ادعم المبادرة", en: "Support the Initiative" },
  "cta.call": { ar: "اتصل بنا", en: "Call us" },
  "lang.toggle": { ar: "EN", en: "ع" },
  "lang.aria": { ar: "Switch to English", en: "التبديل إلى العربية" },
  "menu.open": { ar: "فتح القائمة", en: "Open menu" },
  "menu.close": { ar: "إغلاق القائمة", en: "Close menu" },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rsic.lang") as Lang | null;
      if (stored === "ar" || stored === "en") setLangState(stored);
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("rsic.lang", l);
    } catch {}
  };

  const t = (key: string) => dict[key]?.[lang] ?? key;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) return { lang: "ar" as Lang, setLang: () => {}, t: (k: string) => dict[k]?.ar ?? k };
  return ctx;
}
