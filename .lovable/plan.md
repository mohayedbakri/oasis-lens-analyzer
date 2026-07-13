# Add gradient overlay to page banners

## Goal
Add a dark-to-teal gradient layer on top of the page banner image for all internal pages, with opacity ramping from 40% on the dark side to 60% on the teal side. The homepage banner remains unchanged.

## Changes

### 1. `src/components/layout/PageShell.tsx`
- Extend `PageBanner` with an optional `overlay` prop (default `false`).
- When `overlay={true}`, render an absolutely positioned div over the `<img>` using a left-to-right `linear-gradient`:
  - Left stop: `rgba(0,0,0,0.4)` (dark at 40% opacity)
  - Right stop: `color-mix(in srgb, var(--primary) 60%, transparent)` (teal at 60% opacity)
- Keep the existing image and alt text untouched.

### 2. Internal route pages
- Update routes that currently render `<PageBanner />` or `<PageHeader banner />` to pass the overlay flag, e.g.:
  - `/blog/articles/$id`
  - `/blog/news/$id`
  - `/about`, `/projects`, `/impact`, `/governance`, `/blog`, `/poc`, `/contact`, `/donate`, `/support`
- Leave the homepage (`/`) banner as-is.

## Notes
- The gradient direction will follow the reference image: dark on the left, teal on the right.
- Uses existing CSS tokens (`--primary`) so it stays consistent with the RSIC teal brand color.
- No new dependencies required.