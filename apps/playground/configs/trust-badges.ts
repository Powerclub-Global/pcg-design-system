import type { ComponentConfig } from "@/components/types";

export const trustBadgesConfig: ComponentConfig = {
  name: "TrustBadges",
  slug: "trust-badges",
  description: "Logo row or grid for certifications and partner badges",
  category: "block",
  sourcePath: "packages/pcg-ui/components/blocks/trust-badges.tsx",
  controls: [
    { name: "heading", type: "text", label: "Heading", defaultValue: "Certifications" },
    { name: "layout", type: "select", label: "Layout", options: ["row", "grid"], defaultValue: "row" },
    { name: "showLabels", type: "boolean", label: "Show Labels", defaultValue: true },
    { name: "badgeSize", type: "number", label: "Badge Size", defaultValue: 48 },
  ],
  staticProps: {
    badges: [
      { id: "iso", label: "ISO 27001", shortLabel: "ISO" },
      { id: "soc2", label: "SOC 2 Type II", shortLabel: "SOC 2" },
      { id: "gdpr", label: "GDPR Compliant", shortLabel: "GDPR" },
      { id: "hipaa", label: "HIPAA", shortLabel: "HIPAA" },
    ],
  },
};
