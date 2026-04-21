import type { ComponentConfig } from "@/components/types";

export const variantManagerConfig: ComponentConfig = {
  name: "VariantManager",
  slug: "variant-manager",
  description: "CRUD interface for product variants (SKU, price, attributes)",
  category: "commerce",
  sourcePath: "packages/pcg-ui/components/commerce/variant-manager.tsx",
  controls: [
    { name: "addLabel", type: "text", label: "Add Label", defaultValue: "Add Variant" },
    { name: "priceInCents", type: "boolean", label: "Price in Cents", defaultValue: true },
    { name: "emptyTitle", type: "text", label: "Empty Title", defaultValue: "No variants created" },
  ],
  staticProps: {
    attributes: [
      { name: "Size", key: "size", placeholder: "S, M, L, XL" },
      { name: "Color", key: "color", placeholder: "Red, Blue" },
    ],
  },
};
