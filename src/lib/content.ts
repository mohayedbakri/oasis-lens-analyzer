// Placeholder bilingual content for blog/news/reports. Will be replaced by a CMS later.

import type { Lang } from "./i18n";

type News = { id: string; date: string; title: string; excerpt: string; body: string[] };
type Article = {
  id: string;
  date: string;
  author: string;
  title: string;
  excerpt: string;
  body: string[];
};
type Report = { id: string; date: string; title: string; description: string; url: string; pages: number };

export const newsByLang: Record<Lang, News[]> = {
  ar: [
    {
      id: "n1",
      date: "2026-06-10",
      title: "إطلاق المرحلة التجريبية في محلية البرقيق – الشمالية",
      excerpt: "بدء أعمال التأسيس للمجمع الرائد ومصنع منتجات النخيل كأول مصنع تشغيلي.",
      body: [
        "أعلنت مبادرة المجمعات الصناعية الريفية المجتمعية عن انطلاق المرحلة التجريبية في محلية البرقيق بالولاية الشمالية، وذلك ببدء أعمال التأسيس للمجمع الرائد الذي يمثل النموذج الأول للتحول الصناعي القاعدي في السودان.",
        "يضم المجمع في مرحلته الأولى مصنعاً متكاملاً لمنتجات النخيل، يستفيد من الميزة النسبية للمنطقة في زراعة التمور، ويوفر قيمة مضافة عبر التصنيع والتعبئة والتسويق تحت علامة تجارية موحدة.",
        "ويُعدّ هذا المصنع أول وحدة تشغيلية ضمن حزمة عمل PoC-01، ويهدف إلى إثبات مفهوم النموذج قبل التوسع إلى بقية المجمعات المخططة على مستوى الولايات.",
      ],
    },
    {
      id: "n2",
      date: "2026-05-22",
      title: "توقيع مذكرة تفاهم مع جامعة وادي النيل",
      excerpt: "شراكة بحثية لتطوير مختبرات الجودة ومراكز التدريب الصناعي.",
      body: [
        "وقّعت المبادرة مذكرة تفاهم مع جامعة وادي النيل لتأسيس شراكة بحثية طويلة المدى تشمل تطوير مختبرات ضبط الجودة وإنشاء مراكز تدريب صناعي متخصصة.",
        "تتضمن الشراكة برامج تدريب مشتركة للكوادر المحلية، وأبحاث تطبيقية على السلاسل القيمية الزراعية-الصناعية، ودعم فني مستمر للمجمعات في مرحلتي التأسيس والتشغيل.",
      ],
    },
    {
      id: "n3",
      date: "2026-05-01",
      title: "ورشة عمل مع مجالس المجتمع المحلي",
      excerpt: "نقاش نموذج الشركات المجتمعية وآليات الحوكمة الشفافة.",
      body: [
        "عقدت المبادرة ورشة عمل موسعة مع مجالس المجتمع المحلي في محلية البرقيق لمناقشة تفاصيل نموذج الشركات المجتمعية وآليات الحوكمة الشفافة.",
        "استعرضت الورشة هيكل الملكية المجتمعية، وآلية اختيار مجالس الإدارة، وسياسات توزيع الأرباح، وتم فتح باب النقاش لتلقي ملاحظات ممثلي المجتمع قبل اعتماد النموذج النهائي.",
      ],
    },
  ],
  en: [
    {
      id: "n1",
      date: "2026-06-10",
      title: "Pilot phase launched in Al-Burgig — Northern State",
      excerpt: "Groundbreaking for the flagship complex and the dates products factory as the first operational unit.",
      body: [
        "The Rural Social Industrial Complexes initiative has officially launched its pilot phase in Al-Burgig locality, Northern State, breaking ground on the flagship complex that will serve as the first model of community-led industrial transformation in Sudan.",
        "In its first stage the complex will host an integrated dates products factory, leveraging the region's comparative advantage in date cultivation and adding value through processing, packaging, and marketing under a unified brand.",
        "This factory is the first operational unit within work package PoC-01, and aims to prove out the model before scaling to the remaining complexes planned across the states.",
      ],
    },
    {
      id: "n2",
      date: "2026-05-22",
      title: "MoU signed with Wadi El-Neel University",
      excerpt: "A research partnership to develop quality labs and industrial training centers.",
      body: [
        "The initiative has signed a memorandum of understanding with Wadi El-Neel University to establish a long-term research partnership focused on quality-control labs and specialized industrial training centers.",
        "The partnership covers joint training programs for local staff, applied research on agri-industrial value chains, and ongoing technical support for the complexes during both setup and operations.",
      ],
    },
    {
      id: "n3",
      date: "2026-05-01",
      title: "Workshop with local community councils",
      excerpt: "Discussion of the community-enterprise model and transparent governance mechanisms.",
      body: [
        "The initiative held an extended workshop with local community councils in Al-Burgig to discuss the community-enterprise model and its transparent governance mechanisms in detail.",
        "The workshop reviewed the community ownership structure, board selection procedures, and profit distribution policies, and opened the floor to feedback from community representatives before the model is finalized.",
      ],
    },
  ],
};

export const articlesByLang: Record<Lang, Article[]> = {
  ar: [
    {
      id: "a1",
      date: "2026-06-01",
      author: "فريق المبادرة",
      title: "لماذا الصناعة الريفية المجتمعية الآن؟",
      excerpt: "قراءة في اللحظة التاريخية التي يمر بها السودان، والفرصة لإعادة بناء الاقتصاد من القاعدة الريفية.",
      body: [
        "يمر السودان بلحظة تاريخية فارقة تتطلب إعادة التفكير في نموذج التنمية الاقتصادية من جذوره. النموذج التقليدي القائم على مركزية الصناعة في العاصمة أثبت فشله في تحقيق تنمية عادلة ومستدامة.",
        "تُقدّم مبادرة المجمعات الصناعية الريفية المجتمعية إجابة عملية لهذا التحدي، عبر نقل الصناعة إلى حيث توجد المواد الخام والقوى العاملة، بدلاً من هجرة السكان إلى المدن.",
        "بهذا النموذج، نستطيع الاستفادة من 220 مليون فدان من الأراضي الزراعية، ومن نسبة الشباب التي تتجاوز 60% من السكان، لإعادة بناء اقتصاد صناعي قاعدته المجتمع المحلي.",
      ],
    },
    {
      id: "a2",
      date: "2026-05-15",
      author: "د. الأمين",
      title: "الاقتصاد الدائري في المجمعات الصناعية الريفية",
      excerpt: "كيف تتحول النفايات الصناعية إلى مدخلات إنتاج وقيمة مضافة في النموذج المقترح.",
      body: [
        "يُعدّ الاقتصاد الدائري أحد الأركان الأساسية في تصميم المجمعات الصناعية الريفية، حيث تُصمَّم المصانع لتتبادل المخرجات والمدخلات في دورة إنتاجية متكاملة.",
        "على سبيل المثال، نواة التمر ومخلفات النخيل في مصنع منتجات النخيل تتحول إلى علف حيواني في مصنع الأعلاف، ومخلفات معاصر الزيوت تُستخدم في إنتاج الطاقة الحيوية.",
        "هذا النموذج يقلل التكاليف التشغيلية، يرفع الكفاءة الإنتاجية، ويحوّل النفايات إلى مصدر دخل إضافي للمجمع والمجتمع المحلي.",
      ],
    },
    {
      id: "a3",
      date: "2026-04-28",
      author: "م. خالد",
      title: "نموذج الشركة المجتمعية: الملكية والحوكمة",
      excerpt: "تفصيل لهيكل الملكية المجتمعية وآليات اتخاذ القرار وتوزيع الأرباح.",
      body: [
        "الشركة المجتمعية هي الشكل القانوني الذي تتبناه المبادرة لكل مجمع صناعي. تجمع بين كفاءة القطاع الخاص والملكية الجماعية للمجتمع المحلي.",
        "تُوزَّع الأسهم بين مساهمين من أبناء المحلية، مع سقف أعلى لملكية الفرد لضمان عدم تركز القرار. مجلس الإدارة يُنتخب من قِبَل المساهمين وممثلي المجالس المحلية.",
        "توزيع الأرباح يخضع لسياسة معلنة تشمل إعادة الاستثمار، توزيعات على المساهمين، ونسبة للتنمية المجتمعية في المحلية.",
      ],
    },
  ],
  en: [
    {
      id: "a1",
      date: "2026-06-01",
      author: "Initiative team",
      title: "Why community-led rural industry, now?",
      excerpt: "A reading of Sudan's historic moment and the chance to rebuild the economy from its rural base.",
      body: [
        "Sudan is passing through a defining historical moment that demands rethinking the development model from its roots. The legacy model of centralizing industry in the capital has failed to deliver equitable, sustainable growth.",
        "The Rural Social Industrial Complexes initiative offers a practical answer: bring industry to where the raw materials and workforce already are, instead of forcing people to migrate to cities.",
        "With this model, we can activate 220 million acres of farmland and a youth population exceeding 60% of the country to rebuild an industrial economy anchored in the local community.",
      ],
    },
    {
      id: "a2",
      date: "2026-05-15",
      author: "Dr. Al-Amin",
      title: "The circular economy inside rural industrial complexes",
      excerpt: "How industrial by-products become inputs and added value in the proposed model.",
      body: [
        "The circular economy is a core pillar of RSIC's design. Factories inside each complex are engineered to exchange outputs and inputs in an integrated production loop.",
        "For example, date pits and palm residues from the dates factory become feedstock for the animal feed plant, and oil-press residues fuel a bioenergy line.",
        "This model lowers operating costs, raises overall productivity, and turns what would be waste into an additional revenue stream for both the complex and the surrounding community.",
      ],
    },
    {
      id: "a3",
      date: "2026-04-28",
      author: "Eng. Khaled",
      title: "The community-enterprise model: ownership and governance",
      excerpt: "A breakdown of community ownership structure, decision-making, and profit distribution.",
      body: [
        "The community enterprise is the legal form the initiative adopts for every complex. It combines the discipline of the private sector with collective ownership by the surrounding community.",
        "Shares are distributed among shareholders from the locality, with an upper cap per individual to prevent concentration of control. The board is elected by shareholders together with local council representatives.",
        "Profit distribution follows a publicly declared policy that covers reinvestment, shareholder dividends, and a fixed allocation to community development in the locality.",
      ],
    },
  ],
};

export const reportsByLang: Record<Lang, Report[]> = {
  ar: [
    { id: "r1", date: "2026-06-01", title: "الملف التعريفي للمبادرة", description: "نظرة شاملة على مبادرة المجمعات الصناعية الريفية المجتمعية وأركانها الستة.", url: "https://www.africau.edu/images/default/sample.pdf", pages: 42 },
    { id: "r2", date: "2026-04-15", title: "دراسة الجدوى — محلية البرقيق", description: "تحليل اقتصادي واجتماعي للمجمع الرائد في الولاية الشمالية.", url: "https://www.africau.edu/images/default/sample.pdf", pages: 88 },
  ],
  en: [
    { id: "r1", date: "2026-06-01", title: "Initiative Profile Document", description: "A comprehensive overview of the RSIC initiative and its six pillars.", url: "https://www.africau.edu/images/default/sample.pdf", pages: 42 },
    { id: "r2", date: "2026-04-15", title: "Feasibility Study — Al-Burgig Locality", description: "Economic and social analysis of the flagship complex in the Northern State.", url: "https://www.africau.edu/images/default/sample.pdf", pages: 88 },
  ],
};

export const social = [
  { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { name: "X", href: "https://x.com", icon: "x" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { name: "TikTok", href: "https://tiktok.com", icon: "tiktok" },
  { name: "YouTube", href: "https://youtube.com", icon: "youtube" },
] as const;
