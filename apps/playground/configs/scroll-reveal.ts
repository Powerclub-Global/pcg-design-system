import type { ComponentConfig } from "@/components/types";

export const scrollRevealConfig: ComponentConfig = {
  name: "ScrollReveal",
  slug: "scroll-reveal",
  description: "Fade and slide-up animation on viewport intersection",
  category: "ui",
  sourcePath: "packages/pcg-ui/components/ui/scroll-reveal.tsx",
  controls: [
    { name: "delay", type: "number", label: "Delay (ms)", defaultValue: 0 },
    { name: "threshold", type: "number", label: "Threshold (0-1)", defaultValue: 0.15 },
    { name: "once", type: "boolean", label: "Trigger Once", defaultValue: true },
  ],
  childrenControl: {
    label: "Content",
    defaultValue: "Scroll to reveal this text",
  },
};
