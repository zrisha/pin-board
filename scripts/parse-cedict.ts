// One-time build script: parses the raw CC-CEDICT file into lookup maps.
// Run with `npm run parse:cedict` (Node 22.6+ strips types natively).
//
// Emits:
//   src/resources/charDict.json — { [simplified char]: string[] }  (single-character entries)
//   src/resources/wordDict.json — { [simplified word]: string[] }  (multi-character entries)
//
// wordDict is pruned to the vocabulary of @pinyin-pro/data's `complete` dict:
// word lookups happen on pinyin-pro segments, and (with the complete dict
// registered via addDict — see src/hooks/pinyin.ts) the segmenter can only
// emit words from that vocabulary, so anything outside it is unreachable.
import { readFileSync, writeFileSync, statSync } from 'node:fs';

const SOURCE = 'src/resources/cedict_1_0_ts_utf-8_mdbg.txt';
const entryRegex = /^(\S+) (\S+) \[([^\]]+)\] \/(.+)\/$/;

const completeVocab = new Set(
  Object.keys(JSON.parse(readFileSync('node_modules/@pinyin-pro/data/json/complete.json', 'utf-8'))),
);

const charDict: Record<string, string[]> = {};
const wordDict: Record<string, string[]> = {};

let entries = 0;
let skipped = 0;

for (const line of readFileSync(SOURCE, 'utf-8').split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;

  const match = trimmed.match(entryRegex);
  if (!match) {
    skipped++;
    console.warn(`unparsed line: ${trimmed}`);
    continue;
  }

  const [, , simplified, , defsBlock] = match;
  const defs = defsBlock.split('/');
  entries++;

  // A character/word can span multiple CEDICT lines (e.g. surname vs. common
  // usage) — merge and dedupe definitions.
  if ([...simplified].length === 1) {
    charDict[simplified] = [...new Set([...(charDict[simplified] ?? []), ...defs])];
  } else if (completeVocab.has(simplified)) {
    wordDict[simplified] = [...new Set([...(wordDict[simplified] ?? []), ...defs])];
  }
}

const write = (path: string, data: Record<string, string[]>) => {
  writeFileSync(path, JSON.stringify(data));
  const kb = (statSync(path).size / 1024).toFixed(0);
  console.log(`${path}: ${Object.keys(data).length} keys, ${kb} KB`);
};

console.log(`parsed ${entries} entries (${skipped} unparsed non-comment lines)`);
write('src/resources/charDict.json', charDict);
write('src/resources/wordDict.json', wordDict);
