/* ============================================================
   Données du portfolio — source unique, éditable à la main.
   Site 100% statique (HTML/CSS/JS) hébergeable sur GitHub Pages.
   ============================================================ */
window.DATA = {

  site: {
    name: 'Fares BENNANI',
    role: 'BUT Informatique',
    tagline: 'Étudiant en informatique',
    lede: "Deuxième année de BUT, Parcours réalisation d'applications",
    year: '2025 – 2026',
    email: 'fares.bennani29@gmail.com',
    linkedin: 'https://www.linkedin.com/in/fares-bennani-862398319/',
    github: 'https://github.com/Fares-bna',
  },

  // Navigation (ancre -> libellé)
  nav: {
    parcours: 'Parcours',
    orientation: 'Orientation',
    projet: 'Projet',
    competences: 'Compétences',
    evolution: 'Évolution',
    sae: 'SAÉ',
  },

  // Parcours (timeline)
  parcours: [
    { year: '2021 – 2024', title: 'Baccalauréat général, mention bien',
      text: 'Spécialités Mathématiques et Physique-Chimie, au Lycée privé La Salle Saint-Rosaire (95)' },
    { year: '2024 – 2025', title: 'BUT 1 Informatique, IUT de Paris Rives de Seine',
      text: 'Université Paris Cité' },
    { year: '2025 – 2026', title: 'BUT 2 Informatique, IUT de Villetaneuse', now: true,
      text: 'Université Sorbonne Paris Nord' },
  ],

  // Pourquoi l'informatique (voix de Fares)
  pourquoi: [
    "J'ai toujours été de nature curieuse, et je me suis toujours plu dans la résolution de problèmes. Alors partir d'une idée simple pour en développer une solution complète, qui m'est propre, est quelque chose qui m'intéresse énormément.",
    "Poursuivre mes études en informatique m'a permis d'en faire mon quotidien.",
  ],

  // Projet professionnel (3 axes)
  projet: [
    { title: 'Développement', text: "Le développement full-stack, pour être à l'aise aussi bien sur la partie visible d'une application que sur tout ce qui la fait tourner derrière, côté serveur." },
    { title: 'Technologies', text: "Toucher à un maximum de langages plutôt que de m'enfermer dans un seul écosystème, pour m'adapter au projet et choisir le bon outil à chaque fois." },
    { title: "Domaine d'étude", text: "Les mathématiques et l'algorithmique, qui sont le socle de ce que je développe : logique, structures de données, graphes et optimisation." },
    { title: 'Un métier', text: "Devenir ingénieur en informatique, capable de concevoir une application de bout en bout et de prendre des responsabilités techniques." },
  ],

  // Compétences. before = niveau BUT1 (null = pas pratiqué l'an dernier), now = niveau actuel.
  skills: {
    years: { before: 'BUT 1', now: 'BUT 2' },
    hard: [
      {
        id: 'c', name: 'C', before: 60, now: 60, projects: [], saes: ['s1-01', 's1-02'],
        proof: "Compétence démontrée par deux SAÉ complètes en C (S1.01 et S1.02), dépôts à l'appui.",
        story: [
          "Le C a été mon premier vrai langage en première année. C'est avec lui que j'ai compris ce qui se passe réellement derrière un programme : la mémoire, les pointeurs, et la façon d'organiser des données quand rien n'est fait à ta place.",
          "Je l'ai travaillé sur des projets entiers, comme un logiciel de gestion de la vie scolaire et la recréation d'un jeu de société. Ce sont des projets où il faut tout construire soi-même, et c'est là que j'ai pris l'habitude de réfléchir avant de coder.",
        ],
      },
      {
        id: 'sql', name: 'SQL & bases de données', before: 60, now: 76, projects: ['optim-bdd'],
        github: 'https://github.com/Fares-bna/tpSql',
        proof: "Compétence attestée par mes SAÉ contenant des bases de données ainsi que les travaux pratiques effectués en cours (dépot disponible avec le projet) : jointures, sous-requêtes, agrégation, vues matérialisées et types composites PostgreSQL.",
      
        story: [
          "Les bases de données reviennent à chaque semestre depuis la première année. J'ai commencé par la modélisation et l'écriture de requêtes, puis je suis passé à des bases déjà en place qu'il fallait comprendre et exploiter.",
          "Ce qui me plaît, c'est de traduire un besoin concret en quelque chose de structuré et fiable. En deuxième année, j'ai surtout progressé sur les requêtes complexes : sous-requêtes, vues matérialisées, types composites et normalisation.",
        ],
      },
      {
        id: 'js', name: 'JavaScript', before: null, now: 60, projects: ['projet-js'],
        proof: "Compétence développée avec la SAÉ S4.01, développée en PHP",
      
        story: [
          "Je n'avais jamais touché réellement au JavaScript avant ma deuxième année. Je m'y suis mis à travers une série de travaux pratiques, en partant des bases : manipulation du DOM, gestion des événements et petites applications interactives.",
          "C'est le langage qui m'a fait apprécier le développement côté navigateur, parce qu'on voit immédiatement le résultat de ce qu'on écrit. J'ai progressé vite grâce aux réflexes déjà pris en C et en Java.",
        ],
      },
      {
        id: 'android', name: 'Développement Android', before: null, now: 78, projects: ['projet-android'],
        proof: "Compétence démontrée par le développement d'une application mobile Android (dépôt ci-dessous).",
        story: [
          "Le développement Android est une découverte de la deuxième année. Les différents TP proposés en cours nous poussaient petit à petit jusqu'à nous faire développer une application toute entière en autonomie",
          "Travailler sur mobile m'a obligé à penser autrement : le cycle de vie d'une application, l'interface, les contraintes de l'appareil. C'est le domaine qui correspond le plus à ce que je veux faire ensuite.",
        ],
      },
      {
        id: 'progsys', name: 'Programmation système', before: 40, now: 50, projects: [],
        proof: "Compétence justifiée par un travail bas-niveau en C, en lien direct avec le système, comme dans l'extrait ci-dessous.",
        code:
`/* Lecture d'un fichier caractère par caractère, en C */
#include <stdio.h>

int main(void) {
    FILE *f = fopen("donnees.txt", "r");
    if (f == NULL) return 1;

    int c;
    while ((c = fgetc(f)) != EOF) {
        putchar(c);
    }
    fclose(f);
    return 0;
}`,
        story: [
          "La programmation système est venue naturellement après le C. On y descend encore d'un cran : on parle directement au système d'exploitation, on manipule les processus, la mémoire et les fichiers.",
          "Je m'y suis confronté à travers des exercices bas niveau en C, où la moindre erreur se paie tout de suite. C'est exigeant, mais c'est aussi ce qui m'a fait vraiment comprendre comment fonctionne une machine.",
        ],
      },
      {
        id: 'java', name: 'Java', before: 72, now: 72, projects: [], saes: ['s2-02'],
        proof: "Compétence attestée par la SAÉ d'exploration algorithmique en Java (S2.02 : labyrinthe et plus court chemin), dépôt à l'appui.",
        story: [
          "J'ai surtout travaillé le Java en BUT1, en algorithmique. Le projet qui m'a le plus marqué est un jeu de labyrinthe où il fallait calculer le plus court chemin avec l'algorithme de Dijkstra.",
          "C'est avec Java que j'ai appris à raisonner en termes de structures de données et de graphes. Je ne l'ai pas repris au second semestre, donc mon niveau est resté stable depuis.",
        ],
      },
      {
        id: 'python', name: 'Python (Flask)', before: null, now: 42, projects: ['refonte-site'],
        proof: "Compétence mise en pratique avec Flask sur la partie serveur d'un projet web (ci-dessous).",
        story: [
          "J'ai abordé Python cette année, surtout à travers le framework Flask pour le web. C'est un langage que je trouve agréable parce qu'il va droit au but.",
          "Je l'ai utilisé côté serveur sur un projet web. C'est encore récent pour moi, mais c'est une base que je compte approfondir.",
        ],
      },
      {
        id: 'web', name: 'HTML / CSS', before: 70, now: 85, projects: ['refonte-site'],
        proof: "Compétence directement visible : ce portfolio et la refonte d'un site en sont la preuve.",
        story: [
          "Le HTML et le CSS m'accompagnent depuis la BUT1. C'est ce qui me permet de soigner l'aspect d'un projet, et pas seulement son fonctionnement.",
          "J'ai beaucoup progressé cette année, notamment en refaisant entièrement la mise en page de ce portfolio. C'est devenu un terrain sur lequel je prends plaisir à chercher le détail qui change tout.",
        ],
      },
      {
        id: 'vbnet', name: 'VB .NET Framework', before: 45, now: 45, projects: ['jeu-memoire'],
        proof: "Compétence attestée par un projet d'interface graphique en VB .NET (jeu de mémoire, ci-dessous).",
        story: [
          "J'ai utilisé VB .NET en BUT1 pour créer des interfaces graphiques, dont un jeu de mémoire. C'était ma première approche du développement d'applications avec une interface visuelle.",
          "Je ne m'en suis pas resservi depuis, donc mon niveau est resté celui de la BUT1, mais l'expérience m'a aidé à mieux comprendre les autres outils d'interface.",
        ],
      },
      {
        id: 'php', name: 'PHP', before: null, now: 30, projects: [],
        proof: "Compétence apprise à l'aide de la SAE S4.01",
        story: [
          "PHP est une découverte de cette année, et ce portfolio en a été le premier vrai terrain : avant de le rendre statique, je l'avais entièrement construit en PHP.",
          "J'y ai mis en place une vraie organisation : un fichier de données central, des composants réutilisables et des pages générées automatiquement. C'est ce qui m'a fait comprendre l'intérêt de structurer un projet plutôt que d'empiler du code.",
        ],
      },
    ],
    // Savoir-être — pages laissées à remplir par Fares (qualite.html?id=...)
    soft: [
      { id: 'logique', name: 'Sens de la logique',
        text: "Quand un problème se présente, mon premier réflexe est de le découper en étapes simples avant de chercher la solution. La programmation a renforcé cette habitude : un programme ne pardonne pas l'à-peu-près, il oblige à raisonner pas à pas. Sur mes projets en C, c'est cette rigueur qui m'a permis de remonter à l'origine d'un bug plutôt que de tâtonner." },
      { id: 'analyse', name: "Capacité d'analyse",
        text: "J'aime comprendre le « pourquoi » d'un problème avant d'écrire la moindre ligne. Lire un énoncé, repérer ce qui est réellement demandé et reformuler le besoin simplement, c'est souvent la moitié du travail. Lors du recueil des besoins d'une SAÉ, c'est ce qui m'a aidé à distinguer l'essentiel du secondaire." },
      { id: 'curiosite', name: 'Curiosité',
        text: "J'aime bien aller derrière un sujet qui m'accroche, je vais chercher plus loin, je teste par moi-même et j'apprends. C'est de cette façon que j'ai appris le JavaScript et le développement Android, en dehors puis au-delà des TP." },
      { id: 'creativite', name: 'Créativité',
        text: "Quand une première approche ne fonctionne pas, je cherche un autre angle au lieu de m'entêter. Recréer un jeu de société comme le cas d'Octoverso m'a justement obligé à trouver mes propres solutions là où il n'existait pas de marche à suivre toute faite." },
      { id: 'serviable', name: 'Serviabilité',
        text: "En groupe, je prends le temps d'aider quand quelqu'un bloque. Desfois, je me propose par exemple pour réaliser des tâches que d'autres n'auraient pas envie de faire." },
      { id: 'empathie', name: 'Empathie',
        text: "Je fais attention à la manière dont les autres vivent un projet, pas seulement à la technique. Comprendre le point de vue d'un coéquipier ou d'un utilisateur change la façon de travailler et évite beaucoup de malentendus dans un travail d'équipe. Deplus, il est essentiel pour moi de bien s'entendre avec tout le monde" },
    ],
  },

  // Projets — une entrée = une page (projet.html?id=slug)
  projects: {
    'optim-bdd': {
      title: "Optimisation d'une base de données",
      tagline: "Normalisation, dénormalisation, vues matérialisées..",
      year: 'BUT2 · 2025 – 2026', domain: 'Bases de données',
      stack: [], skills: ['sql'],
      github:"https://github.com/Fares-bna/tpSql",
      role: "Exécution de tout type de requêtes ",
      summary: "Travaux pratiques mettant en avant le principe de normalisation, dénormalisation, créations de vues matérialisées, analyses de coût de requêtes. ",
      points: ['[Modèle de données.]', '[Requêtes optimisées.]', '[Résultat obtenu.]'],
    },
    'refonte-site': {
      title: "Refonte d'un site internet",
      tagline: "Refonte de la direction artistique d'un site web.",
      year: 'BUT1 · 2024 – 2025', domain: 'Web design',
      stack: [], skills: ['web', 'php'],
      role: "Fixation d'un plan et d'une charte graphique à respecter, modification du style : ajustements CSS, HTML/PHP",
      summary: "Projet de refonte de la direction artistique d'un site internet : maquette, identité visuelle et intégration.",
      images:['assets/img/refonte-avant.png', 'assets/img/refonte-apres.png'],
      points: ['Organisation pour la refonte', 'Coordination sur le style choisi', 'Qualité de la refonte'],
      
    },
    'jeu-memoire': {
      title: 'Jeu de mémoire',
      tagline: 'Jeu de mémoire en interface graphique (VB .NET).',
      year: 'BUT1 · 2024 – 2025', domain: 'Interfaces machines',
      stack: ['VB .NET Framework'], skills: ['vbnet'],
      role: "Optimisation du code et supervision de l'organisation de l'équipe",
      summary: "Création d'un jeu de mémoire avec interface graphique développée sous VB .NET Framework.",
      points: ['[Interface.]', '[Logique du jeu.]', '[Difficulté surmontée.]'],
    },
    'projet-android': {
      title: "Développement d'applications mobiles",
      tagline: "Java Kotlin et XML",
      year: 'BUT2 · 2025 – 2026', domain: 'Développement mobile',
      stack: [], skills: ['android'],
      github: 'https://github.com/Fares-bna/tpAndroid',
      role: " Développement de plusieurs applications dont une reprenant le rôle d'une calculatrice" ,
      summary: "Ensemble de travaux pratiques en Android : manipulation des fichiers sources, gestion d'événements, création d'intentions et de fichiers de projet",
      images:["assets/img/tel.png", "assets/img/android-projet.png"],
      points: ['[Point clé.]', '[Point clé.]', '[Point clé.]'],
    },
    'projet-js': {
      title: 'TP JavaScript',
      tagline: "Travaux pratiques JavaScript : DOM, événements et logique côté client.",
      year: 'BUT2 · 2025 – 2026', domain: 'Développement web',
      stack: [], skills: ['js', 'web'],
      github: 'https://github.com/Fares-bna/tpJavascript',
      role: "Développement d'une application Express.js permettant le rencensement et la modification de profil en ligne, développement d'une application SPA en Vue.js reprenant le jeu Puissance 4",
      summary: "Ensemble de travaux pratiques en JavaScript : manipulation du DOM, gestion d'événements et petites applications interactives côté client.",
      images:["assets/img/express-js.png", "assets/img/vue-js.png"],
      
      points: ['[Point clé.]', '[Point clé.]', '[Point clé.]'],
    },
  },

  // Évolution BUT1 -> BUT2
  evolution: {
    but1: "Découverte du secteur, j'ai pu prendre mes premières marques et mettre en place des habitudes.",
    but2: "Compréhension du secteur, mes mauvaises habitudes ont pu être écartées et mes marques sont devenus mes repères.",
  },

  // SAÉ — 14 au total, groupées BUT1 / BUT2. (sae.html?id=slug)
  sae: {
    but1: [
      { id: 'S1.01', slug: 's1-01', title: "Implémentation d'un besoin client",
        summary: "Logiciel de gestion de la vie scolaire (inscriptions, absences) répondant à un besoin client, en langage C.",
        github: 'https://github.com/Fares-bna/S1.01_SAE-VieScolaire',
        skills: ['c'],
        role: "Je proposais à mon coéquipier de nouvelles approches quand il était à court d'idées, et j'utilisais le débogage lorsque le code ne compilait plus.",
        points: ["Découverte d'un nouveau langage et exploitation poussée", "Faire preuve d'autonomie et de patience", "Construire une logique claire et optimiser son code"] },
      { id: 'S1.02', slug: 's1-02', title: "Comparaison d'approches algorithmiques",
        summary: "Recréation du jeu Octoverso en C, support d'une comparaison d'approches algorithmiques.",
        github: 'https://github.com/Fares-bna/S1.02_SAE-Octoverso',
        skills: ['c'] },
      { id: 'S1.03', slug: 's1-03', title: "Installation d'un poste pour le développement",
        summary: "Mise en place et configuration d'un poste de travail virtuel pour le développement.", github: null },
      { id: 'S1.04', slug: 's1-04', title: "Création d'une base de données",
        summary: "Identifier les clés primaires, obtenir les données avec Access et les traiter", github: "https://github.com/Fares-bna/S1.04_SAE-BD" ,
        skills: ['sql']},

      { id: 'S1.05', slug: 's1-05', title: 'Recueil de besoins',
        summary: "Recueil et formalisation des besoins d'un client (entreprise).", github: null },
      { id: 'S1.06', slug: 's1-06', title: "Découverte de l'environnement économique et écologique",
        summary: "À partir de la S1.04, positionnement de l'environnement et de l'écologie dans la vie de l'entreprise.", github: null },
      { id: 'S2.01', slug: 's2-01', title: "Développement d'une application",
        summary: "Approfondissement de l'environnement économique et écologique.", github: null },
      { id: 'S2.02', slug: 's2-02', title: "Exploration algorithmique d'un problème",
        summary: "Exploration algorithmique : labyrinthe en Java et plus court chemin (Dijkstra, graphes).",
        github: 'https://github.com/Fares-bna/S2.02_SAE-Graphes',
        skills: ['java'] },
      { id: 'S2.03', slug: 's2-03', title: 'Installation de services réseau',
        summary: "Installer et configurer des services réseaux sur une machine", github: null },
      { id: 'S2.04', slug: 's2-04', title: "Exploitation d'une base de données",
        summary: "En reprennant une base de données existante, être capable d'en exploiter les données nécessaires", github: null,
        skills:['sql'] },
      { id: 'S2.05', slug: 's2-05', title: "Gestion d'un projet",
        summary: "Avec différentes données et besoin d'un client, savoir lui proposer un projet capable d'être géré, en temps et en heure", github: null },
      { id: 'S2.06', slug: 's2-06', title: "Organisation d'un travail d'équipe",
        summary: "Savoir prendre du recul sur les différents travaux d'équipes effectués (SAE) pour mieux gérer les imperfections l'année prochaine.", github: null },
    ],
    but2: [
      { id: 'S3.01', slug: 's3-01', title: "Développement d'une application",
        summary: "Développement d'une application de gestion de commandes pour l'IUT de Villetaneuse",
        skills:['python', 'web', 'sql'],
        github: 'https://github.com/Fares-bna/S3.01_SAE-Colis' },
      { id: 'S4.01', slug: 's4-01', title: "Développement d'une application complexe",
        summary: "Suite du projet Colis (S3.01) : Reprise d'une application entière et amélioration",
        github: 'https://github.com/My19a/Suite_Projet_Colis' ,
        skills:['php', 'web', 'sql']},
    ],
  },
};
