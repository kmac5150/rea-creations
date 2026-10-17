import { useState } from "react";
import { useApp } from "../app-context";
import { Caps, Label, PageTitle, Segmented, SheetFrame, VenueBar } from "../components";
import { VENUES } from "../data";
import { Icon } from "../icons";

const MODES = ["On Premise", "Purchased From"] as const;

export function CheckInsScreen() {
  const { checkIns, toastCheckIn, openSheet, venueId } = useApp();
  const [mode, setMode] = useState<(typeof MODES)[number]>("On Premise");
  const venue = VENUES.find((v) => v.id === venueId) ?? VENUES[0];
  const shown = checkIns.filter((c) => (mode === "On Premise" ? c.premise === "on" : c.premise === "purchased"));
  let lastDate = "";
  return (
    <div className="screen">
      <VenueBar />
      <div className="scroll">
        <PageTitle title="Check-Ins" />
        <div className="pad">
          <Segmented options={MODES} value={mode} onChange={setMode} />
        </div>
        <div className="feed">
          {shown.map((c) => {
            const head = c.date !== lastDate ? c.date : null;
            lastDate = c.date;
            const toasted = c.toasts.includes(venue.name);
            return (
              <div key={c.id}>
                {head && <p className="date-head">{head}</p>}
                <div className="ci-user">
                  <span className="avatar">{c.avatar}</span>
                  <b>{c.user}</b>
                  <span className="muted small">{c.ago}</span>
                </div>
                <div className="ci-card">
                  <div className="ci-beer">
                    <Label label={c.label} size={46} />
                    <div>
                      <b className="ci-name">{c.beer}</b>
                      <span className="ic-meta">
                        {c.brewery} • {c.style} • {c.abv.toFixed(1)}% ABV
                      </span>
                      {(c.emoji || c.comment) && (
                        <p className="quote">
                          <span>“</span>
                          {c.emoji ?? c.comment}
                          <span>”</span>
                        </p>
                      )}
                      <Caps rating={c.rating} />
                    </div>
                  </div>
                  {c.premise === "purchased" && (
                    <p className="muted small">
                      Purchased from <b>Demo Account</b>
                    </p>
                  )}
                  {c.badge && <p className="badge-line">🏅 {c.badge}</p>}
                  {c.photo && <img className="ci-photo" src={c.photo} alt="" />}
                  <div className="ci-actions">
                    <button onClick={() => openSheet({ kind: "comment", checkInId: c.id })}>
                      <Icon name="comment" size={18} /> Comment
                    </button>
                    <button className={toasted ? "toasted" : ""} onClick={() => toastCheckIn(c.id)}>
                      <Icon name="toast" size={18} /> {toasted ? "Toasted" : "Toast"}
                    </button>
                  </div>
                  {c.toasts.length > 0 && <p className="muted small">Toasted by {c.toasts.join(", ")}</p>}
                  {c.comments.map((m, i) => (
                    <p key={i} className="ci-comment">
                      <b>{m.by}</b> {m.text}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function CommentSheet({ checkInId }: { checkInId: string }) {
  const { checkIns, commentCheckIn, closeSheet, toast } = useApp();
  const c = checkIns.find((x) => x.id === checkInId);
  const [text, setText] = useState("");
  if (!c) return null;
  return (
    <SheetFrame title={`Reply to ${c.user}`}>
      <p className="muted pad-b">
        On their check-in of <b>{c.beer}</b>
      </p>
      <textarea className="textarea" rows={3} placeholder="Leave a message…" value={text} onChange={(e) => setText(e.target.value)} />
      <button
        className="primary-btn"
        disabled={!text.trim()}
        onClick={() => {
          commentCheckIn(checkInId, text.trim());
          toast("Comment posted");
          closeSheet();
        }}
      >
        Post Comment
      </button>
    </SheetFrame>
  );
}
