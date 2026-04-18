import type { ComponentConfig } from "@/components/types";

export const buttonConfig: ComponentConfig = {
  name: "Button",
  slug: "button",
  description: "Versatile button with CVA variants and Radix Slot support",
  category: "ui",
  controls: [
    {
      name: "variant",
      type: "select",
      label: "Variant",
      options: ["default", "outline", "ghost", "link", "destructive"],
      defaultValue: "default",
    },
    {
      name: "size",
      type: "select",
      label: "Size",
      options: ["xs", "sm", "default", "lg", "icon"],
      defaultValue: "default",
    },
    {
      name: "disabled",
      type: "boolean",
      label: "Disabled",
      defaultValue: false,
    },
  ],
  childrenControl: {
    label: "Button Text",
    defaultValue: "Click me",
  },
};
