Apply the gradient banner style from the uploaded screenshot to the "رؤية وطنية بعيدة المدى" section at the bottom of `/impact`.

What will change:
1. Replace the plain `bg-secondary/40` section with a full-width banner using the RSIC teal (`#077a75`) base color.
2. Add a dark-to-teal gradient overlay that runs from the left for Arabic (RTL) and from the right for English (LTR), matching the direction logic already used in `PageBanner`.
3. Change the section text to light/cream (`primary-foreground`) so it reads clearly over the teal.
4. Keep the existing gold eyebrow (`section-number`) and add a short gold underline beneath the title.
5. Maintain vertical padding and max-width centering so the layout stays balanced.

Files to edit:
- `src/routes/impact.tsx` — restyle the long-vision section and add direction-aware gradient classes/inline styles.

No new dependencies or routes are required. The change is localized to the impact page's bottom banner.