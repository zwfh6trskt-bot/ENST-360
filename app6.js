/* =====================================================================
   ENSTP 360 · round 6
   - navigation : rubriques en accordéon sur l'accueil, une page par sous-rubrique,
     flèche retour + position retrouvée, « Découvrir l'ENSTP » dans la barre
   - nouvel emploi du temps interactif (grille + ligne rouge « Je suis censé être là »)
   - objets trouvés (photo), likes / dislikes, réservation des créneaux SSC
   - contenus : bourse, abandon & transfert, transport, santé, résidences
   Chargé après le script principal de index.html : les fonctions déclarées ici
   remplacent celles du même nom.
   ===================================================================== */

/* ---------- icônes supplémentaires ---------- */
Object.assign(P, {
  'thumb-up': '<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>',
  'thumb-down': '<path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/>',
  'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  home: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>'
});
if (!P.camera) P.camera = '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>';
if (!P.calendar) P.calendar = '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>';
if (!P.clock) P.clock = '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>';

/* ---------- petits outils ---------- */
function lsGet(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
function okMail6(v) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(v || '').trim()); }
function pad2(n) { return (n < 10 ? '0' : '') + n; }
function mm2t(m) { return pad2(Math.floor(m / 60)) + ':' + pad2(m % 60); }
function t2mm(t) { if (!t) return null; var p = String(t).split(':'); return +p[0] * 60 + +p[1]; }
/* heure et jour d'Alger, quel que soit le fuseau de l'appareil */
function algNow() {
  var d = new Date();
  try {
    var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Algiers', weekday: 'short', hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit', hourCycle: 'h23' }).formatToParts(d), o = {};
    parts.forEach(function (p) { o[p.type] = p.value; });
    var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
    return { wd: wd, min: (+o.hour % 24) * 60 + +o.minute, date: o.year + '-' + o.month + '-' + o.day, hm: pad2(+o.hour % 24) + ':' + o.minute };
  } catch (e) { return { wd: d.getDay(), min: d.getHours() * 60 + d.getMinutes(), date: d.toISOString().slice(0, 10), hm: pad2(d.getHours()) + ':' + pad2(d.getMinutes()) }; }
}

/* ---------- base partagée (Supabase du SSC) ---------- */
var SB6 = { url: 'https://qsgnglbxgcxrhicdysxy.supabase.co', key: 'sb_publishable_bGADhAYFqsVZ6y-xjpe5cw_av6GdJ0z' };
function sbReq(path, body) {
  return fetch(SB6.url + '/rest/v1/' + path, { method: body ? 'POST' : 'GET', headers: { apikey: SB6.key, 'Content-Type': 'application/json', Accept: 'application/json' }, body: body ? JSON.stringify(body) : undefined })
    .then(function (r) {
      return r.text().then(function (t) {
        var j = null; try { j = t ? JSON.parse(t) : null; } catch (e) {}
        if (!r.ok) { var er = new Error((j && (j.message || j.hint)) || t || ('HTTP ' + r.status)); er.status = r.status; er.code = j && j.code; throw er; }
        return j;
      });
    });
}
function sbMissing(e) { return !!e && (e.status === 404 || /PGRST20[0-9]|42P01|42883|does not exist|Could not find/i.test((e.code || '') + ' ' + (e.message || ''))); }

/* ---------- textes ---------- */
var T6L = {
  fr: {
    back: 'Retour', home: 'Accueil', explore: 'Explorer', rubH: 'Les rubriques', rubP: 'Touchez « + » pour afficher les sous-rubriques.', more: 'Aussi dans cette rubrique',
    rxQ: 'Cette page vous a été utile ?', rxLocal: 'Votre avis est enregistré sur cet appareil.',
    objets: ['Objets trouvés', 'Photographier, publier, récupérer'], vie: ['Clubs, sport & sorties', 'Clubs, sport, sorties'], campus: 'Plan du campus',
    oWall: 'Objets trouvés récemment', oPost: 'J’ai trouvé un objet', disc: 'Découvrir l’ENSTP',
    sBourse: 'Bourse universitaire', sTransfer: 'Abandon et transfert', rMen: 'Résidences pour hommes', rWomen: 'Résidences pour femmes', rHow: 'Comment s’inscrire ?', rTr: 'Comment effectuer un transfert ?',
    gmail: 'Gmail', write: 'Écrire', nf: 'Cette page n’existe pas ou plus.', nfBack: 'Revenir à l’accueil'
  },
  en: {
    back: 'Back', home: 'Home', explore: 'Explore', rubH: 'Sections', rubP: 'Tap “+” to show the sub-sections.', more: 'Also in this section',
    rxQ: 'Was this page useful?', rxLocal: 'Your vote is saved on this device.',
    objets: ['Lost & found', 'Snap, post, pick up'], vie: ['Clubs, sport & outings', 'Clubs, sport, outings'], campus: 'Campus map',
    oWall: 'Recently found items', oPost: 'I found something', disc: 'Discover ENSTP',
    sBourse: 'University grant', sTransfer: 'Withdrawal & transfer', rMen: 'Men’s residences', rWomen: 'Women’s residences', rHow: 'How to apply?', rTr: 'How to transfer?',
    gmail: 'Gmail', write: 'Write', nf: 'This page does not exist (anymore).', nfBack: 'Back to home'
  },
  ar: {
    back: 'رجوع', home: 'الرئيسية', explore: 'استكشف', rubH: 'الأقسام', rubP: 'اضغط « + » لعرض الأقسام الفرعية.', more: 'أيضًا في هذا القسم',
    rxQ: 'هل كانت هذه الصفحة مفيدة؟', rxLocal: 'رأيك محفوظ على هذا الجهاز.',
    objets: ['الأغراض الضائعة', 'صوّر، انشر، استرجع'], vie: ['النوادي، الرياضة والخرجات', 'نوادٍ، رياضة، خرجات'], campus: 'مخطط الحرم',
    oWall: 'أغراض وُجدت مؤخرًا', oPost: 'وجدت غرضًا', disc: 'اكتشف المدرسة',
    sBourse: 'المنحة الجامعية', sTransfer: 'الانسحاب والتحويل', rMen: 'إقامات الذكور', rWomen: 'إقامات الإناث', rHow: 'كيف أسجّل؟', rTr: 'كيف أقوم بالتحويل؟',
    gmail: 'Gmail', write: 'راسل', nf: 'هذه الصفحة غير موجودة.', nfBack: 'العودة إلى الرئيسية'
  }
};
function T6() { return T6L[lang] || T6L.fr; }

/* titres de l'accueil, de la barre et du pied de page */
['fr', 'en', 'ar'].forEach(function (l) {
  var t = R5[l].tiles, x = T6L[l];
  t.objets = x.objets; t['vie-etudiante'] = x.vie; t.campus = [x.campus, t.campus[1]];
  R5[l].vi = R5[l].vi.slice(0, 3);
});
(function () {
  var v = D.guides.filter(function (g) { return g.slug === 'vie-etudiante'; })[0];
  if (v) { v.title = v.short = T6L.fr.vie[0]; D.tr.en['vie-etudiante'].title = D.tr.en['vie-etudiante'].short = T6L.en.vie[0]; D.tr.ar['vie-etudiante'].title = D.tr.ar['vie-etudiante'].short = T6L.ar.vie[0]; }
  var c = D.guides.filter(function (g) { return g.slug === 'campus'; })[0];
  if (c) { c.title = T6L.fr.campus; D.tr.en.campus.title = T6L.en.campus; D.tr.ar.campus.title = T6L.ar.campus; }
})();

/* ---------- les rubriques ---------- */
var RUB_OLD = RUB;
function G6(slug) { return guides().filter(function (x) { return x.slug === slug; })[0] || { slug: slug, title: slug, short: slug, description: '', sections: [] }; }
function oldSub(rk, id) {
  var a = RUB_OLD[rk](G6(rk));
  for (var i = 0; i < a.length; i++) if (a[i][0] === id) return a[i][2];
  return '';
}
/* ordre de l'accueil : Plan du campus en premier, Objets trouvés en dernier */
var RB6 = [
  { k: 'campus', ic: 'map', c: 1 },
  { k: 'salles', ic: 'book', c: 2 },
  { k: 'services', ic: 'file', c: 3 },
  { k: 'pratique', ic: 'fork', c: 4 },
  { k: 'vie-etudiante', ic: 'users', c: 5 },
  { k: 'residence', ic: 'home', c: 6 },
  { k: 'stages', ic: 'briefcase', c: 7 },
  { k: 'objets', ic: 'box', c: 0 }
];
function rbTitle(k) { if (k === 'decouvrir') return T6().disc; var t = R().tiles[k]; return t ? t[0] : k; }
function rbMeta(k) { var t = R().tiles[k]; return t ? t[1] : ''; }
/* sous-rubriques : [id, titre, contenu] — le contenu n'est construit qu'à l'ouverture de la page */
function rbSubs(k) {
  var r = R(), x = T6(), A = L2(AIDQ);
  switch (k) {
    case 'decouvrir': var s = L2(DEC).s; return [['d-enstp', s[0]], ['d-org', s[1]], ['d-bref', s[2]], ['d-hist', s[3]], ['d-dep', s[4]], ['d-contact', s[5]], ['d-img', s[6]]].map(function (a) { return [a[0], a[1], function () { return oldSub('decouvrir', a[0]); }]; });
    case 'campus': return ['p-plan', 'p-photos', 'p-find', 'p-grow'].map(function (id, i) { return [id, r.pl[i], function () { return oldSub('campus', id); }]; });
    case 'salles': return [['e-edt', r.et[0], edt6Html], ['e-tch', r.et[2], tchHtml], ['e-tools', r.et[3], function () { return oldSub('salles', 'e-tools'); }]];
    case 'services': return [['s-proc', A.s[1], svc6Html], ['s-bourse', x.sBourse, bourse6Html], ['s-transfer', x.sTransfer, transfer6Html], ['s-who', A.s[3], whoHtml]];
    case 'pratique': return [['v-eat', r.pr[0], function () { return oldSub('pratique', 'v-eat'); }], ['v-print', r.pr[1], function () { return oldSub('pratique', 'v-print'); }], ['v-trans', r.pr[2], transport6Html], ['v-health', r.pr[3], health6Html]];
    case 'vie-etudiante': return [['l-clubs', r.vi[0], function () { return oldSub('vie-etudiante', 'l-clubs'); }], ['l-sport', r.vi[1], sport6Html], ['l-out', r.vi[2], function () { return oldSub('vie-etudiante', 'l-out'); }]];
    case 'residence': return [['r-men', x.rMen, men6Html], ['r-women', x.rWomen, women6Html], ['r-howto', x.rHow, howto6Html], ['r-transfer', x.rTr, rtr6Html]];
    case 'stages': return ['t-tips', 't-reco', 't-adv'].map(function (id, i) { return [id, r.st[i], function () { return oldSub('stages', id); }]; });
    case 'objets': return [['o-wall', x.oWall, lfWallHtml], ['o-post', x.oPost, lfPostHtml]];
  }
  return null;
}
function subHref(k, id) { return '#/r/' + k + '/' + id; }
function subLinks(k, cls) {
  return (rbSubs(k) || []).map(function (s) { return '<a class="' + (cls || '') + '" href="' + subHref(k, s[0]) + '"><span>' + esc(s[1]) + '</span>' + ic('arrow-right', 15, 'rtl-flip') + '</a>'; }).join('');
}

/* anciennes adresses → nouvelles pages */
var ALIAS6 = { campus: ['campus', 'p-plan'], salles: ['salles', 'e-edt'], residence: ['residence', 'r-men'] };
function route() {
  var h = location.hash.replace(/^#/, '') || '/';
  var m = h.match(/^\/r\/([^\/?#]+)\/([^\/?#]+)/);
  if (m) return { name: 'sub', slug: decodeURIComponent(m[1]), sub: decodeURIComponent(m[2]) };
  m = h.match(/^\/guide\/([^\/?#]+)/);
  if (m) {
    var s = decodeURIComponent(m[1]);
    if (ALIAS6[s]) return { name: 'sub', slug: ALIAS6[s][0], sub: ALIAS6[s][1] };
    return { name: 'guide', slug: s };
  }
  if (h.indexOf('/ecole') === 0) return { name: 'guide', slug: 'decouvrir' };
  return { name: 'home' };
}
function goPin(n) { st.pin = n; var r = route(); if (r.name === 'sub' && r.slug === 'campus' && r.sub === 'p-plan') { render(); } else location.hash = '#/r/campus/p-plan'; }

/* ---------- en-tête : Découvrir / Études / Vie pratique en menus déroulants ---------- */
var NAV6 = [['decouvrir', 0], ['salles', 1], ['pratique', 2], ['actualites', 3, 1], ['faq', 4, 1]];
function navLinks(r) {
  var cur = r.slug || '', L = R().nav;
  return NAV6.map(function (n) {
    var on = n[0] === cur;
    if (n[2]) return '<a href="' + gl(n[0]) + '"' + (on ? ' class="on" aria-current="page"' : '') + '>' + esc(L[n[1]]) + '</a>';
    return '<div class="x-dd"><button type="button" class="x-ddb' + (on ? ' on' : '') + '" data-dd="' + n[0] + '" aria-expanded="false" aria-haspopup="true">' + esc(n[0] === 'decouvrir' ? T6().disc : L[n[1]]) + ic('down', 15) + '</button><div class="x-ddm" hidden>' + subLinks(n[0]) + '</div></div>';
  }).join('');
}
function header(r) {
  var t = T(), x = XT(), y = T6();
  var mobile = '';
  if (st.menu) {
    var gs = guides();
    var grp = function (k, icn) { return '<details class="x-dg"><summary>' + ic(icn, 18) + '<span>' + esc(rbTitle(k)) + '</span><i class="acc-c" aria-hidden="true"></i></summary><div class="x-dg-b">' + subLinks(k) + '</div></details>'; };
    mobile = '<nav id="header-mobile-nav" class="x-drawer" aria-label="' + esc(x.menu) + '"><div class="x-drawer-in">' +
      '<a href="#/">' + ic('home', 18) + esc(x.home) + '</a><a href="' + gl('actualites') + '">' + ic('news', 18) + esc(L2(NEWSL).nav) + '</a>' +
      grp('decouvrir', 'building') + RB6.map(function (b) { return grp(b.k, b.ic); }).join('') +
      '<a href="' + gl('faq') + '">' + ic('faq', 18) + 'FAQ</a>' +
      '<p class="x-drawer-h">' + esc(x.allH) + '</p><div class="x-drawer-more">' + gs.filter(function (g) { return ['campus', 'salles', 'services', 'pratique', 'vie-etudiante', 'residence', 'stages', 'actualites', 'decouvrir', 'faq'].indexOf(g.slug) === -1; }).map(function (g) { return '<a href="' + gl(g.slug) + '">' + esc(g.short) + '</a>'; }).join('') + '</div>' +
      '<div class="x-drawer-foot">' + langSwitch() + '<button type="button" class="x-dbtn" data-profile="1">' + ic('user', 17) + esc(profile ? profile.name : x.profile) + '</button><button type="button" class="x-dbtn" data-theme="1" aria-pressed="' + dark + '">' + ic(dark ? 'sun' : 'moon', 17) + esc(x.theme) + '</button></div></div></nav>';
  }
  return '<header class="x-hd"><div class="x-hd-in">' +
    '<a href="#/" class="x-brand" aria-label="ENSTP 360 — ' + esc(x.home) + '">' + brandImg() + '</a>' +
    '<nav class="x-nav" aria-label="Navigation">' + navLinks(r) + '</nav>' +
    '<div class="x-tools">' + langSwitch() +
    '<button type="button" class="x-ib" aria-label="' + esc(t.search) + '" title="' + esc(t.search) + '" data-search="1">' + ic('search', 19) + '</button>' +
    '<button type="button" class="x-ib x-acc" data-profile="1" aria-label="' + esc(x.profile) + '" title="' + esc(profile ? profile.name : x.profile) + '">' + ic('user', 19) + (profile ? '<span>' + esc(profile.name.split(' ')[0]) + '</span>' : '') + '</button>' +
    '<button type="button" class="x-ib theme-btn" data-theme="1" aria-pressed="' + dark + '" aria-label="' + esc(x.theme) + '" title="' + esc(x.theme) + '">' + ic(dark ? 'sun' : 'moon', 18) + '</button>' +
    '<button type="button" class="x-ib x-burger" aria-label="' + esc(st.menu ? x.closeMenu : t.openMenu) + '" aria-expanded="' + st.menu + '" aria-controls="header-mobile-nav" data-menu="1">' + ic(st.menu ? 'x' : 'menu', 20) + '</button>' +
    '</div></div>' + mobile + '</header>';
}
function ddClose(except) {
  Array.prototype.forEach.call(document.querySelectorAll('.x-dd'), function (d) {
    if (d === except) return;
    var b = d.querySelector('.x-ddb'), m = d.querySelector('.x-ddm');
    if (b) b.setAttribute('aria-expanded', 'false'); if (m) m.hidden = true; d.classList.remove('open');
  });
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-dd]');
  if (b) {
    var d = b.parentElement, m = d.querySelector('.x-ddm'), open = m.hidden;
    ddClose(d); m.hidden = !open; d.classList.toggle('open', open); b.setAttribute('aria-expanded', String(open));
    return;
  }
  ddClose();
});
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') ddClose(); });

/* ---------- accueil ---------- */
st.rb6 = st.rb6 || {};
function rbRow(b, i) {
  var open = !!st.rb6[b.k], col = CL5[b.c % CL5.length];
  return '<details class="rb6" id="rb-' + b.k + '" data-rb="' + b.k + '"' + (open ? ' open' : '') + '><summary>' +
    '<span class="rb6-n">' + pad2(i + 1) + '</span><span class="ico" style="background:' + col[0] + ';color:' + col[1] + '">' + ic(b.ic, 19, '', 1.8) + '</span>' +
    '<span class="rb6-t"><b>' + esc(rbTitle(b.k)) + '</b><small>' + esc(rbMeta(b.k)) + '</small></span><i class="acc-c" aria-hidden="true"></i></summary>' +
    '<div class="rb6-b">' + subLinks(b.k, 'rb6-l') + '</div></details>';
}
function home() {
  var r = R(), x = XT(), y = T6();
  var hello = profile ? '<p class="x-hello">' + esc(GATE[lang].hi) + (lang === 'ar' ? '، ' : ', ') + esc(profile.name.split(' ')[0]) + (yearLabel() ? ' <span>' + esc(yearLabel()) + '</span>' : '') + '</p>' : '';
  var nw = newsSorted().slice(0, 3), half = Math.ceil(RB6.length / 2);
  return '<main id="main" class="h5">' +
    '<section class="x-wrap hero5"><div class="h5-txt">' + hello + '<span class="eyebrow">' + esc(r.eyebrow) + '</span><h1><mark>' + esc(r.h1m) + '</mark>' + esc(r.h1r) + '</h1><p class="lead">' + esc(x.lead) + '</p><div id="homeNow">' + homeNow() + '</div></div>' +
    '<figure class="hfig"><img src="' + HERO_IMG + '" alt="' + esc(r.imgAlt) + '" width="489" height="489" fetchpriority="high"><div class="tag"><b>1966</b><span>' + esc(r.tagT) + '</span></div></figure></section>' +
    '<div class="x-wrap"><section class="srch" aria-labelledby="hs-h"><h2 id="hs-h">' + esc(r.sH) + '</h2>' +
    '<form id="hs-form" class="sf" role="search"><label class="in">' + ic('search', 18) + '<span class="x-sr">' + esc(r.sH) + '</span><input id="hs-q" type="search" autocomplete="off" enterkeyhint="search" placeholder="' + esc(r.sPh) + '" value="' + esc(st.hq || '') + '"></label><button type="submit" class="r5btn">' + esc(x.sBtn) + '</button></form>' +
    '<h3>' + esc(r.browse) + '</h3><div class="chips">' + x.chips.map(function (c) { return '<button type="button" data-hs="' + esc(c) + '">' + esc(c) + '</button>'; }).join('') + '</div>' +
    '<div id="hs-res" class="search-results x-res" aria-live="polite"' + (hsResults() ? '' : ' hidden') + '>' + hsResults() + '</div></section></div>' +
    '<section class="rb6-band" id="rubriques" aria-labelledby="rb6-h"><div class="x-wrap"><div class="rb6-head"><span class="eyebrow">' + esc(y.explore) + '</span><h2 id="rb6-h">' + esc(y.rubH) + '</h2><p>' + esc(y.rubP) + '</p></div>' +
    '<div class="rb6-grid"><div class="rb6-col">' + RB6.slice(0, half).map(rbRow).join('') + '</div><div class="rb6-col">' + RB6.slice(half).map(function (b, i) { return rbRow(b, i + half); }).join('') + '</div></div></div></section>' +
    cursusHtml() +
    '<section class="x-wrap sec5"><div class="figs">' + r.figs.map(function (f) { return '<div><b>' + esc(f[0]) + '</b><span>' + esc(f[1]) + '</span></div>'; }).join('') + '</div></section>' +
    (nw.length ? '<section class="x-wrap sec5" id="actualites"><div class="sec-h"><div><span class="eyebrow">' + esc(r.newsE) + '</span><h2>' + esc(r.newsH) + '</h2></div><a class="lnk" href="' + gl('actualites') + '">' + esc(L2(NEWSL).all) + '</a></div><div class="nw-grid">' + nw.map(newsCard).join('') + '</div></section>' : '') +
    '<section class="x-wrap sec5">' + contactBlock(true) + '</section></main>';
}
/* l'état ouvert / fermé des rubriques est gardé pour le retour */
document.addEventListener('toggle', function (e) { var d = e.target; if (d && d.classList && d.classList.contains('rb6')) st.rb6[d.getAttribute('data-rb')] = d.open; }, true);

function footer() {
  var t = T(), x = XT(), r = R();
  return '<footer class="f5"><div class="fg"><div><div class="wm">ENSTP <i>360°</i></div><p>' + esc(x.h1) + ' ' + esc(x.fDesc) + '</p><p class="f5tag">' + esc(t.footerTag) + '</p></div>' +
    '<nav aria-label="' + esc(r.fExp) + '"><h2>' + esc(r.fExp) + '</h2><a href="' + gl('decouvrir') + '">' + esc(T6().disc) + '</a>' + RB6.map(function (b) { return '<a href="' + gl(b.k) + '">' + esc(rbTitle(b.k)) + '</a>'; }).join('') + '</nav>' +
    '<nav aria-label="' + esc(r.fOff) + '"><h2>' + esc(r.fOff) + '</h2><a href="https://enstp.edu.dz/" target="_blank" rel="noreferrer">' + esc(r.fSite) + '</a><a href="https://enstp.edu.dz/fr/news-actualites" target="_blank" rel="noreferrer">' + esc(r.fNewsOff) + '</a><a href="' + FB_URL + '" target="_blank" rel="noopener noreferrer">Facebook ENSTP</a><a href="' + gl('actualites') + '">' + esc(r.fNews) + '</a><a href="' + gl('faq') + '">FAQ</a><a href="' + gl('aide') + '">' + esc(x.helpLink) + '</a><button type="button" data-asst-open="1">' + esc(x.helpBtn) + '</button>' + (profile ? '<button type="button" data-profile="1">' + esc(L2(PF).btn) + '</button>' : '') + '</nav>' +
    '<nav aria-label="' + esc(r.fCt) + '"><h2>' + esc(r.fCt) + '</h2><span>' + esc(CONTACT.addr) + '</span><a href="tel:+21323701904"><bdi dir="ltr">+213 (0) 23 70 19 04</bdi></a><a href="mailto:' + CONTACT.mail + '">' + CONTACT.mail + '</a><a href="https://www.google.com/maps/dir/?api=1&destination=' + GMP.school.join(',') + '" target="_blank" rel="noopener">' + esc(r.route) + '</a></nav></div>' +
    '<div class="fb"><span>© ' + new Date().getFullYear() + ' ENSTP 360 · ' + esc(r.rights) + '</span><span>' + esc(r.check) + '</span></div></footer>';
}

/* ---------- pages ---------- */
function notFound6() { var y = T6(); return '<main class="rp x-wrap sp6"><header class="sp6-hd"><h1>404</h1><p>' + esc(y.nf) + '</p></header><a class="r5btn" href="#/">' + esc(y.nfBack) + '</a></main>'; }
function subPage(k, id) {
  var subs = rbSubs(k); if (!subs) return notFound6();
  var s = subs.filter(function (x) { return x[0] === id; })[0]; if (!s) return notFound6();
  var y = T6(), page = k + '/' + id, others = subs.filter(function (x) { return x[0] !== id; });
  return '<main class="rp x-wrap sp6" data-page="' + esc(page) + '">' +
    '<nav class="crumb" aria-label="Breadcrumb"><a href="#/">' + esc(y.home) + '</a><span aria-hidden="true">/</span><span>' + esc(rbTitle(k)) + '</span></nav>' +
    '<header class="sp6-hd"><span class="eyebrow">' + esc(rbTitle(k)) + '</span><h1>' + esc(s[1]) + '</h1></header>' +
    '<div class="acc-b sp6-b">' + s[2]() + '</div>' + rxBar(page) +
    (others.length ? '<nav class="sp6-more" aria-label="' + esc(y.more) + '"><h2>' + esc(y.more) + '</h2><div>' + others.map(function (o) { return '<a href="' + subHref(k, o[0]) + '">' + esc(o[1]) + ic('arrow-right', 14, 'rtl-flip') + '</a>'; }).join('') + '</div></nav>' : '') +
    '</main>';
}
/* page d'une rubrique ouverte par une adresse directe : la liste de ses sous-rubriques */
function rubIndex(k) {
  var y = T6();
  return '<main class="rp x-wrap sp6"><nav class="crumb" aria-label="Breadcrumb"><a href="#/">' + esc(y.home) + '</a></nav><header class="sp6-hd"><span class="eyebrow">ENSTP 360</span><h1>' + esc(rbTitle(k)) + '</h1></header><div class="rb6-solo">' + subLinks(k, 'rb6-l') + '</div></main>';
}
function faq6() {
  var y = T6(), L = L2(FAQD);
  return '<main class="rp x-wrap sp6" data-page="faq"><nav class="crumb" aria-label="Breadcrumb"><a href="#/">' + esc(y.home) + '</a></nav><header class="sp6-hd"><span class="eyebrow">FAQ</span><h1>' + esc(G6('faq').title) + '</h1></header>' +
    '<div class="accs">' + L.map(function (q, i) { return acc('q' + (i + 1), q[0], '<p class="r5p">' + esc(q[1]) + '</p>', false); }).join('') + '</div>' + rxBar('faq') + '</main>';
}
function page6(r) {
  if (r.name === 'home') return home();
  if (r.name === 'sub') return subPage(r.slug, r.sub);
  if (r.slug === 'faq') return faq6();
  if (r.slug === 'decouvrir' || RB6.some(function (b) { return b.k === r.slug; })) return rubIndex(r.slug);
  return guidePage(r.slug);
}
function backBtn6(r) { return r.name === 'home' ? '' : '<button type="button" class="bk6" data-back6="1" aria-label="' + esc(T6().back) + '" title="' + esc(T6().back) + '">' + ic('arrow-left', 20, 'rtl-flip') + '</button>'; }
function render() {
  var r = route();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  var title = XT().title;
  if (r.name === 'sub') { var s = (rbSubs(r.slug) || []).filter(function (x) { return x[0] === r.sub; })[0]; if (s) title = s[1] + ' · ENSTP 360'; }
  else if (r.name === 'guide') { title = (r.slug === 'decouvrir' || RB6.some(function (b) { return b.k === r.slug; }) ? rbTitle(r.slug) : (G6(r.slug).short || r.slug)) + ' · ENSTP 360'; }
  document.title = title;
  var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', XT().metaD);
  document.body.classList.toggle('has-back6', r.name !== 'home');
  document.getElementById('app').innerHTML = header(r) + page6(r) + footer() + backBtn6(r);
  overlay();
  afterRender(); if (window.asstSync) asstSync();
  after6(r);
}
/* chargements après affichage d'une page */
function after6(r) {
  if (document.querySelector('.rx6')) rxLoad();
  if (document.getElementById('e6')) e6Mount();
  if (document.getElementById('lf6-list')) lfLoad();
  if (document.getElementById('ssc6')) sscLoad();
  if (document.getElementById('tr6')) tr6Refresh();
}

/* ---------- retour : flèche en bas à droite + même position qu'avant ---------- */
var NAVS6 = [];
try { history.scrollRestoration = 'manual'; } catch (e) {}
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href^="#/"]'); if (!a) return;
  var to = a.getAttribute('href'), cur = location.hash || '#/';
  if (to === cur || (cur === '#/' && to === '#')) return;
  NAVS6.push({ h: cur, y: window.scrollY || window.pageYOffset || 0 });
  if (NAVS6.length > 40) NAVS6.shift();
}, true);
window.addEventListener('hashchange', function () {
  var h = location.hash || '#/', top = NAVS6[NAVS6.length - 1];
  if (h === '#') h = '#/';
  if (top && (top.h === h || (top.h === '#/' && h === '#/'))) {
    NAVS6.pop();
    var y = top.y, go = function () { window.scrollTo({ top: y, left: 0, behavior: 'instant' }); };
    go(); requestAnimationFrame(go); setTimeout(go, 90); setTimeout(go, 320);
  }
});
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-back6]'); if (!b) return;
  if (NAVS6.length) history.back(); else location.hash = '#/';
});

/* ---------- likes / dislikes ---------- */
var RX6 = { c: {}, local: false };
function rxBar(page) {
  var c = RX6.c[page] || { likes: 0, dislikes: 0 }, mine = (lsGet('enstp6-vote', {}) || {})[page] || 0, y = T6();
  return '<div class="rx6" data-rx="' + esc(page) + '"><span class="rx6-q">' + esc(y.rxQ) + '</span><div class="rx6-bs">' +
    '<button type="button" class="rx6-b rx6-up' + (mine === 1 ? ' on' : '') + '" data-rxv="1" aria-pressed="' + (mine === 1) + '">' + ic('thumb-up', 17) + '<span>Like</span><b>' + (c.likes || 0) + '</b></button>' +
    '<button type="button" class="rx6-b rx6-down' + (mine === -1 ? ' on' : '') + '" data-rxv="-1" aria-pressed="' + (mine === -1) + '">' + ic('thumb-down', 17) + '<span>Dislike</span><b>' + (c.dislikes || 0) + '</b></button></div>' +
    (RX6.local ? '<small class="rx6-n">' + esc(y.rxLocal) + '</small>' : '') + '</div>';
}
function rxPaint(page) {
  var el = document.querySelector('.rx6[data-rx="' + page.replace(/"/g, '') + '"]'); if (!el) return;
  var c = RX6.c[page] || { likes: 0, dislikes: 0 }, mine = (lsGet('enstp6-vote', {}) || {})[page] || 0;
  var up = el.querySelector('.rx6-up'), dn = el.querySelector('.rx6-down');
  up.querySelector('b').textContent = c.likes || 0; dn.querySelector('b').textContent = c.dislikes || 0;
  up.classList.toggle('on', mine === 1); dn.classList.toggle('on', mine === -1);
  up.setAttribute('aria-pressed', String(mine === 1)); dn.setAttribute('aria-pressed', String(mine === -1));
}
function rxLocalCounts() { return lsGet('enstp6-rx-local', {}) || {}; }
function rxLoad() {
  var el = document.querySelector('.rx6'); if (!el) return; var page = el.getAttribute('data-rx');
  if (RX6.local) { RX6.c[page] = rxLocalCounts()[page] || { likes: 0, dislikes: 0 }; rxPaint(page); return; }
  sbReq('page_reactions?select=likes,dislikes&page=eq.' + encodeURIComponent(page)).then(function (j) {
    RX6.c[page] = (j && j[0]) || { likes: 0, dislikes: 0 }; rxPaint(page);
  }).catch(function (e) { if (sbMissing(e)) { RX6.local = true; RX6.c[page] = rxLocalCounts()[page] || { likes: 0, dislikes: 0 }; rxPaint(page); } });
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-rxv]'); if (!b) return;
  var box = b.closest('.rx6'), page = box.getAttribute('data-rx'), v = +b.getAttribute('data-rxv');
  var votes = lsGet('enstp6-vote', {}) || {}, prev = votes[page] || 0, next = prev === v ? 0 : v;
  var dl = (next === 1 ? 1 : 0) - (prev === 1 ? 1 : 0), dd = (next === -1 ? 1 : 0) - (prev === -1 ? 1 : 0);
  votes[page] = next; lsSet('enstp6-vote', votes);
  var c = RX6.c[page] || { likes: 0, dislikes: 0 };
  RX6.c[page] = { likes: Math.max(0, (c.likes || 0) + dl), dislikes: Math.max(0, (c.dislikes || 0) + dd) }; rxPaint(page);
  b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
  var local = function () { RX6.local = true; var L = rxLocalCounts(); L[page] = RX6.c[page]; lsSet('enstp6-rx-local', L); };
  if (RX6.local) { local(); return; }
  sbReq('rpc/react', { p_page: page, p_like: dl, p_dislike: dd }).then(function (j) { if (j && typeof j.likes === 'number') { RX6.c[page] = j; rxPaint(page); } })
    .catch(function (er) { if (sbMissing(er)) local(); });
});

/* ---------- Enseignants : changer de cycle sans fermer la rubrique ; e-mail cliquable ---------- */
function tchInner() {
  var S = L2(TCL), f = st.tcf || 'all', y = T6();
  var tabs = '<div class="xg-tabs" role="tablist">' + ['all', 'cp1', 'cp2', 'dib'].map(function (k) { return '<button type="button" role="tab" aria-selected="' + (f === k) + '" class="xg-tab' + (f === k ? ' on' : '') + '" data-tcf="' + k + '">' + esc(S[k]) + '</button>'; }).join('') + '</div>';
  var body = TCH.filter(function (g) { return f === 'all' || f === g[0]; }).map(function (g) {
    return '<h3 class="tc-y">' + esc(S[g[0]]) + '</h3><div class="tc-grid">' + g[1].map(function (t) {
      var ini = t[1].split(' ').map(function (w) { return w[0]; }).slice(0, 2).join(''), m = t[3];
      return '<article class="tc-card"><div class="tc-top"><span class="tc-av">' + esc(ini) + '</span><div>' + (t[0] ? '<span class="tc-mod">' + esc(t[0]) + '</span>' : '') + '<strong>' + esc(t[1]) + '</strong></div></div>' +
        (t[2].length ? '<div class="tc-tags">' + t[2].map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</div>' : '') +
        '<div class="tc-acts">' + (m ? '<a class="tc-mail" href="mailto:' + esc(m) + '" dir="ltr">' + ic('mail', 14) + ' ' + esc(m) + '</a><a class="tc-gm" href="https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(m) + '" target="_blank" rel="noopener noreferrer">' + esc(y.gmail) + ' ' + ic('arrow-up-right', 12) + '</a>' : '') +
        (t[4] ? '<a href="https://www.linkedin.com/in/' + t[4] + '" target="_blank" rel="noopener noreferrer">in LinkedIn</a>' : '') + '</div></article>';
    }).join('') + '</div>';
  }).join('');
  return '<h2 class="x-sr">' + esc(S.h) + '</h2>' + tabs + body;
}
function tchHtml() { return '<section class="detail-section" id="tch6">' + tchInner() + '</section>'; }
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-tcf]'); if (!b) return;
  st.tcf = b.getAttribute('data-tcf'); var el = document.getElementById('tch6'); if (el) el.innerHTML = tchInner();
});

/* ---------- Démarches ---------- */
var MESRS6 = 'https://www.mesrs.dz/fr/progres/', EMINHA6 = 'https://progres.mesrs.dz/eminha/login.checking';
function svc6Html() {
  var S = L2(SVCL);
  return '<section class="detail-section"><p class="sv-off">' + ic('check', 13) + ' ' + esc(S.off) + '</p><article class="xg-card lib-card"><h3>' + esc(LP('Inscription à la bibliothèque|Library Registration|التسجيل في المكتبة')) + '</h3><p>' + esc(LP('Inscrivez-vous en ligne pour accéder à la bibliothèque de l’école (09:00 – 15:30, carte d’étudiant obligatoire).|Register online to access the school library (09:00 – 15:30, student card required).|سجّل عبر الإنترنت للوصول إلى مكتبة المدرسة (09:00 – 15:30، بطاقة الطالب إلزامية).')) + '</p><a class="lib-btn" href="https://enstp.edu.dz/" target="_blank" rel="noopener noreferrer">' + esc(LP('S’inscrire en ligne à la bibliothèque|Register Online for Library Access|التسجيل في المكتبة عبر الإنترنت')) + ' ' + ic('arrow-up-right', 14) + '</a></article><div class="sv-list">' +
    SVC.filter(function (s) { return s[0] !== 'classroom' && !/^Abandon/.test(s[1]); }).map(function (s) {
      return '<details class="sv-item"><summary><span class="sv-b sv-' + s[0] + '">' + esc(S[s[0]]) + '</span><strong>' + esc(LP(s[1])) + '</strong></summary><ul>' + s[2].map(function (x) { return '<li>' + LP(x) + '</li>'; }).join('') + '</ul></details>';
    }).join('') +
    '<a class="sv-item sv-link" href="' + subHref('services', 's-bourse') + '"><span class="sv-b sv-admin">' + esc(S.admin) + '</span><strong>' + esc(T6().sBourse) + '</strong>' + ic('arrow-right', 15, 'rtl-flip') + '</a>' +
    '<a class="sv-item sv-link" href="' + subHref('services', 's-transfer') + '"><span class="sv-b sv-admin">' + esc(S.admin) + '</span><strong>' + esc(T6().sTransfer) + '</strong>' + ic('arrow-right', 15, 'rtl-flip') + '</a>' +
    '</div></section>';
}
/* bloc d'information : intro, étapes, listes, calendrier, liens */
function inf6(o) {
  var h = '';
  if (o.lead) h += '<p class="inf6-lead">' + o.lead + '</p>';
  if (o.cta) h += '<div class="inf6-cta">' + o.cta.map(function (c, i) { return '<a class="' + (i ? 'r5out' : 'r5btn') + '" href="' + c[1] + '" target="_blank" rel="noopener noreferrer">' + esc(c[0]) + ' ' + ic('arrow-up-right', 14) + '</a>'; }).join('') + '</div>';
  (o.blocks || []).forEach(function (b) {
    h += '<section class="inf6-s"><h3>' + (b.ic ? ic(b.ic, 18) : '') + '<span>' + esc(b.h) + '</span></h3>';
    if (b.steps) h += '<ol class="r5ol">' + b.steps.map(function (s) { return '<li><b>' + s[0] + '</b>' + (s[1] ? '<span>' + s[1] + '</span>' : '') + '</li>'; }).join('') + '</ol>';
    if (b.list) h += '<ul class="inf6-ul">' + b.list.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
    if (b.dates) h += '<div class="inf6-dates">' + b.dates.map(function (d) { return '<div><b>' + esc(d[0]) + '</b><span>' + esc(d[1]) + '</span></div>'; }).join('') + '</div>';
    if (b.p) h += '<p class="r5p">' + b.p + '</p>';
    h += '</section>';
  });
  if (o.note) h += '<p class="inf6-note">' + ic('info', 14) + ' ' + o.note + '</p>';
  return '<div class="inf6">' + h + '</div>';
}
function a6(href, txt) { return '<a href="' + href + '" target="_blank" rel="noopener noreferrer">' + esc(txt) + '</a>'; }
var BOURSE6 = {
  fr: { lead: 'La bourse universitaire est versée par les œuvres universitaires (ONOU) selon les revenus de la famille. La demande, le suivi et le renouvellement se font entièrement en ligne, sur la plateforme officielle PROGRES – e-Minha.',
    cta: [['S’inscrire sur PROGRES – e-Minha', EMINHA6], ['Le portail PROGRES du MESRS', MESRS6]],
    blocks: [
      { h: 'Les étapes', ic: 'check', steps: [['Se connecter à e-Minha', 'Avec vos identifiants PROGRES (ou, en première année, l’année et le matricule du bac).'], ['Ouvrir « Déposer la demande de bourse »', 'Le formulaire de demande s’affiche.'], ['Renseigner le dossier', 'Informations des parents, situation professionnelle, revenu annuel et numéro de compte CCP de l’étudiant.'], ['Joindre les justificatifs et valider', 'Gardez la preuve de dépôt (capture ou impression).'], ['Suivre la réponse', 'Sur la même plateforme : dossier incomplet (à compléter), accepté ou rejeté — un recours est possible pendant la période prévue.']] },
      { h: 'Documents à préparer', ic: 'file', list: ['Certificat de scolarité de l’année en cours (2026/2027)', 'Relevé de notes de l’année précédente (renouvellement)', 'Chèque barré du compte CCP au nom de l’étudiant', 'Justificatifs de revenus des parents (attestation de salaire, de non-activité ou de pension)'] },
      { h: 'Calendrier indicatif 2026/2027', ic: 'calendar', dates: [['1 – 15 septembre 2026', 'Dépôt des demandes — nouveaux étudiants'], ['16 – 30 septembre 2026', 'Traitement et résultats'], ['À partir du 1er octobre 2026', 'Renouvellement — anciens boursiers']] }
    ],
    note: 'Les dates sont fixées chaque année par les œuvres universitaires : vérifiez-les sur PROGRES avant de déposer. Une erreur dans le numéro CCP bloque le versement : relisez-le attentivement.' },
  en: { lead: 'The university grant is paid by the university services (ONOU) according to family income. Applying, tracking and renewing are all done online on the official PROGRES – e-Minha platform.',
    cta: [['Apply on PROGRES – e-Minha', EMINHA6], ['MESRS PROGRES portal', MESRS6]],
    blocks: [
      { h: 'Steps', ic: 'check', steps: [['Sign in to e-Minha', 'With your PROGRES credentials (or, in first year, your bac year and number).'], ['Open “Déposer la demande de bourse”', 'The application form opens.'], ['Fill in the file', 'Parents’ details, employment status, annual income and the student’s CCP account number.'], ['Attach the documents and submit', 'Keep the proof of submission (screenshot or print).'], ['Track the answer', 'On the same platform: incomplete (to complete), accepted or rejected — an appeal is possible during the set period.']] },
      { h: 'Documents to prepare', ic: 'file', list: ['School certificate for the current year (2026/2027)', 'Previous year’s transcript (renewal)', 'Crossed cheque of the student’s CCP account', 'Parents’ income documents (salary, no-activity or pension certificate)'] },
      { h: 'Indicative calendar 2026/2027', ic: 'calendar', dates: [['1 – 15 September 2026', 'Applications — new students'], ['16 – 30 September 2026', 'Processing and results'], ['From 1 October 2026', 'Renewal — current grant holders']] }
    ],
    note: 'Dates are set every year by the university services: check them on PROGRES before applying. A wrong CCP number blocks payment: double-check it.' },
  ar: { lead: 'تصرف الخدمات الجامعية (الديوان الوطني للخدمات الجامعية) المنحة الجامعية حسب دخل العائلة. يتم الطلب والمتابعة والتجديد كليًا عبر الإنترنت على المنصة الرسمية PROGRES – e-Minha.',
    cta: [['التسجيل على PROGRES – e-Minha', EMINHA6], ['بوابة PROGRES لوزارة التعليم العالي', MESRS6]],
    blocks: [
      { h: 'الخطوات', ic: 'check', steps: [['الدخول إلى e-Minha', 'ببيانات PROGRES (أو في السنة الأولى: سنة ورقم البكالوريا).'], ['اختيار « Déposer la demande de bourse »', 'تظهر استمارة الطلب.'], ['ملء الملف', 'معلومات الوالدين، الوضعية المهنية، الدخل السنوي ورقم الحساب البريدي الجاري للطالب.'], ['إرفاق الوثائق والتأكيد', 'احتفظ بما يثبت الإيداع.'], ['متابعة الرد', 'على نفس المنصة: ملف ناقص، مقبول أو مرفوض — الطعن ممكن خلال المدة المحددة.']] },
      { h: 'الوثائق', ic: 'file', list: ['شهادة مدرسية للسنة الجارية 2026/2027', 'كشف نقاط السنة الماضية (التجديد)', 'صك بريدي مشطوب باسم الطالب', 'وثائق دخل الوالدين'] },
      { h: 'الرزنامة التقريبية 2026/2027', ic: 'calendar', dates: [['1 – 15 سبتمبر 2026', 'إيداع الطلبات — الطلبة الجدد'], ['16 – 30 سبتمبر 2026', 'المعالجة والنتائج'], ['ابتداءً من 1 أكتوبر 2026', 'التجديد — الطلبة القدامى']] }
    ],
    note: 'تحدد الخدمات الجامعية التواريخ كل سنة: تحقق منها على PROGRES قبل الإيداع. خطأ في رقم الحساب البريدي يوقف الصب.' }
};
function bourse6Html() { return inf6(L2(BOURSE6)); }
var TRANSF6 = {
  fr: { lines: ['Via la plateforme en ligne du ' + a6(MESRS6, 'MESRS') + ', dans les délais.', 'Accord de l’université d’accueil requis, puis paiement des frais.', 'Quitus : réglez d’abord la bibliothèque, puis passez à l’administration avec votre carte.'],
    blocks: [
      { h: 'Transfert vers un autre établissement', ic: 'arrow-right', steps: [['Se connecter à PROGRES (WebEtu)', 'Menu « TRANSFERT » → « Enregistrer la demande de transfert », puis accepter les règles affichées.'], ['Choisir le type et le motif', 'Interne ou externe ; pour un transfert externe : mariage, changement de résidence de la famille… avec la pièce justificative.'], ['Indiquer l’établissement et la filière d’accueil', 'Puis imprimer la demande via « Consulter mes demandes de transfert ».'], ['Attendre l’accord', 'L’établissement d’accueil étudie la demande ; suivez la réponse sur PROGRES.']] },
      { h: 'Abandon des études', ic: 'file', list: ['Prévenez l’administration de votre département par une demande écrite.', 'Obtenez le quitus : bibliothèque d’abord, puis administration avec votre carte d’étudiant.', 'Pensez aux œuvres universitaires si vous êtes boursier ou résident.'] }
    ],
    note: 'Les périodes de transfert sont ouvertes une fois par an sur PROGRES (généralement en septembre) : sans demande en ligne dans les délais, aucun transfert n’est possible.' },
  en: { lines: ['Via the online ' + a6(MESRS6, 'MESRS') + ' platform, within the deadlines.', 'Approval of the target university required, then pay the fees.', 'Clearance: settle the library first, then visit administration with your card.'],
    blocks: [
      { h: 'Transfer to another institution', ic: 'arrow-right', steps: [['Sign in to PROGRES (WebEtu)', '“TRANSFERT” menu → “Enregistrer la demande de transfert”, then accept the rules.'], ['Choose the type and reason', 'Internal or external; for an external transfer: marriage, family move… with the supporting document.'], ['Pick the target institution and programme', 'Then print the request from “Consulter mes demandes de transfert”.'], ['Wait for approval', 'The receiving institution reviews the request; follow the answer on PROGRES.']] },
      { h: 'Withdrawing from studies', ic: 'file', list: ['Inform your department’s administration in writing.', 'Get your clearance: library first, then administration with your student card.', 'Remember the university services if you have a grant or a room.'] }
    ],
    note: 'Transfer windows open once a year on PROGRES (usually in September): without an online request in time, no transfer is possible.' },
  ar: { lines: ['عبر المنصة الرقمية لـ' + a6(MESRS6, 'وزارة التعليم العالي') + '، في الآجال المحددة.', 'يشترط قبول الجامعة المستقبِلة، ثم دفع الرسوم.', 'براءة الذمة: سوِّ وضعيتك مع المكتبة أولاً، ثم توجه إلى الإدارة ببطاقتك.'],
    blocks: [
      { h: 'التحويل إلى مؤسسة أخرى', ic: 'arrow-right', steps: [['الدخول إلى PROGRES (WebEtu)', 'قائمة « TRANSFERT » ثم « Enregistrer la demande de transfert » وقبول الشروط.'], ['اختيار النوع والسبب', 'داخلي أو خارجي؛ للتحويل الخارجي: زواج، تغيير إقامة العائلة… مع الوثيقة المبررة.'], ['تحديد المؤسسة والتخصص المستقبِل', 'ثم طباعة الطلب من « Consulter mes demandes de transfert ».'], ['انتظار الموافقة', 'تدرس المؤسسة المستقبِلة الطلب؛ تابع الرد على PROGRES.']] },
      { h: 'الانسحاب من الدراسة', ic: 'file', list: ['أبلغ إدارة قسمك بطلب كتابي.', 'احصل على براءة الذمة: المكتبة أولاً ثم الإدارة ببطاقة الطالب.', 'لا تنسَ الخدمات الجامعية إن كنت ممنوحًا أو مقيمًا.'] }
    ],
    note: 'تفتح فترات التحويل مرة في السنة على PROGRES (عادة في سبتمبر).' }
};
function transfer6Html() {
  var T = L2(TRANSF6);
  return '<ul class="inf6-first">' + T.lines.map(function (l) { return '<li>' + l + '</li>'; }).join('') + '</ul>' + inf6({ blocks: T.blocks, note: T.note });
}

/* ---------- Vie pratique : santé (dentiste en premier) ---------- */
function health6Html() {
  var r = R();
  return '<div class="r5collab"><span>' + esc(r.collab) + '</span><b>ENSTP 360 × Clinique dentaire Merzak Smile Kouba</b><a class="r5btn" href="https://maps.app.goo.gl/NFPQQDGWjskr1Ex4A?g_st=iw" target="_blank" rel="noopener">' + ic('map-pin', 15) + ' ' + esc(r.loc) + ' ' + ic('arrow-up-right', 14) + '</a></div>' + oldSub('pratique', 'v-health');
}

/* ---------- Vie pratique : transport (ENSTP Go, à l'esthétique du site) ---------- */
var TRL6 = {
  fr: { lead: 'Bus universitaires COUS avec la carte d’étudiant, lignes ETUSA vers le centre d’Alger : tous les horaires au même endroit.', cous: 'Bus universitaires · COUS', etusa: 'Lignes ETUSA', fixed: 'Départs à heure fixe', loop: 'Navettes en continu', search: 'Rechercher une destination, une ligne…', all: 'Toutes', next: 'Prochain départ', none: 'Aucun résultat pour cette recherche.', inMin: 'dans', tips: 'Bon à savoir', card: 'Carte d’étudiant ENSTP obligatoire', from: 'Départ', single: 'Départ unique', every: 'Chaque 1 h', loading: 'Chargement des horaires…', dep: 'départs', today: 'Plus de départ aujourd’hui' },
  en: { lead: 'COUS student buses with your student card, ETUSA lines to central Algiers: every timetable in one place.', cous: 'Student buses · COUS', etusa: 'ETUSA lines', fixed: 'Fixed departures', loop: 'Continuous shuttles', search: 'Search a destination, a line…', all: 'All', next: 'Next departure', none: 'No result for this search.', inMin: 'in', tips: 'Good to know', card: 'ENSTP student card required', from: 'From', single: 'Single departure', every: 'Every hour', loading: 'Loading timetables…', dep: 'departures', today: 'No more departures today' },
  ar: { lead: 'حافلات الخدمات الجامعية COUS ببطاقة الطالب، وخطوط ETUSA نحو وسط العاصمة: كل المواقيت في مكان واحد.', cous: 'حافلات الطلبة · COUS', etusa: 'خطوط ETUSA', fixed: 'انطلاقات بمواعيد ثابتة', loop: 'رحلات متواصلة', search: 'ابحث عن وجهة أو خط…', all: 'الكل', next: 'الانطلاق القادم', none: 'لا توجد نتائج.', inMin: 'بعد', tips: 'معلومات مفيدة', card: 'بطاقة الطالب إلزامية', from: 'الانطلاق', single: 'انطلاق واحد', every: 'كل ساعة', loading: 'جارٍ تحميل المواقيت…', dep: 'انطلاقات', today: 'لا انطلاقات أخرى اليوم' }
};
var TR6 = { op: 'cous', q: '', line: 'ALL' };
function transport6Html() {
  var r = R(), L = L2(TRL6), tr = G6('transport'), ll = GMP.school.join(',');
  return '<p class="inf6-lead">' + esc(L.lead) + '</p>' +
    '<div class="tr6" id="tr6"><div class="tr6-seg" role="tablist">' + [['cous', L.cous, 'bus'], ['etusa', L.etusa, 'map-pin']].map(function (o) { return '<button type="button" role="tab" data-trop="' + o[0] + '" aria-selected="' + (TR6.op === o[0]) + '" class="' + (TR6.op === o[0] ? 'on' : '') + '">' + ic(o[2], 16) + esc(o[1]) + '</button>'; }).join('') + '</div>' +
    '<label class="tr6-q">' + ic('search', 16) + '<input id="tr6-q" type="search" autocomplete="off" placeholder="' + esc(L.search) + '" value="' + esc(TR6.q) + '"></label><div id="tr6-body">' + tr6Body() + '</div></div>' +
    '<h3 class="tr6-h">' + esc(L.tips) + '</h3><div class="r5grid3">' + tr.sections.map(function (s) { return box('<h4>' + esc(s.title) + '</h4><p>' + esc(s.text) + '</p>'); }).join('') + '</div>' +
    '<div class="r5acts"><a class="r5btn" href="https://www.google.com/maps/dir/?api=1&destination=' + ll + '&travelmode=transit" target="_blank" rel="noopener">' + ic('bus', 15) + ' ' + esc(r.transit) + '</a><a class="r5out" href="' + mapsUrl('arrêt de bus ENSTP Kouba Alger') + '" target="_blank" rel="noopener">' + ic('map-pin', 15) + ' ' + esc(r.stops) + '</a><a class="r5out" href="' + gl('transport') + '">' + esc(r.travel) + ' ' + ic('arrow-right', 14, 'rtl-flip') + '</a></div>';
}
function trHit(arr) { var q = TR6.q.toLowerCase().trim(); if (!q) return true; return arr.some(function (s) { return String(s).toLowerCase().indexOf(q) >= 0; }); }
function tr6Body() {
  var D6 = window.TH_DATA, L = L2(TRL6), l = lang === 'ar' ? 'ar' : lang === 'en' ? 'en' : 'fr', now = algNow().min, h = '';
  if (!D6) return '<p class="ed-note">' + esc(L.loading) + '</p>';
  if (TR6.op === 'cous') {
    var fx = D6.cous.filter(function (x) { return trHit(x.destinations[l].concat(x.destinations.fr, [x.time])); }).slice().sort(function (a, b) { return t2mm(a.time) - t2mm(b.time); });
    var cn = D6.loop.filter(function (x) { return trHit(x.destinations[l].concat(x.destinations.fr, [x.window])); });
    if (fx.length) h += '<h4 class="tr6-k">' + esc(L.fixed) + '</h4><div class="tr6-list">' + fx.map(function (x) {
      var t = t2mm(x.time), soon = t > now && t - now <= 90;
      return '<article class="tr6-row' + (soon ? ' soon' : '') + '"><div class="tr6-t" dir="ltr"><b>' + esc(x.time) + '</b><small>' + esc(x.frequency[l]) + '</small>' + (soon ? '<em>' + esc(L.inMin) + ' ' + (t - now) + ' min</em>' : '') + '</div><div class="tr6-d">' + x.destinations[l].map(function (d) { return '<span>' + esc(d) + '</span>'; }).join('') + '</div></article>';
    }).join('') + '</div>';
    if (cn.length) h += '<h4 class="tr6-k">' + esc(L.loop) + '</h4><div class="tr6-list">' + cn.map(function (x) {
      var w = x.window.split(' - '), on = now >= t2mm(w[0]) && now <= t2mm(w[1]);
      return '<article class="tr6-row' + (on ? ' live' : '') + '"><div class="tr6-t" dir="ltr"><b>' + esc(x.window.replace(' - ', ' – ')) + '</b><small>' + esc(L.loop) + '</small></div><div class="tr6-d">' + x.destinations[l].map(function (d) { return '<span>' + esc(d) + '</span>'; }).join('') + '</div></article>';
    }).join('') + '</div>';
    if (h) h = '<p class="tr6-card">' + ic('check', 13) + ' ' + esc(L.card) + '</p>' + h;
  } else {
    var ids = ['ALL'].concat(D6.etusa.map(function (x) { return x.id; }));
    h += '<div class="tr6-pills">' + ids.map(function (id) { var x = D6.etusa.filter(function (y) { return y.id === id; })[0]; return '<button type="button" data-trline="' + id + '" class="' + (TR6.line === id ? 'on' : '') + '">' + (id === 'ALL' ? esc(L.all) : esc(x.code[l])) + '</button>'; }).join('') + '</div>';
    h += D6.etusa.filter(function (x) { return (TR6.line === 'ALL' || TR6.line === x.id) && trHit([x.id, x.code[l], x.terminals[l].A, x.terminals[l].B, x.terminals.fr.A, x.terminals.fr.B]); }).map(function (x) {
      var dir = function (from, to, arr) {
        arr = arr || []; var nx = arr.filter(function (t) { return t2mm(t) >= now; })[0];
        return '<div class="tr6-dir"><div class="tr6-dh"><b>' + esc(from) + '</b>' + ic('arrow-right', 14, 'rtl-flip') + '<b>' + esc(to) + '</b>' + (arr.length ? '<span class="tr6-nx">' + (nx ? esc(L.next) + ' · <b dir="ltr">' + nx + '</b> · ' + esc(L.inMin) + ' ' + (t2mm(nx) - now) + ' min' : esc(L.today)) + '</span>' : '') + '</div>' +
          (arr.length ? '<div class="tr6-times" dir="ltr">' + arr.map(function (t) { return '<span class="' + (t === nx ? 'nx' : t2mm(t) < now ? 'past' : '') + '">' + t + '</span>'; }).join('') + '</div>' : '') + '</div>';
      };
      return '<article class="tr6-line"><header><span class="tr6-id">' + esc(x.id.replace('-2', '')) + '</span><div><b>' + esc(x.code[l]) + '</b>' + (x.note ? '<small>' + esc(x.note[l]) + '</small>' : '') + '</div></header>' +
        dir(x.terminals[l].A, x.terminals[l].B, x.departuresA) + dir(x.terminals[l].B, x.terminals[l].A, x.departuresB) + '</article>';
    }).join('');
  }
  return h || '<p class="ed-note">' + esc(L.none) + '</p>';
}
function tr6Refresh() { var b = document.getElementById('tr6-body'); if (b) b.innerHTML = tr6Body(); }
document.addEventListener('th-ready', tr6Refresh);
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-trop],[data-trline]'); if (!b) return;
  if (b.hasAttribute('data-trop')) { TR6.op = b.getAttribute('data-trop'); TR6.line = 'ALL'; Array.prototype.forEach.call(document.querySelectorAll('[data-trop]'), function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-selected', String(on)); }); }
  else TR6.line = b.getAttribute('data-trline');
  tr6Refresh();
});
document.addEventListener('input', function (e) { if (e.target && e.target.id === 'tr6-q') { TR6.q = e.target.value; tr6Refresh(); } });

/* ---------- Clubs, sport & sorties : réservation SSC ---------- */
var SSC6 = { hours: [17, 18], slot: { 17: '17h – 18h30', 18: '18h30 – 19h30' }, smin: { 17: 1020, 18: 1110 }, off: [5, 6], wa: '213552933001', day: 0, locks: [], acts: [], state: 'idle', pick: null, msg: '' };
var SSCL = {
  fr: { h: 'Réserver un créneau', p: 'Terrain de football du SSC · un créneau = une seule réservation. Ta demande est verrouillée tout de suite puis confirmée par l’administration du SSC. Réservations du dimanche au jeudi.', free: 'Libre', full: 'Réservé', load: 'Chargement des créneaux…', err: 'Impossible de charger les créneaux pour le moment.', retry: 'Réessayer', ln: 'Nom', fn: 'Prénom', cl: 'Classe / année d’étude', send: 'Envoyer la demande', cancel: 'Annuler', taken: 'Ce créneau vient d’être pris. Choisis-en un autre.', ok: 'Demande enregistrée : ton créneau est verrouillé, en attente de confirmation par le SSC.', wa: 'Prévenir le SSC sur WhatsApp', prog: 'Au programme du SSC', join: 'Participer', choose: 'Choisis un créneau libre', days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'], dl: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'] },
  en: { h: 'Book a slot', p: 'SSC football pitch · one slot = one booking. Your request is locked at once, then confirmed by the SSC team. Bookings Sunday to Thursday.', free: 'Free', full: 'Booked', load: 'Loading slots…', err: 'Slots cannot be loaded right now.', retry: 'Retry', ln: 'Last name', fn: 'First name', cl: 'Class / year', send: 'Send the request', cancel: 'Cancel', taken: 'This slot was just taken. Pick another one.', ok: 'Request saved: your slot is locked, waiting for SSC confirmation.', wa: 'Tell the SSC on WhatsApp', prog: 'On the SSC programme', join: 'Join', choose: 'Pick a free slot', days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], dl: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
  ar: { h: 'احجز حصة', p: 'ملعب كرة القدم لـ SSC · حصة واحدة = حجز واحد. يُقفل طلبك فورًا ثم تؤكده إدارة SSC. الحجز من الأحد إلى الخميس.', free: 'متاح', full: 'محجوز', load: 'جارٍ تحميل الحصص…', err: 'تعذر تحميل الحصص حاليًا.', retry: 'إعادة المحاولة', ln: 'اللقب', fn: 'الاسم', cl: 'القسم / السنة', send: 'إرسال الطلب', cancel: 'إلغاء', taken: 'تم حجز هذه الحصة للتو. اختر غيرها.', ok: 'تم تسجيل الطلب: حصتك مقفلة في انتظار تأكيد SSC.', wa: 'أبلغ SSC عبر واتساب', prog: 'في برنامج SSC', join: 'شارك', choose: 'اختر حصة متاحة', days: ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'], dl: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'] }
};
function sscDays() {
  var out = [], a = algNow(), base = new Date(a.date + 'T00:00:00');
  for (var i = 0; i < 14; i++) { var d = new Date(base); d.setDate(base.getDate() + i); if (SSC6.off.indexOf(d.getDay()) === -1) out.push(d); }
  return out;
}
function dkey(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
function sport6Html() {
  var r = R();
  return '<div class="r5ssc"><img src="images/ssc.jpg" alt="SSC" width="84" height="84" loading="lazy"><div><b>' + esc(r.ssc) + '</b><p>' + esc(r.sscP) + '</p><a class="r5btn" href="https://zwfh6trskt-bot.github.io/SSC/" target="_blank" rel="noopener">' + esc(r.sscB) + ' ' + ic('arrow-up-right', 14) + '</a></div></div>' +
    '<section class="ssc6" id="ssc6" aria-live="polite">' + sscInner() + '</section>' + spHtml();
}
function sscInner() {
  var L = L2(SSCL), days = sscDays(), a = algNow();
  if (SSC6.day >= days.length) SSC6.day = 0;
  var h = '<div class="ssc6-hd"><div><span class="eyebrow">SSC · Football</span><h3>' + esc(L.h) + '</h3><p>' + esc(L.p) + '</p></div></div>';
  if (SSC6.state === 'loading' || SSC6.state === 'idle') return h + '<p class="ed-note">' + esc(L.load) + '</p>';
  if (SSC6.state === 'error') return h + '<p class="ed-note">' + esc(L.err) + ' <button type="button" class="lnk" data-sscretry="1">' + esc(L.retry) + '</button></p>';
  var d = days[SSC6.day], k = dkey(d);
  h += '<div class="ssc6-days" role="tablist">' + days.map(function (x, i) { return '<button type="button" role="tab" aria-selected="' + (i === SSC6.day) + '" class="' + (i === SSC6.day ? 'on' : '') + '" data-sscd="' + i + '"><small>' + esc(L.days[x.getDay()]) + '</small><b>' + x.getDate() + '</b></button>'; }).join('') + '</div>';
  h += '<div class="ssc6-slots">' + SSC6.hours.map(function (hr) {
    var lk = SSC6.locks.filter(function (l) { return l.slot_date === k && +l.slot_hour === hr; })[0];
    var past = k === a.date && a.min >= SSC6.smin[hr], full = !!lk || past, pick = SSC6.pick && SSC6.pick.k === k && SSC6.pick.h === hr;
    return '<div class="ssc6-slot ' + (full ? 'full' : 'free') + (pick ? ' pick' : '') + '"' + (full ? '' : ' role="button" tabindex="0" data-sscb="' + k + '|' + hr + '"') + '><b dir="ltr">' + esc(SSC6.slot[hr]) + '</b><span class="st6 ' + (full ? 'closed' : 'open') + '">' + esc(full ? L.full : L.free) + '</span>' + (lk && lk.label ? '<small>' + esc(lk.label) + '</small>' : '') + '</div>';
  }).join('') + '</div>';
  if (SSC6.pick) {
    var p = SSC6.pick, pd = new Date(p.k + 'T00:00:00');
    h += '<form class="ssc6-form" id="ssc6-form"><p><b>' + esc(L.dl[pd.getDay()] + ' ' + pd.getDate() + '/' + pad2(pd.getMonth() + 1)) + '</b> · <span dir="ltr">' + esc(SSC6.slot[p.h]) + '</span></p>' +
      '<div class="ssc6-f"><input name="ln" required maxlength="40" placeholder="' + esc(L.ln) + '" autocomplete="family-name"><input name="fn" required maxlength="40" placeholder="' + esc(L.fn) + '" autocomplete="given-name"><input name="cl" required maxlength="40" placeholder="' + esc(L.cl) + '"></div>' +
      (SSC6.msg ? '<p class="ssc6-err" role="alert">' + esc(SSC6.msg) + '</p>' : '') + '<div class="r5acts"><button class="r5btn" type="submit">' + esc(L.send) + '</button><button class="r5out" type="button" data-ssccancel="1">' + esc(L.cancel) + '</button></div></form>';
  } else if (SSC6.done) {
    h += '<div class="ssc6-ok"><p>' + ic('check', 16) + ' ' + esc(L.ok) + '</p><a class="r5out" href="https://wa.me/' + SSC6.wa + '?text=' + encodeURIComponent(SSC6.done) + '" target="_blank" rel="noopener">' + ic('message', 15) + ' ' + esc(L.wa) + '</a></div>';
  } else h += '<p class="ed-note">' + esc(L.choose) + '</p>';
  var acts = SSC6.acts.filter(function (x) { return x.activity_date >= a.date; }).slice(0, 4);
  if (acts.length) h += '<h4 class="ssc6-ph">' + esc(L.prog) + '</h4><div class="ssc6-acts">' + acts.map(function (x) { var dd = new Date(x.activity_date + 'T00:00:00'); return '<div><span class="st6 ' + (x.status === 'OPEN' ? 'open' : 'closed') + '">' + esc(x.status) + '</span><b>' + esc(x.name) + '</b><small>' + esc(L.dl[dd.getDay()] + ' ' + dd.getDate() + '/' + pad2(dd.getMonth() + 1) + ' · ' + String(x.start_time || '').slice(0, 5) + ' · ' + (x.location || '')) + '</small>' + (x.status === 'OPEN' ? '<a href="https://wa.me/' + SSC6.wa + '?text=' + encodeURIComponent('Bonjour SSC ! Je souhaite participer à l’activité ' + x.name + ' du ' + x.activity_date + '.') + '" target="_blank" rel="noopener">' + esc(L.join) + ' ' + ic('arrow-up-right', 12) + '</a>' : '') + '</div>'; }).join('') + '</div>';
  return h;
}
function sscPaint() { var el = document.getElementById('ssc6'); if (el) el.innerHTML = sscInner(); }
function sscLoad() {
  if (SSC6.state !== 'ready') { SSC6.state = 'loading'; sscPaint(); }
  Promise.all([sbReq('slot_locks?select=*'), sbReq('activities?select=*&order=activity_date,start_time').catch(function () { return []; })]).then(function (r) {
    SSC6.locks = r[0] || []; SSC6.acts = r[1] || []; SSC6.state = 'ready'; sscPaint();
  }).catch(function () { SSC6.state = 'error'; sscPaint(); });
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-sscd],[data-sscb],[data-ssccancel],[data-sscretry]'); if (!b) return;
  if (b.hasAttribute('data-sscd')) { SSC6.day = +b.getAttribute('data-sscd'); SSC6.pick = null; SSC6.msg = ''; SSC6.done = null; }
  else if (b.hasAttribute('data-sscb')) { var p = b.getAttribute('data-sscb').split('|'); SSC6.pick = { k: p[0], h: +p[1] }; SSC6.msg = ''; SSC6.done = null; }
  else if (b.hasAttribute('data-ssccancel')) { SSC6.pick = null; SSC6.msg = ''; }
  else if (b.hasAttribute('data-sscretry')) { sscLoad(); return; }
  sscPaint();
  var f = document.querySelector('#ssc6-form input'); if (f && b.hasAttribute('data-sscb')) f.focus();
});
document.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target && e.target.hasAttribute && e.target.hasAttribute('data-sscb')) e.target.click(); });
document.addEventListener('submit', function (e) {
  if (!e.target || e.target.id !== 'ssc6-form') return;
  e.preventDefault();
  var f = e.target, v = { ln: f.ln.value.trim(), fn: f.fn.value.trim(), cl: f.cl.value.trim() }, p = SSC6.pick, L = L2(SSCL), btn = f.querySelector('button[type=submit]');
  if (!p || !v.ln || !v.fn || !v.cl) return;
  btn.disabled = true;
  sbReq('rpc/book_slot', { p_date: p.k, p_hour: p.h, p_first: v.fn, p_last: v.ln, p_class: v.cl }).then(function () {
    SSC6.done = 'Bonjour SSC ! J’ai demandé le créneau football du ' + p.k + ' (' + SSC6.slot[p.h] + ') (' + v.ln + ' ' + v.fn + ', ' + v.cl + ').';
    SSC6.pick = null; SSC6.msg = ''; sscLoad();
  }).catch(function (er) {
    SSC6.msg = /slot_taken/.test(er.message) ? L.taken : (L.err + ' (' + er.message + ')'); btn.disabled = false; sscLoad();
  });
});

/* ---------- Résidences ---------- */
function men6Html() { return '<h2 class="rs6-name">' + esc(L2(RESL).h) + '</h2>' + resHtml(); }
var WRES6 = [
  { n: ['Résidence universitaire du Ruisseau', 'Le Ruisseau university residence', 'الإقامة الجامعية لوروسو'], loc: ['Le Ruisseau, Alger', 'Le Ruisseau, Algiers', 'لوروسو، الجزائر العاصمة'], url: 'https://maps.app.goo.gl/NhHVa9ySysMMoqEk8?g_st=ic', photo: '' },
  { n: ['Résidence universitaire de Saïd Hamdine', 'Saïd Hamdine university residence', 'الإقامة الجامعية سعيد حمدين'], loc: ['Saïd Hamdine, Alger · localisation exacte à ajouter', 'Saïd Hamdine, Algiers · exact location to be added', 'سعيد حمدين، الجزائر العاصمة · الموقع الدقيق سيُضاف'], url: '', q: 'Résidence universitaire Saïd Hamdine Alger', photo: '' },
  { n: ['Résidence universitaire de Sidi Abdellah', 'Sidi Abdellah university residence', 'الإقامة الجامعية سيدي عبد الله'], loc: ['Sidi Abdellah, Alger · localisation exacte à ajouter', 'Sidi Abdellah, Algiers · exact location to be added', 'سيدي عبد الله، الجزائر العاصمة · الموقع الدقيق سيُضاف'], url: '', q: 'Résidence universitaire Sidi Abdellah Alger', photo: '' }
];
function resArt(i) {
  /* illustration en attendant une photo (images/residences/…) */
  var hues = [['#0f2a5a', '#23417a'], ['#1d3b6e', '#2f5596'], ['#14325f', '#3a5a8f']][i % 3];
  return '<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="wr' + i + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + hues[0] + '"/><stop offset="1" stop-color="' + hues[1] + '"/></linearGradient></defs><rect width="320" height="180" fill="url(#wr' + i + ')"/>' +
    '<circle cx="262" cy="44" r="18" fill="#e9b64a" opacity=".9"/><g fill="none" stroke="#ffffff" stroke-opacity=".22"><path d="M0 150h320"/><path d="M0 120h320" stroke-dasharray="2 6"/></g>' +
    '<g fill="#ffffff" fill-opacity=".1" stroke="#fff" stroke-opacity=".35"><rect x="44" y="64" width="88" height="86" rx="2"/><rect x="138" y="44" width="70" height="106" rx="2"/><rect x="214" y="84" width="62" height="66" rx="2"/></g>' +
    '<g fill="#f6dc9c" fill-opacity=".75">' + [0, 1, 2, 3].map(function (r) { return [0, 1, 2].map(function (c) { return '<rect x="' + (56 + c * 26) + '" y="' + (76 + r * 18) + '" width="12" height="8" rx="1"/>'; }).join(''); }).join('') + [0, 1, 2, 3, 4].map(function (r) { return [0, 1].map(function (c) { return '<rect x="' + (152 + c * 26) + '" y="' + (56 + r * 18) + '" width="12" height="8" rx="1"/>'; }).join(''); }).join('') + '</g></svg>';
}
function women6Html() {
  var li = lang === 'ar' ? 2 : lang === 'en' ? 1 : 0, r = R(), btn = L3('Voir sur Google Maps', 'View on Google Maps', 'عرض على خرائط Google');
  return '<div class="wr6">' + WRES6.map(function (w, i) {
    var url = w.url || mapsUrl(w.q);
    return '<article class="wr6-card"><figure>' + resArt(i) + (w.photo ? '<img src="' + w.photo + '" alt="' + esc(w.n[li]) + '" loading="lazy" onerror="this.remove()">' : '') + '<span class="wr6-n">' + pad2(i + 1) + '</span></figure>' +
      '<div class="wr6-b"><h3>' + esc(w.n[li]) + '</h3><p>' + ic('map-pin', 14) + ' ' + esc(w.loc[li]) + '</p><a class="r5btn" href="' + url + '" target="_blank" rel="noopener">' + ic('map-pin', 15) + ' ' + esc(btn) + ' ' + ic('arrow-up-right', 13) + '</a></div></article>';
  }).join('') + '</div>';
}
var HOW6 = {
  fr: { lead: 'L’hébergement en résidence universitaire est demandé en ligne, sur la plateforme des œuvres universitaires (ONOU), puis confirmé par le paiement des droits.',
    cta: [['Plateforme officielle d’hébergement', 'https://webonou.mesrs.dz/'], ['PROGRES · WebEtu', 'https://progres.mesrs.dz/webetu/']],
    blocks: [
      { h: 'Conditions d’éligibilité', ic: 'check', list: ['Habiter à au moins <b>50 km</b> de l’école pour les garçons, <b>30 km</b> pour les filles.', 'Avoir <b>28 ans au plus</b>.', 'Être inscrit pour l’année en cours, frais d’inscription payés.', 'Ne pas avoir abandonné ses études l’année précédente ni accumuler plus de quatre semestres de retard.', 'Ne pas préparer un second diplôme, ne pas avoir d’activité rémunérée et ne pas disposer déjà d’une chambre dans une autre résidence.'] },
      { h: 'Les étapes de l’inscription', ic: 'arrow-right', steps: [['Se connecter à la plateforme d’hébergement', 'Avec ses identifiants PROGRES (matricule du bac et mot de passe pour les nouveaux).'], ['Choisir sa daïra et sa commune de résidence', 'C’est ce qui permet de vérifier la distance.'], ['Choisir jusqu’à trois résidences', 'Par ordre de préférence, puis « Valider ma demande d’hébergement ».'], ['Consulter l’affectation', 'Le résultat s’affiche sur la même plateforme.'], ['Payer les droits en ligne', '400 DA par carte Edahabia ; la carte de résidence électronique apparaît ensuite dans PROGRES WebEtu.'], ['Se présenter à la résidence', 'Avec les documents ci-dessous, dans les délais indiqués.']] },
      { h: 'Documents nécessaires', ic: 'file', list: ['Reçu de la demande et reçu de paiement des droits', 'Certificat de scolarité ou carte d’étudiant de l’année', 'Deux certificats médicaux (médecine générale et pneumo-phtisiologie)', 'Quatre photos d’identité', 'Justificatif de résidence (certificat de résidence)'] },
      { h: 'Délais d’inscription', ic: 'calendar', dates: [['5 – 10 août 2026', 'Dépôt des demandes (nouveaux bacheliers)'], ['13 – 17 août 2026', 'Traitement des demandes'], ['18 – 20 août 2026', 'Paiement des droits en ligne']] }
    ],
    note: 'Calendrier 2026 communiqué pour les nouveaux étudiants ; les anciens résidents renouvellent selon les dates de la Direction des œuvres universitaires. Vérifiez toujours sur la plateforme officielle.' },
  en: { lead: 'A room in a university residence is requested online on the university services (ONOU) platform, then confirmed by paying the fee.',
    cta: [['Official housing platform', 'https://webonou.mesrs.dz/'], ['PROGRES · WebEtu', 'https://progres.mesrs.dz/webetu/']],
    blocks: [
      { h: 'Eligibility', ic: 'check', list: ['Live at least <b>50 km</b> from the school (men) or <b>30 km</b> (women).', 'Be <b>28 or younger</b>.', 'Be enrolled for the current year, fees paid.', 'Not have dropped out last year nor be more than four semesters behind.', 'Not be preparing a second degree, not have a paid job and not already hold a room in another residence.'] },
      { h: 'Steps', ic: 'arrow-right', steps: [['Sign in to the housing platform', 'With your PROGRES credentials (bac number and password for new students).'], ['Choose your daïra and municipality', 'This is how the distance is checked.'], ['Choose up to three residences', 'In order of preference, then “Valider ma demande d’hébergement”.'], ['Check your assignment', 'The result appears on the same platform.'], ['Pay the fee online', '400 DA with an Edahabia card; the electronic residence card then appears in PROGRES WebEtu.'], ['Go to the residence', 'With the documents below, within the deadlines.']] },
      { h: 'Documents', ic: 'file', list: ['Request receipt and fee receipt', 'School certificate or student card for the year', 'Two medical certificates (general practice and chest/TB)', 'Four ID photos', 'Proof of residence (certificat de résidence)'] },
      { h: 'Deadlines', ic: 'calendar', dates: [['5 – 10 Aug 2026', 'Applications (new students)'], ['13 – 17 Aug 2026', 'Processing'], ['18 – 20 Aug 2026', 'Online fee payment']] }
    ],
    note: '2026 calendar announced for new students; current residents renew according to the university services’ dates. Always check the official platform.' },
  ar: { lead: 'يُطلب الإيواء في الإقامة الجامعية عبر الإنترنت على منصة الخدمات الجامعية، ثم يُؤكد بدفع الحقوق.',
    cta: [['المنصة الرسمية للإيواء', 'https://webonou.mesrs.dz/'], ['PROGRES · WebEtu', 'https://progres.mesrs.dz/webetu/']],
    blocks: [
      { h: 'شروط الاستفادة', ic: 'check', list: ['السكن على بعد <b>50 كلم</b> على الأقل من المدرسة للذكور و<b>30 كلم</b> للإناث.', 'ألا يتجاوز السن <b>28 سنة</b>.', 'التسجيل في السنة الجارية ودفع حقوق التسجيل.', 'عدم الانقطاع عن الدراسة في السنة الماضية وعدم التأخر بأكثر من أربعة سداسيات.', 'عدم تحضير شهادة ثانية، عدم ممارسة نشاط مأجور وعدم الاستفادة من غرفة في إقامة أخرى.'] },
      { h: 'خطوات التسجيل', ic: 'arrow-right', steps: [['الدخول إلى منصة الإيواء', 'ببيانات PROGRES.'], ['اختيار الدائرة والبلدية', 'لحساب المسافة.'], ['اختيار ثلاث إقامات كحد أقصى', 'حسب الأولوية ثم « Valider ma demande d’hébergement ».'], ['الاطلاع على التوجيه', 'على نفس المنصة.'], ['دفع الحقوق عبر الإنترنت', '400 دج بالبطاقة الذهبية؛ تظهر بطاقة الإقامة الإلكترونية في PROGRES WebEtu.'], ['التوجه إلى الإقامة', 'بالوثائق المذكورة أدناه.']] },
      { h: 'الوثائق المطلوبة', ic: 'file', list: ['وصل الطلب ووصل الدفع', 'شهادة مدرسية أو بطاقة الطالب', 'شهادتان طبيتان (عامة وصدرية)', 'أربع صور شمسية', 'شهادة الإقامة'] },
      { h: 'الآجال', ic: 'calendar', dates: [['5 – 10 أوت 2026', 'إيداع الطلبات (الطلبة الجدد)'], ['13 – 17 أوت 2026', 'معالجة الطلبات'], ['18 – 20 أوت 2026', 'دفع الحقوق عبر الإنترنت']] }
    ],
    note: 'رزنامة 2026 الخاصة بالطلبة الجدد؛ يجدد القدامى حسب تواريخ مديرية الخدمات الجامعية. تحقق دائمًا من المنصة الرسمية.' }
};
function howto6Html() { return inf6(L2(HOW6)); }
var RTR6 = {
  fr: { lead: 'Changer de résidence en cours d’année est possible dans certains cas, sur décision de la Direction des œuvres universitaires (DOU), selon les places disponibles.',
    blocks: [
      { h: 'Conditions de transfert', ic: 'check', list: ['Avoir une affectation valide et les droits d’hébergement payés.', 'Un motif sérieux et justifié : changement d’établissement ou de lieu d’études, raison de santé, situation familiale.', 'Une place disponible dans la résidence demandée (accord de la résidence d’accueil).', 'Aucune sanction ni dette envers la résidence actuelle.'] },
      { h: 'Les étapes', ic: 'arrow-right', steps: [['Se renseigner', 'Auprès de l’administration de votre résidence : période d’ouverture et formulaire éventuel.'], ['Déposer une demande écrite et motivée', 'Adressée au directeur de la résidence (ou de la DOU), avec les justificatifs.'], ['Accord des deux résidences', 'La résidence de départ et celle d’accueil donnent leur avis ; la DOU décide.'], ['Quitus de départ', 'Remise des clés et état des lieux dans la résidence actuelle.'], ['Installation', 'Présentez la décision et votre carte à la nouvelle résidence.']] },
      { h: 'Documents justificatifs', ic: 'file', list: ['Demande manuscrite motivée', 'Carte d’étudiant ou certificat de scolarité', 'Carte de résidence ou reçu de paiement des droits', 'Justificatif du motif : attestation de transfert pédagogique, certificat médical, document familial…', 'Quitus de la résidence de départ'] },
      { h: 'Délais et suivi', ic: 'calendar', list: ['Déposez la demande dès la rentrée (septembre – octobre) ou dès que le motif apparaît.', 'Le délai de réponse dépend des places : relancez l’administration après une à deux semaines.', 'Gardez une copie de la demande avec la date de dépôt et, si possible, un accusé de réception.', 'En attendant la décision, vous restez dans votre résidence actuelle.'] }
    ],
    note: 'Les modalités exactes sont fixées par la DOU et peuvent changer d’une année à l’autre : vérifiez auprès de l’administration de votre résidence avant de déposer.' },
  en: { lead: 'Moving to another residence during the year is possible in some cases, by decision of the university services directorate (DOU), depending on available places.',
    blocks: [
      { h: 'Conditions', ic: 'check', list: ['Have a valid assignment and paid housing fees.', 'A serious, documented reason: change of institution or place of study, health, family situation.', 'A free place in the requested residence (approval of the receiving residence).', 'No sanction or debt with your current residence.'] },
      { h: 'Steps', ic: 'arrow-right', steps: [['Ask first', 'At your residence administration: opening period and possible form.'], ['Submit a written, reasoned request', 'To the residence (or DOU) director, with supporting documents.'], ['Approval of both residences', 'The current and receiving residences give their opinion; the DOU decides.'], ['Leaving clearance', 'Return the keys and check-out inventory at your current residence.'], ['Move in', 'Show the decision and your card at the new residence.']] },
      { h: 'Supporting documents', ic: 'file', list: ['Handwritten reasoned request', 'Student card or school certificate', 'Residence card or fee receipt', 'Proof of the reason: transfer certificate, medical certificate, family document…', 'Clearance from the current residence'] },
      { h: 'Timing and follow-up', ic: 'calendar', list: ['Apply at the start of the year (September – October) or as soon as the reason arises.', 'Answer times depend on places: follow up after one to two weeks.', 'Keep a dated copy of your request and, if possible, an acknowledgement.', 'Until the decision, you stay in your current residence.'] }
    ],
    note: 'Exact rules are set by the DOU and may change every year: check with your residence administration before applying.' },
  ar: { lead: 'يمكن تغيير الإقامة خلال السنة في بعض الحالات بقرار من مديرية الخدمات الجامعية، حسب الأماكن المتوفرة.',
    blocks: [
      { h: 'شروط التحويل', ic: 'check', list: ['توجيه صالح ودفع حقوق الإيواء.', 'سبب جدي ومبرر: تغيير المؤسسة أو مكان الدراسة، سبب صحي، وضعية عائلية.', 'مكان شاغر في الإقامة المطلوبة (موافقة الإقامة المستقبِلة).', 'عدم وجود عقوبة أو ديون تجاه الإقامة الحالية.'] },
      { h: 'الخطوات', ic: 'arrow-right', steps: [['الاستعلام', 'لدى إدارة إقامتك عن فترة الإيداع والاستمارة.'], ['إيداع طلب كتابي مبرر', 'موجه إلى مدير الإقامة أو المديرية مع الوثائق.'], ['موافقة الإقامتين', 'تبدي الإقامتان رأيهما وتقرر المديرية.'], ['براءة الذمة', 'تسليم المفاتيح وجرد الغرفة في الإقامة الحالية.'], ['الالتحاق', 'قدّم القرار وبطاقتك في الإقامة الجديدة.']] },
      { h: 'الوثائق المبررة', ic: 'file', list: ['طلب خطي مبرر', 'بطاقة الطالب أو شهادة مدرسية', 'بطاقة الإقامة أو وصل الدفع', 'مبرر السبب: شهادة تحويل، شهادة طبية، وثيقة عائلية…', 'براءة ذمة من الإقامة الحالية'] },
      { h: 'الآجال والمتابعة', ic: 'calendar', list: ['أودع الطلب عند الدخول الجامعي (سبتمبر – أكتوبر) أو عند ظهور السبب.', 'تختلف مدة الرد حسب الأماكن: تابع بعد أسبوع أو أسبوعين.', 'احتفظ بنسخة مؤرخة من الطلب.', 'تبقى في إقامتك الحالية إلى غاية صدور القرار.'] }
    ],
    note: 'تحدد المديرية الكيفيات بدقة وقد تتغير كل سنة: تحقق لدى إدارة إقامتك.' }
};
function rtr6Html() { return inf6(L2(RTR6)); }

/* ---------- Objets trouvés ---------- */
var LF6 = { items: [], mode: 'shared', state: 'idle', photo: '', claim: null, msg: '' };
var LFL = {
  fr: { h: 'Le mur des objets trouvés', p: 'Un objet trouvé sur le campus ? Prenez-le en photo : il apparaît ici pour tous les étudiants. Vous reconnaissez le vôtre ? Touchez « Trouvé ».', post: 'J’ai trouvé un objet', empty: 'Aucun objet publié pour le moment.', load: 'Chargement…', err: 'Impossible de charger les objets pour le moment.', found: 'Trouvé', taken: 'Récupéré par', mail: 'Votre e-mail', mailP: 'prenom.nom@enstp.edu.dz', confirm: 'C’est à moi', cancel: 'Annuler', badMail: 'Adresse e-mail invalide.', already: 'Cet objet a déjà été récupéré.', local: 'Base partagée pas encore activée : les publications restent sur cet appareil.',
    shoot: 'Prendre une photo', pick: 'ou choisir une image', what: 'Quel objet ?', whatP: 'ex. Calculatrice Casio, clés, carte…', where: 'Où l’avez-vous trouvé ?', whereP: 'ex. Amphi B, bibliothèque, stade…', pickup: 'Où le récupérer ?', pickupP: 'ex. Déposé à l’accueil du bâtiment 17', publish: 'Publier', retake: 'Reprendre', need: 'Prenez d’abord une photo de l’objet.', sending: 'Publication…', okPost: 'Objet publié. Merci !', tips: 'Photographiez l’objet seul, sans document d’identité visible.', seeWall: 'Voir le mur', ago: ['à l’instant', 'il y a % min', 'il y a % h', 'il y a % j'] },
  en: { h: 'The lost & found wall', p: 'Found something on campus? Take a photo: it appears here for every student. Recognise yours? Tap “Found”.', post: 'I found something', empty: 'Nothing posted yet.', load: 'Loading…', err: 'Items cannot be loaded right now.', found: 'Found', taken: 'Picked up by', mail: 'Your email', mailP: 'first.last@enstp.edu.dz', confirm: 'It’s mine', cancel: 'Cancel', badMail: 'Invalid email address.', already: 'This item has already been picked up.', local: 'Shared database not enabled yet: posts stay on this device.',
    shoot: 'Take a photo', pick: 'or choose an image', what: 'What is it?', whatP: 'e.g. Casio calculator, keys, card…', where: 'Where did you find it?', whereP: 'e.g. Amphi B, library, stadium…', pickup: 'Where to collect it?', pickupP: 'e.g. Left at building 17 reception', publish: 'Post', retake: 'Retake', need: 'Take a photo of the item first.', sending: 'Posting…', okPost: 'Item posted. Thank you!', tips: 'Photograph the item alone, with no ID document visible.', seeWall: 'See the wall', ago: ['just now', '% min ago', '% h ago', '% d ago'] },
  ar: { h: 'جدار الأغراض الضائعة', p: 'وجدت غرضًا في الحرم؟ صوّره: يظهر هنا لكل الطلبة. تعرّفت على غرضك؟ اضغط « وُجد ».', post: 'وجدت غرضًا', empty: 'لا توجد أغراض منشورة حاليًا.', load: 'جارٍ التحميل…', err: 'تعذر تحميل الأغراض حاليًا.', found: 'وُجد', taken: 'استرجعه', mail: 'بريدك الإلكتروني', mailP: 'prenom.nom@enstp.edu.dz', confirm: 'إنه لي', cancel: 'إلغاء', badMail: 'بريد إلكتروني غير صالح.', already: 'تم استرجاع هذا الغرض.', local: 'القاعدة المشتركة غير مفعلة بعد: المنشورات تبقى على هذا الجهاز.',
    shoot: 'التقط صورة', pick: 'أو اختر صورة', what: 'ما هو الغرض؟', whatP: 'مثال: آلة حاسبة، مفاتيح، بطاقة…', where: 'أين وجدته؟', whereP: 'مثال: المدرج ب، المكتبة، الملعب…', pickup: 'أين يُسترجع؟', pickupP: 'مثال: مودَع في استقبال المبنى 17', publish: 'نشر', retake: 'إعادة', need: 'التقط صورة للغرض أولاً.', sending: 'جارٍ النشر…', okPost: 'تم النشر. شكرًا!', tips: 'صوّر الغرض وحده دون إظهار وثائق الهوية.', seeWall: 'عرض الجدار', ago: ['الآن', 'منذ % د', 'منذ % سا', 'منذ % يوم'] }
};
function agoTxt(iso) {
  var L = L2(LFL), m = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (m < 1) return L.ago[0]; if (m < 60) return L.ago[1].replace('%', m); if (m < 1440) return L.ago[2].replace('%', Math.floor(m / 60)); return L.ago[3].replace('%', Math.floor(m / 1440));
}
function lfWallHtml() {
  var L = L2(LFL);
  return '<div class="lf6-hd"><p class="inf6-lead">' + esc(L.p) + '</p><a class="r5btn lf6-cta" href="' + subHref('objets', 'o-post') + '">' + ic('camera', 16) + ' ' + esc(L.post) + '</a></div><div id="lf6-list" class="lf6-list" aria-live="polite">' + lfListHtml() + '</div>';
}
function lfListHtml() {
  var L = L2(LFL);
  if (LF6.state === 'idle' || LF6.state === 'loading') { if (!LF6.items.length) return '<p class="ed-note">' + esc(L.load) + '</p>'; }
  if (LF6.state === 'error' && !LF6.items.length) return '<p class="ed-note">' + esc(L.err) + '</p>';
  var h = LF6.mode === 'local' ? '<p class="inf6-note">' + ic('info', 14) + ' ' + esc(L.local) + '</p>' : '';
  if (!LF6.items.length) return h + '<div class="lf6-empty">' + ic('box', 30, '', 1.4) + '<p>' + esc(L.empty) + '</p></div>';
  return h + '<div class="lf6-grid">' + LF6.items.map(function (it) {
    var c = !!it.claimed_by, cl = LF6.claim === it.id;
    return '<article class="lf6-card' + (c ? ' is-claimed' : '') + '" data-lfid="' + esc(it.id) + '">' +
      (c ? '<div class="lf6-by">' + ic('check', 14) + ' ' + esc(L.taken) + ' <b dir="ltr">' + esc(it.claimed_by) + '</b></div>' : '') +
      '<figure><img src="' + esc(it.photo) + '" alt="' + esc(it.what || L.found) + '" loading="lazy"></figure><div class="lf6-b">' +
      (it.what ? '<h3>' + esc(it.what) + '</h3>' : '') + (it.place ? '<p>' + ic('map-pin', 13) + ' ' + esc(it.place) + '</p>' : '') + (it.pickup ? '<p>' + ic('box', 13) + ' ' + esc(it.pickup) + '</p>' : '') +
      '<time datetime="' + esc(it.created_at) + '">' + esc(agoTxt(it.created_at)) + '</time>' +
      (cl ? '<form class="lf6-claim" data-lfclaim="' + esc(it.id) + '"><label>' + esc(L.mail) + '<input type="email" name="m" required autocomplete="email" placeholder="' + esc(L.mailP) + '" value="' + esc(member || '') + '"></label>' + (LF6.msg ? '<p class="ssc6-err" role="alert">' + esc(LF6.msg) + '</p>' : '') + '<div><button class="lf6-btn" type="submit">' + esc(L.confirm) + '</button><button type="button" class="r5out" data-lfx="1">' + esc(L.cancel) + '</button></div></form>' :
        '<button type="button" class="lf6-btn" data-lff="' + esc(it.id) + '"' + (c ? ' disabled aria-disabled="true"' : '') + '>' + ic('check', 15) + ' ' + esc(L.found) + '</button>') +
      '</div></article>';
  }).join('') + '</div>';
}
function lfPaint() { var el = document.getElementById('lf6-list'); if (el) el.innerHTML = lfListHtml(); }
function lfLocal() { return lsGet('enstp6-lf', []) || []; }
function lfLoad() {
  LF6.state = 'loading'; if (!LF6.items.length) lfPaint();
  if (LF6.mode === 'local') { LF6.items = lfLocal(); LF6.state = 'ready'; lfPaint(); return; }
  sbReq('lost_items?select=*&order=created_at.desc&limit=60').then(function (j) { LF6.items = j || []; LF6.state = 'ready'; lfPaint(); })
    .catch(function (e) { if (sbMissing(e)) { LF6.mode = 'local'; LF6.items = lfLocal(); LF6.state = 'ready'; } else LF6.state = 'error'; lfPaint(); });
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-lff],[data-lfx]'); if (!b) return;
  if (b.hasAttribute('data-lff')) { LF6.claim = b.getAttribute('data-lff'); LF6.msg = ''; } else { LF6.claim = null; LF6.msg = ''; }
  lfPaint(); var i = document.querySelector('.lf6-claim input'); if (i) i.focus();
});
document.addEventListener('submit', function (e) {
  var f = e.target; if (!f || !f.hasAttribute || !f.hasAttribute('data-lfclaim')) return;
  e.preventDefault();
  var id = f.getAttribute('data-lfclaim'), m = f.m.value.trim().toLowerCase(), L = L2(LFL);
  if (!okMail6(m)) { LF6.msg = L.badMail; lfPaint(); return; }
  member = m; try { localStorage.setItem('enstp-go-email', m); } catch (x) {}
  var done = function () { LF6.items.forEach(function (it) { if (it.id === id) { it.claimed_by = m; it.claimed_at = new Date().toISOString(); } }); LF6.claim = null; LF6.msg = ''; lfPaint(); };
  if (LF6.mode === 'local') { var a = lfLocal(); a.forEach(function (it) { if (it.id === id && !it.claimed_by) it.claimed_by = m; }); lsSet('enstp6-lf', a); done(); return; }
  f.querySelector('button[type=submit]').disabled = true;
  sbReq('rpc/lf_claim', { p_id: id, p_email: m }).then(done).catch(function (er) { LF6.msg = /already_claimed/.test(er.message) ? L.already : /bad_email/.test(er.message) ? L.badMail : L.err; lfLoad(); });
});
function lfPostHtml() {
  var L = L2(LFL);
  return '<form class="lf6-post" id="lf6-post"><div class="lf6-shot" id="lf6-shot">' + lfShotHtml() + '</div>' +
    '<input type="file" id="lf6-cam" accept="image/*" capture="environment" hidden><input type="file" id="lf6-file" accept="image/*" hidden>' +
    '<p class="inf6-note">' + ic('info', 14) + ' ' + esc(L.tips) + '</p>' +
    '<div class="lf6-fields"><label>' + esc(L.what) + '<input name="what" maxlength="120" placeholder="' + esc(L.whatP) + '"></label><label>' + esc(L.where) + '<input name="place" maxlength="120" placeholder="' + esc(L.whereP) + '"></label><label>' + esc(L.pickup) + '<input name="pickup" maxlength="160" placeholder="' + esc(L.pickupP) + '"></label></div>' +
    '<p class="ssc6-err" id="lf6-msg" role="alert"></p><div class="r5acts"><button class="lf6-btn lf6-pub" type="submit">' + ic('check', 16) + ' ' + esc(L.publish) + '</button><a class="r5out" href="' + subHref('objets', 'o-wall') + '">' + esc(L.seeWall) + '</a></div></form>';
}
function lfShotHtml() {
  var L = L2(LFL);
  if (LF6.photo) return '<img src="' + LF6.photo + '" alt=""><button type="button" class="lf6-retake" data-lfcam="1">' + ic('camera', 15) + ' ' + esc(L.retake) + '</button>';
  return '<button type="button" class="lf6-cambtn" data-lfcam="1"><span>' + ic('camera', 30, '', 1.6) + '</span><b>' + esc(L.shoot) + '</b></button><button type="button" class="lnk lf6-pick" data-lffile="1">' + esc(L.pick) + '</button>';
}
function lfCompress(file, cb) {
  var rd = new FileReader();
  rd.onload = function () {
    var img = new Image();
    img.onload = function () {
      var max = 1100, w = img.naturalWidth, h = img.naturalHeight, s = Math.min(1, max / Math.max(w, h)), q = 0.74, out = '';
      var cv = document.createElement('canvas'); cv.width = Math.round(w * s); cv.height = Math.round(h * s);
      var cx = cv.getContext('2d'); cx.drawImage(img, 0, 0, cv.width, cv.height);
      out = cv.toDataURL('image/jpeg', q);
      while (out.length > 600000 && q > 0.35) { q -= 0.1; out = cv.toDataURL('image/jpeg', q); }
      while (out.length > 600000 && cv.width > 400) { var c2 = document.createElement('canvas'); c2.width = Math.round(cv.width * 0.75); c2.height = Math.round(cv.height * 0.75); c2.getContext('2d').drawImage(cv, 0, 0, c2.width, c2.height); cv = c2; out = cv.toDataURL('image/jpeg', 0.6); }
      cb(out);
    };
    img.onerror = function () { cb(''); };
    img.src = rd.result;
  };
  rd.readAsDataURL(file);
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-lfcam],[data-lffile]'); if (!b) return;
  var i = document.getElementById(b.hasAttribute('data-lfcam') ? 'lf6-cam' : 'lf6-file'); if (i) { i.value = ''; i.click(); }
});
document.addEventListener('change', function (e) {
  var t = e.target; if (!t || (t.id !== 'lf6-cam' && t.id !== 'lf6-file') || !t.files || !t.files[0]) return;
  lfCompress(t.files[0], function (d) { LF6.photo = d; var s = document.getElementById('lf6-shot'); if (s) s.innerHTML = lfShotHtml(); var m = document.getElementById('lf6-msg'); if (m) m.textContent = ''; });
});
document.addEventListener('submit', function (e) {
  var f = e.target; if (!f || f.id !== 'lf6-post') return;
  e.preventDefault();
  var L = L2(LFL), msg = document.getElementById('lf6-msg'), btn = f.querySelector('.lf6-pub');
  if (!LF6.photo) { msg.textContent = L.need; return; }
  var v = { what: f.what.value.trim(), place: f.place.value.trim(), pickup: f.pickup.value.trim() };
  btn.disabled = true; msg.textContent = L.sending; msg.classList.add('is-info');
  var ok = function () { LF6.photo = ''; LF6.items = []; LF6.state = 'idle'; location.hash = subHref('objets', 'o-wall'); };
  var local = function () { LF6.mode = 'local'; var a = lfLocal(); a.unshift({ id: 'l' + Date.now(), created_at: new Date().toISOString(), photo: LF6.photo, what: v.what, place: v.place, pickup: v.pickup, claimed_by: null }); if (!lsSet('enstp6-lf', a.slice(0, 30))) lsSet('enstp6-lf', a.slice(0, 5)); ok(); };
  if (LF6.mode === 'local') { local(); return; }
  sbReq('rpc/lf_post', { p_photo: LF6.photo, p_what: v.what, p_place: v.place, p_pickup: v.pickup }).then(ok).catch(function (er) {
    if (sbMissing(er)) { local(); return; }
    btn.disabled = false; msg.classList.remove('is-info'); msg.textContent = L.err + (er.message ? ' (' + er.message + ')' : '');
  });
});
setInterval(function () { if (!document.hidden && document.getElementById('lf6-list') && !LF6.claim) lfLoad(); }, 45000);

/* =====================================================================
   Emploi du temps interactif (toute l'interface en français)
   ===================================================================== */
var E6DAYS = ['Samedi', 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi'], E6WD = [6, 0, 1, 2, 3, 4];
var E6LV = [['CP1', '1re année prépa'], ['CP2', '2e année prépa'], ['I1', '1re année ingénieur'], ['I2', '2e année ingénieur'], ['I3', '3e année ingénieur']];
var E6U = { CP1: ['G', 10, 'Groupe '], CP2: ['G', 12, 'Groupe '], DMS1: ['SEC ', 4, 'Section '], DMS2: ['Section ', 2, 'Section '], DIB1: ['Col. ', 4, 'Colonne '] };
var E6IMG = { CP1: 'cp-1', CP2: 'cp-2', DMS1: 'dms-1', DMS2: 'dms-2', DMS3: 'dms-3', DIB1: 'dib-1', DIB2: 'dib-2', DIB3: 'dib-3' };
var E6PAL = ['#5b7bb5', '#4f9a7c', '#c08a4a', '#8a6bbf', '#bf6b80', '#4f93a3', '#9a8f45', '#6f6fb3', '#b07a5a', '#5f9466', '#a36aa3', '#6a7f96', '#7f9a4f', '#b5655b'];
var E6 = lsGet('enstp6-edt', null) || { lv: '', dep: '', u: '' };
(function () { if (!E6.lv && typeof profileClass === 'function') { var k = profileClass(); if (k === 'CP1' || k === 'CP2') E6.lv = k; else if (/^(DIB|DMS)\d$/.test(k)) { E6.lv = 'I' + k.slice(-1); E6.dep = k.slice(0, 3); } } })();
function e6Save() { lsSet('enstp6-edt', E6); }
function e6Id() { if (E6.lv === 'CP1' || E6.lv === 'CP2') return E6.lv; if (/^I\d$/.test(E6.lv) && E6.dep) return E6.dep + E6.lv.slice(1); return ''; }
function e6Tt(id) { for (var i = 0; i < EDT6.length; i++) if (EDT6[i].id === id) return EDT6[i]; return null; }
function e6Units(id) { var u = E6U[id]; if (!u) return []; var o = []; for (var i = 1; i <= u[1]; i++) o.push({ v: u[0] + i, n: u[2] + i }); return o; }
function e6Ready() { var id = e6Id(); return !!id && (!E6U[id] || !!E6.u); }
function e6View(tt, u) {
  /* les séances de chaque jour pour le groupe choisi */
  return E6DAYS.map(function (dn) {
    var d = tt.days.filter(function (x) { return x.d === dn; })[0] || { x: [], n: [] };
    var xs = d.x.filter(function (e) {
      if (!E6U[tt.id]) return true;
      if (!e.u) return true;
      if (e.u === 'others') return !d.x.some(function (o) { return o !== e && o.t === e.t && Array.isArray(o.u) && o.u.indexOf(u) !== -1; });
      return e.u.indexOf(u) !== -1;
    });
    return { d: dn, all: xs, notes: d.n || [] };
  });
}
function e6Colors(tt) {
  var map = {}, n = 0;
  tt.days.forEach(function (d) { d.x.forEach(function (e) { if (e.k === 'cours' || e.k === 'ead') { var k = e6Key(e.m); if (!(k in map)) map[k] = E6PAL[n++ % E6PAL.length]; } }); });
  return map;
}
function e6Key(m) { return String(m || '').toLowerCase().replace(/\s+ead$/, '').replace(/\s+/g, ' ').trim(); }
function e6Time(e) {
  if (e.a && e.b) return e.a + ' – ' + e.b;
  if (e.a) return e.a + ' – fin non précisée';
  if (e.b) return 'début non précisé – ' + e.b;
  return 'horaire non précisé';
}
function e6Grid(e) { return e.k !== 'ead' && e.k !== 'note' && e.la && e.lb; }
/* état « maintenant » : séance(s) en cours, pause, pas de cours, prochain cours */
function e6Now(view) {
  var a = algNow(), wd = a.wd, idx = E6WD.indexOf(wd), now = a.min, res = { idx: idx, now: now, hm: a.hm, line: false, cur: [], kind: 'off' };
  if (idx !== -1) {
    var day = view[idx], g = day.all.filter(e6Grid);
    if (g.length) {
      var s = Math.min.apply(null, g.map(function (e) { return t2mm(e.la); })), en = Math.max.apply(null, g.map(function (e) { return t2mm(e.lb); }));
      if (now >= s && now < en) {
        res.line = true;
        res.cur = g.filter(function (e) { return now >= t2mm(e.la) && now < t2mm(e.lb); });
        var real = res.cur.filter(function (e) { return e.k !== 'none'; });
        res.kind = real.length ? 'now' : res.cur.length ? 'none' : 'pause';
        if (res.kind === 'now') res.cur = real;
      }
    }
  }
  /* prochain cours (aujourd'hui puis jours suivants) */
  for (var off = 0; off < 8 && !res.next; off++) {
    var w = (wd + off) % 7, j = E6WD.indexOf(w); if (j === -1) continue;
    var cand = view[j].all.filter(function (e) { return e.k !== 'none' && e.k !== 'note' && (e.a || e.la); }).map(function (e) { return { e: e, t: t2mm(e.a || e.la) }; })
      .filter(function (o) { return off > 0 || o.t > now; }).sort(function (x, y) { return x.t - y.t; });
    if (cand.length) res.next = { e: cand[0].e, t: cand[0].t, off: off, d: E6DAYS[j], all: cand.filter(function (o) { return o.t === cand[0].t; }).map(function (o) { return o.e; }) };
  }
  return res;
}
function e6Desc(e) { if (e.k !== 'cours' && e.k !== 'ead') return [e.m, e.p, e.r].filter(Boolean).join(' - '); return (e.m || 'non précisé') + ' - ' + (e.p || 'enseignant non précisé') + ' - ' + (e.r || 'salle non précisée'); }
function e6Banner(view) {
  var n = e6Now(view), h = '', nx = '';
  if (n.next) {
    var e = n.next.e, when = n.next.off === 0 ? 'aujourd’hui' : n.next.off === 1 ? 'demain (' + n.next.d.toLowerCase() + ')' : n.next.d.toLowerCase();
    var at = e.a ? 'à ' + e.a : (e.tn ? e.tn.toLowerCase() + ' (horaire non précisé)' : 'horaire non précisé');
    nx = '<p class="e6-next"><span>Prochain cours :</span> <b>' + esc(n.next.all.map(e6Desc).join(' / ')) + '</b>, ' + esc(when + ' ' + at) + '</p>';
  }
  if (n.kind === 'now') {
    var until = n.cur.map(function (e) { return e.b || (e.lb && !e.b ? 'non précisé' : 'non précisé'); });
    h = '<p class="e6-cur"><span class="e6-live"></span><span>Maintenant :</span> <b>' + esc(n.cur.map(e6Desc).join(' / ')) + '</b>, jusqu’à ' + esc(n.cur[0].b || 'non précisé') + (n.cur.some(function (e) { return !e.a || !e.b; }) ? ' <em>(horaire non précisé sur le document)</em>' : '') + '</p>';
  } else if (n.kind === 'pause') h = '<p class="e6-cur e6-pause"><span>Maintenant :</span> <b>Pause</b></p>';
  else h = '<p class="e6-cur e6-off"><span>Maintenant :</span> <b>Pas de cours</b>' + (n.idx === -1 ? ' <em>(vendredi)</em>' : '') + '</p>';
  return '<div class="e6-ban' + (n.kind === 'now' ? ' is-live' : '') + '" role="status"><span class="e6-clock" dir="ltr">' + ic('clock', 14) + ' ' + esc(n.hm) + '</span><div>' + h + nx + '</div></div>';
}
function e6Lanes(list) {
  /* répartit côte à côte les séances qui se chevauchent */
  var xs = list.map(function (e) { return { e: e, a: t2mm(e.la), b: t2mm(e.lb) }; }).sort(function (x, y) { return x.a - y.a || y.b - x.b; });
  var clusters = [], cur = null, end = -1;
  xs.forEach(function (o) { if (!cur || o.a >= end) { cur = []; clusters.push(cur); end = o.b; } else end = Math.max(end, o.b); cur.push(o); });
  clusters.forEach(function (c) { var lanes = []; c.forEach(function (o) { for (var i = 0; i < lanes.length; i++) if (lanes[i] <= o.a) { o.l = i; lanes[i] = o.b; return; } o.l = lanes.length; lanes.push(o.b); }); c.forEach(function (o) { o.n = lanes.length; }); });
  return xs;
}
function e6GridHtml(tt, view) {
  var col = e6Colors(tt), g = [], promo = !E6U[tt.id];
  view.forEach(function (d) { d.all.filter(e6Grid).forEach(function (e) { g.push(e); }); });
  if (!g.length) return '<p class="ed-note">Aucune séance trouvée pour cette sélection.</p>';
  var t0 = Math.floor(Math.min.apply(null, g.map(function (e) { return t2mm(e.la); })) / 60) * 60, t1 = Math.ceil(Math.max.apply(null, g.map(function (e) { return t2mm(e.lb); })) / 60) * 60;
  var ppm = 1.12, H = Math.round((t1 - t0) * ppm), n = e6Now(view);
  /* créneaux réguliers du document (au moins deux jours) : bandes horizontales */
  var cnt = {};
  view.forEach(function (d) { d.all.forEach(function (e) { if (e.a && e.b) { var k = e.a + '|' + e.b; cnt[k] = cnt[k] || {}; cnt[k][d.d] = 1; } }); });
  var bands = Object.keys(cnt).filter(function (k) { return Object.keys(cnt[k]).filter(Boolean).length >= 2; }).map(function (k) { var p = k.split('|'); return [t2mm(p[0]), t2mm(p[1]), p[0], p[1]]; });
  var axis = '<div class="e6-axis" style="height:' + H + 'px">';
  for (var t = t0; t <= t1; t += 60) axis += '<span style="top:' + Math.round((t - t0) * ppm) + 'px">' + mm2t(t) + '</span>';
  axis += '</div>';
  var bandsHtml = bands.map(function (b) { return '<i class="e6-band" style="top:' + Math.round((b[0] - t0) * ppm) + 'px;height:' + Math.round((b[1] - b[0]) * ppm) + 'px"></i>'; }).join('');
  var hours = ''; for (var t2 = t0; t2 <= t1; t2 += 60) hours += '<i class="e6-hr" style="top:' + Math.round((t2 - t0) * ppm) + 'px"></i>';
  var cols = view.map(function (d, i) {
    var today = i === n.idx, lanes = e6Lanes(d.all.filter(e6Grid));
    var blocks = lanes.map(function (o) {
      var e = o.e, top = Math.round((o.a - t0) * ppm), hh = Math.max(26, Math.round((o.b - o.a) * ppm) - 3), approx = !(e.a && e.b);
      var c = e.k === 'lab' ? '#8d95a3' : e.k === 'visit' ? '#b39a6a' : e.k === 'none' ? '#b8bcc6' : col[e6Key(e.m)] || '#6a7f96';
      var isNow = today && n.line && n.cur.indexOf(e) !== -1;
      var who = (promo || !e.u) && e.who ? '<span class="e6-who">' + esc(e.who) + '</span>' : '';
      var inner = e.k === 'none' ? '<b>' + esc(e.m.charAt(0).toUpperCase() + e.m.slice(1)) + '</b>' + who :
        who + '<b>' + esc(e.m) + '</b>' + (e.p ? '<span>' + esc(e.p) + '</span>' : '') + (e.r ? '<span class="e6-r">' + ic('map-pin', 11) + esc(e.r) + '</span>' : '') +
        (e.l ? '<span class="e6-l">' + e.l.map(esc).join(' · ') + '</span>' : '') + (e.nt ? '<span class="e6-nt">' + esc(e.nt) + '</span>' : '');
      var tm = '<em class="e6-t">' + esc(approx ? (e.tn ? e.tn + ' · ' : '') + e6Time(e) : e6Time(e) + (e.tn ? ' · ' + e.tn : '')) + '</em>';
      return '<div class="e6-b k-' + e.k + (approx ? ' is-approx' : '') + (isNow ? ' is-now' : '') + (hh < 64 ? ' is-s' : '') + '" style="--ca:' + c + ';top:' + top + 'px;height:' + hh + 'px;' + (o.n > 1 ? 'inset-inline-start:calc(' + (o.l * 100 / o.n) + '% + 2px);width:calc(' + (100 / o.n) + '% - 4px)' : '') + '" title="' + esc(e6Time(e) + ' · ' + e.m + (e.p ? ' · ' + e.p : '') + (e.r ? ' · ' + e.r : '')) + '">' + tm + inner + '</div>';
    }).join('');
    var line = today && n.line ? '<div class="e6-now" style="top:' + Math.round((n.now - t0) * ppm) + 'px"><span dir="ltr">' + esc(n.hm) + '</span></div>' : '';
    return '<div class="e6-col' + (today ? ' is-today' : '') + '" data-col="' + i + '"><div class="e6-dh">' + esc(d.d) + (today ? '<small>Aujourd’hui</small>' : '') + '</div><div class="e6-cb" style="height:' + H + 'px">' + hours + bandsHtml + blocks + line + '</div></div>';
  }).join('');
  /* séances en ligne / hors horaires + notes du document */
  var hasExtra = view.some(function (d) { return d.all.some(function (e) { return !e6Grid(e); }) || d.notes.length; });
  var extra = hasExtra ? '<div class="e6-x"><div class="e6-xh">En ligne<br>& notes</div>' + view.map(function (d, i) {
    var xs = d.all.filter(function (e) { return !e6Grid(e); });
    return '<div class="e6-xc' + (i === n.idx ? ' is-today' : '') + '">' + xs.map(function (e) {
      var c = col[e6Key(e.m)] || '#6a7f96';
      if (e.k === 'note') return '<div class="e6-xn"><b>' + esc(e.tn || '') + '</b> ' + esc(e.m) + (e.l ? '<span>' + e.l.map(esc).join(' · ') + '</span>' : '') + '</div>';
      return '<div class="e6-xe" style="--ca:' + c + '"><em>' + esc(e.a ? e.a + (e.b ? ' – ' + e.b : '') + ' · en ligne' : (e.tn || 'heure non précisée')) + '</em>' + (e.who && !E6U[tt.id] ? '<span class="e6-who">' + esc(e.who) + '</span>' : '') + '<b>' + esc(e.m) + '</b>' + (e.p ? '<span>' + esc(e.p) + '</span>' : '') + (e.r ? '<span>' + esc(e.r) + '</span>' : '') + '</div>';
    }).join('') + d.notes.map(function (x) { return '<div class="e6-xn">' + esc(x) + '</div>'; }).join('') + '</div>';
  }).join('') + '</div>' : '';
  return '<div class="e6-scroll" id="e6-scroll"><div class="e6-grid"><div class="e6-ax"><div class="e6-dh"></div>' + axis + '</div>' + cols + '</div>' + extra + '</div>';
}
function e6Legend(tt, view) {
  var col = e6Colors(tt), seen = {}, items = [];
  view.forEach(function (d) { d.all.forEach(function (e) { if ((e.k === 'cours' || e.k === 'ead') && !seen[e6Key(e.m)]) { seen[e6Key(e.m)] = 1; items.push([e.m.replace(/\s+EAD$/, ''), col[e6Key(e.m)]]); } }); });
  return '<div class="e6-leg">' + items.map(function (x) { return '<span><i style="background:' + x[1] + '"></i>' + esc(x[0]) + '</span>'; }).join('') +
    '<span class="e6-leg-k"><i class="k-lab"></i>Lab / TP</span><span class="e6-leg-k"><i class="k-none"></i>Pas de cours</span><span class="e6-leg-k"><i class="k-approx"></i>Horaire non précisé</span></div>';
}
function e6Inner() {
  var id = e6Id(), tt = id ? e6Tt(id) : null, units = e6Units(id);
  var h = '<div class="e6-pick"><div class="e6-step"><span>Niveau</span><div class="e6-seg">' + E6LV.map(function (l) { return '<button type="button" data-e6lv="' + l[0] + '" class="' + (E6.lv === l[0] ? 'on' : '') + '" aria-pressed="' + (E6.lv === l[0]) + '">' + esc(l[1]) + '</button>'; }).join('') + '</div></div>';
  if (/^I\d$/.test(E6.lv)) h += '<div class="e6-step"><span>Département</span><div class="e6-seg">' + [['DMS', 'DMS · Matériaux et Structures'], ['DIB', 'DIB · Infrastructures de Base']].map(function (d) { return '<button type="button" data-e6dep="' + d[0] + '" class="' + (E6.dep === d[0] ? 'on' : '') + '" aria-pressed="' + (E6.dep === d[0]) + '">' + esc(d[1]) + '</button>'; }).join('') + '</div></div>';
  if (id && units.length) h += '<div class="e6-step"><span>' + (E6U[id][2].trim() === 'Groupe' ? 'Groupe' : E6U[id][2].trim() === 'Colonne' ? 'Colonne' : 'Section') + '</span><div class="e6-seg e6-seg-n">' + units.map(function (u) { return '<button type="button" data-e6u="' + esc(u.v) + '" class="' + (E6.u === u.v ? 'on' : '') + '" aria-pressed="' + (E6.u === u.v) + '">' + esc(u.n.replace(/^(Groupe|Section|Colonne) /, '')) + '</button>'; }).join('') + '</div></div>';
  else if (id) h += '<div class="e6-step"><span>Groupe</span><p class="e6-promo">Toute la promotion — le document ne distingue pas de groupes.</p></div>';
  h += '</div>';
  if (!id) return h + '<div class="e6-empty">' + ic('calendar', 30, '', 1.4) + '<p>Choisissez votre niveau' + (/^I\d$/.test(E6.lv) ? ' et votre département' : '') + ' pour afficher votre emploi du temps.</p></div>';
  if (!e6Ready()) return h + '<div class="e6-empty">' + ic('users', 30, '', 1.4) + '<p>Choisissez votre ' + (E6U[id][2].trim().toLowerCase()) + '.</p></div>';
  var view = e6View(tt, E6.u);
  var head = tt.head || [];
  return h + '<div id="e6-live">' + e6Banner(view) + '</div>' +
    '<div class="e6-title"><div><b>' + esc(head[1] || id) + '</b><span>' + esc(head[2] || '') + (E6.u ? ' · ' + esc((e6Units(id).filter(function (u) { return u.v === E6.u; })[0] || {}).n || '') : '') + '</span></div>' +
    '<div class="e6-dl"><a class="r5out" href="edt/edt-' + E6IMG[id] + '.jpg" download="emploi-du-temps-' + id.toLowerCase() + '.jpg">' + ic('download', 15) + ' Télécharger la photo</a><a class="r5out" href="edt/edt-' + id.slice(0, -1).toLowerCase() + '.pdf" target="_blank" rel="noopener">PDF officiel ' + ic('arrow-up-right', 13) + '</a></div></div>' +
    '<div id="e6-gridbox">' + e6GridHtml(tt, view) + '</div>' + e6Legend(tt, view) +
    '<details class="e6-info"><summary>' + ic('info', 14) + ' À propos de ce document</summary><ul>' + head.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '<li>Les éléments marqués « (?) » sont incertains sur la photo d’origine. Une information manque ? Signalez le jour et l’heure concernés pour la compléter.</li></ul><a href="edt/edt-' + E6IMG[id] + '.jpg" target="_blank" rel="noopener"><img loading="lazy" src="edt/edt-' + E6IMG[id] + '.jpg" alt="Emploi du temps officiel ' + esc(id) + '"></a></details>';
}
function edt6Html() { return '<div class="e6" id="e6" lang="fr" dir="ltr">' + e6Inner() + '</div>'; }
function e6Paint(keepScroll) {
  var el = document.getElementById('e6'); if (!el) return;
  var sc = document.getElementById('e6-scroll'), x = sc ? sc.scrollLeft : null;
  el.innerHTML = e6Inner();
  if (keepScroll && x != null) { var s2 = document.getElementById('e6-scroll'); if (s2) s2.scrollLeft = x; } else e6ToToday();
}
function e6ToToday() {
  var sc = document.getElementById('e6-scroll'), c = sc && sc.querySelector('.e6-col.is-today'), ax = sc && sc.querySelector('.e6-ax');
  if (sc && c && sc.scrollWidth > sc.clientWidth + 4) sc.scrollLeft = Math.max(0, c.offsetLeft - (ax ? ax.offsetWidth : 0) - 8);
}
function e6Tick() {
  /* chaque minute : ligne rouge, case en cours et bandeau */
  var id = e6Id(); if (!id || !e6Ready() || !document.getElementById('e6-live')) return;
  var tt = e6Tt(id), view = e6View(tt, E6.u);
  document.getElementById('e6-live').innerHTML = e6Banner(view);
  var gb = document.getElementById('e6-gridbox'), sc = document.getElementById('e6-scroll'), x = sc ? sc.scrollLeft : 0, y = window.scrollY;
  if (gb) { gb.innerHTML = e6GridHtml(tt, view); var s2 = document.getElementById('e6-scroll'); if (s2) s2.scrollLeft = x; }
  window.scrollTo(window.scrollX, y);
}
function e6Mount() { e6ToToday(); }
var e6Last = '';
setInterval(function () { var m = algNow().hm; if (m !== e6Last) { e6Last = m; if (!document.hidden) { e6Tick(); var h = document.getElementById('homeNow'); if (h) h.innerHTML = homeNow(); } } }, 5000);
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-e6lv],[data-e6dep],[data-e6u]'); if (!b) return;
  if (b.hasAttribute('data-e6lv')) { var v = b.getAttribute('data-e6lv'); if (E6.lv !== v) { E6.lv = v; E6.u = ''; if (!/^I/.test(v)) E6.dep = ''; } }
  else if (b.hasAttribute('data-e6dep')) { var d = b.getAttribute('data-e6dep'); if (E6.dep !== d) { E6.dep = d; E6.u = ''; } }
  else E6.u = b.getAttribute('data-e6u');
  if (!E6U[e6Id()] && e6Id()) E6.u = '';
  e6Save(); e6Paint(false);
});
/* l'accueil affiche « maintenant / prochain cours » quand un emploi du temps est choisi */
function homeNow() {
  var id = e6Id(); if (!id || !e6Ready()) return '';
  var view = e6View(e6Tt(id), E6.u);
  return '<div class="e6-home" lang="fr" dir="ltr">' + e6Banner(view) + '<a class="now-link" href="' + subHref('salles', 'e-edt') + '">Mon emploi du temps ' + ic('arrow-right', 14) + '</a></div>';
}

/* ---------- écran de lancement : retiré une fois le site prêt ---------- */
(function () {
  var s = document.getElementById('splash'); if (!s) return;
  var t0 = window.__splash0 || Date.now(), min = matchMedia('(prefers-reduced-motion: reduce)').matches ? 500 : 1900;
  setTimeout(function () { s.classList.add('out'); setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 650); }, Math.max(0, min - (Date.now() - t0)));
})();

render();
