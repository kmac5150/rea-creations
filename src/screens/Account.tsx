import { useApp } from "../app-context";
import { BackHeader, DashPassMark, SheetFrame, StoreLogo } from "../components";
import { ADDRESSES, STORES } from "../data";
import { Icon, type IconName } from "../icons";

const MENU: { icon: IconName; label: string; sub?: string }[] = [
  { icon: "card", label: "Payment", sub: "Visa •••• 4242" },
  { icon: "pin", label: "Saved Addresses", sub: `${ADDRESSES.length} addresses` },
  { icon: "gift", label: "Gift Card", sub: "$25.00 credit" },
  { icon: "tag", label: "Promotions" },
  { icon: "group", label: "Invite Friends", sub: "Get $20 off" },
  { icon: "bell", label: "Notifications" },
  { icon: "help", label: "Help" },
  { icon: "settings", label: "Settings" },
];

export function AccountScreen() {
  const { pop, toast, favorites, push } = useApp();
  const saved = STORES.filter((s) => favorites.includes(s.id));
  return (
    <div className="screen">
      <BackHeader title="Account" onBack={pop} />
      <div className="scroll pad-top-header">
        <div className="profile">
          <span className="profile-avatar">K</span>
          <span>
            <b>Kellen L.</b>
            <span className="muted">View profile</span>
          </span>
        </div>
        <div className="dashpass-card">
          <span>
            <b>
              <DashPassMark size={18} /> DashPass
            </b>
            <span>$0 delivery fees and lower service fees on eligible orders.</span>
          </span>
          <button className="btn white small" onClick={() => toast("DashPass free trial started")}>
            Try 30 days free
          </button>
        </div>
        {saved.length > 0 && (
          <>
            <h3 className="block-title">Saved stores</h3>
            <div className="logo-row">
              {saved.map((s) => (
                <button key={s.id} className="logo-tile" onClick={() => push({ kind: "store", id: s.id })}>
                  <StoreLogo store={s} size={56} />
                  <span>{s.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </>
        )}
        {MENU.map((m) => (
          <button key={m.label} className="menu-item" onClick={() => toast(m.label)}>
            <Icon name={m.icon} size={22} />
            <span>
              <b>{m.label}</b>
              {m.sub && <span className="muted">{m.sub}</span>}
            </span>
            <Icon name="chevronRight" size={18} />
          </button>
        ))}
        <button className="sign-out" onClick={() => toast("Signed out (demo)")}>
          Sign Out
        </button>
        <div className="bottom-pad" />
      </div>
    </div>
  );
}

const NOTICES = [
  { emoji: "🎃", title: "Halloween treats are here", body: "Candy, costumes and party snacks delivered in under an hour.", time: "2h" },
  { emoji: "🍔", title: "Smash Bros Burgers: $10 off $20+", body: "DashPass exclusive. Ends Sunday.", time: "5h" },
  { emoji: "⭐", title: "How was Koi & Rice Sushi?", body: "Rate your order to help others discover great food.", time: "Oct 4" },
  { emoji: "💳", title: "You’ve got $25 in credits", body: "Applied automatically at checkout.", time: "Oct 1" },
];

export function NotificationsScreen() {
  const { pop } = useApp();
  return (
    <div className="screen">
      <BackHeader title="Notifications" onBack={pop} />
      <div className="scroll pad-top-header">
        {NOTICES.map((n) => (
          <div key={n.title} className="notice">
            <span className="notice-emoji">{n.emoji}</span>
            <span>
              <b>{n.title}</b>
              <span className="muted">{n.body}</span>
            </span>
            <small className="muted">{n.time}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AddressSheet() {
  const { closeSheet, addressId, setAddressId } = useApp();
  return (
    <SheetFrame title="Addresses" onClose={closeSheet}>
      <label className="search-pill input">
        <Icon name="search" size={20} />
        <input placeholder="Enter a new address" />
      </label>
      <button className="addr-row current">
        <Icon name="pin" size={20} />
        <span>
          <b>Use current location</b>
        </span>
      </button>
      {ADDRESSES.map((a) => (
        <button
          key={a.id}
          className="addr-row"
          onClick={() => {
            setAddressId(a.id);
            closeSheet();
          }}
        >
          <Icon name={a.label === "Work" ? "store" : "home"} size={20} />
          <span>
            <b>{a.label}</b>
            <span className="muted">
              {a.detail}
              {a.note ? ` · ${a.note}` : ""}
            </span>
          </span>
          {a.id === addressId && <Icon name="check" size={20} className="red-text" />}
        </button>
      ))}
    </SheetFrame>
  );
}
