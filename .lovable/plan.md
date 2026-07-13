
# Dynamic RSIC — Phase 1 Plan

Turn today's static site (content hard-coded in `src/lib/*.ts`) into a database-backed, admin-editable experience with a polished motion layer. Single-admin auth. No public sign-ups.

---

## 1. Backend: Lovable Cloud

Enable Lovable Cloud (Postgres + Auth + Storage + Edge). One private admin user seeded on first boot; no public sign-ups (Auth setting: sign-ups disabled — you invite yourself once).

### Schema (all bilingual: `*_ar` / `*_en` columns; images/pdfs in Storage buckets `media`, `pdfs`)

**Blog**
- `posts` — `id, kind ('news'|'article'|'report'), slug, title_ar, title_en, excerpt_ar, excerpt_en, body_ar, body_en, cover_url, pdf_url, published_at, status ('draft'|'published'), views, likes`
- `comments` — `id, post_id, author_name, body, created_at, approved bool` (moderated in admin)

**Dashboard (PoC)**
- `states` — `code, name_ar, name_en, maturity, lat, lng`
- `state_indicators` — `state_code, category, label_ar, label_en, value_ar, value_en, pdf_url`
- `roadmap_stages` — `order, title_ar/en, status, dates, description_ar/en`
- `tasks` — `id, stage_id, title_ar/en, owner, status, due_at`
- `funding` — `wp_code, allocated_usd, received_usd, source`
- `milestones` — `wp_code, title_ar/en, due_at, status`
- `global_indices` — editable rows for the CIP / ECI / AII strip

**Site content**
- `pages` — `slug (home|about|governance|impact|projects|contact), sections jsonb` (typed sections: hero, stats, pillars, cta, richtext)
- `site_settings` — singleton: phone, email, socials, banner image, org name
- `team` — for About / Governance

### Security
- RLS ON everywhere. Public: `SELECT` on published rows only. Admin (role = `admin` in `user_roles`) full CRUD via `has_role()` (per user-roles rules — separate table, security-definer).
- Storage: public read for `media`/`pdfs`, admin-only write.
- Storefront reads go through a server publishable client in `createServerFn`; admin writes go through `requireSupabaseAuth` + role check.

---

## 2. Migration of existing content

One-time seed migration copies today's constants into the DB, exactly as they read now:
- `src/lib/content.ts` posts → `posts` (with existing cover images uploaded to Storage)
- `src/lib/oasis-data.ts` → `states` + `state_indicators` + `roadmap_stages` + `tasks`
- `src/lib/poc-fallback.json` → `funding` + `milestones`
- `src/lib/global-indices.ts` → `global_indices`
- `src/lib/site.ts` + page copy → `pages` + `site_settings`

After migration, the old `src/lib/*.ts` files are deleted and every page reads from server functions.

---

## 3. Admin panel `/admin` (behind `_authenticated` + admin role)

Clean, dense dashboard UI (shadcn + our teal/gold tokens). Sections:
- **Dashboard** — traffic, top posts, pending comments
- **Blog** — list/filter, rich editor (TipTap) with AR/EN tabs, cover uploader, PDF uploader for reports, publish/draft toggle
- **Dashboard data** — editable tables for states, indicators, roadmap, tasks, funding, milestones, global indices, with inline validation
- **Pages** — section-based editor for Home / About / Governance / Impact / Projects / Contact; live preview drawer
- **Media library** — Storage browser (images + PDFs), drag-and-drop upload
- **Comments** — moderation queue (approve/reject/delete)
- **Settings** — org info, socials, banner, contact
- **Users** — invite (single-admin now, extensible later)

Sign-in at `/auth` (email + password). Sign-ups disabled in Supabase; only your account exists.

---

## 4. Public site refactor (server-first, still fast)

Every route becomes loader-driven:
- Loaders call `createServerFn` that reads from Postgres (publishable client, RLS-safe).
- TanStack Query wires `ensureQueryData` + `useSuspenseQuery`.
- Dynamic OG images per post/state (loader-driven `head()`).
- `sitemap.xml` and `robots.txt` regenerated from DB.

Metrics upgrade: replace `localStorage` view/like counters with server-side increments (RPC `increment_views(post_id)`; likes gated by a lightweight anonymous cookie to prevent spam; comments through moderated `comments` table).

---

## 5. UX & motion layer

Add `framer-motion` and one cohesive motion system — restrained, editorial, matching the industrial-growth aesthetic:
- **Page transitions** — fade + subtle rise on route change (respects `prefers-reduced-motion`)
- **Scroll reveals** — section headers, cards, KPI numbers count up on enter
- **Hero polish** — banner parallax, gradient wash, animated section-number ticker
- **Blog cards** — hover lift, image zoom, animated metric chips
- **Dashboard** — map hover glow, roadmap stepper progress animation, KPI counters, drawer spring transitions
- **Micro-interactions** — button press ripple, link underline sweep, toast slide-in, form field focus glow
- **Loading states** — skeletons that match final layout (no CLS)
- **Command menu (⌘K)** — optional Phase 1.5 nice-to-have; deferred unless you want it in now

Accessibility kept: focus rings, ARIA on interactive dashboard, reduced-motion fallbacks.

---

## Technical details

- Stack unchanged: TanStack Start v1, React 19, Tailwind v4, shadcn.
- New deps: `framer-motion`, `@tiptap/react` + starter-kit + image/link extensions, `react-dropzone` (media uploads), `date-fns` (already present via TanStack? verify).
- File additions:
  - `src/lib/*.functions.ts` per domain (posts, dashboard, pages, settings, media, comments)
  - `src/routes/_authenticated/admin.*.tsx` for every admin surface
  - `src/routes/auth.tsx` (email/password login)
  - `src/components/admin/*` (DataTable, RichEditor, MediaPicker, SectionEditor, BilingualField)
  - `src/components/motion/*` (PageTransition, Reveal, Counter)
- Bearer middleware already appended in `src/start.ts` per project scaffold — verify before shipping.
- Migrations include GRANTs (`authenticated` + `service_role`; `anon` only on public read tables per policy).

---

## Delivery order

1. Enable Lovable Cloud, ship schema + RLS + storage buckets + seed migration.
2. Auth + `/auth` + `_authenticated` gate + `admin` role, seed your user.
3. Public site refactor to server functions (blog first, then dashboard, then pages).
4. Admin panel (Blog → Pages → Dashboard data → Media → Comments → Settings).
5. Motion & micro-interactions pass across the whole site.
6. Server-backed metrics + moderated comments.
7. Final SEO/perf pass (dynamic OG, sitemap from DB, image `srcset`, Lighthouse).

Phase 1 ends when every page reads from the DB, you can edit everything from `/admin`, and the motion layer is applied site-wide.

## Out of scope for Phase 1 (flag for later)
- Public accounts / newsletter / donor portal
- Real-time WebSocket updates (dashboard/funding auto-refresh)
- Global ⌘K search
- Real payments on `/donate` (still routes to `/support` coming-soon)
- Multi-editor roles

Confirm and I'll start with step 1 (enable Cloud + schema + migration).
