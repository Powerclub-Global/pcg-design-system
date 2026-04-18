import type { ComponentConfig } from "@/components/types";

export const paginationConfig: ComponentConfig = {
  name: "Pagination",
  slug: "pagination",
  description: "Page navigation with ellipsis and prev/next buttons",
  category: "ui",
  controls: [
    { name: "page", type: "number", label: "Current Page", defaultValue: 1 },
    { name: "pages", type: "number", label: "Total Pages", defaultValue: 10 },
    { name: "maxVisible", type: "number", label: "Max Visible Buttons", defaultValue: 5 },
  ],
};
