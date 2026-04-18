import Link from "next/link";

export interface HeroCTA {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
}

export interface HeroSectionProps {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  ctas?: HeroCTA[];
  background?: "gradient" | "image" | "video" | "solid";
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundOverlay?: boolean;
  textAlign?: "left" | "center";
  minHeight?: "sm" | "md" | "lg" | "full";
  showScrollIndicator?: boolean;
  animate?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const minHeightMap = {
  sm: "py-16 lg:py-24",
  md: "py-24 lg:py-32",
  lg: "py-32 lg:py-48",
  full: "min-h-screen flex items-center",
};

export function HeroSection({
  eyebrow,
  headline,
  subheadline,
  ctas = [],
  background = "gradient",
  backgroundImage,
  backgroundVideo,
  backgroundOverlay = true,
  textAlign = "left",
  minHeight = "md",
  showScrollIndicator = false,
  children,
  className = "",
}: HeroSectionProps) {
  const alignClass = textAlign === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <section
      className={`relative overflow-hidden ${minHeightMap[minHeight]} ${className}`}
      style={
        background === "solid"
          ? { backgroundColor: "var(--color-primary, #030712)" }
          : undefined
      }
    >
      {/* Background Layer */}
      {background === "gradient" && (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #030712 0%, #0a1628 30%, #0d1b2a 50%, #0a1628 70%, #030712 100%)",
          }}
        />
      )}

      {background === "image" && backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {background === "video" && backgroundVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Overlay */}
      {backgroundOverlay && background !== "solid" && (
        <div className="absolute inset-0 bg-black/30" />
      )}

      {/* Radial accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(var(--accent-rgb, 212 175 55), 0.04) 0%, transparent 70%)",
        }}
      />

      {/* Top gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col max-w-4xl ${alignClass} ${textAlign === "center" ? "mx-auto" : ""}`}>
          {eyebrow && (
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)] mb-6 opacity-90">
              {eyebrow}
            </span>
          )}

          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            {headline}
          </h1>

          {/* Decorative accent line */}
          <div
            className={`h-[2px] w-20 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/30 mb-8 ${textAlign === "center" ? "mx-auto" : ""}`}
          />

          {subheadline && (
            <p className="text-base sm:text-lg text-white/60 mb-10 leading-relaxed max-w-2xl">
              {subheadline}
            </p>
          )}

          {ctas.length > 0 && (
            <div className={`flex flex-wrap gap-4 ${textAlign === "center" ? "justify-center" : ""}`}>
              {ctas.map((cta, i) => (
                <Link
                  key={i}
                  href={cta.href}
                  className={
                    cta.variant === "outline"
                      ? "relative border border-white/20 text-white hover:border-[var(--color-accent)]/40 hover:bg-white/[0.04] px-8 py-4 rounded-lg font-semibold tracking-wide text-sm uppercase transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--accent-rgb,212_175_55),0.1)]"
                      : cta.variant === "secondary"
                        ? "relative bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] text-white hover:bg-white/[0.1] hover:border-white/[0.15] px-8 py-4 rounded-lg font-semibold tracking-wide text-sm uppercase transition-all duration-500"
                        : "relative bg-[var(--color-accent)] text-white px-8 py-4 rounded-lg font-semibold tracking-wide text-sm uppercase transition-all duration-500 hover:shadow-[0_0_40px_rgba(var(--accent-rgb,212_175_55),0.3)] hover:brightness-110"
                  }
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          )}

          {children && <div className="mt-10">{children}</div>}
        </div>
      </div>

      {/* Bottom gradient separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/20 to-transparent" />

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
          <div className="w-[1px] h-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/60 to-transparent animate-bounce" />
          </div>
        </div>
      )}
    </section>
  );
}

export default HeroSection;
