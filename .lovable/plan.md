## Goal
When a state is clicked on the Sudan map, the drawer shows a structured indicator table matching the reference screenshot — a fixed framework of "Data Complex Indicators" with per-state concrete data points and small "PDF" placeholder badges.

## Framework (fixed for every state)
Two indicator rows, each with three columns (Indicator · Content & Level Mapping · Concrete Data Points Required):

1. **Self-Sufficiency & Food Security** — "Focuses on fundamental local needs and Basic Manufacturing Industries."
   Data points: local eating/dietary habits · local clothing material dependencies · predominant construction materials (mud / brick / stone).
2. **Global Competitive Advantage** — "Focuses on value generation, split into Value Add and High Value Add tiers."
   Data points: available raw material metrics by Agricultural / Animal / Mineral-Quarry wealth · Inspirational Starter Points (high-value-add manufacturing possibilities baseline).

Both bilingual (AR/EN). Rendered from a single constant so it stays consistent across states.

## Per-state variation
Extend `STATE_DATA` in `src/lib/oasis-data.ts` with an optional `indicators` object:

```ts
indicators?: {
  selfSufficiency: {
    dietaryAr/En, clothingAr/En, constructionAr/En  // strings
  };
  globalAdvantage: {
    rawMaterialsAr/En: string;   // e.g. "Agricultural: sorghum, sesame · Mineral: chromite"
    starterPointsAr/En: string;  // e.g. "sesame oil refining, tanning, chromite beneficiation"
  };
}
```

Seed sensible values for each of the 18 states from context already in `activitiesAr`, `opportunitiesAr`, and `resources`. States without curated data fall back to generic placeholders derived from their `resources` + `activitiesAr` so the table still renders.

## Drawer changes
`src/components/poc/dashboard/StateDetailDrawer.tsx`:
- Keep the header (state name, current stage badge) and the three KPI tiles.
- Remove Resources / Activities / Opportunities sections.
- Add a new `IndicatorsTable` block below the KPIs:
  - Desktop: 3-column grid (Indicator · Mapping · Data Points) with dark row backgrounds mirroring the screenshot styling, using semantic tokens (`bg-muted`, `border-border`, `text-primary`, `text-muted-foreground`).
  - Mobile: stacked cards per indicator with the three fields labeled.
  - Each concrete data point line ends with a small non-interactive `PDF` badge (`span`, `aria-hidden`, muted background).

## i18n
Add keys under `oasis.drawer.indicators.*` in `src/lib/i18n.tsx` (section title, column headers, indicator names, mapping copy, data-point labels).

## Out of scope
- No PDF hosting / uploads. Badges are placeholders.
- Map, roadmap, tasks, work-package panels untouched.
- Existing i18n keys for resources/activities/opportunities left in place (unused) so re-adding those sections later stays cheap.
