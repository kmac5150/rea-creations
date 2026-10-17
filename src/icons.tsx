export type IconName =
  | "menus"
  | "checkins"
  | "events"
  | "insights"
  | "more"
  | "pin"
  | "rocket"
  | "qr"
  | "back"
  | "chevron"
  | "chevronDown"
  | "pencil"
  | "search"
  | "lines"
  | "move"
  | "replace"
  | "trash"
  | "comment"
  | "toast"
  | "plus"
  | "refresh"
  | "close"
  | "check"
  | "eye"
  | "trend"
  | "venue"
  | "dots"
  | "gear"
  | "copy"
  | "megaphone"
  | "clock"
  | "print"
  | "tv"
  | "logout";

export function Icon({ name, size = 22, stroke = 1.8 }: { name: IconName; size?: number; stroke?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "menus":
      return (
        <svg {...p}>
          <rect x="4" y="3" width="16" height="18" rx="1.5" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      );
    case "checkins":
      return (
        <svg {...p}>
          <circle cx="5" cy="6" r="1.6" />
          <circle cx="5" cy="12" r="1.6" />
          <circle cx="5" cy="18" r="1.6" />
          <path d="M9.5 6H20M9.5 12H20M9.5 18H20" />
        </svg>
      );
    case "events":
      return (
        <svg {...p}>
          <rect x="3.5" y="4.5" width="17" height="16" rx="1.5" />
          <path d="M3.5 9h17M8 3v3M16 3v3M8 13h8M8 16.5h5" />
        </svg>
      );
    case "insights":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 3.5V12h8.5" />
        </svg>
      );
    case "more":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="8" cy="12" r="0.9" fill="currentColor" />
          <circle cx="12" cy="12" r="0.9" fill="currentColor" />
          <circle cx="16" cy="12" r="0.9" fill="currentColor" />
        </svg>
      );
    case "pin":
      return (
        <svg {...p} fill="currentColor" stroke="none">
          <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2Z" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...p} fill="currentColor" stroke="none">
          <path d="M14.5 3.2c2.6-.9 5.1-.9 6.3-.7.2 1.2.2 3.7-.7 6.3-.9 2.6-2.8 5-5.5 6.9l.2 3.3-3.1 2.5-1.3-3.6-3.3-3.3-3.6-1.3 2.5-3.1 3.3.2c1.9-2.7 4.3-4.6 6.9-5.5Zm1.6 4.7a1.8 1.8 0 1 0 0-.01ZM5.4 16.2c-1.3.6-2.2 2.4-2.4 5 2.6-.2 4.4-1.1 5-2.4l-2.6-2.6Z" />
        </svg>
      );
    case "qr":
      return (
        <svg {...p}>
          <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1" />
          <rect x="14" y="3.5" width="6.5" height="6.5" rx="1" />
          <rect x="3.5" y="14" width="6.5" height="6.5" rx="1" />
          <path d="M14 14h2.5v2.5H14zM18 18h2.5v2.5H18zM18 14h2.5M14 18v2.5" />
        </svg>
      );
    case "back":
      return (
        <svg {...p} strokeWidth={2.2}>
          <path d="m15 5-7 7 7 7" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...p}>
          <path d="m9 5 7 7-7 7" />
        </svg>
      );
    case "chevronDown":
      return (
        <svg {...p}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "pencil":
      return (
        <svg {...p}>
          <path d="M4 20h4L19 9l-4-4L4 16v4ZM13.5 6.5l4 4" />
        </svg>
      );
    case "search":
      return (
        <svg {...p}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-4.2-4.2" />
        </svg>
      );
    case "lines":
      return (
        <svg {...p}>
          <path d="M5 7h14M5 12h14M5 17h14" />
        </svg>
      );
    case "move":
      return (
        <svg {...p}>
          <path d="M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5M14 8l4 4-4 4M18 12H9" />
        </svg>
      );
    case "replace":
      return (
        <svg {...p}>
          <path d="M16 4h4v4M20 4l-8 8M4 20l6-6M4 4l16 16M16 20h4v-4" />
        </svg>
      );
    case "trash":
      return (
        <svg {...p}>
          <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />
        </svg>
      );
    case "comment":
      return (
        <svg {...p}>
          <path d="M4 12a8 7 0 1 1 3.4 5.7L4 19l1-3.3A6.8 6.8 0 0 1 4 12Z" />
        </svg>
      );
    case "toast":
      return (
        <svg {...p}>
          <path d="M6 3h6l-1 8a3 3 0 0 1-4 0L6 3ZM9 12v7M7 20h4M14 5h5l-1 7a2.5 2.5 0 0 1-3 0" />
        </svg>
      );
    case "plus":
      return (
        <svg {...p} strokeWidth={2}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...p}>
          <path d="M20 11a8 8 0 0 0-14.5-4M4 4v4h4M4 13a8 8 0 0 0 14.5 4M20 20v-4h-4" />
        </svg>
      );
    case "close":
      return (
        <svg {...p} strokeWidth={2}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case "check":
      return (
        <svg {...p} strokeWidth={2.6}>
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      );
    case "eye":
      return (
        <svg {...p}>
          <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "trend":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 14 3-3 2 2 3-4M14 9h2v2" />
        </svg>
      );
    case "venue":
      return (
        <svg {...p}>
          <path d="M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      );
    case "dots":
      return (
        <svg {...p} fill="currentColor" stroke="none">
          <circle cx="12" cy="5" r="1.8" />
          <circle cx="12" cy="12" r="1.8" />
          <circle cx="12" cy="19" r="1.8" />
        </svg>
      );
    case "gear":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7 7 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z" />
        </svg>
      );
    case "copy":
      return (
        <svg {...p}>
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...p}>
          <path d="M3 10v4h3l9 5V5L6 10H3ZM18 9a4 4 0 0 1 0 6M7 14l1.5 5h2.5l-1.5-5" />
        </svg>
      );
    case "clock":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "print":
      return (
        <svg {...p}>
          <path d="M7 9V3h10v6M7 18H4v-7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7h-3M7 14h10v7H7z" />
        </svg>
      );
    case "tv":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="12" rx="1.5" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "logout":
      return (
        <svg {...p}>
          <path d="M14 4h5v16h-5M10 8l-4 4 4 4M6 12h10" />
        </svg>
      );
    default: {
      const never: never = name;
      return never;
    }
  }
}
