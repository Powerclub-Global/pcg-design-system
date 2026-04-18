"use client";

import { useState } from "react";

export interface NewsletterSignupProps {
  variant?: "inline" | "card" | "footer";
  title?: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
  onSubmit: (email: string) => Promise<{ message?: string; error?: string }>;
  className?: string;
}

export function NewsletterSignup({
  variant = "inline",
  title = "Subscribe to Our Newsletter",
  description = "Get the latest updates delivered directly to your inbox.",
  placeholder = "Enter your email",
  buttonLabel = "Subscribe",
  onSubmit,
  className = "",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const result = await onSubmit(email);
      if (result.error) {
        setStatus("error");
        setMessage(result.error);
      } else {
        setStatus("success");
        setMessage(result.message || "Successfully subscribed!");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  /* ---- CARD variant ---- */
  if (variant === "card") {
    return (
      <div className={`relative p-10 rounded-2xl border border-[var(--color-border,#e5e5e5)]/60 bg-[var(--color-surface,#ffffff)]/50 text-center overflow-hidden ${className}`}>
        {/* Subtle accent glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(var(--accent-rgb, 212 175 55), 0.03) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-text,#1a1a1a)] mb-2 tracking-tight">{title}</h3>
          <div className="mx-auto mt-3 h-[2px] w-12 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/50 mb-3" />
          <p className="text-sm text-[var(--color-text-muted,#666)] mb-8 leading-relaxed">{description}</p>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-2 text-[var(--color-accent)] text-sm font-medium py-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {message}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className="w-full px-5 py-4 rounded-xl border border-[var(--color-border,#e5e5e5)]/60 bg-[var(--color-surface,#ffffff)]/80 text-[var(--color-text,#1a1a1a)] placeholder-[var(--color-text-muted,#999)] text-sm focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)]/20 outline-none transition-all duration-500"
                disabled={status === "loading"}
                required
              />
              <button
                type="submit"
                className="w-full bg-[var(--color-accent)] text-white py-4 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--accent-rgb,212_175_55),0.25)] hover:brightness-110 disabled:opacity-50"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Subscribing..." : buttonLabel}
              </button>
              {status === "error" && (
                <p className="text-red-500/80 text-xs">{message}</p>
              )}
            </form>
          )}
        </div>
      </div>
    );
  }

  /* ---- FOOTER variant ---- */
  if (variant === "footer") {
    return (
      <div className={className}>
        <h4 className="font-[family-name:var(--font-display)] font-bold text-sm uppercase tracking-[0.15em] mb-4">{title}</h4>
        <p className="text-white/40 text-sm mb-5 leading-relaxed">{description}</p>

        {status === "success" ? (
          <div className="flex items-center gap-2 text-[var(--color-accent)] text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 text-sm focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)]/20 outline-none transition-all duration-500"
              disabled={status === "loading"}
              required
            />
            <button
              type="submit"
              className="px-5 py-3 bg-[var(--color-accent)] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-500 hover:shadow-[0_0_20px_rgba(var(--accent-rgb,212_175_55),0.25)] disabled:opacity-50"
              disabled={status === "loading"}
            >
              {status === "loading" ? "..." : "Join"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-red-400/80 text-xs mt-2">{message}</p>
        )}
      </div>
    );
  }

  /* ---- INLINE (default) variant ---- */
  return (
    <div className={`text-center ${className}`}>
      <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-text,#1a1a1a)] mb-2 tracking-tight">{title}</h3>
      <div className="mx-auto mt-3 h-[2px] w-12 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/50 mb-3" />
      <p className="text-sm text-[var(--color-text-muted,#666)] mb-8 max-w-xl mx-auto leading-relaxed">{description}</p>

      {status === "success" ? (
        <div className="inline-flex items-center gap-2 text-[var(--color-accent)] text-sm font-medium py-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-5 py-4 rounded-xl border border-[var(--color-border,#e5e5e5)]/60 bg-[var(--color-surface,#ffffff)]/80 text-[var(--color-text,#1a1a1a)] placeholder-[var(--color-text-muted,#999)] text-sm focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)]/20 outline-none transition-all duration-500"
            disabled={status === "loading"}
            required
          />
          <button
            type="submit"
            className="bg-[var(--color-accent)] text-white px-7 py-4 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--accent-rgb,212_175_55),0.25)] hover:brightness-110 disabled:opacity-50"
            disabled={status === "loading"}
          >
            {status === "loading" ? "..." : buttonLabel}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-red-500/80 text-xs mt-3">{message}</p>
      )}
    </div>
  );
}

export default NewsletterSignup;
