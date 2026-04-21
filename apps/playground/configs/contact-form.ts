import type { ComponentConfig } from "@/components/types";

export const contactFormConfig: ComponentConfig = {
  name: "ContactForm",
  slug: "contact-form",
  description: "Multi-section form with validation, loading, and success state",
  category: "block",
  sourcePath: "packages/pcg-ui/components/blocks/contact-form.tsx",
  controls: [
    { name: "submitLabel", type: "text", label: "Submit Label", defaultValue: "Send Message" },
    { name: "loadingLabel", type: "text", label: "Loading Label", defaultValue: "Sending..." },
    { name: "successTitle", type: "text", label: "Success Title", defaultValue: "Message Received!" },
  ],
  staticProps: {
    sections: [
      {
        fields: [
          { name: "name", label: "Name", type: "text", required: true, placeholder: "Your name" },
          { name: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
          { name: "message", label: "Message", type: "textarea", required: true, placeholder: "Tell us more..." },
        ],
      },
    ],
  },
};
