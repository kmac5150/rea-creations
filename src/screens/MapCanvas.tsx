import { useMemo, useRef, useState } from "react";
import { shortPrice, type Listing } from "../data";

type Props = {
  listings: Listing[];
  selectedId: string | null;
  visited: string[];
  onSelect: (id: string | null) => void;
  satellite: boolean;
};

/** Seeded filler dots so the map reads like a dense metro search, not 18 lonely pins. */
function fillerDots(seed: number) {
  const dots: { x: number; y: number }[] = [];
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < 70; i++) dots.push({ x: 8 + rnd() * 84, y: 14 + rnd() * 74 });
  return dots;
}

export function MapCanvas({ listings, selectedId, visited, onSelect, satellite }: Props) {
  const [pan, setPan] = useState({ x: -60, y: -90 });
  const drag = useRef<{ x: number; y: number; px: number; py: number; moved: boolean } | null>(null);
  const dots = useMemo(() => fillerDots(listings.length * 31 + 7), [listings.length]);
  const status = listings[0]?.status ?? "For sale";

  return (
    <div
      className={`map-viewport ${satellite ? "satellite" : ""}`}
      onPointerDown={(e) => {
        drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y, moved: false };
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d) return;
        const dx = e.clientX - d.x;
        const dy = e.clientY - d.y;
        if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
        setPan({ x: Math.min(0, Math.max(-150, d.px + dx)), y: Math.min(0, Math.max(-260, d.py + dy)) });
      }}
      onPointerUp={(e) => {
        const d = drag.current;
        drag.current = null;
        if (d && !d.moved && (e.target as HTMLElement).closest(".map-pin") === null) onSelect(null);
      }}
    >
      <div className="map-layer" style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}>
        <svg className="map-svg" viewBox="0 0 540 1100" preserveAspectRatio="none" aria-hidden>
          <rect width="540" height="1100" className="m-land" />
          <path className="m-park" d="M30 640c40-30 90-20 110 10s-10 80-60 80-80-60-50-90Z" />
          <path className="m-park" d="M360 180c30-20 80-10 90 20s-20 60-60 60-60-50-30-80Z" />
          <path className="m-park" d="M210 860c30-10 70 0 80 30s-30 50-60 46-50-60-20-76Z" />
          <path className="m-park" d="M420 760c20-10 60 0 66 24s-20 40-46 36-40-46-20-60Z" />
          <path className="m-water" d="M-20 260c80 10 130 70 190 90s110-20 160 10 40 120 100 150 90-10 130 20v40c-50-30-80 10-140-20s-60-120-100-140-110 20-170 0S40 320-20 310Z" />
          <path className="m-water" d="M380 950c40-10 90 10 120 40l20 30c-40-20-80-40-140-30Z" />
          <g className="m-streets">
            {Array.from({ length: 28 }, (_, i) => (
              <path key={`h${i}`} d={`M0 ${40 + i * 38} L540 ${30 + i * 38 + (i % 3) * 6}`} />
            ))}
            {Array.from({ length: 15 }, (_, i) => (
              <path key={`v${i}`} d={`M${20 + i * 36} 0 L${10 + i * 36 + (i % 4) * 8} 1100`} />
            ))}
          </g>
          <g className="m-roads">
            <path d="M270 0C260 200 300 380 280 560s-60 300-40 540" />
            <path d="M0 520c140 20 260 40 540 10" />
            <path d="M60 0c40 200 120 360 220 520s180 300 260 420" />
            <path d="M540 220C420 300 340 420 280 560S120 860 0 940" />
          </g>
          <g className="m-highway">
            <path d="M120 0c20 160 80 300 160 420s60 260 40 680" />
            <path d="M0 760c160-60 300-140 540-180" />
            <path d="M200 400c80-30 180-30 260 30s60 160 0 220-200 70-280 20-90-180-40-240Z" fill="none" />
          </g>
          <g className="m-labels">
            <text x="230" y="470">Nashville</text>
            <text x="320" y="390" className="small">East Nashville</text>
            <text x="300" y="250" className="small">Inglewood</text>
            <text x="190" y="330" className="small">Bordeaux</text>
            <text x="190" y="560" className="small">Midtown</text>
            <text x="90" y="650" className="small">Bellevue</text>
            <text x="150" y="590" className="small">Belle Meade</text>
            <text x="200" y="760" className="small">Green Hills</text>
            <text x="300" y="860" className="small">Crieve Hall</text>
            <text x="280" y="620" className="small">12 South</text>
            <text x="70" y="330" className="water-label">Cumberland River</text>
          </g>
        </svg>
        {dots.map((d, i) => (
          <span key={i} className={`map-dot ${status === "For rent" ? "rent" : status === "Sold" ? "sold" : ""}`} style={{ left: `${d.x}%`, top: `${d.y}%` }} />
        ))}
        {listings.map((l) => (
          <button
            key={l.id}
            className={`map-pin ${l.status === "For rent" ? "rent" : l.status === "Sold" ? "sold" : ""} ${selectedId === l.id ? "selected" : ""} ${visited.includes(l.id) ? "visited" : ""}`}
            style={{ left: `${l.x}%`, top: `${l.y}%` }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(l.id);
            }}
          >
            {l.badge?.startsWith("New") && <em>NEW</em>}
            {shortPrice(l.price)}
          </button>
        ))}
      </div>
    </div>
  );
}
