import { useState } from "react";
import { useApp } from "../app-context";
import { ShiftHeader } from "../components";
import { PACING_LIMIT, SHIFT_FLOW, SLOTS, WEEK_COVERS } from "../data";
import { Icon } from "../icons";
import { ResoRow, toMin } from "./Book";

const VIEWS = ["Stats", "Overview", "Guest List"] as const;

export function StatsScreen() {
  const [view, setView] = useState<(typeof VIEWS)[number]>("Stats");
  return (
    <div className="screen dark">
      <ShiftHeader>
        <nav className="top-tabs" role="tablist">
          {VIEWS.map((v) => (
            <button key={v} role="tab" aria-selected={view === v} className={view === v ? "on" : ""} onClick={() => setView(v)}>
              {v}
            </button>
          ))}
        </nav>
      </ShiftHeader>
      <div className={`scroll ${view === "Guest List" ? "" : "report-bg"}`}>
        {view === "Stats" && <StatsView />}
        {view === "Overview" && <OverviewView />}
        {view === "Guest List" && <GuestListView />}
      </div>
    </div>
  );
}

function StatsView() {
  const { shiftResos } = useApp();
  const live = shiftResos.filter((r) => r.status !== "Cancelled" && r.status !== "No-show");
  const covers = live.reduce((s, r) => s + r.size, 0);
  const by = (src: string) => live.filter((r) => r.source === src).reduce((s, r) => s + r.size, 0);
  const phone = by("Phone");
  const walk = by("Walk-in");
  const online = by("Online");
  const prevCovers = Math.max(1, Math.round(covers * 0.78));
  const revenue = covers * 84.7;
  const prevRevenue = prevCovers * 86.1;
  const cancelled = shiftResos.filter((r) => r.status === "Cancelled").reduce((s, r) => s + r.size, 0);
  const noShow = shiftResos.filter((r) => r.status === "No-show").reduce((s, r) => s + r.size, 0);
  const flowMax = Math.max(...SHIFT_FLOW.map((f) => Math.max(f.now, f.avg)));
  const peak = SHIFT_FLOW.reduce((a, b) => (b.now > a.now ? b : a));
  const weekMax = Math.max(...WEEK_COVERS.map((w) => w.v));
  const max = Math.max(revenue, prevRevenue);
  return (
    <>
      <section className="report">
        <h2>
          Revenue <Icon name="chevR" size={16} stroke={2.4} className="teal" />
        </h2>
        <div className="row-between small">
          <span>
            <b>${Math.round(revenue).toLocaleString()}</b> This shift
          </span>
          <span className="muted">
            <b>${prevRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b> previous 4 Thu
          </span>
        </div>
        <span className="cmp-bar" style={{ width: `${(revenue / max) * 100}%` }} />
        <span className="cmp-bar prev" style={{ width: `${(prevRevenue / max) * 100}%` }} />
      </section>

      <section className="report">
        <h2>
          Shift Stats <Icon name="chevR" size={16} stroke={2.4} className="teal" />
        </h2>
        <div className="row-between small">
          <span>
            <b>{covers}</b> Covers
          </span>
          <span className="muted">
            <b>{prevCovers}</b> covers previous 4 Thu
          </span>
        </div>
        <span className="cmp-bar blue" style={{ width: "100%" }} />
        <span className="cmp-bar prev" style={{ width: `${(prevCovers / covers) * 100}%` }} />
        <div className="split-legend">
          <span className="c-phone">
            <b>{phone}</b> Phone
          </span>
          <span className="c-walk">
            <b>{walk}</b> Walk-Ins
          </span>
          <span className="c-online">
            <b>{online}</b> Online
          </span>
        </div>
        <div className="split-bar">
          <i className="c-phone" style={{ flex: phone || 0.01 }} />
          <i className="c-walk" style={{ flex: walk || 0.01 }} />
          <i className="c-online" style={{ flex: online || 0.01 }} />
        </div>
      </section>

      <section className="report">
        <div className="row-between">
          <h2>
            Shift Flow <Icon name="chevR" size={16} stroke={2.4} className="teal" />
          </h2>
          <span className="small">
            <b>{peak.now}</b> Covers at {peak.t}
          </span>
        </div>
        <div className="flow-chart" aria-label="Covers by half hour">
          {SHIFT_FLOW.map((f) => (
            <span key={f.t} className="fc-col">
              <span className="fc-bars">
                <i className="avg" style={{ height: `${(f.avg / flowMax) * 100}%` }} />
                <i className="now" style={{ height: `${(f.now / flowMax) * 100}%` }}>
                  <em>{f.now}</em>
                </i>
              </span>
              <small>{f.t}</small>
            </span>
          ))}
        </div>
        <div className="mini-legend">
          <span>
            <i className="now" /> This shift
          </span>
          <span>
            <i className="avg" /> 4-week trend
          </span>
        </div>
      </section>

      <section className="report kpi-grid">
        <span>
          <small>Total parties</small>
          <b>{live.length}</b>
          <small className="muted">4-week trend {Math.round(live.length * 0.85)}</small>
        </span>
        <span>
          <small>Walk-in covers</small>
          <b>{walk}</b>
          <small className="muted">4-week trend 9</small>
        </span>
        <span>
          <small>Canceled covers</small>
          <b>{cancelled}</b>
          <small className="muted">4-week trend 6</small>
        </span>
        <span>
          <small>No-show covers</small>
          <b>{noShow}</b>
          <small className="muted">4-week trend 3</small>
        </span>
      </section>

      <section className="report">
        <h2>Covers this week</h2>
        <div className="week-chart">
          {WEEK_COVERS.map((w) => (
            <span key={w.d} className="wk-col">
              <i style={{ height: `${(w.v / weekMax) * 100}%` }} />
              <small>{w.d}</small>
            </span>
          ))}
        </div>
      </section>

      <section className="report">
        <h2>Compare to local restaurants</h2>
        <p className="small muted">Mission District · similar price and cuisine</p>
        <div className="bench">
          <span>
            <b className="up">+12%</b>
            <small>Covers vs area</small>
          </span>
          <span>
            <b>4.6</b>
            <small>Avg rating (area 4.3)</small>
          </span>
          <span>
            <b className="down">2.1%</b>
            <small>No-show rate</small>
          </span>
        </div>
      </section>
    </>
  );
}

function OverviewView() {
  const { shift, shiftResos } = useApp();
  return (
    <section className="report">
      <div className="row-between">
        <h2>Pacing by slot</h2>
        <span className="small muted">Limit {PACING_LIMIT} covers / 15 min</span>
      </div>
      <ul className="pacing">
        {SLOTS[shift].map((s) => {
          const rs = shiftResos.filter((r) => r.time === s && r.status !== "Cancelled");
          const c = rs.reduce((x, r) => x + r.size, 0);
          return (
            <li key={s}>
              <span className="pc-time">{s}</span>
              <span className="pc-bar">
                <i className={c > PACING_LIMIT ? "over" : ""} style={{ width: `${Math.min(100, (c / PACING_LIMIT) * 100)}%` }} />
              </span>
              <span className="pc-num">
                <b>{c}</b>/{PACING_LIMIT}
              </span>
              <span className="pc-parties muted">{rs.length ? `${rs.length}p` : ""}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function GuestListView() {
  const { shiftResos } = useApp();
  const all = [...shiftResos].sort((a, b) => toMin(a.time) - toMin(b.time));
  return all.length ? (
    <>
      {all.map((r) => (
        <ResoRow key={r.id} r={r} />
      ))}
    </>
  ) : (
    <p className="empty">No reservations for this shift</p>
  );
}
