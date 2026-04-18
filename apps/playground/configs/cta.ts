import type { ComponentConfig } from "@/components/types";

export const ctaConfig: ComponentConfig = {
  name: "CTASection",
  slug: "cta",
  description: "Call-to-action section with heading, description, and action buttons",
  category: "block",
  controls: [
    {
      name: "heading",
      type: "text",
      label: "Heading",
      defaultValue: "Ready to Get Started?",
      group: "Content",
    },
    {
      name: "description",
      type: "text",
      label: "Description",
      defaultValue: "Join thousands of developers building with our design system.",
      group: "Content",
    },
    {
      name: "variant",
      type: "select",
      label: "Variant",
      options: ["primary", "accent", "dark", "light"],
      defaultValue: "primary",
      group: "Appearance",
    },
    {
      name: "textAlign",
      type: "select",
      label: "Text Align",
      options: ["left", "center"],
      defaultValue: "center",
      group: "Appearance",
    },
  ],
  staticProps: {
    buttons: [
      { label: "Get Started", href: "#", variant: "primary" },
      { label: "Learn More", href: "#", variant: "outline" },
    ],
  },
};
