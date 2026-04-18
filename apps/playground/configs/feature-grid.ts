import type { ComponentConfig } from "@/components/types";

export const featureGridConfig: ComponentConfig = {
  name: "FeatureGrid",
  slug: "feature-grid",
  description: "Grid of feature cards with icons",
  category: "block",
  controls: [
    { name: "heading", type: "text", label: "Heading", defaultValue: "Why Choose Us", group: "Content" },
    { name: "subheading", type: "text", label: "Subheading", defaultValue: "Built for scale, designed for developers.", group: "Content" },
    { name: "columns", type: "select", label: "Columns", options: ["2", "3", "4"], defaultValue: "3", group: "Appearance" },
    { name: "variant", type: "select", label: "Variant", options: ["cards", "minimal", "centered"], defaultValue: "cards", group: "Appearance" },
  ],
  staticProps: {
    features: [
      { icon: "Zap", title: "Lightning Fast", description: "Optimized components that render instantly." },
      { icon: "Shield", title: "Type Safe", description: "Full TypeScript support with exported interfaces." },
      { icon: "Palette", title: "Themeable", description: "19 brand themes via CSS custom properties." },
      { icon: "Layers", title: "Composable", description: "Mix and match primitives, layouts, and blocks." },
      { icon: "Package", title: "Tree Shakeable", description: "Import only what you use." },
      { icon: "Globe", title: "Universal", description: "Works with Next.js, Vite, and any React setup." },
    ],
  },
};
