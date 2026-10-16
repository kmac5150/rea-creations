import { useState } from "react";
import { useApp } from "../app-context";
import { DashPassMark, Pill, SearchPill, SectionHeader, StoreCard, StoreRow, TopHeader } from "../components";
import { CATEGORIES, STORES, type Store } from "../data";
import { Icon } from "../icons";

type Filter = "DashPass" | "Pickup" | "Ratings" | "Under 30 min" | "Offers";

const FILTERS: Filter[] = ["DashPass", "Pickup", "Ratings", "Under 30 min", "Offers"];

function applyFilters(list: Store[], active: Filter[]) {
  return list.filter((s) =>
    active.every((f) => {
      switch (f) {
        case "DashPass":
          return s.dashpass;
        case "Pickup":
          return s.distance < 1.5;
        case "Ratings":
          return s.rating >= 4.7;
        case "Under 30 min":
          return s.eta < 30;
        case "Offers":
          return Boolean(s.promo);
        default: {
          const never: never = f;
          return never;
        }
      }
    }),
  );
}

export function HomeScreen() {
  const { push, setTab, order } = useApp();
  const [filters, setFilters] = useState<Filter[]>([]);
  const toggle = (f: Filter) => setFilters((a) => (a.includes(f) ? a.filter((x) => x !== f) : [...a, f]));
  const restaurants = applyFilters(
    STORES.filter((s) => s.vertical === "restaurant"),
    filters,
  );
  const grocery = applyFilters(
    STORES.filter((s) => s.vertical === "grocery"),
    filters,
  );
  const deals = applyFilters(
    STORES.filter((s) => s.dashpass && s.promo),
    filters,
  );

  return (
    <div className="screen">
      <div className="sticky-top">
        <TopHeader />
        <SearchPill onClick={() => setTab("browse")} />
      </div>
      <div className="scroll">
        <div className="cat-row">
          {CATEGORIES.map((c) => (
            <button key={c.id} className="cat" onClick={() => push({ kind: "category", label: c.label })}>
              <span className="cat-emoji">{c.emoji}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
        <div className="pill-row">
          {FILTERS.map((f) => (
            <Pill key={f} active={filters.includes(f)} onClick={() => toggle(f)}>
              {f === "DashPass" && <DashPassMark />}
              {f === "Pickup" && <Icon name="walk" size={15} />}
              {f === "Ratings" && <Icon name="star" size={14} />}
              {f}
              {f === "Ratings" && <Icon name="chevronDown" size={14} />}
            </Pill>
          ))}
        </div>

        {order && (
          <button className="active-order-banner" onClick={() => push({ kind: "tracking" })}>
            <span className="aob-icon">
              <Icon name="dash" size={20} />
            </span>
            <span>
              <b>Your order is on the way</b>
              <span>Tap to track your Dasher</span>
            </span>
            <Icon name="chevronRight" size={18} />
          </button>
        )}

        <div className="banner-row">
          <button className="promo-banner grocery" onClick={() => setTab("grocery")}>
            <span>
              <b>Grocery delivery, exactly how you want it.</b>
              <span>We get restaurants. We get food. We get groceries.</span>
              <em>Shop Groceries</em>
            </span>
            <span className="pb-art">🥦🍅🥚🧻</span>
          </button>
          <button className="promo-banner dashpass" onClick={() => push({ kind: "account" })}>
            <span>
              <b>
                <DashPassMark size={16} /> $0 delivery fees with DashPass
              </b>
              <span>Try 30 days free. Cancel anytime.</span>
              <em>Try free</em>
            </span>
            <span className="pb-art">🛵</span>
          </button>
        </div>

        {grocery.length > 0 && (
          <section>
            <SectionHeader title="Groceries, snacks & drinks" onMore={() => setTab("grocery")} />
            <div className="h-scroll">
              {grocery.map((s) => (
                <StoreCard key={s.id} store={s} />
              ))}
            </div>
          </section>
        )}

        {deals.length > 0 && (
          <section>
            <SectionHeader title="DashPass Exclusive Deals" onMore={() => push({ kind: "category", label: "Deals" })} />
            <div className="h-scroll">
              {deals.map((s) => (
                <StoreCard key={s.id} store={s} />
              ))}
            </div>
          </section>
        )}

        {restaurants.length > 0 && (
          <section>
            <SectionHeader title="Fastest near you" onMore={() => push({ kind: "category", label: "Fastest near you" })} />
            <div className="h-scroll">
              {[...restaurants].sort((a, b) => a.eta - b.eta).map((s) => (
                <StoreCard key={s.id} store={s} />
              ))}
            </div>
          </section>
        )}

        <section>
          <SectionHeader title="Halloween Treats" sub="Sponsored" onMore={() => setTab("grocery")} />
          <div className="h-scroll">
            {STORES.filter((s) => ["sweet-spot", "dashmart", "greenleaf"].includes(s.id)).map((s) => (
              <StoreCard key={s.id} store={s} />
            ))}
          </div>
        </section>

        <section className="all-stores">
          <SectionHeader title="All Stores" />
          {restaurants.length === 0 && grocery.length === 0 ? (
            <p className="empty-note">No stores match these filters.</p>
          ) : (
            [...restaurants, ...grocery].map((s) => <StoreRow key={s.id} store={s} />)
          )}
        </section>
        <div className="bottom-pad" />
      </div>
    </div>
  );
}

export function CategoryScreen({ label }: { label: string }) {
  const { pop } = useApp();
  const needle = label.toLowerCase();
  const list =
    label === "Deals"
      ? STORES.filter((s) => s.promo)
      : label === "Fastest near you"
        ? [...STORES].filter((s) => s.vertical === "restaurant").sort((a, b) => a.eta - b.eta)
        : STORES.filter((s) => s.cuisine.some((c) => c.toLowerCase().includes(needle.replace(/s$/, ""))) || s.name.toLowerCase().includes(needle));
  return (
    <div className="screen">
      <header className="back-header">
        <button className="icon-btn" onClick={pop} aria-label="Back">
          <Icon name="back" size={22} />
        </button>
        <span className="bh-title">
          <b>{label}</b>
        </span>
        <span />
      </header>
      <div className="scroll pad-top-header">
        <p className="result-count">{list.length || 0} stores near you</p>
        {list.length === 0 ? <p className="empty-note">Nothing nearby right now. Try another category.</p> : list.map((s) => <StoreCard key={s.id} store={s} wide />)}
        <div className="bottom-pad" />
      </div>
    </div>
  );
}
