<?php /** Compétences. Variables : $skills, $projects */ ?>
<section class="section section--cream" id="competences">
  <div class="container">
    <?php section_head('05', 'Compétences', 'Compétences &amp; progression',
      "Voici mes compétences et leurs progressions au sein de mon parcours."); ?>

    <?php
      // Tri par niveau décroissant : Maîtrisé, Avancé, Intermédiaire, Initiation.
      $hard = $skills['hard'];
      usort($hard, fn($a, $b) => $b['now'] <=> $a['now']);
    ?>
    <div class="skills">
      <?php foreach ($hard as $s):
        $new = $s['before'] === null;
        $lvl = skill_level($s['now']);
        $master = $lvl === 'Maîtrisé'; ?>
        <a class="skill reveal" href="competence.php?c=<?= e($s['id']) ?>"
           style="--now: <?= (int) $s['now'] ?>%; --before: <?= (int) ($s['before'] ?? 0) ?>%;">
          <span class="skill__head">
            <span class="skill__name"><?= e($s['name']) ?></span>
            <span class="skill__level<?= $master ? ' skill__level--master' : '' ?>"><?= e($lvl) ?></span>
          </span>

          <span class="skill__track">
            <span class="skill__fill"></span>
            <?php if (!$new): ?>
              <span class="skill__before" aria-hidden="true"></span>
            <?php endif; ?>
          </span>

          <span class="skill__scale">
            <?php if ($new): ?>
              <span class="skill__pt skill__pt--new">Nouveau · <?= e($skills['years']['now']) ?></span>
              <span class="skill__pt"><?= (int) $s['now'] ?>%</span>
            <?php else: ?>
              <span class="skill__pt"><?= e($skills['years']['before']) ?> · <?= (int) $s['before'] ?>%</span>
              <span class="skill__pt skill__pt--now"><?= e($skills['years']['now']) ?> · <?= (int) $s['now'] ?>%</span>
            <?php endif; ?>
          </span>
          <span class="skill__cue">Voir le détail →</span>
        </a>
      <?php endforeach; ?>
    </div>

    <div class="softskills">
      <span class="softskills__label">Savoir-être</span>
      <?php foreach ($skills['soft'] as $soft): ?>
        <a class="chip" href="qualite.php?q=<?= e($soft['id']) ?>"><?= e($soft['name']) ?></a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
