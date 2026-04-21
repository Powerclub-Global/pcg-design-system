import Link from "next/link";
import { componentRegistry } from "@/configs/registry";

export const metadata = {
  title: "Introduction — PCG UI Docs",
};

export default function IntroductionPage() {
  const counts = componentRegistry.reduce<Record<string, number>>((acc, c) => {
    acc[c.category] = (acc[c.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="px-10 py-14 max-w-3xl">
      <h1 className="text-5xl font-bold tracking-tight">Introduction</h1>
      <p className="mt-4 text-lg text-neutral-400">
        <span className="text-violet-400">@pcg/ui</span> is the shared component library for the
        PowerClub Global ecosystem — a single source of UI primitives, layout pieces, and landing
        blocks that drops into any @pcg repo.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-3">What&apos;s inside</h2>
        <p className="text-neutral-400">
          {componentRegistry.length} production-ready components across four categories:
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <li className="rounded-xl border border-neutral-800 px-4 py-3">
            <div className="text-violet-400 font-semibold">{counts.ui ?? 0} UI Primitives</div>
            <div className="text-neutral-500 text-xs mt-1">
              Buttons, inputs, skeletons, pagination — the building blocks.
            </div>
          </li>
          <li className="rounded-xl border border-neutral-800 px-4 py-3">
            <div className="text-violet-400 font-semibold">{counts.layout ?? 0} Layout</div>
            <div className="text-neutral-500 text-xs mt-1">
              Navbar, footer, container — page structure.
            </div>
          </li>
          <li className="rounded-xl border border-neutral-800 px-4 py-3">
            <div className="text-violet-400 font-semibold">{counts.block ?? 0} Blocks</div>
            <div className="text-neutral-500 text-xs mt-1">
              Hero, CTA, pricing, testimonials — full-width sections.
            </div>
          </li>
          <li className="rounded-xl border border-neutral-800 px-4 py-3">
            <div className="text-violet-400 font-semibold">{counts.commerce ?? 0} Commerce</div>
            <div className="text-neutral-500 text-xs mt-1">
              Variant managers and product tooling.
            </div>
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-3">Philosophy</h2>
        <ul className="space-y-3 text-neutral-400">
          <li>
            <span className="text-white font-semibold">One library, 19 themes.</span> All components
            consume CSS custom properties (<code className="text-violet-300">--color-accent</code>,{" "}
            <code className="text-violet-300">--font-display</code>, etc.). Switch brands by
            swapping a theme file, not by forking components.
          </li>
          <li>
            <span className="text-white font-semibold">Server-component first.</span> Only the
            components that need interaction carry <code className="text-violet-300">&quot;use
            client&quot;</code>. Ship less JS.
          </li>
          <li>
            <span className="text-white font-semibold">No runtime CSS-in-JS.</span> Tailwind v4
            classes only. Typed, tree-shakeable, diff-friendly.
          </li>
          <li>
            <span className="text-white font-semibold">Dark-first but theme-agnostic.</span>{" "}
            Previews render against a dark canvas; components adapt to light by token override.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-3">Conventions</h2>
        <div className="rounded-xl border border-neutral-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-neutral-500">
              <tr className="border-b border-neutral-800">
                <th className="px-4 py-3 text-left font-medium">Pattern</th>
                <th className="px-4 py-3 text-left font-medium">Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              <tr>
                <td className="px-4 py-3 text-neutral-300">Imports</td>
                <td className="px-4 py-3 text-neutral-400">
                  <code className="text-violet-300">import &#123; Button &#125; from &quot;@pcg/ui&quot;;</code>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-neutral-300">Variants</td>
                <td className="px-4 py-3 text-neutral-400">
                  CVA with <code className="text-violet-300">variant</code> and{" "}
                  <code className="text-violet-300">size</code> props
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-neutral-300">Styling override</td>
                <td className="px-4 py-3 text-neutral-400">
                  Pass <code className="text-violet-300">className</code>; merged via{" "}
                  <code className="text-violet-300">cn()</code> (tailwind-merge)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-neutral-300">Theming</td>
                <td className="px-4 py-3 text-neutral-400">
                  Import one of 19 brand themes from <code className="text-violet-300">@pcg/tokens/css/themes</code>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-neutral-300">Types</td>
                <td className="px-4 py-3 text-neutral-400">
                  Every component exports <code className="text-violet-300">&lt;Name&gt;Props</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-3">Next steps</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs/installation"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
          >
            Installation →
          </Link>
          <Link
            href="/docs/button"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 px-5 py-2.5 text-sm font-semibold text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors"
          >
            Browse components
          </Link>
        </div>
      </section>
    </div>
  );
}
