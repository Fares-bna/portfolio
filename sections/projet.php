<?php /** Projet professionnel. Variables : $projet */ ?>
<section class="section" id="projet">
  <div class="container">
    <?php section_head('04', 'Projet professionnel', 'Mon projet &amp; mon secteur',
      '[Présentation structurée du projet professionnel visé.]'); ?>

    <div class="features">
      <?php foreach ($projet as $f): ?>
        <article class="feature reveal">
          <h3 class="feature__title"><?= e($f['title']) ?></h3>
          <p><?= e($f['text']) ?></p>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
