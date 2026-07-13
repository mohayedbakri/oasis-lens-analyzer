## Add dot pattern to banner gradient overlay

The reference banner has a faint dot grid layered over the dark-to-teal gradient. Currently `PageBanner` renders only the gradient — no dots.

### Change

**`src/components/layout/PageShell.tsx`** — inside the `overlay` block, add a second absolutely-positioned layer above the gradient (below the logo) that paints a repeating dot pattern:

- `background-image: radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)`
- `background-size: 14px 14px`
- `opacity: ~0.5`, `mix-blend-mode: overlay` for a subtle etched look
- `pointer-events-none`, covers `inset-0`
- Stacking order: image → gradient → dot pattern → logo (logo stays crisp on top)

No changes to routes, tokens, or the homepage banner. Direction/logo side logic stays as-is (dark+logo left in AR, right in EN).
