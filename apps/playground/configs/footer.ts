import type { ComponentConfig } from "@/components/types";

export const footerConfig: ComponentConfig = {
  name: "Footer",
  slug: "footer",
  description: "Multi-column footer with brand, links, socials, and contact",
  category: "layout",
  sourcePath: "packages/pcg-ui/components/layout/footer.tsx",
  controls: [
    { name: "copyright", type: "text", label: "Copyright", defaultValue: "© 2026 PCG Global" },
  ],
  staticProps: {
    brand: {
      name: "PCG",
      description: "Building the future of connected commerce.",
    },
    linkSections: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#" },
          { label: "Pricing", href: "#" },
          { label: "Docs", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Careers", href: "#" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "#" },
          { label: "Terms", href: "#" },
        ],
      },
    ],
    socialLinks: [
      { platform: "twitter", href: "#" },
      { platform: "instagram", href: "#" },
      { platform: "linkedin", href: "#" },
    ],
    contact: {
      email: "hello@pcg.com",
      phone: "+1 555 000 0000",
    },
  },
};
