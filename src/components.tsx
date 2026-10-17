import type { ReactNode } from "react";
import { useApp, type Tab } from "./app-context";
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
  { id: "home", label: "Home", icon: "home" },
  { id: "ads", label: "Yelp Ads", icon: "ads" },
  { id: "info", label: "Business Info", icon: "store" },
  { id: "inbox", label: "Inbox", icon: "inbox" },
  { id: "more", label: "More", icon: "menu" },
];

export function TabBar() {
  const { tab, setTab, leads, notifications } = useApp();
  const unread = leads.filter((l) => l.unread).length;
  const bell = notifications.filter((n) => !n.read).length;
  return (
    <nav className="tab-bar" aria-label="Main">
      {TABS.map((t) => {
        const badge = t.id === "inbox" ? unread : t.id === "more" ? bell : 0;
        return (
          <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)} aria-current={tab === t.id ? "page" : undefined}>
            <span className="tab-icon">
              <Icon name={t.icon} size={25} stroke={1.6} />
              {badge > 0 && <i className="tab-badge">{badge}</i>}
            </span>
            <span>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function NavHeader({ title, right, back = true }: { title: string; right?: ReactNode; back?: boolean }) {
  const { pop } = useApp();
  return (
    <header className="nav-header">
      <span className="nh-side">
        {back && (
          <button className="icon-btn" aria-label="Back" onClick={pop}>
            <Icon name="back" size={24} />
          </button>
        )}
      </span>
      <h1>{title}</h1>
      <span className="nh-side right">{right}</span>
    </header>
  );
}

export function Stars({ value, size = 18 }: { value: number; size?: number }) {
  return (
    <span className="stars" aria-label={`${value} stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="star-box" style={{ width: size, height: size, background: `linear-gradient(90deg, var(--star) ${fill * 100}%, #d6d6d6 ${fill * 100}%)` }}>
            <Icon name="star" size={size * 0.72} />
          </span>
        );
      })}
    </span>
  );
}

export function Card({ title, onMore, children, sub, badge }: { title: string; onMore?: () => void; children: ReactNode; sub?: string; badge?: number }) {
  return (
    <section className="card">
      <button className="card-head" onClick={onMore} disabled={!onMore}>
        <span>
          <span className="card-title">
            {title}
            {badge ? <i className="count-badge">{badge}</i> : null}
          </span>
          {sub && <span className="muted small block">{sub}</span>}
        </span>
        {onMore && <Icon name="arrow" size={22} />}
      </button>
      {children}
    </section>
  );
}

export function SheetFrame({ title, children }: { title: string; children: ReactNode }) {
  const { closeSheet } = useApp();
  return (
    <div className="sheet-wrap" onClick={closeSheet}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
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

export function Toggle({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button className="toggle-row" onClick={onChange} role="switch" aria-checked={on}>
      <span>{label}</span>
      <span className={`switch ${on ? "on" : ""}`}>
        <i />
      </span>
    </button>
  );
}

/** Line chart for two series, the way Home's Activity card draws views over leads. */
export function LineChart({ series, height = 150 }: { series: { values: number[]; color: string; fill: string }[]; height?: number }) {
  const w = 320;
  const max = Math.max(...series.flatMap((s) => s.values)) * 1.1;
  const pts = (values: number[]) => values.map((v, i) => `${(i / (values.length - 1)) * w},${height - (v / max) * height}`);
  return (
    <svg viewBox={`0 0 ${w} ${height + 18}`} className="line-chart" preserveAspectRatio="none">
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={height * f} y2={height * f} stroke="#eee" />
      ))}
      {series.map((s, i) => (
        <g key={i}>
          <polygon points={`0,${height} ${pts(s.values).join(" ")} ${w},${height}`} fill={s.fill} />
          <polyline points={pts(s.values).join(" ")} fill="none" stroke={s.color} strokeWidth="2" />
        </g>
      ))}
      {["10/1", "10/5", "10/10", "10/15", "10/20", "10/25", "10/30"].map((d, i) => (
        <text key={d} x={(i / 6) * (w - 20) + 4} y={height + 14} fontSize="10" fill="#8a8a8a">
          {d}
        </text>
      ))}
    </svg>
  );
}
