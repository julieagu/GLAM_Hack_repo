// Artworks of the Artothek Winterthur, loaded from the SKKG linked-data endpoint.
// Ported from the 1_SKKG_gallery prototype.
import { runQuery } from "./sparql";

const PREFIXES = `
PREFIX crm:  <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX la:   <https://linked.art/ns/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
`;

// The vocabulary term "Artothek Winterthur" (scheme ObjUrlTypeVgr).
const ARTOTHEK_TYPE = "<https://data.skkg.ch/type/32095/315964>";

const ARTOTHEK_OBJECTS = `
  ?link crm:P2_has_type ${ARTOTHEK_TYPE} .
  ?object crm:P67i_is_referred_to_by ?link .
`;

const ARTWORKS_QUERY = `${PREFIXES}
SELECT ?object ?title
  (GROUP_CONCAT(DISTINCT ?artistLabel; SEPARATOR="|") AS ?artists)
  (GROUP_CONCAT(DISTINCT ?date; SEPARATOR="|") AS ?dates)
  (GROUP_CONCAT(DISTINCT ?typeLabel; SEPARATOR="|") AS ?types)
  (SAMPLE(?linkUrl) AS ?artothekUrl)
WHERE {
  ${ARTOTHEK_OBJECTS}
  ?object skos:prefLabel ?title .
  OPTIONAL {
    ?link crm:P1_is_identified_by ?lid .
    ?lid crm:P190_has_symbolic_content ?linkUrl .
    FILTER(STRENDS(STR(?lid), "/url"))
  }
  OPTIONAL {
    ?object crm:P108i_was_produced_by/crm:P9_consists_of/crm:P14_carried_out_by ?artist .
    ?artist skos:prefLabel ?artistLabel .
  }
  OPTIONAL { ?object crm:P108i_was_produced_by/crm:P4_has_time-span/rdfs:label ?date }
  OPTIONAL { ?object crm:P2_has_type/skos:prefLabel ?typeLabel }
}
GROUP BY ?object ?title
ORDER BY ?title
`;

const IMAGES_QUERY = `${PREFIXES}
SELECT ?object ?iiif ?order ?category
WHERE {
  ${ARTOTHEK_OBJECTS}
  ?object crm:P138i_has_representation ?m .
  ?m rdfs:label "image" ;
     la:digitally_shown_by ?do .
  ?do ?toService ?svc .
  ?svc la:access_point ?iiif .
  OPTIONAL {
    ?m crm:P1_is_identified_by ?ord .
    ?ord crm:P2_has_type <https://data.skkg.ch/type/sortlnu> ;
         crm:P190_has_symbolic_content ?order .
  }
  OPTIONAL {
    ?m crm:P2_has_type ?cat .
    ?cat skos:inScheme <https://data.skkg.ch/type/43088> ;
         skos:prefLabel ?category .
  }
}
ORDER BY ?object ?order
`;

export type ImageSide = "front" | "back" | "other";

export interface ArtworkImage {
  /** IIIF image service base URL. */
  base: string;
  side: ImageSide;
}

export interface Artwork {
  uri: string;
  id: string;
  title: string;
  artists: string[];
  dates: string[];
  types: string[];
  artothekUrl?: string;
  images: ArtworkImage[];
  frontAvailable: boolean;
}

/** IIIF URL for a given width. */
export const iiifUrl = (base: string, width: number) => `${base}/full/${width},/0/default.jpg`;

const split = (s?: string) => (s ? s.split("|").filter(Boolean) : []);

/** "Aimé Barraud (1902–1954)" → "Aimé Barraud". */
export const stripLifespan = (name: string) => name.replace(/\s*\([^)]*\)\s*$/, "");

function cleanDates(dates: string[]) {
  const real = dates.filter((d) => d !== "ohne Datierung");
  return real.length ? real : dates;
}

export async function loadArtworks(signal?: AbortSignal): Promise<Artwork[]> {
  const [works, images] = await Promise.all([
    runQuery(ARTWORKS_QUERY, signal),
    runQuery(IMAGES_QUERY, signal),
  ]);

  const byId = new Map<string, Artwork>();
  for (const w of works) {
    const uri = w.object!.value;
    byId.set(uri, {
      uri,
      id: uri.split("/").pop() ?? uri,
      title: w.title?.value ?? "Untitled",
      artists: split(w.artists?.value),
      dates: cleanDates(split(w.dates?.value)),
      types: split(w.types?.value),
      artothekUrl: w.artothekUrl?.value,
      images: [],
      frontAvailable: false,
    });
  }

  // Images arrive sorted by object and sort order. Front views (recto) go first.
  for (const img of images) {
    const art = byId.get(img.object!.value);
    const base = img.iiif!.value;
    if (!art || art.images.some((i) => i.base === base)) continue;
    const cat = img.category?.value ?? "";
    art.images.push({
      base,
      side: /recto/i.test(cat) ? "front" : /verso/i.test(cat) ? "back" : "other",
    });
  }
  const rank: Record<ImageSide, number> = { front: 0, other: 1, back: 2 };
  for (const art of byId.values()) {
    art.images.sort((a, b) => rank[a.side] - rank[b.side]);
    art.frontAvailable = art.images.some((i) => i.side === "front");
  }
  return [...byId.values()];
}
