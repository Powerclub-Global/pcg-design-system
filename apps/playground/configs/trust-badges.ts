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
      { id: "iso", label: "ISO 27001", shortLabel: "ISO", image: "https://upload.wikimedia.org/wikipedia/commons/0/03/ISO_Logo_%28Red_square%29.svg" },
      { id: "soc2", label: "SOC 2 Type II", shortLabel: "SOC 2", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/AICPA_Logo.svg/240px-AICPA_Logo.svg.png" },
      { id: "gdpr", label: "GDPR Compliant", shortLabel: "GDPR", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/240px-Flag_of_Europe.svg.png" },
    ],
  },
};
