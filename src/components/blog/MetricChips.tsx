import { Eye, Heart, MessageCircle } from "lucide-react";
import { useMetrics, type Kind } from "@/lib/metrics";
import { useI18n } from "@/lib/i18n";

type Props = {
  kind: Kind;
  id: string;
  interactive?: boolean;
  size?: "sm" | "md";
  onCommentClick?: () => void;
};

export function MetricChips({ kind, id, interactive = false, size = "sm", onCommentClick }: Props) {
  const { views, likes, liked, commentCount, toggleLike } = useMetrics(kind, id);
  const { t } = useI18n();
  const iconSize = size === "md" ? 16 : 14;
  const textCls = size === "md" ? "text-sm" : "text-xs";

  return (
    <div className={`flex items-center gap-3 ${textCls} text-muted-foreground`}>
      <span className="inline-flex items-center gap-1" aria-label={t("metrics.views")}>
        <Eye size={iconSize} />
        <span dir="ltr">{views}</span>
      </span>

      {interactive ? (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleLike();
          }}
          aria-pressed={liked}
          aria-label={t("metrics.likes")}
          className={`inline-flex items-center gap-1 transition-colors hover:text-accent ${
            liked ? "text-accent" : ""
          }`}
        >
          <Heart size={iconSize} className={liked ? "fill-current" : ""} />
          <span dir="ltr">{likes}</span>
        </button>
      ) : (
        <span className={`inline-flex items-center gap-1 ${liked ? "text-accent" : ""}`}>
          <Heart size={iconSize} className={liked ? "fill-current" : ""} />
          <span dir="ltr">{likes}</span>
        </span>
      )}

      {interactive && onCommentClick ? (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onCommentClick();
          }}
          aria-label={t("metrics.comments")}
          className="inline-flex items-center gap-1 transition-colors hover:text-accent"
        >
          <MessageCircle size={iconSize} />
          <span dir="ltr">{commentCount}</span>
        </button>
      ) : (
        <span className="inline-flex items-center gap-1" aria-label={t("metrics.comments")}>
          <MessageCircle size={iconSize} />
          <span dir="ltr">{commentCount}</span>
        </span>
      )}
    </div>
  );
}
