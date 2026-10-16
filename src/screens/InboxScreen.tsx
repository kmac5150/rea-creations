import { useState } from "react";
import { useApp } from "../app-context";
import { Avatar, NavHeader, Segmented } from "../components";
import { CONVERSATIONS, NOTIFICATIONS, byId, formatPrice, type Notice } from "../data";
import { Icon, type IconName } from "../icons";

const NOTICE_ICON: Record<Notice["kind"], IconName> = {
  new: "home",
  price: "tag",
  tour: "calendar",
  open: "sign",
  rec: "sparkle",
  sold: "check",
};

export function InboxScreen({ readIds, markRead }: { readIds: string[]; markRead: (id: string) => void }) {
  const { push } = useApp();
  const [view, setView] = useState<"Messages" | "Notifications">("Messages");
  const unreadNotices = NOTIFICATIONS.filter((n) => n.unread && !readIds.includes(n.id)).length;

  return (
    <div className="screen tab-screen">
      <div className="tab-scroll">
        <h1 className="large-title top">Inbox</h1>
        <div className="fav-seg">
          <Segmented
            options={["Messages", "Notifications"] as const}
            value={view}
            onChange={setView}
            variant="underline"
          />
          {unreadNotices > 0 && <span className="seg-dot">{unreadNotices}</span>}
        </div>
        {view === "Messages"
          ? CONVERSATIONS.map((c) => {
              const l = byId(c.listingId);
              const unread = c.unread && !readIds.includes(c.id);
              return (
                <button
                  key={c.id}
                  className={`convo ${unread ? "unread" : ""}`}
                  onClick={() => {
                    markRead(c.id);
                    push({ kind: "chat", id: c.id });
                  }}
                >
                  <Avatar agent={c.agent} size={48} />
                  <span className="convo-body">
                    <span className="convo-top">
                      <b>{c.agent.name}</b>
                      <span className="muted small">{c.time}</span>
                    </span>
                    <span className="convo-listing">{l.street}</span>
                    <span className="convo-preview">{c.preview}</span>
                  </span>
                  {unread && <i className="unread-dot" />}
                </button>
              );
            })
          : NOTIFICATIONS.map((n) => {
              const l = byId(n.listingId);
              const unread = n.unread && !readIds.includes(n.id);
              return (
                <button
                  key={n.id}
                  className={`notice ${unread ? "unread" : ""}`}
                  onClick={() => {
                    markRead(n.id);
                    push({ kind: "home", id: l.id });
                  }}
                >
                  <span className="notice-ico">
                    <Icon name={NOTICE_ICON[n.kind]} size={18} />
                  </span>
                  <span className="notice-body">
                    <b>{n.title}</b>
                    <span>{n.body}</span>
                    <span className="muted small">{n.time}</span>
                  </span>
                  <img src={l.photos[0]} alt="" />
                  {unread && <i className="unread-dot" />}
                </button>
              );
            })}
        <div className="tab-bottom-pad" />
      </div>
    </div>
  );
}

export function ChatScreen({ id }: { id: string }) {
  const { pop, push } = useApp();
  const convo = CONVERSATIONS.find((c) => c.id === id) ?? CONVERSATIONS[0];
  const l = byId(convo.listingId);
  const [messages, setMessages] = useState(convo.messages);
  const [draft, setDraft] = useState("");

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "me", text, time: "Now" }]);
    setDraft("");
    window.setTimeout(() => {
      setMessages((m) => [...m, { from: "them", text: "Thanks! Let me check on that and get right back to you.", time: "Now" }]);
    }, 1200);
  };

  return (
    <div className="screen chat">
      <NavHeader
        title={convo.agent.name}
        onBack={pop}
        trailing={
          <button className="glass-btn round" aria-label="Call agent">
            <Icon name="phone" size={18} />
          </button>
        }
      />
      <button className="chat-listing" onClick={() => push({ kind: "home", id: l.id })}>
        <img src={l.photos[0]} alt="" />
        <span>
          <b>{formatPrice(l)}</b>
          <span>
            {l.street}, {l.city}
          </span>
        </span>
        <Icon name="chevronRight" size={18} />
      </button>
      <div className="chat-scroll">
        <div className="chat-day">Today</div>
        {messages.map((m, i) => (
          <div key={i} className={`bubble-row ${m.from}`}>
            {m.from === "them" && <Avatar agent={convo.agent} size={28} />}
            <div className="bubble">
              {m.text}
              <span>{m.time}</span>
            </div>
          </div>
        ))}
      </div>
      <form
        className="composer"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Message" />
        <button type="submit" className={`send ${draft.trim() ? "on" : ""}`} aria-label="Send">
          <Icon name="send" size={18} />
        </button>
      </form>
    </div>
  );
}
