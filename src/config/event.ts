/**
 * Datos del cumpleaños.
 * Para un cumple nuevo, solo hay que editar este archivo (y el <title> de index.html).
 */
export const event = {
  /**
   * Identificador del evento. Las confirmaciones se guardan en una pestaña
   * de Google Sheets con este nombre, así cada año queda separado.
   */
  id: 'martina-7-2026',

  birthdayName: 'Martina',
  age: 7,
  theme: 'Snoopy',

  /** Fecha y hora con zona horaria de Argentina (-03:00). */
  dateTime: '2026-11-28T15:00:00-03:00',

  location: {
    venue: 'El Alemán Salón de Eventos',
    address: 'Pascual Chuchuy 710, esquina Brasil',
    neighborhood: 'Barrio Villa Esperanza',
    city: 'Cerrillos, Salta',
    /** Texto que se usa para buscar el lugar en Google Maps (con el nombre del salón queda más preciso). */
    mapsQuery: 'El Alemán Salón de Eventos, Pascual Chuchuy 710, A4403 Cerrillos, Salta',
  },

  /** Imágenes (archivos dentro de /public). */
  images: {
    wallpaper: '/snoopyWallpaper.jpg',
    hero: '/snoopyCumpleGlobos.jpg',
    date: '/snoopyCumple.jpg',
    location: '/snoopy.jpg',
    rsvp: '/snoopyAsomandose.jpg',
    thanks: '/snoopyAbrazo.jpg',
  },

  messages: {
    intro: '¡Te invito a festejar mi cumple!',
    closing: '¡Te espero para jugar y divertirnos un montón!',
    /** Recordatorios que se muestran al final de la invitación. */
    reminders: [
      { icon: '🩱', who: 'Chicos', text: '¡No se olviden el traje de baño!' },
      { icon: '🧉', who: 'Papis', text: '¡Traigan el mate!' },
    ],
  },
} as const

export type EventConfig = typeof event
