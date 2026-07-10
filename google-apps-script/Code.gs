// ============================================================
// Tähistades Elu — Form Handler
// Paste this entire file into script.google.com → Code.gs
// ============================================================

// ── CONFIG ── replace before deploying ──────────────────────
var NOTIFICATION_EMAIL = 'tahistadeselu@gmail.com';
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

    // Honeypot: real visitors never fill the hidden "website" field.
    // Pretend success so bots don't retry, but save nothing.
    if (data.website) {
      return respond({ success: true });
    }

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
      'Aeg', 'Vormi tüüp', 'Soov', 'Nimi', 'E-post',
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
    typeLabel(data.type),
    data.tseremoonia || '',
    data.nimi        || '',
    data.epost     || '',
    data.telefon   || '',
    data.kuupaev   || '',
    data.sonum     || data.lisainfo || (data.kogus ? 'Kogus: ' + data.kogus : '')
  ]);
}


// ── Email ────────────────────────────────────────────────────

var TYPE_LABELS = {
  'broneering':       'Broneering',
  'kontakt':          'Kontaktvorm',
  'paeviku-tellimus': 'Päeviku tellimus'
};

var TYPE_SUBJECTS = {
  'broneering':       'Uus broneering',
  'kontakt':          'Uus sõnum',
  'paeviku-tellimus': 'Uus päeviku tellimus'
};

function typeLabel(type) {
  return TYPE_LABELS[type] || 'Päring';
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sendEmailNotification(data) {
  var label   = typeLabel(data.type);
  var name    = data.nimi || 'Nimetu';
  var subject = (TYPE_SUBJECTS[data.type] || 'Uus päring') + ' — ' + name;

  var timestamp = Utilities.formatDate(new Date(), 'Europe/Tallinn', 'dd.MM.yyyy HH:mm');

  // Only fields that have a value
  var fields = [
    ['Soov',                data.tseremoonia],
    ['Nimi',                data.nimi],
    ['E-post',              data.epost],
    ['Telefon',             data.telefon],
    ['Tseremoonia kuupäev', data.kuupaev],
    ['Kogus',               data.kogus],
    ['Sõnum / lisainfo',    data.sonum || data.lisainfo]
  ].filter(function (pair) { return pair[1]; });

  // Plain-text fallback for clients that don't render HTML
  var plain = [label + ' veebilehelt tahistadeselu.ee', ''].concat(
    fields.map(function (pair) { return pair[0] + ': ' + pair[1]; })
  ).join('\n');

  var rowsHtml = fields.map(function (pair) {
    return '<tr>' +
      '<td style="padding:12px 24px 12px 0;border-bottom:1px solid #e7e5e4;color:#a8a29e;' +
        'font-size:11px;letter-spacing:1.5px;text-transform:uppercase;vertical-align:top;white-space:nowrap;">' +
        escapeHtml(pair[0]) + '</td>' +
      '<td style="padding:12px 0;border-bottom:1px solid #e7e5e4;color:#292524;font-size:14px;line-height:1.6;">' +
        escapeHtml(pair[1]) + '</td>' +
    '</tr>';
  }).join('');

  var replyButton = data.epost
    ? '<a href="mailto:' + escapeHtml(data.epost) + '" ' +
      'style="display:inline-block;margin-top:28px;background:#1c1917;color:#ffffff;text-decoration:none;' +
      'font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:13px 28px;">Vasta kliendile</a>'
    : '';

  var sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();

  var html =
    '<div style="background:#f5f5f4;padding:32px 12px;font-family:Helvetica,Arial,sans-serif;">' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">' +
        '<tr><td style="background:#1c1917;padding:28px 32px;">' +
          '<p style="margin:0;color:#ffffff;font-size:15px;letter-spacing:4px;text-transform:uppercase;">Tähistades Elu</p>' +
          '<p style="margin:10px 0 0;color:#a8a29e;font-size:11px;letter-spacing:2px;text-transform:uppercase;">' +
            escapeHtml(label) + '</p>' +
        '</td></tr>' +
        '<tr><td style="background:#ffffff;padding:28px 32px 32px;">' +
          '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' + rowsHtml + '</table>' +
          replyButton +
        '</td></tr>' +
        '<tr><td style="padding:18px 32px;color:#a8a29e;font-size:12px;">' +
          escapeHtml(timestamp) +
          ' &nbsp;·&nbsp; <a href="' + sheetUrl + '" style="color:#78716c;">Ava päringute tabel</a>' +
        '</td></tr>' +
      '</table>' +
    '</div>';

  var options = {
    htmlBody: html,
    name: 'Tähistades Elu veebileht'
  };
  // Reply in Gmail goes straight to the customer
  if (data.epost) options.replyTo = data.epost;

  GmailApp.sendEmail(NOTIFICATION_EMAIL, subject, plain, options);
}


// ── Helper ───────────────────────────────────────────────────

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
