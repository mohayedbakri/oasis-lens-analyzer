# لوحة تحكم مشروع إثبات المفهوم — Al-Bergig PoC Dashboard

Add an 8th navigation item linking to a new public route `/poc` that visualizes Al-Bergig's first-factory progress, fed by a public Google Sheet (CSV) and an interactive 3D complex map built with React Three Fiber.

## 1. Navigation & route

- Add `لوحة المشروع` (key: `poc`) to the nav array in `src/lib/site.ts` and the header/footer link lists.
- New route file: `src/routes/poc.tsx` with proper Arabic `head()` metadata (title, description, og:title, og:description).
- Mark the nav item with a subtle "مباشر" (live) badge.

## 2. Data layer (Phase 1 = Google Sheet CSV)

- New module `src/lib/poc-data.ts`:
  - Exports `fetchPocData()` returning a typed `PocSnapshot` (work packages, funding, milestones, timeline, documents, unit statuses).
  - Reads from `VITE_POC_SHEET_CSV_URL` (a published-to-web CSV link). Falls back to a bundled `src/lib/poc-fallback.json` so the page renders before the sheet is wired.
  - Parses CSV with a tiny inline parser (no new dependency) and normalizes rows into the typed shape.
- Sheet contract (one tab per concern, exported as separate CSV gids — URLs stored in a small config object):
  - `work_packages`: id, name_ar, category (agreement / due_diligence / mou / procurement / civil / training), status, progress_pct, planned_start, planned_end, actual_start, actual_end, unit_id, doc_url
  - `funding`: work_package_id, allocated_usd, received_usd, currency
  - `units`: id, name_ar, type (mill / silo / packaging / admin / training), status (planned / in_progress / done / blocked), x, y, z
  - `documents`: id, title_ar, type, url, work_package_id
- Use TanStack Query: `queryOptions({ queryKey: ['poc'], queryFn: fetchPocData, staleTime: 60_000 })`; route loader primes cache via `ensureQueryData`, component reads with `useSuspenseQuery`. Refetch every 60s in the component via `refetchInterval`.
- Designed for future swap: a single `fetchPocData()` function is the only thing that needs to change to point at a server function or API.

## 3. Dashboard UI sections (RTL Arabic)

Inside `src/routes/poc.tsx`, composed of these components under `src/components/poc/`:

1. `PocHeader` — title, last-updated timestamp, "البيانات من Google Sheets" note, refresh button.
2. `KpiStrip` — 4 cards: % funding received, % milestones completed, days ahead/behind plan, count of signed documents.
3. `FundingPanel` — per work-package allocated vs received, using existing `Progress` component + numeric badges; grouped by category.
4. `MilestonesPanel` — checklist per work package (completed/in-progress/pending) with progress bar.
5. `TimelinePanel` — lightweight Gantt: each WP renders two stacked bars (planned vs actual) on a shared month scale, pure CSS grid (no chart lib needed).
6. `DocumentsPanel` — list of signed agreements/MoUs with external links and status icons.
7. `Complex3D` — the interactive 3D module (section 4 below).
8. `UnitDetailDrawer` — Sheet/Drawer that opens when a 3D unit is clicked, showing that unit's WPs, funding, milestones, docs.

All copy in Arabic, layout RTL, styled with existing teal/gold tokens.

## 4. Interactive 3D module

- Install `three`, `@react-three/fiber`, `@react-three/drei`.
- `Complex3D.tsx`:
  - `<Canvas>` with `OrbitControls`, soft lighting, ground plane styled as the Al-Bergig site.
  - Renders one `<Unit>` per unit from `units` data, positioned at `(x,y,z)`.
  - Each `<Unit>` loads its GLB via `useGLTF` from `/models/units/{type}.glb` (CDN-served via asset pointers).
  - Dynamic state: emissive color / outline reflects status — planned (gray), in_progress (teal `#077a75` glow), done (gold `#ca943f`), blocked (red).
  - Hover: tooltip with unit name; Click: opens `UnitDetailDrawer` with that unit's data.
  - Mobile: limits pixel ratio, disables shadows, smaller default camera distance.
  - Suspense fallback: a static 2D top-down SVG of the complex so the page never blocks on model loading.
- AI-generated GLB assets:
  - For the first pass, generate stylized placeholder GLBs via a small Node script using a procedural mesh exporter (Three.js → GLTFExporter) for each unit type (mill, silo, packaging, admin, training) so the page renders end-to-end. These are real GLBs, swappable later for higher-fidelity AI-generated models.
  - Files stored under `public/models/units/` (or migrated to CDN via asset pointers after the first build).
  - Note in plan.md: replacing each placeholder with an AI-generated GLB is a follow-up task; the loader path stays the same.

## 5. Work packages (defaults)

User didn't specify, so seed `poc-fallback.json` with a sensible Al-Bergig set we can edit later:
- اتفاقية تخصيص الأرض (Land allocation MoU)
- العناية الواجبة الفنية والمالية (Technical & financial due diligence)
- مذكرة تفاهم مع السلطة المحلية (Local authority MoU)
- توريد المعدات الرئيسية (Main equipment procurement)
- الأعمال المدنية والبنية التحتية (Civil works & infrastructure)
- التدريب وبناء القدرات (Training & capacity building)
- التشغيل التجريبي (Pilot operations)

## 6. Files touched

New:
- `src/routes/poc.tsx`
- `src/lib/poc-data.ts`, `src/lib/poc-fallback.json`
- `src/components/poc/{PocHeader,KpiStrip,FundingPanel,MilestonesPanel,TimelinePanel,DocumentsPanel,Complex3D,Unit,UnitDetailDrawer}.tsx`
- `public/models/units/{mill,silo,packaging,admin,training}.glb` (generated)
- `scripts/generate-poc-models.mjs` (one-off GLB generator)

Edited:
- `src/lib/site.ts` (nav + poc constants incl. `sheetCsvUrl` config)
- `src/components/layout/Header.tsx`, `Footer.tsx` (nav item)
- `package.json` (add three, @react-three/fiber, @react-three/drei)
- `.lovable/plan.md` (log Phase-1 dashboard milestone)

## 7. Out of scope (call out)

- Auth, write-back to the sheet, or admin editor — sheet stays the source of truth.
- High-fidelity AI-generated GLBs — placeholders ship now, real models swap in later via the same path.
- Server-side proxy/caching of the sheet — direct browser fetch of the published CSV in Phase 1.
