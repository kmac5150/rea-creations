import type { ReactNode } from "react";
import { useApp, type Tab } from "./app-context";
import { ACTIVE_STATUSES, TODAY_INDEX, TODAY_LABELS, type Guest, type ResoStatus, type Tag } from "./data";
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
  { id: "book", label: "Reservations", icon: "book" },
  { id: "waitlist", label: "Waitlist", icon: "waitlist" },
  { id: "floor", label: "Floor Plan", icon: "floor" },
  { id: "guests", label: "Guests", icon: "guests" },
  { id: "stats", label: "Stats", icon: "stats" },
];

export function TabBar() {
  const { tab, setTab, waitlist } = useApp();
  return (
    <nav className="tab-bar" aria-label="Main">
      {TABS.map((t) => (
        <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)} aria-current={tab === t.id ? "page" : undefined}>
          <span className="tab-icon">
            <Icon name={t.icon} size={24} stroke={1.6} />
            {t.id === "waitlist" && waitlist.length > 0 && <i className="tab-badge">{waitlist.length}</i>}
          </span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

/** The dark date + shift bar that sits on top of every book view, with parties and covers on the right. */
export function ShiftHeader({ children }: { children?: ReactNode }) {
  const { day, setDay, shift, openSheet, shiftResos } = useApp();
  const booked = shiftResos.filter((r) => r.status !== "Cancelled" && r.status !== "No-show");
  const covers = booked.reduce((s, r) => s + r.size, 0);
  return (
    <header className="shift-head">
      <div className="sh-row">
        <button className="icon-btn" aria-label="Menu" onClick={() => openSheet({ kind: "drawer" })}>
          <Icon name="menu" size={24} />
        </button>
        <div className="sh-date">
          <b>{TODAY_LABELS[day]}</b>
          <button className="sh-shift" onClick={() => openSheet({ kind: "shift" })}>
            {shift}
            <Icon name="chevD" size={16} stroke={2.2} />
          </button>
        </div>
        <span className="sh-arrows">
          <button className="icon-btn sm" aria-label="Previous day" disabled={day === 0} onClick={() => setDay(day - 1)}>
            <Icon name="chevL" size={20} stroke={2.2} />
          </button>
          <button className="icon-btn sm" aria-label="Next day" disabled={day === TODAY_LABELS.length - 1} onClick={() => setDay(day + 1)}>
            <Icon name="chevR" size={20} stroke={2.2} />
          </button>
        </span>
      </div>
      <div className="sh-counts">
        {day !== TODAY_INDEX && (
          <button className="today-link" onClick={() => setDay(TODAY_INDEX)}>
            Back to today
          </button>
        )}
        <span className="sh-count" aria-label={`${booked.length} parties`}>
          <Icon name="parties" size={18} /> {booked.length}
        </span>
        <span className="sh-count" aria-label={`${covers} covers`}>
          <Icon name="cover" size={18} /> {covers}
        </span>
      </div>
      {children}
    </header>
  );
}

export function NavHeader({ title, right, light = false }: { title: string; right?: ReactNode; light?: boolean }) {
  const { pop } = useApp();
  return (
    <header className={`nav-header ${light ? "light" : ""}`}>
      <button className="icon-btn" aria-label="Back" onClick={pop}>
        <Icon name="chevL" size={24} stroke={2.2} />
      </button>
      <h1>{title}</h1>
      <span className="nh-right">{right}</span>
    </header>
  );
}

export function SheetFrame({ title, children, dark = false }: { title: string; children: ReactNode; dark?: boolean }) {
  const { closeSheet } = useApp();
  return (
    <div className="sheet-wrap" onClick={closeSheet}>
      <div className={`sheet ${dark ? "dark" : ""}`} onClick={(e) => e.stopPropagation()} role="dialog" aria-label={title}>
        <span className="grabber" />
        <div className="sheet-head">
          <h2>{title}</h2>
          <button className="icon-btn" aria-label="Close" onClick={closeSheet}>
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  );
}

const STATUS_LOOK: Record<ResoStatus, { cls: string; icon: IconName }> = {
  Booked: { cls: "st-booked", icon: "book" },
  Confirmed: { cls: "st-confirmed", icon: "check" },
  "Left message": { cls: "st-message", icon: "voicemail" },
  Late: { cls: "st-late", icon: "clock" },
  "Partially arrived": { cls: "st-partial", icon: "parties" },
  Arrived: { cls: "st-arrived", icon: "walk" },
  Seated: { cls: "st-seated", icon: "table" },
  Finished: { cls: "st-finished", icon: "check" },
  "No-show": { cls: "st-noshow", icon: "close" },
  Cancelled: { cls: "st-cancel", icon: "close" },
};

export function StatusIcon({ status }: { status: ResoStatus }) {
  const look = STATUS_LOOK[status];
  return (
    <span className={`status-icon ${look.cls}`} title={status} aria-label={status}>
      <Icon name={look.icon} size={18} stroke={2} />
    </span>
  );
}

export function StatusPill({ status }: { status: ResoStatus }) {
  return <span className={`status-pill ${STATUS_LOOK[status].cls}`}>{status}</span>;
}

const TAG_ICON: Record<Tag, IconName> = {
  VIP: "star",
  Birthday: "cake",
  Anniversary: "cake",
  Allergy: "allergy",
  Booth: "booth",
  Patio: "table",
  Regular: "starOutline",
  "Wine club": "star",
};

export function TagIcons({ tags }: { tags: Tag[] }) {
  return (
    <span className="tag-icons">
      {tags.slice(0, 3).map((t) => (
        <span key={t} className={`ti ti-${t.replace(/\s/g, "")}`} title={t}>
          <Icon name={TAG_ICON[t]} size={15} stroke={2} />
        </span>
      ))}
    </span>
  );
}

export function TagChip({ tag }: { tag: Tag }) {
  return (
    <span className={`tag-chip tc-${tag.replace(/\s/g, "")}`}>
      <Icon name={TAG_ICON[tag]} size={14} stroke={2} />
      {tag}
    </span>
  );
}

export function Avatar({ guest, size = 44 }: { guest: Guest; size?: number }) {
  return guest.photo ? (
    <img className="avatar" src={guest.photo} alt="" style={{ width: size, height: size }} />
  ) : (
    <span className="avatar initials" style={{ width: size, height: size, fontSize: size * 0.36 }}>
      {guest.first[0]}
      {guest.last[0]}
    </span>
  );
}

export function TableBox({ table, status }: { table?: string; status: ResoStatus }) {
  const seated = status === "Seated";
  return (
    <span className={`table-box ${seated ? "seated" : ""} ${table ? "" : "empty"}`}>
      {table ? <b>{table}</b> : <Icon name="table" size={18} />}
    </span>
  );
}

export function isActive(status: ResoStatus) {
  return ACTIVE_STATUSES.includes(status);
}

export function Segmented<T extends string>({ value, options, onChange, dark = false }: { value: T; options: readonly T[]; onChange: (v: T) => void; dark?: boolean }) {
  return (
    <div className={`segmented ${dark ? "dark" : ""}`} role="tablist">
      {options.map((o) => (
        <button key={o} role="tab" aria-selected={value === o} className={value === o ? "on" : ""} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}
