// About page content. Roles and descriptions are placeholders — edit freely.
// Photos: src/assets/team/<first-name>.jpg (see the README there).
// linkedin: full profile URL, e.g. "https://www.linkedin.com/in/your-name/". Empty = placeholder shown.
// website (optional): portfolio URL, e.g. "https://your-site.ch". Empty = placeholder shown; leave the field out = no website pill.

export const project = {
  name: "The Life of an Artwork",
  event: "GLAMhack 2026 · SKKG Artothek challenge",
  // TODO: replace with the real project description.
  description: [
    "The SKKG Artothek lends artworks to private homes for three to six months. That’s where most of the social impact happens, and it’s also where SKKG has no visibility. Between pick-up and return, the conservation team gets no data on temperature, humidity or light. The Artothek also learns nothing about the conversations or emotions the artwork sparks.",
    "Our concept is an artwork rental kit that sits next to the artwork. It holds sensors and an NFC tag. Scanning the tag opens a mobile page with artwork info, care instructions and live conservation data. The same page lets hosts share the conversations, emotions and inspiration the work brings. Everything feeds a dashboard that combines physical and social data. With it, the Artothek can show what an artwork does when it leaves storage.",
  ],
};

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  website?: string;
}

export const team: TeamMember[] = [
  { name: "Christine", role: "Project Manager", bio: "", linkedin: "linkedin.com/in/christine-müller-stalder" },
  { name: "Juliane", role: "Role placeholder", bio: "", linkedin: "https://www.linkedin.com/in/jul-eberhardt/" },
  { name: "Lara", role: "UX & UI Designer", bio: "", linkedin: "https://www.linkedin.com/in/lara-rodrigues-ristic/", website: "https://lararr.com/" },
  { name: "Julie", role: "UX Designer & Web Developer", bio: "", linkedin: "https://www.linkedin.com/in/julie-agustoni/", website: "https://julieagustoni.com/" },
];
