import { event } from '../config/event'
import { Reveal } from './Reveal'

export function Location() {
  const query = encodeURIComponent(event.location.mapsQuery)
  const embedUrl = `https://www.google.com/maps?q=${query}&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`

  return (
    <section className="bg-base-200 py-20 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center">¿Dónde? 📍</h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex items-end justify-center gap-2">
            <img
              src={event.images.location}
              alt="Snoopy saludando"
              className="drawing w-24 md:w-32 animate-float shrink-0"
            />
            <div className="chat chat-start flex-1 max-w-md">
              <div className="chat-bubble chat-bubble-accent text-left py-4 px-5 shadow-md">
                <p className="text-xl font-bold">{event.location.venue}</p>
                <p className="font-semibold">{event.location.address}</p>
                <p className="opacity-80">
                  {event.location.neighborhood} · {event.location.city}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="rounded-box overflow-hidden shadow-xl aspect-video bg-base-300 ring-4 ring-white">
            <iframe
              title="Mapa del lugar del cumpleaños"
              src={embedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <Reveal delay={300} className="self-center">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent btn-lg rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            🚗 Cómo llegar
          </a>
        </Reveal>
      </div>
    </section>
  )
}
