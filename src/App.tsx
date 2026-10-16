import { useEffect, useMemo, useState } from "react";
import { DaznLogo, StatusBar } from "./ui";
import { showsTabBar, type Route, type TabId } from "./nav";
import {
  ArticleScreen,
  EventScreen,
  FanZoneScreen,
  HighlightsScreen,
  HomeScreen,
  HubScreen,
  MatchScreen,
  NewsScreen,
  ProfileScreen,
  ScheduleScreen,
  ScoresScreen,
  SearchScreen,
  TabBar,
  WatchScreen,
} from "./screens";

export default function App() {
  const [splash, setSplash] = useState(true);
  const [stack, setStack] = useState<Route[]>([{ name: "tabs", tab: "home" }]);
  const [reminded, setReminded] = useState<Record<string, boolean>>({});
  const route = stack[stack.length - 1];

  useEffect(() => {
    const timer = window.setTimeout(() => setSplash(false), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  const go = useMemo(() => {
    const push = (next: Route) => setStack((current) => [...current, next]);
    return {
      hub: (id: string) => push({ name: "hub", id }),
      event: (id: string) => push({ name: "event", id }),
      watch: (id: string) => push({ name: "watch", id }),
      match: (id: string) => push({ name: "match", id }),
      search: () => push({ name: "search" }),
      profile: () => push({ name: "profile" }),
      news: () => push({ name: "news" }),
      scores: () => push({ name: "scores" }),
      article: (id: string) => push({ name: "article", id }),
      fanzone: (id: string) => push({ name: "fanzone", id }),
      back: () =>
        setStack((current) => (current.length > 1 ? current.slice(0, -1) : current)),
    };
  }, []);

  const onBell = (id: string) => {
    setReminded((current) => ({ ...current, [id]: !current[id] }));
  };

  const setTab = (tab: TabId) => {
    setStack([{ name: "tabs", tab }]);
  };

  const tab: TabId = route.name === "tabs" ? route.tab : "home";
  const tabsVisible = showsTabBar(route);

  return (
    <div className="stage">
      <div className="device">
        <div className="app">
          <StatusBar />
          <div className={`screen ${tabsVisible ? "" : "no-tabs"}`}>
            <Screen route={route} go={go} onBell={onBell} reminded={reminded} />
          </div>
          {tabsVisible ? <TabBar tab={tab} onChange={setTab} /> : null}
          <div className="home-indicator" />
          {splash ? (
            <div className="splash">
              <DaznLogo size={92} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Screen({
  route,
  go,
  onBell,
  reminded,
}: {
  route: Route;
  go: Parameters<typeof HomeScreen>[0]["go"];
  onBell: (id: string) => void;
  reminded: Record<string, boolean>;
}) {
  switch (route.name) {
    case "tabs":
      switch (route.tab) {
        case "home":
          return <HomeScreen go={go} onBell={onBell} reminded={reminded} />;
        case "schedule":
          return <ScheduleScreen go={go} onBell={onBell} reminded={reminded} />;
        case "highlights":
          return <HighlightsScreen go={go} />;
        default: {
          const _exhaustive: never = route.tab;
          return _exhaustive;
        }
      }
    case "hub":
      return <HubScreen id={route.id} go={go} />;
    case "search":
      return <SearchScreen go={go} />;
    case "news":
      return <NewsScreen go={go} />;
    case "article":
      return <ArticleScreen id={route.id} go={go} />;
    case "scores":
      return <ScoresScreen go={go} />;
    case "match":
      return <MatchScreen id={route.id} go={go} />;
    case "event":
      return <EventScreen id={route.id} go={go} onBell={onBell} reminded={reminded} />;
    case "watch":
      return <WatchScreen id={route.id} go={go} />;
    case "fanzone":
      return <FanZoneScreen id={route.id} go={go} />;
    case "profile":
      return <ProfileScreen go={go} />;
    case "settings":
      return <ProfileScreen go={go} />;
    default: {
      const _exhaustive: never = route;
      return _exhaustive;
    }
  }
}
