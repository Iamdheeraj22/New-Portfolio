"use client";

import { cn } from "@/utils";

interface SkeletonProps {
  className?: string;
  variant?: "rectangle" | "circle" | "rounded";
}

export function Skeleton({ className, variant = "rounded" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white/5",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        variant === "circle" && "rounded-full",
        variant === "rounded" && "rounded-xl",
        className
      )}
    />
  );
}
