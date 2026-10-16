import { createContext, useContext } from "react";

export type Tab = "home" | "grocery" | "retail" | "orders" | "browse";

export type Route =
  | { kind: "store"; id: string }
  | { kind: "cart"; storeId: string }
  | { kind: "checkout"; storeId: string }
  | { kind: "tracking" }
  | { kind: "account" }
  | { kind: "notifications" }
  | { kind: "category"; label: string };

export type Sheet = { kind: "item"; storeId: string; itemId: string } | { kind: "address" } | { kind: "carts" };

export type CartLine = {
  key: string;
  storeId: string;
  itemId: string;
  qty: number;
  unitPrice: number;
  options: string[];
};

export type ActiveOrder = {
  storeId: string;
  lines: CartLine[];
  total: number;
  placedAt: number;
  addOns: number;
};

export type AppState = {
  tab: Tab;
  setTab: (t: Tab) => void;
  push: (r: Route) => void;
  pop: () => void;
  openSheet: (s: Sheet) => void;
  closeSheet: () => void;
  cart: CartLine[];
  addToCart: (line: Omit<CartLine, "key">) => void;
  setQty: (key: string, qty: number) => void;
  favorites: string[];
  toggleFavorite: (storeId: string) => void;
  addressId: string;
  setAddressId: (id: string) => void;
  order: ActiveOrder | null;
  placeOrder: (storeId: string, total: number) => void;
  addOnToOrder: (n: number) => void;
  toast: (msg: string) => void;
};

export const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppContext");
  return ctx;
}

export function cartFor(cart: CartLine[], storeId: string) {
  return cart.filter((l) => l.storeId === storeId);
}

export function cartTotals(lines: CartLine[]) {
  return {
    count: lines.reduce((n, l) => n + l.qty, 0),
    subtotal: lines.reduce((n, l) => n + l.qty * l.unitPrice, 0),
  };
}

/** Order lifecycle derived from elapsed seconds since checkout. */
export const ORDER_STEPS = ["Confirming order", "Preparing your order", "Heading to you", "Arriving now"] as const;

export function orderStep(placedAt: number, now: number) {
  const s = (now - placedAt) / 1000;
  return s < 8 ? 0 : s < 20 ? 1 : s < 40 ? 2 : 3;
}
