import Link from "next/link";

export interface PricingFeature {
  text: string;
  included?: boolean;
}

export interface PricingTier {
  name: string;
  price: string;
  priceSubtext?: string;
  description?: string;
  features: (string | PricingFeature)[];
  cta: { label: string; href: string };
  popular?: boolean;
}

export interface PricingSectionProps {
  heading?: string;
  description?: string;
  tiers: PricingTier[];
  popularLabel?: string;
  className?: string;
}

export function PricingSection({
  heading,
  description,
  tiers,
  popularLabel = "Most Popular",
  className = "",
}: PricingSectionProps) {
  return (
    <section className={`relative py-20 lg:py-32 ${className}`}>
      {/* Top gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(heading || description) && (
          <div className="text-center mb-16 lg:mb-20">
            {heading && (
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text,#1a1a1a)] mb-4">
                {heading}
              </h2>
            )}
            {heading && (
              <div className="mx-auto mt-4 h-[2px] w-16 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/50 mb-4" />
            )}
            {description && (
              <p className="text-base text-[var(--color-text-muted,#666)] max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        <div
          className={`grid gap-8 items-stretch ${
            tiers.length === 1
              ? "max-w-md mx-auto"
              : tiers.length === 2
                ? "md:grid-cols-2 max-w-4xl mx-auto"
                : tiers.length === 3
                  ? "md:grid-cols-2 lg:grid-cols-3"
                  : "md:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`group relative flex flex-col rounded-2xl border p-8 lg:p-10 transition-all duration-500 ${
                tier.popular
                  ? "border-[var(--color-accent)]/30 bg-[var(--color-accent)]/[0.02] shadow-[0_0_60px_rgba(var(--accent-rgb,212_175_55),0.08)] scale-[1.02] z-10"
                  : "border-[var(--color-border,#e5e5e5)]/60 bg-[var(--color-surface,#ffffff)]/50 hover:border-[var(--color-accent)]/15 hover:bg-[var(--color-accent)]/[0.01]"
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[var(--color-accent)] text-white text-[10px] font-bold uppercase tracking-[0.15em] px-5 py-1.5 rounded-full shadow-[0_0_20px_rgba(var(--accent-rgb,212_175_55),0.3)]">
                  {popularLabel}
                </div>
              )}

              {/* Tier name */}
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-text,#1a1a1a)] mb-2 tracking-tight">
                {tier.name}
              </h3>

              {/* Description */}
              {tier.description && (
                <p className="text-sm text-[var(--color-text-muted,#666)] mb-6 leading-relaxed">
                  {tier.description}
                </p>
              )}

              {/* Price */}
              <div className="mb-8">
                <span className="font-[family-name:var(--font-display)] text-4xl lg:text-5xl font-bold text-[var(--color-text,#1a1a1a)] tracking-tight">
                  {tier.price}
                </span>
                {tier.priceSubtext && (
                  <span className="text-[var(--color-text-muted,#666)] ml-2 text-sm">
                    {tier.priceSubtext}
                  </span>
                )}
              </div>

              {/* Separator */}
              <div className="h-px bg-gradient-to-r from-[var(--color-accent)]/10 via-[var(--color-border,#e5e5e5)]/30 to-transparent mb-8" />

              {/* Features */}
              <ul className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature, fi) => {
                  const text = typeof feature === "string" ? feature : feature.text;
                  const included = typeof feature === "string" ? true : feature.included !== false;

                  return (
                    <li key={fi} className="flex items-start gap-3 text-sm">
                      {included ? (
                        <svg
                          className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--color-accent)]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--color-text-muted,#ccc)]/40"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <span className={included ? "text-[var(--color-text-muted,#666)]" : "text-[var(--color-text-muted,#ccc)]/50 line-through"}>
                        {text}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* CTA */}
              <Link
                href={tier.cta.href}
                className={`block text-center w-full py-4 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-500 ${
                  tier.popular
                    ? "bg-[var(--color-accent)] text-white hover:shadow-[0_0_30px_rgba(var(--accent-rgb,212_175_55),0.3)] hover:brightness-110"
                    : "border border-[var(--color-border,#e5e5e5)]/60 text-[var(--color-text,#1a1a1a)] hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/[0.03]"
                }`}
              >
                {tier.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/15 to-transparent" />
    </section>
  );
}

export default PricingSection;
