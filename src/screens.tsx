import { useMemo, useState } from "react";
import {
  articles,
  chatSeed,
  competitions,
  eventById,
  events,
  eventsByRail,
  eventsForCompetition,
  formatDayHeader,
  formatWhen,
  highlights,
  newsChips,
  reactions,
  scoreDays,
  teamById,
  teams,
  user,
  type CatalogEvent,
  type EventStatus,
} from "./data";
import type { TabId } from "./nav";
import { Crest, CrestById, Icon, TopBar } from "./ui";

type Go = {
  hub: (id: string) => void;
  event: (id: string) => void;
  watch: (id: string) => void;
  match: (id: string) => void;
  search: () => void;
  profile: () => void;
  news: () => void;
  scores: () => void;
  article: (id: string) => void;
  fanzone: (id: string) => void;
  back: () => void;
};

function LiveBadge({ status }: { status: EventStatus }) {
  if (status !== "live") {
    return null;
  }
  return <span className="badge">LIVE</span>;
}

function EventTile({
  event,
  poster,
  onOpen,
}: {
  event: CatalogEvent;
  poster?: boolean;
  onOpen: (id: string) => void;
}) {
  return (
    <button className={`tile ${poster ? "poster" : ""}`} onClick={() => onOpen(event.id)}>
      <div className="tile-art" style={{ backgroundImage: `url(${event.image})` }}>
        <LiveBadge status={event.status} />
      </div>
      <h3>{event.title}</h3>
      <p>{event.status === "live" && event.minute ? event.minute : event.subtitle}</p>
    </button>
  );
}

function EventRow({
  event,
  reminded,
  onBell,
  onOpen,
}: {
  event: CatalogEvent;
  reminded: boolean;
  onBell: (id: string) => void;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="event-row" role="button" onClick={() => onOpen(event.id)}>
      {event.homeId && event.awayId ? (
        <div className="crest-pair">
          <CrestById id={event.homeId} />
          <CrestById id={event.awayId} />
        </div>
      ) : (
        <div
          className="crest"
          style={{ backgroundImage: `url(${event.image})`, backgroundSize: "cover" }}
        />
      )}
      <div className="event-copy">
        <h3>{event.title}</h3>
        <p>{formatWhen(event.start, event.status)} · {event.subtitle.split("·")[0]}</p>
      </div>
      <button
        className={`bell ${reminded ? "on" : ""}`}
        onClick={(click) => {
          click.stopPropagation();
          onBell(event.id);
        }}
        aria-label="Set reminder"
      >
        <Icon name="bell" />
      </button>
    </div>
  );
}

export function HomeScreen({ go, onBell, reminded }: { go: Go; onBell: (id: string) => void; reminded: Record<string, boolean> }) {
  const [hero, setHero] = useState(0);
  const heroes = useMemo(
    () => [
      events.find((item) => item.id === "live-fight")!,
      events.find((item) => item.id === "live-apex")!,
      events.find((item) => item.id === "live-grid")!,
    ],
    [],
  );
  const current = heroes[hero];

  return (
    <>
      <TopBar onSearch={go.search} onProfile={go.profile} />
      <section className="hero hero-first">
        <div className="hero-media" style={{ ["--hero" as string]: `url(${current.image})` }} />
        <div className="hero-body">
          <h1>{current.title}</h1>
          <p>{current.description}</p>
          <button className="cta" onClick={() => go.watch(current.id)}>
            {current.status === "live" ? "Watch now" : "See schedule"}
          </button>
        </div>
      </section>
      <div className="dots">
        {heroes.map((item, index) => (
          <button
            key={item.id}
            className={`dot ${index === hero ? "on" : ""}`}
            onClick={() => setHero(index)}
            aria-label={`Hero ${index + 1}`}
          />
        ))}
      </div>
      <div className="subnav">
        <button className="chip star" aria-label="Favorites">
          <Icon name="star" />
        </button>
        {competitions.map((competition) => (
          <button key={competition.id} className="chip" onClick={() => go.hub(competition.id)}>
            <span className="chip-mark" style={{ background: competition.logoColor }}>
              {competition.logoLabel}
            </span>
            {competition.name}
          </button>
        ))}
      </div>
      <Rail title="Live now" items={eventsByRail("live")} onOpen={go.event} />
      <div className="rail">
        <div className="rail-head">
          <h2>Coming up</h2>
        </div>
        <div className="scroller">
          {eventsByRail("upcoming").map((event) => (
            <button key={event.id} className="tile" onClick={() => go.event(event.id)}>
              <div className="tile-art" style={{ backgroundImage: `url(${event.image})` }}>
                <span className="badge" style={{ background: "#111c" }}>
                  {new Date(event.start)
                    .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
                    .toUpperCase()}
                </span>
              </div>
              <h3>{event.title}</h3>
              <p>{event.subtitle}</p>
            </button>
          ))}
        </div>
      </div>
      <Rail title="Originals" items={eventsByRail("originals")} poster onOpen={go.event} />
      <Rail title="Movies & documentaries" items={eventsByRail("movies")} poster onOpen={go.event} />
      <Rail title="Live channels" items={eventsByRail("channels")} onOpen={go.watch} />
      <section className="rail">
        <div className="rail-head">
          <h2>Tonight on the schedule</h2>
          <span className="muted">Dummy slate</span>
        </div>
        {events
          .filter((item) => item.kind === "match" || item.kind === "fight")
          .slice(0, 4)
          .map((event) => (
            <EventRow
              key={event.id}
              event={event}
              reminded={Boolean(reminded[event.id])}
              onBell={onBell}
              onOpen={go.event}
            />
          ))}
      </section>
    </>
  );
}

function Rail({
  title,
  items,
  poster,
  onOpen,
}: {
  title: string;
  items: CatalogEvent[];
  poster?: boolean;
  onOpen: (id: string) => void;
}) {
  return (
    <section className="rail">
      <div className="rail-head">
        <h2>{title}</h2>
      </div>
      <div className="scroller">
        {items.map((event) => (
          <EventTile key={event.id} event={event} poster={poster} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

export function ScheduleScreen({
  go,
  onBell,
  reminded,
}: {
  go: Go;
  onBell: (id: string) => void;
  reminded: Record<string, boolean>;
}) {
  const grouped = useMemo(() => {
    const map = new Map<string, CatalogEvent[]>();
    const sorted = events
      .filter((item) => item.kind === "match" || item.kind === "fight")
      .slice()
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    for (const event of sorted) {
      const key = formatDayHeader(event.start);
      const list = map.get(key) ?? [];
      list.push(event);
      map.set(key, list);
    }
    return [...map.entries()];
  }, []);

  return (
    <>
      <TopBar onSearch={go.search} onProfile={go.profile} />
      <div className="page-title">
        <h1>Schedule</h1>
      </div>
      <div className="subnav">
        <button className="chip star">
          <Icon name="star" />
        </button>
        <button className="chip">All sports</button>
        {competitions.map((competition) => (
          <button key={competition.id} className="chip" onClick={() => go.hub(competition.id)}>
            {competition.name}
          </button>
        ))}
      </div>
      {grouped.map(([day, list]) => (
        <div key={day}>
          <div className="day-label">{day}</div>
          {list.map((event) => (
            <EventRow
              key={event.id}
              event={event}
              reminded={Boolean(reminded[event.id])}
              onBell={onBell}
              onOpen={go.event}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export function HighlightsScreen({ go }: { go: Go }) {
  const [sheet, setSheet] = useState<string | null>("replay-1");
  const event = sheet ? eventById(sheet) : null;

  return (
    <>
      <TopBar onSearch={go.search} onProfile={go.profile} />
      <div className="page-title">
        <h1>Highlights</h1>
      </div>
      <div className="seg">
        <button>
          <Icon name="home" /> Start
        </button>
        <button className="on">
          <Icon name="highlights" /> Highlights
        </button>
        <button onClick={() => go.scores()}>
          <Icon name="schedule" /> Games
        </button>
      </div>
      <Rail title="Near-live clips" items={eventsByRail("live")} onOpen={go.watch} />
      <div className="rail-head">
        <h2>Clubs</h2>
      </div>
      <div className="circle-row">
        {teams.slice(0, 8).map((team) => (
          <button key={team.id} className="circle" onClick={() => setSheet("replay-1")}>
            <Crest team={team} size="lg" />
            <small>{team.name}</small>
          </button>
        ))}
      </div>
      {event ? (
        <div className="sheet">
          <div className="row-head">
            <h2>{event.title}</h2>
            <button className="icon-btn" onClick={() => setSheet(null)} aria-label="Close">
              <Icon name="close" />
            </button>
          </div>
          <p className="muted">Choose what you want to watch.</p>
          <div className="sheet-art" style={{ backgroundImage: `url(${event.image})` }} />
          <div className="sheet-actions">
            <button className="action-row" onClick={() => go.watch(event.id)}>
              Complete event <Icon name="play" />
            </button>
            <button className="action-row" onClick={() => go.watch(event.id)}>
              Long highlights <Icon name="play" />
            </button>
            <button className="action-row" onClick={() => go.watch(event.id)}>
              Highlights <Icon name="play" />
            </button>
          </div>
        </div>
      ) : (
        <div className="scroller" style={{ paddingBottom: 20 }}>
          {highlights.map((item) => (
            <button key={item.id} className="tile" onClick={() => go.watch(item.eventId)}>
              <div className="tile-art" style={{ backgroundImage: `url(${item.image})` }}>
                <span className="badge">{item.label}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.duration}</p>
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export function HubScreen({ id, go }: { id: string; go: Go }) {
  const competition = competitions.find((item) => item.id === id);
  if (!competition) {
    return null;
  }
  const list = eventsForCompetition(id);
  const hero = list[0] ?? events[0];
  return (
    <>
      <div className="row-head">
        <button className="back" onClick={go.back} aria-label="Back">
          <Icon name="back" />
        </button>
        <h1>{competition.name}</h1>
        <div className="icon-row">
          <button className="icon-btn" onClick={go.search}>
            <Icon name="search" />
          </button>
          <button className="icon-btn">
            <Icon name="star" />
          </button>
          <button className="icon-btn" onClick={go.profile}>
            <span className="avatar">T</span>
          </button>
        </div>
      </div>
      <div className="seg">
        <button className="on">
          <Icon name="home" /> Home
        </button>
        <button onClick={() => go.watch(hero.id)}>
          <Icon name="highlights" /> Highlights
        </button>
        <button>
          <Icon name="schedule" /> Schedule
        </button>
      </div>
      <div className="hub-hero" style={{ backgroundImage: `url(${competition.hero})` }} />
      <div className="hero-body" style={{ minHeight: 0, paddingTop: 0 }}>
        <h1 style={{ fontSize: 22 }}>{competition.tagline}</h1>
        <p>{competition.name} on DAZN, with live nights, replays and originals.</p>
        <button className="cta" onClick={() => go.event(hero.id)}>
          <Icon name="star" /> Follow
        </button>
      </div>
      <Rail title="Live & upcoming" items={list} onOpen={go.event} />
    </>
  );
}

export function EventScreen({
  id,
  go,
  onBell,
  reminded,
}: {
  id: string;
  go: Go;
  onBell: (id: string) => void;
  reminded: Record<string, boolean>;
}) {
  const event = eventById(id);
  return (
    <>
      <div className="row-head">
        <button className="back" onClick={go.back}>
          <Icon name="close" />
        </button>
        <span />
        <button className={`bell ${reminded[id] ? "on" : ""}`} onClick={() => onBell(id)}>
          <Icon name="bell" />
        </button>
      </div>
      <div className="sheet">
        <div className="sheet-art" style={{ backgroundImage: `url(${event.image})` }}>
          <LiveBadge status={event.status} />
        </div>
        <h1>{event.title}</h1>
        <p className="muted">{event.subtitle}</p>
        <p>{event.description}</p>
        <div className="sheet-actions">
          <button className="cta" onClick={() => go.watch(event.id)}>
            {event.status === "live" ? "Watch now" : event.status === "upcoming" ? "Watch trailer" : "Watch replay"}
          </button>
          {event.kind === "match" ? (
            <button className="cta ghost" onClick={() => go.match(event.id)}>
              Scores & stats
            </button>
          ) : null}
          {event.status === "live" ? (
            <button className="cta ghost" onClick={() => go.fanzone(event.id)}>
              Open FanZone
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export function WatchScreen({ id, go }: { id: string; go: Go }) {
  const event = eventById(id);
  return (
    <div className="player">
      <div className="player-stage" style={{ backgroundImage: `url(${event.image})` }}>
        <div className="player-chrome">
          <div className="player-top">
            <div>
              <button className="icon-btn" onClick={go.back} aria-label="Close">
                <Icon name="close" />
              </button>
              <h2>{event.title}</h2>
              <p>
                {event.status === "live" ? `Started · ${event.subtitle}` : event.subtitle} · HD
              </p>
            </div>
            <div className="icon-row">
              <button className="icon-btn">
                <Icon name="cast" />
              </button>
              <button className="icon-btn" onClick={() => go.fanzone(id)}>
                <Icon name="news" />
              </button>
              <button className="icon-btn">
                <Icon name="gear" />
              </button>
            </div>
          </div>
          <div>
            {event.status === "live" ? <span className="live-tag">LIVE</span> : null}
            <div className="progress" style={{ marginTop: 10 }}>
              <span style={{ width: event.status === "live" ? "68%" : "12%" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="player-meta">
        <h2 style={{ margin: "0 0 6px" }}>{event.title}</h2>
        <p className="muted">{event.description}</p>
        <div className="sheet-actions">
          <button className="cta" onClick={() => go.fanzone(id)}>
            Join FanZone
          </button>
          {event.kind === "match" ? (
            <button className="cta ghost" onClick={() => go.match(id)}>
              Open stats
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function FanZoneScreen({ id, go }: { id: string; go: Go }) {
  const event = eventById(id);
  const home = event.homeId ? teamById(event.homeId) : teams[0];
  const away = event.awayId ? teamById(event.awayId) : teams[1];
  return (
    <div className="fan">
      <div className="fan-video" style={{ backgroundImage: `url(${event.image})` }} />
      <div className="fan-bar">
        <button className="icon-btn" onClick={go.back}>
          <Icon name="close" />
        </button>
        <strong>FanZone</strong>
        <span className="coins">● {user.coins.toLocaleString()}</span>
        <button className="icon-btn">
          <Icon name="gear" />
        </button>
      </div>
      <div className="cheer">
        <div className="cheer-side home">
          <Crest team={home} size="sm" /> 8,567
        </div>
        <div className="cheer-clock">00:22</div>
        <div className="cheer-side away">
          23,789 <Crest team={away} size="sm" />
        </div>
      </div>
      <div className="chat">
        {chatSeed.map((message) => (
          <div className="msg" key={message.id}>
            <span className="crest sm" style={{ background: message.color, color: "#111" }}>
              {message.user[0]}
            </span>
            <div>
              <b>
                {message.user}
                {message.host ? <span className="host">HOST</span> : null}
              </b>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="react-bar">
        {reactions.map((item) => (
          <button key={item.id} className="react">
            <span>{item.glyph}</span>
            <small>● {item.cost}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ScoresScreen({ go }: { go: Go }) {
  const [day, setDay] = useState("today");
  const footballIds = new Set(
    competitions.filter((item) => item.sport === "football").map((item) => item.id),
  );
  const matches = events.filter(
    (item) => item.kind === "match" && item.competitionId && footballIds.has(item.competitionId),
  );
  return (
    <>
      <div className="row-head">
        <button className="back" onClick={go.back}>
          <Icon name="back" />
        </button>
        <h1>Score</h1>
        <div className="icon-row">
          <button className="icon-btn">
            <Icon name="filter" />
          </button>
          <button className="icon-btn" onClick={go.search}>
            <Icon name="search" />
          </button>
        </div>
      </div>
      <div className="page-title" style={{ paddingTop: 0 }}>
        <h1>Football</h1>
      </div>
      <div className="subnav">
        <button className="chip star">
          <Icon name="star" />
        </button>
        {competitions
          .filter((item) => item.sport === "football")
          .map((competition) => (
            <button key={competition.id} className="chip">
              <span className="chip-mark" style={{ background: competition.logoColor }}>
                {competition.logoLabel}
              </span>
              {competition.name}
            </button>
          ))}
      </div>
      <div className="score-days">
        {scoreDays.map((item) => (
          <button key={item.id} className={item.id === day ? "on" : ""} onClick={() => setDay(item.id)}>
            <span className="kicker">{item.label}</span>
            <span className="sub">{item.sub}</span>
          </button>
        ))}
      </div>
      <div className="section-label">♛ Top competitions</div>
      {matches.map((event) => {
        const home = event.homeId ? teamById(event.homeId) : teams[0];
        const away = event.awayId ? teamById(event.awayId) : teams[1];
        return (
          <button key={event.id} className="match-card" onClick={() => go.match(event.id)}>
            <div className="match-grid">
              <div className="match-time">
                <button className="bell" aria-hidden>
                  <Icon name="bell" />
                </button>
                {event.status === "live" ? event.minute : new Date(event.start).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
              </div>
              <div>
                <div className="match-side">
                  <Crest team={home} />
                  <span>{home.name}</span>
                </div>
                <div className="match-side">
                  <Crest team={away} />
                  <span>{away.name}</span>
                </div>
              </div>
              <div>
                <div className={`match-score ${event.status === "live" ? "live" : ""}`}>{event.score?.[0] ?? "-"}</div>
                <div className={`match-score ${event.status === "live" ? "live" : ""}`}>{event.score?.[1] ?? "-"}</div>
              </div>
            </div>
          </button>
        );
      })}
    </>
  );
}

export function MatchScreen({ id, go }: { id: string; go: Go }) {
  const event = eventById(id);
  const home = event.homeId ? teamById(event.homeId) : teams[0];
  const away = event.awayId ? teamById(event.awayId) : teams[1];
  const [tab, setTab] = useState<"overview" | "h2h" | "lineups" | "live">("overview");
  return (
    <>
      <div className="row-head">
        <button className="back" onClick={go.back}>
          <Icon name="back" />
        </button>
        <span className="muted">{event.subtitle}</span>
        <span />
      </div>
      <div className="board">
        <div className="board-teams">
          <div>
            <Crest team={home} size="lg" />
            <div style={{ marginTop: 8, fontWeight: 700 }}>{home.name}</div>
          </div>
          <div>
            <div className="scoreline">
              {event.score?.[0] ?? "-"} – {event.score?.[1] ?? "-"}
            </div>
            <div className="muted">{event.minute ?? "FT"}</div>
          </div>
          <div>
            <Crest team={away} size="lg" />
            <div style={{ marginTop: 8, fontWeight: 700 }}>{away.name}</div>
          </div>
        </div>
        {(event.scorers ?? []).map((scorer) => (
          <p key={`${scorer.name}-${scorer.minute}`} className="muted">
            {scorer.name} · {scorer.minute}
          </p>
        ))}
      </div>
      <div className="seg">
        {(["overview", "h2h", "lineups", "live"] as const).map((item) => (
          <button key={item} className={tab === item ? "on" : ""} onClick={() => setTab(item)}>
            {item === "overview" ? "Overview" : item === "h2h" ? "H2H" : item === "lineups" ? "Lineups" : "Live updates"}
          </button>
        ))}
      </div>
      {tab === "overview" ? (
        <>
          <div className="rail-head">
            <h2>Statistics</h2>
          </div>
          {(event.stats ?? []).map((stat) => {
            const total = stat.home + stat.away || 1;
            const homePct = (stat.home / total) * 100;
            return (
              <div className="stat" key={stat.label}>
                <b style={{ color: "#fff" }}>{stat.home}</b>
                <div>
                  <div style={{ textAlign: "center", marginBottom: 6 }}>{stat.label}</div>
                  <div className="bar">
                    <i style={{ width: `${homePct}%` }} />
                    <i className="away" style={{ width: `${100 - homePct}%` }} />
                  </div>
                </div>
                <b style={{ color: "#fff", textAlign: "right" }}>{stat.away}</b>
              </div>
            );
          })}
          <button className="cta" style={{ width: "calc(100% - 32px)", margin: "16px" }} onClick={() => go.watch(id)}>
            Watch
          </button>
        </>
      ) : null}
      {tab === "h2h" ? <p className="muted" style={{ padding: 16 }}>Last five meetings favor {home.name} 3–1–1.</p> : null}
      {tab === "lineups" ? <p className="muted" style={{ padding: 16 }}>Dummy 4-3-3 / 4-2-3-1. This recreation does not use real squads.</p> : null}
      {tab === "live" ? <p className="muted" style={{ padding: 16 }}>{event.minute ?? "FT"} · Dummy ticker for the recreation.</p> : null}
    </>
  );
}

export function NewsScreen({ go }: { go: Go }) {
  const [chip, setChip] = useState<(typeof newsChips)[number]>("Latest");
  const list = articles.filter((article) => chip === "Latest" || article.sport === chip);
  return (
    <>
      <TopBar onSearch={go.search} onProfile={go.profile} />
      <div className="row-head">
        <h1>
          <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
            <Icon name="news" /> News
          </span>
        </h1>
      </div>
      <div className="news-filters">
        {newsChips.map((item) => (
          <button key={item} className={`pill ${chip === item ? "on" : ""}`} onClick={() => setChip(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="kicker-yellow">Featured stories</div>
      <p className="muted" style={{ padding: "0 16px 10px" }}>
        Chosen by our editors
      </p>
      {list.map((article) => (
        <button key={article.id} className="news-card" onClick={() => go.article(article.id)}>
          <img src={article.image} alt="" />
          <h3>{article.title}</h3>
          <p>
            {article.source} · {article.sport} · {article.time}
          </p>
        </button>
      ))}
    </>
  );
}

export function ArticleScreen({ id, go }: { id: string; go: Go }) {
  const article = articles.find((item) => item.id === id);
  if (!article) {
    return null;
  }
  return (
    <div className="article">
      <div className="row-head" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <button className="back" onClick={go.back}>
          <Icon name="back" />
        </button>
        <span className="muted">{article.sport}</span>
        <span />
      </div>
      <img src={article.image} alt="" />
      <p className="muted">
        {article.source} · {article.time}
      </p>
      <h1>{article.title}</h1>
      {article.body.split("\n").map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

export function SearchScreen({ go }: { go: Go }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const found = !q
    ? events
    : events.filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(q));
  return (
    <>
      <div className="row-head">
        <button className="back" onClick={go.back}>
          <Icon name="back" />
        </button>
        <h1>Search</h1>
        <span />
      </div>
      <div className="search-wrap">
        <label className="search-box">
          <Icon name="search" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Competitions, teams, events"
            autoFocus
          />
        </label>
      </div>
      <div className="rail-head">
        <h2>Browse</h2>
      </div>
      {competitions.map((competition) => (
        <button key={competition.id} className="list-row" onClick={() => go.hub(competition.id)}>
          {competition.name}
          <span className="muted">{competition.sport}</span>
        </button>
      ))}
      <div className="rail-head">
        <h2>{q ? "Results" : "Popular"}</h2>
      </div>
      {found.map((event) => (
        <button key={event.id} className="list-row" onClick={() => go.event(event.id)}>
          {event.title}
          <span className="muted">{event.kind}</span>
        </button>
      ))}
    </>
  );
}

export function ProfileScreen({ go }: { go: Go }) {
  return (
    <>
      <div className="row-head">
        <button className="back" onClick={go.back}>
          <Icon name="close" />
        </button>
        <h1>My DAZN</h1>
        <span />
      </div>
      <div className="sheet">
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 18 }}>
          <span className="avatar" style={{ width: 54, height: 54, fontSize: 20 }}>
            {user.initial}
          </span>
          <div>
            <h2 style={{ margin: 0 }}>{user.name}</h2>
            <p className="muted">{user.plan}</p>
          </div>
        </div>
        <button className="list-row" onClick={go.news} style={{ width: "100%", margin: "0 0 8px" }}>
          News
        </button>
        <button className="list-row" onClick={go.scores} style={{ width: "100%", margin: "0 0 8px" }}>
          Scores & stats
        </button>
        <button className="list-row" style={{ width: "100%", margin: "0 0 8px" }}>
          Downloads
        </button>
        <button className="list-row" onClick={() => go.back()} style={{ width: "100%", margin: "0 0 8px" }}>
          Settings
        </button>
        <button className="list-row" style={{ width: "100%", margin: "0 0 8px" }}>
          Help
        </button>
      </div>
    </>
  );
}

export function TabBar({ tab, onChange }: { tab: TabId; onChange: (tab: TabId) => void }) {
  return (
    <nav className="tabs">
      <button className={`tab ${tab === "home" ? "on" : ""}`} onClick={() => onChange("home")}>
        <Icon name="home" />
        Home
      </button>
      <button className={`tab ${tab === "schedule" ? "on" : ""}`} onClick={() => onChange("schedule")}>
        <Icon name="schedule" />
        Schedule
      </button>
      <button className={`tab ${tab === "highlights" ? "on" : ""}`} onClick={() => onChange("highlights")}>
        <Icon name="highlights" />
        Highlights
      </button>
    </nav>
  );
}
