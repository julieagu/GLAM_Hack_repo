import { useState } from "react";
import { Link } from "react-router";
import { FooterTabs, MobileScreen, PageTitle, PageTopBar } from "@/components/layout";
import { Button, Card, Icon, List, NavRow, RadarChart, SectionHeader, TextArea } from "@/components/ui";
import { conversations, faq, featuredArtwork as art, feelings, inspiration, instagram } from "@/data/mock";
import { useArtworkImages } from "@/lib/useArtworkImages";

export default function SocialImpact() {
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);
  // Until borrowers' uploads exist, show the artwork itself as Instagram placeholders.
  const photos = useArtworkImages(art.title, 300);

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
          <div className="flex gap-2">
            <Link
              to="/social/conversations"
              className="flex h-11 flex-1 items-center justify-center rounded-pill bg-area text-body text-ink transition-[filter] hover:brightness-95"
            >
              Start one
            </Link>
            <Button size="sm" variant="secondary" className="flex-1">
              Read them
            </Button>
          </div>
        </Card>
        <Card tone="ink" className="flex flex-col gap-3.5">
          <blockquote className="text-title font-light">{conversations.featured.quote}</blockquote>
          <div className="flex items-center justify-between">
            <span className="text-caption text-area">— {conversations.featured.author}</span>
            <span className="text-micro text-on-ink-muted">1 of {conversations.count}</span>
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

      <section className="flex flex-col gap-3 px-6 pb-10">
        <SectionHeader title="Inspiration hub" meta={`${inspiration.total} works`} className="[&>div]:pb-0" />
        <p className="text-caption leading-5 text-area-ink">
          Drawings, photos and poems made by borrowers after living with {art.title}.
        </p>
        <ul className="flex gap-2">
          {inspiration.works.map((w) => (
            <li key={w.author} className="flex flex-1 flex-col gap-1">
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
        <Button size="sm" block iconStart={<Icon name="arrow-up" />}>
          Upload your art
        </Button>
      </section>

      <section className="px-6 pb-10" aria-label="Instagram">
        <Card className="flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-lead">SKKG on Instagram</h2>
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
          <a
            href={instagram.url}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 items-center justify-center rounded-pill border border-ink text-body hover:bg-ink/5"
          >
            Follow @{instagram.handle} ↗
          </a>
        </Card>
      </section>

      <section className="flex flex-col px-6 pb-10">
        <SectionHeader title="Artwork Q&A" subtitle="People also asked …" />
        <List>
          {faq.map((q) => (
            <NavRow key={q.id} to={`/qa#${q.id}`}>
              {q.question}
            </NavRow>
          ))}
        </List>
        <div className="flex flex-col gap-2.5 pt-5">
          <span className="text-micro tracking-wide text-area-ink">Submit your question</span>
          {sent ? (
            <Card role="status">Thanks — your question will be answered here soon.</Card>
          ) : (
            <form
              className="flex flex-col gap-2.5"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: send to the Artothek backend.
                setSent(true);
              }}
            >
              <TextArea
                label="Your question"
                placeholder="What would you like to know?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-24"
              />
              <Button type="submit" block disabled={!question.trim()}>
                Send question
              </Button>
            </form>
          )}
        </div>
      </section>
    </MobileScreen>
  );
}
