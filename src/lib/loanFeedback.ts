// End-of-loan survey answers. Prototype/demo: kept in memory only, so "✓ Feedback sent"
// stays while you move around the app, but a page refresh forgets the answers.
// TODO: send to the Artothek backend (anonymous).

/** Old localStorage key, only used to clean up. */
const KEY = "artothek:loan-feedback";

export interface LoanFeedback {
  reasons: string[];
  reasonText: string;
  lookDifferently: number | null; // 1–5
  changes: string[];
  agreeArtInHomes: string | null;
  firstOriginal: "yes" | "no" | null;
  hostAgain: "yes" | "maybe" | "not-now" | null;
  wishlist: string[];
  sentAt?: string;
}

export const emptyFeedback: LoanFeedback = {
  reasons: [],
  reasonText: "",
  lookDifferently: null,
  changes: [],
  agreeArtInHomes: null,
  firstOriginal: null,
  hostAgain: null,
  wishlist: [],
};

let current: LoanFeedback | null = null;

// Earlier versions kept the answers in localStorage; drop them so a refresh starts clean.
try {
  localStorage.removeItem(KEY);
} catch {
  /* storage blocked: nothing to clean */
}

export function loadFeedback(): LoanFeedback | null {
  return current;
}

export function saveFeedback(f: LoanFeedback) {
  current = { ...f, sentAt: new Date().toISOString() };
}
