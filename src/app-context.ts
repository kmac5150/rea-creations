import { createContext, useContext } from "react";
import type { CheckIn, EventItem, Menu, MenuItem } from "./data";

export type Tab = "menus" | "checkins" | "events" | "insights" | "more";

export type Route =
  | { kind: "menu"; menuId: string }
  | { kind: "section"; menuId: string; sectionId: string }
  | { kind: "item"; menuId: string; sectionId: string; itemId: string }
  | { kind: "event"; eventId: string | null }
  | { kind: "digital" }
  | { kind: "digitalEdit"; boardId: string }
  | { kind: "history" }
  | { kind: "announcements" }
  | { kind: "nearby" };

export type Sheet =
  | { kind: "venues" }
  | { kind: "rocket" }
  | { kind: "qr" }
  | { kind: "itemActions"; menuId: string; sectionId: string; itemId: string }
  | { kind: "addItem"; menuId: string; sectionId: string }
  | { kind: "comment"; checkInId: string }
  | { kind: "range" };

export type Range = "Last 24 Hours" | "Last 7 Days" | "Last 30 Days" | "Last 90 Days" | "Last 365 Days";

export type HistoryEntry = { id: string; at: number; text: string };

export type AppState = {
  tab: Tab;
  setTab: (t: Tab) => void;
  push: (r: Route) => void;
  pop: () => void;
  openSheet: (s: Sheet) => void;
  closeSheet: () => void;
  toast: (msg: string) => void;
  venueId: string;
  setVenueId: (id: string) => void;
  menus: Menu[];
  updateMenus: (fn: (menus: Menu[]) => Menu[]) => void;
  checkIns: CheckIn[];
  toastCheckIn: (id: string) => void;
  commentCheckIn: (id: string, text: string) => void;
  events: EventItem[];
  saveEvent: (e: EventItem) => void;
  deleteEvent: (id: string) => void;
  range: Range;
  setRange: (r: Range) => void;
  history: HistoryEntry[];
  log: (text: string) => void;
};

export const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppContext");
  return ctx;
}

export function findItem(menus: Menu[], menuId: string, sectionId: string, itemId: string): MenuItem | undefined {
  return menus.find((m) => m.id === menuId)?.sections.find((s) => s.id === sectionId)?.items.find((i) => i.id === itemId);
}

export function itemCount(menu: Menu) {
  return menu.sections.reduce((n, s) => n + s.items.length, 0);
}
