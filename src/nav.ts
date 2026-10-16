export type TabId = "home" | "schedule" | "highlights";

export type Route =
  | { name: "tabs"; tab: TabId }
  | { name: "hub"; id: string }
  | { name: "search" }
  | { name: "news" }
  | { name: "article"; id: string }
  | { name: "scores" }
  | { name: "match"; id: string }
  | { name: "event"; id: string }
  | { name: "watch"; id: string }
  | { name: "fanzone"; id: string }
  | { name: "profile" }
  | { name: "settings" };

export function showsTabBar(route: Route): boolean {
  switch (route.name) {
    case "tabs":
    case "hub":
    case "news":
    case "scores":
      return true;
    case "search":
    case "article":
    case "match":
    case "event":
    case "watch":
    case "fanzone":
    case "profile":
    case "settings":
      return false;
    default: {
      const _exhaustive: never = route;
      return _exhaustive;
    }
  }
}
