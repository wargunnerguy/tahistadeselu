// ============================================================
// Tähistades Elu — Form Handler
// Paste this entire file into script.google.com → Code.gs
// ============================================================

// ── CONFIG ── replace before deploying ──────────────────────
var NOTIFICATION_EMAIL = 'your-email@example.com'; // ← your email
var SHEET_NAME         = 'Päringud';               // ← sheet tab name
// ────────────────────────────────────────────────────────────


/**
 * Handles POST requests from the Nuxt frontend.
 * Body: JSON string with form fields + a "type" field
 * ("broneering" | "kontakt").
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return respond({ success: false, error: 'Empty request body' });
    }

    var data = JSON.parse(e.postData.contents);

    appendToSheet(data);
    sendEmailNotification(data);

    return respond({ success: true });

  } catch (err) {
    Logger.log('doPost error: ' + err.message);
    return respond({ success: false, error: err.message });
  }
}


/**
 * Health-check — also satisfies CORS OPTIONS preflight via redirect.
 */
function doGet(e) {
  return respond({ success: true, message: 'Tähistades Elu API is running' });
}


// ── Sheet ────────────────────────────────────────────────────

function appendToSheet(data) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  // Create the sheet tab if it doesn't exist yet
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Aeg', 'Vormi tüüp', 'Nimi', 'E-post',
      'Telefon', 'Tseremoonia kuupäev', 'Sõnum / Lisainfo'
    ]);
    // Freeze header row
    sheet.setFrozenRows(1);
  }

  var timestamp = Utilities.formatDate(
    new Date(),
    'Europe/Tallinn',
    'dd.MM.yyyy HH:mm:ss'
  );

  sheet.appendRow([
    timestamp,
    data.type      || '',
    data.nimi      || '',
    data.epost     || '',
    data.telefon   || '',
    data.kuupaev   || '',
    data.sonum     || data.lisainfo || ''
  ]);
}


// ── Email ────────────────────────────────────────────────────

function sendEmailNotification(data) {
  var typeLabel = data.type === 'broneering' ? 'Broneering' : 'Kontaktvorm';
  var name      = data.nimi || 'Tundmatu';

  var subject = '[Tähistades Elu] Uus ' + typeLabel + ' — ' + name;

  var body = [
    'Uus päring saabunud veebilehelt tahistadeselu.ee',
    '',
    'Kuupäev:  ' + Utilities.formatDate(new Date(), 'Europe/Tallinn', 'dd.MM.yyyy HH:mm'),
    'Vormi tüüp:  ' + typeLabel,
    '',
    '─────────────────────────────',
  ];

  var fields = [
    ['Nimi',                   data.nimi],
    ['E-post',                 data.epost],
    ['Telefon',                data.telefon],
    ['Tseremoonia kuupäev',    data.kuupaev],
    ['Sõnum / Lisainfo',       data.sonum || data.lisainfo],
  ];

  fields.forEach(function(pair) {
    if (pair[1]) body.push(pair[0] + ':  ' + pair[1]);
  });

  body.push('─────────────────────────────');
  body.push('');
  body.push('— Tähistades Elu veebileht');

  GmailApp.sendEmail(NOTIFICATION_EMAIL, subject, body.join('\n'));
}


// ── Helper ───────────────────────────────────────────────────

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
