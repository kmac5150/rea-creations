import { useState } from "react";
import { useApp } from "../app-context";
import { Caps, PageTitle, Segmented, SheetFrame, VenueBar } from "../components";
import { CHECKIN_SERIES, MENU_VIEWS, PREMISE_SPLIT, RANGE_SCALE, TOP_STYLES, fmt } from "../data";
import { Icon } from "../icons";

const PREMISE = ["All", "On Premise", "Off Premise"] as const;
const BUCKETS = ["Day", "Week", "Month", "Quarter"] as const;

export function InsightsScreen() {
  const { range, openSheet } = useApp();
  const [premise, setPremise] = useState<(typeof PREMISE)[number]>("All");
  const [bucket, setBucket] = useState<(typeof BUCKETS)[number]>("Week");
  const [viewBucket, setViewBucket] = useState<(typeof BUCKETS)[number]>("Week");
  const k = RANGE_SCALE[range] * PREMISE_SPLIT[premise];
  const checkIns = 613 * k;
  const unique = 136 * Math.sqrt(k);
  const views = 1300 * RANGE_SCALE[range];
  const series = CHECKIN_SERIES[bucket].map((d) => ({ ...d, v: d.v * PREMISE_SPLIT[premise] }));
  const max = Math.max(...series.map((d) => d.v), 1);
  const vmax = Math.max(...MENU_VIEWS.map((d) => d.app + d.web + d.api + d.site));
  return (
    <div className="screen">
      <VenueBar />
      <div className="scroll">
        <PageTitle title="Insights" />
        <div className="pad stack">
          <button className="select" onClick={() => openSheet({ kind: "range" })}>
            {range}
            <Icon name="chevronDown" size={18} />
          </button>
          <Segmented options={PREMISE} value={premise} onChange={setPremise} />
        </div>
        <section className="panel">
          <div className="stat-grid">
            <Stat n={checkIns} label="CHECK-INS" />
            <Stat n={views} label="MENU VIEWS" />
            <Stat n={unique} label="UNIQUE USERS" />
            <Stat n={0} label="SUBSCRIBERS" />
          </div>
        </section>
        <section className="panel">
          <h3 className="panel-title">
            <span className="pt-icon gold">
              <Icon name="check" size={14} />
            </span>
            Check-Ins
          </h3>
          <Segmented options={BUCKETS} value={bucket} onChange={setBucket} />
          <div className="stat-row3">
            <Stat n={checkIns} label="TOTAL" small />
            <Stat n={unique} label="UNIQUE USERS" small />
            <div className="stat small">
              <b>{(checkIns / Math.max(unique, 1)).toFixed(2)}</b>
              <span>CHECK-IN RATIO</span>
            </div>
          </div>
          <div className="bar-chart">
            {series.map((d) => (
              <div key={d.label} className="bar-col">
                <span className="bar-val">{fmt(d.v)}</span>
                <span className="bar" style={{ height: `${(d.v / max) * 150}px` }} />
                <span className="bar-label">{d.label}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <h3 className="panel-title">
            <span className="pt-icon green">
              <Icon name="eye" size={14} />
            </span>
            Menu Views
          </h3>
          <Segmented options={BUCKETS} value={viewBucket} onChange={setViewBucket} />
          <div className="stat-row3">
            <Stat n={views} label="TOTAL" small />
            <Stat n={views * 0.17} label="APP VIEWS" small />
            <Stat n={views * 0.024} label="UNTAPPD WEB VIEWS" small />
          </div>
          <div className="bar-chart">
            {MENU_VIEWS.map((d) => {
              const total = d.app + d.web + d.api + d.site;
              return (
                <div key={d.label} className="bar-col">
                  <span className="bar-val">{fmt(total)}</span>
                  <span className="stack-bar" style={{ height: `${(total / vmax) * 150}px` }}>
                    <i style={{ flex: d.app, background: "#4a90e2" }} />
                    <i style={{ flex: d.web, background: "#5cc96b" }} />
                    <i style={{ flex: d.api, background: "#f5d76e" }} />
                    <i style={{ flex: d.site, background: "#f5a35a" }} />
                  </span>
                  <span className="bar-label">{d.label}</span>
                </div>
              );
            })}
          </div>
          <div className="legend">
            <span>
              <i style={{ background: "#4a90e2" }} />
              Untappd App
            </span>
            <span>
              <i style={{ background: "#5cc96b" }} />
              Untappd Web
            </span>
            <span>
              <i style={{ background: "#f5d76e" }} />
              API
            </span>
            <span>
              <i style={{ background: "#f5a35a" }} />
              Website
            </span>
          </div>
        </section>
        <section className="panel">
          <h3 className="panel-title">
            <span className="pt-icon green">
              <Icon name="trend" size={14} />
            </span>
            Top Rated Styles
          </h3>
          {TOP_STYLES.map((s, i) => (
            <div key={s.name} className="style-row">
              <span className="sr-rank">{i + 1}</span>
              <span className="sr-main">
                <b>{s.name}</b>
                <span className="row">
                  <Caps rating={s.rating} size={14} /> <span className="muted small">Your Venue Rating</span>
                </span>
                <span className="green-tag">{Math.max(1, Math.round(s.checkIns * RANGE_SCALE[range]))} Check-Ins</span>
              </span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function Stat({ n, label, small = false }: { n: number; label: string; small?: boolean }) {
  return (
    <div className={`stat ${small ? "small" : ""}`}>
      <b>{fmt(n)}</b>
      <span>{label}</span>
    </div>
  );
}

const RANGES = ["Last 24 Hours", "Last 7 Days", "Last 30 Days", "Last 90 Days", "Last 365 Days"] as const;

export function RangeSheet() {
  const { range, setRange, closeSheet } = useApp();
  return (
    <SheetFrame title="Timeframe">
      {RANGES.map((r) => (
        <button
          key={r}
          className="sheet-row"
          onClick={() => {
            setRange(r);
            closeSheet();
          }}
        >
          <span>{r}</span>
          {r === range && <Icon name="check" size={18} />}
        </button>
      ))}
    </SheetFrame>
  );
}
