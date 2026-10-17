# OpenTable for Restaurants — iPhone recreation

An interactive, from-scratch recreation of **OpenTable for Restaurants** for iOS, **version 11.13.0** (released Oct 12, 2026, bundle `com.opentable.GuestCenter`), built with React + Vite in an iPhone frame. All data is fictional.

## How it was built

- **App Store:** only 3 iPhone screenshots, plus 2 iPad screenshots pulled from the same listing. Together they show:
  - the dark date + shift bar ("Thu, Dec 8 · Dinner") with Stats / Overview / Guest List / Floor Plan tabs
  - the Floor Plan with purple seated tables, a party-size badge and a progress bar
  - the 360 guest profile: VIP star, teal phone, area, company, tag chips (Alert the chef, Frequent guest, VIP, Booth requested, Allergy, Birthday), "Not paid · $20.00"
  - the Stats report: Revenue vs "previous 4 Sun", Shift Stats covers with the Phone / Walk-Ins / Online split, Shift Flow
  - the iPad book: Waitlist "by added time" chips, Reservations "by scheduled time", Seated "by seated time", status squares (pink partly arrived, yellow late, voicemail, check), table boxes
  - the reservation panel: time / party / duration chips, the blue Booked status button, suggested tables, Send deposit request, Re-send confirmation, Message guest, the pacing-limit switch
- **REA:** `rea-agents` web capture and inspect with an iPhone user agent on six OpenTable product pages: GuestCenter, Table management, Owner app, Reporting, Waitlist, and Relationship management. These gave the feature names (VIP arrived/seated push, guest notes and tags, waitlist SMS, real-time place in line, shift overview, benchmark vs local restaurants).
- **Product mockups:** the in-page images pulled through the same Chrome over CDP (`web/`): owner-app guest edit, VIP push notifications, Shift Overview with the 4-week trend chart, compare-to-local, get-more-covers.
- `support.opentable.com` is a Salesforce site with no public article API, and `guestcenter.opentable.com` needs a restaurant login, so no live in-app screens were captured.
- Refs live in `refs/opentable-restaurants/` (gitignored).

## What works

- **Shift bar** on every book view: hamburger, date with previous / next day, shift picker (Lunch / Dinner), live parties and covers counts, Back to today.
- **Reservations**
  - Shift note banner (edit from the menu).
  - Waitlist chips with quoted time; over-quote parties turn yellow.
  - Reservations by scheduled time, Seated by seated time with time-at-table, Finished & cancelled; each section collapses and shows parties / covers.
  - Rows: status square, party size, time, tag icons, VIP star, note / deposit icons, table box.
  - New reservation sheet with a slot grid that shows covers booked against the pacing limit; Walk-in sheet that seats on the first free table.
- **Reservation detail:** status sheet (Booked → Confirmed → Left message → Late → Partially arrived → Arrived → Seated → Finished, No-show, Cancelled). Seating a VIP fires a "VIP Seated" alert. Also table assignment (busy tables locked), deposit request, re-send confirmation, text-the-guest presets, unpaid deposit, pacing switch, editable visit note.
- **Waitlist:** place in line, waited vs quoted bar, Notified badge, text "table ready", seat on a free table (moves them into Seated), remove, add-to-waitlist sheet with party size and quote.
- **Floor Plan:** Main / Bar / Patio filter; tables colored seated (purple, with party badge), next hour (blue), bussing (green), open (gray). Tap a table to finish and free it, seat the next reservation, mark it clean, or seat a walk-in.
- **Guests:** searchable guestbook with VIP / Upcoming / Allergies filters. The 360 profile has editable tags, upcoming / visits / cancels / no-shows / spend, visit history (opens the reservation), a general note, and dietary / seating preferences.
- **Stats:** Revenue and Shift Stats against the previous 4 weeks, the Phone / Walk-in / Online split, Shift Flow against the 4-week trend, KPI grid, covers this week, compare to local restaurants. Overview shows pacing per 15-minute slot; Guest List shows every booking this shift.
- **Menu drawer:** restaurant header, manager, Notifications (VIP alerts and booking changes), Shift notes, Guestbook, Reports, and stubs for availability, settings, switch restaurant, sign out.

## Run

```bash
npm install
npx vite --port 5174
```

Stock photos are from Unsplash. The restaurant, guests and numbers are made up.
