import type { ComponentConfig } from "@/components/types";

export const copyButtonConfig: ComponentConfig = {
  name: "CopyButton",
  slug: "copy-button",
  description: "Copy-to-clipboard button with feedback state",
  category: "ui",
  controls: [
    { name: "text", type: "text", label: "Text to Copy", defaultValue: "npm install @pcg/ui" },
    { name: "label", type: "text", label: "Button Label", defaultValue: "Copy" },
    { name: "copiedLabel", type: "text", label: "Copied Label", defaultValue: "Copied!" },
    { name: "copiedDuration", type: "number", label: "Copied Duration (ms)", defaultValue: 2000 },
  ],
};
