// Nafeer-style crowdfund catalog for /donate.
// Each piece is tied to a Proof-of-Concept work_package_id.

import bricks from "@/assets/catalog/bricks.jpg";
import floor from "@/assets/catalog/floor.jpg";
import door from "@/assets/catalog/door.jpg";
import roller from "@/assets/catalog/roller.jpg";
import sieve from "@/assets/catalog/sieve.jpg";
import siloPanel from "@/assets/catalog/silo-panel.jpg";
import film from "@/assets/catalog/film.jpg";
import jaws from "@/assets/catalog/jaws.jpg";
import motor from "@/assets/catalog/motor.jpg";
import solar from "@/assets/catalog/solar.jpg";
import battery from "@/assets/catalog/battery.jpg";
import trainingRoom from "@/assets/catalog/training-room.jpg";
import toolkit from "@/assets/catalog/toolkit.jpg";
import namedWingAsset from "@/assets/catalog/named-wing.png.asset.json";
const namedWing = namedWingAsset.url;
import cofounder from "@/assets/catalog/cofounder.jpg";

export type CatalogCategory = "equipment" | "infrastructure" | "training" | "named";

export interface CatalogPiece {
  id: string;
  work_package_id: string;
  code: { ar: string; en: string };
  name: { ar: string; en: string };
  price_usd: number;
  category: CatalogCategory;
  quote: { ar: string; en: string };
  image: string;
}

export const catalog: CatalogPiece[] = [
  {
    id: "brick-50",
    work_package_id: "wp5",
    code: { ar: "A19 · مصنع الطوب", en: "A19 · Brick Factory" },
    name: { ar: "٥٠ طابوقة مجتمعية", en: "50 Community Bricks" },
    price_usd: 50,
    category: "infrastructure",
    quote: {
      ar: "صُنعت في دنقلا. لدنقلا. هذه الطوبات تنتجها أول مصانع المجمع، وتُبنى بها كل المصانع التي تليها. المجمع يبني نفسه.",
      en: "Made in Dongola. For Dongola. Produced by the first factory built, used to build all the factories that follow. The RSIC builds itself.",
    },
    image: bricks,
  },
  {
    id: "floor-1m",
    work_package_id: "wp5",
    code: { ar: "أعمال مدنية", en: "Civil Works" },
    name: { ar: "متر مربع أرضية مصنع", en: "Factory Floor — 1 Square Meter" },
    price_usd: 25,
    category: "infrastructure",
    quote: {
      ar: "أنت تضع حرفياً أرض النهضة الصناعية السودانية — متراً مربعاً واحداً في كل مرة.",
      en: "You are literally laying the ground of Sudan's industrial renaissance. One square meter at a time.",
    },
    image: floor,
  },
  {
    id: "door",
    work_package_id: "wp1",
    code: { ar: "أعمال مدنية", en: "Civil Works" },
    name: { ar: "باب مدخل المصنع", en: "Factory Entrance Door" },
    price_usd: 300,
    category: "infrastructure",
    quote: {
      ar: "عبر هذا الباب سيدخل ١٠٠ عامل كل صباح. ومن هذا الباب يبدأ مستقبل الشمالية الصناعي.",
      en: "Through this door, 100 workers will walk every morning. Through this door, Northern State's industrial future begins.",
    },
    image: door,
  },
  {
    id: "mill-roller",
    work_package_id: "wp4",
    code: { ar: "A01 · طاحونة القمح والدقيق", en: "A01 · Wheat & Flour Mill" },
    name: { ar: "قطعة أسطوانة طاحونة", en: "Flour Mill Roller Segment" },
    price_usd: 800,
    category: "equipment",
    quote: {
      ar: "هذه القطعة تطحن ١٠٠ كجم قمح في الساعة. كل ساعة. كل يوم. الشمالية بها مليون نسمة تستورد كل دقيقها — حتى الآن.",
      en: "This segment grinds 100 kg of wheat per hour. Every hour. Every day. Northern State has 1 million people and imports all its flour — until now.",
    },
    image: roller,
  },
  {
    id: "mill-sieve",
    work_package_id: "wp4",
    code: { ar: "A01 · طاحونة القمح والدقيق", en: "A01 · Wheat & Flour Mill" },
    name: { ar: "طقم مناخل الدقيق", en: "Flour Sieve Mesh Set" },
    price_usd: 250,
    category: "equipment",
    quote: {
      ar: "المناخل التي تفصل النخالة عن الدقيق الأبيض النقي. جودة تنافس المستورد بنصف السعر.",
      en: "The screens that separate bran from pure white flour. Quality that rivals imports at half the price.",
    },
    image: sieve,
  },
  {
    id: "silo-panel",
    work_package_id: "wp5",
    code: { ar: "تخزين", en: "Storage" },
    name: { ar: "قطاع لوحة صومعة", en: "Silo Panel Section" },
    price_usd: 600,
    category: "equipment",
    quote: {
      ar: "لوحة واحدة من عشرات. مجتمعةً، تحفظ محصول موسم كامل من التلف والفاقد.",
      en: "One panel of dozens. Together, they protect an entire season's harvest from spoilage and loss.",
    },
    image: siloPanel,
  },
  {
    id: "film-roll",
    work_package_id: "wp6",
    code: { ar: "A23 · التعبئة والتغليف", en: "A23 · Packaging" },
    name: { ar: "بكرة فيلم الختم الحراري (٥٠٠م)", en: "Heat-Seal Film Roll (500m)" },
    price_usd: 75,
    category: "equipment",
    quote: {
      ar: "٥٠٠ متر من مواد التغليف. ٢٠٠٠ منتج مغلّف ومختوم وجاهز للسوق.",
      en: "500 meters of packaging. 2,000 products sealed, branded, and ready for market.",
    },
    image: film,
  },
  {
    id: "sealer-jaws",
    work_package_id: "wp6",
    code: { ar: "A23 · التعبئة والتغليف", en: "A23 · Packaging" },
    name: { ar: "فكوك ماكينة الختم", en: "Heat Sealer Jaw Set" },
    price_usd: 400,
    category: "equipment",
    quote: {
      ar: "الفك الذي يختم الكيس. كل تمرة، كل جرام دقيق، كل ذرة توابل تُباع من دنقلا تمر عبر فكوك كهذه.",
      en: "The jaws that seal the bag. Every date, every gram of flour, every pinch of spice sold from Dongola passes through jaws like these.",
    },
    image: jaws,
  },
  {
    id: "conveyor-motor",
    work_package_id: "wp6",
    code: { ar: "A23 · التعبئة والتغليف", en: "A23 · Packaging" },
    name: { ar: "محرك سير التعبئة", en: "Bag Conveyor Motor" },
    price_usd: 1200,
    category: "equipment",
    quote: {
      ar: "المحرك الذي يحرك خط التعبئة بأكمله. عندما يدور هذا المحرك، تعمل مصانع بأكملها.",
      en: "The motor that drives the entire packaging line. When it turns, whole factories run.",
    },
    image: motor,
  },
  {
    id: "solar-400",
    work_package_id: "wp8",
    code: { ar: "بنية تحتية للطاقة", en: "Utilities Infrastructure" },
    name: { ar: "لوح طاقة شمسية (٤٠٠ وات)", en: "Solar Panel (400W)" },
    price_usd: 1200,
    category: "equipment",
    quote: {
      ar: "هذا اللوح يولد كهرباء نظيفة لخمسة وعشرين عاماً قادمة. تحت شمس دنقلا، يشغّل الآلات التي تصنع المنتجات التي تغيّر الحياة.",
      en: "This panel generates clean electricity for the next 25 years. Under the Dongola sun, it powers the machines that make the products that change lives.",
    },
    image: solar,
  },
  {
    id: "battery-mod",
    work_package_id: "wp8",
    code: { ar: "بنية تحتية للطاقة", en: "Utilities Infrastructure" },
    name: { ar: "وحدة تخزين البطاريات", en: "Battery Storage Module" },
    price_usd: 2500,
    category: "equipment",
    quote: {
      ar: "طاقة الشمس لا تغيب. البطاريات تحفظ نهار دنقلا لتضيء الليل وتشغّل الخطوط بلا انقطاع.",
      en: "The sun doesn't set. Batteries store Dongola's day to light the night and run the lines uninterrupted.",
    },
    image: battery,
  },
  {
    id: "training-room",
    work_package_id: "wp7",
    code: { ar: "مركز التدريب", en: "Training Center" },
    name: { ar: "غرفة تدريب ١٠ مقاعد", en: "Training Room — 10-Seat Setup" },
    price_usd: 2000,
    category: "training",
    quote: {
      ar: "حيث يتعلم ٥٠ شخصاً كيفية تشغيل مصنع. حيث يصبح متطوعو النفير قوة عاملة صناعية مدرَّبة. مقاعدك، مستقبلهم.",
      en: "Where 50 people will learn to run a factory. Where the Nafeer volunteer pool becomes a trained industrial workforce. Your desks, their future.",
    },
    image: trainingRoom,
  },
  {
    id: "toolkit",
    work_package_id: "wp7",
    code: { ar: "مركز التدريب", en: "Training Center" },
    name: { ar: "طقم أدوات متدرب", en: "Trainee Toolkit" },
    price_usd: 150,
    category: "training",
    quote: {
      ar: "الأدوات الأولى لفنّي صناعي في بداية طريقه. تُصاحبه من ورشة التدريب إلى أرض المصنع.",
      en: "The first tools for a young industrial technician. They travel with them from the training workshop to the factory floor.",
    },
    image: toolkit,
  },
  {
    id: "named-wing",
    work_package_id: "wp3",
    code: { ar: "شراكة باسمك", en: "Named Partnership" },
    name: { ar: "جناح مصنع باسمك", en: "Named Factory Wing" },
    price_usd: 25000,
    category: "named",
    quote: {
      ar: "جناح في مصنع مجتمعي باسمك — أو باسم عائلتك، أو باسم مدينتك. تكريم دائم على جدار المصنع لأكثر من عشرين عاماً.",
      en: "A wing of a community-owned factory, in your name — or your family's name, or your city's name. Permanent recognition on the factory wall for 20+ years.",
    },
    image: namedWing,
  },
  {
    id: "cofounder",
    work_package_id: "wp2",
    code: { ar: "شراكة باسمك", en: "Named Partnership" },
    name: { ar: "مؤسس مشارك لكيان الخدمات المركزية", en: "Central Service Entity Co-Founder" },
    price_usd: 50000,
    category: "named",
    quote: {
      ar: "١٤ كياناً للخدمات المركزية تولّد إيراداً من اليوم الأول. كمؤسس مشارك، يقترن اسمك بأحدها — الورشة، أو مركز الابتكار، أو سلسلة التبريد.",
      en: "14 central service entities generate revenue from Day 1. As co-founder, your name is associated with one of them — the workshop, the innovation hub, the cold chain.",
    },
    image: cofounder,
  },
];

export const priceBuckets = [
  { id: "u100", max: 100 },
  { id: "u1k", max: 1000 },
  { id: "u10k", max: 10000 },
  { id: "any", max: Infinity },
] as const;

export type PriceBucketId = (typeof priceBuckets)[number]["id"];

export function inBucket(price: number, bucket: PriceBucketId | undefined): boolean {
  if (!bucket || bucket === "any") return true;
  const b = priceBuckets.find((x) => x.id === bucket);
  return b ? price <= b.max : true;
}
