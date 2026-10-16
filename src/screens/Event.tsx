import { useEffect, useMemo, useState, type ReactNode } from "react";
import { SERVICE_FEE_RATE, useApp } from "../app-context";
import { EventHeader, SheetFrame } from "../components";
import { FLOOR_SECTIONS, LOWER_SECTIONS, UPPER_SECTIONS, eventById, listingsFor, money, type Listing } from "../data";
import { Icon } from "../icons";

const CX = 210;
const CY = 150;

function sector(i: number, n: number, rIn: [number, number], rOut: [number, number]) {
  const start = (-155 + (310 / n) * i + 0.8) * (Math.PI / 180);
  const end = (-155 + (310 / n) * (i + 1) - 0.8) * (Math.PI / 180);
  const pts: string[] = [];
  for (let k = 0; k <= 4; k++) {
    const a = start + ((end - start) * k) / 4;
    pts.push(`${(CX + rOut[0] * Math.cos(a)).toFixed(1)},${(CY + rOut[1] * Math.sin(a)).toFixed(1)}`);
  }
  for (let k = 4; k >= 0; k--) {
    const a = start + ((end - start) * k) / 4;
    pts.push(`${(CX + rIn[0] * Math.cos(a)).toFixed(1)},${(CY + rIn[1] * Math.sin(a)).toFixed(1)}`);
  }
  const mid = (start + end) / 2;
  const lr = [(rIn[0] + rOut[0]) / 2, (rIn[1] + rOut[1]) / 2];
  return { points: pts.join(" "), lx: CX + lr[0] * Math.cos(mid), ly: CY + lr[1] * Math.sin(mid) };
}

function SeatMap({ available, selected, onSelect, small = false }: { available: Set<string>; selected: string | null; onSelect?: (s: string | null) => void; small?: boolean }) {
  const fill = (s: string) => (s === selected ? "#024ddf" : available.has(s) ? "#7d94f2" : "#cdcdd2");
  const click = (s: string) => onSelect && available.has(s) && onSelect(selected === s ? null : s);
  return (
    <svg viewBox="0 0 420 300" className={small ? "seatmap small" : "seatmap"} aria-label="Seat map">
      <ellipse cx={CX} cy={CY} rx="204" ry="148" fill="#dedee3" />
      {UPPER_SECTIONS.map((s, i) => {
        const g = sector(i, UPPER_SECTIONS.length, [160, 116], [198, 143]);
        return (
          <g key={s} onClick={() => click(s)} className={available.has(s) ? "sec avail" : "sec"}>
            <polygon points={g.points} fill={fill(s)} stroke="#fff" strokeWidth="1" />
            {!small && (
              <text x={g.lx} y={g.ly + 3} textAnchor="middle" fontSize="7.5" fill={s === selected ? "#fff" : "#4b4b55"}>
                {s}
              </text>
            )}
          </g>
        );
      })}
      {LOWER_SECTIONS.map((s, i) => {
        const g = sector(i, LOWER_SECTIONS.length, [118, 82], [154, 110]);
        return (
          <g key={s} onClick={() => click(s)} className={available.has(s) ? "sec avail" : "sec"}>
            <polygon points={g.points} fill={fill(s)} stroke="#fff" strokeWidth="1" />
            {!small && (
              <text x={g.lx} y={g.ly + 3} textAnchor="middle" fontSize="8" fill={s === selected ? "#fff" : "#4b4b55"}>
                {s}
              </text>
            )}
          </g>
        );
      })}
      <rect x="84" y="118" width="26" height="64" fill="#1a1a1a" />
      {!small && (
        <text x="97" y="150" fontSize="9" fill="#fff" fontWeight="700" textAnchor="middle" transform="rotate(-90 97 150)">
          STAGE
        </text>
      )}
      {FLOOR_SECTIONS.map((s, i) => (
        <g key={s} onClick={() => click(s)} className={available.has(s) ? "sec avail" : "sec"}>
          <rect x="122" y={i === 0 ? 104 : 152} width="108" height="44" rx="3" fill={fill(s)} stroke="#fff" />
          {!small && (
            <text x="176" y={i === 0 ? 130 : 178} textAnchor="middle" fontSize="9" fontWeight="700" fill={s === selected ? "#fff" : "#2c2c35"}>
              FLOOR
            </text>
          )}
        </g>
      ))}
      <rect x="250" y="135" width="26" height="30" rx="2" fill="#fff" stroke="#bbb" />
      {!small && (
        <text x="263" y="153" fontSize="6.5" textAnchor="middle" fill="#666">
          MIX
        </text>
      )}
    </svg>
  );
}

type Sort = "Lowest Price" | "Highest Price" | "Best Seats";

export function EventScreen({ id }: { id: string }) {
  const ev = eventById(id);
  const { pop, qty, openSheet, acceptedNotice, toast } = useApp();
  const all = useMemo(() => listingsFor(ev), [ev]);
  const [section, setSection] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("Lowest Price");
  const [standardOnly, setStandardOnly] = useState(false);
  const [perksOnly, setPerksOnly] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    if (!acceptedNotice.includes(id)) openSheet({ kind: "notice", eventId: id });
  }, [id]);

  const available = new Set(all.map((l) => l.section));
  const shown = all
    .filter((l) => (!section || l.section === section) && (!standardOnly || l.type === "Standard Ticket") && (!perksOnly || l.perks.length > 0) && l.seats.length >= qty)
    .sort((a, b) => {
      switch (sort) {
        case "Lowest Price":
          return a.price - b.price;
        case "Highest Price":
          return b.price - a.price;
        case "Best Seats":
          return a.section.localeCompare(b.section);
        default: {
          const never: never = sort;
          return never;
        }
      }
    });

  const nextSort: Record<Sort, Sort> = { "Lowest Price": "Highest Price", "Highest Price": "Best Seats", "Best Seats": "Lowest Price" };

  return (
    <div className="screen event-screen">
      <EventHeader ev={ev} onBack={pop} />
      <button className="info-bar" onClick={() => setInfoOpen((o) => !o)}>
        <span className={infoOpen ? "" : "clamp"}>
          <b>Important Info:</b> {ev.info}
        </span>
        <u>{infoOpen ? "less" : "more"}</u>
      </button>
      <div className="map-area">
        <div className="chip-row">
          <button className="chip icon" aria-label="Filters" onClick={() => openSheet({ kind: "quantity" })}>
            <Icon name="filter" size={20} />
          </button>
          <button className="chip" onClick={() => openSheet({ kind: "quantity" })}>
            {qty} {qty === 1 ? "Ticket" : "Tickets"}
          </button>
          <button className={`chip ${sort !== "Lowest Price" ? "on" : ""}`} onClick={() => setSort(nextSort[sort])}>
            Price
          </button>
          <button className={`chip ${standardOnly ? "on" : ""}`} onClick={() => setStandardOnly((v) => !v)}>
            Ticket Types
          </button>
          <button className={`chip ${perksOnly ? "on" : ""}`} onClick={() => setPerksOnly((v) => !v)}>
            Perks
          </button>
          <button className="chip" onClick={() => toast("Showing accessible seating options")}>
            <Icon name="access" size={20} className="blue" /> Accessible
          </button>
        </div>
        <SeatMap available={available} selected={section} onSelect={setSection} />
      </div>
      <div className="results">
        <div className="sheet-grabber" />
        <div className="results-bar">
          <b>
            {shown.length} Results{section ? ` in ${section.startsWith("FLOOR") ? "Floor" : `Sec ${section}`}` : ""}
          </b>
          <button className="sort-btn" onClick={() => setSort(nextSort[sort])}>
            <Icon name="sort" size={18} /> {sort}
          </button>
        </div>
        <div className="results-list">
          {section && (
            <button className="clear-section" onClick={() => setSection(null)}>
              <Icon name="close" size={14} /> Clear section filter
            </button>
          )}
          {shown.map((l) => (
            <ListingRow key={l.id} l={l} onClick={() => openSheet({ kind: "seat", eventId: id, listingId: l.id })} available={available} />
          ))}
          {shown.length === 0 && <p className="empty-note dark">No tickets match these filters.</p>}
          <div className="bottom-pad" />
        </div>
      </div>
    </div>
  );
}

function ListingRow({ l, onClick, available }: { l: Listing; onClick: () => void; available: Set<string> }) {
  return (
    <button className="listing" onClick={onClick}>
      <span className="mini-map">
        <SeatMap available={available} selected={l.section} small />
        <Icon name="pin" size={16} className="mini-pin" />
      </span>
      <span className="li-body">
        <b>{l.section.startsWith("FLOOR") ? `${l.section.replace("FLOOR ", "Floor ")}` : `Sec ${l.section}`} • Row {l.row}</b>
        <span className={l.type === "Verified Resale Ticket" ? "resale" : ""}>{l.type}</span>
        {l.perks.length > 0 && (
          <span className="perks">
            <em>{l.perks[0]}</em>
            {l.perks[1] && <em>{l.perks[1]}</em>}
            {l.perks.length > 2 && <em>+{l.perks.length - 2}</em>}
          </span>
        )}
      </span>
      <span className="li-price">{money(l.price)}</span>
    </button>
  );
}

export function NoticeSheet({ eventId }: { eventId: string }) {
  const { closeSheet, acceptNotice } = useApp();
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>What You Need To Know</h3>
        <p>
          Availability and pricing are subject to change. Resale ticket prices may exceed face value. <a>Learn More</a>
        </p>
        <button
          className="btn blue block"
          onClick={() => {
            acceptNotice(eventId);
            closeSheet();
          }}
        >
          Accept & Continue
        </button>
      </div>
    </div>
  );
}

export function QuantitySheet() {
  const { closeSheet, qty, setQty } = useApp();
  return (
    <SheetFrame title="How many tickets?" onClose={closeSheet} light footer={<button className="btn blue block" onClick={closeSheet}>Done</button>}>
      <div className="qty-grid">
        {[1, 2, 3, 4].map((n) => (
          <button key={n} className={qty === n ? "on" : ""} onClick={() => setQty(n)}>
            {n}
          </button>
        ))}
      </div>
      <p className="muted-note">A max of 4 tickets per person. Seats will be together.</p>
    </SheetFrame>
  );
}

export function SeatSheet({ eventId, listingId }: { eventId: string; listingId: string }) {
  const ev = eventById(eventId);
  const l = listingsFor(ev).find((x) => x.id === listingId)!;
  const { closeSheet, push, qty } = useApp();
  const seats = l.seats.slice(0, qty);
  const rowIdx = "ABCDEFGHJKLMN".indexOf(l.row);
  const rowsFrom = "ABCDEFGHJKLMN"[Math.max(0, rowIdx - 2)];
  const rowsTo = "ABCDEFGHJKLMN"[Math.min(12, rowIdx + 2)];
  return (
    <SheetFrame onClose={closeSheet} light>
      <div className="seat-dots">
        {[0, 1, 2].map((r) => (
          <div key={r}>
            {Array.from({ length: 9 }, (_, c) => {
              const seatNo = l.seats[0] - 2 + c;
              const mine = r === 1 && seats.includes(seatNo);
              const open = r === 1 ? c > 0 && c < 8 : (r + c) % 3 !== 0;
              return <i key={c} className={mine ? "mine" : open ? "open" : ""} />;
            })}
          </div>
        ))}
      </div>
      <div className="view-photo">
        <img src={ev.image} alt="" />
        <span className="vp-label">
          <Icon name="rotate" size={18} /> 360° &nbsp; VIEW FROM ROWS {rowsFrom}-{rowsTo}
        </span>
        <Icon name="expand" size={18} className="vp-expand" />
      </div>
      <div className="seat-facts">
        <span>
          <small>SECTION</small>
          <b>{l.section.replace("FLOOR ", "FL ")}</b>
        </span>
        <span>
          <small>ROW</small>
          <b>{l.row}</b>
        </span>
        <span>
          <small>{seats.length > 1 ? "SEATS" : "SEAT"}</small>
          <b>{seats.length > 1 ? `${seats[0]}-${seats[seats.length - 1]}` : seats[0]}</b>
        </span>
      </div>
      <div className="seat-level">
        <b>{l.level}</b>
        <span>
          {money(l.price)} {qty > 1 && <small>ea</small>}
        </span>
      </div>
      <p className="muted-note">
        {l.type}
        {l.perks.length ? ` · Includes ${l.perks.map((p) => p.toLowerCase()).join(", ")}` : ""}
      </p>
      <div className="sheet-pad">
        <button className="btn blue block" onClick={() => push({ kind: "checkout", eventId, listingId, qty })}>
          Add
        </button>
      </div>
    </SheetFrame>
  );
}

type Pay = "card" | "paypal" | "applepay";

export function CheckoutScreen({ eventId, listingId, qty }: { eventId: string; listingId: string; qty: number }) {
  const ev = eventById(eventId);
  const l = listingsFor(ev).find((x) => x.id === listingId)!;
  const { pop, setTab, push, addOrder, toast } = useApp();
  const [left, setLeft] = useState(8 * 60);
  const [pay, setPay] = useState<Pay>("applepay");
  const [insure, setInsure] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const t = window.setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(t);
  }, []);
  useEffect(() => {
    if (left === 0) {
      toast("Time expired. Your tickets were released.");
      pop();
    }
  }, [left, pop, toast]);

  const tickets = l.price * qty;
  const fees = Math.round(tickets * SERVICE_FEE_RATE * 100) / 100;
  const insurance = insure ? Math.round(tickets * 0.08 * 100) / 100 : 0;
  const total = tickets + fees + insurance;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  const place = () => {
    setBusy(true);
    window.setTimeout(() => {
      const id = `${10 + Math.floor(Math.random() * 89)}-${10000 + Math.floor(Math.random() * 89999)}/LA${1 + Math.floor(Math.random() * 8)}`;
      addOrder({ id, eventId, section: l.section, level: l.level, row: l.row, seats: l.seats.slice(0, qty), type: l.type, price: l.price, fees: fees + insurance, transferred: [] });
      setTab("events");
      push({ kind: "order", id });
      toast("You're in! Your tickets are in My Events.");
    }, 1100);
  };

  return (
    <div className="screen checkout">
      <header className="co-head">
        <button onClick={pop}>Cancel</button>
        <b>Checkout</b>
        <span className={left < 60 ? "urgent" : ""}>
          {mm}:{ss}
        </span>
      </header>
      <div className="scroll light">
        <div className="co-event">
          <img src={ev.image} alt="" />
          <span>
            <b>{ev.title}</b>
            <small>{`${ev.date.slice(5).replace("-", "/")} • ${ev.time}`}</small>
            <small>
              {l.section.startsWith("FLOOR") ? l.section : `Sec ${l.section}`} • Row {l.row} • {qty} {qty === 1 ? "ticket" : "tickets"}
            </small>
          </span>
        </div>
        <h3 className="co-h">Delivery</h3>
        <div className="co-box">
          <Icon name="ticket" size={22} />
          <span>
            <b>Mobile Ticket</b>
            <small>Your phone is your ticket. Ticketmaster SafeTix™ with a rotating barcode.</small>
          </span>
          <Icon name="check" size={18} className="blue" />
        </div>
        <h3 className="co-h">Payment</h3>
        <div className="pay-list">
          <PayOption id="card" pay={pay} setPay={setPay} logo={<Icon name="card" size={22} />} title="Credit / Debit Card" sub="Visa, Mastercard & American Express accepted" />
          <PayOption id="paypal" pay={pay} setPay={setPay} logo={<span className="pp-logo">P</span>} title="PayPal" sub="Pay the full amount or split your payments over time" />
          <PayOption id="applepay" pay={pay} setPay={setPay} logo={<span className="ap-logo"><span className="apple-glyph"></span>Pay</span>} title="Apple Pay" sub="Pay the full amount" />
        </div>
        <button className="insure" onClick={() => setInsure((v) => !v)}>
          <span className={`checkbox ${insure ? "on" : ""}`}>{insure && <Icon name="check" size={13} />}</span>
          <span>
            <b>Protect your purchase</b>
            <small>Ticket insurance for {money(tickets * 0.08)} — refunds for covered reasons.</small>
          </span>
        </button>
        <div className="total-panel">
          <i className="tp-rule" />
          <div className="tp-total">
            <b>TOTAL</b>
            <b>{money(total)}</b>
          </div>
          <h4>Tickets</h4>
          <div className="tp-row">
            <span>
              {l.type}: {money(l.price)} x {qty} <Icon name="help" size={16} />
            </span>
            <b>{money(tickets)}</b>
          </div>
          <h4>Fees</h4>
          <div className="tp-row">
            <span>
              Service Fees <Icon name="help" size={16} />
            </span>
            <b>{money(fees)}</b>
          </div>
          {insure && (
            <div className="tp-row">
              <span>Ticket Insurance</span>
              <b>{money(insurance)}</b>
            </div>
          )}
          <div className="tp-links">
            <button onClick={pop}>Edit Order</button>
            <i />
            <button
              onClick={() => {
                pop();
                pop();
              }}
            >
              Cancel Order
            </button>
          </div>
          <button className={`btn block ${pay === "applepay" ? "black" : "blue"}`} disabled={busy} onClick={place}>
            {busy ? "Processing…" : pay === "applepay" ? (<>Pay With <span className="apple-glyph"></span>Pay</>) : pay === "paypal" ? "Continue with PayPal" : "Place Order"}
          </button>
          <p className="fine">By continuing you agree to the Terms of Use. All sales are final.</p>
        </div>
        <div className="bottom-pad small" />
      </div>
    </div>
  );
}

function PayOption({ id, pay, setPay, logo, title, sub }: { id: Pay; pay: Pay; setPay: (p: Pay) => void; logo: ReactNode; title: string; sub: string }) {
  return (
    <button className="pay-opt" onClick={() => setPay(id)}>
      <span className={`radio ${pay === id ? "on" : ""}`} />
      <span className="pay-logo">{logo}</span>
      <span>
        <b>{title}</b>
        <small>{sub}</small>
      </span>
    </button>
  );
}
