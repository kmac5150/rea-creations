export type Shift = "Lunch" | "Dinner";

export type ResoStatus = "Booked" | "Confirmed" | "Left message" | "Late" | "Partially arrived" | "Arrived" | "Seated" | "Finished" | "No-show" | "Cancelled";

export type Source = "Online" | "Phone" | "Walk-in";

export type Tag = "VIP" | "Birthday" | "Anniversary" | "Allergy" | "Booth" | "Patio" | "Regular" | "Wine club";

export type Reservation = {
  id: string;
  day: number;
  shift: Shift;
  time: string;
  size: number;
  guestId: string;
  status: ResoStatus;
  table?: string;
  seatedAt?: string;
  source: Source;
  tags: Tag[];
  note?: string;
  deposit?: number;
};

export type WaitParty = {
  id: string;
  name: string;
  size: number;
  quote: number;
  addedMin: number;
  phone: string;
  notified: boolean;
  note?: string;
};

export type Guest = {
  id: string;
  first: string;
  last: string;
  photo?: string;
  phone: string;
  email: string;
  area: string;
  company?: string;
  vip: boolean;
  tags: Tag[];
  visits: number;
  cancels: number;
  noShows: number;
  spend: number;
  note?: string;
  allergy?: string;
};

export type FloorTable = { id: string; seats: number; shape: "round" | "square" | "booth"; x: number; y: number; w: number; h: number; section: "Main" | "Bar" | "Patio" };

export const RESTAURANT = {
  name: "Nova Kitchen & Bar",
  area: "Mission District, San Francisco",
  photo: "/img/room-1.jpg",
  manager: "Jordan Park",
  role: "General Manager",
};

export const TODAY_LABELS = ["Wed, Oct 15", "Thu, Oct 16", "Fri, Oct 17", "Sat, Oct 18", "Sun, Oct 19"];
export const TODAY_INDEX = 1;

export const GUESTS: Guest[] = [
  { id: "g1", first: "Magdalena", last: "Rodriguez", photo: "/img/u-maria.jpg", phone: "(415) 555-0143", email: "magda.r@example.com", area: "San Francisco Bay Area", company: "Proctor & Gamble", vip: true, tags: ["VIP", "Regular", "Booth", "Allergy"], visits: 27, cancels: 1, noShows: 0, spend: 4380, note: "Enjoys red wine and patio seating. Friends with Julia and Nathan.", allergy: "Tree nuts" },
  { id: "g2", first: "Jessie", last: "Barrett", photo: "/img/u-ava.jpg", phone: "(415) 555-0177", email: "jessie.b@example.com", area: "Oakland, CA", vip: false, tags: ["Birthday"], visits: 4, cancels: 0, noShows: 0, spend: 612, note: "Celebrating 30th birthday. Bring candle with dessert." },
  { id: "g3", first: "Kadin", last: "Westervelt", photo: "/img/g-kadin.jpg", phone: "(628) 555-0112", email: "kadin.w@example.com", area: "San Francisco, CA", company: "Stripe", vip: false, tags: ["Anniversary"], visits: 2, cancels: 1, noShows: 0, spend: 288 },
  { id: "g4", first: "Haylie", last: "Culhane", photo: "/img/u-nina.jpg", phone: "(415) 555-0190", email: "haylie.c@example.com", area: "Berkeley, CA", vip: false, tags: [], visits: 1, cancels: 0, noShows: 1, spend: 96 },
  { id: "g5", first: "Kaylynn", last: "Stanton", phone: "(510) 555-0108", email: "kaylynn.s@example.com", area: "Alameda, CA", vip: false, tags: ["Wine club"], visits: 11, cancels: 0, noShows: 0, spend: 1840 },
  { id: "g6", first: "Yoko", last: "Calhoun", photo: "/img/g-yoko.jpg", phone: "(415) 555-0155", email: "yoko.c@example.com", area: "San Francisco, CA", company: "Salesforce", vip: true, tags: ["VIP", "Patio"], visits: 19, cancels: 2, noShows: 0, spend: 3120, note: "Prefers table 50 by the window." },
  { id: "g7", first: "Leon", last: "Cole", photo: "/img/g-leon.jpg", phone: "(650) 555-0121", email: "leon.c@example.com", area: "Palo Alto, CA", vip: true, tags: ["VIP"], visits: 8, cancels: 0, noShows: 0, spend: 2210 },
  { id: "g8", first: "Viola", last: "Rodriguez", photo: "/img/g-viola.jpg", phone: "(415) 555-0168", email: "viola.r@example.com", area: "San Francisco, CA", vip: true, tags: ["VIP", "Regular"], visits: 33, cancels: 1, noShows: 0, spend: 5900, note: "Always seat at Table 1." },
  { id: "g9", first: "Marcus", last: "Lee", photo: "/img/u-marcus.jpg", phone: "(415) 555-0134", email: "marcus.l@example.com", area: "Daly City, CA", vip: false, tags: ["Allergy"], visits: 3, cancels: 0, noShows: 0, spend: 402, allergy: "Shellfish" },
  { id: "g10", first: "Diane", last: "Andrews", phone: "(925) 876-7633", email: "diane@example.com", area: "Walnut Creek, CA", vip: false, tags: [], visits: 9, cancels: 0, noShows: 0, spend: 1105 },
  { id: "g11", first: "Sam", last: "Okafor", photo: "/img/u-sam.jpg", phone: "(415) 555-0186", email: "sam.o@example.com", area: "San Francisco, CA", vip: false, tags: ["Regular"], visits: 14, cancels: 1, noShows: 0, spend: 1660 },
  { id: "g12", first: "James", last: "Whitfield", photo: "/img/u-james.jpg", phone: "(415) 555-0119", email: "james.w@example.com", area: "Sausalito, CA", vip: false, tags: [], visits: 1, cancels: 0, noShows: 0, spend: 0 },
  { id: "g13", first: "Priya", last: "Natarajan", phone: "(408) 555-0170", email: "priya.n@example.com", area: "San Jose, CA", vip: false, tags: ["Birthday"], visits: 5, cancels: 0, noShows: 0, spend: 720 },
  { id: "g14", first: "Tom", last: "Becker", phone: "(415) 555-0102", email: "tom.b@example.com", area: "San Francisco, CA", vip: false, tags: [], visits: 2, cancels: 0, noShows: 1, spend: 140 },
];

export const TABLES: FloorTable[] = [
  { id: "1", seats: 4, shape: "round", x: 6, y: 4, w: 22, h: 12, section: "Main" },
  { id: "2", seats: 2, shape: "square", x: 34, y: 4, w: 16, h: 10, section: "Main" },
  { id: "3", seats: 2, shape: "square", x: 54, y: 4, w: 16, h: 10, section: "Main" },
  { id: "4", seats: 6, shape: "booth", x: 76, y: 4, w: 20, h: 16, section: "Main" },
  { id: "31", seats: 4, shape: "square", x: 6, y: 22, w: 18, h: 11, section: "Main" },
  { id: "32", seats: 2, shape: "square", x: 30, y: 22, w: 16, h: 10, section: "Main" },
  { id: "34", seats: 4, shape: "round", x: 52, y: 22, w: 20, h: 12, section: "Main" },
  { id: "50", seats: 2, shape: "round", x: 78, y: 26, w: 16, h: 10, section: "Main" },
  { id: "b1", seats: 2, shape: "square", x: 6, y: 42, w: 14, h: 9, section: "Bar" },
  { id: "b2", seats: 2, shape: "square", x: 24, y: 42, w: 14, h: 9, section: "Bar" },
  { id: "b3", seats: 3, shape: "square", x: 42, y: 42, w: 14, h: 9, section: "Bar" },
  { id: "114", seats: 6, shape: "booth", x: 62, y: 42, w: 32, h: 12, section: "Main" },
  { id: "211", seats: 4, shape: "square", x: 6, y: 62, w: 18, h: 11, section: "Patio" },
  { id: "213", seats: 4, shape: "square", x: 30, y: 62, w: 18, h: 11, section: "Patio" },
  { id: "215", seats: 2, shape: "round", x: 54, y: 62, w: 16, h: 10, section: "Patio" },
  { id: "237", seats: 8, shape: "round", x: 74, y: 60, w: 22, h: 14, section: "Patio" },
];

export const SLOTS: Record<Shift, string[]> = {
  Lunch: ["11:30 am", "11:45 am", "12:00 pm", "12:15 pm", "12:30 pm", "12:45 pm", "1:00 pm", "1:15 pm", "1:30 pm", "1:45 pm", "2:00 pm"],
  Dinner: ["5:00 pm", "5:15 pm", "5:30 pm", "5:45 pm", "6:00 pm", "6:15 pm", "6:30 pm", "6:45 pm", "7:00 pm", "7:15 pm", "7:30 pm", "7:45 pm", "8:00 pm", "8:15 pm", "8:30 pm", "8:45 pm", "9:00 pm"],
};

export const PACING_LIMIT = 12;

let n = 0;
const r = (day: number, shift: Shift, time: string, size: number, guestId: string, status: ResoStatus, extra: Partial<Reservation> = {}): Reservation => ({
  id: `r${++n}`,
  day,
  shift,
  time,
  size,
  guestId,
  status,
  source: "Online",
  tags: GUESTS.find((g) => g.id === guestId)?.tags.filter((t) => t !== "Regular") ?? [],
  ...extra,
});

export const INITIAL_RESOS: Reservation[] = [
  r(1, "Dinner", "5:30 pm", 3, "g5", "Seated", { table: "b3", seatedAt: "5:30 pm", source: "Phone" }),
  r(1, "Dinner", "5:45 pm", 2, "g6", "Seated", { table: "50", seatedAt: "5:56 pm" }),
  r(1, "Dinner", "5:45 pm", 4, "g11", "Seated", { table: "211", seatedAt: "5:50 pm", source: "Walk-in", tags: [] }),
  r(1, "Dinner", "5:00 pm", 2, "g14", "Finished", { table: "2", seatedAt: "5:02 pm" }),
  r(1, "Dinner", "7:00 pm", 2, "g2", "Partially arrived", { table: "34", note: "Birthday dessert with candle" }),
  r(1, "Dinner", "7:00 pm", 2, "g1", "Confirmed", { table: "32", deposit: 20, note: "Guest enjoys red wine and patio seating" }),
  r(1, "Dinner", "7:00 pm", 4, "g3", "Late", { table: "31", source: "Phone" }),
  r(1, "Dinner", "7:15 pm", 2, "g4", "Left message", { source: "Phone" }),
  r(1, "Dinner", "7:30 pm", 4, "g8", "Confirmed", { table: "1" }),
  r(1, "Dinner", "7:45 pm", 6, "g9", "Booked", { table: "114", note: "Shellfish allergy at table" }),
  r(1, "Dinner", "8:00 pm", 2, "g12", "Booked"),
  r(1, "Dinner", "8:15 pm", 5, "g13", "Confirmed", { table: "4" }),
  r(1, "Dinner", "8:30 pm", 3, "g7", "Booked", { source: "Phone" }),
  r(1, "Dinner", "6:15 pm", 2, "g10", "Cancelled"),
  r(1, "Lunch", "11:45 am", 2, "g10", "Finished", { table: "2", seatedAt: "11:48 am" }),
  r(1, "Lunch", "12:00 pm", 4, "g11", "Finished", { table: "31", seatedAt: "12:04 pm" }),
  r(1, "Lunch", "12:30 pm", 2, "g6", "Finished", { table: "50", seatedAt: "12:31 pm" }),
  r(1, "Lunch", "1:00 pm", 6, "g13", "Finished", { table: "114", seatedAt: "1:06 pm" }),
  r(1, "Lunch", "1:15 pm", 2, "g14", "No-show"),
  r(2, "Dinner", "6:00 pm", 4, "g1", "Booked", { table: "211" }),
  r(2, "Dinner", "6:30 pm", 2, "g7", "Booked"),
  r(2, "Dinner", "7:00 pm", 8, "g8", "Confirmed", { table: "237", note: "Party of 8, set menu" }),
  r(2, "Dinner", "7:30 pm", 2, "g3", "Booked"),
  r(2, "Dinner", "8:00 pm", 4, "g9", "Booked"),
  r(2, "Lunch", "12:15 pm", 2, "g2", "Booked"),
  r(3, "Dinner", "6:45 pm", 2, "g6", "Booked"),
  r(3, "Dinner", "7:15 pm", 6, "g11", "Booked", { table: "114" }),
  r(0, "Dinner", "6:00 pm", 2, "g1", "Finished", { table: "32", seatedAt: "6:02 pm" }),
  r(0, "Dinner", "7:00 pm", 4, "g9", "Finished", { table: "31", seatedAt: "7:05 pm" }),
  r(0, "Dinner", "7:30 pm", 2, "g4", "No-show"),
];

export const INITIAL_WAITLIST: WaitParty[] = [
  { id: "w1", name: "Alvarez", size: 2, quote: 15, addedMin: 9, phone: "(415) 555-0181", notified: false },
  { id: "w2", name: "Chen", size: 4, quote: 30, addedMin: 22, phone: "(415) 555-0124", notified: true, note: "High chair" },
  { id: "w3", name: "Moreau", size: 3, quote: 25, addedMin: 4, phone: "(628) 555-0147", notified: false },
  { id: "w4", name: "Hughes", size: 2, quote: 15, addedMin: 1, phone: "(415) 555-0199", notified: false },
];

/** Covers per 30-minute slot this shift and the four-week average, like the Shift Overview chart. */
export const SHIFT_FLOW = [
  { t: "5pm", now: 4, avg: 6 },
  { t: "5:30", now: 9, avg: 8 },
  { t: "6pm", now: 14, avg: 12 },
  { t: "6:30", now: 18, avg: 15 },
  { t: "7pm", now: 26, avg: 19 },
  { t: "7:30", now: 22, avg: 18 },
  { t: "8pm", now: 15, avg: 13 },
  { t: "8:30", now: 10, avg: 9 },
  { t: "9pm", now: 5, avg: 6 },
];

export const WEEK_COVERS = [
  { d: "Thu", v: 144 },
  { d: "Fri", v: 198 },
  { d: "Sat", v: 231 },
  { d: "Sun", v: 162 },
  { d: "Mon", v: 88 },
  { d: "Tue", v: 101 },
  { d: "Wed", v: 126 },
];

export const NOTIFICATIONS = [
  { id: "n1", title: "VIP Seated", body: "Yoko Calhoun for 2 at Table 50", at: "5:56 pm" },
  { id: "n2", title: "VIP New Reservation", body: "Leon Cole, 10/16 at 8:30 PM for 3", at: "3:12 pm" },
  { id: "n3", title: "Reservation changed", body: "Kadin Westervelt moved to 7:00 PM, party of 4", at: "1:40 pm" },
  { id: "n4", title: "New booking", body: "James Whitfield, 10/16 at 8:00 PM for 2", at: "11:05 am" },
];

export const ACTIVE_STATUSES: ResoStatus[] = ["Booked", "Confirmed", "Left message", "Late", "Partially arrived", "Arrived"];

export function guestName(g: Guest) {
  return `${g.first} ${g.last}`;
}

export function initials(g: Guest) {
  return `${g.first[0]}${g.last[0]}`;
}
