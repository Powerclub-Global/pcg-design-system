import type { ComponentConfig } from "@/components/types";

export const imageUploadConfig: ComponentConfig = {
  name: "ImageUpload",
  slug: "image-upload",
  description: "Drag-and-drop image upload with preview grid",
  category: "ui",
  sourcePath: "packages/pcg-ui/components/ui/image-upload.tsx",
  controls: [
    { name: "label", type: "text", label: "Label", defaultValue: "Upload Images" },
    { name: "maxFiles", type: "number", label: "Max Files", defaultValue: 5 },
  ],
};
