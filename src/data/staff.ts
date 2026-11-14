// Placeholder data for the staff dashboard (Paper page "Desktop – Staff").
// Replace with the Artothek backend (loans, surveys, sensors) when it exists.

import type { SensorStatus } from "./mock";

export const staffUser = { name: "Christine", initials: "CM" };

/** A survey pill: filled = answered, solid = sent, dashed = not sent / due. */
export type SurveyState = "answered" | "sent" | "pending";

// ---------- Overview ----------

export const overview = {
  artwork: {
    note: "70 works in the Artothek",
    kpis: [
      { value: "52", label: "on loan" },
      { value: "14", label: "available" },
      { value: "4", label: "in the studio" },
    ],
    loansPerMonth: {
      trend: "+18% vs. last year",
      // Dec → Nov, the last bar is the current month.
      months: ["D", "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N"],
      values: [38, 47, 53, 63, 59, 72, 80, 87, 83, 95, 102, 110],
    },
    mostRequested: [
      { title: "Tulipes", artist: "Aimé Barraud", meta: "2 loans · 6 waiting", to: "/staff/artworks" },
      { title: "Blauer Berg", artist: "Victor Surbek", meta: "2 loans · 3 waiting" },
      { title: "Studie", artist: "C. L'Eplattenier", meta: "2 loans · 1 waiting" },
    ],
  },
  social: {
    note: "From app conversations & surveys",
    kpis: [
      { value: "412", label: "conversations" },
      { value: "86%", label: "would host again" },
      { value: "4.1", suffix: "/5", label: "sees art differently" },
    ],
    perWeek: {
      note: "52 this week",
      // y in the 0–120 chart space (smaller = higher).
      points: [95, 82, 88, 74, 61, 67, 54, 44, 50, 35, 27, 10],
      labels: ["Aug", "Sep", "Nov"],
    },
    feelings: [
      { label: "Joy", value: 0.78 },
      { label: "Surprise", value: 0.5 },
      { label: "Nostalgia", value: 0.48 },
    ],
  },
  conservation: {
    note: "52 sensors live in homes",
    kpis: [
      { value: "46", label: "in good conditions" },
      { value: "4", label: "to watch" },
      { value: "2", label: "need action", alert: true },
    ],
    sensorStatus: { ok: 46, watch: 4, action: 2 },
    averages: [
      // Positions are % of the bar: ideal band from/width, dot = current value.
      { label: "Temperature", value: "20.9°", idealFrom: 40, idealWidth: 20, at: 52 },
      { label: "Humidity", value: "51%", idealFrom: 33, idealWidth: 34, at: 50 },
      { label: "Light", value: "140 lx", idealFrom: 0, idealWidth: 40, at: 26 },
    ],
    needsAction: [
      { title: "Tulipes", detail: "light 340 lx · Töss", ago: "2 h", to: "/staff/artworks" },
      { title: "Blauer Berg", detail: "25.6° · Altstadt", ago: "5 h" },
    ],
  },
};

export const returnsThisWeek: {
  title: string;
  artist: string;
  borrower: string;
  due: string;
  dueSoon?: boolean;
  survey: { state: SurveyState; label: string };
  sensor: { status: SensorStatus; label: string };
}[] = [
  {
    title: "Blauer Berg",
    artist: "Victor Surbek",
    borrower: "P. Frei, Altstadt",
    due: "Mon 16 Nov",
    dueSoon: true,
    survey: { state: "answered", label: "Answered" },
    sensor: { status: "action", label: "Temp. high" },
  },
  {
    title: "Studie",
    artist: "Charles L'Eplattenier",
    borrower: "M. Rossi, Altstadt",
    due: "Wed 18 Nov",
    survey: { state: "sent", label: "Sent" },
    sensor: { status: "ok", label: "Good" },
  },
  {
    title: "Blick vom Zürichberg",
    artist: "Balz Stäger",
    borrower: "A. Keller, Seen",
    due: "Fri 20 Nov",
    survey: { state: "pending", label: "Not sent" },
    sensor: { status: "ok", label: "Good" },
  },
];

export const latestFromApp = [
  { meta: "Artwork Q&A question · 12 min ago", text: "«Was it ever shown in a museum?» — on Tulipes" },
  { meta: "Conservation question · 1 h ago", text: "«Small crack in the varnish, lower left?»" },
  { meta: "Survey · 3 h ago", text: "Would host again: Blauer Berg" },
];

// ---------- Artwork (Tulipes) ----------

export const staffArtwork = {
  status: "On loan · L. Meier, Töss · due 15 Jan 2027",
  meta: "Inv. 2189 · Oil on canvas · 46.3 × 38 cm",
  artwork: {
    note: "Loans, demand & record",
    kpis: [
      { value: "2", label: "loans in 2026" },
      { value: "6", label: "on waiting list" },
      { value: "95%", label: "of days on loan" },
    ],
    timelineNote: "Next: waiting list #1",
    record: [
      { label: "Documentation", value: "80% · level 2 of 3" },
      { label: "Last studio check", value: "10 Aug 2026 · no damage" },
      { label: "Packaging", value: "Crate M · in use" },
    ],
  },
  social: {
    note: "What Tulipes sparks at home",
    kpis: [
      { value: "23", label: "conversations" },
      { value: "1", suffix: "/1", label: "would host again" },
      { value: "4.5", suffix: "/5", label: "sees art differently" },
    ],
    average: "Artothek average: 6",
    topics: [
      { label: "Family", count: 9, top: true },
      { label: "Gardens", count: 7, top: true },
      { label: "Spring", count: 5 },
      { label: "Childhood", count: 4 },
      { label: "Colour", count: 3 },
    ],
    latestNote: { quote: "«My grandma's garden in Töss»", meta: "Latest note · L. Meier · 12 min ago" },
  },
  conservation: {
    note: "Sensor 2189 live · 2 min ago · battery 96%",
    kpis: [
      { value: "21.4°", label: "ideal 18–22°" },
      { value: "52%", label: "ideal 40–60%" },
      { value: "340", label: "lux · ideal < 200", alert: true },
    ],
    lightNote: "Limit 200 lx · over 5 of 7 days",
    alert: {
      title: "Needs action · light too high since 10:00",
      body: "Afternoon sun reaches the wall in Töss. The borrower was advised to close the curtain; no change yet.",
    },
  },
  loansSummary: "2 loans · 6 waiting · 6 months each",
};

export type LoanRowStatus = "returned" | "current" | "next" | "waiting";

export const loansOfArtwork: {
  n: string;
  borrower: string;
  period: string;
  status: LoanRowStatus;
  statusLabel: string;
  conversations?: number;
  survey?: { state: SurveyState; label: string };
  sensor?: { status?: SensorStatus; label: string };
}[] = [
  {
    n: "01",
    borrower: "M. Rossi, Altstadt",
    period: "15 Jan – 15 Jul 2026",
    status: "returned",
    statusLabel: "Returned",
    conversations: 9,
    survey: { state: "answered", label: "Answered" },
    sensor: { status: "watch", label: "1 alert · humidity" },
  },
  {
    n: "02",
    borrower: "L. Meier, Töss",
    period: "15 Jul 2026 – 15 Jan 2027",
    status: "current",
    statusLabel: "Current",
    conversations: 14,
    survey: { state: "pending", label: "Due 12 Jan" },
    sensor: { status: "action", label: "5 alerts · light" },
  },
  {
    n: "03",
    borrower: "A. Keller, Seen",
    period: "15 Jan – 15 Jul 2027",
    status: "next",
    statusLabel: "Next",
    sensor: { label: "Wall checked ✓" },
  },
  {
    n: "04",
    borrower: "J. Brunner, Veltheim",
    period: "15 Jul 2027 – 15 Jan 2028",
    status: "waiting",
    statusLabel: "Waiting #2",
    sensor: { label: "Since 2 Sep" },
  },
  {
    n: "05",
    borrower: "N. Schmid, Mattenbach",
    period: "15 Jan – 15 Jul 2028",
    status: "waiting",
    statusLabel: "Waiting #3",
    sensor: { label: "Since 19 Sep" },
  },
];

export const waitingList = { summary: "6 people · next free slot 15 Jan 2027", more: "+3 more on the waiting list (until 2029)" };

/** Works staff can switch between. Only Tulipes has dashboard data in this prototype. */
export const staffArtworkOptions = [
  { title: "Tulipes", artist: "Aimé Barraud", ready: true },
  { title: "Blauer Berg", artist: "Victor Surbek", ready: false },
  { title: "Studie", artist: "Charles L'Eplattenier", ready: false },
  { title: "Blick vom Zürichberg", artist: "Balz Stäger", ready: false },
];
