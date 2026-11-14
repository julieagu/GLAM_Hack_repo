import { ImageViewer } from "@/components/features/ImageViewer";
import { LoanCard } from "@/components/features/LoanCard";
import { FooterTabs, MobileScreen, PageTitle, PageTopBar } from "@/components/layout";
import { KeyValueRow, List, PersonRow, SectionHeader, Tag, TimelineRow } from "@/components/ui";
import { currentLoan, featuredArtwork as art, previousRenters } from "@/data/mock";
import { useArtworkImages } from "@/lib/useArtworkImages";

/** Underlined external link; rendered as plain text until the URL is known. */
function ExternalLink({ href, children }: { href?: string; children: string }) {
  const cls = "text-body underline decoration-1 underline-offset-4";
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {children}
    </a>
  ) : (
    <span className={cls} aria-disabled="true">
      {children}
    </span>
  );
}

export default function ArtworkInfo() {
  const images = useArtworkImages(art.title);

  return (
    <MobileScreen area="artwork" footer={<FooterTabs />}>
      <PageTopBar />
      <PageTitle title={art.title} lead={`${art.artist}, ${art.period}`} />

      <section className="px-6 pb-6" aria-label="Images">
        <ImageViewer images={images} alt={`${art.title} by ${art.artist}`} placeholderCount={art.imageCount} />
      </section>

      <section className="px-6 pb-10" aria-label="Your loan">
        <LoanCard start={currentLoan.start} end={currentLoan.end} returnSteps={currentLoan.returnSteps} />
      </section>

      <section className="px-6 pb-10">
        <SectionHeader
          title="Artwork data"
          meter={{ value: art.documented, label: `${Math.round(art.documented * 100)}% documented` }}
        />
        <List>
          <KeyValueRow label="Inventory no.">{art.inventoryNo}</KeyValueRow>
          <KeyValueRow label="Artist">
            <span className="underline underline-offset-2">{art.artistFull}</span>
          </KeyValueRow>
          <KeyValueRow label="Title">
            {art.title}
            <br />
            {art.titleAlt}
          </KeyValueRow>
          <KeyValueRow label="Date">{art.dateLabel}</KeyValueRow>
          <KeyValueRow label="Technique">{art.techniqueFull}</KeyValueRow>
          <KeyValueRow label="Size">
            {art.size}
            <br />
            Frame {art.frameSize}
          </KeyValueRow>
          <KeyValueRow label="Acquired">{art.acquired}</KeyValueRow>
          <KeyValueRow label="Keywords">
            <span className="flex flex-wrap gap-1.5">
              {art.keywords.map((k) => (
                <Tag key={k}>{k}</Tag>
              ))}
            </span>
          </KeyValueRow>
        </List>
      </section>

      <section className="flex flex-col gap-3 px-6 pb-10">
        <SectionHeader title="History" className="[&>div]:pb-0" />
        <p className="text-lead">{art.history.lead}</p>
        <p className="text-body">{art.history.body}</p>
        <List className="mt-1">
          {art.history.timeline.map((t) => (
            <TimelineRow key={t.year} year={t.year}>
              {t.event}
            </TimelineRow>
          ))}
        </List>
      </section>

      <section className="px-6 pb-10">
        <SectionHeader title="Who rented it before" meta={`${previousRenters.length + 1} loans`} />
        <List>
          {previousRenters.map((r) => (
            <PersonRow key={r.name} initial={r.initial} name={r.name} note={r.note} date={r.period} />
          ))}
          <PersonRow initial="You" isCurrentUser name="Your loan" note="Add a note for the next person" date="Since Jul 26" />
        </List>
      </section>

      <section className="flex flex-col items-start gap-2 px-6 pb-10" aria-label="Links">
        <ExternalLink href={art.recordUrl}>Full record in Sammlung digital ↗</ExternalLink>
        <ExternalLink href={art.documentationUrl}>Documentation (PDF) ↗</ExternalLink>
      </section>
    </MobileScreen>
  );
}
