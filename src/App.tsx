import { useCallback, useEffect, useMemo, useState } from "react";
import { AppContext, DEFAULT_FILTERS, type AppState, type Filters, type Route, type Sheet, type Tab } from "./app-context";
import { StatusBar, TabBar } from "./components";
import { CONVERSATIONS, LISTINGS, NOTIFICATIONS } from "./data";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { ContactSheet, Gallery, HomeDetail, TourSheet } from "./screens/HomeDetail";
import { ChatScreen, InboxScreen } from "./screens/InboxScreen";
import { BuyAbilitySheet, PlanScreen, PlanStepScreen } from "./screens/PlanScreen";
import { FiltersSheet, SearchInputSheet, SearchScreen, SortSheet } from "./screens/SearchScreen";
import { UpdatesScreen } from "./screens/UpdatesScreen";

type Goal = "buying" | "browsing" | "selling" | "both";

function usePhoneScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerHeight - 32) / 876, (window.innerWidth - 24) / 417));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return scale;
}

export default function App() {
  const scale = usePhoneScale();
  const [tab, setTabState] = useState<Tab>("search");
  const [stack, setStack] = useState<Route[]>([]);
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [saved, setSaved] = useState<string[]>([LISTINGS[0].id, LISTINGS[4].id, LISTINGS[10].id]);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [location, setLocation] = useState("Nashville TN");
  const [goal, setGoal] = useState<Goal | null>(null);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg((m) => (m === msg ? null : m)), 2200);
  }, []);

  const state: AppState = useMemo(
    () => ({
      tab,
      setTab: (t) => {
        setStack([]);
        setSheet(null);
        setTabState(t);
      },
      push: (r) => {
        setSheet(null);
        setStack((s) => [...s, r]);
      },
      pop: () => setStack((s) => s.slice(0, -1)),
      openSheet: setSheet,
      closeSheet: () => setSheet(null),
      saved,
      toggleSave: (id) => {
        const on = saved.includes(id);
        toast(on ? "Removed from Favorites" : "Saved to Favorites");
        setSaved(on ? saved.filter((x) => x !== id) : [id, ...saved]);
      },
      filters,
      setFilters,
      location,
      setLocation,
      toast,
    }),
    [tab, saved, filters, location, toast],
  );

  const unreadInbox =
    CONVERSATIONS.filter((c) => c.unread && !readIds.includes(c.id)).length + NOTIFICATIONS.filter((n) => n.unread && !readIds.includes(n.id)).length;
  const top = stack[stack.length - 1];

  return (
    <AppContext.Provider value={state}>
      <div className="stage">
        <div className="phone" style={{ transform: `scale(${scale})` }}>
          <div className="screen-area">
            <StatusBar dark={top?.kind === "gallery"} />
            <div className="dynamic-island" />

            <div className={`tab-layer ${top ? "covered" : ""}`}>{renderTab(tab, goal, setGoal, readIds, (id) => setReadIds((r) => [...r, id]))}</div>
            {stack.map((r, i) => (
              <div key={`${r.kind}-${i}`} className="route-layer">
                {renderRoute(r)}
              </div>
            ))}

            {(!top || top.kind === "planStep") && <TabBar badges={{ inbox: unreadInbox, updates: 12 }} />}

            {sheet && renderSheet(sheet)}
            {toastMsg && <div className="toast">{toastMsg}</div>}
            <div className="home-indicator" />
          </div>
        </div>
        <p className="stage-caption">
          Zillow Real Estate &amp; Rentals · iOS 2026.77.0 · interactive recreation with dummy data
        </p>
      </div>
    </AppContext.Provider>
  );
}

function renderTab(tab: Tab, goal: Goal | null, setGoal: (g: Goal) => void, readIds: string[], markRead: (id: string) => void) {
  switch (tab) {
    case "search":
      return <SearchScreen />;
    case "updates":
      return <UpdatesScreen />;
    case "favorites":
      return <FavoritesScreen />;
    case "plan":
      return <PlanScreen goal={goal} setGoal={setGoal} />;
    case "inbox":
      return <InboxScreen readIds={readIds} markRead={markRead} />;
    default: {
      const never: never = tab;
      return never;
    }
  }
}

function renderRoute(r: Route) {
  switch (r.kind) {
    case "home":
      return <HomeDetail id={r.id} />;
    case "gallery":
      return <Gallery id={r.id} />;
    case "chat":
      return <ChatScreen id={r.id} />;
    case "planStep":
      return <PlanStepScreen id={r.id} />;
    default: {
      const never: never = r;
      return never;
    }
  }
}

function renderSheet(s: Sheet) {
  switch (s.kind) {
    case "filters":
      return <FiltersSheet />;
    case "searchInput":
      return <SearchInputSheet />;
    case "tour":
      return <TourSheet id={s.id} />;
    case "contact":
      return <ContactSheet id={s.id} />;
    case "buyability":
      return <BuyAbilitySheet />;
    case "sort":
      return <SortSheet />;
    default: {
      const never: never = s;
      return never;
    }
  }
}
