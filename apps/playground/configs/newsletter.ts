import type { ComponentConfig } from "@/components/types";

export const newsletterConfig: ComponentConfig = {
  name: "NewsletterSignup",
  slug: "newsletter",
  description: "Email signup form with 3 layout variants",
  category: "block",
  controls: [
    { name: "variant", type: "select", label: "Variant", options: ["inline", "card", "footer"], defaultValue: "card", group: "Appearance" },
    { name: "title", type: "text", label: "Title", defaultValue: "Subscribe to Our Newsletter", group: "Content" },
    { name: "description", type: "text", label: "Description", defaultValue: "Get the latest updates delivered directly to your inbox.", group: "Content" },
    { name: "placeholder", type: "text", label: "Placeholder", defaultValue: "Enter your email", group: "Content" },
    { name: "buttonLabel", type: "text", label: "Button Label", defaultValue: "Subscribe", group: "Content" },
  ],
};
