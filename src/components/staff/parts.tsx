import type { ReactNode } from "react";
import { Link } from "react-router";
import { StatusDot } from "@/components/ui";
import type { Area, SensorStatus } from "@/data/mock";
import type { SurveyState } from "@/data/staff";
import { cn } from "@/lib/cn";
import { useArtworkImages } from "@/lib/useArtworkImages";

/** Area tile background + its dark "note" ink (Paper: mint/orange/blue + *-900). */
const areaTone: Record<Area, { bg: string; ink: string }> = {
  artwork: { bg: "bg-area-artwork", ink: "text-mint-900" },
  social: { bg: "bg-area-social", ink: "text-orange-900" },
  conservation: { bg: "bg-area-conservation", ink: "text-blue-900" },
};

export const areaInk = (area: Area) => areaTone[area].ink;

/** The three-up row of area tiles (12px apart); below `desk` they stack as touching full-bleed bands. */
export function AreaTiles({ children }: { children: ReactNode }) {
  return <div className="flex flex-col desk:flex-row desk:gap-3">{children}</div>;
}

/**
 * One coloured area tile (Paper: Tile/Artwork · Tile/Social · Tile/Conservation).
 * Desktop: equal heights (min 600), the footer is pushed to the bottom.
 * Mobile: height fits content.
 */
export function AreaTile({
  area,
  note,
  title,
  footer,
  children,
}: {
  area: Area;
  note: ReactNode;
  title: string;
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={title}
      className={cn("-mx-6 flex flex-col gap-5.5 p-6 desk:mx-0 desk:min-h-[600px] desk:flex-1 desk:basis-0 desk:p-5", areaTone[area].bg)}
    >
      <div className="flex flex-col gap-1">
        <div className={cn("text-caption", areaTone[area].ink)}>{note}</div>
        <h2 className="text-headline tracking-[-0.01em]">{title}</h2>
      </div>
      {children}
      {/* Spacer: desktop only, keeps tile footers aligned. */}
      <div className="hidden flex-1 desk:block" />
      {footer}
    </section>
  );
}

export interface Kpi {
  value: string;
  suffix?: string;
  label: string;
  alert?: boolean;
}

/** Three KPIs under an ink rule. 40px numbers on mobile, 48 (text-display) on desktop. */
export function KpiRow({ items }: { items: Kpi[] }) {
  return (
    <dl className="flex border-t border-ink">
      {items.map((k, i) => (
        <div key={k.label} className={cn("flex flex-1 basis-0 flex-col gap-0.5 pt-3", i > 0 && "border-l border-scrim-line pl-3")}>
          <dt className="order-2 text-caption">{k.label}</dt>
          <dd
            className={cn(
              "order-1 text-[40px] leading-[44px] tracking-tight desk:text-display",
              k.alert && "text-orange-900",
            )}
          >
            {k.value}
            {k.suffix && <span className="text-lead tracking-tight">{k.suffix}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Small medium-weight label above a chart/list, with an optional note on the right. */
export function BlockHead({ title, note, area }: { title: string; note?: string; area?: Area }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
      <h3 className="text-caption font-medium">{title}</h3>
      {note && <span className={cn("text-micro", area ? areaInk(area) : "text-ink-muted")}>{note}</span>}
    </div>
  );
}

/** Tile footer: label + outlined "Open ↗" pill. */
export function TileFooter({ label, to }: { label: string; to?: string }) {
  const pill = "flex h-[34px] shrink-0 items-center rounded-pill border border-ink px-4 text-caption";
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-caption">{label}</span>
      {to ? (
        <Link to={to} className={cn(pill, "hover:bg-ink/5")}>
          Open ↗
        </Link>
      ) : (
        // TODO: staff detail screens for social impact and conservation.
        <span className={cn(pill, "opacity-[var(--opacity-disabled)]")} aria-disabled="true" title="Coming soon">
          Open ↗
        </span>
      )}
    </div>
  );
}

/** Survey state pill: answered = orange fill, sent = outline, not sent / due = dashed. */
export function SurveyPill({ state, children }: { state: SurveyState; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-pill border border-ink px-2.5 py-0.5 text-micro whitespace-nowrap",
        state === "answered" && "bg-orange",
        state === "pending" && "border-dashed",
      )}
    >
      {children}
    </span>
  );
}

/** Status dot + short label (sensor column). No dot when there is no status. */
export function SensorCell({ status, children, muted }: { status?: SensorStatus; children: ReactNode; muted?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[13px] leading-4", muted && "text-ink-muted")}>
      {status && <StatusDot status={status} />}
      {children}
    </span>
  );
}

/** Artwork thumbnail from the SKKG images, stone while loading / missing. */
export function ArtworkThumb({ title, className }: { title: string; className?: string }) {
  const [src] = useArtworkImages(title, 200);
  return src ? (
    <img src={src} alt="" className={cn("shrink-0 object-cover", className)} />
  ) : (
    <span className={cn("shrink-0 bg-stone", className)} aria-hidden="true" />
  );
}
