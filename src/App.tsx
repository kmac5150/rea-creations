import { useCallback, useEffect, useMemo, useState } from "react";
import { AppContext, type AppState, type Notification, type Route, type Sheet, type Tab } from "./app-context";
import { StatusBar, TabBar } from "./components";
import { EXTRA_PHOTOS, INITIAL_BIZ, INITIAL_LEADS, INITIAL_REVIEWS, PHOTOS, type Business, type Lead, type Review } from "./data";
import { AdsScreen, BudgetSheet, GuestManagerScreen, UpgradeScreen } from "./screens/Ads";
import { ActivityScreen, HomeScreen, NotificationsScreen } from "./screens/Home";
import { InboxScreen, ReviewScreen, ReviewsScreen, ThreadScreen } from "./screens/Inbox";
import { CtaSheet, EditFieldSheet, HoursScreen, InfoScreen, PhotoSheet } from "./screens/Info";
import { MoreScreen } from "./screens/More";

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

const INITIAL_NOTES: Notification[] = [
  { id: "n1", text: "Maria D. sent you a message about a party for 20", at: "4:59 PM", read: false, go: { kind: "thread", id: "l1" } },
  { id: "n2", text: "Samantha C. left a 3-star review", at: "Oct 15", read: false, go: { kind: "review", id: "r1" } },
  { id: "n3", text: "Your page got 92 views yesterday, your best day this month", at: "Oct 14", read: true, go: { kind: "activity", metric: "views" } },
];

export default function App() {
  const scale = usePhoneScale();
  const [tab, setTabState] = useState<Tab>("home");
  const [stack, setStack] = useState<Route[]>([]);
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [biz, setBiz] = useState<Business>(INITIAL_BIZ);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [photos, setPhotos] = useState<string[]>(PHOTOS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTES);
  const [ad, setAd] = useState({ live: true, budget: 18, smart: true, upgraded: false });

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
        if (r.kind === "thread") setLeads((ls) => ls.map((l) => (l.id === r.id ? { ...l, unread: false } : l)));
        setStack((s) => [...s, r]);
      },
      pop: () => setStack((s) => s.slice(0, -1)),
      openSheet: setSheet,
      closeSheet: () => setSheet(null),
      toast,
      biz,
      updateBiz: (patch) => setBiz((b) => ({ ...b, ...patch })),
      reviews,
      replyReview: (id, text, isPublic) => setReviews((rs) => rs.map((r) => (r.id === id ? { ...r, reply: { text, isPublic } } : r))),
      leads,
      sendMessage: (id, text) =>
        setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status: l.status === "Active" ? "Scheduled" : l.status, messages: [...l.messages, { from: "me", text, at: "Now" }] } : l))),
      setLeadStatus: (id, status) => setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l))),
      readLead: (id) => setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, unread: false } : l))),
      photos,
      addPhoto: () => {
        const next = EXTRA_PHOTOS.find((p) => !photos.includes(p));
        if (!next) return toast("Choose a photo from your library (demo)");
        setPhotos((ps) => [next, ...ps]);
        toast("Photo uploaded");
      },
      removePhoto: (src) => setPhotos((ps) => ps.filter((p) => p !== src)),
      notifications,
      readAll: () => setNotifications((ns) => ns.map((n) => ({ ...n, read: true }))),
      ad,
      updateAd: (patch) => setAd((a) => ({ ...a, ...patch })),
    }),
    [tab, toast, biz, reviews, leads, photos, notifications, ad],
  );

  const top = stack[stack.length - 1];
  const showTabs = !top || (top.kind !== "thread" && top.kind !== "review" && top.kind !== "upgrade");
  const lightStatus = tab === "home" && !top;

  return (
    <AppContext.Provider value={state}>
      <div className="stage">
        <div className="phone" style={{ transform: `scale(${scale})` }}>
          <div className="screen-area">
            <StatusBar light={lightStatus} />
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
        <p className="stage-caption">Yelp for Business · iOS 26.42.0 · interactive recreation with dummy data</p>
      </div>
    </AppContext.Provider>
  );
}

function renderTab(tab: Tab) {
  switch (tab) {
    case "home":
      return <HomeScreen />;
    case "ads":
      return <AdsScreen />;
    case "info":
      return <InfoScreen />;
    case "inbox":
      return <InboxScreen />;
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
    case "activity":
      return <ActivityScreen metric={r.metric} />;
    case "reviews":
      return <ReviewsScreen />;
    case "review":
      return <ReviewScreen id={r.id} />;
    case "thread":
      return <ThreadScreen id={r.id} />;
    case "notifications":
      return <NotificationsScreen />;
    case "hours":
      return <HoursScreen />;
    case "upgrade":
      return <UpgradeScreen />;
    case "guestManager":
      return <GuestManagerScreen />;
    default: {
      const never: never = r;
      return never;
    }
  }
}

function renderSheet(s: Sheet) {
  switch (s.kind) {
    case "photo":
      return <PhotoSheet src={s.src} />;
    case "editField":
      return <EditFieldSheet field={s.field} />;
    case "budget":
      return <BudgetSheet />;
    case "cta":
      return <CtaSheet />;
    default: {
      const never: never = s;
      return never;
    }
  }
}
