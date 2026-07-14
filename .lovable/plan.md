## Goal

Make the English version work end-to-end on **Model & Factories** (`/projects`), **Blog** index + **News/Articles** detail pages (`/blog`, `/blog/news/$id`, `/blog/articles/$id`), the **Project Dashboard** (`/poc`), and **Contact** (`/contact`).

## What's actually broken

The page files themselves already call `useI18n()` and pull `byLang[lang]` data, so at first glance they look bilingual. The English fails because a handful of shared building blocks always render Arabic regardless of language:

1. **`src/components/layout/PageShell.tsx` → `PageBanner`** — banner `<img alt>` uses an Arabic string when `lang === "ar"` but the branch flip only affects the alt. Fine. But the overlay logo `alt="RSIC"` is fine. This one is actually OK — leaving as is.
2. **`src/components/layout/Header.tsx`** — logo `alt` is hardcoded Arabic.
3. **Project Dashboard data** — `src/lib/poc-fallback.json` only carries `name_ar` / `title_ar` for units, work packages, and documents. Every panel (`KpiStrip`, `MilestonesPanel`, `FundingPanel`, `TimelinePanel`, `DocumentsPanel`, `UnitDetailDrawer`, `Complex3D`) renders those `_ar` fields directly, so the dashboard shows Arabic text in English mode.
4. **Model & Factories** — the route file already has Arabic + English tables via `sizingByLang` / `rolloutByLang` / `pilotFactoriesByLang`, so once the shared bits above are fixed this page is fully bilingual. Nothing further needed inside the route.
5. **Blog index and detail** — already read `articlesByLang[lang]`, `newsByLang[lang]`, `reportsByLang[lang]` and use `t()` for chrome. Content is bilingual. No route-file changes required.
6. **Contact** — already fully `t()`-driven. No route-file changes required.

## Changes

### 1. Header logo alt (bilingual)
`src/components/layout/Header.tsx`: replace the Arabic-only `alt` with a language-aware string via `useI18n()` (add a new `header.logoAlt` key to `src/lib/i18n.tsx` with `ar` / `en` variants).

### 2. Project Dashboard — add English fields to fallback data
`src/lib/poc-fallback.json`: for each `units[]`, `work_packages[]`, and `documents[]` entry, add a sibling `name_en` (or `title_en` for documents) with an accurate English translation of the existing Arabic label. Keep Arabic fields intact.

### 3. Project Dashboard — type + accessor helper
`src/lib/poc-data.ts`: extend `Unit`, `WorkPackage`, and `PocDocument` types with optional `name_en` / `title_en`. Export a tiny helper `pickName(item, lang)` that returns `item.name_en ?? item.name_ar` when `lang === "en"` and `item.name_ar` otherwise (same for `title`). This keeps the Google Sheets ingest path safe when the sheet has no English column.

### 4. Swap `name_ar` / `title_ar` reads to the helper
In each of the following, import `useI18n` (already imported in most) and `pickName`, then replace `wp.name_ar` / `unit.name_ar` / `d.title_ar` with `pickName(wp, lang)` etc.:
- `src/components/poc/KpiStrip.tsx`
- `src/components/poc/MilestonesPanel.tsx`
- `src/components/poc/FundingPanel.tsx`
- `src/components/poc/TimelinePanel.tsx`
- `src/components/poc/DocumentsPanel.tsx`
- `src/components/poc/UnitDetailDrawer.tsx`
- `src/components/poc/Complex3D.tsx` (already computes an `ar` status label — reuse `useStatusLabels()` from `status.ts` so it becomes bilingual too)

`src/components/poc/status.ts` already ships bilingual labels via `useStatusLabels()` — no change needed there.

### 5. Verification
- Toggle the language switcher on `/projects`, `/blog`, `/blog/news/n1`, `/blog/articles/a1`, `/poc`, `/contact`.
- Confirm titles, subtitles, cards, tables, work-package rows, unit drawers, and PDF/report labels all render in English when English is active.
- Confirm Arabic remains identical to today.

## Out of scope

- Nav labels (already bilingual via `t("nav.<path>")`).
- Home / About / Governance / Impact / Donate — user's request lists only the four pages above.
- Translating the live Google-Sheet data source (only the offline fallback is translated; sheet rows continue to fall back to their Arabic name if no English column exists).
