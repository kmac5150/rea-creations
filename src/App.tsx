import { useCallback, useEffect, useMemo, useState } from "react";
import { AppContext, type AppState, type HistoryEntry, type Range, type Route, type Sheet, type Tab } from "./app-context";
import { StatusBar, TabBar } from "./components";
import { INITIAL_CHECKINS, INITIAL_EVENTS, INITIAL_MENUS, VENUES, type CheckIn, type EventItem, type Menu } from "./data";
import { CheckInsScreen, CommentSheet } from "./screens/CheckIns";
import { EventDetail, EventsScreen } from "./screens/Events";
import { InsightsScreen, RangeSheet } from "./screens/Insights";
import { AddItemSheet, ItemActionsSheet, ItemScreen, MenuDetail, MenusScreen, QrSheet, RocketSheet, SectionScreen, VenuesSheet } from "./screens/Menus";
import { AnnouncementsScreen, DigitalEdit, DigitalMenus, HistoryScreen, MoreScreen, NearbyScreen } from "./screens/More";

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
  const [tab, setTabState] = useState<Tab>("menus");
  const [stack, setStack] = useState<Route[]>([]);
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [venueId, setVenueId] = useState(VENUES[0].id);
  const [menus, setMenus] = useState<Menu[]>(INITIAL_MENUS);
  const [checkIns, setCheckIns] = useState<CheckIn[]>(INITIAL_CHECKINS);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [range, setRange] = useState<Range>("Last 30 Days");
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg((m) => (m === msg ? null : m)), 2000);
  }, []);

  const venueName = (VENUES.find((v) => v.id === venueId) ?? VENUES[0]).name;

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
      toast,
      venueId,
      setVenueId,
      menus,
      updateMenus: (fn) => setMenus(fn),
      checkIns,
      toastCheckIn: (id) =>
        setCheckIns((cs) => cs.map((c) => (c.id !== id ? c : { ...c, toasts: c.toasts.includes(venueName) ? c.toasts.filter((t) => t !== venueName) : [...c.toasts, venueName] }))),
      commentCheckIn: (id, text) => setCheckIns((cs) => cs.map((c) => (c.id !== id ? c : { ...c, comments: [...c.comments, { by: venueName, text }] }))),
      events,
      saveEvent: (e) => setEvents((es) => (es.some((x) => x.id === e.id) ? es.map((x) => (x.id === e.id ? e : x)) : [...es, e])),
      deleteEvent: (id) => setEvents((es) => es.filter((e) => e.id !== id)),
      range,
      setRange,
      history,
      log: (text) => setHistory((h) => [{ id: `${Date.now()}-${h.length}`, at: Date.now(), text }, ...h]),
    }),
    [tab, toast, venueId, venueName, menus, checkIns, events, range, history],
  );

  const top = stack[stack.length - 1];
  const showTabs = !top || (top.kind !== "item" && top.kind !== "event" && top.kind !== "digitalEdit");

  return (
    <AppContext.Provider value={state}>
      <div className="stage">
        <div className="phone" style={{ transform: `scale(${scale})` }}>
          <div className="screen-area">
            <StatusBar />
            <div className="dynamic-island" />
            <div className="tab-layer">{renderTab(tab)}</div>
            {stack.map((r, i) => (
              <div key={`${r.kind}-${i}`} className="route-layer">
                {renderRoute(r)}
              </div>
            ))}
            {showTabs && <TabBar />}
            {sheet && renderSheet(sheet)}
            {toastMsg && <div className="toast">{toastMsg}</div>}
            <div className="home-indicator" />
          </div>
        </div>
        <p className="stage-caption">Untappd for Business · iOS 6.1.15 · interactive recreation with dummy data</p>
      </div>
    </AppContext.Provider>
  );
}

function renderTab(tab: Tab) {
  switch (tab) {
    case "menus":
      return <MenusScreen />;
    case "checkins":
      return <CheckInsScreen />;
    case "events":
      return <EventsScreen />;
    case "insights":
      return <InsightsScreen />;
    case "more":
      return <MoreScreen />;
    default: {
      const never: never = tab;
      return never;
    }
  }
}

function renderRoute(r: Route) {
  switch (r.kind) {
    case "menu":
      return <MenuDetail menuId={r.menuId} />;
    case "section":
      return <SectionScreen menuId={r.menuId} sectionId={r.sectionId} />;
    case "item":
      return <ItemScreen menuId={r.menuId} sectionId={r.sectionId} itemId={r.itemId} />;
    case "event":
      return <EventDetail eventId={r.eventId} />;
    case "digital":
      return <DigitalMenus />;
    case "digitalEdit":
      return <DigitalEdit boardId={r.boardId} />;
    case "history":
      return <HistoryScreen />;
    case "announcements":
      return <AnnouncementsScreen />;
    case "nearby":
      return <NearbyScreen />;
    default: {
      const never: never = r;
      return never;
    }
  }
}

function renderSheet(s: Sheet) {
  switch (s.kind) {
    case "venues":
      return <VenuesSheet />;
    case "rocket":
      return <RocketSheet />;
    case "qr":
      return <QrSheet />;
    case "itemActions":
      return <ItemActionsSheet menuId={s.menuId} sectionId={s.sectionId} itemId={s.itemId} />;
    case "addItem":
      return <AddItemSheet menuId={s.menuId} sectionId={s.sectionId} />;
    case "comment":
      return <CommentSheet checkInId={s.checkInId} />;
    case "range":
      return <RangeSheet />;
    default: {
      const never: never = s;
      return never;
    }
  }
}
