import type { ReactNode } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/** Wrap rows in a List so dividers sit between them and under the last one. */
export function List({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col border-b border-line [&>*]:border-t [&>*]:border-line", className)}>{children}</div>;
}

/** Key–value row: fixed 120px label column. */
export function KeyValueRow({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="flex gap-3 py-2.5 text-caption">
      <span className="w-30 shrink-0 text-area-ink">{label}</span>
      <span className="min-w-0 flex-1 text-ink">{children}</span>
    </div>
  );
}

/** Numbered step: 24px number slot. */
export function StepRow({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="flex gap-3 py-3">
      <span className="w-6 shrink-0 text-caption leading-[22px] font-medium">{String(n).padStart(2, "0")}</span>
      <span className="text-body">{children}</span>
    </div>
  );
}

/** Timeline row: 56px year slot. */
export function TimelineRow({ year, children }: { year: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 py-2.5 text-caption leading-5">
      <span className="w-14 shrink-0 font-medium">{year}</span>
      <span>{children}</span>
    </div>
  );
}

/** Handling rule: do = white circle + check in area-strong, don't = ink circle + cross in area colour. */
export function RuleRow({ kind, children }: { kind: "do" | "dont"; children: ReactNode }) {
  return (
    <div className="flex gap-3 py-3">
      <span
        className={cn(
          "flex size-5.5 shrink-0 items-center justify-center rounded-pill",
          kind === "do" ? "bg-white text-area-strong" : "bg-ink text-area",
        )}
      >
        <Icon name={kind === "do" ? "check" : "close"} size={kind === "do" ? 12 : 11} strokeWidth={2.4} />
        <span className="sr-only">{kind === "do" ? "Do:" : "Don't:"}</span>
      </span>
      <span className="text-body">{children}</span>
    </div>
  );
}

interface PersonRowProps {
  name: ReactNode;
  note?: ReactNode;
  date: ReactNode;
  /** Avatar initial, or «You» for the current user. */
  initial: string;
  isCurrentUser?: boolean;
}

/** Person row: 32px avatar, name + note, 72px date slot. */
export function PersonRow({ name, note, date, initial, isCurrentUser }: PersonRowProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-pill text-micro font-medium",
          isCurrentUser ? "bg-ink text-area" : "bg-white text-ink",
        )}
        aria-hidden="true"
      >
        {initial}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-body">{name}</span>
        {note && <span className="text-micro text-area-ink">{note}</span>}
      </span>
      <span className="w-18 shrink-0 text-right text-micro">{date}</span>
    </div>
  );
}

/** Navigation row (Q&A): whole row is the link, chevron right. */
export function NavRow({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="flex items-center justify-between gap-3 py-3.5 text-body hover:bg-ink/5">
      {children}
      <Icon name="chevron-right" size={16} strokeWidth={1.5} className="shrink-0" />
    </Link>
  );
}
