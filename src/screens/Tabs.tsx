import { useState } from "react";
import { useApp } from "../app-context";
import { MoreButton, Segmented } from "../components";
import { EVENTS, dateParts, daysUntil, eventById, money, performerById, venueById, type Event } from "../data";
import { Icon } from "../icons";

type Status = { kind: "presale" } | { kind: "going"; orderId: string } | { kind: "countdown" };

export function WatchlistScreen() {
  const { watchlist, favorites, orders, push, reminders, setReminder, toggleFavorite } = useApp();
  const [seg, setSeg] = useState<"events" | "favorites">("events");
  const owned = new Map(orders.map((o) => [o.eventId, o.id]));
  const ids = [...new Set([...watchlist, ...orders.map((o) => o.eventId)])];
  const events = ids.map(eventById).sort((a, b) => a.date.localeCompare(b.date));
  const months: { month: string; items: Event[] }[] = [];
  for (const ev of events) {
    const m = dateParts(ev.date).month;
    const last = months[months.length - 1];
    if (last?.month === m) last.items.push(ev);
    else months.push({ month: m, items: [ev] });
  }
  const statusOf = (ev: Event): Status => (owned.has(ev.id) ? { kind: "going", orderId: owned.get(ev.id)! } : ev.presale ? { kind: "presale" } : { kind: "countdown" });

  return (
    <div className="screen">
      <header className="page-head">
        <h1>WATCHLIST</h1>
        <small>Keep track of what's important</small>
      </header>
      <div className="seg-wrap">
        <Segmented
          value={seg}
          onChange={setSeg}
          options={[
            { id: "events", label: "Events", icon: "bookmark", iconOn: "bookmarkFill" },
            { id: "favorites", label: "Favorites", icon: "heart", iconOn: "heartFill" },
          ]}
        />
      </div>
      <div className="scroll">
        {seg === "events" ? (
          events.length === 0 ? (
            <p className="empty-note">Tap ⋮ on any event to add it to your Watchlist.</p>
          ) : (
            months.map((g) => (
              <section key={g.month} className="wl-month">
                <h3>{g.month}</h3>
                {g.items.map((ev) => {
                  const st = statusOf(ev);
                  const p = dateParts(ev.date);
                  const v = venueById(ev.venueId);
                  const color = st.kind === "presale" ? "#c77dff" : st.kind === "going" ? "#4d7cff" : "#ffc233";
                  return (
                    <div key={ev.id} className="wl-item">
                      <span className="wl-date" style={{ borderColor: color }}>
                        <b>{p.day}</b>
                        <small>{p.dow}</small>
                      </span>
                      <div className="wl-card">
                        <button className="wl-top" onClick={() => push({ kind: "event", id: ev.id })}>
                          <img src={ev.image} alt="" />
                          <span>
                            <b>{performerById(ev.performerId).name}</b>
                            <small>
                              {ev.time} • {v.city}, {v.state}, USA
                            </small>
                          </span>
                          <MoreButton eventId={ev.id} />
                        </button>
                        <div className="wl-foot">
                          {st.kind === "countdown" && (
                            <>
                              <span className="yellow">
                                Event in <b>{daysUntil(ev.date)} Days</b>
                              </span>
                              <button className="pill-cta yellow-bg" onClick={() => push({ kind: "event", id: ev.id })}>
                                Find Tickets <Icon name="arrowRight" size={15} />
                              </button>
                            </>
                          )}
                          {st.kind === "presale" && (
                            <>
                              <span className="purple">Upcoming Presales</span>
                              <button className="pill-cta purple-bg" onClick={() => setReminder(ev.id)}>
                                {reminders.includes(ev.id) ? "Reminder Set" : "Set Reminder"} <Icon name={reminders.includes(ev.id) ? "check" : "arrowRight"} size={15} />
                              </button>
                            </>
                          )}
                          {st.kind === "going" && (
                            <>
                              <span className="blue-text">You're Going</span>
                              <button className="pill-cta outline-blue" onClick={() => push({ kind: "order", id: st.orderId })}>
                                View Tickets <Icon name="arrowRight" size={15} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>
            ))
          )
        ) : favorites.length === 0 ? (
          <p className="empty-note">Tap the heart on an artist page to follow them.</p>
        ) : (
          favorites.map((pid) => {
            const p = performerById(pid);
            const n = EVENTS.filter((e) => e.performerId === pid).length;
            return (
              <div key={pid} className="fav-row">
                <button className="fav-main" onClick={() => push({ kind: "artist", id: pid })}>
                  <img src={p.image} alt="" />
                  <span>
                    <b>{p.name}</b>
                    <small>
                      {p.genre} • {n} upcoming {n === 1 ? "event" : "events"}
                    </small>
                  </span>
                </button>
                <button className="fav-heart" aria-label={`Unfollow ${p.name}`} onClick={() => toggleFavorite(pid)}>
                  <Icon name="heartFill" size={22} />
                </button>
              </div>
            );
          })
        )}
        <div className="bottom-pad" />
      </div>
    </div>
  );
}

export function SellScreen() {
  const { orders, openSheet, push } = useApp();
  const listed = orders.filter((o) => o.listedAt);
  return (
    <div className="screen">
      <header className="page-head">
        <h1>SELL</h1>
        <small>Can't go? Resell your tickets to fans</small>
      </header>
      <div className="scroll">
        <div className="sell-stats">
          <span>
            <b>{listed.length}</b>
            <small>Active listings</small>
          </span>
          <span>
            <b>{money(listed.reduce((n, o) => n + (o.listedAt ?? 0) * 0.9 * (o.seats.length - o.transferred.length), 0))}</b>
            <small>Potential payout</small>
          </span>
        </div>
        <h3 className="tab-sub">Tickets you can sell</h3>
        {orders.map((o) => {
          const ev = eventById(o.eventId);
          const p = dateParts(ev.date);
          const n = o.seats.length - o.transferred.length;
          return (
            <div key={o.id} className="sell-row">
              <img src={ev.image} alt="" onClick={() => push({ kind: "order", id: o.id })} />
              <span>
                <b>{ev.title}</b>
                <small>
                  {p.mon} {Number(p.day)} · Sec {o.section} · Row {o.row} · x{n}
                </small>
                {o.listedAt && <em>Listed at {money(o.listedAt)} each</em>}
              </span>
              <button className={`sell-btn ${o.listedAt ? "edit" : ""}`} disabled={n === 0} onClick={() => openSheet({ kind: "sell", orderId: o.id })}>
                {o.listedAt ? "Edit" : "Sell"}
              </button>
            </div>
          );
        })}
        <div className="sell-help">
          <Icon name="info" size={18} />
          <span>Sold tickets are reissued with new barcodes, so buyers and sellers are protected.</span>
        </div>
        <div className="bottom-pad" />
      </div>
    </div>
  );
}

export function AccountScreen() {
  const { toast, location } = useApp();
  const rows: { icon: Parameters<typeof Icon>[0]["name"]; label: string; sub?: string }[] = [
    { icon: "user", label: "Profile", sub: "Kellen L. · kellen@example.com" },
    { icon: "card", label: "Saved Payment Methods", sub: "Visa •••• 4242 · Apple Pay" },
    { icon: "bell", label: "Notifications", sub: "Presales, price drops, reminders" },
    { icon: "pin", label: "Location", sub: location },
    { icon: "wallet", label: "Ticketmaster Gift Cards", sub: "$0.00 balance" },
    { icon: "help", label: "Help & Support" },
    { icon: "settings", label: "Settings" },
  ];
  return (
    <div className="screen">
      <header className="page-head">
        <h1>MY ACCOUNT</h1>
        <small>Kellen L.</small>
      </header>
      <div className="scroll">
        <div className="verified-card">
          <span className="vf-badge">
            <Icon name="check" size={16} />
          </span>
          <span>
            <b>Verified Fan</b>
            <small>You're registered for 2 upcoming presales.</small>
          </span>
        </div>
        {rows.map((r) => (
          <button key={r.label} className="acct-row" onClick={() => toast(r.label)}>
            <Icon name={r.icon} size={22} />
            <span>
              <b>{r.label}</b>
              {r.sub && <small>{r.sub}</small>}
            </span>
            <Icon name="chevronRight" size={18} />
          </button>
        ))}
        <button className="sign-out" onClick={() => toast("Signed out (demo)")}>
          Sign Out
        </button>
        <p className="version">Version 303.0 · Recreation with fictional data</p>
        <div className="bottom-pad" />
      </div>
    </div>
  );
}
