export type ListingStatus = "For sale" | "For rent" | "Sold";

export type PriceEvent = { date: string; event: string; price: number };

export type Agent = {
  name: string;
  brokerage: string;
  phone: string;
  rating: number;
  sales: number;
  tint: string;
};

export type Listing = {
  id: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  neighborhood: string;
  homeType: "House" | "Condo" | "Townhouse" | "Multi-family" | "Apartment";
  status: ListingStatus;
  badge?: string;
  photos: string[];
  daysOnZillow: number;
  views: number;
  saves: number;
  zestimate: number;
  rentZestimate: number;
  yearBuilt: number;
  lotAcres: number;
  hoa: number;
  parking: string;
  heating: string;
  cooling: string;
  agent: Agent;
  description: string;
  specials: string[];
  priceHistory: PriceEvent[];
  tourAvailable: string;
  has3D: boolean;
  /** Pin position on the stylised map, in percent of the map canvas. */
  x: number;
  y: number;
};

const EXTERIOR = Array.from({ length: 15 }, (_, i) => `/photos/p${i + 1}.jpg`).concat("/photos/p17.jpg");
const INTERIOR = [16, 18, 19, 20, 21, 22, 23, 24].map((n) => `/photos/p${n}.jpg`);

export const AGENTS: Agent[] = [
  { name: "Marisol Grant", brokerage: "Harpeth Ridge Realty", phone: "(615) 555-0142", rating: 4.9, sales: 128, tint: "#2b6f4e" },
  { name: "Dev Okafor", brokerage: "Cumberland & Co. Real Estate", phone: "(615) 555-0177", rating: 5.0, sales: 86, tint: "#7b3fa0" },
  { name: "Hannah Whitlock", brokerage: "Music Row Properties", phone: "(615) 555-0119", rating: 4.8, sales: 213, tint: "#b5482a" },
  { name: "Tomás Reyes", brokerage: "Belle Meade Partners", phone: "(615) 555-0163", rating: 4.9, sales: 64, tint: "#1d5bbf" },
  { name: "Priya Natarajan", brokerage: "Greenway Home Group", phone: "(615) 555-0188", rating: 5.0, sales: 152, tint: "#a0306a" },
];

type Seed = Pick<
  Listing,
  "price" | "beds" | "baths" | "sqft" | "street" | "zip" | "neighborhood" | "homeType" | "status" | "x" | "y"
> & { badge?: string; days: number; year: number };

const SEEDS: Seed[] = [
  { price: 414000, beds: 3, baths: 2, sqft: 1374, street: "2218 Larkspur Ct", zip: "37214", neighborhood: "Maple Hollow", homeType: "House", status: "For sale", badge: "Showcase", days: 2, year: 1958, x: 63, y: 38 },
  { price: 1299000, beds: 5, baths: 4, sqft: 3890, street: "1406 Vinewood Pl", zip: "37215", neighborhood: "Green Hills", homeType: "House", status: "For sale", badge: "Showcase", days: 5, year: 2019, x: 41, y: 66 },
  { price: 589900, beds: 4, baths: 3, sqft: 2410, street: "731 Pinecrest Ln", zip: "37221", neighborhood: "Bellevue", homeType: "House", status: "For sale", badge: "Open: Sat 11am-1pm", days: 1, year: 2004, x: 18, y: 58 },
  { price: 349000, beds: 2, baths: 2, sqft: 1102, street: "88 Rutledge Way #412", zip: "37203", neighborhood: "The Gulch", homeType: "Condo", status: "For sale", badge: "New 3 hrs ago", days: 0, year: 2016, x: 48, y: 44 },
  { price: 725000, beds: 4, baths: 3.5, sqft: 2960, street: "5120 Oak Barrel Dr", zip: "37211", neighborhood: "Crieve Hall", homeType: "House", status: "For sale", badge: "Price cut: $15K (10/12)", days: 18, year: 1997, x: 52, y: 78 },
  { price: 469500, beds: 3, baths: 2.5, sqft: 1785, street: "302 Delmont Ave", zip: "37207", neighborhood: "Inglewood", homeType: "Townhouse", status: "For sale", badge: "3D Tour", days: 7, year: 2021, x: 60, y: 22 },
  { price: 2150000, beds: 5, baths: 5.5, sqft: 5210, street: "17 Belle Forest Cir", zip: "37205", neighborhood: "Belle Meade", homeType: "House", status: "For sale", badge: "Showcase", days: 11, year: 2022, x: 28, y: 52 },
  { price: 539000, beds: 3, baths: 3, sqft: 1920, street: "1611 Fatherland St", zip: "37206", neighborhood: "East Nashville", homeType: "House", status: "For sale", badge: "Coming soon", days: 3, year: 1925, x: 58, y: 34 },
  { price: 815000, beds: 4, baths: 3, sqft: 3125, street: "940 Harpeth Bend Dr", zip: "37221", neighborhood: "Bellevue", homeType: "House", status: "For sale", days: 26, year: 2008, x: 12, y: 70 },
  { price: 299900, beds: 2, baths: 1, sqft: 940, street: "4412 Clarksville Pike", zip: "37218", neighborhood: "Bordeaux", homeType: "House", status: "For sale", badge: "Price cut: $5K (10/9)", days: 34, year: 1962, x: 36, y: 20 },
  { price: 675000, beds: 3, baths: 2.5, sqft: 2240, street: "2309 Elliston Pl #3", zip: "37203", neighborhood: "Midtown", homeType: "Townhouse", status: "For sale", badge: "Open: Sun 1-3pm", days: 4, year: 2020, x: 44, y: 50 },
  { price: 999000, beds: 4, baths: 4, sqft: 3480, street: "3810 Woodmont Blvd", zip: "37215", neighborhood: "Green Hills", homeType: "House", status: "For sale", days: 9, year: 2015, x: 36, y: 72 },
  { price: 2450, beds: 2, baths: 2, sqft: 1150, street: "500 Church St #1806", zip: "37219", neighborhood: "Downtown", homeType: "Apartment", status: "For rent", badge: "Special offer", days: 2, year: 2018, x: 50, y: 40 },
  { price: 3195, beds: 3, baths: 2.5, sqft: 1690, street: "1214 Gartland Ave", zip: "37206", neighborhood: "Lockeland Springs", homeType: "Townhouse", status: "For rent", days: 6, year: 2017, x: 66, y: 30 },
  { price: 1875, beds: 1, baths: 1, sqft: 780, street: "2004 Charlotte Ave #210", zip: "37203", neighborhood: "Midtown", homeType: "Apartment", status: "For rent", badge: "3D Tour", days: 1, year: 2019, x: 40, y: 46 },
  { price: 4200, beds: 4, baths: 3, sqft: 2600, street: "811 Calvin Ave", zip: "37204", neighborhood: "12 South", homeType: "House", status: "For rent", days: 12, year: 2012, x: 47, y: 58 },
  { price: 612000, beds: 3, baths: 2, sqft: 1840, street: "1508 Ashwood Ave", zip: "37212", neighborhood: "Belmont-Hillsboro", homeType: "House", status: "Sold", days: 21, year: 1939, x: 45, y: 55 },
  { price: 458000, beds: 3, baths: 2, sqft: 1510, street: "3105 Belwood St", zip: "37203", neighborhood: "Wedgewood-Houston", homeType: "House", status: "Sold", days: 30, year: 2014, x: 53, y: 52 },
];

const SPECIALS = [
  ["Fenced backyard", "Updated kitchen", "Covered porch", "Walk to coffee"],
  ["Chef's kitchen", "Primary on main", "Heated pool", "Smart home"],
  ["Cul-de-sac lot", "Bonus room", "New roof 2024", "Two-car garage"],
  ["City views", "Rooftop pool", "Concierge", "Walk Score 96"],
  ["Finished basement", "Screened porch", "Mature trees", "Quartz counters"],
];

const DESCRIPTIONS = [
  "Light-filled and thoughtfully refreshed, this home pairs original character with modern updates throughout. The open kitchen flows to a sunny living area and out to a private, fully fenced backyard made for summer evenings.",
  "Designed for both everyday living and entertaining, with soaring ceilings, wide-plank oak floors and a kitchen anchored by a 10-foot island. The primary suite is a true retreat with a spa bath and custom closet.",
  "Tucked on a quiet street minutes from shops and greenways, this move-in ready home offers flexible living spaces, a bonus room ideal for an office or playroom, and a two-car garage with extra storage.",
];

function money(n: number) {
  return Math.round(n / 1000) * 1000;
}

export const LISTINGS: Listing[] = SEEDS.map((s, i) => {
  const isRent = s.status === "For rent";
  const cover = EXTERIOR[i % EXTERIOR.length];
  const interiors = [0, 1, 2, 3, 4].map((k) => INTERIOR[(i + k) % INTERIOR.length]);
  const agent = AGENTS[i % AGENTS.length];
  const zestimate = isRent ? money(s.price * 190) : money(s.price * (0.97 + ((i * 7) % 9) / 100));
  const listPrice = isRent ? s.price : money(s.price * 1.04);
  return {
    id: `z${41106842 + i * 1373}`,
    price: s.price,
    beds: s.beds,
    baths: s.baths,
    sqft: s.sqft,
    street: s.street,
    city: "Nashville",
    state: "TN",
    zip: s.zip,
    neighborhood: s.neighborhood,
    homeType: s.homeType,
    status: s.status,
    badge: s.badge,
    photos: [cover, ...interiors, EXTERIOR[(i + 5) % EXTERIOR.length]],
    daysOnZillow: s.days,
    views: 180 + ((i * 97) % 1900),
    saves: 6 + ((i * 13) % 140),
    zestimate,
    rentZestimate: isRent ? s.price : money(s.price * 0.0058) || 1800,
    yearBuilt: s.year,
    lotAcres: s.homeType === "Condo" || s.homeType === "Apartment" ? 0 : 0.18 + ((i * 3) % 7) / 10,
    hoa: s.homeType === "Condo" || s.homeType === "Townhouse" || s.homeType === "Apartment" ? 185 + i * 15 : 0,
    parking: s.homeType === "Condo" || s.homeType === "Apartment" ? "Garage, 1 space" : "Attached garage, 2 spaces",
    heating: "Central, Natural gas",
    cooling: "Central air",
    agent,
    description: DESCRIPTIONS[i % DESCRIPTIONS.length],
    specials: SPECIALS[i % SPECIALS.length],
    priceHistory: isRent
      ? [{ date: "10/1/2026", event: "Listed for rent", price: s.price }]
      : s.status === "Sold"
        ? [
            { date: "9/24/2026", event: "Sold", price: s.price },
            { date: "8/30/2026", event: "Pending sale", price: listPrice },
            { date: "8/12/2026", event: "Listed for sale", price: listPrice },
            { date: "5/3/2019", event: "Sold", price: money(s.price * 0.68) },
          ]
        : [
            ...(s.badge?.startsWith("Price cut") ? [{ date: "10/12/2026", event: "Price change", price: s.price }] : []),
            { date: "9/29/2026", event: "Listed for sale", price: s.badge?.startsWith("Price cut") ? listPrice : s.price },
            { date: "6/14/2021", event: "Sold", price: money(s.price * 0.74) },
          ],
    tourAvailable: i % 3 === 0 ? "tomorrow at 11:00 am" : i % 3 === 1 ? "today at 4:30 pm" : "Sat at 10:00 am",
    has3D: i % 2 === 0 || s.badge === "3D Tour",
    x: s.x,
    y: s.y,
  };
});

export type Conversation = {
  id: string;
  agent: Agent;
  listingId: string;
  preview: string;
  time: string;
  unread: boolean;
  messages: { from: "me" | "them"; text: string; time: string }[];
};

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    agent: AGENTS[0],
    listingId: LISTINGS[0].id,
    preview: "Great news — the seller confirmed Saturday at 11. See you there!",
    time: "9:12 PM",
    unread: true,
    messages: [
      { from: "me", text: "Hi Marisol, is 2218 Larkspur Ct still available to tour this weekend?", time: "4:02 PM" },
      { from: "them", text: "Hi! Yes it is. I can do Saturday at 11:00 am or Sunday at 2:00 pm. Which works better?", time: "4:20 PM" },
      { from: "me", text: "Saturday at 11 would be perfect.", time: "6:45 PM" },
      { from: "them", text: "Great news — the seller confirmed Saturday at 11. See you there!", time: "9:12 PM" },
    ],
  },
  {
    id: "c2",
    agent: AGENTS[3],
    listingId: LISTINGS[2].id,
    preview: "I pulled comps for Bellevue. Sending over a quick summary tomorrow.",
    time: "Yesterday",
    unread: false,
    messages: [
      { from: "me", text: "What do you think a fair offer on 731 Pinecrest would be?", time: "Yesterday" },
      { from: "them", text: "I pulled comps for Bellevue. Sending over a quick summary tomorrow.", time: "Yesterday" },
    ],
  },
  {
    id: "c3",
    agent: AGENTS[4],
    listingId: LISTINGS[12].id,
    preview: "The building offers 6 weeks free on a 13-month lease right now.",
    time: "Mon",
    unread: false,
    messages: [
      { from: "me", text: "Are pets allowed in unit 1806?", time: "Mon" },
      { from: "them", text: "Yes — up to two pets. Also, the building offers 6 weeks free on a 13-month lease right now.", time: "Mon" },
    ],
  },
];

export type Notice = {
  id: string;
  kind: "new" | "price" | "tour" | "open" | "rec" | "sold";
  title: string;
  body: string;
  time: string;
  listingId: string;
  unread: boolean;
};

export const NOTIFICATIONS: Notice[] = [
  { id: "n1", kind: "new", title: "🏠 New home for sale", body: "$349K · 2 bd · 2 ba · 1,102 sqft — 88 Rutledge Way #412", time: "now", listingId: LISTINGS[3].id, unread: true },
  { id: "n2", kind: "rec", title: "✨ Recommended for you ✨", body: "$589.9K · 4 bd · 3 ba · 2,410 sqft — 731 Pinecrest Ln", time: "1h", listingId: LISTINGS[2].id, unread: true },
  { id: "n3", kind: "price", title: "Price cut on a home you saved", body: "5120 Oak Barrel Dr dropped $15,000 to $725K", time: "3h", listingId: LISTINGS[4].id, unread: true },
  { id: "n4", kind: "tour", title: "Tour confirmed", body: "Sat, Oct 17 at 11:00 AM · 2218 Larkspur Ct with Marisol", time: "5h", listingId: LISTINGS[0].id, unread: false },
  { id: "n5", kind: "open", title: "Open house this weekend", body: "2309 Elliston Pl #3 · Sun 1–3pm", time: "Yesterday", listingId: LISTINGS[10].id, unread: false },
  { id: "n6", kind: "sold", title: "A home you viewed sold", body: "1508 Ashwood Ave sold for $612,000", time: "Tue", listingId: LISTINGS[16].id, unread: false },
];

export type SavedSearch = { id: string; name: string; criteria: string; newCount: number; frequency: string };

export const SAVED_SEARCHES: SavedSearch[] = [
  { id: "s1", name: "Nashville, TN", criteria: "For sale · $300K–$600K · 3+ bd · House", newCount: 12, frequency: "Instant" },
  { id: "s2", name: "East Nashville", criteria: "For sale · Any price · 2+ bd · House, Townhouse", newCount: 4, frequency: "Daily" },
  { id: "s3", name: "Midtown rentals", criteria: "For rent · Up to $2,500 · 1+ bd · Pets allowed", newCount: 0, frequency: "Daily" },
];

export const RECENT_SEARCHES = ["Nashville, TN", "East Nashville, Nashville, TN", "37215", "Franklin, TN"];

export const NL_SUGGESTIONS = [
  ["Nashville homes with ", "a fenced yard"],
  ["Nashville homes with ", "a fireplace"],
  ["Nashville homes with ", "hardwood floors"],
  ["Nashville homes ", "under $500K near downtown"],
];

export type PlanStep = { id: string; icon: "dollar" | "home" | "sign" | "pen"; tone: string; title: string; body: string };

export const BUYING_STEPS: PlanStep[] = [
  { id: "b0", icon: "dollar", tone: "#0d3b2e", title: "Set your starting budget", body: "Ground your home search in real numbers and today’s market." },
  { id: "b1", icon: "home", tone: "#0b2a7a", title: "Find the home", body: "Search, compare, and get offer-ready." },
  { id: "b2", icon: "sign", tone: "#0d3b2e", title: "Make an offer", body: "Plan your offer strategy and negotiate with confidence." },
  { id: "b3", icon: "pen", tone: "#0b2a7a", title: "Close your purchase", body: "Finalize your financing and close on your new home." },
];

export const SELLING_STEPS: PlanStep[] = [
  { id: "s0", icon: "dollar", tone: "#0d3b2e", title: "Understand your selling position", body: "Get clear on your home’s value, timing, and selling options." },
  { id: "s1", icon: "home", tone: "#0b2a7a", title: "Prepare your home & list it", body: "Set your strategy and prepare your home to attract buyers." },
  { id: "s2", icon: "sign", tone: "#0d3b2e", title: "Find a buyer", body: "Review your offers and choose what works best for you." },
  { id: "s3", icon: "pen", tone: "#0b2a7a", title: "Close your sale", body: "Wrap up the final steps and complete your sale." },
];

export const SCHOOLS = [
  { rating: 7, name: "Lakeview Elementary School", grades: "PK-4", distance: "0.6 mi" },
  { rating: 5, name: "Two Rivers Middle School", grades: "5-8", distance: "1.4 mi" },
  { rating: 6, name: "McGavock High School", grades: "9-12", distance: "2.1 mi" },
];

export function formatPrice(l: Pick<Listing, "price" | "status">) {
  const p = `$${l.price.toLocaleString("en-US")}`;
  return l.status === "For rent" ? `${p}/mo` : p;
}

export function shortPrice(n: number) {
  if (n < 10000) return `$${(n / 1000).toFixed(1)}K`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 2).replace(/\.?0+$/, "")}M`;
  return `$${Math.round(n / 1000)}K`;
}

export function typeLabel(l: Listing) {
  switch (l.status) {
    case "For sale":
      return `${l.homeType} for sale`;
    case "For rent":
      return `${l.homeType} for rent`;
    case "Sold":
      return "Sold";
    default: {
      const never: never = l.status;
      return never;
    }
  }
}

export function monthlyPayment(price: number) {
  const principal = price * 0.8;
  const r = 0.0662 / 12;
  const n = 360;
  const pi = (principal * r) / (1 - Math.pow(1 + r, -n));
  return Math.round(pi + (price * 0.0068) / 12 + 110);
}

export function byId(id: string) {
  return LISTINGS.find((l) => l.id === id) ?? LISTINGS[0];
}
