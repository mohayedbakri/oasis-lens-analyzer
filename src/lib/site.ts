// Sitewide constants for the RSIC initiative — bilingual (ar / en).
// Source: الملف التعريفي للمبادرة (RSIC profile document).

import type { Lang } from "./i18n";

export const site = {
  nameShort: "RSIC",
  phone: "+249112560828",
  email: "info@rsic.sd",
} as const;

export const siteI18n = {
  name: {
    ar: "المجمعات الصناعية الريفية المجتمعية",
    en: "Rural Social Industrial Complexes",
  },
  tagline: {
    ar: "نهضة صناعية يقودها المجتمع، من الريف إلى الأمة",
    en: "A community-led industrial renaissance — from the countryside to the nation",
  },
  description: {
    ar: "مبادرة وطنية لإنشاء 378 مجمعاً صناعياً ريفياً في 189 محلية بالسودان، بملكية مجتمعية وحوكمة شفافة.",
    en: "A national initiative to build 378 rural industrial complexes across 189 localities in Sudan, with community ownership and transparent governance.",
  },
  donateCta: { ar: "ادعم المبادرة", en: "Support the Initiative" },
} as const;

export const nav = [
  { to: "/", label: "الرئيسية" },
  { to: "/about", label: "عن المبادرة" },
  { to: "/projects", label: "النموذج والمصانع" },
  { to: "/impact", label: "الأثر المتوقع" },
  { to: "/governance", label: "الحوكمة والتمويل" },
  { to: "/blog", label: "المدونة" },
  { to: "/poc", label: "لوحة المشروع", live: true },
  { to: "/contact", label: "تواصل معنا" },
] as const;

// Phase-1 PoC dashboard config.
export const pocConfig = {
  localityNameAr: "محلية البرقيق",
  localityNameEn: "Al-Bergig Locality",
  stateAr: "الولاية الشمالية",
  stateEn: "Northern State",
  sheetCsvUrl: import.meta.env.VITE_POC_SHEET_CSV_URL ?? "",
  refreshIntervalMs: 60_000,
} as const;

export function pickLocality(lang: Lang) {
  return lang === "ar"
    ? { locality: pocConfig.localityNameAr, state: pocConfig.stateAr }
    : { locality: pocConfig.localityNameEn, state: pocConfig.stateEn };
}

// الأركان الستة — bilingual
export const pillarsByLang: Record<Lang, { n: string; title: string; body: string }[]> = {
  ar: [
    { n: "01", title: "الصناعات الأساسية", body: "مصانع صغيرة (70%) ومتوسطة (20%) وكبيرة (10%) ترفع القيمة المضافة للموارد المحلية وتُنتج للسوق المحلي والتصدير." },
    { n: "02", title: "المرافق والطاقة", body: "طاقة متجددة (شمسية وكتلة حيوية)، مياه شرب وصناعية، بخار وهواء مضغوط — لاستقلالية تشغيلية كاملة." },
    { n: "03", title: "اللوجستيات وسلاسل الإمداد", body: "مستودعات ذكية ونقل داخلي وخارجي وصيانة متخصصة تربط المجمع بالأسواق المحلية والإقليمية." },
    { n: "04", title: "الدعم المركزي والابتكار", body: "مختبرات جودة (GMP/HACCP)، مركز أبحاث وتطوير، أتمتة وذكاء صناعي، وتقنية معلومات وتشغيل (IT/OT)." },
    { n: "05", title: "الخدمات المجتمعية", body: "سكن العاملين، عيادة صناعية، مركز تدريب، مطعم مركزي، مسجد ومركز ثقافي ورياضي لبيئة عمل جاذبة." },
    { n: "06", title: "البيئة والاقتصاد الدائري", body: "إدارة النفايات الصناعية وإعادة تدويرها، أحزمة خضراء، وبيع فائض الطاقة للشبكة العامة." },
  ],
  en: [
    { n: "01", title: "Core Industries", body: "Small (70%), medium (20%) and large (10%) factories that add value to local resources and serve both local markets and exports." },
    { n: "02", title: "Utilities & Energy", body: "Renewable energy (solar & biomass), potable and industrial water, steam and compressed air — for full operational independence." },
    { n: "03", title: "Logistics & Supply Chain", body: "Smart warehousing, internal and external transport, and specialized maintenance linking the complex to regional markets." },
    { n: "04", title: "Central Support & Innovation", body: "Quality labs (GMP/HACCP), R&D center, industrial automation and AI, and IT/OT operations technology." },
    { n: "05", title: "Community Services", body: "Worker housing, on-site clinic, training center, central canteen, mosque, and cultural & sports center for an attractive workplace." },
    { n: "06", title: "Environment & Circular Economy", body: "Industrial waste management and recycling, green belts, and selling surplus energy back to the public grid." },
  ],
};

export const impactStatsByLang: Record<Lang, { value: string; label: string }[]> = {
  ar: [
    { value: "378", label: "مجمعاً مستهدفاً" },
    { value: "189", label: "محلية في السودان" },
    { value: "17,010", label: "مصنعاً في الشبكة" },
    { value: "40–50", label: "مصنعاً لكل مجمع" },
  ],
  en: [
    { value: "378", label: "Target complexes" },
    { value: "189", label: "Localities across Sudan" },
    { value: "17,010", label: "Factories in the network" },
    { value: "40–50", label: "Factories per complex" },
  ],
};

export const goalsByLang: Record<Lang, { title: string; body: string }[]> = {
  ar: [
    { title: "التحول الصناعي الشامل", body: "إعادة بناء الاقتصاد على أساس التصنيع المحلي والإنتاج الحقيقي بدلاً من تصدير المواد الخام." },
    { title: "التمكين المجتمعي", body: "نقل ملكية وإدارة المصانع إلى المجتمعات الريفية عبر شركات مجتمعية شفافة وعادلة." },
    { title: "الأمن الغذائي والاكتفاء الذاتي", body: "تحقيق الاكتفاء في الأساسيات الخمسة: المأكل والمشرب والملبس والمسكن والعلاج والدواء." },
    { title: "القيمة المضافة العالية", body: "تحويل الخام الوفير في كل منطقة إلى منتج صناعي ينافس عالمياً بمعايير الجودة الدولية." },
    { title: "خلق فرص عمل منتجة", body: "توظيف الشباب والخريجين في صناعات حقيقية داخل مجتمعاتهم والحد من الهجرة إلى المدن." },
    { title: "الاستدامة البيئية", body: "اعتماد الطاقة المتجددة وتطبيق مبادئ الاقتصاد الدائري (Circular Economy)." },
  ],
  en: [
    { title: "Comprehensive Industrial Transformation", body: "Rebuild the economy around local manufacturing and real production instead of raw-material exports." },
    { title: "Community Empowerment", body: "Transfer factory ownership and management to rural communities through fair, transparent community enterprises." },
    { title: "Food Security & Self-Sufficiency", body: "Achieve self-sufficiency in the five essentials: food, water, clothing, shelter, and medicine." },
    { title: "High Value Addition", body: "Turn each region's abundant raw materials into globally competitive industrial products meeting international quality standards." },
    { title: "Productive Job Creation", body: "Employ youth and graduates in real industries within their communities, curbing migration to cities." },
    { title: "Environmental Sustainability", body: "Adopt renewable energy and apply the principles of the Circular Economy." },
  ],
};

// المصانع الرائدة — bilingual
export const pilotFactoriesByLang: Record<Lang, { rank: number; name: string; nameEn: string; note: string }[]> = {
  ar: [
    { rank: 1, name: "مصنع منتجات النخيل", nameEn: "Dates Factory", note: "المصنع الرائد — أولوية قصوى (7 نقاط) لرفع القيمة المضافة لمنتج محلي وفير في الشمالية." },
    { rank: 2, name: "مصنع الأعلاف", nameEn: "Animal Feed", note: "دعم مباشر للثروة الحيوانية والقطاع الزراعي وتعزيز الأمن الغذائي المحلي." },
    { rank: 3, name: "مصنع السماد العضوي والكومبوست", nameEn: "Composite & Organic Fertilizers", note: "يدعم الاستدامة الزراعية ويدمج مبادئ الاقتصاد الدائري بتحويل المخلفات إلى قيمة." },
  ],
  en: [
    { rank: 1, name: "Dates Products Factory", nameEn: "Dates Factory", note: "Flagship factory — top priority (7 points) for adding value to a locally abundant product in the Northern State." },
    { rank: 2, name: "Animal Feed Factory", nameEn: "Animal Feed", note: "Direct support to livestock and agriculture, strengthening local food security." },
    { rank: 3, name: "Organic Fertilizer & Compost Factory", nameEn: "Composite & Organic Fertilizers", note: "Supports agricultural sustainability and embeds circular-economy principles by turning waste into value." },
  ],
};
