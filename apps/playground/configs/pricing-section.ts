import type { ComponentConfig } from "@/components/types";

export const pricingSectionConfig: ComponentConfig = {
  name: "PricingSection",
  slug: "pricing-section",
  description: "Multi-tier pricing cards with popular badge and feature lists",
  category: "block",
  sourcePath: "packages/pcg-ui/components/blocks/pricing-section.tsx",
  controls: [
    { name: "heading", type: "text", label: "Heading", defaultValue: "Simple, transparent pricing" },
    { name: "description", type: "text", label: "Description", defaultValue: "Choose the plan that fits your team." },
    { name: "popularLabel", type: "text", label: "Popular Badge", defaultValue: "Most Popular" },
  ],
  staticProps: {
    tiers: [
      {
        name: "Starter",
        price: "$9",
        priceSubtext: "/ month",
        description: "For individuals getting started.",
        features: ["1 project", "5 components", "Community support"],
        cta: { label: "Start free", href: "#" },
      },
      {
        name: "Pro",
        price: "$29",
        priceSubtext: "/ month",
        description: "For growing teams.",
        features: ["Unlimited projects", "All components", "Priority support", "Custom themes"],
        cta: { label: "Get Pro", href: "#" },
        popular: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "For organizations.",
        features: ["SSO", "Dedicated support", "SLA", "On-premise option"],
        cta: { label: "Contact us", href: "#" },
      },
    ],
  },
};
