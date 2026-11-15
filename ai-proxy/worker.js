/*
 * ENSTP 360 · proxy IA optionnel pour l'assistant Saturne (Cloudflare Workers, offre gratuite).
 * Le site envoie : { question, lang, context: [extraits du guide], history: [...] }
 * Le proxy renvoie : { reply }
 * La clé API reste secrète côté Cloudflare (variable GEMINI_API_KEY), jamais dans le site.
 */
const ALLOWED_ORIGIN = 'https://zwfh6trskt-bot.github.io'; // adresse du site
const MODEL = 'gemini-2.0-flash';

export default {
  async fetch(request, env) {
    const cors = { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });
    let body;
    try { body = await request.json(); } catch { return new Response('Bad request', { status: 400, headers: cors }); }
    const question = String(body.question || '').slice(0, 400);
    const lang = ['fr', 'en', 'ar'].includes(body.lang) ? body.lang : 'fr';
    const context = (Array.isArray(body.context) ? body.context : []).slice(0, 12).map(String).join('\n- ').slice(0, 6000);
    const history = (Array.isArray(body.history) ? body.history : []).slice(-8);
    const system = `Tu es Saturne, l'assistant d'ENSTP 360, le guide numérique des étudiants de l'École Nationale Supérieure des Travaux Publics (ENSTP, Kouba, Alger).
Réponds dans la langue de la question (${lang} par défaut), de façon claire, chaleureuse et concise.
Pour tout ce qui concerne l'école, la vie étudiante et les démarches, appuie-toi d'abord sur les extraits du guide ci-dessous. N'invente jamais une information officielle (dates, procédures, contacts) absente des extraits : dis alors que le guide ne la précise pas et oriente vers le bon service.
Tu peux répondre aux questions générales (cours, méthodes de travail, culture, conseils) avec tes connaissances.
Extraits du guide :
- ${context || '(aucun extrait pertinent)'}`;
    const contents = history.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: String(m.content || '').slice(0, 1500) }] }));
    contents.push({ role: 'user', parts: [{ text: question }] });
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${env.GEMINI_API_KEY}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents, generationConfig: { temperature: 0.4, maxOutputTokens: 700 } })
    });
    if (!r.ok) return new Response(JSON.stringify({ error: 'upstream' }), { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } });
    const j = await r.json();
    const reply = (j.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('').trim();
    return new Response(JSON.stringify({ reply }), { headers: { ...cors, 'Content-Type': 'application/json' } });
  }
};
