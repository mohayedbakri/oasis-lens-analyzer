# Sidebar Related List on Post Detail

Convert the related-content block on article/news detail pages into a side list rendered next to the article body, matching the reference screenshot.

## Changes

**`src/components/blog/PostDetail.tsx`**
- Widen container from `max-w-3xl` to `max-w-6xl` and switch to a 2-column grid on `lg`: article `lg:col-span-2`, sidebar `lg:col-span-1`. Keep single column on mobile (sidebar drops below).
- Move the `related` block out of the article into a new `<aside>` on the side (right side in RTL, left in LTR — grid order handles this naturally since the whole page is `dir="rtl"` when Arabic).
- Style the sidebar to match the reference: dark teal `bg-primary text-primary-foreground` panel, rounded, with a bold heading and vertically stacked items separated by thin dividers. Each item shows small thumbnail (from `postImages[r.id]` when available) + title + date, links to the detail route. `lg:sticky lg:top-24` so it follows scroll.
- Sidebar title depends on kind:
  - `kind === "news"` → `blog.related.news` = "أحدث الأخبار" / "Latest News"
  - `kind === "articles"` → `blog.related.articles` = "أحدث المقالات" / "Latest Articles"
- Keep breadcrumb, hero image, body, back button, and comments inside the article column (comments span full width below).

**`src/lib/i18n.tsx`**
- Add two new i18n keys:
  - `blog.related.news`: ar "أحدث الأخبار", en "Latest News"
  - `blog.related.articles`: ar "أحدث المقالات", en "Latest Articles"
- Leave existing `blog.related` key untouched (still used elsewhere if any).

## Out of scope
No changes to data sources, routing, or the blog index tabs. Comments section behavior unchanged.
