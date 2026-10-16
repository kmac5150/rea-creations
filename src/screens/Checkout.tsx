import { useEffect, useState } from "react";
import { ORDER_STEPS, cartFor, cartTotals, orderStep, useApp } from "../app-context";
import { BackHeader, ItemThumb, ProductTile, SheetFrame, StoreLogo } from "../components";
import { ADDRESSES, STORES, itemById, money, storeById } from "../data";
import { Icon, type IconName } from "../icons";

export function CartScreen({ storeId }: { storeId: string }) {
  const store = storeById(storeId);
  const { pop, cart, setQty, push } = useApp();
  const lines = cartFor(cart, storeId);
  const { subtotal } = cartTotals(lines);
  const picks = store.items.filter((i) => !lines.some((l) => l.itemId === i.id));

  return (
    <div className="screen">
      <BackHeader subtitle="Your Cart" title={store.name} onBack={pop} />
      <div className="scroll pad-top-header">
        <h3 className="block-title">Items</h3>
        {lines.length === 0 ? (
          <div className="empty">
            <Icon name="cart" size={40} />
            <h3>Your cart is empty</h3>
            <button className="btn gray" onClick={pop}>
              Add items
            </button>
          </div>
        ) : (
          lines.map((l) => {
            const item = itemById(l.storeId, l.itemId);
            return (
              <div key={l.key} className="cart-line">
                <ItemThumb item={item} size={64} />
                <span className="cl-body">
                  <b>{item.name}</b>
                  {l.options.length > 0 && <span className="muted">{l.options.join(", ")}</span>}
                  <span>{money(l.unitPrice * l.qty)}</span>
                </span>
                <span className="cl-stepper">
                  <button onClick={() => setQty(l.key, l.qty - 1)} aria-label="Decrease">
                    <Icon name={l.qty === 1 ? "trash" : "minus"} size={16} />
                  </button>
                  <b>{l.qty}</b>
                  <button onClick={() => setQty(l.key, l.qty + 1)} aria-label="Increase">
                    <Icon name="plus" size={16} />
                  </button>
                </span>
              </div>
            );
          })
        )}
        <div className="add-more">
          <button className="btn gray small" onClick={pop}>
            <Icon name="plus" size={16} /> Add more items
          </button>
        </div>
        <h3 className="block-title">Our Picks for You</h3>
        <div className="h-scroll">
          {picks.map((i) => (
            <ProductTile key={i.id} store={store} item={i} />
          ))}
        </div>
        <div className="summary-mini">
          <span>Subtotal</span>
          <b>{money(subtotal)}</b>
        </div>
        <div className="bottom-pad" />
      </div>
      {lines.length > 0 && (
        <div className="sticky-cta">
          <button className="btn red block" onClick={() => push({ kind: "checkout", storeId })}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

const TIPS = [0.15, 0.18, 0.2, 0.25];

export function CheckoutScreen({ storeId }: { storeId: string }) {
  const store = storeById(storeId);
  const { pop, cart, addressId, openSheet, placeOrder } = useApp();
  const lines = cartFor(cart, storeId);
  const { subtotal, count } = cartTotals(lines);
  const [mode, setMode] = useState<"Delivery" | "Pickup">("Delivery");
  const [speed, setSpeed] = useState<"Priority" | "Standard" | "Schedule">("Standard");
  const [tip, setTip] = useState(0.18);
  const address = ADDRESSES.find((a) => a.id === addressId) ?? ADDRESSES[0];
  const delivery = mode === "Pickup" || store.dashpass ? 0 : 1.99;
  const service = mode === "Pickup" ? 0 : Math.max(2, subtotal * 0.1);
  const priority = speed === "Priority" ? 2.99 : 0;
  const discount = store.promo && subtotal >= 20 ? Math.min(5, subtotal * 0.2) : 0;
  const tax = subtotal * 0.08625;
  const tipAmt = mode === "Pickup" ? 0 : subtotal * tip;
  const total = subtotal + delivery + service + priority + tax + tipAmt - discount;

  return (
    <div className="screen checkout">
      <BackHeader title="Checkout" subtitle={store.name} onBack={pop} />
      <div className="scroll pad-top-header">
        <div className="toggle full">
          {(["Delivery", "Pickup"] as const).map((m) => (
            <button key={m} className={mode === m ? "on" : ""} onClick={() => setMode(m)}>
              {m}
            </button>
          ))}
        </div>

        {mode === "Delivery" ? (
          <>
            <button className="co-row" onClick={() => openSheet({ kind: "address" })}>
              <Icon name="pin" size={20} />
              <span>
                <b>{address.label}</b>
                <span className="muted">
                  {address.detail}
                  {address.note ? ` · ${address.note}` : ""}
                </span>
              </span>
              <Icon name="chevronRight" size={18} />
            </button>
            <h3 className="block-title">Delivery time</h3>
            <div className="speed-list">
              <SpeedOption label="Priority" detail={`${store.eta - 5}–${store.eta + 5} min · Direct to you`} price="+$2.99" on={speed === "Priority"} onClick={() => setSpeed("Priority")} />
              <SpeedOption label="Standard" detail={`${store.eta}–${store.eta + 10} min`} price="" on={speed === "Standard"} onClick={() => setSpeed("Standard")} />
              <SpeedOption label="Schedule" detail="Choose a time" price="" on={speed === "Schedule"} onClick={() => setSpeed("Schedule")} />
            </div>
          </>
        ) : (
          <div className="co-row static">
            <Icon name="store" size={20} />
            <span>
              <b>Pick up at {store.name}</b>
              <span className="muted">
                {store.distance} mi away · Ready in {Math.max(8, store.eta - 10)} min
              </span>
            </span>
          </div>
        )}

        <h3 className="block-title">Payment</h3>
        <div className="co-row static">
          <Icon name="card" size={20} />
          <span>
            <b>Visa •••• 4242</b>
            <span className="muted">Expires 08/29</span>
          </span>
          <Icon name="chevronRight" size={18} />
        </div>

        {mode === "Delivery" && (
          <>
            <h3 className="block-title">Dasher tip</h3>
            <p className="muted small">100% of the tip goes to your Dasher.</p>
            <div className="tip-row">
              {TIPS.map((t) => (
                <button key={t} className={tip === t ? "on" : ""} onClick={() => setTip(t)}>
                  {money(subtotal * t)}
                  <small>{Math.round(t * 100)}%</small>
                </button>
              ))}
            </div>
          </>
        )}

        <h3 className="block-title">Order summary</h3>
        <div className="summary">
          <Row label={`Subtotal (${count} items)`} value={money(subtotal)} />
          {mode === "Delivery" && <Row label="Delivery fee" value={delivery === 0 ? "$0.00" : money(delivery)} />}
          {service > 0 && <Row label="Service fee" value={money(service)} />}
          {priority > 0 && <Row label="Priority delivery" value={money(priority)} />}
          <Row label="Estimated tax" value={money(tax)} />
          {tipAmt > 0 && <Row label="Dasher tip" value={money(tipAmt)} />}
          {discount > 0 && <Row label={`Promotion (${store.promo})`} value={`-${money(discount)}`} green />}
          <Row label="Total" value={money(total)} bold />
        </div>
        <div className="bottom-pad" />
      </div>
      <div className="sticky-cta">
        <button className="btn red block" disabled={count === 0} onClick={() => placeOrder(storeId, total)}>
          Place Order · {money(total)}
        </button>
      </div>
    </div>
  );
}

function SpeedOption({ label, detail, price, on, onClick }: { label: string; detail: string; price: string; on: boolean; onClick: () => void }) {
  return (
    <button className={`speed ${on ? "on" : ""}`} onClick={onClick}>
      <span className={`radio ${on ? "on" : ""}`} />
      <span>
        <b>{label}</b>
        <span className="muted">{detail}</span>
      </span>
      <span>{price}</span>
    </button>
  );
}

function Row({ label, value, bold = false, green = false }: { label: string; value: string; bold?: boolean; green?: boolean }) {
  return (
    <div className={`sum-row ${bold ? "bold" : ""} ${green ? "green" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

const STEP_ICONS: IconName[] = ["dash", "store", "car", "home"];

function useNow(ms: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), ms);
    return () => window.clearInterval(t);
  }, [ms]);
  return now;
}

export function TrackingScreen() {
  const { pop, order, toast, addOnToOrder } = useApp();
  const now = useNow(1000);
  const [details, setDetails] = useState(false);
  if (!order) {
    return (
      <div className="screen">
        <BackHeader title="Order" onBack={pop} />
        <div className="empty pad-top-header">
          <h3>No active order</h3>
        </div>
      </div>
    );
  }
  const store = storeById(order.storeId);
  const step = orderStep(order.placedAt, now);
  const placed = new Date(order.placedAt);
  const fmt = (d: Date) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const from = new Date(placed.getTime() + store.eta * 60000);
  const to = new Date(from.getTime() + 15 * 60000);
  const leftMs = Math.max(0, 10 * 60000 - (now - order.placedAt));
  const left = `${Math.floor(leftMs / 60000)}:${String(Math.floor((leftMs % 60000) / 1000)).padStart(2, "0")}`;
  const addOnStores = STORES.filter((s) => s.vertical !== "restaurant" && s.id !== store.id).slice(0, 4);
  const dashmart = storeById("dashmart");

  const dasher = [
    { x: 60, y: 440 },
    { x: 150, y: 428 },
    { x: 240, y: 416 },
    { x: 332, y: 404 },
  ][step];

  return (
    <div className="screen tracking">
      <svg className="track-map" viewBox="0 0 393 500" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <rect width="393" height="500" fill="#e8ecef" />
        <path d="M0 80 L393 40 M0 180 L393 150 M0 290 L393 260 M0 445 L393 410 M60 0 L90 500 M170 0 L190 500 M270 0 L300 500 M350 0 L370 500" stroke="#fff" strokeWidth="9" />
        <path d="M-10 60 C80 120 120 30 220 60 S330 10 410 40 V0 H-10Z" fill="#aad3f2" />
        <rect x="200" y="300" width="80" height="60" rx="8" fill="#cfe8c2" />
        <path d="M60 440 L150 428 L240 416 L332 404" stroke="#191919" strokeWidth="5" strokeDasharray="2 9" strokeLinecap="round" fill="none" />
        <circle cx="60" cy="440" r="15" fill="#191919" />
        <text x="60" y="445" textAnchor="middle" fontSize="14">🏪</text>
        <circle cx="332" cy="404" r="15" fill="#eb1700" />
        <text x="332" y="409" textAnchor="middle" fontSize="13">🏠</text>
        {step >= 2 && (
          <g style={{ transition: "transform 1s" }} transform={`translate(${dasher.x} ${dasher.y})`}>
            <circle r="17" fill="#fff" stroke="#eb1700" strokeWidth="3" />
            <text y="6" textAnchor="middle" fontSize="16">🚗</text>
          </g>
        )}
      </svg>
      <div className="track-top">
        <button className="circle-btn" onClick={pop} aria-label="Back">
          <Icon name="back" size={20} />
        </button>
        <button className="help-btn" onClick={() => toast("Connecting you with Support…")}>
          Help
        </button>
      </div>
      <div className="track-card">
        <h2>{ORDER_STEPS[step]}</h2>
        <p>
          Arrives between{" "}
          <b>
            {fmt(from)} – {fmt(to)}
          </b>
        </p>
        <div className="progress">
          {STEP_ICONS.map((ic, i) => (
            <span key={ic} className={`p-step ${i <= step ? "done" : ""} ${i === step ? "current" : ""}`}>
              {i > 0 && <i className="p-line" />}
              <span className="p-icon">
                <Icon name={ic} size={i === 0 ? 20 : 16} />
              </span>
            </span>
          ))}
        </div>
        <p className="track-note">
          {step === 0
            ? `We sent your order to ${store.name} for final confirmation.`
            : step === 1
              ? `${store.name} is preparing your order.`
              : step === 2
                ? "Jordan is heading to you in a white Toyota Prius · 7KXR218."
                : "Your Dasher is arriving now. Meet them at the door."}
        </p>
        {step >= 2 && (
          <div className="dasher-row">
            <span className="dasher-avatar">J</span>
            <span>
              <b>Jordan</b>
              <span className="muted">4.98 ★ · 2,140 deliveries</span>
            </span>
            <button className="circle-btn gray" aria-label="Message Dasher" onClick={() => toast("Opening chat with Jordan")}>
              <Icon name="chat" size={18} />
            </button>
            <button className="circle-btn gray" aria-label="Call Dasher" onClick={() => toast("Calling Jordan…")}>
              <Icon name="phone" size={18} />
            </button>
          </div>
        )}
        <button className="details-toggle" onClick={() => setDetails((d) => !d)}>
          View all details <Icon name="chevronDown" size={16} style={{ transform: details ? "rotate(180deg)" : undefined }} />
        </button>
        {details && (
          <div className="order-details">
            {order.lines.map((l) => {
              const it = itemById(l.storeId, l.itemId);
              return (
                <div key={l.key} className="od-row">
                  <span>
                    {l.qty}× {it.name}
                  </span>
                  <span>{money(l.unitPrice * l.qty)}</span>
                </div>
              );
            })}
            {order.addOns > 0 && (
              <div className="od-row">
                <span>DoubleDash add-ons ({order.addOns})</span>
                <span>added</span>
              </div>
            )}
            <div className="od-row total">
              <span>Total charged</span>
              <span>{money(order.total)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="track-sheet">
        {leftMs > 0 && (
          <div className="dd-timer">
            <Icon name="clock" size={16} /> {left} mins left to DoubleDash your order
          </div>
        )}
        <div className="track-sheet-inner">
          <div className="sheet-grabber" />
          <h3>Add on items from another store</h3>
          <p className="muted small">
            No added delivery fees. No order minimum. <Icon name="info" size={12} />
          </p>
          <div className="addon-stores">
            <span className="addon-all">
              <Icon name="list" size={18} />
            </span>
            {addOnStores.map((s) => (
              <span key={s.id} className="addon-store">
                <StoreLogo store={s} size={30} />
                <span>
                  <b>{s.name.split(" ")[0]}</b>
                  <small>+{s.eta > 30 ? 8 : 3} min</small>
                </span>
              </span>
            ))}
          </div>
          <div className="section-head">
            <span>
              <h2>Health & Flu Essentials</h2>
              <span className="section-sub">From DashMart · +3 min</span>
            </span>
          </div>
          <div className="h-scroll">
            {dashmart.items.slice(0, 5).map((i) => (
              <div key={i.id} className="product-tile">
                <div className="pt-thumb">
                  <ItemThumb item={i} size={128} />
                  <button
                    className="plus-btn"
                    aria-label={`Add ${i.name} to order`}
                    onClick={() => {
                      addOnToOrder(1);
                      toast(`${i.name} added to your order`);
                    }}
                  >
                    <Icon name="plus" size={18} />
                  </button>
                </div>
                <b className="pt-name">{i.name}</b>
                <span className="pt-price">{money(i.price)}</span>
              </div>
            ))}
          </div>
          <div className="bottom-pad small" />
        </div>
      </div>
    </div>
  );
}

export function CartsSheet() {
  const { closeSheet, cart, push } = useApp();
  const storeIds = [...new Set(cart.map((l) => l.storeId))];
  return (
    <SheetFrame title="Carts" onClose={closeSheet}>
      {storeIds.length === 0 ? (
        <div className="empty">
          <Icon name="cart" size={40} />
          <h3>No carts yet</h3>
          <p className="muted">Add items from a store to start a cart.</p>
        </div>
      ) : (
        storeIds.map((id) => {
          const s = storeById(id);
          const t = cartTotals(cartFor(cart, id));
          return (
            <button key={id} className="cart-store" onClick={() => push({ kind: "cart", storeId: id })}>
              <StoreLogo store={s} size={48} />
              <span>
                <b>{s.name}</b>
                <span className="muted">
                  {t.count} {t.count === 1 ? "item" : "items"} · {money(t.subtotal)}
                </span>
                <span className="muted small">Deliver to {ADDRESSES[0].label}</span>
              </span>
              <Icon name="chevronRight" size={18} />
            </button>
          );
        })
      )}
    </SheetFrame>
  );
}
