import { useState, type ReactNode } from "react";
import { useApp, type Tab } from "./app-context";
import { formatPrice, typeLabel, type Agent, type Listing } from "./data";
import { Icon, type IconName } from "./icons";

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`status-bar ${dark ? "dark" : ""}`}>
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
  { id: "search", label: "Search", icon: "search" },
  { id: "updates", label: "Updates", icon: "updates" },
  { id: "favorites", label: "Favorites", icon: "heartFill" },
  { id: "plan", label: "Plan", icon: "plan" },
  { id: "inbox", label: "Inbox", icon: "inbox" },
];

export function TabBar({ badges }: { badges: Partial<Record<Tab, number>> }) {
  const { tab, setTab } = useApp();
  return (
    <nav className="tab-bar" aria-label="Main">
      {TABS.map((t) => (
        <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)} aria-current={tab === t.id ? "page" : undefined}>
          <span className="tab-icon">
            <Icon name={t.icon} size={23} />
            {badges[t.id] ? <span className="tab-badge">{badges[t.id]}</span> : null}
          </span>
          <span className="tab-label">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

export function Avatar({ agent, size = 44 }: { agent: Pick<Agent, "name" | "tint">; size?: number }) {
  const initials = agent.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
  return (
    <span className="avatar" style={{ width: size, height: size, background: agent.tint, fontSize: size * 0.38 }}>
      {initials}
    </span>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  variant = "pill",
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  variant?: "pill" | "underline";
}) {
  return (
    <div className={`segmented ${variant}`} role="tablist">
      {options.map((o) => (
        <button key={o} role="tab" aria-selected={o === value} className={o === value ? "on" : ""} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

export function SheetFrame({
  title,
  onClose,
  children,
  footer,
  leading,
  full = false,
}: {
  title?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  leading?: ReactNode;
  full?: boolean;
}) {
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className={`sheet ${full ? "full" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grabber" />
        {title !== undefined && (
          <div className="sheet-head">
            <span className="sheet-lead">{leading}</span>
            <h3>{title}</h3>
            <button className="icon-btn" onClick={onClose} aria-label="Close">
              <Icon name="close" size={20} />
            </button>
          </div>
        )}
        <div className="sheet-body">{children}</div>
        {footer && <div className="sheet-foot">{footer}</div>}
      </div>
    </div>
  );
}

export function HeartButton({ id, variant = "overlay" }: { id: string; variant?: "overlay" | "plain" }) {
  const { saved, toggleSave } = useApp();
  const on = saved.includes(id);
  return (
    <button
      className={`heart-btn ${variant} ${on ? "on" : ""}`}
      aria-label={on ? "Unsave home" : "Save home"}
      onClick={(e) => {
        e.stopPropagation();
        toggleSave(id);
      }}
    >
      <Icon name={on ? "heartFill" : "heart"} size={variant === "overlay" ? 30 : 24} strokeWidth={2.2} />
    </button>
  );
}

export function PhotoStrip({ photos, height, badge, id, rounded = true }: { photos: string[]; height: number; badge?: string; id?: string; rounded?: boolean }) {
  const [index, setIndex] = useState(0);
  return (
    <div className={`photo-strip ${rounded ? "rounded" : ""}`} style={{ height }}>
      <div
        className="photo-track"
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
      >
        {photos.map((p, i) => (
          <img key={p + i} src={p} alt="" loading="lazy" draggable={false} />
        ))}
      </div>
      {badge && <span className={`photo-badge ${badgeTone(badge)}`}>{badge}</span>}
      {id && <HeartButton id={id} />}
      <span className="photo-dots">
        {photos.slice(0, 5).map((p, i) => (
          <i key={p + i} className={i === Math.min(index, 4) ? "on" : ""} />
        ))}
      </span>
    </div>
  );
}

export function badgeTone(badge: string) {
  if (badge.startsWith("Open")) return "tone-open";
  if (badge.startsWith("Price cut")) return "tone-cut";
  if (badge.startsWith("New")) return "tone-new";
  return "";
}

export function Specs({ l, compact = false }: { l: Listing; compact?: boolean }) {
  return (
    <div className={`specs ${compact ? "compact" : ""}`}>
      <span>
        <b>{l.beds}</b> {compact ? "bds" : "bds"}
      </span>
      <i />
      <span>
        <b>{l.baths}</b> ba
      </span>
      <i />
      <span>
        <b>{l.sqft.toLocaleString()}</b> sqft
      </span>
      {!compact && (
        <>
          <i />
          <span>{typeLabel(l)}</span>
        </>
      )}
    </div>
  );
}

export function ListingCard({ l }: { l: Listing }) {
  const { push } = useApp();
  return (
    <article className="listing-card" onClick={() => push({ kind: "home", id: l.id })} aria-label={`${l.street}, ${l.city}, ${l.state} ${l.zip}`}>
      <PhotoStrip photos={l.photos} height={226} badge={l.badge} id={l.id} />
      <div className="lc-body">
        <div className="lc-row">
          <span className="lc-price">{formatPrice(l)}</span>
          <button className="lc-more" aria-label="More options" onClick={(e) => e.stopPropagation()}>
            <Icon name="more" size={20} />
          </button>
        </div>
        <Specs l={l} />
        <div className="lc-addr">
          {l.street}, {l.city}, {l.state} {l.zip}
        </div>
        <div className="lc-broker">LISTING BY: {l.agent.brokerage.toUpperCase()}</div>
      </div>
    </article>
  );
}

export function MiniCard({ l, onClose }: { l: Listing; onClose?: () => void }) {
  const { push } = useApp();
  return (
    <div className="mini-card" onClick={() => push({ kind: "home", id: l.id })}>
      <div className="mini-photo">
        <img src={l.photos[0]} alt="" />
        <HeartButton id={l.id} />
      </div>
      <div className="mini-body">
        {l.badge && <span className={`mini-badge ${badgeTone(l.badge)}`}>{l.badge}</span>}
        <div className="mini-price">{formatPrice(l)}</div>
        <Specs l={l} compact />
        <div className="mini-addr">{l.street}</div>
        <div className="mini-addr muted">
          {l.city}, {l.state} {l.zip}
        </div>
      </div>
      {onClose && (
        <button
          className="mini-close"
          aria-label="Dismiss"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <Icon name="close" size={14} />
        </button>
      )}
    </div>
  );
}

export function NavHeader({ title, onBack, trailing }: { title?: string; onBack: () => void; trailing?: ReactNode }) {
  return (
    <header className="nav-header">
      <button className="glass-btn back-pill" onClick={onBack} aria-label="Back">
        <Icon name="back" size={20} />
        <span>Back</span>
      </button>
      <span className="nav-title">{title}</span>
      <span className="nav-trailing">{trailing}</span>
    </header>
  );
}

export function PlanIllustration() {
  return (
    <svg viewBox="0 0 360 230" className="plan-illus" aria-hidden>
      <path d="M0 150c60-30 120-40 190-30s120 10 170-10v120H0Z" fill="#fde7d9" />
      <circle cx="78" cy="58" r="22" fill="#f5a524" />
      <rect x="150" y="70" width="170" height="118" fill="#e8715a" />
      <path d="M140 76 235 18l95 58Z" fill="#2a2f3a" />
      <rect x="296" y="30" width="16" height="34" fill="#e8715a" />
      <rect x="166" y="94" width="34" height="38" fill="#fff" />
      <path d="M166 113h34M183 94v38" stroke="#e8715a" strokeWidth="3" />
      <rect x="272" y="94" width="34" height="38" fill="#fff" />
      <path d="M272 113h34M289 94v38" stroke="#e8715a" strokeWidth="3" />
      <path d="M215 188v-60a20 20 0 0 1 40 0v60Z" fill="#2d6cdf" />
      <path d="M222 188v-56a13 13 0 0 1 26 0v56Z" fill="#7fb0ff" />
      <rect x="205" y="188" width="60" height="8" fill="#9b3d2c" />
      <rect x="198" y="196" width="74" height="8" fill="#9b3d2c" />
      <path d="M300 192c0-22 6-30 6-30s6 8 6 30Z" fill="#2f6b4f" />
      <rect x="296" y="190" width="20" height="14" fill="#c4572f" />
      <path d="M40 200c0-26 10-40 10-40s4 18 14 22c4-12 14-16 14-16s-2 22-8 34Z" fill="#2f6b4f" />
      <path d="M60 196h96l-10-26H82Z" fill="#fff" stroke="#2a2f3a" strokeWidth="3" />
      <rect x="52" y="194" width="114" height="18" rx="7" fill="#2a2f3a" />
      <rect x="90" y="176" width="22" height="14" fill="#a8d1ff" />
      <rect x="116" y="176" width="24" height="14" fill="#a8d1ff" />
      <circle cx="78" cy="214" r="10" fill="#2a2f3a" />
      <circle cx="78" cy="214" r="4" fill="#ddd" />
      <circle cx="142" cy="214" r="10" fill="#2a2f3a" />
      <circle cx="142" cy="214" r="4" fill="#ddd" />
    </svg>
  );
}

export function AgentIllustration() {
  return (
    <svg viewBox="0 0 200 130" className="agent-illus" aria-hidden>
      <path d="M20 40c10-28 60-40 100-30s70 30 60 70-60 40-100 36S10 70 20 40Z" fill="#fde7d9" />
      <circle cx="62" cy="42" r="14" fill="#7a4a32" />
      <path d="M50 30c4-12 26-12 28 2-6-4-16-6-28-2Z" fill="#1d1d1f" />
      <path d="M40 104c0-30 10-46 22-46s24 14 24 46Z" fill="#f2a7a0" />
      <path d="M48 70c8 10 22 10 30 2" stroke="#fff" strokeWidth="3" fill="none" />
      <circle cx="132" cy="44" r="14" fill="#e9b58f" />
      <path d="M118 38c2-14 26-16 28 0-8-6-18-6-28 0Z" fill="#b5482a" />
      <path d="M108 104c0-32 10-46 24-46s26 14 26 46Z" fill="#2850c8" />
      <path d="M128 60v20l4 6 4-6V60" fill="#fff" />
      <rect x="104" y="64" width="22" height="28" rx="2" fill="#fff" transform="rotate(-8 115 78)" />
      <path d="M20 104h170l-12 16H32Z" fill="#e38b2c" />
      <rect x="66" y="88" width="40" height="18" rx="2" fill="#1d1d1f" />
    </svg>
  );
}
