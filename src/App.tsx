import { useEffect } from 'react'
import { EventDetails } from './components/EventDetails'
import { Hero } from './components/Hero'
import { Location } from './components/Location'
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
      <footer className="flex flex-col items-center gap-2 text-center p-10 bg-base-200 text-base-content">
        <p className="text-xl">{event.messages.closing}</p>
        <p className="text-3xl animate-bounce-soft" aria-hidden>🐶 🐤 🎈</p>
      </footer>
    </main>
  )
}

export default App
