import { useEffect, useState } from "react";

const KEY = "artothek:last-story";

function readLast(): number {
  try {
    const v = sessionStorage.getItem(KEY);
    return v === null ? -1 : Number(v);
  } catch {
    return -1; // storage unavailable (private mode): plain random
  }
}

/**
 * Picks a random index in [0, count) each time the page is opened,
 * never the same one as the previous visit (remembered for the browser session).
 */
export function useRotatingIndex(count: number): number {
  // Pure pick (React may call this twice in dev); saving happens in the effect below.
  const [index] = useState(() => {
    if (count < 2) return 0;
    const last = readLast();
    let next = Math.floor(Math.random() * (last >= 0 ? count - 1 : count));
    if (last >= 0 && next >= last) next += 1; // skip last time's story
    return next;
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, String(index));
    } catch {
      /* ignore */
    }
  }, [index]);

  return index;
}
