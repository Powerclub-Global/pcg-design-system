"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { componentRegistry } from "@/configs/registry";

const categoryLabels: Record<string, string> = {
  ui: "UI Primitives",
  layout: "Layout",
  block: "Blocks",
  commerce: "Commerce",
};

const categoryOrder = ["ui", "layout", "block", "commerce"];

const getStartedLinks = [
  { name: "Introduction", href: "/docs/introduction" },
  { name: "Installation", href: "/docs/installation" },
];

export function DocsSidebar() {
  const pathname = usePathname();

  const grouped = new Map<string, typeof componentRegistry>();
  for (const c of componentRegistry) {
    if (!grouped.has(c.category)) grouped.set(c.category, []);
    grouped.get(c.category)!.push(c);
  }

  return (
    <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-neutral-800/60 bg-neutral-950 px-4 py-6">
      <div className="mb-6">
        <h3 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          Get Started
        </h3>
        <ul className="space-y-0.5">
          {getStartedLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href} className="relative">
                {active && (
                  <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-violet-500" />
                )}
                <Link
                  href={item.href}
                  className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? "text-violet-400"
                      : "text-neutral-400 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {categoryOrder
        .filter((cat) => grouped.has(cat))
        .map((cat) => {
          const items = grouped.get(cat)!;
          return (
            <div key={cat} className="mb-6">
              <h3 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                {categoryLabels[cat] ?? cat}
              </h3>
              <ul className="space-y-0.5">
                {items.map((item) => {
                  const href = `/docs/${item.slug}`;
                  const active = pathname === href;
                  return (
                    <li key={item.slug} className="relative">
                      {active && (
                        <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-violet-500" />
                      )}
                      <Link
                        href={href}
                        className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                          active
                            ? "text-violet-400"
                            : "text-neutral-400 hover:bg-white/[0.03] hover:text-white"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
    </aside>
  );
}
