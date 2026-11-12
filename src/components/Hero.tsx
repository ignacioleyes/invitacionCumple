import { event } from '../config/event'
import { Balloons } from './Balloons'

export function Hero() {
  const letters = Array.from(event.birthdayName)

  return (
    <section className="relative min-h-svh overflow-hidden bg-sky flex items-center justify-center">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-[position:82%_bottom] animate-slow-zoom origin-bottom-right"
        style={{ backgroundImage: `url(${event.images.wallpaper})` }}
        aria-hidden
      />
      <Balloons />

      <div className="relative z-10 flex flex-col items-center text-center gap-3 px-4 pt-8 pb-16 max-w-xl">
        <p className="text-xl md:text-2xl font-semibold text-base-content text-outline animate-pop-in">
          {event.messages.intro}
        </p>

        <h1 className="font-bold leading-none text-outline">
          <span className="block text-3xl md:text-4xl text-violet-600 animate-pop-in [animation-delay:0.2s]">
            ¡Cumple de
          </span>
          <span className="block text-7xl md:text-8xl text-pink-500 mt-1" aria-label={event.birthdayName}>
            {letters.map((ch, i) => (
              <span
                key={i}
                className="wave-letter"
                style={{ animationDelay: `${0.5 + i * 0.12}s` }}
                aria-hidden
              >
                {ch}
              </span>
            ))}
            <span className="wave-letter" style={{ animationDelay: `${0.5 + letters.length * 0.12}s` }}>!</span>
          </span>
        </h1>

        <div className="relative animate-pop-in [animation-delay:0.5s]">
          <div className="bg-white rounded-[2rem] p-3 shadow-2xl rotate-2 animate-float">
            <img
              src={event.images.hero}
              alt="Snoopy con globos y torta de cumpleaños"
              className="h-[32svh] min-h-44 max-h-80 w-auto rounded-3xl"
            />
          </div>
          <div className="absolute -top-4 -right-6 badge badge-secondary badge-lg text-2xl font-bold px-4 py-6 shadow-lg -rotate-12 animate-wiggle">
            ¡{event.age} años! 🎂
          </div>
        </div>

        <a
          href="#confirmar"
          className="btn btn-primary btn-lg rounded-full shadow-xl mt-3 animate-pop-in [animation-delay:0.8s] hover:scale-110 transition-transform"
        >
          Confirmar asistencia 🐾
        </a>
      </div>

      <a
        href="#cuando"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-3xl animate-bounce-soft"
        aria-label="Ver más"
      >
        👇
      </a>
    </section>
  )
}
