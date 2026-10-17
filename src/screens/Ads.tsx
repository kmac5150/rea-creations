import { useState } from "react";
import { useApp } from "../app-context";
import { SheetFrame, Toggle } from "../components";
import { AD_CUSTOMERS, ADS_MONTHS } from "../data";
import { Icon } from "../icons";

const TABS = ["Performance", "Customers", "Ad controls"] as const;

export function AdsScreen() {
  const { ad, updateAd, openSheet, toast, push } = useApp();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Performance");
  const adsTotal = ADS_MONTHS.reduce((n, m) => n + m.ads, 0);
  const orgTotal = ADS_MONTHS.reduce((n, m) => n + m.organic, 0);
  const max = Math.max(...ADS_MONTHS.map((m) => m.ads + m.organic)) + 1;
  return (
    <div className="screen">
      <header className="ads-head">
        <h1>
          Yelp Ads <span className={`live-pill ${ad.live ? "" : "off"}`}>{ad.live ? "Live" : "Paused"}</span>
        </h1>
        <nav className="underline-tabs">
          {TABS.map((t) => (
            <button key={t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </nav>
      </header>
      <div className="scroll">
        {tab === "Performance" && (
          <>
            <button className="ask-row" onClick={() => toast("Your ad is outperforming similar businesses by 18%")}>
              <Icon name="trend" size={18} /> How is my ad performing?
            </button>
            <section className="perf">
              <h2>
                Ads vs organic leads <Icon name="info" size={16} />
              </h2>
              <p>
                <b className="big">{adsTotal + orgTotal}</b> <span className="muted">Last 12 months</span>
              </p>
              <div className="stack-chart">
                {ADS_MONTHS.map((m) => (
                  <div key={m.m} className="sc-col">
                    <span className="sc-bar" style={{ height: `${((m.ads + m.organic) / max) * 160}px` }}>
                      <i style={{ flex: m.ads, background: "#f47b30" }} />
                      <i style={{ flex: m.organic, background: "#127c80" }} />
                    </span>
                    <span className="sc-label">{m.m}</span>
                  </div>
                ))}
              </div>
              <div className="legend">
                <span>
                  <i style={{ background: "#f47b30" }} /> Ads <b>{adsTotal}</b> <span className="muted">{Math.round((adsTotal / (adsTotal + orgTotal)) * 100)}%</span>
                </span>
                <span>
                  <i style={{ background: "#127c80" }} /> Organic <b>{orgTotal}</b> <span className="muted">{Math.round((orgTotal / (adsTotal + orgTotal)) * 100)}%</span>
                </span>
              </div>
            </section>
            <section className="perf">
              <h2>
                Impressions <Icon name="info" size={16} />
              </h2>
              <p>
                <b className="big">{ad.live ? "16.1K" : "9.4K"}</b> <span className="muted">Last 30 days</span>
              </p>
              <div className="kpis">
                <span>
                  <b>{ad.live ? "1,284" : "702"}</b>
                  <span className="muted small">Ad clicks</span>
                </span>
                <span>
                  <b>${(ad.budget * 30).toLocaleString()}</b>
                  <span className="muted small">Spend this month</span>
                </span>
                <span>
                  <b>$4.12</b>
                  <span className="muted small">Cost per lead</span>
                </span>
              </div>
            </section>
          </>
        )}
        {tab === "Customers" && (
          <ul className="list">
            {AD_CUSTOMERS.map((c, i) => (
              <li key={i} className="list-row static">
                <span className="recent-icon">
                  <Icon name="ads" size={18} />
                </span>
                <span className="lr-main">
                  <b>{c.name}</b>
                  <span className="muted small block">{c.what}</span>
                </span>
                <span className="muted small">{c.at}</span>
              </li>
            ))}
          </ul>
        )}
        {tab === "Ad controls" && (
          <div className="pad stack">
            <Toggle
              label="Ad is running"
              on={ad.live}
              onChange={() => {
                updateAd({ live: !ad.live });
                toast(ad.live ? "Ad paused" : "Ad is live again");
              }}
            />
            <button className="field-row" onClick={() => openSheet({ kind: "budget" })}>
              <span>
                <b>Daily budget</b>
                <span className="muted small block">Average daily spend</span>
              </span>
              <span className="fr-val">${ad.budget}/day</span>
            </button>
            <Toggle label="Smart selection (AI picks your best photos and reviews)" on={ad.smart} onChange={() => updateAd({ smart: !ad.smart })} />
            <button className="field-row" onClick={() => openSheet({ kind: "cta" })}>
              <span>
                <b>Call to Action</b>
                <span className="muted small block">Shown on your ad and page</span>
              </span>
              <Icon name="chevron" size={18} />
            </button>
            <button className="primary-btn" onClick={() => push({ kind: "upgrade" })}>
              {ad.upgraded ? "Upgrade Package is on" : "See the Upgrade Package"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function BudgetSheet() {
  const { ad, updateAd, closeSheet, toast } = useApp();
  const [v, setV] = useState(ad.budget);
  return (
    <SheetFrame title="Daily budget">
      <p className="budget-val">${v}/day</p>
      <input type="range" min={5} max={60} value={v} onChange={(e) => setV(Number(e.target.value))} className="range" />
      <p className="muted small center">About {Math.round(v * 2.4)} ad clicks a month</p>
      <button
        className="primary-btn"
        onClick={() => {
          updateAd({ budget: v });
          toast(`Budget set to $${v}/day`);
          closeSheet();
        }}
      >
        Save budget
      </button>
    </SheetFrame>
  );
}

export function UpgradeScreen() {
  const { pop, updateAd, ad, toast } = useApp();
  return (
    <div className="screen">
      <header className="nav-header">
        <span className="nh-side">
          <button className="icon-btn" aria-label="Back" onClick={pop}>
            <Icon name="back" size={24} />
          </button>
        </span>
        <h1>Upgrade Package</h1>
        <span className="nh-side" />
      </header>
      <div className="scroll">
        <div className="promo-art">🙌</div>
        <div className="pad">
          <h2 className="promo-title">Get the right customers</h2>
          <p>Paint a more complete picture of your business with the Upgrade Package.</p>
          <ul className="checks">
            <li>
              <Icon name="check" size={16} /> Remove competitor ads from your page
            </li>
            <li>
              <Icon name="check" size={16} /> Showcase your best work
            </li>
            <li>
              <Icon name="check" size={16} /> Get promoted in weekly emails
            </li>
            <li className="green">
              <Icon name="check" size={16} /> Get locked in at $6/day avg (normally $13/day)
            </li>
          </ul>
        </div>
      </div>
      <div className="sticky-cta">
        <button
          className="primary-btn"
          disabled={ad.upgraded}
          onClick={() => {
            updateAd({ upgraded: true });
            toast("Free trial started");
            pop();
          }}
        >
          {ad.upgraded ? "You're on the Upgrade Package" : "Try it free for 14 days"}
        </button>
        <p className="muted small center">Cancel anytime.</p>
      </div>
    </div>
  );
}

export function GuestManagerScreen() {
  const { toast } = useApp();
  return (
    <div className="screen">
      <header className="nav-header">
        <span className="nh-side" />
        <h1>Table Management Pitch</h1>
        <span className="nh-side" />
      </header>
      <div className="scroll pad">
        <h2 className="promo-title">Table Management that just works</h2>
        <ul className="bullets">
          <li>Seat more diners with reservations and waitlists</li>
          <li>Customizable FOH management</li>
          <li>Guest management and analytics</li>
        </ul>
        <h3 className="center">Find the right plan for your restaurant's needs</h3>
        <div className="plans">
          {[
            ["Standard", "For restaurants that run waits and accept some reservations", "Most Popular"],
            ["Premium", "For restaurants that take most covers by reservation", ""],
          ].map(([name, text, tag]) => (
            <button key={name} className="plan" onClick={() => toast(`${name} plan demo booked`)}>
              <span className="row-between">
                <b>{name}</b>
                {tag && <span className="green small">{tag}</span>}
              </span>
              <span className="muted small">{text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
