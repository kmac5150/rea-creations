const PATHS = {
  menu: "M4 7h16M4 12h16M4 17h16",
  chevL: "M15 5l-7 7 7 7",
  chevR: "M9 5l7 7-7 7",
  chevD: "M6 9l6 6 6-6",
  chevU: "M6 15l6-6 6 6",
  close: "M6 6l12 12M18 6L6 18",
  plus: "M12 5v14M5 12h14",
  parties: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 8c0-3 3-5 6-5s6 2 6 5M16 5.5a3 3 0 0 1 0 5.6M18 14c2 .6 3 2.3 3 5",
  cover: "M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-7 9c0-3.6 3.1-6 7-6s7 2.4 7 6",
  book: "M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Zm0 13a3 3 0 0 1 3-3h10M9 8h5",
  waitlist: "M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9",
  floor: "M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z",
  guests: "M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm-4 6c.6-2 2.2-3 4-3s3.4 1 4 3M3 7h2M3 12h2M3 17h2",
  stats: "M5 20V11M10 20V5M15 20v-7M20 20V8M3 20h18",
  phone: "M5 4h3l2 5-2 1.5a11 11 0 0 0 5.5 5.5L15 14l5 2v3a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1Z",
  building: "M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M15 9h3a1 1 0 0 1 1 1v11M3 21h18M8 8h1M11 8h1M8 12h1M11 12h1M8 16h1M11 16h1",
  briefcase: "M4 8h16v11H4zM9 8V5h6v3M4 13h16",
  tag: "M3 12V4h8l10 10-8 8L3 12Zm5-5h.01",
  edit: "M4 20h4L19 9l-4-4L4 16v4Zm10-14 4 4M14 20h6",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z",
  note: "M6 3h9l4 4v14H6zM9 10h7M9 14h7M9 18h4",
  check: "M5 12.5l4.5 4.5L19 7",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3 2",
  voicemail: "M6.5 15a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm11 0a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM6.5 15h11",
  message: "M4 5h16v11H9l-5 4V5Zm4 5h.01M12 10h.01M16 10h.01",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  table: "M4 9h16M6 9v10M18 9v10M8 5h8l2 4H6l2-4Z",
  cake: "M4 20h16v-7H4v7Zm2-7V9h12v4M12 9V6m0-2.5c.6.6.6 1.4 0 2-.6-.6-.6-1.4 0-2ZM4 16c2 1.5 3.5-1.5 5.3 0s3.4-1.5 5.4 0 3.3-1.5 5.3 0",
  allergy: "M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M16 3c-2 1.5-2.5 4-2.5 7H17V3h-1Zm1 7v11",
  booth: "M5 20V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v12M5 14h14M9 20v-6M15 20v-6",
  bell: "M6 16V11a6 6 0 1 1 12 0v5l2 2H4l2-2Zm4 4a2 2 0 0 0 4 0",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 5 5",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7.5 7.5 0 0 0-2-1.2L14.5 3h-5l-.4 2.6a7.5 7.5 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7.5 7.5 0 0 0 2 1.2l.4 2.6h5l.4-2.6a7.5 7.5 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z",
  logout: "M10 4H5v16h5M14 8l4 4-4 4M18 12H9",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  send: "M4 12 20 4l-6 16-3-7-7-1Z",
  swap: "M7 7h13l-3-3M17 17H4l3 3",
  walk: "M13 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM10 21l2-6 3 3v3M9 11l3-3 3 3 3 1M12 8l-2 7",
  sms: "M5 4h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-8l-4 4v-4H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm3 6h8",
  trash: "M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13",
  card: "M3 6h18v12H3zM3 10h18M7 15h4",
  dollar: "M12 3v18M16 7c-1-1.3-2.4-2-4-2-2.2 0-4 1.2-4 3s1.6 2.5 4 3 4 1.4 4 3.3S14.2 18 12 18c-1.8 0-3.3-.8-4-2",
} as const;

export type IconName = keyof typeof PATHS | "star" | "starOutline";

export function Icon({ name, size = 22, stroke = 1.8, className }: { name: IconName; size?: number; stroke?: number; className?: string }) {
  if (name === "star" || name === "starOutline") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
        <path
          d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8L12 3.5Z"
          fill={name === "star" ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={name === "star" ? 0 : stroke}
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={PATHS[name]} />
    </svg>
  );
}
