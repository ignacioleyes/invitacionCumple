const COLORS = ['#f9a8d4', '#93c5fd', '#fde68a', '#a7f3d0', '#c4b5fd', '#fca5a5']

const BALLOONS = [
  { left: '4%', size: 46, duration: 14, delay: 0 },
  { left: '16%', size: 36, duration: 18, delay: 5 },
  { left: '28%', size: 52, duration: 16, delay: 9 },
  { left: '44%', size: 40, duration: 20, delay: 2 },
  { left: '62%', size: 48, duration: 15, delay: 7 },
  { left: '76%', size: 38, duration: 19, delay: 11 },
  { left: '90%', size: 44, duration: 17, delay: 4 },
]

/** Globitos de colores que suben por la pantalla. */
export function Balloons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {BALLOONS.map((b, i) => (
        <svg
          key={i}
          className="balloon"
          style={{
            left: b.left,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
          width={b.size}
          height={b.size * 2}
          viewBox="0 0 40 80"
        >
          <path d="M20 46 q-4 10 2 18 q5 8 -2 16" stroke="#555" strokeWidth="1" fill="none" />
          <ellipse cx="20" cy="22" rx="17" ry="21" fill={COLORS[i % COLORS.length]} stroke="#333" strokeWidth="1.5" />
          <path d="M17 43 l3 4 l3 -4 z" fill={COLORS[i % COLORS.length]} stroke="#333" strokeWidth="1" />
          <ellipse cx="13" cy="14" rx="3" ry="5" fill="#fff" opacity="0.7" />
        </svg>
      ))}
    </div>
  )
}
