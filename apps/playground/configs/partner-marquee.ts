import type { ComponentConfig } from "@/components/types";

export const partnerMarqueeConfig: ComponentConfig = {
  name: "PartnerMarquee",
  slug: "partner-marquee",
  description: "Infinite scrolling logo marquee with pause-on-hover",
  category: "block",
  sourcePath: "packages/pcg-ui/components/blocks/partner-marquee.tsx",
  controls: [
    { name: "heading", type: "text", label: "Heading", defaultValue: "Trusted by leading brands" },
    { name: "speed", type: "select", label: "Speed", options: ["slow", "normal", "fast"], defaultValue: "normal" },
    { name: "direction", type: "select", label: "Direction", options: ["left", "right"], defaultValue: "left" },
    { name: "pauseOnHover", type: "boolean", label: "Pause on Hover", defaultValue: true },
    { name: "logoHeight", type: "number", label: "Logo Height", defaultValue: 36 },
  ],
  staticProps: {
    logos: [
      { name: "Vercel" },
      { name: "Stripe" },
      { name: "GitHub" },
      { name: "OpenAI" },
      { name: "Figma" },
      { name: "Linear" },
      { name: "Shopify" },
    ],
  },
};
