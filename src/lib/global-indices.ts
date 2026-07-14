// Sudan's status on the three global indices that drive RSIC's external
// positioning (global, Arab, African, Islamic lenses are produced by filtering
// these baselines). Figures reflect the latest publicly available editions
// that list Sudan; update as new editions are published.

export type GlobalIndex = {
  id: "cip" | "eci" | "aii";
  code: string;
  publisher: string;
  year: number;
  rank: number;
  total: number;
  score?: string;
  sourceUrl: string;
  nameAr: string;
  nameEn: string;
  blurbAr: string;
  blurbEn: string;
};

export const GLOBAL_INDICES: GlobalIndex[] = [
  {
    id: "cip",
    code: "UNIDO CIP",
    publisher: "UNIDO",
    year: 2020,
    rank: 128,
    total: 152,
    score: "0.0089",
    sourceUrl: "https://stat.unido.org/analytical-tools/cip",
    nameAr: "مؤشر الأداء الصناعي التنافسي",
    nameEn: "Competitive Industrial Performance Index",
    blurbAr:
      "يقيس قدرة الدول على إنتاج وتصدير المصنوعات بجودة عالية — المرجع العالمي للتنافسية الصناعية.",
    blurbEn:
      "Measures countries' ability to produce and export manufactured goods competitively — the global benchmark for industrial competitiveness.",
  },
  {
    id: "eci",
    code: "Harvard ECI",
    publisher: "Harvard Growth Lab",
    year: 2022,
    rank: 111,
    total: 133,
    score: "−1.03",
    sourceUrl: "https://atlas.hks.harvard.edu/rankings",
    nameAr: "مؤشر التعقيد الاقتصادي",
    nameEn: "Economic Complexity Index",
    blurbAr:
      "يقيس تنوّع وتعقيد قاعدة المعرفة الإنتاجية للاقتصاد استناداً إلى هيكل الصادرات.",
    blurbEn:
      "Measures the diversity and sophistication of an economy's productive knowledge, inferred from its export structure.",
  },
  {
    id: "aii",
    code: "AfDB AII",
    publisher: "AfDB · AU · UNIDO",
    year: 2022,
    rank: 39,
    total: 52,
    sourceUrl: "https://www.afdb.org/en/documents/africa-industrialization-index-2022",
    nameAr: "مؤشر التصنيع الأفريقي",
    nameEn: "Africa Industrialization Index",
    blurbAr:
      "يرصد أداء التصنيع في 52 دولة أفريقية عبر القيمة المضافة الصناعية والبنية التحتية ورأس المال البشري.",
    blurbEn:
      "Tracks industrial performance across 52 African countries via manufacturing value added, infrastructure, and human capital.",
  },
];

export const SESRIC_CONTEXT = {
  url: "https://www.sesric.org/publications-detail.php?id=597",
  labelAr:
    "سياق العالم الإسلامي: تقرير الآفاق الاقتصادية لمنظمة التعاون الإسلامي (SESRIC)، يستخدم كمرجع سردي للمنظور الإسلامي وليس كمصدر ترتيب ",
  labelEn:
    "Islamic-world context: OIC/SESRIC Economic Outlook — used as a narrative reference for the Islamic lens, not as a ranking source.",
};
