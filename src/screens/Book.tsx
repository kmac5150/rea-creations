import { useState } from "react";
import { useApp } from "../app-context";
import { Avatar, isActive, NavHeader, SheetFrame, ShiftHeader, StatusIcon, StatusPill, TableBox, TagChip, TagIcons } from "../components";
import { guestName, PACING_LIMIT, SLOTS, TABLES, TODAY_INDEX, type Reservation, type ResoStatus } from "../data";
import { Icon } from "../icons";

export function toMin(t: string) {
  const [hm, ap] = t.split(" ");
  const [h, m] = hm.split(":").map(Number);
  return ((h % 12) + (ap === "pm" ? 12 : 0)) * 60 + m;
}

function Section({ title, sub, parties, covers, children, open, onToggle }: { title: string; sub: string; parties: number; covers: number; children: React.ReactNode; open: boolean; onToggle: () => void }) {
  return (
    <section className="book-section">
      <button className="bs-head" onClick={onToggle} aria-expanded={open}>
        <span>
          <b>{title}</b>
          <span className="bs-sub">{sub}</span>
        </span>
        <span className="bs-counts">
          <span>
            <Icon name="parties" size={17} /> {parties}
          </span>
          <span>
            <Icon name="cover" size={17} /> {covers}
          </span>
          <span className="bs-chev">
            <Icon name={open ? "chevU" : "chevD"} size={18} stroke={2.2} />
          </span>
        </span>
      </button>
      {open && children}
    </section>
  );
}

export function ResoRow({ r }: { r: Reservation }) {
  const { guests, push } = useApp();
  const g = guests.find((x) => x.id === r.guestId)!;
  const seated = r.status === "Seated";
  return (
    <button className={`reso-row ${r.status === "Cancelled" || r.status === "No-show" ? "dim" : ""}`} onClick={() => push({ kind: "reservation", id: r.id })}>
      <StatusIcon status={r.status} />
      <span className="rr-main">
        <span className="rr-top">
          <b className="rr-size">{r.size}</b>
          <span>{seated && r.seatedAt ? `${r.seatedAt} · ${seatedFor(r.seatedAt)}` : r.time}</span>
          <TagIcons tags={r.tags} />
        </span>
        <span className="rr-name">
          {g.vip && <Icon name="star" size={16} className="vip-star" />}
          {guestName(g)}
        </span>
      </span>
      <span className="rr-side">
        {r.note && <Icon name="message" size={16} />}
        {r.deposit && <Icon name="card" size={16} />}
      </span>
      <TableBox table={r.table} status={r.status} />
    </button>
  );
}

const NOW = toMin("6:42 pm");

function seatedFor(t: string) {
  const m = Math.max(0, NOW - toMin(t));
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`;
}

export function ReservationsScreen() {
  const { shiftResos, waitlist, day, setTab, openSheet, shift, shiftNote, push } = useApp();
  const [open, setOpen] = useState({ wait: true, resos: true, seated: true, done: false });
  const toggle = (k: keyof typeof open) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  const upcoming = shiftResos.filter((r) => isActive(r.status)).sort((a, b) => toMin(a.time) - toMin(b.time));
  const seated = shiftResos.filter((r) => r.status === "Seated").sort((a, b) => toMin(a.seatedAt ?? a.time) - toMin(b.seatedAt ?? b.time));
  const done = shiftResos.filter((r) => ["Finished", "No-show", "Cancelled"].includes(r.status));
  const sum = (rs: { size: number }[]) => rs.reduce((s, r) => s + r.size, 0);
  const showWait = day === TODAY_INDEX && shift === "Dinner";
  return (
    <div className="screen dark">
      <ShiftHeader />
      <div className="scroll">
        {shiftNote && day === TODAY_INDEX && (
          <button className="shift-note" onClick={() => push({ kind: "shiftNotes" })}>
            <Icon name="note" size={18} />
            <span className="clamp2">{shiftNote}</span>
          </button>
        )}
        {showWait && (
          <Section title="Waitlist" sub="by added time" parties={waitlist.length} covers={sum(waitlist)} open={open.wait} onToggle={() => toggle("wait")}>
            <div className="wait-chips">
              {waitlist.map((w) => (
                <button key={w.id} className={`wait-chip ${w.addedMin > w.quote ? "over" : ""}`} onClick={() => setTab("waitlist")} aria-label={`${w.name}, party of ${w.size}`}>
                  <b>{w.quote}m</b>
                  <span>{w.size}</span>
                </button>
              ))}
              <button className="wait-chip add" aria-label="Add to waitlist" onClick={() => openSheet({ kind: "addWait" })}>
                <Icon name="plus" size={22} />
              </button>
            </div>
          </Section>
        )}
        <Section title="Reservations" sub="by scheduled time" parties={upcoming.length} covers={sum(upcoming)} open={open.resos} onToggle={() => toggle("resos")}>
          {upcoming.length ? upcoming.map((r) => <ResoRow key={r.id} r={r} />) : <p className="empty">No upcoming reservations this shift</p>}
        </Section>
        <Section title="Seated" sub="by seated time" parties={seated.length} covers={sum(seated)} open={open.seated} onToggle={() => toggle("seated")}>
          {seated.length ? seated.map((r) => <ResoRow key={r.id} r={r} />) : <p className="empty">Nobody seated yet</p>}
        </Section>
        <Section title="Finished & cancelled" sub="this shift" parties={done.length} covers={sum(done)} open={open.done} onToggle={() => toggle("done")}>
          {done.map((r) => (
            <ResoRow key={r.id} r={r} />
          ))}
        </Section>
      </div>
      <div className="fab-row">
        <button className="fab ghost" onClick={() => openSheet({ kind: "newReso", walkIn: true })}>
          <Icon name="walk" size={20} /> Walk-in
        </button>
        <button className="fab" onClick={() => openSheet({ kind: "newReso" })} aria-label="New reservation">
          <Icon name="plus" size={20} stroke={2.4} /> Reservation
        </button>
      </div>
    </div>
  );
}

export function ReservationScreen({ id }: { id: string }) {
  const { resos, guests, openSheet, push, updateNote, toast } = useApp();
  const r = resos.find((x) => x.id === id)!;
  const g = guests.find((x) => x.id === r.guestId)!;
  const [note, setNote] = useState(r.note ?? "");
  const [exclude, setExclude] = useState(false);
  const suggested = TABLES.find((t) => t.seats >= r.size && t.seats <= r.size + 2)?.id;
  return (
    <div className="screen dark">
      <NavHeader title={guestName(g)} right={<StatusPill status={r.status} />} />
      <div className="scroll">
        <div className="reso-facts">
          <span>
            <Icon name="clock" size={18} /> {r.time}
          </span>
          <span>
            <Icon name="cover" size={18} /> {r.size}
          </span>
          <span>
            <Icon name="swap" size={18} /> {r.size > 4 ? "2h 30m" : "2h 00m"}
          </span>
        </div>

        <button className="primary-status" onClick={() => openSheet({ kind: "status", id: r.id })}>
          <span className="row-gap">
            <StatusIcon status={r.status} />
            {r.status}
          </span>
          <Icon name="chevD" size={20} stroke={2.2} />
        </button>

        <div className="action-list">
          <button className="action" onClick={() => openSheet({ kind: "assignTable", resoId: r.id })}>
            <Icon name="table" size={20} />
            <span>
              <b>{r.table ? `Table ${r.table}` : suggested ? `Table ${suggested}` : "Assign a table"}</b>
              <small>{r.table ? "Assigned" : "Suggested"}</small>
            </span>
            <Icon name="chevR" size={18} />
          </button>
          <button className="action" onClick={() => toast(`Deposit request sent to ${g.first}`)}>
            <Icon name="card" size={20} />
            <span>
              <b>Send</b>
              <small>Deposit request</small>
            </span>
          </button>
          <button className="action" onClick={() => toast("Booking confirmation re-sent")}>
            <Icon name="mail" size={20} />
            <span>
              <b>Re-send</b>
              <small>Booking confirmation</small>
            </span>
          </button>
          <button className="action" onClick={() => openSheet({ kind: "message", resoId: r.id })}>
            <Icon name="sms" size={20} />
            <span>
              <b>Message guest</b>
              <small>{g.phone}</small>
            </span>
          </button>
        </div>

        {r.deposit ? (
          <div className="pay-row">
            <Icon name="card" size={18} />
            <b>Not paid · ${r.deposit.toFixed(2)}</b>
          </div>
        ) : null}

        <button className="toggle-line" role="switch" aria-checked={exclude} onClick={() => setExclude(!exclude)}>
          <span>Exclude party from pacing limit</span>
          <span className={`switch ${exclude ? "on" : ""}`}>
            <i />
          </span>
        </button>

        <div className="guest-card light-card" onClick={() => push({ kind: "guest", id: g.id })} role="button" tabIndex={0}>
          <Avatar guest={g} size={56} />
          <span className="gc-main">
            <span className="gc-name">
              {g.vip && <Icon name="star" size={18} className="vip-star" />}
              {guestName(g)}
            </span>
            <span className="gc-line">
              <Icon name="phone" size={14} /> {g.phone}
            </span>
            <span className="gc-line">
              <Icon name="building" size={14} /> {g.area}
            </span>
            {g.company && (
              <span className="gc-line">
                <Icon name="briefcase" size={14} /> {g.company}
              </span>
            )}
          </span>
          <Icon name="chevR" size={20} />
        </div>

        {r.tags.length > 0 && (
          <div className="chip-wrap pad">
            {r.tags.map((t) => (
              <TagChip key={t} tag={t} />
            ))}
          </div>
        )}

        <label className="note-box">
          <span className="row-gap muted">
            <Icon name="note" size={16} /> Visit note
          </span>
          <textarea rows={2} value={note} placeholder="Add a visit note" onChange={(e) => setNote(e.target.value)} onBlur={() => note !== (r.note ?? "") && updateNote(r.id, note)} />
        </label>
        <p className="muted small pad">
          Booked {r.source === "Online" ? "online via OpenTable" : r.source === "Phone" ? "by phone" : "as a walk-in"} · {g.visits} visits
        </p>
      </div>
    </div>
  );
}

const STATUS_FLOW: ResoStatus[] = ["Booked", "Confirmed", "Left message", "Late", "Partially arrived", "Arrived", "Seated", "Finished", "No-show", "Cancelled"];

export function StatusSheet({ id }: { id: string }) {
  const { resos, setStatus, closeSheet } = useApp();
  const r = resos.find((x) => x.id === id)!;
  return (
    <SheetFrame title="Update status" dark>
      <div className="status-grid">
        {STATUS_FLOW.map((s) => (
          <button
            key={s}
            className={`status-opt ${r.status === s ? "on" : ""}`}
            onClick={() => {
              setStatus(id, s);
              closeSheet();
            }}
          >
            <StatusIcon status={s} />
            {s}
          </button>
        ))}
      </div>
    </SheetFrame>
  );
}

export function AssignTableSheet({ resoId }: { resoId: string }) {
  const { resos, shiftResos, assignTable, closeSheet } = useApp();
  const r = resos.find((x) => x.id === resoId)!;
  const taken = new Set(shiftResos.filter((x) => x.id !== resoId && x.table && (x.status === "Seated" || (isActive(x.status) && x.time === r.time))).map((x) => x.table));
  return (
    <SheetFrame title={`Table for party of ${r.size}`} dark>
      <div className="table-pick">
        {TABLES.map((t) => {
          const busy = taken.has(t.id);
          const fits = t.seats >= r.size;
          return (
            <button
              key={t.id}
              disabled={busy}
              className={`tp ${r.table === t.id ? "on" : ""} ${fits ? "" : "small"}`}
              onClick={() => {
                assignTable(resoId, t.id);
                closeSheet();
              }}
            >
              <b>{t.id}</b>
              <small>
                {t.seats} seats · {t.section}
              </small>
              {busy && <small className="busy">In use</small>}
            </button>
          );
        })}
      </div>
    </SheetFrame>
  );
}

export function MessageSheet({ resoId }: { resoId: string }) {
  const { resos, guests, closeSheet, toast } = useApp();
  const r = resos.find((x) => x.id === resoId)!;
  const g = guests.find((x) => x.id === r.guestId)!;
  const presets = ["Your table is ready! Please come to the host stand.", "We're running about 10 minutes behind. Thanks for your patience!", `Hi ${g.first}, just confirming your table for ${r.size} at ${r.time} tonight.`];
  const [text, setText] = useState(presets[2]);
  return (
    <SheetFrame title={`Message ${g.first}`}>
      <div className="chip-wrap">
        {presets.map((p) => (
          <button key={p} className="preset" onClick={() => setText(p)}>
            {p}
          </button>
        ))}
      </div>
      <textarea className="text-area" rows={4} value={text} onChange={(e) => setText(e.target.value)} />
      <button
        className="primary-btn"
        disabled={!text.trim()}
        onClick={() => {
          closeSheet();
          toast(`Text sent to ${g.phone}`);
        }}
      >
        <Icon name="send" size={18} /> Send text
      </button>
    </SheetFrame>
  );
}

export function NewResoSheet({ walkIn = false }: { walkIn?: boolean }) {
  const { shift, shiftResos, addReso, closeSheet } = useApp();
  const [size, setSize] = useState(2);
  const [time, setTime] = useState(walkIn ? "6:45 pm" : SLOTS[shift][Math.floor(SLOTS[shift].length / 2)]);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const booked = (slot: string) => shiftResos.filter((r) => r.time === slot && r.status !== "Cancelled").reduce((s, r) => s + r.size, 0);
  return (
    <SheetFrame title={walkIn ? "Add walk-in" : "New reservation"} dark>
      <span className="field-cap">Party size</span>
      <div className="size-row">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
          <button key={s} className={size === s ? "on" : ""} onClick={() => setSize(s)}>
            {s}
          </button>
        ))}
      </div>
      {!walkIn && (
        <>
          <span className="field-cap">Time · covers booked of {PACING_LIMIT}</span>
          <div className="slot-grid">
            {SLOTS[shift].map((s) => {
              const b = booked(s);
              const full = b + size > PACING_LIMIT;
              return (
                <button key={s} className={`slot ${time === s ? "on" : ""} ${full ? "full" : ""}`} onClick={() => setTime(s)}>
                  <b>{s}</b>
                  <small>
                    {b}/{PACING_LIMIT}
                  </small>
                </button>
              );
            })}
          </div>
        </>
      )}
      <div className="two-col">
        <input className="dark-input" placeholder="First name" value={first} onChange={(e) => setFirst(e.target.value)} />
        <input className="dark-input" placeholder="Last name" value={last} onChange={(e) => setLast(e.target.value)} />
      </div>
      <input className="dark-input" placeholder="Phone" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input className="dark-input" placeholder="Visit note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
      <button
        className="primary-btn"
        disabled={!first.trim()}
        onClick={() => {
          addReso({ size, time, first: first.trim(), last: last.trim(), phone, note, walkIn });
          closeSheet();
        }}
      >
        {walkIn ? `Seat walk-in for ${size}` : `Book ${size} at ${time}`}
      </button>
    </SheetFrame>
  );
}
