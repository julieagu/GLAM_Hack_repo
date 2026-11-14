// Staff dashboard charts, drawn exactly like the Paper SVGs (viewBox 408 wide).
// They scale with the tile width; colours are token classes (fill-*/stroke-*), not hex.
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const axis = "text-[11px] font-light";

function Chart({ height, label, children }: { height: number; label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 408 ${height}`} className="block h-auto w-full overflow-visible" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

const grid = "M0 120H408M0 80H408M0 40H408";

/** Overview › Artwork: loans per month, last bar = this month. */
export function LoansPerMonthChart({ months, values }: { months: string[]; values: number[] }) {
  const max = 110;
  return (
    <Chart height={150} label={`Loans per month, ${values[0]} to ${values.at(-1)}`}>
      <path d={grid} className="fill-none stroke-ink/15" />
      {values.map((v, i) => {
        const h = (v / max) * 110;
        const last = i === values.length - 1;
        return <rect key={i} x={i * 34} y={120 - h} width={24} height={h} rx={3} className={last ? "fill-ink" : "fill-ink/35"} />;
      })}
      {months.map((m, i) => (
        <text
          key={i}
          x={i * 34 + 12}
          y={140}
          textAnchor="middle"
          className={cn(axis, i === months.length - 1 ? "fill-ink font-medium" : "fill-mint-900")}
        >
          {m}
        </text>
      ))}
    </Chart>
  );
}

/** Overview › Social: conversations per week (area + line). */
export function ConversationsChart({ points, labels }: { points: number[]; labels: string[] }) {
  const step = 407 / (points.length - 1);
  const line = points.map((y, i) => `${i ? "L" : "M"}${Math.round(i * step)} ${y}`).join("");
  return (
    <Chart height={150} label="Conversations per week, rising">
      <path d={grid} className="fill-none stroke-ink/15" />
      <path d={`${line}V120H0Z`} className="fill-ink/12" />
      <path d={line} className="fill-none stroke-ink" strokeWidth={1.5} strokeLinejoin="round" />
      <circle cx={403} cy={points.at(-1)} r={4} className="fill-ink" />
      <text x={2} y={140} className={cn(axis, "fill-orange-900")}>{labels[0]}</text>
      <text x={204} y={140} textAnchor="middle" className={cn(axis, "fill-orange-900")}>{labels[1]}</text>
      <text x={406} y={140} textAnchor="end" className={cn(axis, "fill-ink font-medium")}>{labels[2]}</text>
    </Chart>
  );
}

/** Horizontal meter: outlined track, ink fill, % on the right. */
export function MeterRow({ label, value }: { label: string; value: number }) {
  const pct = Math.round(value * 100);
  return (
    <div className="flex items-center gap-2.5 text-[13px] leading-4">
      <span className="w-16 shrink-0">{label}</span>
      <span className="flex h-2.5 flex-1 rounded-pill border border-ink" role="meter" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <span className="h-full rounded-pill bg-ink" style={{ width: `${pct}%` }} />
      </span>
      <span className="w-[34px] shrink-0 text-right font-medium">{pct}%</span>
    </div>
  );
}

/** Overview › Conservation: stacked status bar + legend. */
export function SensorStatusBar({ ok, watch, action }: { ok: number; watch: number; action: number }) {
  const total = ok + watch + action;
  const seg = [
    { n: ok, cls: "bg-blue-300", label: "Good" },
    { n: watch, cls: "bg-status-watch", label: "To watch" },
    { n: action, cls: "bg-status-action", label: "Action" },
  ];
  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-7 overflow-hidden rounded-pill border border-ink" role="img" aria-label={seg.map((s) => `${s.n} ${s.label}`).join(", ")}>
        {seg.map((s, i) => (
          <span key={s.label} className={cn(s.cls, i > 0 && "border-l border-ink")} style={{ width: `${(s.n / total) * 100}%` }} />
        ))}
      </div>
      <ul className="flex gap-3.5 text-micro">
        {seg.map((s) => (
          <li key={s.label} className="flex items-center gap-1.5">
            <span className={cn("size-2.5 rounded-pill border border-ink", s.cls)} aria-hidden="true" />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Overview › Conservation: average reading against its ideal band. */
export function RangeRow({ label, value, idealFrom, idealWidth, at }: { label: string; value: string; idealFrom: number; idealWidth: number; at: number }) {
  return (
    <div className="flex items-center gap-3 border-t border-scrim-line py-2 text-[13px] leading-4 last:border-b">
      <span className="w-[84px] shrink-0">{label}</span>
      <span className="relative flex h-2.5 flex-1 items-center" aria-hidden="true">
        <span className="h-1 w-full rounded-pill bg-scrim-line" />
        <span className="absolute h-1 rounded-pill bg-blue-200" style={{ left: `${idealFrom}%`, width: `${idealWidth}%` }} />
        <span className="absolute size-2.5 -translate-x-1/2 rounded-pill bg-ink" style={{ left: `${at}%` }} />
      </span>
      <span className="w-11 shrink-0 text-right font-medium">{value}</span>
    </div>
  );
}

const months12 = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

/** Artwork › Artwork: 2026 loan timeline with "Today" marker (November). */
export function LoanTimelineChart() {
  return (
    <Chart height={140} label="Loan timeline 2026: M. Rossi January to July, L. Meier since July">
      <path d="M34 14V112M68 14V112M102 14V112M136 14V112M170 14V112M204 14V112M238 14V112M272 14V112M306 14V112M340 14V112M374 14V112" className="fill-none stroke-ink/8" />
      <rect x={17} y={36} width={204} height={22} rx={11} className="fill-ink/30" />
      <text x={29} y={51} className={cn(axis, "fill-ink")}>M. Rossi · 15 Jan – 15 Jul</text>
      <rect x={221} y={72} width={133} height={22} rx={11} className="fill-ink" />
      <text x={233} y={87} className={cn(axis, "fill-mint")}>L. Meier · since 15 Jul</text>
      <path d="M354 14V112" className="fill-none stroke-ink" strokeWidth={1.2} strokeDasharray="3 3" />
      <text x={354} y={10} textAnchor="middle" className="fill-ink text-[10px] font-medium">Today</text>
      {months12.map((m, i) => (
        <text key={i} x={17 + i * 34} y={132} textAnchor="middle" className={cn(axis, i === 10 ? "fill-ink font-medium" : "fill-mint-900")}>
          {m}
        </text>
      ))}
    </Chart>
  );
}

/** Artwork › Social: conversations per loan vs. the Artothek average. */
export function ConversationsPerLoanChart() {
  return (
    <Chart height={140} label="Conversations per loan: 9 with M. Rossi, 14 so far with L. Meier; Artothek average 6">
      <path d="M0 112H408" className="fill-none stroke-ink" />
      <path d="M0 73H408" className="fill-none stroke-ink/50" strokeDasharray="4 4" />
      <rect x={44} y={53} width={136} height={59} rx={4} className="fill-ink/30" />
      <rect x={228} y={20} width={136} height={92} rx={4} className="fill-ink" />
      <text x={112} y={46} textAnchor="middle" className="fill-ink text-[12px] font-medium">9</text>
      <text x={296} y={14} textAnchor="middle" className="fill-ink text-[12px] font-medium">14 · ongoing</text>
      <text x={112} y={130} textAnchor="middle" className={cn(axis, "fill-orange-900")}>Jan–Jul · M. Rossi</text>
      <text x={296} y={130} textAnchor="middle" className={cn(axis, "fill-ink font-medium")}>Jul–now · L. Meier</text>
    </Chart>
  );
}

/** Artwork › Conservation: light over 7 days, ideal band and peaks above the limit. */
export function LightWeekChart() {
  const peaks: [number, number, number][] = [
    [145, 68, 3.5],
    [203, 58, 3.5],
    [261, 50, 3.5],
    [319, 44, 3.5],
    [377, 42, 4],
  ];
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  return (
    <Chart height={140} label="Light over the last 7 days: above the 200 lux limit on 5 days">
      <rect x={0} y={70} width={408} height={40} className="fill-blue-200/70" />
      <path d="M0 70H408" className="fill-none stroke-ink" strokeDasharray="4 4" />
      <path
        d="M0 110L14 104L29 80L44 104L58 110L72 104L87 76L102 104L116 110L130 104L145 68L160 104L174 110L188 104L203 58L218 104L232 110L246 104L261 50L276 104L290 110L304 104L319 44L334 104L348 110L362 104L377 42L392 104L408 110"
        className="fill-none stroke-ink"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {peaks.map(([cx, cy, r]) => (
        <circle key={cx} cx={cx} cy={cy} r={r} className="fill-status-action stroke-ink" />
      ))}
      <path d="M0 110H408" className="fill-none stroke-ink" />
      {days.map((d, i) => (
        <text key={d} x={29 + i * 58} y={130} textAnchor="middle" className={cn(axis, i === 6 ? "fill-ink font-medium" : "fill-blue-900")}>
          {d}
        </text>
      ))}
    </Chart>
  );
}
