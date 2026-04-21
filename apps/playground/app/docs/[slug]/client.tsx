"use client";

import { useState } from "react";
import { Playground } from "@/components/playground";
import type { ComponentConfig } from "@/components/types";

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
  DateRangePicker,
  ImageRotator,
  ImageUpload,
  ImageWithFallback,
  JsonLd,
  ScrollReveal,
  ShareButton,
  StatCard,
  Navbar,
  Footer,
  ContactForm,
  PartnerMarquee,
  PricingSection,
  ServicesGrid,
  Testimonials,
  TrustBadges,
  VariantManager,
} from "@pcg/ui";

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
  "feature-grid": FeatureGridWrapper as unknown as React.ComponentType<Record<string, unknown>>,
  "date-range-picker": DateRangePickerWrapper as unknown as React.ComponentType<Record<string, unknown>>,
  "image-rotator": ImageRotator as unknown as React.ComponentType<Record<string, unknown>>,
  "image-upload": ImageUploadWrapper as unknown as React.ComponentType<Record<string, unknown>>,
  "image-with-fallback": ImageWithFallback as unknown as React.ComponentType<Record<string, unknown>>,
  "json-ld": JsonLdPlaceholder as unknown as React.ComponentType<Record<string, unknown>>,
  "scroll-reveal": ScrollReveal as unknown as React.ComponentType<Record<string, unknown>>,
  "share-button": ShareButton as unknown as React.ComponentType<Record<string, unknown>>,
  "stat-card": StatCard as unknown as React.ComponentType<Record<string, unknown>>,
  navbar: Navbar as unknown as React.ComponentType<Record<string, unknown>>,
  footer: Footer as unknown as React.ComponentType<Record<string, unknown>>,
  "contact-form": ContactFormWrapper as unknown as React.ComponentType<Record<string, unknown>>,
  "partner-marquee": PartnerMarquee as unknown as React.ComponentType<Record<string, unknown>>,
  "pricing-section": PricingSection as unknown as React.ComponentType<Record<string, unknown>>,
  "services-grid": ServicesGridWrapper as unknown as React.ComponentType<Record<string, unknown>>,
  testimonials: TestimonialsWrapper as unknown as React.ComponentType<Record<string, unknown>>,
  "trust-badges": TrustBadges as unknown as React.ComponentType<Record<string, unknown>>,
  "variant-manager": VariantManagerWrapper as unknown as React.ComponentType<Record<string, unknown>>,
};

function PaginationWrapper(props: Record<string, unknown>) {
  return <Pagination {...(props as any)} onPageChange={() => {}} />;
}

function StatsSectionWrapper(props: Record<string, unknown>) {
  const columns = props.columns ? Number(props.columns) : undefined;
  return <StatsSection {...(props as any)} columns={columns} />;
}

function FeatureGridWrapper(props: Record<string, unknown>) {
  const columns = props.columns ? Number(props.columns) : undefined;
  return <FeatureGrid {...(props as any)} columns={columns} />;
}

function ServicesGridWrapper(props: Record<string, unknown>) {
  const columns = props.columns ? Number(props.columns) : undefined;
  return <ServicesGrid {...(props as any)} columns={columns} />;
}

function TestimonialsWrapper(props: Record<string, unknown>) {
  const columns = props.columns ? Number(props.columns) : undefined;
  return <Testimonials {...(props as any)} columns={columns} />;
}

function NewsletterWrapper(props: Record<string, unknown>) {
  return (
    <NewsletterSignup
      {...(props as any)}
      onSubmit={async () => ({ message: "Subscribed!" })}
    />
  );
}

function DateRangePickerWrapper(props: Record<string, unknown>) {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  return (
    <DateRangePicker
      {...(props as any)}
      startDate={start}
      endDate={end}
      onDateChange={(s: Date | null, e: Date | null) => {
        setStart(s);
        setEnd(e);
      }}
    />
  );
}

function ImageUploadWrapper(props: Record<string, unknown>) {
  const [urls, setUrls] = useState<string[]>([]);
  return (
    <ImageUpload
      {...(props as any)}
      value={urls}
      onChange={setUrls}
      onUpload={async (files: File[]) => files.map((f) => URL.createObjectURL(f))}
    />
  );
}

function ContactFormWrapper(props: Record<string, unknown>) {
  return (
    <ContactForm
      {...(props as any)}
      onSubmit={async () => {
        await new Promise((r) => setTimeout(r, 600));
      }}
    />
  );
}

function VariantManagerWrapper(props: Record<string, unknown>) {
  const [variants, setVariants] = useState<Array<Record<string, unknown>>>([]);
  return (
    <VariantManager
      {...(props as any)}
      variants={variants as any}
      onChange={setVariants as any}
    />
  );
}

function JsonLdPlaceholder(props: Record<string, unknown>) {
  return (
    <div className="text-sm text-neutral-400 font-mono max-w-xl">
      <div className="mb-3">JsonLd emits a <code className="text-violet-300">&lt;script type=&quot;application/ld+json&quot;&gt;</code> into the DOM — nothing visible.</div>
      <pre className="rounded-lg border border-neutral-800 p-4 text-xs overflow-auto">
        {JSON.stringify(props.data, null, 2)}
      </pre>
      <JsonLd {...(props as any)} />
    </div>
  );
}

interface PlaygroundClientProps {
  config: ComponentConfig;
  rawSource: string;
  highlightedSource: string;
}

export function PlaygroundClient({
  config,
  rawSource,
  highlightedSource,
}: PlaygroundClientProps) {
  const Component = componentMap[config.slug];

  if (!Component) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-neutral-400">
          Component <code className="text-red-400">{config.slug}</code> not mapped in client.tsx
        </p>
      </div>
    );
  }

  return (
    <Playground
      config={config}
      component={Component}
      rawSource={rawSource}
      highlightedSource={highlightedSource}
    />
  );
}
