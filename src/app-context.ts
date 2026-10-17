import { createContext, useContext } from "react";
import type { Business, Lead, LeadStatus, Review } from "./data";

export type Tab = "home" | "ads" | "info" | "inbox" | "more";

export type Route =
  | { kind: "activity"; metric: "views" | "leads" }
  | { kind: "reviews" }
  | { kind: "review"; id: string }
  | { kind: "thread"; id: string }
  | { kind: "notifications" }
  | { kind: "hours" }
  | { kind: "upgrade" }
  | { kind: "guestManager" };

export type Sheet = { kind: "photo"; src: string } | { kind: "editField"; field: "name" | "phone" | "website" | "address" } | { kind: "budget" } | { kind: "cta" };

export type Notification = { id: string; text: string; at: string; read: boolean; go?: Route };

export type AppState = {
  tab: Tab;
  setTab: (t: Tab) => void;
  push: (r: Route) => void;
  pop: () => void;
  openSheet: (s: Sheet) => void;
  closeSheet: () => void;
  toast: (msg: string) => void;
  biz: Business;
  updateBiz: (patch: Partial<Business>) => void;
  reviews: Review[];
  replyReview: (id: string, text: string, isPublic: boolean) => void;
  leads: Lead[];
  sendMessage: (id: string, text: string) => void;
  setLeadStatus: (id: string, status: LeadStatus) => void;
  readLead: (id: string) => void;
  photos: string[];
  addPhoto: () => void;
  removePhoto: (src: string) => void;
  notifications: Notification[];
  readAll: () => void;
  ad: { live: boolean; budget: number; smart: boolean; upgraded: boolean };
  updateAd: (patch: Partial<AppState["ad"]>) => void;
};

export const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppContext");
  return ctx;
}
