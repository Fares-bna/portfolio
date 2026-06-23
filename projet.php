<?php
/**
 * Page détail d'un projet : projet.php?p=<slug>
 */
require __DIR__ . '/partials/helpers.php';
$content = require __DIR__ . '/data/content.php';

$site     = $content['site'];
$nav      = $content['nav'];
$projects = $content['projects'];
$skills   = $content['skills'];

// Index id -> nom de compétence (pour afficher les puces)
$skillNames = [];
foreach ($skills['hard'] as $s) { $skillNames[$s['id']] = $s['name']; }

$slug = $_GET['p'] ?? '';
$p    = $projects[$slug] ?? null;

$navBase = 'index.php#';
require __DIR__ . '/partials/head.php';
require __DIR__ . '/partials/nav.php';
?>
<main>
<?php if (!$p): ?>

  <section class="section">
    <div class="container container--narrow">
      <p class="section__label">Erreur 404</p>
      <h1 class="section__title">Projet introuvable</h1>
      <p class="section__intro">Ce projet n'existe pas ou a été déplacé.</p>
      <p style="margin-top:32px"><a class="btn btn--ghost" href="index.php#competences">← Retour aux compétences</a></p>
    </div>
  </section>

<?php else: ?>

  <article class="project">
    <header class="project__hero">
      <div class="container">
        <a class="project__back" href="index.php#competences">← Compétences</a>
        <p class="project__meta"><?= e($p['year']) ?> · <?= e($p['domain']) ?></p>
        <h1 class="project__title"><?= e($p['title']) ?></h1>
        <p class="project__tagline"><?= e($p['tagline']) ?></p>

        <div class="project__tags">
          <?php foreach ($p['stack'] as $t): ?>
            <span class="chip chip--solid"><?= e($t) ?></span>
          <?php endforeach; ?>
        </div>

        <?php if (!empty($p['github'])): ?>
          <div class="project__actions">
            <a class="btn btn--primary" href="<?= e($p['github']) ?>" target="_blank" rel="noopener">Voir sur GitHub ↗</a>
          </div>
        <?php endif; ?>
      </div>
    </header>

    <div class="section">
      <div class="container container--narrow">
        <h2 class="project__h2">Présentation</h2>
        <p class="prose"><?= e($p['summary']) ?></p>

        <h2 class="project__h2">Mon rôle</h2>
        <p class="prose"><?= e($p['role']) ?></p>

        <h2 class="project__h2">Points clés</h2>
        <ul class="project__points">
          <?php foreach ($p['points'] as $pt): ?>
            <li><?= e($pt) ?></li>
          <?php endforeach; ?>
        </ul>

        <h2 class="project__h2">Compétences mobilisées</h2>
        <div class="project__tags">
          <?php foreach ($p['skills'] as $sid): ?>
            <a class="chip" href="index.php#competences"><?= e($skillNames[$sid] ?? $sid) ?></a>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </article>

<?php endif; ?>
</main>
<?php require __DIR__ . '/partials/footer.php'; ?>
