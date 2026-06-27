import type { UnitStatus, WpCategory, WpStatus } from "@/lib/poc-data";
import { useI18n, type Lang } from "@/lib/i18n";

export const statusColor: Record<UnitStatus, string> = {
  planned: "#9ca3af",
  in_progress: "#077a75",
  done: "#ca943f",
  blocked: "#dc2626",
};

const statusLabel: Record<Lang, Record<UnitStatus, string>> = {
  ar: { planned: "مخطط", in_progress: "قيد التنفيذ", done: "مكتمل", blocked: "متعثر" },
  en: { planned: "Planned", in_progress: "In progress", done: "Completed", blocked: "Blocked" },
};

const categoryLabel: Record<Lang, Record<WpCategory, string>> = {
  ar: {
    agreement: "اتفاقيات",
    due_diligence: "عناية واجبة",
    mou: "مذكرات تفاهم",
    procurement: "توريدات",
    civil: "أعمال مدنية",
    training: "تدريب",
  },
  en: {
    agreement: "Agreements",
    due_diligence: "Due diligence",
    mou: "MoUs",
    procurement: "Procurement",
    civil: "Civil works",
    training: "Training",
  },
};

// Back-compat exports (kept for any imports that haven't migrated yet)
export const statusLabelAr = statusLabel.ar;
export const wpStatusLabelAr: Record<WpStatus, string> = statusLabel.ar;
export const categoryLabelAr = categoryLabel.ar;

export function useStatusLabels() {
  const { lang } = useI18n();
  return {
    status: statusLabel[lang],
    wpStatus: statusLabel[lang] as Record<WpStatus, string>,
    category: categoryLabel[lang],
  };
}
