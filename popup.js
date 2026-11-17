import { summarizeFonts } from './analyze.js';
const summary = document.querySelector('#summary');
const list = document.querySelector('#fonts');
const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
if (!tab?.url || !/^https?:/.test(tab.url)) {
  summary.textContent = 'Open a regular HTTP(S) page to inspect its font requests.';
} else {
  const key = `tab:${tab.id}`;
  const stored = await chrome.storage.session.get(key);
  const fonts = summarizeFonts(stored[key] || [], tab.url);
  const thirdParty = fonts.filter(x => x.thirdParty).length;
  summary.textContent = `${fonts.length} unique font URLs · ${thirdParty} third-party origins`;
  for (const font of fonts) {
    const item = document.createElement('li');
    const origin = document.createElement('span');
    origin.className = font.thirdParty ? 'origin third' : 'origin';
    origin.textContent = `${font.thirdParty ? 'Third-party' : 'Same-origin'} · ${font.origin}`;
    const url = document.createElement('span'); url.className = 'url'; url.textContent = font.url;
    item.append(origin, url); list.append(item);
  }
  if (!fonts.length) summary.textContent = 'No font requests recorded for this tab yet. Reload the page and open this popup again.';
}
