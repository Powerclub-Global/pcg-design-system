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
    if (selecting === "start" || !startDate || (endDate && startDate)) {
      onDateChange(date, null);
      setSelecting("end");
      return;
    }
    if (date < startDate) {
      onDateChange(date, startDate);
    } else {
      onDateChange(startDate, date);
    }
    setSelecting("start");
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
        className="flex w-full items-center justify-between gap-3 rounded-sm px-4 py-3 transition-all md:w-72"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: `1px solid ${isOpen ? "#ffffff" : "rgba(255,255,255,0.1)"}`,
          color: "#ffffff",
        }}
      >
        <svg
          className="h-4 w-4 shrink-0"
          style={{ color: "#ffffff" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
          <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} strokeLinecap="round" />
          <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} strokeLinecap="round" />
          <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} />
        </svg>
        <span className="flex-1 truncate text-left text-sm">
          {startDate || endDate
            ? `${formatDate(startDate)} - ${formatDate(endDate)}`
            : placeholder}
        </span>
        <svg
          className={cn("h-4 w-4 shrink-0 transition-transform", isOpen && "rotate-180")}
          style={{ color: "rgba(255,255,255,0.4)" }}
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
          className="absolute z-50 mt-2 rounded-xl p-5 backdrop-blur-xl"
          style={{
            background: "#141414",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            color: "rgba(255,255,255,0.88)",
          }}
        >
          {/* Month nav */}
          <div className="mb-5 flex items-center justify-between">
            <button
              onClick={handlePrevMonth}
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-sm transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.88)" }}
            >
              <ChevronLeftIcon />
            </button>
            <div
              className="text-sm font-semibold uppercase tracking-wider text-white"
            >
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <button
              onClick={handleNextMonth}
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-sm transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.88)" }}
            >
              <ChevronRightIcon />
            </button>
          </div>

          {/* Week day headers */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {weekDays.map((day) => (
              <div
                key={day}
                className="py-1 text-center text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.4)" }}
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

              const style: React.CSSProperties = isSelected
                ? { background: "#ffffff", color: "#000000" }
                : isInRange
                ? { background: "rgba(255,255,255,0.15)", color: "#ffffff" }
                : { color: "rgba(255,255,255,0.88)" };

              return (
                <button
                  key={date.getTime()}
                  type="button"
                  onClick={() => handleDateClick(date)}
                  onMouseEnter={() => setHoverDate(date)}
                  onMouseLeave={() => setHoverDate(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all"
                  style={style}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer actions */}
          <div
            className="mt-5 flex justify-end gap-2 pt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <button
              type="button"
              onClick={() => {
                onDateChange(null, null);
                setSelecting("start");
              }}
              className="rounded-sm px-4 py-2 text-sm font-medium transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setSelecting("start");
                setHoverDate(null);
              }}
              disabled={!startDate}
              className="rounded-sm px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: "#ffffff", color: "#000000" }}
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
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
