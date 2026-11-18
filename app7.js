/* =====================================================================
   ENSTP 360 · round 7
   - rubriques : une seule version de chaque rubrique (celle de l'accueil),
     plus de « Continuer l'exploration », liens de la barre et du pied de page
     vers les rubriques de l'accueil
   - accueil minimaliste (photo, slogan, citation, recherche, rubriques)
   - barre : Accueil en premier, globe des langues en rideau, menu mobile à droite
   - rubriques 07 Stages (par domaine + rapports), 08 Entrepreneuriat et
     Innovation, 09 BookSTP, 10 Objets trouvés partagés (stockage distant, temps réel)
   - comptes étudiants @enstp.edu.dz, administrateurs, likes / dislikes par service,
     Saturne relié au profil
   Chargé après app6.js : les fonctions déclarées ici remplacent celles du même nom.
   ===================================================================== */

/* ---------- icônes ---------- */
Object.assign(P, {
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/>',
  library: '<path d="m16 6 4 14M12 6v14M8 8v12M4 4v16"/>',
  trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  folder: '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>'
});
if (!P.mail) P.mail = '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>';
if (!P.phone) P.phone = '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>';

/* ---------- textes de l'interface ---------- */
var T7L = {
  fr: {
    home: 'Accueil', ent: 'Entrepreneuriat', langH: 'Langue', quote: 'Vous avez la chance d’être étudiant', quoteBy: 'Dr. Mobarki Ahmed',
    fExp: 'Explorer', fUse: 'Liens utiles', fCt: 'Contact', fSite: 'Site officiel de l’ENSTP', fMak: 'ENSTP 360 × Makelty Healthy — Commander', fSsc: 'SSC — Students Sports Community · ENSTP',
    fRoute: 'Itinéraire vers l’ENSTP', fDesc: 'Le guide numérique de l’École Nationale Supérieure des Travaux Publics « Francis Jeanson » ENSTP.', rights: 'Tous droits réservés', off: 'Pour toute information officielle, veuillez vous référer à l’administration de l’ENSTP.',
    rubP: 'Touchez « + » pour afficher les sous-rubriques.', news: 'Actualités',
    like: 'J’aime', dislike: 'Je n’aime pas', needLogin: 'Connectez-vous avec votre compte étudiant pour donner votre avis.', noDb: 'Base partagée pas encore activée : exécutez le script supabase/enstp360-v7.sql dans Supabase.'
  },
  en: {
    home: 'Home', ent: 'Entrepreneurship', langH: 'Language', quote: 'Vous avez la chance d’être étudiant', quoteBy: 'Dr. Mobarki Ahmed',
    fExp: 'Explore', fUse: 'Useful links', fCt: 'Contact', fSite: 'Official ENSTP website', fMak: 'ENSTP 360 × Makelty Healthy — Order', fSsc: 'SSC — Students Sports Community · ENSTP',
    fRoute: 'Directions to ENSTP', fDesc: 'The digital guide of the École Nationale Supérieure des Travaux Publics “Francis Jeanson” ENSTP.', rights: 'All rights reserved', off: 'For any official information, please refer to the ENSTP administration.',
    rubP: 'Tap “+” to show the sub-sections.', news: 'News',
    like: 'Like', dislike: 'Dislike', needLogin: 'Sign in with your student account to vote.', noDb: 'Shared database not enabled yet: run supabase/enstp360-v7.sql in Supabase.'
  },
  ar: {
    home: 'الرئيسية', ent: 'المقاولاتية', langH: 'اللغة', quote: 'Vous avez la chance d’être étudiant', quoteBy: 'Dr. Mobarki Ahmed',
    fExp: 'استكشف', fUse: 'روابط مفيدة', fCt: 'الاتصال', fSite: 'الموقع الرسمي للمدرسة', fMak: 'ENSTP 360 × Makelty Healthy — اطلب', fSsc: 'SSC — Students Sports Community · ENSTP',
    fRoute: 'الطريق إلى المدرسة', fDesc: 'الدليل الرقمي للمدرسة الوطنية العليا للأشغال العمومية « فرانسيس جونسون » ENSTP.', rights: 'جميع الحقوق محفوظة', off: 'لأي معلومة رسمية، يرجى الرجوع إلى إدارة المدرسة.',
    rubP: 'اضغط « + » لعرض الأقسام الفرعية.', news: 'الأخبار',
    like: 'أعجبني', dislike: 'لم يعجبني', needLogin: 'سجّل الدخول بحساب الطالب للتصويت.', noDb: 'القاعدة المشتركة غير مفعلة بعد.'
  }
};
function T7() { return T7L[lang] || T7L.fr; }
var LNAME7 = [['fr', 'Français', 'FR'], ['en', 'English', 'EN'], ['ar', 'العربية', 'ع']];
var SITE7 = 'https://zwfh6trskt-bot.github.io/ENST-360/';
var MAK7 = 'https://zwfh6trskt-bot.github.io/MAKELTYX360/', SSC7 = 'https://zwfh6trskt-bot.github.io/SSC/';
HERO_IMG = 'images/v7/hero-portail-enstp.jpg';

/* =====================================================================
   Supabase : session, requêtes REST, stockage, temps réel
   ===================================================================== */
/* Base v7 (comptes, objets trouvés, likes, livres, rapports, annonces) : projet Supabase ENSTP360.
   SB6 (app6.js, base du SSC) reste utilisé uniquement par les réservations SSC. */
var SB7 = { url: 'https://khkkzzqknsefykidwzsz.supabase.co', key: 'sb_publishable_XHH2mqd0DgFUECZpBBSrvQ_xNIz8F1e' };
var AU = { s: lsGet('enstp7-session', null), prof: null, admin: false, profLoaded: false };
var ADM7 = ['nazim-abdelmalek.daoudi@enstp.edu.dz', 'ailamlinamalak@gmail.com']; /* affichage seulement : le serveur décide */
function auUid() { return AU.s && AU.s.user ? AU.s.user.id : ''; }
function auEmail() { return AU.s && AU.s.user ? String(AU.s.user.email || '').toLowerCase() : ''; }
function auSave(s) { AU.s = s; if (s) lsSet('enstp7-session', s); else try { localStorage.removeItem('enstp7-session'); } catch (e) {} }
function sbErr(r, t) {
  var j = null; try { j = t ? JSON.parse(t) : null; } catch (e) {}
  var er = new Error((j && (j.msg || j.message || j.error_description || j.error || j.hint)) || t || ('HTTP ' + r.status));
  er.status = r.status; er.code = j && (j.code || j.error_code); return er;
}
var auRefreshing = null;
function auFresh() {
  /* renouvelle le jeton d'accès s'il expire dans moins d'une minute */
  if (!AU.s || !AU.s.refresh_token) return Promise.resolve();
  if (AU.s.expires_at && AU.s.expires_at * 1000 > Date.now() + 60000) return Promise.resolve();
  if (auRefreshing) return auRefreshing;
  auRefreshing = fetch(SB7.url + '/auth/v1/token?grant_type=refresh_token', { method: 'POST', headers: { apikey: SB7.key, 'Content-Type': 'application/json' }, body: JSON.stringify({ refresh_token: AU.s.refresh_token }) })
    .then(function (r) { return r.text().then(function (t) { if (!r.ok) throw sbErr(r, t); return JSON.parse(t); }); })
    .then(function (j) { auSet(j); })
    .catch(function (e) { if (e.status === 400 || e.status === 401 || e.status === 403) { auSave(null); AU.prof = null; AU.admin = false; } })
    .then(function () { auRefreshing = null; });
  return auRefreshing;
}
function auSet(j) {
  if (!j || !j.access_token) return;
  auSave({ access_token: j.access_token, refresh_token: j.refresh_token, expires_at: j.expires_at || Math.floor(Date.now() / 1000) + (j.expires_in || 3600), user: j.user || (AU.s && AU.s.user) || null });
}
/* requête REST (PostgREST) avec le jeton de l'utilisateur s'il est connecté */
function sb7(path, opt) {
  opt = opt || {};
  return auFresh().then(function () {
    var h = { apikey: SB7.key, Accept: 'application/json' };
    if (AU.s && AU.s.access_token) h.Authorization = 'Bearer ' + AU.s.access_token;
    if (opt.body !== undefined) h['Content-Type'] = 'application/json';
    if (opt.prefer) h.Prefer = opt.prefer;
    return fetch(SB7.url + path, { method: opt.method || (opt.body !== undefined ? 'POST' : 'GET'), headers: h, body: opt.body !== undefined ? JSON.stringify(opt.body) : undefined });
  }).then(function (r) { return r.text().then(function (t) { if (!r.ok) throw sbErr(r, t); try { return t ? JSON.parse(t) : null; } catch (e) { return null; } }); });
}
function rest7(p, opt) { return sb7('/rest/v1/' + p, opt); }
function auth7(p, body, method) {
  var h = { apikey: SB7.key, 'Content-Type': 'application/json' };
  if (AU.s && AU.s.access_token && method) h.Authorization = 'Bearer ' + AU.s.access_token;
  return fetch(SB7.url + '/auth/v1/' + p, { method: method || 'POST', headers: h, body: body ? JSON.stringify(body) : undefined })
    .then(function (r) { return r.text().then(function (t) { if (!r.ok) throw sbErr(r, t); try { return t ? JSON.parse(t) : {}; } catch (e) { return {}; } }); });
}
function noDb7(e) { return sbMissing(e) || (e && /relation .* does not exist|schema cache|function .* does not exist/i.test(e.message || '')); }

/* ---------- temps réel (protocole Phoenix de Supabase Realtime) + secours par interrogation ---------- */
var RT7 = { ws: null, ref: 0, hb: null, tries: 0, up: false, subs: {} };
function rtOn(table, fn) { (RT7.subs[table] = RT7.subs[table] || []).push(fn); rtConnect(); }
function rtSend(m) { try { if (RT7.ws && RT7.ws.readyState === 1) RT7.ws.send(JSON.stringify(m)); } catch (e) {} }
function rtConnect() {
  if (RT7.ws || !window.WebSocket) return;
  var url = SB7.url.replace(/^http/, 'ws') + '/realtime/v1/websocket?apikey=' + encodeURIComponent(SB7.key) + '&vsn=1.0.0', ws;
  try { ws = new WebSocket(url); } catch (e) { return; }
  RT7.ws = ws;
  ws.onopen = function () {
    RT7.tries = 0;
    rtSend({ topic: 'realtime:enstp360', event: 'phx_join', ref: String(++RT7.ref), join_ref: '1', payload: { config: { broadcast: { self: false }, presence: { key: '' }, postgres_changes: [{ event: '*', schema: 'public', table: 'lf_items' }, { event: '*', schema: 'public', table: 'book_offers' }] }, access_token: (AU.s && AU.s.access_token) || SB7.key } });
    RT7.hb = setInterval(function () { rtSend({ topic: 'phoenix', event: 'heartbeat', payload: {}, ref: String(++RT7.ref) }); }, 25000);
  };
  ws.onmessage = function (ev) {
    var m; try { m = JSON.parse(ev.data); } catch (e) { return; }
    if (m.event === 'phx_reply' && m.payload && m.payload.status === 'ok') RT7.up = true;
    if (m.event === 'postgres_changes' && m.payload && m.payload.data) {
      var t = m.payload.data.table; (RT7.subs[t] || []).forEach(function (fn) { try { fn(m.payload.data); } catch (e) {} });
    }
  };
  ws.onclose = function () {
    clearInterval(RT7.hb); RT7.ws = null; RT7.up = false;
    if (RT7.tries++ < 8) setTimeout(rtConnect, Math.min(30000, 1500 * RT7.tries));
  };
  ws.onerror = function () { try { ws.close(); } catch (e) {} };
}

/* ---------- retour des liens envoyés par e-mail (confirmation, mot de passe oublié) ---------- */
(function () {
  var h = location.hash || '';
  if (!/access_token=|error_description=/.test(h)) return;
  var q = {}; h.replace(/^#\/?/, '').split('&').forEach(function (kv) { var i = kv.indexOf('='); if (i > 0) q[decodeURIComponent(kv.slice(0, i))] = decodeURIComponent(kv.slice(i + 1).replace(/\+/g, ' ')); });
  try { history.replaceState(null, '', location.pathname + location.search + '#/'); } catch (e) { location.hash = '#/'; }
  if (q.error_description) { AU.flash = q.error_description; return; }
  auSet({ access_token: q.access_token, refresh_token: q.refresh_token, expires_in: +q.expires_in || 3600, expires_at: +q.expires_at || 0 });
  AU.pendingView = q.type === 'recovery' ? 'reset' : 'profile';
  AU.flash = q.type === 'recovery' ? 'Choisissez votre nouveau mot de passe.' : q.type === 'signup' ? 'Adresse confirmée : votre compte est actif.' : '';
  auth7('user', null, 'GET').then(function (u) { AU.s.user = u; auSave(AU.s); }).catch(function () {}).then(function () { auLoad(); });
})();

/* ---------- profil étudiant ---------- */
var LV7 = [['CP1', '1re année préparatoire'], ['CP2', '2e année préparatoire'], ['I1', '1re année ingénieur'], ['I2', '2e année ingénieur'], ['I3', '3e année ingénieur']];
function ttOf(lv, dep) { return lv === 'CP1' || lv === 'CP2' ? lv : (/^I\d$/.test(lv) && dep ? dep + lv.slice(1) : ''); }
function grpOptions(lv, dep) { return e6Units(ttOf(lv, dep)); }
function lvLabel(lv) { var x = LV7.filter(function (l) { return l[0] === lv; })[0]; return x ? x[1] : ''; }
function profLabel(p) {
  if (!p) return '';
  var tt = ttOf(p.level, p.dept), u = (e6Units(tt).filter(function (o) { return o.v === p.grp; })[0] || {}).n;
  return lvLabel(p.level) + (p.dept ? ' · ' + p.dept : '') + (u ? ' · ' + u : '');
}
/* le profil du compte alimente l'ancien profil local (accueil, Saturne) et l'emploi du temps */
function auApply() {
  var p = AU.prof;
  if (!p) return;
  var yi = ['CP1', 'CP2', 'I1', 'I2', 'I3'].indexOf(p.level);
  profile = { name: p.full_name, year: yi, dept: p.dept === 'DMS' ? 1 : p.dept === 'DIB' ? 0 : undefined };
  try { localStorage.setItem('enstp-go-profile', JSON.stringify(profile)); localStorage.setItem('enstp-go-email', p.email); } catch (e) {}
  member = p.email;
  if (!E6.other) { E6.lv = p.level; E6.dep = p.dept || ''; E6.u = p.grp || ''; e6Save(); }
}
function auLoad() {
  if (!auUid()) { AU.prof = null; AU.admin = false; AU.profLoaded = true; return Promise.resolve(); }
  var uid = auUid();
  return Promise.all([
    rest7('profiles?select=*&id=eq.' + uid).then(function (j) { AU.prof = (j && j[0]) || null; }).catch(function () { AU.prof = null; }),
    rest7('rpc/is_admin', { body: {} }).then(function (j) { AU.admin = j === true; }).catch(function () { AU.admin = false; })
  ]).then(function () {
    AU.profLoaded = true;
    /* profil choisi à l'inscription, avant la confirmation de l'e-mail */
    var pend = lsGet('enstp7-pending-profile', null);
    if (!AU.prof && pend && pend.email === auEmail()) return profSave(pend).catch(function () {});
  }).then(function () {
    try { localStorage.removeItem('enstp7-pending-profile'); } catch (e) {}
    auApply();
    if (AU.pendingView || (!AU.prof && !AU.admin)) { var v = AU.pendingView || 'profile'; AU.pendingView = null; acOpen(v); }
    render();
  });
}
function profSave(p) {
  var body = { id: auUid(), email: auEmail(), full_name: String(p.full_name || '').trim(), level: p.level, dept: /^I/.test(p.level) ? p.dept : null, grp: p.grp || null };
  return rest7('profiles?on_conflict=id', { body: body, prefer: 'resolution=merge-duplicates,return=representation' }).then(function (j) { AU.prof = (j && j[0]) || body; auApply(); });
}
function auErrText(e) {
  var m = String((e && e.message) || '');
  if (/bad_domain/.test(m)) return 'Utilisez votre e-mail professionnel @enstp.edu.dz.';
  if (/bad_group/.test(m)) return 'Groupe ou section invalide pour ce niveau.';
  if (/dept_required/.test(m)) return 'Choisissez votre département (DMS ou DIB).';
  if (/Invalid login credentials/i.test(m)) return 'E-mail ou mot de passe incorrect.';
  if (/Email not confirmed/i.test(m)) return 'Confirmez d’abord votre adresse : ouvrez le lien reçu par e-mail.';
  if (/already registered|already exists/i.test(m)) return 'Un compte existe déjà avec cette adresse : connectez-vous.';
  if (/Password should be|weak/i.test(m)) return 'Mot de passe trop faible (8 caractères minimum, avec lettres et chiffres).';
  if (/rate limit|too many/i.test(m)) return 'Trop de tentatives : réessayez dans quelques minutes.';
  if (/Failed to fetch|NetworkError|Load failed/i.test(m)) return 'Connexion impossible : vérifiez votre réseau.';
  if (noDb7(e)) return T7().noDb;
  return m || 'Une erreur est survenue.';
}
function okEmail7(v) { v = String(v || '').trim().toLowerCase(); return /^[^\s@]+@enstp\.edu\.dz$/.test(v) || ADM7.indexOf(v) !== -1; }

/* ---------- fenêtre « Mon compte » : connexion, inscription, profil ---------- */
var AC = { v: 'login', msg: '', err: '', busy: false, f: {} };
function acOpen(v, msg) { AC.v = v || (auUid() ? 'profile' : 'login'); AC.msg = msg || AU.flash || ''; AU.flash = ''; AC.err = ''; AC.busy = false; if (AC.v === 'profile' && AU.prof) AC.f = { full_name: AU.prof.full_name, level: AU.prof.level, dept: AU.prof.dept || '', grp: AU.prof.grp || '' }; acPaint(); }
function acClose() { var m = document.getElementById('modal'); if (m) m.innerHTML = ''; }
function profileModal(open) { if (open) acOpen(); else acClose(); }
function acFields() {
  var f = AC.f, lv = f.level || '', dep = f.dept || '', g = grpOptions(lv, dep);
  return '<label>Nom complet<input name="full_name" maxlength="80" autocomplete="name" required placeholder="Prénom Nom" value="' + esc(f.full_name || '') + '"></label>' +
    '<label>Niveau<select name="level" data-ac="level" required><option value="">Choisir…</option>' + LV7.map(function (l) { return '<option value="' + l[0] + '"' + (lv === l[0] ? ' selected' : '') + '>' + esc(l[1]) + '</option>'; }).join('') + '</select></label>' +
    (/^I/.test(lv) ? '<label>Département<select name="dept" data-ac="dept" required><option value="">Choisir…</option><option value="DMS"' + (dep === 'DMS' ? ' selected' : '') + '>DMS · Matériaux et Structures</option><option value="DIB"' + (dep === 'DIB' ? ' selected' : '') + '>DIB · Infrastructures de Base</option></select></label>' : '') +
    (g.length ? '<label>' + esc(E6U[ttOf(lv, dep)][2].trim()) + '<select name="grp" required><option value="">Choisir…</option>' + g.map(function (o) { return '<option value="' + esc(o.v) + '"' + (f.grp === o.v ? ' selected' : '') + '>' + esc(o.n) + '</option>'; }).join('') + '</select></label>' :
      (ttOf(lv, dep) ? '<p class="ac7-n">Toute la promotion : le document de l’emploi du temps ne distingue pas de groupes.</p>' : ''));
}
function acPaint() {
  var m = document.getElementById('modal'); if (!m) return;
  var v = AC.v, h = '', who = auEmail();
  var tabs = (v === 'login' || v === 'signup') ? '<div class="xg-tabs ac7-tabs"><button type="button" data-acv="login" class="' + (v === 'login' ? 'on' : '') + '">Se connecter</button><button type="button" data-acv="signup" class="' + (v === 'signup' ? 'on' : '') + '">Créer un compte</button></div>' : '';
  if (v === 'login') {
    h = '<h1 id="ac7-h">Espace étudiant</h1><p>Connectez-vous avec votre e-mail professionnel <b dir="ltr">@enstp.edu.dz</b>.</p>' + tabs +
      '<form class="auth-form" data-acf="login" novalidate><label>E-mail<input name="email" type="email" dir="ltr" autocomplete="email" required placeholder="prenom.nom@enstp.edu.dz" value="' + esc(AC.f.email || '') + '"></label>' +
      '<label>Mot de passe<input name="password" type="password" autocomplete="current-password" required minlength="8"></label>' +
      '<div class="auth-actions"><button class="btn btn-default" type="submit"' + (AC.busy ? ' disabled' : '') + '>' + (AC.busy ? 'Connexion…' : 'Se connecter') + '</button><button type="button" class="btn btn-ghost" data-acv="forgot">Mot de passe oublié ?</button></div></form>';
  } else if (v === 'signup') {
    h = '<h1 id="ac7-h">Créer mon compte</h1><p>Réservé aux étudiants de l’ENSTP. Votre niveau et votre groupe sont enregistrés : vous n’aurez plus à les choisir.</p>' + tabs +
      '<form class="auth-form" data-acf="signup" novalidate><label>E-mail professionnel<input name="email" type="email" dir="ltr" autocomplete="email" required placeholder="prenom.nom@enstp.edu.dz" value="' + esc(AC.f.email || '') + '"></label>' +
      '<label>Mot de passe <small>(8 caractères minimum)</small><input name="password" type="password" autocomplete="new-password" required minlength="8"></label>' + acFields() +
      '<div class="auth-actions"><button class="btn btn-default" type="submit"' + (AC.busy ? ' disabled' : '') + '>' + (AC.busy ? 'Création…' : 'Créer mon compte') + '</button></div></form>';
  } else if (v === 'forgot') {
    h = '<h1 id="ac7-h">Mot de passe oublié</h1><p>Recevez un lien pour choisir un nouveau mot de passe.</p><form class="auth-form" data-acf="forgot" novalidate><label>E-mail<input name="email" type="email" dir="ltr" required value="' + esc(AC.f.email || '') + '"></label><div class="auth-actions"><button class="btn btn-default" type="submit">Envoyer le lien</button><button type="button" class="btn btn-ghost" data-acv="login">Retour</button></div></form>';
  } else if (v === 'reset') {
    h = '<h1 id="ac7-h">Nouveau mot de passe</h1><form class="auth-form" data-acf="reset" novalidate><label>Nouveau mot de passe<input name="password" type="password" autocomplete="new-password" required minlength="8"></label><div class="auth-actions"><button class="btn btn-default" type="submit">Enregistrer</button></div></form>';
  } else if (v === 'check') {
    h = '<h1 id="ac7-h">Vérifiez votre boîte mail</h1><p>Un lien de confirmation a été envoyé à <b dir="ltr">' + esc(AC.f.email || '') + '</b>. Ouvrez-le pour activer votre compte : votre profil sera créé automatiquement.</p><div class="auth-actions"><button type="button" class="btn btn-default" data-acv="login">J’ai confirmé, me connecter</button></div>';
  } else {
    /* profil */
    h = '<h1 id="ac7-h">Mon profil</h1><p class="who"><span dir="ltr">' + esc(who) + '</span>' + (AU.admin ? ' <span class="ac7-adm">' + ic('shield', 13) + ' Administrateur</span>' : '') + '</p>' +
      (AU.prof ? '' : '<p>Complétez votre profil pour afficher automatiquement votre emploi du temps.</p>') +
      '<form class="auth-form" data-acf="profile" novalidate>' + acFields() +
      '<div class="auth-actions"><button class="btn btn-default" type="submit"' + (AC.busy ? ' disabled' : '') + '>Enregistrer</button>' + (AU.admin ? '<a class="btn btn-outline" href="#/admin" data-acx="1">' + ic('shield', 15) + ' Panneau admin</a>' : '') +
      '<button type="button" class="btn btn-ghost" data-aclogout="1">' + ic('logout', 15) + ' Se déconnecter</button></div></form>';
  }
  m.innerHTML = '<div class="search-overlay" data-acx="1"><section class="auth-card pf-card ac7" role="dialog" aria-modal="true" aria-labelledby="ac7-h"><button type="button" class="ac7-x" data-acx="1" aria-label="Fermer">' + ic('x', 18) + '</button>' +
    (AC.msg ? '<p class="ac7-msg">' + esc(AC.msg) + '</p>' : '') + h + (AC.err ? '<p class="auth-err" role="alert">' + esc(AC.err) + '</p>' : '') + '</section></div>';
}
function acRead(f) { var o = {}; Array.prototype.forEach.call(f.elements, function (el) { if (el.name) o[el.name] = el.value.trim(); }); return o; }
function acCheckProf(o) {
  if (!o.full_name || o.full_name.length < 2) return 'Indiquez votre nom complet.';
  if (!o.level) return 'Choisissez votre niveau.';
  if (/^I/.test(o.level) && !o.dept) return 'Choisissez votre département (DMS ou DIB).';
  if (grpOptions(o.level, o.dept).length && !o.grp) return 'Choisissez votre groupe ou section.';
  return '';
}
document.addEventListener('click', function (e) {
  var t = e.target.closest && e.target.closest('[data-acv],[data-acx],[data-aclogout]'); if (!t) return;
  if (t.hasAttribute('data-acx')) { if (t.classList.contains('search-overlay') && e.target !== t) return; acClose(); return; }
  if (t.hasAttribute('data-aclogout')) {
    var tok = AU.s && AU.s.access_token;
    if (tok) fetch(SB7.url + '/auth/v1/logout', { method: 'POST', headers: { apikey: SB7.key, Authorization: 'Bearer ' + tok } }).catch(function () {});
    auSave(null); AU.prof = null; AU.admin = false; profile = null; member = null; E6.other = false;
    try { localStorage.removeItem('enstp-go-profile'); localStorage.removeItem('enstp-go-email'); } catch (x) {}
    acClose(); if (route().name === 'admin') location.hash = '#/'; render(); return;
  }
  AC.v = t.getAttribute('data-acv'); AC.err = ''; AC.msg = ''; acPaint();
});
document.addEventListener('change', function (e) {
  var s = e.target; if (!s || !s.hasAttribute || !s.hasAttribute('data-ac')) return;
  var f = s.form; AC.f = Object.assign(AC.f, acRead(f));
  if (s.getAttribute('data-ac') === 'level') { if (!/^I/.test(AC.f.level)) AC.f.dept = ''; AC.f.grp = ''; }
  if (s.getAttribute('data-ac') === 'dept') AC.f.grp = '';
  var pw = f.password ? f.password.value : ''; acPaint(); var f2 = document.querySelector('[data-acf]'); if (f2 && f2.password) f2.password.value = pw;
});
document.addEventListener('submit', function (e) {
  var f = e.target; if (!f || !f.hasAttribute || !f.hasAttribute('data-acf')) return;
  e.preventDefault();
  var k = f.getAttribute('data-acf'), o = acRead(f), fail = function (er) { AC.busy = false; AC.err = typeof er === 'string' ? er : auErrText(er); acPaint(); };
  AC.f = Object.assign(AC.f, o); if (o.email) AC.f.email = o.email.toLowerCase();
  if (k === 'login') {
    if (!o.email || !o.password) return fail('Indiquez votre e-mail et votre mot de passe.');
    AC.busy = true; acPaint();
    auth7('token?grant_type=password', { email: o.email.toLowerCase(), password: o.password }).then(function (j) { auSet(j); AC.busy = false; acClose(); return auLoad(); }).catch(fail);
  } else if (k === 'signup') {
    if (!okEmail7(o.email)) return fail('Utilisez votre e-mail professionnel @enstp.edu.dz.');
    if (!o.password || o.password.length < 8) return fail('Mot de passe : 8 caractères minimum.');
    var bad = acCheckProf(o); if (bad) return fail(bad);
    var pend = { email: o.email.toLowerCase(), full_name: o.full_name, level: o.level, dept: o.dept || null, grp: o.grp || null };
    AC.busy = true; acPaint();
    auth7('signup?redirect_to=' + encodeURIComponent(SITE7), { email: pend.email, password: o.password, data: { full_name: o.full_name } }).then(function (j) {
      lsSet('enstp7-pending-profile', pend);
      if (j && j.access_token) { auSet(j); AC.busy = false; acClose(); return auLoad(); }
      AC.busy = false; AC.v = 'check'; acPaint();
    }).catch(fail);
  } else if (k === 'forgot') {
    if (!o.email) return fail('Indiquez votre e-mail.');
    auth7('recover?redirect_to=' + encodeURIComponent(SITE7), { email: o.email.toLowerCase() }).then(function () { AC.msg = 'Si un compte existe pour cette adresse, un lien vient d’être envoyé.'; AC.v = 'login'; acPaint(); }).catch(fail);
  } else if (k === 'reset') {
    if (!o.password || o.password.length < 8) return fail('Mot de passe : 8 caractères minimum.');
    auFresh().then(function () { return auth7('user', { password: o.password }, 'PUT'); }).then(function () { AC.msg = 'Mot de passe modifié.'; AC.v = 'profile'; acOpen('profile', 'Mot de passe modifié.'); }).catch(fail);
  } else if (k === 'profile') {
    var bad2 = acCheckProf(o); if (bad2) return fail(bad2);
    AC.busy = true; acPaint();
    profSave(o).then(function () { AC.busy = false; E6.other = false; auApply(); acClose(); render(); }).catch(fail);
  }
});

/* =====================================================================
   Rubriques (une seule version : celle de l'accueil)
   ===================================================================== */
var RB7 = [
  { k: 'campus', ic: 'map', c: 1 }, { k: 'salles', ic: 'book', c: 2 }, { k: 'services', ic: 'file', c: 3 }, { k: 'pratique', ic: 'fork', c: 4 },
  { k: 'vie-etudiante', ic: 'users', c: 5 }, { k: 'residence', ic: 'home', c: 6 }, { k: 'stages', ic: 'briefcase', c: 7 },
  { k: 'entrepreneuriat', ic: 'bulb', c: 0 }, { k: 'bookstp', ic: 'library', c: 2 }, { k: 'objets', ic: 'box', c: 5 }
];
RB6 = RB7;
function stgCount7() { var s = {}; STG7.forEach(function (d) { d.o.forEach(function (o) { s[o.n.split(/\s+[–-]\s+/)[0].replace(/\s*\/.*$/, '').trim().toUpperCase()] = 1; }); }); return Object.keys(s).length; }
var RT7L = {
  fr: { campus: ['Plan du campus', '34 lieux'], salles: ['Études', '8 emplois du temps'], services: ['Démarche et demande de document', 'Aide et documents'], pratique: ['Vie pratique', '4 rubriques'], 'vie-etudiante': ['Clubs, sport & sorties', 'Clubs, sport, sorties'], residence: ['Résidence universitaire', 'Hommes et femmes'], stages: ['Stages', ''], entrepreneuriat: ['Entrepreneuriat et Innovation', 'Incubateur & CDE'], bookstp: ['BookSTP', 'Livres, drives, mémoires, guides'], objets: ['Objets trouvés', 'Photographier, publier, récupérer'], decouvrir: ['Découvrir l’ENSTP', ''] },
  en: { campus: ['Campus map', '34 places'], salles: ['Studies', '8 timetables'], services: ['Procedures & documents', 'Help and documents'], pratique: ['Everyday life', '4 sections'], 'vie-etudiante': ['Clubs, sport & outings', 'Clubs, sport, outings'], residence: ['University residence', 'Men and women'], stages: ['Internships', ''], entrepreneuriat: ['Entrepreneurship & Innovation', 'Incubator & CDE'], bookstp: ['BookSTP', 'Books, drives, theses, guides'], objets: ['Lost & found', 'Snap, post, pick up'], decouvrir: ['Discover ENSTP', ''] },
  ar: { campus: ['مخطط الحرم', '34 مكانًا'], salles: ['الدراسة', '8 جداول توقيت'], services: ['الإجراءات وطلب الوثائق', 'مساعدة ووثائق'], pratique: ['الحياة اليومية', '4 أقسام'], 'vie-etudiante': ['النوادي، الرياضة والخرجات', 'نوادٍ، رياضة، خرجات'], residence: ['الإقامة الجامعية', 'رجال ونساء'], stages: ['التربصات', ''], entrepreneuriat: ['المقاولاتية والابتكار', 'الحاضنة و CDE'], bookstp: ['BookSTP', 'كتب، روابط، مذكرات، أدلة'], objets: ['الأغراض الضائعة', 'صوّر، انشر، استرجع'], decouvrir: ['اكتشف المدرسة', ''] }
};
function rbTitle(k) { var t = (RT7L[lang] || RT7L.fr)[k]; return t ? t[0] : k; }
function rbMeta(k) {
  if (k === 'stages') { var n = STG7.length; return lang === 'ar' ? n + ' مجالات' : lang === 'en' ? n + ' fields' : n + ' domaines'; }
  var t = (RT7L[lang] || RT7L.fr)[k]; return t ? t[1] : '';
}
var SUBT7 = {
  'p-plan': 'Plan interactif', 'p-photos': 'Les lieux en photos', 'e-edt': 'Emplois du temps', 'e-tch': 'E-mails des enseignants',
  't-tips': 'Pro tips & conseils pour réussir son stage', 't-reco': 'Nos recommandations', 't-reports': 'Rapports de stages et visites in situ',
  'incubateur': 'L’Incubateur de l’ENSTP', 'cde': 'Le Centre de Développement de l’Entrepreneuriat (CDE)',
  'b-book': 'BOOK — Don et échange', 'b-drives': 'Drives utiles', 'b-pfe': 'Mémoires et PFE', 'b-guides': 'Guides'
};
var SUBT7X = {
  en: { 'p-plan': 'Interactive map', 'p-photos': 'Places in photos', 'e-edt': 'Timetables', 'e-tch': 'Teachers’ emails', 't-tips': 'Pro tips & advice for a successful internship', 't-reco': 'Our recommendations', 't-reports': 'Internship & site-visit reports', 'b-book': 'BOOK — Give & swap', 'b-drives': 'Useful drives', 'b-pfe': 'Theses & final projects', 'b-guides': 'Guides' },
  ar: { 'p-plan': 'المخطط التفاعلي', 'p-photos': 'الأماكن بالصور', 'e-edt': 'جداول التوقيت', 'e-tch': 'بريد الأساتذة', 't-tips': 'نصائح لتربص ناجح', 't-reco': 'توصياتنا', 't-reports': 'تقارير التربصات والزيارات الميدانية', 'b-book': 'BOOK — تبرع وتبادل', 'b-drives': 'روابط Drive مفيدة', 'b-pfe': 'المذكرات ومشاريع التخرج', 'b-guides': 'الأدلة' }
};
function st7(id) { return ((SUBT7X[lang] || {})[id]) || SUBT7[id] || id; }
function rbSubs(k) {
  var r = R();
  switch (k) {
    case 'decouvrir': return (RBS6('decouvrir') || []).filter(function (s) { return s[0] !== 'd-bref' && s[0] !== 'd-hist'; });
    case 'campus': return [['p-plan', st7('p-plan'), campus7Html], ['p-photos', st7('p-photos'), function () { return oldSub('campus', 'p-photos'); }]];
    case 'salles': return [['e-edt', st7('e-edt'), edt7Html], ['e-tch', st7('e-tch'), tchHtml]];
    case 'pratique': return [['v-eat', r.pr[0], function () { return oldSub('pratique', 'v-eat'); }], ['v-trans', r.pr[2], transport7Html], ['v-health', r.pr[3], health7Html], ['v-print', r.pr[1], function () { return oldSub('pratique', 'v-print'); }]];
    case 'stages': return [['t-tips', st7('t-tips'), tips7Html], ['t-reco', st7('t-reco'), reco7Html], ['t-reports', st7('t-reports'), rep7Html]];
    case 'entrepreneuriat': return [['incubateur', st7('incubateur'), function () { return ent7Html('incubateur'); }], ['cde', st7('cde'), function () { return ent7Html('cde'); }]];
    case 'bookstp': return [['b-book', st7('b-book'), book7Html], ['b-drives', st7('b-drives'), drives7Html], ['b-pfe', st7('b-pfe'), pfe7Html], ['b-guides', st7('b-guides'), guides7Html]];
    case 'objets': return [['o-wall', T6().oWall, lf7WallHtml], ['o-post', T6().oPost, lf7PostHtml]];
  }
  return RBS6(k);
}
function rubHref(k) { return k === 'decouvrir' ? subHref('decouvrir', 'd-enstp') : '#/rub/' + k; }

/* ---------- routes ----------
   Toute ancienne adresse mène à la rubrique correspondante de l'accueil. */
var ALIAS7 = {
  campus: ['campus', 'p-plan'], salles: ['salles', 'e-edt'], services: ['services', 's-proc'], aide: ['services', 's-proc'],
  transport: ['pratique', 'v-trans'], manger: ['pratique', 'v-eat'], impression: ['pratique', 'v-print'], sante: ['pratique', 'v-health'],
  sport: ['vie-etudiante', 'l-sport'], loisirs: ['vie-etudiante', 'l-out'], alger: ['vie-etudiante', 'l-out'], clubs: ['vie-etudiante', 'l-clubs'],
  residence: ['residence', 'r-men'], stages: ['stages', 't-tips'], decouvrir: ['decouvrir', 'd-enstp'], ecole: ['decouvrir', 'd-enstp'],
  objets: ['objets', 'o-wall'], entrepreneuriat: ['entrepreneuriat', 'incubateur'], incubateur: ['entrepreneuriat', 'incubateur'], bookstp: ['bookstp', 'b-book']
};
var OLDSUB7 = { 'p-find': 'p-plan', 'p-grow': 'p-plan', 'e-tools': 'e-edt', 'e-room': 'e-edt', 'e-tips': 'e-edt', 't-adv': 't-tips', 'd-bref': 'd-enstp', 'd-hist': 'd-enstp', 'l-meet': 'l-clubs', 's-help': 's-proc', 's-docs': 's-proc' };
function route() {
  var h = location.hash.replace(/^#/, '') || '/', m;
  if ((m = h.match(/^\/r\/([^\/?#]+)\/([^\/?#]+)/))) {
    var k = decodeURIComponent(m[1]), s = decodeURIComponent(m[2]);
    if (OLDSUB7[s] && !(rbSubs(k) || []).some(function (x) { return x[0] === s; })) s = OLDSUB7[s];
    return { name: 'sub', slug: k, sub: s };
  }
  if ((m = h.match(/^\/rub\/([^\/?#]+)/))) return { name: 'home', open: decodeURIComponent(m[1]) };
  if (/^\/admin/.test(h)) return { name: 'admin', slug: 'admin' };
  if ((m = h.match(/^\/guide\/([^\/?#]+)/))) {
    var g = decodeURIComponent(m[1]);
    if (g === 'actualites' || g === 'faq') return { name: 'guide', slug: g };
    if (ALIAS7[g]) return { name: 'sub', slug: ALIAS7[g][0], sub: ALIAS7[g][1] };
    if (RB7.some(function (b) { return b.k === g; })) return { name: 'home', open: g };
    return { name: 'home' };
  }
  if (h.indexOf('/ecole') === 0) return { name: 'sub', slug: 'decouvrir', sub: 'd-enstp' };
  return { name: 'home' };
}
function goPin(n) { st.pin = n; var r = route(); if (r.name === 'sub' && r.slug === 'campus' && r.sub === 'p-plan') render(); else location.hash = '#/r/campus/p-plan'; }

/* =====================================================================
   En-tête : Accueil en premier, menus déroulants, globe des langues
   ===================================================================== */
var NAV7 = ['home', 'decouvrir', 'salles', 'pratique', 'entrepreneuriat', 'actualites', 'faq'];
function navLabel7(k) { var L = R().nav, x = T7(); return k === 'home' ? x.home : k === 'decouvrir' ? L[0] : k === 'salles' ? L[1] : k === 'pratique' ? L[2] : k === 'entrepreneuriat' ? x.ent : k === 'actualites' ? L[3] : 'FAQ'; }
function navHref7(k) { return k === 'home' ? '#/' : gl(k); }
function navLinks(r) {
  var cur = r.name === 'home' ? 'home' : r.slug || '';
  return NAV7.map(function (k) {
    var on = k === cur;
    if (k === 'home' || k === 'actualites' || k === 'faq') return '<a href="' + navHref7(k) + '"' + (on ? ' class="on" aria-current="page"' : '') + '>' + esc(navLabel7(k)) + '</a>';
    return '<div class="x-dd' + (k === 'entrepreneuriat' ? ' x-dd-hover' : '') + '"><button type="button" class="x-ddb' + (on ? ' on' : '') + '" data-dd="' + k + '" aria-expanded="false" aria-haspopup="true">' + esc(navLabel7(k)) + ic('down', 15) + '</button><div class="x-ddm" hidden>' + subLinks(k) + '</div></div>';
  }).join('');
}
function globe7() {
  var cur = LNAME7.filter(function (l) { return l[0] === lang; })[0] || LNAME7[0];
  return '<div class="g7"><button type="button" class="x-ib g7-b" data-g7="1" aria-expanded="false" aria-haspopup="true" aria-label="' + esc(T7().langH) + ' — ' + esc(cur[1]) + '" title="' + esc(T7().langH) + '">' + ic('globe', 19) + '<span>' + esc(cur[2]) + '</span></button>' +
    '<div class="g7-p" hidden role="menu"><p>' + esc(T7().langH) + '</p>' + LNAME7.map(function (l) { return '<button type="button" role="menuitemradio" aria-checked="' + (lang === l[0]) + '" data-lang="' + l[0] + '" lang="' + l[0] + '" class="' + (lang === l[0] ? 'on' : '') + '"><span>' + esc(l[1]) + '</span>' + (lang === l[0] ? ic('check', 15) : '') + '</button>'; }).join('') + '</div></div>';
}
function header(r) {
  var t = T(), x = XT(), mobile = '';
  if (st.menu) {
    var grp = function (k, icn) { return '<details class="x-dg"><summary>' + ic(icn, 18) + '<span>' + esc(navLabel7(k)) + '</span><i class="acc-c" aria-hidden="true"></i></summary><div class="x-dg-b">' + subLinks(k) + '</div></details>'; };
    mobile = '<div class="x7-scrim" data-menu="1" aria-hidden="true"></div><nav id="header-mobile-nav" class="x-drawer x7-drawer" aria-label="' + esc(x.menu) + '"><div class="x-drawer-in">' +
      '<a href="#/">' + ic('home', 18) + esc(navLabel7('home')) + '</a>' + grp('decouvrir', 'building') + grp('salles', 'book') + grp('pratique', 'fork') + grp('entrepreneuriat', 'bulb') +
      '<a href="' + gl('actualites') + '">' + ic('news', 18) + esc(navLabel7('actualites')) + '</a><a href="' + gl('faq') + '">' + ic('faq', 18) + 'FAQ</a>' +
      '<div class="x-drawer-foot"><button type="button" class="x-dbtn" data-profile="1">' + ic('user', 17) + esc(AU.prof ? AU.prof.full_name : auUid() ? auEmail() : 'Se connecter') + '</button><button type="button" class="x-dbtn" data-theme="1" aria-pressed="' + dark + '">' + ic(dark ? 'sun' : 'moon', 17) + esc(x.theme) + '</button></div></div></nav>';
  }
  var nm = AU.prof ? AU.prof.full_name.split(' ')[0] : '';
  return '<header class="x-hd x7-hd' + (st.menu ? ' menu-open' : '') + '"><div class="x-hd-in">' +
    '<a href="#/" class="x-brand" aria-label="ENSTP 360 — ' + esc(x.home) + '">' + brandImg() + '</a>' +
    '<nav class="x-nav" aria-label="Navigation">' + navLinks(r) + '</nav>' +
    '<div class="x-tools">' + globe7() +
    '<button type="button" class="x-ib" aria-label="' + esc(t.search) + '" title="' + esc(t.search) + '" data-search="1">' + ic('search', 19) + '</button>' +
    '<button type="button" class="x-ib x-acc' + (auUid() ? ' is-in' : '') + '" data-profile="1" aria-label="' + esc(x.profile) + '" title="' + esc(AU.prof ? AU.prof.full_name : auUid() ? auEmail() : 'Se connecter') + '">' + ic('user', 19) + (nm ? '<span>' + esc(nm) + '</span>' : '') + '</button>' +
    '<button type="button" class="x-ib theme-btn" data-theme="1" aria-pressed="' + dark + '" aria-label="' + esc(x.theme) + '" title="' + esc(x.theme) + '">' + ic(dark ? 'sun' : 'moon', 18) + '</button>' +
    '<button type="button" class="x-ib x-burger" aria-label="' + esc(st.menu ? x.closeMenu : t.openMenu) + '" aria-expanded="' + st.menu + '" aria-controls="header-mobile-nav" data-menu="1">' + ic(st.menu ? 'x' : 'menu', 20) + '</button>' +
    '</div></div>' + mobile + '</header>';
}
/* globe : rideau des langues */
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-g7]'), p = document.querySelector('.g7-p');
  if (b) { var open = p.hidden; p.hidden = !open; b.setAttribute('aria-expanded', String(open)); b.parentNode.classList.toggle('open', open); return; }
  if (p && !p.hidden && !(e.target.closest && e.target.closest('.g7-p'))) { p.hidden = true; var bb = document.querySelector('[data-g7]'); if (bb) { bb.setAttribute('aria-expanded', 'false'); bb.parentNode.classList.remove('open'); } }
});
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { var p = document.querySelector('.g7-p'); if (p) p.hidden = true; } });
/* menus déroulants : ouverture au survol sur ordinateur (Entrepreneuriat et les autres) */
(function () {
  if (!window.matchMedia || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var tmr = null;
  document.addEventListener('mouseover', function (e) {
    var d = e.target.closest && e.target.closest('.x-nav .x-dd'); if (!d) return;
    clearTimeout(tmr); var m = d.querySelector('.x-ddm'), b = d.querySelector('.x-ddb');
    if (m.hidden) { ddClose(d); m.hidden = false; d.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
  });
  document.addEventListener('mouseout', function (e) {
    var d = e.target.closest && e.target.closest('.x-nav .x-dd'); if (!d || (e.relatedTarget && d.contains(e.relatedTarget))) return;
    tmr = setTimeout(function () { ddClose(); }, 180);
  });
})();

/* =====================================================================
   Accueil minimaliste
   ===================================================================== */
st.rb6 = st.rb6 || {};
function rbRow(b, i) {
  var open = !!st.rb6[b.k], col = CL5[b.c % CL5.length];
  return '<details class="rb6" id="rb-' + b.k + '" data-rb="' + b.k + '"' + (open ? ' open' : '') + '><summary>' +
    '<span class="rb6-n">' + pad2(i + 1) + '</span><span class="ico" style="background:' + col[0] + ';color:' + col[1] + '">' + ic(b.ic, 19, '', 1.8) + '</span>' +
    '<span class="rb6-t"><b>' + esc(rbTitle(b.k)) + '</b><small>' + esc(rbMeta(b.k)) + '</small></span><i class="acc-c" aria-hidden="true"></i></summary>' +
    '<div class="rb6-b">' + subLinks(b.k, 'rb6-l') + '</div></details>';
}
function home() {
  var r = R(), x = XT(), y = T7(), half = Math.ceil(RB7.length / 2), nw = newsSorted().slice(0, 3);
  return '<main id="main" class="h7">' +
    '<section class="x-wrap hero7"><div class="h7-txt"><span class="eyebrow">' + esc(r.eyebrow) + '</span><h1><mark>' + esc(r.h1m) + '</mark>' + esc(r.h1r) + '</h1>' +
    '<blockquote class="h7-q" lang="fr" dir="ltr"><p>“' + esc(y.quote) + '”</p><cite>— ' + esc(y.quoteBy) + '</cite></blockquote></div>' +
    '<figure class="h7-fig"><img src="' + HERO_IMG + '" alt="' + esc(r.imgAlt) + '" width="520" height="512" fetchpriority="high"></figure>' +
    '<section class="srch h7-srch" aria-labelledby="hs-h"><h2 id="hs-h">' + esc(r.sH) + '</h2>' +
    '<form id="hs-form" class="sf" role="search"><label class="in">' + ic('search', 18) + '<span class="x-sr">' + esc(r.sH) + '</span><input id="hs-q" type="search" autocomplete="off" enterkeyhint="search" placeholder="' + esc(r.sPh) + '" value="' + esc(st.hq || '') + '"></label><button type="submit" class="r5btn">' + esc(x.sBtn) + '</button></form>' +
    '<div id="hs-res" class="search-results x-res" aria-live="polite"' + (hsResults() ? '' : ' hidden') + '>' + hsResults() + '</div></section></section>' +
    '<section class="rb6-band" id="rubriques" aria-labelledby="rb6-h"><div class="x-wrap"><div class="rb6-head"><span class="eyebrow">' + esc(T6().explore) + '</span><h2 id="rb6-h">' + esc(T6().rubH) + '</h2><p>' + esc(y.rubP) + '</p></div>' +
    '<div class="rb6-grid"><div class="rb6-col">' + RB7.slice(0, half).map(rbRow).join('') + '</div><div class="rb6-col">' + RB7.slice(half).map(function (b, i) { return rbRow(b, i + half); }).join('') + '</div></div></div></section>' +
    cursusHtml() +
    '<section class="x-wrap sec5"><div class="figs">' + r.figs.map(function (f) { return '<div><b>' + esc(f[0]) + '</b><span>' + esc(f[1]) + '</span></div>'; }).join('') + '</div></section>' +
    (nw.length ? '<section class="x-wrap sec5" id="actualites"><div class="sec-h"><div><span class="eyebrow">' + esc(r.newsE) + '</span><h2>' + esc(r.newsH) + '</h2></div><a class="lnk" href="' + gl('actualites') + '">' + esc(L2(NEWSL).all) + '</a></div><div class="nw-grid">' + nw.map(newsCard).join('') + '</div></section>' : '') +
    '<section class="x-wrap sec5">' + contactBlock(true) + '</section></main>';
}

/* =====================================================================
   Pied de page
   ===================================================================== */
function footer() {
  var y = T7(), r = R();
  return '<footer class="f5 f7"><div class="fg"><div><div class="wm">ENSTP <i>360°</i></div><p class="f7-tag">' + esc(XT().h1 || 'Une vision, sans angle mort.') + '</p><p>' + esc(y.fDesc) + '</p></div>' +
    '<nav aria-label="' + esc(y.fExp) + '"><h2>' + esc(y.fExp) + '</h2><a href="' + rubHref('decouvrir') + '">' + esc(rbTitle('decouvrir')) + '</a><a href="' + rubHref('campus') + '">' + esc(rbTitle('campus')) + '</a><a href="' + rubHref('salles') + '">' + esc(rbTitle('salles')) + '</a><a href="' + rubHref('pratique') + '">' + esc(rbTitle('pratique')) + '</a></nav>' +
    '<nav aria-label="' + esc(y.fUse) + '"><h2>' + esc(y.fUse) + '</h2><a href="https://enstp.edu.dz/" target="_blank" rel="noreferrer">' + esc(y.fSite) + '</a><a href="' + FB_URL + '" target="_blank" rel="noopener noreferrer">Facebook ENSTP</a><a href="' + gl('faq') + '">FAQ</a><a href="' + MAK7 + '" target="_blank" rel="noopener">' + esc(y.fMak) + '</a><a href="' + SSC7 + '" target="_blank" rel="noopener">' + esc(y.fSsc) + '</a></nav>' +
    '<nav aria-label="' + esc(y.fCt) + '"><h2>' + esc(y.fCt) + '</h2><span>BP 32, rue Sidi Garidi, Kouba, 16006 Alger</span><a href="tel:+21323701904"><bdi dir="ltr">+213 (0) 23 70 19 04</bdi></a><a href="mailto:enstp@enstp.edu.dz">enstp@enstp.edu.dz</a><a href="https://www.google.com/maps/dir/?api=1&destination=' + GMP.school.join(',') + '" target="_blank" rel="noopener">' + esc(y.fRoute) + '</a></nav></div>' +
    '<div class="fb"><span>' + new Date().getFullYear() + ' ENSTP 360° · ' + esc(y.rights) + '</span><span>' + esc(y.off) + '</span></div></footer>';
}

/* =====================================================================
   Pages
   ===================================================================== */
/* rubriques dont le contenu n'existe qu'en français */
var FR7 = ['entrepreneuriat', 'bookstp', 'stages'];
function subPage(k, id) {
  var subs = rbSubs(k); if (!subs) return notFound6();
  var s = subs.filter(function (x) { return x[0] === id; })[0]; if (!s) return notFound6();
  var y = T6(), others = subs.filter(function (x) { return x[0] !== id; });
  return '<main class="rp x-wrap sp6 sp7" data-page="' + esc(k + '/' + id) + '">' +
    '<nav class="crumb" aria-label="Breadcrumb"><a href="#/">' + esc(y.home) + '</a><span aria-hidden="true">/</span>' + (k === 'decouvrir' ? '<span>' + esc(rbTitle(k)) + '</span>' : '<a href="' + rubHref(k) + '">' + esc(rbTitle(k)) + '</a>') + '</nav>' +
    '<header class="sp6-hd"><span class="eyebrow">' + esc(rbTitle(k)) + '</span><h1>' + esc(s[1]) + '</h1></header>' +
    '<div class="acc-b sp6-b"' + (lang !== 'fr' && FR7.indexOf(k) !== -1 ? ' lang="fr" dir="ltr"' : '') + '>' + s[2]() + '</div>' +
    (others.length ? '<nav class="sp6-more" aria-label="' + esc(y.more) + '"><h2>' + esc(y.more) + '</h2><div>' + others.map(function (o) { return '<a href="' + subHref(k, o[0]) + '">' + esc(o[1]) + ic('arrow-right', 14, 'rtl-flip') + '</a>'; }).join('') + '</div></nav>' : '') +
    '</main>';
}
function faq6() {
  var y = T6(), L = L2(FAQD);
  return '<main class="rp x-wrap sp6" data-page="faq"><nav class="crumb" aria-label="Breadcrumb"><a href="#/">' + esc(y.home) + '</a></nav><header class="sp6-hd"><span class="eyebrow">FAQ</span><h1>' + esc(G6('faq').title) + '</h1></header>' +
    '<div class="accs">' + L.map(function (q, i) { return acc('q' + (i + 1), q[0], '<p class="r5p">' + esc(q[1]) + '</p>', false); }).join('') + '</div></main>';
}
function news7() {
  var y = T6();
  return '<main class="rp x-wrap sp6 sp7" data-page="actualites"><nav class="crumb" aria-label="Breadcrumb"><a href="#/">' + esc(y.home) + '</a></nav><header class="sp6-hd"><span class="eyebrow">ENSTP 360</span><h1>' + esc(T7().news) + '</h1></header><div class="sp6-b">' + newsPage() + '</div></main>';
}
function page6(r) {
  if (r.name === 'home') return home();
  if (r.name === 'sub') return subPage(r.slug, r.sub);
  if (r.name === 'admin') return admin7();
  if (r.slug === 'faq') return faq6();
  if (r.slug === 'actualites') return news7();
  return home();
}
function render() {
  var r = route();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  var title = XT().title;
  if (r.name === 'sub') { var s = (rbSubs(r.slug) || []).filter(function (x) { return x[0] === r.sub; })[0]; if (s) title = s[1] + ' · ENSTP 360'; }
  else if (r.name === 'admin') title = 'Administration · ENSTP 360';
  else if (r.name === 'guide') title = (r.slug === 'actualites' ? T7().news : r.slug === 'faq' ? 'FAQ' : G6(r.slug).short || r.slug) + ' · ENSTP 360';
  document.title = title;
  var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', XT().metaD);
  if (r.open) st.rb6[r.open] = true;
  document.body.classList.toggle('has-back6', r.name !== 'home' || !!r.open);
  document.body.classList.toggle('menu7', !!st.menu);
  document.getElementById('app').innerHTML = header(r) + page6(r) + footer() + backBtn6(r);
  overlay();
  afterRender(); if (window.asstSync) asstSync();
  after6(r);
}
function backBtn6(r) { return r.name === 'home' && !r.open ? '' : '<button type="button" class="bk6" data-back6="1" aria-label="' + esc(T6().back) + '" title="' + esc(T6().back) + '">' + ic('arrow-left', 20, 'rtl-flip') + '</button>'; }
function after6(r) {
  if (document.getElementById('e6')) e6Mount();
  if (document.getElementById('lf7-list')) lf7Load();
  if (document.getElementById('ssc6')) sscLoad();
  if (document.getElementById('tr6')) tr6Refresh();
  if (document.getElementById('bk7-list')) bk7Load();
  if (document.getElementById('rp7-list')) rp7Load();
  if (document.getElementById('adm7')) adm7Load();
  if (st.guide7 && document.getElementById('cmPins')) guide7Draw();
  if (r.open) {
    var el = document.getElementById('rb-' + r.open);
    if (el) { el.open = true; setTimeout(function () { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); el.classList.add('rb7-flash'); setTimeout(function () { el.classList.remove('rb7-flash'); }, 1600); }, 60); }
  }
  svc7Decorate();
}

/* =====================================================================
   01 · Plan du campus : étages des salles
   ===================================================================== */
var FLOOR7 = [
  [28, 'Salles de cours / sanitaires', [['Rez-de-chaussée', 'Salles de cours & sanitaires'], ['1er étage', 'Salles 7, 8, 9, 16 et 17']]],
  [29, 'Salles de cours', [['Étage', 'Salles 5, 6, 14 et 15']]],
  [30, 'Salles de cours / sanitaires', [['Étage', 'Salles 1, 2, 3, 4, 10, 11, 12 et 13']]],
  [27, 'Salles 10 & 24', [['2e étage', 'Salles 10 et 24']]],
  [23, 'Bibliothèque', [['', 'Salle 25']]]
];
function campus7Html() {
  return oldSub('campus', 'p-plan') +
    '<section class="detail-section fl7"><h2>' + ic('building', 18) + ' Les salles et leurs étages</h2><p class="r5p">D’après le relevé du plan du campus. Touchez un bâtiment pour le voir sur le plan.</p><div class="fl7-g">' +
    FLOOR7.map(function (b) { return '<button type="button" class="fl7-c" data-pin="' + b[0] + '"><span class="fl7-n">' + b[0] + '</span><div><b>' + esc(b[1]) + '</b><ul>' + b[2].map(function (f) { return '<li>' + (f[0] ? '<em>' + esc(f[0]) + '</em> ' : '') + esc(f[1]) + '</li>'; }).join('') + '</ul></div></button>'; }).join('') +
    '</div></section>';
}
/* « Me guider vers la salle » : itinéraire tracé depuis l'entrée (1) */
function guideTo7(n) { st.guide7 = n; var r = route(); if (r.name === 'sub' && r.slug === 'campus' && r.sub === 'p-plan') render(); else location.hash = '#/r/campus/p-plan'; }
function guide7Draw() {
  var n = st.guide7; st.guide7 = null;
  try {
    cmSet('a'); wf = { a: '1', b: String(n) };
    var A = document.getElementById('wfA'), B = document.getElementById('wfB'); if (A) A.value = '1'; if (B) B.value = String(n);
    wfDraw(); cmShow(n);
    var w = document.querySelector('.cm-wrap'); if (w) w.scrollIntoView({ block: 'center' });
  } catch (e) {}
}
document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('[data-guide7]'); if (!b) return; e.preventDefault(); guideTo7(parseInt(b.getAttribute('data-guide7'), 10)); });

/* =====================================================================
   02 · Études : emploi du temps du profil, consultation d'autres groupes
   ===================================================================== */
function e7Bar() {
  var p = AU.prof, mine = p && ttOf(p.level, p.dept);
  if (p && mine) {
    var isMine = E6.lv === p.level && (E6.dep || '') === (p.dept || '') && (E6.u || '') === (p.grp || '');
    return '<div class="e7-me">' + ic('user', 15) + '<span>' + (isMine ? 'Votre emploi du temps : <b>' + esc(profLabel(p)) + '</b>. Choisissez un autre niveau ou groupe pour le consulter.' : 'Vous consultez un autre emploi du temps que le vôtre (' + esc(profLabel(p)) + ').') + '</span>' + (isMine ? '' : '<button type="button" class="r5out" data-e7me="1">Revenir à mon emploi du temps</button>') + '</div>';
  }
  if (!auUid()) return '<div class="e7-me">' + ic('lock', 15) + '<span>Connectez-vous : votre emploi du temps s’affichera automatiquement.</span><button type="button" class="r5out" data-profile="1">Se connecter</button></div>';
  return '';
}
function edt7Html() { return '<div id="e7-bar">' + e7Bar() + '</div>' + edt6Html(); }
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-e6lv],[data-e6dep],[data-e6u],[data-e7me]'); if (!b) return;
  if (b.hasAttribute('data-e7me')) { E6.other = false; auApply(); e6Paint(false); var bb = document.getElementById('e7-bar'); if (bb) bb.innerHTML = e7Bar(); return; }
  setTimeout(function () {
    var p = AU.prof; if (p) { E6.other = !(E6.lv === p.level && (E6.dep || '') === (p.dept || '') && (E6.u || '') === (p.grp || '')); e6Save(); }
    var bb = document.getElementById('e7-bar'); if (bb) bb.innerHTML = e7Bar();
  }, 0);
}, true);
/* emplois du temps modifiés par l'administration */
var EDT6ORIG = JSON.parse(JSON.stringify(EDT6));
function tt7Load() {
  return rest7('timetable_overrides?select=tt_id,data,updated_at').then(function (rows) {
    (rows || []).forEach(function (row) {
      var d = row.data; if (!d || !Array.isArray(d.days)) return;
      d.id = row.tt_id; d.upd = row.updated_at;
      for (var i = 0; i < EDT6.length; i++) if (EDT6[i].id === row.tt_id) EDT6[i] = d;
    });
    if (document.getElementById('e6')) e6Paint(true);
  }).catch(function () {});
}

/* une seule rubrique Transport : le lien vers l'ancienne page « ENSTP Travel » (doublon) est retiré */
function transport7Html() { return transport6Html().replace(/<a class="r5out" href="#\/guide\/transport">[\s\S]*?<\/a>/, ''); }

/* =====================================================================
   04 · Vie pratique : santé (collaboration clinique dentaire avec logo)
   ===================================================================== */
function health7Html() {
  var r = R();
  return '<div class="r5collab cl7"><img class="cl7-logo" src="images/v7/merzak-smile-logo.png" alt="Merzak Smile — Dental Clinic" width="74" height="96" loading="lazy"><div class="cl7-t"><span>' + esc(r.collab) + '</span><b>ENSTP 360 × Clinique dentaire Merzak Smile Kouba</b></div><a class="r5btn" href="https://maps.app.goo.gl/NFPQQDGWjskr1Ex4A?g_st=iw" target="_blank" rel="noopener">' + ic('map-pin', 15) + ' ' + esc(r.loc) + ' ' + ic('arrow-up-right', 14) + '</a></div>' + oldSub('pratique', 'v-health');
}

/* =====================================================================
   Likes / dislikes de chaque service (Google Maps, cantine, Makelty…)
   ===================================================================== */
var SV7 = { c: {}, mine: null, pending: {}, nodb: false };
function slug7(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 72); }
function svKey(card) {
  if (card.hasAttribute('data-sv7')) return card.getAttribute('data-sv7');
  var a = card.querySelector('a[href*="google.com/maps"],a[href*="maps.google"],a[href*="goo.gl"],a[href*="maps.app"]');
  if (a) {
    var h = a.getAttribute('href'), m;
    if ((m = h.match(/[?&]cid=(\d+)/))) return 'gm-' + m[1];
    if ((m = h.match(/goo\.gl\/(?:maps\/)?([A-Za-z0-9_-]+)/))) return 'gl-' + slug7(m[1]);
    if ((m = h.match(/[?&](?:query|q)=([^&]+)/))) return 'gq-' + slug7(decodeURIComponent(m[1].replace(/\+/g, ' ')));
  }
  var t = card.querySelector('h3'); return t ? 'sv-' + slug7(t.textContent) : '';
}
function svBar(k) {
  var c = SV7.c[k] || { likes: 0, dislikes: 0 }, v = SV7.mine ? SV7.mine[k] || 0 : 0, y = T7();
  return '<button type="button" class="sv7-b sv7-up' + (v === 1 ? ' on' : '') + '" data-sv7v="1" aria-pressed="' + (v === 1) + '" aria-label="' + esc(y.like) + '">' + ic('thumb-up', 15) + '<b>' + (c.likes || 0) + '</b></button>' +
    '<button type="button" class="sv7-b sv7-down' + (v === -1 ? ' on' : '') + '" data-sv7v="-1" aria-pressed="' + (v === -1) + '" aria-label="' + esc(y.dislike) + '">' + ic('thumb-down', 15) + '<b>' + (c.dislikes || 0) + '</b></button>';
}
function svPaint(k) { Array.prototype.forEach.call(document.querySelectorAll('.sv7[data-svk="' + k + '"]'), function (el) { el.innerHTML = svBar(k); }); }
var svTimer = null;
function svc7Decorate() {
  var keys = [];
  var add = function (host, k, where) {
    if (!k || host.querySelector('.sv7') || (host.nextElementSibling && host.nextElementSibling.classList.contains('sv7'))) return;
    var d = document.createElement('div'); d.className = 'sv7'; d.setAttribute('data-svk', k); d.innerHTML = svBar(k);
    if (where === 'after') host.parentNode.insertBefore(d, host.nextSibling); else (host.querySelector('.xg-body, .wr6-b') || host).appendChild(d);
    keys.push(k);
  };
  Array.prototype.forEach.call(document.querySelectorAll('#app .xg-card, #app .al-card, #app .wr6-card'), function (card) {
    if (!card.querySelector('a[href*="google.com/maps"],a[href*="maps.google"],a[href*="goo.gl"],a[href*="maps.app"]')) return;
    add(card, svKey(card));
  });
  Array.prototype.forEach.call(document.querySelectorAll('#app [data-cant-open]'), function (b) { add(b, 'cantine-enstp', 'after'); });
  Array.prototype.forEach.call(document.querySelectorAll('#app .r5collab'), function (c) {
    var t = c.textContent; add(c, /Makelty/i.test(t) ? 'makelty-healthy' : /Merzak/i.test(t) ? 'merzak-smile-kouba' : 'sv-' + slug7(t.slice(0, 40)), 'after');
  });
  if (keys.length) svLoad(keys);
}
function svLoad(keys) {
  var need = keys.filter(function (k) { return !(k in SV7.c) && !SV7.pending[k]; });
  need.forEach(function (k) { SV7.pending[k] = 1; });
  if (need.length && !SV7.nodb) {
    rest7('service_counts?select=service,likes,dislikes&service=in.(' + need.map(encodeURIComponent).join(',') + ')').then(function (rows) {
      need.forEach(function (k) { SV7.c[k] = { likes: 0, dislikes: 0 }; delete SV7.pending[k]; });
      (rows || []).forEach(function (r) { SV7.c[r.service] = r; });
      need.forEach(svPaint);
    }).catch(function (e) { if (noDb7(e)) SV7.nodb = true; need.forEach(function (k) { delete SV7.pending[k]; }); });
  }
  if (auUid() && SV7.mine === null) {
    SV7.mine = {};
    rest7('service_votes?select=service,vote&voter=eq.' + auUid()).then(function (rows) { (rows || []).forEach(function (r) { SV7.mine[r.service] = r.vote; }); keys.forEach(svPaint); }).catch(function () {});
  }
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-sv7v]'); if (!b) return;
  e.preventDefault(); e.stopPropagation();
  var box = b.closest('.sv7'), k = box.getAttribute('data-svk'), v = +b.getAttribute('data-sv7v');
  if (SV7.nodb) { svToast(box, T7().noDb); return; }
  if (!auUid()) { acOpen('login', T7().needLogin); return; }
  if (!AU.prof && !AU.admin) { acOpen('profile', 'Complétez votre profil pour voter.'); return; }
  SV7.mine = SV7.mine || {};
  var prev = SV7.mine[k] || 0, next = prev === v ? 0 : v, c = SV7.c[k] || { likes: 0, dislikes: 0 };
  SV7.c[k] = { likes: Math.max(0, c.likes + (next === 1) - (prev === 1)), dislikes: Math.max(0, c.dislikes + (next === -1) - (prev === -1)) };
  SV7.mine[k] = next; svPaint(k);
  rest7('rpc/svc_vote', { body: { p_service: k, p_vote: next } }).then(function (rows) { var r = rows && rows[0]; if (r) { SV7.c[k] = { likes: r.likes, dislikes: r.dislikes }; svPaint(k); } })
    .catch(function (er) { SV7.mine[k] = prev; SV7.c[k] = c; svPaint(k); svToast(box, auErrText(er)); });
}, true);
function svToast(box, msg) { var t = document.createElement('small'); t.className = 'sv7-t'; t.textContent = msg; box.appendChild(t); setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 4000); }
/* les cartes chargées après coup (filtres, onglets) reçoivent aussi leurs boutons */
new MutationObserver(function () { clearTimeout(svTimer); svTimer = setTimeout(svc7Decorate, 120); }).observe(document.getElementById('app'), { childList: true, subtree: true });

/* =====================================================================
   07 · Stages
   ===================================================================== */
function tips7Html() { return oldSub('stages', 't-tips') + oldSub('stages', 't-adv'); }
var RC7 = { d: -1, q: '' };
function reco7Rows() {
  var q = nz7(RC7.q), out = '', tot = 0;
  STG7.forEach(function (d, di) {
    if (RC7.d >= 0 && RC7.d !== di) return;
    var rows = d.o.filter(function (o) { return !q || nz7(o.n + ' ' + o.w.map(function (w) { return w.join(' '); }).join(' ')).indexOf(q) !== -1; });
    if (!rows.length) return; tot += rows.length;
    rows.forEach(function (o, i) {
      out += '<tr' + (i === 0 ? ' class="stg-first"' : '') + '>' + (i === 0 ? '<th scope="rowgroup" rowspan="' + rows.length + '"><span class="stg-code" dir="ltr">' + (di + 1) + '</span>' + esc(d.h) + '</th>' : '') +
        '<td><b class="rc7-n">' + esc(o.n) + '</b>' + (o.w.length ? '<span class="rc7-w">' + o.w.map(function (w) { return '<span>' + esc(w[0]) + (w[1] ? ' <i dir="ltr">' + esc(w[1]) + '</i>' : '') + '</span>'; }).join('') + '</span>' : '') + '</td></tr>';
    });
  });
  return tot ? '<div class="stg-wrap"><table class="stg-table rc7-t"><thead><tr><th scope="col">Domaine</th><th scope="col">Organisme · wilaya(s)</th></tr></thead><tbody>' + out + '</tbody></table></div>' : '<p class="ed-note">Aucun organisme ne correspond à cette recherche.</p>';
}
function nz7(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ' '); }
function reco7Html() {
  return '<section class="detail-section" id="recommandations"><p>Organismes recommandés, classés par domaine. <span class="stg-n">' + stgCount7() + ' organismes · ' + STG7.length + ' domaines</span></p>' +
    '<div class="xg-tabs rc7-tabs" role="tablist"><button type="button" data-rc7="-1" class="' + (RC7.d < 0 ? 'on' : '') + '">Tous</button>' + STG7.map(function (d, i) { return '<button type="button" data-rc7="' + i + '" class="' + (RC7.d === i ? 'on' : '') + '">' + (i + 1) + '. ' + esc(d.h.replace(/ et organismes de travaux publics à cibler en priorité/, '')) + '</button>'; }).join('') + '</div>' +
    '<label class="tr6-q rc7-q">' + ic('search', 16) + '<input id="rc7-q" type="search" autocomplete="off" placeholder="Rechercher un organisme ou une wilaya…" value="' + esc(RC7.q) + '"></label>' +
    '<div id="rc7-body">' + reco7Rows() + '</div><p class="inf6-note">' + ic('info', 14) + ' Contactez directement les organismes avec votre CV et votre demande de stage : les places et les conditions d’accueil varient d’une année à l’autre.</p></section>';
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-rc7]'); if (!b) return;
  RC7.d = +b.getAttribute('data-rc7'); Array.prototype.forEach.call(document.querySelectorAll('[data-rc7]'), function (x) { x.classList.toggle('on', x === b); });
  document.getElementById('rc7-body').innerHTML = reco7Rows();
});
document.addEventListener('input', function (e) { if (e.target && e.target.id === 'rc7-q') { RC7.q = e.target.value; document.getElementById('rc7-body').innerHTML = reco7Rows(); } });

/* rapports de stage et de visite in situ (base partagée) */
var RP7 = { items: [], state: 'idle', f: 'all', msg: '' };
function rep7Html() {
  return '<p class="inf6-lead">Partagez le lien de votre rapport de stage ou de visite in situ (Google Drive, PDF en ligne…) : il reste consultable par tous les étudiants. Vérifiez que le lien est ouvert en lecture.</p>' +
    '<div class="xg-tabs rp7-tabs">' + [['all', 'Tous'], ['stage', 'Rapports de stage'], ['visite', 'Visites in situ']].map(function (t) { return '<button type="button" data-rp7f="' + t[0] + '" class="' + (RP7.f === t[0] ? 'on' : '') + '">' + t[1] + '</button>'; }).join('') + '</div>' +
    '<div id="rp7-list" aria-live="polite">' + rp7List() + '</div>' + rp7Form();
}
function rp7Form() {
  if (!auUid()) return '<div class="e7-me">' + ic('lock', 15) + '<span>Connectez-vous avec votre compte étudiant pour partager un rapport.</span><button type="button" class="r5out" data-profile="1">Se connecter</button></div>';
  var yr = new Date().getFullYear();
  return '<form class="lf6-post rp7-form" id="rp7-form"><h3>Partager un rapport</h3><div class="lf6-fields">' +
    '<label>Type<select name="kind" required><option value="stage">Rapport de stage</option><option value="visite">Visite in situ</option></select></label>' +
    '<label>Titre<input name="title" maxlength="160" required placeholder="ex. Stage de suivi de chantier — viaduc…"></label>' +
    '<label>Organisme / lieu<input name="organisme" maxlength="120" placeholder="ex. COSIDER Ouvrages d’Art"></label>' +
    '<label>Année<input name="year" type="number" min="2000" max="' + (yr + 1) + '" value="' + yr + '"></label>' +
    '<label>Niveau<select name="level"><option value="">—</option>' + LV7.map(function (l) { return '<option value="' + l[0] + '"' + (AU.prof && AU.prof.level === l[0] ? ' selected' : '') + '>' + esc(l[1]) + '</option>'; }).join('') + '</select></label>' +
    '<label>Lien du document (https://…)<input name="url" type="url" required dir="ltr" placeholder="https://drive.google.com/…"></label></div>' +
    '<p class="ssc6-err" id="rp7-msg" role="alert">' + esc(RP7.msg) + '</p><div class="r5acts"><button class="lf6-btn" type="submit">' + ic('check', 16) + ' Publier</button></div></form>';
}
function canDel7(it) { return AU.admin || (it.owner && it.owner === auUid()); }
function rp7List() {
  if (RP7.state === 'nodb') return '<p class="inf6-note">' + ic('info', 14) + ' ' + esc(T7().noDb) + '</p>';
  if (RP7.state === 'error') return '<p class="ed-note">Impossible de charger les rapports pour le moment. Vérifiez votre connexion.</p>';
  if (RP7.state !== 'ready') return '<p class="ed-note">Chargement…</p>';
  var l = RP7.items.filter(function (x) { return RP7.f === 'all' || x.kind === RP7.f; });
  if (!l.length) return '<div class="lf6-empty">' + ic('file', 30, '', 1.4) + '<p>Aucun rapport partagé pour le moment. Soyez le premier !</p></div>';
  return '<div class="rp7-g">' + l.map(function (x) {
    return '<article class="rp7-c"><span class="rp7-k">' + (x.kind === 'visite' ? 'Visite in situ' : 'Stage') + '</span><h3>' + esc(x.title) + '</h3><p>' + [x.organisme, x.year, lvLabel(x.level)].filter(Boolean).map(esc).join(' · ') + '</p>' +
      '<div class="r5acts"><a class="r5btn" href="' + esc(x.url) + '" target="_blank" rel="noopener noreferrer">' + ic('file', 15) + ' Ouvrir ' + ic('arrow-up-right', 13) + '</a>' + (canDel7(x) ? '<button type="button" class="r5out" data-del7="reports" data-id="' + esc(x.id) + '">' + ic('trash', 14) + ' Supprimer</button>' : '') + '</div></article>';
  }).join('') + '</div>';
}
function rp7Load() {
  rest7('reports?select=*&order=created_at.desc&limit=200').then(function (j) { RP7.items = j || []; RP7.state = 'ready'; var el = document.getElementById('rp7-list'); if (el) el.innerHTML = rp7List(); })
    .catch(function (e) { RP7.state = noDb7(e) ? 'nodb' : 'error'; var el = document.getElementById('rp7-list'); if (el) el.innerHTML = rp7List(); });
}
document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('[data-rp7f]'); if (!b) return; RP7.f = b.getAttribute('data-rp7f'); Array.prototype.forEach.call(document.querySelectorAll('[data-rp7f]'), function (x) { x.classList.toggle('on', x === b); }); document.getElementById('rp7-list').innerHTML = rp7List(); });
document.addEventListener('submit', function (e) {
  var f = e.target; if (!f || f.id !== 'rp7-form') return; e.preventDefault();
  var o = acRead(f), msg = document.getElementById('rp7-msg');
  if (!/^https:\/\/\S+$/.test(o.url)) { msg.textContent = 'Le lien doit commencer par https://'; return; }
  if (o.title.length < 3) { msg.textContent = 'Indiquez un titre.'; return; }
  f.querySelector('button[type=submit]').disabled = true; msg.textContent = 'Publication…';
  rest7('reports', { body: { kind: o.kind, title: o.title, organisme: o.organisme || null, year: o.year ? +o.year : null, level: o.level || null, url: o.url, owner: auUid() }, prefer: 'return=representation' })
    .then(function () { RP7.msg = ''; f.reset(); msg.textContent = 'Merci ! Votre rapport est publié.'; rp7Load(); })
    .catch(function (er) { msg.textContent = auErrText(er); }).then(function () { f.querySelector('button[type=submit]').disabled = false; });
});

/* =====================================================================
   08 · Entrepreneuriat et Innovation
   ===================================================================== */
function ini7(n) { return n.replace(/^(M\.|Mme|Mlle)\s+/, '').split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join(''); }
function ent7Html(k) {
  var E = ENT7[k];
  return '<div class="en7">' +
    '<section class="en7-hero"><div class="en7-logo" style="background:' + E.logoBg + '"><img src="' + E.logo + '" alt="Logo — ' + esc(E.title) + '" loading="lazy"></div><div><span class="eyebrow">' + esc(E.tag) + '</span>' + E.intro.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div></section>' +
    '<section class="en7-s"><h2>' + esc(E.missionsH) + '</h2><div class="en7-mg">' + E.missions.map(function (m) { return '<article class="en7-m"><span class="en7-ic">' + ic(m[0], 20, '', 1.8) + '</span><h3>' + esc(m[1]) + '</h3><p>' + esc(m[2]) + '</p></article>'; }).join('') + '</div></section>' +
    '<section class="en7-s"><h2>' + esc(E.teamH) + '</h2><div class="en7-tg">' + E.team.map(function (t) {
      return '<article class="en7-t">' + (t[3] ? '<img src="' + t[3] + '" alt="' + esc(t[0]) + '" loading="lazy">' : '<span class="en7-av">' + esc(ini7(t[0])) + '</span>') + '<div><h3>' + esc(t[0]) + '</h3><p class="en7-role">' + esc(t[1]) + '</p><p class="en7-st">' + esc(t[2]) + '</p></div></article>';
    }).join('') + '</div></section>' +
    '<section class="en7-s"><h2>' + esc(E.doneH) + '</h2><ol class="en7-tl">' + E.done.map(function (d) { return '<li>' + (d[0] ? '<time>' + esc(d[0]) + '</time>' : '') + '<b>' + esc(d[1]) + '</b><span>' + esc(d[2]) + '</span></li>'; }).join('') + '</ol></section>' +
    '<section class="en7-s en7-ct"><h2>' + esc(E.contactH) + '</h2><div class="en7-kv">' + E.contact.map(function (c) { return '<div>' + ic(c[0], 17) + '<span><small>' + esc(c[1]) + '</small>' + (c[3] ? '<a href="' + c[3] + '" dir="ltr">' + esc(c[2]) + '</a>' : esc(c[2])) + '</span></div>'; }).join('') + '</div></section></div>';
}

/* =====================================================================
   09 · BookSTP
   ===================================================================== */
var BK7 = { items: [], state: 'idle', q: '' };
function book7Html() {
  return '<p class="inf6-lead">Donnez ou échangez vos livres entre étudiants : publiez une annonce, les autres vous contactent directement. Ce n’est pas une bibliothèque de PDF.</p>' +
    (auUid() ? '<form class="lf6-post bk7-form" id="bk7-form"><h3>Publier une annonce</h3><div class="lf6-fields"><label>Nom du livre<input name="title" maxlength="140" required placeholder="ex. Résistance des matériaux"></label><label>Nom de l’écrivain<input name="author" maxlength="120" required placeholder="ex. Jean Courbon"></label><label>Où me contacter ?<input name="contact" maxlength="160" required placeholder="e-mail, téléphone, Instagram…"></label></div><p class="ssc6-err" id="bk7-msg" role="alert"></p><div class="r5acts"><button class="lf6-btn" type="submit">' + ic('check', 16) + ' Publier l’annonce</button></div></form>'
      : '<div class="e7-me">' + ic('lock', 15) + '<span>Connectez-vous avec votre compte étudiant pour publier une annonce.</span><button type="button" class="r5out" data-profile="1">Se connecter</button></div>') +
    '<h3 class="bk7-h">Annonces publiées</h3><label class="tr6-q">' + ic('search', 16) + '<input id="bk7-q" type="search" autocomplete="off" placeholder="Rechercher un livre ou un auteur…" value="' + esc(BK7.q) + '"></label><div id="bk7-list" aria-live="polite">' + bk7List() + '</div>';
}
function bk7List() {
  if (BK7.state === 'nodb') return '<p class="inf6-note">' + ic('info', 14) + ' ' + esc(T7().noDb) + '</p>';
  if (BK7.state === 'error') return '<p class="ed-note">Impossible de charger les annonces pour le moment. Vérifiez votre connexion.</p>';
  if (BK7.state !== 'ready') return '<p class="ed-note">Chargement…</p>';
  var q = nz7(BK7.q), l = BK7.items.filter(function (x) { return !q || nz7(x.title + ' ' + x.author).indexOf(q) !== -1; });
  if (!l.length) return '<div class="lf6-empty">' + ic('book', 30, '', 1.4) + '<p>' + (BK7.items.length ? 'Aucune annonce ne correspond.' : 'Aucune annonce pour le moment.') + '</p></div>';
  return '<div class="bk7-g">' + l.map(function (x) {
    var c = String(x.contact || ''), link = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c) ? 'mailto:' + c : /^\+?[\d\s.-]{8,}$/.test(c) ? 'tel:' + c.replace(/[^\d+]/g, '') : '';
    return '<article class="bk7-c"><span class="bk7-ic">' + ic('book', 20, '', 1.7) + '</span><div><h4>' + esc(x.title) + '</h4><p class="bk7-a">' + esc(x.author) + '</p><p class="bk7-ct">' + ic('message', 13) + ' ' + (link ? '<a href="' + esc(link) + '" dir="ltr">' + esc(c) + '</a>' : '<span>' + esc(c) + '</span>') + '</p><time datetime="' + esc(x.created_at) + '">' + esc(agoTxt(x.created_at)) + '</time>' +
      (canDel7(x) ? '<button type="button" class="bk7-del" data-del7="book_offers" data-id="' + esc(x.id) + '" aria-label="Supprimer">' + ic('trash', 14) + '</button>' : '') + '</div></article>';
  }).join('') + '</div>';
}
function bk7Paint() { var el = document.getElementById('bk7-list'); if (el) el.innerHTML = bk7List(); }
function bk7Load() {
  rest7('book_offers?select=*&order=created_at.desc&limit=300').then(function (j) { BK7.items = j || []; BK7.state = 'ready'; bk7Paint(); })
    .catch(function (e) { BK7.state = noDb7(e) ? 'nodb' : 'error'; bk7Paint(); });
}
rtOn('book_offers', function () { if (document.getElementById('bk7-list')) bk7Load(); });
document.addEventListener('input', function (e) { if (e.target && e.target.id === 'bk7-q') { BK7.q = e.target.value; bk7Paint(); } });
document.addEventListener('submit', function (e) {
  var f = e.target; if (!f || f.id !== 'bk7-form') return; e.preventDefault();
  var o = acRead(f), msg = document.getElementById('bk7-msg');
  if (o.title.length < 2 || o.author.length < 2 || o.contact.length < 3) { msg.textContent = 'Remplissez les trois champs.'; return; }
  f.querySelector('button[type=submit]').disabled = true; msg.textContent = 'Publication…';
  rest7('book_offers', { body: { title: o.title, author: o.author, contact: o.contact, owner: auUid() }, prefer: 'return=representation' })
    .then(function (j) { if (j && j[0]) BK7.items.unshift(j[0]); f.reset(); msg.textContent = 'Annonce publiée, merci !'; bk7Paint(); })
    .catch(function (er) { msg.textContent = auErrText(er); }).then(function () { f.querySelector('button[type=submit]').disabled = false; });
});
function drives7Html() {
  return '<p class="inf6-lead">Dossiers Google Drive partagés, classés par année.</p><div class="dr7-g">' + DRV7.map(function (d) {
    return '<article class="dr7-c"><div class="dr7-h"><span class="dr7-k">' + esc(d[0]) + '</span><small>' + esc(d[1]) + '</small></div>' + d[2].map(function (u, i) { return '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + ic('folder', 16) + '<span>Drive ' + esc(d[0]) + (d[2].length > 1 ? ' · ' + (i + 1) : '') + '</span>' + ic('arrow-up-right', 13) + '</a>'; }).join('') + '</article>';
  }).join('') + '</div><p class="inf6-note">' + ic('info', 14) + ' Les dossiers s’ouvrent dans Google Drive ; l’accès dépend des droits de partage choisis par leurs propriétaires.</p>';
}
var PF7 = { d: 'all', y: 'all' };
function pfe7Html() {
  var years = [2026, 2025, 2024, 2023, 2022, 2021];
  return '<p class="inf6-lead">Mémoires et projets de fin d’études de l’ENSTP disponibles en ligne (2021 – 2026), relevés sur le dépôt officiel DSpace de l’école et sur le compte Calaméo du Centre de calcul de l’ENSTP. Classés par promotion, département et spécialité.</p>' +
    '<div class="pf7-f"><div class="xg-tabs">' + [['all', 'Tous les départements'], ['DIB', 'DIB'], ['DMS', 'DMS'], ['', 'Non précisé']].map(function (t) { return '<button type="button" data-pf7d="' + t[0] + '" class="' + (PF7.d === t[0] ? 'on' : '') + '">' + t[1] + '</button>'; }).join('') + '</div>' +
    '<div class="xg-tabs">' + ['all'].concat(years).map(function (y) { return '<button type="button" data-pf7y="' + y + '" class="' + (String(PF7.y) === String(y) ? 'on' : '') + '">' + (y === 'all' ? 'Toutes les promotions' : y) + '</button>'; }).join('') + '</div></div>' +
    '<div id="pf7-body">' + pfe7Body() + '</div>' +
    '<h3 class="bk7-h">Tout le dépôt de l’ENSTP</h3><div class="dr7-g">' + PFE7COL.map(function (c) { return '<a class="pf7-col" href="' + c[2] + '" target="_blank" rel="noopener noreferrer"><b>' + esc(c[0]) + '</b><small>' + esc(c[1]) + '</small>' + ic('arrow-up-right', 14) + '</a>'; }).join('') + '</div>' +
    '<p class="inf6-note">' + ic('info', 14) + ' Liste relevée le 18 novembre 2026 ; seuls des documents réellement en ligne sont cités. Pour la promotion 2026, la notice DSpace regroupe auteurs et encadrants dans un même champ.</p>';
}
function pfe7Body() {
  var l = PFE7.filter(function (p) { return (PF7.d === 'all' || p[1] === PF7.d) && (PF7.y === 'all' || String(p[0]) === String(PF7.y)); });
  if (!l.length) return '<p class="ed-note">Aucun mémoire pour ce filtre.</p>';
  var out = '', ys = [];
  l.forEach(function (p) { if (ys.indexOf(p[0]) === -1) ys.push(p[0]); });
  ys.forEach(function (y) {
    out += '<section class="pf7-y"><h3><span>Promotion ' + y + '</span><small>' + (y - 1) + ' / ' + y + '</small></h3>';
    var deps = []; l.filter(function (p) { return p[0] === y; }).forEach(function (p) { var k = (p[1] || '—') + '|' + p[2]; if (deps.indexOf(k) === -1) deps.push(k); });
    deps.forEach(function (k) {
      var dd = k.split('|');
      out += '<h4 class="pf7-d"><span class="pf7-dep">' + esc(dd[0] === '—' ? 'Département non précisé' : dd[0]) + '</span>' + esc(dd[1]) + '</h4><div class="pf7-g">' +
        l.filter(function (p) { return p[0] === y && (p[1] || '—') + '|' + p[2] === k; }).map(function (p) {
          return '<article class="pf7-c"><h5><a href="' + p[6] + '" target="_blank" rel="noopener noreferrer">' + esc(p[3]) + '</a></h5><p class="pf7-a"><b>' + (y === 2026 ? 'Auteurs & encadrement' : 'Auteurs') + ' :</b> ' + esc(p[4]) + '</p>' + (p[5] ? '<p class="pf7-a"><b>Encadrement :</b> ' + esc(p[5]) + '</p>' : '') +
            '<div class="pf7-m"><span class="pf7-b pf7-' + p[7] + '">' + (p[7] === 'pdf' ? 'PDF' : p[7] === 'item' ? 'Notice + PDF' : 'Lecture en ligne') + '</span><span>' + esc(p[8]) + '</span><span>' + y + '</span></div></article>';
        }).join('') + '</div>';
    });
    out += '</section>';
  });
  return out;
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-pf7d],[data-pf7y]'); if (!b) return;
  if (b.hasAttribute('data-pf7d')) { PF7.d = b.getAttribute('data-pf7d'); Array.prototype.forEach.call(document.querySelectorAll('[data-pf7d]'), function (x) { x.classList.toggle('on', x === b); }); }
  else { PF7.y = b.getAttribute('data-pf7y'); Array.prototype.forEach.call(document.querySelectorAll('[data-pf7y]'), function (x) { x.classList.toggle('on', x === b); }); }
  document.getElementById('pf7-body').innerHTML = pfe7Body();
});
function guides7Html() {
  return '<p class="inf6-lead">Les références techniques demandées en cours et en projet, avec leur édition et un lien fiable.</p>' + GUI7.map(function (g) {
    return '<section class="gu7"><h3><span class="gu7-k">' + esc(g.k) + '</span>' + esc(g.h) + '</h3><p>' + esc(g.p) + '</p><div class="gu7-l">' + g.items.map(function (i) {
      return '<a href="' + i[2] + '" target="_blank" rel="noopener noreferrer"><span class="gu7-b">' + esc(i[3]) + '</span><span><b>' + esc(i[0]) + '</b><small>' + esc(i[1]) + '</small></span>' + ic('arrow-up-right', 14) + '</a>';
    }).join('') + '</div></section>';
  }).join('');
}

/* =====================================================================
   10 · Objets trouvés : base centrale, photos sur stockage distant, temps réel
   ===================================================================== */
var LF7 = { items: [], state: 'idle', photo: '', msg: '', busy: false };
function lf7WallHtml() {
  var L = L2(LFL);
  return '<div class="lf6-hd"><p class="inf6-lead">' + esc(L.p) + '</p><a class="r5btn lf6-cta" href="' + subHref('objets', 'o-post') + '">' + ic('camera', 16) + ' ' + esc(L.post) + '</a></div><div id="lf7-list" class="lf6-list" aria-live="polite">' + lf7List() + '</div>';
}
function lf7List() {
  var L = L2(LFL);
  if (LF7.state === 'nodb') return '<p class="inf6-note">' + ic('info', 14) + ' ' + esc(T7().noDb) + '</p>';
  if (LF7.state === 'error' && !LF7.items.length) return '<p class="ed-note">' + esc(L.err) + '</p>';
  if (LF7.state !== 'ready' && !LF7.items.length) return '<p class="ed-note">' + esc(L.load) + '</p>';
  if (!LF7.items.length) return '<div class="lf6-empty">' + ic('box', 30, '', 1.4) + '<p>' + esc(L.empty) + '</p></div>';
  return '<div class="lf6-grid">' + LF7.items.map(function (it) {
    var c = !!it.claimed_by;
    return '<article class="lf6-card' + (c ? ' is-claimed' : '') + '">' + (c ? '<div class="lf6-by">' + ic('check', 14) + ' ' + esc(L.taken) + ' <b dir="ltr">' + esc(it.claimed_by) + '</b></div>' : '') +
      '<figure><img src="' + esc(it.photo_url) + '" alt="' + esc(it.what || L.found) + '" loading="lazy"></figure><div class="lf6-b">' +
      (it.what ? '<h3>' + esc(it.what) + '</h3>' : '') + (it.place ? '<p>' + ic('map-pin', 13) + ' ' + esc(it.place) + '</p>' : '') + (it.pickup ? '<p>' + ic('box', 13) + ' ' + esc(it.pickup) + '</p>' : '') +
      '<time datetime="' + esc(it.created_at) + '">' + esc(agoTxt(it.created_at)) + '</time>' +
      '<div class="lf7-acts"><button type="button" class="lf6-btn" data-lf7c="' + esc(it.id) + '"' + (c ? ' disabled aria-disabled="true"' : '') + '>' + ic('check', 15) + ' ' + esc(L.found) + '</button>' +
      (canDel7(it) ? '<button type="button" class="r5out lf7-del" data-del7="lf_items" data-id="' + esc(it.id) + '" data-path="' + esc(it.photo_path || '') + '">' + ic('trash', 14) + ' Supprimer</button>' : '') + '</div></div></article>';
  }).join('') + '</div>';
}
function lf7Paint() { var el = document.getElementById('lf7-list'); if (el) el.innerHTML = lf7List(); }
function lf7Load() {
  if (LF7.state === 'idle') LF7.state = 'loading';
  return rest7('lf_items?select=*&order=created_at.desc&limit=120').then(function (j) { LF7.items = j || []; LF7.state = 'ready'; lf7Paint(); })
    .catch(function (e) { LF7.state = noDb7(e) ? 'nodb' : 'error'; lf7Paint(); });
}
rtOn('lf_items', function () { lf7Load(); });
/* secours si le temps réel est indisponible : rafraîchit toutes les 30 s et au retour sur l'onglet */
setInterval(function () { if (!document.hidden && document.getElementById('lf7-list') && !RT7.up) lf7Load(); }, 30000);
document.addEventListener('visibilitychange', function () { if (!document.hidden && document.getElementById('lf7-list')) lf7Load(); });
function lf7PostHtml() {
  var L = L2(LFL);
  if (!auUid()) return '<div class="e7-me">' + ic('lock', 15) + '<span>Pour publier un objet, connectez-vous avec votre compte étudiant : la publication est visible par tous, sur tous les appareils.</span><button type="button" class="r5out" data-profile="1">Se connecter</button></div><p><a class="r5out" href="' + subHref('objets', 'o-wall') + '">' + esc(L.seeWall) + '</a></p>';
  return '<form class="lf6-post" id="lf7-post"><div class="lf6-shot" id="lf7-shot">' + lf7Shot() + '</div>' +
    '<input type="file" id="lf7-cam" accept="image/*" capture="environment" hidden><input type="file" id="lf7-file" accept="image/*" hidden>' +
    '<p class="inf6-note">' + ic('info', 14) + ' ' + esc(L.tips) + '</p>' +
    '<div class="lf6-fields"><label>' + esc(L.what) + '<input name="what" maxlength="120" placeholder="' + esc(L.whatP) + '"></label><label>' + esc(L.where) + '<input name="place" maxlength="120" placeholder="' + esc(L.whereP) + '"></label><label>' + esc(L.pickup) + '<input name="pickup" maxlength="160" placeholder="' + esc(L.pickupP) + '"></label></div>' +
    '<p class="ssc6-err" id="lf7-msg" role="alert"></p><div class="r5acts"><button class="lf6-btn lf6-pub" type="submit">' + ic('check', 16) + ' ' + esc(L.publish) + '</button><a class="r5out" href="' + subHref('objets', 'o-wall') + '">' + esc(L.seeWall) + '</a></div></form>';
}
function lf7Shot() {
  var L = L2(LFL);
  if (LF7.photo) return '<img src="' + LF7.photo + '" alt=""><button type="button" class="lf6-retake" data-lf7cam="1">' + ic('camera', 15) + ' ' + esc(L.retake) + '</button>';
  return '<button type="button" class="lf6-cambtn" data-lf7cam="1"><span>' + ic('camera', 30, '', 1.6) + '</span><b>' + esc(L.shoot) + '</b></button><button type="button" class="lnk lf6-pick" data-lf7file="1">' + esc(L.pick) + '</button>';
}
function dataUrlBlob(d) { var p = d.split(','), b = atob(p[1]), a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return new Blob([a], { type: (p[0].match(/data:([^;]+)/) || [])[1] || 'image/jpeg' }); }
function uuid7() { if (window.crypto && crypto.randomUUID) return crypto.randomUUID(); return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); }); }
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-lf7cam],[data-lf7file]'); if (!b) return;
  var i = document.getElementById(b.hasAttribute('data-lf7cam') ? 'lf7-cam' : 'lf7-file'); if (i) { i.value = ''; i.click(); }
});
document.addEventListener('change', function (e) {
  var t = e.target; if (!t || (t.id !== 'lf7-cam' && t.id !== 'lf7-file') || !t.files || !t.files[0]) return;
  lfCompress(t.files[0], function (d) { LF7.photo = d; var s = document.getElementById('lf7-shot'); if (s) s.innerHTML = lf7Shot(); var m = document.getElementById('lf7-msg'); if (m) m.textContent = ''; });
});
document.addEventListener('submit', function (e) {
  var f = e.target; if (!f || f.id !== 'lf7-post') return; e.preventDefault();
  var L = L2(LFL), msg = document.getElementById('lf7-msg'), btn = f.querySelector('.lf6-pub');
  if (!LF7.photo) { msg.textContent = L.need; return; }
  if (!auUid()) { acOpen('login'); return; }
  var v = { what: f.what.value.trim(), place: f.place.value.trim(), pickup: f.pickup.value.trim() };
  var path = auUid() + '/' + uuid7() + '.jpg', pub = SB7.url + '/storage/v1/object/public/lost-found/' + path;
  btn.disabled = true; msg.textContent = L.sending; msg.classList.add('is-info');
  auFresh().then(function () {
    /* 1. la photo part dans le stockage distant */
    return fetch(SB7.url + '/storage/v1/object/lost-found/' + path, { method: 'POST', headers: { apikey: SB7.key, Authorization: 'Bearer ' + AU.s.access_token, 'Content-Type': 'image/jpeg', 'x-upsert': 'false', 'cache-control': '31536000' }, body: dataUrlBlob(LF7.photo) })
      .then(function (r) { return r.text().then(function (t) { if (!r.ok) throw sbErr(r, t); }); });
  }).then(function () {
    /* 2. la publication (description, lieu, date, URL de la photo) dans la base centrale */
    return rest7('lf_items', { body: { photo_url: pub, photo_path: path, what: v.what || null, place: v.place || null, pickup: v.pickup || null, owner: auUid() }, prefer: 'return=representation' })
      .catch(function (er) { fetch(SB7.url + '/storage/v1/object/lost-found/' + path, { method: 'DELETE', headers: { apikey: SB7.key, Authorization: 'Bearer ' + AU.s.access_token } }).catch(function () {}); throw er; });
  }).then(function (j) {
    LF7.photo = ''; if (j && j[0]) LF7.items.unshift(j[0]); location.hash = subHref('objets', 'o-wall');
  }).catch(function (er) {
    btn.disabled = false; msg.classList.remove('is-info');
    msg.textContent = /too_many/.test(er.message) ? 'Limite atteinte : 10 publications par heure.' : /mime|size|Payload too large/i.test(er.message) ? 'Photo refusée (5 Mo maximum, JPEG/PNG/WebP).' : auErrText(er);
  });
});
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-lf7c]'); if (!b) return;
  if (!auUid()) { acOpen('login', 'Connectez-vous pour indiquer que cet objet est à vous.'); return; }
  if (!confirm('Cet objet est à vous ? Votre e-mail (' + auEmail() + ') sera affiché sur la publication.')) return;
  var id = b.getAttribute('data-lf7c'); b.disabled = true;
  rest7('rpc/lf7_claim', { body: { p_id: id } }).then(function () { LF7.items.forEach(function (it) { if (it.id === id) { it.claimed_by = auEmail(); it.claimed_at = new Date().toISOString(); } }); lf7Paint(); })
    .catch(function (er) { b.disabled = false; alertMsg7(/already_claimed/.test(er.message) ? L2(LFL).already : auErrText(er)); lf7Load(); });
});
function alertMsg7(m) { var t = document.createElement('div'); t.className = 'toast7'; t.setAttribute('role', 'status'); t.textContent = m; document.body.appendChild(t); setTimeout(function () { t.classList.add('out'); setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 400); }, 3600); }
/* suppression (auteur ou administrateur ; le serveur vérifie les droits) */
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-del7]'); if (!b) return;
  var tb = b.getAttribute('data-del7'), id = b.getAttribute('data-id'), path = b.getAttribute('data-path');
  if (!confirm('Supprimer définitivement cette publication pour tous les utilisateurs ?')) return;
  b.disabled = true;
  rest7(tb + '?id=eq.' + encodeURIComponent(id), { method: 'DELETE', prefer: 'return=representation' }).then(function (j) {
    if (!j || !j.length) throw new Error('Suppression refusée par le serveur.');
    if (tb === 'lf_items' && path) fetch(SB7.url + '/storage/v1/object/lost-found/' + path, { method: 'DELETE', headers: { apikey: SB7.key, Authorization: 'Bearer ' + AU.s.access_token } }).catch(function () {});
    if (tb === 'lf_items') { LF7.items = LF7.items.filter(function (x) { return x.id !== id; }); lf7Paint(); }
    if (tb === 'book_offers') { BK7.items = BK7.items.filter(function (x) { return x.id !== id; }); bk7Paint(); }
    if (tb === 'reports') { RP7.items = RP7.items.filter(function (x) { return x.id !== id; }); var el = document.getElementById('rp7-list'); if (el) el.innerHTML = rp7List(); }
    if (tb === 'announcements') { AN7.items = AN7.items.filter(function (x) { return x.id !== id; }); news7Merge(); adm7Paint(); }
    alertMsg7('Publication supprimée.');
  }).catch(function (er) { b.disabled = false; alertMsg7(auErrText(er)); });
});

/* =====================================================================
   Annonces gérées par l'administration → Actualités
   ===================================================================== */
var AN7 = { items: [] }, NEWS0 = NEWS.slice();
function news7Merge() {
  NEWS.length = 0;
  AN7.items.forEach(function (a) { NEWS.push([a.date, a.title, a.summary || '', a.image || '', a.url || '#/guide/actualites', 'ENSTP 360']); });
  NEWS0.forEach(function (n) { NEWS.push(n); });
}
function an7Load() { return rest7('announcements?select=*&order=date.desc,created_at.desc&limit=100').then(function (j) { AN7.items = j || []; news7Merge(); if (route().slug === 'actualites') render(); }).catch(function () {}); }

/* =====================================================================
   Panneau d'administration (#/admin) — droits vérifiés côté serveur
   ===================================================================== */
var ADM = { tab: 'edt', tt: 'CP1', day: 'Samedi', draft: null, msg: '' };
function admin7() {
  var y = T6(), body;
  if (!auUid()) body = '<div class="e7-me">' + ic('lock', 15) + '<span>Connectez-vous avec un compte administrateur.</span><button type="button" class="r5out" data-profile="1">Se connecter</button></div>';
  else if (!AU.admin) body = '<p class="inf6-note">' + ic('lock', 14) + ' Accès réservé aux administrateurs d’ENSTP 360.</p>';
  else body = '<div class="xg-tabs adm7-tabs">' + [['edt', 'Emplois du temps'], ['ann', 'Annonces'], ['lf', 'Objets trouvés']].map(function (t) { return '<button type="button" data-adm7t="' + t[0] + '" class="' + (ADM.tab === t[0] ? 'on' : '') + '">' + t[1] + '</button>'; }).join('') + '</div><div id="adm7">' + adm7Inner() + '</div>';
  return '<main class="rp x-wrap sp6 sp7" data-page="admin"><nav class="crumb" aria-label="Breadcrumb"><a href="#/">' + esc(y.home) + '</a></nav><header class="sp6-hd"><span class="eyebrow">' + ic('shield', 13) + ' Privé</span><h1>Administration</h1></header>' + body + '</main>';
}
function adm7Inner() {
  if (ADM.tab === 'ann') {
    return '<form class="lf6-post adm7-f" id="an7-form"><h3>Nouvelle annonce</h3><div class="lf6-fields"><label>Date<input name="date" type="date" required value="' + algNow().date + '"></label><label>Titre<input name="title" maxlength="200" required></label><label>Résumé<input name="summary" maxlength="600"></label><label>Image (https://… ou images/…)<input name="image" dir="ltr"></label><label>Lien de la publication d’origine (https://…)<input name="url" dir="ltr"></label></div><p class="ssc6-err" id="an7-msg" role="alert"></p><div class="r5acts"><button class="lf6-btn" type="submit">' + ic('check', 16) + ' Publier</button></div></form>' +
      '<h3 class="bk7-h">Annonces publiées</h3>' + (AN7.items.length ? '<div class="rp7-g">' + AN7.items.map(function (a) { return '<article class="rp7-c"><span class="rp7-k">' + esc(a.date) + '</span><h3>' + esc(a.title) + '</h3>' + (a.summary ? '<p>' + esc(a.summary) + '</p>' : '') + '<div class="r5acts"><button type="button" class="r5out" data-del7="announcements" data-id="' + esc(a.id) + '">' + ic('trash', 14) + ' Supprimer</button></div></article>'; }).join('') + '</div>' : '<p class="ed-note">Aucune annonce publiée depuis le panneau.</p>');
  }
  if (ADM.tab === 'lf') return '<p class="inf6-lead">Les suppressions sont répercutées immédiatement chez tous les utilisateurs.</p><div id="lf7-list" class="lf6-list">' + lf7List() + '</div>';
  /* emplois du temps */
  var tt = ADM.draft;
  if (!tt || tt.id !== ADM.tt) { var src = e6Tt(ADM.tt); tt = ADM.draft = JSON.parse(JSON.stringify(src)); }
  var days = E6DAYS, d = tt.days.filter(function (x) { return x.d === ADM.day; })[0];
  var rows = d ? d.x.map(function (e, i) {
    return '<tr data-i="' + i + '"><td><input data-ef="a" value="' + esc(e.a || '') + '" placeholder="08:00" size="5" dir="ltr"></td><td><input data-ef="b" value="' + esc(e.b || '') + '" placeholder="09:30" size="5" dir="ltr"></td>' +
      '<td><select data-ef="k">' + [['cours', 'Cours'], ['lab', 'Lab / TP'], ['ead', 'En ligne'], ['visit', 'Visite'], ['none', 'Pas de cours'], ['note', 'Note']].map(function (k) { return '<option value="' + k[0] + '"' + (e.k === k[0] ? ' selected' : '') + '>' + k[1] + '</option>'; }).join('') + '</select></td>' +
      '<td><input data-ef="m" value="' + esc(e.m || '') + '" placeholder="Matière"></td><td><input data-ef="p" value="' + esc(e.p || '') + '" placeholder="Enseignant"></td><td><input data-ef="r" value="' + esc(e.r || '') + '" placeholder="Salle"></td>' +
      '<td><input data-ef="u" value="' + esc(Array.isArray(e.u) ? e.u.join(', ') : e.u === 'others' ? 'others' : '') + '" placeholder="' + (E6U[tt.id] ? E6U[tt.id][0] + '1, …' : 'toute la promo') + '"></td>' +
      '<td><button type="button" class="adm7-x" data-adm7del="' + i + '" aria-label="Supprimer la ligne">' + ic('trash', 14) + '</button></td></tr>';
  }).join('') : '';
  return '<div class="adm7-bar"><label>Emploi du temps<select data-adm7="tt">' + EDT6.map(function (t) { return '<option value="' + t.id + '"' + (t.id === ADM.tt ? ' selected' : '') + '>' + esc(t.id + ' — ' + ((t.head || [])[1] || '')) + '</option>'; }).join('') + '</select></label>' +
    '<label>Jour<select data-adm7="day">' + days.map(function (x) { return '<option' + (x === ADM.day ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select></label></div>' +
    (tt.upd ? '<p class="ed-note">Version modifiée en ligne le ' + esc(new Date(tt.upd).toLocaleString('fr-FR')) + '.</p>' : '') +
    '<div class="stg-wrap adm7-w"><table class="adm7-t"><thead><tr><th>Début</th><th>Fin</th><th>Type</th><th>Matière</th><th>Enseignant</th><th>Salle</th><th>Groupes</th><th></th></tr></thead><tbody>' + (rows || '<tr><td colspan="8" class="ed-note">Aucune séance ce jour.</td></tr>') + '</tbody></table></div>' +
    '<p class="ssc6-err" id="adm7-msg" role="alert">' + esc(ADM.msg) + '</p><div class="r5acts"><button type="button" class="r5out" data-adm7add="1">' + ic('plus', 15) + ' Ajouter une séance</button><button type="button" class="lf6-btn" data-adm7save="1">' + ic('check', 16) + ' Enregistrer ' + esc(tt.id) + '</button><button type="button" class="r5out" data-adm7reset="1">Revenir au document d’origine</button></div>' +
    '<p class="inf6-note">' + ic('info', 14) + ' Groupes : séparés par des virgules (ex. G1, G2). Laisser vide = toute la promotion. Les modifications s’affichent pour tous les étudiants dès l’enregistrement.</p>';
}
function adm7Paint() { var el = document.getElementById('adm7'); if (el) el.innerHTML = adm7Inner(); if (ADM.tab === 'lf') lf7Load(); }
function adm7Load() { if (AU.admin) { if (ADM.tab === 'lf') lf7Load(); if (ADM.tab === 'ann') an7Load().then(adm7Paint); } }
function adm7Read() {
  var tt = ADM.draft, d = tt.days.filter(function (x) { return x.d === ADM.day; })[0]; if (!d) return;
  Array.prototype.forEach.call(document.querySelectorAll('.adm7-t tbody tr[data-i]'), function (tr) {
    var e = d.x[+tr.getAttribute('data-i')]; if (!e) return;
    Array.prototype.forEach.call(tr.querySelectorAll('[data-ef]'), function (inp) {
      var k = inp.getAttribute('data-ef'), v = inp.value.trim();
      if (k === 'u') { if (!v) delete e.u; else if (v === 'others') e.u = 'others'; else e.u = v.split(/\s*,\s*/).filter(Boolean); e.who = v && v !== 'others' ? v.replace(/\s*,\s*/g, ', ') : e.who; }
      else if (v) e[k] = v; else delete e[k];
    });
    if (e.a && e.b) { e.la = e.a; e.lb = e.b; e.t = e.a.replace(':', 'h') + ' - ' + e.b.replace(':', 'h'); }
  });
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-adm7t],[data-adm7add],[data-adm7del],[data-adm7save],[data-adm7reset]'); if (!b) return;
  if (b.hasAttribute('data-adm7t')) { ADM.tab = b.getAttribute('data-adm7t'); Array.prototype.forEach.call(document.querySelectorAll('[data-adm7t]'), function (x) { x.classList.toggle('on', x === b); }); adm7Paint(); adm7Load(); return; }
  adm7Read();
  var tt = ADM.draft, d = tt.days.filter(function (x) { return x.d === ADM.day; })[0];
  if (b.hasAttribute('data-adm7add')) { if (!d) { d = { d: ADM.day, x: [], n: [] }; tt.days.push(d); } d.x.push({ k: 'cours', m: '', a: '', b: '' }); ADM.msg = ''; adm7Paint(); return; }
  if (b.hasAttribute('data-adm7del')) { d.x.splice(+b.getAttribute('data-adm7del'), 1); adm7Paint(); return; }
  if (b.hasAttribute('data-adm7save')) {
    var bad = []; tt.days.forEach(function (dd) { dd.x.forEach(function (x) { if ((x.a && !/^\d{2}:\d{2}$/.test(x.a)) || (x.b && !/^\d{2}:\d{2}$/.test(x.b))) bad.push(dd.d); if (!x.m) bad.push(dd.d); }); });
    if (bad.length) { ADM.msg = 'Vérifiez les heures (format HH:MM) et les matières : ' + bad.filter(function (v, i, a) { return a.indexOf(v) === i; }).join(', ') + '.'; adm7Paint(); return; }
    b.disabled = true;
    var data = JSON.parse(JSON.stringify(tt)); delete data.upd;
    rest7('timetable_overrides?on_conflict=tt_id', { body: { tt_id: tt.id, data: data }, prefer: 'resolution=merge-duplicates,return=representation' }).then(function (j) {
      for (var i = 0; i < EDT6.length; i++) if (EDT6[i].id === tt.id) { EDT6[i] = JSON.parse(JSON.stringify(data)); EDT6[i].upd = j && j[0] && j[0].updated_at; }
      ADM.draft = null; ADM.msg = ''; adm7Paint(); alertMsg7('Emploi du temps ' + tt.id + ' enregistré.');
    }).catch(function (er) { ADM.msg = auErrText(er); adm7Paint(); });
    return;
  }
  if (b.hasAttribute('data-adm7reset')) {
    if (!confirm('Supprimer les modifications en ligne et revenir au document d’origine pour ' + tt.id + ' ?')) return;
    rest7('timetable_overrides?tt_id=eq.' + tt.id, { method: 'DELETE' }).then(function () {
      var o = EDT6ORIG.filter(function (x) { return x.id === tt.id; })[0]; for (var i = 0; i < EDT6.length; i++) if (EDT6[i].id === tt.id) EDT6[i] = JSON.parse(JSON.stringify(o));
      ADM.draft = null; adm7Paint(); alertMsg7('Document d’origine rétabli.');
    }).catch(function (er) { ADM.msg = auErrText(er); adm7Paint(); });
  }
});
document.addEventListener('change', function (e) {
  var s = e.target; if (!s || !s.hasAttribute || !s.hasAttribute('data-adm7')) return;
  if (ADM.draft) adm7Read();
  var k = s.getAttribute('data-adm7');
  if (k === 'tt') { if (ADM.draft && ADM.draft.id !== s.value && !confirm('Les modifications non enregistrées seront perdues. Continuer ?')) { s.value = ADM.tt; return; } ADM.tt = s.value; ADM.draft = null; }
  else ADM.day = s.value;
  adm7Paint();
});
document.addEventListener('submit', function (e) {
  var f = e.target; if (!f || f.id !== 'an7-form') return; e.preventDefault();
  var o = acRead(f), msg = document.getElementById('an7-msg');
  if (o.url && !/^https:\/\//.test(o.url)) { msg.textContent = 'Le lien doit commencer par https://'; return; }
  if (o.image && !/^(https:\/\/|images\/)/.test(o.image)) { msg.textContent = 'Image : https://… ou images/…'; return; }
  rest7('announcements', { body: { date: o.date, title: o.title, summary: o.summary || null, image: o.image || null, url: o.url || null }, prefer: 'return=representation' })
    .then(function () { return an7Load(); }).then(function () { adm7Paint(); alertMsg7('Annonce publiée.'); })
    .catch(function (er) { msg.textContent = auErrText(er); });
});

/* =====================================================================
   Saturne relié au profil et aux données du site
   ===================================================================== */
var SAT7 = { stage: null };
function satView7() {
  var id = e6Id(); if (!id || !e6Ready()) return null;
  return { id: id, tt: e6Tt(id), view: e6View(e6Tt(id), E6.u) };
}
function satSess7(e) {
  var b = roomBuildings(e.r || '');
  return '<li><b>' + esc(e.m || '—') + '</b>' + (e.p ? ' — ' + esc(e.p) : '') + '<br><span dir="ltr">' + esc(e6Time(e)) + '</span>' + (e.r ? ' · ' + esc(e.r) : '') +
    (b.length ? '<br><a href="#/r/campus/p-plan" data-guide7="' + b[0] + '">' + ic('map-pin', 12) + ' Me guider vers la salle →</a>' : (e.r ? '<br><small>Salle non localisée sur le plan : demandez à l’accueil du bâtiment 17.</small>' : '')) + '</li>';
}
function satNeedProfile7() {
  if (!auUid()) return { h: '<p>Pour répondre, j’ai besoin de votre emploi du temps. Connectez-vous : votre niveau et votre groupe seront retenus.</p><p><a href="#/r/salles/e-edt" data-profile="1">Se connecter →</a></p>', pose: 'think' };
  return { h: '<p>Complétez votre profil (niveau et groupe) ou choisissez-les dans <a href="#/r/salles/e-edt">l’emploi du temps</a>.</p>', pose: 'think' };
}
window.asstHook = function (q, n) {
  n = ' ' + n + ' ';
  var who = AU.prof ? AU.prof.full_name.split(' ')[0] : '';
  /* --- emploi du temps personnel --- */
  var wWhere = /(ou|where) (suis|dois|should|am).*(je|i)|ou je dois etre|ou dois je etre|cense etre|suppose to be|cours actuel|current class|ou suis je|en ce moment|right now/.test(n);
  var wNext = /prochain cours|next class|cours suivant|apres ce cours|الحصه القادمه/.test(n);
  var wEnd = /(quelle heure|a quelle heure|when|what time).*(termine|finis|fini|finish|end|sors)|je termine|je finis|fin des cours|i finish/.test(n);
  var wToday = /mes cours (d )?aujourd|mes cours demain|my classes today|cours de demain|demain (j ai|j'ai) quoi/.test(n);
  var wGuide = /(guide|guider|emmene|amene|conduis).*(salle|cours|classe|amphi)|me guider|guide moi|guide me|how (do i )?get to (the )?(room|class)|aller (a|en) (la )?salle/.test(n);
  if (wWhere || wNext || wEnd || wToday || (wGuide && !/salle\s*\d|amphi/.test(n))) {
    var V = satView7(); if (!V) return satNeedProfile7();
    var N = e6Now(V.view), h = '', lab = esc(profLabel(AU.prof) || (V.tt.head || [])[1] || V.id);
    if (wEnd) {
      var idx = N.idx, dayL = function (j) { return V.view[j].all.filter(function (e) { return e6Grid(e) && e.k !== 'none'; }); };
      var off = 0, j = idx, list = j >= 0 ? dayL(j) : [];
      var lastEnd = list.length ? Math.max.apply(null, list.map(function (e) { return t2mm(e.lb); })) : -1;
      if (j < 0 || !list.length || lastEnd <= N.now) { for (off = 1; off < 8; off++) { var w = (algNow().wd + off) % 7; j = E6WD.indexOf(w); if (j >= 0 && dayL(j).length) { list = dayL(j); break; } } }
      if (!list.length) return { h: '<p>Je ne trouve pas de cours à venir dans votre emploi du temps.</p>', pose: 'think' };
      var last = list.slice().sort(function (a, b) { return t2mm(b.lb) - t2mm(a.lb); })[0];
      h = '<p>' + (off === 0 ? 'Aujourd’hui' : off === 1 ? 'Demain (' + esc(E6DAYS[j].toLowerCase()) + ')' : esc(E6DAYS[j])) + ', vous terminez à <b dir="ltr">' + esc(last.lb) + '</b>' + (last.b ? '' : ' <em>(heure de fin non précisée sur le document)</em>') + '.</p><p>Dernière séance :</p><ul class="as-tt">' + satSess7(last) + '</ul>';
    } else if (wToday) {
      var jj = /demain/.test(n) ? E6WD.indexOf((algNow().wd + 1) % 7) : N.idx;
      var all = jj >= 0 ? V.view[jj].all.filter(function (e) { return e.k !== 'none' && e.k !== 'note'; }) : [];
      h = all.length ? '<p>' + (/demain/.test(n) ? 'Demain' : 'Aujourd’hui') + ' (' + lab + ') :</p><ul class="as-tt">' + all.slice().sort(function (a, b) { return (t2mm(a.a || a.la) || 0) - (t2mm(b.a || b.la) || 0); }).map(satSess7).join('') + '</ul>' : '<p>Pas de cours ' + (/demain/.test(n) ? 'demain' : 'aujourd’hui') + ' dans votre emploi du temps.</p>';
    } else if (wNext && !wWhere) {
      if (!N.next) return { h: '<p>Je ne trouve pas de prochain cours dans votre emploi du temps.</p>', pose: 'think' };
      var when = N.next.off === 0 ? 'aujourd’hui' : N.next.off === 1 ? 'demain (' + N.next.d.toLowerCase() + ')' : N.next.d.toLowerCase();
      h = '<p>Votre prochain cours, ' + esc(when) + ' :</p><ul class="as-tt">' + N.next.all.map(satSess7).join('') + '</ul>';
    } else {
      if (N.kind === 'now') h = '<p>' + (who ? esc(who) + ', vous' : 'Vous') + ' êtes censé être en cours maintenant (' + esc(N.hm) + ') :</p><ul class="as-tt">' + N.cur.map(satSess7).join('') + '</ul>';
      else h = '<p>Il est ' + esc(N.hm) + ' : ' + (N.kind === 'pause' ? 'c’est la pause.' : 'pas de cours en ce moment.') + '</p>';
      if (N.kind !== 'now' && N.next) h += '<p>Prochain cours ' + (N.next.off === 0 ? 'aujourd’hui' : N.next.off === 1 ? 'demain' : esc(N.next.d.toLowerCase())) + ' :</p><ul class="as-tt">' + N.next.all.map(satSess7).join('') + '</ul>';
    }
    return { h: h + '<p><a href="#/r/salles/e-edt">Mon emploi du temps →</a></p>', pose: 'hai', chips: ['Mon prochain cours', 'À quelle heure je termine ?', 'Mes cours demain'] };
  }
  /* --- guider vers une salle précise --- */
  var rm = n.match(/(?:salle|room|قاعه)\s*(?:n|numero|no)?\s*0?(\d{1,2})\b/) || n.match(/(?:amphi\w*)\s*(a|b)\b/);
  if (wGuide && rm) {
    var bs = roomBuildings(rm[0]);
    if (!bs.length) return { h: '<p>Je ne trouve pas cette salle sur le plan du campus. Demandez à l’accueil du bâtiment 17.</p>', pose: 'think' };
    var row = cmRow(bs[0]), note = CMN[bs[0]] ? LP(CMN[bs[0]]) : '';
    return { h: '<p><b>' + esc(rm[0].replace(/^\w/, function (c) { return c.toUpperCase(); })) + '</b> : bâtiment ' + bs[0] + ' · ' + esc(cmName(row)) + (note ? '<br><small>' + esc(note) + '</small>' : '') + '</p><p><a href="#/r/campus/p-plan" data-guide7="' + bs[0] + '">' + ic('map-pin', 12) + ' Me guider vers la salle →</a></p>', pose: 'hai' };
  }
  /* --- stages : recommandations selon le niveau, questions pour affiner --- */
  var di = -1;
  if (SAT7.stage) {
    if (/^\s*[1-8]\s*$/.test(n)) di = +n.trim() - 1;
    else [[0, /geotech/], [1, /ouvrage/], [2, /batiment/], [3, /route|autoroute/], [4, /marit|port/], [5, /aerodrome|aeroport|piste/], [6, /ferr|rail/], [7, /labo/]].forEach(function (x) { if (di < 0 && x[1].test(n)) di = x[0]; });
  }
  if (SAT7.stage && di >= 0 && STG7[di]) {
    SAT7.stage.d = di; var D7 = STG7[di];
    var wil = SAT7.stage.w, list7 = D7.o.filter(function (o) { return !wil || o.w.some(function (w) { return nz7(w[0]).indexOf(wil) === 0; }); });
    var ws = {}; D7.o.forEach(function (o) { o.w.forEach(function (w) { ws[w[0]] = 1; }); });
    return { h: '<p><b>' + esc(D7.h) + '</b> — organismes recommandés' + (wil ? ' (' + esc(wil) + ')' : '') + ' :</p><ul class="as-tt">' + (list7.length ? list7.slice(0, 12) : D7.o.slice(0, 12)).map(function (o) { return '<li><b>' + esc(o.n) + '</b>' + (o.w.length ? '<br><small>' + o.w.map(function (w) { return esc(w[0]) + (w[1] ? ' (' + w[1] + ')' : ''); }).join(' · ') + '</small>' : '') + '</li>'; }).join('') + '</ul><p><small>Ce sont des organismes recommandés, pas des offres ouvertes : contactez-les avec votre CV.</small></p><p><a href="#/r/stages/t-reco">Tous les domaines →</a></p>',
      chips: Object.keys(ws).slice(0, 4).map(function (w) { return 'À ' + w; }), pose: 'hai' };
  }
  if (SAT7.stage && SAT7.stage.d >= 0 && /^ a /.test(n)) { SAT7.stage.w = nz7(n.replace(/^ a /, '').trim()); return window.asstHook(q, String(SAT7.stage.d + 1)); }
  if (/stage|internship|تربص/.test(n)) {
    SAT7.stage = { d: -1, w: '' };
    var lv = AU.prof ? AU.prof.level : E6.lv, tip = lv === 'CP1' ? 'En 1re année, visez de préférence un stage en laboratoire : c’est le meilleur moyen de découvrir les essais et le comportement des matériaux.' : lv === 'CP2' ? 'En 2e année, optez pour un stage de suivi de chantier ou en entreprise, pour voir un projet avancer sur le terrain.' : '';
    var spec = AU.prof && AU.prof.dept ? (AU.prof.dept === 'DMS' ? 'En DMS, les domaines Bâtiment, Ouvrages d’art et Géotechnique sont les plus proches de votre spécialité.' : 'En DIB, les domaines Routes et autoroutes, Voies ferrées, Travaux maritimes et Pistes d’aérodrome sont les plus proches de votre spécialité.') : '';
    return { h: (tip ? '<p>' + esc(tip) + '</p>' : '') + (spec ? '<p>' + esc(spec) + '</p>' : '') + '<p>Dans quel domaine cherchez-vous ? Répondez par le numéro :</p><ol class="as-tt">' + STG7.map(function (d) { return '<li>' + esc(d.h) + '</li>'; }).join('') + '</ol>',
      chips: lv === 'CP1' ? ['8', '1', '3'] : AU.prof && AU.prof.dept === 'DIB' ? ['4', '7', '5'] : ['3', '2', '1'], pose: 'hai' };
  }
  /* --- annonces / actualités --- */
  if (/annonce|actualit|news|nouveaute|اخبار|اعلان/.test(n)) {
    var nw = newsSorted().slice(0, 4);
    return { h: '<p>Les dernières actualités :</p><ul class="as-tt">' + nw.map(function (x) { return '<li><b>' + esc(LP(x[1])) + '</b><br><small>' + esc(newsDate(x[0])) + '</small>' + (x[4] ? ' · <a href="' + esc(x[4]) + '"' + (/^https?:/.test(x[4]) ? ' target="_blank" rel="noopener"' : '') + '>Lire →</a>' : '') + '</li>'; }).join('') + '</ul><p><a href="#/guide/actualites">Toutes les actualités →</a></p>', pose: 'hai' };
  }
  /* --- objets trouvés --- */
  if (/objets? (trouve|perdu)|objet|perdu|lost|ضاع|ضائع|مفقود/.test(n)) {
    if (LF7.state !== 'ready') lf7Load();
    var open7 = LF7.items.filter(function (x) { return !x.claimed_by; }).slice(0, 5);
    return { h: (open7.length ? '<p>Objets trouvés récemment, pas encore récupérés :</p><ul class="as-tt">' + open7.map(function (x) { return '<li><b>' + esc(x.what || 'Objet') + '</b>' + (x.place ? ' — ' + esc(x.place) : '') + '<br><small>' + esc(agoTxt(x.created_at)) + (x.pickup ? ' · à récupérer : ' + esc(x.pickup) : '') + '</small></li>'; }).join('') + '</ul>' : '<p>Aucun objet non récupéré n’est publié pour le moment.</p>') +
      '<p><a href="#/r/objets/o-wall">Voir le mur des objets trouvés →</a> · <a href="#/r/objets/o-post">J’ai trouvé un objet →</a></p>', pose: 'hai' };
  }
  return null;
};

/* =====================================================================
   Démarrage
   ===================================================================== */
(function () {
  /* l'ancien choix d'emploi du temps est remplacé par celui du profil */
  E6.other = false;
  tt7Load(); an7Load();
  if (auUid()) auLoad(); else AU.profLoaded = true;
  if (AU.flash && !auUid()) acOpen('login', AU.flash);
  render();
})();
