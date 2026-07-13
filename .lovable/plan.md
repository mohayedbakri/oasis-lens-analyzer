## Goal
Add a boxed indicator strip to the top of the `/poc` National Dashboard showing Sudan's current status on the three global indices that drive RSIC's external positioning, plus a small SESRIC context line for the Islamic-world lens.

## Where
`src/routes/poc.index.tsx` — new section rendered above the existing map / roadmap / KPI strip.

## What renders
A horizontal grid of three cards (stacks on mobile). Each card:

```text
┌──────────────────────────────────────┐
│  UNIDO CIP  · 2023            [badge]│
│  Rank 137 / 153                      │
│  Score 0.0089                        │
│  Competitive Industrial Performance  │
│  source: UNIDO CIP Report 2024  ↗    │
└──────────────────────────────────────┘
```

Three cards:
1. **UNIDO CIP** — Competitive Industrial Performance Index (global manufacturing competitiveness).
2. **Harvard ECI** — Economic Complexity Index (export knowledge base).
3. **AfDB AII** — Africa Industrialization Index (African lens).

Below the strip, one muted line:
> Islamic-world context: OIC/SESRIC Economic Outlook — used as narrative context for the Islamic lens, not a ranking source. [link]

Trend arrow badge (▲ / ▼ / —) vs prior year when known; otherwise omit.

## Data
New file `src/lib/global-indices.ts` exporting a typed array with `{ id, nameAr, nameEn, publisher, year, rank, total, score, prevRank?, sourceUrl, blurbAr, blurbEn }`. I will source latest published figures for Sudan from each publisher (UNIDO CIP Report, Harvard Atlas of Economic Complexity, AfDB Africa Industrialization Index) and cite year + URL on each card. If a figure is not publicly available for Sudan in the newest edition, the card falls back to the most recent year that lists Sudan and labels the year clearly.

## Component
`src/components/poc/GlobalIndicesStrip.tsx` — pure presentational, reads from `global-indices.ts`, uses existing Card/Badge tokens, fully RTL/LTR via the current `useI18n()` hook. No new deps.

## i18n
Add keys under `oasis.indices.*` in `src/lib/i18n.tsx` (title, subtitle, rank label, score label, source label, SESRIC note). Card content (index name + blurb) comes from the data file in both languages.

## Out of scope
- No changes to map, roadmap, tasks, or work-package panels.
- No live API fetching — values are static constants with cited year + source URL; easy to update later.
- No changes to About/Vision page.
