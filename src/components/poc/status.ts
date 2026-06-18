import type { UnitStatus, WpCategory, WpStatus } from "@/lib/poc-data";

export const statusColor: Record<UnitStatus, string> = {
  planned: "#9ca3af",
  in_progress: "#077a75",
  done: "#ca943f",
  blocked: "#dc2626",
};

export const statusLabelAr: Record<UnitStatus, string> = {
  planned: "مخطط",
  in_progress: "قيد التنفيذ",
  done: "مكتمل",
  blocked: "متعثر",
};

export const wpStatusLabelAr: Record<WpStatus, string> = statusLabelAr;

export const categoryLabelAr: Record<WpCategory, string> = {
  agreement: "اتفاقيات",
  due_diligence: "عناية واجبة",
  mou: "مذكرات تفاهم",
  procurement: "توريدات",
  civil: "أعمال مدنية",
  training: "تدريب",
};
