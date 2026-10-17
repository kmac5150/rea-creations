import { useCallback, useEffect, useMemo, useState } from "react";
import { AppContext, type AppState, type Route, type Sheet, type Tab } from "./app-context";
import { StatusBar, TabBar } from "./components";
import { GUESTS, INITIAL_RESOS, INITIAL_WAITLIST, TABLES, TODAY_INDEX, type Guest, type Reservation, type Shift, type WaitParty } from "./data";
import { AssignTableSheet, MessageSheet, NewResoSheet, ReservationScreen, ReservationsScreen, StatusSheet } from "./screens/Book";
import { FloorScreen, TableSheet } from "./screens/Floor";
import { GuestScreen, GuestsScreen } from "./screens/Guests";
import { DrawerSheet, NotificationsScreen, ShiftNotesScreen, ShiftSheet } from "./screens/More";
import { StatsScreen } from "./screens/Stats";
import { AddWaitSheet, WaitlistScreen } from "./screens/Waitlist";

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
  const [tab, setTabState] = useState<Tab>("book");
  const [stack, setStack] = useState<Route[]>([]);
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [day, setDay] = useState(TODAY_INDEX);
  const [shift, setShift] = useState<Shift>("Dinner");
  const [resos, setResos] = useState<Reservation[]>(INITIAL_RESOS);
  const [guests, setGuests] = useState<Guest[]>(GUESTS);
  const [waitlist, setWaitlist] = useState<WaitParty[]>(INITIAL_WAITLIST);
  const [shiftNote, setShiftNote] = useState("86 the halibut after 8pm. Patio heaters on at 6:30. Large party (8) Friday needs table 237.");

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg((m) => (m === msg ? null : m)), 2200);
  }, []);

  const state: AppState = useMemo(() => {
    const shiftResos = resos.filter((r) => r.day === day && r.shift === shift);
    const freeTable = (size: number) => {
      const busy = new Set(shiftResos.filter((r) => r.status === "Seated").map((r) => r.table));
      return TABLES.find((t) => t.seats >= size && !busy.has(t.id))?.id;
    };
    return {
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
      day,
      setDay,
      shift,
      setShift,
      resos,
      shiftResos,
      setStatus: (id, status) => {
        const r = resos.find((x) => x.id === id);
        const g = guests.find((x) => x.id === r?.guestId);
        setResos((rs) => rs.map((x) => (x.id === id ? { ...x, status, seatedAt: status === "Seated" ? "6:42 pm" : x.seatedAt, table: status === "Seated" && !x.table ? freeTable(x.size) : x.table } : x)));
        if (g?.vip && (status === "Arrived" || status === "Seated")) toast(`VIP ${status}: ${g.first} ${g.last} for ${r!.size}`);
        else toast(`${g?.first ?? "Party"} marked ${status.toLowerCase()}`);
      },
      assignTable: (id, table) => setResos((rs) => rs.map((x) => (x.id === id ? { ...x, table: table || undefined } : x))),
      addReso: (n) => {
        const gid = `g${Date.now()}`;
        setGuests((gs) => [...gs, { id: gid, first: n.first, last: n.last || "", phone: n.phone || "No phone", email: "", area: "New guest", vip: false, tags: [], visits: 0, cancels: 0, noShows: 0, spend: 0 }]);
        setResos((rs) => [
          ...rs,
          {
            id: `r${Date.now()}`,
            day,
            shift,
            time: n.time,
            size: n.size,
            guestId: gid,
            status: n.walkIn ? "Seated" : "Booked",
            seatedAt: n.walkIn ? "6:42 pm" : undefined,
            table: n.walkIn ? freeTable(n.size) : undefined,
            source: n.walkIn ? "Walk-in" : "Phone",
            tags: [],
            note: n.note || undefined,
          },
        ]);
        toast(n.walkIn ? `Walk-in for ${n.size} seated` : `Booked ${n.first} · ${n.size} at ${n.time}`);
      },
      updateNote: (id, note) => {
        setResos((rs) => rs.map((x) => (x.id === id ? { ...x, note: note || undefined } : x)));
        toast("Visit note saved");
      },
      guests,
      updateGuest: (id, patch) => setGuests((gs) => gs.map((g) => (g.id === id ? { ...g, ...patch } : g))),
      waitlist,
      addWait: (w) => {
        setWaitlist((ws) => [...ws, { ...w, id: `w${Date.now()}`, addedMin: 0, notified: false }]);
        toast(`${w.name} added · ${w.quote}m quote`);
      },
      notifyWait: (id) => {
        const w = waitlist.find((x) => x.id === id);
        setWaitlist((ws) => ws.map((x) => (x.id === id ? { ...x, notified: true } : x)));
        toast(`Texted ${w?.name}: your table is ready`);
      },
      seatWait: (id, table) => {
        const w = waitlist.find((x) => x.id === id)!;
        const gid = `g${Date.now()}`;
        setGuests((gs) => [...gs, { id: gid, first: w.name, last: "", phone: w.phone, email: "", area: "Waitlist guest", vip: false, tags: [], visits: 0, cancels: 0, noShows: 0, spend: 0 }]);
        setResos((rs) => [...rs, { id: `r${Date.now()}`, day, shift, time: "6:42 pm", size: w.size, guestId: gid, status: "Seated", seatedAt: "6:42 pm", table, source: "Walk-in", tags: [] }]);
        setWaitlist((ws) => ws.filter((x) => x.id !== id));
        toast(`${w.name} seated at table ${table}`);
      },
      removeWait: (id) => setWaitlist((ws) => ws.filter((x) => x.id !== id)),
      shiftNote,
      setShiftNote,
    };
  }, [tab, toast, day, shift, resos, guests, waitlist, shiftNote]);

  const top = stack[stack.length - 1];
  const showTabs = !top;

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
        <p className="stage-caption">OpenTable for Restaurants · iOS 11.13.0 · interactive recreation with dummy data</p>
      </div>
    </AppContext.Provider>
  );
}

function renderTab(tab: Tab) {
  switch (tab) {
    case "book":
      return <ReservationsScreen />;
    case "waitlist":
      return <WaitlistScreen />;
    case "floor":
      return <FloorScreen />;
    case "guests":
      return <GuestsScreen />;
    case "stats":
      return <StatsScreen />;
    default: {
      const never: never = tab;
      return never;
    }
  }
}

function renderRoute(r: Route) {
  switch (r.kind) {
    case "reservation":
      return <ReservationScreen id={r.id} />;
    case "guest":
      return <GuestScreen id={r.id} />;
    case "notifications":
      return <NotificationsScreen />;
    case "shiftNotes":
      return <ShiftNotesScreen />;
    default: {
      const never: never = r;
      return never;
    }
  }
}

function renderSheet(s: Sheet) {
  switch (s.kind) {
    case "newReso":
      return <NewResoSheet walkIn={s.walkIn} />;
    case "addWait":
      return <AddWaitSheet />;
    case "status":
      return <StatusSheet id={s.id} />;
    case "table":
      return <TableSheet tableId={s.tableId} />;
    case "assignTable":
      return <AssignTableSheet resoId={s.resoId} />;
    case "message":
      return <MessageSheet resoId={s.resoId} />;
    case "drawer":
      return <DrawerSheet />;
    case "shift":
      return <ShiftSheet />;
    default: {
      const never: never = s;
      return never;
    }
  }
}
