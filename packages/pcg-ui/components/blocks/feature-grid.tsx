export interface FeatureItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  heading?: string;
  description?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  variant?: "cards" | "minimal" | "centered";
  className?: string;
}

const colsMap = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({
  heading,
  description,
  features,
  columns = 3,
  variant = "cards",
  className = "",
}: FeatureGridProps) {
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

        <div className={`grid gap-6 lg:gap-8 ${colsMap[columns]}`}>
          {features.map((feature, i) => (
            <div
              key={i}
              className={
                variant === "cards"
                  ? "group relative p-8 lg:p-10 rounded-2xl border border-[var(--color-border,#e5e5e5)]/60 bg-[var(--color-surface,#ffffff)]/50 hover:border-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/[0.02] transition-all duration-500 hover:shadow-[0_0_40px_rgba(var(--accent-rgb,212_175_55),0.04)]"
                  : variant === "centered"
                    ? "group p-8 lg:p-10 text-center"
                    : "group p-4"
              }
            >
              {feature.icon && (
                <div
                  className={`mb-6 ${variant === "centered" ? "flex justify-center" : ""}`}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/[0.06] text-[var(--color-accent)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(var(--accent-rgb,212_175_55),0.15)] group-hover:border-[var(--color-accent)]/30 group-hover:bg-[var(--color-accent)]/[0.1]">
                    {feature.icon}
                  </div>
                </div>
              )}
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-text,#1a1a1a)] mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted,#666)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/15 to-transparent" />
    </section>
  );
}

export default FeatureGrid;
