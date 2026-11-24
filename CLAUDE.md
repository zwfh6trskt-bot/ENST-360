# ENSTP 360 — repères pour Claude

- **Site en ligne** : https://zwfh6trskt-bot.github.io/ENST-360/ — GitHub Pages, branche `main`, dossier racine. Le dépôt est `zwfh6trskt-bot/ENST-360`.
  Les dépôts `ENSTP` (zip) et `ENSTP-360` (`indexx.html`) sont d'anciennes versions : ne pas les modifier.
- **Code en couches, sans build** : `index.html` (base) → `app6.js` → `app7-data.js` → `app7.js` → `app8-data.js` → `app8.js`.
  Une fonction déclarée dans une couche plus récente remplace celle du même nom. Pour garder l'ancienne version, la référencer
  dans le fichier `-data.js` de la couche (ex. `var RBS7 = rbSubs;`) : dans le même fichier, le hoisting donnerait la nouvelle → récursion.
  Pour une nouvelle série de modifications, créer `app9-data.js` / `app9.js` / `app9.css` sur le même modèle et les ajouter dans `index.html`.
- **Base Supabase du site** : projet « enstp360 » `adzeobrukvnvhgwnupqe` (`SB7` dans `app7.js`, clé publishable). Schéma : `supabase/enstp360-v7.sql`.
  Comptes @enstp.edu.dz, profils, admins, objets trouvés (stockage `lost-found`), likes (`rpc/svc_counts`, `rpc/svc_vote`), livres, rapports,
  emplois du temps modifiés, annonces. Le projet SSC (`SB6` dans `app6.js`, `qsgnglbxgcxrhicdysxy`) ne sert qu'aux réservations SSC.
  `khkkzzqknsefykidwzsz` est l'ancienne base : ne plus l'utiliser.
- **Consignes de l'utilisateur** : modifier le site existant, ne jamais le reconstruire ; ne rien inventer (coordonnées, liens, photos) ;
  réponses en français, courtes ; signaler seulement ce qui bloque.
- **Données encore attendues** (round 8) : capture de la section 4.1 des démarches (contenu à supprimer), liens de Soumam, Chouway, Kahwa
  et du restaurant du foyer des garçons (`NR` dans `app8-data.js`), photo de la résidence de Sidi Abdellah (`WRES6`), plan du campus
  plus grand / emplacements et photos des lieux (`CM`, `CMN` dans `index.html`, photos `campus/<n>.webp`).
- **Tester** : `python3 -m http.server` puis Playwright (Chrome : `/usr/bin/google-chrome`) ; Supabase n'est pas joignable depuis la session.
