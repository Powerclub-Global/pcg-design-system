import type { ComponentConfig } from "@/components/types";

export const jsonLdConfig: ComponentConfig = {
  name: "JsonLd",
  slug: "json-ld",
  description: "Renders structured data script tag for SEO (invisible at runtime)",
  category: "ui",
  sourcePath: "packages/pcg-ui/components/ui/json-ld.tsx",
  controls: [],
  staticProps: {
    data: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "PowerClub Global",
      url: "https://powerclubglobal.com",
    },
  },
};
