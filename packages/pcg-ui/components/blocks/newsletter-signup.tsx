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

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#ffffff",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  color: "#000000",
};

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

  const SuccessLine = (
    <div className="flex items-center justify-center gap-2 py-3 text-sm font-medium" style={{ color: "#ffffff" }}>
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {message}
    </div>
  );

  if (variant === "card") {
    return (
      <div
        className={`mx-auto w-full max-w-md rounded-xl p-8 text-center backdrop-blur-xl ${className}`}
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.88)",
        }}
      >
        <h3 className="mb-3 font-semibold uppercase tracking-wide text-white" style={{ fontSize: "1.5rem", lineHeight: 0.95 }}>
          {title}
        </h3>
        <p className="mb-6 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          {description}
        </p>
        {status === "success" ? SuccessLine : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-sm px-4 py-3 text-sm outline-none transition-colors focus:border-white"
              style={inputStyle}
              disabled={status === "loading"}
              required
            />
            <button
              type="submit"
              className="w-full rounded-sm py-3 text-sm font-semibold uppercase tracking-wider transition-all hover:brightness-110 disabled:opacity-50"
              style={buttonStyle}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing..." : buttonLabel}
            </button>
            {status === "error" && <p className="text-xs" style={{ color: "#ffffff" }}>{message}</p>}
          </form>
        )}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={className} style={{ color: "rgba(255,255,255,0.88)" }}>
        <h4 className="mb-3 text-xl font-semibold uppercase tracking-wide text-white">{title}</h4>
        <p className="mb-5 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          {description}
        </p>
        {status === "success" ? SuccessLine : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="flex-1 rounded-sm px-4 py-3 text-sm outline-none focus:border-white"
              style={inputStyle}
              disabled={status === "loading"}
              required
            />
            <button
              type="submit"
              className="rounded-sm px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-all hover:brightness-110 disabled:opacity-50"
              style={buttonStyle}
              disabled={status === "loading"}
            >
              {status === "loading" ? "..." : "Join"}
            </button>
          </form>
        )}
        {status === "error" && <p className="mt-2 text-xs" style={{ color: "#ffffff" }}>{message}</p>}
      </div>
    );
  }

  return (
    <div
      className={`px-6 py-16 text-center ${className}`}
      style={{ backgroundColor: "#0d0d0d", color: "rgba(255,255,255,0.88)" }}
    >
      <h3 className="mb-3 font-semibold uppercase tracking-wide text-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}>
        {title}
      </h3>
      <p className="mx-auto mb-8 max-w-xl text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
        {description}
      </p>
      {status === "success" ? SuccessLine : (
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="flex-1 rounded-sm px-4 py-3 text-sm outline-none focus:border-white"
            style={inputStyle}
            disabled={status === "loading"}
            required
          />
          <button
            type="submit"
            className="rounded-sm px-7 py-3 text-sm font-semibold uppercase tracking-wider transition-all hover:brightness-110 disabled:opacity-50"
            style={buttonStyle}
            disabled={status === "loading"}
          >
            {status === "loading" ? "..." : buttonLabel}
          </button>
        </form>
      )}
      {status === "error" && <p className="mt-3 text-xs" style={{ color: "#ffffff" }}>{message}</p>}
    </div>
  );
}

export default NewsletterSignup;
