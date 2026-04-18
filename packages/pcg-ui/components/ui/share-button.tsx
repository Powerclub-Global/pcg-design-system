"use client";

import { useState } from "react";
import { cn } from "../../lib/cn";

export interface ShareButtonProps {
  /** Title for the native share dialog */
  title?: string;
  /** Description text for the native share dialog */
  description?: string;
  /** URL to share — defaults to current page */
  url?: string;
  /** Optional custom icon element */
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

function ShareIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4"
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

export function ShareButton({
  title = "",
  description = "",
  url,
  icon,
  className,
  children,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      // User cancelled share or clipboard failed — silent
    }
  };

  return (
    <button
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-medium",
        "bg-white/5 backdrop-blur-md",
        "border border-white/10",
        "text-[var(--color-accent)]",
        "transition-all duration-300 ease-out",
        "hover:border-[var(--color-accent)]/40 hover:bg-white/10",
        "active:scale-[0.98]",
        copied && [
          "border-emerald-500/50 bg-emerald-500/10",
          "text-emerald-400",
        ],
        className
      )}
      onClick={handleShare}
      type="button"
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
          {icon ?? <ShareIcon />}
        </span>
      </span>
      {children ?? (copied ? "Copied!" : "Share")}
    </button>
  );
}
