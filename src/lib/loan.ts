const DAY = 24 * 60 * 60 * 1000;

export interface LoanProgress {
  daysLeft: number;
  /** 0–1, share of the loan period already passed. */
  elapsed: number;
}

/** Days left and elapsed share of a loan, relative to `now`. */
export function loanProgress(start: string, end: string, now = new Date()): LoanProgress {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  const t = now.getTime();
  return {
    daysLeft: Math.max(0, Math.ceil((e - t) / DAY)),
    elapsed: Math.min(1, Math.max(0, (t - s) / (e - s))),
  };
}

/** «15 Jan 2027» */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
