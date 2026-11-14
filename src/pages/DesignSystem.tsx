import { StepHeader } from "@/components/layout";
import { Button, Card, Chip, Icon, IconButton, SectionHeader, StatusDot, Tag } from "@/components/ui";
import type { Area } from "@/data/mock";

// Living style guide at /design-system — check components against Paper's Design System v2.
const areas: Area[] = ["artwork", "social", "conservation"];
const swatches = ["mint", "orange", "blue"] as const;
const steps = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const type = [
  ["text-hero", "Hero 88"],
  ["text-display", "Display 48"],
  ["text-headline", "Headline 34"],
  ["text-title", "Title 26"],
  ["text-lead", "Lead 20"],
  ["text-body", "Body 16"],
  ["text-caption", "Caption 14"],
  ["text-micro", "Micro 12"],
];

export default function DesignSystem() {
  return (
    <div className="mx-auto flex max-w-desktop flex-col gap-16 px-6 py-12">
      <h1 className="text-display font-light tracking-tight">Design System v2</h1>

      <section className="flex flex-col gap-4">
        <SectionHeader title="Colour" />
        {swatches.map((s) => (
          <div key={s} className="flex">
            {steps.map((n) => (
              <div
                key={n}
                className={`h-14 flex-1 p-2 text-micro ${n >= 700 ? "text-white" : ""}`}
                style={{ background: `var(--color-${s}-${n})` }}
              >
                {s}-{n}
              </div>
            ))}
          </div>
        ))}
        <div className="flex gap-3 text-caption">
          {(["ok", "watch", "action"] as const).map((s) => (
            <span key={s} className="flex items-center gap-2">
              <StatusDot status={s} /> status-{s}
            </span>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <SectionHeader title="Typography" />
        {type.map(([cls, label]) => (
          <div key={cls} className={`${cls} font-light ${cls === "text-hero" ? "tracking-hero" : ""}`}>
            {label} · Tulipes
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeader title="Components per area" />
        <div className="grid gap-6 md:grid-cols-3">
          {areas.map((a) => (
            <div key={a} data-area={a} className="flex flex-col gap-4 bg-area p-6">
              <span className="text-caption font-medium">{a}</span>
              <StepHeader label="Question 2 of 4" current={1} total={4} onBack={() => {}} onClose={() => {}} />
              <Button size="lg" block iconEnd={<Icon name="arrow-right" />}>
                Next
              </Button>
              <Button variant="secondary" block>
                Extend loan
              </Button>
              <div className="flex flex-wrap gap-2">
                <Chip selected>The colours</Chip>
                <Chip>The subject</Chip>
              </div>
              <div className="flex gap-2">
                <Tag>Oil</Tag>
                <Tag tone="ink">62 days left</Tag>
                <IconButton icon="close" label="Close" />
              </div>
              <Card>White card · radius 12 · padding 20</Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
