# PCG Design System — Project Report

**Date:** April 19, 2026
**Scope:** 3 GitHub orgs, 39 repositories
**Repo:** https://github.com/Powerclub-Global/pcg-design-system

---

## Executive Summary

Audited 39 repositories across Powerclub-Global (19 repos), Sirak-Studios-Org (7 repos), and Soverign-Stack (13 repos). Found 226 components, 12 duplicate clusters, and ~7,650 lines of duplicated code. Built a unified design system with 5 packages (98 files, 6,019 LOC) and deployed to GitHub as a pnpm + turborepo monorepo.

---

## Phase 1: Audit — COMPLETE

### What Was Done

| Task | Status |
|------|--------|
| Clone all 39 repos (public + private) | Done |
| Scan 30 web projects for components | Done |
| Catalog 226 components with props, types, reusability scores | Done |
| Identify 9 non-web repos (Flutter, NixOS, Python) | Done |
| Detect 12 cross-repo duplicate clusters | Done |
| Extract design tokens from all repos | Done |
| Map color, typography, spacing, shadow, animation patterns | Done |
| Identify Tailwind v3/v4 split (13 v3, 17 v4) | Done |
| Discover Sovereign Stack rainbow color system | Done |
| Find 3 SS color mismatches (admin vs public) | Done |
| Find 9 different gold hex values across ecosystem | Done |
| Generate JSON schemas for 12 page builder block types | Done |

### Key Findings

#### Repository Breakdown

| Type | Count | Examples |
|------|-------|---------|
| Next.js web projects | 25 | willrise-web, okb-web, pythia-ai |
| Vite + React admin portals | 4 | spectrum-admin, vibe-admin, pythia-admin, pcg-admin |
| Flutter/Dart apps | 7 | YachtMaster-App, blackrock-go-app, timeless |
| NixOS config | 1 | vibertas-os |
| Python backend | 1 | apn-core |
| Rust + React (MCP) | 1 | pcg-cc-mcp |

#### Component Reusability

| Reusability | Count | % |
|-------------|-------|---|
| High (generic, props-driven) | 35 | 15% |
| Medium (some hardcoding) | 40 | 18% |
| Low (hardcoded content, no props) | 151 | 67% |
| **Total** | **226** | |

#### Duplicate Clusters Found

| # | Cluster | Repos | Duplicated LOC |
|---|---------|-------|---------------|
| 1 | true-lux / youseffs-yachts (exact clone) | 2 | ~1,200 |
| 2 | okb-web / okb-ventures-web (exact clone) | 2 | ~200 |
| 3 | willrise / skywalkerswings (exact clone) | 2 | ~300 |
| 4 | alchemy-water / resonance / prime-hospitality | 3 | ~400 |
| 5 | SS Ecosystem Header (identical across repos) | 7 | ~2,100 |
| 6 | SS Ecosystem Footer (identical across repos) | 7 | ~1,260 |
| 7 | `ecosystemProjects` data array (~14 copies) | 7 | ~700 |
| 8 | Admin Layout/Sidebar (identical) | 4 | ~460 |
| 9 | Admin AuthContext (identical) | 4 | ~250 |
| 10 | Admin App Shell + LoginPage (identical) | 4 | ~580 |
| 11 | springcreekvillage / fineartsociety template | 2 | ~200 |
| 12 | Cart implementations (independent) | 4 | N/A |
| | **Total estimated** | | **~7,650** |

#### Design Token Issues

**Gold color fragmentation — 9+ variants:**

| Hex | Used In |
|-----|---------|
| `#C9A227` | Sovereign Stack ecosystem |
| `#B4914C` | okb-web, okb-ventures |
| `#D4AF37` | prime-hospitality |
| `#ae904c` | powerclub-global, pcg-dashboard |
| `#C09863` | true-lux |
| `#c8952a` | alchemy-water |
| `#b4914b` | springcreekvillage, fineartsociety-web |
| `#D8B56D` | brg-web |
| `#CBA749` | YachtMaster trio |
| `#f5c542` | omega-wireless |

**Sovereign Stack color identity crisis:**

| Project | Public Site | Admin Portal | Match? |
|---------|------------|-------------|--------|
| Pythia AI | Indigo `#6366f1` | Purple `#8b5cf6` | NO |
| Spectrum Galactic | Purple `#8b5cf6` | Cyan `#00d4ff` | NO |
| VIBE Token | Green `#22c55e` | Amber `#f59e0b` | NO |
| Alpha Protocol | Red `#dc2626` | — | OK |
| Omega Wireless | Orange `#f97316` | — | OK |

**Tailwind version split:**
- v3: 13 repos (willrise, cable-com, skywalkerswings, alchemy-water, resonance, prime-hospitality, Moonshine, brg, springcreekvillage, fineartsociety-web, jungleverse, omega-wireless, powerclub-global)
- v4: 17 repos (Alpha-Protocol, pythia-ai, spectrum-galactic, vibe-token, 4 admins, okb-web, okb-ventures, vibeland, true-lux, youseffs-yachts, bgsc, sirak-studios, pcg-dashboard, pcg-cc-mcp)

---

## Phase 2: Package Build — COMPLETE

### What Was Built

#### Package: `@pcg/tokens` (30 files)

| File/Dir | Purpose |
|----------|---------|
| `css/colors.css` | Semantic color system with light/dark mode |
| `css/typography.css` | Fluid clamp() type scale (display-1 through small) |
| `css/spacing.css` | Container, section padding, content width tokens |
| `css/shadows.css` | 7 shadow levels (soft through elevation-3) |
| `css/animations.css` | 11 keyframes + utility classes |
| `css/base.css` | Single import entry point |
| `css/tailwind-theme.css` | TW v4 `@theme inline` block |
| `css/themes/` | 19 brand-specific CSS overrides |
| `tailwind-preset.ts` | TW v3 preset extending theme |
| `index.ts` | JS constant exports |
| `types.ts` | TypeScript interfaces |

**Brand themes created:**
powerclub-global, willrise, cable-com, skywalkerswings, alchemy-water, resonance, prime-hospitality, okb, okb-ventures, true-lux, youseffs-yachts, bgsc, sirak-studios, moonshine, brg, springcreekvillage, fineartsociety, jungleverse, omega-wireless

#### Package: `@sovereign-stack/config` (5 files)

| File | Purpose |
|------|---------|
| `projects.ts` | Canonical 7-project array with helper functions |
| `colors.ts` | Rainbow, gold, neutrals, status as JS constants + CSS var map |
| `types.ts` | EcosystemProject, NavItem, CTAButton, etc. |
| `index.ts` | Barrel export |

#### Package: `@sovereign-stack/ui` (10 files)

| Component | Replaces |
|-----------|----------|
| `EcosystemHeader` | 7 Header.tsx files (pythia-ai, spectrum-galactic, vibe-token, Alpha-Protocol, omega-wireless, vibeland, pcg-dashboard) |
| `EcosystemFooter` | 7 Footer.tsx files (same repos) |
| `EcosystemDropdown` | Ecosystem project switcher dropdown (desktop + mobile) |
| `EcosystemPills` | Footer ecosystem pill row |
| `useScrollPosition` | Scroll detection hook |
| `useBodyScrollLock` | Body scroll lock hook |

#### Package: `@sovereign-stack/admin-ui` (11 files)

| Component | Replaces |
|-----------|----------|
| `AdminLayout` | 4 Layout.tsx files (spectrum/vibe/pythia/pcg admin) |
| `AuthProvider + useAuth` | 4 AuthContext.tsx files |
| `LoginPage` | 4 LoginPage.tsx files |
| `ProtectedRoute` | 4 ProtectedRoute components in App.tsx |
| `AdminAppShell` | 4 App.tsx provider wrappers |
| `StatCard` | Dashboard stat cards |
| `ToggleSwitch` | Settings page toggles |
| `SettingsSection` | Settings page section layout |

#### Package: `@pcg/ui` (35 files)

**UI Primitives (13):**

| Component | Source Repo(s) | Key Features |
|-----------|---------------|--------------|
| `Button` | youseffs-yachts, jungleverse | CVA + Radix Slot, 5 variants, 5 sizes, CSS var themed |
| `Skeleton` | powerclub-global | Animated pulse loader |
| `Section` | willrise, skywalkerswings, jungleverse | id, title, subtitle, center, children |
| `ScrollReveal` | sirak-studios | IntersectionObserver, configurable delay/threshold |
| `ImageUpload` | willrise, skywalkerswings, Moonshine | Drag-and-drop via react-dropzone |
| `ShareButton` | powerclub-global | Web Share API + clipboard fallback |
| `CopyButton` | Alpha-Protocol | Copy-to-clipboard with feedback |
| `JsonLd` | sirak-studios | Server-safe JSON-LD injection |
| `ImageWithFallback` | skywalkerswings | img with error fallback |
| `ImageRotator` | skywalkerswings | Auto-rotating image carousel |
| `Pagination` | jungleverse | Framework-agnostic, ellipsis logic |
| `DateRangePicker` | powerclub-global | Calendar dropdown range picker |
| `StatCard` | spectrum-admin | Icon, value, trend display |

**Layout Components (3):**

| Component | Key Features |
|-----------|--------------|
| `Navbar` | 3 mobile variants (dropdown/drawer/fullscreen), scroll behavior, theme, phone slot, cart slot |
| `Footer` | Config-driven link sections, social links, contact info, newsletter slot |
| `Container` | Polymorphic `as` prop, configurable maxWidth |

**Block Components (12):**

| Component | Key Features |
|-----------|--------------|
| `HeroSection` | Eyebrow, headline, CTAs, 4 bg variants, scroll indicator, animation options |
| `CTASection` | Heading, description, buttons, 4 section variants |
| `FAQSection` | Accordion with category filter, single/multi expand |
| `FeatureGrid` | Icon/title/desc cards, 2-4 columns, 3 visual variants |
| `PricingSection` | Tier cards, popular badge, included/excluded features |
| `Testimonials` | Grid or carousel, star ratings, avatar fallback |
| `ContactForm` | Configurable fields array, sections, submit handler |
| `NewsletterSignup` | 3 variants (inline/card/footer), status handling |
| `StatsSection` | Animated counters, IntersectionObserver trigger |
| `ServicesGrid` | Icon + image cards, optional links |
| `PartnerMarquee` | Infinite CSS marquee, configurable speed/direction |
| `TrustBadges` | Badges with image + label, row/grid layout |

**Commerce (1):**

| Component | Key Features |
|-----------|--------------|
| `VariantManager` | Dynamic variant CRUD, configurable attributes, inline editing |

**Hooks (3):**

| Hook | Purpose |
|------|---------|
| `useScrollPosition` | Returns y, isScrolled, direction |
| `useBodyScrollLock` | Preserves scroll position, position:fixed technique |
| `useIntersection` | IntersectionObserver with triggerOnce |

---

## Phase 3: Monorepo Deployment — COMPLETE

| Task | Status |
|------|--------|
| Init git repo with pnpm workspaces | Done |
| Configure turborepo (turbo.json) | Done |
| Set up tsconfig chain (base + per-package) | Done |
| Wire workspace dependencies (`workspace:*`) | Done |
| Create GitHub repo under Powerclub-Global org | Done |
| Push 102 files (6,019 LOC) to main branch | Done |

**Repo:** https://github.com/Powerclub-Global/pcg-design-system

---

## Phase 4: Migration — NOT STARTED

### Priority 1: Quick Wins (< 1 day each)

| Task | Repos Affected | LOC Eliminated | Effort |
|------|---------------|---------------|--------|
| Fix SS admin colors to match public sites | pythia-admin, spectrum-admin, vibe-admin | — | 30 min |
| Replace `ecosystemProjects` with `@sovereign-stack/config` | 7 SS public sites | ~700 | 2 hrs |
| Merge true-lux + youseffs-yachts onto `@pcg/ui` + theme CSS | 2 repos | ~1,200 | 4 hrs |
| Replace SS Header/Footer with `@sovereign-stack/ui` | 7 repos | ~3,360 | 4 hrs |

### Priority 2: Admin Consolidation (1-2 days)

| Task | Repos Affected | LOC Eliminated | Effort |
|------|---------------|---------------|--------|
| Replace admin Layout/Auth/Login with `@sovereign-stack/admin-ui` | 4 admin portals | ~1,540 | 4 hrs |
| Standardize admin routing through `AdminAppShell` | 4 admin portals | ~280 | 2 hrs |

### Priority 3: Client Site Migration (1 week)

| Task | Repos Affected | LOC Eliminated | Effort |
|------|---------------|---------------|--------|
| Replace willrise + skywalkerswings shared components | 2 repos | ~300 | 3 hrs |
| Replace alchemy-water + resonance + prime-hospitality NewsletterSignup | 3 repos | ~400 | 2 hrs |
| Migrate okb-web + okb-ventures Header/Footer | 2 repos | ~200 | 2 hrs |
| Replace all Navbar/Footer with `@pcg/ui` Navbar/Footer | 18 repos | ~2,000+ | 1 week |
| Swap hardcoded hex colors for `@pcg/tokens` CSS vars | 30 repos | — | 3 days |

### Priority 4: Standardization (2-3 weeks)

| Task | Description | Effort |
|------|-------------|--------|
| Migrate all repos to Tailwind v4 | 13 repos currently on v3 | 1 week |
| Standardize gold color | Pick `#C9A227` for SS, per-brand for clients | 1 day |
| Add CI/CD | GitHub Actions for typecheck, lint on PR | 2 hrs |
| Publish to npm | Private `@pcg` and `@sovereign-stack` scopes | 4 hrs |
| Storybook | Component documentation and visual testing | 1 week |

### Priority 5: Page Builder (future)

| Task | Description | Effort |
|------|-------------|--------|
| Build JSON-driven page renderer | Uses 12 block schemas from audit | 1 week |
| Build admin UI for page composition | Drag-and-drop block editor | 2-3 weeks |
| Add CMS integration | Headless CMS for block content | 1 week |

---

## Metrics

| Metric | Value |
|--------|-------|
| Repos audited | 39 |
| Components cataloged | 226 |
| Duplicate clusters found | 12 |
| Duplicated LOC identified | ~7,650 |
| Packages built | 5 |
| Files created | 102 |
| Lines of code written | 6,019 |
| Brand themes created | 19 |
| Block JSON schemas defined | 12 |
| Estimated LOC savings after full migration | ~7,650+ |

---

## Appendix: JSON Block Schemas for Page Builder

12 block types defined with configurable props. Each can be rendered from a JSON document:

`hero`, `cta`, `faq`, `feature-grid`, `pricing`, `testimonials`, `contact-form`, `newsletter`, `stats`, `services-grid`, `partner-marquee`, `trust-badges`

See full schema definitions in the audit report above.

---

## Appendix: Non-Web Repos (excluded from component library)

| Repo | Tech | Notes |
|------|------|-------|
| YachtMaster-App | Flutter/Dart 3.29 | Yacht charter mobile app |
| YachtMaster-Web | Flutter/Dart Web | Marketing landing page |
| YachtMaster-Admin | Flutter/Dart 2.17 | Admin panel |
| aplha_go | Flutter/Dart 2.17 | YachtMaster predecessor |
| blackrock-go-app | Flutter/Dart 3.3 | Map-first Go variant |
| timeless | Flutter/Dart 3.2 | Roofing company site |
| fineartsociety | Flutter/Dart 3.1 | Art gallery app |
| vibertas-os | NixOS flake | Raspberry Pi cluster config |
| apn-core | Python 3, FastAPI, PyQt6 | APN node server |

These share a gold color theme (`#CBA749`) and could benefit from a shared `@pcg/flutter-tokens` package in the future.
