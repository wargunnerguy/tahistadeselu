// ============================================================
// Tähistades Elu — Form Handler
// Paste this entire file into script.google.com → Code.gs
// ============================================================

// ── CONFIG ── replace before deploying ──────────────────────
var NOTIFICATION_EMAIL = 'tahistadeselu@gmail.com';
var SHEET_NAME         = 'Päringud';               // ← sheet tab name
var ID_SEED            = 1263;                     // ← first ID will be TE-1264
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

    var requestId = nextRequestId();

    appendToSheet(data, requestId);
    sendEmailNotification(data, requestId);

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


// ── Request ID ───────────────────────────────────────────────

/**
 * Sequential enquiry number (TE-1264, TE-1265, ...), persisted in
 * Script Properties. Lock prevents duplicates on simultaneous posts.
 */
function nextRequestId() {
  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var props = PropertiesService.getScriptProperties();
    var next  = parseInt(props.getProperty('REQUEST_COUNTER') || String(ID_SEED), 10) + 1;
    props.setProperty('REQUEST_COUNTER', String(next));
    return 'TE-' + next;
  } finally {
    lock.releaseLock();
  }
}


// ── Sheet ────────────────────────────────────────────────────

/**
 * Values starting with + = or @ are parsed by Sheets as formulas
 * (e.g. phone numbers like +372...). A leading apostrophe forces
 * plain text and stays invisible in the cell.
 */
function asText(value) {
  var s = String(value || '');
  return /^[+=@]/.test(s) ? "'" + s : s;
}

function appendToSheet(data, requestId) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  // Create the sheet tab if it doesn't exist yet
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Päringu nr', 'Aeg', 'Vormi tüüp', 'Soov', 'Nimi', 'E-post',
      'Telefon', 'Tseremoonia ajavahemik', 'Sõnum / Lisainfo'
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
    requestId,
    timestamp,
    typeLabel(data.type),
    asText(data.tseremoonia),
    asText(data.nimi),
    asText(data.epost),
    asText(data.telefon),
    asText(data.kuupaev),
    asText(data.sonum || data.lisainfo || (data.kogus ? 'Kogus: ' + data.kogus : ''))
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

function sendEmailNotification(data, requestId) {
  var label   = typeLabel(data.type);
  var name    = data.nimi || 'Nimetu';
  var subject = (TYPE_SUBJECTS[data.type] || 'Uus päring') + ' — ' + name + ' [' + requestId + ']';

  var timestamp = Utilities.formatDate(new Date(), 'Europe/Tallinn', 'dd.MM.yyyy HH:mm');

  // Only fields that have a value
  var fields = [
    ['Päringu nr',          requestId],
    ['Soov',                data.tseremoonia],
    ['Nimi',                data.nimi],
    ['E-post',              data.epost],
    ['Telefon',             data.telefon],
    ['Tseremoonia ajavahemik', data.kuupaev],
    ['Kogus',               data.kogus],
    ['Sõnum / lisainfo',    data.sonum || data.lisainfo]
  ].filter(function (pair) { return pair[1]; });

  // Plain-text fallback for clients that don't render HTML
  var plain = [label + ' veebilehelt tahistadeselu.ee', ''].concat(
    fields.map(function (pair) { return pair[0] + ': ' + pair[1]; })
  ).join('\n');

  // Pre-filled reply: subject with the enquiry number, greeting on top,
  // and the customer's original enquiry quoted below the reply.
  var replySubject = 'Tähistades Elu — vastus Teie päringule (' + requestId + ')';
  var replyBody =
    'Tere, ' + name + '!\n\n' +
    'Täname, et võtsite meiega ühendust.\n\n\n\n' +
    '------------------------------------------\n' +
    'Teie päring ' + requestId + ' (' + timestamp + '):\n\n' +
    fields
      .filter(function (pair) { return pair[0] !== 'Päringu nr'; })
      .map(function (pair) { return pair[0] + ': ' + pair[1]; })
      .join('\n') +
    '\n';

  var rowsHtml = fields.map(function (pair) {
    return '<tr>' +
      '<td style="padding:12px 24px 12px 0;border-bottom:1px solid #e7e5e4;color:#a8a29e;' +
        'font-size:11px;letter-spacing:1.5px;text-transform:uppercase;vertical-align:top;white-space:nowrap;">' +
        escapeHtml(pair[0]) + '</td>' +
      '<td style="padding:12px 0;border-bottom:1px solid #e7e5e4;color:#292524;font-size:14px;line-height:1.6;">' +
        escapeHtml(pair[1]) + '</td>' +
    '</tr>';
  }).join('');

  // The address part of a mailto: link must keep @ literal — only strip
  // characters that could break out of the URL or the href attribute.
  var replyAddress = String(data.epost || '').trim().replace(/[\s<>"',;?&#]/g, '');

  var replyButton = replyAddress
    ? '<a href="mailto:' + replyAddress +
      '?subject=' + encodeURIComponent(replySubject) +
      '&body=' + encodeURIComponent(replyBody) + '" ' +
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
