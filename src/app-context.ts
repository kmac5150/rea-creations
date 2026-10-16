import { createContext, useContext } from "react";
import type { Listing, ListingStatus } from "./data";

export type Tab = "search" | "updates" | "favorites" | "plan" | "inbox";

export type Route =
  | { kind: "home"; id: string }
  | { kind: "gallery"; id: string }
  | { kind: "chat"; id: string }
  | { kind: "planStep"; id: string };

export type Sheet =
  | { kind: "filters" }
  | { kind: "searchInput" }
  | { kind: "tour"; id: string }
  | { kind: "contact"; id: string }
  | { kind: "buyability" }
  | { kind: "sort" };

export type HomeType = Listing["homeType"];

export type SortKey = "Homes for You" | "Price (High to Low)" | "Price (Low to High)" | "Newest" | "Bedrooms" | "Square Feet";

export type Filters = {
  status: ListingStatus;
  minPrice: number;
  maxPrice: number;
  beds: number;
  baths: number;
  types: HomeType[];
  sort: SortKey;
};

export const ALL_TYPES: HomeType[] = ["House", "Townhouse", "Multi-family", "Condo", "Apartment"];

export const DEFAULT_FILTERS: Filters = {
  status: "For sale",
  minPrice: 0,
  maxPrice: 0,
  beds: 0,
  baths: 0,
  types: ALL_TYPES,
  sort: "Homes for You",
};

export type AppState = {
  tab: Tab;
  setTab: (t: Tab) => void;
  push: (r: Route) => void;
  pop: () => void;
  openSheet: (s: Sheet) => void;
  closeSheet: () => void;
  saved: string[];
  toggleSave: (id: string) => void;
  filters: Filters;
  setFilters: (f: Filters) => void;
  location: string;
  setLocation: (l: string) => void;
  toast: (msg: string) => void;
};

export const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppContext");
  return ctx;
}

export function applyFilters(listings: Listing[], f: Filters) {
  const out = listings.filter(
    (l) =>
      l.status === f.status &&
      (f.minPrice === 0 || l.price >= f.minPrice) &&
      (f.maxPrice === 0 || l.price <= f.maxPrice) &&
      l.beds >= f.beds &&
      l.baths >= f.baths &&
      f.types.includes(l.homeType),
  );
  switch (f.sort) {
    case "Homes for You":
      return out;
    case "Price (High to Low)":
      return out.sort((a, b) => b.price - a.price);
    case "Price (Low to High)":
      return out.sort((a, b) => a.price - b.price);
    case "Newest":
      return out.sort((a, b) => a.daysOnZillow - b.daysOnZillow);
    case "Bedrooms":
      return out.sort((a, b) => b.beds - a.beds);
    case "Square Feet":
      return out.sort((a, b) => b.sqft - a.sqft);
    default: {
      const never: never = f.sort;
      return never;
    }
  }
}

/** Zillow reports metro-wide totals; the dummy set is scaled so counts look realistic. */
export function displayCount(n: number, status: ListingStatus) {
  const scale = status === "For sale" ? 358 : status === "For rent" ? 412 : 233;
  return n === 0 ? 0 : n * scale + (n % 7) * 13;
}
