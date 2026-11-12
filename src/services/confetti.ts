import confetti from 'canvas-confetti'

const COLORS = ['#f9a8d4', '#93c5fd', '#fde68a', '#a7f3d0', '#c4b5fd', '#ef4444']

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Lluvia de confeti desde los dos costados. */
export function celebrate(durationMs = 1500) {
  if (reducedMotion()) return
  const end = Date.now() + durationMs
  ;(function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: COLORS })
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: COLORS })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}

/** Explosión de confeti en el centro. */
export function burst() {
  if (reducedMotion()) return
  confetti({ particleCount: 120, spread: 90, startVelocity: 40, origin: { y: 0.6 }, colors: COLORS })
}
