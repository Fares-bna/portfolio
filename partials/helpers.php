<?php
/** Fonctions utilitaires partagées par les vues. */

/** Échappement HTML. */
function e($s) {
  return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
}

/** Libellé de niveau d'une compétence selon le % actuel. */
function skill_level($now) {
  if ($now >= 78) return 'Maîtrisé';
  if ($now >= 60) return 'Avancé';
  if ($now >= 45) return 'Intermédiaire';
  return 'Initiation';
}

/**
 * En-tête de section éditorial : numéro 01–07 + label, filet, titre, intro.
 * $title / $intro peuvent contenir des entités HTML (&amp;, &nbsp;) -> non échappés.
 */
function section_head($num, $label, $title, $intro = null) {
  ?>
  <header class="section__head reveal">
    <h2 class="section__title"><?= $title ?></h2>
    <?php if ($intro !== null): ?>
      <p class="section__intro"><?= $intro ?></p>
    <?php endif; ?>
  </header>
  <?php
}
