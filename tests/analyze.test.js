import test from 'node:test';
import assert from 'node:assert/strict';
import { summarizeFonts } from '../analyze.js';
test('deduplicates URLs and classifies third-party origins', () => {
 const rows=summarizeFonts([{url:'https://site.test/a.woff2'},{url:'https://cdn.test/b.woff2'},{url:'https://cdn.test/b.woff2'}],'https://site.test/page');
 assert.equal(rows.length,2); assert.equal(rows.find(x=>x.origin==='https://cdn.test').thirdParty,true);
});
test('ignores malformed URLs', () => assert.equal(summarizeFonts([{url:'not a URL'}],'https://site.test').length,0));
