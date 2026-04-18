import type { ComponentConfig } from "@/components/types";

export const statsConfig: ComponentConfig = {
  name: "StatsSection",
  slug: "stats",
  description: "Animated statistics display with counters",
  category: "block",
  controls: [
    { name: "heading", type: "text", label: "Heading", defaultValue: "By the Numbers", group: "Content" },
    { name: "description", type: "text", label: "Description", defaultValue: "Our impact across the ecosystem.", group: "Content" },
    { name: "layout", type: "select", label: "Layout", options: ["row", "grid"], defaultValue: "row", group: "Appearance" },
    { name: "columns", type: "select", label: "Columns", options: ["2", "3", "4"], defaultValue: "4", group: "Appearance" },
    { name: "variant", type: "select", label: "Variant", options: ["default", "card", "dark"], defaultValue: "default", group: "Appearance" },
    { name: "animate", type: "boolean", label: "Animate Counters", defaultValue: true, group: "Behavior" },
    { name: "animationDuration", type: "number", label: "Animation Duration (ms)", defaultValue: 2000, group: "Behavior" },
  ],
  staticProps: {
    stats: [
      { value: 39, label: "Repositories", suffix: "+" },
      { value: 226, label: "Components" },
      { value: 5, label: "Packages" },
      { value: 7650, label: "LOC Saved", suffix: "+" },
    ],
  },
};
