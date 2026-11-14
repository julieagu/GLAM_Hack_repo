import artothekLogo from "@/assets/logo/artothek-logo.svg";
import { IconButton } from "@/components/ui";

/**
 * Home header (Paper: Mobile/Home): SKKG wordmark + menu over an ink rule,
 * then the tagline with the ARTOTHEK sticker tilted over the right edge.
 */
export function BrandHeader({ tagline, onMenu }: { tagline: string; onMenu?: () => void }) {
  return (
    <header className="relative flex flex-col gap-5 px-6 pt-5 pb-5">
      <div className="flex items-center justify-between border-b border-ink pb-3">
        <img
          src={`${import.meta.env.BASE_URL}skkg-logo.svg`}
          alt="SKKG – Stiftung für Kunst, Kultur und Geschichte"
          width={196}
          height={32}
        />
        <IconButton icon="menu" label="Open menu" variant="ghost" onClick={onMenu} className="-mr-2" />
      </div>
      <p className="text-lead leading-9 tracking-[-0.01em]">{tagline}</p>
      {/* Sticker logo: decorative here (the SKKG wordmark is the real heading). */}
      <img
        src={artothekLogo}
        alt=""
        width={125}
        height={52}
        className="pointer-events-none absolute top-[96px] right-3 w-[125px] rotate-[14.61deg] select-none"
      />
    </header>
  );
}
