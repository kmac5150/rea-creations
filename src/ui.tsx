import type { CSSProperties, ReactNode } from "react";
import { teams, type Team } from "./data";

export function DaznLogo({ size = 34 }: { size?: number }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <path
        fill="none"
        stroke="#F2F2F2"
        strokeWidth="3.4"
        d="M14.5 11.5h35a5 5 0 0 1 5 5v9.2c-5 1.6-5 8.8 0 10.4V47.5a5 5 0 0 1-5 5h-35a5 5 0 0 1-5-5V36.1c5-1.6 5-8.8 0-10.4V16.5a5 5 0 0 1 5-5z"
      />
      <text
        x="32"
        y="29.5"
        textAnchor="middle"
        fill="#F2F2F2"
        fontFamily="Inter, Helvetica, sans-serif"
        fontSize="12.5"
        fontWeight="800"
        letterSpacing="0.8"
      >
        DA
      </text>
      <text
        x="32"
        y="45"
        textAnchor="middle"
        fill="#F2F2F2"
        fontFamily="Inter, Helvetica, sans-serif"
        fontSize="12.5"
        fontWeight="800"
        letterSpacing="0.8"
      >
        ZN
      </text>
    </svg>
  );
}

export function Crest({ team, size = "md" }: { team: Team; size?: "sm" | "md" | "lg" }) {
  const cls = size === "sm" ? "crest sm" : "crest";
  const style: CSSProperties =
    size === "lg"
      ? { width: 56, height: 56, fontSize: 12, background: team.color, color: team.accent }
      : { background: team.color, color: team.accent };
  return (
    <span className={cls} style={style}>
      {team.short.slice(0, 3)}
    </span>
  );
}

export function CrestById({ id, size }: { id: string; size?: "sm" | "md" | "lg" }) {
  const team = teams.find((item) => item.id === id);
  if (!team) {
    return <span className="crest">?</span>;
  }
  return <Crest team={team} size={size} />;
}

export function StatusBar() {
  return (
    <div className="status">
      <div className="status-time">9:41</div>
      <div className="status-island" />
      <div className="status-end">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
          <rect x="0" y="7" width="3" height="5" rx="0.6" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.6" />
          <rect x="9" y="2.5" width="3" height="9.5" rx="0.6" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.6" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
          <path d="M8 9.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm5.3-2.2a7.4 7.4 0 0 0-10.6 0l1.2 1.2a5.7 5.7 0 0 1 8.2 0l1.2-1.2Zm2.5-2.5A10.9 10.9 0 0 0 .2 4.7L1.4 6a9.2 9.2 0 0 1 13.2 0l1.2-1.3Z" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13">
          <rect x="0.6" y="0.6" width="22" height="11.8" rx="3.2" stroke="white" fill="none" />
          <rect x="2.2" y="2.2" width="17.4" height="8.6" rx="1.8" fill="white" />
          <rect x="23.6" y="4.2" width="2.2" height="4.6" rx="0.8" fill="white" />
        </svg>
      </div>
    </div>
  );
}

export function Icon({ name }: { name: IconName }) {
  switch (name) {
    case "home":
      return (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 10.5 11 4l8 6.5V19a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5Z" />
        </svg>
      );
    case "schedule":
      return (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="16" height="14" rx="2" />
          <path d="M3 9h16M8 3v4M14 3v4" />
        </svg>
      );
    case "highlights":
      return (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m11 3 1.8 5.4H18l-4.3 3.3 1.6 5.3L11 13.8 6.7 17l1.6-5.3L4 8.4h5.2L11 3Z" />
        </svg>
      );
    case "search":
      return (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="9" cy="9" r="6.2" />
          <path d="m13.8 13.8 4 4" />
        </svg>
      );
    case "cast":
      return (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 14.5A7 7 0 0 1 9.5 8" />
          <path d="M3 17.5a3 3 0 0 1 3-3" />
          <path d="M3 6.5h14v11h-6" />
          <circle cx="3.2" cy="17.5" r="1" fill="currentColor" />
        </svg>
      );
    case "bell":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 14h8l-.7-1.4a5.4 5.4 0 0 1-.5-2.3V8.4A3.8 3.8 0 0 0 9 4.6 3.8 3.8 0 0 0 5.2 8.4v1.9c0 .8-.17 1.6-.5 2.3L5 14Z" />
          <path d="M7.6 14a1.4 1.4 0 0 0 2.8 0" />
        </svg>
      );
    case "back":
      return (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 4 6 10l7 6" />
        </svg>
      );
    case "close":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4l10 10M14 4 4 14" />
        </svg>
      );
    case "play":
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          <path d="M4 2.5v9l8-4.5-8-4.5Z" />
        </svg>
      );
    case "star":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="m8 1.6 1.7 4.4h4.6L11.4 8.7l1.7 4.4L8 10.4l-5.1 2.7 1.7-4.4L1.7 6h4.6L8 1.6Z" />
        </svg>
      );
    case "filter":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 5h12M5 9h8M7 13h4" />
        </svg>
      );
    case "news":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M4 4h10v12H6a2 2 0 0 1-2-2V4Z" />
          <path d="M7 8h5M7 11h5" />
        </svg>
      );
    case "gear":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
          <circle cx="9" cy="9" r="2.2" />
          <path d="M9 2.4v2M9 13.6v2M2.4 9h2M13.6 9h2M4.3 4.3l1.4 1.4M12.3 12.3l1.4 1.4M12.3 4.3l1.4-1.4M4.3 13.7 5.7 12.3" />
        </svg>
      );
    default: {
      const _exhaustive: never = name;
      return _exhaustive;
    }
  }
}

export type IconName =
  | "home"
  | "schedule"
  | "highlights"
  | "search"
  | "cast"
  | "bell"
  | "back"
  | "close"
  | "play"
  | "star"
  | "filter"
  | "news"
  | "gear";

export function TopBar({
  onSearch,
  onProfile,
  onBack,
  title,
  trailing,
}: {
  onSearch?: () => void;
  onProfile?: () => void;
  onBack?: () => void;
  title?: string;
  trailing?: ReactNode;
}) {
  return (
    <div className={`topbar ${title ? "solid" : ""}`}>
      {onBack ? (
        <button className="back" onClick={onBack} aria-label="Back">
          <Icon name="back" />
        </button>
      ) : (
        <DaznLogo />
      )}
      {title ? <strong>{title}</strong> : <span />}
      <div className="icon-row">
        {trailing}
        {onSearch ? (
          <button className="icon-btn" onClick={onSearch} aria-label="Search">
            <Icon name="search" />
          </button>
        ) : null}
        {onSearch ? (
          <button className="icon-btn" aria-label="Cast">
            <Icon name="cast" />
          </button>
        ) : null}
        {onProfile ? (
          <button className="icon-btn" onClick={onProfile} aria-label="Profile">
            <span className="avatar">T</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
