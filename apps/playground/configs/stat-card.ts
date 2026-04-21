import type { ComponentConfig } from "@/components/types";

export const statCardConfig: ComponentConfig = {
  name: "StatCard",
  slug: "stat-card",
  description: "Metric card with title, value, subtitle, and optional trend",
  category: "ui",
  sourcePath: "packages/pcg-ui/components/ui/stat-card.tsx",
  controls: [
    { name: "title", type: "text", label: "Title", defaultValue: "Monthly Revenue" },
    { name: "value", type: "text", label: "Value", defaultValue: "$42,500" },
    { name: "subtitle", type: "text", label: "Subtitle", defaultValue: "+12% from last month" },
  ],
  staticProps: {
    trend: { value: 12, positive: true },
  },
};
