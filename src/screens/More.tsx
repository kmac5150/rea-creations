import { useState } from "react";
import { useApp } from "../app-context";
import { BackButton, OutlineButton, PageTitle, VenueBar } from "../components";
import { DIGITAL_BOARDS, THEMES, VENUES } from "../data";
import { Icon, type IconName } from "../icons";

const ROWS: { icon: IconName; label: string; go: "digital" | "history" | "announcements" | "nearby" | "print" | "embed" | "promo" | "settings" | "logout" }[] = [
  { icon: "tv", label: "Digital Menus", go: "digital" },
  { icon: "clock", label: "Menu History", go: "history" },
  { icon: "megaphone", label: "Announcements", go: "announcements" },
  { icon: "venue", label: "Nearby Stats", go: "nearby" },
  { icon: "trend", label: "Promo Stats", go: "promo" },
  { icon: "print", label: "Print Menus", go: "print" },
  { icon: "copy", label: "Embed Menu", go: "embed" },
  { icon: "gear", label: "Settings", go: "settings" },
  { icon: "logout", label: "Log Out", go: "logout" },
];

export function MoreScreen() {
  const { push, toast, venueId } = useApp();
  const venue = VENUES.find((v) => v.id === venueId) ?? VENUES[0];
  return (
    <div className="screen">
      <VenueBar />
      <div className="scroll">
        <PageTitle title="More" />
        <div className="pad account-card">
          <span className="acct-avatar">HL</span>
          <span>
            <b>{venue.name}</b>
            <span className="muted small block">Premium · Trial ends Nov 1, 2026</span>
          </span>
        </div>
        <div className="list-group">
          {ROWS.map((r) => (
            <button
              key={r.label}
              className="list-row"
              onClick={() => {
                if (r.go === "digital" || r.go === "history" || r.go === "announcements" || r.go === "nearby") push({ kind: r.go });
                else if (r.go === "print") toast("Menu PDF sent to your printer");
                else if (r.go === "embed") toast("Embed code copied");
                else if (r.go === "promo") toast("Promo stats: 41 redemptions this month");
                else if (r.go === "settings") toast("Opening account settings on the web");
                else toast("Logged out (demo)");
              }}
            >
              <span className="lr-icon">
                <Icon name={r.icon} size={20} />
              </span>
              <span className="lr-label">{r.label}</span>
              <Icon name="chevron" size={18} />
            </button>
          ))}
        </div>
        <p className="muted small center pad">Untappd for Business 6.1.15 · demo data</p>
      </div>
    </div>
  );
}

export function DigitalMenus() {
  const { push, toast } = useApp();
  const [menuFor, setMenuFor] = useState<string | null>(null);
  return (
    <div className="screen">
      <VenueBar />
      <div className="scroll">
        <PageTitle title="Digital Menus" left={<BackButton />} />
        <div className="card-list">
          {DIGITAL_BOARDS.map((b) => (
            <div key={b.id} className="menu-card board">
              <button className="mc-main" onClick={() => push({ kind: "digitalEdit", boardId: b.id })}>
                <b>{b.name}</b>
                <span className="muted">ID: {b.id}</span>
                <span className="muted">Last Edited: {b.edited}</span>
              </button>
              <button className="icon-btn" aria-label="Board options" onClick={() => setMenuFor(menuFor === b.id ? null : b.id)}>
                <Icon name="dots" size={20} />
              </button>
              {menuFor === b.id && (
                <div className="pop-menu">
                  <button onClick={() => push({ kind: "digitalEdit", boardId: b.id })}>
                    <Icon name="gear" size={18} /> Settings
                  </button>
                  <button
                    onClick={() => {
                      setMenuFor(null);
                      toast("Board URL copied");
                    }}
                  >
                    <Icon name="copy" size={18} /> Copy URL
                  </button>
                  <button
                    onClick={() => {
                      setMenuFor(null);
                      toast("Board deleted (demo)");
                    }}
                  >
                    <Icon name="trash" size={18} /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="pad">
          <OutlineButton onClick={() => toast("New digital menu created")}>
            <Icon name="plus" size={18} /> Add New Digital Menu
          </OutlineButton>
        </div>
      </div>
    </div>
  );
}

export function DigitalEdit({ boardId }: { boardId: string }) {
  const { menus, pop, toast, log } = useApp();
  const board = DIGITAL_BOARDS.find((b) => b.id === boardId) ?? DIGITAL_BOARDS[0];
  const [picked, setPicked] = useState<string[]>(board.menus);
  const [theme, setTheme] = useState(board.theme);
  const [tab, setTab] = useState<"Theme" | "Menus">("Menus");
  return (
    <div className="screen">
      <VenueBar />
      <div className="scroll">
        <PageTitle title={board.name} left={<BackButton />} />
        <p className="muted center">ID: {board.id}</p>
        <div className="pad">
          <div className="segmented">
            {(["Menus", "Theme"] as const).map((t) => (
              <button key={t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
        {tab === "Menus" ? (
          <div className="pad">
            <p className="field-head">Select menus to display on this digital menu</p>
            <div className="check-list">
              {menus.map((m) => (
                <button key={m.id} className="checkbox-row" onClick={() => setPicked((p) => (p.includes(m.id) ? p.filter((x) => x !== m.id) : [...p, m.id]))}>
                  <span className={`checkbox ${picked.includes(m.id) ? "on" : ""}`}>{picked.includes(m.id) && <Icon name="check" size={14} />}</span>
                  {m.name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="pad theme-list">
            {THEMES.map((t) => (
              <button key={t.name} className={`theme-card ${theme === t.name ? "on" : ""}`} onClick={() => setTheme(t.name)}>
                <span className="theme-preview" style={{ background: t.bg, color: t.fg }}>
                  <b style={{ color: t.accent }}>MENU</b>
                  {[0, 1, 2, 3].map((i) => (
                    <i key={i} style={{ background: t.fg }} />
                  ))}
                </span>
                <b>{t.name}</b>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="sticky-cta">
        <button
          className="primary-btn"
          onClick={() => {
            log(`Updated digital menu ${board.name} (${theme})`);
            toast("Digital menu saved");
            pop();
          }}
        >
          Save and Exit
        </button>
      </div>
    </div>
  );
}

export function HistoryScreen() {
  const { history } = useApp();
  return (
    <div className="screen">
      <VenueBar />
      <div className="scroll">
        <PageTitle title="Menu History" left={<BackButton />} />
        <div className="list-group">
          {history.length === 0 && <p className="empty">No changes yet. Edit a menu and it shows up here.</p>}
          {history.map((h) => (
            <div key={h.id} className="list-row static">
              <span className="lr-icon">
                <Icon name="clock" size={18} />
              </span>
              <span className="lr-label">
                {h.text}
                <span className="muted small block">{new Date(h.at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} · You</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AnnouncementsScreen() {
  const { history, openSheet } = useApp();
  const sent = history.filter((h) => h.text.startsWith("Announcement: "));
  return (
    <div className="screen">
      <VenueBar />
      <div className="scroll">
        <PageTitle title="Announcements" left={<BackButton />} />
        <div className="list-group">
          {sent.length === 0 && <p className="empty">No announcements sent yet.</p>}
          {sent.map((h) => (
            <div key={h.id} className="list-row static">
              <span className="lr-icon">
                <Icon name="megaphone" size={18} />
              </span>
              <span className="lr-label">{h.text.replace("Announcement: ", "")}</span>
            </div>
          ))}
        </div>
        <div className="pad">
          <OutlineButton onClick={() => openSheet({ kind: "rocket" })}>
            <Icon name="plus" size={18} /> New Announcement
          </OutlineButton>
        </div>
      </div>
    </div>
  );
}

const NEARBY = [
  { name: "Tropical Lightning IPA", brewery: "Wilmington Brewing Company", n: 212 },
  { name: "Low Tide Lager", brewery: "Cape Fear Fermentory", n: 168 },
  { name: "Double Dope", brewery: "Three Sons Brewing Co.", n: 151 },
  { name: "Saltmarsh Gose", brewery: "Brackish Water Brewing", n: 97 },
  { name: "Nightjar Porter", brewery: "Moth & Lantern", n: 74 },
];

export function NearbyScreen() {
  return (
    <div className="screen">
      <VenueBar />
      <div className="scroll">
        <PageTitle title="Nearby Stats" left={<BackButton />} />
        <p className="muted pad">Most checked-in drinks within 5 miles, last 30 days.</p>
        <div className="list-group">
          {NEARBY.map((d, i) => (
            <div key={d.name} className="list-row static">
              <span className="sr-rank">{i + 1}</span>
              <span className="lr-label">
                <b>{d.name}</b>
                <span className="muted small block">{d.brewery}</span>
              </span>
              <span className="green-tag">{d.n} Check-Ins</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
