import { useMemo, useRef, useState } from "react";
import { cartFor, cartTotals, useApp } from "../app-context";
import { DashPassMark, FavButton, ItemThumb, ProductTile, SheetFrame, StoreLogo } from "../components";
import { itemById, money, storeById, type MenuItem, type Store } from "../data";
import { Icon } from "../icons";

export function StoreScreen({ id }: { id: string }) {
  const store = storeById(id);
  const { pop, cart, push, toast } = useApp();
  const [mode, setMode] = useState<"Delivery" | "Pickup">("Delivery");
  const [activeCat, setActiveCat] = useState(store.categories[0]);
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const totals = cartTotals(cartFor(cart, store.id));
  const featured = store.items.filter((i) => i.badge || i.likes).slice(0, 6);
  const isGoods = store.vertical !== "restaurant";

  const sections = useMemo(
    () =>
      store.categories.map((c) => ({
        title: c,
        items: c === "Most Ordered" ? store.items.filter((i) => i.badge) : store.items.filter((i) => i.category === c),
      })),
    [store],
  );

  const jump = (c: string) => {
    setActiveCat(c);
    const el = scrollRef.current?.querySelector<HTMLElement>(`[data-cat="${CSS.escape(c)}"]`);
    if (el && scrollRef.current) scrollRef.current.scrollTo({ top: el.offsetTop - 140, behavior: "smooth" });
  };

  return (
    <div className="screen store-screen">
      {scrolled && (
        <div className="status-backdrop">
          <b>{store.name}</b>
        </div>
      )}
      <div className="scroll no-pad" ref={scrollRef} onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 170)}>
        <div className="store-hero">
          <img src={store.hero} alt="" />
          <div className="hero-actions">
            <button className="circle-btn" onClick={pop} aria-label="Back">
              <Icon name="back" size={20} />
            </button>
            <span>
              <button className="circle-btn" aria-label="Search store">
                <Icon name="search" size={19} />
              </button>
              <span className="circle-btn fav-wrap">
                <FavButton storeId={store.id} />
              </span>
              <button className="circle-btn" aria-label="More" onClick={() => toast("Link copied")}>
                <Icon name="more" size={18} />
              </button>
            </span>
          </div>
          <span className="hero-logo">
            <StoreLogo store={store} size={72} />
          </span>
        </div>

        <section className="store-info">
          <h1>{store.name}</h1>
          <div className="store-sub">
            {store.rating.toFixed(1)} <Icon name="star" size={13} /> ({store.reviews})
            {store.dashpass && (
              <>
                {" "}
                · <span className="dp-text">
                  <DashPassMark /> DashPass
                </span>
              </>
            )}{" "}
            · {store.cuisine[0]} · {store.priceLevel}
          </div>
          <p className="store-desc">{store.description}</p>
          <div className="mode-row">
            <div className="toggle">
              {(["Delivery", "Pickup"] as const).map((m) => (
                <button key={m} className={mode === m ? "on" : ""} onClick={() => setMode(m)}>
                  {m}
                </button>
              ))}
            </div>
            <button className="group-btn" onClick={() => toast("Group order link copied")}>
              <Icon name="group" size={17} /> Group Order
            </button>
          </div>
          <div className="fee-box">
            <span>
              <b>{mode === "Delivery" ? store.fee : "No fees"}</b>
              <span className="muted">
                pricing & fees <Icon name="info" size={12} />
              </span>
            </span>
            <i />
            <span>
              <b>{mode === "Delivery" ? `${store.eta} min` : `${Math.max(8, store.eta - 10)} min`}</b>
              <span className="muted">{mode === "Delivery" ? "delivery time" : `ready for pickup · ${store.distance} mi`}</span>
            </span>
          </div>
          {store.promo && (
            <div className="deal-card">
              <Icon name="tag" size={18} />
              <span>
                <b>{store.promo}</b>
                <span className="muted">{store.dashpass ? "DashPass exclusive · Applied at checkout" : "Applied at checkout"}</span>
              </span>
            </div>
          )}
        </section>

        <div className="cat-tabs">
          {store.categories.map((c) => (
            <button key={c} className={c === activeCat ? "on" : ""} onClick={() => jump(c)}>
              {c}
            </button>
          ))}
        </div>

        {!isGoods && featured.length > 0 && (
          <section className="menu-section">
            <h2>Featured Items</h2>
            <div className="h-scroll">
              {featured.map((i) => (
                <ProductTile key={i.id} store={store} item={i} />
              ))}
            </div>
          </section>
        )}

        {sections.map((sec) =>
          sec.items.length === 0 ? null : (
            <section key={sec.title} className="menu-section" data-cat={sec.title}>
              <h2>{sec.title}</h2>
              {isGoods ? (
                <div className="goods-grid">
                  {sec.items.map((i) => (
                    <ProductTile key={i.id} store={store} item={i} />
                  ))}
                </div>
              ) : (
                sec.items.map((i) => <MenuRow key={i.id} store={store} item={i} />)
              )}
            </section>
          ),
        )}
        <div className="bottom-pad" />
      </div>
      {totals.count > 0 && (
        <button className="view-cart" onClick={() => push({ kind: "cart", storeId: store.id })}>
          <span className="vc-count">{totals.count}</span>
          View cart
          <span>{money(totals.subtotal)}</span>
        </button>
      )}
    </div>
  );
}

function MenuRow({ store, item }: { store: Store; item: MenuItem }) {
  const { openSheet } = useApp();
  return (
    <button className="menu-row" onClick={() => openSheet({ kind: "item", storeId: store.id, itemId: item.id })}>
      <span className="mr-text">
        {item.badge && <span className="liked">{item.badge}</span>}
        <b>{item.name}</b>
        <span className="mr-desc">{item.description}</span>
        <span className="mr-price">
          {money(item.price)}
          {item.likes && (
            <span className="muted">
              {" "}
              · 👍 {item.likes}% ({Math.round(item.likes * 3.4)})
            </span>
          )}
        </span>
      </span>
      <span className="mr-thumb">
        <ItemThumb item={item} size={104} />
        <span className="plus-btn">
          <Icon name="plus" size={18} />
        </span>
      </span>
    </button>
  );
}

export function ItemSheet({ storeId, itemId }: { storeId: string; itemId: string }) {
  const store = storeById(storeId);
  const item = itemById(storeId, itemId);
  const { closeSheet, addToCart, toast } = useApp();
  const [qty, setQty] = useState(1);
  const [picked, setPicked] = useState<Record<string, string[]>>({});
  const [note, setNote] = useState("");
  const groups = item.options ?? [];
  const missing = groups.filter((g) => g.required && !(picked[g.id]?.length));
  const extras = groups.flatMap((g) => g.choices.filter((c) => picked[g.id]?.includes(c.id)));
  const unit = item.price + extras.reduce((n, c) => n + c.price, 0);

  const choose = (gid: string, cid: string, max: number) =>
    setPicked((p) => {
      const cur = p[gid] ?? [];
      if (max === 1) return { ...p, [gid]: [cid] };
      return { ...p, [gid]: cur.includes(cid) ? cur.filter((x) => x !== cid) : cur.length < max ? [...cur, cid] : cur };
    });

  return (
    <SheetFrame
      onClose={closeSheet}
      footer={
        <div className="item-foot">
          <span className="qty">
            <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">
              <Icon name="minus" size={18} />
            </button>
            <b>{qty}</b>
            <button onClick={() => setQty(qty + 1)} aria-label="Increase">
              <Icon name="plus" size={18} />
            </button>
          </span>
          <button
            className="btn red grow"
            disabled={missing.length > 0}
            onClick={() => {
              addToCart({ storeId, itemId, qty, unitPrice: unit, options: [...extras.map((e) => e.label), ...(note ? [`Note: ${note}`] : [])] });
              closeSheet();
              toast(`Added to cart · ${store.name}`);
            }}
          >
            {missing.length ? `Select ${missing[0].title.toLowerCase()}` : `Add to cart · ${money(unit * qty)}`}
          </button>
        </div>
      }
    >
      <div className="item-hero">
        <ItemThumb item={item} size={item.emoji ? 200 : 353} />
        <button className="circle-btn item-close" onClick={closeSheet} aria-label="Close">
          <Icon name="close" size={18} />
        </button>
      </div>
      <h2 className="item-name">{item.name}</h2>
      {item.badge && <span className="liked">{item.badge}</span>}
      <p className="item-desc">
        {money(item.price)} · {item.description}
      </p>
      {groups.map((g) => (
        <section key={g.id} className="opt-group">
          <div className="opt-head">
            <span>
              <b>{g.title}</b>
              <span className="muted">{g.max === 1 ? "Select 1" : `Select up to ${g.max}`}</span>
            </span>
            <span className={`req ${g.required ? (picked[g.id]?.length ? "done" : "") : "opt"}`}>
              {g.required ? (picked[g.id]?.length ? <Icon name="check" size={14} /> : "Required") : "Optional"}
            </span>
          </div>
          {g.choices.map((c) => {
            const on = picked[g.id]?.includes(c.id) ?? false;
            return (
              <button key={c.id} className="opt-row" onClick={() => choose(g.id, c.id, g.max)}>
                <span className={`${g.max === 1 ? "radio" : "checkbox"} ${on ? "on" : ""}`}>{on && g.max > 1 && <Icon name="check" size={13} />}</span>
                <span className="opt-label">{c.label}</span>
                {c.price > 0 && <span className="muted">+{money(c.price)}</span>}
              </button>
            );
          })}
        </section>
      ))}
      {store.vertical === "restaurant" && (
        <section className="opt-group">
          <div className="opt-head">
            <span>
              <b>Preferences</b>
              <span className="muted">Special instructions</span>
            </span>
            <span className="req opt">Optional</span>
          </div>
          <textarea className="note" rows={2} placeholder="Add a note (e.g. no onions)" value={note} onChange={(e) => setNote(e.target.value)} />
        </section>
      )}
    </SheetFrame>
  );
}
