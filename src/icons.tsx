import type { SVGProps } from "react";

export type IconName =
  | "dash"
  | "grocery"
  | "retail"
  | "orders"
  | "browse"
  | "pin"
  | "chevronDown"
  | "chevronRight"
  | "arrowRight"
  | "back"
  | "close"
  | "user"
  | "bell"
  | "cart"
  | "search"
  | "map"
  | "dashpass"
  | "walk"
  | "star"
  | "heart"
  | "heartFill"
  | "plus"
  | "minus"
  | "trash"
  | "share"
  | "more"
  | "store"
  | "car"
  | "home"
  | "clock"
  | "list"
  | "info"
  | "tag"
  | "card"
  | "gift"
  | "help"
  | "settings"
  | "check"
  | "group"
  | "phone"
  | "chat";

type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export function Icon({ name, size = 24, ...rest }: Props) {
  const c = {
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
    case "dash":
      return (
        <svg {...c} strokeWidth={0}>
          <path
            fill="currentColor"
            d="M22.1 8.3A6.8 6.8 0 0 0 16.1 4.7H2.6a.6.6 0 0 0-.4 1l2.9 2.9c.3.3.7.5 1.1.5H16a2.3 2.3 0 1 1 0 4.7H9.4a.6.6 0 0 0-.4 1l2.9 2.9c.3.3.7.5 1.1.5h3.1c5.5 0 8.3-5.5 6-9.9Z"
          />
        </svg>
      );
    case "grocery":
      return (
        <svg {...c}>
          <path d="M5 11h14l-1.4 8.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8L5 11Z" />
          <path d="M9 11c0-3 1.5-6 3-7M12 11c0-2.5 2-5 5-5.5" />
        </svg>
      );
    case "retail":
      return (
        <svg {...c}>
          <path d="M5 8h14l-1 12.5H6L5 8Z" />
          <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
          <path d="M9 14h6" />
        </svg>
      );
    case "orders":
      return (
        <svg {...c}>
          <path d="M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21V3Z" />
          <path d="M9.5 8h5M9.5 12h5M9.5 16h3" />
        </svg>
      );
    case "browse":
      return (
        <svg {...c}>
          <path d="M3 6h8M3 11h5M3 16h4" />
          <circle cx="15" cy="13" r="5" />
          <path d="m19 17 2.5 2.5" />
        </svg>
      );
    case "pin":
      return (
        <svg {...c}>
          <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      );
    case "chevronDown":
      return (
        <svg {...c} strokeWidth={2.4}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "chevronRight":
      return (
        <svg {...c} strokeWidth={2.4}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      );
    case "arrowRight":
      return (
        <svg {...c} strokeWidth={2.4}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "back":
      return (
        <svg {...c} strokeWidth={2.4}>
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      );
    case "close":
      return (
        <svg {...c} strokeWidth={2.4}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case "user":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="9.5" />
          <circle cx="12" cy="10" r="3.2" />
          <path d="M6 18.5c1.4-2.2 3.5-3.3 6-3.3s4.6 1.1 6 3.3" />
        </svg>
      );
    case "bell":
      return (
        <svg {...c}>
          <path d="M6 10a6 6 0 1 1 12 0c0 5.5 2 7 2 7H4s2-1.5 2-7Z" />
          <path d="M10 20.5a2.2 2.2 0 0 0 4 0" />
        </svg>
      );
    case "cart":
      return (
        <svg {...c}>
          <path d="M3 4h2.5l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.3" />
          <circle cx="9.5" cy="20" r="1.3" />
          <circle cx="17.5" cy="20" r="1.3" />
        </svg>
      );
    case "search":
      return (
        <svg {...c} strokeWidth={2.3}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m15.5 15.5 5 5" />
        </svg>
      );
    case "map":
      return (
        <svg {...c}>
          <path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4Z" />
          <path d="M9 4v14M15 6v14" />
        </svg>
      );
    case "dashpass":
      return (
        <svg {...c} strokeWidth={0}>
          <path fill="currentColor" d="M21.5 8.6a5.9 5.9 0 0 0-5.2-3.1H5.2a.5.5 0 0 0-.4.9l2.5 2.5c.3.3.6.4 1 .4h8.1a2 2 0 1 1 0 4h-5.7a.5.5 0 0 0-.4.9l2.5 2.5c.3.3.6.4 1 .4h2.7c4.8 0 7.2-4.8 5.2-8.5ZM2.5 11h4l1.6 1.6H4.1L2.5 11Zm1 3h4l1.6 1.6H5.1L3.5 14Z" />
        </svg>
      );
    case "walk":
      return (
        <svg {...c}>
          <circle cx="13" cy="4" r="1.8" />
          <path d="m9 21 2.5-7 2.5 2v5M7 11l3-3.5 4 1 2.5 3.5M11.5 14l1-5.5" />
        </svg>
      );
    case "star":
      return (
        <svg {...c} strokeWidth={0}>
          <path fill="currentColor" d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.4L12 17.4l-5.7 3 1.1-6.4-4.6-4.5 6.4-.9L12 2.8Z" />
        </svg>
      );
    case "heart":
      return (
        <svg {...c}>
          <path d="M12 20.5s-7.5-4.6-9.2-9.3C1.6 7.8 3.9 4.5 7.3 4.5c2 0 3.5 1.1 4.7 2.7 1.2-1.6 2.7-2.7 4.7-2.7 3.4 0 5.7 3.3 4.5 6.7-1.7 4.7-9.2 9.3-9.2 9.3Z" />
        </svg>
      );
    case "heartFill":
      return (
        <svg {...c} strokeWidth={0}>
          <path fill="currentColor" d="M12 21.2s-7.9-4.8-9.7-9.8C.9 7.6 3.5 3.8 7.3 3.8c2 0 3.6 1 4.7 2.4 1.1-1.4 2.7-2.4 4.7-2.4 3.8 0 6.4 3.8 5 7.6-1.8 5-9.7 9.8-9.7 9.8Z" />
        </svg>
      );
    case "plus":
      return (
        <svg {...c} strokeWidth={2.4}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "minus":
      return (
        <svg {...c} strokeWidth={2.4}>
          <path d="M5 12h14" />
        </svg>
      );
    case "trash":
      return (
        <svg {...c}>
          <path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v5M14 11v5" />
        </svg>
      );
    case "share":
      return (
        <svg {...c}>
          <path d="M12 3v12M7.5 7.5 12 3l4.5 4.5" />
          <path d="M5 11v8.5c0 .8.7 1.5 1.5 1.5h11c.8 0 1.5-.7 1.5-1.5V11" />
        </svg>
      );
    case "more":
      return (
        <svg {...c} strokeWidth={0}>
          <circle cx="5" cy="12" r="2" fill="currentColor" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <circle cx="19" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case "store":
      return (
        <svg {...c}>
          <path d="M4 9.5 5.5 4h13L20 9.5M4 9.5v10.5h16V9.5M4 9.5c0 1.4 1.2 2.5 2.7 2.5s2.6-1.1 2.6-2.5c0 1.4 1.2 2.5 2.7 2.5s2.7-1.1 2.7-2.5c0 1.4 1.1 2.5 2.6 2.5S20 10.9 20 9.5" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "car":
      return (
        <svg {...c}>
          <path d="M4 16v-4l2-5h12l2 5v4M4 16h16v3h-3v-3M7 19v-3H4v3h3" />
          <circle cx="7.5" cy="13" r="1" fill="currentColor" />
          <circle cx="16.5" cy="13" r="1" fill="currentColor" />
        </svg>
      );
    case "home":
      return (
        <svg {...c}>
          <path d="m3 11 9-7.5 9 7.5M5.5 9v11h13V9" />
          <path d="M10 20v-6h4v6" />
        </svg>
      );
    case "clock":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "list":
      return (
        <svg {...c}>
          <path d="M9 6h12M9 12h12M9 18h12" />
          <circle cx="4.5" cy="6" r="1" fill="currentColor" />
          <circle cx="4.5" cy="12" r="1" fill="currentColor" />
          <circle cx="4.5" cy="18" r="1" fill="currentColor" />
        </svg>
      );
    case "info":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v6M12 7.5v.1" />
        </svg>
      );
    case "tag":
      return (
        <svg {...c}>
          <path d="M3 12V4.5C3 3.7 3.7 3 4.5 3H12l9 9-9 9-9-9Z" />
          <circle cx="7.5" cy="7.5" r="1.5" />
        </svg>
      );
    case "card":
      return (
        <svg {...c}>
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="M2.5 10h19M6 15h4" />
        </svg>
      );
    case "gift":
      return (
        <svg {...c}>
          <rect x="3" y="8" width="18" height="4" rx="1" />
          <path d="M5 12v9h14v-9M12 8v13M12 8S10.5 3 8 4s1 4 4 4c3 0 6.5-3 4-4s-4 4-4 4" />
        </svg>
      );
    case "help":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.5V14M12 17v.1" />
        </svg>
      );
    case "settings":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2.5v3M12 18.5v3M4.2 6.2l2.1 2.1M17.7 15.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 17.8l2.1-2.1M17.7 8.3l2.1-2.1" />
        </svg>
      );
    case "check":
      return (
        <svg {...c} strokeWidth={2.6}>
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      );
    case "group":
      return (
        <svg {...c}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 19c.8-3 3.2-4.5 6-4.5s5.2 1.5 6 4.5" />
          <circle cx="17" cy="9" r="2.3" />
          <path d="M16 14.6c2.3 0 4.2 1.4 5 4" />
        </svg>
      );
    case "phone":
      return (
        <svg {...c}>
          <path d="M5 3.5h3.2l1.6 4.2-2.1 1.4a11 11 0 0 0 7.2 7.2l1.4-2.1 4.2 1.6V19c0 .8-.7 1.5-1.5 1.5C10.6 20.5 3.5 13.4 3.5 5 3.5 4.2 4.2 3.5 5 3.5Z" />
        </svg>
      );
    case "chat":
      return (
        <svg {...c}>
          <path d="M4 5.5C4 4.7 4.7 4 5.5 4h13c.8 0 1.5.7 1.5 1.5v9c0 .8-.7 1.5-1.5 1.5H10l-4.5 4v-4h0c-.8 0-1.5-.7-1.5-1.5v-9Z" />
        </svg>
      );
    default: {
      const never: never = name;
      return never;
    }
  }
}
