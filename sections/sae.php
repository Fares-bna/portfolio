<?php /** Archive des SAÉ. Variables : $sae (groupes 'but1' / 'but2') */ ?>
<section class="section section--cream" id="sae">
  <div class="container">
    <?php section_head('07', 'SAÉ', 'Situations d\'apprentissage',
      "Les 14 SAÉ du BUT, de la BUT1 à la BUT2. Chaque carte ouvre une présentation détaillée."); ?>

    <?php
      $groups = [
        ['name' => 'BUT1', 'range' => 'S1.01 → S2.06', 'items' => $sae['but1']],
        ['name' => 'BUT2', 'range' => 'S3.01 · S4.01', 'items' => $sae['but2']],
      ];
      foreach ($groups as $g):
    ?>
      <div class="sae-group">
        <h3 class="sae-group__title reveal">
          <span class="sae-group__name"><?= e($g['name']) ?></span>
          <span class="sae-group__range"><?= e($g['range']) ?></span>
        </h3>
        <div class="grid">
          <?php foreach ($g['items'] as $s): ?>
            <a class="sae-card reveal" href="sae.php?s=<?= e($s['slug']) ?>">
              <span class="sae-card__id"><?= e($s['id']) ?></span>
              <h4 class="sae-card__title"><?= e($s['title']) ?></h4>
              <p class="sae-card__desc"><?= e($s['summary']) ?></p>
              <span class="sae-card__more">
                Ouvrir →
                <?php if (!empty($s['github'])): ?><span class="mono">GitHub</span><?php endif; ?>
              </span>
            </a>
          <?php endforeach; ?>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</section>
