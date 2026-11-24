/* =====================================================================
   ENSTP 360 · round 8
   - accueil : rubriques en verre (style iOS), une seule rubrique ouverte à la fois
   - 01 Plan du campus : carte interactive (zoom progressif, recherche,
     niveaux de détail, photo du lieu en haut à droite, itinéraire)
   - 02 Études : choix du cycle → spécialité → année → groupe
   - 03 Démarches : nouvelle liste, sous-rubriques réduites
   - 04 Résidences des filles : photos, avis, fermeture des portes
   Chargé après app7.js : les fonctions déclarées ici remplacent celles du même nom.
   ===================================================================== */

Object.assign(P, {
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>',
  expand: '<path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>',
  shrink: '<path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3"/>',
  route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  door: '<path d="M13 4h3a2 2 0 0 1 2 2v14M2 20h3M13 20h9M10 12v.01M13 4.6v16.8a.6.6 0 0 1-.8.6L5 20V5.6a1 1 0 0 1 .8-1L12.2 3.4a.6.6 0 0 1 .8.6z"/>'
});

/* =====================================================================
   Accueil : une seule rubrique ouverte à la fois
   ===================================================================== */
document.addEventListener('toggle', function (e) {
  var d = e.target;
  if (!d || !d.classList || !d.classList.contains('rb6') || !d.open) return;
  Array.prototype.forEach.call(document.querySelectorAll('details.rb6[open]'), function (o) { if (o !== d) o.open = false; });
  st.rb6 = {}; st.rb6[d.getAttribute('data-rb')] = true;
}, true);

/* =====================================================================
   01 · Plan du campus — carte interactive
   Positions des lieux : celles du plan existant (CM, en pixels du plan
   campus/plan.webp). Photos : campus/<n>.webp quand elles existent.
   ===================================================================== */
var CM8 = { W: 716, H: 702, k: 1, x: 0, y: 0, fit: 1, sel: 0, view: 'a', near: 0, fs: false, anim: 0, q: '', a: '', b: '' };
var CM8L = {
  fr: { h: 'Carte interactive du campus', a: 'Tout le campus', b: 'Salles & cours', ph: 'Rechercher un bâtiment, une salle…', none: 'Aucun lieu trouvé.', room: 'Salle', bld: 'Bâtiment',
    zin: 'Zoomer', zout: 'Dézoomer', fit: 'Recentrer', fs: 'Plein écran', fsx: 'Quitter le plein écran', near: 'Lieu le plus proche', from: 'Départ', to: 'Arrivée', go: 'Itinéraire depuis l’entrée', clear: 'Effacer l’itinéraire',
    tip: 'Pincez ou utilisez + / − pour zoomer : plus vous vous rapprochez, plus la carte devient détaillée. Touchez un lieu pour voir sa photo.', wheel: 'Ctrl + molette pour zoomer', nophoto: 'Photo à venir', itin: 'Itinéraire', sel: 'Choisissez un lieu' },
  en: { h: 'Interactive campus map', a: 'Whole campus', b: 'Rooms & classes', ph: 'Search a building, a room…', none: 'No place found.', room: 'Room', bld: 'Building',
    zin: 'Zoom in', zout: 'Zoom out', fit: 'Re-centre', fs: 'Full screen', fsx: 'Exit full screen', near: 'Nearest place', from: 'From', to: 'To', go: 'Route from the entrance', clear: 'Clear route',
    tip: 'Pinch or use + / − to zoom: the closer you get, the more detailed the map becomes. Tap a place to see its photo.', wheel: 'Ctrl + scroll to zoom', nophoto: 'Photo coming soon', itin: 'Route', sel: 'Pick a place' },
  ar: { h: 'الخريطة التفاعلية للحرم', a: 'كامل الحرم', b: 'القاعات والدروس', ph: 'ابحث عن مبنى أو قاعة…', none: 'لا يوجد مكان مطابق.', room: 'قاعة', bld: 'مبنى',
    zin: 'تكبير', zout: 'تصغير', fit: 'إعادة التوسيط', fs: 'ملء الشاشة', fsx: 'الخروج من ملء الشاشة', near: 'أقرب مكان', from: 'الانطلاق', to: 'الوصول', go: 'المسار من المدخل', clear: 'مسح المسار',
    tip: 'اقرص أو استعمل + / − للتكبير: كلما اقتربت ظهرت تفاصيل أكثر. اضغط على مكان لرؤية صورته.', wheel: 'Ctrl + العجلة للتكبير', nophoto: 'الصورة قريبًا', itin: 'المسار', sel: 'اختر مكانًا' }
};
function cm8T() { return L2(CM8L); }
function cm8Px(r) { return [r[3] - 955, r[4]]; }
function cm8Rows() { return CM.filter(function (r) { return CM8.view === 'a' || CMC.indexOf(r[0]) !== -1; }); }
function cm8Opts(v) { return '<option value="">—</option>' + CM.map(function (r) { return '<option value="' + r[0] + '"' + (String(r[0]) === String(v) ? ' selected' : '') + '>' + r[0] + ' · ' + esc(cmName(r)) + '</option>'; }).join(''); }

function campus7Html() {
  var S = cm8T();
  return '<section class="detail-section cm8-sec"><h2>' + esc(S.h) + '</h2><p class="r5p cm8-tip">' + esc(S.tip) + '</p>' +
    '<div class="cm8" id="cm8" dir="ltr">' +
      '<div class="cm8-vp" id="cm8vp" tabindex="0" aria-label="' + esc(S.h) + '">' +
        '<div class="cm8-world" id="cm8w" style="width:' + CM8.W + 'px;height:' + CM8.H + 'px">' +
          '<img src="campus/plan.webp" alt="" width="' + CM8.W + '" height="' + CM8.H + '" draggable="false">' +
          '<svg class="cm8-rt" viewBox="0 0 ' + CM8.W + ' ' + CM8.H + '"><g id="cm8rt"></g></svg>' +
          '<div id="cm8pins"></div>' +
        '</div>' +
      '</div>' +
      '<div class="cm8-top"><div class="cm8-s"><label>' + ic('search', 17) + '<span class="x-sr">' + esc(S.ph) + '</span><input id="cm8q" type="search" autocomplete="off" enterkeyhint="search" placeholder="' + esc(S.ph) + '"></label><div class="cm8-res" id="cm8res" hidden></div></div>' +
        '<div class="cm8-tabs" role="group">' + ['a', 'b'].map(function (v) { return '<button type="button" data-cm8v="' + v + '" class="' + (CM8.view === v ? 'on' : '') + '">' + esc(S[v]) + '</button>'; }).join('') + '</div></div>' +
      '<figure class="cm8-ph" id="cm8ph" hidden></figure>' +
      '<div class="cm8-ctl"><button type="button" data-cm8z="1" aria-label="' + esc(S.zin) + '" title="' + esc(S.zin) + '">' + ic('plus', 20) + '</button><button type="button" data-cm8z="-1" aria-label="' + esc(S.zout) + '" title="' + esc(S.zout) + '">' + ic('minus', 20) + '</button><button type="button" data-cm8fit="1" aria-label="' + esc(S.fit) + '" title="' + esc(S.fit) + '">' + ic('target', 19) + '</button><button type="button" data-cm8fs="1" id="cm8fsb" aria-label="' + esc(S.fs) + '" title="' + esc(S.fs) + '">' + ic('expand', 18) + '</button></div>' +
      '<div class="cm8-zoom" id="cm8zl" aria-hidden="true"><i></i></div>' +
      '<div class="cm8-hint" id="cm8hint" hidden>' + esc(S.wheel) + '</div>' +
      '<div class="cm8-card" id="cm8card" aria-live="polite"></div>' +
    '</div>' +
    '<div class="cm8-it"><b>' + ic('route', 16) + ' ' + esc(S.itin) + '</b><label>' + esc(S.from) + '<select id="cm8a">' + cm8Opts(CM8.a) + '</select></label><label>' + esc(S.to) + '<select id="cm8b">' + cm8Opts(CM8.b) + '</select></label><button type="button" class="r5out" data-cm8clr="1">' + esc(S.clear) + '</button></div>' +
    '</section>' +
    '<section class="detail-section fl7"><h2>' + ic('building', 18) + ' Les salles et leurs étages</h2><p class="r5p">D’après le relevé du plan du campus. Touchez un bâtiment pour le voir sur la carte.</p><div class="fl7-g">' +
    FLOOR7.map(function (b) { return '<button type="button" class="fl7-c" data-pin="' + b[0] + '"><span class="fl7-n">' + b[0] + '</span><div><b>' + esc(b[1]) + '</b><ul>' + b[2].map(function (f) { return '<li>' + (f[0] ? '<em>' + esc(f[0]) + '</em> ' : '') + esc(f[1]) + '</li>'; }).join('') + '</ul></div></button>'; }).join('') +
    '</div></section>';
}

function cm8Pins() {
  return cm8Rows().map(function (r) {
    var p = cm8Px(r), n = r[0], note = CMN[n] ? LP(CMN[n]) : '', room = CMC.indexOf(n) !== -1;
    return '<button type="button" class="cm8-pin' + (room ? ' is-room' : '') + (CM8.sel === n ? ' on' : '') + (String(CM8.a) === String(n) ? ' is-a' : '') + (String(CM8.b) === String(n) ? ' is-b' : '') + '" data-cm8n="' + n + '" style="left:' + p[0] + 'px;top:' + p[1] + 'px" aria-label="' + esc(n + ' ' + cmName(r)) + '">' +
      '<span class="cm8-dot">' + n + '</span><span class="cm8-lb"><b>' + esc(cmName(r)) + '</b>' + (note ? '<small>' + esc(note) + '</small>' : '') + '</span></button>';
  }).join('');
}
function cm8Vp() { return document.getElementById('cm8vp'); }
function cm8Fit() {
  var vp = cm8Vp(); if (!vp) return 1;
  return Math.min(vp.clientWidth / CM8.W, vp.clientHeight / CM8.H);
}
function cm8Clamp() {
  var vp = cm8Vp(); if (!vp) return;
  var s = CM8.fit * CM8.k, w = CM8.W * s, h = CM8.H * s, vw = vp.clientWidth, vh = vp.clientHeight, m = 40;
  CM8.x = w <= vw ? (vw - w) / 2 : Math.min(m, Math.max(vw - w - m, CM8.x));
  CM8.y = h <= vh ? (vh - h) / 2 : Math.min(m, Math.max(vh - h - m, CM8.y));
}
var cm8Raf = 0;
function cm8Apply() {
  var w = document.getElementById('cm8w'), root = document.getElementById('cm8'); if (!w || !root) return;
  var s = CM8.fit * CM8.k;
  w.style.transform = 'translate(' + CM8.x.toFixed(1) + 'px,' + CM8.y.toFixed(1) + 'px) scale(' + s.toFixed(4) + ')';
  root.style.setProperty('--cm8s', (1 / s).toFixed(4));
  var lod = CM8.k < 1.7 ? 0 : CM8.k < 3 ? 1 : 2;
  if (root.getAttribute('data-lod') !== String(lod)) root.setAttribute('data-lod', lod);
  var zl = document.getElementById('cm8zl'); if (zl) zl.firstChild.style.height = Math.round((Math.log(CM8.k) / Math.log(6)) * 100) + '%';
  if (!cm8Raf) cm8Raf = requestAnimationFrame(function () { cm8Raf = 0; cm8Inset(); });
}
/* zoom autour d'un point de l'écran (px dans la fenêtre de la carte) */
function cm8ZoomAt(k2, sx, sy) {
  k2 = Math.max(1, Math.min(6, k2));
  var s1 = CM8.fit * CM8.k, s2 = CM8.fit * k2, wx = (sx - CM8.x) / s1, wy = (sy - CM8.y) / s1;
  CM8.k = k2; CM8.x = sx - wx * s2; CM8.y = sy - wy * s2; cm8Clamp(); cm8Apply();
}
/* animation vers un point du plan, à un niveau de zoom donné */
function cm8Fly(wx, wy, k2, dur) {
  var vp = cm8Vp(); if (!vp) return;
  cancelAnimationFrame(CM8.anim);
  var k0 = CM8.k, x0 = CM8.x, y0 = CM8.y, vw = vp.clientWidth, vh = vp.clientHeight, t0 = performance.now();
  k2 = Math.max(1, Math.min(6, k2));
  var s2 = CM8.fit * k2, save = { k: CM8.k, x: CM8.x, y: CM8.y };
  CM8.k = k2; CM8.x = vw / 2 - wx * s2; CM8.y = vh / 2 - wy * s2; cm8Clamp();
  var k1 = CM8.k, x1 = CM8.x, y1 = CM8.y; CM8.k = save.k; CM8.x = save.x; CM8.y = save.y;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) dur = 0;
  (function step(t) {
    var p = dur ? Math.min(1, (t - t0) / dur) : 1, e = 1 - Math.pow(1 - p, 3);
    CM8.k = k0 + (k1 - k0) * e; CM8.x = x0 + (x1 - x0) * e; CM8.y = y0 + (y1 - y0) * e; cm8Apply();
    if (p < 1) CM8.anim = requestAnimationFrame(step);
  })(t0);
}
function cm8Reset(anim) { CM8.fit = cm8Fit(); cm8Fly(CM8.W / 2, CM8.H / 2, 1, anim ? 380 : 0); }

/* photo du lieu (encart en haut à droite) : lieu choisi, sinon lieu proche du centre quand on zoome fort */
function cm8Inset() {
  var f = document.getElementById('cm8ph'), vp = cm8Vp(); if (!f || !vp) return;
  var n = CM8.sel, S = cm8T(), isNear = false;
  if (!n && CM8.k >= 2.6) {
    var s = CM8.fit * CM8.k, cx = (vp.clientWidth / 2 - CM8.x) / s, cy = (vp.clientHeight / 2 - CM8.y) / s, best = 0, bd = 1e9;
    cm8Rows().forEach(function (r) { if (!cmPh(r[0])) return; var p = cm8Px(r), d = Math.hypot(p[0] - cx, p[1] - cy); if (d < bd) { bd = d; best = r[0]; } });
    if (best && bd * s < Math.min(vp.clientWidth, vp.clientHeight) * 0.35) { n = best; isNear = true; }
  }
  if (!n) { if (!f.hidden) { f.hidden = true; CM8.near = 0; } return; }
  var key = n + (isNear ? 'n' : 's');
  if (!f.hidden && f.getAttribute('data-k') === key) return;
  var r = cmRow(n), ph = cmPh(n);
  f.setAttribute('data-k', key);
  f.innerHTML = (ph ? '<img src="campus/' + ph + '.webp" alt="' + esc(cmName(r)) + '"' + (n === 34 ? ' style="object-position:center top"' : '') + '>' : '<div class="cm8-noph">' + ic('map', 22) + '<span>' + esc(S.nophoto) + '</span></div>') +
    '<figcaption>' + (isNear ? '<small>' + esc(S.near) + '</small>' : '') + '<b>' + n + ' · ' + esc(cmName(r)) + '</b></figcaption>';
  f.hidden = false; f.classList.remove('pop'); void f.offsetWidth; f.classList.add('pop');
}
function cm8Card() {
  var c = document.getElementById('cm8card'); if (!c) return;
  var n = CM8.sel, S = cm8T();
  if (!n) { c.innerHTML = ''; c.classList.remove('on'); return; }
  var r = cmRow(n), note = CMN[n] ? LP(CMN[n]) : '';
  c.innerHTML = '<span class="cm8-n">' + n + '</span><div><b>' + esc(cmName(r)) + '</b>' + (lang !== 'ar' ? '<small lang="ar" dir="rtl">' + esc(r[2]) + '</small>' : '') + (note ? '<small class="cm8-note">' + ic('map-pin', 12) + ' ' + esc(note) + '</small>' : '') + '</div>' +
    (n !== 1 ? '<button type="button" class="r5btn" data-cm8go="' + n + '">' + ic('route', 15) + '<span>' + esc(S.go) + '</span></button>' : '') + '<button type="button" class="cm8-x" data-cm8sel="0" aria-label="×">' + ic('x', 16) + '</button>';
  c.classList.add('on');
}
function cm8Paint() { var p = document.getElementById('cm8pins'); if (p) p.innerHTML = cm8Pins(); cm8Card(); var f = document.getElementById('cm8ph'); if (f) f.removeAttribute('data-k'); cm8Inset(); }
function cm8Select(n, fly) {
  CM8.sel = n || 0;
  if (n && CM8.view === 'b' && CMC.indexOf(n) === -1) { CM8.view = 'a'; cm8Tabs(); }
  cm8Paint();
  if (n && fly !== false) { var p = cm8Px(cmRow(n)); cm8Fly(p[0], p[1], Math.max(CM8.k, 3.2), 520); }
}
function cm8Tabs() { Array.prototype.forEach.call(document.querySelectorAll('[data-cm8v]'), function (b) { b.classList.toggle('on', b.getAttribute('data-cm8v') === CM8.view); }); }
function cm8Route() {
  var g = document.getElementById('cm8rt'); if (!g) return;
  var A = cmRow(+CM8.a), B = cmRow(+CM8.b);
  if (!A || !B || A === B) { g.innerHTML = ''; cm8Paint(); return; }
  var d = 'M' + wfPath(A, B).map(function (q) { return (q[0] / 100 * CM8.W).toFixed(1) + ' ' + (q[1] / 100 * CM8.H).toFixed(1); }).join(' L');
  g.innerHTML = '<path d="' + d + '" class="cm8-rt-bg"/><path d="' + d + '" class="cm8-rt-ln"/>';
  cm8Paint();
  var pa = cm8Px(A), pb = cm8Px(B), vp = cm8Vp(), dx = Math.abs(pa[0] - pb[0]) + 120, dy = Math.abs(pa[1] - pb[1]) + 120;
  if (vp) cm8Fly((pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2, Math.min(vp.clientWidth / (dx * CM8.fit), vp.clientHeight / (dy * CM8.fit), 3), 520);
}
function cm8SetRoute(a, b) {
  CM8.a = a ? String(a) : ''; CM8.b = b ? String(b) : '';
  var A = document.getElementById('cm8a'), B = document.getElementById('cm8b'); if (A) A.value = CM8.a; if (B) B.value = CM8.b;
  cm8Route();
}
/* recherche : nom du lieu (fr/en/ar), numéro, ou salle (via le relevé des salles) */
function cm8Find(q) {
  var S = cm8T(), z = nz7(q).trim(); if (!z) return [];
  var out = [], seen = {};
  if (/\d|salle|room|قاعة|biblio|library|مكتبة|amphi|cc\b/.test(z)) roomBuildings(q).forEach(function (n) {
    var m = String(q).match(/\d+/); seen[n] = 1; out.push({ n: n, t: (m ? S.room + ' ' + m[0] + ' → ' : '') + S.bld + ' ' + n + ' · ' + cmName(cmRow(n)) });
  });
  CM.forEach(function (r) {
    if (seen[r[0]]) return;
    var hay = nz7(r[0] + ' ' + r[1].replace(/\|/g, ' ') + ' ' + r[2] + ' ' + (CMN[r[0]] || '').replace(/\|/g, ' '));
    if (z.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; }) || String(r[0]) === z) out.push({ n: r[0], t: r[0] + ' · ' + cmName(r) });
  });
  return out.slice(0, 7);
}
function cm8Res() {
  var box = document.getElementById('cm8res'), q = document.getElementById('cm8q'); if (!box || !q) return;
  var v = q.value; if (!v.trim()) { box.hidden = true; box.innerHTML = ''; return; }
  var r = cm8Find(v);
  box.innerHTML = r.length ? r.map(function (x) { return '<button type="button" data-cm8sel="' + x.n + '">' + ic('map-pin', 14) + '<span>' + esc(x.t) + '</span></button>'; }).join('') : '<p>' + esc(cm8T().none) + '</p>';
  box.hidden = false;
}
function cm8FsSet(on) {
  var root = document.getElementById('cm8'); if (!root) return;
  CM8.fs = on; root.classList.toggle('cm8-fs', on); document.body.classList.toggle('cm8-lock', on);
  var b = document.getElementById('cm8fsb'), S = cm8T(); if (b) { b.innerHTML = ic(on ? 'shrink' : 'expand', 18); b.setAttribute('aria-label', on ? S.fsx : S.fs); b.title = on ? S.fsx : S.fs; }
  setTimeout(function () { var c = cm8Center(); CM8.fit = cm8Fit(); cm8Fly(c[0], c[1], CM8.k, 0); }, 30);
}
function cm8Center() { var vp = cm8Vp(), s = CM8.fit * CM8.k; return vp ? [(vp.clientWidth / 2 - CM8.x) / s, (vp.clientHeight / 2 - CM8.y) / s] : [CM8.W / 2, CM8.H / 2]; }
var cm8Hint = 0;
function cm8ShowHint() { var h = document.getElementById('cm8hint'); if (!h) return; h.hidden = false; clearTimeout(cm8Hint); cm8Hint = setTimeout(function () { h.hidden = true; }, 1300); }

function cm8Mount() {
  var vp = cm8Vp(); if (!vp || vp.getAttribute('data-on')) return;
  vp.setAttribute('data-on', '1');
  CM8.sel = 0; CM8.k = 1; CM8.fit = cm8Fit();
  cm8Paint(); cm8Reset(false);
  if (CM8.a && CM8.b) cm8Route();
  /* déplacement et pincement */
  var pts = {}, start = null, moved = false;
  function ptsArr() { return Object.keys(pts).map(function (k) { return pts[k]; }); }
  function local(e) { var b = vp.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; }
  function snap() {
    var a = ptsArr();
    if (a.length >= 2) start = { pinch: true, d: Math.hypot(a[0][0] - a[1][0], a[0][1] - a[1][1]) || 1, k: CM8.k, m: [(a[0][0] + a[1][0]) / 2, (a[0][1] + a[1][1]) / 2], x: CM8.x, y: CM8.y };
    else if (a.length === 1) start = { p: a[0], x: CM8.x, y: CM8.y };
    else start = null;
  }
  vp.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    cancelAnimationFrame(CM8.anim);
    pts[e.pointerId] = local(e); moved = false; CM8.mv = false; snap();
  });
  vp.addEventListener('pointermove', function (e) {
    if (!pts[e.pointerId] || !start) return;
    pts[e.pointerId] = local(e);
    var a = ptsArr();
    if (start.pinch && a.length >= 2) {
      var d = Math.hypot(a[0][0] - a[1][0], a[0][1] - a[1][1]), m = [(a[0][0] + a[1][0]) / 2, (a[0][1] + a[1][1]) / 2];
      CM8.x = start.x + (m[0] - start.m[0]); CM8.y = start.y + (m[1] - start.m[1]); CM8.k = start.k;
      cm8ZoomAt(start.k * d / start.d, m[0], m[1]); moved = true;
    } else if (!start.pinch) {
      var dx = a[0][0] - start.p[0], dy = a[0][1] - start.p[1];
      if (!moved && Math.abs(dx) + Math.abs(dy) < 6) return;
      if (!moved) { moved = true; try { vp.setPointerCapture(e.pointerId); } catch (x) {} vp.classList.add('drag'); }
      CM8.x = start.x + dx; CM8.y = start.y + dy; cm8Clamp(); cm8Apply();
    }
  });
  function up(e) { if (moved) CM8.mv = true; delete pts[e.pointerId]; vp.classList.remove('drag'); snap(); }
  vp.addEventListener('pointerup', up); vp.addEventListener('pointercancel', up);
  vp.addEventListener('click', function (e) { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  vp.addEventListener('dblclick', function (e) { var p = local(e); cm8Fly((p[0] - CM8.x) / (CM8.fit * CM8.k), (p[1] - CM8.y) / (CM8.fit * CM8.k), CM8.k * 1.8, 320); });
  vp.addEventListener('wheel', function (e) {
    if (!e.ctrlKey && !e.metaKey && !CM8.fs) { cm8ShowHint(); return; }
    e.preventDefault(); var p = local(e); cm8ZoomAt(CM8.k * Math.exp(-e.deltaY * 0.0022), p[0], p[1]);
  }, { passive: false });
  vp.addEventListener('keydown', function (e) {
    var c = cm8Center(), st2 = 60 / (CM8.fit * CM8.k);
    if (e.key === '+' || e.key === '=') cm8Fly(c[0], c[1], CM8.k * 1.5, 220);
    else if (e.key === '-') cm8Fly(c[0], c[1], CM8.k / 1.5, 220);
    else if (e.key === 'ArrowLeft') cm8Fly(c[0] - st2, c[1], CM8.k, 160);
    else if (e.key === 'ArrowRight') cm8Fly(c[0] + st2, c[1], CM8.k, 160);
    else if (e.key === 'ArrowUp') cm8Fly(c[0], c[1] - st2, CM8.k, 160);
    else if (e.key === 'ArrowDown') cm8Fly(c[0], c[1] + st2, CM8.k, 160);
    else if (e.key === 'Escape' && CM8.fs) cm8FsSet(false);
    else return;
    e.preventDefault();
  });
  if (window.ResizeObserver) new ResizeObserver(function () { var c = cm8Center(); CM8.fit = cm8Fit(); cm8Fly(c[0], c[1], CM8.k, 0); }).observe(vp);
  var q = document.getElementById('cm8q');
  if (q) { q.addEventListener('input', cm8Res); q.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); var r = cm8Find(q.value); if (r[0]) { cm8Select(r[0].n); document.getElementById('cm8res').hidden = true; q.blur(); } } }); }
  var A = document.getElementById('cm8a'), B = document.getElementById('cm8b');
  if (A) A.onchange = function () { CM8.a = A.value; cm8Route(); };
  if (B) B.onchange = function () { CM8.b = B.value; cm8Route(); if (B.value) cm8Select(+B.value, false); };
  /* arrivée depuis un autre écran (« Voir sur le plan », « Me guider vers la salle ») */
  if (st.guide7) { var g = st.guide7; st.guide7 = null; st.pin = null; CM8.sel = +g; cm8SetRoute('1', g); }
  else if (st.pin) { var n = st.pin; st.pin = null; setTimeout(function () { cm8Select(n); }, 60); }
}
document.addEventListener('click', function (e) {
  var t = e.target.closest && e.target.closest('[data-cm8n],[data-cm8sel],[data-cm8z],[data-cm8fit],[data-cm8fs],[data-cm8v],[data-cm8go],[data-cm8clr],.fl7-c[data-pin]');
  if (!t || !document.getElementById('cm8')) return;
  if (CM8.mv && t.closest('#cm8vp')) { CM8.mv = false; return; }
  var c = cm8Center();
  if (t.hasAttribute('data-pin')) { e.preventDefault(); e.stopPropagation(); cm8Select(parseInt(t.getAttribute('data-pin'), 10)); document.getElementById('cm8').scrollIntoView({ block: 'center', behavior: 'smooth' }); }
  else if (t.hasAttribute('data-cm8n')) cm8Select(+t.getAttribute('data-cm8n'));
  else if (t.hasAttribute('data-cm8sel')) { var n = +t.getAttribute('data-cm8sel'); var q = document.getElementById('cm8q'), box = document.getElementById('cm8res'); if (box) box.hidden = true; if (n && q) q.value = ''; cm8Select(n, !!n); }
  else if (t.hasAttribute('data-cm8z')) cm8Fly(c[0], c[1], CM8.k * (t.getAttribute('data-cm8z') === '1' ? 1.6 : 1 / 1.6), 260);
  else if (t.hasAttribute('data-cm8fit')) { CM8.sel = 0; cm8Paint(); cm8Reset(true); }
  else if (t.hasAttribute('data-cm8fs')) cm8FsSet(!CM8.fs);
  else if (t.hasAttribute('data-cm8v')) { CM8.view = t.getAttribute('data-cm8v'); if (CM8.sel && CM8.view === 'b' && CMC.indexOf(CM8.sel) === -1) CM8.sel = 0; cm8Tabs(); cm8Paint(); }
  else if (t.hasAttribute('data-cm8go')) cm8SetRoute('1', t.getAttribute('data-cm8go'));
  else if (t.hasAttribute('data-cm8clr')) cm8SetRoute('', '');
}, true);
document.addEventListener('pointerdown', function (e) { var box = document.getElementById('cm8res'); if (box && !box.hidden && !e.target.closest('.cm8-s')) box.hidden = true; });

/* =====================================================================
   02 · Études : cycle → spécialité → année → groupe
   ===================================================================== */
function e8Cy() { return /^CP/.test(E6.lv) ? 'CP' : /^I/.test(E6.lv) ? 'I' : (E6.cy || ''); }
function e8Seg(label, items) { return '<div class="e6-step"><span>' + esc(label) + '</span><div class="e6-seg">' + items.join('') + '</div></div>'; }
function e8Btn(attr, v, on, txt) { return '<button type="button" ' + attr + '="' + v + '" class="' + (on ? 'on' : '') + '" aria-pressed="' + !!on + '">' + esc(txt) + '</button>'; }
function e6Inner() {
  var cy = e8Cy(), id = e6Id(), units = e6Units(id), h = '<div class="e6-pick e8-pick">';
  h += e8Seg('Cycle', [e8Btn('data-e8cy', 'CP', cy === 'CP', 'Cycle préparatoire'), e8Btn('data-e8cy', 'I', cy === 'I', 'Cycle ingénieur')]);
  if (cy === 'CP') h += e8Seg('Année', [e8Btn('data-e6lv', 'CP1', E6.lv === 'CP1', '1re année'), e8Btn('data-e6lv', 'CP2', E6.lv === 'CP2', '2e année')]);
  if (cy === 'I') {
    h += e8Seg('Spécialité', [e8Btn('data-e6dep', 'DIB', E6.dep === 'DIB', 'DIB · Infrastructures de Base'), e8Btn('data-e6dep', 'DMS', E6.dep === 'DMS', 'DMS · Matériaux et Structures')]);
    if (E6.dep) h += e8Seg('Année', ['1', '2', '3'].map(function (y) { return e8Btn('data-e6lv', 'I' + y, E6.lv === 'I' + y, y === '1' ? '1re année' : y + 'e année'); }));
  }
  if (id && units.length) h += '<div class="e6-step"><span>' + (E6U[id][2].trim() === 'Groupe' ? 'Groupe' : E6U[id][2].trim() === 'Colonne' ? 'Colonne' : 'Section') + '</span><div class="e6-seg e6-seg-n">' + units.map(function (u) { return '<button type="button" data-e6u="' + esc(u.v) + '" class="' + (E6.u === u.v ? 'on' : '') + '" aria-pressed="' + (E6.u === u.v) + '">' + esc(u.n.replace(/^(Groupe|Section|Colonne) /, '')) + '</button>'; }).join('') + '</div></div>';
  else if (id) h += '<div class="e6-step"><span>Groupe</span><p class="e6-promo">Toute la promotion — le document ne distingue pas de groupes.</p></div>';
  h += '</div>';
  if (!id) {
    var msg = !cy ? 'Choisissez votre cycle pour afficher votre emploi du temps.' : cy === 'CP' ? 'Choisissez votre année.' : !E6.dep ? 'Choisissez votre spécialité (DIB ou DMS).' : 'Choisissez votre année.';
    return h + '<div class="e6-empty">' + ic('calendar', 30, '', 1.4) + '<p>' + msg + '</p></div>';
  }
  var old = E6INNER7(), i = old.search(/<div class="e6-empty">|<div id="e6-live">/);
  return h + (i >= 0 ? old.slice(i) : '');
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-e8cy]'); if (!b) return;
  var v = b.getAttribute('data-e8cy');
  if (e8Cy() !== v) { E6.lv = ''; E6.dep = ''; E6.u = ''; }
  E6.cy = v; e6Save(); e6Paint(false);
});

/* =====================================================================
   03 · Démarche et demande de document
   ===================================================================== */
OLDSUB7['s-transfer'] = 's-proc'; OLDSUB7['s-who'] = 's-proc';
function rbSubs(k) {
  if (k === 'services') return [['s-proc', L2(AIDQ).s[1], svc6Html], ['s-bourse', T6().sBourse, bourse6Html]];
  return RBS7(k);
}
function svc8Find(re) { return SVC.filter(function (s) { return re.test(s[1]); })[0]; }
function svc8Item(s, extra) {
  var S = L2(SVCL);
  return '<details class="sv-item"><summary><span class="sv-b sv-' + s[0] + '">' + esc(S[s[0]]) + '</span><strong>' + esc(LP(s[1])) + '</strong></summary>' + (s[2] && s[2].length ? '<ul>' + s[2].map(function (x) { return '<li>' + LP(x) + '</li>'; }).join('') + '</ul>' : '') + (extra || '') + '</details>';
}
function svc6Html() {
  var S = L2(SVCL), reins = svc8Find(/^Réinscription/), cong = svc8Find(/^Congé/), fr = svc8Find(/^Certificat de scolarité en français/), cls = svc8Find(/^Attestation de classement/), grp = svc8Find(/^Changer de groupe/);
  var pay = '<div class="sv8-pay">' + PAY8.map(function (p) { return '<a href="' + p[1] + '" target="_blank" rel="noopener noreferrer">' + ic('arrow-up-right', 14) + '<span><b>' + esc(LP(p[0])) + '</b><small dir="ltr">' + esc(p[1].replace(/^https:\/\//, '')) + '</small></span></a>'; }).join('') + '</div>';
  var items = [
    svc8Item(SVC8.cert),
    fr && svc8Item(fr),
    reins && svc8Item(['admin', 'Réinscription (université, transport, résidence et bibliothèque)|Re-registration (university, transport, residence and library)|إعادة التسجيل (الجامعة، النقل، الإقامة والمكتبة)', reins[2]], '<p class="sv8-h">' + esc(LP('Liens de paiement en ligne :|Online payment links:|روابط الدفع الإلكتروني:')) + '</p>' + pay),
    '<a class="sv-item sv-link" href="' + subHref('services', 's-bourse') + '"><span class="sv-b sv-admin">' + esc(S.admin) + '</span><strong>' + esc(T6().sBourse) + '</strong>' + ic('arrow-right', 15, 'rtl-flip') + '</a>',
    svc8Item(SVC8.abs),
    svc8Item(SVC8.lib, '<a class="lib-btn sv8-btn" href="https://enstp.edu.dz/" target="_blank" rel="noopener noreferrer">' + esc(LP('Site officiel de l’ENSTP|Official ENSTP website|الموقع الرسمي للمدرسة')) + ' ' + ic('arrow-up-right', 14) + '</a>'),
    cls && svc8Item(cls),
    svc8Item(['admin', T6().sTransfer, []], '<div class="sv8-x">' + transfer6Html() + '</div>'),
    cong && svc8Item(cong),
    grp && svc8Item(grp)
  ].filter(Boolean);
  return '<section class="detail-section">' +
    '<div class="sv-list">' + items.join('') + '</div></section>';
}

/* =====================================================================
   06 · Résidences des filles : photo, avis, fermeture des portes
   ===================================================================== */
function women6Html() {
  var li = lang === 'ar' ? 2 : lang === 'en' ? 1 : 0, btn = L3('Voir sur Google Maps', 'View on Google Maps', 'عرض على خرائط Google');
  var T = { av: L3('Avis', 'Reviews', 'الآراء'), cl: L3('Fermeture des portes', 'Gates close', 'غلق الأبواب'), ph: L3('Photo à venir', 'Photo coming soon', 'الصورة قريبًا') };
  return '<div class="wr6 wr8">' + WRES6.map(function (w, i) {
    var url = w.url || mapsUrl(w.q);
    return '<article class="wr6-card"><figure>' + resArt(i) + (w.photo ? '<img src="' + w.photo + '" alt="' + esc(w.n[li]) + '" loading="lazy" onerror="this.remove()">' : '<span class="wr8-soon">' + esc(T.ph) + '</span>') + '<span class="wr6-n">' + pad2(i + 1) + '</span></figure>' +
      '<div class="wr6-b"><h3>' + esc(w.n[li]) + '</h3><p>' + ic('map-pin', 14) + ' ' + esc(w.loc[li]) + '</p>' +
      (w.close ? '<div class="wr8-cl">' + ic('clock', 14) + '<span>' + esc(T.cl) + ' : <b>' + esc(w.close[li]) + '</b></span></div>' : '') +
      (w.av ? '<details class="wr8-av"><summary>' + esc(T.av) + '</summary><p>' + esc(w.av[li]) + '</p></details>' : '') +
      '<a class="r5btn" href="' + url + '" target="_blank" rel="noopener">' + ic('map-pin', 15) + ' ' + esc(btn) + ' ' + ic('arrow-up-right', 13) + '</a></div></article>';
  }).join('') + '</div>';
}

/* =====================================================================
   Saturne : un clic en dehors de la conversation la ferme
   ===================================================================== */
document.addEventListener('pointerdown', function (e) {
  var p = document.querySelector('#asst .as-panel'); if (!p || p.contains(e.target)) return;
  var x = p.querySelector('[data-asst-close]'); if (x) x.click();
}, true);

/* =====================================================================
   05 · Manger : liens Google Maps fournis
   ===================================================================== */
function nearGrid(h, arr) {
  var out = NEARG7(h, arr);
  arr.forEach(function (x) { var u = NURL8[x[0]]; if (u) out = out.split('href="' + mapsUrl(x[0] + ' ' + x[1] + ' Alger') + '"').join('href="' + u + '"'); });
  return out;
}

/* =====================================================================
   Montage après chaque affichage
   ===================================================================== */
/* =====================================================================
   Accueil : chaque bloc apparaît en « pop » au défilement (et disparaît en sortant),
   du slogan jusqu'aux actualités. Slogan : « Une vision, » … petit délai … « sans angles morts »
   ===================================================================== */
var POP8 = null;
var POP8SEL = '.h7 .hero7 .eyebrow, .h7 .h7-q, .h7 .h7-fig, .h7 .h7-srch, .h7 .rb6-head, .h7 details.rb6, .h7 #cursus .x-sec-head, .h7 .eco-cur > article, .h7 .figs > div, .h7 #actualites .sec-h, .h7 .nw-grid > *';
function pop8() {
  var h = document.querySelector('.h7 .hero7 h1');
  if (h && !h.querySelector('.h8-r')) {
    var m = h.querySelector('mark'), t = m && m.nextSibling;
    if (t && t.nodeType === 3) { var sp = document.createElement('span'); sp.className = 'h8-r'; sp.textContent = t.textContent.replace(/^\s+/, ''); h.replaceChild(sp, t); if (/^\s/.test(t.textContent)) h.insertBefore(document.createTextNode(' '), sp); }
    h.classList.add('h8-wait');
    pop8Splash(function () { h.classList.remove('h8-wait'); h.classList.add('h8-go'); });
  }
  var els = document.querySelectorAll(POP8SEL); if (!els.length) return;
  if (!('IntersectionObserver' in window)) { Array.prototype.forEach.call(els, function (d) { d.classList.add('pop8-in'); }); return; }
  if (POP8) POP8.disconnect();
  POP8 = new IntersectionObserver(function (es) {
    es.forEach(function (e) { e.target.classList.toggle('pop8-in', e.isIntersecting); });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  var prev = null, k = 0, io = POP8;
  Array.prototype.forEach.call(els, function (d) {
    k = d.parentNode === prev ? k + 1 : 0; prev = d.parentNode;
    d.style.setProperty('--pop8i', Math.min(k, 4)); d.classList.add('pop8');
  });
  /* l'écran d'ouverture couvre la page : on attend qu'il parte pour lancer les animations */
  pop8Splash(function () { if (io === POP8) Array.prototype.forEach.call(els, function (d) { io.observe(d); }); });
}
function pop8Splash(fn) { var s = document.getElementById('splash'); if (!s || s.classList.contains('out')) fn(); else setTimeout(function () { pop8Splash(fn); }, 120); }
function after6(r) {
  AFTER7(r);
  pop8();
  if (document.getElementById('cm8')) cm8Mount();
  else if (CM8.fs) { CM8.fs = false; document.body.classList.remove('cm8-lock'); }
}
render();
