export interface TrustBadge {
  id: string;
  label: string;
  shortLabel?: string;
  image: string;
}

export interface TrustBadgesProps {
  badges: TrustBadge[];
  heading?: string;
  description?: string;
  layout?: "row" | "grid";
  showLabels?: boolean;
  badgeSize?: number;
  className?: string;
}

export function TrustBadges({
  badges,
  heading,
  description,
  layout = "row",
  showLabels = true,
  badgeSize = 32,
  className = "",
}: TrustBadgesProps) {
  if (!badges || badges.length === 0) return null;

  return (
    <div className={className}>
      {heading && (
        <div className="text-[10px] text-[var(--color-text-muted,#666)]/60 mb-4 font-semibold uppercase tracking-[0.25em]">
          {heading}
        </div>
      )}

      <div
        className={
          layout === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            : "flex items-center flex-wrap"
        }
      >
        {badges.map((badge, index) => (
          <div key={badge.id} className="flex items-center">
            <div
              className="flex items-center gap-3 px-4 py-2 group"
              title={badge.label}
            >
              <img
                src={badge.image}
                alt={badge.label}
                style={{ height: badgeSize, width: badgeSize }}
                className="object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                loading="lazy"
              />
              {showLabels && (
                <span className="text-xs text-[var(--color-text-muted,#666)]/70 hidden sm:inline font-medium tracking-wide">
                  {badge.shortLabel || badge.label}
                </span>
              )}
            </div>

            {/* Subtle divider between items in row layout */}
            {layout === "row" && index < badges.length - 1 && (
              <div className="hidden md:block h-6 w-px bg-gradient-to-b from-transparent via-[var(--color-border,#e5e5e5)]/30 to-transparent mx-1" />
            )}
          </div>
        ))}
      </div>

      {description && (
        <p className="text-xs text-[var(--color-text-muted,#666)]/50 mt-3 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export default TrustBadges;
