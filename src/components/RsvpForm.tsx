import { useState, type FormEvent } from 'react'
import { event } from '../config/event'
import { burst, celebrate } from '../services/confetti'
import { sendRsvp } from '../services/rsvp'
import { Reveal } from './Reveal'

type Status = 'idle' | 'sending' | 'success' | 'error'

const MAX_ADULTS = 6

export function RsvpForm() {
  const [childName, setChildName] = useState('')
  const [adults, setAdults] = useState(1)
  const [status, setStatus] = useState<Status>('idle')
  const [confirmedName, setConfirmedName] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const name = childName.trim()
    if (!name) return

    setStatus('sending')
    try {
      await sendRsvp({ eventId: event.id, childName: name, adults })
      setConfirmedName(name)
      setStatus('success')
      burst()
      celebrate(2000)
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  function reset() {
    setChildName('')
    setAdults(1)
    setStatus('idle')
  }

  return (
    <section id="confirmar" className="paws-bg py-20 px-4 scroll-mt-4 overflow-hidden">
      <div className="max-w-md mx-auto flex flex-col gap-4">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center">Confirmá tu asistencia 🐾</h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative pt-24">
            {/* Snoopy asomándose por encima de la tarjeta */}
            {status !== 'success' && (
              <div className="absolute top-0 z-10 left-1/2 -translate-x-1/2 w-56 h-28 overflow-hidden pointer-events-none" aria-hidden>
                <div className="animate-[peek_0.9s_cubic-bezier(0.34,1.56,0.64,1)_0.6s_both]">
                  {/* Se recorta la imagen para mostrar solo a Snoopy y sus patitas */}
                  <img
                    src={event.images.rsvp}
                    alt=""
                    className="drawing w-full -translate-y-[33%]"
                  />
                </div>
              </div>
            )}

            <div className="card bg-base-100 shadow-2xl border-4 border-white ring-2 ring-primary/40 relative">
              <div className="card-body">
                {status === 'success' ? (
                  <div className="flex flex-col items-center text-center gap-3 py-2">
                    <img
                      src={event.images.thanks}
                      alt="Snoopy feliz con gorro de cumpleaños"
                      className="drawing w-44 animate-pop-in"
                    />
                    <p className="text-2xl font-bold animate-pop-in [animation-delay:0.2s]">
                      ¡Gracias, {confirmedName}!
                    </p>
                    <p className="text-base-content/70 animate-pop-in [animation-delay:0.35s]">
                      Tu asistencia quedó confirmada. ¡Nos vemos en el cumple! 🎈
                    </p>
                    <button type="button" className="btn btn-ghost btn-sm mt-2" onClick={reset}>
                      Confirmar a otro niño
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend text-base">Nombre del niño/a</legend>
                      <input
                        type="text"
                        className="input input-lg w-full focus:scale-[1.02] transition-transform"
                        placeholder="Ej: Sofía Pérez"
                        value={childName}
                        onChange={(e) => setChildName(e.target.value)}
                        maxLength={80}
                        required
                        disabled={status === 'sending'}
                      />
                    </fieldset>

                    <fieldset className="fieldset">
                      <legend className="fieldset-legend text-base">¿Cuántos adultos lo acompañan?</legend>
                      <div className="join w-full">
                        <button
                          type="button"
                          className="btn btn-lg join-item"
                          onClick={() => setAdults((a) => Math.max(0, a - 1))}
                          disabled={adults === 0 || status === 'sending'}
                          aria-label="Restar un adulto"
                        >
                          −
                        </button>
                        <output
                          key={adults}
                          className="join-item flex-1 flex items-center justify-center bg-base-100 text-2xl font-bold border border-base-300 animate-pop-in"
                        >
                          {adults}
                        </output>
                        <button
                          type="button"
                          className="btn btn-lg join-item"
                          onClick={() => setAdults((a) => Math.min(MAX_ADULTS, a + 1))}
                          disabled={adults === MAX_ADULTS || status === 'sending'}
                          aria-label="Sumar un adulto"
                        >
                          +
                        </button>
                      </div>
                    </fieldset>

                    {status === 'error' && (
                      <div role="alert" className="alert alert-error alert-soft">
                        <span>Ups, no pudimos guardar tu confirmación. Probá de nuevo en un ratito.</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg rounded-full mt-2 shadow-lg hover:scale-105 transition-transform"
                      disabled={status === 'sending' || !childName.trim()}
                    >
                      {status === 'sending' ? (
                        <span className="loading loading-dots" />
                      ) : (
                        '¡Confirmo! 🎈'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
