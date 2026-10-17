export type IconName =
  | "home"
  | "ads"
  | "store"
  | "inbox"
  | "menu"
  | "bell"
  | "arrow"
  | "back"
  | "chevron"
  | "directions"
  | "map"
  | "call"
  | "website"
  | "star"
  | "camera"
  | "plus"
  | "close"
  | "check"
  | "info"
  | "pin"
  | "clock"
  | "trend"
  | "envelope"
  | "send"
  | "help"
  | "gear"
  | "table"
  | "dollar";

export function Icon({ name, size = 22, stroke = 1.8 }: { name: IconName; size?: number; stroke?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "home":
      return (
        <svg {...p}>
          <path d="M4 11 12 4l8 7v9h-5v-6h-6v6H4z" />
        </svg>
      );
    case "ads":
      return (
        <svg {...p}>
          <path d="M4 10v4h3l8 5V5L7 10H4ZM18 9.5a3.5 3.5 0 0 1 0 5" />
        </svg>
      );
    case "store":
      return (
        <svg {...p}>
          <path d="M4 9h16l-1.5-4h-13L4 9ZM5 9v11h14V9M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0M10 20v-5h4v5" />
        </svg>
      );
    case "inbox":
      return (
        <svg {...p}>
          <rect x="3.5" y="5" width="17" height="14" rx="1.5" />
          <path d="m4 6 8 6 8-6" />
        </svg>
      );
    case "menu":
      return (
        <svg {...p}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "bell":
      return (
        <svg {...p}>
          <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16ZM10 20a2 2 0 0 0 4 0" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...p} strokeWidth={2}>
          <path d="M4 12h15M13 6l6 6-6 6" />
        </svg>
      );
    case "back":
      return (
        <svg {...p} strokeWidth={2}>
          <path d="M20 12H5M11 6l-6 6 6 6" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...p}>
          <path d="m9 5 7 7-7 7" />
        </svg>
      );
    case "directions":
      return (
        <svg {...p}>
          <path d="m12 2.5 9.5 9.5-9.5 9.5L2.5 12z" />
          <path d="M9 14v-3h5M12.5 8.5 15 11l-2.5 2.5" />
        </svg>
      );
    case "map":
      return (
        <svg {...p}>
          <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14" />
        </svg>
      );
    case "call":
      return (
        <svg {...p}>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
        </svg>
      );
    case "website":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
        </svg>
      );
    case "star":
      return (
        <svg {...p} fill="currentColor" stroke="none">
          <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
        </svg>
      );
    case "camera":
      return (
        <svg {...p}>
          <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      );
    case "plus":
      return (
        <svg {...p} strokeWidth={2.2}>
          <path d="M12 5v14M5 12h14" />
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
        <svg {...p} strokeWidth={2.4}>
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      );
    case "info":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5M12 8h.01" />
        </svg>
      );
    case "pin":
      return (
        <svg {...p}>
          <path d="M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      );
    case "clock":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "trend":
      return (
        <svg {...p}>
          <path d="M4 18h16M5 15l4-4 3 3 6-7M14 7h4v4" />
        </svg>
      );
    case "envelope":
      return (
        <svg {...p}>
          <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
          <path d="m3.5 6.5 8.5 6 8.5-6" />
        </svg>
      );
    case "send":
      return (
        <svg {...p}>
          <path d="M4 12 20 4l-4 16-4-6-8-2Z" />
        </svg>
      );
    case "help":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7M12 17h.01" />
        </svg>
      );
    case "gear":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7 7 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z" />
        </svg>
      );
    case "table":
      return (
        <svg {...p}>
          <path d="M3 9h18M5 9v10M19 9v10M8 5h8l2 4H6z" />
        </svg>
      );
    case "dollar":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.4 0-2.5.8-2.5 2s1.1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6.5v11" />
        </svg>
      );
    default: {
      const never: never = name;
      return never;
    }
  }
}
