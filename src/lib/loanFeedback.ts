// End-of-loan survey answers. Prototype only: kept in this browser (localStorage).
// TODO: send to the Artothek backend (anonymous).

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

export function loadFeedback(): LoanFeedback | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as LoanFeedback) : null;
  } catch {
    return null;
  }
}

export function saveFeedback(f: LoanFeedback) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...f, sentAt: new Date().toISOString() }));
  } catch {
    /* ignore */
  }
}
