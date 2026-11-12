# Configurar Google Sheets para las confirmaciones

1. Creá una planilla nueva en [Google Sheets](https://sheets.new) (por ejemplo "Confirmaciones cumples").
2. En el menú, abrí **Extensiones → Apps Script**.
3. Borrá el código de ejemplo y pegá el contenido de [`Code.gs`](./Code.gs). Guardá (💾).
4. Hacé clic en **Implementar → Nueva implementación**:
   - Tipo: **Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
5. Autorizá los permisos (Google va a mostrar un aviso de "app no verificada": entrá en *Configuración avanzada → Ir a … (no seguro)*; es tu propio script).
6. Copiá la **URL de la aplicación web** (termina en `/exec`). Si la abrís en el navegador debería decir que la API está funcionando.
7. Usá esa URL como variable `VITE_SHEETS_URL`:
   - Local: creá un archivo `.env.local` en la raíz con `VITE_SHEETS_URL=<url>`.
   - Render: en *Environment* del servicio.

Cada confirmación aparece en una pestaña con el nombre del `id` del evento (ej. `martina-7-2026`), con los totales de niños y adultos en las columnas E–F.

> Si modificás `Code.gs` más adelante, tenés que ir a **Implementar → Administrar implementaciones → Editar → Versión: Nueva versión** para que los cambios se apliquen a la misma URL.
