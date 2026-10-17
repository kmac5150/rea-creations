import { createContext, useContext } from "react";
import type { Guest, Reservation, ResoStatus, Shift, WaitParty } from "./data";

export type Tab = "book" | "waitlist" | "floor" | "guests" | "stats";

export type Route = { kind: "reservation"; id: string } | { kind: "guest"; id: string } | { kind: "notifications" } | { kind: "shiftNotes" };

export type Sheet =
  | { kind: "newReso"; walkIn?: boolean }
  | { kind: "addWait" }
  | { kind: "status"; id: string }
  | { kind: "table"; tableId: string }
  | { kind: "assignTable"; resoId: string }
  | { kind: "message"; resoId: string }
  | { kind: "drawer" }
  | { kind: "shift" };

export type NewReso = { size: number; time: string; first: string; last: string; phone: string; note: string; walkIn: boolean };

export type AppState = {
  tab: Tab;
  setTab: (t: Tab) => void;
  push: (r: Route) => void;
  pop: () => void;
  openSheet: (s: Sheet) => void;
  closeSheet: () => void;
  toast: (msg: string) => void;
  day: number;
  setDay: (d: number) => void;
  shift: Shift;
  setShift: (s: Shift) => void;
  resos: Reservation[];
  shiftResos: Reservation[];
  setStatus: (id: string, status: ResoStatus) => void;
  assignTable: (id: string, table: string) => void;
  addReso: (r: NewReso) => void;
  updateNote: (id: string, note: string) => void;
  guests: Guest[];
  updateGuest: (id: string, patch: Partial<Guest>) => void;
  waitlist: WaitParty[];
  addWait: (w: Omit<WaitParty, "id" | "addedMin" | "notified">) => void;
  notifyWait: (id: string) => void;
  seatWait: (id: string, table: string) => void;
  removeWait: (id: string) => void;
  shiftNote: string;
  setShiftNote: (s: string) => void;
};

export const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppContext");
  return ctx;
}
