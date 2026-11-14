import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { SensorIcon } from "@/components/features/SensorIllustration";
import { MobileScreen, PageTitle, PageTopBar } from "@/components/layout";
import { Button, Card, Icon, List, RuleRow, SectionHeader, SensorTile, StatusDot, StepRow, TextArea } from "@/components/ui";
import { featuredArtwork as art, handlingRules, hangingSteps, sensorAdvice, sensorReadings } from "@/data/mock";
import { useSensorSetup } from "@/lib/sensorSetup";

export default function Conservation() {
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);
  const sensor = useSensorSetup();
  const { hash } = useLocation();

  // Back from the setup: bring the new sensor data into view.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
  }, [hash]);

  return (
    <MobileScreen area="conservation">
      <PageTopBar />
      <PageTitle title="Care guide" lead="How to live with an original painting at home." />

      {sensor.done ? (
        <section id="live" className="flex scroll-mt-4 flex-col gap-3 px-6 pb-10" aria-label="Live conditions">
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
            <span className="text-caption font-medium">Right now in your room</span>
            <span className="flex items-center gap-1.5 whitespace-nowrap text-micro text-area-ink">
              <StatusDot status="ok" /> Sensor live · 2 min ago
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 min-[360px]:gap-2.5">
            {sensorReadings.map((r) => (
              <SensorTile key={r.key} reading={r} />
            ))}
          </div>
          {sensorReadings.some((r) => r.status !== "ok") && (
            <Card tone="ink" className="flex items-start gap-3 p-4 text-caption" role="status">
              <StatusDot status="action" className="mt-1.5" />
              {sensorAdvice}
            </Card>
          )}
          {/* Prototype helper so the first-time flow can be shown again. */}
          <button type="button" onClick={sensor.reset} className="self-start text-micro text-area-ink underline underline-offset-4">
            Run the setup again
          </button>
        </section>
      ) : (
        // First time: no sensor yet → no data, just the way into the setup.
        <section className="px-6 pb-10" aria-label="Set up the sensor">
          <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-3.5">
              <SensorIcon />
              <div className="flex flex-col gap-0.5">
                <span className="text-body font-medium">No sensor data yet</span>
                <span className="text-caption leading-5">
                  Before you hang {art.title}, check the wall and connect the sensor. It takes about 5 minutes.
                </span>
              </div>
            </div>
            <Link
              to="/conservation/setup"
              className="flex h-12 items-center justify-center rounded-pill bg-ink text-body text-area hover:bg-ink-soft"
            >
              Set up the artwork
            </Link>
          </Card>
        </section>
      )}

      <section className="px-6 pb-10">
        <SectionHeader title="How to hang it" />
        <List>
          {hangingSteps.map((s, i) => (
            <StepRow key={s} n={i + 1}>
              {s}
            </StepRow>
          ))}
        </List>
      </section>

      <section className="px-6 pb-10">
        <SectionHeader title="Handling rules" />
        <List>
          {handlingRules.map((r) => (
            <RuleRow key={r.text} kind={r.kind}>
              {r.text}
            </RuleRow>
          ))}
        </List>
      </section>

      <section className="flex flex-col gap-2.5 px-6 pb-10">
        <SectionHeader title="Returning & insurance" className="[&>div]:pb-0.5" />
        <Card className="flex flex-col gap-2.5">
          <span className="text-micro tracking-wide text-ink-muted">Packing for return</span>
          <p className="text-body">Return the artwork in the same packaging you received it in.</p>
          <div className="flex items-center justify-between gap-3 border-t border-line pt-2.5">
            <p className="text-caption">Packaging lost or damaged? You pay its replacement cost.</p>
            <span className="shrink-0 rounded-pill bg-area-soft px-2.5 py-[3px] text-micro font-medium text-area-ink">CHF 25–50</span>
          </div>
        </Card>
        <Card tone="ink" className="flex items-start gap-3.5">
          <Icon name="shield" size={22} className="shrink-0 text-area" />
          <div className="flex flex-col gap-1">
            <span className="text-body font-medium text-area">You're covered</span>
            <p className="text-caption leading-5">
              Artothek artworks are insured against damage and loss. If you handle them properly, you are not liable.
            </p>
          </div>
        </Card>
      </section>

      <section className="flex flex-col gap-3 px-6 pb-10">
        <SectionHeader title="Ask a conservator" className="[&>div]:pb-0" />
        <p className="text-caption leading-5 text-area-ink">
          Noticed a crack, a stain or a loose frame? Send us a question. We usually reply within two working days.
        </p>
        {sent ? (
          <Card role="status">Thanks — a conservator will get back to you within two working days.</Card>
        ) : (
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: send to the Artothek backend.
              setSent(true);
            }}
          >
            <TextArea
              label="Describe what you noticed"
              placeholder="Describe what you noticed …"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-30"
              footer={
                <button type="button" className="flex items-center gap-1.5 self-start text-caption text-area-strong">
                  <Icon name="camera" size={16} /> Add a photo
                </button>
              }
            />
            <Button type="submit" block disabled={!question.trim()}>
              Send question
            </Button>
          </form>
        )}
      </section>
    </MobileScreen>
  );
}
