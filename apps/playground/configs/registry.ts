import type { ComponentConfig } from "@/components/types";
import { buttonConfig } from "./button";
import { sectionConfig } from "./section";
import { skeletonConfig } from "./skeleton";
import { copyButtonConfig } from "./copy-button";
import { paginationConfig } from "./pagination";
import { containerConfig } from "./container";
import { heroConfig } from "./hero";
import { ctaConfig } from "./cta";
import { faqConfig } from "./faq";
import { statsConfig } from "./stats";
import { newsletterConfig } from "./newsletter";
import { featureGridConfig } from "./feature-grid";

export const componentRegistry: ComponentConfig[] = [
  buttonConfig,
  sectionConfig,
  skeletonConfig,
  copyButtonConfig,
  paginationConfig,
  containerConfig,
  heroConfig,
  ctaConfig,
  faqConfig,
  statsConfig,
  newsletterConfig,
  featureGridConfig,
];

export function getConfig(slug: string): ComponentConfig | undefined {
  return componentRegistry.find((c) => c.slug === slug);
}
