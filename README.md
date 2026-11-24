# GLAM_Hack_repo — Artothek app

Web app for the SKKG Artothek («Kunst auf Zeit»): people borrow an original artwork for six months.

## The project in brief
The SKKG Artothek in Winterthur lends original artworks to private homes for 3–6 months. That stay at home is where most of the impact happens, and it is also the part SKKG knows least about. The conservation team gets no data on temperature, humidity or light. The Artothek learns nothing about the conversations and feelings the artwork sparks.


### the Digital Impact Monitor:  
- A small kit with sensors and an NFC tag that comes with the artwork rented.  
Placed next to the artwork, it collects data about the environment, like light, humidity and temperature.  
- Tap it with your phone to open the mobile app; there you’ll find the artwork's information and history, live care conditions, and, most importantly, a section dedicated to the piece's stay in people's homes, stories from previous hosts, the feelings it evokes and  the conversations it started.
- A staff dashboard for the conservation teams brings together the physical and social data for every artwork.

- **Borrower app (mobile, 375):** artwork information (mint), social impact (orange), conservation with live sensor data (blue), sensor setup and end-of-loan survey flows.
- **Staff dashboard (desktop, 1440):** one artwork at a glance + Artothek overview.

Designs live in Paper and build with Claude Opus 5.5

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · React Router 7. Artwork data comes from the SKKG SPARQL endpoint (`src/lib/artothek.ts`).



## Team Credit

Research, the rental journey, the concept and the core features were team work. All four of us took part in the pitch.

- **Julie Agustoni — UX Designer & Web Developer**
  - research, journey and concept (with the team)
  - led the architecture and data: kit → web app → dashboard, SKKG open data
  - UI and design system in Paper (shared)
  - built and deployed the working prototype
  - pitch and slides

- **Christine Müller Stalder — Project Manager # Challeng Owner**
  - Artothek expertise: how loans and conservation work in practice
  - brought the SKKG challenge, with Sonja Gasser
  - concept, core features, pitch and slides

- **Lara Rodrigues Ristić — UX & UI Designer**
  - research and the rental journey
  - concept and core features
  - pitch and slides
- **Juliane Eberhardt** — **Content & Research**
  - research and content
  - concept and core features
  - pitch and slides


## Getting started

From the `1_code` folder, go into the project first:

```bash
cd GLAM_Hack_repo
```

Then:

```bash
npm install        # first time only
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
```

> **Windows PowerShell 5.1:** `&&` doesn't work there (« Le jeton && n'est pas un séparateur d'instruction valide »). Run commands one per line, or chain them with `;` — e.g. `cd GLAM_Hack_repo; npm run dev`. All the `npm run …` scripts work in any shell.

## Deploy

Live: **https://julieagu.github.io/GLAM_Hack_repo/**

Every push to `main` builds the app and publishes it to GitHub Pages (`.github/workflows/deploy.yml`).
One-time setup: repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.

How it works on a static host:
- The Pages build (`npm run build:pages`, or `GITHUB_PAGES=true` in CI) uses the `/GLAM_Hack_repo/` base path for Vite and the router. Local `npm run dev` stays at `/`.
- `npm run build` also writes `dist/404.html` (a copy of `index.html`), so refreshing or sharing a deep link like `/social/conversations` still opens the app.
- Reference public files with `import.meta.env.BASE_URL` (e.g. the SKKG logo), never with a leading `/`.

Test the Pages build locally:

```bash
npm run preview:pages    # then open http://localhost:4173/GLAM_Hack_repo/
```

Useful routes: `/` home · `/artwork` · `/social` · `/conservation` · `/staff` · `/design-system` (living style guide).

## Project structure

```
src/
  styles/
    tokens.css      Design tokens as a Tailwind v4 @theme (exported from Paper)
    index.css       Tailwind import, area theming, base styles
  components/
    ui/             Button, IconButton, Chip, Tag, Card, SectionHeader, rows, StatusDot, SensorTile, Icon
    layout/         MobileScreen, BrandHeader, PageTopBar/PageTitle, FooterTabs, StepHeader
  pages/            One file per screen
  lib/              sparql client, Artothek queries, cn()
  data/mock.ts      Placeholder data matching the designs
public/             Static assets (SKKG logo)
```

## Design tokens

`src/styles/tokens.css` is the Tailwind export of the Paper tokens. Change tokens in Paper first, then re-export.

| Need | Use |
| --- | --- |
| Area colours | `bg-mint` / `bg-orange` / `bg-blue`, shades `-100 … -900` |
| Current screen's area colour | `bg-area`, `text-area`, `bg-area-soft`, `text-area-ink` (set `data-area="artwork \| social \| conservation"` on a parent) |
| Status | `bg-status-ok`, `bg-status-watch`, `bg-status-action` — never the area colour |
| Neutrals | `text-ink`, `text-ink-muted`, `border-line`, `bg-stone`, `bg-track` |
| Type (size + line height) | `text-hero` 88 · `text-display` 48 · `text-headline` 34 · `text-title` 26 · `text-lead` 20 · `text-body` 16 · `text-caption` 14 · `text-micro` 12 |
| Weight | `font-light` (300, default) · `font-medium` (500, emphasis only) |
| Radius | `rounded-md` 12 (cards) · `rounded-pill` (buttons, chips) · `rounded-none` (desktop tiles) |
| Width | `max-w-mobile` 375 · `max-w-content` 720 · `max-w-desktop` 1392 |
| Spacing | Tailwind default 4px steps: DS 24 = `6`, 32 = `8`, 40 = `10`, 80 = `20` |

Breakpoints follow the DS: `sm` 375, `md` 768, `lg` 1440.



## License

The code is released under the [MIT License](LICENSE).

This covers the source code only. Artwork images and collection data are loaded at runtime from the SKKG (Stiftung für Kunst, Kultur und Geschichte) and remain under their own terms; the SKKG logo in `public/` is the foundation's trademark and is not covered by the MIT License.
