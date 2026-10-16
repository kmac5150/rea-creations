import { useCallback, useEffect, useMemo, useState } from "react";
import { AppContext, type ActiveOrder, type AppState, type CartLine, type Route, type Sheet, type Tab } from "./app-context";
import { StatusBar, TabBar } from "./components";
import { AccountScreen, AddressSheet, NotificationsScreen } from "./screens/Account";
import { BrowseScreen } from "./screens/Browse";
import { CartScreen, CartsSheet, CheckoutScreen, TrackingScreen } from "./screens/Checkout";
import { CategoryScreen, HomeScreen } from "./screens/Home";
import { HubScreen } from "./screens/Hubs";
import { OrdersScreen } from "./screens/Orders";
import { ItemSheet, StoreScreen } from "./screens/Store";

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

const lineKey = (l: Omit<CartLine, "key">) => `${l.storeId}|${l.itemId}|${l.options.join(",")}`;

export default function App() {
  const scale = usePhoneScale();
  const [tab, setTabState] = useState<Tab>("home");
  const [stack, setStack] = useState<Route[]>([]);
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>(["smash-bros"]);
  const [addressId, setAddressId] = useState("a1");
  const [order, setOrder] = useState<ActiveOrder | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg((m) => (m === msg ? null : m)), 2000);
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
      cart,
      addToCart: (line) => {
        const key = lineKey(line);
        setCart((c) => (c.some((l) => l.key === key) ? c.map((l) => (l.key === key ? { ...l, qty: l.qty + line.qty } : l)) : [...c, { ...line, key }]));
      },
      setQty: (key, qty) => setCart((c) => (qty <= 0 ? c.filter((l) => l.key !== key) : c.map((l) => (l.key === key ? { ...l, qty } : l)))),
      favorites,
      toggleFavorite: (id) => {
        const on = favorites.includes(id);
        toast(on ? "Removed from saved stores" : "Saved to your favorites");
        setFavorites(on ? favorites.filter((x) => x !== id) : [...favorites, id]);
      },
      addressId,
      setAddressId,
      order,
      placeOrder: (storeId, total) => {
        setOrder({ storeId, lines: cart.filter((l) => l.storeId === storeId), total, placedAt: Date.now(), addOns: 0 });
        setCart((c) => c.filter((l) => l.storeId !== storeId));
        setSheet(null);
        setStack([{ kind: "tracking" }]);
      },
      addOnToOrder: (n) => setOrder((o) => (o ? { ...o, addOns: o.addOns + n } : o)),
      toast,
    }),
    [tab, cart, favorites, addressId, order, toast],
  );

  const top = stack[stack.length - 1];
  const showTabs = !top || top.kind === "store" || top.kind === "category";

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
        <p className="stage-caption">DoorDash: Food, Grocery, More · iOS 8.40.0 · interactive recreation with dummy data</p>
      </div>
    </AppContext.Provider>
  );
}

function renderTab(tab: Tab) {
  switch (tab) {
    case "home":
      return <HomeScreen />;
    case "grocery":
      return <HubScreen vertical="grocery" />;
    case "retail":
      return <HubScreen vertical="retail" />;
    case "orders":
      return <OrdersScreen />;
    case "browse":
      return <BrowseScreen />;
    default: {
      const never: never = tab;
      return never;
    }
  }
}

function renderRoute(r: Route) {
  switch (r.kind) {
    case "store":
      return <StoreScreen id={r.id} />;
    case "cart":
      return <CartScreen storeId={r.storeId} />;
    case "checkout":
      return <CheckoutScreen storeId={r.storeId} />;
    case "tracking":
      return <TrackingScreen />;
    case "account":
      return <AccountScreen />;
    case "notifications":
      return <NotificationsScreen />;
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
    case "item":
      return <ItemSheet storeId={s.storeId} itemId={s.itemId} />;
    case "address":
      return <AddressSheet />;
    case "carts":
      return <CartsSheet />;
    default: {
      const never: never = s;
      return never;
    }
  }
}
