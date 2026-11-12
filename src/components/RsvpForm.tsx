import { useState, type FormEvent } from 'react'
import { event } from '../config/event'
import { sendRsvp } from '../services/rsvp'

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
    <section id="confirmar" className="py-16 px-4 bg-base-100 scroll-mt-4">
      <div className="max-w-md mx-auto flex flex-col gap-6">
        <h2 className="text-4xl font-bold text-center">Confirmá tu asistencia 🐾</h2>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            {status === 'success' ? (
              <div className="flex flex-col items-center text-center gap-4 py-4">
                <span className="text-6xl" aria-hidden>🎉</span>
                <p className="text-2xl font-bold">¡Gracias, {confirmedName}!</p>
                <p className="text-base-content/70">
                  Tu asistencia quedó confirmada. ¡Nos vemos en el cumple!
                </p>
                <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>
                  Confirmar a otro niño
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-base">Nombre del niño/a</legend>
                  <input
                    type="text"
                    className="input input-lg w-full"
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
                    <output className="join-item flex-1 flex items-center justify-center bg-base-100 text-2xl font-bold border border-base-300">
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
                  className="btn btn-primary btn-lg rounded-full mt-2"
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
    </section>
  )
}
