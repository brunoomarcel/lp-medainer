const SHEET_NAME = 'Leads';

const HEADERS = [
  'submittedAt',
  'name',
  'phone',
  'email',
  'clinicType',
  'professionalCount',
  'role',
  'source',
  'ctaLabel',
  'targetHref',
  'experience',
  'pagePath',
  'pageUrl',
  'pageTitle',
  'referrer',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid',
  'gad_source',
  'gbraid',
  'msclkid',
  'wbraid',
  'userAgent',
];

function doGet() {
  return jsonResponse_({
    ok: true,
    message: 'Medainer lead webhook online.',
  });
}

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    const sheet = getOrCreateSheet_();

    ensureHeaders_(sheet);

    sheet.appendRow(
      HEADERS.map((header) => {
        if (header === 'submittedAt') {
          return payload.submittedAt || new Date().toISOString();
        }

        return sanitizeCell_(payload[header]);
      }),
    );

    return jsonResponse_({
      ok: true,
      savedAt: new Date().toISOString(),
    });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      error: error && error.message ? error.message : String(error),
    });
  }
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }

  const raw = String(e.postData.contents || '').trim();
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch (_error) {
    const params = {};

    raw.split('&').forEach((entry) => {
      const parts = entry.split('=');
      const key = decodeURIComponent(parts[0] || '');
      const value = decodeURIComponent((parts[1] || '').replace(/\+/g, ' '));
      if (key) {
        params[key] = value;
      }
    });

    return params;
  }
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error('Abra este script a partir da planilha que vai receber os leads.');
  }

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeaders_(sheet) {
  const hasHeaders = sheet.getLastRow() > 0;
  if (hasHeaders) {
    return;
  }

  sheet.appendRow(HEADERS);
  sheet.setFrozenRows(1);
}

function sanitizeCell_(value) {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
