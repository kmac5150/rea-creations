import type { SVGProps } from "react";

export type IconName =
  | "search"
  | "updates"
  | "heart"
  | "heartFill"
  | "plan"
  | "inbox"
  | "back"
  | "chevronRight"
  | "chevronDown"
  | "close"
  | "closeCircle"
  | "sliders"
  | "map"
  | "list"
  | "sort"
  | "share"
  | "more"
  | "location"
  | "layers"
  | "draw"
  | "bell"
  | "chat"
  | "cube"
  | "floorplan"
  | "photos"
  | "sparkle"
  | "phone"
  | "calendar"
  | "check"
  | "dollar"
  | "home"
  | "sign"
  | "pen"
  | "star"
  | "info"
  | "send"
  | "mic"
  | "tag"
  | "eye"
  | "flood"
  | "walk"
  | "settings";

type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export function Icon({ name, size = 24, ...rest }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...rest,
  };
  switch (name) {
    case "search":
      return (
        <svg {...common} strokeWidth={2.6}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m15.5 15.5 5 5" />
        </svg>
      );
    case "updates":
      return (
        <svg {...common} strokeWidth={0}>
          <path
            fill="currentColor"
            d="M11 2.5a8.5 8.5 0 0 1 6.73 13.7l3.98 3.99a1.25 1.25 0 0 1-1.77 1.77l-3.98-3.99A8.5 8.5 0 1 1 11 2.5Zm-2.1 5a2.3 2.3 0 0 0-1.65 3.93L11 15.2l3.75-3.77A2.3 2.3 0 1 0 11.5 8.2l-.5.5-.5-.5a2.3 2.3 0 0 0-1.6-.7Z"
          />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20.5s-7.5-4.6-9.2-9.3C1.6 7.8 3.9 4.5 7.3 4.5c2 0 3.5 1.1 4.7 2.7 1.2-1.6 2.7-2.7 4.7-2.7 3.4 0 5.7 3.3 4.5 6.7-1.7 4.7-9.2 9.3-9.2 9.3Z" />
        </svg>
      );
    case "heartFill":
      return (
        <svg {...common} strokeWidth={0}>
          <path
            fill="currentColor"
            d="M12 21.2s-7.9-4.8-9.7-9.8C.9 7.6 3.5 3.8 7.3 3.8c2 0 3.6 1 4.7 2.4 1.1-1.4 2.7-2.4 4.7-2.4 3.8 0 6.4 3.8 5 7.6-1.8 5-9.7 9.8-9.7 9.8Z"
          />
        </svg>
      );
    case "plan":
      return (
        <svg {...common} strokeWidth={0}>
          <path fill="currentColor" d="M12 2.2 21 9v11.3c0 .9-.7 1.6-1.6 1.6H4.6c-.9 0-1.6-.7-1.6-1.6V9l9-6.8Z" />
          <path d="m8 13 2.8 2.8L16.3 10" stroke="#fff" strokeWidth={2.2} fill="none" />
        </svg>
      );
    case "inbox":
      return (
        <svg {...common} strokeWidth={0}>
          <path
            fill="currentColor"
            d="M6.3 4h11.4c.8 0 1.5.5 1.8 1.2l2.4 6.3c.1.2.1.4.1.6V18c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-5.9c0-.2 0-.4.1-.6l2.4-6.3C4.8 4.5 5.5 4 6.3 4Zm.2 2.2-2 5.3H8c.6 0 1 .4 1.1.9a2.9 2.9 0 0 0 5.8 0c.1-.5.5-.9 1.1-.9h3.5l-2-5.3h-11Z"
          />
        </svg>
      );
    case "back":
      return (
        <svg {...common} strokeWidth={2.4}>
          <path d="m15 4-8 8 8 8" />
        </svg>
      );
    case "chevronRight":
      return (
        <svg {...common} strokeWidth={2.4}>
          <path d="m9 5 7 7-7 7" />
        </svg>
      );
    case "chevronDown":
      return (
        <svg {...common} strokeWidth={2.4}>
          <path d="m5 9 7 7 7-7" />
        </svg>
      );
    case "close":
      return (
        <svg {...common} strokeWidth={2.4}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case "closeCircle":
      return (
        <svg {...common} strokeWidth={0}>
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path d="m8.5 8.5 7 7m0-7-7 7" stroke="#fff" strokeWidth={2.2} />
        </svg>
      );
    case "sliders":
      return (
        <svg {...common}>
          <path d="M5 3v7M5 14v7M12 3v4M12 11v10M19 3v11M19 18v3" />
          <path d="M2.5 12h5M9.5 9h5M16.5 16h5" />
        </svg>
      );
    case "map":
      return (
        <svg {...common} strokeWidth={0}>
          <path fill="currentColor" d="M2 6.2 8 3.5v15.3l-6 2.7V6.2Zm7.5-2.7 5 2.7v15.3l-5-2.7V3.5ZM16 6.2l6-2.7v15.3l-6 2.7V6.2Z" />
        </svg>
      );
    case "list":
      return (
        <svg {...common} strokeWidth={2.4}>
          <path d="M8 6h13M8 12h13M8 18h13" />
          <circle cx="3.5" cy="6" r="1" fill="currentColor" />
          <circle cx="3.5" cy="12" r="1" fill="currentColor" />
          <circle cx="3.5" cy="18" r="1" fill="currentColor" />
        </svg>
      );
    case "sort":
      return (
        <svg {...common} strokeWidth={2.2}>
          <path d="M3 7h8M3 12h6M3 17h4M17 20V4m0 0-4 4m4-4 4 4" />
        </svg>
      );
    case "share":
      return (
        <svg {...common}>
          <path d="M12 3v12M7.5 7.5 12 3l4.5 4.5" />
          <path d="M5 11v8.5c0 .8.7 1.5 1.5 1.5h11c.8 0 1.5-.7 1.5-1.5V11" />
        </svg>
      );
    case "more":
      return (
        <svg {...common} strokeWidth={0}>
          <circle cx="5" cy="12" r="2" fill="currentColor" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <circle cx="19" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case "location":
      return (
        <svg {...common} strokeWidth={0}>
          <path fill="currentColor" d="M12 2a7.5 7.5 0 0 1 7.5 7.5c0 5.6-7.5 12.5-7.5 12.5S4.5 15.1 4.5 9.5A7.5 7.5 0 0 1 12 2Zm0 4.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 13 9 5 9-5" />
        </svg>
      );
    case "draw":
      return (
        <svg {...common}>
          <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-2.5a1.5 1.5 0 0 1 3 0V12m0-2a1.5 1.5 0 0 1 3 0v4.5c0 3.6-2.7 6.5-6.3 6.5-2 0-3.6-.8-4.7-2.3L4 14.6a1.5 1.5 0 0 1 2.3-1.9L9 15" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M6 9a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9Z" />
          <path d="M10 20a2.2 2.2 0 0 0 4 0" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 5.5C4 4.7 4.7 4 5.5 4h13c.8 0 1.5.7 1.5 1.5v9c0 .8-.7 1.5-1.5 1.5H10l-4.5 4v-4h0c-.8 0-1.5-.7-1.5-1.5v-9Z" />
        </svg>
      );
    case "cube":
      return (
        <svg {...common}>
          <path d="m12 2.8 8 4.6v9.2l-8 4.6-8-4.6V7.4l8-4.6Z" />
          <path d="M4 7.4 12 12l8-4.6M12 12v9.2" />
        </svg>
      );
    case "floorplan":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="1.5" />
          <path d="M3 12h6M13 3v6h8M13 13v8M9 12v3" />
        </svg>
      );
    case "photos":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 16 5-5 4 4 3-3 6 6" />
          <circle cx="16" cy="9" r="1.5" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common} strokeWidth={1.6}>
          <path d="M10 3.5 11.6 8 16 9.6l-4.4 1.6L10 15.7 8.4 11.2 4 9.6 8.4 8 10 3.5ZM18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M5 3.5h3.2l1.6 4.2-2.1 1.4a11 11 0 0 0 7.2 7.2l1.4-2.1 4.2 1.6V19c0 .8-.7 1.5-1.5 1.5C10.6 20.5 3.5 13.4 3.5 5 3.5 4.2 4.2 3.5 5 3.5Z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
          <path d="M3.5 10h17M8 3v4M16 3v4" />
        </svg>
      );
    case "check":
      return (
        <svg {...common} strokeWidth={2.6}>
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      );
    case "dollar":
      return (
        <svg {...common} strokeWidth={0}>
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path d="M14.8 9.2c-.4-1-1.5-1.7-2.8-1.7-1.6 0-2.8.9-2.8 2.2 0 3 5.8 1.5 5.8 4.5 0 1.3-1.3 2.3-3 2.3-1.4 0-2.6-.7-3-1.9M12 6v1.5m0 9V18" stroke="#0d3b2e" strokeWidth={1.8} />
        </svg>
      );
    case "home":
      return (
        <svg {...common} strokeWidth={0}>
          <path fill="currentColor" d="M12 3 21 10v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10l9-7Z" />
          <path d="M12 16.5s-3-1.8-3-3.6c0-1 .8-1.7 1.6-1.7.6 0 1.1.3 1.4.8.3-.5.8-.8 1.4-.8.8 0 1.6.7 1.6 1.7 0 1.8-3 3.6-3 3.6Z" fill="#0b2a7a" />
        </svg>
      );
    case "sign":
      return (
        <svg {...common}>
          <path d="M5 3v18M5 6h15M8 9h10v7H8z" />
        </svg>
      );
    case "pen":
      return (
        <svg {...common}>
          <path d="M3 21c3-1 4-4 7-4s2 3 5 3 3-2 5-2" />
          <path d="m13 13 7.5-7.5a2.1 2.1 0 0 0-3-3L10 10l-.8 3.8L13 13Z" />
        </svg>
      );
    case "star":
      return (
        <svg {...common} strokeWidth={0}>
          <path fill="currentColor" d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.4L12 17.4l-5.7 3 1.1-6.4-4.6-4.5 6.4-.9L12 2.8Z" />
        </svg>
      );
    case "info":
      return (
        <svg {...common} strokeWidth={0}>
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path d="M12 11v6M12 7.2v.1" stroke="#fff" strokeWidth={2.4} />
        </svg>
      );
    case "send":
      return (
        <svg {...common} strokeWidth={0}>
          <path fill="currentColor" d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12 2-12 2v6.4Z" />
        </svg>
      );
    case "mic":
      return (
        <svg {...common}>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path d="M3 12V4.5C3 3.7 3.7 3 4.5 3H12l9 9-9 9-9-9Z" />
          <circle cx="7.5" cy="7.5" r="1.5" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "flood":
      return (
        <svg {...common}>
          <path d="M2 17c2 0 2-1.5 4-1.5S8 17 10 17s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M2 21c2 0 2-1.5 4-1.5S8 21 10 21s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M12 3s5 5.5 5 8.5a5 5 0 0 1-10 0C7 8.5 12 3 12 3Z" />
        </svg>
      );
    case "walk":
      return (
        <svg {...common}>
          <circle cx="13" cy="4" r="2" />
          <path d="m9 21 2.5-7L14 16v5M7 11l3-3.5 4 1 2.5 3.5M11.5 14l1-5.5" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2.5v3M12 18.5v3M4.2 6.2l2.1 2.1M17.7 15.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 17.8l2.1-2.1M17.7 8.3l2.1-2.1" />
        </svg>
      );
    default: {
      const never: never = name;
      return never;
    }
  }
}

export function ZillowLogo({ height = 26, color = "#0041d9" }: { height?: number; color?: string }) {
  return (
    <svg height={height} viewBox="0 0 132 30" aria-label="Zillow">
      <path fill={color} d="M13 1 0 11v4L13 5.5 26 15v-4L13 1ZM4.5 16.5 13 10.3l8.5 6.2v3.7L10.8 28H4.5v-3.4l10.4-7.4-10.4 7.4v-8.1Z" />
      <text x="31" y="24" fill={color} fontFamily="Figtree, Inter, sans-serif" fontWeight={800} fontSize="25" letterSpacing="-0.5">
        Zillow
      </text>
    </svg>
  );
}
