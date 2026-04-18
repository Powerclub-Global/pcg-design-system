import Link from "next/link";
import { componentRegistry } from "@/configs/registry";

const categoryColors: Record<string, string> = {
  ui: "border-indigo-500/30 text-indigo-400",
  layout: "border-emerald-500/30 text-emerald-400",
  block: "border-amber-500/30 text-amber-400",
  commerce: "border-pink-500/30 text-pink-400",
};

const categoryLabels: Record<string, string> = {
  ui: "UI Primitive",
  layout: "Layout",
  block: "Block",
  commerce: "Commerce",
};

export default function HomePage() {
  const grouped = new Map<string, typeof componentRegistry>();
  for (const config of componentRegistry) {
    const cat = config.category;
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push(config);
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">
            <span className="text-indigo-400">@pcg/ui</span> Playground
          </h1>
          <p className="text-neutral-400 text-lg">
            Interactive component explorer. Pick a component to test its props live.
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-neutral-500">
            <span>{componentRegistry.length} components</span>
            <span className="text-neutral-700">|</span>
            <span>{grouped.size} categories</span>
          </div>
        </div>

        {Array.from(grouped.entries()).map(([category, configs]) => (
          <div key={category} className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
              {categoryLabels[category] ?? category} ({configs.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {configs.map((config) => (
                <Link
                  key={config.slug}
                  href={`/${config.slug}`}
                  className="group rounded-xl border border-neutral-800 bg-neutral-900 p-5 hover:border-neutral-600 hover:bg-neutral-800/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      {config.name}
                    </h3>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${categoryColors[config.category]}`}
                    >
                      {config.category}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 line-clamp-2">{config.description}</p>
                  <div className="mt-3 text-xs text-neutral-600">
                    {config.controls.length} controls
                    {config.childrenControl ? " + children" : ""}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
