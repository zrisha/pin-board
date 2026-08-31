// Registers @pinyin-pro/data's `complete` dict, which makes pinyin-pro's
// segment() produce real word boundaries and pinyin() correct on polyphonic
// words — its built-in dict only covers pinyin-irregular phrases. (`complete`
// over `modern`: modern lacks most proper nouns — 中国, 北京 — so common
// phrases like 中国人 mis-segment.)
import { addDict } from 'pinyin-pro';
import { useEffect, useState } from 'react';
import charDict from '../resources/charDict.json';

let completeDictPromise: Promise<void> | undefined;

export function useCompleteDict(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    completeDictPromise ??= import('@pinyin-pro/data/complete').then(
      (complete) =>
        new Promise<void>((resolve) => {
          const register = () => {
            addDict(complete.default, { name: 'complete' });
            resolve();
          };
          // addDict blocks the main thread ~300ms building its trie — run it
          // in an idle gap rather than whenever the download happens to land.
          if ('requestIdleCallback' in window) requestIdleCallback(register, { timeout: 5000 });
          else setTimeout(register, 0);
        }),
    );
    completeDictPromise.then(() => setReady(true));
  }, []);
  return ready;
}

let wordDictPromise: Promise<Record<string, string[]>> | undefined;

/** The word-definition map, once loaded; undefined until then. */
export function useWordDict(): Record<string, string[]> | undefined {
  const [dict, setDict] = useState<Record<string, string[]> | undefined>(undefined);
  useEffect(() => {
    wordDictPromise ??= import('../resources/wordDict.json').then((words) => words.default);
    wordDictPromise.then(setDict);
  }, []);
  return dict;
}

/** Definitions for a single hanzi. Sync — charDict ships in the main bundle. */
export function lookupChar(char: string): string[] | undefined {
  return charDict[char];
}

/**
 * Definitions for a word (e.g. a pinyin-pro segment). Single-character
 * segments resolve from charDict; longer ones from wordDict, which the
 * caller loads via useWordDict().
 */
export function lookupWord(
  word: string,
  wordDict: Record<string, string[]> | undefined,
): string[] | undefined {
  if ([...word].length === 1) return lookupChar(word);
  return wordDict?.[word];
}
