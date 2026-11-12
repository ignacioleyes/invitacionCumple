import { event } from '../config/event'
import { Countdown } from './Countdown'

const TIME_ZONE = 'America/Argentina/Salta'

export function EventDetails() {
  const date = new Date(event.dateTime)

  const dayText = new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: TIME_ZONE,
  }).format(date)

  const timeText = new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: TIME_ZONE,
  }).format(date)

  return (
    <section className="py-16 px-4 bg-base-100">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <h2 className="text-4xl font-bold text-center">¿Cuándo? 📅</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card bg-primary text-primary-content shadow-md">
            <div className="card-body items-center text-center">
              <span className="text-4xl" aria-hidden>🗓️</span>
              <p className="text-2xl font-bold first-letter:uppercase">{dayText}</p>
            </div>
          </div>
          <div className="card bg-secondary text-secondary-content shadow-md">
            <div className="card-body items-center text-center">
              <span className="text-4xl" aria-hidden>⏰</span>
              <p className="text-2xl font-bold">{timeText} hs</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-center text-base-content/70">Faltan...</p>
          <Countdown target={event.dateTime} />
        </div>
      </div>
    </section>
  )
}
