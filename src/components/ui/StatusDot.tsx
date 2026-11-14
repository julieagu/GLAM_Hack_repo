import { cn } from "@/lib/cn";
import type { SensorStatus } from "@/data/mock";

const tone: Record<SensorStatus, string> = {
  ok: "bg-status-ok",
  watch: "bg-status-watch",
  action: "bg-status-action",
};

const label: Record<SensorStatus, string> = { ok: "OK", watch: "Watch", action: "Needs action" };

/** 8px status dot. Status colour never comes from the area colour. */
export function StatusDot({ status, className }: { status: SensorStatus; className?: string }) {
  return <span role="img" aria-label={label[status]} className={cn("inline-block size-2 shrink-0 rounded-pill", tone[status], className)} />;
}
