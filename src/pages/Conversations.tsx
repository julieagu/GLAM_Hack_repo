import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Link, useNavigate } from "react-router";
import { MobileScreen } from "@/components/layout";
import { Button, Icon, IconButton } from "@/components/ui";
import { conversationPrompts as prompts, featuredArtwork as art, type ConversationPrompt } from "@/data/mock";
import { cn } from "@/lib/cn";
import { useArtworkImages } from "@/lib/useArtworkImages";

const MAX_NOTE = 60;
const SWIPE_THRESHOLD = 90; // px of horizontal drag that counts as a decision
const FLY_MS = 420;
const ROTATE_PER_PX = 1 / 18; // degrees of tilt per px dragged

type Outcome = "passed" | "talked";

interface Answer {
  id: string;
  outcome: Outcome;
  note: string;
  keywords: string[];
}

interface Flyer {
  key: number;
  prompt: ConversationPrompt;
  outcome: Outcome;
  fromX: number;
}

/**
 * Conversation card deck (Paper: Mobile/Social/Conversation card).
 * Full screen, never scrolls. One prompt at a time:
 *   Pass      — button or swipe left:  card flies off to the left
 *   We talked — button or swipe right: card flies off to the right, note + keywords saved
 * The cards behind move up into place as the top card leaves.
 */
export default function Conversations() {
  const navigate = useNavigate();
  const [thumb] = useArtworkImages(art.title, 120);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [note, setNote] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [custom, setCustom] = useState<string[]>([]);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<number | null>(null);
  const flyerKey = useRef(0);

  const card = prompts[index] as ConversationPrompt | undefined;
  const keywords = card ? [...card.keywords, ...custom] : [];

  function decide(outcome: Outcome, fromX = 0) {
    if (!card) return;
    const key = ++flyerKey.current;
    setFlyers((f) => [...f, { key, prompt: card, outcome, fromX }]);
    window.setTimeout(() => setFlyers((f) => f.filter((x) => x.key !== key)), FLY_MS + 40);
    setAnswers((a) => [
      ...a,
      { id: card.id, outcome, note: outcome === "talked" ? note.trim() : "", keywords: outcome === "talked" ? selected : [] },
    ]);
    setIndex((i) => i + 1);
    setNote("");
    setSelected([]);
    setCustom([]);
    setAdding(false);
    setDraft("");
    setDragX(0);
  }

  const toggle = (k: string) => setSelected((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  function addKeyword() {
    const k = draft.trim();
    if (k && !keywords.includes(k)) {
      setCustom((c) => [...c, k]);
      setSelected((s) => [...s, k]);
    }
    setDraft("");
    setAdding(false);
  }

  // Drag the top card: it follows the finger and tilts; release past the threshold to decide.
  const onPointerDown = (e: PointerEvent) => {
    dragStart.current = e.clientX;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent) => {
    if (dragStart.current !== null) setDragX(e.clientX - dragStart.current);
  };
  const onPointerUp = () => {
    if (dragStart.current === null) return;
    dragStart.current = null;
    setDragging(false);
    if (dragX <= -SWIPE_THRESHOLD) decide("passed", dragX);
    else if (dragX >= SWIPE_THRESHOLD) decide("talked", dragX);
    else setDragX(0); // springs back
  };

  // Show the summary once the last card has finished flying away.
  if (!card && flyers.length === 0) {
    return (
      <Summary
        answers={answers}
        onRestart={() => {
          setIndex(0);
          setAnswers([]);
        }}
      />
    );
  }

  // Top card + up to two behind it, rendered back to front.
  const stack = prompts.slice(index, index + 3).map((p, depth) => ({ p, depth })).reverse();

  return (
    <MobileScreen area="social" className="h-dvh overflow-hidden">
      {/* Deck header: close · progress · balance spacer */}
      <div className="flex items-center justify-between px-6 pt-4 pb-3.5">
        <IconButton icon="close" label="Close conversations" onClick={() => navigate("/social")} />
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-micro tracking-wide text-area-ink">
            Conversation {Math.min(index + 1, prompts.length)} of {prompts.length}
          </span>
          <div className="flex gap-1" role="progressbar" aria-valuemin={1} aria-valuemax={prompts.length} aria-valuenow={Math.min(index + 1, prompts.length)}>
            {prompts.map((p, i) => (
              <span key={p.id} className={cn("h-[3px] w-3.5 rounded-pill transition-colors duration-300", i <= index ? "bg-ink" : "bg-track")} />
            ))}
          </div>
        </div>
        <span className="size-10" aria-hidden="true" />
      </div>

      {/* Deck — takes all remaining height */}
      <div className="flex min-h-0 flex-1 flex-col px-6 pt-3">
        <div className="relative min-h-0 flex-1">
          {stack.map(({ p, depth }) => {
            const isTop = depth === 0;
            const style: CSSProperties = isTop
              ? { transform: `translateX(${dragX}px) rotate(${dragX * ROTATE_PER_PX}deg)` }
              : // Behind: narrower and peeking out above, like the Paper stack (303 / 279 of 327 wide).
                { transform: `translateY(${-6 * depth}px) scale(${1 - 0.074 * depth})` };
            return (
              <article
                key={p.id}
                aria-hidden={!isTop}
                aria-live={isTop ? "polite" : undefined}
                onPointerDown={isTop ? onPointerDown : undefined}
                onPointerMove={isTop ? onPointerMove : undefined}
                onPointerUp={isTop ? onPointerUp : undefined}
                onPointerCancel={isTop ? onPointerUp : undefined}
                style={style}
                className={cn(
                  "absolute inset-0 origin-top overflow-hidden rounded-lg bg-white select-none",
                  isTop ? "touch-pan-y shadow-[0_8px_24px_-8px_#58240140]" : "pointer-events-none",
                  // Smooth everywhere except while the finger is moving the card.
                  !(isTop && dragging) && "transition-[transform,box-shadow] duration-300 ease-out motion-reduce:transition-none",
                )}
              >
                <CardFace prompt={p} thumb={thumb} />
                {/* Card backs: solid colour that fades away as the card reaches the top. */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 transition-opacity duration-300",
                    depth === 1 ? "bg-orange-200" : "bg-orange-300",
                    isTop ? "opacity-0" : "opacity-100",
                  )}
                />
                {isTop && <SwipeStamps dragX={dragX} />}
              </article>
            );
          })}

          {/* Decided cards flying off, on top of everything */}
          {flyers.map((f) => {
            const dir = f.outcome === "talked" ? 1 : -1;
            return (
              <article
                key={f.key}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg bg-white shadow-[0_8px_24px_-8px_#58240140] motion-reduce:hidden"
                style={
                  {
                    "--from-x": `${f.fromX}px`,
                    "--from-r": `${f.fromX * ROTATE_PER_PX}deg`,
                    "--to-x": `${dir * 160}%`,
                    "--to-r": `${dir * 22}deg`,
                    animation: `card-fly ${FLY_MS}ms cubic-bezier(0.4, 0, 0.9, 0.6) forwards`,
                  } as CSSProperties
                }
              >
                <CardFace prompt={f.prompt} thumb={thumb} />
                <SwipeStamps dragX={dir * SWIPE_THRESHOLD} />
              </article>
            );
          })}
        </div>
      </div>

      {/* Response: optional one-liner + keywords */}
      <div className="flex flex-col gap-2.5 px-6 pt-5">
        <div className="flex items-baseline justify-between">
          <label htmlFor="note" className="text-caption">
            What came up?
          </label>
          <span className="text-micro text-area-ink">Optional</span>
        </div>
        <div className="flex h-12 items-center gap-2.5 rounded-pill bg-white px-4 focus-within:ring-2 focus-within:ring-ink">
          <input
            id="note"
            value={note}
            maxLength={MAX_NOTE}
            disabled={!card}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && decide("talked")}
            placeholder="A word or a sentence …"
            className="min-w-0 flex-1 bg-transparent text-body outline-none placeholder:text-ink-muted"
          />
          <span className="shrink-0 text-micro text-ink-muted" aria-live="polite">
            {note.length}/{MAX_NOTE}
          </span>
        </div>
        <div className="flex min-h-7.5 flex-wrap gap-1.5" role="group" aria-label="Keywords">
          {keywords.map((k) => {
            const on = selected.includes(k);
            return (
              <button
                key={k}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(k)}
                className={cn("h-7.5 rounded-pill px-3 text-caption transition-colors", on ? "bg-ink text-area" : "border border-ink")}
              >
                {k}
              </button>
            );
          })}
          {card &&
            (adding ? (
              <input
                autoFocus
                value={draft}
                maxLength={20}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addKeyword();
                  if (e.key === "Escape") setAdding(false);
                }}
                onBlur={addKeyword}
                aria-label="New keyword"
                className="h-7.5 w-28 rounded-pill border border-dashed border-ink bg-white px-3 text-caption outline-none"
              />
            ) : (
              <button type="button" onClick={() => setAdding(true)} className="h-7.5 rounded-pill border border-dashed border-ink px-3 text-caption">
                + Add
              </button>
            ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 px-6 pt-5 pb-[max(env(safe-area-inset-bottom),34px)] [@media(max-height:700px)]:pb-5">
        <Button variant="secondary" size="lg" className="flex-1" disabled={!card} onClick={() => decide("passed")} iconEnd={<Icon name="arrow-right" />}>
          Pass
        </Button>
        <Button size="lg" className="flex-[1.4]" disabled={!card} onClick={() => decide("talked")} iconStart={<Icon name="check" />}>
          We talked
        </Button>
      </div>
    </MobileScreen>
  );
}

/** Card content: tag + category, prompt, artwork reference. */
function CardFace({ prompt, thumb }: { prompt: ConversationPrompt; thumb?: string }) {
  return (
    <div className="flex h-full flex-col justify-between gap-4 p-6 [@media(max-height:600px)]:gap-2 [@media(max-height:600px)]:p-4">
      <div className="flex items-center justify-between">
        <span className="rounded-pill bg-area-soft px-2.5 py-[3px] text-micro text-area-ink">Conversation starter</span>
        <span className="text-micro text-ink-muted">{prompt.category}</span>
      </div>
      <h1 className="text-[28px] leading-[32px] font-light tracking-[-0.01em] min-[380px]:text-headline min-[380px]:leading-[38px] [@media(max-height:700px)]:text-[26px] [@media(max-height:700px)]:leading-[30px]">
        {prompt.prompt}
      </h1>
      <div className="flex items-center gap-2.5 border-t border-line pt-3.5 [@media(max-height:600px)]:pt-2.5">
        <div
          className="h-11 w-9 shrink-0 rounded-xs bg-stone bg-cover bg-center"
          style={thumb ? { backgroundImage: `url(${thumb})` } : undefined}
          aria-hidden="true"
        />
        <div className="flex flex-col">
          <span className="text-caption">{art.title}</span>
          <span className="text-micro text-ink-muted">{art.artist}</span>
        </div>
      </div>
    </div>
  );
}

/** «We talked» / «Pass» labels that fade in as the card is dragged right / left. */
function SwipeStamps({ dragX }: { dragX: number }) {
  const right = Math.min(1, Math.max(0, dragX / SWIPE_THRESHOLD));
  const left = Math.min(1, Math.max(0, -dragX / SWIPE_THRESHOLD));
  return (
    <>
      <span
        className="pointer-events-none absolute top-6 left-6 -rotate-12 rounded-pill bg-ink px-3 py-1 text-caption text-area"
        style={{ opacity: right }}
        aria-hidden="true"
      >
        ✓ We talked
      </span>
      <span
        className="pointer-events-none absolute top-6 right-6 rotate-12 rounded-pill border border-ink bg-white px-3 py-1 text-caption"
        style={{ opacity: left }}
        aria-hidden="true"
      >
        Pass →
      </span>
    </>
  );
}

function Summary({ answers, onRestart }: { answers: Answer[]; onRestart: () => void }) {
  const talked = answers.filter((a) => a.outcome === "talked");
  const keywords = [...new Set(talked.flatMap((a) => a.keywords))];
  const notes = talked.filter((a) => a.note);

  return (
    <MobileScreen area="social" className="h-dvh overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 pt-10">
        <span className="flex size-16 items-center justify-center rounded-pill bg-ink text-area">
          <Icon name="check" size={28} />
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="text-display font-light tracking-tight">
            {talked.length} {talked.length === 1 ? "conversation" : "conversations"}
          </h1>
          <p className="text-lead text-area-ink">
            {talked.length
              ? `${talked.length} of ${answers.length} cards got you talking. Thanks for sharing.`
              : "No conversations this time. Come back whenever you like."}
          </p>
        </div>
        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="What came up">
            {keywords.map((k) => (
              <span key={k} className="flex h-7.5 items-center rounded-pill bg-ink px-3 text-caption text-area">
                {k}
              </span>
            ))}
          </div>
        )}
        {notes.length > 0 && (
          <ul className="flex flex-col gap-2">
            {notes.map((a) => (
              <li key={a.id} className="rounded-md bg-white p-4 text-body">
                «{a.note}»
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col items-center gap-4 px-6 pt-5 pb-[max(env(safe-area-inset-bottom),34px)]">
        <Link to="/social" className="flex h-14 w-full items-center justify-center rounded-pill bg-ink text-lead text-area">
          Back to Social impact
        </Link>
        <button type="button" onClick={onRestart} className="text-caption underline underline-offset-4">
          Start again
        </button>
      </div>
    </MobileScreen>
  );
}
