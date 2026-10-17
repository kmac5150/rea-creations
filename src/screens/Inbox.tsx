import { useState } from "react";
import { useApp } from "../app-context";
import { NavHeader, Stars, Toggle } from "../components";
import type { LeadStatus } from "../data";
import { Icon } from "../icons";

const FILTERS: ("All" | LeadStatus)[] = ["All", "Active", "Scheduled", "In progress", "Done", "Archived"];

export function InboxScreen() {
  const { leads, push } = useApp();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = leads.filter((l) => filter === "All" || l.status === filter);
  return (
    <div className="screen">
      <header className="nav-header">
        <span className="nh-side" />
        <h1>Inbox</h1>
        <span className="nh-side" />
      </header>
      <div className="chip-row scroll-x">
        {FILTERS.map((f) => (
          <button key={f} className={`chip ${filter === f ? "on" : ""}`} onClick={() => setFilter(f)}>
            {f}
            {f !== "All" && <span className="chip-n">{leads.filter((l) => l.status === f).length}</span>}
          </button>
        ))}
      </div>
      <div className="scroll">
        {shown.length === 0 && <p className="empty">No {filter.toLowerCase()} leads.</p>}
        <ul className="list">
          {shown.map((l) => (
            <li key={l.id}>
              <button className={`lead-row ${l.unread ? "unread" : ""}`} onClick={() => push({ kind: "thread", id: l.id })}>
                <img src={l.avatar} alt="" />
                <span className="lr-main">
                  <span className="row-between">
                    <b>{l.user}</b>
                    <span className="muted small">{l.when}</span>
                  </span>
                  <b className="lead-title">{l.title}</b>
                  <span className="ai-summary">✨ {l.summary}</span>
                  <span className="row-gap">
                    <span className={`status s-${l.status.replace(" ", "")}`}>{l.status}</span>
                    <span className="muted small">{l.source}</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ThreadScreen({ id }: { id: string }) {
  const { leads, sendMessage, setLeadStatus, toast } = useApp();
  const lead = leads.find((l) => l.id === id);
  const [text, setText] = useState("");
  if (!lead) return null;
  return (
    <div className="screen">
      <NavHeader title={lead.user} />
      <div className="thread-head">
        <img src={lead.avatar} alt="" />
        <span>
          <b>{lead.title}</b>
          <span className="muted small block">{lead.summary}</span>
        </span>
      </div>
      <div className="chip-row scroll-x">
        {(["Active", "Scheduled", "In progress", "Done", "Archived"] as LeadStatus[]).map((s) => (
          <button
            key={s}
            className={`chip ${lead.status === s ? "on" : ""}`}
            onClick={() => {
              setLeadStatus(id, s);
              toast(`Marked ${s.toLowerCase()}`);
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="scroll thread">
        {lead.messages.map((m, i) => (
          <div key={i} className={`bubble ${m.from}`}>
            {m.text}
            <span className="bubble-at">{m.at}</span>
          </div>
        ))}
      </div>
      <div className="composer">
        <textarea placeholder="Write a reply…" value={text} onChange={(e) => setText(e.target.value)} rows={2} />
        <button
          className="send-btn"
          disabled={!text.trim()}
          onClick={() => {
            sendMessage(id, text.trim());
            setText("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export function ReviewsScreen() {
  const { reviews, push } = useApp();
  const [filter, setFilter] = useState<"All" | "Needs reply">("All");
  const shown = reviews.filter((r) => filter === "All" || !r.reply);
  return (
    <div className="screen">
      <NavHeader title="Reviews" />
      <div className="chip-row">
        {(["All", "Needs reply"] as const).map((f) => (
          <button key={f} className={`chip ${filter === f ? "on" : ""}`} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      <div className="scroll">
        <ul className="list">
          {shown.map((r) => (
            <li key={r.id}>
              <button className="review-row" onClick={() => push({ kind: "review", id: r.id })}>
                <img src={r.avatar} alt="" />
                <span className="lr-main">
                  <span className="row-between">
                    <b>{r.user}</b>
                    <span className="muted small">{r.date.split(",").slice(0, 2).join(",")}</span>
                  </span>
                  <Stars value={r.stars} size={15} />
                  <span className="clamp3">{r.text}</span>
                  {r.reply ? <span className="replied">{r.reply.isPublic ? "Public comment" : "Private message"} sent</span> : <span className="needs">Respond</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ReviewScreen({ id }: { id: string }) {
  const { reviews, replyReview, pop, toast } = useApp();
  const r = reviews.find((x) => x.id === id);
  const [text, setText] = useState(r?.reply?.text ?? "");
  const [isPublic, setPublic] = useState(r?.reply?.isPublic ?? false);
  if (!r) return null;
  return (
    <div className="screen">
      <header className="nav-header red">
        <span className="nh-side">
          <button className="text-btn white" onClick={pop}>
            Cancel
          </button>
        </span>
        <h1>{r.user}</h1>
        <span className="nh-side right">
          <button
            className="text-btn white"
            disabled={!text.trim()}
            onClick={() => {
              replyReview(id, text.trim(), isPublic);
              toast(isPublic ? "Public comment posted" : "Private message sent");
              pop();
            }}
          >
            Send
          </button>
        </span>
      </header>
      <div className="scroll">
        <div className="pad review-full">
          <div className="reviewer">
            <img src={r.avatar} alt="" />
            <span>
              <b>{r.user}</b>
              <span className="rv-stats">
                <Icon name="star" size={11} /> {r.friends} · {r.reviews} reviews · <Icon name="camera" size={11} /> {r.photos}
                {r.elite && <span className="elite">{r.elite}</span>}
              </span>
            </span>
          </div>
          <div className="row-between">
            <Stars value={r.stars} size={18} />
            <span className="muted small">{r.date}</span>
          </div>
          <p>{r.text}</p>
        </div>
        <div className="pad reply-box">
          <textarea placeholder="Thanks for your review…" value={text} onChange={(e) => setText(e.target.value)} rows={5} />
          <Toggle label="Make Reply Public" on={isPublic} onChange={() => setPublic(!isPublic)} />
          <p className="muted small">Public comments appear under the review. Private messages go only to {r.user.split(" ")[0]}.</p>
        </div>
      </div>
    </div>
  );
}
