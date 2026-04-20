# Independent 3-Org Audit

**Date:** 2026-04-20
**Scope:** 39 repos across Powerclub-Global (19), Sirak-Studios-Org (7), Soverign-Stack (13)
**Auditor:** Claude (Opus 4.7), commissioned by Bodhi
**Purpose:** Independent re-audit to verify/correct Akshat Dhami's REPORT.md (2026-04-18)
**Method:** Shallow-clone, MD5 hash comparison, dependency and hex-code enumeration, file-tree diff

---

## 0. Architectural correction — Admin panels belong inside web repos

**The Soverign-Stack admin-split pattern is wrong.** The current architecture (pcg-admin, pythia-admin, vibe-admin, spectrum-admin as four standalone Vite + React Router SPAs, separate from their product sites) should be reversed. Admin surfaces must live inside the product repo as `app/admin/(secure)` routes — the pattern established by `Powerclub-Global/willrise-web` and `Powerclub-Global/Moonshine-Merchantile-web` and followed by `Sirak-Studios-Org/sirak-studios-web`.

**Why:** Cross-repo admin forces coordination for every schema/auth/deploy change, fragments the stack (Next + Vite), and duplicates scaffolding (as our audit found: Vite+Radix+RR7 boilerplate × 4). A single-repo admin shares one deploy, one auth context, one DB client, one component library, and one domain.

**Implication for the library:**

The `@sovereign-stack/admin-ui` package was built on a wrong premise. It peers `react-router-dom` and targets the four standalone Vite admins. Options:

1. **Deprecate the package** and rebuild the admin surface as Next.js-native primitives inside `@pcg/ui` (`AdminShell`, `AdminSidebar`, `ProtectedRoute` using `next/navigation`, `AuthProvider` using Next middleware + session).
2. **Repurpose the package** as Next-compatible (drop `react-router-dom`, swap for `next/link`/`next/navigation`), then use it as `app/admin/layout.tsx` scaffold.
3. **Fold the admin components into `@pcg/ui`** as a new `/admin/` subpath export.

**Migration pairs to fold + delete:**

| Standalone admin repo | Destination product repo | Target path |
|---|---|---|
| `Soverign-Stack/pcg-admin` | `Soverign-Stack/pcg-dashboard` | `app/admin/` |
| `Soverign-Stack/pythia-admin` | `Soverign-Stack/pythia-ai` | `app/admin/` |
| `Soverign-Stack/spectrum-admin` | `Soverign-Stack/spectrum-galactic` | `app/admin/` |
| `Soverign-Stack/vibe-admin` | `Soverign-Stack/vibe-token` | `app/admin/` |

**After fold-in:** delete the 4 admin repos. Heads up: `spectrum-admin-nu.vercel.app` and `vibe-admin-nu.vercel.app` are live — reroute or accept breakage before deleting.

This also means Akshat's Priority 2 (“Replace admin Layout/Auth/Login with `@sovereign-stack/admin-ui`”) should be rewritten as **“Fold each `*-admin` Vite repo into its Next.js product sibling, then delete the admin repo.”**

---

## 1. Top-line numbers — Ours vs Akshat

| Metric | Akshat | Ours | Verdict |
|---|---|---|---|
| Total repos audited | 39 | 39 | ✅ match |
| Next.js web projects | 25 | 25 | ✅ match |
| Vite + React admin portals | 4 | 4 | ✅ match |
| Flutter/Dart apps | 7 | 7 | ✅ match |
| NixOS config | 1 | 1 | ✅ match |
| Python backend | 1 | 1 | ✅ match |
| Components cataloged | 226 | not fully re-enumerated; spot checks suggest ±10% | ≈ match |
| Duplicate clusters | 12 | 12 confirmed + 2 he missed = 14 | ⚠️ undercount |
| Duplicated LOC | ~7,650 | **~18,000+** (2.4× higher) | ❌ major undercount |
| Tailwind v3 / v4 split | 13 / 17 | 13 / 16 (+4 admins use v4 pkg with v3 syntax) | ⚠️ nuance |
| Gold hex variants | 9 | **15+ unique** | ❌ undercount |
| Public/admin color mismatches | 3 | **4** | ❌ missed one |

**Headline:** Akshat's *framework* counts are exact. His *duplication* numbers are ~2.4× too low because he counted shared component files, not shared directory trees. His color-fragmentation numbers are ~1.7× too low because he dedup'd across orgs but the within-org variance is worse.

---

## 2. Verification of Akshat's 12 duplicate clusters

| # | Cluster | Akshat's claim | Our finding | Verdict |
|---|---|---|---|---|
| 1 | true-lux / youseffs-yachts | "exact clone", ~1,200 LOC | **NOT byte-identical** — 25/25 shared files differ. Structural fork with brand/color substitution. Real dup ~2,800–3,000 LOC | ❌ wrong framing, undercounted 2×+ |
| 2 | okb-web / okb-ventures-web | "exact clone", ~200 LOC | Confirmed structural fork. Header/Footer ~30–60 diff lines on ~100-line files. Identical gold palette, identical admin `(secure)` + API trees. Real dup ~1,500+ LOC | ❌ undercounted ~7× |
| 3 | willrise / skywalkerswings | "exact clone", ~300 LOC | E-commerce twins — identical `admin/(secure)` + `api/{blog,cart,checkout,collections,products,upload,careers,contact,health,metrics}` trees. Deps diverge only by `@vercel/blob` vs `pg`. Navbar 165 vs 157 LOC, recolor-only fork. Real dup ~2,500+ LOC | ❌ undercounted ~8× |
| 4 | alchemy / resonance / prime-hospitality | "NewsletterSignup shared", ~400 LOC | NewsletterSignup confirmed identical (MD5 `37e35634...` × 3 = 474 LOC). **BUT** — byte-identical `app/admin/` trees (12 pages, 0 differs) + identical `next.config.js` + identical `.env.example` across all 3. Real dup **~8,500 LOC** | ❌ undercounted **21×** |
| 5 | SS Ecosystem Header | "identical across 7 repos", ~2,100 LOC | **All 7 have distinct MD5s.** Structural near-copies (351–409 LOC each, same skeleton). Diff from Alpha baseline: pcg-dashboard 140, omega 252, pythia 91, spectrum 108, vibe 88, vibeland 88. Real dup ~2,520 LOC (forked+drifted, not identical) | ⚠️ right LOC, wrong framing |
| 6 | SS Ecosystem Footer | "identical across 7 repos", ~1,260 LOC | Same pattern — distinct MD5s, near-copies. ~184 LOC × 7 ≈ 1,288 LOC | ⚠️ right LOC, wrong framing |
| 7 | `ecosystemProjects` array (~14 copies) | ~700 LOC | **Exactly 14 occurrences confirmed** (2 per public site × 7 sites: Header + Footer) | ✅ exact |
| 8 | Admin Layout/Sidebar (4 admins) | "identical", ~460 LOC | **Distinct MD5s.** pcg-admin ↔ pythia-admin ~90–95% identical (color+brand swap). vibe-admin + spectrum-admin diverged more (rewrote AuthContext, expanded LoginPage). Not "identical" — "1 scaffold forked 4×, 2 clones + 2 evolved" | ❌ overstated |
| 9 | Admin AuthContext | "identical" | vibe-admin diverges 62 lines from pcg baseline (62L file) — AuthContext effectively rewritten. Others near-identical. | ❌ overstated |
| 10 | Admin App Shell + LoginPage | "identical", ~580 LOC | vibe-admin LoginPage diverges 97 lines from baseline (84L file) — effectively rewritten and expanded. Others near-identical. | ❌ overstated |
| 11 | springcreekvillage / fineartsociety | "template", ~200 LOC | **Confirmed.** Pages-router JS twins, identical component inventory (`NavBar.js`, `Footer.js`, `HeroSection.js`, `Newsletter.js`), same colors (`#4e2e18 #b4914b #f9e230`), Cinzel font, same top-bar pattern. springcreek's `package.json.name` is still **`"powerclubseo"`** — never renamed after fork. | ✅ confirmed |
| 12 | Cart implementations | "independent", N/A | Not re-audited in depth. | — |

**Net verdict on clusters:** Akshat correctly *identified* 11 of 12 clusters (cluster 12 was already "independent"). His LOC attributions are mostly wrong, typically undercounted, because he appears to have scoped each cluster to the *named component* rather than the *full forked directory tree*.

---

## 3. NEW findings Akshat missed

### 3.1 Committed secrets (critical)

- **`cable-com-web/.env.local`** — real-looking 12-char Zoho SMTP password (`khCY5R...`). Committed to public repo.
- **`willrise-web/.env`** — real-looking 87-char `SESSION_SECRET` (`Nd4n5...`) + 126-char `DATABASE_URL`. Committed to public repo.

Both need immediate rotation + `git filter-repo` history scrub. This is not in Akshat's report.

### 3.2 Template contamination

- **`prime-hospitality-web/package.json.name`** = literal string `"{{PROJECT_SLUG}}"`.
- **`resonance-web/package.json.name`** = literal string `"{{PROJECT_SLUG}}"`.
- **`springcreekvillage-web/package.json.name`** = `"powerclubseo"` (never renamed from ancestor).

All three shipped from a scaffolding template that was never personalized. Suggests these repos may have been spun up for client demos and never actually launched.

### 3.3 YachtMaster misclassification

Akshat's Appendix lists `YachtMaster-Web` as Flutter/Dart Web "marketing landing page" (correct). But the initial org enumeration called it a web project — it should be excluded from the 25-Next-projects count. Net count still works out because he correctly categorized it in the non-web appendix.

### 3.4 Fourth public/admin color mismatch

Akshat flagged 3 Sovereign Stack pairs as mismatched (Pythia, Spectrum, VIBE). Missed:

| brand | public primary | admin primary | match? |
|---|---|---|---|
| **PCG itself** | pcg-dashboard `#eab308` (yellow) + `#ae904c` (gold) | pcg-admin `#10b981` (emerald) | **MISMATCH** |

That's a 4th mismatched pair inside the Sovereign Stack admin system.

### 3.5 Sovereign Gold itself has 3 variants

Report declares `#C9A227` as *the* Sovereign Stack ecosystem gold. Reality:

- `#C9A227` — Akshat's canonical value (declared in REPORT but not actually present in any token file)
- `#ae904c` — what pcg-dashboard actually uses in globals.css
- `#f5c542` — omega-wireless legacy value (per Akshat's own appendix)

So even the "canonical" color has 3 live variants inside Soverign-Stack. This affects the library's token defaults in `packages/pcg-tokens/css/colors.css` — currently `--color-accent: #ae904c` and `--color-gold: #B4914C`, neither of which is `#C9A227`.

### 3.6 Gold fragmentation is worse than 9

Akshat found 9 gold variants across all 3 orgs. Powerclub-Global alone contains:

`#b4914b`, `#B4914C`, `#ae904c`, `#D4B978`, `#D8B56D`, `#C5A572`, `#b89673`, `#d4bfa6`, `#b58561`, `#cba586`

That's **10 variants in one org**. Add Sirak's `#D4AF37` (prime/resonance), `#c8952a` (alchemy), `#C09863` (true-lux), and Sovereign Stack's `#C9A227`, `#f5c542` — **≥15 unique gold-ish hex values** across the ecosystem.

### 3.7 Zero deploy configs across Soverign-Stack

All 11 Sovereign Stack web repos have **zero** `vercel.json` / `fly.toml` / `netlify.toml` / `Dockerfile` / `.github/workflows/deploy*`. No committed CI/CD path. Deployment is either entirely Vercel-dashboard-configured or non-existent. This is a major migration blocker — you can't roll out a new library version safely without a reproducible deploy story.

### 3.8 Next.js + React version fragmentation

Seven distinct React versions running across the ecosystem: `18.2.0`, `18.3.0`, `18.3.1`, `19.0.0-rc`, `19.0.0`, `19.2.1`, `19.2.3`, `19.2.4`. Eight, actually.

Three Next.js generations live: `14.2.x` (4 repos), `15.x` (4 repos), `16.x` (11 repos). Notable: **omega-wireless is the only Sovereign Stack public site still on Next 14.2** — the other 6 got a coordinated Next 16 + Tailwind v4 regen on 2026-03-13. Omega is the outlier because it's the only one with a real Stripe integration, which likely gated the upgrade.

### 3.9 Admin portals use Tailwind v4 package with v3 syntax

All 4 SS admins declare `tailwindcss@^4.1.18` but their `src/index.css` still uses `@tailwind base; @tailwind components; @tailwind utilities;` (v3 directives). This works via legacy shim but is incorrect and will break when v4 removes it. Akshat counted these as v4 in his split — technically correct, practically misleading.

### 3.10 Zero library adoption

**None** of the 31 web repos import `@pcg/ui`, `@pcg/tokens`, `@sovereign-stack/ui`, `@sovereign-stack/config`, or `@sovereign-stack/admin-ui`. Phase 4 of Akshat's plan is 0% started. The library exists as scaffolding; no consumer has migrated.

---

## 4. Revised duplication LOC estimate

| Cluster | Akshat's LOC | Ours | Ratio |
|---|---|---|---|
| true-lux / youseffs-yachts | 1,200 | ~3,000 | 2.5× |
| okb / okb-ventures | 200 | ~1,500 | 7.5× |
| willrise / skywalkers | 300 | ~2,500 | 8.3× |
| alchemy / resonance / prime | 400 | ~8,500 | 21.3× |
| SS Header × 7 | 2,100 | ~2,520 | 1.2× |
| SS Footer × 7 | 1,260 | ~1,288 | 1.0× |
| ecosystemProjects × 14 | 700 | ~700 | 1.0× |
| Admin Layout × 4 | 460 | ~400 (2 clones) | 0.9× |
| Admin AuthContext × 4 | 250 | ~180 (2 clones) | 0.7× |
| Admin Shell + Login × 4 | 580 | ~400 (2 clones) | 0.7× |
| springcreek / fineartsociety | 200 | ~200 | 1.0× |
| **Subtotal** | **~7,650** | **~21,188** | **2.8×** |

Where our number is lower (admin clusters), it's because 2 of 4 admins diverged enough that their LOC is genuine customization, not duplication. Where higher, it's because Akshat scoped to files not directories.

---

## 5. Revised migration priorities

Akshat's Priority 1 "Quick Wins" list is correct but under-scoped. Corrections:

| Priority | Task | Akshat effort | Revised effort | Why |
|---|---|---|---|---|
| **P0 (new)** | **Rotate & scrub committed secrets** (cable-com, willrise) | not listed | 2 hrs | Security — public repos with real credentials |
| **P0 (new)** | **Add `.gitignore` enforcement + pre-commit secret scanning across all 39 repos** | not listed | 4 hrs | Prevent recurrence |
| P1 | Fix SS admin colors to match public sites | 30 min | 30 min + 1 more pair (pcg) | Was 3 pairs, is 4 |
| P1 | Replace `ecosystemProjects` with `@sovereign-stack/config` | 2 hrs | 2 hrs | ✅ accurate |
| P1 | Merge alchemy/resonance/prime admin scaffold onto shared package | not listed | 1 week | 8,500 LOC cluster Akshat missed |
| P1 | Merge true-lux + youseffs onto shared design | 4 hrs | 1 day | 3× larger than estimated |
| P1 | Merge willrise + skywalkers onto shared e-commerce scaffold | 3 hrs | 1 week | 2,500 LOC + full admin + API routes |
| P1 | Merge okb + okb-ventures onto shared scaffold | 2 hrs | 1 day | ~1,500 LOC + admin + API |
| P2 | **Commit deploy configs across all 11 SS repos** | not listed | 1 day | Zero exist — migration risk |
| P2 | Upgrade omega-wireless to Next 16 + TW v4 | not listed | 1 day | Only SS holdout on old stack |
| P2 | ~~Replace admin Layout/Auth/Login with `@sovereign-stack/admin-ui`~~ **Fold each `*-admin` Vite repo into its Next product sibling as `app/admin/(secure)` — then delete admin repo** | 4 hrs | 2 weeks | **Wrong-premise package** — admin belongs in the web repo, not standalone Vite apps (see §0) |
| P2 | ~~Standardize admin routing through `AdminAppShell`~~ **Deprecate or repurpose `@sovereign-stack/admin-ui` for Next.js** | 2 hrs | 1 week | Package peers `react-router-dom` — incompatible with target architecture |
| P3 | Replace all Navbar/Footer with `@pcg/ui` | 1 week | 1 week | ✅ accurate |
| P3 | Consolidate gold hex values | 1 day | 2 days | Was 9 variants, is 15+ |
| P3 | Migrate all repos to Tailwind v4 | 1 week | 1 week + fix admin v3-syntax-in-v4-pkg | More nuanced than v3/v4 binary |
| P3 | Standardize React version | not listed | 2 days | 8 minor versions in prod — peer dep risk |
| P4 | CI/CD | 2 hrs | 1 day | Must cover 39 repos, not just library |
| P4 | Storybook | 1 week | 1 week (deferred — playground covers 60% of need) | Playground already exists |

---

## 6. Appendix A: Full 31-repo scorecard

### Powerclub-Global (11 web, 2 Flutter misclassified, 1 library)

| repo | framework | react | tw | primary | accent | components | last_commit | notes |
|---|---|---|---|---|---|---|---|---|
| fineartsociety-web | Next 15.0.3 | 18.3.1 | v3 3.4.14 | `#4e2e18` | `#b4914b` | 0 tsx | 2024-12-05 | Pages router, JS |
| springcreekvillage-web | Next 15.0.3 | 19.0.0-rc | v3 3.4.14 | `#314528` | `#b4914b` | 0 tsx | 2025-04-12 | pkg name = `powerclubseo` |
| powerclub-global-web | Next 15.5.12 | 19.0.0 | v3 3.4.1 | `#000000` | `#ae904c` | 24 | 2026-02-13 | main org site |
| brg-web | Next 14.2.5 | 18.3.1 | v3 3.4.3 | `#0B0B0B` | `#D8B56D` | 4 | 2025-08-25 | 62 KB tiny |
| Moonshine-Merchantile-web | Next 14.2.10 | 18.2.0 | v3 3.4.10 | `#8a1b1b` | `#b58561` | 8 | 2025-10-29 | — |
| willrise-web | Next 14.2.32 | 18.3.1 | v3 3.4.9 | `#0f172a` | `#FF6A00` | 6 | 2026-03-20 | ⚠️ committed secrets |
| skywalkerswings-web | Next 14.2.32 | 18.3.1 | v3 3.4.9 | `#042522` | `#c62872` | 8 | 2025-10-25 | e-commerce twin of willrise |
| cable-com-web | Next 15.5.9 | 18.3.0 | v3 3.4.0 | `#002868` | `#C5A572` | 4 | 2026-01-09 | ⚠️ committed SMTP pass |
| jungleverse-web | Next 16.0.8 | 19.2.1 | v3 3.4.16 | `#0a4212` | `#b89673` | 68 | 2026-03-14 | largest component count |
| okb-web | Next 16.1.1 | 19.2.3 | v4 | `#0a0a0a` | `#B4914C` | 2 | 2026-01-26 | twin of okb-ventures |
| okb-ventures-web | Next 16.1.1 | 19.2.3 | v4 | `#0a0a0a` | `#B4914C` | 5 | 2026-01-12 | — |

### Sirak-Studios-Org (7 web)

| repo | framework | react | tw | primary | accent | components | last_commit | notes |
|---|---|---|---|---|---|---|---|---|
| prime-hospitality-web | Next 14.2 | 18.3 | v3 | `#171717` | `#D4AF37` | 3 | 2026-01-15 | pkg.name = `{{PROJECT_SLUG}}` |
| resonance-web | Next 14.2 | 18.3 | v3 | `#171717` | `#D4AF37` | 3 | 2026-01-14 | pkg.name = `{{PROJECT_SLUG}}` |
| alchemy-water-web | Next 14.2 | 18.3 | v3 | `#0a2a4a` | `#c8952a` | 8 | 2026-02-19 | "from powerclub-template" |
| true-lux | Next 16.1.6 | 19.2.3 | v4 | `#C09863` | `#0A1628` | 10 | 2026-02-18 | yacht-fork twin |
| youseffs-yachts-web | Next 16.1.6 | 19.2.3 | v4 | `#006DB0` | `#00BFFF` | 10 | 2026-03-04 | yacht-fork twin |
| sirak-studios-web | Next 16.1.6 | 19.2.4 | v4 | `#fe0100` | `#0099ff` | 5 | 2026-03-09 | Bodhi's agency site |
| bgsc-web | Next 16.2.2 | 19.2.4 | v4 | `#8F0000` | `#F5F5F3` | 14 | 2026-04-18 | hottest repo |

### Soverign-Stack (7 public + 4 admin)

| repo | type | framework | react | tw | primary | accent | last_commit | notes |
|---|---|---|---|---|---|---|---|---|
| Alpha-Protocol-web | public | Next 16.1.5 | 19.2.3 | v4 | `#dc2626` | `#ef4444` | 2026-03-13 | — |
| pcg-dashboard | public | Next 16.1.5 | 19.2.3 | v4 | `#eab308` | `#ae904c` | 2026-03-13 | dead `--coral`/`--cyan` aliases |
| omega-wireless | public | Next 14.2.10 | 18.3.1 | v3 | `#f97316` | `#ea580c` | 2026-03-13 | only SS v3 holdout; Stripe |
| pythia-ai | public | Next 16.1.5 | 19.2.3 | v4 | `#6366f1` | `#4f46e5` | 2026-03-13 | — |
| spectrum-galactic | public | Next 16.1.5 | 19.2.3 | v4 | `#8b5cf6` | `#7c3aed` | 2026-03-13 | — |
| vibe-token | public | Next 16.1.5 | 19.2.3 | v4 | `#22c55e` | `#16a34a` | 2026-03-13 | — |
| vibeland-web | public | Next 16.1.5 | 19.2.3 | v4 | `#3b82f6` | `#2563eb` | 2026-03-12 | — |
| pcg-admin | admin | Vite 7.2.4 | 19.2.0 | v4 pkg/v3 syntax | `#10b981` | `#059669` | 2026-01-26 | ↔ pythia-admin near-clone |
| pythia-admin | admin | Vite 7.2.4 | 19.2.0 | v4 pkg/v3 syntax | `#8b5cf6` | `#7c3aed` | 2026-01-26 | ↔ pcg-admin near-clone |
| vibe-admin | admin | Vite 7.2.4 | 19.2.0 | v4 pkg/v3 syntax | `#f59e0b` | `#d97706` | 2026-01-26 | diverged fork |
| spectrum-admin | admin | Vite 7.2.4 | 19.2.0 | v4 pkg/v3 syntax | `#00d4ff` | `#00a8cc` | 2026-01-26 | diverged fork |

### Non-web (7 Flutter + 1 NixOS + 1 Python)

| repo | org | tech | size | last push | status |
|---|---|---|---|---|---|
| YachtMaster-Web | PCG | Flutter web | — | 2024-07-17 | dead >1yr |
| YachtMaster-Admin | PCG | Flutter | — | 2024-04-18 | dead >2yr |
| YachtMaster-App | PCG | Flutter | 13.3 MB | 2025-10 | warm |
| aplha_go | PCG | Flutter | 9.3 MB | 2024-04 | dead >2yr; typo'd name |
| blackrock-go-app | PCG | Flutter | 12 KB | 2025-08 | skeleton (not Go!) |
| timeless | PCG | Flutter | 15.4 MB | 2024-04 | dead >2yr |
| fineartsociety | PCG | Flutter | 23.9 MB | 2024-12 | dead |
| apn-core | SS | Python/FastAPI | 95 MB | 2026-02-23 | real code |
| vibertas-os | SS | NixOS flake | 12 KB | 2026-03-13 | placeholder |

---

## 7. Bottom line

Akshat's audit is **directionally correct and strategically right**, but **numerically optimistic by ~2.8× on duplication**. The migration savings are much larger than advertised. His Priority 1 estimates should be multiplied by 2–5× for the client-site clusters; his Priority 2 admin migration is less uniform than claimed (half the portals are near-clones, half need manual work); his deployment story is missing entirely (zero CI configs in Sovereign Stack is a latent blocker).

Four things he genuinely missed:

1. **Admin architecture is wrong-premise** — the 4 standalone Vite admin repos should not exist; admin belongs inside the Next.js product repo as `app/admin/(secure)` (willrise/moonshine pattern). The `@sovereign-stack/admin-ui` package is therefore targeting the wrong surface and needs to be deprecated or Next-rebuilt. See §0.
2. **Committed secrets in cable-com and willrise** — needs immediate rotation before any other migration work.
3. **Template contamination** — three repos with never-personalized `package.json.name` fields, indicating dead client demos being counted as real projects.
4. **Zero deploy configs across Soverign-Stack** — you can't safely roll a library version if you can't roll a site.

Net recommendation: use Akshat's migration plan as the skeleton, but (a) invert the admin strategy (fold the 4 Vite admins into their Next product siblings, delete the standalone repos), (b) add a P0 security pass, (c) re-scope P1 client clusters up 2–5×, and (d) add "write deploy configs for 11 SS repos" as a gating P2.
