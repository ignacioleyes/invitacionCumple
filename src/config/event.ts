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
    placeName: 'Barrio Villa Esperanza',
    address: 'Calle Pascual Chuchuy al 700, esquina Brasil',
    city: 'Cerrillos, Salta',
    /** Texto que se usa para buscar el lugar en Google Maps. */
    mapsQuery: 'Pascual Chuchuy 700, Villa Esperanza, Cerrillos, Salta, Argentina',
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
  },
} as const

export type EventConfig = typeof event
