import { useState } from "react";
import { useApp } from "../app-context";
import { Avatar, isActive, NavHeader, Segmented, StatusPill, TagChip } from "../components";
import { guestName, TODAY_LABELS, type Tag } from "../data";
import { Icon } from "../icons";

const FILTERS = ["All", "VIP", "Upcoming", "Allergies"] as const;

export function GuestsScreen() {
  const { guests, resos, push, openSheet } = useApp();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const upcoming = new Set(resos.filter((r) => isActive(r.status)).map((r) => r.guestId));
  const list = guests
    .filter((g) => `${g.first} ${g.last} ${g.phone}`.toLowerCase().includes(q.toLowerCase()))
    .filter((g) => (filter === "VIP" ? g.vip : filter === "Upcoming" ? upcoming.has(g.id) : filter === "Allergies" ? !!g.allergy : true))
    .sort((a, b) => a.last.localeCompare(b.last));
  return (
    <div className="screen dark">
      <header className="plain-head">
        <button className="icon-btn" aria-label="Menu" onClick={() => openSheet({ kind: "drawer" })}>
          <Icon name="menu" size={24} />
        </button>
        <h1>Guestbook</h1>
        <span className="muted small">{guests.length} guests</span>
      </header>
      <div className="search-wrap">
        <label className="search">
          <Icon name="search" size={18} />
          <input placeholder="Search name or phone" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search guests" />
        </label>
        <Segmented value={filter} options={FILTERS} onChange={setFilter} dark />
      </div>
      <div className="scroll">
        {list.map((g) => (
          <button key={g.id} className="guest-row" onClick={() => push({ kind: "guest", id: g.id })}>
            <Avatar guest={g} size={42} />
            <span className="lr-main">
              <span className="gc-name small-name">
                {g.vip && <Icon name="star" size={15} className="vip-star" />}
                {guestName(g)}
              </span>
              <span className="muted small">
                {g.visits} visits · {g.phone}
              </span>
            </span>
            {upcoming.has(g.id) && <span className="upcoming-dot">Upcoming</span>}
            <Icon name="chevR" size={18} />
          </button>
        ))}
        {list.length === 0 && <p className="empty">No guests match “{q}”</p>}
      </div>
    </div>
  );
}

const ALL_TAGS: Tag[] = ["VIP", "Regular", "Birthday", "Anniversary", "Allergy", "Booth", "Patio", "Wine club"];
const PROFILE_TABS = ["Visits", "Notes", "Preferences"] as const;

export function GuestScreen({ id }: { id: string }) {
  const { guests, resos, updateGuest, push, toast } = useApp();
  const g = guests.find((x) => x.id === id)!;
  const [editingTags, setEditingTags] = useState(false);
  const [tab, setTab] = useState<(typeof PROFILE_TABS)[number]>("Visits");
  const [note, setNote] = useState(g.note ?? "");
  const history = resos.filter((r) => r.guestId === id).sort((a, b) => b.day - a.day);
  const upcoming = history.filter((r) => isActive(r.status)).length;
  const unpaid = history.find((r) => r.deposit && isActive(r.status));
  const toggleTag = (t: Tag) => updateGuest(id, { tags: g.tags.includes(t) ? g.tags.filter((x) => x !== t) : [...g.tags, t], vip: t === "VIP" ? !g.tags.includes("VIP") : g.vip });
  return (
    <div className="screen light">
      <NavHeader title="Guest profile" light />
      <div className="scroll">
        <div className="profile-head">
          <Avatar guest={g} size={64} />
          <span className="gc-main">
            <span className="profile-name">
              {g.vip && <Icon name="star" size={22} className="vip-star" />}
              {guestName(g)}
            </span>
            <a className="profile-phone" href={`tel:${g.phone}`} onClick={(e) => e.preventDefault()}>
              <Icon name="phone" size={16} /> {g.phone}
            </a>
            <span className="gc-line">
              <Icon name="building" size={15} /> {g.area}
            </span>
            {g.company && (
              <span className="gc-line">
                <Icon name="briefcase" size={15} /> {g.company}
              </span>
            )}
          </span>
          <span className="ph-actions">
            <button className="icon-btn teal" aria-label="Email" onClick={() => toast(`Email ${g.email}`)}>
              <Icon name="globe" size={22} />
            </button>
          </span>
        </div>

        <div className="tag-block">
          <Icon name="tag" size={20} />
          <div className="chip-wrap">
            {(editingTags ? ALL_TAGS : g.tags).map((t) => (
              <button key={t} className={`tag-toggle ${g.tags.includes(t) ? "on" : ""}`} disabled={!editingTags} onClick={() => toggleTag(t)}>
                <TagChip tag={t} />
              </button>
            ))}
            {!editingTags && g.tags.length === 0 && <span className="muted">Add a tag…</span>}
          </div>
          <button className="icon-btn" aria-label={editingTags ? "Done editing tags" : "Edit tags"} onClick={() => setEditingTags(!editingTags)}>
            <Icon name={editingTags ? "check" : "edit"} size={20} />
          </button>
        </div>

        {unpaid && (
          <div className="unpaid">
            <Icon name="card" size={18} />
            <b>Not paid · ${unpaid.deposit!.toFixed(2)}</b>
          </div>
        )}

        <div className="guest-stats">
          <span>
            <b>{upcoming}</b>Upcoming
          </span>
          <span>
            <b>{g.visits}</b>Visits
          </span>
          <span>
            <b>{g.cancels}</b>Cancels
          </span>
          <span>
            <b>{g.noShows}</b>No-shows
          </span>
          <span>
            <b>${g.spend.toLocaleString()}</b>Spend
          </span>
        </div>

        <div className="pad top-gap">
          <Segmented value={tab} options={PROFILE_TABS} onChange={setTab} />
        </div>

        {tab === "Visits" && (
          <ul className="history">
            {history.map((r) => (
              <li key={r.id}>
                <button onClick={() => push({ kind: "reservation", id: r.id })}>
                  <span>
                    <b>{TODAY_LABELS[r.day]}</b>
                    <small className="muted block">
                      {r.time} · party of {r.size}
                      {r.table ? ` · Table ${r.table}` : ""}
                    </small>
                  </span>
                  <StatusPill status={r.status} />
                </button>
              </li>
            ))}
            {history.length === 0 && <li className="empty">No visits in the last week</li>}
          </ul>
        )}
        {tab === "Notes" && (
          <div className="pad stack">
            <textarea className="text-area" rows={4} placeholder="Add a general note" value={note} onChange={(e) => setNote(e.target.value)} />
            <button
              className="primary-btn"
              disabled={note === (g.note ?? "")}
              onClick={() => {
                updateGuest(id, { note });
                toast("Guest note saved");
              }}
            >
              Save note
            </button>
          </div>
        )}
        {tab === "Preferences" && (
          <ul className="prefs">
            <li>
              <Icon name="allergy" size={18} />
              <span>
                <b>Dietary</b>
                <small className="muted block">{g.allergy ?? "No restrictions on file"}</small>
              </span>
            </li>
            <li>
              <Icon name="booth" size={18} />
              <span>
                <b>Seating</b>
                <small className="muted block">{g.tags.includes("Booth") ? "Booth requested" : g.tags.includes("Patio") ? "Patio preferred" : "No preference"}</small>
              </span>
            </li>
            <li>
              <Icon name="mail" size={18} />
              <span>
                <b>Email</b>
                <small className="muted block">{g.email}</small>
              </span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
