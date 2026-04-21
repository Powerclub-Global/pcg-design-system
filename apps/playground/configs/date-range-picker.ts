import type { ComponentConfig } from "@/components/types";

export const dateRangePickerConfig: ComponentConfig = {
  name: "DateRangePicker",
  slug: "date-range-picker",
  description: "Interactive calendar picker for date range selection with month navigation",
  category: "ui",
  sourcePath: "packages/pcg-ui/components/ui/date-range-picker.tsx",
  controls: [
    { name: "placeholder", type: "text", label: "Placeholder", defaultValue: "Select dates" },
  ],
};
