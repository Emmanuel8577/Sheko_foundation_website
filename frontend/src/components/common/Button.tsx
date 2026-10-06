"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { clsx } from "clsx";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  fullWidth = false,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 focus:outline-none shadow-md hover:shadow-lg active:scale-95";

  // Increased padding & minimum widths for broader buttons
  const sizeStyles = {
    sm: "px-7 py-2.5 text-xs min-w-[120px]",
    md: "px-10 py-3 text-sm min-w-[160px]",
    lg: "px-12 py-4 text-base min-w-[200px]",
  };

  const variantStyles = {
    // Solid Purple Button
    primary:
      "bg-brand-primary hover:bg-brand-primaryHover text-white shadow-brand-primary/25 hover:scale-105",

    // Secondary Charcoal Button
    secondary:
      "bg-brand-darkText hover:bg-black text-white shadow-brand-darkText/20 hover:scale-105",

    // Outline Glassmorphic Variant
    outline:
      "border-2 border-white/80 text-white hover:bg-white hover:text-brand-darkText backdrop-blur-sm hover:scale-105",
  };

  const combinedClasses = clsx(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    fullWidth ? "w-full" : "",
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
}