import { useEffect } from 'react'
import { EventDetails } from './components/EventDetails'
import { Hero } from './components/Hero'
import { Location } from './components/Location'
import { Reveal } from './components/Reveal'
import { RsvpForm } from './components/RsvpForm'
import { event } from './config/event'
import { celebrate } from './services/confetti'

function App() {
  useEffect(() => {
    document.title = `¡Cumple de ${event.birthdayName}! 🎉`
    const id = setTimeout(() => celebrate(1200), 900)
    return () => clearTimeout(id)
  }, [])

  return (
    <main>
      <Hero />
      <EventDetails />
      <Location />
      <RsvpForm />
      <footer className="flex flex-col items-center gap-6 text-center px-4 py-14 bg-base-200 text-base-content">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold">Recordá 📝</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4 w-full max-w-2xl">
          {event.messages.reminders.map((r, i) => (
            <Reveal key={r.who} delay={100 + i * 150}>
              <div
                className={`card bg-base-100 shadow-lg h-full hover:rotate-0 hover:scale-105 transition-transform ${
                  i % 2 === 0 ? '-rotate-2' : 'rotate-2'
                }`}
              >
                <div className="card-body items-center gap-1 py-6">
                  <span className="text-6xl animate-wiggle" aria-hidden>{r.icon}</span>
                  <p className="text-sm uppercase tracking-wider font-semibold text-base-content/60 mt-2">{r.who}</p>
                  <p className="text-xl font-bold">{r.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300}>
          <p className="text-2xl font-semibold mt-4">{event.messages.closing}</p>
        </Reveal>
        <p className="text-3xl animate-bounce-soft" aria-hidden>🐶 🐤 🎈</p>
      </footer>
    </main>
  )
}

export default App
