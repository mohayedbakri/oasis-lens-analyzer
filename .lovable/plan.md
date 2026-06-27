## Goal

Add the uploaded aerial image of the RSIC complex as a wide banner at the top of every page (just like the reference site puts a full-width photo at the top of its article).

## Approach

1. **Upload the image as a CDN asset** via `lovable-assets`:
   - `src/assets/rsic-banner.jpg.asset.json` (from `/mnt/user-uploads/image.png`, saved as `rsic-banner.jpg`).

2. **Extend `PageHeader`** in `src/components/layout/PageShell.tsx` to optionally render a full-width banner image above the title block:
   - New optional prop `banner?: string` (image URL).
   - When provided, render a responsive `<img>` (full width, ~220–280px tall on desktop, ~140px on mobile, `object-cover`) above the existing eyebrow/title/description block.
   - Keep current behavior unchanged when `banner` is not passed.
   - Add proper `alt` text (bilingual via `useI18n`, e.g. "RSIC pilot complex — Al-Burgig" / "مجمع برقيق النموذجي").

3. **Wire the banner into every inner page** that uses `PageHeader`:
   - `src/routes/about.tsx`
   - `src/routes/projects.tsx`
   - `src/routes/impact.tsx`
   - `src/routes/governance.tsx`
   - `src/routes/blog.tsx`
   - `src/routes/contact.tsx`
   - `src/routes/donate.tsx`
   - `src/routes/poc.tsx` (if it uses PageHeader; otherwise add the banner directly above its page content)

4. **Homepage (`/`)**: it already has a full hero section, so adding the banner above the hero would be redundant. Two options:
   - **A (default)**: leave the homepage hero as-is, no banner.
   - **B**: also add the banner above the homepage hero.

   I'll go with **A** unless you say otherwise.

## Notes

- Image is served from the Lovable CDN — no repo bloat.
- Uses one shared `PageHeader` change so future pages get the banner for free by passing the `banner` prop.
- No business-logic or content changes; presentation only.
