"use client";

import { useEffect, useRef, useState } from "react";

export interface StatItem {
  value: number | string;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface StatsSectionProps {
  heading?: string;
  description?: string;
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  animate?: boolean;
  animationDuration?: number;
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
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) frameId = requestAnimationFrame(tick);
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
  const numericValue = typeof stat.value === "number" ? stat.value : 0;
  const count = useCountUp(numericValue, duration, animate && isVisible && typeof stat.value === "number");
  const display =
    typeof stat.value === "number" ? (animate ? count : stat.value) : stat.value;

  return (
    <div className="text-center">
      <div
        className="font-semibold uppercase text-white"
        style={{
          fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
          lineHeight: 0.95,
          letterSpacing: "0.02em",
        }}
      >
        {stat.prefix}
        {display}
        {stat.suffix}
      </div>
      <div
        className="mt-2 text-sm uppercase tracking-wider"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export function StatsSection({
  heading,
  description,
  stats,
  columns = 4,
  animate = true,
  animationDuration = 2000,
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

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden py-16 ${className}`}
      style={{
        backgroundColor: "#141414",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.88)",
      }}
    >
      <div
        className="absolute left-0 right-0 top-0 h-[2px]"
        style={{ backgroundColor: "#ffffff" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6">
        {(heading || description) && (
          <div className="mb-12 text-center">
            {heading && (
              <h2
                className="mb-4 font-semibold uppercase tracking-wide text-white"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.95 }}
              >
                {heading}
              </h2>
            )}
            {description && (
              <p
                className="mx-auto max-w-2xl text-base"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {description}
              </p>
            )}
          </div>
        )}

        <div
          className={`grid gap-x-6 gap-y-10 ${
            columns === 2
              ? "grid-cols-2"
              : columns === 3
              ? "grid-cols-3"
              : "grid-cols-4"
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
      </div>
    </section>
  );
}

export default StatsSection;
