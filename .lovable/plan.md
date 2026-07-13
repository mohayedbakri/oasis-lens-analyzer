## Plan: Align sidebar top with article cover image

### Current state
On the blog/news detail page (`PostDetail.tsx`), the sticky "أحدث الأخبار" / "أحدث المقالات" sidebar currently starts at the top of the content row, aligned with the breadcrumb/title area. The article cover image sits below the title, so the sidebar and image tops are misaligned.

### Goal
Move the sidebar down so the top edge of its teal panel aligns horizontally with the top edge of the article cover image.

### Implementation
1. In `src/components/blog/PostDetail.tsx`, add a top offset to the `<aside>` (or its inner panel) that accounts for the breadcrumb + title height.
2. Keep the sticky behavior (`lg:sticky lg:top-24`) so it still follows on scroll.
3. Ensure the offset works in both Arabic (RTL) and English (LTR) since the sidebar flips sides with the language direction.
4. Verify visually on an article detail page and a news detail page.

### Files to edit
- `src/components/blog/PostDetail.tsx`

### Verification
- Open `/blog/articles/a2` and a news detail route.
- Confirm the sidebar panel top sits at the same vertical level as the cover image top in both Arabic and English.