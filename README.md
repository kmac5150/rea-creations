# DoorDash iPhone app recreation (iOS 8.40.0)

An interactive web recreation of the current **DoorDash: Food, Grocery, More** iPhone app (App Store version 8.40.0, released Oct 12, 2026), built from scratch with fictional stores, menus and orders.

## How it was reverse engineered

- **App Store metadata**: iTunes lookup for `doordash.DoorDashConsumer` gave the version, release date, and the six current iPhone screenshots. These show the tab bar (Home, Grocery, Retail, Orders, Browse), the home feed, order tracking with DoubleDash, the Grocery hub, and the cart.
- **[REA](https://github.com/morluto/rea)** (`npx rea-agents`): ran against an isolated Chrome instance with an iOS 26 Safari user agent, using `list-browser-targets`, `inspect-web-page --include-accessibility-text` and `capture-web-screenshot` on doordash.com. Captured the landing page, a city restaurant feed, and a store menu. From these it took the store-card format (rating and review count, cuisines, fee, distance, ETA, promo tags), the store header (DashPass, Delivery/Pickup/Group Order, fee and time box), menu category structure, and featured items.

## What's in it

- **Home**: address picker, account/notifications/cart buttons, "Search DoorDash" bar plus map button, cuisine icon row, working filter pills (DashPass, Pickup, Ratings, Under 30 min, Offers), promo banners, store carousels (Groceries, DashPass Exclusive Deals, Fastest near you, Halloween Treats), and an All Stores list.
- **Store page**: hero photo with back/search/save/more buttons, logo, rating and DashPass line, Delivery/Pickup toggle, Group Order, fee box, deal card, sticky category tabs, Featured Items, menu rows with "#1 Most liked" badges. Grocery and retail stores show a product grid instead.
- **Item sheet**: required and optional option groups, special instructions, quantity stepper, live-priced "Add to cart".
- **Cart → Checkout → Tracking**: multiple carts (one per store), Our Picks, Delivery/Pickup, Priority/Standard/Schedule delivery, payment, Dasher tip, itemized fees and promos. After "Place Order", tracking runs live: Confirming → Preparing → Heading to you → Arriving now, with a map, Dasher card, order details, and a DoubleDash add-on sheet with a countdown.
- **Grocery / Retail hubs**: category chips, store logo row, per-store product carousels with +/− steppers.
- **Orders**: in-progress order card and completed orders with star ratings and Reorder.
- **Browse**: recent searches, store-type tiles, cuisine grid, and live search across stores and items.
- **Account**, **Notifications**, and **Addresses** sheets.

All store names, menus, prices, people and orders are made up. Restaurant photos are Unsplash stock images; packaged goods use emoji product tiles.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173.
