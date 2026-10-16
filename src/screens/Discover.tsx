import { useState } from "react";
import { useApp } from "../app-context";
import { BackHeader, DateBlock, EventRow, ForYouCard, MoreButton, SectionTitle, SheetFrame } from "../components";
import { CATEGORIES, EVENTS, LOCATIONS, PERFORMERS, TRENDING, daysUntil, performerById, venueById, type Category } from "../data";
import { Icon } from "../icons";

function nextEventFor(performerId: string) {
  return EVENTS.filter((e) => e.performerId === performerId).sort((a, b) => a.date.localeCompare(b.date))[0];
}

export function DiscoverScreen() {
  const { push, openSheet, location } = useApp();
  const forYou = ["ev1", "ev4", "ev7", "ev11", "ev12", "ev6"].map((id) => EVENTS.find((e) => e.id === id)!);
  const weekend = EVENTS.filter((e) => {
    const d = daysUntil(e.date);
    return d >= 2 && d <= 4;
  });
  const presales = EVENTS.filter((e) => e.presale);
  const trendingCols = [TRENDING.slice(0, 3), TRENDING.slice(3, 6), TRENDING.slice(6, 9)];

  return (
    <div className="screen">
      <div className="scroll">
        <button className="location-row" onClick={() => openSheet({ kind: "location" })}>
          <Icon name="pin" size={17} className="pin-cyan" />
          {location}
          <Icon name="chevronRight" size={16} />
        </button>
        <button className="search-pill" onClick={() => push({ kind: "search" })}>
          <span className="search-circle">
            <Icon name="search" size={20} />
          </span>
          Search for Artists
        </button>

        <SectionTitle title="For You" />
        <div className="h-scroll">
          {forYou.map((ev) => (
            <ForYouCard key={ev.id} ev={ev} />
          ))}
        </div>

        <SectionTitle title="Trending" />
        <div className="h-scroll trending">
          {trendingCols.map((col, ci) => (
            <div key={ci} className="trend-col">
              {col.map((pid, i) => {
                const p = performerById(pid);
                const n = ci * 3 + i + 1;
                return (
                  <button key={pid} className="trend-row" onClick={() => push({ kind: "artist", id: pid })}>
                    <span className="trend-num">{String(n).padStart(2, "0")}</span>
                    <img src={p.image} alt="" />
                    <span className="trend-body">
                      <b>{p.name}</b>
                      <span>
                        <Icon name="mic" size={14} /> {p.genre}
                      </span>
                    </span>
                    <MoreButton eventId={nextEventFor(pid)?.id ?? ""} />
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <SectionTitle title="Happening This Weekend" action="See All" onAction={() => push({ kind: "category", label: "This Weekend" })} />
        <div className="h-scroll">
          {weekend.map((ev) => (
            <WideCard key={ev.id} id={ev.id} />
          ))}
        </div>

        <SectionTitle title="Browse By Category" />
        <div className="cat-grid">
          {CATEGORIES.map((c) => (
            <button key={c.label} className="cat-tile" onClick={() => push({ kind: "category", label: c.label })}>
              <img src={c.image} alt="" />
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        <SectionTitle title="Presales & Offers" />
        <div className="h-scroll">
          {presales.map((ev) => (
            <WideCard key={ev.id} id={ev.id} presale />
          ))}
        </div>

        <SectionTitle title="Popular Near You" action="See All" onAction={() => push({ kind: "category", label: "Popular Near You" })} />
        <div className="list-pad">
          {EVENTS.slice(0, 6).map((ev) => (
            <EventRow key={ev.id} ev={ev} />
          ))}
        </div>
        <div className="bottom-pad" />
      </div>
    </div>
  );
}

function WideCard({ id, presale = false }: { id: string; presale?: boolean }) {
  const { push } = useApp();
  const ev = EVENTS.find((e) => e.id === id)!;
  const v = venueById(ev.venueId);
  return (
    <article className="wide-card" onClick={() => push({ kind: "event", id })}>
      <img src={ev.image} alt="" />
      {presale && <span className="wc-badge">PRESALE</span>}
      <div className="wc-body">
        <DateBlock iso={ev.date} />
        <span>
          <b>{ev.title}</b>
          <small>{presale ? ev.presale : `${ev.time} • ${v.name}`}</small>
        </span>
      </div>
    </article>
  );
}

export function LocationSheet() {
  const { closeSheet, location, setLocation } = useApp();
  return (
    <SheetFrame title="Location" onClose={closeSheet}>
      <button className="sheet-row accent">
        <Icon name="pin" size={18} /> Use My Current Location
      </button>
      {LOCATIONS.map((l) => (
        <button
          key={l}
          className="sheet-row"
          onClick={() => {
            setLocation(l);
            closeSheet();
          }}
        >
          {l}
          {l === location && <Icon name="check" size={18} className="blue" />}
        </button>
      ))}
    </SheetFrame>
  );
}

export function SearchScreen() {
  const { pop, push } = useApp();
  const [q, setQ] = useState("");
  const n = q.trim().toLowerCase();
  const artists = n ? PERFORMERS.filter((p) => p.name.toLowerCase().includes(n) || p.genre.toLowerCase().includes(n)) : [];
  const events = n ? EVENTS.filter((e) => e.title.toLowerCase().includes(n) || venueById(e.venueId).name.toLowerCase().includes(n)) : [];
  return (
    <div className="screen">
      <div className="search-head">
        <button className="icon-btn" onClick={pop} aria-label="Back">
          <Icon name="back" size={22} />
        </button>
        <label className="search-input">
          <Icon name="search" size={18} />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for Artists, Venues, Events" />
          {q && (
            <button onClick={() => setQ("")} aria-label="Clear">
              <Icon name="close" size={16} />
            </button>
          )}
        </label>
      </div>
      <div className="scroll">
        {!n && (
          <>
            <SectionTitle title="Recent Searches" />
            {["nova reyes", "comets", "starlight"].map((r) => (
              <button key={r} className="sheet-row" onClick={() => setQ(r)}>
                <Icon name="clock" size={17} /> {r}
              </button>
            ))}
            <SectionTitle title="Top Searches" />
            {TRENDING.slice(0, 5).map((pid) => {
              const p = performerById(pid);
              return (
                <button key={pid} className="artist-hit" onClick={() => push({ kind: "artist", id: pid })}>
                  <img src={p.image} alt="" />
                  <span>
                    <b>{p.name}</b>
                    <small>{p.genre}</small>
                  </span>
                </button>
              );
            })}
          </>
        )}
        {artists.length > 0 && <SectionTitle title="Artists" />}
        {artists.map((p) => (
          <button key={p.id} className="artist-hit" onClick={() => push({ kind: "artist", id: p.id })}>
            <img src={p.image} alt="" />
            <span>
              <b>{p.name}</b>
              <small>
                {p.genre} • {EVENTS.filter((e) => e.performerId === p.id).length} events
              </small>
            </span>
          </button>
        ))}
        {events.length > 0 && <SectionTitle title="Events" />}
        <div className="list-pad">
          {events.map((ev) => (
            <EventRow key={ev.id} ev={ev} />
          ))}
        </div>
        {n && artists.length === 0 && events.length === 0 && <p className="empty-note">No results for “{q}”</p>}
        <div className="bottom-pad" />
      </div>
    </div>
  );
}

export function ArtistScreen({ id }: { id: string }) {
  const { pop, favorites, toggleFavorite } = useApp();
  const p = performerById(id);
  const [tab, setTab] = useState<"Events" | "About" | "Reviews">("Events");
  const events = EVENTS.filter((e) => e.performerId === id).sort((a, b) => a.date.localeCompare(b.date));
  const fav = favorites.includes(id);
  return (
    <div className="screen no-top">
      <div className="scroll">
        <div className="artist-hero">
          <img className="ah-bg" src={p.image} alt="" />
          <button className="circle-outline ah-back" onClick={pop} aria-label="Back">
            <Icon name="back" size={20} />
          </button>
          <div className="ah-info">
            <img src={p.image} alt="" />
            <small>{p.genre}</small>
            <h1>{p.name}</h1>
            <span className="ah-actions">
              <button className={`fav-circle ${fav ? "on" : ""}`} onClick={() => toggleFavorite(id)} aria-label={fav ? "Remove from favorites" : `Save ${p.name} to favorites`}>
                <Icon name={fav ? "heartFill" : "heart"} size={22} />
              </button>
              <span className="rating-box">
                <Icon name="star" size={15} /> {p.rating.toFixed(1)}
              </span>
            </span>
          </div>
        </div>
        <div className="underline-tabs">
          {(["Events", "About", "Reviews"] as const).map((t) => (
            <button key={t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>
        {tab === "Events" && (
          <>
            <div className="results-head">
              <b>{p.category.toUpperCase()}</b> • {events.length} RESULTS
            </div>
            <div className="list-pad">
              {events.map((ev) => (
                <EventRow key={ev.id} ev={ev} showPerformer={false} />
              ))}
            </div>
          </>
        )}
        {tab === "About" && <p className="about">{p.bio}</p>}
        {tab === "Reviews" && (
          <div className="reviews">
            <p className="big-rating">
              {p.rating.toFixed(1)} <Icon name="star" size={22} />
              <small>{p.reviews.toLocaleString()} reviews</small>
            </p>
            {["Best night of the year. Sound was incredible.", "Worth every penny — the encore alone!", "Great show, lines for merch were long."].map((r, i) => (
              <div key={r} className="review">
                <span className="stars">{"★★★★★".slice(0, 5 - (i === 2 ? 1 : 0))}</span>
                <p>{r}</p>
                <small>Fan review · {["Oct 2", "Sep 21", "Sep 3"][i]}</small>
              </div>
            ))}
          </div>
        )}
        <div className="bottom-pad" />
      </div>
    </div>
  );
}

export function CategoryScreen({ label }: { label: string }) {
  const { pop } = useApp();
  const isCat = CATEGORIES.some((c) => c.label === label);
  const list = isCat
    ? EVENTS.filter((e) => performerById(e.performerId).category === (label as Category))
    : label === "This Weekend"
      ? EVENTS.filter((e) => daysUntil(e.date) >= 2 && daysUntil(e.date) <= 4)
      : EVENTS;
  const sorted = [...list].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <div className="screen">
      <BackHeader title={label} subtitle={`${sorted.length} events`} onBack={pop} />
      <div className="scroll">
        <div className="list-pad">
          {sorted.map((ev) => (
            <EventRow key={ev.id} ev={ev} />
          ))}
        </div>
        <div className="bottom-pad" />
      </div>
    </div>
  );
}
