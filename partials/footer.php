<?php /** Pied de page. Variables : $site */ ?>
<footer class="footer">
  <div class="container">
    <p class="footer__name"><?= e($site['name']) ?></p>
    <p class="footer__meta">Portfolio <?= e($site['role']) ?> · <?= e($site['year']) ?></p>
    <div class="footer__links">
      <a href="mailto:<?= e($site['email']) ?>">Email</a>
      <?php if (!empty($site['github']) && $site['github'] !== '#'): ?>
        <a href="<?= e($site['github']) ?>" target="_blank" rel="noopener">GitHub</a>
      <?php endif; ?>
      <a href="<?= e($site['linkedin']) ?>" target="_blank" rel="noopener">LinkedIn</a>
    </div>
  </div>
</footer>
<script src="js/main.js"></script>
</body>
</html>
