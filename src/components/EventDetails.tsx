import { event } from '../config/event'
import { Countdown } from './Countdown'
import { Reveal } from './Reveal'

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
    <section id="cuando" className="paws-bg py-20 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center">¿Cuándo? 📅</h2>
        </Reveal>

        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="flex flex-col gap-4">
            <Reveal delay={100}>
              <div className="card bg-primary text-primary-content shadow-lg -rotate-1 hover:rotate-0 hover:scale-105 transition-transform">
                <div className="card-body items-center text-center">
                  <span className="text-4xl" aria-hidden>🗓️</span>
                  <p className="text-2xl md:text-3xl font-bold first-letter:uppercase">{dayText}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={250}>
              <div className="card bg-secondary text-secondary-content shadow-lg rotate-1 hover:rotate-0 hover:scale-105 transition-transform">
                <div className="card-body items-center text-center">
                  <span className="text-4xl" aria-hidden>⏰</span>
                  <p className="text-2xl md:text-3xl font-bold">{timeText} hs</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={400} className="justify-self-center">
            <img
              src={event.images.date}
              alt="Snoopy con torta de cumpleaños"
              className="drawing w-44 md:w-56 animate-wiggle"
            />
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="flex flex-col gap-3">
            <p className="text-center text-lg text-base-content/70">Faltan...</p>
            <Countdown target={event.dateTime} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
