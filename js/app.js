/* ============================================================
   Rendu du portfolio — version terminal (statique, sans dépendance).
   Une seule source de données : js/data.js (window.DATA).
   Chaque partie du portfolio est une commande : on la tape, on clique
   sur une entrée « > » ou on la compose sur le clavier fictif.
   ============================================================ */
(function () {
  const D = window.DATA;
  const page = document.body.dataset.page || 'home';
  const params = new URLSearchParams(location.search);
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- utilitaires ---------- */
  const esc = (s) =>
    String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  const el = (id) => document.getElementById(id);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* stockage indisponible */ } },
  };
  const isPhone = () => window.matchMedia('(max-width: 760px)').matches;

  function skillLevel(n) {
    if (n >= 78) return 'Maîtrisé';
    if (n >= 60) return 'Avancé';
    if (n >= 45) return 'Intermédiaire';
    return 'Initiation';
  }
  const COMP_LEVELS = ['—', 'Initiation', 'Intermédiaire', 'Maîtrise', 'Expertise'];
  const dots4 = (n) => `<span class="dots4" aria-label="Niveau ${n} sur 4">${'●'.repeat(n)}<span class="off">${'●'.repeat(4 - n)}</span></span>`;

  /* ---------- index des données ---------- */
  const SAE = [
    ...D.sae.but1.map((s) => ({ ...s, promo: 'BUT 1' })),
    ...D.sae.but2.map((s) => ({ ...s, promo: 'BUT 2' })),
  ];
  const COMPS = D.competences || [];
  const HARD = D.skills.hard;
  const SOFT = D.skills.soft;
  const PROJ = D.projects;
  const EXP = D.experiences || [];
  const compName = (id) => (COMPS.find((c) => c.id === id) || {}).name || id;
  const hardName = (id) => (HARD.find((s) => s.id === id) || {}).name || id;
  const [firstName, ...lastName] = D.site.name.split(' ');

  /* liens internes du texte (data.js) -> commandes */
  function linkify(html) {
    return String(html || '')
      .replace(/\sonclick="[^"]*"/g, '')
      .replace(/href="competence\.html\?id=([\w-]+)"/g, 'href="#competence-$1" data-cmd="competence $1"')
      .replace(/href="#softskillDetail"/g, 'href="#qualites-curiosite" data-cmd="qualites curiosite"');
  }

  /* petits morceaux de sortie */
  const run = (cmd, label) => `<button class="run" data-cmd="${esc(cmd)}">${esc(label || cmd)}</button>`;
  const chip = (cmd, label, main) => `<button class="chip${main ? ' chip--main' : ''}" data-cmd="${esc(cmd)}">${esc(label || cmd)}</button>`;
  const ext = (href, label) => `<a class="chip chip--link" href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`;
  const dl = (href, label, main) => `<a class="chip chip--dl${main ? ' chip--main' : ''}" href="${esc(href)}" download target="_blank" rel="noopener">${esc(label)}</a>`;
  const h = (t) => `<p class="h">${t}</p>`;
  const h3 = (t) => `<p class="h3">${t}</p>`;
  const p = (t) => `<p class="p">${t}</p>`;

  function gauge(before, now, cells) {
    const n = cells || 24;
    const full = Math.round((now / 100) * n);
    const prev = before == null ? 0 : Math.min(full, Math.round((before / 100) * n));
    return `<span class="gauge" aria-hidden="true"><span class="g-prev">${'█'.repeat(prev)}</span><span class="g-new">${'█'.repeat(full - prev)}</span><span class="g-empty">${'░'.repeat(n - full)}</span></span>`;
  }
  function shortHash(str) {
    let x = 5381;
    for (const c of str) x = ((x << 5) + x + c.charCodeAt(0)) >>> 0;
    return x.toString(16).padStart(7, '0').slice(0, 7);
  }

  /* ============================================================
     COMMANDES
     ============================================================ */
  const yr = D.skills.years;

  function cmdWhoami() {
    const cur = D.parcours[D.parcours.length - 1];
    const job = EXP[0];
    const photo = D.site.photo ? `
        <figure class="avatar">
          <figcaption class="shot__bar">$ cat ${esc(D.site.photo.split('/').pop())}</figcaption>
          <canvas class="avatar__px" aria-hidden="true"></canvas>
          <img class="avatar__img" src="${esc(D.site.photo)}" alt="Photo de ${esc(D.site.name)}" />
        </figure>` : '';
    return `<div class="who">
      <div class="who__main">
      <div class="banner">
        <div class="banner__name">${esc(firstName)} <span>${esc(lastName.join(' '))}</span><span class="cursor-blink" aria-hidden="true"></span></div>
        <div class="banner__rule" aria-hidden="true">${'─'.repeat(120)}</div>
      </div>
      <dl class="kv">
        <dt>statut</dt><dd>${esc(D.site.status)}</dd>
        <dt>formation</dt><dd>${esc(cur.title)} · ${esc(cur.text)}</dd>
        ${job ? `<dt>en ce moment</dt><dd>${esc(job.title)} <span class="muted">(${esc(job.tag.toLowerCase())})</span></dd>` : ''}
        <dt>recherche</dt><dd class="acc2">${esc(D.site.objective)}</dd>
      </dl>
      </div>${photo}
      </div>
      <div class="gap"></div>
      ${p(linkify(D.site.intro))}
      <div class="chips">
        ${D.site.cv ? dl(D.site.cv, 'Télécharger mon CV', true) : ''}
        ${chip('experience', 'experience')}
        ${chip('stack', 'stack')}
        ${chip('contact', 'contact')}
      </div>`;
  }

  function cmdCompetences(arg) {
    if (arg) return compDetail(arg);
    const rows = COMPS.map((c) => `
      <button class="row" style="--c1:12ch" data-cmd="competences ${esc(c.id)}">
        <span class="row__id">${esc(c.name)}</span>
        <span class="row__t">${esc(c.full)}<span class="row__d">${esc(c.short)}</span></span>
        <span class="row__x">${dots4(c.now)} ${esc(COMP_LEVELS[c.now])}</span>
      </button>`).join('');
    return `${h('Mes 6 compétences')}
      ${p('Les six compétences du BUT Informatique, chacune appuyée par des preuves concrètes (SAÉ, projets, dépôts) et une analyse réflexive. Clique sur une ligne pour voir les preuves.')}
      <div class="gap"></div><div class="rows">${rows}</div>`;
  }

  function compDetail(id) {
    const c = COMPS.find((x) => x.id === id);
    if (!c) {
      if (HARD.find((x) => x.id === id)) return stackDetail(id);
      return notFound(`compétence « ${id} » introuvable`, 'competences');
    }
    const saes = SAE.filter((s) => (c.saes || []).includes(s.slug));
    const projs = (c.projects || []).filter((k) => PROJ[k]);
    const langs = (c.langs || []).filter((k) => HARD.find((x) => x.id === k));
    return `${h(`${esc(c.name)} <span class="muted">·</span> ${dots4(c.now)} <span class="ink">${esc(COMP_LEVELS[c.now])}</span>`)}
      ${p(`<b>${esc(c.full)}</b>`)}${p(esc(c.short))}
      ${c.appris ? h3("Ce que j'ai appris") + p(esc(c.appris)) : ''}
      ${c.prouver ? h3('Comment je le prouve') + p(esc(c.prouver)) : ''}
      ${c.ameliorer ? h3("Ce qu'il me reste à améliorer") + p(esc(c.ameliorer)) : ''}
      ${saes.length || projs.length ? h3('Preuves') : ''}
      ${saes.length ? `<div class="rows">${saes.map(saeRow).join('')}</div>` : ''}
      ${projs.length ? `<div class="rows">${projs.map(projRow).join('')}</div>` : ''}
      ${langs.length ? `${h3('Langages mobilisés')}<div class="chips">${langs.map((k) => chip(`stack ${k}`, hardName(k))).join('')}</div>` : ''}`;
  }

  function cmdStack(arg) {
    if (arg) return stackDetail(arg);
    const list = [...HARD].sort((a, b) => b.now - a.now);
    const rows = list.map((s) => {
      const lvl = skillLevel(s.now);
      const was = s.before == null ? `<span class="acc2">nouveau</span>` : `${esc(yr.before)} ${s.before}%`;
      return `<button class="brow" data-cmd="stack ${esc(s.id)}">
        <span class="brow__n">${esc(s.name)}</span>
        ${gauge(s.before, s.now)}
        <span class="brow__v"><b>${s.now}%</b> <span class="${lvl === 'Maîtrisé' ? 'lvl-master' : ''}">${esc(lvl)}</span> · ${was}</span>
      </button>`;
    }).join('');
    return `${h('Technologies &amp; langages')}
      ${p(`Niveau actuel (${esc(yr.now)}) comparé à l'an dernier (${esc(yr.before)}). Clique sur une ligne pour voir la preuve.`)}
      <div class="gap"></div><div class="bars">${rows}</div>
      <div class="legend"><span><span class="g-prev">██</span> niveau ${esc(yr.before)}</span><span><span class="g-new">██</span> progression ${esc(yr.now)}</span></div>`;
  }

  function stackDetail(id) {
    const s = HARD.find((x) => x.id === id);
    if (!s) return notFound(`techno « ${id} » introuvable`, 'stack');
    const saes = SAE.filter((x) => (x.skills || []).includes(id) || (s.saes || []).includes(x.slug));
    const projs = Object.keys(PROJ).filter((k) => (PROJ[k].skills || []).includes(id) || (s.projects || []).includes(k));
    const comps = COMPS.filter((c) => (c.langs || []).includes(id));
    return `${h(esc(s.name))}
      <div class="bars"><div class="brow" style="cursor:default">
        <span class="brow__n muted">${s.before == null ? `nouveau en ${esc(yr.now)}` : `${esc(yr.before)} ${s.before}% → ${esc(yr.now)}`}</span>
        ${gauge(s.before, s.now)}
        <span class="brow__v"><b>${s.now}%</b> ${esc(skillLevel(s.now))}</span>
      </div></div>
      ${s.proof ? `<div class="gap"></div>${p(esc(s.proof))}` : ''}
      ${s.code ? `${h3('Extrait de code')}<pre class="code"><code>${esc(s.code)}</code></pre>` : ''}
      ${saes.length || projs.length ? h3('Projets liés') : ''}
      ${saes.length ? `<div class="rows">${saes.map(saeRow).join('')}</div>` : ''}
      ${projs.length ? `<div class="rows">${projs.map(projRow).join('')}</div>` : ''}
      ${comps.length ? `${h3('Compétences du BUT')}<div class="chips">${comps.map((c) => chip(`competences ${c.id}`, c.name)).join('')}</div>` : ''}
      ${s.github ? `<div class="chips">${ext(s.github, 'Voir le dépôt GitHub')}</div>` : ''}`;
  }

  function cmdQualites(arg) {
    if (arg) {
      const q = SOFT.find((x) => x.id === arg);
      if (!q) return notFound(`qualité « ${arg} » introuvable`, 'qualites');
      return `${h(esc(q.name))}${h3("Pourquoi je m'attribue cette qualité")}${p(esc(q.text))}
        <div class="chips">${SOFT.filter((x) => x.id !== q.id).map((x) => chip(`qualites ${x.id}`, x.name)).join('')}</div>`;
    }
    return `${h('Savoir-être')}
      <div class="rows">${SOFT.map((q) => `
        <button class="row" style="--c1:20ch" data-cmd="qualites ${esc(q.id)}">
          <span class="row__id">${esc(q.name)}</span>
          <span class="row__t"><span class="row__d" style="margin:0">${esc(q.text)}</span></span>
          <span class="row__x"></span>
        </button>`).join('')}</div>`;
  }

  function cmdExperience() {
    const items = EXP.map((x, i) => ({
      head: shortHash(x.title), ref: i === 0 ? '(HEAD -> en cours)' : '',
      title: x.title, date: x.tag, msg: esc(x.desc), extra: '',
    }));
    const colis = SAE.find((s) => s.slug === 's3-01');
    if (colis) {
      items.push({
        head: shortHash(colis.title), ref: '', title: 'Projet commandité · Application de suivi de colis, IUT de Villetaneuse',
        date: 'SAÉ S3.01', msg: 'Commanditaire réel, équipe de cinq, cahier des charges et déploiement. Mon rôle : front-end et conception responsive.',
        extra: `<div class="chips">${chip('sae s3-01', 'sae s3-01')}</div>`,
      });
    }
    const log = items.map((c) => `
      <div class="commit">
        <span class="commit__graph">*</span>
        <div>
          <div class="commit__head">commit ${c.head} <span class="ref">${c.ref}</span></div>
          <div class="commit__title">${esc(c.title)}</div>
          <div class="commit__date">Date : ${esc(c.date)}</div>
          <div class="commit__msg">${c.msg}</div>
          ${c.extra}
        </div>
      </div>`).join('');
    return `${h('Expériences professionnelles')}
      <p class="muted small">$ git log --experiences</p><div class="gap"></div>
      <div class="log">${log}</div>
      <div class="gap"></div>
      ${p(`Disponible pour un stage de 14 à 16 semaines à partir du 8 mars 2027 : <a href="mailto:${esc(D.site.email)}">${esc(D.site.email)}</a>.`)}`;
  }

  function cmdParcours() {
    const items = [...D.parcours].reverse().map((x) => `
      <div class="tl${x.now ? ' is-now' : ''}">
        <span class="tl__y">${esc(x.year)}</span>
        <span class="tl__m">${x.now ? '●' : '○'}</span>
        <span class="tl__b"><span class="tl__t">${esc(x.title)}</span>${x.now ? ' <span class="ok small">en cours</span>' : ''}<span class="tl__d">${esc(x.text)}</span></span>
      </div>`).join('');
    return `${h('Mon parcours')}<div class="timeline">${items}</div>`;
  }

  function saeRow(s) {
    return `<button class="row" style="--c1:7ch" data-cmd="sae ${esc(s.slug)}">
      <span class="row__id">${esc(s.id)}</span>
      <span class="row__t">${esc(s.title)}<span class="row__d">${esc(s.summary)}</span></span>
      <span class="row__x">${s.github ? 'git ↗' : ''}</span>
    </button>`;
  }
  function projRow(k) {
    const pr = PROJ[k];
    return `<button class="row" style="--c1:15ch" data-cmd="projets ${esc(k)}">
      <span class="row__id">${esc(k)}/</span>
      <span class="row__t">${esc(pr.title)}<span class="row__d">${esc(pr.tagline || pr.summary || '')}</span></span>
      <span class="row__x">${pr.github ? 'git ↗' : ''}</span>
    </button>`;
  }

  function cmdSae(arg) {
    if (arg) return saeDetail(arg);
    const groups = ['BUT 1', 'BUT 2'].map((g) => {
      const list = SAE.filter((s) => s.promo === g);
      return `<p class="group"><b>${g}</b> · ${list.length} SAÉ</p><div class="rows">${list.map(saeRow).join('')}</div>`;
    }).join('');
    return `${h('Réalisations · SAÉ')}
      <p class="muted small">$ ls -l sae/   (${SAE.length} SAÉ, de ${esc(SAE[0].id)} à ${esc(SAE[SAE.length - 1].id)})</p>
      ${groups}
      <div class="chips">${chip('projets', 'projets')}</div>`;
  }

  function saeDetail(slug) {
    const s = SAE.find((x) => x.slug === slug || x.id.toLowerCase() === String(slug).toLowerCase());
    if (!s) return notFound(`SAÉ « ${slug} » introuvable`, 'sae');
    const compIds = s.competences || COMPS.filter((c) => (c.saes || []).includes(s.slug)).map((c) => c.id);
    const li = (arr) => (arr || []).map((t) => `<li>${esc(t)}</li>`).join('');
    const i = SAE.indexOf(s);
    const prev = SAE[i - 1], next = SAE[i + 1];
    return `${h(`${esc(s.id)} <span class="muted">·</span> ${esc(s.title)}`)}
      <p class="muted small">${esc(s.promo)}</p>
      ${p(esc(s.summary))}
      ${s.github ? `<div class="chips">${ext(s.github, 'Voir sur GitHub')}</div>` : ''}
      ${s.objectifs ? h3('Objectifs de la SAÉ') + p(esc(s.objectifs)) : ''}
      ${s.recit ? h3('Présentation et déroulé') + p(esc(s.recit)) : ''}
      ${s.role ? h3('Mon rôle') + p(esc(s.role)) : ''}
      ${s.taches ? `${h3('Tâches accomplies')}<div class="cols">
          <div><p class="acc small">individuellement</p><ul class="todo">${li(s.taches.individuel)}</ul></div>
          <div><p class="acc small">collectivement</p><ul class="todo">${li(s.taches.collectif)}</ul></div>
        </div>` : ''}
      ${s.difficultes && s.difficultes.length ? h3('Difficultés et solutions') + s.difficultes.map((d) => `
        <div class="diff"><p><span class="tag-err">ERR</span><span>${esc(d.probleme)}</span></p><p><span class="tag-ok">FIX</span><span>${esc(d.solution)}</span></p></div>`).join('') : ''}
      ${compIds.length || (s.skills || []).length ? h3('Compétences mobilisées') : ''}
      ${s.niveaux && s.niveaux.length
        ? `<div class="lv">${s.niveaux.map((n) => `${run(`competences ${n.comp}`, compName(n.comp))}<span class="muted">${esc(n.avant)} → <b>${esc(n.apres)}</b></span>`).join('')}</div>`
        : (compIds.length ? `<div class="chips">${compIds.map((c) => chip(`competences ${c}`, compName(c))).join('')}</div>` : '')}
      ${(s.skills || []).length ? `<div class="chips">${s.skills.map((k) => chip(`stack ${k}`, hardName(k))).join('')}</div>` : ''}
      ${s.perspectives ? h3("Perspectives d'amélioration") + p(esc(s.perspectives)) : ''}
      <div class="chips">
        ${prev ? chip(`sae ${prev.slug}`, `← ${prev.id}`) : ''}
        ${chip('sae', 'toutes les SAÉ')}
        ${next ? chip(`sae ${next.slug}`, `${next.id} →`) : ''}
      </div>`;
  }

  function cmdProjets(arg) {
    if (arg) return projDetail(arg);
    const keys = Object.keys(PROJ);
    return `${h('Projets perso')}
      <p class="muted small">$ ls projets/   (${keys.length} projets)</p><div class="gap"></div>
      <div class="rows">${keys.map(projRow).join('')}</div>
      <div class="chips">${chip('sae', 'sae')}</div>`;
  }

  function projDetail(k) {
    const pr = PROJ[k];
    if (!pr) return notFound(`projet « ${k} » introuvable`, 'projets');
    const comps = COMPS.filter((c) => (c.projects || []).includes(k));
    const points = (pr.points || []).filter((x) => !/^\[.*\]$/.test(x));
    const imgs = pr.images || [];
    return `${h(esc(pr.title))}
      <p class="muted small">${esc(pr.year)} · ${esc(pr.domain)}</p>
      ${p(esc(pr.tagline))}
      ${pr.github ? `<div class="chips">${ext(pr.github, 'Voir sur GitHub')}</div>` : ''}
      ${h3('Présentation')}${p(esc(pr.summary))}
      ${pr.role ? h3('Travail effectué') + p(esc(pr.role)) : ''}
      ${points.length ? `${h3('Points clés')}<ul class="todo">${points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      ${imgs.length ? `${h3('Aperçu')}<div class="shots">${imgs.map((src, i) => `
        <figure class="shot"><figcaption class="shot__bar">aperçu ${i + 1}/${imgs.length}</figcaption><img src="${esc(src)}" alt="Aperçu ${esc(pr.title)} ${i + 1}" loading="lazy" /></figure>`).join('')}</div>` : ''}
      ${comps.length || (pr.skills || []).length ? h3('Compétences mobilisées') : ''}
      ${comps.length ? `<div class="chips">${comps.map((c) => chip(`competences ${c.id}`, c.name)).join('')}</div>` : ''}
      ${(pr.skills || []).length ? `<div class="chips">${pr.skills.map((x) => chip(`stack ${x}`, hardName(x))).join('')}</div>` : ''}
      <div class="chips">${chip('projets', 'tous les projets')}</div>`;
  }

  function cmdObjectifs() {
    const pl = D.projetPlus || {};
    return `${h('Compétences à développer')}${p(linkify(pl.developper))}
      ${h('Mes objectifs · BUT 3 et après')}${p(linkify(pl.objectifs))}`;
  }

  function cmdContact() {
    const s = D.site;
    return `${h('Me contacter')}
      <dl class="kv">
        <dt>email</dt><dd><a href="mailto:${esc(s.email)}">${esc(s.email)}</a> <button class="run small" data-copy="${esc(s.email)}">copier</button></dd>
        <dt>linkedin</dt><dd><a href="${esc(s.linkedin)}" target="_blank" rel="noopener">${esc(s.linkedin.replace(/^https?:\/\/(www\.)?/, ''))}</a></dd>
        <dt>github</dt><dd><a href="${esc(s.github)}" target="_blank" rel="noopener">${esc(s.github.replace(/^https?:\/\//, ''))}</a></dd>
        <dt>recherche</dt><dd class="acc2">${esc(s.objective)}</dd>
      </dl>
      <div class="chips">${s.cv ? dl(s.cv, 'Télécharger mon CV', true) : ''}${ext(s.linkedin, 'LinkedIn')}${ext(s.github, 'GitHub')}</div>`;
  }

  function cmdCv() {
    const s = D.site;
    const file = s.cv.split('/').pop();
    return `<p class="muted">$ wget ${esc(file)}</p>
      <p class="ink">${esc(file)} <span class="ok">100%</span> ${'█'.repeat(24)}</p>
      <div class="chips">${dl(s.cv, `Ouvrir ${file}`, true)}</div>`;
  }

  function cmdAide() {
    const rows = VISIBLE.map((c) => `
      <button class="row" style="--c1:13ch" data-cmd="${esc(c.name)}">
        <span class="row__id">${esc(c.name)}</span><span class="row__t">${esc(c.desc)}</span><span class="row__x">${c.args ? '[id]' : ''}</span>
      </button>`).join('');
    return `${h('Commandes disponibles')}
      <div class="rows">${rows}</div>
      ${h3('Autres commandes')}
      <dl class="kv">
        <dt>clear</dt><dd>effacer l'écran (ou <span class="acc">Ctrl+L</span>)</dd>
        <dt>theme</dt><dd>changer de thème : ${THEMES.map((t) => run(`theme ${t}`, t)).join(', ')}</dd>
        <dt>clavier</dt><dd>afficher ou masquer le clavier fictif</dd>
        <dt>history</dt><dd>les commandes déjà lancées</dd>
      </dl>
      ${h3('Raccourcis')}
      <dl class="kv">
        <dt>Tab</dt><dd>compléter la commande ou l'identifiant</dd>
        <dt>↑ ↓</dt><dd>parcourir l'historique</dd>
        <dt>clic</dt><dd>tout ce qui est souligné en pointillés lance une commande</dd>
      </dl>`;
  }

  function cmdHistory() {
    if (!history.length) return '<p class="muted">Aucune commande pour le moment.</p>';
    return `<div class="rows">${history.map((c, i) => `<button class="row" style="--c1:4ch" data-cmd="${esc(c)}"><span class="row__id">${i + 1}</span><span class="row__t">${esc(c)}</span><span class="row__x"></span></button>`).join('')}</div>`;
  }

  function cmdSudo(arg) {
    return `<p class="muted">[sudo] mot de passe pour recruteur : ********</p>
      <p class="ok">Accès accordé.</p>
      ${p(`Bonne idée${arg ? ` (« ${esc(arg)} »)` : ''}. La suite se passe par mail : <a href="mailto:${esc(D.site.email)}">${esc(D.site.email)}</a>.`)}
      <div class="chips">${chip('contact', 'contact', true)}</div>`;
  }

  const THEMES = ['nuit', 'noir', 'papier'];
  function cmdTheme(arg) {
    const cur = document.body.dataset.themeTerm || 'nuit';
    const next = arg || THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length];
    if (!THEMES.includes(next)) return notFound(`thème « ${arg} » inconnu`, 'theme');
    setTheme(next);
    return `<p>Thème <span class="acc2">${esc(next)}</span> activé. <span class="muted">Autres :</span> ${THEMES.filter((t) => t !== next).map((t) => run(`theme ${t}`, t)).join(', ')}</p>`;
  }
  function cmdClavier() {
    const open = toggleKeyboard();
    return `<p class="muted">Clavier fictif ${open ? 'affiché' : 'masqué'}.</p>`;
  }

  function notFound(msg, back) {
    return `<p class="err">erreur : ${esc(msg)}</p><div class="chips">${chip(back, back)}</div>`;
  }

  /* registre : nom, description, sous-commandes (identifiants), suites proposées */
  const VISIBLE = [
    { name: 'whoami', desc: 'qui je suis', run: cmdWhoami, next: ['experience', 'stack', 'projets', 'contact'] },
    { name: 'experience', desc: 'stage et emploi', run: cmdExperience, next: ['stack', 'projets', 'cv'] },
    { name: 'competences', desc: 'les 6 compétences du BUT', run: cmdCompetences, args: () => COMPS.map((c) => c.id), next: ['stack', 'sae'] },
    { name: 'stack', desc: 'technos et niveaux', run: cmdStack, args: () => HARD.map((s) => s.id), next: ['projets', 'competences'] },
    { name: 'projets', desc: 'projets perso et TP', run: cmdProjets, args: () => Object.keys(PROJ), next: ['sae', 'stack'] },
    { name: 'sae', desc: `les ${SAE.length} SAÉ`, run: cmdSae, args: () => SAE.map((s) => s.slug), next: ['projets', 'competences'] },
    { name: 'parcours', desc: 'ma formation', run: cmdParcours, next: ['objectifs', 'experience'] },
    { name: 'objectifs', desc: 'ce que je vise', run: cmdObjectifs, next: ['contact', 'parcours'] },
    { name: 'qualites', desc: 'savoir-être', run: cmdQualites, args: () => SOFT.map((s) => s.id), next: ['whoami', 'contact'] },
    { name: 'contact', desc: 'me joindre', run: cmdContact, next: ['cv', 'whoami'] },
    { name: 'cv', desc: 'télécharger le CV', run: cmdCv, next: ['contact', 'experience'] },
  ];
  const HIDDEN = [
    { name: 'aide', run: cmdAide, next: ['whoami', 'experience', 'stack'] },
    { name: 'history', run: cmdHistory },
    { name: 'theme', run: cmdTheme, args: () => THEMES },
    { name: 'clavier', run: cmdClavier },
    { name: 'sudo', run: cmdSudo, next: ['contact'] },
    { name: 'clear' },
  ];
  const ALIASES = {
    help: 'aide', man: 'aide', '?': 'aide', ls: 'aide',
    competence: 'competences', 'compétences': 'competences', 'compétence': 'competences',
    skills: 'stack', technos: 'stack', langages: 'stack',
    projet: 'projets', projects: 'projets', saes: 'sae',
    experiences: 'experience', 'expérience': 'experience', 'expériences': 'experience', xp: 'experience',
    qualite: 'qualites', 'qualités': 'qualites', 'savoir-etre': 'qualites',
    formation: 'parcours', objectif: 'objectifs', mail: 'contact', email: 'contact',
    keyboard: 'clavier', cls: 'clear', moi: 'whoami',
  };
  const ALL = [...VISIBLE, ...HIDDEN];
  const findCmd = (name) => ALL.find((c) => c.name === (ALIASES[name] || name));

  function lev(a, b) {
    const m = a.length, n = b.length;
    const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    return d[m][n];
  }

  /* ============================================================
     INTERFACE
     ============================================================ */
  const ps1 = (path) => `<span class="ps1"><span class="p-host">fares@portfolio</span><span class="p-sign p-colon">:</span><span class="p-path">${esc(path || '~')}</span><span class="p-sign">$</span></span>`;

  const KEYS = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', 'Backspace'],
    ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
    ['Tab', 'w', 'x', 'c', 'v', 'b', 'n', '.', ' ', 'Enter'],
  ];
  const KEY_LABEL = { Backspace: '⌫', Tab: '⇥ tab', Enter: '↵ entrée', ' ': 'espace' };
  const KEY_HTML = { Backspace: '⌫', Tab: '⇥<span class="kl">&nbsp;tab</span>', Enter: '↵<span class="kl">&nbsp;entrée</span>', ' ': '<span class="kl">espace</span><span class="ks">␣</span>' };
  const KEY_CLASS = { Backspace: 'key--wide', Tab: 'key--wide', Enter: 'key--enter', ' ': 'key--space' };

  const mount = document.createElement('div');
  mount.className = 'app';
  mount.innerHTML = `
      <div class="term" id="term">
        <header class="bar-title">
          <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="bar-title__path">fares@portfolio: <b>~/but-informatique</b></span>
          <span class="bar-title__actions">
            <button class="tbtn" data-cmd="aide">aide</button>
            ${D.site.cv ? `<a class="tbtn tbtn--solid" href="${esc(D.site.cv)}" download target="_blank" rel="noopener">CV ↓</a>` : ''}
          </span>
        </header>
        <div class="body">
          <nav class="entries" id="entries" aria-label="Commandes">
            <span class="entries__label">entrées</span>
            ${VISIBLE.map((c) => `<button class="entry" data-cmd="${esc(c.name)}" data-entry="${esc(c.name)}"><span class="entry__chev">&gt;</span><span class="entry__name">${esc(c.name)}</span><span class="entry__desc">${esc(c.desc)}</span></button>`).join('')}
            <p class="entries__tips"><kbd>Tab</kbd> compléter<br /><kbd>↑</kbd> <kbd>↓</kbd> historique<br /><kbd>Ctrl</kbd>+<kbd>L</kbd> effacer</p>
          </nav>
          <section class="screen" id="screen">
            <div class="scroll" id="scroll" aria-live="polite"></div>
            <div class="dock">
              <div class="suggest" id="suggest"></div>
              <form class="prompt" id="form" autocomplete="off">
                ${ps1()}
                <label class="field">
                  <span class="ghost" id="ghost" aria-hidden="true"></span>
                  <input id="input" type="text" spellcheck="false" autocapitalize="off" autocorrect="off" enterkeyhint="go" aria-label="Commande" placeholder="tape une commande, ou « aide »" />
                </label>
              </form>
            </div>
          </section>
        </div>
        <div class="kbd" id="kbd" aria-label="Clavier fictif">
          ${KEYS.map((row) => `<div class="krow">${row.map((k) => `<button class="key ${KEY_CLASS[k] || ''}" data-key="${esc(k)}" tabindex="-1" aria-label="${esc(KEY_LABEL[k] || k)}">${KEY_HTML[k] || esc(k)}</button>`).join('')}</div>`).join('')}
        </div>
        <footer class="status">
          <span class="mode">FB</span>
          <span class="branch">⎇ main</span>
          <span class="dispo">${esc(D.site.objective)}</span>
          <button id="kbdToggle" type="button">⌨ clavier</button>
          <button id="themeToggle" type="button" aria-label="Changer de thème">◐<span class="kl"> thème</span></button>
          <span class="enc">${esc(D.site.year)}</span>
          <span class="clock" id="clock"></span>
        </footer>
      </div>`;
  document.body.appendChild(mount);

  const scroll = el('scroll');
  const input = el('input');
  const ghost = el('ghost');
  const form = el('form');
  const suggest = el('suggest');
  const kbd = el('kbd');
  const history = [];
  let hIndex = -1;
  let typingToken = 0;

  /* ---------- thème & clavier ---------- */
  function setTheme(t) {
    document.body.dataset.themeTerm = t;
    store.set('fb-theme', t);
  }
  setTheme(THEMES.includes(store.get('fb-theme')) ? store.get('fb-theme') : 'nuit');

  function setKeyboard(open) {
    kbd.hidden = !open;
    // clavier fictif ouvert sur téléphone : pas de clavier natif
    if (isPhone() && open) input.setAttribute('inputmode', 'none'); else input.removeAttribute('inputmode');
    el('kbdToggle').innerHTML = `⌨<span class="kl"> ${open ? 'masquer le clavier' : 'clavier'}</span>`;
    store.set('fb-kbd', open ? '1' : '0');
  }
  function toggleKeyboard() { setKeyboard(kbd.hidden); return !kbd.hidden; }
  const savedKbd = store.get('fb-kbd');
  setKeyboard(savedKbd == null ? !isPhone() && window.innerHeight >= 680 : savedKbd === '1');

  function flashKey(k) {
    const key = kbd.querySelector(`[data-key="${CSS.escape(k)}"]`);
    if (!key) return;
    key.classList.add('is-down');
    setTimeout(() => key.classList.remove('is-down'), 130);
  }

  /* ---------- horloge ---------- */
  function tick() { el('clock').textContent = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }); }
  tick(); setInterval(tick, 15000);

  /* ---------- complétion ---------- */
  function completion(value) {
    const v = value.replace(/^\s+/, '').toLowerCase();
    if (!v) return '';
    const parts = v.split(/\s+/);
    if (parts.length === 1) {
      const m = [...VISIBLE, ...HIDDEN].map((c) => c.name).find((n) => n.startsWith(v) && n !== v);
      return m || '';
    }
    const c = findCmd(parts[0]);
    if (!c || !c.args || parts.length > 2) return '';
    const m = c.args().find((a) => a.toLowerCase().startsWith(parts[1]) && a.toLowerCase() !== parts[1]);
    return m ? `${parts[0]} ${m}` : '';
  }
  function updateGhost() {
    const v = input.value;
    const c = completion(v);
    const lead = v.match(/^\s*/)[0];
    ghost.innerHTML = c && (lead + c).toLowerCase().startsWith(v.toLowerCase())
      ? `<span class="typed">${esc(v)}</span><span class="rest">${esc((lead + c).slice(v.length))}</span>` : '';
  }
  function acceptGhost() {
    const c = completion(input.value);
    if (c) { input.value = c + (findCmd(c) && findCmd(c).args && !c.includes(' ') ? ' ' : ''); updateGhost(); return true; }
    return false;
  }

  /* ---------- exécution ---------- */
  function setSuggest(names) {
    suggest.innerHTML = names && names.length
      ? `<span>suite :</span>${names.map((n) => chip(n, n)).join('')}` : '';
  }
  function setActive(name) {
    document.querySelectorAll('.entry').forEach((b) => b.classList.toggle('is-active', b.dataset.entry === name));
    const act = document.querySelector('.entry.is-active');
    if (act && isPhone()) act.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduced ? 'auto' : 'smooth' });
  }
  function setHash(line) {
    const slug = line.trim().split(/\s+/).join('-');
    try { history.length && window.history.replaceState(null, '', '#' + slug); } catch (e) { /* cadre sans historique */ }
  }
  function append(html) {
    const block = document.createElement('section');
    block.className = 'out';
    block.innerHTML = html;
    scroll.appendChild(block);
    block.querySelectorAll('.avatar').forEach(pixelReveal);
    return block;
  }

  /* la photo « se charge » en gros pixels puis devient nette */
  function pixelReveal(fig) {
    const img = fig.querySelector('.avatar__img');
    const cv = fig.querySelector('.avatar__px');
    if (reduced || !cv || !cv.getContext) { fig.classList.add('is-sharp'); return; }
    const go = async () => {
      const ctx = cv.getContext('2d');
      const size = 240;
      cv.width = size; cv.height = size;
      ctx.imageSmoothingEnabled = false;
      const tmp = document.createElement('canvas');
      const tctx = tmp.getContext('2d');
      for (const n of [6, 12, 24, 48, 96]) {
        tmp.width = n; tmp.height = n;
        tctx.drawImage(img, 0, 0, n, n);
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(tmp, 0, 0, n, n, 0, 0, size, size);
        await sleep(110);
      }
      fig.classList.add('is-sharp');
    };
    if (img.complete && img.naturalWidth) go(); else img.addEventListener('load', go, { once: true });
  }

  function execute(raw) {
    const line = raw.trim();
    if (!line) return;
    if (history[history.length - 1] !== line) history.push(line);
    hIndex = -1;
    const [name, ...rest] = line.split(/\s+/);
    const arg = rest.join(' ').toLowerCase();
    const c = findCmd(name.toLowerCase());
    if (c && c.name === 'clear') { scroll.innerHTML = ''; setSuggest(['whoami', 'aide']); return; }
    let out;
    if (!c) {
      const names = ALL.map((x) => x.name).concat(Object.keys(ALIASES));
      const best = names.map((n) => [n, lev(name.toLowerCase(), n)]).sort((a, b) => a[1] - b[1])[0];
      const guess = best && best[1] <= 3 ? (ALIASES[best[0]] || best[0]) : null;
      out = `<p class="err">zsh: commande introuvable : ${esc(name)}</p>
        ${guess ? `<p>Vouliez-vous dire ${run(guess)} ?</p>` : ''}
        <p class="muted">Tape ${run('aide')} pour voir toutes les commandes.</p>`;
    } else {
      out = c.run(arg);
    }
    const block = append(`<p class="echo">${ps1()} <span class="cmd">${esc(line)}</span></p>${out}`);
    // le début de la réponse s'affiche en haut de l'écran
    scroll.scrollTo({ top: block.offsetTop - 8, behavior: reduced ? 'auto' : 'smooth' });
    if (c) {
      setActive(VISIBLE.includes(c) ? c.name : '');
      setSuggest(c.next || []);
      if (VISIBLE.includes(c) || c.name === 'aide') setHash(line);
    }
  }

  async function typeAndRun(cmd) {
    const my = ++typingToken;
    input.value = '';
    updateGhost();
    if (!reduced) {
      for (const ch of cmd) {
        if (my !== typingToken) return;
        input.value += ch;
        flashKey(ch);
        updateGhost();
        await sleep(24 + Math.random() * 34);
      }
      if (my !== typingToken) return;
      flashKey('Enter');
      await sleep(110);
    }
    if (my !== typingToken) return;
    input.value = '';
    updateGhost();
    execute(cmd);
  }

  /* ---------- événements ---------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    typingToken++;
    const v = input.value;
    input.value = '';
    updateGhost();
    execute(v);
  });
  input.addEventListener('input', updateGhost);
  input.addEventListener('keydown', (e) => {
    typingToken++;
    flashKey(e.key.length === 1 ? e.key.toLowerCase() : e.key);
    if (e.key === 'Tab') { e.preventDefault(); acceptGhost(); }
    else if (e.key === 'ArrowRight' && input.selectionStart === input.value.length && ghost.textContent) { e.preventDefault(); acceptGhost(); }
    else if (e.key === 'ArrowUp') {
      if (!history.length) return;
      e.preventDefault();
      hIndex = hIndex < 0 ? history.length - 1 : Math.max(0, hIndex - 1);
      input.value = history[hIndex]; updateGhost();
    } else if (e.key === 'ArrowDown') {
      if (hIndex < 0) return;
      e.preventDefault();
      hIndex += 1;
      if (hIndex >= history.length) { hIndex = -1; input.value = ''; } else input.value = history[hIndex];
      updateGhost();
    } else if (e.key.toLowerCase() === 'l' && e.ctrlKey) { e.preventDefault(); execute('clear'); }
  });

  // tout élément [data-cmd] lance sa commande ; [data-copy] copie un texte
  document.addEventListener('click', (e) => {
    const cp = e.target.closest('[data-copy]');
    if (cp) {
      const txt = cp.dataset.copy;
      const done = () => { cp.textContent = 'copié ✓'; setTimeout(() => (cp.textContent = 'copier'), 1600); };
      try { navigator.clipboard.writeText(txt).then(done, () => (cp.textContent = txt)); } catch (err) { cp.textContent = txt; }
      return;
    }
    const t = e.target.closest('[data-cmd]');
    if (t) { e.preventDefault(); typeAndRun(t.dataset.cmd); return; }
  });

  // clavier fictif
  kbd.addEventListener('pointerdown', (e) => {
    const k = e.target.closest('[data-key]');
    if (!k) return;
    e.preventDefault();
    typingToken++;
    const key = k.dataset.key;
    flashKey(key);
    if (key === 'Backspace') input.value = input.value.slice(0, -1);
    else if (key === 'Tab') acceptGhost();
    else if (key === 'Enter') { form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { cancelable: true })); return; }
    else input.value += key;
    updateGhost();
  });

  el('kbdToggle').addEventListener('click', toggleKeyboard);
  el('themeToggle').addEventListener('click', () => typeAndRun('theme'));

  // sur ordinateur, cliquer dans l'écran remet le curseur dans l'invite
  el('screen').addEventListener('click', (e) => {
    if (isPhone() || e.target.closest('a, button, input') || window.getSelection().toString()) return;
    input.focus();
  });
  // taper n'importe où écrit dans l'invite
  document.addEventListener('keydown', (e) => {
    if (document.activeElement === input || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length === 1 && !e.target.closest('input, textarea')) { input.focus(); }
  });

  /* ---------- démarrage ---------- */
  function startCommand() {
    const id = params.get('id');
    if (page === 'competence' && id) return `competences ${id}`;
    if (page === 'projet' && id) return `projets ${id}`;
    if (page === 'sae' && id) return `sae ${id}`;
    if (page === 'qualite' && id) return `qualites ${id}`;
    const hash = decodeURIComponent(location.hash.slice(1));
    if (hash) {
      const i = hash.indexOf('-');
      const name = i < 0 ? hash : hash.slice(0, i);
      if (findCmd(name)) return i < 0 ? name : `${name} ${hash.slice(i + 1)}`;
    }
    return null;
  }

  async function boot() {
    const target = startCommand();
    const seen = (() => { try { return sessionStorage.getItem('fb-boot') === '1'; } catch (e) { return false; } })();
    try { sessionStorage.setItem('fb-boot', '1'); } catch (e) { /* rien */ }

    const lines = [
      `<span class="ink">FaresOS ${esc(D.site.year)}</span> · BUT Informatique, parcours réalisation d'applications`,
      `<span class="ok">[ ok ]</span> chargement de data.js : ${SAE.length} SAÉ, ${Object.keys(PROJ).length} projets, ${HARD.length} technos`,
      `<span class="ok">[ ok ]</span> montage de ~/experience : ${EXP.map((x) => esc(x.title.split('·').pop().trim())).join(', ')}`,
      `<span class="ok">[ ok ]</span> statut : <span class="acc2">${esc(D.site.objective)}</span>`,
      `<span class="muted">Clique sur une entrée <span class="acc">&gt;</span>, utilise le clavier ou tape ${run('aide')}.</span>`,
    ];
    const box = append('<div class="boot" id="boot"></div>');
    const bootEl = box.querySelector('#boot');
    let fast = reduced || seen || !!target;
    const skip = () => { fast = true; };
    window.addEventListener('keydown', skip, { once: true });
    window.addEventListener('pointerdown', skip, { once: true });
    for (const l of lines) {
      const d = document.createElement('div');
      d.innerHTML = l;
      bootEl.appendChild(d);
      if (!fast) await sleep(260);
    }
    if (!fast) await sleep(250);
    setSuggest(['whoami', 'experience', 'stack', 'aide']);
    await typeAndRun(target || 'whoami');
    if (!isPhone()) input.focus({ preventScroll: true });
  }
  boot();
})();
