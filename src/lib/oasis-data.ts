// Oasis Lens Analyzer — national dashboard data (seeded).
// Structured for a future swap to Google Sheets like poc-data.ts.

import statesJson from "./geo/sudan-states.json";
import type { Lang } from "./i18n";

export type StageId = "feasibility" | "planning" | "financing" | "build" | "operate" | "scale";
export type TaskStatus = "planned" | "running" | "done" | "blocked";
export type ResourceKind = "agri" | "mineral" | "livestock" | "energy" | "coastal";

export type SudanState = {
  id: string;
  en: string;
  ar: string;
  d: string;
  cx: number;
  cy: number;
};

export const SUDAN_STATES: SudanState[] = statesJson as SudanState[];

export type StageMeta = {
  id: StageId;
  order: number;
  ar: string;
  en: string;
  descAr: string;
  descEn: string;
};

export const ROADMAP_STAGES: StageMeta[] = [
  {
    id: "feasibility",
    order: 1,
    ar: "دراسة الجدوى",
    en: "Feasibility",
    descAr: "مسح الموارد والاحتياجات ودراسات الجدوى الأولية.",
    descEn: "Resource and needs assessment, and preliminary feasibility studies.",
  },
  {
    id: "planning",
    order: 2,
    ar: "التخطيط",
    en: "Planning",
    descAr: "التصميم الهندسي، اختيار المصانع، وخطط التشغيل.",
    descEn: "Engineering design, factory mix selection, and operational plans.",
  },
  {
    id: "financing",
    order: 3,
    ar: "التمويل",
    en: "Financing",
    descAr: "التمويل المختلط: النفير، المنح، والاستثمار المسؤول.",
    descEn: "Blended finance: Nafeer, grants, and responsible investment.",
  },
  {
    id: "build",
    order: 4,
    ar: "التنفيذ",
    en: "Build",
    descAr: "الأعمال المدنية وتركيب المعدات والتشغيل التجريبي.",
    descEn: "Civil works, equipment installation, and commissioning.",
  },
  {
    id: "operate",
    order: 5,
    ar: "التشغيل",
    en: "Operate",
    descAr: "الإنتاج الفعلي وإدارة المصانع من قبل الشركة المجتمعية.",
    descEn: "Live production and factory operation by the Community Enterprise.",
  },
  {
    id: "scale",
    order: 6,
    ar: "التوسع",
    en: "Scale",
    descAr: "توسعة الشبكة إلى محليات وولايات جديدة.",
    descEn: "Network expansion to new localities and states.",
  },
];

// ─── Per-state metadata (resources, activities, KPIs, maturity, stage) ───

export type StateData = {
  stage: StageId;
  maturity: number; // 0..1
  resources: ResourceKind[];
  activitiesAr: string[];
  activitiesEn: string[];
  opportunitiesAr: string[];
  opportunitiesEn: string[];
  targetComplexes: number;
  activeFactories: number;
  smeIndex: number; // 0..100
};

export const STATE_DATA: Record<string, StateData> = {
  northern: {
    stage: "build",
    maturity: 0.78,
    resources: ["agri", "mineral"],
    activitiesAr: ["مصنع التمور الرائد (البرقيق)", "معالجة الفول والقمح", "طاقة شمسية 2 ميجاواط"],
    activitiesEn: ["Al-Burgig flagship dates factory", "Bean and wheat processing", "2 MW solar"],
    opportunitiesAr: ["توسعة سلاسل التمور", "تعدين ذهب مجتمعي", "صناعات جلدية"],
    opportunitiesEn: ["Date value-chain expansion", "Community gold refining", "Leather industries"],
    targetComplexes: 22,
    activeFactories: 7,
    smeIndex: 62,
  },
  river_nile: {
    stage: "planning",
    maturity: 0.55,
    resources: ["agri", "mineral"],
    activitiesAr: ["مصانع أسمنت وحديد", "زراعة أعلاف", "تعدين حديد بربر"],
    activitiesEn: ["Cement & steel mills", "Fodder cultivation", "Berber iron mining"],
    opportunitiesAr: ["تكرير معادن محلي", "بنية لوجستية عبر بورتسودان"],
    opportunitiesEn: ["Local mineral refining", "Logistics link to Port Sudan"],
    targetComplexes: 28, activeFactories: 4, smeIndex: 58,
  },
  red_sea: {
    stage: "planning",
    maturity: 0.5,
    resources: ["coastal", "mineral"],
    activitiesAr: ["ميناء بورتسودان", "تصدير الماشية", "صيد بحري"],
    activitiesEn: ["Port Sudan trade", "Livestock export", "Marine fisheries"],
    opportunitiesAr: ["مصانع تعليب أسماك", "طاقة رياح ساحلية", "تكرير ملح"],
    opportunitiesEn: ["Fish canning", "Coastal wind energy", "Salt refining"],
    targetComplexes: 18, activeFactories: 2, smeIndex: 47,
  },
  khartoum: {
    stage: "financing",
    maturity: 0.62,
    resources: ["agri"],
    activitiesAr: ["مركز تدريب مهني وطني", "مصانع تجميع خفيفة"],
    activitiesEn: ["National vocational training hub", "Light assembly plants"],
    opportunitiesAr: ["مركز أبحاث وتقنية", "تصميم صناعي"],
    opportunitiesEn: ["Applied R&D center", "Industrial design"],
    targetComplexes: 12, activeFactories: 3, smeIndex: 71,
  },
  kassala: {
    stage: "feasibility",
    maturity: 0.32,
    resources: ["agri", "livestock"],
    activitiesAr: ["الصمغ العربي", "الحبوب الزيتية"],
    activitiesEn: ["Gum arabic", "Oil seeds"],
    opportunitiesAr: ["مصانع زيوت", "تجهيز صمغ"],
    opportunitiesEn: ["Oil-pressing", "Gum processing"],
    targetComplexes: 20, activeFactories: 1, smeIndex: 38,
  },
  gedaref: {
    stage: "feasibility",
    maturity: 0.36,
    resources: ["agri"],
    activitiesAr: ["السمسم والذرة", "مطاحن أعلاف"],
    activitiesEn: ["Sesame & sorghum", "Feed mills"],
    opportunitiesAr: ["مصانع سمسم متكاملة", "صوامع تخزين"],
    opportunitiesEn: ["Integrated sesame plants", "Storage silos"],
    targetComplexes: 24, activeFactories: 1, smeIndex: 41,
  },
  gezira: {
    stage: "planning",
    maturity: 0.58,
    resources: ["agri"],
    activitiesAr: ["مشروع الجزيرة", "قطن ومنسوجات"],
    activitiesEn: ["Gezira scheme", "Cotton & textiles"],
    opportunitiesAr: ["إحياء المنسوجات", "تصنيع أغذية"],
    opportunitiesEn: ["Textile revival", "Food processing"],
    targetComplexes: 30, activeFactories: 3, smeIndex: 55,
  },
  sennar: {
    stage: "feasibility",
    maturity: 0.28,
    resources: ["agri", "energy"],
    activitiesAr: ["السكر", "الكهرباء المائية"],
    activitiesEn: ["Sugar", "Hydropower"],
    opportunitiesAr: ["مشتقات السكر", "شبكة ري ذكية"],
    opportunitiesEn: ["Sugar derivatives", "Smart irrigation"],
    targetComplexes: 16, activeFactories: 1, smeIndex: 34,
  },
  blue_nile: {
    stage: "feasibility",
    maturity: 0.22,
    resources: ["agri", "livestock"],
    activitiesAr: ["الأخشاب", "الرعي"],
    activitiesEn: ["Timber", "Pastoralism"],
    opportunitiesAr: ["أثاث ريفي", "منتجات ألبان"],
    opportunitiesEn: ["Rural furniture", "Dairy products"],
    targetComplexes: 14, activeFactories: 0, smeIndex: 26,
  },
  white_nile: {
    stage: "planning",
    maturity: 0.42,
    resources: ["agri", "livestock"],
    activitiesAr: ["ألبان ولحوم", "الفول السوداني"],
    activitiesEn: ["Dairy & meat", "Groundnuts"],
    opportunitiesAr: ["مصانع ألبان", "زبدة فول سوداني"],
    opportunitiesEn: ["Dairy plants", "Peanut butter lines"],
    targetComplexes: 22, activeFactories: 2, smeIndex: 44,
  },
  north_kordofan: {
    stage: "feasibility",
    maturity: 0.3,
    resources: ["agri", "livestock"],
    activitiesAr: ["الصمغ العربي", "الإبل"],
    activitiesEn: ["Gum arabic", "Camels"],
    opportunitiesAr: ["مصنع صمغ متكامل", "منتجات إبل"],
    opportunitiesEn: ["Integrated gum plant", "Camel-derived products"],
    targetComplexes: 26, activeFactories: 1, smeIndex: 36,
  },
  south_kordofan: {
    stage: "feasibility",
    maturity: 0.2,
    resources: ["agri", "mineral"],
    activitiesAr: ["الذرة", "الكروم"],
    activitiesEn: ["Sorghum", "Chromium"],
    opportunitiesAr: ["مطاحن ذرة", "تعدين كروم"],
    opportunitiesEn: ["Sorghum mills", "Chromium refining"],
    targetComplexes: 20, activeFactories: 0, smeIndex: 22,
  },
  west_kordofan: {
    stage: "feasibility",
    maturity: 0.24,
    resources: ["agri", "energy"],
    activitiesAr: ["نفط هجليج", "الصمغ"],
    activitiesEn: ["Heglig oil", "Gum arabic"],
    opportunitiesAr: ["بتروكيماويات صغيرة", "طاقة"],
    opportunitiesEn: ["Small petrochemicals", "Energy hub"],
    targetComplexes: 18, activeFactories: 0, smeIndex: 24,
  },
  north_darfur: {
    stage: "feasibility",
    maturity: 0.16,
    resources: ["livestock", "mineral"],
    activitiesAr: ["الرعي", "الملح والذهب"],
    activitiesEn: ["Pastoralism", "Salt & gold"],
    opportunitiesAr: ["ماشية معالجة", "تكرير ذهب"],
    opportunitiesEn: ["Processed livestock", "Gold refining"],
    targetComplexes: 22, activeFactories: 0, smeIndex: 18,
  },
  south_darfur: {
    stage: "feasibility",
    maturity: 0.18,
    resources: ["agri", "livestock"],
    activitiesAr: ["الفول السوداني", "الماشية"],
    activitiesEn: ["Groundnuts", "Livestock"],
    opportunitiesAr: ["مصانع زيوت", "مسالخ"],
    opportunitiesEn: ["Oil plants", "Abattoirs"],
    targetComplexes: 24, activeFactories: 0, smeIndex: 20,
  },
  east_darfur: {
    stage: "feasibility",
    maturity: 0.14,
    resources: ["livestock", "agri"],
    activitiesAr: ["الأبقار", "الحبوب"],
    activitiesEn: ["Cattle", "Grains"],
    opportunitiesAr: ["ألبان", "طواحين"],
    opportunitiesEn: ["Dairy", "Milling"],
    targetComplexes: 18, activeFactories: 0, smeIndex: 16,
  },
  west_darfur: {
    stage: "feasibility",
    maturity: 0.12,
    resources: ["agri", "livestock"],
    activitiesAr: ["الفواكه", "الحبوب"],
    activitiesEn: ["Fruits", "Grains"],
    opportunitiesAr: ["تجفيف فواكه", "معالجة حبوب"],
    opportunitiesEn: ["Fruit drying", "Grain processing"],
    targetComplexes: 16, activeFactories: 0, smeIndex: 14,
  },
  central_darfur: {
    stage: "feasibility",
    maturity: 0.13,
    resources: ["agri"],
    activitiesAr: ["الحبوب", "البقوليات"],
    activitiesEn: ["Grains", "Legumes"],
    opportunitiesAr: ["مطاحن مجتمعية"],
    opportunitiesEn: ["Community mills"],
    targetComplexes: 14, activeFactories: 0, smeIndex: 15,
  },
  abyei_pca: {
    stage: "feasibility",
    maturity: 0.1,
    resources: ["livestock"],
    activitiesAr: ["الرعي"],
    activitiesEn: ["Pastoralism"],
    opportunitiesAr: ["دراسات أولية"],
    opportunitiesEn: ["Initial assessments"],
    targetComplexes: 4, activeFactories: 0, smeIndex: 10,
  },
};

// ─── Per-state indicator overrides (Data Complex Indicators) ───

export type StateIndicators = {
  selfSuff: { dietaryAr: string; dietaryEn: string; clothingAr: string; clothingEn: string; constructionAr: string; constructionEn: string };
  global: { rawAr: string; rawEn: string; starterAr: string; starterEn: string };
};

const INDICATOR_OVERRIDES: Partial<Record<string, StateIndicators>> = {
  northern: {
    selfSuff: { dietaryAr: "تمور، قمح، فول", dietaryEn: "Dates, wheat, beans", clothingAr: "قطن مستورد جزئيًا", clothingEn: "Partially imported cotton", constructionAr: "طوب طيني وحجر نوبي", constructionEn: "Mud brick and Nubian stone" },
    global: { rawAr: "زراعية: تمور، قمح · معدنية: ذهب", rawEn: "Agricultural: dates, wheat · Mineral: gold", starterAr: "معالجة تمور متكاملة، تكرير ذهب مجتمعي، صناعات جلدية", starterEn: "Integrated date processing, community gold refining, leather goods" },
  },
  river_nile: {
    selfSuff: { dietaryAr: "قمح، فول، أعلاف", dietaryEn: "Wheat, beans, fodder", clothingAr: "منسوجات مستوردة", clothingEn: "Imported textiles", constructionAr: "أسمنت محلي وحديد بربر", constructionEn: "Local cement and Berber iron" },
    global: { rawAr: "معدنية: حديد، أسمنت · زراعية: أعلاف", rawEn: "Mineral: iron, cement · Agricultural: fodder", starterAr: "صلب مسطح، مواد بناء مسبقة الصنع، لوجستيات لبورتسودان", starterEn: "Flat steel, prefab building materials, Port Sudan logistics" },
  },
  red_sea: {
    selfSuff: { dietaryAr: "أسماك، حبوب مستوردة", dietaryEn: "Fish, imported grains", clothingAr: "أقمشة ساحلية مستوردة", clothingEn: "Imported coastal fabrics", constructionAr: "حجر مرجاني وأسمنت", constructionEn: "Coral stone and cement" },
    global: { rawAr: "ساحلية: أسماك، ملح · معدنية: فوسفات", rawEn: "Coastal: fisheries, salt · Mineral: phosphate", starterAr: "تعليب أسماك، تكرير ملح، طاقة رياح ساحلية", starterEn: "Fish canning, salt refining, coastal wind energy" },
  },
  khartoum: {
    selfSuff: { dietaryAr: "منتجات مصنّعة، خبز، ألبان", dietaryEn: "Processed foods, bread, dairy", clothingAr: "منسوجات محلية ومستوردة", clothingEn: "Local and imported textiles", constructionAr: "خرسانة وطوب أحمر", constructionEn: "Concrete and red brick" },
    global: { rawAr: "خدمات وتصنيع خفيف", rawEn: "Services and light manufacturing", starterAr: "تصميم صناعي، إلكترونيات مجمّعة، مركز أبحاث تطبيقية", starterEn: "Industrial design, assembled electronics, applied R&D hub" },
  },
  kassala: {
    selfSuff: { dietaryAr: "ذرة، سمسم، حبوب زيتية", dietaryEn: "Sorghum, sesame, oil seeds", clothingAr: "قطن وأنسجة تقليدية", clothingEn: "Cotton and traditional weaves", constructionAr: "طوب طيني وقش", constructionEn: "Mud brick and thatch" },
    global: { rawAr: "زراعية: صمغ عربي، حبوب زيتية · حيوانية: ماشية", rawEn: "Agricultural: gum arabic, oil seeds · Animal: livestock", starterAr: "معاصر زيوت، مصانع صمغ متكاملة، دباغة", starterEn: "Oil pressing, integrated gum plants, tanneries" },
  },
  gedaref: {
    selfSuff: { dietaryAr: "سمسم، ذرة، بقوليات", dietaryEn: "Sesame, sorghum, legumes", clothingAr: "قطن محلي", clothingEn: "Local cotton", constructionAr: "طوب أحمر", constructionEn: "Red brick" },
    global: { rawAr: "زراعية: سمسم، ذرة، أعلاف", rawEn: "Agricultural: sesame, sorghum, feed", starterAr: "زيوت سمسم مكررة، صوامع، أعلاف مركزة", starterEn: "Refined sesame oil, silos, concentrated feed" },
  },
  gezira: {
    selfSuff: { dietaryAr: "قمح، ذرة، خضروات", dietaryEn: "Wheat, sorghum, vegetables", clothingAr: "قطن الجزيرة", clothingEn: "Gezira cotton", constructionAr: "طوب أحمر وأسمنت", constructionEn: "Red brick and cement" },
    global: { rawAr: "زراعية: قطن، قمح · نسيج تاريخي", rawEn: "Agricultural: cotton, wheat · Historic textile base", starterAr: "إحياء المنسوجات، تصنيع أغذية، ملابس جاهزة", starterEn: "Textile revival, food processing, ready-made garments" },
  },
  sennar: {
    selfSuff: { dietaryAr: "سكر، ذرة، فواكه", dietaryEn: "Sugar, sorghum, fruits", clothingAr: "منسوجات مستوردة", clothingEn: "Imported textiles", constructionAr: "طوب وأسمنت", constructionEn: "Brick and cement" },
    global: { rawAr: "زراعية: قصب السكر · طاقة: كهرباء مائية", rawEn: "Agricultural: sugar cane · Energy: hydropower", starterAr: "مشتقات السكر، إيثانول، ري ذكي", starterEn: "Sugar derivatives, ethanol, smart irrigation" },
  },
  blue_nile: {
    selfSuff: { dietaryAr: "ذرة، بقوليات، لحوم", dietaryEn: "Sorghum, legumes, meat", clothingAr: "أقمشة تقليدية", clothingEn: "Traditional fabrics", constructionAr: "خشب وطين وقش", constructionEn: "Timber, mud and thatch" },
    global: { rawAr: "زراعية: أخشاب · حيوانية: ماشية رعوية", rawEn: "Agricultural: timber · Animal: pastoral livestock", starterAr: "أثاث ريفي، منتجات ألبان، خشب مصنّع", starterEn: "Rural furniture, dairy products, engineered wood" },
  },
  white_nile: {
    selfSuff: { dietaryAr: "ألبان، لحوم، فول سوداني", dietaryEn: "Dairy, meat, groundnuts", clothingAr: "قطن ومنسوجات مستوردة", clothingEn: "Cotton and imported textiles", constructionAr: "طوب طيني", constructionEn: "Mud brick" },
    global: { rawAr: "حيوانية: ألبان ولحوم · زراعية: فول سوداني", rawEn: "Animal: dairy & meat · Agricultural: groundnuts", starterAr: "مصانع ألبان، زبدة فول سوداني، مسالخ حديثة", starterEn: "Dairy plants, peanut butter lines, modern abattoirs" },
  },
  north_kordofan: {
    selfSuff: { dietaryAr: "دخن، ذرة، ألبان إبل", dietaryEn: "Millet, sorghum, camel milk", clothingAr: "جلود وأصواف", clothingEn: "Hides and wool", constructionAr: "طين وقش", constructionEn: "Mud and thatch" },
    global: { rawAr: "زراعية: صمغ عربي · حيوانية: إبل", rawEn: "Agricultural: gum arabic · Animal: camels", starterAr: "مصنع صمغ متكامل، منتجات إبل، جلود مدبوغة", starterEn: "Integrated gum plant, camel-derived products, tanned leather" },
  },
  south_kordofan: {
    selfSuff: { dietaryAr: "ذرة، فول سوداني", dietaryEn: "Sorghum, groundnuts", clothingAr: "أقمشة مستوردة", clothingEn: "Imported fabrics", constructionAr: "طوب طيني وحجر", constructionEn: "Mud brick and stone" },
    global: { rawAr: "معدنية: كروم · زراعية: ذرة", rawEn: "Mineral: chromite · Agricultural: sorghum", starterAr: "تكرير كروم، مطاحن ذرة، معادن سبائكية", starterEn: "Chromite beneficiation, sorghum mills, alloy metals" },
  },
  west_kordofan: {
    selfSuff: { dietaryAr: "ذرة، لحوم", dietaryEn: "Sorghum, meat", clothingAr: "مستورد", clothingEn: "Imported", constructionAr: "طين وقش", constructionEn: "Mud and thatch" },
    global: { rawAr: "طاقة: نفط هجليج · زراعية: صمغ", rawEn: "Energy: Heglig oil · Agricultural: gum", starterAr: "بتروكيماويات صغيرة، مركز طاقة إقليمي", starterEn: "Small petrochemicals, regional energy hub" },
  },
  north_darfur: {
    selfSuff: { dietaryAr: "دخن، ألبان، لحوم", dietaryEn: "Millet, dairy, meat", clothingAr: "جلود ومنسوجات مستوردة", clothingEn: "Hides and imported textiles", constructionAr: "طين وقش", constructionEn: "Mud and thatch" },
    global: { rawAr: "معدنية: ذهب وملح · حيوانية: ماشية", rawEn: "Mineral: gold and salt · Animal: livestock", starterAr: "تكرير ذهب صغير النطاق، تجهيز ملح، منتجات لحوم", starterEn: "Small-scale gold refining, salt processing, meat products" },
  },
  south_darfur: {
    selfSuff: { dietaryAr: "فول سوداني، ذرة، لحوم", dietaryEn: "Groundnuts, sorghum, meat", clothingAr: "أقمشة مستوردة", clothingEn: "Imported fabrics", constructionAr: "طين وقش", constructionEn: "Mud and thatch" },
    global: { rawAr: "زراعية: فول سوداني · حيوانية: ماشية", rawEn: "Agricultural: groundnuts · Animal: livestock", starterAr: "معاصر زيوت، مسالخ، دباغة", starterEn: "Oil pressing, abattoirs, tanneries" },
  },
  east_darfur: {
    selfSuff: { dietaryAr: "ألبان، لحوم، حبوب", dietaryEn: "Dairy, meat, grains", clothingAr: "مستورد", clothingEn: "Imported", constructionAr: "طين", constructionEn: "Mud" },
    global: { rawAr: "حيوانية: أبقار · زراعية: حبوب", rawEn: "Animal: cattle · Agricultural: grains", starterAr: "ألبان مبستَرة، مطاحن حبوب", starterEn: "Pasteurised dairy, grain milling" },
  },
  west_darfur: {
    selfSuff: { dietaryAr: "فواكه، حبوب، لحوم", dietaryEn: "Fruits, grains, meat", clothingAr: "أقمشة تقليدية", clothingEn: "Traditional fabrics", constructionAr: "طين وقش", constructionEn: "Mud and thatch" },
    global: { rawAr: "زراعية: فواكه، حبوب", rawEn: "Agricultural: fruits, grains", starterAr: "تجفيف فواكه، عصائر، معالجة حبوب", starterEn: "Fruit drying, juice, grain processing" },
  },
  central_darfur: {
    selfSuff: { dietaryAr: "حبوب، بقوليات", dietaryEn: "Grains, legumes", clothingAr: "أقمشة تقليدية", clothingEn: "Traditional fabrics", constructionAr: "طين وقش", constructionEn: "Mud and thatch" },
    global: { rawAr: "زراعية: حبوب، بقوليات", rawEn: "Agricultural: grains, legumes", starterAr: "مطاحن مجتمعية، تعبئة بقوليات", starterEn: "Community mills, legume packaging" },
  },
  abyei_pca: {
    selfSuff: { dietaryAr: "ألبان ولحوم رعوية", dietaryEn: "Pastoral dairy and meat", clothingAr: "مستورد", clothingEn: "Imported", constructionAr: "قش وطين", constructionEn: "Thatch and mud" },
    global: { rawAr: "حيوانية: ماشية رعوية", rawEn: "Animal: pastoral livestock", starterAr: "دراسات جدوى أولية للمراعي", starterEn: "Initial pastoral feasibility studies" },
  },
};

const RESOURCE_TO_RAW: Record<ResourceKind, { ar: string; en: string }> = {
  agri: { ar: "زراعية", en: "Agricultural" },
  livestock: { ar: "حيوانية", en: "Animal" },
  mineral: { ar: "معدنية/محاجر", en: "Mineral/Quarry" },
  energy: { ar: "طاقة", en: "Energy" },
  coastal: { ar: "ساحلية", en: "Coastal" },
};

export function getStateIndicators(stateId: string): StateIndicators {
  const override = INDICATOR_OVERRIDES[stateId];
  if (override) return override;
  const d = STATE_DATA[stateId];
  const rawAr = d ? d.resources.map((r) => RESOURCE_TO_RAW[r].ar).join(" · ") : "—";
  const rawEn = d ? d.resources.map((r) => RESOURCE_TO_RAW[r].en).join(" · ") : "—";
  return {
    selfSuff: { dietaryAr: "بيانات محلية قيد الإعداد", dietaryEn: "Local data pending", clothingAr: "بيانات محلية قيد الإعداد", clothingEn: "Local data pending", constructionAr: "طين وطوب وحجر", constructionEn: "Mud, brick and stone" },
    global: { rawAr, rawEn, starterAr: d ? d.opportunitiesAr.join("، ") : "—", starterEn: d ? d.opportunitiesEn.join(", ") : "—" },
  };
}


// ─── Tasks (measurable & running) ───

export type Task = {
  id: string;
  ar: string;
  en: string;
  stateId: string;
  stage: StageId;
  status: TaskStatus;
  start: string;
  target: string;
  ownerAr: string;
  ownerEn: string;
  progress: number; // 0..100
  kpiAr: string;
  kpiEn: string;
};

export const TASKS: Task[] = [
  {
    id: "t1", ar: "تشغيل مصنع تمور البرقيق", en: "Commission Al-Burgig dates factory",
    stateId: "northern", stage: "build", status: "running",
    start: "2025-03-01", target: "2026-09-30",
    ownerAr: "الشركة المجتمعية بالشمالية", ownerEn: "Northern Community Enterprise",
    progress: 68, kpiAr: "3 خطوط تعبئة جاهزة من 5", kpiEn: "3 of 5 packing lines ready",
  },
  {
    id: "t2", ar: "دراسة جدوى مجمع القضارف للسمسم", en: "Sesame complex feasibility — Gedaref",
    stateId: "gedaref", stage: "feasibility", status: "running",
    start: "2026-01-15", target: "2026-11-30",
    ownerAr: "فريق التخطيط الوطني", ownerEn: "National planning team",
    progress: 42, kpiAr: "4 من 7 دراسات مكتملة", kpiEn: "4 of 7 studies complete",
  },
  {
    id: "t3", ar: "إغلاق جولة تمويل نفير للخرطوم", en: "Close Nafeer funding round — Khartoum",
    stateId: "khartoum", stage: "financing", status: "running",
    start: "2026-04-01", target: "2026-12-15",
    ownerAr: "مكتب الحوكمة والتمويل", ownerEn: "Governance & Finance Office",
    progress: 55, kpiAr: "1.1 من 2 مليون دولار", kpiEn: "$1.1M of $2M pledged",
  },
  {
    id: "t4", ar: "تصميم شبكة صمغ عربي بشمال كردفان", en: "Design gum arabic network — N. Kordofan",
    stateId: "north_kordofan", stage: "planning", status: "planned",
    start: "2026-08-01", target: "2027-02-28",
    ownerAr: "المجلس المجتمعي بكردفان", ownerEn: "Kordofan Community Council",
    progress: 8, kpiAr: "المخطط الأولي في المراجعة", kpiEn: "Master plan under review",
  },
  {
    id: "t5", ar: "تركيب طاقة شمسية 500 ك.و بالبرقيق", en: "Install 500 kW solar — Al-Burgig",
    stateId: "northern", stage: "build", status: "done",
    start: "2025-11-01", target: "2026-05-01",
    ownerAr: "شركة الطاقة المجتمعية", ownerEn: "Community Energy Co.",
    progress: 100, kpiAr: "500 ك.و متصلة بالشبكة", kpiEn: "500 kW online",
  },
  {
    id: "t6", ar: "توقيع مذكرة تفاهم — نهر النيل", en: "MoU signing — River Nile",
    stateId: "river_nile", stage: "planning", status: "running",
    start: "2026-05-15", target: "2026-10-01",
    ownerAr: "حكومة الولاية", ownerEn: "State government",
    progress: 60, kpiAr: "3 من 5 أطراف وقّعوا", kpiEn: "3 of 5 parties signed",
  },
  {
    id: "t7", ar: "مسح موارد ولاية سنار", en: "Sennar resource survey",
    stateId: "sennar", stage: "feasibility", status: "planned",
    start: "2026-09-01", target: "2027-03-30",
    ownerAr: "الجامعات الشريكة", ownerEn: "Partner universities",
    progress: 0, kpiAr: "لم يبدأ", kpiEn: "Not started",
  },
  {
    id: "t8", ar: "شراء معدات مصنع أعلاف الجزيرة", en: "Procure Gezira feed-mill equipment",
    stateId: "gezira", stage: "financing", status: "blocked",
    start: "2026-03-01", target: "2026-08-30",
    ownerAr: "لجنة المشتريات", ownerEn: "Procurement committee",
    progress: 25, kpiAr: "في انتظار الترخيص", kpiEn: "Awaiting import licence",
  },
  {
    id: "t9", ar: "تدريب 60 فنياً في البرقيق", en: "Train 60 technicians in Al-Burgig",
    stateId: "northern", stage: "operate", status: "running",
    start: "2026-02-01", target: "2026-10-30",
    ownerAr: "مركز التدريب المهني", ownerEn: "Vocational training center",
    progress: 72, kpiAr: "43 من 60 متدرباً", kpiEn: "43 of 60 trainees enrolled",
  },
  {
    id: "t10", ar: "تشغيل مصنع تعليب أسماك بورتسودان", en: "Launch Port Sudan fish canning plant",
    stateId: "red_sea", stage: "build", status: "planned",
    start: "2026-11-01", target: "2027-09-30",
    ownerAr: "الشركة المجتمعية بالبحر الأحمر", ownerEn: "Red Sea Community Enterprise",
    progress: 5, kpiAr: "الموقع محدد", kpiEn: "Site selected",
  },
  {
    id: "t11", ar: "توسعة شبكة كسلا للحبوب الزيتية", en: "Scale Kassala oil-seed network",
    stateId: "kassala", stage: "scale", status: "planned",
    start: "2027-01-01", target: "2028-06-30",
    ownerAr: "مجلس المبادرة", ownerEn: "Initiative council",
    progress: 0, kpiAr: "قيد الجدولة", kpiEn: "Scheduling",
  },
  {
    id: "t12", ar: "بدء إنتاج مطحنة البرقيق للدقيق", en: "Begin Al-Burgig flour mill production",
    stateId: "northern", stage: "operate", status: "running",
    start: "2026-06-01", target: "2026-12-31",
    ownerAr: "إدارة تشغيل البرقيق", ownerEn: "Al-Burgig operations",
    progress: 34, kpiAr: "خطان من 4 يعملان", kpiEn: "2 of 4 lines producing",
  },
];

// ─── i18n helpers ───

export function pickState(s: SudanState, lang: Lang) {
  return lang === "ar" ? s.ar : s.en;
}
export function pickStage(s: StageMeta, lang: Lang) {
  return lang === "ar" ? s.ar : s.en;
}
export function pickStageDesc(s: StageMeta, lang: Lang) {
  return lang === "ar" ? s.descAr : s.descEn;
}
export function taskTitle(t: Task, lang: Lang) {
  return lang === "ar" ? t.ar : t.en;
}
export function taskOwner(t: Task, lang: Lang) {
  return lang === "ar" ? t.ownerAr : t.ownerEn;
}
export function taskKpi(t: Task, lang: Lang) {
  return lang === "ar" ? t.kpiAr : t.kpiEn;
}
