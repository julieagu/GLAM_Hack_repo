import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router";
import { PairingIllustration, SensorIcon } from "@/components/features/SensorIllustration";
import { MobileScreen, StepHeader } from "@/components/layout";
import { Button, Icon, SensorTile } from "@/components/ui";
import { featuredArtwork as art, goodSpotReadings, moveSpotReadings, sensorDevice, setupChecklist, type SensorReading } from "@/data/mock";
import { cn } from "@/lib/cn";
import { setSensorSetUp } from "@/lib/sensorSetup";

type Step = "check" | "connect" | "result";

const FIND_MS = 1400; // prototype: time until the sensor is «found»
const MEASURE_MS = 2000; // prototype: the real first reading takes ~2 min

/**
 * First-time sensor setup (Paper: Mobile/Conservation/Setup 1 → 2 → 3a/3b).
 * 1 Before hanging: check the wall · 2 Connect the sensor · 3 Result: good spot / move it.
 * Prototype: the first measurement says «Better move it», the next one «Good spot».
 * Finishing marks the sensor as set up and returns to the care guide with live data.
 */
export default function SensorSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("check");
  const [checked, setChecked] = useState<boolean[]>(() => setupChecklist.map(() => false));
  const [found, setFound] = useState(false);
  const [measuring, setMeasuring] = useState(false);
  const [measurements, setMeasurements] = useState(0);
  const [help, setHelp] = useState(false);

  const stepIndex = { check: 0, connect: 1, result: 2 }[step];
  const good = measurements > 1;

  // Step 2: pretend the phone finds the sensor after a moment.
  useEffect(() => {
    if (step !== "connect" || found) return;
    const t = window.setTimeout(() => setFound(true), FIND_MS);
    return () => window.clearTimeout(t);
  }, [step, found]);

  function measure() {
    setMeasuring(true);
    window.setTimeout(() => {
      setMeasuring(false);
      setMeasurements((n) => n + 1);
      setStep("result");
    }, MEASURE_MS);
  }

  function finish() {
    setSensorSetUp(true);
    navigate("/conservation#live");
  }

  const close = () => navigate("/conservation");
  const back = () => (step === "check" ? close() : setStep(step === "result" ? "connect" : "check"));

  return (
    <MobileScreen area="conservation" className="h-dvh overflow-hidden">
      <StepHeader label={`Step ${stepIndex + 1} of 3`} current={stepIndex} total={3} onBack={back} onClose={close} />

      {/* Step content scrolls on short phones; the actions stay pinned at the bottom. */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pt-2">
        {step === "check" && (
          <>
            <Eyebrow>Before you hang it</Eyebrow>
            <h1 className="pt-1 text-headline font-light tracking-[-0.01em]">Find the right wall</h1>
            <p className="pt-2 pb-5 text-body text-area-ink">Check these before the first nail goes in.</p>
            <ul className="border-b border-line">
              {setupChecklist.map((item, i) => (
                <li key={item} className="border-t border-line">
                  <label className="flex cursor-pointer items-center gap-3 py-[13px] text-body">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={checked[i]}
                      onChange={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex size-5.5 shrink-0 items-center justify-center rounded-xs border-[1.5px] border-ink peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2",
                        checked[i] ? "bg-ink text-area" : "bg-transparent",
                      )}
                    >
                      {checked[i] && <Icon name="check" size={12} strokeWidth={2.4} />}
                    </span>
                    {item}
                  </label>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-3.5 rounded-md bg-white p-4">
              <SensorIcon />
              <div className="flex flex-col gap-0.5">
                <span className="text-body font-medium">Place the sensor</span>
                <span className="text-caption leading-5">Stick it on the wall right next to where the frame will hang.</span>
              </div>
            </div>
          </>
        )}

        {step === "connect" && (
          <>
            <Eyebrow>Connect the sensor</Eyebrow>
            <h1 className="pt-1 text-headline font-light tracking-[-0.01em]">Wake up the sensor</h1>
            <p className="pt-2 text-body text-area-ink">Press its button until the light blinks blue. Keep your phone close.</p>
            <div className="flex min-h-40 flex-1 items-center justify-center py-4">
              <PairingIllustration searching={!found} />
            </div>
            <div className="flex items-center gap-3 rounded-md bg-white px-4 py-3.5" role="status" aria-live="polite">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-area-soft">
                <span className={cn("size-2.5 rounded-pill border-[1.5px] border-ink bg-area", !found && "animate-pulse")} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-body">{found ? sensorDevice.name : "Looking for the sensor …"}</span>
                <span className="text-micro text-ink-muted">{found ? `Found · Battery ${sensorDevice.battery}` : "Keep your phone within 1 m"}</span>
              </span>
              {found && (
                <span className="flex size-6 shrink-0 items-center justify-center rounded-pill bg-status-ok text-white">
                  <Icon name="check" size={12} strokeWidth={2.4} />
                </span>
              )}
            </div>
            <p className="pt-2.5 pb-4 text-micro text-area-ink">
              {help
                ? "Hold the sensor's button for 5 seconds until the light blinks blue, then keep your phone next to it."
                : "The first reading takes about 2 minutes."}
            </p>
          </>
        )}

        {step === "result" && (good ? <GoodSpot readings={goodSpotReadings} /> : <MoveIt readings={moveSpotReadings} />)}
      </div>

      {/* Bottom actions */}
      <div className="flex flex-col items-center gap-3.5 px-6 pt-5 pb-[max(env(safe-area-inset-bottom),28px)] [@media(max-height:700px)]:pb-4">
        {step === "check" && (
          <>
            <Button size="lg" block onClick={() => setStep("connect")} iconStart={<Icon name="signal" size={18} />}>
              Connect sensor
            </Button>
            <Link to="/conservation" className="text-caption underline underline-offset-[3px]">
              I'll do it later
            </Link>
          </>
        )}
        {step === "connect" && (
          <>
            <Button size="lg" block disabled={!found || measuring} onClick={measure} iconStart={<Icon name="signal" size={18} />}>
              {measuring ? "Measuring this spot …" : "Measure this spot"}
            </Button>
            <button type="button" onClick={() => setHelp((h) => !h)} className="text-caption underline underline-offset-[3px]">
              Sensor not showing up?
            </button>
          </>
        )}
        {step === "result" && good && (
          <>
            <Button size="lg" block onClick={finish} disabled={measuring}>
              Done, hang it here
            </Button>
            <button type="button" onClick={measure} disabled={measuring} className="text-caption underline underline-offset-[3px]">
              {measuring ? "Measuring …" : "Measure again"}
            </button>
          </>
        )}
        {step === "result" && !good && (
          <>
            <Button size="lg" block onClick={measure} disabled={measuring} iconStart={<Icon name="signal" size={18} />}>
              {measuring ? "Measuring the new spot …" : "Measure another spot"}
            </Button>
            <button type="button" onClick={finish} className="text-caption underline underline-offset-[3px]">
              Hang it here anyway
            </button>
          </>
        )}
      </div>
    </MobileScreen>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="text-micro tracking-wide text-area-ink">{children}</span>;
}

function ResultTiles({ readings }: { readings: SensorReading[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {readings.map((r) => (
        <SensorTile key={r.key} reading={r} compact />
      ))}
    </div>
  );
}

function GoodSpot({ readings }: { readings: SensorReading[] }) {
  return (
    <>
      <span className="flex size-16 shrink-0 items-center justify-center rounded-pill bg-ink text-area">
        <Icon name="check" size={28} />
      </span>
      <h1 className="pt-5 text-display font-light tracking-tight">Good spot</h1>
      <p className="pt-2 pb-6 text-lead text-area-ink">{art.title} will be comfortable here. Go ahead and hang it.</p>
      <ResultTiles readings={readings} />
      <p className="flex items-center gap-2.5 pt-4 pb-4 text-caption leading-5 text-area-ink">
        <Icon name="eye" size={16} className="shrink-0" />
        The sensor keeps watching. We'll tell you if anything changes.
      </p>
    </>
  );
}

function MoveIt({ readings }: { readings: SensorReading[] }) {
  return (
    <>
      <span className="flex size-16 shrink-0 items-center justify-center rounded-pill border-[1.5px] border-ink bg-orange-500 text-ink">
        <Icon name="arrow-right" size={28} />
      </span>
      <h1 className="pt-5 text-display font-light tracking-tight">Better move it</h1>
      <p className="pt-2 pb-6 text-lead text-area-ink">This spot is too warm and too bright for an oil painting.</p>
      <ResultTiles readings={readings} />
      <div className="mt-3 mb-4 flex flex-col gap-1.5 rounded-md bg-ink px-4 py-3.5">
        <span className="text-caption font-medium text-area">Try instead</span>
        <span className="text-caption leading-5 text-white">A wall that faces away from the window, at least 1 m from the radiator.</span>
      </div>
    </>
  );
}
