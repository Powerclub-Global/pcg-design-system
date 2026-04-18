"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";

export interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (start: Date | null, end: Date | null) => void;
  /** Placeholder text when no dates are selected */
  placeholder?: string;
  className?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onDateChange,
  placeholder = "Select dates",
  className,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isDateInHoverRange = (date: Date) => {
    if (!hoverDate || !startDate || endDate) return false;
    return (
      (date >= startDate && date <= hoverDate) ||
      (date <= startDate && date >= hoverDate)
    );
  };

  const handleDateClick = (date: Date) => {
    if (selecting === "start" || (startDate && date < startDate)) {
      onDateChange(date, null);
      setSelecting("end");
    } else {
      onDateChange(startDate, date);
      setSelecting("start");
      setIsOpen(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={cn(
          "flex items-center justify-between gap-3 w-full md:w-72",
          "px-4 py-3 rounded-lg",
          "bg-white/5 backdrop-blur-md",
          "border border-white/10",
          "text-[var(--color-foreground)]",
          "transition-all duration-300",
          "hover:border-[var(--color-accent)]/40 hover:bg-white/10",
          "focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
          isOpen && "border-[var(--color-accent)]/50"
        )}
      >
        <svg
          className="h-4 w-4 shrink-0 text-[var(--color-accent)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
          <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} strokeLinecap="round" />
          <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} strokeLinecap="round" />
          <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} />
        </svg>
        <span className="text-sm truncate">
          {startDate || endDate
            ? `${formatDate(startDate)} - ${formatDate(endDate)}`
            : placeholder}
        </span>
        <svg
          className={cn(
            "h-4 w-4 shrink-0 text-[var(--color-muted-foreground)] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 p-5 rounded-xl",
            "bg-[var(--color-surface)] backdrop-blur-xl",
            "border border-[var(--color-border)]",
            "shadow-2xl shadow-black/20"
          )}
        >
          {/* Month nav */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={handlePrevMonth}
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]"
            >
              <ChevronLeftIcon />
            </button>
            <div className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-foreground)]">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <button
              onClick={handleNextMonth}
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]"
            >
              <ChevronRightIcon />
            </button>
          </div>

          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)] py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="h-9" />;
              }

              const isSelected =
                (startDate &&
                  date.getTime() === startDate.getTime()) ||
                (endDate && date.getTime() === endDate.getTime());
              const isInRange =
                isDateInRange(date) || isDateInHoverRange(date);

              return (
                <button
                  key={date.getTime()}
                  type="button"
                  onClick={() => handleDateClick(date)}
                  onMouseEnter={() => setHoverDate(date)}
                  onMouseLeave={() => setHoverDate(null)}
                  className={cn(
                    "h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium",
                    "transition-all duration-200",
                    isSelected && [
                      "bg-[var(--color-accent)] text-white",
                      "shadow-md shadow-[var(--color-accent)]/30",
                    ],
                    isInRange &&
                      !isSelected &&
                      "bg-[var(--color-accent)]/15 text-[var(--color-accent)]",
                    !isSelected &&
                      !isInRange &&
                      "text-[var(--color-foreground)] hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]"
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer actions */}
          <div className="mt-5 flex justify-end gap-2 border-t border-[var(--color-border)] pt-4">
            <button
              type="button"
              onClick={() => {
                onDateChange(null, null);
                setSelecting("start");
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-white/5 transition-colors duration-200"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold",
                "bg-[var(--color-accent)] text-white",
                "hover:brightness-110 active:scale-[0.98]",
                "transition-all duration-200"
              )}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      className="w-4 h-4 text-[var(--color-foreground)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      className="w-4 h-4 text-[var(--color-foreground)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
