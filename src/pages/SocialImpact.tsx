import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { MobileScreen, PageTitle, PageTopBar } from "@/components/layout";
import { Button, Card, Icon, List, PendingQuestionRow, QARow, RadarChart, SectionHeader, TextArea } from "@/components/ui";
import { conversations, faq, featuredArtwork as art, feelings, inspiration, instagram, stories } from "@/data/mock";
import { creativityWorkImages, instagramImages } from "@/lib/assetImages";
import { useCreativeWorks } from "@/lib/creativeWorks";
import { useMyFeelings } from "@/lib/myFeelings";
import { useMyQuestions } from "@/lib/myQuestions";
import { useRotatingIndex } from "@/lib/useRotatingStory";

export default function SocialImpact() {
  const [question, setQuestion] = useState("");
  const { questions: myQuestions, ask } = useMyQuestions();
  // A different borrower story each time the page is opened.
  const story = stories[useRotatingIndex(stories.length)];
  const { works: myWorks } = useCreativeWorks();
  const myFeelings = useMyFeelings();
  const gallery = [
    ...myWorks.map((w) => ({ key: w.id, url: w.imageUrl, label: w.author })),
    ...creativityWorkImages.map((a) => ({ key: a.url, url: a.url, label: a.label })),
  ];
  const { hash } = useLocation();

  // Coming back from the camera: jump to the gallery so the new photo is in view.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
  }, [hash]);

  return (
    <MobileScreen area="social">
      <PageTopBar />
      <PageTitle title="Social impact" lead="What this painting sparks in the homes it visits." />

      <section className="flex flex-col gap-2.5 px-6 pb-10" aria-label="Conversations">
        <Card className="flex flex-col gap-4">
          <div className="flex items-end gap-3">
            <span className="text-[64px] leading-[60px] font-light tracking-hero">{conversations.count}</span>
            <span className="pb-1 text-body">
              conversations
              <br />
              started by this painting
            </span>
          </div>
          <Link
            to="/social/conversations"
            className="flex h-11 items-center justify-center rounded-pill bg-area text-body text-ink transition-[filter] hover:brightness-95"
          >
            Let's talk
          </Link>
        </Card>
        <Card tone="ink" className="flex flex-col gap-3.5">
          <blockquote className="text-title font-light">{story.quote}</blockquote>
          <div className="flex items-center justify-between gap-3">
            <span className="text-caption text-area">— {story.author}</span>
            <Link
              to={`/social/stories#${story.id}`}
              className="flex shrink-0 items-center gap-1 text-caption text-white underline decoration-1 underline-offset-4"
            >
              Read more <Icon name="arrow-right" size={14} />
            </Link>
          </div>
        </Card>
      </section>

      <section id="feelings" className="flex scroll-mt-4 flex-col gap-3 px-6 pb-10">
        <SectionHeader title="How it makes people feel" className="[&>div]:pb-0" />
        <p className="text-caption leading-5 text-area-ink">
          Answers from {feelings.respondents} borrowers to «{feelings.question}»
        </p>
        {myFeelings ? (
          <>
            {/* Revealed after the survey: your answer (filled) against how others answered (outline). */}
            <RadarChart axes={feelings.axes} mine={myFeelings.values} />
            <p className="flex items-center gap-1.5 text-caption" role="status">
              <Icon name="check" size={14} /> Your feelings are in the chart
              {myFeelings.word && <span className="text-area-ink">· «{myFeelings.word}»</span>}
            </p>
          </>
        ) : (
          // Locked: the chart is blurred until you add how you feel.
          <div className="relative">
            <RadarChart axes={feelings.axes} blurred />
            <div className="absolute inset-0 flex items-center justify-center">
              <Link
                to="/social/feelings"
                className="flex h-12 items-center gap-2 rounded-pill bg-ink px-6 text-body text-area shadow-[0_6px_20px_-6px_var(--color-ink)] hover:bg-ink-soft"
              >
                <Icon name="plus" size={18} /> How you feel
              </Link>
            </div>
          </div>
        )}
      </section>

      <section id="creativity-work" className="flex scroll-mt-4 flex-col gap-3 px-6 pb-10">
        <SectionHeader
          title="Creativity work"
          meta={`${Math.max(inspiration.total, creativityWorkImages.length) + myWorks.length} works`}
          className="[&>div]:pb-0"
        />
        <p className="text-caption leading-5 text-area-ink">
          Drawings, photos and poems made by borrowers after living with {art.title}.
        </p>
        {/* Gallery: photos taken in the app (newest first), then pictures from src/assets/creativity-work/.
            Empty placeholder tiles only fill the row up to 3 — each new photo takes a placeholder's place. */}
        <ul className="grid grid-cols-3 gap-2">
          {gallery.map((g) => (
            <li key={g.key} className="flex flex-col gap-1">
              <img src={g.url} alt={`Work by ${g.label}`} className="h-30 w-full rounded-md object-cover" />
              <span className="text-micro">{g.label}</span>
            </li>
          ))}
          {Array.from({ length: Math.max(0, 3 - gallery.length) }, (_, i) => (
            <li key={`empty-${i}`} className="flex flex-col gap-1" aria-hidden="true">
              <div className="h-30 rounded-md bg-orange-300" />
              <span className="text-micro">&nbsp;</span>
            </li>
          ))}
        </ul>
        <Link
          to="/social/creativity-work/camera"
          className="flex h-11 items-center justify-center gap-2 rounded-pill bg-ink text-body text-area hover:bg-ink-soft"
        >
          <Icon name="camera" /> Photograph your work
        </Link>
      </section>

      <section className="px-6 pb-10" aria-label="Instagram">
        <Card className="flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-lead">{instagram.name} on Instagram</h2>
            <Icon name="instagram" size={20} />
          </div>
          {/* First 3 pictures from src/assets/instagram/; plain tiles until there are 3. */}
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) =>
              instagramImages[i] ? (
                <img key={i} src={instagramImages[i].url} alt="" className="h-24 min-w-0 flex-1 rounded-sm object-cover" />
              ) : (
                <div key={i} className="h-24 flex-1 rounded-sm bg-stone" aria-hidden="true" />
              ),
            )}
          </div>
          <p className="text-body">Show us where the painting lives in your home.</p>
          <p className="text-caption font-medium text-area-strong">{instagram.hashtags}</p>
          <Link
            to="/social/instagram"
            className="flex h-11 items-center justify-center rounded-pill border border-ink text-body hover:bg-ink/5"
          >
            Follow @{instagram.handle} ↗
          </Link>
        </Card>
      </section>

      <section className="flex flex-col px-6 pb-10">
        <SectionHeader title="Artwork Q&A" subtitle="People also asked …" />
        <List>
          {faq.map((q) => (
            <QARow key={q.id} question={q.question}>
              {q.answer}
            </QARow>
          ))}
          {/* Your questions: shown right away, marked Pending until the team answers. */}
          {myQuestions.map((q) => (
            <PendingQuestionRow key={q.id} question={q.question} note="Your question · we'll answer it here" />
          ))}
        </List>
        <form
          className="flex flex-col gap-2.5 pt-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!question.trim()) return;
            ask(question);
            setQuestion("");
          }}
        >
          <span className="text-micro tracking-wide text-area-ink" aria-hidden="true">
            Submit your question
          </span>
          <TextArea
            label="Submit your question"
            placeholder="What would you like to know?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-24"
          />
          <Button type="submit" block disabled={!question.trim()}>
            Send question
          </Button>
        </form>
      </section>
    </MobileScreen>
  );
}
