"use client";

import { useEffect, useRef, useState } from "react";

export interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface StatsSectionProps {
  heading?: string;
  description?: string;
  stats: StatItem[];
  layout?: "row" | "grid";
  columns?: 2 | 3 | 4;
  animate?: boolean;
  animationDuration?: number;
  variant?: "default" | "card" | "dark";
  className?: string;
}

function useCountUp(target: number, duration: number, shouldAnimate: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) {
      setCount(target);
      return;
    }

    let startTime: number;
    let frameId: number;

    function tick(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, shouldAnimate]);

  return count;
}

function AnimatedStat({
  stat,
  animate,
  duration,
  isVisible,
}: {
  stat: StatItem;
  animate: boolean;
  duration: number;
  isVisible: boolean;
}) {
  const count = useCountUp(stat.value, duration, animate && isVisible);

  return (
    <div className="text-center px-6 lg:px-10">
      <div className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-accent)] mb-3 tracking-tight">
        {stat.prefix}
        {animate ? count : stat.value}
        {stat.suffix}
      </div>
      <div className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--color-text-muted,#666)] font-medium">
        {stat.label}
      </div>
    </div>
  );
}

export function StatsSection({
  heading,
  description,
  stats,
  layout = "row",
  columns = 4,
  animate = true,
  animationDuration = 2000,
  variant = "default",
  className = "",
}: StatsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!animate || !ref.current) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animate]);

  const isDark = variant === "dark";

  return (
    <section
      ref={ref}
      className={`relative py-20 lg:py-32 overflow-hidden ${
        isDark ? "text-white" : variant === "card" ? "bg-[var(--color-surface,#f9f9f9)]" : ""
      } ${className}`}
      style={
        isDark
          ? { background: "linear-gradient(180deg, #030712 0%, #0a1628 50%, #030712 100%)" }
          : undefined
      }
    >
      {/* Top gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/15 to-transparent" />

      {/* Radial glow for dark variant */}
      {isDark && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(var(--accent-rgb, 212 175 55), 0.03) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(heading || description) && (
          <div className="text-center mb-16">
            {heading && (
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {heading}
              </h2>
            )}
            {heading && (
              <div className="mx-auto mt-4 h-[2px] w-16 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/50 mb-4" />
            )}
            {description && (
              <p className={`text-base max-w-2xl mx-auto leading-relaxed ${isDark ? "text-white/50" : "text-[var(--color-text-muted,#666)]"}`}>
                {description}
              </p>
            )}
          </div>
        )}

        {layout === "row" ? (
          <div className="flex flex-wrap justify-center">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center">
                <AnimatedStat
                  stat={stat}
                  animate={animate}
                  duration={animationDuration}
                  isVisible={isVisible}
                />
                {i < stats.length - 1 && (
                  <div className="hidden md:block h-12 w-px bg-gradient-to-b from-transparent via-[var(--color-accent)]/20 to-transparent mx-2" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`grid gap-8 ${
              columns === 2
                ? "md:grid-cols-2"
                : columns === 3
                  ? "md:grid-cols-3"
                  : "md:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {stats.map((stat, i) => (
              <AnimatedStat
                key={i}
                stat={stat}
                animate={animate}
                duration={animationDuration}
                isVisible={isVisible}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom gradient separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/15 to-transparent" />
    </section>
  );
}

export default StatsSection;
