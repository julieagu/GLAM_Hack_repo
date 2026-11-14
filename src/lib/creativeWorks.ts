import { useCallback, useState } from "react";

// Photos borrowers take of their own creative work (Social impact › Creativity work).
// Prototype only: kept in this browser (localStorage), newest first.
// TODO: upload to the Artothek backend so everyone sees them.

const KEY = "artothek:creative-works";

export interface CreativeWork {
  id: string;
  /** JPEG data URL, already downscaled. */
  imageUrl: string;
  author: string;
  createdAt: string;
}

function load(): CreativeWork[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as CreativeWork[];
  } catch {
    return [];
  }
}

/** Returns false when the browser storage is full or unavailable. */
export function saveCreativeWork(imageUrl: string): boolean {
  const work: CreativeWork = { id: `work-${Date.now()}`, imageUrl, author: "You", createdAt: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify([work, ...load()]));
    return true;
  } catch {
    return false;
  }
}

export function useCreativeWorks() {
  const [works, setWorks] = useState<CreativeWork[]>(load);
  const refresh = useCallback(() => setWorks(load()), []);
  return { works, refresh };
}

/** Longest side in px for stored photos — small enough for localStorage, sharp on a phone. */
const MAX_SIDE = 900;

/** Draws a video frame or image into a JPEG data URL, downscaled to MAX_SIDE. */
export function toJpeg(source: HTMLVideoElement | HTMLImageElement): string {
  const w = source instanceof HTMLVideoElement ? source.videoWidth : source.naturalWidth;
  const h = source instanceof HTMLVideoElement ? source.videoHeight : source.naturalHeight;
  const scale = Math.min(1, MAX_SIDE / Math.max(w, h));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);
  canvas.getContext("2d")!.drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.8);
}
