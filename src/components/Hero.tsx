import { event } from '../config/event'

export function Hero() {
  return (
    <section className="hero min-h-[85vh] bg-base-200 relative overflow-hidden">
      {/* Decoración */}
      <span className="absolute top-8 left-6 text-4xl animate-float" aria-hidden>🎈</span>
      <span className="absolute top-16 right-8 text-4xl animate-float [animation-delay:0.6s]" aria-hidden>🐤</span>
      <span className="absolute bottom-24 left-10 text-3xl animate-float [animation-delay:1.2s]" aria-hidden>🦴</span>
      <span className="absolute bottom-16 right-12 text-3xl animate-float [animation-delay:0.3s]" aria-hidden>🎁</span>

      <div className="hero-content text-center flex-col gap-6 px-4">
        {event.heroImage ? (
          <img
            src={event.heroImage}
            alt=""
            className="w-56 max-w-full rounded-3xl shadow-xl"
          />
        ) : (
          <div className="text-8xl animate-float" aria-hidden>🐶</div>
        )}

        <p className="text-lg md:text-xl text-base-content/70">{event.messages.intro}</p>

        <h1 className="text-5xl md:text-7xl font-bold text-primary-content leading-tight">
          ¡Cumple de <span className="text-secondary-content block">{event.birthdayName}!</span>
        </h1>

        <div className="badge badge-secondary badge-lg text-2xl font-bold p-6 shadow">
          ¡Cumplo {event.age} años! 🎂
        </div>

        <a href="#confirmar" className="btn btn-primary btn-lg rounded-full shadow-lg mt-2">
          Confirmar asistencia
        </a>
      </div>
    </section>
  )
}
