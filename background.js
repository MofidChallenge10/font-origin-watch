const MAX_RECORDS = 200;
chrome.webRequest.onCompleted.addListener(async details => {
  if (details.tabId < 0) return;
  const key = `tab:${details.tabId}`;
  const stored = await chrome.storage.session.get(key);
  const records = Array.isArray(stored[key]) ? stored[key] : [];
  records.push({ url: details.url, statusCode: details.statusCode, timeStamp: details.timeStamp });
  await chrome.storage.session.set({ [key]: records.slice(-MAX_RECORDS) });
}, { urls: ["<all_urls>"], types: ["font"] });
chrome.tabs.onRemoved.addListener(tabId => chrome.storage.session.remove(`tab:${tabId}`));
