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
    { name: "logoHeight", type: "number", label: "Logo Height", defaultValue: 48 },
  ],
  staticProps: {
    logos: [
      { name: "Vercel", src: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png" },
      { name: "Stripe", src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
      { name: "GitHub", src: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" },
      { name: "OpenAI", src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
      { name: "Figma", src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
    ],
  },
};
