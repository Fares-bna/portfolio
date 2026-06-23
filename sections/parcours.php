<?php /** Parcours (timeline). Variables : $parcours */ ?>
<section class="section section--cream" id="parcours">
  <div class="container">
    <?php section_head('01', 'Parcours', 'Mon parcours', "D'où je viens."); ?>

    <div class="timeline">
      <?php foreach ($parcours as $item): ?>
        <div class="timeline__item reveal">
          <span class="timeline__year<?= str_contains($item['year'], '…') ? ' timeline__year--now' : '' ?>"><?= e($item['year']) ?></span>
          <div class="timeline__body">
            <h3><?= e($item['title']) ?></h3>
            <p><?= e($item['text']) ?></p>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
