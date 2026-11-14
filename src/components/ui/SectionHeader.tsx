import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  title: ReactNode;
  /** Right-aligned meta, e.g. «2 loans». */
  meta?: ReactNode;
  /** Line under the title, e.g. «People also asked …». */
  subtitle?: ReactNode;
  /** Completion meter shown above the rule (0–1) with its label. */
  meter?: { value: number; label: ReactNode };
  className?: string;
}

/** Opens every content section: 1px ink rule + Title 26/300. */
export function SectionHeader({ title, meta, subtitle, meter, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {meter && (
        <div className="flex items-center justify-end gap-2">
          <span className="h-[3px] w-16 bg-area-soft" aria-hidden="true">
            <span className="block h-full bg-ink" style={{ width: `${meter.value * 100}%` }} />
          </span>
          <span className="text-micro text-area-ink">{meter.label}</span>
        </div>
      )}
      <div className="flex flex-col gap-1 border-t border-ink pt-2 pb-3">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-title font-light">{title}</h2>
          {meta && <span className="shrink-0 text-micro text-area-ink">{meta}</span>}
        </div>
        {subtitle && <p className="text-caption leading-5 text-area-ink">{subtitle}</p>}
      </div>
    </div>
  );
}
