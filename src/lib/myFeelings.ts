import { useState } from "react";

// "How I make people feel" answer (Social impact › Add how you feel).
// Prototype/demo: kept in memory only, so it survives moving around the app but
// a page refresh resets the survey (the button comes back, the chart is the original 41).
// TODO: send to the Artothek backend (anonymous) so the average includes everyone.

export interface MyFeelings {
  /** Emotion label → 0–1, same labels as feelings.axes in mock.ts. */
  values: Record<string, number>;
  word: string;
  sentAt: string;
}

let current: MyFeelings | null = null;

// Earlier versions saved the answer in localStorage; drop it so a refresh starts clean.
try {
  localStorage.removeItem("artothek:my-feelings");
} catch {
  /* storage blocked: nothing to clean */
}

export function loadMyFeelings(): MyFeelings | null {
  return current;
}

export function saveMyFeelings(values: Record<string, number>, word: string) {
  current = { values, word, sentAt: new Date().toISOString() };
}

export function useMyFeelings() {
  const [mine] = useState(loadMyFeelings);
  return mine;
}
