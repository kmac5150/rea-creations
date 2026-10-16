import { useState } from "react";
import { useApp } from "../app-context";
import { Avatar, HeartButton, NavHeader, Segmented, SheetFrame } from "../components";
import { SCHOOLS, byId, formatPrice, monthlyPayment, shortPrice, typeLabel, type Listing } from "../data";
import { Icon, type IconName } from "../icons";

export function HomeDetail({ id }: { id: string }) {
  const l = byId(id);
  const { pop, push, openSheet, toast } = useApp();
  const [photo, setPhoto] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const isRent = l.status === "For rent";
  const est = monthlyPayment(l.price);

  return (
    <div className="screen pdp">
      <div className="pdp-scroll">
        <div className="pdp-hero">
          <div
            className="pdp-track"
            onScroll={(e) => setPhoto(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          >
            {l.photos.map((p, i) => (
              <img key={p + i} src={p} alt="" draggable={false} onClick={() => push({ kind: "gallery", id: l.id })} />
            ))}
          </div>
          <div className="pdp-hero-top">
            <button className="glass-btn round" onClick={pop} aria-label="Back">
              <Icon name="back" size={20} />
            </button>
            <div className="glass-group">
              <HeartButton id={l.id} variant="plain" />
              <button className="icon-btn" aria-label="Share" onClick={() => toast("Link copied to clipboard")}>
                <Icon name="share" size={21} />
              </button>
              <button className="icon-btn" aria-label="More">
                <Icon name="more" size={20} />
              </button>
            </div>
          </div>
          {l.badge === "Showcase" && <span className="pdp-showcase">SHOWCASE</span>}
          <span className="pdp-count">
            {photo + 1} of {l.photos.length + 28}
          </span>
          <div className="pdp-media-chips">
            {l.has3D && <MediaChip icon="cube" label="3D tour" onClick={() => toast("Opening 3D tour…")} />}
            <MediaChip icon="floorplan" label="Floor plan" onClick={() => push({ kind: "gallery", id: l.id })} />
            <MediaChip icon="sparkle" label="Virtual staging" onClick={() => toast("Virtual staging · AI generated")} />
            <MediaChip icon="photos" label="Photos" onClick={() => push({ kind: "gallery", id: l.id })} />
          </div>
        </div>

        <button className="pdp-agent-row" onClick={() => openSheet({ kind: "contact", id: l.id })}>
          <span>
            <b>{l.agent.name}</b>
            <span>{l.agent.brokerage}</span>
          </span>
          <Icon name="chevronRight" size={20} />
        </button>

        <section className="pdp-summary">
          <span className={`status-pill ${l.status === "Sold" ? "sold" : isRent ? "rent" : ""}`}>
            <i /> {l.status === "Sold" ? "Sold" : l.badge === "Coming soon" ? "Coming soon" : isRent ? "For rent" : "Active"}
          </span>
          <div className="pdp-price">{formatPrice(l)}</div>
          <div className="pdp-specs">
            <span>
              <b>{l.beds}</b> beds
            </span>
            <span className="dotted">
              <b>{l.baths}</b> baths
            </span>
            <span>
              <b>{l.sqft.toLocaleString()}</b> sqft
            </span>
          </div>
          <div className="pdp-address">
            {l.street}, {l.city}, {l.state} {l.zip}
          </div>
          {!isRent && (
            <button className="pdp-est" onClick={() => openSheet({ kind: "buyability" })}>
              <span>
                <u>Est.</u>: <b>${est.toLocaleString()}/mo</b>
              </span>
              <span className="link">Get pre-qualified</span>
            </button>
          )}
          <div className="pdp-facts-grid">
            <Fact icon="home" label={typeLabel(l).replace(" for sale", "").replace(" for rent", "")} sub="Single family residence" />
            <Fact icon="calendar" label={`Built in ${l.yearBuilt}`} sub="Year built" />
            <Fact icon="map" label={l.lotAcres ? `${l.lotAcres.toFixed(2)} Acres lot` : "— Lot"} sub="Lot size" />
            <Fact icon="tag" label={!isRent ? `${shortPrice(l.zestimate)} Zestimate®` : `$${l.rentZestimate.toLocaleString()} Rent Zestimate®`} sub="Estimated value" />
            <Fact icon="dollar" label={l.price > 0 ? `$${Math.round(l.price / l.sqft)}/sqft` : "—"} sub="Price per sqft" />
            <Fact icon="settings" label={l.hoa ? `$${l.hoa}/mo HOA` : "$-- HOA"} sub="HOA fees" />
          </div>
        </section>

        <section className="pdp-sec">
          <h2>What’s special</h2>
          <div className="special-tags">
            {l.specials.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <p className={`pdp-desc ${showMore ? "open" : ""}`}>
            {l.description} Recent updates include fresh interior paint, new lighting, and refinished floors. Conveniently located near parks, dining in {l.neighborhood}, and an easy commute to downtown Nashville.
          </p>
          <button className="link show-more" onClick={() => setShowMore((s) => !s)}>
            {showMore ? "Show less" : "Show more"} <Icon name="chevronDown" size={14} style={{ transform: showMore ? "rotate(180deg)" : undefined }} />
          </button>
          <div className="pdp-stats">
            <span>
              <b>{l.daysOnZillow === 0 ? "3 hours" : `${l.daysOnZillow} days`}</b> on Zillow
            </span>
            <span>
              <b>{l.views.toLocaleString()}</b> views
            </span>
            <span>
              <b>{l.saves}</b> saves
            </span>
          </div>
          <div className="pdp-listed">
            Listed by: <b>{l.agent.name}</b> {l.agent.phone}, {l.agent.brokerage}
            <br />
            Source: Realtracs MLS #{2900000 + Number(l.id.slice(1)) % 99999}
          </div>
        </section>

        <section className="pdp-sec">
          <h2>Travel times</h2>
          <div className="travel">
            <Icon name="walk" size={20} />
            <span>
              <b>Add a commute</b>
              <span>See travel times to work, school and more</span>
            </span>
            <Icon name="chevronRight" size={18} />
          </div>
        </section>

        <section className="pdp-sec">
          <h2>Facts & features</h2>
          <FactGroup title="Interior" rows={[["Bedrooms", `${l.beds}`], ["Bathrooms", `${l.baths}`], ["Heating", l.heating], ["Cooling", l.cooling], ["Appliances", "Dishwasher, Disposal, Microwave, Range"], ["Flooring", "Hardwood, Tile"]]} />
          <FactGroup title="Property" rows={[["Parking", l.parking], ["Lot", l.lotAcres ? `${l.lotAcres.toFixed(2)} Acres` : "Common area"], ["Features", "Covered porch, Fenced yard"]]} />
          <FactGroup title="Construction" rows={[["Home type", l.homeType], ["Year built", `${l.yearBuilt}`], ["Materials", "Brick, Fiber cement"], ["Condition", "Updated/Remodeled"]]} />
          <FactGroup title="Community & HOA" rows={[["Neighborhood", l.neighborhood], ["HOA", l.hoa ? `$${l.hoa} monthly` : "No HOA"]]} />
        </section>

        {!isRent && (
          <section className="pdp-sec">
            <h2>Estimated market value</h2>
            <div className="zest-row">
              <div>
                <span className="muted">Zestimate®</span>
                <b>{shortPrice(l.zestimate)}</b>
                <span className="muted small">
                  Est. sales range {shortPrice(l.zestimate * 0.94)} – {shortPrice(l.zestimate * 1.07)}
                </span>
              </div>
              <div>
                <span className="muted">Rent Zestimate®</span>
                <b>${l.rentZestimate.toLocaleString()}/mo</b>
              </div>
            </div>
            <ZestChart value={l.zestimate} />
          </section>
        )}

        {!isRent && l.status !== "Sold" && (
          <section className="pdp-sec">
            <h2>Offer Insights</h2>
            <div className="offer-card">
              <div className="offer-top">
                <b>{shortPrice(l.price * 1.002)}+</b>
                <span>Suggested offer to stay competitive</span>
              </div>
              <div className="offer-scale">
                {["Weak", "Moderate", "Competitive", "Strong"].map((s, i) => (
                  <span key={s} className={i === 2 ? "on" : ""}>
                    {s}
                  </span>
                ))}
              </div>
              <p className="muted small">Based on recent sales of similar homes in {l.neighborhood}. Buyers market.</p>
            </div>
          </section>
        )}

        <section className="pdp-sec">
          <h2>Price history</h2>
          <table className="history">
            <thead>
              <tr>
                <th>Date</th>
                <th>Event</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {l.priceHistory.map((h) => (
                <tr key={h.date + h.event}>
                  <td>{h.date}</td>
                  <td>{h.event}</td>
                  <td>
                    <b>${h.price.toLocaleString()}</b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="pdp-sec">
          <h2>Climate risks</h2>
          <div className="risk-grid">
            <Risk icon="flood" label="Flood Factor" value="Minimal" tone="ok" />
            <Risk icon="sparkle" label="Fire Factor" value="Minor" tone="ok" />
            <Risk icon="sparkle" label="Wind Factor" value="Moderate" tone="mid" />
            <Risk icon="sparkle" label="Heat Factor" value="Major" tone="bad" />
          </div>
          <p className="muted small">Provided by First Street. Flood zone X — outside 500-year floodplain.</p>
        </section>

        <section className="pdp-sec">
          <h2>Neighborhood: {l.neighborhood}</h2>
          <div className="neighborhood-map">
            <span className="nm-pin" />
          </div>
          <h3 className="sub">Getting around</h3>
          <div className="scores">
            <span>
              <b>{48 + (l.zip.charCodeAt(4) % 40)}</b> Walk Score®
            </span>
            <span>
              <b>{30 + (l.zip.charCodeAt(3) % 30)}</b> Bike Score®
            </span>
          </div>
        </section>

        <section className="pdp-sec">
          <h2>Nearby schools</h2>
          {SCHOOLS.map((s) => (
            <div key={s.name} className="school">
              <span className={`school-rating r${s.rating >= 7 ? "hi" : s.rating >= 5 ? "mid" : "lo"}`}>
                {s.rating}
                <small>/10</small>
              </span>
              <span>
                <b>{s.name}</b>
                <span className="muted small">
                  Grades {s.grades} · Distance {s.distance}
                </span>
              </span>
            </div>
          ))}
          <p className="muted small">Source: GreatSchools®</p>
        </section>

        <section className="pdp-sec buyability-cta">
          <h2>Unlock more with BuyAbility℠</h2>
          <p>See if this home fits your budget in under 5 minutes.</p>
          <button className="btn outline" onClick={() => openSheet({ kind: "buyability" })}>
            Set up BuyAbility
          </button>
        </section>
        <div className="pdp-bottom-pad" />
      </div>

      <div className="pdp-cta">
        <button className="btn outline" onClick={() => openSheet({ kind: "contact", id: l.id })}>
          Contact
          <small>{l.agent.name.split(" ")[0]}</small>
        </button>
        <button className="btn primary" onClick={() => openSheet({ kind: "tour", id: l.id })}>
          Request a tour
          <small>as early as {l.tourAvailable}</small>
        </button>
      </div>
    </div>
  );
}

function MediaChip({ icon, label, onClick }: { icon: IconName; label: string; onClick: () => void }) {
  return (
    <button className="media-chip" onClick={onClick}>
      <Icon name={icon} size={16} /> {label}
    </button>
  );
}

function Fact({ icon, label, sub }: { icon: IconName; label: string; sub: string }) {
  return (
    <div className="fact">
      <Icon name={icon} size={20} />
      <span>
        <b>{label}</b>
        <span>{sub}</span>
      </span>
    </div>
  );
}

function FactGroup({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="fact-group">
      <h3>{title}</h3>
      <ul>
        {rows.map(([k, v]) => (
          <li key={k}>
            <span>{k}:</span> {v}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Risk({ icon, label, value, tone }: { icon: IconName; label: string; value: string; tone: "ok" | "mid" | "bad" }) {
  return (
    <div className={`risk ${tone}`}>
      <Icon name={icon} size={20} />
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

function ZestChart({ value }: { value: number }) {
  const pts = [0.78, 0.8, 0.83, 0.86, 0.9, 0.93, 0.92, 0.95, 0.97, 0.96, 0.99, 1].map((r) => r * value);
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * 320} ${90 - ((p - min) / (max - min)) * 80}`).join(" ");
  return (
    <svg viewBox="0 0 320 100" className="zest-chart" preserveAspectRatio="none">
      <path d={`${d} L320 100 L0 100Z`} fill="rgba(0,65,217,.08)" />
      <path d={d} fill="none" stroke="#0041d9" strokeWidth="2.5" />
    </svg>
  );
}

export function Gallery({ id }: { id: string }) {
  const l = byId(id);
  const { pop } = useApp();
  const rooms = ["Exterior", "Living Room", "Kitchen", "Dining", "Bedroom", "Bathroom", "Backyard"];
  return (
    <div className="screen gallery">
      <NavHeader title={`${l.photos.length + 28} photos`} onBack={pop} trailing={<HeartButton id={l.id} variant="plain" />} />
      <div className="gallery-scroll">
        <div className="gallery-tabs">
          {["Photos", "3D tour", "Floor plan", "Map"].map((t, i) => (
            <span key={t} className={i === 0 ? "on" : ""}>
              {t}
            </span>
          ))}
        </div>
        {l.photos.map((p, i) => (
          <figure key={p + i} className={i % 3 === 0 ? "wide" : ""}>
            <img src={p} alt="" />
            <figcaption>{rooms[i % rooms.length]}</figcaption>
          </figure>
        ))}
        <div className="floorplan">
          <svg viewBox="0 0 300 200">
            <rect x="10" y="10" width="280" height="180" fill="#fff" stroke="#2a2a33" strokeWidth="4" />
            <path d="M10 100h120M130 10v70M130 120v70M200 100h90M200 10v60M200 130v60" stroke="#2a2a33" strokeWidth="3" />
            <text x="40" y="60">Living</text>
            <text x="150" y="60">Kitchen</text>
            <text x="225" y="50">Bed 1</text>
            <text x="40" y="150">Bed 2</text>
            <text x="150" y="160">Bath</text>
            <text x="225" y="160">Bed 3</text>
          </svg>
          <figcaption>Floor plan · Main level</figcaption>
        </div>
      </div>
    </div>
  );
}

function nextDays() {
  const base = new Date(2026, 9, 16);
  return Array.from({ length: 8 }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    return {
      key: d.toISOString().slice(0, 10),
      dow: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    };
  });
}

const TIMES = ["9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:30 pm", "2:30 pm", "4:00 pm", "5:30 pm"];

export function TourSheet({ id }: { id: string }) {
  const l = byId(id);
  const { closeSheet } = useApp();
  const days = nextDays();
  const [kind, setKind] = useState<"In person" | "Video chat">("In person");
  const [day, setDay] = useState(days[1].key);
  const [time, setTime] = useState(TIMES[2]);
  const [done, setDone] = useState(false);
  const chosen = days.find((d) => d.key === day)!;

  if (done) {
    return (
      <SheetFrame onClose={closeSheet}>
        <div className="tour-done">
          <span className="done-check">
            <Icon name="check" size={34} />
          </span>
          <h2>Tour requested</h2>
          <p>
            {chosen.dow}, {chosen.month} {chosen.day} at {time} · {kind}
          </p>
          <p className="muted">
            {l.street}. A local agent will confirm your tour shortly. You can manage it from your Inbox.
          </p>
          <button className="btn primary block" onClick={closeSheet}>
            Done
          </button>
        </div>
      </SheetFrame>
    );
  }

  return (
    <SheetFrame
      title="Request a tour"
      onClose={closeSheet}
      footer={
        <button className="btn primary block" onClick={() => setDone(true)}>
          Request this time
        </button>
      }
    >
      <TourListing l={l} />
      <Segmented options={["In person", "Video chat"] as const} value={kind} onChange={setKind} />
      <h4 className="tour-h">Select a date</h4>
      <div className="date-row">
        {days.map((d) => (
          <button key={d.key} className={`date-chip ${d.key === day ? "on" : ""}`} onClick={() => setDay(d.key)}>
            <span>{d.dow}</span>
            <b>{d.day}</b>
            <span>{d.month}</span>
          </button>
        ))}
      </div>
      <h4 className="tour-h">Select a time</h4>
      <div className="time-grid">
        {TIMES.map((t) => (
          <button key={t} className={t === time ? "on" : ""} onClick={() => setTime(t)}>
            {t}
          </button>
        ))}
      </div>
      <p className="muted small">Free, with no obligation — cancel anytime. By requesting, you agree to be contacted by a Zillow Premier Agent partner.</p>
    </SheetFrame>
  );
}

function TourListing({ l }: { l: Listing }) {
  return (
    <div className="tour-listing">
      <img src={l.photos[0]} alt="" />
      <span>
        <b>{formatPrice(l)}</b>
        <span>{l.street}</span>
        <span className="muted">
          {l.city}, {l.state} {l.zip}
        </span>
      </span>
    </div>
  );
}

export function ContactSheet({ id }: { id: string }) {
  const l = byId(id);
  const { closeSheet, toast } = useApp();
  const [msg, setMsg] = useState(`I’m interested in ${l.street}, ${l.city}, ${l.state} ${l.zip}.`);
  return (
    <SheetFrame
      title="Contact agent"
      onClose={closeSheet}
      footer={
        <button
          className="btn primary block"
          onClick={() => {
            closeSheet();
            toast(`Message sent to ${l.agent.name}`);
          }}
        >
          Send message
        </button>
      }
    >
      <div className="contact-agent">
        <Avatar agent={l.agent} size={56} />
        <span>
          <b>{l.agent.name}</b>
          <span className="muted">{l.agent.brokerage}</span>
          <span className="stars">
            <Icon name="star" size={14} /> {l.agent.rating.toFixed(1)} · {l.agent.sales} sales last 12 months
          </span>
        </span>
      </div>
      <label className="field">
        <span>Phone</span>
        <input defaultValue="(615) 555-0100" />
      </label>
      <label className="field">
        <span>Email</span>
        <input defaultValue="you@example.com" />
      </label>
      <label className="field">
        <span>Message</span>
        <textarea rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} />
      </label>
      <label className="f-check">
        <input type="checkbox" defaultChecked />
        <span className="box">
          <Icon name="check" size={14} />
        </span>
        I want financing information
      </label>
    </SheetFrame>
  );
}
