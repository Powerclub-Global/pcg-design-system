"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export interface NavbarNavItem {
  label: string;
  href: string;
}

export interface NavbarCTA {
  label: string;
  href: string;
  variant?: "primary" | "outline";
}

export interface NavbarPhone {
  number: string;
  hours?: string;
}

export interface NavbarProps {
  logo: React.ReactNode;
  logoHref?: string;
  navItems: NavbarNavItem[];
  cta?: NavbarCTA;
  mobileMenuVariant?: "dropdown" | "drawer" | "fullscreen";
  scrollBehavior?: "transparent-to-solid" | "always-solid";
  scrollThreshold?: number;
  theme?: "dark" | "light";
  phone?: NavbarPhone;
  cartSlot?: React.ReactNode;
  className?: string;
}

export function Navbar({
  logo,
  logoHref = "/",
  navItems,
  cta,
  mobileMenuVariant = "drawer",
  scrollBehavior = "always-solid",
  scrollThreshold = 20,
  theme = "light",
  phone,
  cartSlot,
  className = "",
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > scrollThreshold);
  }, [scrollThreshold]);

  useEffect(() => {
    if (scrollBehavior === "transparent-to-solid") {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [scrollBehavior, handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isDark = theme === "dark";
  const isTransparent = scrollBehavior === "transparent-to-solid" && !isScrolled;

  return (
    <>
      <style>{`
        .pcg-nav-link {
          position: relative;
        }
        .pcg-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 1px;
          background: var(--color-accent);
          transition: width 0.3s ease, left 0.3s ease;
        }
        .pcg-nav-link:hover::after {
          width: 100%;
          left: 0;
        }
        @keyframes pcg-drawer-slide {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes pcg-drawer-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pcg-drawer-link {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .pcg-drawer-panel {
          animation: pcg-drawer-slide 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pcg-drawer-backdrop {
          animation: pcg-drawer-fade 0.25s ease-out;
        }
        .pcg-drawer-link {
          opacity: 0;
          animation: pcg-drawer-link 0.4s ease-out forwards;
        }
      `}</style>

      <header
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-500 ease-out",
          isTransparent
            ? "bg-transparent"
            : [
                isDark
                  ? "bg-[var(--color-primary,#030712)]/90"
                  : "bg-[var(--color-surface,#ffffff)]/90",
                "backdrop-blur-xl",
                "border-b border-[var(--color-accent)]/10",
                "shadow-lg shadow-black/10",
              ].join(" "),
          className,
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href={logoHref}
              className="relative z-10 flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
            >
              {logo}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "pcg-nav-link",
                    "px-5 py-2 text-sm font-medium uppercase tracking-[0.12em]",
                    "transition-colors duration-300",
                    isDark || isTransparent
                      ? "text-white/60 hover:text-white"
                      : "text-[var(--color-text-muted,#666)] hover:text-[var(--color-foreground)]",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center gap-5">
              {phone && (
                <a
                  href={`tel:${phone.number.replace(/\D/g, "")}`}
                  className={[
                    "flex items-center gap-2 text-sm transition-colors duration-300",
                    isDark || isTransparent
                      ? "text-white/50 hover:text-[var(--color-accent)]"
                      : "text-[var(--color-text-muted,#666)] hover:text-[var(--color-accent)]",
                  ].join(" ")}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium">{phone.number}</span>
                  {phone.hours && (
                    <span className="text-xs opacity-60">({phone.hours})</span>
                  )}
                </a>
              )}

              {cta && (
                <Link
                  href={cta.href}
                  className={
                    cta.variant === "outline"
                      ? [
                          "border border-[var(--color-accent)] text-[var(--color-accent)]",
                          "hover:bg-[var(--color-accent)]/10",
                          "px-6 py-2.5 rounded-lg",
                          "text-xs font-semibold uppercase tracking-[0.15em]",
                          "transition-all duration-300",
                          "active:scale-[0.98]",
                        ].join(" ")
                      : [
                          "bg-[var(--color-accent)] text-white",
                          "hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:brightness-110",
                          "px-6 py-2.5 rounded-lg",
                          "text-xs font-semibold uppercase tracking-[0.15em]",
                          "transition-all duration-300",
                          "active:scale-[0.98]",
                        ].join(" ")
                  }
                >
                  {cta.label}
                </Link>
              )}

              {cartSlot}
            </div>

            {/* Mobile Right Section */}
            <div className="lg:hidden flex items-center gap-3">
              {cartSlot}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={[
                  "relative z-10 flex h-10 w-10 items-center justify-center rounded-lg",
                  "transition-colors duration-200",
                  "hover:bg-white/5",
                  isDark || isTransparent ? "text-white" : "text-[var(--color-foreground)]",
                ].join(" ")}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen && mobileMenuVariant === "dropdown" ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <>
                      <line x1="4" y1="7" x2="20" y2="7" strokeWidth={1.5} strokeLinecap="round" />
                      <line x1="4" y1="12" x2="20" y2="12" strokeWidth={1.5} strokeLinecap="round" />
                      <line x1="4" y1="17" x2="20" y2="17" strokeWidth={1.5} strokeLinecap="round" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && mobileMenuVariant === "dropdown" && (
          <div className="lg:hidden border-t border-[var(--color-accent)]/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
              <div className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={[
                      "pcg-drawer-link",
                      "px-4 py-3 rounded-lg",
                      "text-sm font-medium uppercase tracking-[0.1em]",
                      "transition-colors duration-200",
                      isDark || isTransparent
                        ? "text-white/60 hover:text-[var(--color-accent)] hover:bg-white/5"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5",
                    ].join(" ")}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {item.label}
                  </Link>
                ))}
                {cta && (
                  <Link
                    href={cta.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={[
                      "pcg-drawer-link mt-3",
                      "bg-[var(--color-accent)] text-white text-center",
                      "px-6 py-3 rounded-lg",
                      "text-xs font-semibold uppercase tracking-[0.15em]",
                      "transition-all duration-200",
                      "active:scale-[0.98]",
                    ].join(" ")}
                    style={{ animationDelay: `${navItems.length * 50}ms` }}
                  >
                    {cta.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer / Fullscreen Menu */}
      {mobileMenuOpen && mobileMenuVariant !== "dropdown" && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div
            className="pcg-drawer-backdrop fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            className={[
              mobileMenuVariant === "fullscreen"
                ? "fixed inset-0 bg-[var(--color-primary,#030712)] flex flex-col"
                : [
                    "pcg-drawer-panel",
                    "fixed right-0 top-0 h-full w-80 max-w-[90vw]",
                    "bg-[var(--color-primary,#030712)]",
                    "border-l border-[var(--color-accent)]/10",
                    "shadow-2xl shadow-black/40",
                    "flex flex-col",
                  ].join(" "),
            ].join(" ")}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-white/5">
              <div className="flex items-center gap-3">{logo}</div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-white/60 transition-colors hover:text-white hover:bg-white/5"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-6 py-10">
              <div className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={[
                      "pcg-drawer-link",
                      "block py-4",
                      "text-base font-medium uppercase tracking-[0.12em]",
                      "text-white/40 hover:text-[var(--color-accent)]",
                      "border-b border-white/5",
                      "transition-colors duration-300",
                    ].join(" ")}
                    style={{ animationDelay: `${(i + 1) * 80}ms` }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="border-t border-white/5 px-6 py-6 space-y-4">
              {phone && (
                <a
                  href={`tel:${phone.number.replace(/\D/g, "")}`}
                  className="pcg-drawer-link flex items-center gap-3 text-sm text-white/40 hover:text-[var(--color-accent)] transition-colors duration-300"
                  style={{ animationDelay: `${(navItems.length + 1) * 80}ms` }}
                >
                  <svg className="h-4 w-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-white/70">{phone.number}</div>
                    {phone.hours && <div className="text-xs text-white/30">{phone.hours}</div>}
                  </div>
                </a>
              )}
              {cta && (
                <Link
                  href={cta.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={[
                    "pcg-drawer-link",
                    "block w-full text-center",
                    "bg-[var(--color-accent)] text-white",
                    "px-6 py-3.5 rounded-lg",
                    "text-xs font-semibold uppercase tracking-[0.15em]",
                    "transition-all duration-300",
                    "hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:brightness-110",
                    "active:scale-[0.98]",
                  ].join(" ")}
                  style={{ animationDelay: `${(navItems.length + 2) * 80}ms` }}
                >
                  {cta.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
