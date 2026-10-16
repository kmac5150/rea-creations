export type Category = "Concerts" | "Sports" | "Arts & Theater" | "Comedy" | "Family";

export type Performer = {
  id: string;
  name: string;
  genre: string;
  category: Category;
  image: string;
  rating: number;
  reviews: number;
  bio: string;
};

export type Venue = { id: string; name: string; city: string; state: string; gates: string[] };

export type Event = {
  id: string;
  performerId: string;
  title: string;
  tour?: string;
  date: string;
  time: string;
  venueId: string;
  image: string;
  minPrice: number;
  presale?: string;
  info: string;
};

export type TicketType = "Standard Ticket" | "Verified Resale Ticket" | "VIP Package" | "Official Platinum";

export type Listing = {
  id: string;
  section: string;
  level: "Floor" | "Lower Level" | "Upper Level";
  row: string;
  seats: number[];
  type: TicketType;
  price: number;
  perks: string[];
};

export type Order = {
  id: string;
  eventId: string;
  section: string;
  level: string;
  row: string;
  seats: number[];
  type: TicketType;
  price: number;
  fees: number;
  transferred: number[];
  listedAt?: number;
};

const img = (n: number) => `/img/e${n}.jpg`;

export const LOCATIONS = ["Los Angeles, California, US", "New York, New York, US", "Chicago, Illinois, US", "Austin, Texas, US", "Nashville, Tennessee, US"];

export const VENUES: Venue[] = [
  { id: "crescent", name: "Crescent Arena", city: "Los Angeles", state: "CA", gates: ["A", "B", "C"] },
  { id: "harborview", name: "Harborview Stadium", city: "Inglewood", state: "CA", gates: ["North", "South"] },
  { id: "palms", name: "The Palms Amphitheatre", city: "Irvine", state: "CA", gates: ["Main"] },
  { id: "meridian", name: "Grand Meridian Theatre", city: "Los Angeles", state: "CA", gates: ["Orchestra", "Mezzanine"] },
  { id: "basin", name: "Basin Street Hall", city: "Pasadena", state: "CA", gates: ["A"] },
  { id: "summit", name: "Summit Center", city: "Anaheim", state: "CA", gates: ["A", "B", "D"] },
];

export const PERFORMERS: Performer[] = [
  { id: "nova", name: "Nova Reyes", genre: "Pop", category: "Concerts", image: img(31), rating: 4.8, reviews: 2140, bio: "Chart-topping pop vocalist on the Afterglow World Tour." },
  { id: "kai", name: "Kai Mercer", genre: "Folk", category: "Concerts", image: img(14), rating: 4.7, reviews: 860, bio: "Singer-songwriter with campfire anthems and a full band." },
  { id: "velvet", name: "Velvet Arcade", genre: "Alternative", category: "Concerts", image: img(15), rating: 4.6, reviews: 1290, bio: "Synth-heavy alt rock four-piece known for wild light shows." },
  { id: "juno", name: "Juno Hart", genre: "R&B", category: "Concerts", image: img(28), rating: 4.9, reviews: 3120, bio: "Silky R&B with a live string section." },
  { id: "lantern", name: "The Lantern Club", genre: "Indie", category: "Concerts", image: img(29), rating: 4.5, reviews: 540, bio: "Indie rock trio fresh off their debut album." },
  { id: "dj-pulse", name: "DJ Pulse", genre: "Dance/Electronic", category: "Concerts", image: img(23), rating: 4.6, reviews: 970, bio: "Festival headliner bringing the Neon Nights show indoors." },
  { id: "mara", name: "Mara Vale", genre: "Pop", category: "Concerts", image: img(30), rating: 4.7, reviews: 1810, bio: "Bedroom-pop breakout playing her first arena run." },
  { id: "rhett", name: "Rhett Colton", genre: "Country", category: "Concerts", image: img(32), rating: 4.8, reviews: 2470, bio: "Country hitmaker with a stadium-sized voice." },
  { id: "comets", name: "Los Angeles Comets", genre: "Basketball", category: "Sports", image: img(17), rating: 4.4, reviews: 5200, bio: "Pro basketball in downtown LA." },
  { id: "fc-harbor", name: "Harbor City FC", genre: "Soccer", category: "Sports", image: img(18), rating: 4.5, reviews: 3100, bio: "Pro soccer at Harborview Stadium." },
  { id: "starlight", name: "Starlight: The Musical", genre: "Musicals", category: "Arts & Theater", image: img(19), rating: 4.9, reviews: 6400, bio: "The Tony-winning musical, now on its national tour." },
  { id: "symphony", name: "Pacific Symphony Nights", genre: "Classical", category: "Arts & Theater", image: img(13), rating: 4.8, reviews: 720, bio: "Film scores performed live by a 70-piece orchestra." },
  { id: "danny", name: "Danny Okafor", genre: "Comedy", category: "Comedy", image: img(11), rating: 4.7, reviews: 1540, bio: "Stand-up on the Stay Loose Tour." },
  { id: "circus", name: "Cirque Lumina", genre: "Circus", category: "Family", image: img(21), rating: 4.6, reviews: 2210, bio: "Acrobatics and aerial artistry for all ages." },
];

export const EVENTS: Event[] = [
  { id: "ev1", performerId: "nova", title: "Nova Reyes", tour: "The Afterglow World Tour", date: "2026-10-17", time: "8:00 PM", venueId: "crescent", image: img(1), minPrice: 89, info: "A max of 4 tickets per person. Mobile tickets only." },
  { id: "ev2", performerId: "comets", title: "Los Angeles Comets vs. Bay City Foxes", date: "2026-10-18", time: "7:00 PM", venueId: "crescent", image: img(33), minPrice: 42, info: "Clear bag policy in effect. Doors open 90 minutes before tip-off." },
  { id: "ev3", performerId: "danny", title: "Danny Okafor: Stay Loose Tour", date: "2026-10-18", time: "9:30 PM", venueId: "basin", image: img(11), minPrice: 39, info: "This is a phone-free show. Phones will be secured in pouches." },
  { id: "ev4", performerId: "kai", title: "Kai Mercer", tour: "Long Way Home Tour", date: "2026-10-24", time: "7:30 PM", venueId: "palms", image: img(2), minPrice: 55, info: "Lawn seating is general admission. Rain or shine." },
  { id: "ev5", performerId: "starlight", title: "Starlight: The Musical (Touring)", date: "2026-10-27", time: "7:30 PM", venueId: "meridian", image: img(19), minPrice: 69, info: "Children under 6 will not be admitted. Running time 2h 40m." },
  { id: "ev6", performerId: "velvet", title: "Velvet Arcade", tour: "Static Bloom Tour", date: "2026-11-06", time: "8:00 PM", venueId: "summit", image: img(15), minPrice: 49, presale: "Fan Club Presale · Oct 20, 10 AM", info: "Strobe lights and haze will be used during this performance." },
  { id: "ev7", performerId: "juno", title: "Juno Hart", tour: "Velvet Hours Tour", date: "2026-11-14", time: "8:00 PM", venueId: "crescent", image: img(3), minPrice: 75, presale: "Verified Fan Presale · Oct 22, 10 AM", info: "A max of 6 tickets per person." },
  { id: "ev8", performerId: "fc-harbor", title: "Harbor City FC vs. Desert Suns", date: "2026-10-25", time: "1:00 PM", venueId: "harborview", image: img(18), minPrice: 28, info: "Supporters section is standing room only." },
  { id: "ev9", performerId: "dj-pulse", title: "DJ Pulse: Neon Nights", date: "2026-10-31", time: "9:00 PM", venueId: "summit", image: img(24), minPrice: 59, info: "18+ event. Valid ID required. Halloween costumes encouraged." },
  { id: "ev10", performerId: "lantern", title: "The Lantern Club", tour: "First Light Tour", date: "2026-11-02", time: "8:00 PM", venueId: "basin", image: img(26), minPrice: 35, info: "General admission standing floor." },
  { id: "ev11", performerId: "mara", title: "Mara Vale", tour: "Paper Moons Tour", date: "2026-11-21", time: "7:30 PM", venueId: "summit", image: img(7), minPrice: 65, presale: "Spotify Presale · Oct 19, 10 AM", info: "A max of 4 tickets per person." },
  { id: "ev12", performerId: "rhett", title: "Rhett Colton", tour: "Dust & Diamonds Stadium Tour", date: "2026-12-05", time: "7:00 PM", venueId: "harborview", image: img(9), minPrice: 79, info: "Parking passes sold separately." },
  { id: "ev13", performerId: "symphony", title: "Pacific Symphony Nights: Space Odyssey", date: "2026-11-08", time: "7:30 PM", venueId: "meridian", image: img(13), minPrice: 45, info: "Late seating at the discretion of house management." },
  { id: "ev14", performerId: "circus", title: "Cirque Lumina: Aurora", date: "2026-11-28", time: "2:00 PM", venueId: "crescent", image: img(21), minPrice: 32, info: "Kids 2 and under free on lap." },
  { id: "ev15", performerId: "nova", title: "Nova Reyes", tour: "The Afterglow World Tour", date: "2026-10-19", time: "8:00 PM", venueId: "crescent", image: img(5), minPrice: 95, info: "A max of 4 tickets per person. Mobile tickets only." },
  { id: "ev16", performerId: "comets", title: "Los Angeles Comets vs. River City Kings", date: "2026-11-01", time: "6:30 PM", venueId: "crescent", image: img(17), minPrice: 38, info: "Clear bag policy in effect." },
  { id: "ev17", performerId: "juno", title: "Juno Hart", tour: "Velvet Hours Tour", date: "2026-11-15", time: "8:00 PM", venueId: "crescent", image: img(20), minPrice: 75, info: "A max of 6 tickets per person." },
  { id: "ev18", performerId: "velvet", title: "Velvet Arcade", tour: "Static Bloom Tour", date: "2026-11-07", time: "8:00 PM", venueId: "summit", image: img(25), minPrice: 49, info: "Strobe lights and haze will be used during this performance." },
];

export const TRENDING = ["nova", "kai", "velvet", "juno", "lantern", "starlight", "dj-pulse", "mara", "rhett"];

export const CATEGORIES: { label: Category; image: string }[] = [
  { label: "Concerts", image: img(6) },
  { label: "Sports", image: img(33) },
  { label: "Arts & Theater", image: img(19) },
  { label: "Comedy", image: img(11) },
  { label: "Family", image: img(21) },
];

/** Arena section layout used by the seat map; ids match listing sections. */
export const LOWER_SECTIONS = Array.from({ length: 18 }, (_, i) => String(101 + i));
export const UPPER_SECTIONS = Array.from({ length: 24 }, (_, i) => String(201 + i));
export const FLOOR_SECTIONS = ["FLOOR A", "FLOOR B"];

const TYPES: TicketType[] = ["Standard Ticket", "Standard Ticket", "Verified Resale Ticket", "Standard Ticket", "VIP Package", "Official Platinum"];
const PERKS = [["CLUB LOUNGE ACCESS", "FOOD & DRINKS", "EARLY ENTRY"], ["AISLE"], [], ["MERCH BUNDLE"], [], ["PARKING INCLUDED"]];
const ROWS = "ABCDEFGHJKLMN";

function rng(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/** Deterministic listings per event so the seat map and results stay stable between visits. */
export function listingsFor(ev: Event): Listing[] {
  const r = rng(ev.id);
  const all = [...FLOOR_SECTIONS, ...LOWER_SECTIONS, ...UPPER_SECTIONS];
  const out: Listing[] = [];
  for (let i = 0; i < 34; i++) {
    const section = all[Math.floor(r() * all.length)];
    const level = section.startsWith("FLOOR") ? "Floor" : section.startsWith("1") ? "Lower Level" : "Upper Level";
    const mult = level === "Floor" ? 3.2 : level === "Lower Level" ? 1.9 : 1;
    const t = Math.floor(r() * TYPES.length);
    const type = TYPES[t];
    const bump = type === "VIP Package" ? 2.4 : type === "Official Platinum" ? 1.8 : type === "Verified Resale Ticket" ? 1.3 : 1;
    const price = Math.round(ev.minPrice * mult * bump * (0.9 + r() * 0.6)) + 0.95;
    const start = 1 + Math.floor(r() * 14);
    out.push({
      id: `${ev.id}-l${i}`,
      section,
      level,
      row: ROWS[Math.floor(r() * ROWS.length)],
      seats: [start, start + 1, start + 2, start + 3],
      type,
      price,
      perks: type === "Standard Ticket" && t !== 0 ? [] : PERKS[t],
    });
  }
  return out;
}

export const INITIAL_ORDERS: Order[] = [
  { id: "99-32487/LA1", eventId: "ev5", section: "MEZZ C", level: "Mezzanine", row: "LL", seats: [204, 205], type: "Standard Ticket", price: 89, fees: 14.5, transferred: [] },
  { id: "21-77310/LA4", eventId: "ev12", section: "118", level: "Lower Level", row: "H", seats: [4, 5, 6], type: "Standard Ticket", price: 129, fees: 21.25, transferred: [] },
];

export function performerById(id: string) {
  return PERFORMERS.find((p) => p.id === id) ?? PERFORMERS[0];
}

export function eventById(id: string) {
  return EVENTS.find((e) => e.id === id) ?? EVENTS[0];
}

export function venueById(id: string) {
  return VENUES.find((v) => v.id === id) ?? VENUES[0];
}

export function money(n: number) {
  return `$${n.toFixed(2)}`;
}

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function dateParts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return { mon: MONTHS[m - 1], month: MONTHS_LONG[m - 1], day: String(d).padStart(2, "0"), dow: DAYS[dt.getDay()], dt };
}

export const TODAY = new Date(2026, 9, 15);

export function daysUntil(iso: string) {
  return Math.round((dateParts(iso).dt.getTime() - TODAY.getTime()) / 86400000);
}

export function eventLine(ev: Event) {
  const v = venueById(ev.venueId);
  const p = dateParts(ev.date);
  return `${p.dow} • ${p.mon.charAt(0)}${p.mon.slice(1).toLowerCase()} ${Number(p.day)} • ${ev.time} - ${v.name}`;
}
