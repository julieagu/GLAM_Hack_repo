import { Button, Card } from "@/components/ui";
import { formatDate, loanProgress } from "@/lib/loan";

interface LoanCardProps {
  start: string;
  end: string;
  returnSteps: string[];
  onExtend?: () => void;
}

/** Artwork info: return date, days left, progress through the loan, how to return. */
export function LoanCard({ start, end, returnSteps, onExtend }: LoanCardProps) {
  const { daysLeft, elapsed } = loanProgress(start, end);
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
      <Button variant="secondary" size="sm" block onClick={onExtend}>
        Extend loan
      </Button>
    </Card>
  );
}
