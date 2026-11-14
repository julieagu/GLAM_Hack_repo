import { Link } from "react-router";
import { Button, Card, Icon } from "@/components/ui";
import { formatDate, loanProgress } from "@/lib/loan";
import { loadFeedback } from "@/lib/loanFeedback";

interface LoanCardProps {
  start: string;
  end: string;
  returnSteps: string[];
  onExtend?: () => void;
  /** Where «Give feedback» leads (the end-of-loan survey). */
  feedbackTo: string;
}

/** Artwork info: return date, days left, progress through the loan, how to return, extend + feedback. */
export function LoanCard({ start, end, returnSteps, onExtend, feedbackTo }: LoanCardProps) {
  const { daysLeft, elapsed } = loanProgress(start, end);
  const feedbackSent = Boolean(loadFeedback());
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-micro tracking-wide text-ink-muted">When to return</span>
          <span className="text-title font-light">{formatDate(end)}</span>
        </div>
        <span className="rounded-pill bg-area px-2.5 py-[3px] text-micro">
          {daysLeft} {daysLeft === 1 ? "day" : "days"} left
        </span>
      </div>
      <div
        className="h-1 rounded-pill bg-area-soft"
        role="progressbar"
        aria-label="Loan period passed"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(elapsed * 100)}
      >
        <div className="h-1 rounded-pill bg-area-strong" style={{ width: `${elapsed * 100}%` }} />
      </div>
      <div className="flex flex-col gap-2 border-t border-line pt-4">
        <span className="text-micro tracking-wide text-ink-muted">How to return</span>
        <ol className="text-body">
          {returnSteps.map((s, i) => (
            <li key={s}>
              {i + 1}. {s}
            </li>
          ))}
        </ol>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" className="flex-1" onClick={onExtend}>
          Extend loan
        </Button>
        {feedbackSent ? (
          <span className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-pill bg-area-soft text-body">
            <Icon name="check" size={14} /> Feedback sent
          </span>
        ) : (
          <Link
            to={feedbackTo}
            aria-label="End-of-loan feedback"
            className="flex h-11 flex-1 items-center justify-center rounded-pill bg-ink text-body text-area hover:bg-ink-soft"
          >
            Feedback
          </Link>
        )}
      </div>
    </Card>
  );
}
