import { cn } from "../../lib/cn";

export interface StatCardTrend {
  value: number;
  positive: boolean;
}

export interface StatCardProps {
  /** Label above the value */
  title: string;
  /** Primary display value */
  value: string | number;
  /** Secondary text below the value */
  subtitle?: string;
  /** Icon element rendered top-right */
  icon?: React.ReactNode;
  /** Trend indicator */
  trend?: StatCardTrend;
  /** Optional click handler */
  onClick?: () => void;
  className?: string;
}

function TrendArrow({ positive }: { positive: boolean }) {
  return (
    <svg
      className={cn("inline-block h-3.5 w-3.5 mr-0.5", positive ? "text-emerald-400" : "text-red-400")}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {positive ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17l5-5 5 5M7 7l5 5 5-5" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7l5 5 5-5M7 17l5-5 5 5" />
      )}
    </svg>
  );
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  onClick,
  className,
}: StatCardProps) {
  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper
      onClick={onClick}
      className={cn(
        "group relative rounded-xl p-6 text-left",
        "border border-[var(--color-border)]",
        "bg-[var(--color-surface)]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5",
        "hover:border-[var(--color-accent)]/30",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-muted-foreground)]">
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight text-[var(--color-accent)]">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-[var(--color-muted-foreground)]">
              {subtitle}
            </p>
          )}
          {trend && (
            <div
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                trend.positive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              )}
            >
              <TrendArrow positive={trend.positive} />
              {trend.positive ? "+" : ""}
              {trend.value}%
            </div>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
              "bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
              "transition-colors duration-300",
              "group-hover:bg-[var(--color-accent)]/20"
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
