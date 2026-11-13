# 🎂 Cómo preparar la invitación para un nuevo cumple

Guía paso a paso para reutilizar este sitio el año que viene (o para otro cumple).
No hace falta tocar Google Sheets ni Render: solo editar algunos archivos y subir los cambios.

---

## 1. Datos del cumple → `src/config/event.ts`

Es el archivo principal. Cambiá lo que corresponda:

```ts
export const event = {
  id: 'martina-8-2027',          // ⚠️ SIEMPRE cambiarlo (ver abajo)
  birthdayName: 'Martina',
  age: 8,
  theme: 'Snoopy',

  dateTime: '2027-11-27T15:00:00-03:00',   // año-mes-díaThora:min:seg-03:00

  location: {
    venue: 'Nombre del salón',
    address: 'Calle 123, esquina Otra',
    neighborhood: 'Barrio ...',
    city: 'Cerrillos, Salta',
    mapsQuery: 'Nombre del salón, Calle 123, A4403 Cerrillos, Salta',
  },
  ...
}
```

### Detalles importantes

- **`id`**: cada cumple tiene que tener un `id` distinto (por ejemplo `martina-8-2027`).
  Las confirmaciones se guardan en una **pestaña nueva** de la planilla con ese nombre, así no se mezclan con las del año anterior.
  Usá solo letras minúsculas, números y guiones.
- **`dateTime`**: dejá siempre el `-03:00` al final (hora de Argentina). La fecha en palabras ("Sábado, 27 de noviembre") y la cuenta regresiva se calculan solas.
- **`mapsQuery`**: es lo que se busca en Google Maps para el mapa y el botón "Cómo llegar".
  Lo más preciso es poner **el nombre del lugar tal como aparece en Google Maps + la dirección**.
  Truco: buscá el lugar en Google Maps y copiá el nombre y la dirección que muestra la ficha.

### Mensajes y recordatorios (mismo archivo)

```ts
messages: {
  intro: '¡Te invito a festejar mi cumple!',
  closing: '¡Te espero para jugar y divertirnos un montón!',
  reminders: [
    { icon: '🩱', who: 'Chicos', text: '¡No se olviden el traje de baño!' },
    { icon: '🧉', who: 'Papis', text: '¡Traigan el mate!' },
  ],
},
```

Podés cambiar, agregar o quitar recordatorios (cada uno es una línea `{ icon, who, text }`).
Si no querés ninguno, dejá la lista vacía: `reminders: [],`.

---

## 2. Vista previa de WhatsApp → `index.html`

Es lo que se ve al compartir el link. Actualizá estas líneas:

```html
<title>¡Cumple de Martina! 🎉</title>
<meta name="description" content="..." />
<meta property="og:title" content="¡Cumple de Martina! 🎉" />
<meta property="og:description" content="Sábado 27 de noviembre, 15 hs. ¡Confirmá tu asistencia acá! 🎈" />
<meta property="og:image" content="https://invitacioncumple-j0f3.onrender.com/snoopyAbrazo.jpg" />
```

- **`og:description`**: acordate de poner la **fecha y hora nuevas** (esta no se actualiza sola).
- **`og:image`**: si cambiás la imagen, tiene que ser la **dirección completa** (con `https://...`).
  Si cambiás de imagen, actualizá también `og:image:width` y `og:image:height` con su tamaño en píxeles.
- Si el dominio de Render cambia algún día, actualizá también `og:url` y `og:image`.

---

## 3. (Opcional) Cambiar las imágenes

1. Copiá las imágenes nuevas a la carpeta `public/` (mejor en `.jpg` o `.png`, y que no pesen más de ~300 KB).
2. En `src/config/event.ts`, actualizá los nombres en `images`:

```ts
images: {
  wallpaper: '/snoopyWallpaper.jpg',      // fondo de la portada (horizontal)
  hero: '/snoopyCumpleGlobos.jpg',        // imagen principal de la portada
  date: '/snoopyCumple.jpg',              // al lado de la fecha
  location: '/snoopy.jpg',                // al lado de la dirección
  rsvp: '/snoopyAsomandose.jpg',          // asomándose sobre el formulario
  thanks: '/snoopyAbrazo.jpg',            // al confirmar asistencia
},
```

> ⚠️ Respetá mayúsculas y minúsculas en los nombres de archivo: en Render `Foto.jpg` y `foto.jpg` son archivos distintos.

Los dibujos con **fondo blanco** quedan mejor, porque el sitio hace "desaparecer" ese blanco sobre los fondos de colores.

**Ojo con la imagen `rsvp` (Snoopy asomándose):** está recortada a mano para que solo se vea la cabeza y las patitas.
Si la cambiás por otra, probablemente haya que ajustar el recorte en `src/components/RsvpForm.tsx`
(el valor `-translate-y-[33%]`). Lo más fácil: pedírselo a Claude. 😉

---

## 4. (Opcional) Cambiar los colores

El sitio usa el tema **`pastel`** de daisyUI. Para usar otro (por ejemplo `cupcake`, `valentine`, `garden`, `lemonade`):

1. En `src/index.css` cambiá `themes: pastel --default;` por el tema nuevo.
2. En `index.html` cambiá `data-theme="pastel"` por el mismo nombre.

Podés ver todos los temas en https://daisyui.com/docs/themes/

---

## 5. Probar en la compu

```bash
npm install      # solo la primera vez o si hubo cambios de librerías
npm run dev
```

Abrí http://localhost:5173 y revisá:

- [ ] Nombre, edad, fecha y hora correctos
- [ ] La cuenta regresiva funciona
- [ ] El mapa marca el lugar correcto
- [ ] El botón "Cómo llegar" abre la ubicación correcta
- [ ] Se ven todas las imágenes
- [ ] Los recordatorios del final están bien

> Si existe el archivo `.env.local`, el formulario guarda **de verdad** en la planilla.
> Si hacés una prueba, después borrá esa fila (ver punto 7).

---

## 6. Publicar

```bash
git add -A
git commit -m "Cumple 2027"
git push
```

Render detecta el cambio y publica la nueva versión sola en 1–2 minutos.
Después abrí https://invitacioncumple-j0f3.onrender.com y revisá que se vea todo bien.

### Si WhatsApp sigue mostrando la vista previa del año anterior

WhatsApp guarda la vista previa de cada link por un tiempo. Compartí el link con algo agregado al final, por ejemplo:

```
https://invitacioncumple-j0f3.onrender.com/?2027
```

---

## 7. La planilla de Google Sheets

**No hay que hacer nada.** La primera vez que alguien confirme, se crea sola una pestaña nueva con el `id` del evento,
con los totales de niños y adultos en las columnas E y F.

### Borrar una confirmación (por ejemplo, una prueba)

Seleccioná **solo las celdas de las columnas A a C** de esa fila y apretá **Supr**.

> ⚠️ **No elimines la fila 2 entera** (clic derecho → Eliminar fila): ahí están las celdas de "Total adultos" y se perderían.
> Las demás filas sí se pueden eliminar enteras sin problema.

### Si alguna vez modificás `apps-script/Code.gs`

En Apps Script: **Implementar → Administrar implementaciones → ✏️ Editar → Versión: Nueva versión → Implementar**.
Así la URL no cambia. Si creás una implementación *nueva*, la URL cambia y hay que actualizarla en `.env.local` y en Render (*Environment → `VITE_SHEETS_URL`*), y volver a publicar.

---

## ✅ Resumen rápido

1. `src/config/event.ts` → **cambiar `id`**, nombre, edad, fecha, lugar y recordatorios
2. `index.html` → título y descripción con la fecha nueva
3. (Opcional) imágenes en `public/` y colores
4. `npm run dev` → revisar
5. `git add -A && git commit -m "Cumple 2027" && git push`
6. Revisar el sitio publicado y compartir el link 🎉
