import type { ReactNode } from "react";
import { cartTotals, useApp, type Tab } from "./app-context";
import { ADDRESSES, money, type MenuItem, type Store } from "./data";
import { Icon, type IconName } from "./icons";

export function StatusBar({ light = false }: { light?: boolean }) {
  return (
    <div className={`status-bar ${light ? "light" : ""}`}>
      <span className="sb-time">9:41</span>
      <span className="sb-right">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.3A10.2 10.2 0 0 0 8 .6 10.2 10.2 0 0 0 .8 3.5L2 4.8a8.4 8.4 0 0 1 6-2.4Zm0 3.5c1.4 0 2.6.5 3.6 1.4l1.2-1.3A7 7 0 0 0 8 4.1a7 7 0 0 0-4.8 1.9l1.2 1.3c1-.9 2.2-1.4 3.6-1.4Zm0 3.4c.5 0 1 .2 1.3.5L8 11.2 6.7 9.8c.3-.3.8-.5 1.3-.5Z" />
        </svg>
        <span className="sb-battery">
          <span />
        </span>
      </span>
    </div>
  );
}

const TABS: { id: Tab; label: string; icon: IconName }[] = [
  { id: "home", label: "Home", icon: "dash" },
  { id: "grocery", label: "Grocery", icon: "grocery" },
  { id: "retail", label: "Retail", icon: "retail" },
  { id: "orders", label: "Orders", icon: "orders" },
  { id: "browse", label: "Browse", icon: "browse" },
];

export function TabBar() {
  const { tab, setTab, order } = useApp();
  return (
    <nav className="tab-bar" aria-label="Main">
      {TABS.map((t) => (
        <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)} aria-current={tab === t.id ? "page" : undefined}>
          <span className="tab-icon">
            <Icon name={t.icon} size={t.id === "home" ? 27 : 23} />
            {t.id === "orders" && order && <i className="tab-dot" />}
          </span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

export function TopHeader({ title }: { title?: string }) {
  const { openSheet, push, cart, addressId } = useApp();
  const count = cartTotals(cart).count;
  const address = ADDRESSES.find((a) => a.id === addressId) ?? ADDRESSES[0];
  return (
    <header className="top-header">
      {title ? (
        <h1 className="hub-title">{title}</h1>
      ) : (
        <button className="address-btn" onClick={() => openSheet({ kind: "address" })}>
          <Icon name="pin" size={19} />
          <b>{address.label}</b>
          <Icon name="chevronDown" size={16} />
        </button>
      )}
      <span className="header-actions">
        <button className="icon-btn" aria-label="Account" onClick={() => push({ kind: "account" })}>
          <Icon name="user" size={24} />
        </button>
        <button className="icon-btn" aria-label="Notifications" onClick={() => push({ kind: "notifications" })}>
          <Icon name="bell" size={24} />
          <i className="dot" />
        </button>
        <button className="icon-btn" aria-label="Cart" onClick={() => openSheet({ kind: "carts" })}>
          <Icon name="cart" size={24} />
          {count > 0 && <span className="cart-count">{count}</span>}
        </button>
      </span>
    </header>
  );
}

export function SearchPill({ placeholder = "Search DoorDash", onClick }: { placeholder?: string; onClick?: () => void }) {
  return (
    <div className="search-row">
      <button className="search-pill" onClick={onClick}>
        <Icon name="search" size={20} />
        <span>{placeholder}</span>
      </button>
      <button className="round-btn" aria-label="Map view">
        <Icon name="map" size={20} />
      </button>
    </div>
  );
}

export function StoreLogo({ store, size = 44 }: { store: Store; size?: number }) {
  return (
    <span className="store-logo" style={{ width: size, height: size, background: store.logoBg, color: store.logoFg, fontSize: size * (store.logoText.length > 2 ? 0.28 : 0.38) }}>
      {store.logoText}
    </span>
  );
}

export function DashPassMark({ size = 14 }: { size?: number }) {
  return <Icon name="dashpass" size={size} className="dp-mark" />;
}

export function Rating({ store }: { store: Store }) {
  return (
    <span className="rating">
      {store.rating.toFixed(1)} <Icon name="star" size={12} /> <span className="muted">({store.reviews})</span>
    </span>
  );
}

export function StoreMeta({ store }: { store: Store }) {
  return (
    <span className="store-meta">
      {store.distance} mi · {store.eta} min · {store.fee}
    </span>
  );
}

export function FavButton({ storeId }: { storeId: string }) {
  const { favorites, toggleFavorite } = useApp();
  const on = favorites.includes(storeId);
  return (
    <button
      className={`fav-btn ${on ? "on" : ""}`}
      aria-label={on ? "Remove from saved stores" : "Save store"}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(storeId);
      }}
    >
      <Icon name={on ? "heartFill" : "heart"} size={20} />
    </button>
  );
}

export function StoreCard({ store, wide = false }: { store: Store; wide?: boolean }) {
  const { push } = useApp();
  return (
    <article className={`store-card ${wide ? "wide" : ""}`} onClick={() => push({ kind: "store", id: store.id })} aria-label={store.name}>
      <div className="sc-photo">
        <img src={store.hero} alt="" loading="lazy" />
        {store.promo && (
          <span className="promo-chip">
            {store.dashpass && <DashPassMark size={13} />}
            {store.promo}
          </span>
        )}
        {store.vertical !== "restaurant" && (
          <span className="sc-logo">
            <StoreLogo store={store} size={56} />
          </span>
        )}
      </div>
      <div className="sc-body">
        <div className="sc-name-row">
          <span className="sc-name">
            {store.dashpass && <DashPassMark />}
            {store.name}
          </span>
          <FavButton storeId={store.id} />
        </div>
        <StoreMeta store={store} />
        <Rating store={store} />
      </div>
    </article>
  );
}

export function StoreRow({ store }: { store: Store }) {
  const { push } = useApp();
  return (
    <button className="store-row" onClick={() => push({ kind: "store", id: store.id })}>
      <StoreLogo store={store} size={56} />
      <span className="sr-body">
        <b>
          {store.name} {store.dashpass && <DashPassMark />}
        </b>
        <span className="muted">
          {store.rating.toFixed(1)} ★ ({store.reviews}) · {store.cuisine[0]} · {store.priceLevel}
        </span>
        <span className="muted">
          {store.eta} min · {store.fee}
        </span>
      </span>
      {store.promo && <span className="sr-promo">{store.promo}</span>}
    </button>
  );
}

export function SectionHeader({ title, sub, onMore }: { title: string; sub?: ReactNode; onMore?: () => void }) {
  return (
    <div className="section-head">
      <span>
        <h2>{title}</h2>
        {sub && <span className="section-sub">{sub}</span>}
      </span>
      {onMore && (
        <button className="arrow-btn" onClick={onMore} aria-label={`See all ${title}`}>
          <Icon name="arrowRight" size={18} />
        </button>
      )}
    </div>
  );
}

export function ItemThumb({ item, size }: { item: MenuItem; size: number }) {
  return item.emoji ? (
    <span className="emoji-thumb" style={{ width: size, height: size, fontSize: size * 0.56 }}>
      {item.emoji}
    </span>
  ) : (
    <img className="photo-thumb" src={item.image} alt="" style={{ width: size, height: size }} loading="lazy" />
  );
}

export function ProductTile({ store, item }: { store: Store; item: MenuItem }) {
  const { openSheet, addToCart, cart, setQty, toast } = useApp();
  const line = cart.find((l) => l.storeId === store.id && l.itemId === item.id && l.options.length === 0);
  return (
    <div className="product-tile" onClick={() => openSheet({ kind: "item", storeId: store.id, itemId: item.id })}>
      <div className="pt-thumb">
        <ItemThumb item={item} size={128} />
        {line ? (
          <span className="pt-stepper" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setQty(line.key, line.qty - 1)} aria-label="Decrease">
              <Icon name={line.qty === 1 ? "trash" : "minus"} size={15} />
            </button>
            <b>{line.qty}</b>
            <button onClick={() => setQty(line.key, line.qty + 1)} aria-label="Increase">
              <Icon name="plus" size={15} />
            </button>
          </span>
        ) : (
          <button
            className="plus-btn"
            aria-label={`Add ${item.name}`}
            onClick={(e) => {
              e.stopPropagation();
              if (item.options?.some((o) => o.required)) {
                openSheet({ kind: "item", storeId: store.id, itemId: item.id });
                return;
              }
              addToCart({ storeId: store.id, itemId: item.id, qty: 1, unitPrice: item.price, options: [] });
              toast(`Added to cart · ${store.name}`);
            }}
          >
            <Icon name="plus" size={18} />
          </button>
        )}
      </div>
      <b className="pt-name">{item.name}</b>
      <span className="pt-price">{money(item.price)}</span>
      {item.emoji && <span className="muted pt-size">{item.description}</span>}
    </div>
  );
}

export function Pill({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button className={`pill ${active ? "active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

export function SheetFrame({ children, onClose, footer, title }: { children: ReactNode; onClose: () => void; footer?: ReactNode; title?: string }) {
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grabber" />
        {title && (
          <div className="sheet-head">
            <button className="icon-btn" onClick={onClose} aria-label="Close">
              <Icon name="close" size={22} />
            </button>
            <h3>{title}</h3>
            <span />
          </div>
        )}
        <div className="sheet-body">{children}</div>
        {footer && <div className="sheet-foot">{footer}</div>}
      </div>
    </div>
  );
}

export function BackHeader({ title, subtitle, onBack, trailing }: { title?: string; subtitle?: string; onBack: () => void; trailing?: ReactNode }) {
  return (
    <header className="back-header">
      <button className="icon-btn" onClick={onBack} aria-label="Back">
        <Icon name="back" size={22} />
      </button>
      <span className="bh-title">
        {subtitle && <small>{subtitle}</small>}
        {title && <b>{title}</b>}
      </span>
      <span className="bh-trailing">{trailing}</span>
    </header>
  );
}
