import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router";
import { MobileScreen, StepHeader } from "@/components/layout";
import { Button, Chip, Icon } from "@/components/ui";
import { currentLoan, featuredArtwork as art, survey } from "@/data/mock";
import { cn } from "@/lib/cn";
import { emptyFeedback, saveFeedback, type LoanFeedback } from "@/lib/loanFeedback";
import { formatDate, loanProgress } from "@/lib/loan";
import { useArtworkImages } from "@/lib/useArtworkImages";

const MAX_TEXT = 80;
const QUESTIONS = 5;

/**
 * End-of-loan feedback (Paper: Mobile/Social/Survey 0 → 5), opened from the loan card.
 * 0 Intro · 1 Why this artwork · 2 Looking at art · 3 Art beyond museums · 4 Who sees it · 5 Walls next · 6 Thank you.
 * Every question can be skipped; answers are anonymous.
 */
export default function LoanSurvey() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [a, setA] = useState<LoanFeedback>(emptyFeedback);
  const [thumb] = useArtworkImages(art.title, 200);

  const set = <K extends keyof LoanFeedback>(k: K, v: LoanFeedback[K]) => setA((p) => ({ ...p, [k]: v }));
  const toggleIn = (k: "reasons" | "changes" | "nextThemes", v: string) =>
    setA((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }));

  const close = () => navigate("/artwork");
  const next = () => {
    if (step === QUESTIONS) saveFeedback(a);
    setStep((s) => s + 1);
  };
  const back = () => (step === 0 ? close() : setStep((s) => s - 1));

  const { daysLeft } = loanProgress(currentLoan.start, currentLoan.end);
  const label = step === 0 ? `${QUESTIONS} questions · 2 min` : step > QUESTIONS ? "All done" : `Question ${step} of ${QUESTIONS}`;
  const done = step > QUESTIONS;

  return (
    <MobileScreen area="social" className="h-dvh overflow-hidden">
      <StepHeader
        label={label}
        current={done ? QUESTIONS : step - 1}
        total={QUESTIONS}
        onBack={done ? undefined : back}
        onClose={close}
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pt-2 pb-4">
        {step === 0 && (
          <>
            <span className="self-start rounded-pill bg-ink px-2.5 py-[3px] text-micro text-area">
              Your loan ends in {daysLeft} {daysLeft === 1 ? "day" : "days"}
            </span>
            <h1 className="pt-4 text-display font-light tracking-tight">My Time With You</h1>
            <p className="pt-3 text-lead text-area-ink">Four quick questions before your {art.title} returns to the collection.</p>
            <div className="mt-7 flex items-center gap-3.5 rounded-md bg-white p-3.5">
              <div className="h-18 w-14 shrink-0 rounded-sm bg-stone bg-cover bg-center" style={thumb ? { backgroundImage: `url(${thumb})` } : undefined} />
              <div className="flex flex-col gap-0.5">
                <span className="text-body">{art.title}</span>
                <span className="text-micro text-ink-muted">{art.artist}</span>
                <span className="text-micro">With you since {formatDate(currentLoan.start)} · 6 months</span>
              </div>
            </div>
            <div className="flex gap-4 pt-5 text-caption text-area-ink">
              <span className="flex items-center gap-1.5">
                <Icon name="clock" size={14} /> 2 minutes
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="lock" size={14} /> Anonymous
              </span>
            </div>
          </>
        )}

        {step === 1 && (
          <Question eyebrow="Your choice" title={`What drew you to ${art.title}?`} helper="Pick as many as you like.">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Reasons">
              {survey.reasons.map((r) => (
                <Chip key={r} selected={a.reasons.includes(r)} onClick={() => toggleIn("reasons", r)}>
                  {r}
                </Chip>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-6">
              <div className="flex items-baseline justify-between">
                <label htmlFor="reason-text" className="text-caption">
                  In your own words
                </label>
                <span className="text-micro text-area-ink">Optional</span>
              </div>
              <div className="flex h-12 items-center gap-2.5 rounded-md bg-white px-4 focus-within:ring-2 focus-within:ring-ink">
                <input
                  id="reason-text"
                  value={a.reasonText}
                  maxLength={MAX_TEXT}
                  onChange={(e) => set("reasonText", e.target.value)}
                  placeholder="One sentence is enough …"
                  className="min-w-0 flex-1 bg-transparent text-body outline-none placeholder:text-ink-muted"
                />
                <span className="shrink-0 text-micro text-ink-muted">
                  {a.reasonText.length}/{MAX_TEXT}
                </span>
              </div>
            </div>
          </Question>
        )}

        {step === 2 && (
          <Question
            eyebrow={`Since ${art.title} moved in`}
            title="Has living with me changed how you see art?"
            helper="Six months with one painting can change a lot, or nothing at all."
          >
            <div className="flex flex-col gap-2" role="radiogroup" aria-label="From 1, not at all, to 5, completely">
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={a.lookDifferently === n}
                    onClick={() => set("lookDifferently", n)}
                    className={cn(
                      "flex size-14 items-center justify-center rounded-pill text-lead transition-colors",
                      a.lookDifferently === n ? "bg-ink text-area" : "border border-ink hover:bg-ink/5",
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-micro text-area-ink">
                <span>Not at all</span>
                <span>Completely</span>
              </div>
            </div>
            <span className="pt-7 pb-3 text-caption">What changed?</span>
            <div className="flex flex-wrap gap-2" role="group" aria-label="What changed">
              {survey.changes.map((c) => (
                <Chip key={c} selected={a.changes.includes(c)} onClick={() => toggleIn("changes", c)}>
                  {c}
                </Chip>
              ))}
            </div>
          </Question>
        )}

        {step === 3 && (
          <Question eyebrow="Art beyond museums" title="«Original art belongs in homes, not only in museums.»" helper="How much do you agree?">
            <div className="flex flex-col border-b border-line" role="radiogroup" aria-label="How much do you agree?">
              {survey.agree.map((opt) => {
                const on = a.agreeArtInHomes === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => set("agreeArtInHomes", opt)}
                    className="flex h-[42px] items-center gap-3 border-t border-line text-left text-body"
                  >
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-pill",
                        on ? "bg-ink" : "border-[1.5px] border-ink",
                      )}
                    >
                      {on && <span className="size-2 rounded-pill bg-area" />}
                    </span>
                    <span className={on ? "font-medium" : undefined}>{opt}</span>
                  </button>
                );
              })}
            </div>
            <span className="pt-6 pb-2.5 text-caption">Had you lived with an original artwork before?</span>
            <Segmented
              value={a.firstOriginal}
              onChange={(v) => set("firstOriginal", v as LoanFeedback["firstOriginal"])}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No, first time" },
              ]}
            />
          </Question>
        )}

        {step === 4 && (
          <Question
            eyebrow="Who sees it"
            title={`How many people see ${art.title}?`}
            helper="Family, flatmates, friends, visitors: everyone who passes by."
          >
            <RadioList label="How many people see this artwork?" options={survey.viewers} value={a.viewers} onChange={(v) => set("viewers", v)} />
          </Question>
        )}

        {step === 5 && (
          <Question eyebrow="What's next" title="What would you love to have on your walls next?" helper="Pick as many as you like.">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Themes">
              {survey.nextThemes.map((t) => (
                <Chip key={t} selected={a.nextThemes.includes(t)} onClick={() => toggleIn("nextThemes", t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </Question>
        )}

        {done && <ThankYou themes={a.nextThemes} />}
      </div>

      {/* Bottom actions */}
      <div className="flex flex-col items-center gap-3.5 px-6 pt-4 pb-[max(env(safe-area-inset-bottom),28px)] [@media(max-height:700px)]:pb-4">
        {done ? (
          <>
            <Link to="/" className="flex h-14 w-full items-center justify-center gap-2 rounded-pill bg-ink text-lead text-area">
              Back to home <Icon name="arrow-right" />
            </Link>
            <Link to="/artwork" className="text-caption underline underline-offset-[3px]">
              See how to return it
            </Link>
          </>
        ) : (
          <>
            <Button size="lg" block onClick={next} iconEnd={<Icon name="arrow-right" />}>
              {step === 0 ? "Start" : step === QUESTIONS ? "Send my answers" : "Next"}
            </Button>
            {step === 0 ? (
              <button type="button" onClick={close} className="text-caption underline underline-offset-[3px]">
                Remind me later
              </button>
            ) : (
              <button type="button" onClick={next} className="text-caption underline underline-offset-[3px]">
                {step === QUESTIONS ? "Skip and send" : "Skip this question"}
              </button>
            )}
          </>
        )}
      </div>
    </MobileScreen>
  );
}

function Question({ eyebrow, title, helper, children }: { eyebrow: string; title: string; helper?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <span className="text-micro tracking-wide text-area-ink">{eyebrow}</span>
      <h1 className="pt-1 text-headline font-light tracking-[-0.01em]">{title}</h1>
      {helper ? <p className="pt-2 pb-5 text-body text-area-ink">{helper}</p> : <div className="h-5" />}
      {children}
    </div>
  );
}

function Segmented({
  value,
  onChange,
  options,
}: {
  value: string | null;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex gap-1 rounded-pill bg-surface-translucent p-1" role="radiogroup">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn("h-10 flex-1 rounded-pill text-body transition-colors", value === o.value ? "bg-ink text-area" : "hover:bg-white/50")}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Single-choice list: ring radio + label, one row per option (same look as question 3). */
function RadioList({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col border-b border-line" role="radiogroup" aria-label={label}>
      {options.map((opt) => {
        const on = value === opt;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(opt)}
            className="flex h-[42px] items-center gap-3 border-t border-line text-left text-body"
          >
            <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-pill", on ? "bg-ink" : "border-[1.5px] border-ink")}>
              {on && <span className="size-2 rounded-pill bg-area" />}
            </span>
            <span className={on ? "font-medium" : undefined}>{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

function ThankYou({ themes }: { themes: string[] }) {
  return (
    <div className="flex flex-col">
      <span className="flex size-16 items-center justify-center rounded-pill bg-ink text-area" aria-hidden="true">
        <Icon name="heart" size={28} />
      </span>
      <h1 className="pt-5 text-display font-light tracking-tight">Thank you</h1>
      <p className="pt-2 pb-6 text-lead text-area-ink">Your answers help us bring original artworks into more homes in Winterthur and hopefully soon beyond!</p>
      <div className="flex flex-col gap-2">
        <Link to="/artwork" className="flex items-center gap-3 rounded-md bg-white px-4 py-3.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-pill bg-area-soft">
            <Icon name="box" size={16} />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-body">Return {art.title} by {formatDate(currentLoan.end).replace(/ \d{4}$/, "")}</span>
            <span className="text-micro text-ink-muted">Winterthur Library, Obertor</span>
          </span>
          <Icon name="chevron-right" />
        </Link>
        {themes.length > 0 && (
          <div className="flex items-center gap-3 rounded-md bg-white px-4 py-3.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-pill bg-area-soft">
              <Icon name="heart" size={16} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-body">Next on your walls: {themes.join(", ")}</span>
              <span className="text-micro text-ink-muted">We'll suggest matching works for your next loan</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
