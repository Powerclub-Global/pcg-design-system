import type { ComponentConfig } from "@/components/types";

// UI
import { buttonConfig } from "./button";
import { skeletonConfig } from "./skeleton";
import { sectionConfig } from "./section";
import { copyButtonConfig } from "./copy-button";
import { paginationConfig } from "./pagination";
import { dateRangePickerConfig } from "./date-range-picker";
import { imageRotatorConfig } from "./image-rotator";
import { imageUploadConfig } from "./image-upload";
import { imageWithFallbackConfig } from "./image-with-fallback";
import { jsonLdConfig } from "./json-ld";
import { scrollRevealConfig } from "./scroll-reveal";
import { shareButtonConfig } from "./share-button";
import { statCardConfig } from "./stat-card";

// Layout
import { containerConfig } from "./container";
import { navbarConfig } from "./navbar";
import { footerConfig } from "./footer";

// Blocks
import { heroConfig } from "./hero";
import { ctaConfig } from "./cta";
import { faqConfig } from "./faq";
import { statsConfig } from "./stats";
import { newsletterConfig } from "./newsletter";
import { featureGridConfig } from "./feature-grid";
import { contactFormConfig } from "./contact-form";
import { partnerMarqueeConfig } from "./partner-marquee";
import { pricingSectionConfig } from "./pricing-section";
import { servicesGridConfig } from "./services-grid";
import { testimonialsConfig } from "./testimonials";
import { trustBadgesConfig } from "./trust-badges";

// Commerce
import { variantManagerConfig } from "./variant-manager";

export const componentRegistry: ComponentConfig[] = [
  // UI
  buttonConfig,
  skeletonConfig,
  sectionConfig,
  copyButtonConfig,
  paginationConfig,
  dateRangePickerConfig,
  imageRotatorConfig,
  imageUploadConfig,
  imageWithFallbackConfig,
  jsonLdConfig,
  scrollRevealConfig,
  shareButtonConfig,
  statCardConfig,
  // Layout
  containerConfig,
  navbarConfig,
  footerConfig,
  // Blocks
  heroConfig,
  ctaConfig,
  faqConfig,
  statsConfig,
  newsletterConfig,
  featureGridConfig,
  contactFormConfig,
  partnerMarqueeConfig,
  pricingSectionConfig,
  servicesGridConfig,
  testimonialsConfig,
  trustBadgesConfig,
  // Commerce
  variantManagerConfig,
];

export function getConfig(slug: string): ComponentConfig | undefined {
  return componentRegistry.find((c) => c.slug === slug);
}
