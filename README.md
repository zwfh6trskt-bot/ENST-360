# ENSTP 360 — static site for GitHub Pages

Everything in `docs/` is the finished site. `docs/index.html` is the whole app
(guide, school presentation, timetables, campus map, assistant) — no build step, no Node.

## Publish (2 steps)

1. Put the `docs/` folder at the root of the repository `zwfh6trskt-bot/ENST-360` and push
   (GitHub Desktop, or `git add docs && git commit -m "Static site" && git push`).
   The web uploader only accepts 100 files at a time and this folder has about 260, so use Git / GitHub Desktop.
2. On GitHub: **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**,
   Branch `main`, folder **`/docs`** → Save.

The site appears at https://zwfh6trskt-bot.github.io/ENST-360/ after a minute or two.

The "Node.js 20 is deprecated … actions/upload-artifact@v4" line is only a warning printed by
GitHub's own Pages workflow; it does not stop a deployment and can be ignored.

## Identity (ENSTP 360)

- Logo: official ENSTP 360 logo. `docs/images/enstp-360-mark.png` (header, without the tagline),
  `docs/images/enstp-360-logo.png` (footer, with the tagline), original file kept as `docs/images/enstp-360-logo-original.png`.
  Paths are set by `var LOGO` / `var LOGO_FULL` near the top of the script in `index.html`.
- Favicons: `docs/favicon.png`, `docs/favicon.ico`, `docs/images/apple-touch-icon.png`, `docs/images/icon-512.png`.
- Home image: `docs/images/alger-hero.jpg`; social sharing image: `docs/images/og-enstp-360.jpg` (1200×630).
- Colours and fonts: the `ENSTP 360 · identité visuelle` block at the end of the `<style>` in `index.html`.
- Home texts in FR / EN / AR: `var X = {...}` in `index.html`.
- Saved preferences keep their old storage keys (`enstp-go-*`) so visitors keep their profile, language and timetable.

## Assistant Saturne

- Saturne (animated, draggable) answers from the whole site: guides, timetables, map, procedures, internships, forms, places.
  It works without any server or key. Its answers are built from the most relevant sentences of the site's data.
- Optional, to also answer general questions with a real AI: deploy `ai-proxy/worker.js` on Cloudflare Workers (free plan),
  add a secret `GEMINI_API_KEY` (free key from Google AI Studio), then put the worker URL in `var CFG = { ai: '…' }` in `index.html`.
  The key never appears in the site. If the AI is unreachable, Saturne falls back to its local answer.

## Content added

- Internships: pro tips + recommendations table (`var STG` in `index.html`, sorted by wilaya code).
- Forms: `docs/formulaires/` (Word + PDF), listed in the procedures page (`var FORMS`).
- Timetable: live "right now / next class" indicator, refreshed every 30 s, based on the device clock.

## Settings

Open `docs/index.html`, search for `var CFG` — four values:

| key | what it does |
| --- | --- |
| `video` / `poster` | presentation video on the home page (`''` hides it) |
| `community` | link to the online community app (needs the Lovable server). `''` hides the card |
| `ai` | optional URL of your own AI proxy. Empty = built-in assistant, which needs no credits |

## Updating content

- Timetables: replace `docs/edt/edt-*.jpg` / `.pdf` (official documents). The per-day lists come from
  `var EDT = {...}` inside `index.html`.
- Assistant pictures: `docs/images/assistant/` (`hai`, `bye`, `think`, `loading`).
- Texts, places, teachers: the data arrays inside `index.html` — the assistant and the search read
  the same data, so they update automatically.
