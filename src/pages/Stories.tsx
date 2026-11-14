import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { MobileScreen, PageTitle, PageTopBar } from "@/components/layout";
import { Icon, TextArea } from "@/components/ui";
import { featuredArtwork as art, stories as seedStories, type Story } from "@/data/mock";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "artothek:my-stories";

// Prototype only: stories you add are kept in this browser (localStorage).
// TODO: send to the Artothek backend so everyone sees them.
function loadMine(): Story[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Story[];
  } catch {
    return [];
  }
}

/** Headline from the text: the first sentence if short, otherwise the first words. */
function titleFrom(text: string): string {
  const first = text.split(/(?<=[.!?])\s/)[0].replace(/[.!?]$/, "");
  if (first.length <= 40) return first;
  return first.split(/\s+/).slice(0, 5).join(" ") + " …";
}

/**
 * All borrower stories («Read more» from Social impact).
 * Layout after Paper Frame_reference_6: a plain list on the area colour —
 * outlined circle · large light headline · date on the right · indented text.
 * The story you came from (or just added) has a filled circle.
 * A text box at the end adds your story straight to the list.
 */
export default function Stories() {
  const { hash } = useLocation();
  const [mine, setMine] = useState<Story[]>(loadMine);
  const [text, setText] = useState("");
  const [active, setActive] = useState(hash.slice(1));

  // Your stories go at the end, right above the text box, so a new one appears where you typed it.
  const all = [...seedStories, ...mine];

  // Scroll to the linked story (from «Read more»).
  useEffect(() => {
    const id = hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, [hash]);

  function addStory() {
    const body = text.trim();
    if (!body) return;
    const story: Story = {
      id: `mine-${Date.now()}`,
      title: titleFrom(body),
      quote: `«${body}»`,
      full: body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
      author: "You",
      period: new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
    };
    const next = [...mine, story];
    setMine(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable: story still shows until the page is left */
    }
    setText("");
    setActive(story.id);
  }

  return (
    <MobileScreen area="social">
      <PageTopBar backTo="/social" backLabel="Social impact" />
      <PageTitle title="Stories" lead={`What people remember from living with ${art.title}.`} />

      <ol className="flex flex-col gap-14 px-6 pb-14">
        {all.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id} id={s.id} className="scroll-mt-6">
              <article className="flex flex-col gap-3">
                <header className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={cn("mt-3 size-3 shrink-0 rounded-pill border border-ink transition-colors", isActive && "bg-ink")}
                  />
                  <h2 className="min-w-0 flex-1 text-title font-light">{s.title}</h2>
                  <span className="shrink-0 pt-1.5 text-micro text-area-ink">{s.period}</span>
                </header>
                <div className="flex flex-col gap-2 pl-6 text-body">
                  {s.full.map((p) => (
                    <p key={p} className="whitespace-pre-line">
                      {p}
                    </p>
                  ))}
                  <p className="text-caption text-area-ink">— {s.author}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      {/* Add your story: it appears at the end of the list, just above this box, as soon as it's sent. */}
      <form
        className="px-6 pb-10"
        onSubmit={(e) => {
          e.preventDefault();
          addStory();
        }}
      >
        <TextArea
          label="Your story"
          placeholder={`What happened while ${art.title} lived with you?`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) addStory();
          }}
          rows={4}
          footer={
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!text.trim()}
                aria-label="Add my story"
                className="flex size-9 items-center justify-center rounded-pill bg-ink text-area transition-opacity disabled:opacity-(--opacity-disabled)"
              >
                <Icon name="arrow-up" size={16} />
              </button>
            </div>
          }
        />
      </form>
    </MobileScreen>
  );
}
