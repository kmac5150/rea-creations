export type Vertical = "restaurant" | "grocery" | "retail";

export type OptionGroup = {
  id: string;
  title: string;
  required: boolean;
  max: number;
  choices: { id: string; label: string; price: number }[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  /** Photo path for restaurant items; emoji glyph for packaged goods. */
  image: string;
  emoji?: string;
  category: string;
  badge?: string;
  likes?: number;
  options?: OptionGroup[];
};

export type Store = {
  id: string;
  name: string;
  vertical: Vertical;
  cuisine: string[];
  priceLevel: "$" | "$$" | "$$$";
  rating: number;
  reviews: string;
  distance: number;
  eta: number;
  fee: string;
  dashpass: boolean;
  promo?: string;
  hero: string;
  logoText: string;
  logoBg: string;
  logoFg: string;
  description: string;
  categories: string[];
  items: MenuItem[];
};

export type PastOrder = {
  id: string;
  storeId: string;
  date: string;
  items: number;
  total: number;
  status: "Completed" | "Cancelled";
  rated?: number;
};

export const ADDRESSES = [
  { id: "a1", label: "283 Hayes St", detail: "San Francisco, CA 94102", note: "Apt 4B · Leave at door" },
  { id: "a2", label: "Work", detail: "1 Market St, San Francisco, CA 94105", note: "Lobby desk" },
  { id: "a3", label: "1450 Valencia St", detail: "San Francisco, CA 94110", note: "" },
];

export const CATEGORIES = [
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "burrito", label: "Burrito", emoji: "🌯" },
  { id: "bowls", label: "Bowls", emoji: "🥗" },
  { id: "bakery", label: "Bakery", emoji: "🥐" },
  { id: "smoothie", label: "Smoothie", emoji: "🥤" },
  { id: "chicken", label: "Chicken", emoji: "🍗" },
  { id: "sushi", label: "Sushi", emoji: "🍣" },
  { id: "burgers", label: "Burgers", emoji: "🍔" },
  { id: "ramen", label: "Ramen", emoji: "🍜" },
  { id: "dessert", label: "Dessert", emoji: "🍰" },
  { id: "coffee", label: "Coffee", emoji: "☕" },
  { id: "breakfast", label: "Breakfast", emoji: "🍳" },
];

const img = (n: number) => `/img/f${n}.jpg`;

function opts(kind: "size" | "protein" | "drink" | "spice" | "toppings"): OptionGroup {
  switch (kind) {
    case "size":
      return {
        id: "size",
        title: "Choose a size",
        required: true,
        max: 1,
        choices: [
          { id: "s", label: "Small", price: 0 },
          { id: "m", label: "Medium", price: 3 },
          { id: "l", label: "Large", price: 6 },
        ],
      };
    case "protein":
      return {
        id: "protein",
        title: "Choose your protein",
        required: true,
        max: 1,
        choices: [
          { id: "chk", label: "Chicken", price: 0 },
          { id: "tofu", label: "Crispy tofu", price: 0 },
          { id: "steak", label: "Steak", price: 3.5 },
          { id: "shrimp", label: "Shrimp", price: 4 },
        ],
      };
    case "drink":
      return {
        id: "drink",
        title: "Add a drink",
        required: false,
        max: 1,
        choices: [
          { id: "coke", label: "Coca-Cola", price: 2.5 },
          { id: "lemonade", label: "Fresh lemonade", price: 3.75 },
          { id: "water", label: "Sparkling water", price: 2.25 },
        ],
      };
    case "spice":
      return {
        id: "spice",
        title: "Spice level",
        required: true,
        max: 1,
        choices: [
          { id: "mild", label: "Mild", price: 0 },
          { id: "med", label: "Medium", price: 0 },
          { id: "hot", label: "Hot 🌶️", price: 0 },
        ],
      };
    case "toppings":
      return {
        id: "toppings",
        title: "Extra toppings",
        required: false,
        max: 3,
        choices: [
          { id: "cheese", label: "Extra cheese", price: 1.5 },
          { id: "bacon", label: "Bacon", price: 2 },
          { id: "avocado", label: "Avocado", price: 2.25 },
          { id: "egg", label: "Fried egg", price: 1.75 },
        ],
      };
    default: {
      const never: never = kind;
      return never;
    }
  }
}

type ItemSeed = [name: string, description: string, price: number, image: number, category: string, extra?: Partial<MenuItem>];

function menu(prefix: string, seeds: ItemSeed[]): MenuItem[] {
  return seeds.map(([name, description, price, image, category, extra], i) => ({
    id: `${prefix}-${i}`,
    name,
    description,
    price,
    image: img(image),
    category,
    ...extra,
  }));
}

type GoodSeed = [name: string, size: string, price: number, emoji: string, category: string];

function goods(prefix: string, seeds: GoodSeed[]): MenuItem[] {
  return seeds.map(([name, size, price, emoji, category], i) => ({
    id: `${prefix}-${i}`,
    name,
    description: size,
    price,
    image: "",
    emoji,
    category,
  }));
}

export const STORES: Store[] = [
  {
    id: "golden-crust",
    name: "Golden Crust Pizza Co.",
    vertical: "restaurant",
    cuisine: ["Pizza", "Italian"],
    priceLevel: "$$",
    rating: 4.8,
    reviews: "12k+",
    distance: 0.6,
    eta: 22,
    fee: "$0 delivery fee",
    dashpass: true,
    promo: "$5 off $30+",
    hero: img(12),
    logoText: "GC",
    logoBg: "#1d1d1d",
    logoFg: "#f6c445",
    description: "Wood-fired Neapolitan pies, garlic knots and house-made ranch since 2011.",
    categories: ["Most Ordered", "Pizzas", "Sides", "Desserts", "Drinks"],
    items: menu("gc", [
      ["Margherita", "San Marzano tomato, fior di latte, basil, olive oil", 18.5, 1, "Pizzas", { badge: "#1 Most liked", likes: 96, options: [opts("size"), opts("toppings")] }],
      ["Hot Honey Pepperoni", "Cup-and-char pepperoni, mozzarella, Calabrian hot honey", 21, 12, "Pizzas", { badge: "#2 Most liked", likes: 94, options: [opts("size"), opts("toppings")] }],
      ["Meatball Sliders (3)", "Beef & pork meatballs, marinara, provolone, brioche", 13.75, 10, "Sides", { likes: 91 }],
      ["Garlic Knots (6)", "Parmesan, parsley, roasted garlic butter, marinara", 8.5, 9, "Sides"],
      ["Tiramisu", "Espresso-soaked ladyfingers, mascarpone cream, cocoa", 9, 7, "Desserts"],
      ["San Pellegrino Limonata", "11.15 oz can", 3.5, 31, "Drinks"],
    ]),
  },
  {
    id: "smash-bros",
    name: "Smash Bros Burgers",
    vertical: "restaurant",
    cuisine: ["Burgers", "American"],
    priceLevel: "$",
    rating: 4.7,
    reviews: "20k+",
    distance: 0.9,
    eta: 19,
    fee: "$0 delivery fee",
    dashpass: true,
    promo: "$10 off $20+",
    hero: img(13),
    logoText: "SB",
    logoBg: "#d62b1f",
    logoFg: "#fff",
    description: "Double-smashed patties, crinkle fries and thick shakes.",
    categories: ["Most Ordered", "Burgers", "Fries & Sides", "Shakes"],
    items: menu("sb", [
      ["Double Smash", "Two smashed patties, American cheese, pickles, smash sauce", 12.95, 2, "Burgers", { badge: "#1 Most liked", likes: 97, options: [opts("toppings"), opts("drink")] }],
      ["Bacon Jam Burger", "Single patty, bacon onion jam, cheddar, arugula", 13.5, 18, "Burgers", { likes: 93, options: [opts("toppings"), opts("drink")] }],
      ["Sliders Duo", "Two sliders, caramelized onion, Swiss", 11.25, 17, "Burgers", { badge: "#3 Most liked", likes: 92 }],
      ["Loaded Crinkle Fries", "Cheddar sauce, bacon, scallion, ranch", 7.5, 13, "Fries & Sides"],
      ["Strawberry Shake", "Fresh strawberries, vanilla soft serve", 6.75, 23, "Shakes"],
    ]),
  },
  {
    id: "verde-bowl",
    name: "Verde Bowl Kitchen",
    vertical: "restaurant",
    cuisine: ["Bowls", "Healthy"],
    priceLevel: "$$",
    rating: 4.9,
    reviews: "4k+",
    distance: 0.4,
    eta: 16,
    fee: "$0 delivery fee",
    dashpass: true,
    hero: img(5),
    logoText: "VB",
    logoBg: "#2f7d4a",
    logoFg: "#fff",
    description: "Seasonal grain bowls and salads built to order.",
    categories: ["Most Ordered", "Bowls", "Salads", "Drinks"],
    items: menu("vb", [
      ["Harvest Bowl", "Wild rice, roasted sweet potato, kale, goat cheese, balsamic", 15.25, 5, "Bowls", { badge: "#1 Most liked", likes: 98, options: [opts("protein")] }],
      ["Spicy Salmon Poke", "Sushi rice, salmon, cucumber, avocado, spicy mayo", 17.5, 3, "Bowls", { likes: 95, options: [opts("spice")] }],
      ["Green Goddess Salad", "Little gem, herbs, cucumber, pistachio, goddess dressing", 13.75, 6, "Salads", { options: [opts("protein")] }],
      ["Fresh Squeezed OJ", "16 oz", 5.5, 31, "Drinks"],
    ]),
  },
  {
    id: "koi-rice",
    name: "Koi & Rice Sushi",
    vertical: "restaurant",
    cuisine: ["Sushi", "Japanese"],
    priceLevel: "$$$",
    rating: 4.8,
    reviews: "6k+",
    distance: 1.3,
    eta: 31,
    fee: "$1.99 delivery fee",
    dashpass: false,
    promo: "20% off, up to $5",
    hero: img(14),
    logoText: "鯉",
    logoBg: "#11264a",
    logoFg: "#fff",
    description: "Edomae-style nigiri, specialty rolls and omakase sets.",
    categories: ["Most Ordered", "Specialty Rolls", "Nigiri", "Sides"],
    items: menu("kr", [
      ["Dragon Roll", "Shrimp tempura, eel, avocado, unagi sauce", 18, 14, "Specialty Rolls", { badge: "#1 Most liked", likes: 96 }],
      ["Chef's Nigiri (8 pc)", "Daily selection of seasonal fish", 32, 19, "Nigiri", { likes: 97 }],
      ["Spicy Tuna Roll", "Tuna, spicy mayo, cucumber, sesame", 11.5, 19, "Specialty Rolls", { options: [opts("spice")] }],
      ["Miso Soup", "Tofu, wakame, scallion", 4, 15, "Sides"],
    ]),
  },
  {
    id: "noodle-lab",
    name: "Noodle Lab Ramen",
    vertical: "restaurant",
    cuisine: ["Ramen", "Noodles"],
    priceLevel: "$$",
    rating: 4.6,
    reviews: "9k+",
    distance: 1.1,
    eta: 27,
    fee: "$0 delivery fee",
    dashpass: true,
    hero: img(15),
    logoText: "NL",
    logoBg: "#f2d541",
    logoFg: "#1d1d1d",
    description: "18-hour tonkotsu, spicy miso and hand-pulled noodles.",
    categories: ["Most Ordered", "Ramen", "Noodles", "Small Plates"],
    items: menu("nl", [
      ["Tonkotsu Ramen", "Pork bone broth, chashu, ajitama egg, nori", 17, 15, "Ramen", { badge: "#1 Most liked", likes: 95, options: [opts("spice")] }],
      ["Garlic Shrimp Noodles", "Wok-tossed lo mein, shrimp, chili crisp", 16.5, 16, "Noodles", { likes: 92, options: [opts("spice")] }],
      ["Thai Basil Plate", "Jasmine rice, holy basil, chili, crispy egg", 15, 4, "Small Plates", { options: [opts("protein"), opts("spice")] }],
    ]),
  },
  {
    id: "trattoria",
    name: "Trattoria Nonna",
    vertical: "restaurant",
    cuisine: ["Italian", "Pasta"],
    priceLevel: "$$",
    rating: 4.7,
    reviews: "3k+",
    distance: 0.8,
    eta: 24,
    fee: "$0 delivery fee",
    dashpass: true,
    promo: "Free garlic bread",
    hero: img(9),
    logoText: "TN",
    logoBg: "#7a2c22",
    logoFg: "#fff",
    description: "Fresh pasta made every morning. Grandma-approved.",
    categories: ["Most Ordered", "Pasta", "Antipasti"],
    items: menu("tn", [
      ["Bucatini Pomodoro", "Bucatini, slow-cooked tomato, basil, parmigiano", 19, 9, "Pasta", { badge: "#1 Most liked", likes: 97 }],
      ["Nonna's Meatballs", "Ricotta meatballs, sugo, grilled bread", 14, 10, "Antipasti", { likes: 94 }],
      ["Spicy Rigatoni", "Vodka sauce, Calabrian chili, burrata", 21, 16, "Pasta", { options: [opts("spice")] }],
    ]),
  },
  {
    id: "sweet-spot",
    name: "Sweet Spot Bakery",
    vertical: "restaurant",
    cuisine: ["Bakery", "Dessert"],
    priceLevel: "$",
    rating: 4.9,
    reviews: "2k+",
    distance: 0.5,
    eta: 18,
    fee: "$0 delivery fee",
    dashpass: true,
    hero: img(20),
    logoText: "SS",
    logoBg: "#f7c5d4",
    logoFg: "#8a1c45",
    description: "Donuts, layer cakes and pastries baked in Hayes Valley.",
    categories: ["Most Ordered", "Donuts", "Cakes", "Cups"],
    items: menu("ss", [
      ["Donut Box (6)", "Glazed, sprinkle, chocolate, Boston cream & more", 16, 20, "Donuts", { badge: "#1 Most liked", likes: 99 }],
      ["Strawberry Shortcake Slice", "Vanilla sponge, berries, whipped cream", 8.5, 7, "Cakes", { likes: 96 }],
      ["Berry Parfait Cups (4)", "Panna cotta, berry compote", 12, 21, "Cups"],
      ["Cookies & Cream Jar", "Chocolate cake, Oreo mousse", 7.5, 22, "Cups"],
    ]),
  },
  {
    id: "ember",
    name: "Ember Skewer House",
    vertical: "restaurant",
    cuisine: ["BBQ", "Middle Eastern"],
    priceLevel: "$$",
    rating: 4.5,
    reviews: "1k+",
    distance: 1.8,
    eta: 34,
    fee: "$2.49 delivery fee",
    dashpass: false,
    hero: img(11),
    logoText: "ES",
    logoBg: "#e46a1f",
    logoFg: "#fff",
    description: "Charcoal-grilled skewers, mezze and fresh pita.",
    categories: ["Most Ordered", "Skewers", "Mezze"],
    items: menu("es", [
      ["Mixed Skewer Platter", "Chicken, kofta and lamb skewers, rice, salad", 24, 11, "Skewers", { badge: "#1 Most liked", likes: 93 }],
      ["Chicken Shawarma Plate", "Garlic toum, pickles, saffron rice", 17, 4, "Skewers", { options: [opts("spice")] }],
    ]),
  },
  {
    id: "sunny-side",
    name: "Sunny Side Café",
    vertical: "restaurant",
    cuisine: ["Breakfast", "Coffee"],
    priceLevel: "$",
    rating: 4.6,
    reviews: "5k+",
    distance: 0.3,
    eta: 15,
    fee: "$0 delivery fee",
    dashpass: true,
    promo: "Buy 1, get 1 free",
    hero: img(8),
    logoText: "☀",
    logoBg: "#ffb400",
    logoFg: "#fff",
    description: "All-day breakfast, avocado toast and single-origin pour-overs.",
    categories: ["Most Ordered", "Breakfast", "Coffee"],
    items: menu("sc", [
      ["Avocado Egg Toast", "Sourdough, smashed avocado, jammy eggs, chili flake", 13, 8, "Breakfast", { badge: "#1 Most liked", likes: 95, options: [opts("toppings")] }],
      ["Breakfast Burger", "Fried egg, bacon, hash brown, cheddar", 14.5, 17, "Breakfast"],
      ["Iced Orange Spritz", "Fresh OJ, tonic, rosemary", 6, 31, "Coffee"],
    ]),
  },
  {
    id: "freshcart",
    name: "FreshCart Market",
    vertical: "grocery",
    cuisine: ["Grocery"],
    priceLevel: "$",
    rating: 4.9,
    reviews: "1,200+",
    distance: 1.5,
    eta: 30,
    fee: "$0 delivery fee over $25",
    dashpass: true,
    promo: "$15 off $50+",
    hero: img(27),
    logoText: "FC",
    logoBg: "#00539f",
    logoFg: "#fff",
    description: "Farm-fresh produce, pantry staples and everyday essentials.",
    categories: ["Produce", "Dairy & Eggs", "Snacks", "Beverages"],
    items: goods("fc", [
      ["Strawberries", "1 lb", 5.05, "🍓", "Produce"],
      ["Fresh Organic Lemons Bag", "2 lb", 6.35, "🍋", "Produce"],
      ["Cotton Candy Grapes", "1.5 lb", 5.95, "🍇", "Produce"],
      ["Hass Avocados", "4 ct", 4.99, "🥑", "Produce"],
      ["Bananas", "Bunch of 5", 1.89, "🍌", "Produce"],
      ["Seedless Watermelon", "Each", 7.49, "🍉", "Produce"],
      ["Large Brown Eggs", "Dozen", 4.29, "🥚", "Dairy & Eggs"],
      ["Whole Milk", "1/2 gal", 3.79, "🥛", "Dairy & Eggs"],
      ["Aged Cheddar Block", "8 oz", 4.49, "🧀", "Dairy & Eggs"],
      ["Sourdough Loaf", "24 oz", 6.99, "🍞", "Snacks"],
      ["Tortilla Chips", "13 oz", 3.99, "🌮", "Snacks"],
      ["Orange Juice", "52 fl oz", 4.99, "🧃", "Beverages"],
    ]),
  },
  {
    id: "greenleaf",
    name: "Greenleaf Grocery",
    vertical: "grocery",
    cuisine: ["Grocery", "Organic"],
    priceLevel: "$$",
    rating: 4.8,
    reviews: "900+",
    distance: 2.1,
    eta: 35,
    fee: "$0 delivery fee over $35",
    dashpass: true,
    hero: img(25),
    logoText: "G",
    logoBg: "#e21b2c",
    logoFg: "#fff",
    description: "Organic and local groceries, hand-picked by your Dasher.",
    categories: ["Seasonal Candy", "Produce", "Bakery"],
    items: goods("gl", [
      ["Classic Candy Corn", "11 oz", 3.49, "🍬", "Seasonal Candy"],
      ["Chocolate Pumpkins", "9 oz", 5.99, "🎃", "Seasonal Candy"],
      ["Peanut Butter Cups", "8 pk", 3.99, "🍫", "Seasonal Candy"],
      ["Honeycrisp Apples", "3 lb bag", 6.99, "🍎", "Produce"],
      ["Baby Carrots", "1 lb", 1.99, "🥕", "Produce"],
      ["Butter Croissants", "4 ct", 6.49, "🥐", "Bakery"],
    ]),
  },
  {
    id: "dashmart",
    name: "DashMart",
    vertical: "grocery",
    cuisine: ["Convenience"],
    priceLevel: "$",
    rating: 4.7,
    reviews: "15k+",
    distance: 0.9,
    eta: 20,
    fee: "$0 delivery fee",
    dashpass: true,
    hero: img(30),
    logoText: "DM",
    logoBg: "#eb1700",
    logoFg: "#fff",
    description: "Snacks, essentials and health products delivered fast.",
    categories: ["Health & Flu Essentials", "Snacks", "Drinks"],
    items: goods("dm", [
      ["Honey Lemon Cough Drops", "30 ct", 3.49, "🍯", "Health & Flu Essentials"],
      ["Vitamin C Fizzy Drink Mix", "10 ct", 6.99, "🍊", "Health & Flu Essentials"],
      ["Sheer Bandages", "40 ct", 6.09, "🩹", "Health & Flu Essentials"],
      ["Tissues", "3 boxes", 5.49, "🤧", "Health & Flu Essentials"],
      ["Nacho Cheese Chips", "9.25 oz", 5.29, "🔺", "Snacks"],
      ["Chocolate Bar Variety", "6 pk", 7.99, "🍫", "Snacks"],
      ["Cold Brew Coffee", "11 fl oz", 4.29, "🥫", "Drinks"],
      ["Sparkling Water 8pk", "12 fl oz cans", 6.49, "🫧", "Drinks"],
    ]),
  },
  {
    id: "bloom",
    name: "Bloom & Stem Flowers",
    vertical: "retail",
    cuisine: ["Flowers", "Gifts"],
    priceLevel: "$$",
    rating: 4.9,
    reviews: "800+",
    distance: 1.2,
    eta: 40,
    fee: "$0 delivery fee",
    dashpass: true,
    promo: "Free card",
    hero: "/img/r1.jpg",
    logoText: "B&S",
    logoBg: "#5a3d8a",
    logoFg: "#fff",
    description: "Hand-tied bouquets and plants for every occasion.",
    categories: ["Bouquets", "Plants", "Gifts"],
    items: goods("bs", [
      ["Sunflower Sunshine Bouquet", "12 stems", 39.99, "🌻", "Bouquets"],
      ["Classic Red Roses", "1 dozen", 54.99, "🌹", "Bouquets"],
      ["Tulip Garden Mix", "15 stems", 34.99, "🌷", "Bouquets"],
      ["Potted Orchid", "5 in pot", 29.99, "🪴", "Plants"],
      ["Balloon Add-on", "Happy Birthday", 8.99, "🎈", "Gifts"],
    ]),
  },
  {
    id: "peak",
    name: "Peak Sports Outfitters",
    vertical: "retail",
    cuisine: ["Sporting Goods"],
    priceLevel: "$$",
    rating: 4.7,
    reviews: "2k+",
    distance: 2.4,
    eta: 45,
    fee: "$3.99 delivery fee",
    dashpass: true,
    hero: "/img/r3.jpg",
    logoText: "PK",
    logoBg: "#0c5e3b",
    logoFg: "#fff",
    description: "Gear, apparel and hydration for game day and beyond.",
    categories: ["Hydration", "Bags", "Apparel"],
    items: goods("pk", [
      ["30 oz Quencher Tumbler", "Tigerlily", 35, "🥤", "Hydration"],
      ["Heritage Drawstring Bag", "Black/White", 18, "🎒", "Bags"],
      ["Tour Mesh Golf Hat", "Royal/White", 37, "🧢", "Apparel"],
      ["Pickleball Paddle Set", "2 paddles, 4 balls", 49.99, "🏓", "Apparel"],
      ["Electrolyte Drink Mix", "16 sticks", 24.99, "⚡", "Hydration"],
    ]),
  },
  {
    id: "pawpal",
    name: "PawPal Pet Supply",
    vertical: "retail",
    cuisine: ["Pets"],
    priceLevel: "$",
    rating: 4.8,
    reviews: "1k+",
    distance: 1.6,
    eta: 32,
    fee: "$0 delivery fee",
    dashpass: true,
    promo: "$10 off $40+",
    hero: "/img/r2.jpg",
    logoText: "🐾",
    logoBg: "#ff7a00",
    logoFg: "#fff",
    description: "Food, treats and toys for every pet.",
    categories: ["Dog", "Cat"],
    items: goods("pp", [
      ["Squeaky Bone Chew Toy", "Medium", 9.99, "🦴", "Dog"],
      ["Grain-Free Kibble", "12 lb", 42.99, "🐕", "Dog"],
      ["Salmon Cat Treats", "3 oz", 4.49, "🐟", "Cat"],
      ["Feather Wand Toy", "Each", 7.99, "🪶", "Cat"],
    ]),
  },
];

export const PAST_ORDERS: PastOrder[] = [
  { id: "o1", storeId: "smash-bros", date: "Oct 12", items: 3, total: 34.2, status: "Completed", rated: 5 },
  { id: "o2", storeId: "freshcart", date: "Oct 9", items: 14, total: 86.47, status: "Completed" },
  { id: "o3", storeId: "koi-rice", date: "Oct 4", items: 2, total: 52.1, status: "Completed", rated: 4 },
  { id: "o4", storeId: "sunny-side", date: "Sep 28", items: 2, total: 21.85, status: "Completed" },
  { id: "o5", storeId: "golden-crust", date: "Sep 20", items: 1, total: 24.6, status: "Cancelled" },
];

export const BROWSE_TILES = [
  { label: "Grocery", emoji: "🥦", bg: "#e7f4e4", tab: "grocery" as const },
  { label: "Convenience", emoji: "🥤", bg: "#fff1d6", tab: "grocery" as const },
  { label: "Alcohol", emoji: "🍷", bg: "#f6e3ea", tab: "grocery" as const },
  { label: "Pets", emoji: "🐶", bg: "#fde9d9", tab: "retail" as const },
  { label: "Flowers", emoji: "💐", bg: "#efe6fa", tab: "retail" as const },
  { label: "Health", emoji: "💊", bg: "#e3f0fb", tab: "grocery" as const },
  { label: "Beauty", emoji: "💄", bg: "#fbe4ef", tab: "retail" as const },
  { label: "Retail", emoji: "🛍️", bg: "#eceff3", tab: "retail" as const },
  { label: "Gifts", emoji: "🎁", bg: "#fdebe8", tab: "retail" as const },
];

export function storeById(id: string) {
  return STORES.find((s) => s.id === id) ?? STORES[0];
}

export function itemById(storeId: string, itemId: string) {
  const s = storeById(storeId);
  return s.items.find((i) => i.id === itemId) ?? s.items[0];
}

export function money(n: number) {
  return `$${n.toFixed(2)}`;
}
