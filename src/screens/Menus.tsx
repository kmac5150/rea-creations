import { useState } from "react";
import { findItem, itemCount, useApp } from "../app-context";
import { BackButton, Caps, Label, OutlineButton, PageTitle, SearchField, SheetFrame, VenueBar } from "../components";
import { CATALOG, VENUES, money, type MenuItem } from "../data";
import { Icon } from "../icons";

export function MenusScreen() {
  const { menus, push, openSheet, updateMenus, toast, log } = useApp();
  const [q, setQ] = useState("");
  const shown = menus.filter((m) => !q || m.name.toLowerCase().includes(q.toLowerCase()) || m.sections.some((s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.items.some((i) => i.name.toLowerCase().includes(q.toLowerCase()))));
  const noneLive = !menus.some((m) => m.published);
  return (
    <div className="screen">
      <VenueBar
        left={
          <button className="icon-btn blue" aria-label="QR code" onClick={() => openSheet({ kind: "qr" })}>
            <Icon name="qr" size={22} />
          </button>
        }
      />
      <div className="scroll">
        <PageTitle title="Menus" />
        {noneLive && <div className="warn-banner">Your menu is not visible on Untappd. Publish a menu so guests can see your tap list.</div>}
        <div className="pad">
          <SearchField placeholder="Search menus, sections and items" value={q} onChange={setQ} />
        </div>
        <div className="card-list">
          {shown.map((m) => (
            <button key={m.id} className="menu-card" onClick={() => push({ kind: "menu", menuId: m.id })}>
              <span className="mc-main">
                <b>{m.name}</b>
                <span className="muted">{itemCount(m)} Items</span>
                <span className={`pill ${m.published ? "green" : "grey"}`}>{m.published ? "Published" : "Unpublished"}</span>
              </span>
              <Icon name="chevron" size={20} />
            </button>
          ))}
        </div>
        <div className="pad">
          <OutlineButton
            onClick={() => {
              const id = `m${Date.now()}`;
              updateMenus((ms) => [...ms, { id, name: `New Menu ${ms.length + 1}`, published: false, sections: [{ id: `s${id}`, name: "Section 1", items: [] }] }]);
              log("Added a new menu");
              toast("Menu created");
            }}
          >
            <Icon name="plus" size={18} /> Add New Menu
          </OutlineButton>
        </div>
      </div>
    </div>
  );
}

export function MenuDetail({ menuId }: { menuId: string }) {
  const { menus, push, updateMenus, toast, log } = useApp();
  const menu = menus.find((m) => m.id === menuId);
  if (!menu) return null;
  const active = menu.sections.filter((s) => !s.onDeck);
  const onDeck = menu.sections.filter((s) => s.onDeck);
  return (
    <div className="screen">
      <VenueBar />
      <div className="scroll">
        <PageTitle title={menu.name} left={<BackButton />} />
        <div className="pad row-between">
          <span className={`pill ${menu.published ? "green" : "grey"}`}>{menu.published ? "Published" : "Unpublished"}</span>
          <button
            className="text-btn"
            onClick={() => {
              updateMenus((ms) => ms.map((m) => (m.id === menuId ? { ...m, published: !m.published } : m)));
              log(`${menu.published ? "Unpublished" : "Published"} ${menu.name}`);
              toast(menu.published ? "Menu unpublished" : "Menu published to Untappd");
            }}
          >
            {menu.published ? "Unpublish" : "Publish"}
          </button>
        </div>
        <p className="group-label">ACTIVE SECTIONS</p>
        <div className="card-list">
          {active.map((s) => (
            <button key={s.id} className="menu-card" onClick={() => push({ kind: "section", menuId, sectionId: s.id })}>
              <span className="mc-main">
                <b>{s.name}</b>
                <span className="muted">{s.items.length} Items</span>
              </span>
              <Icon name="chevron" size={20} />
            </button>
          ))}
        </div>
        {onDeck.length > 0 && (
          <>
            <p className="group-label">COMING SOON</p>
            <div className="card-list">
              {onDeck.map((s) => (
                <button key={s.id} className="menu-card dim" onClick={() => push({ kind: "section", menuId, sectionId: s.id })}>
                  <span className="mc-main">
                    <b>{s.name}</b>
                    <span className="muted">{s.items.length} Items · not shown to guests</span>
                  </span>
                  <Icon name="chevron" size={20} />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const FILTERS = ["Beer", "Wine", "Spirit", "Ready to Drink"] as const;

export function SectionScreen({ menuId, sectionId }: { menuId: string; sectionId: string }) {
  const { menus, push, openSheet, toast } = useApp();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [swiped, setSwiped] = useState<string | null>(null);
  const section = menus.find((m) => m.id === menuId)?.sections.find((s) => s.id === sectionId);
  if (!section) return null;
  const items = section.items.filter((i) => !q || i.name.toLowerCase().includes(q.toLowerCase()) || i.brewery.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="screen">
      <VenueBar />
      <div className="scroll with-chips">
        <PageTitle
          title={section.name}
          left={<BackButton />}
          right={
            <>
              <button className="icon-btn blue" aria-label="Refresh" onClick={() => toast("Menu refreshed")}>
                <Icon name="refresh" size={22} />
              </button>
              <button className="icon-btn blue" aria-label="Add item" onClick={() => openSheet({ kind: "addItem", menuId, sectionId })}>
                <Icon name="pencil" size={22} />
              </button>
            </>
          }
        />
        <div className="pad search-row">
          <SearchField placeholder="Search Items" value={q} onChange={setQ} />
          <button className="icon-btn" aria-label="Reorder">
            <Icon name="lines" size={22} />
          </button>
        </div>
        <div className="item-list">
          {items.length === 0 && <p className="empty">No items yet. Tap the pencil to add one.</p>}
          {items.map((i) => (
            <div key={i.id} className={`item-row ${swiped === i.id ? "swiped" : ""}`}>
              <div className="item-card" onClick={() => push({ kind: "item", menuId, sectionId, itemId: i.id })}>
                <Label label={i.label} />
                <div className="ic-main">
                  <b className="ic-name">{i.name}</b>
                  <span className="ic-meta">
                    {i.brewery} • {i.style} • {i.abv.toFixed(1)}% ABV{i.category === "Beer" ? ` • ${i.ibu.toFixed(1)} IBU • ${i.cal} CAL` : ""}
                  </span>
                  <Caps rating={i.rating} />
                  <button
                    className="containers"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(open === i.id ? null : i.id);
                    }}
                  >
                    {i.containers.length} Container{i.containers.length === 1 ? "" : "s"} <Icon name="chevronDown" size={14} />
                  </button>
                  {open === i.id && (
                    <ul className="container-list">
                      {i.containers.map((c) => (
                        <li key={c.size + c.type}>
                          <span>
                            {c.size} {c.type}
                          </span>
                          <b>{money(c.price)}</b>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {i.tap ? <span className="tap-tag">TAP {i.tap}</span> : null}
                <button
                  className="icon-btn more-btn"
                  aria-label={`Actions for ${i.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSwiped(swiped === i.id ? null : i.id);
                  }}
                >
                  <Icon name="chevron" size={20} />
                </button>
              </div>
              {swiped === i.id && (
                <div className="swipe-actions">
                  <button onClick={() => openSheet({ kind: "itemActions", menuId, sectionId, itemId: i.id })}>
                    <Icon name="move" size={22} />
                    Move
                  </button>
                  <button onClick={() => openSheet({ kind: "addItem", menuId, sectionId })}>
                    <Icon name="replace" size={22} />
                    Replace
                  </button>
                  <DeleteButton menuId={menuId} sectionId={sectionId} item={i} onDone={() => setSwiped(null)} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="filter-chips">
        {FILTERS.map((f) => (
          <button key={f} className="chip-outline" onClick={() => openSheet({ kind: "addItem", menuId, sectionId })}>
            <Icon name="search" size={14} /> {f}
          </button>
        ))}
      </div>
    </div>
  );
}

function DeleteButton({ menuId, sectionId, item, onDone }: { menuId: string; sectionId: string; item: MenuItem; onDone: () => void }) {
  const { updateMenus, toast, log } = useApp();
  return (
    <button
      className="danger"
      onClick={() => {
        updateMenus((ms) => ms.map((m) => (m.id !== menuId ? m : { ...m, sections: m.sections.map((s) => (s.id !== sectionId ? s : { ...s, items: s.items.filter((x) => x.id !== item.id) })) })));
        log(`Removed ${item.name}`);
        toast(`${item.name} removed`);
        onDone();
      }}
    >
      <Icon name="trash" size={22} />
      Delete
    </button>
  );
}

export function ItemScreen({ menuId, sectionId, itemId }: { menuId: string; sectionId: string; itemId: string }) {
  const { menus, updateMenus, toast, log, pop } = useApp();
  const item = findItem(menus, menuId, sectionId, itemId);
  const [prices, setPrices] = useState(() => item?.containers.map((c) => c.price.toFixed(2)) ?? []);
  const [tap, setTap] = useState(item?.tap ? String(item.tap) : "");
  if (!item) return null;
  return (
    <div className="screen">
      <VenueBar />
      <div className="scroll">
        <PageTitle title="Edit Item" left={<BackButton />} />
        <div className="pad item-hero">
          <Label label={item.label} size={72} />
          <div>
            <b className="ih-name">{item.name}</b>
            <span className="muted">{item.brewery}</span>
            <span className="muted">
              {item.style} • {item.abv.toFixed(1)}% ABV
            </span>
            <Caps rating={item.rating} />
          </div>
        </div>
        <div className="form pad">
          <label>
            Tap Number
            <input value={tap} inputMode="numeric" onChange={(e) => setTap(e.target.value.replace(/\D/g, ""))} placeholder="None" />
          </label>
          <p className="field-head">Containers</p>
          {item.containers.map((c, idx) => (
            <label key={c.size + c.type} className="price-row">
              <span>
                {c.size} {c.type}
              </span>
              <span className="price-input">
                $<input value={prices[idx]} inputMode="decimal" onChange={(e) => setPrices((p) => p.map((v, j) => (j === idx ? e.target.value : v)))} />
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="sticky-cta">
        <button
          className="primary-btn"
          onClick={() => {
            updateMenus((ms) =>
              ms.map((m) =>
                m.id !== menuId
                  ? m
                  : {
                      ...m,
                      sections: m.sections.map((s) =>
                        s.id !== sectionId
                          ? s
                          : { ...s, items: s.items.map((x) => (x.id !== itemId ? x : { ...x, tap: tap ? Number(tap) : undefined, containers: x.containers.map((c, j) => ({ ...c, price: Number(prices[j]) || c.price })) })) },
                      ),
                    },
              ),
            );
            log(`Updated ${item.name}`);
            toast("Item saved");
            pop();
          }}
        >
          Save & Exit
        </button>
      </div>
    </div>
  );
}

export function ItemActionsSheet({ menuId, sectionId, itemId }: { menuId: string; sectionId: string; itemId: string }) {
  const { menus, updateMenus, closeSheet, toast, log } = useApp();
  const item = findItem(menus, menuId, sectionId, itemId);
  const menu = menus.find((m) => m.id === menuId);
  if (!item || !menu) return null;
  return (
    <SheetFrame title={`Move ${item.name}`}>
      <p className="muted pad-b">Choose a section to move this item to.</p>
      {menu.sections
        .filter((s) => s.id !== sectionId)
        .map((s) => (
          <button
            key={s.id}
            className="sheet-row"
            onClick={() => {
              updateMenus((ms) => ms.map((m) => (m.id !== menuId ? m : { ...m, sections: m.sections.map((x) => (x.id === sectionId ? { ...x, items: x.items.filter((i) => i.id !== itemId) } : x.id === s.id ? { ...x, items: [...x.items, item] } : x)) })));
              log(`Moved ${item.name} to ${s.name}`);
              toast(`Moved to ${s.name}`);
              closeSheet();
            }}
          >
            <span>{s.name}</span>
            <Icon name="chevron" size={18} />
          </button>
        ))}
    </SheetFrame>
  );
}

export function AddItemSheet({ menuId, sectionId }: { menuId: string; sectionId: string }) {
  const { updateMenus, closeSheet, toast, log } = useApp();
  const [q, setQ] = useState("");
  const shown = CATALOG.filter((i) => !q || i.name.toLowerCase().includes(q.toLowerCase()) || i.brewery.toLowerCase().includes(q.toLowerCase()));
  return (
    <SheetFrame title="Add Item">
      <SearchField placeholder="Search beer, wine, spirits" value={q} onChange={setQ} />
      <div className="add-list">
        {shown.map((i) => (
          <button
            key={i.id}
            className="add-row"
            onClick={() => {
              const copy = { ...i, id: `${i.id}-${Date.now()}` };
              updateMenus((ms) => ms.map((m) => (m.id !== menuId ? m : { ...m, sections: m.sections.map((s) => (s.id !== sectionId ? s : { ...s, items: [...s.items, copy] })) })));
              log(`Added ${i.name}`);
              toast(`${i.name} added`);
              closeSheet();
            }}
          >
            <Label label={i.label} size={38} />
            <span>
              <b>{i.name}</b>
              <span className="muted small">
                {i.brewery} • {i.style}
              </span>
            </span>
            <Icon name="plus" size={18} />
          </button>
        ))}
      </div>
    </SheetFrame>
  );
}

export function VenuesSheet() {
  const { venueId, setVenueId, closeSheet, toast } = useApp();
  return (
    <SheetFrame title="Switch Venue">
      {VENUES.map((v) => (
        <button
          key={v.id}
          className="sheet-row"
          onClick={() => {
            setVenueId(v.id);
            toast(`Switched to ${v.name}`);
            closeSheet();
          }}
        >
          <span>
            <b>{v.name}</b>
            <span className="muted small block">{v.address}</span>
          </span>
          {v.id === venueId && <Icon name="check" size={18} />}
        </button>
      ))}
    </SheetFrame>
  );
}

export function QrSheet() {
  const { venueId, toast } = useApp();
  const venue = VENUES.find((v) => v.id === venueId) ?? VENUES[0];
  return (
    <SheetFrame title="Menu QR Code">
      <div className="qr-box">
        <svg viewBox="0 0 21 21" width="180" height="180" shapeRendering="crispEdges">
          {Array.from({ length: 21 * 21 }, (_, n) => {
            const x = n % 21;
            const y = Math.floor(n / 21);
            const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
            const ring = finder && (x % 14 === 0 || x % 14 === 6 || y % 14 === 0 || y % 14 === 6 || (x % 14 >= 2 && x % 14 <= 4 && y % 14 >= 2 && y % 14 <= 4));
            const on = finder ? ring : (x * 7 + y * 13 + x * y) % 3 === 0;
            return on ? <rect key={n} x={x} y={y} width="1" height="1" fill="#111" /> : null;
          })}
        </svg>
        <b>{venue.name}</b>
        <span className="muted small">Guests scan to see your live Untappd menu</span>
      </div>
      <button className="primary-btn" onClick={() => toast("QR code sent to Photos")}>
        Save to Photos
      </button>
    </SheetFrame>
  );
}

export function RocketSheet() {
  const { closeSheet, toast, log } = useApp();
  const [text, setText] = useState("Brewer's Tap Takeover this Friday! 🍻");
  return (
    <SheetFrame title="Promote Your Venue">
      <p className="muted pad-b">Send an announcement to everyone subscribed to your venue on Untappd.</p>
      <textarea className="textarea" rows={3} value={text} onChange={(e) => setText(e.target.value)} />
      <button
        className="primary-btn"
        disabled={!text.trim()}
        onClick={() => {
          log(`Announcement: ${text}`);
          toast("Announcement sent to subscribers");
          closeSheet();
        }}
      >
        Send Announcement
      </button>
    </SheetFrame>
  );
}
