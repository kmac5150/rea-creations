import { useState } from "react";
import { useApp } from "../app-context";
import { DashPassMark, Pill, ProductTile, SearchPill, SectionHeader, StoreCard, StoreLogo, TopHeader } from "../components";
import { STORES, type Vertical } from "../data";
import { Icon } from "../icons";

const HUB_CHIPS: Record<Exclude<Vertical, "restaurant">, string[]> = {
  grocery: ["Pets", "Flowers", "Retail", "Convenience", "Beauty", "Alcohol"],
  retail: ["Flowers", "Sporting Goods", "Pets", "Beauty", "Electronics", "Home"],
};

const SECTION_TITLES: Record<string, string> = {
  freshcart: "Farm Fresh Groceries",
  greenleaf: "Halloween Candy",
  dashmart: "Health & Flu Essentials",
  bloom: "Flowers for any occasion",
  peak: "Game day gear",
  pawpal: "What your pets need, and want",
};

export function HubScreen({ vertical }: { vertical: Exclude<Vertical, "restaurant"> }) {
  const { push, setTab } = useApp();
  const [chip, setChip] = useState<string | null>(null);
  const stores = STORES.filter((s) => s.vertical === vertical);
  const title = vertical === "grocery" ? "Grocery" : "Retail";

  return (
    <div className="screen">
      <div className="sticky-top">
        <TopHeader title={title} />
        <div className="pill-row tight">
          {HUB_CHIPS[vertical].map((c) => (
            <Pill key={c} active={chip === c} onClick={() => setChip(chip === c ? null : c)}>
              {c}
            </Pill>
          ))}
        </div>
      </div>
      <div className="scroll">
        <SearchPill placeholder={`Search ${title.toLowerCase()} stores`} onClick={() => setTab("browse")} />
        <div className="logo-row">
          {stores.map((s) => (
            <button key={s.id} className="logo-tile" onClick={() => push({ kind: "store", id: s.id })}>
              <StoreLogo store={s} size={60} />
              <span>{s.name.split(" ")[0]}</span>
              <small>{s.eta} min</small>
            </button>
          ))}
        </div>
        {stores.map((s) => (
          <section key={s.id} className="hub-section">
            <div className="hub-head" onClick={() => push({ kind: "store", id: s.id })}>
              <StoreLogo store={s} size={40} />
              <span>
                <h2>{SECTION_TITLES[s.id] ?? s.name}</h2>
                <span className="section-sub">
                  From {s.name} {s.dashpass && <DashPassMark />} · {s.eta} min
                </span>
              </span>
              <span className="arrow-btn">
                <Icon name="arrowRight" size={18} />
              </span>
            </div>
            <div className="h-scroll">
              {s.items.slice(0, 6).map((i) => (
                <ProductTile key={i.id} store={s} item={i} />
              ))}
            </div>
          </section>
        ))}
        <section>
          <SectionHeader title={`All ${title.toLowerCase()} stores`} />
          {stores.map((s) => (
            <StoreCard key={s.id} store={s} wide />
          ))}
        </section>
        <div className="bottom-pad" />
      </div>
    </div>
  );
}
