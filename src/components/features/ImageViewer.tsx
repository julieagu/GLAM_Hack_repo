import { useEffect, useState } from "react";
import { Button } from "@/components/ui";

interface ImageViewerProps {
  images: string[];
  alt: string;
  /** Count shown before images load (from the design: 1/4). */
  placeholderCount?: number;
}

/** Artwork image (400 high, radius 12) with pager and a full-screen lightbox. */
export function ImageViewer({ images, alt, placeholderCount = 1 }: ImageViewerProps) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const total = images.length || placeholderCount;
  const src = images[index];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, total]);

  const go = (d: number) => setIndex((i) => (i + d + total) % total);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="h-100 overflow-hidden rounded-md bg-area-soft">
        {src && <img src={src} alt={alt} className="size-full object-cover" />}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-caption">
          <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="px-1.5 text-body" disabled={total < 2}>
            ‹
          </button>
          <span aria-live="polite">
            {index + 1}/{total}
          </span>
          <button type="button" onClick={() => go(1)} aria-label="Next image" className="px-1.5 text-body" disabled={total < 2}>
            ›
          </button>
        </div>
        <Button variant="secondary" size="xs" onClick={() => setOpen(true)} disabled={!src}>
          Lightbox
        </Button>
      </div>

      {open && src && (
        <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-50 flex flex-col bg-ink" onClick={() => setOpen(false)}>
          <div className="flex justify-end p-4">
            <button type="button" className="text-body text-white underline underline-offset-4" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <img src={src} alt={alt} className="min-h-0 flex-1 object-contain" />
          <p className="p-4 text-center text-caption text-on-ink-muted">
            {index + 1}/{total}
          </p>
        </div>
      )}
    </div>
  );
}
