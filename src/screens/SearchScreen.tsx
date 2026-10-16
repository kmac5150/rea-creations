import { useMemo, useState } from "react";
import { ALL_TYPES, DEFAULT_FILTERS, applyFilters, displayCount, useApp, type Filters, type HomeType, type SortKey } from "../app-context";
import { ListingCard, MiniCard, Segmented, SheetFrame } from "../components";
import { LISTINGS, NL_SUGGESTIONS, RECENT_SEARCHES, shortPrice, type ListingStatus } from "../data";
import { Icon } from "../icons";
import { MapCanvas } from "./MapCanvas";

const STATUS_LABEL: Record<ListingStatus, string> = { "For sale": "For sale", "For rent": "For rent", Sold: "Sold" };

export function SearchScreen() {
  const { filters, openSheet, location, setLocation, toast } = useApp();
  const [mode, setMode] = useState<"map" | "list">("map");
  const [selected, setSelected] = useState<string | null>(null);
  const [visited, setVisited] = useState<string[]>([]);
  const [satellite, setSatellite] = useState(false);
  const results = useMemo(() => applyFilters(LISTINGS, filters), [filters]);
  const count = displayCount(results.length, filters.status);
  const selectedListing = results.find((l) => l.id === selected) ?? null;
  const filterCount =
    (filters.beds ? 1 : 0) + (filters.baths ? 1 : 0) + (filters.types.length !== ALL_TYPES.length ? 1 : 0) + (filters.minPrice || filters.maxPrice ? 1 : 0);

  const priceLabel =
    filters.minPrice || filters.maxPrice
      ? `${filters.minPrice ? shortPrice(filters.minPrice) : "$0"}–${filters.maxPrice ? shortPrice(filters.maxPrice) : "Any"}`
      : "Price";

  return (
    <div className={`screen search-screen ${mode}`}>
      <div className="search-top">
        <div className="search-row">
          <button className="search-field" onClick={() => openSheet({ kind: "searchInput" })}>
            <Icon name="search" size={18} />
            <span>{location}</span>
          </button>
          {location !== "Current location" && (
            <button className="icon-btn clear-loc" aria-label="Clear location" onClick={() => setLocation("Current location")}>
              <Icon name="closeCircle" size={18} />
            </button>
          )}
          <button className="save-search-btn" onClick={() => toast("Search saved · Instant alerts on")}>
            Save search
          </button>
        </div>
        <div className="chip-row">
          <button className="chip active" onClick={() => openSheet({ kind: "filters" })}>
            {STATUS_LABEL[filters.status]} <Icon name="chevronDown" size={14} />
          </button>
          <button className={`chip ${filters.minPrice || filters.maxPrice ? "active" : ""}`} onClick={() => openSheet({ kind: "filters" })}>
            {priceLabel} <Icon name="chevronDown" size={14} />
          </button>
          <button className={`chip ${filters.beds || filters.baths ? "active" : ""}`} onClick={() => openSheet({ kind: "filters" })}>
            {filters.beds ? `${filters.beds}+ bd` : "Beds & baths"} <Icon name="chevronDown" size={14} />
          </button>
          <button className="chip" onClick={() => openSheet({ kind: "filters" })}>
            Home type <Icon name="chevronDown" size={14} />
          </button>
          <button className="chip" onClick={() => openSheet({ kind: "filters" })}>
            <Icon name="sliders" size={15} /> Filters{filterCount ? ` (${filterCount})` : ""}
          </button>
        </div>
      </div>

      {mode === "map" ? (
        <>
          <MapCanvas
            listings={results}
            selectedId={selected}
            visited={visited}
            satellite={satellite}
            onSelect={(id) => {
              setSelected(id);
              if (id) setVisited((v) => (v.includes(id) ? v : [...v, id]));
            }}
          />
          <div className="map-controls">
            <button className="glass-btn round" aria-label="Map layers" onClick={() => setSatellite((s) => !s)}>
              <Icon name="layers" size={20} />
            </button>
            <button className="glass-btn round" aria-label="Draw" onClick={() => toast("Draw a boundary with your finger")}>
              <Icon name="draw" size={20} />
            </button>
            <button className="glass-btn round blue" aria-label="Current location" onClick={() => toast("Showing homes near you")}>
              <Icon name="location" size={19} />
            </button>
          </div>
          <div className="map-count glass-pill">
            {count.toLocaleString()} {filters.status === "For rent" ? "rentals" : "homes"}
          </div>
          {selectedListing && (
            <div className="map-mini">
              <MiniCard l={selectedListing} onClose={() => setSelected(null)} />
            </div>
          )}
          <button className="mode-toggle glass-pill" onClick={() => setMode("list")}>
            <Icon name="list" size={17} /> List
          </button>
        </>
      ) : (
        <div className="list-scroll">
          <div className="list-head">
            <h1>
              {location === "Current location" ? "Nashville TN" : location} {filters.status === "For rent" ? "Rentals" : filters.status === "Sold" ? "Recently Sold Homes" : "Real Estate & Homes For Sale"}
            </h1>
            <div className="list-meta">
              <b>{count.toLocaleString()} results</b>
              <button className="link" onClick={() => openSheet({ kind: "sort" })}>
                Sorted by {filters.sort}
              </button>
            </div>
          </div>
          {results.length === 0 ? (
            <div className="empty">
              <Icon name="search" size={40} />
              <h3>No matching results</h3>
              <p>Try changing your filters or zooming out to see more homes.</p>
            </div>
          ) : (
            results.map((l) => <ListingCard key={l.id} l={l} />)
          )}
          <div className="list-save-banner">
            <Icon name="bell" size={22} />
            <span>Don’t miss out! New homes are getting added all the time. Save your search and be the first to know.</span>
          </div>
          <div className="list-spacer" />
        </div>
      )}
      {mode === "list" && (
        <div className="mode-toggle-pair glass-pill">
          <button onClick={() => setMode("map")}>
            <Icon name="map" size={17} /> Map
          </button>
          <i />
          <button onClick={() => openSheet({ kind: "sort" })}>
            <Icon name="sort" size={17} /> Sort
          </button>
        </div>
      )}
    </div>
  );
}

export function SearchInputSheet() {
  const { closeSheet, setLocation, filters, setFilters } = useApp();
  const [q, setQ] = useState("");
  const submit = (value: string) => {
    setLocation(value.replace(/ homes.*$/i, "") || "Nashville TN");
    closeSheet();
  };
  return (
    <div className="search-input-screen">
      <div className="si-head">
        <button className="icon-btn" onClick={closeSheet} aria-label="Back">
          <Icon name="back" size={22} />
        </button>
        <form
          className="si-field"
          onSubmit={(e) => {
            e.preventDefault();
            submit(q);
          }}
        >
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Address, neighborhood, city, ZIP" />
          {q && (
            <button type="button" className="icon-btn" onClick={() => setQ("")} aria-label="Clear">
              <Icon name="closeCircle" size={18} />
            </button>
          )}
        </form>
      </div>
      <div className="si-seg">
        <Segmented
          options={["For Sale", "For Rent", "Recently Sold"] as const}
          value={filters.status === "For sale" ? "For Sale" : filters.status === "For rent" ? "For Rent" : "Recently Sold"}
          onChange={(v) => setFilters({ ...filters, status: v === "For Sale" ? "For sale" : v === "For Rent" ? "For rent" : "Sold" })}
        />
      </div>
      <button className="si-row current" onClick={() => submit("Current location")}>
        <Icon name="location" size={20} /> Current location
      </button>
      {q ? (
        <>
          <div className="si-section">Try searching how you speak</div>
          {NL_SUGGESTIONS.map(([lead, bold]) => (
            <button key={bold} className="si-row" onClick={() => submit(`${lead}${bold}`)}>
              <span>
                {q.length > 3 ? lead : `${q} `}
                <b>{bold}</b>
              </span>
            </button>
          ))}
          <button className="si-row" onClick={() => submit(q)}>
            <Icon name="search" size={16} /> Search “{q}”
          </button>
        </>
      ) : (
        <>
          <div className="si-section">Recent searches</div>
          {RECENT_SEARCHES.map((r) => (
            <button key={r} className="si-row" onClick={() => submit(r.replace(", Nashville, TN", "").replace(", TN", " TN"))}>
              <Icon name="search" size={16} /> {r}
            </button>
          ))}
        </>
      )}
    </div>
  );
}

const PRICE_STEPS = [0, 200000, 300000, 400000, 500000, 600000, 750000, 1000000, 1500000, 2000000];
const RENT_STEPS = [0, 1000, 1500, 2000, 2500, 3000, 4000, 5000];

export function FiltersSheet() {
  const { filters, setFilters, closeSheet } = useApp();
  const [draft, setDraft] = useState<Filters>(filters);
  const steps = draft.status === "For rent" ? RENT_STEPS : PRICE_STEPS;
  const matches = applyFilters(LISTINGS, draft).length;
  const fmt = (n: number) => (n === 0 ? "No min" : draft.status === "For rent" ? `$${n.toLocaleString()}` : shortPrice(n));
  const toggleType = (t: HomeType) =>
    setDraft({ ...draft, types: draft.types.includes(t) ? draft.types.filter((x) => x !== t) : [...draft.types, t] });

  return (
    <SheetFrame
      title="Filters"
      full
      onClose={closeSheet}
      leading={
        <button className="link" onClick={() => setDraft({ ...DEFAULT_FILTERS, status: draft.status })}>
          Reset
        </button>
      }
      footer={
        <button
          className="btn primary block"
          onClick={() => {
            setFilters(draft);
            closeSheet();
          }}
        >
          See {displayCount(matches, draft.status).toLocaleString()} {draft.status === "For rent" ? "rentals" : "homes"}
        </button>
      }
    >
      <section className="f-sec">
        <h4>Listing type</h4>
        <Segmented
          options={["For sale", "For rent", "Sold"] as const}
          value={draft.status}
          onChange={(v) => setDraft({ ...draft, status: v, minPrice: 0, maxPrice: 0 })}
        />
      </section>
      <section className="f-sec">
        <h4>{draft.status === "For rent" ? "Monthly rent" : "Price range"}</h4>
        <div className="f-range">
          <label>
            <span>Minimum</span>
            <select value={draft.minPrice} onChange={(e) => setDraft({ ...draft, minPrice: Number(e.target.value) })}>
              {steps.map((s) => (
                <option key={s} value={s}>
                  {fmt(s)}
                </option>
              ))}
            </select>
          </label>
          <span className="f-dash">–</span>
          <label>
            <span>Maximum</span>
            <select value={draft.maxPrice} onChange={(e) => setDraft({ ...draft, maxPrice: Number(e.target.value) })}>
              {steps.map((s) => (
                <option key={s} value={s}>
                  {s === 0 ? "No max" : fmt(s)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="f-bars" aria-hidden>
          {[4, 9, 14, 22, 30, 26, 19, 15, 11, 8, 6, 4, 3, 2, 2, 1].map((h, i) => (
            <i key={i} style={{ height: h * 1.6 }} />
          ))}
        </div>
      </section>
      <section className="f-sec">
        <h4>Bedrooms</h4>
        <div className="f-pills">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <button key={n} className={draft.beds === n ? "on" : ""} onClick={() => setDraft({ ...draft, beds: n })}>
              {n === 0 ? "Any" : `${n}+`}
            </button>
          ))}
        </div>
      </section>
      <section className="f-sec">
        <h4>Bathrooms</h4>
        <div className="f-pills">
          {[0, 1, 1.5, 2, 3, 4].map((n) => (
            <button key={n} className={draft.baths === n ? "on" : ""} onClick={() => setDraft({ ...draft, baths: n })}>
              {n === 0 ? "Any" : `${n}+`}
            </button>
          ))}
        </div>
      </section>
      <section className="f-sec">
        <h4>Home type</h4>
        {ALL_TYPES.map((t) => (
          <label key={t} className="f-check">
            <input type="checkbox" checked={draft.types.includes(t)} onChange={() => toggleType(t)} />
            <span className="box">
              <Icon name="check" size={14} />
            </span>
            {t === "House" ? "Houses" : t === "Townhouse" ? "Townhomes" : t === "Condo" ? "Condos/Co-ops" : t === "Apartment" ? "Apartments" : "Multi-family"}
          </label>
        ))}
      </section>
      <section className="f-sec">
        <h4>Max HOA</h4>
        <select className="f-select">
          <option>Any</option>
          <option>No HOA fee</option>
          <option>$100/month</option>
          <option>$300/month</option>
        </select>
      </section>
      <section className="f-sec">
        <h4>Must have</h4>
        <div className="f-tags">
          {["Garage", "Pool", "A/C", "Basement", "Single-story", "Waterfront", "3D Tour"].map((t) => (
            <label key={t} className="f-tag">
              <input type="checkbox" />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </section>
      <section className="f-sec">
        <h4>Keywords</h4>
        <input className="f-input" placeholder="MLS #, yard, etc." />
      </section>
    </SheetFrame>
  );
}

const SORTS: SortKey[] = ["Homes for You", "Price (High to Low)", "Price (Low to High)", "Newest", "Bedrooms", "Square Feet"];

export function SortSheet() {
  const { filters, setFilters, closeSheet } = useApp();
  return (
    <SheetFrame title="Sort by" onClose={closeSheet}>
      {SORTS.map((s) => (
        <button
          key={s}
          className="sort-row"
          onClick={() => {
            setFilters({ ...filters, sort: s });
            closeSheet();
          }}
        >
          {s}
          {filters.sort === s && <Icon name="check" size={20} />}
        </button>
      ))}
    </SheetFrame>
  );
}
