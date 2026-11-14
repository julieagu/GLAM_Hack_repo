// Staff › Overview (Paper: Desktop/Staff/Overview + Mobile/Staff/Overview).
import { Link } from "react-router";
import { ConversationsChart, LoansPerMonthChart, MeterRow, RangeRow, SensorStatusBar } from "@/components/staff/charts";
import {
  AreaTile,
  AreaTiles,
  ArtworkThumb,
  BlockHead,
  KpiRow,
  SensorCell,
  SurveyPill,
  TileFooter,
} from "@/components/staff/parts";
import { StaffShell, StaffTitle } from "@/components/staff/StaffShell";
import { StatusDot } from "@/components/ui";
import { latestFromApp, overview, returnsThisWeek } from "@/data/staff";

export default function StaffOverview() {
  const { artwork, social, conservation } = overview;

  return (
    <StaffShell>
      <StaffTitle
        title="Artothek overview"
        actions={
          // TODO: real report export.
          <button type="button" className="hidden h-[42px] items-center rounded-pill border border-ink px-4.5 text-caption hover:bg-ink/5 desk:flex">
            Export report ↗
          </button>
        }
      />

      <AreaTiles>
        <AreaTile area="artwork" note={artwork.note} title="Artwork information" footer={<TileFooter label="Collection & loans" to="/staff/artworks" />}>
          <KpiRow items={artwork.kpis} />
          <div className="flex flex-col gap-2">
            <BlockHead title="Loans per month" note={artwork.loansPerMonth.trend} area="artwork" />
            <LoansPerMonthChart months={artwork.loansPerMonth.months} values={artwork.loansPerMonth.values} />
          </div>
          <div className="flex flex-col">
            <h3 className="pb-2 text-caption font-medium">Most requested</h3>
            <ol>
              {artwork.mostRequested.map((w, i) => {
                const name = `${w.title} · ${w.artist}`;
                return (
                  <li key={w.title} className="flex items-center gap-2.5 border-t border-scrim-line py-2 last:border-b">
                    <span className="w-4 shrink-0 text-micro font-medium">{i + 1}</span>
                    {w.to ? (
                      <Link to={w.to} className="flex-1 text-caption underline decoration-1 underline-offset-2">
                        {name}
                      </Link>
                    ) : (
                      <span className="flex-1 text-caption">{name}</span>
                    )}
                    <span className="shrink-0 text-micro text-mint-900">{w.meta}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </AreaTile>

        <AreaTile area="social" note={social.note} title="Social impact" footer={<TileFooter label="Conversations, surveys, stories" />}>
          <KpiRow items={social.kpis} />
          <div className="flex flex-col gap-2">
            <BlockHead title="Conversations per week" note={social.perWeek.note} area="social" />
            <ConversationsChart points={social.perWeek.points} labels={social.perWeek.labels} />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="pb-0.5 text-caption font-medium">How the works make people feel</h3>
            {social.feelings.map((f) => (
              <MeterRow key={f.label} label={f.label} value={f.value} />
            ))}
          </div>
        </AreaTile>

        <AreaTile area="conservation" note={conservation.note} title="Conservation" footer={<TileFooter label="Sensors, care & questions" />}>
          <KpiRow items={conservation.kpis} />
          <div className="flex flex-col gap-2">
            <h3 className="text-caption font-medium">Sensor status</h3>
            <SensorStatusBar {...conservation.sensorStatus} />
          </div>
          <div className="flex flex-col">
            <h3 className="pb-2 text-caption font-medium">Average across homes</h3>
            {conservation.averages.map((a) => (
              <RangeRow key={a.label} {...a} />
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="pb-0.5 text-caption font-medium">Needs action</h3>
            {conservation.needsAction.map((n) => {
              const body = (
                <>
                  <StatusDot status="action" />
                  <span className="flex-1 text-[13px] leading-[18px]">
                    <span className="font-medium">{n.title}</span> · {n.detail}
                  </span>
                  <span className="text-micro text-blue-900">{n.ago}</span>
                </>
              );
              const cls = "flex items-center gap-2.5 rounded-sm border border-ink px-3 py-2.5";
              return n.to ? (
                <Link key={n.title} to={n.to} className={`${cls} hover:bg-ink/5`}>
                  {body}
                </Link>
              ) : (
                <div key={n.title} className={cls}>
                  {body}
                </div>
              );
            })}
          </div>
        </AreaTile>
      </AreaTiles>

      <div className="flex flex-col gap-10 pt-10 desk:flex-row desk:gap-3 desk:pt-7">
        <ReturnsThisWeek />
        <LatestFromApp />
      </div>
    </StaffShell>
  );
}

function ReturnsThisWeek() {
  return (
    <section aria-labelledby="returns" className="flex flex-col desk:flex-2 desk:basis-0">
      <div className="flex items-baseline justify-between gap-3 border-b border-ink pb-3">
        <h2 id="returns" className="text-title tracking-[-0.01em] desk:text-headline">
          Returns this week
        </h2>
        {/* TODO: all-loans list. */}
        <span className="text-caption underline decoration-1 underline-offset-[3px]">All loans ↗</span>
      </div>

      {/* Desktop: table. */}
      <table className="hidden w-full desk:table">
        <thead>
          <tr className="border-b border-line text-left text-micro tracking-wide text-ink-muted">
            <th className="py-2.5 font-light">Work</th>
            <th className="py-2.5 font-light">Borrower</th>
            <th className="w-24 py-2.5 font-light">Due</th>
            <th className="w-28 py-2.5 font-light">Survey</th>
            <th className="w-30 py-2.5 font-light">Sensor</th>
          </tr>
        </thead>
        <tbody>
          {returnsThisWeek.map((r) => (
            <tr key={r.title} className="border-b border-line">
              <td className="py-3 pr-4">
                <span className="flex items-center gap-2.5">
                  <ArtworkThumb title={r.title} className="h-7 w-6 rounded-[4px]" />
                  {r.title} · {r.artist}
                </span>
              </td>
              <td className="py-3 pr-4 text-caption">{r.borrower}</td>
              <td className={`py-3 pr-4 text-caption ${r.dueSoon ? "font-medium" : ""}`}>{r.due}</td>
              <td className="py-3 pr-4">
                <SurveyPill state={r.survey.state}>{r.survey.label}</SurveyPill>
              </td>
              <td className="py-3">
                <SensorCell status={r.sensor.status}>{r.sensor.label}</SensorCell>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile: row list (Row/Text · Row/Meta · Cell/Sensor). */}
      <ul className="desk:hidden">
        {returnsThisWeek.map((r) => (
          <li key={r.title} className="flex items-center gap-3 border-b border-line py-3">
            <ArtworkThumb title={r.title} className="h-12 w-10 rounded-[4px]" />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-body">{r.title}</span>
              <span className="text-micro text-ink-muted">
                {r.borrower} · <span className={r.dueSoon ? "font-medium text-ink" : ""}>{r.due}</span>
              </span>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <SurveyPill state={r.survey.state}>{r.survey.label}</SurveyPill>
              <SensorCell status={r.sensor.status}>{r.sensor.label}</SensorCell>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function LatestFromApp() {
  return (
    <section aria-labelledby="latest" className="flex flex-col border border-ink bg-highlight px-5 py-5 desk:flex-1 desk:basis-0">
      <h2 id="latest" className="border-b border-ink pb-3 text-title">
        Latest from the app
      </h2>
      <ul>
        {latestFromApp.map((l) => (
          <li key={l.meta} className="flex flex-col gap-0.5 border-b border-scrim-line py-3 last:border-b-0">
            <span className="text-micro text-ink-muted">{l.meta}</span>
            <span className="text-body">{l.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
