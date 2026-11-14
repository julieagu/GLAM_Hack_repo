import { IconButton } from "@/components/ui";

/** Home header: SKKG wordmark + menu, ink rule, artwork title. */
export function BrandHeader({ title, onMenu }: { title: string; onMenu?: () => void }) {
  return (
    <header className="flex flex-col gap-5 px-6 pt-5 pb-5">
      <div className="flex items-center justify-between border-b border-ink pb-3">
        <img src={`${import.meta.env.BASE_URL}skkg-logo.svg`} alt="SKKG – Stiftung für Kunst, Kultur und Geschichte" width={196} height={32} />
        <IconButton icon="menu" label="Open menu" variant="ghost" onClick={onMenu} className="-mr-2" />
      </div>
      <h1 className="text-headline font-light tracking-[-0.01em]">{title}</h1>
    </header>
  );
}
