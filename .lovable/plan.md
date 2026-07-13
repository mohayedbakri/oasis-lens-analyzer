The user wants the related-news/articles sidebar on the right in Arabic and on the left in English on the blog/news detail page.

Current behavior (in `src/components/blog/PostDetail.tsx`):
- Article content is placed on the right in Arabic (`lg:col-start-2`) and on the left in English (`lg:col-start-1`).
- Sidebar is placed on the left in Arabic (`lg:col-start-1`) and on the right in English (`lg:col-start-3`).

Plan:
1. In `src/components/blog/PostDetail.tsx`, swap the `lg:col-start-*` classes for the article and the sidebar.
   - Article: `isRtl ? "lg:col-start-1" : "lg:col-start-2"`
   - Sidebar: `isRtl ? "lg:col-start-3" : "lg:col-start-1"`
2. Verify the change in the preview for both `/blog/articles/a2` and a news detail route.

This is a single-file CSS-grid layout change with no data or logic modifications.