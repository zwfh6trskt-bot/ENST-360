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

## Round 6 (navigation, emploi du temps, objets trouvés)

- New code lives in `app6.js` / `app6.css` (loaded after the main script; same-named functions replace the old ones).
- Home: the 8 sections open like a curtain (`var RB6` in `app6.js`); each sub-section has its own page `#/r/<section>/<sub>`.
  A back arrow (bottom right) returns to the exact previous position.
- Timetables: `edt6-data.js` (`var EDT6`), copied as-is from the supplied document. To fill a missing time,
  edit the matching entry (`a`/`b` = start/end, `t` = time as written).
- Shared data (lost & found, likes/dislikes) uses the SSC Supabase project. **Run `supabase/enstp360.sql` once**
  in Supabase → SQL Editor. Until then those features work but stay on each device. SSC bookings already work.
- Women's residences: add photos as `images/residences/*.jpg` and set `photo` / `url` in `var WRES6` (`app6.js`).

## Round 7 (rubriques, accueil, comptes, objets trouvés partagés, BookSTP)

Nouveaux fichiers : `app7.js`, `app7-data.js`, `app7.css` (chargés après `app6.js`), `images/v7/`, `supabase/enstp360-v7.sql`.

- **Rubriques** : une seule version de chaque rubrique, celle de l'accueil (`RB7`, `rbSubs` dans `app7.js`). Plus de
  « Continuer l'exploration » ; toute ancienne adresse `#/guide/...` mène à la sous-rubrique correspondante ;
  la barre et le pied de page ouvrent la rubrique sur l'accueil (`#/rub/<rubrique>`).
- **Accueil** minimaliste : photo, slogan, citation du Dr. Mobarki Ahmed, recherche, 10 rubriques.
- **Barre** : Accueil en premier, globe des langues (rideau), Entrepreneuriat (menu au survol), menu mobile à droite.
- **Contenus** : stages par domaine, Incubateur & CDE, BookSTP (drives, mémoires et PFE relevés en ligne, guides) — dans `app7-data.js`.
- **Base partagée** (projet Supabase « enstp360 » (`adzeobrukvnvhgwnupqe`)) : comptes étudiants @enstp.edu.dz, profils (niveau, département, groupe),
  administrateurs, objets trouvés (photos dans le stockage `lost-found`, temps réel), likes / dislikes par service,
  annonces de livres, rapports de stage, emplois du temps et annonces modifiables par l'administration (`#/admin`).

### À faire une seule fois dans Supabase

1. **SQL Editor** → coller `supabase/enstp360-v7.sql` → Run (le script peut être relancé sans risque).
2. **Authentication → Sign In / Providers → Email** : activé, avec **« Confirm email » activé** (indispensable : un compte
   administrateur ne devient administrateur qu'après confirmation de son adresse).
3. **Authentication → URL Configuration** : *Site URL* = `https://zwfh6trskt-bot.github.io/ENST-360/`
   et ajouter la même adresse dans *Redirect URLs* (liens de confirmation et de mot de passe oublié).
4. **Authentication → SMTP Settings** : le service d'e-mails intégré de Supabase n'envoie que quelques e-mails par heure ;
   pour une vraie rentrée, branchez un SMTP (Gmail Workspace de l'école, Brevo, Resend…).
5. Les administrateurs créent leur compte sur le site (bouton profil → Créer un compte) avec
   `nazim-abdelmalek.daoudi@enstp.edu.dz` ou `ailamlinamalak@gmail.com`. Ajouter un administrateur :
   `insert into public.admins (email) values ('prenom.nom@enstp.edu.dz');`

Tant que le script n'est pas exécuté, les pages concernées l'indiquent clairement (aucune donnée n'est simulée ni gardée
seulement sur l'appareil).

## Round 8 (accueil en verre, carte du campus, emplois du temps, démarches, résidences)

Nouveaux fichiers : `app8-data.js`, `app8.js`, `app8.css` (chargés après `app7.js`), `images/residences/`.

- **Accueil** : citation « Vous avez l’avantage d’être étudiant », « Que recherchez-vous ? », slogan « Une vision, sans angles morts ».
  Rubriques en verre translucide ; ouvrir une rubrique referme les autres.
- **Plan du campus** : carte interactive (`campus7Html`, `CM8` dans `app8.js`) — zoom progressif (pincement, + / −, Ctrl + molette,
  double-clic), détails qui apparaissent avec le zoom (noms, puis étages et salles), recherche de bâtiments et de salles,
  photo du lieu en haut à droite, itinéraire, plein écran. Positions : tableau `CM` de `index.html` (pixels de `campus/plan.webp`),
  photos : `campus/<numéro>.webp`. Pour ajouter un lieu ou corriger un emplacement, modifiez `CM` / `CMN`.
- **Emplois du temps** : cycle → spécialité → année → groupe (`e6Inner` dans `app8.js`).
- **Démarches** : nouvelle liste (`svc6Html`, textes dans `SVC8` et `PAY8` de `app8-data.js`) ; sous-rubriques : Démarches administratives et Bourse universitaire.
- **Manger** : Soumam, Chouway, Kahwa et le restaurant du foyer des garçons en tête (`NR.unshift` dans `app8-data.js`, détails à compléter).
- **Résidences des filles** : photos, avis, heure de fermeture (`WRES6` dans `app8-data.js`). Photo de Sidi Abdellah à ajouter (`photo:`).
