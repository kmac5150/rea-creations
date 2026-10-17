import { useState } from "react";
import { useApp } from "../app-context";
import { Card, LineChart, NavHeader, Stars } from "../components";
import { LEADS, RECENT, VIEWS, sum } from "../data";
import { Icon } from "../icons";

export function HomeScreen() {
  const { biz, push, setTab, leads, reviews, notifications } = useApp();
  const [metric, setMetric] = useState<"views" | "leads">("views");
  const unread = leads.filter((l) => l.unread);
  const bell = notifications.filter((n) => !n.read).length;
  return (
    <div className="screen no-pad">
      <div className="scroll">
        <div className="hero" style={{ backgroundImage: "url(/img/hero.jpg)" }}>
          <div className="hero-shade" />
          <button className="hero-mail" aria-label="Notifications" onClick={() => push({ kind: "notifications" })}>
            <Icon name="envelope" size={24} />
            {bell > 0 && <i className="tab-badge">{bell}</i>}
          </button>
          <button className="hero-body" onClick={() => setTab("info")}>
            <span>
              <b className="hero-name">{biz.name}</b>
              <span className="hero-addr">{biz.address}</span>
              <span className="hero-rating">
                <Stars value={biz.rating} size={18} /> {biz.rating.toFixed(1)} <span className="light">{biz.reviewCount} reviews</span>
              </span>
            </span>
            <Icon name="arrow" size={22} />
          </button>
        </div>

        <Card title="Activity" sub="Last 30 days" onMore={() => push({ kind: "activity", metric })}>
          <div className="metric-tabs">
            <button className={metric === "views" ? "on" : ""} onClick={() => setMetric("views")}>
              <span className="muted small">User views</span>
              <b>{sum(VIEWS).toLocaleString()}</b>
            </button>
            <button className={metric === "leads" ? "on leads" : ""} onClick={() => setMetric("leads")}>
              <span className="muted small">Customer leads</span>
              <b>{sum(LEADS).toLocaleString()}</b>
            </button>
          </div>
          <LineChart
            series={
              metric === "views"
                ? [{ values: VIEWS, color: "#ef6c3a", fill: "rgba(239,108,58,0.12)" }, { values: LEADS.map((v) => v * 4), color: "#26a9c6", fill: "rgba(38,169,198,0.12)" }]
                : [{ values: LEADS, color: "#26a9c6", fill: "rgba(38,169,198,0.14)" }]
            }
          />
        </Card>

        <Card title="Inbox" badge={unread.length} onMore={() => setTab("inbox")}>
          <div className="inbox-strip">
            {leads.slice(0, 3).map((l) => (
              <button key={l.id} className="lead-mini" onClick={() => push({ kind: "thread", id: l.id })}>
                <img src={l.avatar} alt="" />
                <span>
                  <b>{l.user}</b>
                  <span className="muted small">{l.title}</span>
                </span>
                {l.unread && <i className="dot" />}
              </button>
            ))}
          </div>
        </Card>

        <Card title="Reviews" sub={`${reviews.filter((r) => !r.reply).length} need a response`} onMore={() => push({ kind: "reviews" })}>
          {reviews.slice(0, 2).map((r) => (
            <button key={r.id} className="review-mini" onClick={() => push({ kind: "review", id: r.id })}>
              <img src={r.avatar} alt="" />
              <span>
                <b>{r.user}</b>
                <Stars value={r.stars} size={14} />
                <span className="clamp2 small">{r.text}</span>
              </span>
            </button>
          ))}
        </Card>

        <Card title="Recent Activity">
          <ul className="recent">
            {RECENT.map((a) => (
              <li key={a.text}>
                <span className="recent-icon">
                  <Icon name={a.icon} size={18} />
                </span>
                <span>
                  <b>{a.text}</b>
                  <span className="muted small block">{a.at}</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Call to Action">
          <div className="cta-sample">
            <span className="sample-tag">Sample for your business</span>
            <b>👆 {biz.cta.text}</b>
            <span className="cta-button">{biz.cta.button}</span>
          </div>
          <p className="muted small">Take customers where you want them to go and make it easy to connect with you.</p>
          <button className="text-link" onClick={() => push({ kind: "upgrade" })}>
            Learn More <Icon name="arrow" size={16} />
          </button>
        </Card>
      </div>
    </div>
  );
}

export function ActivityScreen({ metric }: { metric: "views" | "leads" }) {
  const values = metric === "views" ? VIEWS : LEADS;
  const total = sum(values);
  return (
    <div className="screen">
      <NavHeader title={metric === "views" ? "User Views" : "Customer Leads"} />
      <div className="scroll">
        <div className="pad stat-head">
          <span>
            <b className="big">{total.toLocaleString()}</b> <span className="muted">in last 30 days</span>
          </span>
          <span className="up">
            ▲ 4%
            <span className="muted small block">vs. previous 30 days</span>
          </span>
        </div>
        <div className="pad">
          <LineChart series={[{ values, color: metric === "views" ? "#26a9c6" : "#ef6c3a", fill: metric === "views" ? "rgba(38,169,198,0.16)" : "rgba(239,108,58,0.14)" }]} />
        </div>
        <div className="table">
          <div className="tr th">
            <span>Date</span>
            <span>{metric === "views" ? "User Views" : "Leads"}</span>
          </div>
          {values.map((v, i) => (
            <div key={i} className="tr">
              <span>Oct {i + 1}, 2026</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NotificationsScreen() {
  const { notifications, readAll, push } = useApp();
  return (
    <div className="screen">
      <NavHeader
        title="Notifications"
        right={
          <button className="text-btn" onClick={readAll}>
            Mark all read
          </button>
        }
      />
      <div className="scroll">
        <ul className="list">
          {notifications.map((n) => (
            <li key={n.id}>
              <button className={`list-row ${n.read ? "" : "unread"}`} onClick={() => n.go && push(n.go)}>
                <span className="recent-icon">
                  <Icon name="bell" size={18} />
                </span>
                <span className="lr-main">
                  <b>{n.text}</b>
                  <span className="muted small block">{n.at}</span>
                </span>
                {!n.read && <i className="dot" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
