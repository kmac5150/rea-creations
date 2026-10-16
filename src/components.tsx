import type { ReactNode } from "react";
import { useApp, type Tab } from "./app-context";
import { dateParts, eventLine, performerById, venueById, type Event } from "./data";
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
  { id: "discover", label: "Discover", icon: "discover" },
  { id: "watchlist", label: "Watchlist", icon: "bookmark" },
  { id: "events", label: "My Events", icon: "ticket" },
  { id: "sell", label: "Sell", icon: "sell" },
  { id: "account", label: "My Account", icon: "user" },
];

export function TabBar() {
  const { tab, setTab } = useApp();
  return (
    <nav className="tab-bar" aria-label="Main">
      {TABS.map((t) => (
        <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)} aria-current={tab === t.id ? "page" : undefined}>
          <Icon name={t.id === "watchlist" && tab === t.id ? "bookmarkFill" : t.icon} size={24} />
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

export function DateBlock({ iso, accent }: { iso: string; accent?: string }) {
  const p = dateParts(iso);
  return (
    <span className="date-block" style={accent ? { borderColor: accent } : undefined}>
      <small>{p.mon}</small>
      <b>{Number(p.day)}</b>
    </span>
  );
}

export function ForYouCard({ ev }: { ev: Event }) {
  const { push } = useApp();
  const v = venueById(ev.venueId);
  const p = dateParts(ev.date);
  return (
    <article className="fy-card" onClick={() => push({ kind: "event", id: ev.id })} aria-label={ev.title}>
      <div className="fy-photo">
        <img src={performerById(ev.performerId).image} alt="" />
        <span className="fy-name">{performerById(ev.performerId).name}</span>
      </div>
      <div className="fy-body">
        <DateBlock iso={ev.date} />
        <span className="fy-meta">
          <span>
            {p.dow} - {ev.time}
          </span>
          <b>
            {v.city} - {v.name}
          </b>
        </span>
        <MoreButton eventId={ev.id} />
      </div>
    </article>
  );
}

export function MoreButton({ eventId }: { eventId: string }) {
  const { watchlist, toggleWatch } = useApp();
  const on = watchlist.includes(eventId);
  return (
    <button
      className="kebab"
      aria-label={on ? "Remove from Watchlist" : "Add to Watchlist"}
      onClick={(e) => {
        e.stopPropagation();
        toggleWatch(eventId);
      }}
    >
      <Icon name="more" size={20} />
    </button>
  );
}

export function EventRow({ ev, showPerformer = true }: { ev: Event; showPerformer?: boolean }) {
  const { push } = useApp();
  const v = venueById(ev.venueId);
  const p = dateParts(ev.date);
  return (
    <button className="event-row" onClick={() => push({ kind: "event", id: ev.id })}>
      <DateBlock iso={ev.date} />
      <span className="er-body">
        <small>
          {p.dow} • {ev.time}
        </small>
        <b>
          {v.city}, {v.state} • {v.name}
        </b>
        <span>{showPerformer ? ev.title : ev.tour ?? ev.title}</span>
        {ev.presale && <em className="presale-tag">{ev.presale}</em>}
      </span>
      <span className="find-btn">Find Tickets</span>
    </button>
  );
}

export function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {action && (
        <button onClick={onAction}>
          {action} <Icon name="chevronRight" size={14} />
        </button>
      )}
    </div>
  );
}

export function BackHeader({ title, subtitle, onBack, trailing }: { title?: string; subtitle?: string; onBack: () => void; trailing?: ReactNode }) {
  return (
    <header className="back-header">
      <button className="circle-outline" onClick={onBack} aria-label="Back">
        <Icon name="back" size={20} />
      </button>
      <span className="bh-title">
        {title && <b>{title}</b>}
        {subtitle && <small>{subtitle}</small>}
      </span>
      <span className="bh-trailing">{trailing}</span>
    </header>
  );
}

export function EventHeader({ ev, onBack }: { ev: Event; onBack: () => void }) {
  const { watchlist, toggleWatch } = useApp();
  const on = watchlist.includes(ev.id);
  return (
    <BackHeader
      title={ev.title}
      subtitle={eventLine(ev)}
      onBack={onBack}
      trailing={
        <>
          <button className="icon-btn" aria-label={on ? "Remove from Watchlist" : "Add to Watchlist"} onClick={() => toggleWatch(ev.id)}>
            <Icon name={on ? "bookmarkFill" : "bookmark"} size={22} />
          </button>
          <button className="icon-btn" aria-label="More options">
            <Icon name="more" size={20} />
          </button>
        </>
      }
    />
  );
}

export function Segmented<T extends string>({ value, options, onChange }: { value: T; options: { id: T; label: string; icon?: IconName; iconOn?: IconName }[]; onChange: (v: T) => void }) {
  return (
    <div className="segmented">
      {options.map((o) => (
        <button key={o.id} className={value === o.id ? "on" : ""} onClick={() => onChange(o.id)}>
          {o.icon && <Icon name={value === o.id && o.iconOn ? o.iconOn : o.icon} size={17} />}
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function SheetFrame({ children, onClose, footer, title, light = false }: { children: ReactNode; onClose: () => void; footer?: ReactNode; title?: string; light?: boolean }) {
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className={`sheet ${light ? "light" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grabber" />
        {title && (
          <div className="sheet-head">
            <h3>{title}</h3>
            <button className="icon-btn" onClick={onClose} aria-label="Close">
              <Icon name="close" size={22} />
            </button>
          </div>
        )}
        <div className="sheet-body">{children}</div>
        {footer && <div className="sheet-foot">{footer}</div>}
      </div>
    </div>
  );
}
