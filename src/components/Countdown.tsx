import { useEffect, useState, type CSSProperties } from 'react'

interface Props {
  target: string
}

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now())
  return {
    total: diff,
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown({ target }: Props) {
  const targetMs = new Date(target).getTime()
  const [remaining, setRemaining] = useState(() => getRemaining(targetMs))

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(targetMs)), 1000)
    return () => clearInterval(id)
  }, [targetMs])

  if (remaining.total === 0) {
    return <p className="text-2xl font-bold text-center">¡Llegó el gran día! 🎉</p>
  }

  const units = [
    { label: 'días', value: remaining.days },
    { label: 'horas', value: remaining.hours },
    { label: 'min', value: remaining.minutes },
    { label: 'seg', value: remaining.seconds },
  ]

  return (
    <div className="grid grid-flow-col gap-3 text-center auto-cols-max justify-center">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col p-3 bg-base-100 rounded-box shadow min-w-16">
          <span className="countdown font-mono text-3xl md:text-4xl justify-center">
            <span style={{ '--value': u.value } as CSSProperties}>
              {u.value}
            </span>
          </span>
          <span className="text-sm text-base-content/70">{u.label}</span>
        </div>
      ))}
    </div>
  )
}
