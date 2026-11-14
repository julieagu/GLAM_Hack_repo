import { NavLink } from "react-router";
import { cn } from "@/lib/cn";

// «Dashboard» opens the staff dashboard (/staff → Overview, /staff/artworks → Tulipes).
// «Q&A» is external: the opendata.ch hackathon handbook (opens in a new tab).
const tabs = [
  { to: "/staff", label: "Dashboard", end: false },
  { href: "https://opendata.ch/handbook/#platform", label: "Q&A" },
  { to: "/about", label: "About", end: false },
] as const;

const base = "flex min-w-0 items-center px-3 text-lead underline decoration-1 underline-offset-4";
const idle = "bg-white text-ink hover:bg-stone";

/** Always white, 64 high, active tab = ink fill + white label. */
export function FooterTabs() {
  return (
    <nav aria-label="Footer" className="flex h-16 border-t border-ink bg-white">
      {tabs.map((t, i) => {
        // Dashboard (first tab) gets more room than Q&A and About.
        const layout = cn(i === 0 ? "flex-[1.6]" : "flex-1", i > 0 && "border-l border-line");
        return "href" in t ? (
          <a key={t.label} href={t.href} target="_blank" rel="noreferrer" className={cn(base, layout, idle)}>
            {t.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <NavLink
            key={t.label}
            to={t.to}
            end={t.end}
            className={({ isActive }) => cn(base, layout, isActive ? "bg-ink text-white" : idle)}
          >
            {t.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
