/**
 * Generated cover art: a horizon, a low sun, swell lines and (optionally) a ship
 * silhouette — tinted per cruise line. Deterministic from `seed`, so every
 * article gets its own composition with zero image licensing.
 */

function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function mix(hex: string, target: string, amt: number) {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const a = p(hex);
  const b = p(target);
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * amt)).join(",")})`;
}

export function Cover({
  seed,
  color = "#1A6F6B",
  ship = true,
  className = "",
  label,
}: {
  seed: string;
  color?: string;
  ship?: boolean;
  className?: string;
  label?: string;
}) {
  const r = rng(seed);
  const W = 800;
  const H = 500;
  const horizon = 270 + r() * 60;
  const sunX = 120 + r() * 560;
  const sunR = 38 + r() * 46;
  const sunY = horizon - sunR * (0.25 + r() * 0.9);
  const dusk = r() > 0.5;
  const skyTop = dusk ? mix(color, "#0b1b2e", 0.55) : mix(color, "#ffffff", 0.82);
  const skyLow = dusk ? mix(color, "#f2b705", 0.55) : mix(color, "#ffffff", 0.6);
  const sun = dusk ? "#f6c94a" : "#ffffff";
  const sea = mix(color, "#08182a", 0.35);
  const seaDeep = mix(color, "#08182a", 0.7);
  const id = `c${Math.floor(r() * 1e9)}`;

  const waves = Array.from({ length: 9 }, (_, i) => {
    const y = horizon + 14 + i * (i + 3) * 2.6;
    const amp = 2 + i * 0.9;
    const len = 60 + i * 18;
    const off = r() * len;
    let d = `M -20 ${y}`;
    for (let x = -20; x <= W + 20; x += 10) {
      d += ` L ${x} ${(y + Math.sin(((x + off) / len) * Math.PI * 2) * amp).toFixed(1)}`;
    }
    return { d, o: 0.12 + i * 0.035 };
  });

  // Ship silhouette sitting on the horizon
  const shipX = sunX > W / 2 ? 90 + r() * 160 : 430 + r() * 200;
  const shipW = 170 + r() * 90;
  const decks = 4 + Math.floor(r() * 4);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={skyTop} />
          <stop offset="1" stopColor={skyLow} />
        </linearGradient>
        <linearGradient id={`${id}w`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sea} />
          <stop offset="1" stopColor={seaDeep} />
        </linearGradient>
      </defs>
      <rect width={W} height={horizon} fill={`url(#${id}s)`} />
      <circle cx={sunX} cy={sunY} r={sunR} fill={sun} opacity={dusk ? 0.95 : 0.85} />
      <rect y={horizon} width={W} height={H - horizon} fill={`url(#${id}w)`} />
      {/* sun glint */}
      <rect x={sunX - sunR * 0.6} y={horizon + 4} width={sunR * 1.2} height={H} fill={sun} opacity={0.08} />
      {ship && (
        <g fill={dusk ? "#06121f" : mix(color, "#0b1b2e", 0.6)} opacity={0.92}>
          <path
            d={`M ${shipX} ${horizon - 16} L ${shipX + shipW} ${horizon - 16} L ${shipX + shipW - 18} ${horizon + 3} L ${shipX + 10} ${horizon + 3} Z`}
          />
          {Array.from({ length: decks }, (_, i) => {
            const inset = 14 + i * (shipW * 0.045);
            const y = horizon - 16 - (i + 1) * 6;
            return (
              <rect
                key={i}
                x={shipX + inset * 0.8}
                y={y}
                width={shipW - inset * 1.9}
                height={6.5}
                rx={1.5}
              />
            );
          })}
          <rect
            x={shipX + shipW * 0.62}
            y={horizon - 16 - decks * 6 - 14}
            width={13}
            height={14}
            rx={2}
          />
        </g>
      )}
      {waves.map((w, i) => (
        <path key={i} d={w.d} fill="none" stroke="#ffffff" strokeWidth={1.2} opacity={w.o} />
      ))}
    </svg>
  );
}
