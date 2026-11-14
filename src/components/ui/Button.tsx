import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "area" | "highlight" | "alert";
type Size = "lg" | "md" | "sm" | "xs";

const variants: Record<Variant, string> = {
  // Ink fill, label in the current area colour (white outside an area).
  primary: "bg-ink text-area hover:bg-ink-soft",
  // 1px ink outline on whatever surface it sits on.
  secondary: "border border-ink text-ink hover:bg-ink/5",
  // Area-colour fill with ink label — used on white cards («Start one»).
  area: "bg-area text-ink hover:brightness-95",
  // Desktop: highlight (pink) action (e.g. «Confirm» in the loans table).
  highlight: "bg-highlight text-ink hover:bg-pink-soft",
  // Alert red with white label — the action to take when something is wrong («Measure another spot»).
  alert: "bg-alert text-white hover:brightness-110",
};

const sizes: Record<Size, string> = {
  lg: "h-14 px-6 text-lead", // 56 — bottom actions in step flows
  md: "h-12 px-5 text-body", // 48 — in-page primary («Send question»)
  sm: "h-11 px-5 text-body", // 44 — buttons inside cards / under charts
  xs: "h-8 px-3.5 text-caption", // 32 — small actions («Lightbox»)
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  block,
  iconStart,
  iconEnd,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-pill font-light transition-colors",
        "disabled:pointer-events-none disabled:opacity-(--opacity-disabled)",
        variants[variant],
        sizes[size],
        block && "w-full",
        className,
      )}
      {...rest}
    >
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
}
