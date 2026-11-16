# ENSTP 360 — static site for GitHub Pages

Everything in `` is the finished site. `index.html` is the whole app
(guide, school presentation, timetables, campus map, assistant) — no build step, no Node.

## Publish

The site files are at the root of the repository `zwfh6trskt-bot/ENST-360`.
On GitHub: **Settings → Pages → Source: "Deploy from a branch"**, Branch `main`, folder **`/ (root)`** → Save.
To update the site, change the files and push (GitHub Desktop or `git push`).

The site appears at https://zwfh6trskt-bot.github.io/ENST-360/ after a minute or two.

The "Node.js 20 is deprecated … actions/upload-artifact@v4" line is only a warning printed by
GitHub's own Pages workflow; it does not stop a deployment and can be ignored.

## Identity (ENSTP 360)

- Logo: official ENSTP 360 logo. `images/enstp-360-mark.png` (header, without the tagline),
  `images/enstp-360-logo.png` (footer, with the tagline), original file kept as `images/enstp-360-logo-original.png`.
  Paths are set by `var LOGO` / `var LOGO_FULL` near the top of the script in `index.html`.
- Favicons: `favicon.png`, `favicon.ico`, `images/apple-touch-icon.png`, `images/icon-512.png`.
- Home image: `images/alger-hero.jpg`; social sharing image: `images/og-enstp-360.jpg` (1200×630).
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
- Forms: `formulaires/` (Word + PDF), listed in the procedures page (`var FORMS`).
- Timetable: live "right now / next class" indicator, refreshed every 30 s, based on the device clock.

## Design & sections (v5)

- Navy & gold art direction (Fraunces + Inter), hero image `images/hero-enstp360.jpg`.
- Main sections are built from sub-sections that open and close like a curtain (`var RUB` in `index.html`).
- New texts (Discover ENSTP, FAQ, quick help) live in `DEC`, `FAQD`, `AIDQ`, `R5` — French, English and Arabic.

## News (Actualités)

Automatic import from Facebook is not possible for a static site without a Meta app approved for the ENSTP page.
News are managed by hand: in `index.html`, search `var NEWS = [` and add a line at the top:
`['AAAA-MM-JJ', 'titre fr|title en|عنوان', 'résumé fr|summary en|ملخص', 'image URL or images/news/file.jpg', 'link to the original post', 'source']`.
The home page shows the 3 most recent; the News page shows all of them. Initial items come from enstp.edu.dz.

## Settings

Open `index.html`, search for `var CFG` — four values:

| key | what it does |
| --- | --- |
| `video` / `poster` | presentation video on the home page (`''` hides it) |
| `community` | link to the online community app (needs the Lovable server). `''` hides the card |
| `ai` | optional URL of your own AI proxy. Empty = built-in assistant, which needs no credits |

## Updating content

- Timetables: replace `edt/edt-*.jpg` / `.pdf` (official documents). The per-day lists come from
  `var EDT = {...}` inside `index.html`.
- Assistant pictures: `images/assistant/` (`hai`, `bye`, `think`, `loading`).
- Texts, places, teachers: the data arrays inside `index.html` — the assistant and the search read
  the same data, so they update automatically.
