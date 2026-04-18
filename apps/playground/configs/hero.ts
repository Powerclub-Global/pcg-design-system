import type { ComponentConfig } from "@/components/types";

export const heroConfig: ComponentConfig = {
  name: "HeroSection",
  slug: "hero",
  description: "Full-width hero section with headline, CTAs, and background variants",
  category: "block",
  controls: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Welcome to Our Platform",
      group: "Content",
    },
    {
      name: "headline",
      type: "text",
      label: "Headline",
      defaultValue: "Build Something Amazing",
      group: "Content",
    },
    {
      name: "subheadline",
      type: "text",
      label: "Subheadline",
      defaultValue: "Ship faster with our design system and component library.",
      group: "Content",
    },
    {
      name: "background",
      type: "select",
      label: "Background",
      options: ["gradient", "solid", "image", "video"],
      defaultValue: "gradient",
      group: "Appearance",
    },
    {
      name: "textAlign",
      type: "select",
      label: "Text Align",
      options: ["left", "center"],
      defaultValue: "left",
      group: "Appearance",
    },
    {
      name: "minHeight",
      type: "select",
      label: "Min Height",
      options: ["sm", "md", "lg", "full"],
      defaultValue: "md",
      group: "Appearance",
    },
    {
      name: "backgroundOverlay",
      type: "boolean",
      label: "Background Overlay",
      defaultValue: true,
      group: "Appearance",
    },
    {
      name: "showScrollIndicator",
      type: "boolean",
      label: "Scroll Indicator",
      defaultValue: false,
      group: "Appearance",
    },
  ],
  staticProps: {
    ctas: [
      { label: "Get Started", href: "#", variant: "primary" },
      { label: "Learn More", href: "#", variant: "outline" },
    ],
  },
};
