/**
 * Backend de confirmaciones para la invitación.
 * Se pega en Extensiones > Apps Script de una planilla de Google Sheets
 * y se publica como "Aplicación web" (ver apps-script/README.md).
 *
 * Cada evento (event.id en src/config/event.ts) se guarda en su propia pestaña.
 */

var HEADERS = ['Fecha de confirmación', 'Nombre del niño/a', 'Adultos'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    var data = JSON.parse(e.postData.contents);

    var eventId = clean_(data.eventId, 50);
    var childName = clean_(data.childName, 80);
    var adults = Number(data.adults);

    if (!eventId || !childName) return json_({ ok: false, error: 'Datos incompletos' });
    if (!isFinite(adults) || adults < 0 || adults > 20) adults = 0;

    var sheet = getSheet_(eventId);
    sheet.appendRow([new Date(), childName, Math.floor(adults)]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Permite comprobar en el navegador que la URL funciona. */
function doGet() {
  return json_({ ok: true, message: 'La API de confirmaciones está funcionando 🎉' });
}

function getSheet_(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    // Totales a la derecha
    sheet.getRange('E1').setValue('Total niños').setFontWeight('bold');
    sheet.getRange('F1').setFormula('=COUNTA(B2:B)');
    sheet.getRange('E2').setValue('Total adultos').setFontWeight('bold');
    sheet.getRange('F2').setFormula('=SUM(C2:C)');
  }
  return sheet;
}

/** Recorta y evita que el texto se interprete como fórmula en Sheets. */
function clean_(value, maxLength) {
  var text = String(value == null ? '' : value).trim().slice(0, maxLength);
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
