import { useState } from "react";
import { useApp } from "../app-context";
import { ItemThumb, StoreRow } from "../components";
import { BROWSE_TILES, CATEGORIES, STORES, money } from "../data";
import { Icon } from "../icons";

const RECENT = ["ramen", "pizza near me", "flowers", "cough drops"];

export function BrowseScreen() {
  const { push, setTab, openSheet } = useApp();
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const storeHits = needle
    ? STORES.filter((s) => s.name.toLowerCase().includes(needle) || s.cuisine.some((c) => c.toLowerCase().includes(needle)))
    : [];
  const itemHits = needle
    ? STORES.flatMap((s) => s.items.filter((i) => i.name.toLowerCase().includes(needle)).map((i) => ({ s, i }))).slice(0, 8)
    : [];

  return (
    <div className="screen">
      <div className="scroll pad-top-status">
        <h1 className="large-title">Browse</h1>
        <label className="search-pill input">
          <Icon name="search" size={20} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search DoorDash" />
          {q && (
            <button onClick={() => setQ("")} aria-label="Clear">
              <Icon name="close" size={18} />
            </button>
          )}
        </label>

        {needle ? (
          <>
            {storeHits.length > 0 && <h3 className="block-title">Stores</h3>}
            {storeHits.map((s) => (
              <StoreRow key={s.id} store={s} />
            ))}
            {itemHits.length > 0 && <h3 className="block-title">Items</h3>}
            {itemHits.map(({ s, i }) => (
              <button key={i.id} className="item-hit" onClick={() => openSheet({ kind: "item", storeId: s.id, itemId: i.id })}>
                <ItemThumb item={i} size={52} />
                <span>
                  <b>{i.name}</b>
                  <span className="muted">
                    {s.name} · {money(i.price)}
                  </span>
                </span>
              </button>
            ))}
            {storeHits.length === 0 && itemHits.length === 0 && <p className="empty-note">No results for “{q}”.</p>}
          </>
        ) : (
          <>
            <h3 className="block-title">Recent searches</h3>
            <div className="recent-row">
              {RECENT.map((r) => (
                <button key={r} className="pill" onClick={() => setQ(r.replace(" near me", ""))}>
                  <Icon name="clock" size={14} /> {r}
                </button>
              ))}
            </div>
            <h3 className="block-title">Shop by store type</h3>
            <div className="browse-grid">
              {BROWSE_TILES.map((t) => (
                <button key={t.label} className="browse-tile" style={{ background: t.bg }} onClick={() => setTab(t.tab)}>
                  <span>{t.label}</span>
                  <em>{t.emoji}</em>
                </button>
              ))}
            </div>
            <h3 className="block-title">Top cuisines</h3>
            <div className="cuisine-grid">
              {CATEGORIES.map((c) => (
                <button key={c.id} className="cuisine" onClick={() => push({ kind: "category", label: c.label })}>
                  <span className="cat-emoji">{c.emoji}</span>
                  {c.label}
                </button>
              ))}
            </div>
          </>
        )}
        <div className="bottom-pad" />
      </div>
    </div>
  );
}
