import type { ComponentConfig } from "@/components/types";

export const faqConfig: ComponentConfig = {
  name: "FAQSection",
  slug: "faq",
  description: "Accordion FAQ section with category filtering",
  category: "block",
  controls: [
    { name: "heading", type: "text", label: "Heading", defaultValue: "Frequently Asked Questions", group: "Content" },
    { name: "description", type: "text", label: "Description", defaultValue: "Everything you need to know about our platform.", group: "Content" },
    { name: "allowMultiple", type: "boolean", label: "Allow Multiple Open", defaultValue: false, group: "Behavior" },
    { name: "showCategories", type: "boolean", label: "Show Category Filters", defaultValue: false, group: "Behavior" },
  ],
  staticProps: {
    items: [
      { question: "What is PCG Design System?", answer: "A unified component library for the PowerClub Global ecosystem, providing reusable UI primitives, layout components, and page blocks.", category: "General" },
      { question: "How do I install it?", answer: "Add @pcg/ui and @pcg/tokens as dependencies in your project. Import components directly from @pcg/ui.", category: "Setup" },
      { question: "Does it support dark mode?", answer: "Yes. All components use CSS custom properties which automatically adapt to dark mode via the .dark class or prefers-color-scheme.", category: "General" },
      { question: "Can I customize the theme?", answer: "Import one of the 19 brand theme CSS files from @pcg/tokens, or create your own by overriding the CSS custom properties.", category: "Setup" },
      { question: "Is it compatible with Next.js?", answer: "Fully compatible with Next.js App Router. Components use 'use client' directive where needed.", category: "Setup" },
    ],
  },
};
