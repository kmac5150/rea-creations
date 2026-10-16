import { useCallback, useEffect, useMemo, useState } from "react";
import { AppContext, type AppState, type Route, type Sheet, type Tab } from "./app-context";
import { StatusBar, TabBar } from "./components";
import { INITIAL_ORDERS, LOCATIONS, type Order } from "./data";
import { ArtistScreen, CategoryScreen, DiscoverScreen, LocationSheet, SearchScreen } from "./screens/Discover";
import { CheckoutScreen, EventScreen, NoticeSheet, QuantitySheet, SeatSheet } from "./screens/Event";
import { AccountScreen, SellScreen, WatchlistScreen } from "./screens/Tabs";
import { MyEventsScreen, OrderScreen, SellSheet, TicketsScreen, TransferSheet } from "./screens/Tickets";

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
  const [tab, setTabState] = useState<Tab>("discover");
  const [stack, setStack] = useState<Route[]>([]);
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [qty, setQty] = useState(2);
  const [watchlist, setWatchlist] = useState<string[]>(["ev4", "ev6", "ev11", "ev2"]);
  const [favorites, setFavorites] = useState<string[]>(["nova", "juno"]);
  const [reminders, setReminders] = useState<string[]>([]);
  const [acceptedNotice, setAcceptedNotice] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
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
      location,
      setLocation,
      qty,
      setQty,
      watchlist,
      toggleWatch: (id) => {
        if (!id) return;
        const on = watchlist.includes(id);
        toast(on ? "Removed from Watchlist" : "Added to Watchlist");
        setWatchlist(on ? watchlist.filter((x) => x !== id) : [...watchlist, id]);
      },
      favorites,
      toggleFavorite: (id) => {
        const on = favorites.includes(id);
        toast(on ? "Removed from Favorites" : "Added to Favorites");
        setFavorites(on ? favorites.filter((x) => x !== id) : [...favorites, id]);
      },
      reminders,
      setReminder: (id) => {
        if (reminders.includes(id)) return;
        setReminders([...reminders, id]);
        toast("We'll remind you before the presale starts");
      },
      acceptedNotice,
      acceptNotice: (id) => setAcceptedNotice((a) => [...a, id]),
      orders,
      addOrder: (o) => setOrders((list) => [o, ...list]),
      updateOrder: (id, patch) => setOrders((list) => list.map((o) => (o.id === id ? { ...o, ...patch } : o))),
      toast,
    }),
    [tab, location, qty, watchlist, favorites, reminders, acceptedNotice, orders, toast],
  );

  const top = stack[stack.length - 1];
  const showTabs = !top || top.kind === "artist" || top.kind === "category" || top.kind === "search";

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
        <p className="stage-caption">Ticketmaster iOS 303.0 · interactive recreation with fictional events</p>
      </div>
    </AppContext.Provider>
  );
}

function renderTab(tab: Tab) {
  switch (tab) {
    case "discover":
      return <DiscoverScreen />;
    case "watchlist":
      return <WatchlistScreen />;
    case "events":
      return <MyEventsScreen />;
    case "sell":
      return <SellScreen />;
    case "account":
      return <AccountScreen />;
    default: {
      const never: never = tab;
      return never;
    }
  }
}

function renderRoute(r: Route) {
  switch (r.kind) {
    case "search":
      return <SearchScreen />;
    case "artist":
      return <ArtistScreen id={r.id} />;
    case "event":
      return <EventScreen id={r.id} />;
    case "checkout":
      return <CheckoutScreen eventId={r.eventId} listingId={r.listingId} qty={r.qty} />;
    case "order":
      return <OrderScreen id={r.id} />;
    case "tickets":
      return <TicketsScreen id={r.id} />;
    case "category":
      return <CategoryScreen label={r.label} />;
    default: {
      const never: never = r;
      return never;
    }
  }
}

function renderSheet(s: Sheet) {
  switch (s.kind) {
    case "location":
      return <LocationSheet />;
    case "quantity":
      return <QuantitySheet />;
    case "notice":
      return <NoticeSheet eventId={s.eventId} />;
    case "seat":
      return <SeatSheet eventId={s.eventId} listingId={s.listingId} />;
    case "transfer":
      return <TransferSheet orderId={s.orderId} />;
    case "sell":
      return <SellSheet orderId={s.orderId} />;
    default: {
      const never: never = s;
      return never;
    }
  }
}
