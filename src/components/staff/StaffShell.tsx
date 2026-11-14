import type { ReactNode } from "react";
import { Link, NavLink } from "react-router";
import { staffUser } from "@/data/staff";
import { cn } from "@/lib/cn";

const tabs = [
  { to: "/staff", label: "Overview", end: true },
  { to: "/staff/artworks", label: "Artworks", end: false },
];

function Tabs({ className }: { className?: string }) {
  return (
    <>
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) =>
            cn(
              "flex h-9 items-center justify-center rounded-pill px-4 text-body",
              isActive ? "bg-ink text-white" : "text-ink hover:bg-stone",
              className,
            )
          }
        >
          {t.label}
        </NavLink>
      ))}
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </svg>
  );
}

/**
 * Staff dashboard frame (Paper: Desktop/Staff/* + Mobile/Staff/*).
 * - desk (≥1024): 72px top bar with logo · greeting, Overview/Artworks tabs, search, avatar.
 * - below: compact top bar (logo · "Staff", avatar) and the tabs in a bar fixed to the bottom.
 */
export function StaffShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-white px-6 pt-[env(safe-area-inset-top)]">
      {/* 24px gutters; content caps at --container-desktop (1392 = 1440 artboard − 2×24). */}
      <div className="mx-auto flex max-w-desktop flex-col pb-28 desk:pb-10">
        <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-ink desk:h-18">
          <div className="flex min-w-0 items-center gap-3 desk:flex-1 desk:basis-0 desk:gap-4">
            {/* Logo goes back to the borrower app. */}
            <Link to="/" aria-label="SKKG – back to the app home" className="shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}skkg-logo.svg`}
                alt=""
                width={196}
                height={32}
                className="h-auto w-[120px] desk:w-[196px]"
              />
            </Link>
            <span className="truncate border-l border-ink pl-3 desk:overflow-visible text-caption text-ink-muted desk:pl-3.5">
              <span className="desk:hidden">Staff</span>
              <span className="hidden desk:inline">Artothek · Hello, {staffUser.name}</span>
            </span>
          </div>

          <nav aria-label="Staff" className="hidden items-center gap-1 desk:flex">
            <Tabs />
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-2.5 desk:flex-1 desk:basis-0">
            <label className="hidden h-9 w-[200px] items-center gap-2 rounded-pill border border-ink px-3.5 desk:flex">
              <SearchIcon />
              <input
                type="search"
                placeholder="Search works, people …"
                aria-label="Search works, people"
                className="min-w-0 flex-1 bg-transparent text-caption outline-none placeholder:text-ink-muted"
              />
            </label>
            <span
              className="flex size-9 shrink-0 items-center justify-center rounded-pill border border-ink bg-highlight text-[13px] leading-4 font-medium"
              aria-label={`Signed in as ${staffUser.name}`}
              role="img"
            >
              {staffUser.initials}
            </span>
          </div>
        </header>

        <main className="flex flex-col">{children}</main>
      </div>

      {/* Mobile: tabs fixed to the bottom (desktop has them in the top bar). */}
      <nav
        aria-label="Staff"
        className="fixed inset-x-0 bottom-0 z-20 border-t border-ink bg-white px-6 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] desk:hidden"
      >
        <div className="mx-auto flex max-w-content gap-1 rounded-pill border border-ink p-1">
          <Tabs className="h-10 flex-1" />
        </div>
      </nav>
    </div>
  );
}

/** Page title row: greeting (mobile only), hero title, optional actions on the right. */
export function StaffTitle({ title, actions }: { title: ReactNode; actions?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 pt-6 pb-6 desk:flex-row desk:items-end desk:justify-between desk:pt-9 desk:pb-7">
      <div className="flex flex-col gap-2">
        <span className="text-caption text-ink-muted desk:hidden">Artothek · Hello, {staffUser.name}</span>
        <h1 className="text-[48px] leading-[48px] font-light tracking-hero desk:text-hero">{title}</h1>
      </div>
      {actions && <div className="flex items-center gap-2 desk:pb-1.5">{actions}</div>}
    </div>
  );
}
