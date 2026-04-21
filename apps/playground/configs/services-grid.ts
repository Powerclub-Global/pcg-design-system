import type { ComponentConfig } from "@/components/types";

export const servicesGridConfig: ComponentConfig = {
  name: "ServicesGrid",
  slug: "services-grid",
  description: "Service cards with icon/image and grid layouts",
  category: "block",
  sourcePath: "packages/pcg-ui/components/blocks/services-grid.tsx",
  controls: [
    { name: "heading", type: "text", label: "Heading", defaultValue: "What we offer" },
    { name: "description", type: "text", label: "Description", defaultValue: "End-to-end services for modern brands." },
    { name: "columns", type: "select", label: "Columns", options: ["2", "3", "4"], defaultValue: "3" },
    { name: "variant", type: "select", label: "Variant", options: ["cards", "image-cards", "minimal"], defaultValue: "cards" },
  ],
  staticProps: {
    services: [
      { title: "Strategy", description: "Roadmaps, audits, and data-driven planning." },
      { title: "Design", description: "Brand systems and interfaces that convert." },
      { title: "Engineering", description: "Production-grade web and mobile builds." },
      { title: "Growth", description: "Performance marketing and SEO." },
      { title: "Operations", description: "Tooling, analytics, and automation." },
      { title: "Support", description: "Ongoing maintenance and on-call engineering." },
    ],
  },
};
