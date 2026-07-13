## Goal
Add three small metric chips — 👁 views, ❤ likes, 💬 comments — to every article and news card on `/blog`, on the floating homepage news widget, and at the top of each detail page. Counts persist locally (per browser) and update optimistically when the user likes or comments.

## Storage
Since there's no backend for this yet, use `localStorage` keyed per post:
- `rsic.metrics.<kind>.<id>` → `{ views: number, likes: number, liked: boolean, comments: Comment[] }`
- `views` increments once per detail-page visit (guarded by a session flag so refresh in the same tab doesn't inflate).
- Seed with pseudo-random base numbers on first read (e.g. views 40–400, likes 3–40, 0 comments) so cards aren't all zero on first load. Seed is deterministic from `id` so both languages agree.

New module: `src/lib/metrics.ts` — `useMetrics(kind, id)` hook returning `{ views, likes, liked, comments, toggleLike, addComment, registerView }` with a small event bus so all mounted cards re-render when a value changes.

## UI
New component `src/components/blog/MetricChips.tsx` — a horizontal row of three inline stats using Lucide `Eye`, `Heart`, `MessageCircle`. Props: `kind`, `id`, `interactive?: boolean` (detail page = true → Heart is a toggle button; cards = false → read-only display). Heart fills (`fill-current text-accent`) when `liked`.

Integration points:
- `src/routes/blog.tsx` — add `<MetricChips>` to the meta row on each article card and news card.
- `src/components/NewsFloating.tsx` — compact variant (icons + numbers only, no labels) under each item title.
- `src/components/blog/PostDetail.tsx` — full interactive `<MetricChips interactive>` under the date/author row, plus a simple comments section at the bottom:
  - Existing comments list (name + text + relative time)
  - Comment form (name + textarea + submit) that calls `addComment`.
  - Call `registerView()` in a `useEffect` on mount.

## i18n (`src/lib/i18n.tsx`)
Add keys AR + EN: `metrics.views`, `metrics.likes`, `metrics.comments`, `comments.title`, `comments.empty`, `comments.name`, `comments.placeholder`, `comments.submit`, `comments.postedBy`.

## Out of scope
- No backend persistence — counts live in the visitor's browser only. Call out in the reply that a real backend (Lovable Cloud) is a follow-up if the user wants shared counts across devices.
- No moderation, no avatars, no threading.

## Verification
- tsgo clean.
- Manual: open `/blog`, confirm each card shows the three chips. Click into a news item, like it → heart fills and count increments on both the detail page and back on the index. Add a comment → appears in list and the card's comment count goes up.
