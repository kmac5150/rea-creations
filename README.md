# Zillow iPhone app — REA recreation

Interactive recreation of **Zillow Real Estate & Rentals for iOS, version 2026.77.0** (bundle `com.zillow.ZillowMap`, released Oct 15, 2026), built with React 19 + TypeScript + Vite inside an iPhone frame. All listings, agents, prices, messages and addresses are dummy data; photos are royalty-free Unsplash stock.

```bash
npm install
npm run dev     # http://localhost:5173
```

## How it was reverse engineered

Evidence was gathered with [REA](https://github.com/morluto/rea) (`rea-agents` 6.5.0) plus Apple's public listing:

| Source | REA command | What it established |
| --- | --- | --- |
| zillow.com in an iPhone-UA Chrome via CDP | `list-browser-targets`, `capture-web-screenshot` | Home, search results and listing pages as served to iPhone |
| Same pages | `inspect-web-page --include-accessibility-text` | Tab structure **Search · Updates · Favorites · Plan · Inbox**; search chips (For sale, Price, Filters, Save search); "Switch to map" / "Sort" controls; listing-detail sections (photo carousel, 3D tour, floor plan, Est. payment, What's special, Facts & features, Price history, Offer Insights, Estimated market value, Climate risks, Getting around, Nearby schools); sticky Contact / Request a tour CTAs |
| App Store lookup API | — | Version, release notes, 6 iPhone + 9 iPad screenshots: Plan onboarding ("It all starts with a plan"), Plan Overview/Buying/Selling tabs, BuyAbility card, "Find the home" step with the green "Choose your agent" card, floating liquid-glass tab bar, red price-pin map, Updates recommendation rows, natural-language search |

No app binary was decrypted or decompiled; the IPA is FairPlay-encrypted and requires a signed-in Apple ID to download.

## What's in the app

- **Search** — map with draggable pan, red price pins, density dots, layers/draw/location controls, pin preview card; list view with photo carousels and the floating Map | Sort pill; natural-language search overlay; full Filters sheet (listing type, price, beds, baths, home type, must-haves); sort sheet.
- **Listing detail** — hero carousel with media chips, agent row, status, price/specs, Est. monthly payment, facts grid, What's special, Facts & features, Zestimate chart, Offer Insights, price history, climate risks, walk/bike scores, schools; Request-a-tour sheet (date + time), Contact agent sheet, photo gallery with floor plan.
- **Updates** — recommendation carousels (Homes For You, price cuts, selling soon, open houses, rentals).
- **Favorites** — saved homes (heart anywhere to save) with co-shopper invite, and saved searches.
- **Plan** — goal onboarding, Overview with BuyAbility℠ card, Buying/Selling step lists, step detail with agent card and checklist, interactive BuyAbility calculator.
- **Inbox** — agent conversations with a working composer, and notifications with unread badges.

## Layout

```
src/
  App.tsx            phone frame, tab state, navigation stack, sheets
  app-context.ts     shared state, filters, sorting
  components.tsx     tab bar, cards, sheets, illustrations
  data.ts            dummy listings, agents, messages, plan steps
  icons.tsx          SVG icon set + Zillow wordmark
  screens/           Search, MapCanvas, HomeDetail, Updates, Favorites, Plan, Inbox
public/photos/       stock house photos
```
