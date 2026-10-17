# Untappd for Business — iPhone recreation

An interactive, from-scratch recreation of **Untappd for Business** for iOS, **version 6.1.15** (released Feb 6, 2026, bundle `com.utfb.app`), built with React + Vite in an iPhone frame. All data is fictional.

## How it was built

- **App Store:** 7 current iPhone screenshots and the listing for v6.1.15. They are the source for the tab bar, light-blue venue header, menu list, Insights cards, Check-Ins feed and Events.
- **REA:** `rea-agents` web capture and inspect, using an iPhone user agent.
  - `utfb.untappd.com` and `untappd.com/business` stayed behind a Cloudflare human check, so those pages could not be captured.
  - REA captured the official Untappd help center instead: "Untappd for Business – Mobile App", "Understanding Venue Analytics", and "A Fresh New Look". Their in-app screenshots and GIFs were pulled through the Zendesk article API. They show:
    - the Beer Selection list with tap numbers
    - Check-Ins with Comment and Toast
    - Event Details
    - Insights: Menu Views and Top Rated Styles
    - Digital Menus with Theme and Structure
- Refs live in `refs/untappd-business/` (gitignored).

## What works

- **Menus**
  - Menu list with Published / Unpublished status, search across menus, sections and items, and Add New Menu.
  - Menu detail: publish toggle, active vs Coming Soon (On Deck) sections.
  - Section tap list: beer cards with brewery, style, ABV, IBU and calories, bottle-cap ratings, tap number, and expandable containers with prices.
  - Item actions: Move, Replace, Delete.
  - Add Item search sheet; Edit Item with tap number and prices.
  - Beer / Wine / Spirit / Ready to Drink chips.
- **Check-Ins:** On Premise / Purchased From feed grouped by date, with caps, quotes, photos and badges. Toast toggles; Comment posts a venue reply.
- **Events**
  - In Progress / Upcoming / Past with search.
  - Event Details form: required fields, free-event checkbox with price, 16:9 image picker, Save & Exit, Delete.
- **Insights**
  - Timeframe sheet; All / On Premise / Off Premise.
  - Tiles: Check-ins, Menu Views, Unique Users, Subscribers.
  - Check-Ins chart (Day / Week / Month / Quarter) with total, unique users and check-in ratio.
  - Menu Views stacked chart by source.
  - Top Rated Styles.
- **More**
  - Digital Menus: list, ⋯ menu with Settings / Copy URL / Delete, and an editor for menu selection and themes.
  - Menu History (every edit is logged), Announcements, Nearby Stats, Promo Stats, Print, Embed.
- **Header:** venue switcher sheet (pin), rocket announcement sheet, menu QR code.

## Run

```bash
npm install
npx vite --port 5173
```

Stock photos are from Unsplash. Beer labels are generated color tiles. Brewery, venue and people names are made up.
