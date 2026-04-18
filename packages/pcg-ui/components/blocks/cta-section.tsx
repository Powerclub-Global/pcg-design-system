import Link from "next/link";

export interface CTAButton {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
}

export interface CTASectionProps {
  heading: string;
  description?: string;
  buttons: CTAButton[];
  variant?: "primary" | "accent" | "dark" | "light";
  textAlign?: "left" | "center";
  className?: string;
}

const variantStyles: Record<NonNullable<CTASectionProps["variant"]>, { bg: string; text: string; muted: string }> = {
  primary: {
    bg: "linear-gradient(180deg, #030712 0%, #0a1628 50%, #030712 100%)",
    text: "text-white",
    muted: "text-white/50",
  },
  accent: {
    bg: "linear-gradient(135deg, #030712 0%, #0d1b2a 40%, #030712 100%)",
    text: "text-white",
    muted: "text-white/50",
  },
  dark: {
    bg: "linear-gradient(180deg, #030712 0%, #0a0a14 50%, #030712 100%)",
    text: "text-white",
    muted: "text-white/50",
  },
  light: {
    bg: "",
    text: "text-[var(--color-text,#1a1a1a)]",
    muted: "text-[var(--color-text-muted,#666)]",
  },
};

function buttonClass(variant: CTAButton["variant"], sectionVariant: CTASectionProps["variant"]) {
  const isLight = sectionVariant === "light";

  if (variant === "outline") {
    return isLight
      ? "border border-[var(--color-text,#1a1a1a)]/20 text-[var(--color-text,#1a1a1a)] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/[0.04] px-8 py-4 rounded-lg font-semibold tracking-wide text-sm uppercase transition-all duration-500"
      : "border border-white/[0.1] text-white hover:border-[var(--color-accent)]/30 hover:bg-white/[0.04] px-8 py-4 rounded-lg font-semibold tracking-wide text-sm uppercase transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--accent-rgb,212_175_55),0.08)]";
  }

  if (variant === "secondary") {
    return isLight
      ? "bg-[var(--color-surface,#f5f5f5)] text-[var(--color-text)] hover:bg-[var(--color-accent)]/[0.06] px-8 py-4 rounded-lg font-semibold tracking-wide text-sm uppercase transition-all duration-500"
      : "bg-white/[0.06] backdrop-blur-sm border border-white/[0.06] text-white hover:bg-white/[0.1] px-8 py-4 rounded-lg font-semibold tracking-wide text-sm uppercase transition-all duration-500";
  }

  // primary
  return isLight
    ? "bg-[var(--color-accent)] text-white px-8 py-4 rounded-lg font-semibold tracking-wide text-sm uppercase transition-all duration-500 hover:shadow-[0_0_40px_rgba(var(--accent-rgb,212_175_55),0.25)] hover:brightness-110"
    : "bg-[var(--color-accent)] text-white px-8 py-4 rounded-lg font-semibold tracking-wide text-sm uppercase transition-all duration-500 hover:shadow-[0_0_40px_rgba(var(--accent-rgb,212_175_55),0.3)] hover:brightness-110";
}

export function CTASection({
  heading,
  description,
  buttons,
  variant = "primary",
  textAlign = "center",
  className = "",
}: CTASectionProps) {
  const styles = variantStyles[variant];
  const alignClass = textAlign === "center" ? "text-center" : "text-left";
  const isLight = variant === "light";

  return (
    <section
      className={`relative py-20 lg:py-32 overflow-hidden ${styles.text} ${className}`}
      style={!isLight ? { background: styles.bg } : undefined}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/20 to-transparent" />

      {/* Radial accent glow */}
      {!isLight && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(var(--accent-rgb, 212 175 55), 0.03) 0%, transparent 70%)",
          }}
        />
      )}

      <div className={`relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 ${alignClass}`}>
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          {heading}
        </h2>

        {/* Decorative gold line */}
        <div className={`h-[2px] w-16 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/50 mt-4 mb-6 ${textAlign === "center" ? "mx-auto" : ""}`} />

        {description && (
          <p className={`text-base sm:text-lg ${styles.muted} max-w-2xl mb-10 leading-relaxed ${textAlign === "center" ? "mx-auto" : ""}`}>
            {description}
          </p>
        )}

        <div className={`flex flex-wrap gap-4 ${textAlign === "center" ? "justify-center" : ""}`}>
          {buttons.map((btn, i) => (
            <Link
              key={i}
              href={btn.href}
              className={buttonClass(btn.variant, variant)}
            >
              {btn.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/20 to-transparent" />
    </section>
  );
}

export default CTASection;
