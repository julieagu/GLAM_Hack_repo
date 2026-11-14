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
  featured: { quote: "«My grandmother grew tulips like these. We talked about her garden for an hour.»", author: "Lena, Töss" },
};

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
  { id: "title", category: "Imagination", prompt: "Give the painting a new title. What would you call it?", keywords: ["Funny", "Poetic", "Simple"] },
  { id: "changed", category: "Everyday", prompt: "Has the painting changed how the room feels?", keywords: ["Calmer", "Brighter", "No change"] },
  { id: "artist", category: "The artist", prompt: "What would you ask Aimé Barraud if he were here?", keywords: ["Why tulips", "His family", "Technique"] },
  { id: "next", category: "Passing it on", prompt: "What should the next borrower know about living with it?", keywords: ["Light", "A good wall", "Enjoy it"] },
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

export const inspiration = {
  total: 12,
  works: [
    { author: "Lena", imageUrl: undefined as string | undefined },
    { author: "Marco", imageUrl: undefined as string | undefined },
    { author: "Anouk", imageUrl: undefined as string | undefined },
  ],
};

export const instagram = {
  handle: "skkg",
  url: "https://www.instagram.com/skkg/",
  hashtags: "#SKKG #ArtAtHome #ArtForAll",
};

export const faq = [
  { id: "why-tulips", question: "Why tulips, and why in a pot?" },
  { id: "owner", question: "Who owns the painting?" },
  { id: "frame", question: "Who made the frame?" },
];
