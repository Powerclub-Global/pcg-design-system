import type { ComponentConfig } from "@/components/types";

export const containerConfig: ComponentConfig = {
  name: "Container",
  slug: "container",
  description: "Responsive container with configurable max-width",
  category: "layout",
  controls: [
    {
      name: "maxWidth",
      type: "select",
      label: "Max Width",
      options: ["sm", "md", "lg", "xl", "2xl", "7xl", "full"],
      defaultValue: "7xl",
    },
    {
      name: "padding",
      type: "boolean",
      label: "Padding",
      defaultValue: true,
    },
    {
      name: "as",
      type: "select",
      label: "HTML Element",
      options: ["div", "section", "main", "article"],
      defaultValue: "div",
    },
  ],
  childrenControl: {
    label: "Content",
    defaultValue: "Container content here",
  },
};
