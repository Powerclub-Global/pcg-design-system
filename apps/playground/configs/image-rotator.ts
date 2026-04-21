import type { ComponentConfig } from "@/components/types";

export const imageRotatorConfig: ComponentConfig = {
  name: "ImageRotator",
  slug: "image-rotator",
  description: "Auto-rotating image carousel with crossfade transitions",
  category: "ui",
  sourcePath: "packages/pcg-ui/components/ui/image-rotator.tsx",
  controls: [
    { name: "intervalMs", type: "number", label: "Interval (ms)", defaultValue: 3000 },
  ],
  staticProps: {
    images: [
      { src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800", alt: "Ocean" },
      { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", alt: "Mountain" },
      { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800", alt: "Landscape" },
    ],
  },
};
