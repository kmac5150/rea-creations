import { useState } from "react";
import { ORDER_STEPS, orderStep, useApp } from "../app-context";
import { StoreLogo } from "../components";
import { PAST_ORDERS, money, storeById } from "../data";
import { Icon } from "../icons";

export function OrdersScreen() {
  const { order, push, toast } = useApp();
  const [ratings, setRatings] = useState<Record<string, number>>({});

  return (
    <div className="screen">
      <div className="scroll pad-top-status">
        <h1 className="large-title">Orders</h1>
        {order && (() => {
          const n = order.lines.reduce((sum, l) => sum + l.qty, 0) + order.addOns;
          return (
          <>
            <h3 className="block-title">In Progress</h3>
            <button className="order-card live" onClick={() => push({ kind: "tracking" })}>
              <StoreLogo store={storeById(order.storeId)} size={52} />
              <span>
                <b>{storeById(order.storeId).name}</b>
                <span className="live-status">{ORDER_STEPS[orderStep(order.placedAt, Date.now())]}</span>
                <span className="muted">
                  {n} {n === 1 ? "item" : "items"} · {money(order.total)}
                </span>
              </span>
              <span className="track-pill">Track</span>
            </button>
          </>
          );
        })()}
        <h3 className="block-title">Completed</h3>
        {PAST_ORDERS.map((o) => {
          const s = storeById(o.storeId);
          const rating = ratings[o.id] ?? o.rated ?? 0;
          return (
            <div key={o.id} className="order-card">
              <StoreLogo store={s} size={52} />
              <span className="oc-body" onClick={() => push({ kind: "store", id: s.id })}>
                <b>{s.name}</b>
                <span className="muted">
                  {o.date} · {o.items} items · {money(o.total)}
                </span>
                <span className={o.status === "Cancelled" ? "cancelled" : "muted small"}>{o.status === "Cancelled" ? "Order cancelled" : "Delivered"}</span>
                {o.status === "Completed" && (
                  <span className="stars" onClick={(e) => e.stopPropagation()}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        className={n <= rating ? "on" : ""}
                        aria-label={`Rate ${n} stars`}
                        onClick={() => {
                          setRatings((r) => ({ ...r, [o.id]: n }));
                          toast("Thanks for rating your order");
                        }}
                      >
                        <Icon name="star" size={16} />
                      </button>
                    ))}
                  </span>
                )}
              </span>
              <button className="reorder" onClick={() => push({ kind: "store", id: s.id })}>
                Reorder
              </button>
            </div>
          );
        })}
        <div className="bottom-pad" />
      </div>
    </div>
  );
}
