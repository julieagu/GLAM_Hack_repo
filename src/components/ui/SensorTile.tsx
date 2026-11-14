import { cn } from "@/lib/cn";
import type { SensorReading } from "@/data/mock";
import { Icon, type IconName } from "./Icon";
import { StatusDot } from "./StatusDot";

const icons: Record<SensorReading["key"], IconName> = {
  temperature: "thermometer",
  humidity: "drop",
  light: "sun",
};

/** Live sensor value with its ideal range (Conservation). */
export function SensorTile({ reading }: { reading: SensorReading }) {
  const alert = reading.status !== "ok";
  return (
    // Below 360px (small Android, SE 1st gen) the tile is ~85px wide: tighter padding + smaller value.
    <div className={cn("flex min-w-0 flex-col gap-2.5 rounded-md bg-white p-2.5 min-[360px]:p-3", alert && "ring-2 ring-status-action ring-inset")}>
      <div className="flex items-center justify-between">
        <Icon name={icons[reading.key]} size={20} className="text-blue-700" />
        <StatusDot status={reading.status} />
      </div>
      <div>
        <div className={cn("text-[20px] leading-7 font-light whitespace-nowrap min-[360px]:text-[24px]", alert && "text-status-action")}>
          {reading.value}
        </div>
        <div className="text-micro text-ink-muted">{reading.label}</div>
      </div>
      <div className="relative h-2.5" aria-hidden="true">
        <div className="absolute inset-x-0 top-[3px] h-1 rounded-pill bg-line" />
        <div
          className="absolute top-[3px] h-1 rounded-pill bg-blue-300"
          style={{ left: `${reading.idealFrom * 100}%`, width: `${(reading.idealTo - reading.idealFrom) * 100}%` }}
        />
        <div
          className={cn("absolute top-0 size-2.5 -translate-x-1/2 rounded-pill border-2 border-white", alert ? "bg-status-action" : "bg-ink")}
          style={{ left: `${reading.position * 100}%` }}
        />
      </div>
      <div className="text-micro">{reading.ideal}</div>
    </div>
  );
}
