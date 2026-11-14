# GLAM_Hack_repo — Artothek app

Web app for the SKKG Artothek («Kunst auf Zeit»): people borrow an original artwork for six months.

- **Borrower app (mobile, 375):** artwork information (mint), social impact (orange), conservation with live sensor data (blue), sensor setup and end-of-loan survey flows.
- **Staff dashboard (desktop, 1440):** one artwork at a glance + Artothek overview.

Designs live in Paper (file **Glam_hack**): `High_fidelity` (mobile), `Desktop – Staff`, and `Design System v2 – Dev handoff` (tokens + components).

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · React Router 7. Artwork data comes from the SKKG SPARQL endpoint (`src/lib/artothek.ts`).

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
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

## Conventions

- Mobile screens: white cards on the area colour; primary button = ink fill with the area colour as label; footer tabs always white.
- Desktop: full-bleed area tiles, radius 0, outlined pills.
- Component names match the Paper layer names (e.g. `SectionHeader`, `SensorTile`, `StepHeader`).
