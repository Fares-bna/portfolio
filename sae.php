<?php
/**
 * Page détail d'une SAÉ : sae.php?s=<slug>
 */
require __DIR__ . '/partials/helpers.php';
$content = require __DIR__ . '/data/content.php';

$site = $content['site'];
$nav  = $content['nav'];

// Recherche de la SAÉ dans les deux groupes
$slug = $_GET['s'] ?? '';
$item = null;
$promo = null;
foreach (['but1' => 'BUT1', 'but2' => 'BUT2'] as $key => $label) {
  foreach ($content['sae'][$key] as $s) {
    if ($s['slug'] === $slug) { $item = $s; $promo = $label; break 2; }
  }
}

$navBase = 'index.php#';
require __DIR__ . '/partials/head.php';
require __DIR__ . '/partials/nav.php';
?>
<main>
<?php if (!$item): ?>

  <section class="section">
    <div class="container container--narrow">
      <p class="section__label">Erreur 404</p>
      <h1 class="section__title">SAÉ introuvable</h1>
      <p class="section__intro">Cette SAÉ n'existe pas ou a été déplacée.</p>
      <p style="margin-top:32px"><a class="btn btn--ghost" href="index.php#sae">← Retour aux SAÉ</a></p>
    </div>
  </section>

<?php else: ?>

  <article class="project">
    <header class="project__hero">
      <div class="container">
        <a class="project__back" href="index.php#sae">← SAÉ</a>
        <p class="project__meta"><?= e($item['id']) ?> · <?= e($promo) ?></p>
        <h1 class="project__title"><?= e($item['title']) ?></h1>
        <p class="project__tagline"><?= e($item['summary']) ?></p>

        <div class="project__actions">
          <?php if (!empty($item['github'])): ?>
            <a class="btn btn--primary" href="<?= e($item['github']) ?>" target="_blank" rel="noopener">Voir sur GitHub ↗</a>
          <?php endif; ?>
          <a class="btn btn--ghost" href="index.php#sae">Toutes les SAÉ</a>
        </div>
      </div>
    </header>

    <div class="section">
      <div class="container container--narrow">
        <h2 class="project__h2">Présentation &amp; mission</h2>
        <p class="prose"><?= e($item['summary']) ?></p>
        <p class="prose">[Présentation détaillée : contexte, objectifs et déroulé de la SAÉ.]</p>

        <h2 class="project__h2">Organisation &amp; mon rôle</h2>
        <p class="prose">[Organisation du travail (individuel / collectif) et rôle tenu dans le groupe.]</p>

        <h2 class="project__h2">Difficultés &amp; défis</h2>
        <p class="prose">[Difficultés rencontrées et comment elles ont été surmontées.]</p>

        <h2 class="project__h2">Compétences mobilisées</h2>
        <p class="prose">[Compétences (hard puis soft) avec preuves, et niveau avant / après.]</p>

        <h2 class="project__h2">Perspectives d'amélioration</h2>
        <p class="prose">[Ce qui pourrait être amélioré ou poursuivi.]</p>
      </div>
    </div>
  </article>

<?php endif; ?>
</main>
<?php require __DIR__ . '/partials/footer.php'; ?>
