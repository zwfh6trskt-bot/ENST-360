/* =====================================================================
   ENSTP 360 · round 7 — contenus
   - Stages : organismes recommandés classés par domaine
   - Entrepreneuriat et Innovation : Incubateur & CDE
   - BookSTP : drives utiles, mémoires & PFE (vérifiés en ligne), guides
   Chaque lien ci-dessous a été relevé sur sa source ; rien n'est inventé.
   ===================================================================== */

/* version des sous-rubriques de app6 (gardée avant que app7.js ne la remplace) */
var RBS6 = rbSubs;

/* ---------- Stages : nos recommandations, par domaine ----------
   Une ligne = « Organisme : Wilaya (code) / Wilaya (code) » ; sans wilaya si la source n'en donne pas. */
var STG7 = [
  ['Géotechnique', [
    'COSIDER Géotechnique : Alger (16)', 'GEO MAG : Alger (16)', 'GESI-TP : Alger (16)',
    'LNHC : Alger (16) / Constantine (25) / Oran (31) / Ouargla (30) / Béchar (08)', 'LCTP : Alger (16)',
    'LTP Est / LTPE : Constantine (25) / Sétif (19) / Annaba (23)',
    'LTP Ouest / LTPO : Oran (31) / Tlemcen (13) / Sidi Bel Abbès (22) / Saïda (20) / Tiaret (14) / Tissemsilt (38) / Naâma (45) / Relizane (48)',
    'LTPS / LTP Sud : Ghardaïa (47) / Ouargla (30) / El Oued (39) / Illizi (33) / Boussaâda (28) / Laghouat (03) / El Bayadh (32) / Tamanrasset (11) / Adrar (01)',
    'LMTPB : Alger (16) / Tizi Ouzou (15)', 'TREVI Algérie : Alger (16)', 'LEGEOTECH : Alger (16)', 'LGCS : Alger (16)']],
  ['Ouvrages d’art', [
    'COSIDER Ouvrages d’Art : Alger (16) / Bouira (10) / Bordj Bou Arréridj (34) / M’Sila (28) / Jijel (18)',
    'ENGOA : Alger (16)', 'SERO-EST', 'SEROR : Oran (31)', 'ENROS', 'SAPTA : Alger (16)', 'SAETI : Alger (16)',
    'SETS : Sétif (19)', 'SET Annaba : Annaba (23)', 'SET Oran : Oran (31)']],
  ['Bâtiment', [
    'COSIDER Construction : Alger (16)', 'GCB : Alger (16) / Ouargla (30)', 'INERGA : Alger (16)',
    'BATIMETAL : Alger (16) / Blida (09) / Oran (31)',
    'CTC : Alger (16) / Oran (31) / Constantine (25) / Annaba (23) / Sétif (19) / Tizi Ouzou (15)',
    'LNHC : Alger (16) / Constantine (25) / Oran (31) / Ouargla (30) / Béchar (08)',
    'LMTPB : Alger (16) / Tizi Ouzou (15)', 'GESI-TP : Alger (16)']],
  ['Routes et autoroutes', [
    'COSIDER Travaux Publics : Alger (16)', 'SNTP : Alger (16)', 'EVSM', 'ETTR Ouargla : Ouargla (30)',
    'EPTP Ghardaïa : Ghardaïa (47)', 'EPTP Boussaâda : Boussaâda (28) / M’Sila (28)', 'EPTP Béchar : Béchar (08)',
    'EPTP Alger : Alger (16)', 'EPTRC', 'EPTR Sud Est', 'ETRS Souk Ahras : Souk Ahras (41)', 'EMIVAR', 'EPTRO',
    'EGTR Mascara : Mascara (29)', 'EGUVA', 'EGTO', 'SOTROWIB', 'ERTP Tébessa : Tébessa (12)',
    'SOTROB OEB : Oum El Bouaghi (04)', 'ALTRO', 'SERA', 'GESI-TP : Alger (16)', 'SONATRO', 'SAETI : Alger (16)',
    'SETS : Sétif (19)', 'SET Annaba : Annaba (23)', 'SET Oran : Oran (31)']],
  ['Travaux maritimes', [
    'MEDITRAM : Alger (16)', 'GETAM : Alger (16)', 'ALDIPH', 'LEM – Laboratoire d’Études Maritimes : Alger (16)',
    'SAPTA : Alger (16)', 'COSIDER Travaux Publics', 'ONSM : Alger (16)']],
  ['Pistes d’aérodrome et bases aériennes', [
    'COSIDER Travaux Publics : Alger (16) / Oran (31) / Constantine (25) / Sétif (19) / Béchar (08) / Tamanrasset (11)',
    'SNTP : Alger (16)', 'SAETI : Alger (16)', 'SETS : Sétif (19)', 'SET Annaba : Annaba (23)', 'SET Oran : Oran (31)',
    'LCTP : Alger (16)', 'LTP Est / LTPE : Constantine (25) / Sétif (19) / Annaba (23)', 'LTP Ouest / LTPO : Oran (31)',
    'LTPS / LTP Sud : Ghardaïa (47) / Ouargla (30) / El Oued (39) / Illizi (33) / Laghouat (03) / Tamanrasset (11) / Adrar (01)']],
  ['Voies ferrées', [
    'INFRARAIL : Alger (16)', 'INFRAFER : Alger (16)', 'SETIRAIL : Alger (16)', 'ANESRIF : Alger (16)',
    'SNTF : Alger (16) / Oran (31) / Constantine (25) / Annaba (23) / Sétif (19) / Tlemcen (13) / Béchar (08)',
    'COSIDER Travaux Publics : Alger (16)']],
  ['Laboratoires et organismes de travaux publics à cibler en priorité', [
    'LNHC – Laboratoire National de l’Habitat et de la Construction : Alger (16) / Constantine (25) / Oran (31) / Ouargla (30) / Béchar (08)',
    'LCTP – Laboratoire Central des Travaux Publics : Alger (16)',
    'LTPE – Laboratoire des Travaux Publics de l’Est : Constantine (25) / Sétif (19) / Annaba (23)',
    'LTPO – Laboratoire des Travaux Publics de l’Ouest : Oran (31) / Tlemcen (13) / Sidi Bel Abbès (22) / Saïda (20) / Tiaret (14) / Tissemsilt (38) / Naâma (45) / Relizane (48)',
    'LTPS – Laboratoire des Travaux Publics du Sud : Ghardaïa (47) / Ouargla (30) / El Oued (39) / Illizi (33) / Boussaâda (28) / Laghouat (03) / El Bayadh (32) / Tamanrasset (11) / Adrar (01)',
    'LMTPB – Laboratoire de la Mitidja des Travaux Publics et Bâtiments : Alger (16) / Tizi Ouzou (15)',
    'CTTP – Organisme National de Contrôle Technique des Travaux Publics : Alger (16)',
    'LCM – Laboratoire Central des Matériaux, COSIDER Engineering : Alger (16)',
    'CETIM – Centre d’Études et de Services Technologiques de l’Industrie des Matériaux de Construction : Boumerdès (35)',
    'CCTE – Centre de Contrôle Technique et d’Expertise : Ouargla (30)']]
].map(function (d) {
  return { h: d[0], o: d[1].map(function (s) {
    var i = s.indexOf(' : ');
    return { n: i < 0 ? s : s.slice(0, i), w: i < 0 ? [] : s.slice(i + 3).split(' / ').map(function (x) { var m = x.match(/^(.*?)\s*\((\d+)\)$/); return m ? [m[1], m[2]] : [x, '']; }) };
  }) };
});

/* ---------- Entrepreneuriat et Innovation ---------- */
var ENT7 = {
  incubateur: {
    logo: 'images/v7/incubateur-enstp-logo.png', logoBg: '#000',
    title: 'L’Incubateur de l’ENSTP', tag: 'Innovation, Prototypage & Startups — Arrêté 1275',
    intro: [
      'Créé dans le cadre de la stratégie nationale de valorisation de la recherche et de l’arrêté ministériel n° 1275 (« Un diplôme – Une startup / Un diplôme – Un brevet »), l’Incubateur de l’ENSTP est la structure dédiée à la transformation des idées innovantes des étudiants-ingénieurs en startups technologiques et en brevets d’invention.',
      'Il accompagne les porteurs de projets à fort potentiel dans les domaines du génie civil, des travaux publics, des matériaux innovants, de la modélisation numérique, de l’intelligence artificielle et des infrastructures durables.'],
    missionsH: 'Missions et services de l’Incubateur',
    missions: [
      ['compass', 'Accompagnement technique et scientifique', 'Suivi personnalisé des étudiants depuis l’idée initiale jusqu’au prototypage et à la soutenance du mémoire de fin d’études sous le statut Projet Innovant / Startup.'],
      ['building', 'Mise à disposition d’espaces de travail', 'Accès à des espaces de coworking équipés et à des laboratoires technologiques au sein de l’école pour concevoir et tester les prototypes.'],
      ['users', 'Mentorat et expertise sectorielle', 'Mise en relation avec des enseignants-chercheurs de l’ENSTP, des experts du secteur du BTP et des spécialistes de la propriété intellectuelle.'],
      ['check', 'Appui à la labellisation nationale', 'Accompagnement dans la constitution et la défense des dossiers de candidature auprès du Comité National pour l’obtention du « Label Projet Innovant » et du « Label Startup ».'],
      ['sparkles', 'Valorisation et transfert technologique', 'Soutien au dépôt de brevets d’invention et mise en réseau avec les partenaires socio-économiques et investisseurs.']],
    teamH: 'L’équipe de l’Incubateur',
    team: [
      ['M. TAFRAOUT Salim', 'Directeur / Responsable de l’Incubateur de l’ENSTP', 'Enseignant-chercheur à l’ENSTP', 'images/v7/equipe-tafraout-salim.jpg'],
      ['Mme LARBI Selma', 'Membre permanente de l’Incubateur', 'Enseignante-chercheuse à l’ENSTP', 'images/v7/equipe-larbi-selma.jpg'],
      ['Mme SAADI Samira', 'Membre de l’Incubateur (et liaison CDE)', 'Enseignante-chercheuse à l’ENSTP (Spécialité Géosciences / Génie Civil)', '']],
    doneH: 'Réalisations et faits marquants',
    done: [
      ['Depuis mai 2023', 'Premières soutenances de Projets Startups', 'Organisation et validation des premières soutenances de mémoires de fin d’études sous le régime de l’arrêté 1275, donnant naissance aux premières startups issues de l’école.'],
      ['', 'Obtention de Labels « Projet Innovant »', 'Plusieurs projets incubés à l’ENSTP (notamment dans les technologies éducatives, la simulation numérique en génie civil et les matériaux) ont décroché le Label Projet Innovant délivré par le ministère.'],
      ['Janvier 2025', 'Convention stratégique ENSTP – ANVREDET', 'Signature d’un partenariat officiel avec l’Agence Nationale de Valorisation des Résultats de la Recherche et du Développement Technologique pour accélérer le transfert de technologie et le dépôt de brevets.'],
      ['', 'Espaces dédiés à l’Intelligence Artificielle', 'Mise en place d’espaces technologiques dédiés aux applications de l’IA dans les infrastructures et travaux publics, soutenus par des coopérations académiques internationales.'],
      ['', 'Rayonnement institutionnel et médiatique', 'Présentation officielle des startups incubées lors des visites ministérielles à l’ENSTP, remises de prix nationales et couverture télévisée valorisant la double compétence ingénieur-entrepreneur.']],
    contactH: 'Contact dédié — Incubateur',
    contact: [
      ['map-pin', 'Adresse', 'École Nationale Supérieure des Travaux Publics (ENSTP), BP 32, Rue Sidi Garidi, Kouba 16006, Alger.', ''],
      ['mail', 'E-mail officiel', 'incubateur@enstp.edu.dz', 'mailto:incubateur@enstp.edu.dz'],
      ['phone', 'Téléphone Direction Incubateur', '0560 50 51 41', 'tel:+213560505141'],
      ['phone', 'Standard École', '028 25 65 32', 'tel:028256532']]
  },
  cde: {
    logo: 'images/v7/cde-enstp-logo.png', logoBg: '#000',
    title: 'Le Centre de Développement de l’Entrepreneuriat (CDE)', tag: 'Formation, Gestion & Micro-entreprises — Partenariat NESDA',
    intro: [
      'Fruit d’un partenariat institutionnel entre le Ministère de l’Enseignement Supérieur et de la Recherche Scientifique (MESRS) et le Ministère de l’Économie de la Connaissance, des Start-up et des Micro-entreprises, le Centre de Développement de l’Entrepreneuriat (CDE) de l’ENSTP opère en étroite collaboration avec l’agence publique NESDA (ex-ANADE).',
      'Sa vocation est de diffuser la culture entrepreneuriale auprès de tous les étudiants et de les former aux outils de gestion afin de faciliter la création de micro-entreprises classiques (bureaux d’études techniques, entreprises de réalisation, contrôle qualité, services spécialisés dans le BTP).'],
    missionsH: 'Missions et services du CDE',
    missions: [
      ['sparkles', 'Sensibilisation et culture entrepreneuriale', 'Organisation de journées d’information, conférences et rencontres avec des chefs d’entreprise pour initier les étudiants à l’entrepreneuriat dès le début de leur cursus.'],
      ['book', 'Formations intensives certifiantes', 'Animation de sessions de formation pratiques sur le Business Model Canvas (BMC), l’étude de marché, la gestion financière, le marketing et la fiscalité.'],
      ['file', 'Montage de Business Plans', 'Accompagnement méthodologique des porteurs de projets pour structurer leur plan d’affaires et évaluer la viabilité économique de leur future entreprise.'],
      ['compass', 'Orientation vers les dispositifs de financement (NESDA)', 'Préparation et orientation des étudiants diplômés vers les mécanismes publics d’appui, de financement et d’accompagnement post-création.']],
    teamH: 'L’équipe du CDE',
    team: [
      ['M. GASSIS Sofiane', 'Dirige le Centre de Développement de l’Entrepreneuriat de l’ENSTP', 'Enseignant-chercheur à l’ENSTP', 'images/v7/equipe-gassis-sofiane.jpg'],
      ['M. BOUZID Amine', 'Représentant et formateur référent NESDA auprès du CDE', 'Conseiller / Formateur certifié NESDA (ex-ANADE)', 'images/v7/equipe-bouzid-amine.jpg'],
      ['Mme SAADI Samira', 'Membre du CDE de l’ENSTP', 'Enseignante-chercheuse à l’ENSTP (Spécialité Géosciences / Génie Civil)', ''],
      ['Équipe Pédagogique ENSTP', 'Encadrement académique et coordination des sessions', 'Enseignants-chercheurs et formateurs certifiés en entrepreneuriat', '']],
    doneH: 'Réalisations et faits marquants',
    done: [
      ['', 'Installation officielle du CDE via la convention ENSTP – NESDA', 'Mise en place opérationnelle d’un guichet d’accompagnement et de formation directement au sein de l’école pour rapprocher les dispositifs de financement des futurs diplômés.'],
      ['Janvier 2025', 'Cérémonies de remise des certificats du CDE', 'Formation et graduation de plusieurs cohortes d’étudiants ayant validé avec succès le cycle de formation entrepreneuriale certifié par le CDE et NESDA.'],
      ['2025 – 2026', 'Bootcamps Entrepreneuriaux de l’ENSTP', 'Organisation de plusieurs camps intensifs de formation à l’entrepreneuriat à Alger (notamment la 2ᵉ édition au printemps 2026), permettant aux étudiants de développer leurs modèles d’affaires en immersion.'],
      ['', 'Ateliers conjoints inter-écoles (ENSTP – ESC Koléa)', 'Animation régulière d’ateliers collaboratifs d’idéation et de gestion réunissant les élèves-ingénieurs de l’ENSTP et les étudiants de l’École Supérieure de Commerce (ESC) pour combiner expertise technique et vision managériale.']],
    contactH: 'Contact et accès — CDE',
    contact: [
      ['map-pin', 'Localisation', 'Centre de Développement de l’Entrepreneuriat (CDE), Campus de l’ENSTP, Kouba, Alger.', ''],
      ['users', 'Public concerné', 'Tous les étudiants et jeunes diplômés de l’ENSTP souhaitant créer une micro-entreprise ou un bureau d’études.', ''],
      ['mail', 'Contact École / Coordination', 'enstp@enstp.edu.dz', 'mailto:enstp@enstp.edu.dz'],
      ['mail', 'Contact École / Coordination', 'incubateur@enstp.edu.dz', 'mailto:incubateur@enstp.edu.dz'],
      ['phone', 'Téléphone', '028 25 65 32', 'tel:028256532']]
  }
};

/* ---------- BookSTP · Drives utiles (liens fournis par l'école / les étudiants) ---------- */
var DRV7 = [
  ['CP1', '1re année préparatoire', [
    'https://drive.google.com/drive/folders/1Qaw3rshXzuKX6iGH_qw28nYAvyvSXBRU',
    'https://drive.google.com/drive/folders/1rXMDy66yMQSmtHZwhjiLi-nYD-uzle1R',
    'https://drive.google.com/drive/folders/1jT6Re3Ux8LIrGRSI0Hvxp5GdBCUMO83N']],
  ['CP2', '2e année préparatoire', ['https://drive.google.com/drive/folders/165DgDNVgI6RumOdbsgKJMmAAvImVRP28']],
  ['CI1', '1re année du cycle ingénieur', ['https://drive.google.com/drive/folders/1J4ktCVGGVSgblVlpgsQwt5XlfGKBdFCo']],
  ['CI2 · DIB', '2e année du cycle ingénieur — Infrastructures de Base', ['https://drive.google.com/drive/folders/1aI8s5PnYZmdB7rWmBcnBhbOHfmn79tZN']],
  ['CI2 · DMS', '2e année du cycle ingénieur — Matériaux et Structures', ['https://drive.google.com/drive/folders/1nHJlkjWtaAhQNbXHQ8JQA4jdB6KKm-qh']],
  ['CI3', '3e année du cycle ingénieur', ['https://drive.google.com/drive/folders/1jm4CgGlhZ6YIPacEnsHXtZJSKClFJfu_']]
];

/* ---------- BookSTP · Mémoires et PFE de l'ENSTP (2021 – 2026) ----------
   Relevés le 18 novembre 2026 sur le dépôt institutionnel DSpace de l'ENSTP
   (dspace.enstp.edu.dz) et sur le compte Calaméo du Centre de calcul de l'ENSTP.
   Champs : promotion, département, spécialité (telle qu'écrite sur le mémoire), titre,
   auteurs, encadrement, lien, type de lien (pdf = PDF direct, item = notice DSpace avec PDF, read = lecture en ligne), source.
   Pour 2026, la notice DSpace liste ensemble auteurs et encadrants (champ « auteurs » du dépôt). */
var PFE7 = [
  // ---- Promotion 2026 (notices DSpace, Mémoires d'Ingénieur — système LMD) ----
  [2026, 'DIB', 'Infrastructures de Base', 'Étude en APD du dédoublement de la RN08 du PK18+723 au PK30+175 avec une étude de deux giratoires', 'Guettaf, Akram · Mokrani, Walid · Benbouzid, Mohamed Lakhdar · Faci, Ali', '', 'https://dspace.enstp.edu.dz/items/ba1d0487-50cb-4e72-83e4-6bc3f0613efe', 'item', 'DSpace ENSTP'],
  [2026, 'DIB', 'Infrastructures de Base', 'Étude de conception d’un passage dénivelé au PK0+307.97 y compris la stabilité des écrans de soutènement par appuis', 'Refif, Mahdia · Larouci, Yousra · Sebah, Omar · Hamadi, Kamel', '', 'https://dspace.enstp.edu.dz/items/225e4ce0-fbb3-4c0d-aabe-578693353e6d', 'item', 'DSpace ENSTP'],
  [2026, 'DIB', 'Infrastructures de Base', 'Étude de stabilité du talus au niveau du portail Est du tunnel de Sidi-Aïch (titre complet sur la notice)', 'Zerkouk, Mohamed Hassane · Boukhers, Zakaria · Hamadi, Kamel', '', 'https://dspace.enstp.edu.dz/items/cfbee39d-1130-4b62-b3ae-6e7d948db244', 'item', 'DSpace ENSTP'],
  [2026, 'DIB', 'Infrastructures de Base', 'Calcul sismique d’une tour (R+33) à Saïd Hamdine (Alger) en utilisant l’analyse dynamique non-linéaire par accélérogrammes', 'Sakhri, Anissa · Touati, Ikram · Larbi, Selma Hanane', '', 'https://dspace.enstp.edu.dz/items/26d33cd8-cbba-4bcb-a038-b56a4e4d659c', 'item', 'DSpace ENSTP'],
  [2026, 'DIB', 'Infrastructures de Base', 'Étude en APD de la nouvelle ligne ferroviaire à voie unique Ghardaïa – Meniaa à partir du PK27+000 (titre complet sur la notice)', 'Touati, Abd Elbasset · Attiche, Kamel · Ghaffar, Karam · Fedghouche, Ferhat', '', 'https://dspace.enstp.edu.dz/items/59a3959f-e682-4ce1-abed-74ab270503be', 'item', 'DSpace ENSTP'],
  [2026, 'DMS', 'Matériaux & Structures', 'Étude d’un bâtiment en R+11+4 sous-sols à usage bureaux avec la prise en compte de l’interaction sol-structure selon RPA 2024', 'Zellouf, Maroua · Derbah, Maroua · Derbal, Ismail · Larbi, Selma', '', 'https://dspace.enstp.edu.dz/items/7c80ece8-b696-413d-b22c-aa938c41828d', 'item', 'DSpace ENSTP'],
  [2026, 'DMS', 'Matériaux & Structures', 'Conception et étude de viaduc ferroviaire du PK37+303.29 au PK37+601.60, ligne Beni Mansour – Béjaïa', 'Smail, Youcef · Ghougha, Abdeldjalil · Hemaidi Zourgui, Nadjib · Souai, Mohamed El Amine', '', 'https://dspace.enstp.edu.dz/items/adf8d0fe-6b1f-47e1-9e51-024cae373f30', 'item', 'DSpace ENSTP'],
  [2026, 'DMS', 'Matériaux & Structures', 'Conception et étude d’un viaduc ferroviaire sur le tronçon Ksar El Boukhari – Boughezoul, du PK12+500 au PK12+824', 'Ghennam, Safa · Bouhafs, Fatima-Zohra · Amieur, Mohamed', '', 'https://dspace.enstp.edu.dz/items/3b0f87a9-57eb-413b-93fa-f3a8d8205a71', 'item', 'DSpace ENSTP'],
  [2026, 'DMS', 'Matériaux & Structures', 'Étude de vulnérabilité sismique d’un bâtiment en béton armé à contreventement auto-stable (poteau/poutre), bâtiment médical de l’hôpital Mohamed Boudiaf, El Khroub', 'Boualbani, Narimane · Medjerab, Manel · Chikh, Benazouz · Remki, Mustapha', '', 'https://dspace.enstp.edu.dz/items/5ca77690-798b-4eef-acb5-088813da76d0', 'item', 'DSpace ENSTP'],
  [2026, 'DMS', 'Matériaux & Structures', 'Conception et étude d’un viaduc ferroviaire de la ligne minière Annaba – Bouchegouf – Tébessa – Djebel Onk – Bled El Hadba, PK26+225 au PK27', 'Mahdab, Mohamed · Ben Nouioua, Ikram · Ouali, Hacene · Fedghouche, Ferhat', '', 'https://dspace.enstp.edu.dz/items/19a701d1-13ab-403f-af36-a1933ce03497', 'item', 'DSpace ENSTP'],
  // ---- Promotion 2024/2025 ----
  [2025, '', 'Routes et Ouvrages', 'Étude APD de la liaison autoroutière reliant Sidi Bel Abbès – A.E.O – Saïda sur 120 km, tronçon du PK 30+000 au PK 40+000, avec aménagement d’un échangeur au PK 30+260', 'TALHA Houdheyfa · OUBOUCHOU Amine', 'BOUZINA Mohammed · BAKHTI Rachid (co-encadreur)', 'https://dspace.enstp.edu.dz/bitstreams/c360561b-0e6e-464e-9a04-fcf73b3ceba9/download', 'pdf', 'DSpace ENSTP'],
  [2025, '', 'Routes et Ouvrages', 'Étude en APD d’un tronçon du dédoublement de la RN 127 reliant la wilaya de Tissemsilt et l’Autoroute Nord-Sud sur 10 km, du PK 36+000 au PK 46+000, avec la conception de deux carrefours giratoires', 'DEHBI Ilyas · BOUMAIZA Khadidja', 'BENALMELADJ Mohamed · DAKHMOUCHE Mohamed', 'https://dspace.enstp.edu.dz/bitstreams/9d340cae-247c-4825-b019-03265308ef92/download', 'pdf', 'DSpace ENSTP'],
  // ---- Promotion 2023/2024 ----
  [2024, 'DIB', 'Infrastructures de Base', 'Étude et conception d’un pont ferroviaire du PK 23+493.000 au PK 23+642.300 sur la ligne minière Tébessa (Tenoukla)', 'ADROUCHE Zakaria', 'AMIEUR Mohamed', 'https://dspace.enstp.edu.dz/server/api/core/bitstreams/7836e8a6-f947-4bf1-a5cb-6fd205dea6a5/content', 'pdf', 'DSpace ENSTP'],
  [2024, 'DIB', 'Infrastructures de Base', 'Étude APS et APD de la liaison autoroutière 4e rocade – M’Sila sur 100 km, du PK 20 au PK 35+500, avec échangeur', 'BELOUAR Sabrina · ABED Soumaya', 'Dr MESSAI Abderraouf · GOUMETTRE A. (co-encadrant)', 'https://dspace.enstp.edu.dz/bitstreams/89ea9279-34e8-4ff4-ace9-acb14fd39804/download', 'pdf', 'DSpace ENSTP'],
  [2024, 'DMS', 'Matériaux & Structures', 'Étude d’avant-projet détaillé d’un tronçon autoroutier (3e rocade) sur 10 km du PK 70+000 au PK 80+000 avec la conception d’un échangeur', 'BECIT Mohamed Ayoub · DAHMOUNI Hafidh', 'BENBOUZID Mohamed Lakhdar', 'https://dspace.enstp.edu.dz/bitstreams/ca7b2363-b37d-4e94-b162-0f3b0ab6d8e2/download', 'pdf', 'DSpace ENSTP'],
  // ---- Promotion 2022/2023 ----
  [2023, 'DMS', 'Matériaux & Structures', 'Conception et étude d’un viaduc sur la 4e rocade entre l’échangeur RN18 Khemis Miliana et l’échangeur Hanacha (PK 33+602 – PK 33+814)', 'GUETTAR Mohammed Amine · DAOUD Larbi', 'Dr AMIEUR M. · BENSAAD R. (co-encadrant)', 'https://dspace.enstp.edu.dz/server/api/core/bitstreams/d6de8691-49e0-4894-a8e6-a3c2310afa7d/content', 'pdf', 'DSpace ENSTP'],
  [2023, 'DIB', 'Infrastructures de Base', 'Étude en APD d’un tronçon autoroutier de la pénétrante reliant le port d’Oran à l’autoroute Est-Ouest du PK 0+600 au PK 9+010 avec la conception d’une digue maritime', 'ABES Yacine · ERROUANE Mohamed', 'KHOUAS Zohra · MAHTOUR Tarek · LAKHDARI Boudjemaa', 'https://dspace.enstp.edu.dz/bitstreams/0136a56c-fd45-4f0d-ba11-bc7c2f99de35/download', 'pdf', 'DSpace ENSTP'],
  [2023, 'DIB', 'Infrastructures de Base', 'Étude APD de l’évitement de la ville de Djelfa sur 10 km, du PK294+000 au PK351+500, lot 02', 'SEHAKI Sadia', 'ADEM Amel · MAHIAOUI Mahdia Yasmine', 'https://dspace.enstp.edu.dz/bitstreams/7246d351-0712-4b09-9a11-93c4a3844beb/download', 'pdf', 'DSpace ENSTP'],
  // ---- Promotion 2021/2022 ----
  [2022, '', 'Routes et Ouvrages d’Art', 'Conception et étude d’un pont sur Oued Tafarahig, wilaya d’El Bayadh', 'DJELLOUT Youcef · HAMICI Zakaria', 'TABANI Samir · MAHIAOUI Yasmine', 'https://dspace.enstp.edu.dz/server/api/core/bitstreams/163332f1-b295-4fd9-9264-cb83598e150d/content', 'pdf', 'DSpace ENSTP'],
  [2022, 'DIB', 'Infrastructures de Base', 'Étude d’expertise-renforcement d’une partie de la RN 03 au niveau de la commune de Hassi Messaoud, wilaya d’Ouargla (titre complet sur le PDF)', 'AMAROUCHE Sami · OUZIT Zhor', 'DERRICHE Z. · OUCIEF I.', 'https://dspace.enstp.edu.dz/bitstreams/a071c9a0-053d-45c2-99a6-0c80755719ca/download', 'pdf', 'DSpace ENSTP'],
  // ---- Promotion 2020/2021 (publiés en ligne par le Centre de calcul de l'ENSTP) ----
  [2021, 'DIB', 'Infrastructures de Base', 'Conception et étude d’un viaduc du PK 23+970 au PK 24+114 de la pénétrante reliant Mascara à l’autoroute Est-Ouest', 'LAIREDJ Aymene · MELLIT Younes', 'BABAKHOUYA Y.', 'https://www.calameo.com/books/00464245195e2422f4726', 'read', 'Calaméo · Centre de calcul ENSTP'],
  [2021, 'DIB', 'Infrastructures de Base', 'Étude APD de dédoublement, modernisation et/ou rectification de tracé pour augmenter la capacité de la ligne minière Est Oued Keberit – Djebel Onk, sous-tronçon Oued Keberit – Sidi Yahia du PK 55+750 au PK 76+675, avec la conception de la gare mixte de Sidi Yahia', 'HABCHI Mohamed Lokmane (voir la page de garde)', 'RAHMANI Mohamed El Hachemi', 'https://www.calameo.com/books/0046424516476f5863271', 'read', 'Calaméo · Centre de calcul ENSTP'],
  [2021, 'DMS', 'Matériaux & Structures', 'Étude d’un viaduc mixte avec tablier en bi-poutres métalliques (PK 17+122, RN 1 Chiffa – Berrouaghia)', 'BOUTAHRAOUI Houssem · ALLOUN Yahia', 'BOUZINA Yasser · HEMAIDI ZOURGUI Nadjib', 'https://www.calameo.com/books/004642451feda2a24e854', 'read', 'Calaméo · Centre de calcul ENSTP'],
  [2021, 'DMS', 'Matériaux & Structures', 'Étude en APD d’un tronçon autoroutier de la rocade des Hauts Plateaux, lot Est, sur 7 km, section de Batna, du PK 20+000 au PK 27+000, avec conception d’un échangeur', 'HAMZAOUI Imen', 'MORSLI Rabah', 'https://www.calameo.com/books/004642451124e3a680f8f', 'read', 'Calaméo · Centre de calcul ENSTP'],
  [2021, 'DMS', 'Matériaux & Structures', 'Étude du périphérique Nord de la nouvelle ville de Sidi Abdellah sur 6 km avec conception d’un échangeur', 'ABBES Dallal', 'DERRADJI Ayachi · HAMADI Kamel', 'https://www.calameo.com/books/00464245159912ae36536', 'read', 'Calaméo · Centre de calcul ENSTP'],
  [2021, 'DMS', 'Matériaux et Structures', 'Étude en APD de dédoublement, modernisation et/ou rectification d’une ligne ferroviaire pour augmenter la capacité de la ligne minière, tronçon Oued Kebrit – Tébessa (PK 94+000 au PK 112+000), avec conception de la gare de Boulhaf Dyr', 'NAHAL Mohamed · MEDJADBA Idriss', 'CHANANE Mouloud', 'https://www.calameo.com/books/004642451236c8d80386d', 'read', 'Calaméo · Centre de calcul ENSTP']
];
/* collections complètes du dépôt (pour aller plus loin) */
var PFE7COL = [
  ['DIB — Mémoires d’Ingénieur (système LMD)', '333 mémoires', 'https://dspace.enstp.edu.dz/collections/ea37d57e-63fd-4d23-b84c-37d8531cc44d'],
  ['DMS — Mémoires d’Ingénieur (système LMD)', '280 mémoires', 'https://dspace.enstp.edu.dz/collections/5be50ac2-bd6a-4923-a037-fcfe2fb3a41e'],
  ['Tout le dépôt DSpace de l’ENSTP', 'Départements, laboratoire, revues', 'https://dspace.enstp.edu.dz/community-list']
];

/* ---------- BookSTP · Guides (références vérifiées) ---------- */
var GUI7 = [
  { k: 'SETRA', h: 'Guides du Sétra (Service d’études sur les transports, les routes et leurs aménagements)',
    p: 'Le Sétra a été intégré au Cerema en 2014 ; ses guides d’ouvrages d’art restent diffusés par le Cerema sur sa plateforme PILES.',
    items: [
      ['Répertoire — Textes et documents techniques essentiels ouvrages d’art', 'Sétra, collection « Les outils », mise à jour décembre 2008 (janvier 2009)', 'https://piles.cerema.fr/IMG/pdf/repoa_janv09_cle73c52a.pdf', 'PDF'],
      ['MEMOAR — Mémento pour la mise en œuvre sur ouvrages d’art (collection de fiches techniques)', 'Sétra, collection « Les outils », octobre 2009', 'https://piles.cerema.fr/IMG/pdf/collection_octobre_2009_fiches_memoar_cle2ff23e.pdf', 'PDF'],
      ['Guide d’application de l’instruction technique surveillance et entretien des ouvrages d’art — Fascicule 21 : Équipements des ouvrages d’art', 'Sétra, novembre 2011 (ISBN 978-2-11-128045-8)', 'https://piles.cerema.fr/IMG/pdf/itseoa_fascicule_21_2011_equipements_des_ouvrages_d_art_cle239191.pdf', 'PDF'],
      ['Répertoire des documents relatifs aux ouvrages d’art (REFOA)', 'Cerema, édition juin 2021 — successeur du répertoire Sétra', 'https://piles.cerema.fr/IMG/pdf/cerema_refoa_repertoire_documents_relatifs_aux_ouvrages_art_edition_juin_2021_cle266771.pdf', 'PDF']] },
  { k: 'Eurocodes', h: 'Eurocodes — EN 1990 à EN 1999',
    p: 'Les Eurocodes sont 10 normes européennes (EN 1990 – EN 1999) de calcul des structures. Les textes complets sont vendus par les organismes de normalisation ; le site officiel du Centre commun de recherche (JRC) de la Commission européenne présente chaque Eurocode, ses parties et des exemples de calcul.',
    items: [
      ['EN Eurocodes — site officiel (JRC, Commission européenne)', 'Présentation des 10 Eurocodes, de leurs parties et de la seconde génération', 'https://eurocodes.jrc.ec.europa.eu/EN-Eurocodes', 'Site'],
      ['EN 1990 — Eurocode : Bases de calcul des structures', 'EN 1990:2002 et amendement EN 1990:2002/A1:2005', 'https://eurocodes.jrc.ec.europa.eu/EN-Eurocodes/eurocode-basis-structural-design', 'Site']] },
  { k: 'BAEL', h: 'BAEL 91 révisé 99',
    p: 'Règles techniques de conception et de calcul des ouvrages et constructions en béton armé suivant la méthode des états limites — CCTG, Fascicule n° 62, Titre I, Section I, approuvé par le décret n° 99-98 du 15 février 1999.',
    items: [
      ['Fascicule n° 62 – Titre I – Section I : Règles BAEL 91 révisé 99', 'Édition avril 1999 (texte officiel ressaisi, diffusé par le Cerema)', 'https://piles.cerema.fr/IMG/pdf/fascicule_62_titre_i_section_1_cctg_1999_regles_bael_91_revise_99_cle243fbc.pdf', 'PDF']] },
  { k: 'Annexe 14', h: 'Annexe 14 de l’OACI — Aérodromes',
    p: 'Identité vérifiée : il s’agit de l’Annexe 14 à la Convention relative à l’aviation civile internationale (Convention de Chicago), publiée par l’Organisation de l’aviation civile internationale (OACI). Elle fixe les normes et pratiques recommandées pour les aérodromes ; le Volume I « Conception et exploitation technique des aérodromes » est celui des pistes d’aérodrome (le Volume II traite des hélistations). La 9ᵉ édition (juillet 2022) s’applique depuis le 3 novembre 2022 ; elle est ensuite complétée par des amendements (jusqu’à l’amendement n° 18).',
    items: [
      ['Annexe 14 — Aérodromes, Volume I : Conception et exploitation technique des aérodromes', '9ᵉ édition, juillet 2022 — version française consolidée publiée par l’Office fédéral suisse de l’aviation civile (OFAC)', 'https://www.bazl.admin.ch/dam/fr/sd-web/PzvzqQpFptul/an14_v1_cons_fr.pdf', 'PDF'],
      ['Annex 14 — Aerodromes, Volume I (boutique officielle de l’OACI)', '9th Edition, July 2022', 'https://store.icao.int/en/annex-14-aerodromes', 'Site']] }
];
