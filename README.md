# PCG component library

Unified design system and component library for the PowerClub Global ecosystem.

## Packages

| Package | Description |
|---------|-------------|
| `@pcg/tokens` | Design tokens — colors, typography, spacing, shadows, animations, 19 brand themes |
| `@pcg/ui` | 30+ shared React components — primitives, layouts, page blocks, commerce |
| `@sovereign-stack/config` | Canonical ecosystem data for the 7 Sovereign Stack projects |
| `@sovereign-stack/ui` | Ecosystem Header, Footer, Dropdown for SS public sites |
| `@sovereign-stack/admin-ui` | Admin shell, auth, layout for SS admin portals |

## Quick Start

```bash
pnpm install
pnpm typecheck
```

## Usage

### In a Next.js site (e.g., willrise-web)

```tsx
// Import tokens CSS in your globals.css or layout
import "@pcg/tokens/css/base";
import "@pcg/tokens/css/themes/willrise.css";

// Use components
import { Navbar, HeroSection, Footer } from "@pcg/ui";
```

### In a Sovereign Stack site (e.g., pythia-ai)

```tsx
import { EcosystemHeader, EcosystemFooter } from "@sovereign-stack/ui";

<EcosystemHeader
  currentProjectId="pythia"
  currentProjectColor="#6366f1"
  logo={<PythiaLogo />}
  brandName="PYTHIA AI"
  navItems={[{ label: "Home", href: "/" }]}
  ctaLabel="Partner With Us"
  ctaHref="/invest"
/>
```

### In an admin portal (e.g., spectrum-admin)

```tsx
import { AdminAppShell, AdminLayout, LoginPage } from "@sovereign-stack/admin-ui";
```

### Tailwind v3 preset

```js
// tailwind.config.ts
import pcgPreset from "@pcg/tokens/tailwind-preset";

export default {
  presets: [pcgPreset],
  // ...
};
```

### Tailwind v4

```css
/* globals.css */
@import "tailwindcss";
@import "@pcg/tokens/css/tailwind-theme";
@import "@pcg/tokens/css/themes/willrise.css";
```

## Architecture

```
packages/
  pcg-tokens/          <- Foundation: CSS vars + TW preset + themes
  sovereign-stack-config/ <- SS ecosystem data (depends on nothing)
  pcg-ui/              <- Components (depends on pcg-tokens)
  sovereign-stack-ui/  <- SS components (depends on ss-config)
  sovereign-stack-admin-ui/ <- Admin components (depends on ss-config)
```
