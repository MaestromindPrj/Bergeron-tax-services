"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "navy" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<any>;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "gold",
  size = "md",
  href,
  isExternal,
  children,
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs font-semibold tracking-wide",
    md: "px-5 py-2.5 text-sm font-semibold tracking-wide",
    lg: "px-6 py-3.5 text-base font-semibold tracking-wide",
  };

  const variantStyles = {
    gold: "bg-gold hover:bg-gold-hover text-navy shadow-sm hover:shadow-md focus:ring-gold active:scale-[0.99]",
    navy: "bg-navy hover:bg-navy-light text-white border border-white/10 hover:border-white/20 focus:ring-navy active:scale-[0.99]",
    dark: "bg-darkSlate hover:bg-darkSlate-card text-white border border-darkSlate-border hover:border-gold/40 focus:ring-darkSlate active:scale-[0.99]",
    outline:
      "bg-transparent text-white border border-white/20 hover:border-white/50 hover:bg-white/5 focus:ring-white active:scale-[0.99]",
    ghost:
      "bg-transparent text-navy hover:bg-navy/5 focus:ring-navy active:scale-[0.99]",
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    if (isExternal || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          target={isExternal || href.startsWith("http") ? "_blank" : undefined}
          rel={
            isExternal || href.startsWith("http")
              ? "noopener noreferrer"
              : undefined
          }
          className={combinedClasses}
          {...(props as any)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses} {...(props as any)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
