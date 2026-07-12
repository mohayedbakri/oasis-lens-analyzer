## Redesign `/donate` as a Nafeer-style crowdfund catalog

Match the uploaded Nafeer Global reference: a dashboard header with global funding stats, filter chips, a dense grid of granular fundable pieces (each with a realistic photo, price, short story quote, and "Back this" CTA), plus a backer-tier ladder below.

### Page layout

```
┌─────────────────────────────────────────────────────────────┐
│  Hero: "Fund a factory, one piece at a time"                │
│  $raised of $goal · backers · days-left                     │
│  Secondary stats: factories · jobs · products · people      │
├─────────────────────────────────────────────────────────────┤
│  Filter chips:  All | Equipment | Infrastructure |          │
│                 Training | Named partnership                │
│  Price chips:   Under $100 | <$1K | <$10K | Any             │
│  Search input (right-aligned)                               │
├─────────────────────────────────────────────────────────────┤
│  Catalog grid (1 / 2 / 3 columns responsive)                │
│  ┌──────────────┐  each card:                               │
│  │ [photo 4:3]  │   • WP code · line name (e.g. "A01 · Mill")│
│  │              │   • Icon + English piece name              │
│  │ A01 · Mill   │   • Arabic name (secondary line)           │
│  │ Roller seg.  │   • Price (large)                          │
│  │ قطعة أسطوانة │   • Story quote (2–3 lines, italic)        │
│  │ $800         │   • [Back this ↗] button                   │
│  │ "This …"     │                                            │
│  │ [Back this↗] │                                            │
│  └──────────────┘                                            │
├─────────────────────────────────────────────────────────────┤
│  "Your Nafeer tier" — 5-column ladder                       │
│  $10–500 Contributor · $500–5K Maker · $5K–25K Builder      │
│  · $25K–100K Factory partner · $100K+ RSIC founder          │
└─────────────────────────────────────────────────────────────┘
```

Clicking "Back this" opens a Sheet drawer with amount presets, custom amount, once/monthly toggle (existing donate form logic), pre-filled with the piece price and its parent work package id.

### Catalog data model

New file `src/lib/catalog.ts` exporting an array of `CatalogPiece`:

```ts
type CatalogPiece = {
  id: string;                      // "wp4-roller"
  work_package_id: string;         // links to PoC data
  code: string;                    // "A01 · Wheat & flour mill"
  name: { ar: string; en: string };
  price_usd: number;
  category: "equipment" | "infrastructure" | "training" | "named";
  quote: { ar: string; en: string };
  image: { url: string; alt: string };
};
```

Seed with ~15 pieces derived from the 8 PoC work packages (examples):
- **wp4 mill** → Flour mill roller segment $800; Sieve mesh $250
- **wp5 silo** → Silo panel section $600; Silo ladder & rail $300
- **wp6 packaging** → Heat-seal film roll $75; Heat sealer jaw set $400; Bag conveyor motor $1,200
- **wp8 solar** → Solar panel 400W $1,200; Battery module $2,500
- **wp7 training** → 10-seat training room $2,000; Trainee toolkit $150
- **civil** → Factory floor 1 m² $25; Factory entrance door $300; 50 community bricks $50
- **named** → Named factory wing $25,000; Central service co-founder $50,000

Categories map to the filter chips. Prices bucket into the price chips.

### Global KPIs (top strip)

Computed from PoC funding data + catalog:
- **raised** = sum of `funding.received_usd`
- **goal** = sum of `funding.allocated_usd`
- **backers** = static placeholder now, later from a `backers` field
- **days_left** = countdown to a launch date in `site.ts`
- Secondary row (factories / jobs / products / people) from `site.ts` stats.

### Components (new)

- `src/components/donate/CatalogHero.tsx` — title, big raised/goal counter, progress bar, backer + days stats, secondary stat row.
- `src/components/donate/CatalogFilters.tsx` — chip row for category + price bucket + search, all bound to URL search params via zod (matching PoC pattern).
- `src/components/donate/CatalogCard.tsx` — image, code tag, EN + AR names, price, italic quote, Back-this button.
- `src/components/donate/BackDrawer.tsx` — shadcn Sheet wrapping the existing preset/monthly/custom form, pre-filled with `piece.price_usd`.
- `src/components/donate/TierLadder.tsx` — 5 columns, tier name, range, description, reward line.

### Route rewrite

`src/routes/donate.tsx`:
- `validateSearch` with zod for `q | category | price`.
- Loader `ensureQueryData(pocQueryOptions)` so global KPIs stay live.
- Composition: `CatalogHero` → `CatalogFilters` → filtered grid of `CatalogCard` → `TierLadder`.
- Uses `PageShell` + `PageHeader` for banner consistency; hero replaces the old form.

### Realistic imagery

Generate 15 photorealistic images at 1024×768 via `imagegen--generate_image` (standard tier), saved to `src/assets/catalog/*.jpg` and uploaded through `lovable-assets` to CDN pointers. Prompts describe: industrial context, Sudanese rural setting where relevant, natural daylight, no text overlay. Examples:
- Flour mill roller segment: "close-up photo of a stainless-steel industrial roller mill segment on a factory workbench, natural window light, photorealistic"
- Silo: "row of galvanized grain storage silos under clear blue sky, small industrial complex, wide shot"
- Solar panel: "single 400W photovoltaic panel installed in an arid rural setting, sunset light"
- Community bricks: "stack of red community-made clay bricks on a pallet at a rural brickyard"
- Named factory wing: "modern factory wing exterior with clean white walls and a small commemorative plaque near the entrance"
- Training room: "training classroom with 10 workstations, adults learning industrial operations, daylight"
- Factory floor: "polished concrete factory floor with light industrial ceiling, one-point perspective"
(Full list stored inline in the plan-execution step, one prompt per piece.)

### i18n

Extend `src/lib/i18n.tsx` with keys under `donate.*` for hero copy, chip labels ("All / Equipment / Infrastructure / Training / Named partnership"), price buckets, "Back this", drawer labels, tier ladder titles, and CTA fallbacks. Piece names, codes, and quotes live in `catalog.ts` as per-language objects.

### RTL

Cards use `dir="rtl"` for Arabic block, chip row uses `start/end` utilities. Numbers stay LTR with `dir="ltr"`. Existing header language toggle drives everything.

### Out of scope

- No payments integration — "Back this" still hands off to the existing (placeholder) continue flow inside the drawer.
- No backend for real backer counts; static placeholder now with a clear TODO.
- PoC dashboard, header, footer, other routes untouched.
- Business logic unchanged; this is a presentation-layer rebuild plus a new catalog data file.
