<?php /** Hero. Variables : $site */ ?>
<section class="hero" id="accueil">
  <div class="container">
    <h1 class="hero__title reveal"><?= e($site['name']) ?></h1>
    <p class="hero__accroche reveal"><?= e($site['tagline']) ?></p>
    <p class="hero__lede reveal"><?= e($site['lede']) ?></p>
    <div class="hero__actions reveal">
      <a href="#parcours" class="btn btn--primary">Découvrir mon parcours</a>
      <a href="#competences" class="btn btn--ghost">Mes compétences <span class="btn__arrow">→</span></a>
    </div>
  </div>
</section>
