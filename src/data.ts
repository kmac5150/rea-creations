export type Hours = { day: string; open: string; close: string; closed: boolean }[];

export type Business = {
  name: string;
  address: string;
  phone: string;
  website: string;
  category: string;
  rating: number;
  reviewCount: number;
  hours: Hours;
  amenities: { label: string; on: boolean }[];
  cta: { text: string; button: string; on: boolean };
};

export type Review = {
  id: string;
  user: string;
  avatar: string;
  friends: number;
  reviews: number;
  photos: number;
  elite?: string;
  stars: number;
  date: string;
  text: string;
  reply?: { text: string; isPublic: boolean };
};

export type LeadStatus = "Active" | "Scheduled" | "In progress" | "Done" | "Archived";

export type Lead = {
  id: string;
  user: string;
  avatar: string;
  title: string;
  summary: string;
  when: string;
  party: string;
  status: LeadStatus;
  unread: boolean;
  source: "Request a Quote" | "Message" | "Reservation request";
  messages: { from: "them" | "me"; text: string; at: string }[];
};

export const INITIAL_BIZ: Business = {
  name: "Copper Kettle Bistro",
  address: "418 Valencia St, San Francisco, CA",
  phone: "(415) 555-0142",
  website: "copperkettlebistro.example",
  category: "New American, Brunch, Cocktail Bars",
  rating: 4.5,
  reviewCount: 476,
  hours: [
    { day: "Mon", open: "8:00 AM", close: "3:00 PM", closed: false },
    { day: "Tue", open: "8:00 AM", close: "9:00 PM", closed: false },
    { day: "Wed", open: "8:00 AM", close: "9:00 PM", closed: false },
    { day: "Thu", open: "8:00 AM", close: "10:00 PM", closed: false },
    { day: "Fri", open: "8:00 AM", close: "11:00 PM", closed: false },
    { day: "Sat", open: "9:00 AM", close: "11:00 PM", closed: false },
    { day: "Sun", open: "9:00 AM", close: "3:00 PM", closed: false },
  ],
  amenities: [
    { label: "Takes reservations", on: true },
    { label: "Outdoor seating", on: true },
    { label: "Good for groups", on: true },
    { label: "Happy hour", on: true },
    { label: "Dogs allowed", on: false },
    { label: "Offers delivery", on: false },
  ],
  cta: { text: "10% off brunch for new customers!", button: "Call Now", on: true },
};

export const INITIAL_REVIEWS: Review[] = [
  { id: "r1", user: "Samantha C.", avatar: "/img/u-nina.jpg", friends: 185, reviews: 307, photos: 222, elite: "Elite 26", stars: 3, date: "Oct 15, 2026, 9:32 AM", text: "Great little bistro in my neighborhood. The mocha is to die for. But it takes forever to get a table on Sunday. I recommend it if you have a few minutes." },
  { id: "r2", user: "Marcus T.", avatar: "/img/u-marcus.jpg", friends: 42, reviews: 58, photos: 31, stars: 5, date: "Oct 13, 2026, 7:10 PM", text: "Best shakshuka in the Mission, hands down. The patio is perfect on a sunny afternoon and the staff remembered our order from last week." },
  { id: "r3", user: "Ava R.", avatar: "/img/u-ava.jpg", friends: 12, reviews: 9, photos: 4, stars: 4, date: "Oct 9, 2026, 11:45 AM", text: "Pancakes were fluffy and the cold brew was strong. Lost a star because our server forgot the side of bacon.", reply: { text: "Thanks Ava! So sorry about the bacon, next round is on us.", isPublic: true } },
  { id: "r4", user: "James L.", avatar: "/img/u-james.jpg", friends: 230, reviews: 412, photos: 1180, elite: "Elite 26", stars: 2, date: "Oct 2, 2026, 1:20 PM", text: "Food was fine but the music was so loud we couldn't talk. Prices have crept up too." },
  { id: "r5", user: "Sam K.", avatar: "/img/u-sam.jpg", friends: 7, reviews: 21, photos: 15, stars: 5, date: "Sep 28, 2026, 10:02 AM", text: "Came for a birthday brunch for 10 and they handled it beautifully. Mimosa flights are a must." },
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: "l1",
    user: "Maria D.",
    avatar: "/img/u-maria.jpg",
    title: "Surprise party for 20",
    summary: "Private room · Sat, Oct 24 · 20 guests · One-time event",
    when: "4:59 PM",
    party: "20 guests",
    status: "Active",
    unread: true,
    source: "Message",
    messages: [{ from: "them", text: "I'm planning a surprise party for my boyfriend. Can you seat a table of 20 next Saturday?", at: "4:59 PM" }],
  },
  {
    id: "l2",
    user: "Nina P.",
    avatar: "/img/u-nina.jpg",
    title: "Company offsite lunch",
    summary: "Catering · Thu, Oct 29 · 35 people · Delivery to SoMa",
    when: "11:20 AM",
    party: "35 people",
    status: "Active",
    unread: true,
    source: "Request a Quote",
    messages: [{ from: "them", text: "Hi! Do you cater? We need lunch for 35 next Thursday, vegetarian options please.", at: "11:20 AM" }],
  },
  {
    id: "l3",
    user: "James L.",
    avatar: "/img/u-james.jpg",
    title: "Brunch reservation for 6",
    summary: "Reservation · Sun, Oct 18 · 6 guests · Patio requested",
    when: "Yesterday",
    party: "6 guests",
    status: "Scheduled",
    unread: false,
    source: "Reservation request",
    messages: [
      { from: "them", text: "Could we get a patio table for 6 on Sunday around 11?", at: "Yesterday" },
      { from: "me", text: "You're all set for 11:00 AM on the patio!", at: "Yesterday" },
    ],
  },
  {
    id: "l4",
    user: "Sam K.",
    avatar: "/img/u-sam.jpg",
    title: "Birthday brunch follow-up",
    summary: "Message · Done · 10 guests",
    when: "Sep 28",
    party: "10 guests",
    status: "Done",
    unread: false,
    source: "Message",
    messages: [
      { from: "them", text: "Thank you for an amazing birthday brunch!", at: "Sep 28" },
      { from: "me", text: "It was our pleasure, come back soon!", at: "Sep 28" },
    ],
  },
];

export const PHOTOS = ["/img/room-1.jpg", "/img/f-mezze.jpg", "/img/f-pancakes.jpg", "/img/f-salad.jpg", "/img/patio.jpg", "/img/f-brunch.jpg", "/img/f-bowl.jpg", "/img/kitchen.jpg", "/img/f-toast.jpg", "/img/room-2.jpg", "/img/f-frenchtoast.jpg", "/img/f-pizza.jpg"];

export const EXTRA_PHOTOS = ["/img/f-spread.jpg", "/img/hero.jpg"];

/** Last 30 days: user views and customer leads per day. */
export const VIEWS = [21, 30, 35, 32, 50, 58, 62, 39, 29, 27, 24, 33, 67, 81, 54, 41, 36, 44, 58, 71, 88, 63, 45, 38, 41, 49, 77, 92, 66, 52];
export const LEADS = [3, 4, 2, 5, 6, 8, 9, 4, 3, 2, 3, 4, 8, 11, 7, 5, 4, 6, 8, 9, 12, 8, 6, 5, 5, 6, 10, 13, 9, 7];

export const RECENT = [
  { icon: "directions", text: "A man in his 30s from Oakland, CA got directions to your business.", at: "Today at 4:45 PM via Yelp iPhone app" },
  { icon: "map", text: "A woman from Los Angeles, CA viewed the map for your business.", at: "Today at 10:12 AM via Yelp Android app" },
  { icon: "call", text: "A Yelp user in Minneapolis, MN clicked to call your business.", at: "Yesterday at 6:30 PM via Yelp iPhone app" },
  { icon: "website", text: "A Yelp user in San Jose, CA visited your website.", at: "Yesterday at 1:04 PM via yelp.com" },
] as const;

export const ADS_MONTHS = [
  { m: "Nov", ads: 2, organic: 2 },
  { m: "Dec", ads: 3, organic: 2 },
  { m: "Jan", ads: 2, organic: 1 },
  { m: "Feb", ads: 2, organic: 2 },
  { m: "Mar", ads: 3, organic: 2 },
  { m: "Apr", ads: 2, organic: 2 },
  { m: "May", ads: 2, organic: 2 },
  { m: "Jun", ads: 3, organic: 1 },
  { m: "Jul", ads: 1, organic: 2 },
  { m: "Aug", ads: 3, organic: 2 },
  { m: "Sep", ads: 3, organic: 2 },
  { m: "Oct", ads: 2, organic: 2 },
];

export const AD_CUSTOMERS = [
  { name: "Maria D.", what: "Messaged you about a party for 20", at: "Today" },
  { name: "Nina P.", what: "Requested a catering quote", at: "Today" },
  { name: "A Yelp user", what: "Clicked to call", at: "Yesterday" },
  { name: "Leo F.", what: "Viewed your menu", at: "Oct 14" },
  { name: "A Yelp user", what: "Got directions", at: "Oct 13" },
];

export const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
