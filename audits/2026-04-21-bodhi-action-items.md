# Action Items — @KingBodhi

**Date:** 2026-04-21
**From:** Akshat (auditor)
**Context:** Independent audit of 39 repos across Powerclub-Global, Sirak-Studios-Org, Soverign-Stack surfaced items that only you can resolve. Everything below is gated on org-owner or dashboard-level access you hold. Full audit at `audits/2026-04-20-independent-audit.md`.

---

## 1. P0 — Leaked secrets in two public repos

Two repos on `main` commit real production credentials. Anyone who has cloned either has them.

### 1a. `Powerclub-Global/cable-com-web`

File: [`/.env.local`](https://github.com/Powerclub-Global/cable-com-web/blob/main/.env.local)
Committed by you in `8c64b06` ("Google Analytics"), 2025-11-15. Modified in `d4d9c09` and `0e3199b`.

Leaked values:

| Key | Value | Action |
|---|---|---|
| `SMTP_PASS` | `khCY5RQtxJeu` (Zoho, `admin@cable-comservices.com`) | **rotate** — Zoho Mail admin → regenerate app password |
| `DATABASE_URL` (commented but still in blob) | `postgresql://main_dlwc_user:TV4d0qmfVetingvquCIQHpU2adiR0P3n@dpg-d386ckggjchc73cqg6rg-a.oregon-postgres.render.com/main_dlwc` | **rotate** — Render → main_dlwc → rotate password (see §1b, same DB) |

### 1b. `Powerclub-Global/willrise-web`

File: [`/.env`](https://github.com/Powerclub-Global/willrise-web/blob/main/.env)
Committed by you in `84fe8b3` ("Fix??"), 2025-09-18. Modified in `fd4f002`, `9c12d72`, `30f3bf0`.

Leaked values:

| Key | Value | Action |
|---|---|---|
| `DATABASE_URL` | **same Render postgres as cable-com-web** (`main_dlwc_user`) | rotate once, both repos fixed |
| `SESSION_SECRET` | `Nd4n5QCVaTx2NpcShcUbO1/4Q/9Ofopzhcrqip+Cwgo/EiWFz2ds+rgLgWDuJUyPXbJSqm/UX9uyUheQEEE2MQ==` | **regenerate** — `openssl rand -base64 64` |
| `NEXTAUTH_SECRET` | `"your-nextauth-secret-key-change-this-in-production"` (still the placeholder!) | **generate + set** — `openssl rand -base64 64` |

### What only you can do

1. **Render dashboard** → Postgres service `main_dlwc` → rotate password (or drop/recreate user `main_dlwc_user`). Get new URL.
2. **Zoho Mail admin** → `admin@cable-comservices.com` → regenerate SMTP/app password.
3. **Vercel dashboards** (both projects) → update env vars:
   - cable-com-web: new `SMTP_PASS`, new `DATABASE_URL` (if used)
   - willrise-web: new `DATABASE_URL`, new `SESSION_SECRET`, new `NEXTAUTH_SECRET`
4. **Redeploy both**. Verify app works with new creds.

### What Akshat will do after you finish the above

1. Force-add `.env*` to `.gitignore` in both repos.
2. `git filter-repo --invert-paths --path .env --path .env.local` to scrub history.
3. Force-push `main` on both (hard reset for anyone with open PRs — fine given severity).
4. Open a follow-up SECURITY issue on each repo documenting the rotation.

**Before Akshat force-pushes**, heads-up any open PRs or active collaborators on those repos.

### Why rotate first, scrub second

Scrubbing only removes the creds from *new* clones. Anyone who cloned before now already has them on disk. Rotation is the only thing that revokes access. Scrub prevents future exposure.

---

## 2. Admin architecture decision

The 4 standalone Vite admin repos (`pcg-admin`, `pythia-admin`, `vibe-admin`, `spectrum-admin`) are the wrong pattern. Admin panels should live inside each Next.js product repo as `app/admin/(secure)/` routes — the pattern already proven in `willrise-web`, `Moonshine-Merchantile-web`, and `sirak-studios-web`.

The `@sovereign-stack/admin-ui` package ships for the wrong target (it peers `react-router-dom`).

### Decision needed from you (pick one)

| Option | What it means |
|---|---|
| **A — Deprecate** | Kill `@sovereign-stack/admin-ui`. Rebuild admin surface as Next-native primitives inside `@pcg/ui`. |
| **B — Repurpose** | Keep package, drop `react-router-dom`, swap for `next/navigation`, re-target at `app/admin/layout.tsx`. |
| **C — Fold in** | Merge package contents into `@pcg/ui` as `@pcg/ui/admin/*` subpath export. |

Akshat's recommendation: **C** (smallest delta, preserves existing code, single library surface).

### Fold-in pairs (after decision)

```
pcg-admin        → pcg-dashboard/app/admin/
pythia-admin     → pythia-ai/app/admin/
spectrum-admin   → spectrum-galactic/app/admin/
vibe-admin       → vibe-token/app/admin/
```

After migration, delete the 4 admin repos.

**Warning:** `spectrum-admin-nu.vercel.app` and `vibe-admin-nu.vercel.app` are live today. Reroute before repo deletion.

### Gated on you

- Final A / B / C call.
- Vercel → reroute live admin domains to `<parent>/admin`.
- GitHub org → archive/delete 4 admin repos (admin rights required).

---

## 3. Deploy-config gap (P2 gating for library rollout)

All 11 Sovereign-Stack web repos have **zero** committed `vercel.json`, `fly.toml`, `netlify.toml`, `Dockerfile`, or `.github/workflows/deploy*`. No reproducible deploy path.

Akshat can scaffold the configs in PRs. You need to:

- Confirm target platform per repo (Vercel? Render? Fly?).
- Provide/expose per-repo deploy env var lists (redacted dump from current dashboards).
- Merge the PRs once scaffolded.

---

## 4. Version fragmentation (ongoing — info only)

| Framework | Versions in use | Count |
|---|---|---|
| Next.js | 14.2.x, 15.x, 16.x | 4 / 4 / 11 |
| React | 8 distinct versions from 18.2.0 → 19.2.4 | — |
| Tailwind | v3 syntax in 4 SS admins despite `tailwindcss@^4.1.18` installed | 4 |

Not urgent per se, but migration work (library rollout) needs to pin targets. When Akshat drafts the migration sequence, you'll need to sign off on:

- Minimum Next.js version for the rollout (propose: Next 15).
- Minimum React version (propose: 19.0).
- Tailwind policy (propose: v4 only, v3 syntax removed).

---

## 5. Summary of what's blocking Akshat right now

| # | Item | Blocker | Owner |
|---|---|---|---|
| 1a | cable-com-web creds | Render + Zoho + Vercel dashboards | **Bodhi** |
| 1b | willrise-web creds | Render + Vercel dashboards | **Bodhi** |
| 2 | Admin arch call | Architectural decision | **Bodhi** |
| 3 | Deploy configs | Per-repo env dump + platform pick | **Bodhi** |
| 4 | Version floor | Version pinning decision | **Bodhi** |

Everything Akshat can do in parallel (template pollution cleanup, gold hex reconciliation, `@pcg/ui` component expansion, doc site polish) he's picking up separately — not blocked on you.

---

## Suggested order

1. **Today:** §1 credential rotation (10 min on Render, 5 min on Zoho, 10 min Vercel re-env).
2. **This week:** §2 admin arch call (reply to this doc).
3. **Next sprint:** §3 deploy config answers, §4 version pinning.

Ping Akshat once §1 is done — he'll scrub history and close the P0.
