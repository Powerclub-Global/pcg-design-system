import type { ComponentConfig } from "@/components/types";

export const skeletonConfig: ComponentConfig = {
  name: "Skeleton",
  slug: "skeleton",
  description: "Animated placeholder for loading states",
  category: "ui",
  controls: [
    {
      name: "className",
      type: "text",
      label: "Class (dimensions)",
      defaultValue: "h-12 w-48",
      description: "Use Tailwind classes like h-12 w-48 or h-4 w-full",
    },
  ],
};
