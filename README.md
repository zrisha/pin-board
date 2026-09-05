# Pin-Board

A learning tool and typing aid for non-native Mandarin speakers who already read the Latin alphabet. It leans on that existing literacy, using pinyin to compose text so learners aren't blocked by not yet knowing characters. Pinyin isn't Chinese — but it lowers the barrier to entry and hopefully keeps pulling learners toward the characters underneath it.

## Features

- **Pinyin input** — type pinyin (e.g. `nihao`) into the editor and pick characters from the candidate grid, powered by [RIME](https://github.com/rime/home)'s `luna_pinyin` schema via [react-rime](https://github.com/zrisha/react-rime).
- **Output tabs** — the composed text is shown three ways:
  - **Pinyin** — per-character reading, tap/hover a character for the underlying hanzi.
  - **Word** — text segmented into words, with a gloss per word.
  - **Char** — per-character definitions.
- **Settings** — toggle English punctuation and emoji suggestions.

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/)
- [antd](https://ant.design/) for UI components
- [react-rime](https://github.com/zrisha/react-rime) for pinyin input method composition
- [pinyin-pro](https://github.com/zh-lx/pinyin-pro) for pinyin conversion and word segmentation

## Installation

```bash
npm install
npm run dev
```

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting with Prettier |
| `npm run parse:cedict` | Regenerate `src/resources/charDict.json` and `src/resources/wordDict.json` from a local CC-CEDICT source file |

## Credits

- Pinyin input schema data from [my_rime](https://github.com/LibreService/my_rime).
- Character and word definitions derived from [CC-CEDICT](https://cc-cedict.org/), licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## License

[AGPL-3.0](LICENSE)
