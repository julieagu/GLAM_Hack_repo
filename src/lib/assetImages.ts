// Pictures you drop into src/assets/<folder>/ — picked up automatically by Vite at build time.
// See the README.md in each folder for naming.

export interface AssetImage {
  url: string;
  /** Name shown under the picture, from the file name: «01-lena.jpg» → «Lena». */
  label: string;
}

const creativity = import.meta.glob<string>("/src/assets/creativity-work/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}", {
  eager: true,
  import: "default",
});

const instagramPics = import.meta.glob<string>("/src/assets/instagram/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}", {
  eager: true,
  import: "default",
});

function labelFrom(path: string): string {
  const name = path.split("/").pop()!.replace(/\.[^.]+$/, "");
  return name
    .replace(/^\d+[\s._-]*/, "") // drop leading number used for ordering
    .split(/[\s._-]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

function toList(files: Record<string, string>): AssetImage[] {
  return Object.keys(files)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((path) => ({ url: files[path], label: labelFrom(path) }));
}

export const creativityWorkImages = toList(creativity);
export const instagramImages = toList(instagramPics);

const teamPics = import.meta.glob<string>("/src/assets/team/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}", {
  eager: true,
  import: "default",
});

/** Team photo for a first name («Julie» → src/assets/team/julie.jpg), or undefined. */
export function teamPhoto(name: string): string | undefined {
  const key = name.toLowerCase();
  const path = Object.keys(teamPics).find((p) => p.split("/").pop()!.replace(/\.[^.]+$/, "").toLowerCase() === key);
  return path ? teamPics[path] : undefined;
}
