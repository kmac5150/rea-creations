import { useEffect, useState } from "react";
import { useApp } from "../app-context";
import { Segmented, SheetFrame } from "../components";
import { dateParts, eventById, money, performerById, venueById, type Order } from "../data";
import { Icon } from "../icons";

function orderHeadline(o: Order) {
  const ev = eventById(o.eventId);
  const p = dateParts(ev.date);
  return `${p.dow.toUpperCase()} • ${Number(p.day)} ${p.mon} • ${ev.time}`;
}

export function MyEventsScreen() {
  const { orders, push } = useApp();
  const [seg, setSeg] = useState<"upcoming" | "past">("upcoming");
  const sorted = [...orders].sort((a, b) => eventById(a.eventId).date.localeCompare(eventById(b.eventId).date));
  return (
    <div className="screen">
      <header className="page-head">
        <h1>MY EVENTS</h1>
        <small>Your tickets, all in one place</small>
      </header>
      <div className="seg-wrap">
        <Segmented
          value={seg}
          onChange={setSeg}
          options={[
            { id: "upcoming", label: `Upcoming (${orders.length})` },
            { id: "past", label: "Past (3)" },
          ]}
        />
      </div>
      <div className="scroll">
        {seg === "upcoming" ? (
          sorted.map((o) => {
            const ev = eventById(o.eventId);
            const v = venueById(ev.venueId);
            const active = o.seats.length - o.transferred.length;
            return (
              <button key={o.id} className="my-event" onClick={() => push({ kind: "order", id: o.id })}>
                <img src={ev.image} alt="" />
                <span className="me-overlay">
                  <small>{orderHeadline(o)}</small>
                  <b>{ev.title}</b>
                  <span>
                    {v.name} - {v.city}, {v.state}
                  </span>
                </span>
                <span className="me-count">
                  <Icon name="ticket" size={16} /> x{active}
                </span>
                {o.listedAt && <span className="me-listed">Listed for {money(o.listedAt)}</span>}
              </button>
            );
          })
        ) : (
          <div className="past-list">
            {[
              ["Velvet Arcade", "Sat • 14 Jun • 2026", "Summit Center"],
              ["Los Angeles Comets vs. Desert Suns", "Fri • 2 May • 2026", "Crescent Arena"],
              ["Juno Hart", "Sat • 22 Feb • 2026", "Crescent Arena"],
            ].map(([t, d, v]) => (
              <div key={t} className="past-row">
                <b>{t}</b>
                <small>
                  {d} · {v}
                </small>
              </div>
            ))}
          </div>
        )}
        <div className="bottom-pad" />
      </div>
    </div>
  );
}

export function OrderScreen({ id }: { id: string }) {
  const { orders, pop, push, openSheet, toast } = useApp();
  const o = orders.find((x) => x.id === id);
  const [tab, setTab] = useState<"Tickets" | "Extras">("Tickets");
  if (!o) return null;
  const ev = eventById(o.eventId);
  const v = venueById(ev.venueId);
  const active = o.seats.filter((s) => !o.transferred.includes(s));
  return (
    <div className="screen no-top">
      <div className="scroll">
        <div className="order-hero">
          <img src={ev.image} alt="" />
          <button className="icon-btn oh-back" onClick={pop} aria-label="Back">
            <Icon name="back" size={24} />
          </button>
          <button className="oh-help" onClick={() => toast("Connecting you with Fan Support…")}>
            Help
          </button>
        </div>
        <div className="order-card">
          <small>{orderHeadline(o)}</small>
          <h2>{ev.title}</h2>
          <span className="oc-venue">
            {v.name} - {v.city}, {v.state}
            <span>
              <Icon name="ticket" size={18} /> x{active.length}
            </span>
          </span>
        </div>
        <button className="view-tickets" disabled={active.length === 0} onClick={() => push({ kind: "tickets", id: o.id })}>
          <Icon name="barcode" size={22} /> View Tickets
        </button>
        <div className="underline-tabs">
          {(["Tickets", "Extras"] as const).map((t) => (
            <button key={t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>
        {tab === "Tickets" ? (
          <div className="order-body">
            <div className="ob-head">
              <span>
                <b>Order #{o.id}</b>
                <small>
                  x{o.seats.length} Tickets · {money(o.price * o.seats.length + o.fees)}
                </small>
              </span>
              <button className="icon-btn" aria-label="Order options" onClick={() => toast("Receipt sent to your email")}>
                <Icon name="more" size={20} />
              </button>
            </div>
            {o.seats.map((s) => {
              const gone = o.transferred.includes(s);
              return (
                <div key={s} className={`seat-card ${gone ? "gone" : ""}`}>
                  <div className="sc-type">
                    {o.type === "Standard Ticket" ? "Standard Admission" : o.type}
                    {gone && <em>Transferred</em>}
                    {o.listedAt && !gone && <em className="listed">Listed</em>}
                  </div>
                  <div className="sc-facts">
                    <span>
                      <small>SECTION</small>
                      <b>{o.section}</b>
                    </span>
                    <span>
                      <small>ROW</small>
                      <b>{o.row}</b>
                    </span>
                    <span>
                      <small>SEAT</small>
                      <b>{s}</b>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="order-body">
            {[
              ["Parking Pass", "Lot C · $35", "🅿️"],
              ["Official Tour Merch Bundle", "Pick up at venue · $55", "👕"],
              ["Pre-show Lounge Access", "Doors 90 min early · $40", "🥂"],
            ].map(([t, s, e]) => (
              <button key={t} className="extra-row" onClick={() => toast(`${t} added to your order`)}>
                <span className="extra-emoji">{e}</span>
                <span>
                  <b>{t}</b>
                  <small>{s}</small>
                </span>
                <Icon name="chevronRight" size={18} />
              </button>
            ))}
          </div>
        )}
        <div className="bottom-pad" />
      </div>
      {active.length > 0 && (
        <div className="float-actions">
          <button onClick={() => openSheet({ kind: "sell", orderId: o.id })}>
            <Icon name="cycle" size={20} />
            Sell
          </button>
          <i />
          <button onClick={() => openSheet({ kind: "transfer", orderId: o.id })}>
            <Icon name="transfer" size={20} />
            Transfer
          </button>
        </div>
      )}
    </div>
  );
}

function Barcode({ seed }: { seed: number }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setTick((n) => n + 1), 1200);
    return () => window.clearInterval(t);
  }, []);
  const cells: boolean[] = [];
  let h = seed * 9301 + tick * 49297;
  for (let i = 0; i < 60 * 12; i++) {
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    cells.push((h >> 16) % 2 === 0);
  }
  return (
    <svg viewBox="0 0 78 21" className="barcode" preserveAspectRatio="none" aria-label="Rotating ticket barcode">
      {cells.map((on, i) => (on ? <rect key={i} x={(i % 60) * 1.3} y={Math.floor(i / 60) * 1.75} width="1.3" height="1.75" fill="#111" /> : null))}
    </svg>
  );
}

export function TicketsScreen({ id }: { id: string }) {
  const { orders, pop, toast } = useApp();
  const o = orders.find((x) => x.id === id);
  const [idx, setIdx] = useState(0);
  if (!o) return null;
  const ev = eventById(o.eventId);
  const v = venueById(ev.venueId);
  const p = dateParts(ev.date);
  const seats = o.seats.filter((s) => !o.transferred.includes(s));
  const gate = v.gates[o.row.charCodeAt(0) % v.gates.length];
  return (
    <div className="screen tickets-screen">
      <header className="tix-head">
        <button className="icon-btn" onClick={pop} aria-label="Back">
          <Icon name="back" size={24} />
        </button>
        <span>
          <b>{performerById(ev.performerId).name.toUpperCase()}</b>
          <small>
            {p.dow} • {Number(p.day)} {p.mon.charAt(0) + p.mon.slice(1).toLowerCase()} • {ev.time} - {v.name}
          </small>
        </span>
        <span />
      </header>
      <div
        className="tix-track"
        onScroll={(e) => setIdx(Math.round(e.currentTarget.scrollLeft / 300))}
      >
        {seats.map((s, i) => (
          <div key={s} className="tix-card">
            <div className="tix-brand">ticketmaster</div>
            <div className="tix-photo">
              <img src={performerById(ev.performerId).image} alt="" />
              <div className="tix-code">
                <small>Screenshots won't get you in</small>
                <span className="code-wrap">
                  <i className="code-sweep" />
                  <Barcode seed={s + i * 7} />
                </span>
              </div>
            </div>
            <div className="tix-info">
              <div className="sc-facts dark">
                <span>
                  <small>SEC</small>
                  <b>{o.section}</b>
                </span>
                <span>
                  <small>ROW</small>
                  <b>{o.row}</b>
                </span>
                <span>
                  <small>SEAT</small>
                  <b>{s}</b>
                </span>
              </div>
              <b className="tix-type">{o.type === "Standard Ticket" ? "Standard Admission" : o.type}</b>
              <button className="gate-btn" onClick={() => toast(`Head to Gate ${gate} · Doors open 6:30 PM`)}>
                ENTER VIA GATE {gate.toUpperCase()}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="tix-dots">
        {seats.map((s, i) => (
          <i key={s} className={i === idx ? "on" : ""} />
        ))}
      </div>
      <button className="wallet-btn" onClick={() => toast("Added to Apple Wallet")}>
        <Icon name="wallet" size={20} /> Add to Apple Wallet
      </button>
    </div>
  );
}

export function TransferSheet({ orderId }: { orderId: string }) {
  const { orders, closeSheet, updateOrder, toast } = useApp();
  const o = orders.find((x) => x.id === orderId)!;
  const avail = o.seats.filter((s) => !o.transferred.includes(s));
  const [picked, setPicked] = useState<number[]>([avail[avail.length - 1]]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const valid = picked.length > 0 && name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);
  return (
    <SheetFrame
      title="Transfer Tickets"
      onClose={closeSheet}
      light
      footer={
        <button
          className="btn blue block"
          disabled={!valid}
          onClick={() => {
            updateOrder(o.id, { transferred: [...o.transferred, ...picked] });
            closeSheet();
            toast(`${picked.length} ${picked.length === 1 ? "ticket" : "tickets"} sent to ${name.split(" ")[0]}`);
          }}
        >
          Transfer {picked.length} {picked.length === 1 ? "Ticket" : "Tickets"}
        </button>
      }
    >
      <p className="sheet-label">Select tickets</p>
      <div className="seat-picks">
        {avail.map((s) => (
          <button key={s} className={picked.includes(s) ? "on" : ""} onClick={() => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]))}>
            <small>
              Sec {o.section} · Row {o.row}
            </small>
            <b>Seat {s}</b>
          </button>
        ))}
      </div>
      <p className="sheet-label">Send to</p>
      <input className="field" placeholder="First and last name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="field" placeholder="Email or mobile number" value={email} onChange={(e) => setEmail(e.target.value)} />
      <p className="muted-note">Your friend will get an email to accept the tickets. You can cancel until they accept.</p>
    </SheetFrame>
  );
}

export function SellSheet({ orderId }: { orderId: string }) {
  const { orders, closeSheet, updateOrder, toast } = useApp();
  const o = orders.find((x) => x.id === orderId)!;
  const [price, setPrice] = useState(Math.round(o.price * 1.25));
  const payout = price * 0.9;
  return (
    <SheetFrame
      title={o.listedAt ? "Edit Listing" : "Sell Tickets"}
      onClose={closeSheet}
      light
      footer={
        <div className="sell-foot">
          {o.listedAt && (
            <button
              className="btn outline"
              onClick={() => {
                updateOrder(o.id, { listedAt: undefined });
                closeSheet();
                toast("Listing removed");
              }}
            >
              Remove
            </button>
          )}
          <button
            className="btn blue grow"
            onClick={() => {
              updateOrder(o.id, { listedAt: price });
              closeSheet();
              toast(`Listed at ${money(price)} per ticket`);
            }}
          >
            {o.listedAt ? "Update Listing" : "List Tickets"}
          </button>
        </div>
      }
    >
      <p className="sheet-label">Price per ticket</p>
      <div className="price-stepper">
        <button onClick={() => setPrice((p) => Math.max(10, p - 5))} aria-label="Lower price">
          −
        </button>
        <b>{money(price)}</b>
        <button onClick={() => setPrice((p) => p + 5)} aria-label="Raise price">
          +
        </button>
      </div>
      <div className="price-hint">
        <span>
          You paid <b>{money(o.price)}</b>
        </span>
        <span>
          Similar seats <b>{money(o.price * 1.1)}–{money(o.price * 1.6)}</b>
        </span>
      </div>
      <div className="tp-row">
        <span>Your payout per ticket</span>
        <b>{money(payout)}</b>
      </div>
      <p className="muted-note">Seller fee of 10% is deducted. Payout arrives 5–8 days after the event.</p>
    </SheetFrame>
  );
}
