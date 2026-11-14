export interface RadarAxis {
  label: string;
  /** 0–1 */
  value: number;
}

interface RadarChartProps {
  /** How everyone else feels (average). Drawn as the filled shape; labels show these %. */
  axes: RadarAxis[];
  /** Your answer, 0–1 per axis label. Drawn as a dashed line + legend. */
  mine?: Record<string, number>;
  /** Accessible summary. Generated if omitted. */
  title?: string;
  /** Blur the graph (card stays sharp) until the user has answered. */
  blurred?: boolean;
}

// Geometry from Paper (High_fidelity › Mobile/Social/Cultural impact › New_spidegrpah).
const CX = 129.08;
const CY = 119.455;
const R = 80.18;

function point(i: number, n: number, r: number): [number, number] {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

/** Closed Catmull-Rom curve through the points, as cubic Béziers (the soft "blob" shapes in the design). */
function smoothPath(pts: [number, number][], tension = 0.5): string {
  const n = pts.length;
  const p = (i: number) => pts[(i + n) % n];
  let d = `M${p(0)[0].toFixed(2)} ${p(0)[1].toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const [x0, y0] = p(i - 1);
    const [x1, y1] = p(i);
    const [x2, y2] = p(i + 1);
    const [x3, y3] = p(i + 2);
    const k = tension / 3;
    const c1 = [x1 + (x2 - x0) * k, y1 + (y2 - y0) * k];
    const c2 = [x2 - (x3 - x1) * k, y2 - (y3 - y1) * k];
    d += `C${c1[0].toFixed(2)} ${c1[1].toFixed(2)} ${c2[0].toFixed(2)} ${c2[1].toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  }
  return `${d}Z`;
}

/** Keeps a 0-value point slightly off the centre so the curve doesn't pinch to a spike. */
const radius = (v: number) => R * Math.max(v, 0.06);

/**
 * Feelings spider graph (Social impact): white card, 3 grid rings + spokes (track colour).
 * Colours from Paper New_spidegrpah:
 * - Everyone else (the average): smooth orange-300 filled shape; labels with their % (top one ink, rest area ink).
 * - You (optional): smooth dashed orange-ink (orange-700) line, dot on your strongest emotion, legend underneath.
 */
export function RadarChart({ axes, mine, title, blurred }: RadarChartProps) {
  const n = axes.length;
  const ring = (f: number) => axes.map((_, i) => point(i, n, R * f).join(",")).join(" ");
  const top = axes.reduce((best, a, i) => (a.value > axes[best].value ? i : best), 0);
  const others = smoothPath(axes.map((a, i) => point(i, n, radius(a.value))));

  const myValues = mine ? axes.map((a) => mine[a.label] ?? 0) : null;
  const myTop = myValues ? myValues.reduce((best, v, i) => (v > myValues[best] ? i : best), 0) : -1;
  const myShape = myValues ? smoothPath(myValues.map((v, i) => point(i, n, radius(v)))) : null;
  const [mx, my] = myValues ? point(myTop, n, R * myValues[myTop]) : [0, 0];

  const summary =
    title ??
    [
      `Everyone else: ${axes.map((a) => `${a.label} ${Math.round(a.value * 100)}%`).join(", ")}`,
      myValues && `You: ${axes.map((a, i) => `${a.label} ${Math.round(myValues[i] * 100)}%`).join(", ")}`,
    ]
      .filter(Boolean)
      .join(". ");

  return (
    <figure className="flex flex-col gap-2 rounded-md bg-surface p-5">
      <svg
        viewBox="-40 12.661 338.165 204.679"
        className={blurred ? "h-auto w-full blur-[3px] select-none" : "h-auto w-full"}
        role="img"
        aria-label={blurred ? "Hidden until you add how you feel" : summary}
      >
        {[1, 2 / 3, 1 / 3].map((f) => (
          <polygon key={f} points={ring(f)} className="fill-none stroke-track" />
        ))}
        {axes.map((_, i) => {
          const [x, y] = point(i, n, R);
          return <line key={i} x1={CX} y1={CY} x2={x} y2={y} className="stroke-track" />;
        })}

        <path d={others} className="fill-orange-300" />
        {myShape && (
          <path d={myShape} className="fill-none stroke-orange-ink" strokeWidth={1.5} strokeDasharray="4 3" strokeLinejoin="round" strokeLinecap="round" />
        )}
        {myValues && myValues[myTop] > 0 && <circle cx={mx} cy={my} r={3.5} className="fill-orange-ink" />}

        {axes.map((a, i) => {
          const [x, y] = point(i, n, R + 9);
          const side = Math.abs(x - CX) < 1 ? "middle" : x > CX ? "start" : "end";
          const below = y > CY + 20;
          const isTop = i === top;
          return (
            <text
              key={a.label}
              x={x}
              y={below ? y + 10 : side === "middle" ? y - 1 : y + 1}
              textAnchor={below ? "middle" : side}
              className={isTop ? "fill-ink text-[11.5px] font-medium" : "fill-area-ink text-[11.5px] font-light"}
            >
              {a.label} {Math.round(a.value * 100)}%
            </text>
          );
        })}
      </svg>

      {myValues && (
        <figcaption className="flex flex-col gap-1.5 text-area-ink">
          <span className="text-caption">See how your feelings compare to everyone else's</span>
          <ul className="flex flex-col gap-1 text-micro">
            <li className="flex items-center gap-2">
              How everyone else feels <span className="h-1.5 w-6 bg-orange-300" aria-hidden="true" />
            </li>
            <li className="flex items-center gap-2">
              How you feel{" "}
              <svg width="24" height="4" aria-hidden="true">
                <path d="M1 2H23" className="stroke-orange-ink" strokeWidth={1.5} strokeDasharray="4 3" strokeLinecap="round" />
              </svg>
            </li>
            <li className="flex items-center gap-2">
              Your strongest feeling <span className="size-2.5 rounded-pill bg-orange-ink" aria-hidden="true" />
            </li>
          </ul>
        </figcaption>
      )}
    </figure>
  );
}
