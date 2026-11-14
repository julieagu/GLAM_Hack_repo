// Placeholder data matching the High_fidelity screens (6-month loan period).
// Replace with real data (SPARQL + Artothek backend) as features land.

export type Area = "artwork" | "social" | "conservation";

export const featuredArtwork = {
  inventoryNo: "2189",
  title: "Tulipes",
  titleAlt: "Tulpen",
  artist: "Aimé Barraud",
  artistFull: "Aimé Barraud (1902–1954)",
  period: "1st half of 20th c.",
  year: "1936",
  dateLabel: "Undated, 1st half of 20th c.",
  technique: "Oil on canvas",
  techniqueFull: "Oil on canvas, Artglass Lifetime Acrylic",
  size: "46.3 × 38 cm",
  frameSize: "61.2 × 53 × 7.9 cm",
  acquired: "November 1981",
  keywords: ["Oil", "Canvas", "Painting"],
  documented: 0.8,
  imageCount: 4,
  // TODO: real links to the online collection record and the PDF documentation.
  recordUrl: undefined as string | undefined,
  documentationUrl: undefined as string | undefined,
  history: {
    lead: "Painted for a living room, not a museum.",
    body: "Aimé Barraud (1902–1954) belonged to a family of painters from La Chaux-de-Fonds. The SKKG acquired this still life in November 1981. Since 2026 it is one of ten works from the collection that members of the Winterthur libraries can borrow through the Artothek.",
    timeline: [
      { year: "1902", event: "Aimé Barraud born in La Chaux-de-Fonds" },
      { year: "1981", event: "Acquired by the SKKG, Winterthur" },
      { year: "2026", event: "Joins the Artothek «Kunst auf Zeit»" },
    ],
  },
};

export const currentLoan = {
  borrower: "L. Meier, Töss",
  start: "2026-07-15",
  end: "2027-01-15",
  returnSteps: [
    "Wrap the frame in the original blanket",
    "Bring it to Winterthur Library, Obertor",
    "Show your membership card at the desk",
  ],
};

export const previousRenters = [
  { initial: "M", name: "Marco, Altstadt", note: "«It hung above our kitchen table.»", period: "Jan–Jul 26" },
];

// ---------- Conservation ----------

export type SensorStatus = "ok" | "watch" | "action";

export interface SensorReading {
  key: "temperature" | "humidity" | "light";
  label: string;
  value: string;
  ideal: string;
  /** Position of the current value on the bar, 0–1. */
  position: number;
  /** Ideal band on the bar, 0–1. */
  idealFrom: number;
  idealTo: number;
  status: SensorStatus;
}

export const sensorReadings: SensorReading[] = [
  { key: "temperature", label: "Temperature", value: "21.4°", ideal: "Ideal 18–22°", position: 0.52, idealFrom: 0.4, idealTo: 0.6, status: "ok" },
  { key: "humidity", label: "Humidity", value: "52%", ideal: "Ideal 40–60%", position: 0.5, idealFrom: 0.33, idealTo: 0.66, status: "ok" },
  { key: "light", label: "Light", value: "340 lx", ideal: "Ideal < 200 lx", position: 0.64, idealFrom: 0, idealTo: 0.4, status: "action" },
];

// Sensor setup (Paper: Mobile/Conservation/Setup 1–3b)
export const setupChecklist = [
  "A dry room, not a bathroom or kitchen",
  "Not above a radiator or heater",
  "No direct sun on the wall",
  "One or two nails in the wall",
];

export const sensorDevice = { name: "SKKG Sensor · 2189", battery: "96%" };

/** First measurement in the prototype: too warm and too bright. */
export const moveSpotReadings: SensorReading[] = [
  { key: "temperature", label: "Temp.", value: "25.6°", ideal: "Ideal 18–22°", position: 0.74, idealFrom: 0.4, idealTo: 0.6, status: "action" },
  { key: "humidity", label: "Humidity", value: "46%", ideal: "Ideal 40–60%", position: 0.4, idealFrom: 0.33, idealTo: 0.67, status: "ok" },
  { key: "light", label: "Light", value: "340 lx", ideal: "Ideal < 200 lx", position: 0.64, idealFrom: 0, idealTo: 0.4, status: "action" },
];

/** After «Measure another spot»: all good. */
export const goodSpotReadings: SensorReading[] = [
  { key: "temperature", label: "Temp.", value: "20.8°", ideal: "Ideal 18–22°", position: 0.48, idealFrom: 0.4, idealTo: 0.6, status: "ok" },
  { key: "humidity", label: "Humidity", value: "49%", ideal: "Ideal 40–60%", position: 0.44, idealFrom: 0.33, idealTo: 0.67, status: "ok" },
  { key: "light", label: "Light", value: "120 lx", ideal: "Ideal < 200 lx", position: 0.2, idealFrom: 0, idealTo: 0.4, status: "ok" },
];

export const sensorAdvice = "Too much light since 10:00. Close the curtain or move the painting away from the window.";

export const hangingSteps = [
  "Every artwork comes with its own hanging system.",
  "Unless stated otherwise, one or two nails in the wall are all you need.",
  "Choose a dry room. Not above a radiator, and not on a wall that gets direct sun.",
];

export const handlingRules: { kind: "do" | "dont"; text: string }[] = [
  { kind: "do", text: "Pack and unpack the artwork lying flat." },
  { kind: "do", text: "Touch it only with clean, dry hands." },
  { kind: "do", text: "Carry it only by the sides of the frame." },
  { kind: "dont", text: "Never take the artwork out of its frame." },
  { kind: "dont", text: "No damp cleaning or wiping." },
  { kind: "dont", text: "Don't pass the artwork on to anyone else." },
];

// ---------- Social impact ----------

export const conversations = {
  count: 23,
};

export interface Story {
  id: string;
  /** Headline on the stories page. */
  title: string;
  /** Short version shown on the Social impact card. */
  quote: string;
  /** Full story, shown on the stories page («Read more»). */
  full: string[];
  author: string;
  /** When they had the painting. */
  period: string;
}

// One of these is shown at random each time someone opens Social impact.
export const stories: Story[] = [
  {
    id: "grandmother",
    title: "Grandma's tulip garden",
    quote: "«My grandmother grew tulips like these. We talked about her garden for an hour.»",
    full: [
      "My grandmother grew tulips like these behind her house in Töss. When my mother saw the painting in our hallway, she stopped and started telling us about that garden.",
      "We sat in the kitchen for an hour. My kids had never heard those stories. Now they call it «grandma's painting».",
    ],
    author: "Lena, Töss",
    period: "Since Jul 2026",
  },
  {
    id: "kitchen",
    title: "Breakfast with the tulips",
    quote: "«It hung above our kitchen table. Breakfast became the time we talked about it.»",
    full: [
      "We put it above the kitchen table because that's where we spend the most time. Every morning someone noticed something new: the blue ribbon, the crack in the pot, the way one tulip bends down.",
      "By the end of the loan my son could draw it from memory. We were sad to bring it back.",
    ],
    author: "Marco, Altstadt",
    period: "Jan–Jul 2026",
  },
  {
    id: "neighbour",
    title: "The neighbour who painted again",
    quote: "«Our neighbour came for coffee and stayed to talk about painting for the whole afternoon.»",
    full: [
      "Our neighbour used to paint when she was young. She saw the tulips through the window and knocked on the door to ask about them.",
      "She stayed the whole afternoon and showed us how Barraud built up the petals with thick paint. Last week she started painting again.",
    ],
    author: "Anouk, Veltheim",
    period: "Spring 2026",
  },
  {
    id: "first-original",
    title: "My first original",
    quote: "«I never thought I would have an original painting at home. It changed how I look at museums.»",
    full: [
      "I always felt a bit out of place in museums. Living with one painting for months was different: no rush, no guard, just the tulips and me.",
      "When I visited the Kunstmuseum afterwards, I stood in front of the still lifes for a long time. I knew what to look for now.",
    ],
    author: "Samir, Wülflingen",
    period: "Spring 2026",
  },
];

export interface ConversationPrompt {
  id: string;
  category: string;
  prompt: string;
  /** Keyword suggestions shown under the answer field. */
  keywords: string[];
}

export const conversationPrompts: ConversationPrompt[] = [
  { id: "first-look", category: "First look", prompt: "What is the first thing you noticed in this painting?", keywords: ["Colour", "The pot", "The light"] },
  { id: "room", category: "Home", prompt: "Which room did you choose for it, and why there?", keywords: ["Kitchen", "Living room", "Light"] },
  { id: "loved", category: "Memories", prompt: "Who in your life would have loved these tulips?", keywords: ["Family", "Gardens", "Spring"] },
  { id: "season", category: "Senses", prompt: "If this painting had a smell, what would it be?", keywords: ["Spring", "Earth", "Oil paint"] },
  { id: "title", category: "Imagination", prompt: "What happened five minutes before this scene?", keywords: ["something tragic", "somethings funny", "somethings surprising"] },
  { id: "changed", category: "Everyday", prompt: "Has the painting changed how the room feels?", keywords: ["Calmer", "Brighter", "No change"] },
  { id: "artist", category: "The artist", prompt: "What would you ask Aimé Barraud if he were here?", keywords: ["Why tulips", "His family", "Technique"] },
  { id: "next", category: "Passing it on", prompt: " If this artwork could talk, what would it say?", keywords: ["Memory", "Relax", "Enjoy life"] },
];

export const feelings = {
  respondents: 41,
  question: "How do you feel looking at this artwork?",
  // Order = clockwise from the top of the radar.
  axes: [
    { label: "Joy", value: 0.78 },
    { label: "Disgust", value: 0.15 },
    { label: "Anger", value: 0.09 },
    { label: "Surprise", value: 0.5 },
    { label: "Sadness", value: 0.48 },
  ],
};

// Creativity work: the pictures themselves come from src/assets/creativity-work/ (see its README).
export const inspiration = {
  /** Number shown in the section header before any photo is added. */
  total: 12,
};

export const instagram = {
  name: "Artothek",
  // TODO: confirm the Artothek's real Instagram handle.
  handle: "artothek",
  url: "https://www.instagram.com/artothek/",
  hashtags: "#SKKG #ArtAtHome #ArtForAll",
};

// Draft answers, based on the collection data above. TODO: have the Artothek / SKKG team check them.
export const faq = [
  {
    id: "why-tulips",
    question: "Why tulips, and why in a pot?",
    answer:
      "Tulips are a classic subject for still lifes: strong colours, stems that bend as the days pass, and a short life that reminds us beauty doesn't last. Barraud didn't leave an explanation, but by painting them in a simple clay pot instead of a precious vase, he brings the flowers into an ordinary home — the kind of room this painting was made for.",
  },
  {
    id: "owner",
    question: "Who owns the painting?",
    answer:
      "Tulipes belongs to the collection of the SKKG – Stiftung für Kunst, Kultur und Geschichte in Winterthur, which acquired it in November 1981. Since 2026 anyone with a Winterthur library card can borrow it through the Artothek.",
  },
  {
    id: "frame",
    question: "Who made the frame?",
    answer:
      "The maker of the frame isn't recorded in the collection documentation yet. It measures 61.2 × 53 × 7.9 cm and protects the canvas behind Artglass acrylic glazing, which is one reason the painting must never be taken out of it.",
  },
];
