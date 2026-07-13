## Goal

Remove the Al-Burgig sub-dashboard and merge its **Work Package Tracking Matrix** (filters + milestones + timeline + funding + documents, plus the live data source/refresh strip and KPI strip) into the National Oasis Lens dashboard at `/poc`.

## Changes

### Routes
- **Delete** `src/routes/poc.burgig.tsx`.
- **Simplify** `src/routes/poc.tsx` (layout): remove the National ↔ Al-Burgig pill switch and the `isBurgig` branching. Keep the page banner, eyebrow, title (`oasis.top.title`), description, and `<Outlet />`.
- **Extend** `src/routes/poc.index.tsx`:
  - Keep existing `stage` + `state` URL params; add `q`, `category`, `status` from the Burgig schema so filters stay shareable.
  - Load PoC snapshot via `context.queryClient.ensureQueryData(pocQueryOptions)` in the route loader and read it with `useSuspenseQuery`.
  - Render, in order, under the existing map/roadmap block:
    1. A new **Work Package Tracking Matrix** section header.
    2. Data-source + last-updated strip and Refresh button (from Burgig).
    3. `KpiStrip`.
    4. `WorkPackageFilters` + match-count hint.
    5. `MilestonesPanel` (filtered).
    6. `TimelinePanel` (filtered).
    7. `FundingPanel` (filtered, 2/3) + `DocumentsPanel` (1/3).
  - Keep the `applyFilters` helper (moved from Burgig) local to the file or extracted to `src/lib/poc-data.ts` — leaning toward keeping it in the route file to avoid touching the data module.
  - Drop the 3D `Complex3D` view and `UnitDetailDrawer` — those are Al-Burgig-specific site visualization, not a tracking matrix. (Confirm below.)

### Navigation cleanup
- **`src/components/poc/WorkPackageFilters.tsx`**: change any `to="/poc/burgig"` navigation back to `to="/poc"` so filter links stay on the merged page.
- **`src/lib/i18n.tsx`**: keep existing `oasis.top.*` and `poc.*` keys (still used). Remove now-dead `oasis.top.viewSwitch`, `oasis.top.national`, `oasis.top.burgig` keys.
- Search for any other links to `/poc/burgig` (header, footer, home, sitemap, llms.txt, blog content) and repoint them to `/poc`.

### SEO
- Update `/poc` `head()` title/description to reflect the combined view (national roadmap + Al-Burgig work-package tracking).
- Remove `/poc/burgig` entry from `src/routes/sitemap[.]xml.ts` if listed; ensure `/poc` remains.

## Question before I finalize

You said "move the work package tracking matrix." I'm reading that as the filters + milestones + timeline + funding + documents tables (the tracking data). The **interactive 3D complex model** and its unit drawer are Al-Burgig site-specific and don't fit the national view — my plan drops them along with the Burgig route. If you want the 3D model kept somewhere (e.g. inside a collapsible "Al-Burgig site model" card on the national page), tell me and I'll keep it.
