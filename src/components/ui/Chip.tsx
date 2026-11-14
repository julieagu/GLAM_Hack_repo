import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children: ReactNode;
}

/** Selectable choice chip (survey answers, keywords). Height 40, pill, 1px ink. */
export function Chip({ selected, className, children, type = "button", ...rest }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "inline-flex h-10 items-center gap-1.5 rounded-pill border border-ink px-4 text-body transition-colors",
        selected ? "bg-ink text-area" : "text-ink hover:bg-ink/5",
        className,
      )}
      {...rest}
    >
      {selected && <Icon name="check" size={12} />}
      {children}
    </button>
  );
}

/** Static, non-interactive label (keywords on artwork data, «62 days left»). */
export function Tag({ className, children, tone = "white" }: { className?: string; children: ReactNode; tone?: "white" | "area" | "ink" }) {
  return (
    <span
      className={cn(
        "inline-flex h-5.5 items-center rounded-pill px-2.5 text-micro",
        tone === "white" && "bg-white text-ink",
        tone === "area" && "bg-area text-ink",
        tone === "ink" && "bg-ink text-area",
        className,
      )}
    >
      {children}
    </span>
  );
}
