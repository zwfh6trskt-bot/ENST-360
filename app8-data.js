/* =====================================================================
   ENSTP 360 · round 8 — données et références aux versions précédentes
   (fichier séparé : les fonctions déclarées dans app8.js remplacent celles
   du même nom, on garde donc ici une référence aux anciennes)
   ===================================================================== */
var RBS7 = rbSubs;
var AFTER7 = after6;
var E6INNER7 = e6Inner;
var NEARG7 = nearGrid;

/* sessions ouvertes sur l'ancienne base (khkkzz…) : invalides sur la base enstp360 → déconnexion propre */
(function () {
  try {
    var t = AU.s && AU.s.access_token, p = t ? JSON.parse(atob(t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))) : null;
    if (p && String(p.iss || '').indexOf('adzeobrukvnvhgwnupqe') === -1) { auSave(null); AU.prof = null; AU.admin = false; AU.profLoaded = true; }
  } catch (e) {}
})();

/* ---------- 05 · Manger : quatre établissements en tête de liste ----------
   Liens et détails (adresse précise, prix, photos) à fournir. */
NB.rest = { fr: 'Restaurant', en: 'Restaurant', ar: 'مطعم' };
NR.unshift(
  ['Soummam', 'Kouba · près de l’ENSTP', '', 'rest', 'meal', 'Informations détaillées (adresse, prix, photos) à venir.|Details (address, prices, photos) coming soon.|التفاصيل (العنوان، الأسعار، الصور) قريبًا.'],
  ['Chouway El Baraka', 'À côté de la boulangerie Soummam', '', 'rest', 'meal', 'Informations détaillées (adresse, prix, photos) à venir.|Details (address, prices, photos) coming soon.|التفاصيل (العنوان، الأسعار، الصور) قريبًا.'],
  ['Kahwa', 'Kouba · à côté de l’école', '', 'fast', 'burger', 'Fast-food situé à côté de l’école. Informations détaillées à venir.|Fast-food spot right next to the school. Details coming soon.|مطعم وجبات سريعة بجانب المدرسة. التفاصيل قريبًا.'],
  ['Restaurant du foyer des garçons', 'Foyer des garçons · ENSTP', '', 'rest', 'meal', 'Restaurant du foyer des garçons. Informations détaillées à venir.|Restaurant of the boys’ hall. Details coming soon.|مطعم مأوى الذكور. التفاصيل قريبًا.']
);

var NURL8 = {
  'Soummam': 'https://maps.app.goo.gl/YgxrqAmtGMDADPjA7?g_st=ic',
  'Kahwa': 'https://maps.app.goo.gl/4eo2Q3TKK2mcZVic9?g_st=ic'
};

/* ---------- 06 · Résidences des filles : photos, avis, fermeture des portes ---------- */
var WRES6 = [
  { n: ['Le Ruisseau — Résidence M’hamed Yousfi', 'Le Ruisseau — M’hamed Yousfi residence', 'لوروسو — الإقامة الجامعية محمد يوسفي'],
    loc: ['Le Ruisseau (Belouizdad), Alger', 'Le Ruisseau (Belouizdad), Algiers', 'لوروسو (بلوزداد)، الجزائر العاصمة'],
    url: 'https://maps.app.goo.gl/NhHVa9ySysMMoqEk8?g_st=ic', photo: 'images/residences/ruisseau-mhamed-yousfi.jpg',
    close: ['19 h', '7 pm', '19:00'],
    av: ['La résidence M’hamed Yousfi est appréciée pour son emplacement central à Belouizdad et pour ses infrastructures, qui ont récemment bénéficié de travaux de rénovation et de peinture. Toutefois, d’anciens résidents signalent une dégradation progressive de l’entretien et une qualité de restauration inégale.',
      'The M’hamed Yousfi residence is valued for its central location in Belouizdad and for its facilities, which were recently renovated and repainted. However, former residents report a gradual decline in upkeep and uneven catering quality.',
      'تحظى إقامة محمد يوسفي بالتقدير لموقعها المركزي في بلوزداد ولمرافقها التي استفادت مؤخرًا من أشغال ترميم وطلاء. غير أن مقيمين سابقين يشيرون إلى تراجع تدريجي في الصيانة وتفاوت في جودة الإطعام.'] },
  { n: ['Résidence universitaire de Saïd Hamdine', 'Saïd Hamdine university residence', 'الإقامة الجامعية سعيد حمدين'],
    loc: ['Saïd Hamdine, Alger · localisation exacte à ajouter', 'Saïd Hamdine, Algiers · exact location to be added', 'سعيد حمدين، الجزائر العاصمة · الموقع الدقيق سيُضاف'],
    url: '', q: 'Résidence universitaire Saïd Hamdine Alger', photo: 'images/residences/said-hamdine.jpg',
    close: ['entre 20 h et 21 h', 'between 8 pm and 9 pm', 'بين 20:00 و21:00'],
    av: ['Les avis (note moyenne : 3,9/5) soulignent un emplacement stratégique et une vie étudiante dynamique, mais mentionnent un manque d’entretien des installations. L’accueil et l’organisation administrative sont appréciés à la rentrée, tandis que le confort matériel et la restauration sont jugés inégaux au quotidien.',
      'Reviews (average rating: 3.9/5) highlight a strategic location and a lively student life, but mention poorly maintained facilities. The welcome and administrative organisation are appreciated at the start of the year, while material comfort and catering are seen as uneven day to day.',
      'تُبرز الآراء (متوسط التقييم: 3,9/5) موقعًا استراتيجيًا وحياة طلابية نشيطة، لكنها تشير إلى نقص في صيانة المرافق. يُقدَّر الاستقبال والتنظيم الإداري عند الدخول، بينما يُعدّ الراحة المادية والإطعام متفاوتين يوميًا.'] },
  { n: ['Résidence universitaire de Sidi Abdellah', 'Sidi Abdellah university residence', 'الإقامة الجامعية سيدي عبد الله'],
    loc: ['Sidi Abdellah, Alger · localisation exacte à ajouter', 'Sidi Abdellah, Algiers · exact location to be added', 'سيدي عبد الله، الجزائر العاصمة · الموقع الدقيق سيُضاف'],
    url: '', q: 'Résidence universitaire Sidi Abdellah Alger', photo: '',
    close: ['19 h', '7 pm', '19:00'],
    av: ['Les étudiants saluent les bâtiments récents, les chambres individuelles et la proximité immédiate des écoles du pôle. Certains signalent toutefois des coupures d’eau ponctuelles et des finitions perfectibles. Les résidentes apprécient les chambres individuelles et le calme du campus, mais mentionnent également des coupures d’eau occasionnelles ou l’indisponibilité de certains espaces communs, notamment le foyer.',
      'Students praise the recent buildings, the single rooms and the immediate proximity of the schools of the hub. Some, however, report occasional water cuts and finishing that could be better. Residents appreciate the single rooms and the calm of the campus, but also mention occasional water cuts or some shared spaces being unavailable, notably the common room.',
      'يُشيد الطلبة بالمباني الحديثة والغرف الفردية والقرب المباشر من مدارس القطب. غير أن بعضهم يشير إلى انقطاعات متفرقة للمياه وتشطيبات قابلة للتحسين. وتُقدّر المقيمات الغرف الفردية وهدوء الحرم، لكنهن يذكرن أيضًا انقطاعات عرضية للمياه أو عدم إتاحة بعض الفضاءات المشتركة، لا سيما النادي.'] }
];

/* ---------- 04 · Démarches : nouveaux textes ---------- */
var PAY8 = [
  ['Inscription universitaire|University registration|التسجيل الجامعي', 'https://progres.mesrs.dz/epaiement/epaiementI.xhtml'],
  ['Inscription au transport|Transport registration|التسجيل في النقل', 'https://progres.mesrs.dz/epaiement/epaiementT.xhtml'],
  ['Inscription à la résidence universitaire|University residence registration|التسجيل في الإقامة الجامعية', 'https://progres.mesrs.dz/epaiement/epaiementH.xhtml']
];
var SVC8 = {
  cert: ['affairs', 'Certificat de scolarité|School certificate|شهادة مدرسية', [
    'Le certificat de scolarité peut être récupéré en début d’année auprès de votre département, accompagné de votre dernier relevé de notes (sauf pour les étudiants de 1re année préparatoire).|The school certificate can be collected at the start of the year from your department, together with your latest transcript (except for 1st-year preparatory students).|يمكن استلام الشهادة المدرسية في بداية السنة لدى قسمك، مرفقة بآخر كشف نقاط (باستثناء طلبة السنة الأولى تحضيري).',
    '<b>Condition :</b> avoir réglé les frais d’inscription de l’année universitaire en cours.|<b>Condition:</b> registration fees for the current academic year must be paid.|<b>الشرط:</b> تسديد حقوق التسجيل للسنة الجامعية الجارية.']],
  abs: ['admin', 'Justification d’absence|Justifying an absence|تبرير الغياب', [
    'Pour justifier une absence, l’étudiant doit présenter son justificatif au médecin afin qu’il le valide, puis le déposer auprès de son département. La justification peut être validée par l’un des trois départements concernés.|To justify an absence, the student must show the supporting document to the doctor for validation, then hand it in to their department. The justification can be validated by any of the three departments concerned.|لتبرير الغياب، يجب على الطالب تقديم المبرر للطبيب للمصادقة عليه، ثم إيداعه لدى قسمه. يمكن المصادقة على التبرير من طرف أحد الأقسام الثلاثة المعنية.',
    'Pour les séances de TD, l’absence est ainsi justifiée.|For tutorial (TD) sessions, the absence is then justified.|بالنسبة لحصص الأعمال الموجهة، يُعدّ الغياب بذلك مبررًا.',
    'En cas d’absence à une séance de TP, une séance de remplacement peut être organisée avec un autre groupe ; à défaut, l’étudiant pourra effectuer le TP lors d’une séance de rattrapage.|If a practical (TP) session is missed, a replacement session can be arranged with another group; otherwise, the student can do the TP during a make-up session.|في حال الغياب عن حصة أعمال تطبيقية، يمكن تنظيم حصة تعويضية مع فوج آخر؛ وإلا يمكن للطالب إجراء الحصة خلال حصة استدراكية.']],
  lib: ['affairs', 'Bibliothèque|Library|المكتبة', [
    'Inscrivez-vous en ligne pour accéder à la bibliothèque de l’école. <b>Horaires :</b> 9 h à 15 h 30.|Register online to access the school library. <b>Opening hours:</b> 9 am to 3:30 pm.|سجّل عبر الإنترنت للوصول إلى مكتبة المدرسة. <b>التوقيت:</b> من 9:00 إلى 15:30.',
    '<b>Condition :</b> carte d’étudiant obligatoire.|<b>Condition:</b> student card required.|<b>الشرط:</b> بطاقة الطالب إلزامية.',
    '<b>Accès au site :</b> sur le site officiel « École Nationale Supérieure des Travaux Publics », dans le pied de page, ouvrir « خدماتنا » puis « مكتبة BENSTP ».|<b>Access:</b> on the official “École Nationale Supérieure des Travaux Publics” website, in the footer, open “خدماتنا” then “مكتبة BENSTP”.|<b>الوصول:</b> في الموقع الرسمي للمدرسة الوطنية العليا للأشغال العمومية، أسفل الصفحة، افتح « خدماتنا » ثم « مكتبة BENSTP ».',
    '<b>Emprunts :</b> jusqu’à 6 livres en cycle préparatoire, à restituer à la fin du semestre ; jusqu’à 4 livres en cycle ingénieur.|<b>Borrowing:</b> up to 6 books in the preparatory cycle, to be returned at the end of the semester; up to 4 books in the engineering cycle.|<b>الإعارة:</b> حتى 6 كتب في الطور التحضيري، تُعاد في نهاية السداسي؛ وحتى 4 كتب في طور الهندسة.']]
};
