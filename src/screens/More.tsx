import { useState } from "react";
import { useApp } from "../app-context";
import { NavHeader, SheetFrame } from "../components";
import { NOTIFICATIONS, RESTAURANT, type Shift } from "../data";
import { Icon, type IconName } from "../icons";

export function DrawerSheet() {
  const { closeSheet, push, toast, setTab } = useApp();
  const go = (fn: () => void) => () => {
    closeSheet();
    fn();
  };
  const items: { icon: IconName; label: string; onClick: () => void; badge?: number }[] = [
    { icon: "bell", label: "Notifications", onClick: go(() => push({ kind: "notifications" })), badge: NOTIFICATIONS.length },
    { icon: "note", label: "Shift notes", onClick: go(() => push({ kind: "shiftNotes" })) },
    { icon: "guests", label: "Guestbook", onClick: go(() => setTab("guests")) },
    { icon: "stats", label: "Reports", onClick: go(() => setTab("stats")) },
    { icon: "calendar", label: "Availability & blocks", onClick: go(() => toast("Availability opens in GuestCenter on web (demo)")) },
    { icon: "settings", label: "Settings", onClick: go(() => toast("Settings (demo)")) },
    { icon: "swap", label: "Switch restaurant", onClick: go(() => toast("You manage 1 restaurant")) },
    { icon: "logout", label: "Sign out", onClick: go(() => toast("Signed out (demo)")) },
  ];
  return (
    <div className="drawer-wrap" onClick={closeSheet}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()} aria-label="Menu">
        <div className="drawer-head" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.2), rgba(0,0,0,.75)), url(${RESTAURANT.photo})` }}>
          <span className="ot-mark" aria-hidden>
            <i />
          </span>
          <b>{RESTAURANT.name}</b>
          <small>{RESTAURANT.area}</small>
        </div>
        <div className="drawer-user">
          <span className="avatar initials" style={{ width: 36, height: 36, fontSize: 13 }}>
            JP
          </span>
          <span>
            <b>{RESTAURANT.manager}</b>
            <small className="muted block">{RESTAURANT.role}</small>
          </span>
        </div>
        <nav className="drawer-list">
          {items.map((i) => (
            <button key={i.label} onClick={i.onClick}>
              <Icon name={i.icon} size={20} />
              <span>{i.label}</span>
              {i.badge ? <i className="count-badge">{i.badge}</i> : null}
            </button>
          ))}
        </nav>
        <p className="drawer-foot">OpenTable for Restaurants 11.13.0</p>
      </aside>
    </div>
  );
}

export function ShiftSheet() {
  const { shift, setShift, closeSheet } = useApp();
  const options: { s: Shift; hours: string }[] = [
    { s: "Lunch", hours: "11:30 am – 2:30 pm" },
    { s: "Dinner", hours: "5:00 pm – 10:00 pm" },
  ];
  return (
    <SheetFrame title="Choose shift" dark>
      {options.map((o) => (
        <button
          key={o.s}
          className={`shift-opt ${shift === o.s ? "on" : ""}`}
          onClick={() => {
            setShift(o.s);
            closeSheet();
          }}
        >
          <span>
            <b>{o.s}</b>
            <small className="muted block">{o.hours}</small>
          </span>
          {shift === o.s && <Icon name="check" size={20} stroke={2.4} />}
        </button>
      ))}
    </SheetFrame>
  );
}

export function NotificationsScreen() {
  return (
    <div className="screen dark">
      <NavHeader title="Notifications" />
      <div className="scroll">
        <p className="section-cap">VIP alerts and booking changes, also sent as push notifications</p>
        {NOTIFICATIONS.map((n) => (
          <article key={n.id} className="notif">
            <span className="ot-mark sm" aria-hidden>
              <i />
            </span>
            <span className="lr-main">
              <span className="row-between">
                <b>{n.title}</b>
                <small className="muted">{n.at}</small>
              </span>
              <span className="small">{n.body}</span>
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ShiftNotesScreen() {
  const { shiftNote, setShiftNote, toast, pop } = useApp();
  const [text, setText] = useState(shiftNote);
  return (
    <div className="screen dark">
      <NavHeader
        title="Shift notes"
        right={
          <button
            className="text-btn"
            onClick={() => {
              setShiftNote(text);
              toast("Shift note saved for the team");
              pop();
            }}
          >
            Save
          </button>
        }
      />
      <div className="scroll pad stack">
        <p className="muted small">Everyone on tonight's shift sees this note at the top of the book.</p>
        <textarea className="dark-area" rows={8} value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
}
