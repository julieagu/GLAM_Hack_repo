import { useEffect, useState } from "react";
import { iiifUrl, loadArtworks, type Artwork } from "./artothek";

// One request for the whole session; every screen shares it.
let cache: Promise<Artwork[]> | null = null;
const getArtworks = () => (cache ??= loadArtworks().catch((err) => {
  cache = null; // allow a retry on the next mount
  throw err;
}));

/**
 * Image URLs for an Artothek artwork, looked up by title in the SKKG data.
 * Returns [] while loading or if the artwork has no public image.
 */
export function useArtworkImages(title: string, width = 800): string[] {
  const [urls, setUrls] = useState<string[]>([]);
  useEffect(() => {
    let alive = true;
    getArtworks()
      .then((all) => {
        const art = all.find((a) => a.title.toLowerCase().startsWith(title.toLowerCase()));
        if (alive && art) setUrls(art.images.map((i) => iiifUrl(i.base, width)));
      })
      .catch(() => {
        /* Endpoint unreachable: keep the placeholder. */
      });
    return () => {
      alive = false;
    };
  }, [title, width]);
  return urls;
}
