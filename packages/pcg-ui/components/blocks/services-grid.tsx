import Link from "next/link";

export interface ServiceItem {
  icon?: React.ReactNode;
  image?: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}

export interface ServicesGridProps {
  heading?: string;
  description?: string;
  services: ServiceItem[];
  columns?: 2 | 3 | 4;
  variant?: "cards" | "image-cards" | "minimal";
  className?: string;
}

const colsMap = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export function ServicesGrid({
  heading,
  description,
  services,
  columns = 3,
  variant = "cards",
  className = "",
}: ServicesGridProps) {
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
          {services.map((service, i) => {
            const content = (
              <>
                {/* Image */}
                {variant === "image-cards" && service.image && (
                  <div className="aspect-video overflow-hidden rounded-t-2xl -mx-8 -mt-8 mb-8 lg:-mx-10 lg:-mt-10 lg:mb-10">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Icon */}
                {service.icon && (
                  <div className="mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/[0.06] text-[var(--color-accent)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(var(--accent-rgb,212_175_55),0.15)] group-hover:border-[var(--color-accent)]/30 group-hover:bg-[var(--color-accent)]/[0.1]">
                      {service.icon}
                    </div>
                  </div>
                )}

                {/* Title */}
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-text,#1a1a1a)] mb-3 tracking-tight group-hover:text-[var(--color-accent)] transition-colors duration-500">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--color-text-muted,#666)] leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Link arrow */}
                {service.href && (
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)] transition-all duration-500">
                    {service.linkLabel || "Learn more"}
                    <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                )}
              </>
            );

            const cardClass =
              variant === "minimal"
                ? "group p-4"
                : "group relative p-8 lg:p-10 rounded-2xl border border-[var(--color-border,#e5e5e5)]/60 bg-[var(--color-surface,#ffffff)]/50 hover:border-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/[0.02] transition-all duration-500 hover:shadow-[0_0_40px_rgba(var(--accent-rgb,212_175_55),0.04)] overflow-hidden";

            if (service.href) {
              return (
                <Link key={i} href={service.href} className={`block ${cardClass}`}>
                  {content}
                </Link>
              );
            }

            return (
              <div key={i} className={cardClass}>
                {content}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom gradient separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/15 to-transparent" />
    </section>
  );
}

export default ServicesGrid;
