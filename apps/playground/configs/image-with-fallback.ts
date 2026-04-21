import type { ComponentConfig } from "@/components/types";

export const imageWithFallbackConfig: ComponentConfig = {
  name: "ImageWithFallback",
  slug: "image-with-fallback",
  description: "Image element with fallback src on load error",
  category: "ui",
  sourcePath: "packages/pcg-ui/components/ui/image-with-fallback.tsx",
  controls: [
    {
      name: "src",
      type: "text",
      label: "Src",
      defaultValue: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    },
    {
      name: "fallbackSrc",
      type: "text",
      label: "Fallback Src",
      defaultValue: "https://via.placeholder.com/600x400?text=Fallback",
    },
    { name: "alt", type: "text", label: "Alt text", defaultValue: "Preview" },
    { name: "className", type: "text", label: "Class", defaultValue: "rounded-lg max-w-md" },
  ],
};
