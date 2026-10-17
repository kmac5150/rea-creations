import { useState } from "react";
import { useApp } from "../app-context";
import { NavHeader, SheetFrame, Toggle } from "../components";
import { Icon, type IconName } from "../icons";

export function InfoScreen() {
  const { biz, updateBiz, photos, addPhoto, openSheet, push } = useApp();
  const rows: { field: "name" | "address" | "phone" | "website"; icon: IconName; label: string }[] = [
    { field: "name", icon: "store", label: "Business name" },
    { field: "address", icon: "pin", label: "Address" },
    { field: "phone", icon: "call", label: "Phone" },
    { field: "website", icon: "website", label: "Website" },
  ];
  const done = [biz.phone, biz.website, photos.length >= 10, biz.hours.length === 7, biz.cta.on].filter(Boolean).length;
  return (
    <div className="screen">
      <header className="nav-header">
        <span className="nh-side" />
        <h1>Business Info</h1>
        <span className="nh-side right">
          <button className="icon-btn" aria-label="Add photo" onClick={addPhoto}>
            <Icon name="plus" size={24} />
          </button>
        </span>
      </header>
      <div className="scroll">
        <section className="completeness pad">
          <span className="row-between">
            <b>Your page is {Math.round((done / 5) * 100)}% complete</b>
            <span className="muted small">{done}/5</span>
          </span>
          <span className="bar">
            <i style={{ width: `${(done / 5) * 100}%` }} />
          </span>
        </section>
        <h2 className="section-head">Basic information</h2>
        <div className="list">
          {rows.map((r) => (
            <button key={r.field} className="list-row" onClick={() => openSheet({ kind: "editField", field: r.field })}>
              <span className="recent-icon">
                <Icon name={r.icon} size={18} />
              </span>
              <span className="lr-main">
                <span className="muted small block">{r.label}</span>
                <b>{biz[r.field]}</b>
              </span>
              <Icon name="chevron" size={18} />
            </button>
          ))}
          <button className="list-row" onClick={() => push({ kind: "hours" })}>
            <span className="recent-icon">
              <Icon name="clock" size={18} />
            </span>
            <span className="lr-main">
              <span className="muted small block">Hours</span>
              <b>{biz.hours.filter((h) => !h.closed).length} days a week</b>
            </span>
            <Icon name="chevron" size={18} />
          </button>
        </div>
        <h2 className="section-head">Photos</h2>
        <p className="pad muted small">Automatically Sorted · These photos will automatically be ordered by Yelp.</p>
        <div className="photo-grid">
          <button className="add-photo" onClick={addPhoto}>
            <Icon name="camera" size={28} />
            Add Photo
          </button>
          {photos.map((src) => (
            <button key={src} className="photo" onClick={() => openSheet({ kind: "photo", src })}>
              <img src={src} alt="" />
            </button>
          ))}
        </div>
        <h2 className="section-head">Amenities and more</h2>
        <div className="pad">
          {biz.amenities.map((a, i) => (
            <Toggle key={a.label} label={a.label} on={a.on} onChange={() => updateBiz({ amenities: biz.amenities.map((x, j) => (j === i ? { ...x, on: !x.on } : x)) })} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function EditFieldSheet({ field }: { field: "name" | "phone" | "website" | "address" }) {
  const { biz, updateBiz, closeSheet, toast } = useApp();
  const [v, setV] = useState(biz[field]);
  const label = { name: "Business name", phone: "Phone", website: "Website", address: "Address" }[field];
  return (
    <SheetFrame title={`Edit ${label}`}>
      <input className="text-input" value={v} onChange={(e) => setV(e.target.value)} />
      <p className="muted small">Changes are reviewed by Yelp's moderators before they appear on your page.</p>
      <button
        className="primary-btn"
        disabled={!v.trim()}
        onClick={() => {
          updateBiz({ [field]: v.trim() } as Partial<typeof biz>);
          toast(`${label} saved`);
          closeSheet();
        }}
      >
        Save
      </button>
    </SheetFrame>
  );
}

export function PhotoSheet({ src }: { src: string }) {
  const { removePhoto, closeSheet, toast } = useApp();
  return (
    <SheetFrame title="Photo">
      <img className="photo-large" src={src} alt="" />
      <button
        className="secondary-btn"
        onClick={() => {
          removePhoto(src);
          toast("Photo removed");
          closeSheet();
        }}
      >
        Remove from page
      </button>
    </SheetFrame>
  );
}

export function HoursScreen() {
  const { biz, updateBiz, toast, pop } = useApp();
  const [hours, setHours] = useState(biz.hours);
  return (
    <div className="screen">
      <NavHeader
        title="Hours"
        right={
          <button
            className="text-btn"
            onClick={() => {
              updateBiz({ hours });
              toast("Hours saved");
              pop();
            }}
          >
            Save
          </button>
        }
      />
      <div className="scroll">
        <div className="list">
          {hours.map((h, i) => (
            <div key={h.day} className="list-row static hours-row">
              <b className="hr-day">{h.day}</b>
              {h.closed ? (
                <span className="muted lr-main">Closed</span>
              ) : (
                <span className="lr-main hr-times">
                  <input value={h.open} onChange={(e) => setHours((hs) => hs.map((x, j) => (j === i ? { ...x, open: e.target.value } : x)))} />
                  –
                  <input value={h.close} onChange={(e) => setHours((hs) => hs.map((x, j) => (j === i ? { ...x, close: e.target.value } : x)))} />
                </span>
              )}
              <button className="text-btn small" onClick={() => setHours((hs) => hs.map((x, j) => (j === i ? { ...x, closed: !x.closed } : x)))}>
                {h.closed ? "Open" : "Close"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CtaSheet() {
  const { biz, updateBiz, closeSheet, toast } = useApp();
  const [text, setText] = useState(biz.cta.text);
  const [button, setButton] = useState(biz.cta.button);
  return (
    <SheetFrame title="Call to Action">
      <label className="field-label">
        Offer text
        <input className="text-input" value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <div className="chip-row">
        {["Call Now", "Book a Table", "View Menu", "Get Offer"].map((b) => (
          <button key={b} className={`chip ${button === b ? "on" : ""}`} onClick={() => setButton(b)}>
            {b}
          </button>
        ))}
      </div>
      <button
        className="primary-btn"
        onClick={() => {
          updateBiz({ cta: { text, button, on: true } });
          toast("Call to Action updated");
          closeSheet();
        }}
      >
        Save
      </button>
    </SheetFrame>
  );
}
