## Plan: Refine banner logo placement

### Goal
Update the `PageBanner` logo so it sits cleanly in the page corner with adequate margin and a smaller, more balanced size, matching the reference banner aesthetic.

### Changes
1. **Read current state** — inspect `src/components/layout/PageShell.tsx` to confirm existing logo wrapper and sizing.
2. **Reposition logo** — move the logo container to the top corner of the banner (top + left/right depending on language direction) with consistent margin (`m-4`/`sm:m-6`/`lg:m-8`).
3. **Reduce size** — scale logo height down from current `h-20 sm:h-28 lg:h-36` to a smaller range (target `h-12 sm:h-16 lg:h-20`).
4. **Preserve direction logic** — keep Arabic logo on the left, English logo on the right.
5. **Verify** — check the preview on an internal page (e.g., `/about`) in both languages.

### Scope
- Only `src/components/layout/PageShell.tsx`.
- No changes to gradient, dot pattern, routes, or homepage banner.

### Acceptance
- Logo is visibly in the corner with margin.
- Logo is smaller than current version.
- Arabic and English layouts remain mirrored correctly.