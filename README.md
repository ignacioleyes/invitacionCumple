# 🎉 Invitación de cumpleaños

Landing page de invitación con confirmación de asistencia. Hecha con React + TypeScript + Vite + Tailwind + daisyUI (tema `pastel`).
Las confirmaciones se guardan en Google Sheets mediante un Apps Script.

## Desarrollo local

```bash
npm install
npm run dev
```

Sin `VITE_SHEETS_URL` configurada, el formulario **simula** el envío (solo en modo desarrollo).
Para probar contra la planilla real, creá `.env.local` (ver `.env.example`).

## Nuevo cumple / nuevo año

1. Editá `src/config/event.ts`: nombre, edad, fecha, dirección y **cambiá el `id`** (ej. `martina-8-2027`).
   Así las confirmaciones van a una pestaña nueva de la planilla.
2. Actualizá el `<title>` y las etiquetas `og:` de `index.html` (título, descripción con fecha e imagen: es lo que se ve al compartir el link por WhatsApp).
3. (Opcional) Cambiá las imágenes: poné los archivos en `public/` y actualizá `images` en el mismo archivo.
4. Hacé commit y push: Render vuelve a desplegar solo.

## Google Sheets

Ver [`apps-script/README.md`](./apps-script/README.md).

## Despliegue en Render

1. En Render: **New → Static Site** y conectá este repo
   (o **New → Blueprint**, que usa `render.yaml`).
2. Build command: `npm ci && npm run build` · Publish directory: `dist`
3. En *Environment*, agregá `VITE_SHEETS_URL` con la URL de la Web App de Apps Script.
4. Si cambiás esa variable más tarde, hacé un nuevo deploy: Vite la incluye en el momento del build.
