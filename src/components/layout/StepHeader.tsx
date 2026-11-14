import { IconButton } from "@/components/ui";
import { cn } from "@/lib/cn";

interface StepHeaderProps {
  label: string;
  /** 0-based index of the current step; steps before it render as done. */
  current: number;
  total: number;
  onBack?: () => void;
  onClose?: () => void;
}

/** Step flows (sensor setup, survey): back · progress segments · close. No footer on these screens. */
export function StepHeader({ label, current, total, onBack, onClose }: StepHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-3">
      {onBack ? <IconButton icon="chevron-left" label="Back" onClick={onBack} /> : <span className="size-10" />}
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-micro text-area-ink">{label}</span>
        <div className="flex gap-1" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={current + 1}>
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className={cn("h-[3px] w-[22px] rounded-pill", i <= current ? "bg-ink" : "bg-track")} />
          ))}
        </div>
      </div>
      {onClose ? <IconButton icon="close" label="Close" onClick={onClose} /> : <span className="size-10" />}
    </div>
  );
}
