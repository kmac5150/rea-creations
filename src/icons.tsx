import type { SVGProps } from "react";

export type IconName =
  | "discover"
  | "bookmark"
  | "bookmarkFill"
  | "ticket"
  | "sell"
  | "user"
  | "pin"
  | "search"
  | "chevronRight"
  | "chevronDown"
  | "back"
  | "close"
  | "more"
  | "mic"
  | "heart"
  | "heartFill"
  | "arrowRight"
  | "filter"
  | "sort"
  | "access"
  | "rotate"
  | "cycle"
  | "expand"
  | "barcode"
  | "transfer"
  | "help"
  | "bell"
  | "card"
  | "check"
  | "star"
  | "calendar"
  | "settings"
  | "wallet"
  | "clock"
  | "info";

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
    case "discover":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
        </svg>
      );
    case "bookmark":
      return (
        <svg {...c}>
          <path d="M6 3.5h12v17l-6-4.2-6 4.2v-17Z" />
        </svg>
      );
    case "bookmarkFill":
      return (
        <svg {...c}>
          <path d="M6 3.5h12v17l-6-4.2-6 4.2v-17Z" fill="currentColor" />
        </svg>
      );
    case "ticket":
      return (
        <svg {...c}>
          <path d="M3 8V6h18v2a2.5 2.5 0 0 0 0 5v5H3v-5a2.5 2.5 0 0 0 0-5Z" />
          <path d="M14 6v2M14 11v2M14 16v2" />
        </svg>
      );
    case "sell":
      return (
        <svg {...c}>
          <path d="M3 12V4.5c0-.8.7-1.5 1.5-1.5H12l9 9-9 9-9-9Z" />
          <path d="M10 10.5c0-.8.7-1.5 1.8-1.5s1.7.6 1.7 1.3c0 1.9-3.5 1.2-3.5 3.1 0 .8.8 1.4 1.8 1.4s1.7-.6 1.7-1.4M11.8 8v1M11.8 14.8v1" />
        </svg>
      );
    case "user":
      return (
        <svg {...c}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20.5c1.3-3.6 4.3-5.5 8-5.5s6.7 1.9 8 5.5" />
        </svg>
      );
    case "pin":
      return (
        <svg {...c} strokeWidth={0}>
          <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
        </svg>
      );
    case "search":
      return (
        <svg {...c} strokeWidth={2.4}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m15.5 15.5 5 5" />
        </svg>
      );
    case "chevronRight":
      return (
        <svg {...c}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      );
    case "chevronDown":
      return (
        <svg {...c}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "back":
      return (
        <svg {...c}>
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      );
    case "close":
      return (
        <svg {...c}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case "more":
      return (
        <svg {...c} strokeWidth={0}>
          <circle cx="12" cy="5" r="1.9" fill="currentColor" />
          <circle cx="12" cy="12" r="1.9" fill="currentColor" />
          <circle cx="12" cy="19" r="1.9" fill="currentColor" />
        </svg>
      );
    case "mic":
      return (
        <svg {...c} strokeWidth={1.6}>
          <circle cx="15.5" cy="8.5" r="4.5" />
          <path d="m12.3 11.7-8.3 8.3M5.5 17l1.5 1.5M12 6l6.5 6.5" />
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
        <svg {...c}>
          <path fill="currentColor" d="M12 20.5s-7.5-4.6-9.2-9.3C1.6 7.8 3.9 4.5 7.3 4.5c2 0 3.5 1.1 4.7 2.7 1.2-1.6 2.7-2.7 4.7-2.7 3.4 0 5.7 3.3 4.5 6.7-1.7 4.7-9.2 9.3-9.2 9.3Z" />
        </svg>
      );
    case "arrowRight":
      return (
        <svg {...c} strokeWidth={2.2}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "filter":
      return (
        <svg {...c}>
          <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
          <circle cx="16" cy="7" r="2" />
          <circle cx="10" cy="17" r="2" />
        </svg>
      );
    case "sort":
      return (
        <svg {...c}>
          <path d="M8 4v16M4 8l4-4 4 4M16 20V4M20 16l-4 4-4-4" />
        </svg>
      );
    case "access":
      return (
        <svg {...c} strokeWidth={0}>
          <circle cx="12" cy="12" r="11" fill="currentColor" />
          <circle cx="12.5" cy="5.8" r="1.6" fill="#fff" />
          <path d="M11.5 8.5v4.5h4l1.5 4.5M11.5 10.5h4M9.5 11a4.2 4.2 0 1 0 5.5 5.2" stroke="#fff" strokeWidth={1.6} fill="none" />
        </svg>
      );
    case "rotate":
      return (
        <svg {...c}>
          <ellipse cx="12" cy="12" rx="9" ry="4" />
          <path d="m17 5 2 3-3 1" />
        </svg>
      );
    case "cycle":
      return (
        <svg {...c}>
          <path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4" />
        </svg>
      );
    case "expand":
      return (
        <svg {...c}>
          <path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" />
        </svg>
      );
    case "barcode":
      return (
        <svg {...c}>
          <path d="M3 7V4h3M18 4h3v3M21 17v3h-3M6 20H3v-3M7 8v8M10 8v8M13 8v8M16 8v8" />
        </svg>
      );
    case "transfer":
      return (
        <svg {...c}>
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      );
    case "help":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.5V14M12 17v.1" />
        </svg>
      );
    case "bell":
      return (
        <svg {...c}>
          <path d="M6 10a6 6 0 1 1 12 0c0 5.5 2 7 2 7H4s2-1.5 2-7Z" />
          <path d="M10 20.5a2.2 2.2 0 0 0 4 0" />
        </svg>
      );
    case "card":
      return (
        <svg {...c}>
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="M2.5 10h19M6 15h4" />
        </svg>
      );
    case "check":
      return (
        <svg {...c} strokeWidth={2.6}>
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      );
    case "star":
      return (
        <svg {...c} strokeWidth={0}>
          <path fill="currentColor" d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.4L12 17.4l-5.7 3 1.1-6.4-4.6-4.5 6.4-.9L12 2.8Z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...c}>
          <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
          <path d="M3.5 10h17M8 3v4M16 3v4" />
        </svg>
      );
    case "settings":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2.5v3M12 18.5v3M4.2 6.2l2.1 2.1M17.7 15.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 17.8l2.1-2.1M17.7 8.3l2.1-2.1" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...c}>
          <rect x="3" y="6" width="18" height="14" rx="2.5" />
          <path d="M3 10h18M16 15h2M6 6l9-3 1.5 3" />
        </svg>
      );
    case "clock":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "info":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v6M12 7.5v.1" />
        </svg>
      );
    default: {
      const never: never = name;
      return never;
    }
  }
}
