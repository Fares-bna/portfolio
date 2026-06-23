/* ============================================================
   Rendu du portfolio (statique, sans dépendance).
   Une seule source de données : js/data.js (window.DATA).
   ============================================================ */
(function () {
  const D = window.DATA;
  const page = document.body.dataset.page;
  const onHome = page === 'home';
  const base = onHome ? '' : 'index.html'; // préfixe des ancres hors accueil
  const params = new URLSearchParams(location.search);

  /* ---------- utilitaires ---------- */
  const esc = (s) =>
    String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  const el = (id) => document.getElementById(id);

  function skillLevel(n) {
    if (n >= 78) return 'Maîtrisé';
    if (n >= 60) return 'Avancé';
    if (n >= 45) return 'Intermédiaire';
    return 'Initiation';
  }

  // Échelle qualitative des 6 compétences (sur 4)
  const COMP_LEVELS = ['—', 'Initiation', 'Intermédiaire', 'Maîtrise', 'Expertise'];
  const compLevelLabel = (n) => COMP_LEVELS[n] || '—';
  function compDots(n) {
    let s = '';
    for (let i = 1; i <= 4; i++) s += `<span class="dot${i <= n ? ' dot--on' : ''}"></span>`;
    return `<span class="dots" role="img" aria-label="Niveau ${n} sur 4">${s}</span>`;
  }

  /* ---------- nav + footer (communs) ---------- */
  function navHTML() {
    const links = Object.entries(D.nav)
      .map(([a, l]) => `<a href="${base}#${a}">${esc(l)}</a>`).join('');
    const [first, ...rest] = D.site.name.split(' ');
    return `
      <div class="nav__inner">
        <a href="${base || '#accueil'}" class="nav__brand">${esc(first)} <b>${esc(rest.join(' '))}</b></a>
        <nav class="nav__links" id="navLinks">${links}</nav>
        <button class="nav__toggle" id="navToggle" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
      </div>`;
  }

  function footerHTML() {
    const s = D.site;
    const gh = s.github ? `<a href="${esc(s.github)}" target="_blank" rel="noopener">GitHub</a>` : '';
    return `
      <div class="container">
        <p class="footer__name">${esc(s.name)}</p>
        <p class="footer__meta">Portfolio ${esc(s.role)} · ${esc(s.year)}</p>
        <div class="footer__links">
          <a href="mailto:${esc(s.email)}">Email</a>
          ${gh}
          <a href="${esc(s.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>`;
  }

  /* ---------- accueil ---------- */
  function sectionHead(label, title, intro) {
    return `<header class="section__head reveal">
      <h2 class="section__title">${title}</h2>
      ${intro ? `<p class="section__intro">${intro}</p>` : ''}
    </header>`;
  }

  function heroHTML() {
    const s = D.site;
    const initials = s.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
    return `<section class="hero" id="accueil"><div class="container hero__grid">
      <div class="hero__text">
        <span class="hero__status reveal">${esc(s.status || s.lede)}</span>
        <h1 class="hero__title reveal">${esc(s.name)}</h1>
        <p class="hero__accroche reveal">${esc(s.objective || s.tagline)}</p>
        <p class="hero__lede reveal">${esc(s.intro || s.lede)}</p>
        <div class="hero__actions reveal">
          <a href="#competences" class="btn btn--primary">Mes compétences</a>
          <a href="mailto:${esc(s.email)}" class="btn btn--ghost">Me contacter →</a>
        </div>
        <div class="hero__contacts reveal">
          <a href="mailto:${esc(s.email)}">${esc(s.email)}</a>
          <a href="${esc(s.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
          <a href="${esc(s.github)}" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
      <div class="hero__avatar reveal" aria-hidden="true">
        <span class="hero__avatar-fb">${esc(initials)}</span>
        <img src="${esc(s.photo || '')}" alt="${esc(s.name)}" onerror="this.remove()" />
      </div>
    </div></section>`;
  }

  function parcoursHTML() {
    const items = D.parcours.map((p) => `
      <div class="timeline__item reveal">
        <span class="timeline__year${p.now ? ' timeline__year--now' : ''}">${esc(p.year)}</span>
        <div class="timeline__body">
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.text)}</p>
        </div>
      </div>`).join('');
    return `<section class="section" id="parcours"><div class="container">
      ${sectionHead('Parcours', 'Mon parcours', "")}
      <div class="timeline">${items}</div>
    </div></section>`;
  }

  function pourquoiHTML() {
    const paras = D.pourquoi.map((p) => `<p class="prose reveal">${esc(p)}</p>`).join('');
    return `<section class="section section--alt" id="pourquoi"><div class="container container--narrow">
      ${sectionHead('Pourquoi', "Pourquoi l'informatique&nbsp;?")}
      ${paras}
    </div></section>`;
  }

  function orientationHTML() {
    return `<section class="section" id="orientation"><div class="container">
      ${sectionHead('Orientation', "Choix d'orientation &amp; ambitions")}
      <div class="grid">
        <article class="card reveal"><h3 class="card__title">Le choix du BUT Informatique</h3>
          <p>Une formation professionnalisante qui fait alterner la théorie et la pratique, et qui colle à ma façon d'apprendre : comprendre, puis appliquer tout de suite sur des projets concrets.</p></article>
        <article class="card reveal"><h3 class="card__title">Ambitions professionnelles</h3>
          <p>Accumuler assez d'expérience et d'exigence dans mon travail pour finir par me lancer à mon compte et mener mes propres projets.</p></article>
      </div>
    </div></section>`;
  }

  function objectifsHTML() {
    const pl = D.projetPlus || {};
    return `<section class="section section--alt" id="objectifs"><div class="container container--narrow">
      ${sectionHead('Objectifs', 'Compétences à développer', '')}
      <p class="prose reveal">${pl.developper || ''}</p>
      <h3 class="objectifs__sub reveal">Mes objectifs · BUT 3 et après</h3>
      <p class="prose reveal">${pl.objectifs || ''}</p>
    </div></section>`;
  }

  function competencesHTML() {
    const hard = [...D.skills.hard].sort((a, b) => b.now - a.now);
    const yr = D.skills.years;
    const cards = hard.map((s) => {
      const isNew = s.before == null;
      const lvl = skillLevel(s.now);
      const master = lvl === 'Maîtrisé';
      const scale = isNew
        ? `<span class="skill__pt skill__pt--new">Nouveau · ${esc(yr.now)}</span><span class="skill__pt">${s.now}%</span>`
        : `<span class="skill__pt">${esc(yr.before)} · ${s.before}%</span><span class="skill__pt skill__pt--now">${esc(yr.now)} · ${s.now}%</span>`;
      return `<a class="skill reveal" href="competence.html?id=${esc(s.id)}" style="--now:${s.now}%;--before:${s.before || 0}%;">
        <span class="skill__head"><span class="skill__name">${esc(s.name)}</span><span class="skill__level${master ? ' skill__level--master' : ''}">${esc(lvl)}</span></span>
        <span class="skill__track"><span class="skill__fill"></span>${isNew ? '' : '<span class="skill__before" aria-hidden="true"></span>'}</span>
        <span class="skill__scale">${scale}</span>
        <span class="skill__cue">Voir le détail →</span>
      </a>`;
    }).join('');
    const defaultQ = D.skills.soft.find((s) => s.id === 'curiosite') || D.skills.soft[0];
    const chips = D.skills.soft.map((s) => `<button class="chip softskill-btn${s.id === (defaultQ && defaultQ.id) ? ' is-active' : ''}" data-id="${esc(s.id)}">${esc(s.name)}</button>`).join('');
    return `<section class="section section--alt" id="technologies"><div class="container">
      ${sectionHead('Technologies', 'Technologies &amp; langages', '')}
      <div class="skills">${cards}</div>
      <div class="softskills"><span class="softskills__label">Savoir-être</span>${chips}</div>
      <div class="softskill-detail" id="softskillDetail">
        <p class="prose softskill-detail__text" id="softskillText">${defaultQ ? esc(defaultQ.text) : ''}</p>
      </div>
    </div></section>`;
  }

  function competencesOfficiellesHTML() {
    const cards = (D.competences || []).map((c) => `
      <a class="comp reveal" href="competence.html?id=${esc(c.id)}">
        <div class="comp__top"><h3 class="comp__name">${esc(c.name)}</h3>${compDots(c.now)}</div>
        <p class="comp__full">${esc(c.full)}</p>
        <p class="comp__short">${esc(c.short)}</p>
        <span class="comp__level">${esc(compLevelLabel(c.now))}</span>
        <span class="comp__cue">Voir les preuves →</span>
      </a>`).join('');
    return `<section class="section" id="competences"><div class="container">
      ${sectionHead('Compétences', 'Mes 6 compétences', 'Les six compétences du BUT Informatique, chacune appuyée par des preuves concrètes — SAÉ, projets, dépôts — et une analyse réflexive.')}
      <div class="comps">${cards}</div>
    </div></section>`;
  }

  function experiencesHTML() {
    const s = D.site;
    return `<section class="section section--alt" id="experiences"><div class="container container--narrow">
      ${sectionHead('Expériences', 'Expériences professionnelles', '')}
      <p class="prose reveal">Je n'ai pas encore réalisé de stage ni d'alternance : c'est précisément ce que je recherche pour le BUT 3. Mon expérience la plus proche du monde professionnel reste la SAÉ Colis (S3.01), menée pour un vrai commanditaire — le service reprographie de l'IUT — avec un cahier des charges, une équipe et une livraison attendue.</p>
      <div class="reflist reflist--one">
        <div class="refcard reveal"><span class="sae-card__id">Projet commandité</span>
          <h3 class="refcard__title">Application de suivi de colis — IUT de Villetaneuse</h3>
          <p class="refcard__desc">Commanditaire réel, équipe de cinq, cahier des charges et déploiement. Mon rôle : front-end et conception responsive.</p>
          <div class="refcard__actions"><a href="sae.html?id=s3-01">Voir la SAÉ →</a></div>
        </div>
      </div>
      <p class="prose reveal">Disponible pour une alternance — <a href="mailto:${esc(s.email)}">${esc(s.email)}</a>.</p>
    </div></section>`;
  }

  function evolutionHTML() {
    const e = D.evolution;
    return `<section class="section section--alt" id="evolution"><div class="container">
      ${sectionHead('Évolution', 'Évolution entre le BUT 1 et le BUT 2')}
      <div class="evolution">
        <div class="evolution__col reveal"><span class="evolution__tag">BUT 1</span><p>${esc(e.but1)}</p></div>
        <div class="evolution__arrow reveal" aria-hidden="true">→</div>
        <div class="evolution__col reveal"><span class="evolution__tag evolution__tag--now">BUT 2</span><p>${esc(e.but2)}</p></div>
      </div>
    </div></section>`;
  }

  function saeHTML() {
    const groups = [
      { name: 'BUT1', range: 'S1.01 → S2.06', items: D.sae.but1 },
      { name: 'BUT2', range: 'S3.01 · S4.01', items: D.sae.but2 },
    ];
    const blocks = groups.map((g) => {
      const cards = g.items.map((s) => `
        <a class="sae-card reveal" href="sae.html?id=${esc(s.slug)}">
          <span class="sae-card__id">${esc(s.id)}</span>
          <h4 class="sae-card__title">${esc(s.title)}</h4>
          <p class="sae-card__desc">${esc(s.summary)}</p>
          <span class="sae-card__more">Ouvrir →${s.github ? '<span class="mono">GitHub</span>' : ''}</span>
        </a>`).join('');
      return `<div class="sae-group">
        <h3 class="sae-group__title reveal"><span class="sae-group__name">${esc(g.name)}</span><span class="sae-group__range">${esc(g.range)}</span></h3>
        <div class="grid">${cards}</div>
      </div>`;
    }).join('');
    return `<section class="section" id="sae"><div class="container">
      ${sectionHead('SAÉ', "Situations d'apprentissage", '')}
      ${blocks}
    </div></section>`;
  }

  function renderHome() {
    el('main').innerHTML =
      heroHTML() + parcoursHTML() + competencesOfficiellesHTML() + competencesHTML() +
      objectifsHTML() + experiencesHTML() + saeHTML();
  }

  /* ---------- pages détail ---------- */
  function notFound(title, backHref, backLabel) {
    return `<section class="section"><div class="container container--narrow">
      <p class="detail__meta">Erreur 404</p>
      <h1 class="detail__title">${esc(title)}</h1>
      <p class="detail__tagline">Cette page n'existe pas ou a été déplacée.</p>
      <p style="margin-top:28px"><a class="btn btn--ghost" href="${backHref}">← ${esc(backLabel)}</a></p>
    </div></section>`;
  }

  function chips(list, cls) {
    return list.map((t) => `<span class="chip ${cls || ''}">${esc(t)}</span>`).join('');
  }

  function renderCompetence6(c) {
    const allSae = [...D.sae.but1, ...D.sae.but2];
    const refs = [];
    (c.saes || []).forEach((slug) => {
      const sa = allSae.find((x) => x.slug === slug);
      if (sa) refs.push({ kicker: 'SAÉ ' + sa.id, title: sa.title, desc: sa.summary, href: `sae.html?id=${slug}`, link: 'Voir la SAÉ →', github: sa.github });
    });
    (c.projects || []).forEach((slug) => {
      const p = D.projects[slug];
      if (p) refs.push({ kicker: 'Projet', title: p.title, desc: p.tagline, href: `projet.html?id=${slug}`, link: 'Voir le projet →', github: p.github });
    });
    const refHTML = refs.length ? `<h2>Expériences &amp; preuves</h2><div class="reflist">${refs.map((r) => `
        <div class="refcard"><span class="sae-card__id">${esc(r.kicker)}</span><h3 class="refcard__title">${esc(r.title)}</h3><p class="refcard__desc">${esc(r.desc)}</p>
        <div class="refcard__actions"><a href="${r.href}">${r.link}</a>${r.github ? `<a href="${esc(r.github)}" target="_blank" rel="noopener">Dépôt GitHub ↗</a>` : ''}</div></div>`).join('')}</div>` : '';
    const skillNames = {}; D.skills.hard.forEach((s) => (skillNames[s.id] = s.name));
    const langHTML = (c.langs && c.langs.length)
      ? `<h2>Technologies mobilisées</h2><div class="detail__tags">${c.langs.map((l) => `<a class="chip" href="competence.html?id=${esc(l)}">${esc(skillNames[l] || l)}</a>`).join('')}</div>`
      : '';
    el('main').innerHTML = `
      <article class="detail">
        <header class="detail__hero"><div class="container">
          <a class="detail__back" href="index.html#competences">← Compétences</a>
          <p class="detail__meta">Compétence</p>
          <h1 class="detail__title">${esc(c.full)}</h1>
          <div class="comp-level reveal is-visible">${compDots(c.now)}<span>${esc(compLevelLabel(c.now))}</span></div>
        </div></header>
        <div class="section"><div class="container container--narrow">
          <p class="prose">${esc(c.short)}</p>
          <h2>Analyse réflexive</h2>
          <div class="reflect">
            <div class="reflect__q"><h3>Ce que j'ai appris</h3><p class="prose">${esc(c.appris)}</p></div>
            <div class="reflect__q"><h3>Comment je le prouve</h3><p class="prose">${esc(c.prouver)}</p></div>
            <div class="reflect__q"><h3>Ce qu'il me reste à améliorer</h3><p class="prose">${esc(c.ameliorer)}</p></div>
          </div>
          ${refHTML}
          ${langHTML}
        </div></div>
      </article>`;
  }

  function renderCompetence() {
    const id = params.get('id');
    const c = (D.competences || []).find((x) => x.id === id);
    if (c) { renderCompetence6(c); return; }
    const s = D.skills.hard.find((x) => x.id === id);
    if (!s) { el('main').innerHTML = notFound('Compétence introuvable', 'index.html#competences', 'Compétences'); return; }
    const isNew = s.before == null;
    const lvl = skillLevel(s.now);
    const yr = D.skills.years;
    const scale = isNew
      ? `<span class="skill__pt--new">Nouveau · ${esc(yr.now)}</span><span>${s.now}%</span>`
      : `<span>${esc(yr.before)} · ${s.before}%</span><span class="skill__pt--now">${esc(yr.now)} · ${s.now}%</span>`;
    const story = (s.story || []).map((p) => `<p class="prose">${esc(p)}</p>`).join('');

    // Réalisations liées : toutes les SAÉ et projets qui déclarent ce skill
    const allSae = [...D.sae.but1, ...D.sae.but2];
    const refs = [];
    allSae.filter((sa) => (sa.skills || []).includes(id)).forEach((sa) => {
      refs.push({ kicker: 'SAÉ ' + sa.id, title: sa.title, desc: sa.summary, href: `sae.html?id=${sa.slug}`, link: 'Voir la SAÉ →', github: sa.github });
    });
    Object.entries(D.projects).filter(([, p]) => (p.skills || []).includes(id)).forEach(([slug, p]) => {
      refs.push({ kicker: 'Projet', title: p.title, desc: p.tagline, href: `projet.html?id=${slug}`, link: 'Voir le projet →', github: p.github });
    });
    const refHTML = refs.length ? `<h2>Projets &amp; SAÉ liés</h2><div class="reflist">${refs.map((r) => `
        <div class="refcard"><span class="sae-card__id">${esc(r.kicker)}</span><h3 class="refcard__title">${esc(r.title)}</h3><p class="refcard__desc">${esc(r.desc)}</p>
        <div class="refcard__actions"><a href="${r.href}">${r.link}</a>${r.github ? `<a href="${esc(r.github)}" target="_blank" rel="noopener">Dépôt GitHub ↗</a>` : ''}</div></div>`).join('')}</div>` : '';
    const codeHTML = s.code ? `<h2>Extrait de code</h2><pre class="codeblock"><code>${esc(s.code)}</code></pre>` : '';

    el('main').innerHTML = `
      <article class="detail">
        <header class="detail__hero"><div class="container">
          <a class="detail__back" href="index.html#competences">← Compétences</a>
          <p class="detail__meta">Compétence · <span class="${lvl === 'Maîtrisé' ? 'is-master' : ''}">${esc(lvl)}</span></p>
          <h1 class="detail__title">${esc(s.name)}</h1>
          <div class="skillbar reveal is-visible" style="--now:${s.now}%;--before:${s.before || 0}%; margin-top:24px; max-width:440px;">
            <div class="skill__track"><span class="skill__fill"></span>${isNew ? '' : '<span class="skill__before" aria-hidden="true"></span>'}</div>
            <div class="skill__scale" style="margin-top:10px;">${scale}</div>
          </div>
        </div></header>
        <div class="section"><div class="container container--narrow">
          <h2>Comment j'en suis arrivé là</h2>
          ${story}
          ${s.proof ? `<p class="proofnote">${esc(s.proof)}</p>` : ''}
          ${refHTML}
          ${codeHTML}
        </div></div>
      </article>`;
  }

  function renderProjet() {
    const id = params.get('id');
    const p = D.projects[id];
    if (!p) { el('main').innerHTML = notFound('Projet introuvable', 'index.html#competences', 'Compétences'); return; }
    const skillNames = {}; D.skills.hard.forEach((s) => (skillNames[s.id] = s.name));
    const skillChips = (p.skills || []).map((sid) => `<a class="chip" href="competence.html?id=${esc(sid)}">${esc(skillNames[sid] || sid)}</a>`).join('');
    const compNames = {}; (D.competences || []).forEach((c) => (compNames[c.id] = c.name));
    const compChips = (D.competences || []).filter((c) => (c.projects || []).includes(id)).map((c) => `<a class="chip chip--solid" href="competence.html?id=${esc(c.id)}">${esc(compNames[c.id] || c.id)}</a>`).join('');
    const points = (p.points || []).map((pt) => `<li>${esc(pt)}</li>`).join('');
    el('main').innerHTML = `
      <article class="detail">
        <header class="detail__hero"><div class="container">
          <a class="detail__back" href="index.html#competences">← Retour</a>
          <p class="detail__meta">${esc(p.year)} · ${esc(p.domain)}</p>
          <h1 class="detail__title">${esc(p.title)}</h1>
          <p class="detail__tagline">${esc(p.tagline)}</p>
          <div class="detail__tags">${chips(p.stack, 'chip--solid')}</div>
          ${p.github ? `<div class="detail__actions"><a class="btn btn--primary" href="${esc(p.github)}" target="_blank" rel="noopener">Voir sur GitHub ↗</a></div>` : ''}
        </div></header>
        <div class="section"><div class="container container--narrow">
          <h2>Présentation</h2><p class="prose">${esc(p.summary)}</p>
          <h2>Travail effectué</h2><p class="prose">${esc(p.role || '[Description du travail effectué.]')}</p>
          <h2>Aperçu</h2>
          ${(p.images && p.images.length)
            ? p.images.map((src, i) => `<img class="projet__img" src="${esc(src)}" alt="Aperçu ${esc(p.title)} ${i + 1}" />`).join('')
            : `<div class="projet__img-placeholder">[Image ou capture d'écran à ajouter]</div>`}
          <h2>Compétences mobilisées</h2>
          ${compChips ? `<div class="detail__tags">${compChips}</div>` : ''}
          ${skillChips ? `<div class="detail__tags" style="margin-top:12px">${skillChips}</div>` : ''}
        </div></div>
      </article>`;
  }

  function renderSae() {
    const id = params.get('id');
    let item = null, promo = null;
    [['but1', 'BUT1'], ['but2', 'BUT2']].forEach(([k, lbl]) => {
      const f = D.sae[k].find((x) => x.slug === id);
      if (f) { item = f; promo = lbl; }
    });
    if (!item) { el('main').innerHTML = notFound('SAÉ introuvable', 'index.html#sae', 'SAÉ'); return; }
    const skillNames = {}; D.skills.hard.forEach((s) => (skillNames[s.id] = s.name));
    const compNames = {}; (D.competences || []).forEach((c) => (compNames[c.id] = c.name));

    // Compétences (les 6) liées : explicites, sinon déduites des compétences qui citent cette SAÉ
    let compIds = item.competences;
    if (!compIds) compIds = (D.competences || []).filter((c) => (c.saes || []).includes(item.slug)).map((c) => c.id);
    const compChips = compIds.length
      ? `<div class="detail__tags">${compIds.map((cid) => `<a class="chip chip--solid" href="competence.html?id=${esc(cid)}">${esc(compNames[cid] || cid)}</a>`).join('')}</div>` : '';
    const langChips = (item.skills && item.skills.length)
      ? `<div class="detail__tags" style="margin-top:12px">${item.skills.map((sid) => `<a class="chip" href="competence.html?id=${esc(sid)}">${esc(skillNames[sid] || sid)}</a>`).join('')}</div>` : '';

    const sec = [];
    if (item.objectifs) sec.push(`<h2>Objectifs de la SAÉ</h2><p class="prose">${esc(item.objectifs)}</p>`);
    sec.push(`<h2>Présentation &amp; déroulé</h2><p class="prose">${esc(item.recit || item.summary)}</p>`);
    if (item.role) sec.push(`<h2>Mon rôle</h2><p class="prose">${esc(item.role)}</p>`);
    if (item.taches) {
      const li = (arr) => (arr || []).map((t) => `<li>${esc(t)}</li>`).join('');
      sec.push(`<h2>Tâches accomplies</h2><div class="taches">
        <div class="taches__col"><h3 class="taches__t">Individuellement</h3><ul class="points">${li(item.taches.individuel)}</ul></div>
        <div class="taches__col"><h3 class="taches__t">Collectivement</h3><ul class="points">${li(item.taches.collectif)}</ul></div>
      </div>`);
    } else if (item.points && item.points.length) {
      sec.push(`<h2>Réalisations</h2><ul class="points">${item.points.map((pt) => `<li>${esc(pt)}</li>`).join('')}</ul>`);
    }
    if (item.difficultes && item.difficultes.length) {
      const d = item.difficultes.map((x) => `<div class="diff"><p class="prose"><b>Difficulté.</b> ${esc(x.probleme)}</p><p class="prose"><b>Solution.</b> ${esc(x.solution)}</p></div>`).join('');
      sec.push(`<h2>Difficultés &amp; solutions</h2>${d}`);
    }
    let compBlock = `<h2>Compétences mobilisées</h2>`;
    compBlock += compChips || `<p class="prose">À renseigner.</p>`;
    if (langChips) compBlock += langChips;
    if (item.niveaux && item.niveaux.length) {
      compBlock += `<div class="niveaux">${item.niveaux.map((n) => `<div class="niveau"><a class="niveau__c" href="competence.html?id=${esc(n.comp)}">${esc(compNames[n.comp] || n.comp)}</a><span class="niveau__ba">${esc(n.avant)} <b>→ ${esc(n.apres)}</b></span></div>`).join('')}</div>`;
    }
    sec.push(compBlock);
    if (item.perspectives) sec.push(`<h2>Perspectives d'amélioration</h2><p class="prose">${esc(item.perspectives)}</p>`);

    el('main').innerHTML = `
      <article class="detail">
        <header class="detail__hero"><div class="container">
          <a class="detail__back" href="index.html#sae">← SAÉ</a>
          <p class="detail__meta">${esc(item.id)} · ${esc(promo)}</p>
          <h1 class="detail__title">${esc(item.title)}</h1>
          <p class="detail__tagline">${esc(item.summary)}</p>
          <div class="detail__actions">
            ${item.github ? `<a class="btn btn--primary" href="${esc(item.github)}" target="_blank" rel="noopener">Voir sur GitHub ↗</a>` : ''}
            <a class="btn btn--ghost" href="index.html#sae">Toutes les SAÉ</a>
          </div>
        </div></header>
        <div class="section"><div class="container container--narrow">
          ${sec.join('\n          ')}
        </div></div>
      </article>`;
  }

  function renderQualite() {
    const id = params.get('id');
    const q = D.skills.soft.find((x) => x.id === id);
    if (!q) { el('main').innerHTML = notFound('Qualité introuvable', 'index.html#competences', 'Compétences'); return; }
    el('main').innerHTML = `
      <article class="detail">
        <header class="detail__hero"><div class="container">
          <a class="detail__back" href="index.html#competences">← Compétences</a>
          <p class="detail__meta">Savoir-être</p>
          <h1 class="detail__title">${esc(q.name)}</h1>
        </div></header>
        <div class="section"><div class="container container--narrow">
          <h2>Pourquoi je m'attribue cette qualité</h2>
          <p class="prose">${esc(q.text)}</p>
        </div></div>
      </article>`;
  }

  /* ---------- interactions ---------- */
  function wireNav() {
    const toggle = el('navToggle');
    const links = el('navLinks');
    toggle?.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    links?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      links.classList.remove('is-open'); toggle?.classList.remove('is-open');
    }));
  }

  function wireReveal() {
    const items = document.querySelectorAll('.reveal:not(.is-visible)');
    if ('IntersectionObserver' in window && items.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      items.forEach((x) => io.observe(x));
    } else {
      items.forEach((x) => x.classList.add('is-visible'));
    }
  }

  function wireSpy() {
    if (!onHome) return;
    const links = el('navLinks');
    const map = new Map([...links.querySelectorAll('a')].map((a) => [a.getAttribute('href').split('#')[1], a]));
    const secs = [...document.querySelectorAll('main section[id]')];
    if (!('IntersectionObserver' in window) || !secs.length) return;
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        map.forEach((a) => a.classList.remove('is-active'));
        map.get(e.target.id)?.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach((s) => spy.observe(s));
  }

  function wireSoftSkills() {
    const btns = document.querySelectorAll('.softskill-btn');
    const textEl = el('softskillText');
    if (!btns.length || !textEl) return;
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const q = D.skills.soft.find((s) => s.id === id);
        if (!q) return;
        btns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        textEl.textContent = q.text;
      });
    });
  }

  /* ---------- boot ---------- */
  el('navRoot').innerHTML = navHTML();
  el('footerRoot').innerHTML = footerHTML();
  if (onHome) { renderHome(); wireSoftSkills(); }
  else if (page === 'competence') renderCompetence();
  else if (page === 'projet') renderProjet();
  else if (page === 'sae') renderSae();
  else if (page === 'qualite') renderQualite();
  wireNav();
  wireReveal();
  wireSpy();
})();
