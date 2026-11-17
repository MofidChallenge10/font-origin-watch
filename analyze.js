export function summarizeFonts(records, pageUrl) {
  const pageOrigin = new URL(pageUrl).origin;
  const unique = new Map();
  for (const record of records) {
    let url;
    try { url = new URL(record.url); } catch { continue; }
    const origin = url.origin;
    const key = record.url;
    unique.set(key, { url: record.url, origin, thirdParty: origin !== pageOrigin, statusCode: record.statusCode ?? null });
  }
  return [...unique.values()].sort((a, b) => a.origin.localeCompare(b.origin) || a.url.localeCompare(b.url));
}
