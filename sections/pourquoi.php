<?php /** Pourquoi l'informatique. Variables : $pourquoi (array de paragraphes) */ ?>
<section class="section" id="pourquoi">
  <div class="container container--narrow">
    <?php section_head('02', 'Pourquoi ?', 'Pourquoi l\'informatique&nbsp;?'); ?>
    <?php foreach ($pourquoi as $para): ?>
      <p class="prose reveal"><?= e($para) ?></p>
    <?php endforeach; ?>
  </div>
</section>
