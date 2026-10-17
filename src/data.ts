export type Container = { size: string; type: string; price: number };

export type MenuItem = {
  id: string;
  name: string;
  brewery: string;
  style: string;
  abv: number;
  ibu: number;
  cal: number;
  rating: number;
  tap?: number;
  label: { bg: string; fg: string; mark: string };
  containers: Container[];
  category: "Beer" | "Wine" | "Spirit" | "Ready to Drink" | "Food";
};

export type Section = { id: string; name: string; onDeck?: boolean; items: MenuItem[] };
export type Menu = { id: string; name: string; published: boolean; sections: Section[] };

export type CheckIn = {
  id: string;
  user: string;
  avatar: string;
  date: string;
  ago: string;
  beer: string;
  brewery: string;
  style: string;
  abv: number;
  rating: number;
  comment?: string;
  emoji?: string;
  photo?: string;
  premise: "on" | "purchased";
  toasts: string[];
  comments: { by: string; text: string }[];
  badge?: string;
  label: { bg: string; fg: string; mark: string };
};

export type EventItem = {
  id: string;
  name: string;
  location: string;
  start: string;
  end: string;
  free: boolean;
  price: number;
  image: string;
  when: "progress" | "upcoming" | "past";
  group: string;
};

export type Venue = { id: string; name: string; address: string };

export const VENUES: Venue[] = [
  { id: "v1", name: "Harbor Lane Pizza & Pint", address: "21 Harbor Ln, Wilmington, NC 28401" },
  { id: "v2", name: "Harbor Lane Taproom", address: "114 Market St, Wilmington, NC 28401" },
  { id: "v3", name: "Harbor Lane Bottle Shop", address: "908 Dock St, Wilmington, NC 28401" },
];

const L = (bg: string, fg: string, mark: string) => ({ bg, fg, mark });

const beer = (
  id: string,
  name: string,
  brewery: string,
  style: string,
  abv: number,
  ibu: number,
  cal: number,
  rating: number,
  label: MenuItem["label"],
  tap?: number,
  containers: Container[] = [
    { size: "16oz", type: "Draft", price: 8 },
    { size: "64oz", type: "Growler", price: 22 },
  ],
): MenuItem => ({ id, name, brewery, style, abv, ibu, cal, rating, label, tap, containers, category: "Beer" });

export const CATALOG: MenuItem[] = [
  beer("b9", "Low Tide Lager", "Cape Fear Fermentory", "Lager - Helles", 4.8, 18, 160, 3.71, L("#1f6fb2", "#fff", "LT")),
  beer("b10", "Saltmarsh Gose", "Brackish Water Brewing", "Sour - Gose", 4.4, 8, 150, 3.84, L("#2aa198", "#fff", "SG")),
  beer("b11", "Riptide Red", "Outer Banks Beerworks", "Red Ale - American Amber / Red", 6.1, 32, 200, 3.66, L("#a3202f", "#fff", "RR")),
  beer("b12", "Nightjar Porter", "Moth & Lantern", "Porter - American", 6.4, 35, 230, 3.92, L("#2b2b2b", "#f5c542", "NP")),
];

export const INITIAL_MENUS: Menu[] = [
  {
    id: "m1",
    name: "Full Menu",
    published: true,
    sections: [
      {
        id: "s1",
        name: "Beer Selection",
        items: [
          beer("b1", "Double Dope", "Three Sons Brewing Co.", "IPA - Imperial", 9.0, 0, 270, 4.08, L("#121212", "#e84393", "DD"), 1),
          beer("b2", "Freak of the Marsh", "Wicked Reed Brewing", "IPA - Imperial", 8.5, 100, 242, 4.05, L("#2e7d32", "#c6ff00", "FM"), 2),
          beer("b3", "This Is My Serious Face", "Amorphic Ales", "IPA - Imperial", 8.0, 30, 240, 4.07, L("#f2f2f2", "#111", "SF"), 3),
          beer("b4", "Hillside Prophet", "New Anthem Beer Project", "Stout - Imperial", 11.0, 0, 330, 4.2, L("#111", "#fff", "HP"), 4),
          beer("b5", "Midtown Swank", "Port City Brewing", "IPA - Imperial", 8.2, 0, 246, 3.97, L("#fafafa", "#333", "MS"), 6),
          beer("b6", "Tropical Lightning IPA", "Wilmington Brewing Company", "IPA - American", 7.4, 60, 220, 4.3, L("#81c784", "#0b3d0b", "TL"), 7),
        ],
      },
      {
        id: "s2",
        name: "Cans & Bottles",
        items: [
          beer("b7", "Bruer Grog", "The Bruery Terreux", "Honey Beer", 9.1, 0, 280, 3.0, L("#2e7d32", "#fff", "BG"), undefined, [{ size: "12oz", type: "Can", price: 7 }]),
          beer("b8", "Broken Skull IPA", "El Segundo Brewing Company", "IPA - American", 6.7, 70, 210, 3.0, L("#263238", "#fff", "BS"), undefined, [{ size: "16oz", type: "Can", price: 6 }]),
        ],
      },
      {
        id: "s3",
        name: "Wine",
        items: [
          { id: "w1", name: "Coastal Sauvignon Blanc", brewery: "Sandbar Cellars", style: "White - Sauvignon Blanc", abv: 13.0, ibu: 0, cal: 120, rating: 3.8, label: L("#f3e5ab", "#6d4c41", "CS"), containers: [{ size: "6oz", type: "Glass", price: 11 }, { size: "750ml", type: "Bottle", price: 38 }], category: "Wine" },
        ],
      },
      {
        id: "s4",
        name: "Spirits & Cocktails",
        items: [
          { id: "c1", name: "Dockside Old Fashioned", brewery: "House Cocktail", style: "Spirit - Bourbon", abv: 32, ibu: 0, cal: 180, rating: 4.1, label: L("#8d5524", "#fff", "OF"), containers: [{ size: "3oz", type: "Pour", price: 13 }], category: "Spirit" },
          { id: "c2", name: "Ranch Water Seltzer", brewery: "Tidewater Hard Seltzer", style: "Hard Seltzer", abv: 5.0, ibu: 0, cal: 100, rating: 3.6, label: L("#4fc3f7", "#fff", "RW"), containers: [{ size: "12oz", type: "Can", price: 6 }], category: "Ready to Drink" },
        ],
      },
      { id: "s5", name: "On Deck", onDeck: true, items: [CATALOG[0]] },
    ],
  },
  { id: "m2", name: "Lunch & Dinner", published: false, sections: [{ id: "s6", name: "Pizza", items: [{ id: "f1", name: "Harbor Pie", brewery: "Kitchen", style: "Food - Pizza", abv: 0, ibu: 0, cal: 980, rating: 4.4, label: L("#e53935", "#fff", "HP"), containers: [{ size: "14in", type: "Pie", price: 21 }], category: "Food" }] }] },
  { id: "m3", name: "Weekend Menu", published: false, sections: [{ id: "s7", name: "Brunch Drafts", items: [] }] },
  { id: "m4", name: "Wine Menu", published: false, sections: [{ id: "s8", name: "By the Glass", items: [] }] },
];

export const INITIAL_CHECKINS: CheckIn[] = [
  { id: "k1", user: "Harrison H", avatar: "🧔", date: "OCTOBER 17TH, 2026", ago: "2 hours ago", beer: "Tropical Lightning IPA", brewery: "Wilmington Brewing Company", style: "IPA - American", abv: 7.4, rating: 4.3, emoji: "🦁 👍", photo: "/img/pints.jpg", premise: "on", toasts: ["Maya R"], comments: [], label: L("#81c784", "#0b3d0b", "TL") },
  { id: "k2", user: "Maya R", avatar: "👩‍🦰", date: "OCTOBER 17TH, 2026", ago: "4 hours ago", beer: "Double Dope", brewery: "Three Sons Brewing Co.", style: "IPA - Imperial", abv: 9.0, rating: 4.25, comment: "Dangerous. Smooth for the ABV.", premise: "on", toasts: [], comments: [], badge: "Hopped Up (Level 12)", label: L("#121212", "#e84393", "DD") },
  { id: "k3", user: "Devon K", avatar: "🧢", date: "OCTOBER 16TH, 2026", ago: "yesterday", beer: "Hillside Prophet", brewery: "New Anthem Beer Project", style: "Stout - Imperial", abv: 11.0, rating: 4.5, comment: "Pairs with the Harbor Pie way too well", photo: "/img/pint-food.jpg", premise: "on", toasts: ["Sam P", "Jo T"], comments: [{ by: "Harbor Lane Pizza & Pint", text: "Glad you liked it! Back on tap Friday." }], label: L("#111", "#fff", "HP") },
  { id: "k4", user: "Priya S", avatar: "🍺", date: "OCTOBER 15TH, 2026", ago: "2 days ago", beer: "Freak of the Marsh", brewery: "Wicked Reed Brewing", style: "IPA - Imperial", abv: 8.5, rating: 4.0, premise: "on", toasts: [], comments: [], label: L("#2e7d32", "#c6ff00", "FM") },
  { id: "k5", user: "David L", avatar: "🍺", date: "OCTOBER 14TH, 2026", ago: "3 days ago", beer: "Bruer Grog", brewery: "The Bruery Terreux", style: "Honey Beer", abv: 9.1, rating: 3.0, premise: "purchased", toasts: ["Danny P"], comments: [], label: L("#2e7d32", "#fff", "BG") },
  { id: "k6", user: "David L", avatar: "🍺", date: "SEPTEMBER 30TH, 2026", ago: "2 weeks ago", beer: "Broken Skull IPA", brewery: "El Segundo Brewing Company", style: "IPA - American", abv: 6.7, rating: 3.0, premise: "purchased", toasts: [], comments: [], badge: "Untappd HQ Local", label: L("#263238", "#fff", "BS") },
];

export const INITIAL_EVENTS: EventItem[] = [
  { id: "e1", name: "Trivia Night", location: "21 Harbor Ln, Wilmington, NC 28401", start: "Oct 17, 2026 at 7pm", end: "Oct 17, 2026 at 10pm EDT", free: true, price: 0, image: "/img/friends.jpg", when: "progress", group: "CURRENT" },
  { id: "e2", name: "Ice Cream and IPAs", location: "21 Harbor Ln, Wilmington, NC 28401", start: "Oct 24, 2026 at 12pm", end: "Oct 24, 2026 at 4pm EDT", free: true, price: 0, image: "/img/flight.jpg", when: "upcoming", group: "NEXT WEEK" },
  { id: "e3", name: "Brewer's Tap Takeover: Three Sons", location: "21 Harbor Ln, Wilmington, NC 28401", start: "Oct 31, 2026 at 6pm", end: "Oct 31, 2026 at 11pm EDT", free: false, price: 15, image: "/img/tap-pour.jpg", when: "upcoming", group: "LATER THIS MONTH" },
  { id: "e4", name: "Sunset Patio Pints", location: "21 Harbor Ln, Wilmington, NC 28401", start: "Oct 3, 2026 at 5pm", end: "Oct 3, 2026 at 9pm EDT", free: true, price: 0, image: "/img/cheers.jpg", when: "past", group: "EARLIER THIS MONTH" },
];

export const DIGITAL_BOARDS = [
  { id: "69631", name: "Your Customized Digital Board", edited: "10/15/2026 at 1:41PM", menus: ["m1"], theme: "Chalkboard" },
  { id: "54842", name: "Bar Back Screen", edited: "10/08/2026 at 1:55PM", menus: ["m1", "m4"], theme: "Default" },
  { id: "71824", name: "Patio TV Menu", edited: "10/08/2026 at 1:54PM", menus: ["m2"], theme: "Golden" },
];

export const THEMES = [
  { name: "Default", bg: "#1b1b1b", fg: "#fff", accent: "#ffc000" },
  { name: "Chalkboard", bg: "#2b2f2a", fg: "#f1f1f1", accent: "#e0e0e0" },
  { name: "Golden", bg: "#ffc000", fg: "#1b1b1b", accent: "#1b1b1b" },
];

/** Insights series per range: check-ins and menu views by bucket. */
export const CHECKIN_SERIES: Record<"Day" | "Week" | "Month" | "Quarter", { label: string; v: number }[]> = {
  Day: [
    { label: "Oct 11", v: 18 },
    { label: "Oct 12", v: 25 },
    { label: "Oct 13", v: 9 },
    { label: "Oct 14", v: 14 },
    { label: "Oct 15", v: 21 },
    { label: "Oct 16", v: 38 },
    { label: "Oct 17", v: 44 },
  ],
  Week: [
    { label: "Sep 20", v: 158 },
    { label: "Sep 27", v: 171 },
    { label: "Oct 04", v: 131 },
    { label: "Oct 11", v: 153 },
  ],
  Month: [
    { label: "Jul", v: 498 },
    { label: "Aug", v: 562 },
    { label: "Sep", v: 541 },
    { label: "Oct", v: 361 },
  ],
  Quarter: [
    { label: "Q1", v: 1302 },
    { label: "Q2", v: 1544 },
    { label: "Q3", v: 1601 },
    { label: "Q4", v: 361 },
  ],
};

export const MENU_VIEWS = [
  { label: "Sep 20", app: 31, web: 6, api: 2, site: 167 },
  { label: "Sep 27", app: 38, web: 5, api: 3, site: 248 },
  { label: "Oct 04", app: 75, web: 8, api: 4, site: 270 },
  { label: "Oct 11", app: 58, web: 9, api: 3, site: 258 },
  { label: "Oct 18", app: 18, web: 3, api: 1, site: 86 },
];

export const TOP_STYLES = [
  { name: "Wheat Beer - Witbier / Blanche", rating: 4.55, checkIns: 5 },
  { name: "Sour - Smoothie / Pastry", rating: 4.44, checkIns: 10 },
  { name: "Lager - American Pre-Prohibition", rating: 4.42, checkIns: 3 },
  { name: "Wild Ale - American", rating: 4.36, checkIns: 20 },
  { name: "Stout - Imperial / Double", rating: 4.31, checkIns: 25 },
  { name: "IPA - Imperial / Double", rating: 4.12, checkIns: 41 },
];

export const RANGE_SCALE: Record<string, number> = {
  "Last 24 Hours": 0.04,
  "Last 7 Days": 0.25,
  "Last 30 Days": 1,
  "Last 90 Days": 2.9,
  "Last 365 Days": 11.4,
};

export const PREMISE_SPLIT = { All: 1, "On Premise": 0.78, "Off Premise": 0.22 } as const;

export const money = (n: number) => `$${n.toFixed(2)}`;

export const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
