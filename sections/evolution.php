<?php /** Évolution BUT1 -> BUT2. Variables : $evolution */ ?>
<section class="section" id="evolution">
  <div class="container">
    <?php section_head('06', 'Progression', 'Évolution entre la BUT1 et la BUT2'); ?>

    <div class="evolution">
      <div class="evolution__col reveal">
        <span class="evolution__tag">BUT1</span>
        <p><?= e($evolution['but1']) ?></p>
      </div>
      <div class="evolution__arrow reveal" aria-hidden="true">→</div>
      <div class="evolution__col reveal">
        <span class="evolution__tag evolution__tag--now">BUT2</span>
        <p><?= e($evolution['but2']) ?></p>
      </div>
    </div>
  </div>
</section>
