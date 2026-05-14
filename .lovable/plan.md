## Scope

Three focused changes — no business-logic changes, all frontend.

### 1. Workflow card → image + info layout

Restructure `WorkflowCard.tsx` so each card has:
- **Top: 16:9 image area** (cover-fitted screenshot, light gray fallback if missing) with a small overlapping logo cluster pinned bottom-left.
- **Bottom: info block** — category badge, title, one-line description, "Case study →" action.

Data layer:
- Add an optional `image: string` field to the `Workflow` type in `src/data/workflows.ts`.
- Wire each existing entry to a placeholder import path under `src/assets/workflows/{id}.png`. Until you upload real n8n canvas screenshots, render a clean SVG placeholder ("Workflow preview") so layout stays intact.
- I'll list the exact filenames you need to upload (one per workflow) so you can drop them in.

Same change flows through `index.tsx` (featured card) and the workflows grid automatically.

### 2. "What I do" section gets logos

Each of the 4 cards keeps its current Lucide icon top-left, and gains a small horizontal logo strip under the description showing the relevant brand marks:

- Card 1 (End-to-end n8n): n8n
- Card 2 (AI-powered logic): OpenAI + Gemini
- Card 3 (API & webhooks): Stripe + Notion + Airtable + Shopify
- Card 4 (Reliable by default): Sentry (or Grafana — your call)

**Logos to upload** (SVG preferred, one file each):
- `gemini.svg`
- `shopify.svg`
- `sentry.svg` *(or `grafana.svg`)*

Drop them into chat; I'll register them in `BrandLogos.tsx`. Until uploaded, those slots render a neutral placeholder chip so nothing breaks.

### 3. Contact section — copy the layout, keep light theme

Rebuild `src/routes/contact.tsx` to mirror the reference structure on the existing light surface:

- Two-column grid (stacks on mobile).
- **Left column:** small `[07] CONTACT` eyebrow in brand accent, large headline "Let's build something that runs itself.", supporting paragraph, then a **2×2 grid of social tiles** (Email, LinkedIn, GitHub, Upwork) — each tile shows the brand SVG on the left, a tiny uppercase label on top, and the handle/value below.
- **Right column:** card containing the form — Name + Email row, Company, Project Details textarea, full-width primary "Send Message" button with paper-plane icon. Same Zod validation + mailto behavior already in place.

All tokens stay light (`bg-card`, `border-border`, `text-foreground`); only the visual rhythm of the reference is borrowed.

## Files touched

- `src/data/workflows.ts` — add `image` field
- `src/components/WorkflowCard.tsx` — new image-top layout
- `src/components/BrandLogos.tsx` — register Gemini/Shopify/Sentry once uploaded
- `src/routes/index.tsx` — logo strips in "What I do" cards; featured card uses new layout
- `src/routes/contact.tsx` — rebuilt to reference layout
- `src/assets/workflows/` — new folder for screenshots (placeholders meanwhile)

## What I need from you (after approval)

1. Upload `gemini.svg`, `shopify.svg`, `sentry.svg` (or `grafana.svg`).
2. Upload one screenshot per workflow. I'll give you the exact filename list once the data structure is in.
