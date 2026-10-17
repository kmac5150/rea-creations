import type { ReactNode } from "react";
import { useApp, type Tab } from "./app-context";
import { VENUES, type MenuItem } from "./data";
import { Icon, type IconName } from "./icons";

export function StatusBar() {
  return (
    <div className="status-bar">
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
  { id: "menus", label: "Menus", icon: "menus" },
  { id: "checkins", label: "Check-Ins", icon: "checkins" },
  { id: "events", label: "Events", icon: "events" },
  { id: "insights", label: "Insights", icon: "insights" },
  { id: "more", label: "More", icon: "more" },
];

export function TabBar() {
  const { tab, setTab } = useApp();
  return (
    <nav className="tab-bar" aria-label="Main">
      {TABS.map((t) => (
        <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)} aria-current={tab === t.id ? "page" : undefined}>
          <span className="tab-icon">
            <Icon name={t.icon} size={26} stroke={1.5} />
          </span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

/** The light-blue strip every UTFB screen sits under: venue name with a pin, the rocket on the right. */
export function VenueBar({ left }: { left?: ReactNode }) {
  const { venueId, openSheet } = useApp();
  const venue = VENUES.find((v) => v.id === venueId) ?? VENUES[0];
  return (
    <div className="venue-bar">
      <span className="vb-left">{left}</span>
      <button className="vb-name" onClick={() => openSheet({ kind: "venues" })}>
        {venue.name}
        <Icon name="pin" size={17} />
      </button>
      <button className="vb-rocket" aria-label="Promote" onClick={() => openSheet({ kind: "rocket" })}>
        <Icon name="rocket" size={20} />
      </button>
    </div>
  );
}

export function PageTitle({ title, left, right }: { title: string; left?: ReactNode; right?: ReactNode }) {
  return (
    <div className="page-title">
      <span className="pt-side">{left}</span>
      <h1>{title}</h1>
      <span className="pt-side right">{right}</span>
    </div>
  );
}

export function BackButton() {
  const { pop } = useApp();
  return (
    <button className="icon-btn blue" aria-label="Back" onClick={pop}>
      <Icon name="back" size={24} />
    </button>
  );
}

export function Segmented<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="segmented" role="tablist">
      {options.map((o) => (
        <button key={o} role="tab" aria-selected={o === value} className={o === value ? "on" : ""} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

export function SearchField({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="search-field">
      <Icon name="search" size={18} />
      <input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

/** Untappd's bottle-cap rating: five gold caps, the last one partly filled. */
export function Caps({ rating, size = 18 }: { rating: number; size?: number }) {
  return (
    <span className="caps" aria-label={`${rating.toFixed(2)} rating`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="cap" style={{ width: size, height: size, background: `linear-gradient(90deg, var(--gold) ${fill * 100}%, #d8d8d8 ${fill * 100}%)` }} />
        );
      })}
      <b>{rating.toFixed(2)}</b>
    </span>
  );
}

export function Label({ label, size = 44 }: { label: MenuItem["label"]; size?: number }) {
  return (
    <span className="beer-label" style={{ width: size, height: size, background: label.bg, color: label.fg, fontSize: size * 0.32 }}>
      {label.mark}
    </span>
  );
}

export function SheetFrame({ title, children, onClose }: { title: string; children: ReactNode; onClose?: () => void }) {
  const { closeSheet } = useApp();
  const close = onClose ?? closeSheet;
  return (
    <div className="sheet-wrap" onClick={close}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <span className="grabber" />
        <div className="sheet-head">
          <h2>{title}</h2>
          <button className="icon-btn" aria-label="Close" onClick={close}>
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  );
}

export function OutlineButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button className="outline-btn" onClick={onClick}>
      {children}
    </button>
  );
}
