import { useState } from "react";
import { useApp } from "../app-context";
import { isActive, Segmented, SheetFrame, ShiftHeader, StatusPill } from "../components";
import { guestName, TABLES, type Reservation } from "../data";
import { Icon } from "../icons";
import { toMin } from "./Book";

type TableState = { kind: "seated" | "reserved" | "bussing" | "open"; reso?: Reservation };

const NOW = toMin("6:42 pm");

export function useTableStates() {
  const { shiftResos } = useApp();
  const out = new Map<string, TableState>();
  for (const t of TABLES) {
    const seated = shiftResos.find((r) => r.table === t.id && r.status === "Seated");
    const next = shiftResos.filter((r) => r.table === t.id && isActive(r.status)).sort((a, b) => toMin(a.time) - toMin(b.time))[0];
    const bussing = shiftResos.find((r) => r.table === t.id && r.status === "Finished");
    if (seated) out.set(t.id, { kind: "seated", reso: seated });
    else if (next && toMin(next.time) - NOW <= 60) out.set(t.id, { kind: "reserved", reso: next });
    else if (bussing) out.set(t.id, { kind: "bussing", reso: bussing });
    else out.set(t.id, { kind: "open", reso: next });
  }
  return out;
}

const SECTIONS = ["All", "Main", "Bar", "Patio"] as const;

export function FloorScreen() {
  const { openSheet } = useApp();
  const [section, setSection] = useState<(typeof SECTIONS)[number]>("All");
  const states = useTableStates();
  const counts = { seated: 0, reserved: 0, bussing: 0, open: 0 };
  states.forEach((s) => counts[s.kind]++);
  return (
    <div className="screen dark">
      <ShiftHeader>
        <Segmented value={section} options={SECTIONS} onChange={setSection} dark />
      </ShiftHeader>
      <div className="floor-wrap">
        <div className="floor">
          {TABLES.map((t) => {
            const s = states.get(t.id)!;
            const dim = section !== "All" && t.section !== section;
            return (
              <button
                key={t.id}
                className={`ft ft-${t.shape} ft-${s.kind} ${dim ? "dim" : ""}`}
                style={{ left: `${t.x}%`, top: `${t.y}%`, width: `${t.w}%`, ...(t.shape === "round" ? { aspectRatio: "1" } : { height: `${t.h}%` }) }}
                onClick={() => openSheet({ kind: "table", tableId: t.id })}
                aria-label={`Table ${t.id}, ${s.kind}`}
              >
                {s.kind === "seated" && s.reso && <i className="ft-size">{s.reso.size}</i>}
                {s.kind === "seated" && <i className="ft-progress" />}
                <span>{t.id}</span>
              </button>
            );
          })}
          <span className="floor-label" style={{ top: "37%" }}>
            Bar
          </span>
          <span className="floor-label" style={{ top: "57%" }}>
            Patio
          </span>
        </div>
      </div>
      <div className="legend">
        <span>
          <i className="lg-seated" /> Seated {counts.seated}
        </span>
        <span>
          <i className="lg-reserved" /> Next hour {counts.reserved}
        </span>
        <span>
          <i className="lg-bussing" /> Bussing {counts.bussing}
        </span>
        <span>
          <i className="lg-open" /> Open {counts.open}
        </span>
      </div>
    </div>
  );
}

export function TableSheet({ tableId }: { tableId: string }) {
  const { guests, setStatus, assignTable, closeSheet, openSheet, push, toast } = useApp();
  const t = TABLES.find((x) => x.id === tableId)!;
  const s = useTableStates().get(tableId)!;
  const g = s.reso ? guests.find((x) => x.id === s.reso!.guestId) : undefined;
  return (
    <SheetFrame title={`Table ${t.id} · ${t.seats} seats`} dark>
      <p className="muted">{t.section} dining room</p>
      {s.reso && g && (
        <button
          className="sheet-reso"
          onClick={() => {
            closeSheet();
            push({ kind: "reservation", id: s.reso!.id });
          }}
        >
          <span>
            <b>
              {guestName(g)} · {s.reso.size}
            </b>
            <small className="muted block">{s.reso.status === "Seated" ? `Seated at ${s.reso.seatedAt}` : `${s.reso.time} reservation`}</small>
          </span>
          <StatusPill status={s.reso.status} />
        </button>
      )}
      {s.kind === "seated" && s.reso && (
        <button
          className="primary-btn"
          onClick={() => {
            setStatus(s.reso!.id, "Finished");
            closeSheet();
          }}
        >
          <Icon name="check" size={18} /> Finish &amp; free table
        </button>
      )}
      {s.kind === "reserved" && s.reso && (
        <button
          className="primary-btn"
          onClick={() => {
            setStatus(s.reso!.id, "Seated");
            closeSheet();
          }}
        >
          <Icon name="table" size={18} /> Seat {g?.first} now
        </button>
      )}
      {s.kind === "bussing" && s.reso && (
        <button
          className="primary-btn"
          onClick={() => {
            assignTable(s.reso!.id, "");
            closeSheet();
            toast(`Table ${t.id} is clean and open`);
          }}
        >
          Mark table clean
        </button>
      )}
      {(s.kind === "open" || s.kind === "bussing") && (
        <button className="secondary-btn dark" onClick={() => openSheet({ kind: "newReso", walkIn: true })}>
          <Icon name="walk" size={18} /> Seat a walk-in
        </button>
      )}
    </SheetFrame>
  );
}
