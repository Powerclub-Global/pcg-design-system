import { cn } from "../../lib/cn";

export interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  title,
  subtitle,
  center = false,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div
        className={cn(
          "mx-auto max-w-6xl px-6 md:px-8",
          center && "text-center"
        )}
      >
        {(title || subtitle) && (
          <div className="mb-12 md:mb-16 space-y-4">
            {title && (
              <h2
                className={cn(
                  "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
                  "text-[var(--color-accent)]",
                  "font-[var(--font-display,inherit)]"
                )}
              >
                {title}
                <span
                  className="block mt-3 h-[2px] w-16 bg-[var(--color-accent)]"
                  style={center ? { margin: "0.75rem auto 0" } : undefined}
                  aria-hidden="true"
                />
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "max-w-3xl text-base md:text-lg leading-relaxed",
                  "text-[var(--color-muted-foreground)]",
                  center && "mx-auto"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div>{children}</div>
      </div>
    </section>
  );
}
