import type { ComponentConfig } from "@/components/types";

export const shareButtonConfig: ComponentConfig = {
  name: "ShareButton",
  slug: "share-button",
  description: "Native share dialog or clipboard fallback",
  category: "ui",
  sourcePath: "packages/pcg-ui/components/ui/share-button.tsx",
  controls: [
    { name: "title", type: "text", label: "Title", defaultValue: "Check this out" },
    { name: "description", type: "text", label: "Description", defaultValue: "Shared from PCG" },
    { name: "url", type: "text", label: "URL", defaultValue: "https://powerclubglobal.com" },
  ],
  childrenControl: {
    label: "Button Label",
    defaultValue: "Share",
  },
};
