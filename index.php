<?php
/**
 * Portfolio — point d'entrée.
 * Charge les données, puis compose la page à partir des partials et sections.
 */
require __DIR__ . '/partials/helpers.php';
$content = require __DIR__ . '/data/content.php';

// Variables exposées aux vues
$site      = $content['site'];
$nav       = $content['nav'];
$parcours  = $content['parcours'];
$pourquoi  = $content['pourquoi'];
$projet    = $content['projet'];
$skills    = $content['skills'];
$projects  = $content['projects'];
$evolution = $content['evolution'];
$sae       = $content['sae'];

require __DIR__ . '/partials/head.php';
require __DIR__ . '/partials/nav.php';
?>
<main>
  <?php
    require __DIR__ . '/sections/hero.php';
    require __DIR__ . '/sections/parcours.php';
    require __DIR__ . '/sections/pourquoi.php';
    require __DIR__ . '/sections/orientation.php';
    require __DIR__ . '/sections/projet.php';
    require __DIR__ . '/sections/competences.php';
    require __DIR__ . '/sections/evolution.php';
    require __DIR__ . '/sections/sae.php';
  ?>
</main>
<?php require __DIR__ . '/partials/footer.php'; ?>
