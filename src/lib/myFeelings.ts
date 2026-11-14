import { useState } from "react";
import type { RadarAxis } from "@/components/ui";

// "How I make people feel" answers (Social impact › Add how you feel).
// Prototype only: kept in this browser (localStorage).
// TODO: send to the Artothek backend (anonymous) so the average includes everyone.

const KEY = "artothek:my-feelings";

export interface MyFeelings {
  /** Emotion label → 0–1, same labels as feelings.axes in mock.ts. */
  values: Record<string, number>;
  word: string;
  sentAt: string;
}

export function loadMyFeelings(): MyFeelings | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as MyFeelings) : null;
  } catch {
    return null;
  }
}

export function saveMyFeelings(values: Record<string, number>, word: string) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ values, word, sentAt: new Date().toISOString() }));
  } catch {
    /* storage full or blocked: the thank-you screen still shows the answers */
  }
}

/** Adds one answer to an average over `respondents` people. */
export function withMyAnswer(axes: RadarAxis[], respondents: number, mine: MyFeelings | null): RadarAxis[] {
  if (!mine) return axes;
  return axes.map((a) => ({ ...a, value: (a.value * respondents + (mine.values[a.label] ?? 0)) / (respondents + 1) }));
}

export function useMyFeelings() {
  const [mine] = useState(loadMyFeelings);
  return mine;
}
