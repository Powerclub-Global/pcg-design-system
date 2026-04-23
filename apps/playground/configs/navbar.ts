import type { ComponentConfig } from "@/components/types";

export const navbarConfig: ComponentConfig = {
  name: "Navbar",
  slug: "navbar",
  description: "Fixed header with desktop nav, mobile drawer, and CTA",
  category: "layout",
  sourcePath: "packages/pcg-ui/components/layout/navbar.tsx",
  controls: [
    {
      name: "scrollBehavior",
      type: "select",
      label: "Scroll Behavior",
      options: ["always-solid", "transparent-to-solid"],
      defaultValue: "always-solid",
    },
    {
      name: "mobileMenuVariant",
      type: "select",
      label: "Mobile Menu",
      options: ["drawer", "dropdown", "fullscreen"],
      defaultValue: "drawer",
    },
    {
      name: "theme",
      type: "select",
      label: "Theme",
      options: ["dark", "light"],
      defaultValue: "dark",
    },
  ],
  staticProps: {
    logo: "PCG",
    logoHref: "/",
    navItems: [
      { label: "Products", href: "#products" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Get Started", href: "#cta", variant: "primary" },
    className: "!relative",
  },
};
