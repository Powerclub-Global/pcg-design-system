import type { ComponentConfig } from "@/components/types";

export const testimonialsConfig: ComponentConfig = {
  name: "Testimonials",
  slug: "testimonials",
  description: "Grid or carousel layout for customer testimonials",
  category: "block",
  sourcePath: "packages/pcg-ui/components/blocks/testimonials.tsx",
  controls: [
    { name: "heading", type: "text", label: "Heading", defaultValue: "What clients say" },
    { name: "description", type: "text", label: "Description", defaultValue: "Real words from real customers." },
    { name: "layout", type: "select", label: "Layout", options: ["grid", "carousel"], defaultValue: "grid" },
    { name: "columns", type: "select", label: "Columns", options: ["2", "3"], defaultValue: "3" },
  ],
  staticProps: {
    testimonials: [
      { quote: "This completely changed how we ship product.", author: "Sarah Chen", role: "CTO", company: "Acme Inc", rating: 5 },
      { quote: "Best design system we've adopted.", author: "Marcus Lee", role: "Head of Design", company: "Northwind", rating: 5 },
      { quote: "Cut our build time in half.", author: "Priya Patel", role: "Engineering Lead", company: "Globex", rating: 5 },
    ],
  },
};
