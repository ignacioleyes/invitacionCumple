export interface RsvpData {
  eventId: string
  childName: string
  adults: number
}

const SHEETS_URL = import.meta.env.VITE_SHEETS_URL as string | undefined

/**
 * Envía la confirmación a la Web App de Google Apps Script.
 * Se usa Content-Type text/plain para evitar el "preflight" de CORS,
 * que Apps Script no soporta.
 */
export async function sendRsvp(data: RsvpData): Promise<void> {
  if (!SHEETS_URL) {
    if (import.meta.env.DEV) {
      console.warn('VITE_SHEETS_URL no está configurada: se simula el envío.', data)
      await new Promise((r) => setTimeout(r, 800))
      return
    }
    throw new Error('Falta configurar VITE_SHEETS_URL')
  }

  const res = await fetch(SHEETS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

  const json = (await res.json()) as { ok: boolean; error?: string }
  if (!json.ok) throw new Error(json.error ?? 'Error desconocido')
}
