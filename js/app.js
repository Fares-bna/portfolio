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
    return `<section class="hero" id="accueil"><div class="container">
      <h1 class="hero__title reveal">${esc(s.name)}</h1>
      <p class="hero__accroche reveal">${esc(s.tagline)}</p>
      <p class="hero__lede reveal">${esc(s.lede)}</p>
      <div class="hero__actions reveal">
        <a href="#parcours" class="btn btn--primary">Découvrir mon parcours</a>
        <a href="#competences" class="btn btn--ghost">Mes compétences →</a>
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

  function projetHTML() {
    const cards = D.projet.map((f) => `
      <article class="feature reveal"><h3 class="feature__title">${esc(f.title)}</h3><p>${esc(f.text)}</p></article>`).join('');
    return `<section class="section section--alt" id="projet"><div class="container">
      ${sectionHead('Projet', 'Mon projet &amp; mon secteur', '')}
      <div class="features">${cards}</div>
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
    const chips = D.skills.soft.map((s) => `<a class="chip" href="qualite.html?id=${esc(s.id)}">${esc(s.name)}</a>`).join('');
    return `<section class="section" id="competences"><div class="container">
      ${sectionHead('Compétences', 'Compétences &amp; progression', 'Mes compétences et leur progression au sein de mon parcours. Chaque carte ouvre une page avec ses preuves.')}
      <div class="skills">${cards}</div>
      <div class="softskills"><span class="softskills__label">Savoir-être</span>${chips}</div>
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
      heroHTML() + parcoursHTML() + pourquoiHTML() + orientationHTML() +
      projetHTML() + competencesHTML() + evolutionHTML() + saeHTML();
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

  function renderCompetence() {
    const id = params.get('id');
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
          <h2>Compétences mobilisées</h2><div class="detail__tags">${skillChips}</div>
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
    const roleHTML = item.role ? `<p class="prose">${esc(item.role)}</p>` : `<p class="prose"></p>`;
    const pointsHTML = (item.points && item.points.length)
      ? `<h2>Réalisations &amp; points clés</h2><ul class="points">${item.points.map((pt) => `<li>${esc(pt)}</li>`).join('')}</ul>`
      : '';
    const compHTML = (item.skills && item.skills.length)
      ? `<div class="detail__tags">${item.skills.map((id) => `<a class="chip" href="competence.html?id=${esc(id)}">${esc(skillNames[id] || id)}</a>`).join('')}</div>`
      : `<p class="prose">[Compétences (hard puis soft) avec preuves, et niveau avant / après.]</p>`;
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
          <h2>Présentation &amp; mission</h2><p class="prose">${esc(item.summary)}</p><p class="prose"></p>
          <h2>Organisation &amp; mon rôle</h2>${roleHTML}
          <h2>Difficultés &amp; défis</h2><p class="prose"></p>
          ${pointsHTML}
          <h2>Compétences mobilisées</h2>${compHTML}
          <h2>Perspectives d'amélioration</h2><p class="prose"></p>
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

  /* ---------- boot ---------- */
  el('navRoot').innerHTML = navHTML();
  el('footerRoot').innerHTML = footerHTML();
  if (onHome) renderHome();
  else if (page === 'competence') renderCompetence();
  else if (page === 'projet') renderProjet();
  else if (page === 'sae') renderSae();
  else if (page === 'qualite') renderQualite();
  wireNav();
  wireReveal();
  wireSpy();
})();
