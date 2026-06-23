<?php
/** Navigation. Variables : $site, $nav. $navBase = préfixe des ancres
 *  ('#' sur l'accueil, 'index.php#' sur une sous-page). */
$navBase = $navBase ?? '#';
?>
<header class="nav" id="nav">
  <div class="nav__inner">
    <a href="<?= e($navBase) ?>accueil" class="nav__brand"><?= e($site['name']) ?></a>
    <nav class="nav__links" id="navLinks">
      <?php foreach ($nav as $anchor => $label): ?>
        <a href="<?= e($navBase) ?><?= e($anchor) ?>"><?= e($label) ?></a>
      <?php endforeach; ?>
    </nav>
    <button class="nav__toggle" aria-label="Menu" aria-expanded="false" id="navToggle">
      <span></span><span></span>
    </button>
  </div>
</header>
