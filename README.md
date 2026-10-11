# Flora flower studio

A Persian/English florist website combining LOOMERE's continuous scroll story with Woshe's editorial collections and occasion browsing

## Run locally

```sh
cd /Users/aliibanisaeid/Downloads/Flowershop
npm ci
npm run dev
```

Local preview: http://127.0.0.1:5193/

```sh
npm run build
npm run preview
```

The production build uses `/flora/` as its base path. The build preview therefore opens at http://127.0.0.1:5193/flora/ when the development server is stopped

## Included

- Persian first, with true RTL and locally hosted Bonyade Koodak fonts; English LTR with Cabinet Grotesk and Inter Tight
- One original 15-second flower-to-bouquet film, controlled by scrolling forward or backward through six chapters
- Desktop and mobile film encodes, exact matching JPEG posters and a static reduced-motion presentation that does not fetch the film
- A stable four-link header, original botanical Flora logo, rounded cards, warm ivory, forest green, burgundy and bronze details
- Editorial Woshe photography, collection filters, product details and occasion choices that set the composer's suggested palette
- Color, size and wrapping choices, visible price calculation, a persistent bag, quantity changes and removal
- Native dialogs, form validation, local selection saving and downloadable details
- Flower-care answers closed by default
- Research-informed original Persian/English copy with no terminal periods in public headings

The hero scroll arrow is retained. Other editorial arrows use Flora's botanical mark. The opening links, small chapter tags, scroll instruction text and decorative leaf icons requested for removal are absent

## Deployment

`.github/workflows/pages.yml` builds with Node 22 and publishes `dist` through GitHub Pages on pushes to `main`

Target: https://aliibanisaeid.github.io/flora/

## Current scope

This is a storefront prototype. Products and prices are demonstration data. The order preview saves to the visitor's browser; it does not send an order, take payment or confirm delivery. Real inventory, business details, ordering and delivery services are still required for commercial checkout

## Project map

- `src/ScrollCinema.tsx`, `src/cinema.css`: continuous film and six chapter states
- `src/App.tsx`: storefront, composer, bag and order-preview dialogs
- `src/Editorial.tsx`: collections and occasions
- `src/content.ts`: bilingual copy, demonstration products and pricing
- `src/asset.ts`: local/project-path asset URLs
- `src/styles.css`, `src/brand.css`: responsive layouts, typography and brand styling
- `public/brand`: production SVG logo variants
- `public/images`: used photographs, film encodes and posters
- `assets/source`: original media and logo font source
- `docs/messaging-research.md`: qualitative competitor research and chosen copy
- `docs/sources.md`: reference and asset provenance
- `docs/design-brief.md`: the final adapted creative brief
