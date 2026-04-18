export interface PartnerLogo {
  name: string;
  src: string;
  href?: string;
}

export interface PartnerMarqueeProps {
  logos: PartnerLogo[];
  heading?: string;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  logoHeight?: number;
  className?: string;
}

const speedMap = {
  slow: "60s",
  normal: "40s",
  fast: "20s",
};

export function PartnerMarquee({
  logos,
  heading,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  logoHeight = 48,
  className = "",
}: PartnerMarqueeProps) {
  if (!logos || logos.length === 0) return null;

  const animationDirection = direction === "right" ? "reverse" : "normal";
  const duration = speedMap[speed];

  const renderSet = (key: string) => (
    <div
      key={key}
      className="flex shrink-0"
      style={{
        animation: `pcg-marquee-scroll ${duration} linear infinite`,
        animationDirection,
      }}
    >
      {logos.map((logo, i) => {
        const img = (
          <img
            src={logo.src}
            alt={logo.name}
            style={{ height: logoHeight }}
            className="object-contain opacity-40 hover:opacity-80 transition-opacity duration-500 grayscale hover:grayscale-0"
            loading="lazy"
          />
        );

        return (
          <div key={`${key}-${i}`} className="flex-shrink-0 mx-10 sm:mx-14 flex items-center">
            {logo.href ? (
              <a href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={logo.name}>
                {img}
              </a>
            ) : (
              img
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <section className={`relative py-14 lg:py-20 ${className}`}>
      {/* Top gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/15 to-transparent" />

      {heading && (
        <div className="text-center mb-10">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-text-muted,#666)]/60">
            {heading}
          </h3>
        </div>
      )}

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[var(--color-surface,#ffffff)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[var(--color-surface,#ffffff)] to-transparent pointer-events-none" />

        <div
          className={`overflow-hidden ${pauseOnHover ? "[&:hover_div]:![animation-play-state:paused]" : ""}`}
        >
          <div className="flex">
            {renderSet("a")}
            {renderSet("b")}
            {renderSet("c")}
            {renderSet("d")}
          </div>
        </div>
      </div>

      {/* Bottom gradient separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/15 to-transparent" />

      {/* Inline keyframes */}
      <style>{`
        @keyframes pcg-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}

export default PartnerMarquee;
