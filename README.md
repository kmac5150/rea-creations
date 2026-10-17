# Yelp for Business — iPhone recreation

An interactive, from-scratch recreation of **Yelp for Business** for iOS, **version 26.42.0** (released Oct 12, 2026, bundle `com.yelp.bizapp`), built with React + Vite in an iPhone frame. All data is fictional.

## How it was built

- **App Store:** the 5 listing screenshots are still the original 2014 red-header designs. They were used for flows the current app keeps:
  - the User Views table with "vs. previous 30 days"
  - review replies with the "Make Reply Public" switch
  - message replies
  - the Automatically Sorted photo grid
- **REA:** `rea-agents` web capture and inspect with an iPhone user agent, on two pages:
  - `business.yelp.com/business-mobile-app/`: feature copy.
  - Yelp's engineering blog post on the Yelp for Business app. Its in-app screenshots show the current design:
    - photo hero with stars and the envelope badge
    - Activity card with User views and Customer leads tabs and a chart
    - Inbox card
    - tab bar: Home, Yelp Ads, Business Info, Inbox / Notifications, More
    - Yelp Ads with Performance / Customers / Ad controls and the Ads vs organic leads chart
    - Upgrade Package, Table Management and Call to Action cards
  - `biz.yelp.com` needs a login and did not render app screens.
- **Yelp's "What's new" page:** source for the Inbox lead status labels (Active, Scheduled, In progress, Done, Archived) and the AI job summaries.
- Refs live in `refs/yelp-business/` (gitignored).

## What works

- **Home**
  - Hero with rating; the envelope opens Notifications.
  - Activity card (User views / Customer leads); its arrow opens a 30-day chart, a table, and the change vs the previous period.
  - Inbox and Reviews previews, Recent Activity, Call to Action sample.
- **Yelp Ads**
  - Live / Paused badge.
  - Performance: Ads vs organic leads stacked chart, impressions, clicks, spend, cost per lead.
  - Customers list.
  - Ad controls: pause, daily budget sheet, smart selection, Call to Action editor, Upgrade Package with a 14-day trial.
- **Business Info**
  - Page completeness meter.
  - Edit name, address, phone and website in sheets; hours editor.
  - Photo grid with Add Photo and remove; amenity switches.
- **Inbox:** status filter chips with counts, AI summaries, conversation threads with replies, and status changes inside a thread.
- **More**
  - Reviews list with a Needs reply filter; reply with a public / private switch.
  - Notifications with Mark all read, Upgrade Package, Yelp Guest Manager pitch, check-in offers, settings, support.

## Run

```bash
npm install
npx vite --port 5173
```

Stock photos are from Unsplash. The business, reviewers and customers are made up.
