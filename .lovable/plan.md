# Pin Related Sidebar to the Left

In `src/components/blog/PostDetail.tsx`, the article body and the "Latest News/Articles" sidebar currently sit in a 3-column grid where the sidebar naturally lands on the right in LTR and on the right in RTL.

## Change
- Reorder the grid so the sidebar is always on the **left** regardless of language direction.
- Implementation: give the sidebar `lg:order-first` (or swap to `lg:col-start-1` + move article to `lg:col-start-2 lg:col-span-2`) so it renders in the left column in both LTR and RTL layouts.
- Keep the sticky positioning, teal styling, and dynamic heading (Latest News / Latest Articles) unchanged.
- No other files touched.
