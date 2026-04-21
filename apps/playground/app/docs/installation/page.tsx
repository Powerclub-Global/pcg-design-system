export const metadata = {
  title: "Installation — PCG UI Docs",
};

export default function InstallationPage() {
  return (
    <div className="px-10 py-14 max-w-3xl">
      <h1 className="text-5xl font-bold tracking-tight">Installation</h1>
      <p className="mt-4 text-lg text-neutral-400">
        Wire <span className="text-violet-400">@pcg/ui</span> and{" "}
        <span className="text-violet-400">@pcg/tokens</span> into any Next.js 15+ / Tailwind v4
        repo. ~5 minutes.
      </p>

      <Step n={1} title="Add the packages">
        <p className="mb-3 text-neutral-400">
          Reference the workspace packages via <code className="text-violet-300">file:</code> in{" "}
          <code className="text-violet-300">package.json</code>:
        </p>
        <Code>{`{
  "dependencies": {
    "@pcg/tokens": "file:../../pcg-design-system/packages/pcg-tokens",
    "@pcg/ui": "file:../../pcg-design-system/packages/pcg-ui"
  }
}`}</Code>
        <p className="mt-4 text-neutral-400">Peer deps the library expects:</p>
        <Code>{`pnpm add @radix-ui/react-slot class-variance-authority clsx tailwind-merge`}</Code>
      </Step>

      <Step n={2} title="Enable transpilePackages in Next.js">
        <p className="mb-3 text-neutral-400">
          In <code className="text-violet-300">next.config.ts</code>, transpile the monorepo
          packages:
        </p>
        <Code>{`import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@pcg/ui", "@pcg/tokens"],
};

export default nextConfig;`}</Code>
      </Step>

      <Step n={3} title="Import the base tokens in globals.css">
        <Code>{`@import "tailwindcss";
@import "@pcg/tokens/css/base.css";

/* Scan shared component classes */
@source "../../node_modules/@pcg/ui";`}</Code>
      </Step>

      <Step n={4} title="Pick a brand theme">
        <p className="mb-3 text-neutral-400">
          19 themes ship in <code className="text-violet-300">@pcg/tokens/css/themes</code>. Import
          the one for this repo:
        </p>
        <Code>{`@import "@pcg/tokens/css/themes/true-lux.css";`}</Code>
        <p className="mt-3 text-neutral-400">
          Themes override <code className="text-violet-300">--color-primary</code>,{" "}
          <code className="text-violet-300">--color-accent</code>,{" "}
          <code className="text-violet-300">--font-display</code>, and radii. Or roll your own by
          setting the custom properties inline.
        </p>
      </Step>

      <Step n={5} title="Use it">
        <Code>{`import { Button, HeroSection, FAQSection } from "@pcg/ui";

export default function Page() {
  return (
    <>
      <HeroSection
        headline="Build something real"
        ctaPrimary={{ label: "Get started", href: "/signup" }}
      />
      <Button variant="default" size="lg">
        Click me
      </Button>
    </>
  );
}`}</Code>
      </Step>

      <section className="mt-14">
        <h2 className="text-2xl font-bold mb-3">Troubleshooting</h2>
        <div className="rounded-xl border border-neutral-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-neutral-500">
              <tr className="border-b border-neutral-800">
                <th className="px-4 py-3 text-left font-medium">Symptom</th>
                <th className="px-4 py-3 text-left font-medium">Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              <tr>
                <td className="px-4 py-3 text-neutral-300">
                  <code className="text-violet-300">Cannot find module &quot;@pcg/ui&quot;</code>
                </td>
                <td className="px-4 py-3 text-neutral-400">
                  Run <code className="text-violet-300">pnpm install</code> — the{" "}
                  <code className="text-violet-300">file:</code> link needs to resolve.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-neutral-300">Classes missing at runtime</td>
                <td className="px-4 py-3 text-neutral-400">
                  Add the <code className="text-violet-300">@source</code> directive to your
                  globals.css. Tailwind v4 doesn&apos;t scan node_modules by default.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-neutral-300">
                  <code className="text-violet-300">workspace:*</code> error on install
                </td>
                <td className="px-4 py-3 text-neutral-400">
                  Add a <code className="text-violet-300">pnpm.overrides</code> entry mapping{" "}
                  <code className="text-violet-300">@pcg/tokens</code> to the same{" "}
                  <code className="text-violet-300">file:</code> path.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-neutral-300">Theme colors don&apos;t apply</td>
                <td className="px-4 py-3 text-neutral-400">
                  Brand theme must be imported <em>after</em> the base tokens.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-violet-500/40 text-violet-400 text-sm font-bold">
          {n}
        </span>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="rounded-xl border border-neutral-800 px-4 py-3 text-sm font-mono text-neutral-200 overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}
