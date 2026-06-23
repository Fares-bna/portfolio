<?php
/**
 * Page détail d'une compétence : competence.php?c=<id>
 */
require __DIR__ . '/partials/helpers.php';
$content = require __DIR__ . '/data/content.php';

$site     = $content['site'];
$nav      = $content['nav'];
$skills   = $content['skills'];
$projects = $content['projects'];

$id = $_GET['c'] ?? '';
$skill = null;
foreach ($skills['hard'] as $s) {
  if ($s['id'] === $id) { $skill = $s; break; }
}

$navBase = 'index.php#';
require __DIR__ . '/partials/head.php';
require __DIR__ . '/partials/nav.php';
?>
<main>
<?php if (!$skill): ?>

  <section class="section">
    <div class="container container--narrow">
      <p class="section__label">Erreur 404</p>
      <h1 class="section__title">Compétence introuvable</h1>
      <p class="section__intro">Cette compétence n'existe pas ou a été déplacée.</p>
      <p style="margin-top:32px"><a class="btn btn--ghost" href="index.php#competences">← Retour aux compétences</a></p>
    </div>
  </section>

<?php else:
  $new    = $skill['before'] === null;
  $lvl    = skill_level($skill['now']);
  $master = $lvl === 'Maîtrisé';
  $linked = [];
  foreach ($skill['projects'] as $slug) {
    if (isset($projects[$slug])) $linked[$slug] = $projects[$slug];
  }
?>

  <article class="project">
    <header class="project__hero">
      <div class="container">
        <a class="project__back" href="index.php#competences">← Compétences</a>
        <p class="project__meta">
          Compétence · <span class="<?= $master ? 'is-master' : '' ?>"><?= e($lvl) ?></span>
        </p>
        <h1 class="project__title"><?= e($skill['name']) ?></h1>

        <div class="skillbar" style="--now: <?= (int) $skill['now'] ?>%; --before: <?= (int) ($skill['before'] ?? 0) ?>%;">
          <div class="skillbar__track">
            <span class="skillbar__fill"></span>
            <?php if (!$new): ?><span class="skillbar__before" aria-hidden="true"></span><?php endif; ?>
          </div>
          <div class="skillbar__scale">
            <?php if ($new): ?>
              <span class="skillbar__pt--new">Nouveau · <?= e($skills['years']['now']) ?></span>
              <span><?= (int) $skill['now'] ?>%</span>
            <?php else: ?>
              <span><?= e($skills['years']['before']) ?> · <?= (int) $skill['before'] ?>%</span>
              <span class="skillbar__pt--now"><?= e($skills['years']['now']) ?> · <?= (int) $skill['now'] ?>%</span>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </header>

    <div class="section">
      <div class="container container--narrow">
        <h2 class="project__h2">Comment j'en suis arrivé là</h2>
        <?php foreach (($skill['story'] ?? ['[Récit à compléter.]']) as $para): ?>
          <p class="prose"><?= e($para) ?></p>
        <?php endforeach; ?>

        <?php // Preuve d'acquisition : phrase callout (sans titre), avant les justificatifs ?>
        <?php if (!empty($skill['proof'])): ?>
          <p class="proofnote"><?= e($skill['proof']) ?></p>
        <?php endif; ?>

        <?php if ($linked): ?>
          <h2 class="project__h2">Projets liés</h2>
          <div class="reflist">
            <?php foreach ($linked as $slug => $p): ?>
              <div class="refcard">
                <h3 class="refcard__title"><?= e($p['title']) ?></h3>
                <p class="refcard__desc"><?= e($p['tagline']) ?></p>
                <div class="refcard__actions">
                  <a href="projet.php?p=<?= e($slug) ?>">Voir le projet →</a>
                  <?php if (!empty($p['github'])): ?>
                    <a href="<?= e($p['github']) ?>" target="_blank" rel="noopener">Dépôt GitHub ↗</a>
                  <?php endif; ?>
                </div>
              </div>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>

        <?php if (!empty($skill['code'])): ?>
          <h2 class="project__h2">Extrait de code</h2>
          <pre class="codeblock"><code><?= e($skill['code']) ?></code></pre>
        <?php endif; ?>

        <?php if (!$linked && empty($skill['code'])): ?>
          <p class="prose">[Preuve à compléter.]</p>
        <?php endif; ?>
      </div>
    </div>
  </article>

<?php endif; ?>
</main>
<?php require __DIR__ . '/partials/footer.php'; ?>
