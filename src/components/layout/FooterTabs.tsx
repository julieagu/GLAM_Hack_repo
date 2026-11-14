import { NavLink } from "react-router";
import { cn } from "@/lib/cn";

// «Dashboard» is the Home screen (the artwork overview); `end` keeps it from matching every page.
const tabs = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/qa", label: "Q&A", end: false },
  { to: "/about", label: "About", end: false },
];

/** Always white, 64 high, active tab = ink fill + white label. */
export function FooterTabs() {
  return (
    <nav aria-label="Footer" className="flex h-16 border-t border-ink bg-white">
      {tabs.map((t, i) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) =>
            cn(
              "flex min-w-0 items-center px-3 text-lead underline decoration-1 underline-offset-4",
              // Dashboard (first tab) gets more room than Q&A and About.
              i === 0 ? "flex-[1.6]" : "flex-1",
              i > 0 && "border-l border-line",
              isActive ? "bg-ink text-white" : "bg-white text-ink hover:bg-stone",
            )
          }
        >
          {t.label}
        </NavLink>
      ))}
    </nav>
  );
}
