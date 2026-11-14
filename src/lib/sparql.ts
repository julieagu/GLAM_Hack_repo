// Minimal client for the SKKG SPARQL endpoint (QLever, CORS open, no key needed).
export const SPARQL_ENDPOINT = "https://sparql.digital.skkg.ch/";

export type Binding = Record<string, { type: string; value: string } | undefined>;

export async function runQuery(query: string, signal?: AbortSignal): Promise<Binding[]> {
  const res = await fetch(SPARQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/sparql-results+json",
    },
    body: new URLSearchParams({ query }),
    signal,
  });
  if (!res.ok) throw new Error(`SPARQL endpoint answered ${res.status}`);
  const json = await res.json();
  if (json.status === "ERROR") throw new Error(json.exception || "SPARQL error");
  return json.results.bindings as Binding[];
}
