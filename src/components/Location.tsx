import { event } from '../config/event'

export function Location() {
  const query = encodeURIComponent(event.location.mapsQuery)
  const embedUrl = `https://www.google.com/maps?q=${query}&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`

  return (
    <section className="py-16 px-4 bg-base-200">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <h2 className="text-4xl font-bold text-center">¿Dónde? 📍</h2>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body items-center text-center gap-1">
            <p className="text-xl font-bold">{event.location.address}</p>
            <p className="text-base-content/70">
              {event.location.placeName} · {event.location.city}
            </p>
          </div>
        </div>

        <div className="rounded-box overflow-hidden shadow-md aspect-video bg-base-300">
          <iframe
            title="Mapa del lugar del cumpleaños"
            src={embedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-accent btn-lg rounded-full self-center"
        >
          🚗 Cómo llegar
        </a>
      </div>
    </section>
  )
}
