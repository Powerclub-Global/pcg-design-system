import Link from "next/link";
import { TopNav } from "@/components/top-nav";
import { InstallBlock } from "@/components/install-block";
import { componentRegistry } from "@/configs/registry";

export default function HomePage() {
  const categoryCount = new Set(componentRegistry.map((c) => c.category)).size;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <TopNav />

      {/* ─── HERO ───────────────────────────────────────────── */}
      <section className="relative border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-8 pt-24 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-neutral-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
              <span className="rounded bg-white px-1.5 py-0.5 text-[10px] text-black">New</span>
              {componentRegistry.length} Components Live
            </div>
            <h1 className="mt-6 text-6xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              React components
              <br />
              for <span className="text-white">PowerClub Global</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-neutral-400">
              Highly customizable UI primitives, layout pieces, and landing blocks that drop into
              any @pcg repo — themed per brand, shared by design.
            </p>
            <div className="mt-10 flex items-center gap-3">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
              >
                Browse Components →
              </Link>
              <a
                href="https://github.com/Powerclub-Global/pcg-component-library"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 px-6 py-3 text-sm font-semibold text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="relative rounded-xl border border-neutral-800 bg-black shadow-2xl">
            <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-neutral-800" />
              <span className="h-3 w-3 rounded-full bg-neutral-800" />
              <span className="h-3 w-3 rounded-full bg-neutral-800" />
              <span className="ml-auto text-xs text-neutral-500">HeroSection.tsx</span>
            </div>
            <pre className="overflow-x-auto p-6 text-sm font-mono leading-relaxed">
              <code>
                <span className="text-neutral-500">import</span>{" "}
                <span className="text-white">{"{ "}</span>
                <span className="text-white font-semibold">HeroSection</span>
                <span className="text-white">{" }"}</span>{" "}
                <span className="text-neutral-500">from</span>{" "}
                <span className="text-neutral-400">&apos;@powerclub-global/ui&apos;</span>
                <span className="text-neutral-500">;</span>
                {"\n\n"}
                <span className="text-neutral-500">function</span>{" "}
                <span className="text-white">Page</span>
                <span className="text-white">() {"{"}</span>
                {"\n  "}
                <span className="text-neutral-500">return</span> (
                {"\n    "}
                <span className="text-white">{"<"}</span>
                <span className="text-white font-semibold">HeroSection</span>
                {"\n      "}
                <span className="text-neutral-300">variant</span>=
                <span className="text-neutral-400">&quot;split&quot;</span>
                {"\n      "}
                <span className="text-neutral-300">headline</span>=
                <span className="text-neutral-400">&quot;Ship faster&quot;</span>
                {"\n      "}
                <span className="text-neutral-300">accent</span>=
                <span className="text-neutral-400">&quot;#FFFFFF&quot;</span>
                {"\n    "}
                <span className="text-white">{"/>"}</span>
                {"\n  )"}
                {"\n"}
                <span className="text-white">{"}"}</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* ─── WHAT'S INSIDE ─────────────────────────────────── */}
      <section className="border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-8 py-24">
          <h2 className="text-5xl font-bold tracking-tight mb-14">What&apos;s inside</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FeatureCard
              title={`${componentRegistry.length}+ Components`}
              description="Primitives, layout, blocks, and commerce surfaces. The stuff you'd build from scratch, already done."
            >
              <div className="flex flex-wrap gap-1.5">
                {componentRegistry.slice(0, 10).map((c) => (
                  <span
                    key={c.slug}
                    className="rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-[11px] text-neutral-500 font-mono"
                  >
                    {c.name}
                  </span>
                ))}
                <span className="rounded-md border border-neutral-800 px-2 py-1 text-[11px] text-neutral-600 font-mono">
                  +{componentRegistry.length - 10} more
                </span>
              </div>
            </FeatureCard>

            <FeatureCard
              title="Interactive Playground"
              description="Every component has a live preview, prop controls, and full source with syntax highlighting — right inside the docs."
            >
              <div className="grid grid-cols-3 gap-2 opacity-70">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-md border border-neutral-800"
                    style={{ opacity: 0.3 + (i % 4) * 0.2 }}
                  />
                ))}
              </div>
            </FeatureCard>

            <FeatureCard
              title="Well Organized"
              description={`${categoryCount} clear categories so you're not scrolling through a wall of unrelated stuff.`}
            >
              <ul className="space-y-2 text-sm text-neutral-400">
                <li className="flex items-center justify-between border-b border-neutral-800/60 pb-2">
                  <span>UI Primitives</span>
                  <span className="font-mono text-neutral-600">{count(componentRegistry, "ui")}</span>
                </li>
                <li className="flex items-center justify-between border-b border-neutral-800/60 pb-2">
                  <span>Layout</span>
                  <span className="font-mono text-neutral-600">{count(componentRegistry, "layout")}</span>
                </li>
                <li className="flex items-center justify-between border-b border-neutral-800/60 pb-2">
                  <span>Blocks</span>
                  <span className="font-mono text-neutral-600">{count(componentRegistry, "block")}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Commerce</span>
                  <span className="font-mono text-neutral-600">{count(componentRegistry, "commerce")}</span>
                </li>
              </ul>
            </FeatureCard>

            <FeatureCard
              title="Themeable"
              description="All components consume CSS custom properties. 19 brand themes ship in @powerclub-global/tokens — swap by importing a theme file."
            >
              <div className="space-y-2">
                {[
                  { name: "True Lux", dot: "bg-neutral-200" },
                  { name: "Youseffs Yachts", dot: "bg-neutral-300" },
                  { name: "BGSC", dot: "bg-white" },
                  { name: "Alchemy Water", dot: "bg-neutral-400" },
                ].map((t) => (
                  <div
                    key={t.name}
                    className="flex items-center gap-3 rounded-md border border-neutral-800 px-3 py-2 text-xs"
                  >
                    <span className={`h-2 w-2 rounded-full ${t.dot}`} />
                    <span className="text-neutral-300">{t.name}</span>
                    <span className="ml-auto text-neutral-600 font-mono">@powerclub-global/tokens</span>
                  </div>
                ))}
              </div>
            </FeatureCard>

            <FeatureCard
              title="AI-Ready"
              description="Works with Cursor, Copilot, and Claude. Every docs page exposes full source so LLMs have the whole contract."
            >
              <pre className="text-[11px] font-mono text-neutral-500 leading-relaxed overflow-hidden">
                {`// prompt claude
"use Button from @powerclub-global/ui
 variant=default size=lg"

import { Button } from "@powerclub-global/ui";

<Button variant="default" size="lg">
  Ship it →
</Button>`}
              </pre>
            </FeatureCard>

            <FeatureCard
              title="39+ Projects"
              description="Powers the whole PowerClub Global ecosystem — 39 repos across three orgs, all consuming the same library."
            >
              <div className="relative h-28">
                <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="none">
                  <polyline
                    points="0,70 30,62 60,55 90,42 120,35 150,22 180,12 200,6"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <polyline
                    points="0,70 30,62 60,55 90,42 120,35 150,22 180,12 200,6 200,80 0,80"
                    fill="white"
                    fillOpacity="0.05"
                  />
                </svg>
                <div className="absolute top-0 right-0 font-mono text-xs text-neutral-500">
                  Sirak · Sovereign · PCG
                </div>
              </div>
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* ─── SEE THEM IN ACTION ────────────────────────────── */}
      <section className="border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-8 py-24">
          <h2 className="text-5xl font-bold tracking-tight mb-14">See them in action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ShowcaseCard
              href="/docs/hero"
              category="Blocks"
              name="HeroSection"
              large
            >
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="text-xs uppercase tracking-[0.3em] text-neutral-600 mb-3">
                    Eyebrow
                  </div>
                  <div className="text-4xl font-bold">Build faster</div>
                  <div className="mt-3 text-sm text-neutral-500">with ready-made sections</div>
                </div>
              </div>
            </ShowcaseCard>

            <ShowcaseCard href="/docs/navbar" category="Layout" name="Navbar">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b border-neutral-800/60 pb-3 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="h-5 w-5 rounded bg-white" />
                    <div className="flex gap-3 text-xs text-neutral-500">
                      <span>Home</span>
                      <span>Docs</span>
                      <span>About</span>
                    </div>
                  </div>
                  <span className="rounded-md bg-white px-2.5 py-1 text-[10px] font-semibold text-black">
                    CTA
                  </span>
                </div>
                <div className="flex-1" />
              </div>
            </ShowcaseCard>

            <ShowcaseCard href="/docs/button" category="UI Primitives" name="Button">
              <div className="flex flex-wrap items-center justify-center gap-3 h-full">
                <button className="rounded-md bg-white px-4 py-2 text-xs font-semibold text-black">
                  Default
                </button>
                <button className="rounded-md border border-white px-4 py-2 text-xs font-semibold text-white">
                  Outline
                </button>
                <button className="rounded-md px-4 py-2 text-xs font-semibold text-white hover:bg-white/5">
                  Ghost
                </button>
              </div>
            </ShowcaseCard>

            <ShowcaseCard href="/docs/stat-card" category="UI Primitives" name="StatCard">
              <div className="grid grid-cols-2 gap-3 h-full">
                {[
                  { label: "Revenue", val: "$42.5k", trend: "+12%" },
                  { label: "Users", val: "8,241", trend: "+5%" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg border border-neutral-800 p-3"
                  >
                    <div className="text-[10px] uppercase tracking-wider text-neutral-500">
                      {s.label}
                    </div>
                    <div className="mt-1 text-xl font-bold">{s.val}</div>
                    <div className="text-[10px] text-neutral-400">{s.trend}</div>
                  </div>
                ))}
              </div>
            </ShowcaseCard>
          </div>
        </div>
      </section>

      {/* ─── GET STARTED IN SECONDS ────────────────────────── */}
      <section className="border-b border-neutral-900">
        <div className="mx-auto max-w-4xl px-8 py-28 text-center">
          <h2 className="text-5xl font-bold tracking-tight mb-10">Get started in seconds</h2>
          <InstallBlock />
          <p className="mt-4 text-sm text-neutral-500">
            Workspace-aware. Drops into any Next.js 15+ / Tailwind v4 app.
          </p>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-7xl px-8 py-28">
          <div className="rounded-2xl border border-neutral-800 px-8 py-20 text-center">
            <h2 className="text-5xl font-bold tracking-tight">Stop building from scratch.</h2>
            <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
              One library, every PCG brand. Drop a component in, swap a theme, ship.
            </p>
            <div className="mt-10 flex items-center justify-center gap-3">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
              >
                Browse Components →
              </Link>
              <a
                href="https://github.com/Powerclub-Global/pcg-component-library"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 px-6 py-3 text-sm font-semibold text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors"
              >
                ★ Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────── */}
      <footer className="border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-8 py-14 flex flex-col md:flex-row gap-10 md:justify-between">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white text-black text-xs">
                ◈
              </span>
              PCG UI
            </div>
            <p className="mt-2 text-sm text-neutral-500">Shared component library for PowerClub Global.</p>
          </div>
          <div className="grid grid-cols-2 gap-16 text-sm">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-neutral-500 mb-3">Product</div>
              <ul className="space-y-2">
                <li><Link href="/docs" className="text-neutral-300 hover:text-white transition-colors">Docs</Link></li>
                <li><Link href="/docs/introduction" className="text-neutral-300 hover:text-white transition-colors">Introduction</Link></li>
                <li><Link href="/docs/installation" className="text-neutral-300 hover:text-white transition-colors">Installation</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-neutral-500 mb-3">Community</div>
              <ul className="space-y-2">
                <li><a href="https://github.com/Powerclub-Global/pcg-component-library" target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-white transition-colors">GitHub</a></li>
                <li><a href="https://github.com/Powerclub-Global" target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-white transition-colors">Org</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-8 pb-10 flex items-center justify-between text-xs text-neutral-600">
          <span>Built by PowerClub Global</span>
          <span>© {new Date().getFullYear()} PCG UI</span>
        </div>
      </footer>
    </div>
  );
}

function count(list: typeof componentRegistry, cat: string) {
  return list.filter((c) => c.category === cat).length;
}

function FeatureCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 p-6 hover:border-neutral-700 transition-colors min-h-[280px] flex flex-col">
      <div className="flex-1 min-h-[120px] mb-6">{children}</div>
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
    </div>
  );
}

function ShowcaseCard({
  href,
  category,
  name,
  children,
  large,
}: {
  href: string;
  category: string;
  name: string;
  children: React.ReactNode;
  large?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative block rounded-2xl border border-neutral-800 p-6 hover:border-neutral-700 transition-colors ${
        large ? "md:row-span-2" : ""
      }`}
    >
      <div className="min-h-[180px]">{children}</div>
      <div className="mt-6 flex items-center justify-between text-xs">
        <span className="text-neutral-500">{category}</span>
        <span className="font-mono text-neutral-500 group-hover:text-white transition-colors">
          {name}
        </span>
      </div>
    </Link>
  );
}
