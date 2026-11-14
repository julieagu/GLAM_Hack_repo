import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Area } from "@/data/mock";

interface MobileScreenProps {
  /** Area colour of the screen; omit for neutral (white) screens like Home. */
  area?: Area;
  children: ReactNode;
  /** Pinned to the bottom (FooterTabs or a step flow's BottomActions). */
  footer?: ReactNode;
  className?: string;
}

const areaHex: Record<Area, string> = {
  artwork: "#3FD498",
  social: "#FF8C4A",
  conservation: "#639AFF",
};

/**
 * Mobile screen shell.
 * - Phones (any width): edge to edge, the area colour fills the whole screen.
 * - Tablet / desktop (md+): a centred phone-width column on stone.
 * - Respects notch / home-indicator safe areas (index.html uses viewport-fit=cover).
 * - Tints the browser UI (theme-color) with the area colour.
 */
export function MobileScreen({ area, children, footer, className }: MobileScreenProps) {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) return;
    const previous = meta.content;
    meta.content = area ? areaHex[area] : "#FFFFFF";
    return () => {
      meta.content = previous;
    };
  }, [area]);

  return (
    <div data-area={area} className="min-h-dvh bg-area md:bg-stone">
      <div
        className={cn(
          "mx-auto flex min-h-dvh w-full flex-col bg-area md:max-w-phone md:shadow-[0_0_0_1px_var(--color-line)]",
          "pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)]",
          className,
        )}
      >
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
        {footer && <div className="sticky bottom-0 z-10 bg-white pb-[env(safe-area-inset-bottom)]">{footer}</div>}
      </div>
    </div>
  );
}
