// Staff › Artworks › Tulipes (Paper: Desktop/Staff/Artwork – Tulipes + Mobile/Staff/Artwork – Tulipes).
import { useState } from "react";
import { ConversationsPerLoanChart, LightWeekChart, LoanTimelineChart } from "@/components/staff/charts";
import { AreaTile, AreaTiles, ArtworkThumb, BlockHead, KpiRow, SensorCell, SurveyPill, TileFooter } from "@/components/staff/parts";
import { StaffShell } from "@/components/staff/StaffShell";
import { StatusDot } from "@/components/ui";
import { featuredArtwork as art } from "@/data/mock";
import { loansOfArtwork, staffArtwork as s, staffArtworkOptions, waitingList, type LoanRowStatus } from "@/data/staff";
import { cn } from "@/lib/cn";

export default function StaffArtwork() {
  return (
    <StaffShell>
      <ArtworkHeader />
      <AreaTiles>
        <ArtworkTile />
        <SocialTile />
        <ConservationTile />
      </AreaTiles>
      <LoansOfArtwork />
    </StaffShell>
  );
}

function ArtworkHeader() {
  return (
    <div className="flex flex-col gap-4 pt-5 pb-6 desk:flex-row desk:items-end desk:justify-between desk:pt-6 desk:pb-7">
      <div className="flex flex-col gap-3 desk:flex-row desk:items-end desk:gap-5">
        {/* Mobile: status pill on top; desktop: inline next to the meta. */}
        <StatusPill className="self-start desk:hidden" />
        <div className="flex items-end gap-4 desk:gap-5">
          <ArtworkThumb title={art.title} className="h-[100px] w-20 border border-ink desk:h-[140px] desk:w-28" />
          <div className="flex flex-col gap-1 desk:gap-2">
            <div className="hidden items-center gap-2 desk:flex">
              <StatusPill />
              <span className="text-[13px] leading-4 text-ink-muted">{s.meta}</span>
            </div>
            <h1 className="text-[48px] leading-[48px] tracking-hero desk:text-hero">{art.title}</h1>
            <p className="text-caption desk:text-lead">
              {art.artist}, {art.period}
            </p>
          </div>
        </div>
        <span className="text-micro text-ink-muted desk:hidden">{s.meta}</span>
      </div>
      <ArtworkSwitch />
    </div>
  );
}

function StatusPill({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex h-7 items-center gap-1.5 rounded-pill border border-ink bg-area-artwork px-3 text-[13px] leading-4", className)}>
      <span className="size-[7px] rounded-pill bg-ink" aria-hidden="true" />
      {s.status}
    </span>
  );
}

/** "Switch artwork" select. Only Tulipes has data in the prototype; the others are listed but disabled. */
function ArtworkSwitch() {
  return (
    <label className="relative flex h-[42px] items-center rounded-pill border border-ink desk:mb-1">
      <span className="sr-only">Switch artwork</span>
      <select
        defaultValue={art.title}
        className="h-full w-full cursor-pointer appearance-none rounded-pill bg-transparent pr-10 pl-4 text-caption outline-none"
      >
        {staffArtworkOptions.map((o) => (
          <option key={o.title} value={o.title} disabled={!o.ready}>
            {o.title} · {o.artist}
            {o.ready ? "" : " (soon)"}
          </option>
        ))}
      </select>
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4" aria-hidden="true">
        <path d="M3.5 6l4.5 4.5L12.5 6" />
      </svg>
    </label>
  );
}

function ArtworkTile() {
  return (
    <AreaTile area="artwork" note={s.artwork.note} title="Artwork information" footer={<TileFooter label="Full record & loans" to="/artwork" />}>
      <KpiRow items={s.artwork.kpis} />
      <div className="flex flex-col gap-2">
        <BlockHead title="Loan timeline 2026" note={s.artwork.timelineNote} area="artwork" />
        <LoanTimelineChart />
      </div>
      <div className="flex flex-col">
        <h3 className="pb-2 text-caption font-medium">Record &amp; condition</h3>
        <dl>
          {s.artwork.record.map((r) => (
            <div key={r.label} className="flex justify-between gap-3 border-t border-scrim-line py-2 last:border-b">
              <dt className="text-caption">{r.label}</dt>
              <dd className="text-right text-[13px] leading-[18px] text-mint-900">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </AreaTile>
  );
}

function SocialTile() {
  return (
    <AreaTile area="social" note={s.social.note} title="Social impact" footer={<TileFooter label="All conversations & surveys" to="/social" />}>
      <KpiRow items={s.social.kpis} />
      <div className="flex flex-col gap-2">
        <BlockHead title="Conversations per loan" note={s.social.average} area="social" />
        <ConversationsPerLoanChart />
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-caption font-medium">What people talk about</h3>
        <ul className="flex flex-wrap gap-1.5">
          {s.social.topics.map((t) => (
            <li
              key={t.label}
              className={cn("flex h-[30px] items-center gap-1.5 rounded-pill border border-ink px-3 text-[13px] leading-4", t.top && "bg-orange-600")}
            >
              {t.label} <span className="text-micro font-medium">{t.count}</span>
            </li>
          ))}
        </ul>
        <figure className="flex flex-col gap-1 border border-ink px-3.5 py-3">
          <blockquote className="text-body">{s.social.latestNote.quote}</blockquote>
          <figcaption className="text-micro text-orange-900">{s.social.latestNote.meta}</figcaption>
        </figure>
      </div>
    </AreaTile>
  );
}

function ConservationTile() {
  const [messaged, setMessaged] = useState(false);
  const [seen, setSeen] = useState(false);

  return (
    <AreaTile
      area="conservation"
      note={
        <span className="flex items-center gap-1.5">
          <span className="size-[7px] shrink-0 rounded-pill border border-ink bg-status-ok" aria-hidden="true" />
          {s.conservation.note}
        </span>
      }
      title="Conservation"
      footer={<TileFooter label="Sensor history & care log" to="/conservation" />}
    >
      <KpiRow items={s.conservation.kpis} />
      <div className="flex flex-col gap-2">
        <BlockHead title="Light, last 7 days" note={s.conservation.lightNote} area="conservation" />
        <LightWeekChart />
      </div>
      <div className={cn("flex flex-col gap-3 border border-ink p-4", seen && "opacity-[var(--opacity-muted)]")} role="status">
        <div className="flex items-center gap-2">
          <StatusDot status={seen ? "watch" : "action"} className="border border-ink" />
          <span className="text-caption font-medium">{seen ? "Seen · light too high since 10:00" : s.conservation.alert.title}</span>
        </div>
        <p className="text-caption leading-5">{s.conservation.alert.body}</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMessaged(true)}
            disabled={messaged}
            className="flex h-[34px] items-center rounded-pill border border-ink bg-blue-600 px-4 text-caption hover:brightness-95 disabled:bg-transparent"
          >
            {messaged ? "✓ Message sent" : "Message borrower"}
          </button>
          <button
            type="button"
            onClick={() => setSeen((v) => !v)}
            aria-pressed={seen}
            className="flex h-[34px] items-center rounded-pill border border-ink px-4 text-caption hover:bg-ink/5"
          >
            {seen ? "Undo" : "Mark as seen"}
          </button>
        </div>
      </div>
    </AreaTile>
  );
}

const statusPill: Record<LoanRowStatus, string> = {
  returned: "border border-ink",
  current: "bg-ink text-white",
  next: "border border-ink bg-highlight",
  waiting: "border border-ink",
};

function LoanStatus({ status, children }: { status: LoanRowStatus; children: string }) {
  return <span className={cn("inline-flex rounded-pill px-2.5 py-0.5 text-micro whitespace-nowrap", statusPill[status])}>{children}</span>;
}

function ConfirmButton() {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setConfirmed((v) => !v)}
      aria-pressed={confirmed}
      className={cn(
        "flex h-[30px] items-center rounded-pill border border-ink px-3.5 text-[13px] leading-4 whitespace-nowrap",
        confirmed ? "bg-white" : "bg-highlight hover:bg-pink-soft",
      )}
    >
      {confirmed ? "Confirmed ✓" : "Confirm"}
    </button>
  );
}

function LoansOfArtwork() {
  const loans = loansOfArtwork.filter((l) => l.status === "returned" || l.status === "current");
  const waiting = loansOfArtwork.filter((l) => l.status === "next" || l.status === "waiting");

  const WaitingHeader = () => (
    <div className="flex flex-wrap items-baseline gap-x-2.5 border-b border-ink bg-highlight px-3 py-2.5">
      <span className="text-caption font-medium">Waiting list</span>
      <span className="text-[13px] leading-4">{waitingList.summary}</span>
    </div>
  );

  return (
    <section aria-labelledby="loans" className="flex flex-col pt-10 desk:pt-7">
      <div className="flex items-baseline justify-between gap-3 border-b border-ink pb-3">
        <div className="flex flex-col desk:flex-row desk:items-baseline desk:gap-4">
          <h2 id="loans" className="text-title tracking-[-0.01em] desk:text-headline">
            Loans of {art.title}
          </h2>
          <span className="text-micro text-ink-muted desk:text-caption">{s.loansSummary}</span>
        </div>
        {/* TODO: real export. */}
        <span className="text-caption underline decoration-1 underline-offset-[3px]">Export ↗</span>
      </div>

      {/* Desktop: table. */}
      <table className="hidden w-full desk:table">
        <thead>
          <tr className="border-b border-line text-left text-micro tracking-wide text-ink-muted">
            <th className="w-11 py-2.5 font-light">#</th>
            <th className="py-2.5 font-light">Borrower</th>
            <th className="w-[200px] py-2.5 font-light">Period</th>
            <th className="w-[120px] py-2.5 font-light">Status</th>
            <th className="w-[110px] py-2.5 font-light">Conversations</th>
            <th className="w-[120px] py-2.5 font-light">Survey</th>
            <th className="w-[150px] py-2.5 font-light">Sensor / wall</th>
            <th className="w-24 py-2.5">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {loans.map((l) => (
            <LoanTableRow key={l.n} loan={l} />
          ))}
          <tr>
            <td colSpan={8} className="p-0">
              <WaitingHeader />
            </td>
          </tr>
          {waiting.map((l) => (
            <LoanTableRow key={l.n} loan={l} />
          ))}
        </tbody>
      </table>

      {/* Mobile: row list. */}
      <ul className="desk:hidden">
        {loans.map((l) => (
          <LoanListRow key={l.n} loan={l} />
        ))}
        <li>
          <WaitingHeader />
        </li>
        {waiting.map((l) => (
          <LoanListRow key={l.n} loan={l} />
        ))}
      </ul>

      <p className="pt-3 text-caption underline decoration-1 underline-offset-[3px]">{waitingList.more}</p>
    </section>
  );
}

type Loan = (typeof loansOfArtwork)[number];
const dash = <span className="text-ink-muted">–</span>;

function LoanTableRow({ loan: l }: { loan: Loan }) {
  const current = l.status === "current";
  return (
    <tr className={cn("border-b", current ? "border-ink" : "border-line")}>
      <td className="py-3.5 text-[13px] leading-4 text-ink-muted">{l.n}</td>
      <td className={cn("py-3.5 pr-4", current && "font-medium")}>{l.borrower}</td>
      <td className={cn("py-3.5 pr-4 text-caption", current && "font-medium")}>{l.period}</td>
      <td className="py-3.5 pr-4">
        <LoanStatus status={l.status}>{l.statusLabel}</LoanStatus>
      </td>
      <td className="py-3.5 pr-4 text-caption">{l.conversations ?? dash}</td>
      <td className="py-3.5 pr-4 text-caption">{l.survey ? <SurveyPill state={l.survey.state}>{l.survey.label}</SurveyPill> : dash}</td>
      <td className="py-3.5 pr-4">
        {l.sensor && (
          <SensorCell status={l.sensor.status} muted={l.status === "waiting"}>
            {l.sensor.label}
          </SensorCell>
        )}
      </td>
      <td className="py-3.5 text-right">{l.status === "next" && <ConfirmButton />}</td>
    </tr>
  );
}

function LoanListRow({ loan: l }: { loan: Loan }) {
  const current = l.status === "current";
  const isQueue = l.status === "next" || l.status === "waiting";
  return (
    <li className={cn("flex flex-col gap-1.5 border-b py-3.5", current ? "border-ink" : "border-line")}>
      <div className="flex items-center justify-between gap-3">
        <span className={cn("text-body", current && "font-medium")}>{l.borrower}</span>
        {l.status === "next" ? (
          <ConfirmButton />
        ) : l.status === "waiting" ? (
          <span className="inline-flex rounded-pill border border-ink px-2.5 py-0.5 text-micro">#{l.statusLabel.split("#")[1]}</span>
        ) : (
          <LoanStatus status={l.status}>{l.statusLabel}</LoanStatus>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-micro text-ink-muted">
        <span className={cn(current && "font-medium text-ink")}>{l.period}</span>
        {l.status === "next" && <LoanStatus status="next">Next</LoanStatus>}
        {isQueue && l.sensor && <span>· {l.sensor.label}</span>}
      </div>
      {!isQueue && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-micro">
          <span className="text-ink-muted">{l.conversations} conversations</span>
          {l.survey && <SurveyPill state={l.survey.state}>{l.survey.label}</SurveyPill>}
          {l.sensor && <SensorCell status={l.sensor.status}>{l.sensor.label}</SensorCell>}
        </div>
      )}
    </li>
  );
}
