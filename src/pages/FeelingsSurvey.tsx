import { useState, type CSSProperties, type ReactNode } from "react";
import { Link, useNavigate } from "react-router";
import { MobileScreen, StepHeader } from "@/components/layout";
import { Button, Chip, Icon, RadarChart } from "@/components/ui";
import { featuredArtwork as art, feelings } from "@/data/mock";
import { saveMyFeelings } from "@/lib/myFeelings";
import { useArtworkImages } from "@/lib/useArtworkImages";

const QUESTIONS = 2;
const MAX_TEXT = 40;
/** Example answers for the one-word question. */
const wordExamples = ["Calm", "Hopeful", "Nostalgic", "Warm", "Curious", "Melancholic", "At home", "Spring"];

/** Words for the slider value, so nobody has to think in numbers. */
function strength(v: number) {
  if (v === 0) return "Not at all";
  if (v <= 25) return "A little";
  if (v <= 50) return "Somewhat";
  if (v <= 75) return "A lot";
  return "Completely";
}

/**
 * "How I make people feel" (opened from Social impact › Add how you feel).
 * Same flow as the end-of-loan survey: 0 Intro · 1 Emotion sliders · 2 One word · 3 Thank you.
 * The artwork speaks in the first person. Sliders only, no emoji.
 */
export default function FeelingsSurvey() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(feelings.axes.map((a) => [a.label, 0])),
  );
  const [word, setWord] = useState("");
  const [thumb] = useArtworkImages(art.title, 200);

  const close = () => navigate("/social#feelings");
  const done = step > QUESTIONS;
  const next = () => {
    if (step === QUESTIONS) saveMyFeelings(fractions(values), word.trim());
    setStep((s) => s + 1);
  };
  const back = () => (step === 0 ? close() : setStep((s) => s - 1));
  const label = step === 0 ? `${QUESTIONS} questions · 1 min` : done ? "All done" : `Question ${step} of ${QUESTIONS}`;

  return (
    <MobileScreen area="social" className="h-dvh overflow-hidden">
      <StepHeader label={label} current={done ? QUESTIONS : step - 1} total={QUESTIONS} onBack={done ? undefined : back} onClose={close} />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pt-2 pb-4">
        {step === 0 && (
          <>
            <span className="self-start rounded-pill bg-ink px-2.5 py-[3px] text-micro text-area">{art.title} asks</span>
            <h1 className="pt-4 text-display font-light tracking-tight">How I make people feel</h1>
            <p className="pt-3 text-lead text-area-ink">
              {feelings.respondents} people have told me so far. Add how you feel when you look at me.
            </p>
            <div className="mt-7 flex items-center gap-3.5 rounded-md bg-white p-3.5">
              <div className="h-18 w-14 shrink-0 rounded-sm bg-stone bg-cover bg-center" style={thumb ? { backgroundImage: `url(${thumb})` } : undefined} />
              <div className="flex flex-col gap-0.5">
                <span className="text-body">{art.title}</span>
                <span className="text-micro text-ink-muted">
                  {art.artist}, {art.period}
                </span>
              </div>
            </div>
            <div className="flex gap-4 pt-5 text-caption text-area-ink">
              <span className="flex items-center gap-1.5">
                <Icon name="clock" size={14} /> 1 minute
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="lock" size={14} /> Anonymous
              </span>
            </div>
          </>
        )}

        {step === 1 && (
          <Question eyebrow="How I make people feel" title="How do you feel when you look at me?" helper="Move each slider. Leave it at the start if you don't feel it.">
            <div className="flex flex-col gap-5">
              {feelings.axes.map((a) => (
                <EmotionSlider
                  key={a.label}
                  label={a.label}
                  value={values[a.label]}
                  onChange={(v) => setValues((p) => ({ ...p, [a.label]: v }))}
                />
              ))}
            </div>
          </Question>
        )}

        {step === 2 && (
          <Question eyebrow="In your own words" title="If you had to name the feeling in one word?" helper="Pick one or write your own. Optional.">
            {/* Examples: tapping one fills the field; tapping it again clears it. */}
            <div className="flex flex-wrap gap-2 pb-5" role="group" aria-label="Example words">
              {wordExamples.map((w) => (
                <Chip key={w} selected={word === w} onClick={() => setWord(word === w ? "" : w)}>
                  {w}
                </Chip>
              ))}
            </div>
            <label htmlFor="feel-word" className="pb-2 text-caption">
              Or in your own word
            </label>
            <div className="flex h-12 items-center gap-2.5 rounded-md bg-white px-4 focus-within:ring-2 focus-within:ring-ink">
              <input
                id="feel-word"
                value={word}
                maxLength={MAX_TEXT}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Type a word …"
                className="min-w-0 flex-1 bg-transparent text-body outline-none placeholder:text-ink-muted"
              />
              <span className="shrink-0 text-micro text-ink-muted">
                {word.length}/{MAX_TEXT}
              </span>
            </div>
          </Question>
        )}

        {done && (
          <div className="flex flex-col">
            <span className="flex size-16 items-center justify-center rounded-pill bg-ink text-area" aria-hidden="true">
              <Icon name="heart" size={28} />
            </span>
            <h1 className="pt-5 text-display font-light tracking-tight">Thank you</h1>
            <p className="pt-2 pb-4 text-lead text-area-ink">This is how I make you feel{word.trim() ? `: «${word.trim()}»` : "."}</p>
            <div className="rounded-md bg-surface-translucent px-2 py-3">
              <RadarChart axes={feelings.axes.map((a) => ({ label: a.label, value: values[a.label] / 100 }))} />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-3.5 px-6 pt-4 pb-[max(env(safe-area-inset-bottom),28px)] [@media(max-height:700px)]:pb-4">
        {done ? (
          <Link to="/social#feelings" className="flex h-14 w-full items-center justify-center gap-2 rounded-pill bg-ink text-lead text-area">
            Reveal feeling footprint <Icon name="arrow-right" />
          </Link>
        ) : (
          <>
            <Button size="lg" block onClick={next} iconEnd={<Icon name="arrow-right" />}>
              {step === 0 ? "Start" : step === QUESTIONS ? "Send" : "Next"}
            </Button>
            {step === 0 ? (
              <button type="button" onClick={close} className="text-caption underline underline-offset-[3px]">
                Maybe later
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

function fractions(values: Record<string, number>) {
  return Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v / 100]));
}

function Question({ eyebrow, title, helper, children }: { eyebrow: string; title: string; helper?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <span className="text-micro tracking-wide text-area-ink">{eyebrow}</span>
      <h1 className="pt-1 text-headline font-light tracking-[-0.01em]">{title}</h1>
      {helper ? <p className="pt-2 pb-6 text-body text-area-ink">{helper}</p> : <div className="h-5" />}
      {children}
    </div>
  );
}

/** Emotion slider: label + word for the value, ink thumb, filled track (styled in index.css › .feel-slider). */
function EmotionSlider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  const id = `feel-${label.toLowerCase()}`;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-lead">
          {label}
        </label>
        <span className={value ? "text-caption font-medium" : "text-caption text-area-ink"}>{strength(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={`${label}: ${strength(value)}`}
        className="feel-slider"
        style={{ "--fill": `${value}%` } as CSSProperties}
      />
    </div>
  );
}
