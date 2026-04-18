"use client";

import { useState } from "react";

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export interface TestimonialsProps {
  heading?: string;
  description?: string;
  testimonials: Testimonial[];
  layout?: "grid" | "carousel";
  columns?: 2 | 3;
  className?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-[var(--color-accent)]" : "text-[var(--color-border,#e5e5e5)]/40"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="group relative flex flex-col p-8 lg:p-10 rounded-2xl border border-[var(--color-border,#e5e5e5)]/60 bg-[var(--color-surface,#ffffff)]/50 hover:border-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/[0.02] transition-all duration-500 hover:shadow-[0_0_40px_rgba(var(--accent-rgb,212_175_55),0.04)]">
      {/* Quote icon */}
      <div className="mb-5">
        <svg className="w-8 h-8 text-[var(--color-accent)]/30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
        </svg>
      </div>

      {testimonial.rating && <StarRating rating={testimonial.rating} />}

      <blockquote className="text-[var(--color-text,#1a1a1a)] text-sm leading-relaxed mb-8 flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author separator */}
      <div className="h-px bg-gradient-to-r from-[var(--color-accent)]/15 via-[var(--color-border,#e5e5e5)]/30 to-transparent mb-6" />

      <div className="flex items-center gap-4">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-[var(--color-accent)]/10"
            loading="lazy"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-[var(--color-accent)]/[0.08] border border-[var(--color-accent)]/20 text-[var(--color-accent)] flex items-center justify-center font-bold text-sm">
            {testimonial.author.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <div className="font-semibold text-sm text-[var(--color-text,#1a1a1a)] tracking-tight">
            {testimonial.author}
          </div>
          {(testimonial.role || testimonial.company) && (
            <div className="text-xs text-[var(--color-accent)] opacity-80 mt-0.5">
              {[testimonial.role, testimonial.company].filter(Boolean).join(" — ")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Testimonials({
  heading,
  description,
  testimonials,
  layout = "grid",
  columns = 3,
  className = "",
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const colsClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

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

        {layout === "grid" ? (
          <div className={`grid gap-6 lg:gap-8 ${colsClass}`}>
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        ) : (
          /* Carousel */
          <div className="relative">
            <div className="overflow-hidden">
              <div className="max-w-2xl mx-auto">
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </div>
            </div>

            {/* Navigation */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-6 mt-10">
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="group/btn p-3 rounded-full border border-[var(--color-border,#e5e5e5)]/60 hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/[0.04] transition-all duration-500"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-4 h-4 text-[var(--color-text-muted,#666)] group-hover/btn:text-[var(--color-accent)] transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === currentIndex
                          ? "bg-[var(--color-accent)] w-8"
                          : "bg-[var(--color-border,#e5e5e5)]/40 w-1.5 hover:bg-[var(--color-accent)]/30"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className="group/btn p-3 rounded-full border border-[var(--color-border,#e5e5e5)]/60 hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/[0.04] transition-all duration-500"
                  aria-label="Next testimonial"
                >
                  <svg className="w-4 h-4 text-[var(--color-text-muted,#666)] group-hover/btn:text-[var(--color-accent)] transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom gradient separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/15 to-transparent" />
    </section>
  );
}

export default Testimonials;
