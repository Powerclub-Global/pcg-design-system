"use client";

import { useState } from "react";

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FAQSectionProps {
  heading?: string;
  description?: string;
  items: FAQItem[];
  showCategories?: boolean;
  allowMultiple?: boolean;
  className?: string;
}

export function FAQSection({
  heading,
  description,
  items,
  showCategories = false,
  allowMultiple = false,
  className = "",
}: FAQSectionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  if (!items || items.length === 0) return null;

  const categories = showCategories
    ? Array.from(new Set(items.map((item) => item.category).filter(Boolean))) as string[]
    : [];

  const filteredItems = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items;

  function toggleItem(index: number) {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section className={`relative py-20 lg:py-32 ${className}`}>
      {/* Top gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/15 to-transparent" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text,#1a1a1a)] mb-4 text-center">
            {heading}
          </h2>
        )}
        {heading && (
          <div className="mx-auto mt-4 h-[2px] w-16 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/50 mb-4" />
        )}
        {description && (
          <p className="text-base text-[var(--color-text-muted,#666)] mb-14 text-center max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}

        {/* Category Filters */}
        {showCategories && categories.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-500 ${
                activeCategory === null
                  ? "bg-[var(--color-accent)] text-white shadow-[0_0_20px_rgba(var(--accent-rgb,212_175_55),0.2)]"
                  : "border border-[var(--color-border,#e5e5e5)] text-[var(--color-text-muted,#666)] hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)]"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-500 ${
                  activeCategory === cat
                    ? "bg-[var(--color-accent)] text-white shadow-[0_0_20px_rgba(var(--accent-rgb,212_175_55),0.2)]"
                    : "border border-[var(--color-border,#e5e5e5)] text-[var(--color-text-muted,#666)] hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Accordion */}
        <div className="space-y-3">
          {filteredItems.map((item, index) => {
            const isOpen = openIndices.has(index);
            return (
              <div
                key={item.id || index}
                className={`group overflow-hidden rounded-xl border transition-all duration-500 ${
                  isOpen
                    ? "border-[var(--color-accent)]/20 bg-[var(--color-accent)]/[0.02] shadow-[0_0_30px_rgba(var(--accent-rgb,212_175_55),0.04)]"
                    : "border-[var(--color-border,#e5e5e5)]/60 hover:border-[var(--color-accent)]/15 bg-[var(--color-surface,#ffffff)]/50"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition-all duration-500"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base font-medium pr-4 transition-colors duration-500 ${
                      isOpen
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-text,#1a1a1a)] group-hover:text-[var(--color-accent)]"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                      isOpen
                        ? "border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 rotate-45"
                        : "border-[var(--color-border,#e5e5e5)] group-hover:border-[var(--color-accent)]/20"
                    }`}
                  >
                    <svg
                      className="w-4 h-4 text-[var(--color-accent)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>

                <div
                  className="grid transition-all duration-500 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-sm text-[var(--color-text-muted,#666)] leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
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

export default FAQSection;
