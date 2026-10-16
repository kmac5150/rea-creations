import { createContext, useContext } from "react";
import type { Order } from "./data";

export type Tab = "discover" | "watchlist" | "events" | "sell" | "account";

export type Route =
  | { kind: "search" }
  | { kind: "artist"; id: string }
  | { kind: "event"; id: string }
  | { kind: "checkout"; eventId: string; listingId: string; qty: number }
  | { kind: "order"; id: string }
  | { kind: "tickets"; id: string }
  | { kind: "category"; label: string };

export type Sheet =
  | { kind: "location" }
  | { kind: "quantity" }
  | { kind: "notice"; eventId: string }
  | { kind: "seat"; eventId: string; listingId: string }
  | { kind: "transfer"; orderId: string }
  | { kind: "sell"; orderId: string };

export type AppState = {
  tab: Tab;
  setTab: (t: Tab) => void;
  push: (r: Route) => void;
  pop: () => void;
  openSheet: (s: Sheet) => void;
  closeSheet: () => void;
  location: string;
  setLocation: (l: string) => void;
  qty: number;
  setQty: (n: number) => void;
  watchlist: string[];
  toggleWatch: (eventId: string) => void;
  favorites: string[];
  toggleFavorite: (performerId: string) => void;
  reminders: string[];
  setReminder: (eventId: string) => void;
  acceptedNotice: string[];
  acceptNotice: (eventId: string) => void;
  orders: Order[];
  addOrder: (o: Order) => void;
  updateOrder: (id: string, patch: Partial<Order>) => void;
  toast: (msg: string) => void;
};

export const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppContext");
  return ctx;
}

export const SERVICE_FEE_RATE = 0.16;
