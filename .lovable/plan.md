## Goal
Polish the English side of the bilingual site so every page reads naturally, and standardize every English title and subtitle to Title Case (capitalize each significant word).

## Scope of review
Bilingual copy lives in these files. I'll audit the `en:` value on every key/entry:

- `src/lib/i18n.tsx` — nav, home, about, projects, impact, governance, blog, contact, donate, PoC, Oasis dashboard, common
- `src/lib/site.ts` — tagline, description, pillars (`pillarsByLang`), goals (`goalsByLang`), impact stats, pilot factories
- `src/lib/content.ts` — blog articles, news, reports (titles, excerpts, bodies)
- `src/lib/catalog.ts` — donate catalog items (names, descriptions)
- `src/lib/oasis-data.ts` — states, resources, activities, opportunities, roadmap steps, tasks, global indices
- `src/lib/posts.functions.ts` — any hard-coded English strings
- Route files under `src/routes/` — only where English strings are hard-coded (headings, labels) rather than pulled from `t(...)`

## Title Case rule
Applied to every English heading/subheading/eyebrow/card title/section label/CTA:
- Capitalize the first and last word and every significant word in between.
- Keep lowercase: articles (a, an, the), short conjunctions (and, but, or, nor, so, yet), short prepositions (in, on, at, to, of, for, by, from, with), and `is/as` when unstressed.
- Always capitalize the first word after a colon or dash.
- Preserve acronyms (RSIC, GDP, PoC, SME, GMP/HACCP, AI, IT/OT, MoUs).
- Leave body paragraphs, list descriptions, and form helper text in normal sentence case — Title Case is for titles/subtitles/labels only, not prose.

## What I will change
1. **Titles/subtitles → Title Case** across:
   - Home: hero eyebrow/headline, why-now title, pillars title, goals title, CTA title, all card titles.
   - About: page title, foundations title, vision/mission/core titles, all card headers.
   - Projects: page title, pilot title, sizing title, rollout title, table column headers.
   - Impact: page title, long-vision title, stat labels.
   - Governance: page title, entity title, council title, profits title, finance title.
   - Blog: page title, tab labels, "Latest News/Articles" sidebar, related content.
   - Contact: page title, field labels.
   - Donate: hero title, tier titles, filter labels, section headers.
   - PoC + Oasis: page titles, panel titles ("Key Milestones", "Documents & Agreements", "Interactive Sudan Map", "RSIC Roadmap", "Measurable & Running Tasks", "Data Complex Indicators", drawer labels, KPI labels, column headers, index names).
   - Footer: section headings ("Links", "Contact").
   - Nav: menu items ("Home", "About", "Model & Factories", "Impact", "Governance & Funding", "Blog", "Project Dashboard", "Contact").

2. **English quality pass** on the same files:
   - Fix awkward phrasing, stray em-dashes replaced with commas where the Arabic already switched, remove trailing periods from titles (keep in body copy), fix "on-site"/"on site" and similar inconsistencies, straighten mixed quote styles.
   - Verify pilot factory notes, catalog item names/descriptions, roadmap step names, state resources/activities/opportunities, blog post titles, and news headlines all read fluently in English.
   - Cross-check every `t("…")` used in a route renders sensible English (no stray Arabic-only phrasing left behind).

3. **No structural changes** — only English string edits. Arabic text, keys, layout, components, and logic stay untouched.

## Verification
- Grep for any remaining lowercase-first-word or dash-separated English titles.
- Load `/`, `/about`, `/projects`, `/impact`, `/governance`, `/blog`, `/donate`, `/poc`, `/contact` in EN via a Playwright pass, screenshot each hero + section headings, and confirm Title Case + readable copy.

## Out of scope
- Arabic copy.
- Visual/layout changes.
- New features or content additions.
