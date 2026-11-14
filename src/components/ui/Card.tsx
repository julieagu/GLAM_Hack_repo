import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** white = default mobile card on an area background; ink = emphasis (advice, insurance). */
  tone?: "white" | "ink";
}

/** Mobile card: radius 12, padding 20. */
export function Card({ tone = "white", className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-md p-5",
        tone === "white" && "bg-white text-ink",
        tone === "ink" && "bg-ink text-white",
        className,
      )}
      {...rest}
    />
  );
}
