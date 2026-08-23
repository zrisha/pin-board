// Registers @pinyin-pro/data's `modern` dict, which makes pinyin-pro's
// segment() produce real word boundaries and pinyin() correct on polyphonic
// words — its built-in dict only covers pinyin-irregular phrases.
import { addDict } from 'pinyin-pro';
import { useEffect, useState } from 'react';
import charDict from '../resources/charDict.json';

let modernDictPromise: Promise<void> | undefined;

export function useModernDict(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    modernDictPromise ??= import('@pinyin-pro/data/modern').then((modern) => {
      addDict(modern.default, { name: 'modern' });
    });
    modernDictPromise.then(() => setReady(true));
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
