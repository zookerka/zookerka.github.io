// Stylised satellite tile: terrain, fields, roads, a scan sweep and detection boxes.
const boxes = [
  { x: 62, y: 58, w: 46, h: 30, label: "structure 0.91", d: 0 },
  { x: 236, y: 132, w: 34, h: 22, label: "vehicle 0.87", d: 1 },
  { x: 150, y: 184, w: 58, h: 36, label: "change Δ 0.79", d: 2 },
];

export function ResearchVisual() {
  return (
    <div className="rv" aria-hidden="true">
      <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="rv-fine" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0H0V10" fill="none" stroke="rgba(139,148,158,0.06)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="260" fill="#0b0f14" />
        <rect width="400" height="260" fill="url(#rv-fine)" />

        {/* fields */}
        <g fill="rgba(139,148,158,0.06)" stroke="rgba(139,148,158,0.14)">
          <path d="M20 120 L120 104 L132 170 L30 186 Z" />
          <path d="M140 30 L250 22 L258 90 L148 98 Z" />
          <path d="M280 40 L380 52 L372 118 L272 108 Z" />
          <path d="M290 170 L384 160 L390 240 L296 246 Z" />
        </g>

        {/* terrain */}
        <g fill="none" stroke="rgba(201,209,217,0.10)">
          <path d="M-10 230 C 60 200, 110 250, 170 226 S 280 200, 410 232" />
          <path d="M-10 246 C 70 220, 120 262, 180 242 S 290 220, 410 250" />
          <path d="M170 140 C 190 118, 230 120, 240 140 S 220 176, 196 170 S 160 160, 170 140 Z" />
          <path d="M182 142 C 194 130, 220 132, 226 144 S 214 162, 200 160 S 176 154, 182 142 Z" />
        </g>

        {/* roads and river */}
        <path d="M0 96 C 80 90, 140 120, 210 112 S 330 140, 400 128" fill="none" stroke="rgba(201,209,217,0.22)" strokeWidth="2" />
        <path d="M120 0 C 130 60, 112 140, 140 260" fill="none" stroke="rgba(201,209,217,0.14)" strokeWidth="1.5" />
        <path d="M400 10 C 330 40, 300 80, 320 150 S 260 230, 240 260" fill="none" stroke="rgba(121,192,255,0.18)" strokeWidth="5" strokeLinecap="round" />

        {/* buildings */}
        <g fill="rgba(201,209,217,0.28)">
          <rect x="70" y="64" width="12" height="9" />
          <rect x="88" y="66" width="10" height="14" />
          <rect x="74" y="77" width="9" height="6" />
          <rect x="242" y="138" width="8" height="5" />
          <rect x="256" y="142" width="8" height="5" />
          <rect x="160" y="192" width="18" height="12" />
          <rect x="184" y="196" width="14" height="16" />
        </g>

        {/* detection boxes */}
        {boxes.map((b) => (
          <g key={b.label} className="rv-box" style={{ "--b": b.d } as React.CSSProperties}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="rgba(86,212,168,0.06)" stroke="#56d4a8" strokeWidth="1" />
            <rect x={b.x} y={b.y - 12} width={b.label.length * 5.4 + 8} height="11" fill="#56d4a8" />
            <text x={b.x + 4} y={b.y - 3.5} fontSize="8" fill="#04241b" fontFamily="JetBrains Mono Variable, monospace">
              {b.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="rv-scan" />
      <div className="rv-hud">
        <span>LAT 47.2°N · LON 39.7°E</span>
        <span>GSD 0.5 m/px</span>
      </div>
    </div>
  );
}
