import { useState } from "react";
import { useApp } from "../app-context";
import { HeartButton, Segmented, Specs } from "../components";
import { LISTINGS, SAVED_SEARCHES, formatPrice } from "../data";
import { Icon } from "../icons";

export function FavoritesScreen() {
  const { saved, push, setTab, toast, setLocation } = useApp();
  const [view, setView] = useState<"Homes" | "Searches">("Homes");
  const homes = saved.map((id) => LISTINGS.find((l) => l.id === id)!).filter(Boolean);

  return (
    <div className="screen tab-screen">
      <div className="tab-scroll">
        <h1 className="large-title top">Favorites</h1>
        <div className="fav-seg">
          <Segmented options={["Homes", "Searches"] as const} value={view} onChange={setView} variant="underline" />
        </div>
        {view === "Homes" ? (
          homes.length === 0 ? (
            <div className="empty">
              <Icon name="heart" size={44} />
              <h3>Save homes you love</h3>
              <p>Tap the heart on any home to save it here and get updates on price changes and open houses.</p>
              <button className="btn primary" onClick={() => setTab("search")}>
                Start searching
              </button>
            </div>
          ) : (
            <>
              <div className="fav-toolbar">
                <span>
                  <b>{homes.length}</b> saved {homes.length === 1 ? "home" : "homes"}
                </span>
                <button className="link">
                  Sort: Date saved <Icon name="chevronDown" size={14} />
                </button>
              </div>
              <button className="cobuyer" onClick={() => toast("Invite link copied")}>
                <span className="cb-avatars">
                  <i>Y</i>
                  <i>+</i>
                </span>
                <span>
                  <b>Shopping with someone?</b>
                  <span>Invite a co-shopper to share saved homes and notes.</span>
                </span>
                <Icon name="chevronRight" size={18} />
              </button>
              {homes.map((l, i) => (
                <article key={l.id} className="fav-card" onClick={() => push({ kind: "home", id: l.id })}>
                  <div className="fav-photo">
                    <img src={l.photos[0]} alt="" />
                    <HeartButton id={l.id} />
                    {l.badge && <span className="photo-badge">{l.badge}</span>}
                  </div>
                  <div className="fav-body">
                    <div className="fav-price">{formatPrice(l)}</div>
                    <Specs l={l} />
                    <div className="lc-addr">
                      {l.street}, {l.city}, {l.state} {l.zip}
                    </div>
                    <div className="fav-note">
                      <Icon name="eye" size={14} /> Saved {i === 0 ? "today" : `${i + 1} days ago`} · {l.status === "Sold" ? "Sold" : `${l.daysOnZillow} days on Zillow`}
                    </div>
                  </div>
                </article>
              ))}
            </>
          )
        ) : (
          <>
            <div className="fav-toolbar">
              <span>
                <b>{SAVED_SEARCHES.length}</b> saved searches
              </span>
            </div>
            {SAVED_SEARCHES.map((s) => (
              <button
                key={s.id}
                className="saved-search"
                onClick={() => {
                  setLocation(s.name.replace(", TN", " TN"));
                  setTab("search");
                }}
              >
                <span className="ss-map">
                  <Icon name="map" size={22} />
                </span>
                <span className="ss-body">
                  <b>{s.name}</b>
                  <span>{s.criteria}</span>
                  <span className="muted small">Email & push · {s.frequency}</span>
                </span>
                {s.newCount > 0 && <span className="ss-new">{s.newCount} new</span>}
                <Icon name="chevronRight" size={18} />
              </button>
            ))}
          </>
        )}
        <div className="tab-bottom-pad" />
      </div>
    </div>
  );
}
