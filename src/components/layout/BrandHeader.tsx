import artothekLogo from "@/assets/logo/artothek-logo.svg";
import skkgLogo from "@/assets/logo/skkg-logo-2.png";
import winbibLogo from "@/assets/logo/winbib-logo.png";
import { IconButton } from "@/components/ui";

const logoLink = "shrink-0 rounded-xs focus-visible:outline-offset-4";

/**
 * Home header (Paper: High_fidelity › Mobile/Home › BrandHeader):
 * SKKG + winbib logos (each links to its website) and the menu over an ink rule,
 * then the title + tagline with the ARTOTHEK sticker tilted over the right edge.
 */
export function BrandHeader({ title, tagline, onMenu }: { title: string; tagline: string; onMenu?: () => void }) {
  return (
    // overflow-x-clip: the tilted sticker's corner must not make the page scroll sideways.
    <header className="relative flex flex-col gap-5 overflow-x-clip px-6 pt-5 pb-5">
      <div className="flex items-center justify-between gap-3 border-b border-ink pb-3">
        <a href="https://www.skkg.ch" target="_blank" rel="noreferrer" className={logoLink}>
          <img
            src={skkgLogo}
            alt="SKKG – Stiftung für Kunst, Kultur und Geschichte (opens skkg.ch)"
            width={738}
            height={369}
            className="h-11 w-auto"
          />
        </a>
        <a href="https://winbib.ch" target="_blank" rel="noreferrer" className={logoLink}>
          <img
            src={winbibLogo}
            alt="winbib – Winterthurer Bibliotheken (opens winbib.ch)"
            width={516}
            height={187}
            className="h-[35px] w-auto"
          />
        </a>
        <IconButton icon="menu" label="Open menu" variant="ghost" onClick={onMenu} className="-mr-2" />
      </div>
      <p className="text-headline tracking-[-0.01em]">
        {title}
        <br />
        <span className="text-lead tracking-[-0.01em]">{tagline}</span>
      </p>
      {/* Sticker logo: decorative here (the logos above are the real brand marks). */}
      <img
        src={artothekLogo}
        alt=""
        width={125}
        height={52}
        className="pointer-events-none absolute top-[68px] right-1 w-[125px] rotate-[14.61deg] select-none"
      />
    </header>
  );
}
