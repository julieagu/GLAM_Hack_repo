import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  /** Accessible name — required, the button has no visible text. */
  label: string;
  /** `outline` = 40px circle with 1px ink border (step header back / close). */
  variant?: "outline" | "ghost";
}

export function IconButton({ icon, label, variant = "outline", className, type = "button", ...rest }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-pill text-ink transition-colors",
        variant === "outline" && "border border-ink hover:bg-ink/5",
        variant === "ghost" && "hover:bg-ink/5",
        className,
      )}
      {...rest}
    >
      <Icon name={icon} size={variant === "ghost" ? 22 : 16} />
    </button>
  );
}
