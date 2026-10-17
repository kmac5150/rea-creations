import { useState } from "react";
import { useApp } from "../app-context";
import { BackButton, OutlineButton, PageTitle, SearchField, Segmented, VenueBar } from "../components";
import { VENUES, type EventItem } from "../data";
import { Icon } from "../icons";

const WHEN = ["In Progress", "Upcoming", "Past"] as const;
const KEY: Record<(typeof WHEN)[number], EventItem["when"]> = { "In Progress": "progress", Upcoming: "upcoming", Past: "past" };

export function EventsScreen() {
  const { events, push } = useApp();
  const [when, setWhen] = useState<(typeof WHEN)[number]>("In Progress");
  const [q, setQ] = useState("");
  const shown = events.filter((e) => e.when === KEY[when] && (!q || e.name.toLowerCase().includes(q.toLowerCase())));
  let last = "";
  return (
    <div className="screen">
      <VenueBar />
      <div className="scroll">
        <PageTitle title="Events" />
        <div className="pad stack">
          <SearchField placeholder="Search" value={q} onChange={setQ} />
          <Segmented options={WHEN} value={when} onChange={setWhen} />
        </div>
        <div className="feed">
          {shown.length === 0 && <p className="empty">No {when.toLowerCase()} events.</p>}
          {shown.map((e) => {
            const head = e.group !== last ? e.group : null;
            last = e.group;
            return (
              <div key={e.id}>
                {head && <p className="date-head">{head}</p>}
                <button className="event-card" onClick={() => push({ kind: "event", eventId: e.id })}>
                  <img src={e.image} alt="" />
                  <span className="ev-body">
                    <span className="ev-when">
                      {e.start} - {e.end}
                    </span>
                    <b>{e.name}</b>
                    <span className="muted small row">
                      <Icon name="venue" size={15} /> {e.location}
                    </span>
                    <span className="muted small">{e.free ? "Free event" : `$${e.price.toFixed(2)} cover`}</span>
                  </span>
                  <Icon name="chevron" size={20} />
                </button>
              </div>
            );
          })}
        </div>
        <div className="pad">
          <OutlineButton onClick={() => push({ kind: "event", eventId: null })}>
            <Icon name="plus" size={18} /> Add New Event
          </OutlineButton>
        </div>
      </div>
    </div>
  );
}

const IMAGES = ["/img/friends.jpg", "/img/flight.jpg", "/img/tap-pour.jpg", "/img/cheers.jpg", "/img/brewhouse.jpg", "/img/margaritas.jpg"];

export function EventDetail({ eventId }: { eventId: string | null }) {
  const { events, saveEvent, deleteEvent, pop, toast, venueId } = useApp();
  const venue = VENUES.find((v) => v.id === venueId) ?? VENUES[0];
  const existing = events.find((e) => e.id === eventId);
  const [draft, setDraft] = useState<EventItem>(
    existing ?? { id: `e${Date.now()}`, name: "", location: venue.address, start: "Oct 25, 2026 at 6pm", end: "Oct 25, 2026 at 10pm EDT", free: true, price: 0, image: IMAGES[0], when: "upcoming", group: "NEXT WEEK" },
  );
  const set = (patch: Partial<EventItem>) => setDraft((d) => ({ ...d, ...patch }));
  return (
    <div className="screen">
      <VenueBar />
      <div className="scroll">
        <PageTitle
          title="Event Details"
          left={<BackButton />}
          right={
            existing ? (
              <button
                className="text-btn danger-text"
                onClick={() => {
                  deleteEvent(existing.id);
                  toast("Event deleted");
                  pop();
                }}
              >
                Delete
              </button>
            ) : null
          }
        />
        <div className="form pad">
          <label>
            <span>
              <i className="req">*</i> Event Name
            </span>
            <input value={draft.name} onChange={(e) => set({ name: e.target.value })} placeholder="Trivia Night" />
          </label>
          <label>
            Location
            <span className="input-icon">
              <input value={draft.location} onChange={(e) => set({ location: e.target.value })} />
              <Icon name="venue" size={20} />
            </span>
          </label>
          <label>
            <span>
              <i className="req">*</i> Start
            </span>
            <input value={draft.start} onChange={(e) => set({ start: e.target.value })} />
          </label>
          <label>
            End
            <input value={draft.end} onChange={(e) => set({ end: e.target.value })} />
          </label>
          <label>
            Price
            <input className="short" disabled={draft.free} inputMode="decimal" value={draft.free ? "$0.00" : String(draft.price)} onChange={(e) => set({ price: Number(e.target.value.replace(/[^\d.]/g, "")) || 0 })} />
          </label>
          <button className="checkbox-row" onClick={() => set({ free: !draft.free })}>
            <span className={`checkbox ${draft.free ? "on" : ""}`}>{draft.free && <Icon name="check" size={14} />}</span>
            This is a free event
          </button>
          <p className="field-head">
            Image <span className="muted small">(display ratio: 16:9)</span>
          </p>
          <div className="image-pick">
            {IMAGES.map((src) => (
              <button key={src} className={draft.image === src ? "on" : ""} onClick={() => set({ image: src })}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="sticky-cta">
        <button
          className="primary-btn"
          disabled={!draft.name.trim()}
          onClick={() => {
            saveEvent(draft);
            toast(existing ? "Event updated" : "Event created. Your subscribers will be notified.");
            pop();
          }}
        >
          Save & Exit
        </button>
      </div>
    </div>
  );
}
