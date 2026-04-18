"use client";

import { cn } from "../../lib/cn";

export interface PaginationProps {
  /** Current active page (1-indexed) */
  page: number;
  /** Total number of pages */
  pages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Maximum number of visible page buttons */
  maxVisible?: number;
  className?: string;
}

export function Pagination({
  page,
  pages,
  onPageChange,
  maxVisible = 5,
  className,
}: PaginationProps) {
  if (pages <= 1) return null;

  const renderPageNumbers = () => {
    const items: React.ReactNode[] = [];
    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    const endPage = Math.min(pages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      items.push(
        <PageButton key={1} page={1} active={page === 1} onClick={onPageChange} />
      );
      if (startPage > 2) {
        items.push(
          <span
            key="ellipsis-start"
            className="flex h-10 w-8 items-center justify-center text-[var(--color-muted-foreground)]"
          >
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PageButton key={i} page={i} active={page === i} onClick={onPageChange} />
      );
    }

    if (endPage < pages) {
      if (endPage < pages - 1) {
        items.push(
          <span
            key="ellipsis-end"
            className="flex h-10 w-8 items-center justify-center text-[var(--color-muted-foreground)]"
          >
            ...
          </span>
        );
      }
      items.push(
        <PageButton
          key={pages}
          page={pages}
          active={page === pages}
          onClick={onPageChange}
        />
      );
    }

    return items;
  };

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-1.5 py-4", className)}
    >
      <NavButton
        direction="prev"
        disabled={page <= 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
      />
      {renderPageNumbers()}
      <NavButton
        direction="next"
        disabled={page >= pages}
        onClick={() => onPageChange(Math.min(pages, page + 1))}
      />
    </nav>
  );
}

function PageButton({
  page,
  active,
  onClick,
}: {
  page: number;
  active: boolean;
  onClick: (page: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(page)}
      className={cn(
        "h-10 min-w-[2.5rem] rounded-lg px-3 text-sm font-semibold",
        "transition-all duration-200 ease-out",
        "active:scale-[0.96]",
        active
          ? [
              "bg-[var(--color-accent)] text-white",
              "shadow-md shadow-[var(--color-accent)]/25",
            ]
          : [
              "text-[var(--color-foreground)]",
              "hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]",
            ]
      )}
    >
      {page}
    </button>
  );
}

function NavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous page" : "Next page"}
      className={cn(
        "flex h-10 items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-4 text-sm font-medium",
        "transition-all duration-200 ease-out",
        "active:scale-[0.96]",
        disabled
          ? "cursor-not-allowed opacity-30"
          : "text-[var(--color-foreground)] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]"
      )}
    >
      {direction === "prev" ? (
        <>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Prev</span>
        </>
      ) : (
        <>
          <span className="hidden sm:inline">Next</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </>
      )}
    </button>
  );
}
