"use client";

import { useState, useCallback } from "react";
import { cn } from "../../lib/cn";

export interface CopyButtonProps {
  /** The text to copy to clipboard */
  text: string;
  /** Label shown on the button */
  label?: string;
  /** Label shown after a successful copy */
  copiedLabel?: string;
  /** Duration in ms to show the copied state */
  copiedDuration?: number;
  /** Optional custom icon element */
  icon?: React.ReactNode;
  className?: string;
}

function CopyIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth={2} />
      <path
        d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export function CopyButton({
  text,
  label = "Copy",
  copiedLabel = "Copied!",
  copiedDuration = 2000,
  icon,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), copiedDuration);
    } catch {
      // Clipboard API not available
    }
  }, [text, copiedDuration]);

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-medium",
        "bg-white/5 backdrop-blur-md",
        "border border-white/10",
        "text-[var(--color-foreground)]",
        "transition-all duration-300 ease-out",
        "hover:border-[var(--color-accent)]/40 hover:bg-white/10",
        "active:scale-[0.98]",
        copied && [
          "border-emerald-500/50 bg-emerald-500/10",
          "text-emerald-400",
        ],
        className
      )}
    >
      <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300",
            copied
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          )}
        >
          <CheckIcon />
        </span>
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300",
            copied
              ? "translate-y-4 opacity-0"
              : "translate-y-0 opacity-100"
          )}
        >
          {icon ?? <CopyIcon />}
        </span>
      </span>
      <span className="transition-colors duration-300">
        {copied ? copiedLabel : label}
      </span>
    </button>
  );
}
