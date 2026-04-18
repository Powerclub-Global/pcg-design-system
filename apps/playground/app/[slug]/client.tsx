"use client";

import { Playground } from "@/components/playground";
import type { ComponentConfig } from "@/components/types";

// Component imports from @pcg/ui
import {
  Button,
  Skeleton,
  Section,
  CopyButton,
  Pagination,
  Container,
  HeroSection,
  CTASection,
  FAQSection,
  StatsSection,
  NewsletterSignup,
  FeatureGrid,
} from "@pcg/ui";

/**
 * Maps config slugs to actual component references.
 * Adding a new component to the playground requires:
 * 1. A config file in /configs
 * 2. An entry in registry.ts
 * 3. An entry in this map
 */
const componentMap: Record<string, React.ComponentType<Record<string, unknown>>> = {
  button: Button as unknown as React.ComponentType<Record<string, unknown>>,
  skeleton: Skeleton as unknown as React.ComponentType<Record<string, unknown>>,
  section: Section as unknown as React.ComponentType<Record<string, unknown>>,
  "copy-button": CopyButton as unknown as React.ComponentType<Record<string, unknown>>,
  pagination: PaginationWrapper as unknown as React.ComponentType<Record<string, unknown>>,
  container: Container as unknown as React.ComponentType<Record<string, unknown>>,
  hero: HeroSection as unknown as React.ComponentType<Record<string, unknown>>,
  cta: CTASection as unknown as React.ComponentType<Record<string, unknown>>,
  faq: FAQSection as unknown as React.ComponentType<Record<string, unknown>>,
  stats: StatsSectionWrapper as unknown as React.ComponentType<Record<string, unknown>>,
  newsletter: NewsletterWrapper as unknown as React.ComponentType<Record<string, unknown>>,
  "feature-grid": FeatureGrid as unknown as React.ComponentType<Record<string, unknown>>,
};

/** Pagination needs onPageChange wired up */
function PaginationWrapper(props: Record<string, unknown>) {
  return <Pagination {...(props as any)} onPageChange={() => {}} />;
}

/** StatsSection columns comes as string from select, needs number */
function StatsSectionWrapper(props: Record<string, unknown>) {
  const columns = props.columns ? Number(props.columns) : undefined;
  return <StatsSection {...(props as any)} columns={columns} />;
}

/** Newsletter needs onSubmit handler */
function NewsletterWrapper(props: Record<string, unknown>) {
  return (
    <NewsletterSignup
      {...(props as any)}
      onSubmit={async () => ({ message: "Subscribed!" })}
    />
  );
}

export function PlaygroundClient({ config }: { config: ComponentConfig }) {
  const Component = componentMap[config.slug];

  if (!Component) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <p className="text-neutral-400">
          Component <code className="text-red-400">{config.slug}</code> not mapped in client.tsx
        </p>
      </div>
    );
  }

  return <Playground config={config} component={Component} />;
}
