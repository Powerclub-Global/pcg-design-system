"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg",
    "font-semibold uppercase tracking-[0.15em]",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
    "active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-40",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-accent)] text-white",
          "shadow-md",
          "hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:brightness-110",
          "active:brightness-95",
        ].join(" "),
        outline: [
          "border border-[var(--color-accent)] bg-transparent text-[var(--color-accent)]",
          "hover:bg-[var(--color-accent)]/10",
          "active:bg-[var(--color-accent)]/20",
        ].join(" "),
        ghost: [
          "bg-transparent text-[var(--color-foreground)]",
          "hover:bg-white/5",
          "active:bg-white/10",
        ].join(" "),
        link: [
          "bg-transparent text-[var(--color-accent)]",
          "underline-offset-4 hover:underline",
          "p-0 h-auto normal-case tracking-normal font-medium",
        ].join(" "),
        destructive: [
          "bg-red-600 text-white",
          "hover:bg-red-700 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]",
          "active:bg-red-800",
          "shadow-md",
        ].join(" "),
      },
      size: {
        xs: "h-8 px-3 text-[10px] rounded-md",
        sm: "h-10 px-5 text-xs",
        default: "h-12 px-7 text-sm",
        lg: "h-14 px-9 text-sm",
        icon: "h-11 w-11 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
