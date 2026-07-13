
# Oasis Lens Analyzer Dashboard — Redesign of `/poc`

Rebuild the PoC page to match the sketch in the uploaded brief: a three-zone command layout centered on Sudan, with the RSIC roadmap on the side and measurable tasks below the map. The existing Al‑Burgig 3D + work‑package view moves to a secondary tab so no current data is lost.

## Layout (RTL-aware, mirrors on LTR)

```text
┌────────────────────────────────────────────────────────────────┐
│  Top Bar: title · view switch (National ▸ Al-Burgig) · filters │
├──────────────┬─────────────────────────────────────────────────┤
│              │                                                 │
│  Roadmap     │        Interactive Sudan Map                    │
│  Sidebar     │  (states → tooltip + side panel with KPIs)      │
│  (6 stages)  │                                                 │
│              ├─────────────────────────────────────────────────┤
│              │  Measurable & Running Tasks (filterable table)  │
└──────────────┴─────────────────────────────────────────────────┘
```

## Sections

**1. Top bar** — Dashboard title, breadcrumb, a segmented switch between *National view* (new) and *Al‑Burgig PoC* (existing 3D + work packages), global state filter, and language toggle (already in header).

**2. Left roadmap sidebar** — Vertical stepper with the 6 RSIC creation stages (Feasibility → Planning → Financing → Build → Operate → Scale). Each step is clickable; selecting it filters the tasks table and highlights states currently in that stage on the map. Shows a per-stage progress bar.

**3. Interactive Sudan map (center-top)** — SVG choropleth of Sudan's 18 states. Hover shows a tooltip (state name, # complexes targeted, # active factories, SME index). Click opens a right-side drawer with: main resources (agri / mineral / livestock chips), current industrial activity, opportunities, and KPI mini-cards. Zoom/pan, and a legend keyed to industrial-maturity color scale using existing teal/gold tokens. A "Filter" popover lets users color the map by resource type, project status, or maturity.

**4. Measurable tasks (center-bottom)** — Card-grid + table hybrid listing tasks: name, state, status chip (Planned / Running / Done / Blocked), start → target dates, owner, % complete bar, KPI (e.g. factories established). Search + filters (state, status, stage). Selecting a task cross-highlights the state on the map and the stage in the sidebar.

## Interactions (three-way linked selection)

Roadmap stage ↔ Map states ↔ Tasks list. Selecting any one filters the other two. State stored in URL search params (`?stage=&state=&status=`) so views are shareable — reuses the pattern already in `WorkPackageFilters.tsx`.

## Files

New:
- `src/routes/poc.tsx` — rewritten as layout with `<Outlet />` + tabs.
- `src/routes/poc.index.tsx` — the new National dashboard (this redesign).
- `src/routes/poc.burgig.tsx` — moves the existing 3D + WP view here unchanged.
- `src/components/poc/dashboard/TopBar.tsx`
- `src/components/poc/dashboard/RoadmapSidebar.tsx`
- `src/components/poc/dashboard/SudanMap.tsx` (SVG paths, no external map lib)
- `src/components/poc/dashboard/StateDetailDrawer.tsx`
- `src/components/poc/dashboard/TasksPanel.tsx`
- `src/lib/oasis-data.ts` — states, resources, opportunities, tasks, roadmap stages (bilingual, seeded from the brief; ready to swap for Google Sheets later like existing `poc-data.ts`).
- `src/lib/i18n.tsx` — add AR/EN keys for the new dashboard.

Unchanged: `Complex3D.tsx`, `MilestonesPanel.tsx`, `FundingPanel.tsx`, `TimelinePanel.tsx`, `DocumentsPanel.tsx`, `KpiStrip.tsx`, `UnitDetailDrawer.tsx`, `WorkPackageFilters.tsx` — all still used inside `poc.burgig.tsx`.

## Technical details

- Sudan map: inline SVG with 18 `<path>` elements from a public-domain GeoJSON simplified to viewBox `0 0 1000 1000`; no runtime map library added. Each path gets `data-state`, ARIA label, keyboard focus, and Tailwind fill classes bound to the current maturity token.
- Colors: reuse `--primary` (teal #077a75) as low→high maturity ramp via `color-mix`, `--accent` (gold #ca943f) for the selected state stroke. No new tokens.
- All content bilingual via existing `useI18n()`.
- RTL-first: sidebar sits on the visual right in AR, left in EN, using `start`/`end` logical utilities.
- Responsive: below `lg`, sidebar collapses to a horizontal chip strip above the map; tasks stack under the map.
- No new npm packages.

## Not in this pass (kept as noted "future features" in the brief)

Task create/edit UI, live progress writes, per-state resource filter presets beyond the three defaults — flagged as follow-ups.
