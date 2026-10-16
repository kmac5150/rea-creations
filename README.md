# DAZN iPhone recreation

Unofficial UI recreation of **DAZN iOS 2.45.88** (US App Store, 15 Oct 2026). Not affiliated with DAZN.

The layout was rebuilt from public App Store screenshots (Home, Schedule, Highlights, Scores, News, FanZone, player, competition hubs). There is no IPA, no live API, and no real catalog.

Dummy content only: invented clubs, fighters, leagues, shows, movies, and news. Images are generic sports photography.

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`. Desktop shows an iPhone frame; a phone-sized viewport goes full screen.

## Surfaces

- **Home** — hero carousel, competition sub-nav, Live now, Coming up, Originals, Movies, live channels
- **Schedule** — date-grouped events with reminder bells
- **Highlights** — near-live clips, club row, watch sheet
- **Scores** — sport chips, date strip, stacked match cards
- **News** — chips, featured stories, article reader
- **Player + FanZone** — live chrome, cheer meter, chat, paid reactions
- **Search / My DAZN / hubs**

