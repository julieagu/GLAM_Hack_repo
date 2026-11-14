export interface RadarAxis {
  label: string;
  /** 0–1 */
  value: number;
}

interface RadarChartProps {
  axes: RadarAxis[];
  /** Accessible summary, e.g. «Joy 78%, Sadness 48% …». Generated if omitted. */
  title?: string;
}

const CX = 150;
const CY = 120;
const R = 90;

function point(i: number, n: number, r: number) {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
}

/**
 * Feelings radar (Social impact): 3 grid rings, ink 1.5 outline, white 75% fill.
 * The axis with the highest value gets a dot and a medium-weight ink label.
 */
export function RadarChart({ axes, title }: RadarChartProps) {
  const n = axes.length;
  const ring = (f: number) => axes.map((_, i) => point(i, n, R * f).join(",")).join(" ");
  const shape = axes.map((a, i) => point(i, n, R * a.value).join(",")).join(" ");
  const top = axes.reduce((best, a, i) => (a.value > axes[best].value ? i : best), 0);
  const [tx, ty] = point(top, n, R * axes[top].value);
  const summary = title ?? axes.map((a) => `${a.label} ${Math.round(a.value * 100)}%`).join(", ");

  return (
    <svg viewBox="-40 0 380 230" className="h-auto w-full" role="img" aria-label={summary}>
      {[1, 2 / 3, 1 / 3].map((f) => (
        <polygon key={f} points={ring(f)} fill="none" stroke="var(--color-track)" />
      ))}
      {axes.map((_, i) => {
        const [x, y] = point(i, n, R);
        return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="var(--color-track)" />;
      })}
      <polygon points={shape} fill="#FFFFFFBF" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx={tx} cy={ty} r="3.5" fill="var(--color-ink)" />
      {axes.map((a, i) => {
        const [x, y] = point(i, n, R + 22);
        const anchor = Math.abs(x - CX) < 1 ? "middle" : x > CX ? "start" : "end";
        const isTop = i === top;
        return (
          <text
            key={a.label}
            x={x}
            y={y + 4}
            textAnchor={anchor}
            fontSize="13"
            fontWeight={isTop ? 500 : 300}
            fill={isTop ? "var(--color-ink)" : "var(--area-ink, var(--color-ink-muted))"}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {a.label} {Math.round(a.value * 100)}%
          </text>
        );
      })}
    </svg>
  );
}
