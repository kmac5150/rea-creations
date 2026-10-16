# Ticketmaster iPhone app recreation (iOS 303.0)

An interactive web recreation of the current **Ticketmaster－Buy, Sell Tickets** iPhone app (App Store version 303.0, released Oct 12, 2026), built from scratch with fictional artists, venues, events and orders.

## How it was reverse engineered

- **App Store metadata**: iTunes lookup for `com.ticketmaster.ios.TicketmasterApp` gave the version, release date and the seven current iPhone screenshots. They show Discover (For You and Trending), Watchlist, the seat map with filters and results, the 360° seat view, checkout with a countdown timer, the SafeTix mobile ticket, and order management with Sell/Transfer.
- **[REA](https://github.com/morluto/rea)** (`npx rea-agents`): ran against an isolated Chrome with an iOS 26 Safari user agent, using `inspect-web-page --include-accessibility-text` and `capture-web-screenshot` on ticketmaster.com. Captured the home page, an artist page and an event page. From these it took the section names (Trending, Happening This Weekend, Popular Near You, category rows), the artist page layout (genre, favorite, rating, tabs, event list with "Find Tickets"), and the event page details: the "What You Need To Know" notice, the Important Info bar, the ticket quantity pill, and listing rows formatted as `Sec 323 • Row K / Standard Admission / $40.90`.

## What's in it

- **Discover**: location picker, "Search for Artists", For You carousel, numbered Trending list, Happening This Weekend, Browse By Category, Presales & Offers, Popular Near You.
- **Search** and **artist pages**: live search across artists, venues and events; artist page with favorite, rating, and Events / About / Reviews tabs.
- **Event page**: the "What You Need To Know" notice on first visit, an expandable Important Info bar, filter chips (quantity, Price sort, Ticket Types, Perks, Accessible), and an interactive arena seat map. Tap a section to filter the results. The results list shows mini-maps, ticket types, perk tags and prices.
- **Seat view sheet**: seat dots, a "360° view from rows" photo, section/row/seats, level and price, and an "Add" button.
- **Checkout**: 8-minute countdown (tickets are released when it hits zero), Mobile Ticket delivery, Card / PayPal / Apple Pay, optional ticket insurance, TOTAL breakdown with service fees, Edit/Cancel Order.
- **My Events → order → View Tickets**: order page with Tickets/Extras tabs and a floating Sell / Transfer bar. Mobile tickets have a rotating barcode with a moving scan line ("Screenshots won't get you in"), swipeable seats, "Enter via Gate", and Add to Apple Wallet.
- **Transfer** (pick seats and a recipient; seats show as Transferred) and **Sell** (set a price, see your payout, list/edit/remove).
- **Watchlist**: Events grouped by month, with color-coded status ("Event in N Days" → Find Tickets, "Upcoming Presales" → Set Reminder, "You're Going" → View Tickets) and a Favorites tab.
- **Sell** tab (listings and potential payout) and **My Account**.

All artists, venues, prices, people and orders are made up. Photos are Unsplash stock images.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173.
