import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { FooterTabs, MobileScreen, PageTitle, PageTopBar } from "@/components/layout";
import { Button, Card, Icon, List, PendingQuestionRow, QARow, RadarChart, SectionHeader, TextArea } from "@/components/ui";
import { conversations, faq, featuredArtwork as art, feelings, inspiration, instagram, stories } from "@/data/mock";
import { useCreativeWorks } from "@/lib/creativeWorks";
import { useMyQuestions } from "@/lib/myQuestions";
import { useArtworkImages } from "@/lib/useArtworkImages";
import { useRotatingIndex } from "@/lib/useRotatingStory";

export default function SocialImpact() {
  const [question, setQuestion] = useState("");
  const { questions: myQuestions, ask } = useMyQuestions();
  // Until borrowers' uploads exist, show the artwork itself as Instagram placeholders.
  const photos = useArtworkImages(art.title, 300);
  // A different borrower story each time the page is opened.
  const story = stories[useRotatingIndex(stories.length)];
  const { works: myWorks } = useCreativeWorks();
  const { hash } = useLocation();

  // Coming back from the camera: jump to the gallery so the new photo is in view.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
  }, [hash]);

  return (
    <MobileScreen area="social" footer={<FooterTabs />}>
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

      <section className="flex flex-col gap-3 px-6 pb-10">
        <SectionHeader title="How it makes people feel" className="[&>div]:pb-0" />
        <p className="text-caption leading-5 text-area-ink">
          Answers from {feelings.respondents} borrowers to «{feelings.question}»
        </p>
        <RadarChart axes={feelings.axes} />
        <Button variant="secondary" size="sm" block>
          Add how you feel
        </Button>
      </section>

      <section id="creativity-work" className="flex scroll-mt-4 flex-col gap-3 px-6 pb-10">
        <SectionHeader
          title="Creativity work"
          meta={`${inspiration.total + myWorks.length} works`}
          className="[&>div]:pb-0"
        />
        <p className="text-caption leading-5 text-area-ink">
          Drawings, photos and poems made by borrowers after living with {art.title}.
        </p>
        {/* Gallery: your photos first (newest first), then other borrowers' works. */}
        <ul className="grid grid-cols-3 gap-2">
          {myWorks.map((w) => (
            <li key={w.id} className="flex flex-col gap-1">
              <img src={w.imageUrl} alt="Your work" className="h-30 w-full rounded-md object-cover" />
              <span className="text-micro">{w.author}</span>
            </li>
          ))}
          {inspiration.works.map((w) => (
            <li key={w.author} className="flex flex-col gap-1">
              <div
                className="h-30 rounded-md bg-orange-300 bg-cover bg-center"
                style={w.imageUrl ? { backgroundImage: `url(${w.imageUrl})` } : undefined}
                role="img"
                aria-label={`Work by ${w.author}`}
              />
              <span className="text-micro">{w.author}</span>
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
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-24 flex-1 rounded-sm bg-stone bg-cover bg-center"
                style={photos[i] ? { backgroundImage: `url(${photos[i]})` } : undefined}
              />
            ))}
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
