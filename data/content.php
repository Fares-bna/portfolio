<?php
/**
 * Données du portfolio.
 * Tout le contenu éditable vit ici — les vues bouclent dessus.
 * Placeholders [ ... ] = à compléter / corriger ensemble.
 */

return [

  'site' => [
    'name'     => 'Fares BENNANI',
    'role'     => 'BUT Informatique',
    'tagline'  => 'Futur développeur',
    'lede'     => "Étudiant en BUT Informatique, en parcours réalisation d'applications. De la BUT1 à l'IUT de Paris Rives de Seine à la BUT2 à Villetaneuse, je suis allé du langage C au développement Android.",
    'year'     => '2025 – 2026',
    'email'    => 'fares.bennani29@gmail.com',
    'linkedin' => 'https://www.linkedin.com/in/fares-bennani-862398319/',
    'github'   => 'https://github.com/Fares-bna',
  ],

  // Liens de navigation (ancre => libellé)
  'nav' => [
    'parcours'    => 'Parcours',
    'orientation' => 'Orientation',
    'projet'      => 'Projet',
    'competences' => 'Compétences',
    'evolution'   => 'Évolution',
    'sae'         => 'SAÉ',
  ],

  // Parcours (timeline) — réel, d'après le CV
  'parcours' => [
    [
      'year'  => '2021 – 2024',
      'title' => 'Baccalauréat général, mention bien',
      'text'  => 'Spécialités Mathématiques et Physique-Chimie, au Lycée privé La Salle Saint-Rosaire (95).',
    ],
    [
      'year'  => '2024 – 2025',
      'title' => 'BUT 1 Informatique, IUT de Paris Rives de Seine',
      'text'  => 'Université Paris Cité',
    ],
    [
      'year'  => '2025 – 2026 ',
      'title' => 'BUT 2 Informatique, IUT de Villetaneuse',
      'text'  => "Université Sorbonne Paris Nord",
    ],
  ],

  // Pourquoi l'informatique
  'pourquoi' => [
    "J'ai toujours été de nature curieuse et je me suis toujours plu dans la résolution de problèmes divers alors le fait de devoir, à partir d'une idée simple, développer toute une solution, unique et propre à moi même est quelque chose qui m'intéresse énormément.",
    "Poursuivre mes études en informatique me l'a donc permis",
  ],

  // Projet professionnel (3 axes)
  'projet' => [
    ['title' => 'Développement', 'text' => "Le développement full-stack, pour être à l'aise aussi bien sur la partie visible d'une application que sur tout ce qui la fait tourner derrière, côté serveur."],
    ['title' => 'Technologies',  'text' => "Toucher à un maximum de langages plutôt que de m'enfermer dans un seul écosystème, pour pouvoir m'adapter au projet et choisir le bon outil à chaque fois."],
    ['title' => 'Un métier',     'text' => "Devenir ingénieur en informatique, capable de concevoir une application de bout en bout et de prendre des responsabilités techniques."],
  ],

  // Compétences — barres de progression BUT1 -> BUT2.
  // before = niveau l'an dernier (null = pas pratiqué l'an dernier), now = niveau actuel.
  // projects = slugs liés ; proof = phrase-preuve quand pas de projet.
  // story = récit (tableau de paragraphes) « comment j'en suis arrivé à maîtriser » -> page competence.php?c=id.
  'skills' => [
    'years' => ['before' => 'BUT 1', 'now' => 'BUT 2'],
    'hard'  => [
      ['id' => 'c', 'name' => 'C', 'before' => 60, 'now' => 60, 'projects' => ['absences', 'octoverso'],
       'proof' => "Acquisition démontrée par des projets complets en C (mémoire, pointeurs, structures de données), comme le montrent les réalisations ci-dessous.",
       'story' => [
         "J'ai découvert le C dès la BUT1, à travers les premiers projets de programmation structurée. C'est le langage sur lequel j'ai posé mes bases : gestion de la mémoire, pointeurs, tableaux et structures de données.",
         "Je l'ai pratiqué sur des projets complets comme la gestion de la vie scolaire et la recréation du jeu Octoverso. [Précise un moment marquant ou une difficulté clé que tu as surmontée.]",
       ]],
      ['id' => 'sql', 'name' => 'SQL & bases de données', 'before' => 60, 'now' => 76, 'projects' => ['optim-bdd'],
       'proof' => "Acquisition attestée par la conception et l'optimisation de bases de données réelles, requêtes SQL à l'appui (voir le projet ci-dessous).",
       'story' => [
         "Les bases de données sont un fil rouge depuis la BUT1 : modélisation, écriture de requêtes SQL, puis exploitation de bases existantes.",
         "Entre la BUT1 et la BUT2, j'ai gagné en aisance sur des cas plus réalistes (optimisation, requêtes plus complexes). [Précise un exemple concret.]",
       ]],
      ['id' => 'js', 'name' => 'JavaScript', 'before' => null, 'now' => 60, 'projects' => ['projet-js'],
       'proof' => "Acquisition prouvée par mes travaux pratiques en JavaScript (dépôt ci-dessous) et par le code : manipulation du DOM, gestion d'événements et logique d'affichage.",
       'code' => <<<'CODE'
// Révélation des éléments au défilement (ce portfolio)
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
});
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
CODE,
       'story' => [
         "Je n'avais pas pratiqué le JavaScript avant cette année. Je l'ai appris en BUT2, en me concentrant sur la manipulation du DOM, la gestion d'événements et les échanges de données asynchrones.",
         "[Précise le projet ou le contexte où tu l'as le plus utilisé.]",
       ]],
      ['id' => 'android', 'name' => 'Développement Android', 'before' => null, 'now' => 78, 'projects' => ['projet-android'],
       'proof' => "Acquisition démontrée par le développement d'une application mobile Android (dépôt consultable ci-dessous).",
       'story' => [
         "Le développement Android est une découverte de la BUT2. J'y suis monté rapidement à travers des TP puis le développement d'une application mobile.",
         "[Précise l'application développée et ce qu'elle t'a appris.]",
       ]],
      ['id' => 'progsys', 'name' => 'Programmation système', 'before' => 40, 'now' => 50, 'projects' => [],
       'proof' => "Acquisition justifiée par un travail bas niveau en C (interaction avec le système), comme dans l'extrait ci-dessous.",
       'code' => <<<'CODE'
/* [Insère ici un extrait de ton TP de programmation système] */
#include <stdio.h>

int main(void) {
    // gestion bas niveau : processus, mémoire, fichiers…
    return 0;
}
CODE,
       'story' => [
         "La programmation système prolonge ma maîtrise du C, côté bas niveau et interaction avec le système d'exploitation.",
         "[Précise les TP ou projets concernés et ce que tu as appris.]",
       ]],
      ['id' => 'java', 'name' => 'Java', 'before' => 72, 'now' => 72, 'projects' => ['labyrinthe'],
       'proof' => "Acquisition attestée par un projet d'algorithmique en Java (labyrinthe, plus court chemin avec Dijkstra), ci-dessous.",
       'story' => [
         "J'ai travaillé le Java surtout en BUT1, notamment sur l'algorithmique et la théorie des graphes (labyrinthe, plus court chemin avec Dijkstra).",
         "Je n'ai pas repris le langage au second semestre, mon niveau est donc resté stable. [Précise si besoin.]",
       ]],
      ['id' => 'python', 'name' => 'Python (Flask)', 'before' => null, 'now' => 42, 'projects' => ['refonte-site'],
       'proof' => "Acquisition mise en pratique via Flask sur un projet web (voir le projet ci-dessous).",
       'story' => [
         "J'ai abordé Python cette année, principalement via le framework Flask pour le web.",
         "[Précise le projet où tu l'as mis en pratique.]",
       ]],
      ['id' => 'web', 'name' => 'HTML / CSS', 'before' => 70, 'now' => 85, 'projects' => ['refonte-site'],
       'proof' => "Acquisition directement visible : ce portfolio et la refonte d'un site en sont la preuve (projet ci-dessous).",
       'story' => [
         "Le HTML/CSS m'accompagne depuis la BUT1 ; c'est aussi ce qui me permet de soigner l'aspect visuel de mes projets.",
         "J'ai nettement progressé cette année — ce portfolio en est un exemple concret. [Précise.]",
       ]],
      ['id' => 'vbnet', 'name' => 'VB .NET Framework', 'before' => 45, 'now' => 45, 'projects' => ['jeu-memoire'],
       'proof' => "Acquisition attestée par un projet d'interface machine en VB .NET (jeu de mémoire, ci-dessous).",
       'story' => [
         "J'ai utilisé VB .NET en BUT1 pour développer des interfaces machine (jeu de mémoire).",
         "Je ne l'ai pas repris depuis, mon niveau est resté stable. [Précise si besoin.]",
       ]],
      ['id' => 'php', 'name' => 'PHP', 'before' => null, 'now' => 30, 'projects' => [],
       'proof' => "Acquisition directe : ce portfolio est codé en PHP, comme le montre l'extrait ci-dessous.",
       'code' => <<<'CODE'
// data/content.php centralise tout le contenu du site
$content = require __DIR__ . '/data/content.php';

// chaque vue boucle sur ses données
foreach ($content['sae']['but1'] as $sae) {
    echo '<a href="sae.php?s=' . e($sae['slug']) . '">'
       . e($sae['title']) . '</a>';
}
CODE,
       'story' => [
         "Je découvre PHP cette année. Ce portfolio en est la première vraie mise en pratique : architecture en partials, données centralisées et pages générées dynamiquement.",
         "[Précise ce que tu veux approfondir ensuite.]",
       ]],
    ],
    // Savoir-être — chaque qualité ouvre une page (qualite.php?q=id)
    'soft' => [
      ['id' => 'logique',    'name' => 'Sens de la logique',   'text' => "Décomposer un problème en étapes claires est ce qui me vient le plus naturellement. [Ajoute un exemple concret : projet ou situation.]"],
      ['id' => 'analyse',    'name' => "Capacité d'analyse",   'text' => "J'aime comprendre le « pourquoi » avant d'agir : repérer ce qui coince et le formuler simplement. [Exemple concret.]"],
      ['id' => 'curiosite',  'name' => 'Curiosité',            'text' => "Je teste, je fouille, j'essaie des choses au-delà du programme par envie de comprendre. [Exemple concret.]"],
      ['id' => 'creativite', 'name' => 'Créativité',           'text' => "Trouver une autre manière de faire quand la première ne suffit pas. [Exemple concret.]"],
      ['id' => 'serviable',  'name' => 'Serviabilité',         'text' => "En groupe, je prends le temps d'aider quand quelqu'un bloque. [Exemple concret.]"],
      ['id' => 'empathie',   'name' => 'Empathie',             'text' => "Je fais attention au point de vue et à l'état des autres dans un travail d'équipe. [Exemple concret.]"],
    ],
  ],

  // Projets — une entrée = une page (projet.php?p=slug)
  'projects' => [
    'absences' => [
      'title'   => 'Gestion des absences scolaires',
      'tagline' => "Logiciel en C de suivi des inscriptions et des absences d'élèves.",
      'year'    => 'BUT1 · 2024 – 2025',
      'domain'  => 'Programmation structurée',
      'stack'   => ['C'],
      'skills'  => ['c'],
      'github'  => 'https://github.com/Fares-bna/S1.01_SAE-VieScolaire',
      'role'    => '[Ton rôle dans le projet.]',
      'summary' => "Logiciel développé en langage C permettant l'inscription des élèves et l'enregistrement de leurs absences au sein d'un établissement scolaire.",
      'points'  => ['[Point clé : fonctionnalité.]', '[Point clé : structure de données.]', '[Difficulté surmontée.]'],
    ],
    'octoverso' => [
      'title'   => 'Octoverso',
      'tagline' => "Recréation d'un jeu de société en langage C.",
      'year'    => 'BUT1 · 2024 – 2025',
      'domain'  => 'Programmation / logique de jeu',
      'stack'   => ['C'],
      'skills'  => ['c'],
      'github'  => 'https://github.com/Fares-bna/S1.02_SAE-Octoverso',
      'role'    => '[Ton rôle dans le projet.]',
      'summary' => 'Recréation complète du jeu de société « Octoverso » en langage C : règles, plateau et boucle de jeu.',
      'points'  => ["[Règles implémentées.]", "[Gestion de l'état du jeu.]", '[Difficulté surmontée.]'],
    ],
    'optim-bdd' => [
      'title'   => "Optimisation d'une base de données",
      'tagline' => "Modélisation et optimisation de la base d'une entreprise.",
      'year'    => 'BUT1 · 2024 – 2025',
      'domain'  => 'Bases de données',
      'stack'   => ['SQL', 'Access'],
      'skills'  => ['sql'],
      'role'    => '[Ton rôle dans le projet.]',
      'summary' => "Optimisation de la base de données d'une entreprise : modélisation, requêtes SQL et exploitation sous Access.",
      'points'  => ['[Modèle de données.]', '[Requêtes optimisées.]', '[Résultat obtenu.]'],
    ],
    'refonte-site' => [
      'title'   => "Refonte d'un site internet",
      'tagline' => "Refonte de la direction artistique d'un site web.",
      'year'    => 'BUT1 · 2024 – 2025',
      'domain'  => 'Web design',
      'stack'   => ['HTML', 'CSS', 'Python Flask'],
      'skills'  => ['web', 'python'],
      'role'    => '[Ton rôle dans le projet.]',
      'summary' => "Projet de refonte de la direction artistique d'un site internet : maquette, identité visuelle et intégration.",
      'points'  => ['[Direction artistique.]', '[Intégration.]', '[Difficulté surmontée.]'],
    ],
    'jeu-memoire' => [
      'title'   => 'Jeu de mémoire',
      'tagline' => 'Jeu de mémoire en interface machine (VB .NET).',
      'year'    => 'BUT1 · 2024 – 2025',
      'domain'  => 'Interfaces machines',
      'stack'   => ['VB .NET Framework'],
      'skills'  => ['vbnet'],
      'role'    => '[Ton rôle dans le projet.]',
      'summary' => "Création d'un jeu de mémoire avec interface graphique développée sous VB .NET Framework.",
      'points'  => ['[Interface.]', '[Logique du jeu.]', '[Difficulté surmontée.]'],
    ],
    'labyrinthe' => [
      'title'   => 'Labyrinthe & Dijkstra',
      'tagline' => 'Jeu de labyrinthe en Java avec plus court chemin.',
      'year'    => 'BUT1 · 2024 – 2025',
      'domain'  => 'Algorithmique / théorie des graphes',
      'stack'   => ['Java'],
      'skills'  => ['java'],
      'github'  => 'https://github.com/Fares-bna/S2.02_SAE-Graphes',
      'role'    => '[Ton rôle dans le projet.]',
      'summary' => "Jeu de labyrinthe en Java avec calcul du meilleur chemin possible via l'implémentation de l'algorithme de Dijkstra (théorie des graphes).",
      'points'  => ['[Modélisation en graphe.]', '[Implémentation de Dijkstra.]', '[Difficulté surmontée.]'],
    ],
    'projet-android' => [
      'title'   => '[Projet Android]',
      'tagline' => '[À compléter : projet à fournir (GitHub).]',
      'year'    => 'BUT2 · 2025 – 2026',
      'domain'  => 'Développement mobile',
      'stack'   => ['Android', 'Kotlin/Java'],
      'skills'  => ['android'],
      'github'  => 'https://github.com/Fares-bna/tpAndroid',
      'role'    => '[Ton rôle dans le projet.]',
      'summary' => '[Présentation du projet à venir.]',
      'points'  => ['[Point clé.]', '[Point clé.]', '[Point clé.]'],
    ],
    'projet-js' => [
      'title'   => 'TP JavaScript',
      'tagline' => "Travaux pratiques JavaScript : manipulation du DOM, événements et logique côté client.",
      'year'    => 'BUT2 · 2025 – 2026',
      'domain'  => 'Développement web',
      'stack'   => ['JavaScript'],
      'skills'  => ['js'],
      'github'  => 'https://github.com/Fares-bna/tpJavascript',
      'role'    => '[Ton rôle / ce que tu as réalisé.]',
      'summary' => "Ensemble de travaux pratiques en JavaScript : manipulation du DOM, gestion d'événements, et petites applications interactives côté client.",
      'points'  => ['[Point clé.]', '[Point clé.]', '[Point clé.]'],
    ],
  ],

  // Évolution BUT1 -> BUT2
  'evolution' => [
    'but1' => "Découverte : prise en main de l'environnement et des ressources, mise en place des premières habitudes de travail et beaucoup d'expérimentation.",
    'but2' => "Maturité : repères installés, choix assumés dans les ressources et les méthodes, bonnes habitudes consolidées, avec en plus une vraie touche personnelle.",
  ],

  // Archive des SAÉ — 14 au total, groupées BUT1 / BUT2.
  // github = dépôt si disponible. Détail : sae.php?s=slug.
  'sae' => [
    'but1' => [
      ['id' => 'S1.01', 'slug' => 's1-01', 'title' => "Implémentation d'un besoin client",
       'summary' => "Logiciel de gestion de la vie scolaire (inscriptions, absences) répondant à un besoin client, en C.",
       'github' => 'https://github.com/Fares-bna/S1.01_SAE-VieScolaire'],
      ['id' => 'S1.02', 'slug' => 's1-02', 'title' => "Comparaison d'approches algorithmiques",
       'summary' => "Recréation du jeu Octoverso en C, support d'une comparaison d'approches algorithmiques.",
       'github' => 'https://github.com/Fares-bna/S1.02_SAE-Octoverso'],
      ['id' => 'S1.03', 'slug' => 's1-03', 'title' => "Installation d'un poste pour le développement",
       'summary' => "Mise en place et configuration d'un poste de travail pour le développement.",
       'github' => null],
      ['id' => 'S1.04', 'slug' => 's1-04', 'title' => "Création d'une base de données",
       'summary' => "Conception et création d'une base de données relationnelle.",
       'github' => null],
      ['id' => 'S1.05', 'slug' => 's1-05', 'title' => 'Recueil de besoins',
       'summary' => "Recueil et formalisation des besoins d'un client.",
       'github' => null],
      ['id' => 'S1.06', 'slug' => 's1-06', 'title' => "Découverte de l'environnement économique et écologique",
       'summary' => "Découverte de l'environnement économique et écologique du numérique.",
       'github' => null],
      ['id' => 'S2.01', 'slug' => 's2-01', 'title' => "Découverte de l'environnement économique et écologique",
       'summary' => "Approfondissement de l'environnement économique et écologique.",
       'github' => null],
      ['id' => 'S2.02', 'slug' => 's2-02', 'title' => "Exploration algorithmique d'un problème",
       'summary' => "Exploration algorithmique : labyrinthe en Java et plus court chemin (Dijkstra, graphes).",
       'github' => 'https://github.com/Fares-bna/S2.02_SAE-Graphes'],
      ['id' => 'S2.03', 'slug' => 's2-03', 'title' => 'Installation de services réseau',
       'summary' => "Installation et configuration de services réseau.",
       'github' => null],
      ['id' => 'S2.04', 'slug' => 's2-04', 'title' => "Exploitation d'une base de données",
       'summary' => "Exploitation et requêtage d'une base de données existante.",
       'github' => null],
      ['id' => 'S2.05', 'slug' => 's2-05', 'title' => "Gestion d'un projet",
       'summary' => "Planification et gestion d'un projet informatique.",
       'github' => null],
      ['id' => 'S2.06', 'slug' => 's2-06', 'title' => "Organisation d'un travail d'équipe",
       'summary' => "Organisation et coordination d'un travail d'équipe.",
       'github' => null],
    ],
    'but2' => [
      ['id' => 'S3.01', 'slug' => 's3-01', 'title' => "Développement d'une application",
       'summary' => "Développement d'une application de gestion de colis.",
       'github' => 'https://github.com/Fares-bna/S3.01_SAE-Colis'],
      ['id' => 'S4.01', 'slug' => 's4-01', 'title' => "Développement d'une application complexe",
       'summary' => "Développement d'une application Android plus complète et complexe.",
       'github' => 'https://github.com/Fares-bna/tpAndroid'],
    ],
  ],
];
