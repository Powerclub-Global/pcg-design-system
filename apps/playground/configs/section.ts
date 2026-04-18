import type { ComponentConfig } from "@/components/types";

export const sectionConfig: ComponentConfig = {
  name: "Section",
  slug: "section",
  description: "Generic section wrapper with title, subtitle, and centered layout option",
  category: "ui",
  controls: [
    { name: "title", type: "text", label: "Title", defaultValue: "Our Features" },
    { name: "subtitle", type: "text", label: "Subtitle", defaultValue: "Everything you need to build modern applications." },
    { name: "center", type: "boolean", label: "Center Align", defaultValue: false },
    { name: "id", type: "text", label: "Section ID", defaultValue: "" },
  ],
  childrenControl: {
    label: "Content",
    defaultValue: "Section content goes here",
  },
};
