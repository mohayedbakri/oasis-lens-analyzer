## Goal
Make blog articles and news items clickable, opening a full detail page (like the Ghaith Foundation article layout) instead of only showing excerpts on the blog index.

## New routes
- `src/routes/blog.news.$id.tsx` — full news detail page
- `src/routes/blog.articles.$id.tsx` — full article detail page

Each route:
- Reads `id` param, looks up the item from `newsByLang` / `articlesByLang` (current language via `useLanguage()`).
- If not found → `notFound()` with a `notFoundComponent` linking back to `/blog`.
- Layout mirrors the Ghaith reference:
  - `PageBanner` at top (reuse existing shell/banner component).
  - Article container: breadcrumb (Home › Blog › [tab] › title), H1 title, meta row (date, author for articles), hero placeholder image, long-form body (rendered from a new `body` field), share buttons row (reuse footer social icons), and a "Back to Blog" link.
- `head()` sets per-item `title`, `description`, `og:title`, `og:description`, `og:type=article`.

## Content model update (`src/lib/content.ts`)
- Extend `News` and `Article` types with `body: string[]` (array of paragraphs) — bilingual, added for every existing item so nothing breaks. Keep short `excerpt` for cards.
- No CMS change; still static bilingual data.

## Blog index changes (`src/routes/blog.tsx`)
- Wrap each news card and each article card in a TanStack `<Link to="/blog/news/$id" params={{id}}>` (and `/blog/articles/$id`). Preserve current tab UI; only cards become clickable with hover affordance.
- Keep the Reports tab unchanged (PDF viewer).

## Homepage news widget (`src/components/NewsFloating.tsx`)
- Change each item link from `/blog?tab=news#id` to `/blog/news/$id` so it deep-links to the full page.

## i18n
- Add keys in `src/lib/i18n.tsx`: `blog.readMore`, `blog.backToBlog`, `blog.publishedOn`, `blog.by`, `blog.share`, `blog.notFound` (AR + EN).

## Out of scope
- No CMS, no comments, no related-posts algorithm (can add a simple "More from Blog" list at the bottom using the same array — included as a small strip, no extra deps).
- Reports remain PDF-viewer only (already a full experience).

## Verification
- `tsgo` clean.
- Manual: click a news card on `/blog?tab=news` → lands on `/blog/news/n1` with full body, banner, breadcrumb, back link. Same for articles. Homepage floating news widget routes to the detail page.
