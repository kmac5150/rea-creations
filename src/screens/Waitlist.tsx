import { useState } from "react";
import { useApp } from "../app-context";
import { SheetFrame, ShiftHeader } from "../components";
import { TABLES } from "../data";
import { Icon } from "../icons";

export function WaitlistScreen() {
  const { waitlist, notifyWait, seatWait, removeWait, openSheet, shiftResos } = useApp();
  const busy = new Set(shiftResos.filter((r) => r.status === "Seated").map((r) => r.table));
  const covers = waitlist.reduce((s, w) => s + w.size, 0);
  return (
    <div className="screen dark">
      <ShiftHeader />
      <div className="wl-summary">
        <span>
          <b>{waitlist.length}</b> parties waiting
        </span>
        <span>
          <b>{covers}</b> covers
        </span>
        <span>
          Avg quote <b>{waitlist.length ? Math.round(waitlist.reduce((s, w) => s + w.quote, 0) / waitlist.length) : 0}m</b>
        </span>
      </div>
      <div className="scroll">
        {waitlist.length === 0 && <p className="empty">The waitlist is empty</p>}
        {waitlist.map((w, i) => {
          const over = w.addedMin > w.quote;
          const free = TABLES.find((t) => t.seats >= w.size && !busy.has(t.id));
          return (
            <article key={w.id} className="wl-row">
              <span className="wl-pos">{i + 1}</span>
              <span className="wl-main">
                <span className="rr-top">
                  <b className="rr-size">{w.size}</b>
                  <b>{w.name}</b>
                  {w.notified && <span className="notified">Notified</span>}
                </span>
                <span className="wl-bar" aria-label={`Waited ${w.addedMin} of ${w.quote} minutes`}>
                  <i className={over ? "over" : ""} style={{ width: `${Math.min(100, (w.addedMin / w.quote) * 100)}%` }} />
                </span>
                <span className={`small ${over ? "late-text" : "muted"}`}>
                  Waited {w.addedMin}m · quoted {w.quote}m{w.note ? ` · ${w.note}` : ""}
                </span>
              </span>
              <span className="wl-actions">
                <button className="round-btn" aria-label={`Text ${w.name} their table is ready`} onClick={() => notifyWait(w.id)}>
                  <Icon name="sms" size={18} />
                </button>
                <button className="round-btn seat" aria-label={`Seat ${w.name}`} disabled={!free} onClick={() => free && seatWait(w.id, free.id)}>
                  <Icon name="table" size={18} />
                </button>
                <button className="round-btn" aria-label={`Remove ${w.name}`} onClick={() => removeWait(w.id)}>
                  <Icon name="trash" size={18} />
                </button>
              </span>
            </article>
          );
        })}
        <p className="muted small pad top-gap">Guests can join from your OpenTable page and see their place in line in real time. Texts go out when you tap the message button.</p>
      </div>
      <div className="fab-row">
        <button className="fab" onClick={() => openSheet({ kind: "addWait" })}>
          <Icon name="plus" size={20} stroke={2.4} /> Add to waitlist
        </button>
      </div>
    </div>
  );
}

export function AddWaitSheet() {
  const { addWait, closeSheet } = useApp();
  const [size, setSize] = useState(2);
  const [quote, setQuote] = useState(15);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <SheetFrame title="Add to waitlist" dark>
      <span className="field-cap">Party size</span>
      <div className="size-row">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
          <button key={s} className={size === s ? "on" : ""} onClick={() => setSize(s)}>
            {s}
          </button>
        ))}
      </div>
      <span className="field-cap">Quoted wait</span>
      <div className="size-row">
        {[5, 10, 15, 20, 30, 45].map((q) => (
          <button key={q} className={quote === q ? "on" : ""} onClick={() => setQuote(q)}>
            {q}m
          </button>
        ))}
      </div>
      <input className="dark-input" placeholder="Guest name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="dark-input" placeholder="Mobile for SMS" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button
        className="primary-btn"
        disabled={!name.trim()}
        onClick={() => {
          addWait({ name: name.trim(), size, quote, phone });
          closeSheet();
        }}
      >
        Add {size} · {quote}m quote
      </button>
    </SheetFrame>
  );
}
