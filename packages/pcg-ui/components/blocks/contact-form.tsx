"use client";

import { useState } from "react";

export interface ContactFormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "date" | "number";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  halfWidth?: boolean;
}

export interface ContactFormSection {
  title?: string;
  fields: ContactFormField[];
}

export interface ContactFormProps {
  sections: ContactFormSection[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  submitLabel?: string;
  loadingLabel?: string;
  successTitle?: string;
  successMessage?: string;
  errorMessage?: string;
  resetLabel?: string;
  className?: string;
}

export function ContactForm({
  sections,
  onSubmit,
  submitLabel = "Send Message",
  loadingLabel = "Sending...",
  successTitle = "Message Received!",
  successMessage = "Thank you for reaching out. We will be in touch soon.",
  errorMessage = "Something went wrong. Please try again.",
  resetLabel = "Send another message",
  className = "",
}: ContactFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function updateField(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      await onSubmit(formData);
      setStatus("success");
      setFormData({});
    } catch {
      setStatus("error");
    }
  }

  const baseInputClass =
    "w-full px-5 py-4 rounded-xl border border-[var(--color-border,#e5e5e5)]/60 bg-[var(--color-surface,#ffffff)]/50 text-[var(--color-text,#1a1a1a)] placeholder-[var(--color-text-muted,#999)]/60 text-sm focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)]/30 outline-none transition-all duration-500 hover:border-[var(--color-accent)]/15";

  function renderField(field: ContactFormField) {
    const label = (
      <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted,#666)] mb-3">
        {field.label}
        {field.required && <span className="text-[var(--color-accent)] ml-1">*</span>}
      </label>
    );

    if (field.type === "textarea") {
      return (
        <div key={field.name}>
          {label}
          <textarea
            rows={5}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            className={baseInputClass}
            placeholder={field.placeholder}
          />
        </div>
      );
    }

    if (field.type === "select" && field.options) {
      return (
        <div key={field.name}>
          {label}
          <select
            required={field.required}
            value={formData[field.name] || ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            className={baseInputClass}
          >
            <option value="">{field.placeholder || "Select an option"}</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div key={field.name}>
        {label}
        <input
          type={field.type}
          required={field.required}
          value={formData[field.name] || ""}
          onChange={(e) => updateField(field.name, e.target.value)}
          className={baseInputClass}
          placeholder={field.placeholder}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-2xl border border-[var(--color-border,#e5e5e5)]/60 bg-[var(--color-surface,#ffffff)]/50 p-8 md:p-12 overflow-hidden ${className}`}
    >
      {/* Subtle accent glow at top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(var(--accent-rgb, 212 175 55), 0.02) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10">
        {status === "success" ? (
          <div className="text-center py-16">
            {/* Success checkmark */}
            <div className="w-20 h-20 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/[0.06] flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(var(--accent-rgb,212_175_55),0.1)]">
              <svg className="w-10 h-10 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-text,#1a1a1a)] mb-4 tracking-tight">
              {successTitle}
            </h2>
            <p className="text-sm text-[var(--color-text-muted,#666)] leading-relaxed mb-10 max-w-md mx-auto">
              {successMessage}
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-sm text-[var(--color-accent)] font-medium hover:underline underline-offset-4 transition-all duration-300"
            >
              {resetLabel}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            {sections.map((section, si) => (
              <div key={si}>
                {section.title && (
                  <>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-text,#1a1a1a)] mb-2 tracking-tight">
                      {section.title}
                    </h3>
                    <div className="h-px bg-gradient-to-r from-[var(--color-accent)]/15 via-[var(--color-border,#e5e5e5)]/20 to-transparent mb-6" />
                  </>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  {section.fields.map((field) => {
                    const isFullWidth = field.type === "textarea" || field.halfWidth === false;
                    return (
                      <div key={field.name} className={isFullWidth ? "md:col-span-2" : ""}>
                        {renderField(field)}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {status === "error" && (
              <div className="flex items-center gap-3 rounded-xl border border-red-300/30 bg-red-50/50 p-4 text-sm text-red-600">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[var(--color-accent)] text-white font-semibold text-sm uppercase tracking-wider py-5 rounded-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(var(--accent-rgb,212_175_55),0.25)] hover:brightness-110 disabled:opacity-50"
            >
              {status === "loading" ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {loadingLabel}
                </span>
              ) : (
                submitLabel
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactForm;
