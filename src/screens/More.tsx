import { useApp, type Route } from "../app-context";
import { Icon, type IconName } from "../icons";

const ROWS: { icon: IconName; label: string; route?: Route; toast?: string; badge?: "bell" | "reviews" }[] = [
  { icon: "star", label: "Reviews", route: { kind: "reviews" }, badge: "reviews" },
  { icon: "bell", label: "Notifications", route: { kind: "notifications" }, badge: "bell" },
  { icon: "dollar", label: "Upgrade Package", route: { kind: "upgrade" } },
  { icon: "table", label: "Yelp Guest Manager", route: { kind: "guestManager" } },
  { icon: "trend", label: "Check-in offers", toast: "Check-in offer set: free mimosa with brunch" },
  { icon: "gear", label: "Account settings", toast: "Account settings open on biz.yelp.com" },
  { icon: "help", label: "Support Center", toast: "Support: (877) 767-9357" },
];

export function MoreScreen() {
  const { push, toast, biz, notifications, reviews } = useApp();
  const counts = { bell: notifications.filter((n) => !n.read).length, reviews: reviews.filter((r) => !r.reply).length };
  return (
    <div className="screen">
      <header className="nav-header">
        <span className="nh-side" />
        <h1>More</h1>
        <span className="nh-side" />
      </header>
      <div className="scroll">
        <div className="pad account">
          <img src="/img/room-1.jpg" alt="" />
          <span>
            <b>{biz.name}</b>
            <span className="muted small block">Owner · Claimed business</span>
          </span>
        </div>
        <ul className="list">
          {ROWS.map((r) => (
            <li key={r.label}>
              <button className="list-row" onClick={() => (r.route ? push(r.route) : r.toast && toast(r.toast))}>
                <span className="recent-icon">
                  <Icon name={r.icon} size={18} />
                </span>
                <span className="lr-main">
                  <b>{r.label}</b>
                </span>
                {r.badge && counts[r.badge] > 0 && <i className="count-badge">{counts[r.badge]}</i>}
                <Icon name="chevron" size={18} />
              </button>
            </li>
          ))}
        </ul>
        <p className="muted small center pad top-gap">Yelp for Business 26.42.0 · demo data</p>
      </div>
    </div>
  );
}
