import { useApp } from "../app-context";
import { HeartButton, badgeTone } from "../components";
import { LISTINGS, formatPrice, type Listing } from "../data";
import { Icon } from "../icons";

const forSale = LISTINGS.filter((l) => l.status === "For sale");

const ROWS: { title: string; sub: string; items: Listing[]; tags?: string[] }[] = [
  {
    title: "Homes For You in Nashville, TN",
    sub: "For Sale, $300K - $600K, House",
    items: forSale.filter((l) => l.price <= 600000),
    tags: ["Landscaped yard", "", "Open floorplan"],
  },
  {
    title: "Price cuts in your saved search",
    sub: "Nashville, TN · Last 7 days",
    items: forSale.filter((l) => l.badge?.startsWith("Price cut")).concat(forSale.slice(6, 9)),
  },
  {
    title: "Selling Soon Homes in East Nashville",
    sub: "For Sale, $250K - $700K, House",
    items: forSale.slice(3, 12),
    tags: ["Detached garage", "Open floorplan"],
  },
  {
    title: "Open houses this weekend",
    sub: "Within 10 mi of Nashville, TN",
    items: forSale.filter((l) => l.badge?.startsWith("Open")).concat(forSale.slice(0, 3)),
  },
  {
    title: "Rentals you might like",
    sub: "For Rent, Up to $4,500",
    items: LISTINGS.filter((l) => l.status === "For rent"),
  },
];

export function UpdatesScreen() {
  const { push, setTab } = useApp();
  return (
    <div className="screen tab-screen">
      <header className="center-header">
        <span />
        <h2>Updates</h2>
        <button className="icon-btn" aria-label="Notification settings">
          <Icon name="more" size={20} />
        </button>
      </header>
      <div className="tab-scroll">
        <h1 className="large-title">Recommendations</h1>
        <button className="update-banner" onClick={() => setTab("inbox")}>
          <span className="ub-icon">
            <Icon name="bell" size={20} />
          </span>
          <span>
            <b>12 new homes</b> match your saved search “Nashville, TN”
          </span>
          <Icon name="chevronRight" size={18} />
        </button>
        {ROWS.map((row) => (
          <section key={row.title} className="rec-row">
            <button className="rec-head" onClick={() => setTab("search")}>
              <span>
                <b>{row.title}</b>
                <span>{row.sub}</span>
              </span>
              <Icon name="chevronRight" size={18} />
            </button>
            <div className="rec-scroll">
              {row.items.map((l, i) => (
                <article key={l.id + i} className="rec-card" onClick={() => push({ kind: "home", id: l.id })}>
                  <div className="rec-photo">
                    <img src={l.photos[0]} alt="" loading="lazy" />
                    {row.tags?.[i] ? (
                      <span className="photo-badge">{row.tags[i]}</span>
                    ) : l.badge ? (
                      <span className={`photo-badge ${badgeTone(l.badge)}`}>{l.badge}</span>
                    ) : null}
                    <HeartButton id={l.id} />
                  </div>
                  <b>{formatPrice(l)}</b>
                  <span>
                    {l.beds} bds, {l.baths} ba, {l.sqft.toLocaleString()} sqft
                  </span>
                  <span className="muted">
                    {l.street}, {l.city}
                  </span>
                </article>
              ))}
            </div>
          </section>
        ))}
        <div className="tab-bottom-pad" />
      </div>
    </div>
  );
}
