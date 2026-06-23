<?php
/**
 * Page détail d'une qualité (savoir-être) : qualite.php?q=<id>
 */
require __DIR__ . '/partials/helpers.php';
$content = require __DIR__ . '/data/content.php';

$site = $content['site'];
$nav  = $content['nav'];

$id = $_GET['q'] ?? '';
$q  = null;
foreach ($content['skills']['soft'] as $soft) {
  if ($soft['id'] === $id) { $q = $soft; break; }
}

$navBase = 'index.php#';
require __DIR__ . '/partials/head.php';
require __DIR__ . '/partials/nav.php';
?>
<main>
<?php if (!$q): ?>

  <section class="section">
    <div class="container container--narrow">
      <p class="section__label">Erreur 404</p>
      <h1 class="section__title">Qualité introuvable</h1>
      <p class="section__intro">Cette qualité n'existe pas ou a été déplacée.</p>
      <p style="margin-top:32px"><a class="btn btn--ghost" href="index.php#competences">← Retour aux compétences</a></p>
    </div>
  </section>

<?php else: ?>

  <article class="project">
    <header class="project__hero">
      <div class="container">
        <a class="project__back" href="index.php#competences">← Compétences</a>
        <p class="project__meta">Savoir-être</p>
        <h1 class="project__title"><?= e($q['name']) ?></h1>
      </div>
    </header>

    <div class="section">
      <div class="container container--narrow">
        <h2 class="project__h2">Pourquoi je m'attribue cette qualité</h2>
        <p class="prose"><?= e($q['text']) ?></p>
      </div>
    </div>
  </article>

<?php endif; ?>
</main>
<?php require __DIR__ . '/partials/footer.php'; ?>
