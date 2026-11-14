import { NavLink } from "react-router";
import { cn } from "@/lib/cn";

const tabs = [
  { to: "/ARTOTHEK", label: "ARTOTHEK" },
  { to: "/qa", label: "Q&A" },
  { to: "/about", label: "About" },
];

/** Always white, 64 high, active tab = ink fill + white label. */
export function FooterTabs() {
  return (
    <nav aria-label="Footer" className="flex h-16 border-t border-ink bg-white">
      {tabs.map((t, i) => (
        <NavLink
          key={t.to}
          to={t.to}
          className={({ isActive }) =>
            cn(
              "flex flex-1 items-center px-3 text-lead underline decoration-1 underline-offset-4",
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
