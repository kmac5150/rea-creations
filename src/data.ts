export type Sport =
  | "football"
  | "boxing"
  | "basketball"
  | "hockey"
  | "combat"
  | "show";

export type EventKind = "match" | "fight" | "show" | "movie" | "channel";

export type EventStatus = "live" | "upcoming" | "replay";

export type Team = {
  id: string;
  name: string;
  short: string;
  color: string;
  accent: string;
};

export type Competition = {
  id: string;
  name: string;
  sport: Sport;
  tagline: string;
  hero: string;
  logoLabel: string;
  logoColor: string;
};

export type CatalogEvent = {
  id: string;
  kind: EventKind;
  title: string;
  subtitle: string;
  description: string;
  competitionId?: string;
  homeId?: string;
  awayId?: string;
  start: string;
  status: EventStatus;
  image: string;
  duration: string;
  rail?: string;
  score?: [number, number];
  minute?: string;
  stats?: { label: string; home: number; away: number }[];
  scorers?: { name: string; minute: string; side: "home" | "away" }[];
};

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  sport: string;
  source: string;
  time: string;
  image: string;
  featured?: boolean;
};

export type Highlight = {
  id: string;
  title: string;
  eventId: string;
  image: string;
  duration: string;
  label: string;
};

const img = {
  boxingHero:
    "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1400&q=80",
  boxingRing:
    "https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?auto=format&fit=crop&w=1400&q=80",
  boxingChamp:
    "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1400&q=80",
  boxingGym:
    "https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?auto=format&fit=crop&w=1400&q=80",
  soccerNight:
    "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
  soccerAction:
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1400&q=80",
  soccerKick:
    "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1400&q=80",
  soccerCrowd:
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1400&q=80",
  soccerPortrait:
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=80",
  basketball:
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1400&q=80",
  basketballDunk:
    "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1400&q=80",
  hockey:
    "https://images.unsplash.com/photo-1515703407324-5f753afd8be8?auto=format&fit=crop&w=1400&q=80",
  hockeyGoal:
    "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=1400&q=80",
  combat:
    "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1400&q=80",
  documentary:
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1400&q=80",
  stadiumLights:
    "https://images.unsplash.com/photo-1459865264687-595d171e4ee3?auto=format&fit=crop&w=1400&q=80",
};

export const user = {
  name: "Taylor",
  initial: "T",
  plan: "DAZN Ultimate",
  coins: 145248,
};

export const teams: Team[] = [
  { id: "nh", name: "North Harbor", short: "NHB", color: "#123A73", accent: "#F4C430" },
  { id: "rv", name: "Riverton FC", short: "RIV", color: "#7A1024", accent: "#F2E6C9" },
  { id: "ax", name: "Apex United", short: "APX", color: "#0E6B63", accent: "#E8FFF8" },
  { id: "eb", name: "Eastbridge", short: "EBR", color: "#1C2A4A", accent: "#7EC8E3" },
  { id: "mh", name: "Millhaven", short: "MIL", color: "#1F6B2A", accent: "#D9F59A" },
  { id: "sc", name: "Solara City", short: "SOL", color: "#C45C12", accent: "#FFE4C4" },
  { id: "br", name: "Blackridge", short: "BLK", color: "#161616", accent: "#E23B3B" },
  { id: "ps", name: "Portside Athletic", short: "PRT", color: "#0B6E8A", accent: "#B8F1FF" },
  { id: "kc", name: "Kingscourt", short: "KNG", color: "#4B1D8A", accent: "#E8D5FF" },
  { id: "vl", name: "Valewood", short: "VAL", color: "#8A1D3A", accent: "#FFD5E0" },
  { id: "iron", name: "Iron Harbor", short: "IRN", color: "#2B3642", accent: "#C9A227" },
  { id: "fox", name: "Foxhollow", short: "FOX", color: "#8B3A12", accent: "#FFD9A0" },
];

export const competitions: Competition[] = [
  {
    id: "apex",
    name: "Apex Super League",
    sport: "football",
    tagline: "Every club. Every night. One league.",
    hero: img.soccerNight,
    logoLabel: "ASL",
    logoColor: "#1FA37A",
  },
  {
    id: "harbor",
    name: "Harbor Cup",
    sport: "football",
    tagline: "Knockout nights across the coast.",
    hero: img.soccerCrowd,
    logoLabel: "HC",
    logoColor: "#2F6FED",
  },
  {
    id: "night-circuit",
    name: "Night Circuit",
    sport: "boxing",
    tagline: "12 fight nights. One subscription.",
    hero: img.boxingHero,
    logoLabel: "NC",
    logoColor: "#C9A227",
  },
  {
    id: "grid",
    name: "Grid League",
    sport: "basketball",
    tagline: "Every dunk. Every home market.",
    hero: img.basketballDunk,
    logoLabel: "GL",
    logoColor: "#E35B1F",
  },
  {
    id: "ice",
    name: "Ice Circuit",
    sport: "hockey",
    tagline: "The whole season, including the final.",
    hero: img.hockey,
    logoLabel: "ICE",
    logoColor: "#3BA3D9",
  },
  {
    id: "bare-ring",
    name: "Bare Ring",
    sport: "combat",
    tagline: "Unfiltered fight nights, live.",
    hero: img.combat,
    logoLabel: "BR",
    logoColor: "#D61F3A",
  },
];

const stats = [
  { label: "Possession", home: 58, away: 42 },
  { label: "Shots", home: 16, away: 9 },
  { label: "On target", home: 7, away: 3 },
  { label: "Fouls", home: 11, away: 14 },
];

export const events: CatalogEvent[] = [
  {
    id: "live-apex",
    kind: "match",
    title: "North Harbor vs Riverton",
    subtitle: "Apex Super League · Matchday 8",
    description: "Harbor Park is packed as the league leaders host Riverton under the lights.",
    competitionId: "apex",
    homeId: "nh",
    awayId: "rv",
    start: "2026-10-15T19:00:00",
    status: "live",
    image: img.soccerAction,
    duration: "90 min",
    rail: "live",
    score: [2, 1],
    minute: "67'",
    stats,
    scorers: [
      { name: "Ellis Ward", minute: "12'", side: "home" },
      { name: "Noa Silva", minute: "41'", side: "away" },
      { name: "Jonah Reed", minute: "63'", side: "home" },
    ],
  },
  {
    id: "live-fight",
    kind: "fight",
    title: "Velez vs Crowe",
    subtitle: "Night Circuit · Main Event",
    description: "Marco Velez defends the circuit belt against Jonah Crowe in a 12-round main event.",
    competitionId: "night-circuit",
    start: "2026-10-15T21:00:00",
    status: "live",
    image: img.boxingHero,
    duration: "12 x 3",
    rail: "live",
  },
  {
    id: "live-grid",
    kind: "match",
    title: "Kingscourt vs Iron Harbor",
    subtitle: "Grid League · Local broadcast",
    description: "A packed arena as Kingscourt chase a fourth straight home win.",
    competitionId: "grid",
    homeId: "kc",
    awayId: "iron",
    start: "2026-10-15T20:30:00",
    status: "live",
    image: img.basketball,
    duration: "48 min",
    rail: "live",
    score: [88, 81],
    minute: "Q4 3:12",
  },
  {
    id: "up-1",
    kind: "match",
    title: "Apex United vs Eastbridge",
    subtitle: "Apex Super League",
    description: "Two title contenders meet at the Apex Dome.",
    competitionId: "apex",
    homeId: "ax",
    awayId: "eb",
    start: "2026-10-16T17:00:00",
    status: "upcoming",
    image: img.soccerKick,
    duration: "90 min",
    rail: "upcoming",
  },
  {
    id: "up-2",
    kind: "match",
    title: "Solara City vs Millhaven",
    subtitle: "Harbor Cup · Quarterfinal",
    description: "Cup night on the coast. One ticket to the last four.",
    competitionId: "harbor",
    homeId: "sc",
    awayId: "mh",
    start: "2026-10-16T20:00:00",
    status: "upcoming",
    image: img.soccerCrowd,
    duration: "90 min",
    rail: "upcoming",
  },
  {
    id: "up-3",
    kind: "fight",
    title: "Okoye vs Park",
    subtitle: "Night Circuit · Co-main",
    description: "Amina Okoye and Lia Park collide for the vacant lightweight strap.",
    competitionId: "night-circuit",
    start: "2026-10-21T21:00:00",
    status: "upcoming",
    image: img.boxingChamp,
    duration: "10 x 3",
    rail: "upcoming",
  },
  {
    id: "up-4",
    kind: "match",
    title: "Portside vs Valewood",
    subtitle: "Apex Super League",
    description: "A mid-table scrap with European places still in reach.",
    competitionId: "apex",
    homeId: "ps",
    awayId: "vl",
    start: "2026-10-17T19:45:00",
    status: "upcoming",
    image: img.stadiumLights,
    duration: "90 min",
    rail: "upcoming",
  },
  {
    id: "up-5",
    kind: "match",
    title: "Foxhollow vs Blackridge",
    subtitle: "Ice Circuit",
    description: "Western conference rivals, first meeting of the season.",
    competitionId: "ice",
    homeId: "fox",
    awayId: "br",
    start: "2026-10-18T19:00:00",
    status: "upcoming",
    image: img.hockeyGoal,
    duration: "60 min",
    rail: "upcoming",
  },
  {
    id: "replay-1",
    kind: "match",
    title: "Blackridge vs Portside",
    subtitle: "Apex Super League · Full replay",
    description: "A five-goal thriller from last weekend, available now.",
    competitionId: "apex",
    homeId: "br",
    awayId: "ps",
    start: "2026-10-12T15:00:00",
    status: "replay",
    image: img.soccerPortrait,
    duration: "1h 54m",
    rail: "replays",
    score: [3, 2],
    minute: "FT",
    stats: [
      { label: "Possession", home: 44, away: 56 },
      { label: "Shots", home: 11, away: 18 },
      { label: "On target", home: 6, away: 8 },
      { label: "Fouls", home: 13, away: 9 },
    ],
    scorers: [
      { name: "Ivo Kane", minute: "9'", side: "home" },
      { name: "Mira Cole", minute: "27'", side: "away" },
      { name: "Ivo Kane", minute: "55'", side: "home" },
      { name: "Theo Nash", minute: "71'", side: "away" },
      { name: "Chris Vale", minute: "88'", side: "home" },
    ],
  },
  {
    id: "show-1",
    kind: "show",
    title: "Ringside: The Cutman",
    subtitle: "Original series · S1 E3",
    description: "Inside the corner between rounds, where fights are saved or lost.",
    start: "2026-10-10T00:00:00",
    status: "replay",
    image: img.boxingGym,
    duration: "48 min",
    rail: "originals",
  },
  {
    id: "show-2",
    kind: "movie",
    title: "90 Minutes",
    subtitle: "Feature documentary",
    description: "One match, eight cameras, and the noise that never leaves the tunnel.",
    start: "2026-09-20T00:00:00",
    status: "replay",
    image: img.documentary,
    duration: "1h 32m",
    rail: "movies",
  },
  {
    id: "show-3",
    kind: "show",
    title: "Blood & Lights",
    subtitle: "Original series · S2 E1",
    description: "The road into Night Circuit, told by the fighters who made it.",
    start: "2026-10-08T00:00:00",
    status: "replay",
    image: img.boxingChamp,
    duration: "42 min",
    rail: "originals",
  },
  {
    id: "show-4",
    kind: "movie",
    title: "Icebound",
    subtitle: "Feature documentary",
    description: "A season on the Ice Circuit, from first skate to the final horn.",
    start: "2026-08-14T00:00:00",
    status: "replay",
    image: img.hockey,
    duration: "1h 18m",
    rail: "movies",
  },
  {
    id: "show-5",
    kind: "show",
    title: "The Grid",
    subtitle: "Weekly studio show",
    description: "Analysis, tape, and the stories behind every home market.",
    start: "2026-10-14T00:00:00",
    status: "replay",
    image: img.basketballDunk,
    duration: "36 min",
    rail: "originals",
  },
  {
    id: "channel-1",
    kind: "channel",
    title: "Action 24",
    subtitle: "Live linear channel",
    description: "Nonstop replays, studio, and live inserts from around the catalog.",
    start: "2026-10-15T00:00:00",
    status: "live",
    image: img.stadiumLights,
    duration: "24/7",
    rail: "channels",
  },
  {
    id: "channel-2",
    kind: "channel",
    title: "Combat Wire",
    subtitle: "Live linear channel",
    description: "Fights, countdown shows, and archive bouts around the clock.",
    start: "2026-10-15T00:00:00",
    status: "live",
    image: img.combat,
    duration: "24/7",
    rail: "channels",
  },
];

export const articles: Article[] = [
  {
    id: "a1",
    title: "How North Harbor became the team nobody wants to press",
    excerpt: "A mid-block that looks simple on tape is swallowing every visitor at Harbor Park.",
    body: "Harbor Park has a sound now. It starts in the 12th minute, when Ellis Ward drops off the front and the whole shape folds into a mid-block that looks simple on tape and feels impossible in the building.\n\nRiverton tried to play through it on Wednesday. For 40 minutes they had the ball. They did not have a shot worth keeping. Ward scored anyway.\n\nThis piece is dummy editorial copy for the recreation — no real clubs, no real reporting — written to fill a news surface that matches the current DAZN iPhone app.",
    sport: "Football",
    source: "DAZN",
    time: "12 min ago",
    image: img.soccerPortrait,
    featured: true,
  },
  {
    id: "a2",
    title: "Velez kept the belt. The round that actually mattered was the sixth.",
    excerpt: "A cut, a reset, and the punch that ended the argument.",
    body: "The sixth round is where the Night Circuit main event stopped being a contest and became a decision. Dummy fight desk copy for this recreation.",
    sport: "Boxing",
    source: "DAZN",
    time: "1 hr ago",
    image: img.boxingRing,
    featured: true,
  },
  {
    id: "a3",
    title: "Grid League nights are selling out for a reason",
    excerpt: "Local broadcasts, packed rooms, and a league that finally feels like a destination.",
    body: "Dummy basketball desk copy. Kingscourt's home crowd has become the loudest room on the circuit.",
    sport: "Basketball",
    source: "DAZN",
    time: "3 hr ago",
    image: img.basketball,
  },
  {
    id: "a4",
    title: "Ice Circuit preview: Foxhollow still cannot solve Blackridge",
    excerpt: "Western rivals open the season with unfinished business from last spring.",
    body: "Dummy hockey desk copy for the recreation.",
    sport: "Hockey",
    source: "DAZN",
    time: "5 hr ago",
    image: img.hockeyGoal,
  },
];

export const highlights: Highlight[] = [
  { id: "h1", title: "Ward's second", eventId: "live-apex", image: img.soccerAction, duration: "0:42", label: "Near-live" },
  { id: "h2", title: "Velez left hook", eventId: "live-fight", image: img.boxingRing, duration: "0:28", label: "Near-live" },
  { id: "h3", title: "Kingscourt run", eventId: "live-grid", image: img.basketballDunk, duration: "1:04", label: "Near-live" },
  { id: "h4", title: "Full highlights", eventId: "replay-1", image: img.soccerPortrait, duration: "8:12", label: "Highlights" },
  { id: "h5", title: "Long highlights", eventId: "replay-1", image: img.soccerKick, duration: "14:40", label: "Long" },
];

export const chatSeed = [
  { id: "c1", user: "Mirasol", host: true, text: "That's the moment of the season. Harbor Park just found another gear.", color: "#7EC8E3" },
  { id: "c2", user: "Hovasky", host: false, text: "What WAS that? Reed from nowhere.", color: "#E8D5FF" },
  { id: "c3", user: "Aislando", host: false, text: "Yesssss let's go!!!!", color: "#FF9EC8" },
  { id: "c4", user: "Nia", host: false, text: "Riverton still in this. Don't sleep.", color: "#9EE7C8" },
];

export const reactions = [
  { id: "foam", emoji: "Foam finger", cost: 5, glyph: "☝️" },
  { id: "flag", emoji: "Flag", cost: 10, glyph: "🏳️" },
  { id: "ears", emoji: "Mouse", cost: 50, glyph: "🐭" },
  { id: "drum", emoji: "Drum", cost: 100, glyph: "🥁" },
  { id: "siren", emoji: "Siren", cost: 500, glyph: "🚨" },
];

export function teamById(id: string): Team {
  const team = teams.find((item) => item.id === id);
  if (!team) {
    throw new Error(`Unknown team ${id}`);
  }
  return team;
}

export function eventById(id: string): CatalogEvent {
  const event = events.find((item) => item.id === id);
  if (!event) {
    throw new Error(`Unknown event ${id}`);
  }
  return event;
}

export function competitionById(id: string): Competition {
  const competition = competitions.find((item) => item.id === id);
  if (!competition) {
    throw new Error(`Unknown competition ${id}`);
  }
  return competition;
}

export function articleById(id: string): Article {
  const article = articles.find((item) => item.id === id);
  if (!article) {
    throw new Error(`Unknown article ${id}`);
  }
  return article;
}

export function eventsForCompetition(id: string): CatalogEvent[] {
  return events.filter((item) => item.competitionId === id);
}

export function eventsByRail(rail: string): CatalogEvent[] {
  return events.filter((item) => item.rail === rail);
}

export function formatWhen(iso: string, status: EventStatus): string {
  if (status === "live") {
    return "LIVE";
  }
  const date = new Date(iso);
  const weekday = date.toLocaleDateString("en-GB", { weekday: "short" });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "short" });
  const time = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return `${weekday} ${day} ${month} · ${time}`;
}

export function formatDayHeader(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export const scoreDays = [
  { id: "live", label: "LIVE", sub: "" },
  { id: "d1", label: "Wed", sub: "14 Oct" },
  { id: "d2", label: "Thu", sub: "15 Oct" },
  { id: "today", label: "Today", sub: "15 Oct" },
  { id: "d4", label: "Fri", sub: "16 Oct" },
  { id: "d5", label: "Sat", sub: "17 Oct" },
];

export const newsChips = ["Latest", "Boxing", "Football", "Basketball", "Hockey"] as const;
