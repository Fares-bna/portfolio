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
    status: 'Étudiant en 2ᵉ année de BUT Informatique',
    objective: "À la recherche d'une alternance pour le BUT 3",
    photo: 'assets/img/profil.png',
    intro: "La curiosité est sans doute ce qui me décrit le mieux. J'ai besoin de comprendre comment les choses fonctionnent en profondeur, pas seulement de savoir m'en servir : quand un sujet m'accroche, je vais chercher plus loin, je teste par moi-même et je n'abandonne pas tant que je n'ai pas saisi la logique derrière. C'est elle qui me pousse à toujours aller un cran plus loin dans ce que je construis.",
  },

  // Navigation (ancre -> libellé)
  nav: {
    parcours: 'Parcours',
    competences: 'Compétences',
    objectifs: 'Objectifs',
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

  // Projet professionnel — compléments (compétences à développer + objectifs)
  projetPlus: {
    developper: `Je veux d'abord renforcer l'<a href="competence.html?id=administrer">administration système</a> et le déploiement : Linux, conteneurs Docker et intégration continue. C'est le domaine où je suis le moins à l'aise aujourd'hui, et c'est aussi celui qui sépare un programme qui tourne sur ma machine d'une application réellement livrée. Je souhaite ensuite progresser en <a href="competence.html?id=conduire">conduite de projet</a>, en particulier sur l'estimation des délais et les méthodes agiles, que je n'ai pour l'instant éprouvées que sur des projets courts. Enfin, je veux apprendre à concevoir des architectures plus solides, pour penser la structure d'une application avant d'écrire la première ligne plutôt que de la corriger en cours de route.`,
    objectifs: `Mon objectif immédiat est de décrocher une alternance dès le BUT 3, pour confronter mes compétences à un vrai cadre professionnel et apprendre au contact d'une équipe expérimentée. À plus long terme, je veux poursuivre vers un diplôme d'ingénieur en informatique, puis devenir capable de mener une application de bout en bout et de tenir un rôle technique de référence. Chaque compétence que je travaille aujourd'hui — <a href="competence.html?id=realiser">réaliser</a>, <a href="competence.html?id=optimiser">optimiser</a>, <a href="competence.html?id=gerer">gérer</a> — est une marche de plus vers ce métier.`,
  },

  // Les 6 compétences officielles du BUT Informatique (structure principale).
  // before / now = niveau sur 4 (1 Initiation · 2 Intermédiaire · 3 Maîtrise · 4 Expertise).
  // saes / projects / langs = preuves rattachées (résolues automatiquement).
  competences: [
    {
      id: 'realiser', name: 'Réaliser',
      full: "Réaliser des applications qui répondent à un besoin",
      short: "Concevoir et développer une application complète, de l'analyse du besoin jusqu'à une solution qui fonctionne.",
      before: 2, now: 3,
      saes: ['s1-01', 's3-01', 's4-01'],
      projects: ['projet-android', 'projet-js', 'jeu-memoire', 'refonte-site'],
      langs: ['c', 'java', 'js', 'android', 'php', 'python', 'vbnet'],
      appris: "J'ai appris à partir d'un besoin réel et à le transformer en une application qui fonctionne, pas seulement en code qui compile. Le projet Colis (S3.01), commandé par un service de l'IUT, m'a fait passer de l'exercice scolaire à une vraie commande, avec un commanditaire à satisfaire.",
      prouver: "Je le démontre par des applications complètes : la gestion de la vie scolaire en C, l'application de suivi de colis en Flask, mes applications Android et mes TP JavaScript (Express, Vue).",
      ameliorer: "Il me reste à mieux poser l'architecture en amont : sur Colis, certaines parties auraient demandé moins de reprises si la structure avait été pensée plus tôt. C'est ce que je veux travailler sur des projets plus longs.",
    },
    {
      id: 'optimiser', name: 'Optimiser',
      full: "Optimiser les performances et la qualité d'une application",
      short: "Mesurer puis améliorer la performance, la lisibilité et la fiabilité d'un programme ou d'une base de données.",
      before: 2, now: 3,
      saes: ['s1-02', 's2-02'],
      projects: ['optim-bdd'],
      langs: ['sql', 'java'],
      appris: "J'ai appris qu'optimiser commence par mesurer. En base de données, le passage d'une vue classique à une vue matérialisée a divisé le temps d'exécution par plus de cent sur le même résultat. En algorithmique, comparer deux approches m'a montré qu'un bon algorithme vaut mieux que du code micro-optimisé.",
      prouver: "Mes travaux SQL (vues matérialisées, normalisation, analyse de coût) et la SAÉ d'algorithmique (plus court chemin avec Dijkstra) en sont la preuve directe.",
      ameliorer: "Je veux apprendre à profiler une application réelle, au-delà des cas d'école, pour cibler les vrais goulots d'étranglement.",
    },
    {
      id: 'administrer', name: 'Administrer',
      full: "Administrer des systèmes et des réseaux",
      short: "Installer, configurer et déployer un environnement : poste de travail, services réseau, virtualisation, conteneurs.",
      before: 1, now: 2,
      saes: ['s1-03', 's2-03', 's3-01'],
      projects: [],
      langs: ['progsys'],
      appris: "J'ai appris à préparer l'environnement dans lequel une application vit : machine virtuelle, services réseau et conteneurisation. Sur Colis, déployer l'application avec Docker m'a fait comprendre que livrer un logiciel ne s'arrête pas au code.",
      prouver: "L'installation et la configuration d'un poste de travail virtuel (S1.03), la mise en place de services réseau (S2.03) et le déploiement conteneurisé du projet Colis.",
      ameliorer: "C'est la compétence sur laquelle j'ai le plus de marge. Je veux progresser sur l'administration Linux et l'automatisation du déploiement, idéalement en alternance.",
    },
    {
      id: 'gerer', name: 'Gérer',
      full: "Gérer des données : concevoir et exploiter une base",
      short: "Modéliser, interroger et exploiter des données fiables au service d'une application.",
      before: 2, now: 3,
      saes: ['s1-04', 's2-04', 's3-01'],
      projects: ['optim-bdd'],
      langs: ['sql'],
      appris: "J'ai appris à modéliser une base à partir d'un besoin, puis à l'interroger efficacement. Sur Colis, la base comptait neuf tables liées : il fallait penser les relations avant d'écrire la moindre requête.",
      prouver: "La création d'une base sous Access (S1.04), l'exploitation d'une base existante (S2.04), mes travaux SQL avancés et la base MySQL de l'application Colis.",
      ameliorer: "Je veux aller plus loin sur les procédures stockées et la gestion de la concurrence sur des bases à fort volume.",
    },
    {
      id: 'conduire', name: 'Conduire',
      full: "Conduire un projet informatique",
      short: "Organiser un projet : recueil des besoins, planification, suivi de l'avancement et outils de gestion.",
      before: 1, now: 2,
      saes: ['s1-05', 's2-05', 's3-01'],
      projects: [],
      langs: [],
      appris: "J'ai appris qu'un projet se pilote autant qu'il se code. Recueillir les besoins, découper le travail et suivre l'avancement évite de partir dans la mauvaise direction. Sur Colis, répartir les rôles dès le départ nous a fait gagner du temps.",
      prouver: "Le recueil et la formalisation des besoins d'un client (S1.05), la gestion d'un projet de bout en bout (S2.05) et l'organisation du travail sur le projet Colis : planification, répartition des tâches et suivi.",
      ameliorer: "Je veux gagner en aisance sur l'estimation des délais, là où nous avons parfois sous-estimé certaines tâches.",
    },
    {
      id: 'collaborer', name: 'Collaborer',
      full: "Collaborer au sein d'une équipe informatique",
      short: "Travailler à plusieurs : versionnage, communication, répartition et intégration du travail de chacun.",
      before: 2, now: 3,
      saes: ['s1-01', 's2-06', 's3-01'],
      projects: [],
      langs: [],
      appris: "J'ai appris à travailler à plusieurs sans se marcher dessus : utiliser Git pour fusionner le travail de chacun, communiquer sur ce qui est fait et reprendre une partie écrite par un autre. À cinq sur Colis, la coordination comptait autant que le code.",
      prouver: "Le travail en binôme (S1.01), le recul sur l'organisation d'équipe (S2.06) et surtout le projet Colis mené à cinq, avec Git et une répartition claire des rôles.",
      ameliorer: "Je veux m'habituer à des méthodes plus formelles — revues de code systématiques, intégration continue — que je n'ai pour l'instant pratiquées que partiellement.",
    },
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
        objectifs: "Concevoir et implémenter un logiciel de gestion de la vie scolaire — inscriptions, suivi des absences, gestion des notes — en répondant à un besoin client formalisé dans un cahier des charges, en langage C.",
        recit: "Première SAÉ de première année, réalisée en binôme dès le début du BUT. Nous sommes partis d'un cahier des charges et avons développé un programme C complet, en découvrant pour la première fois toutes les étapes d'un projet logiciel : analyse du besoin, conception des structures de données, développement et débogage.",
        role: "Je proposais à mon coéquipier de nouvelles approches quand il était à court d'idées, et je prenais en charge le débogage lorsque le code ne compilait plus.",
        taches: {
          individuel: [
            "Débogage et correction des erreurs de compilation et d'exécution.",
            "Proposition d'alternatives algorithmiques face aux blocages.",
            "Implémentation de la gestion des absences.",
          ],
          collectif: [
            "Analyse du cahier des charges et définition des structures de données.",
            "Développement et intégration des fonctionnalités.",
            "Tests et vérification du programme final.",
          ],
        },
        difficultes: [
          { probleme: "Gérer la mémoire dynamique en C sans expérience préalable : les pointeurs provoquaient des segfaults difficiles à localiser.", solution: "Tracer l'exécution étape par étape et ajouter des affichages de débogage ciblés jusqu'à remonter à l'origine du problème." },
        ],
        niveaux: [
          { comp: 'realiser', avant: 'Initiation', apres: 'Intermédiaire' },
          { comp: 'collaborer', avant: 'Initiation', apres: 'Initiation' },
        ],
        perspectives: "J'aurais dû mieux planifier le découpage des fonctions dès le départ pour éviter les refactorisations en cours de projet." },
      { id: 'S1.02', slug: 's1-02', title: "Comparaison d'approches algorithmiques",
        summary: "Recréation du jeu Octoverso en C, support d'une comparaison d'approches algorithmiques.",
        github: 'https://github.com/Fares-bna/S1.02_SAE-Octoverso',
        skills: ['c'],
        objectifs: "Recréer le jeu de société Octoverso en C et l'utiliser comme support d'une comparaison d'approches algorithmiques : identifier laquelle est la plus efficace et analyser la différence.",
        recit: "Suite logique de S1.01, cette SAÉ demandait de coder les règles du jeu, puis de comparer au moins deux stratégies de résolution en mesurant leurs performances. L'enjeu était d'aller au-delà de l'implémentation pour raisonner sur l'efficacité.",
        taches: {
          individuel: [
            "Analyse des règles du jeu et traduction en structures C.",
            "Implémentation d'une des approches algorithmiques comparées.",
          ],
          collectif: [
            "Développement des fonctions principales du jeu.",
            "Comparaison des approches et rédaction du rapport d'analyse.",
          ],
        },
        difficultes: [
          { probleme: "Représenter l'état du plateau de façon à faciliter les calculs de coups possibles.", solution: "Opter pour une matrice 2D avec un entier par case, ce qui simplifie les vérifications de validité de coup." },
        ],
        niveaux: [
          { comp: 'realiser', avant: 'Intermédiaire', apres: 'Intermédiaire' },
          { comp: 'optimiser', avant: 'Initiation', apres: 'Intermédiaire' },
        ],
        perspectives: "Aller plus loin sur l'analyse théorique de la complexité (notation grand O) et pas seulement sur des mesures empiriques." },
      { id: 'S1.03', slug: 's1-03', title: "Installation d'un poste pour le développement",
        summary: "Mise en place et configuration d'un poste de travail virtuel sous Linux pour le développement.", github: null,
        skills: ['progsys'],
        objectifs: "Installer et configurer de A à Z un poste de travail virtuel sous Linux, opérationnel pour le développement logiciel.",
        recit: "Travail individuel guidé : installation d'une distribution Linux dans VirtualBox, configuration du réseau, installation des outils de développement et validation de l'environnement en compilant un premier programme.",
        taches: {
          individuel: [
            "Installation de VirtualBox et création de la machine virtuelle.",
            "Configuration du réseau (mode NAT).",
            "Installation des outils : gcc, make, git et éditeur de code.",
            "Validation : compilation d'un premier programme C depuis la VM.",
          ],
          collectif: [
            "Documentation de la procédure pour la vérification.",
          ],
        },
        difficultes: [
          { probleme: "Le réseau ne fonctionnait pas après l'installation : impossible de télécharger les paquets.", solution: "Reconfiguration du mode réseau dans VirtualBox (passage à l'accès par pont), ce qui a résolu la connectivité." },
        ],
        niveaux: [
          { comp: 'administrer', avant: 'Initiation', apres: 'Initiation' },
        ],
        perspectives: "Automatiser la configuration avec un script shell pour reproduire l'environnement rapidement sans intervention manuelle." },
      { id: 'S1.04', slug: 's1-04', title: "Création d'une base de données",
        summary: "Modélisation et création d'une base de données relationnelle sous Access : entités, clés primaires, relations et premières requêtes.",
        github: "https://github.com/Fares-bna/S1.04_SAE-BD",
        skills: ['sql'],
        objectifs: "Modéliser et créer une base de données relationnelle sous Microsoft Access à partir d'un besoin client : identifier les entités, les clés primaires et les dépendances fonctionnelles.",
        recit: "La SAÉ partait d'un énoncé décrivant les besoins d'une organisation. Il fallait en extraire le modèle conceptuel, l'implémenter sous Access et écrire des requêtes pour exploiter les données.",
        taches: {
          individuel: [
            "Identification des entités, attributs et clés primaires depuis l'énoncé.",
            "Création des tables et des relations sous Access.",
            "Rédaction de requêtes SELECT avec filtres et jointures simples.",
          ],
          collectif: [
            "Vérification croisée du modèle conceptuel avant implantation.",
            "Mise en forme du rapport de modélisation.",
          ],
        },
        difficultes: [
          { probleme: "Identifier les bonnes dépendances fonctionnelles pour normaliser correctement le schéma.", solution: "Raisonner attribut par attribut : de quoi dépend cet attribut, et uniquement de ça ?" },
        ],
        niveaux: [
          { comp: 'gerer', avant: 'Initiation', apres: 'Intermédiaire' },
        ],
        perspectives: "Migrer vers un vrai SGBD comme PostgreSQL ou MySQL pour aller au-delà des limites d'Access." },

      { id: 'S1.05', slug: 's1-05', title: 'Recueil de besoins',
        summary: "Recueil et formalisation des besoins d'un client (entreprise), de l'entretien au document de spécification.", github: null,
        objectifs: "Mener le recueil et la formalisation des besoins d'un client (entreprise fictive) et produire un document de spécification utilisable par une équipe de développement.",
        recit: "En groupe, nous avons simulé un entretien client, identifié les besoins fonctionnels et non fonctionnels, puis produit un document de spécification : contexte, liste des fonctionnalités attendues et diagrammes de cas d'utilisation.",
        taches: {
          individuel: [
            "Rédaction des cas d'utilisation principaux.",
            "Formalisation du besoin en liste de fonctionnalités priorisées.",
          ],
          collectif: [
            "Simulation de l'entretien client et prise de notes.",
            "Mise en forme du document de spécification.",
            "Réalisation des diagrammes UML (contexte, cas d'utilisation).",
          ],
        },
        difficultes: [
          { probleme: "Distinguer ce que le client dit vouloir de ce dont il a réellement besoin.", solution: "Reformuler systématiquement chaque demande et la soumettre au client avant de l'inscrire dans le document." },
        ],
        niveaux: [
          { comp: 'conduire', avant: 'Initiation', apres: 'Initiation' },
        ],
        perspectives: "Gagner en aisance sur la priorisation (MoSCoW) et l'estimation de la complexité dès le recueil." },
      { id: 'S1.06', slug: 's1-06', title: "Découverte de l'environnement économique et écologique",
        summary: "Analyse du positionnement économique et environnemental d'une organisation du secteur numérique.", github: null,
        objectifs: "À partir du contexte de la SAÉ S1.04, analyser comment une organisation du secteur informatique positionne son activité vis-à-vis des enjeux économiques et environnementaux du numérique.",
        recit: "Travail de recherche et de synthèse : étude d'une organisation, identification de son modèle économique, analyse de son empreinte environnementale (consommation énergétique, déchets électroniques) et présentation orale des conclusions.",
        taches: {
          individuel: [
            "Recherche documentaire sur le modèle économique de l'organisation.",
            "Rédaction de la partie analyse économique.",
          ],
          collectif: [
            "Analyse de l'empreinte environnementale numérique.",
            "Mise en forme et présentation orale du rapport.",
          ],
        },
        difficultes: [
          { probleme: "Trouver des sources fiables sur les pratiques environnementales réelles d'une entreprise.", solution: "Privilégier les rapports RSE officiels, les certifications et les études d'organismes indépendants." },
        ],
        niveaux: [
          { comp: 'conduire', avant: 'Initiation', apres: 'Initiation' },
        ],
        perspectives: "Aller plus loin sur la mesure concrète de l'empreinte carbone d'un service numérique (analyse du cycle de vie)." },
      { id: 'S2.01', slug: 's2-01', title: "Développement d'une application",
        summary: "Développement d'un jeu de mémoire avec interface graphique sous VB .NET Framework, en réponse à un cahier des charges.", github: null,
        skills: ['vbnet'],
        objectifs: "Concevoir et réaliser une application avec interface graphique (Windows Forms) en VB .NET : un jeu de mémoire jouable, avec gestion des règles, du score et des tours.",
        recit: "En équipe, nous avons développé un jeu de mémoire en VB .NET avec Windows Forms. La SAÉ couvrait la conception de l'interface, la logique du jeu (retournement des paires de cartes, gestion des tours et du score) et la livraison d'une application fonctionnelle.",
        role: "Optimisation de la logique du jeu et coordination de l'équipe pour s'assurer de l'avancement des tâches.",
        taches: {
          individuel: [
            "Optimisation de la vérification des paires et gestion des états (cartes retournées, attente).",
            "Supervision de la répartition des tâches au sein de l'équipe.",
          ],
          collectif: [
            "Conception de l'interface graphique avec Windows Forms.",
            "Implémentation de la logique de jeu et du suivi du score.",
            "Tests et corrections avant la livraison.",
          ],
        },
        difficultes: [
          { probleme: "Gérer l'état de l'interface pendant l'animation de retournement : l'utilisateur ne devait pas pouvoir cliquer pendant ce temps.", solution: "Désactiver les contrôles pendant l'animation et les réactiver seulement à la fin de l'événement." },
        ],
        niveaux: [
          { comp: 'realiser', avant: 'Intermédiaire', apres: 'Intermédiaire' },
          { comp: 'collaborer', avant: 'Intermédiaire', apres: 'Intermédiaire' },
        ],
        perspectives: "Mieux couvrir les cas limites (deux joueurs cliquant très rapidement) et ajouter des tests automatisés sur la logique du jeu." },
      { id: 'S2.02', slug: 's2-02', title: "Exploration algorithmique d'un problème",
        summary: "Exploration algorithmique : labyrinthe en Java et plus court chemin (Dijkstra, graphes).",
        github: 'https://github.com/Fares-bna/S2.02_SAE-Graphes',
        skills: ['java'] },
      { id: 'S2.03', slug: 's2-03', title: 'Installation de services réseau',
        summary: "Installation et configuration de services réseau courants sur une machine Linux : serveur web, DNS, DHCP et partage de fichiers.", github: null,
        skills: ['progsys'],
        objectifs: "Installer et configurer des services réseau courants sur une machine Linux : serveur web Apache, serveur DNS, DHCP et partage de fichiers Samba.",
        recit: "En binôme sur des machines virtuelles, nous avons mis en place plusieurs services réseau. Chaque service était configuré puis testé depuis une machine cliente pour valider son bon fonctionnement.",
        taches: {
          individuel: [
            "Configuration du serveur web Apache.",
            "Mise en place du serveur DNS avec BIND.",
            "Rédaction de la documentation des procédures.",
          ],
          collectif: [
            "Installation et configuration du DHCP.",
            "Partage de fichiers avec Samba.",
            "Tests d'accès depuis la machine cliente.",
          ],
        },
        difficultes: [
          { probleme: "Conflit de résolution DNS entre le serveur local et le DNS de l'hyperviseur, empêchant les mises à jour de paquets.", solution: "Configurer l'ordre de résolution dans nsswitch.conf et isoler les machines sur un réseau interne VirtualBox." },
        ],
        niveaux: [
          { comp: 'administrer', avant: 'Initiation', apres: 'Intermédiaire' },
        ],
        perspectives: "Automatiser la configuration avec un outil comme Ansible pour reproduire l'environnement sans erreur manuelle." },
      { id: 'S2.04', slug: 's2-04', title: "Exploitation d'une base de données",
        summary: "Prise en main d'une base de données existante et rédaction de requêtes SQL de complexité croissante : jointures, agrégations, sous-requêtes.", github: null,
        skills: ['sql'],
        objectifs: "Prendre en main une base de données existante (schéma fourni) et en extraire des informations utiles via des requêtes SQL de complexité croissante.",
        recit: "La SAÉ partait d'une base déjà construite, avec plusieurs tables liées, dont nous n'avions pas fait la conception. L'exercice consistait à écrire des requêtes allant du SELECT simple jusqu'aux jointures multi-tables et aux agrégations.",
        taches: {
          individuel: [
            "Requêtes SELECT avec filtres et tris.",
            "Jointures multi-tables (INNER JOIN, LEFT JOIN).",
            "Agrégations (GROUP BY, HAVING) et sous-requêtes imbriquées.",
          ],
          collectif: [
            "Analyse du schéma existant pour comprendre les relations.",
            "Vérification croisée des résultats entre binômes.",
          ],
        },
        difficultes: [
          { probleme: "Comprendre le sens des relations entre tables sans documentation fournie.", solution: "Lire les contraintes de clé étrangère et interroger la base avec de petites requêtes de découverte avant d'écrire les requêtes complexes." },
        ],
        niveaux: [
          { comp: 'gerer', avant: 'Intermédiaire', apres: 'Intermédiaire' },
        ],
        perspectives: "M'exercer davantage sur les vues et les transactions pour aller au-delà des requêtes de lecture pure." },
      { id: 'S2.05', slug: 's2-05', title: "Gestion d'un projet",
        summary: "Production d'un plan de projet complet à partir d'un cahier des charges : découpage, planification, estimation et gestion des risques.", github: null,
        objectifs: "Produire, à partir d'un cahier des charges, un plan de projet complet : découpage des tâches, estimation des charges, planification et identification des risques.",
        recit: "En groupe, nous avons analysé un besoin client fictif et produit les livrables de gestion de projet : diagramme de Gantt, répartition des rôles, registre des risques et plan de suivi de l'avancement.",
        taches: {
          individuel: [
            "Identification et documentation des risques principaux.",
            "Estimation de la charge de certaines tâches.",
          ],
          collectif: [
            "Découpage du projet en lots et sous-tâches.",
            "Construction du diagramme de Gantt.",
            "Présentation du plan de projet.",
          ],
        },
        difficultes: [
          { probleme: "Sous-estimer la durée des tâches techniques, notamment l'intégration et les tests.", solution: "Appliquer un coefficient de révision sur les estimations initiales et ajouter des marges de sécurité explicites." },
        ],
        niveaux: [
          { comp: 'conduire', avant: 'Initiation', apres: 'Intermédiaire' },
        ],
        perspectives: "Confronter les estimations à un vrai projet pour calibrer ma perception du temps nécessaire sur chaque type de tâche." },
      { id: 'S2.06', slug: 's2-06', title: "Organisation d'un travail d'équipe",
        summary: "Bilan des travaux en équipe du BUT1 : analyse des points forts, des difficultés rencontrées et pistes d'amélioration pour le BUT2.", github: null,
        objectifs: "Prendre du recul sur les différents travaux en équipe menés durant les deux semestres et identifier des pratiques concrètes à améliorer pour les projets futurs.",
        recit: "SAÉ transversale de fin de BUT1 : rédaction d'un bilan personnel sur les collaborations vécues, identification de ce qui avait bien fonctionné et des difficultés rencontrées, puis propositions de pratiques à adopter pour la deuxième année.",
        taches: {
          individuel: [
            "Analyse personnelle des points forts et axes de progrès dans les différentes SAÉ.",
            "Rédaction du rapport de retour d'expérience.",
          ],
          collectif: [
            "Échange en groupe sur les dysfonctionnements rencontrés.",
            "Définition collective de règles de travail pour le BUT2.",
          ],
        },
        difficultes: [
          { probleme: "S'évaluer objectivement sans tomber dans l'autocritique excessive ou l'autosatisfaction.", solution: "Se concentrer sur les faits observés (ce qui s'est passé concrètement) plutôt que sur les jugements." },
        ],
        niveaux: [
          { comp: 'collaborer', avant: 'Intermédiaire', apres: 'Intermédiaire' },
        ],
        perspectives: "Mettre en pratique les pistes identifiées dès le début du BUT2, notamment sur la communication et l'utilisation de Git en équipe." },
    ],
    but2: [
      { id: 'S3.01', slug: 's3-01', title: "Développement d'une application",
        summary: "Application de suivi de colis pour le service reprographie de l'IUT de Villetaneuse, du bon de commande à la livraison finale.",
        skills: ['python', 'web', 'sql'],
        competences: ['realiser', 'gerer', 'collaborer', 'administrer', 'conduire'],
        github: 'https://github.com/Fares-bna/S3.01_SAE-Colis',
        objectifs: "Centraliser le suivi des colis du service reprographie de l'IUT, du bon de commande à la livraison finale, afin de réduire les erreurs de distribution, les délais et la saisie manuelle.",
        recit: "Le projet a été mené à cinq, sur environ 145 heures réparties en cinq phases : analyse et conception, mise en place, développement, tests et documentation. Nous avons construit l'application autour de quatre rôles (demandeur, rédacteur, gestionnaire de colis, administrateur), chacun avec ses droits et ses écrans, sur une architecture MVC en Flask reliée à une base MySQL et déployée avec Docker.",
        role: "J'étais responsable de la partie front-end : intégration des maquettes, CSS et conception responsive de l'interface, y compris l'affichage adapté au mobile pour le scan des colis en entrepôt (32 h sur le projet).",
        taches: {
          individuel: [
            "Intégration de l'interface (HTML, CSS, templates Jinja).",
            "Conception responsive, notamment l'affichage mobile pour la réception des colis.",
            "Mise en cohérence visuelle des écrans selon les quatre rôles utilisateurs.",
          ],
          collectif: [
            "Rédaction du cahier des charges et des maquettes.",
            "Modélisation de la base de données MySQL (neuf tables liées).",
            "Architecture MVC avec couche service et authentification via le CAS de l'université.",
            "Conteneurisation et déploiement de l'application avec Docker.",
          ],
        },
        difficultes: [
          { probleme: "Coordonner cinq personnes sur une même base de code sans conflits.",
            solution: "Utilisation systématique de Git avec des branches et une répartition claire des responsabilités dès le départ." },
          { probleme: "Rendre l'interface utilisable aussi bien sur poste fixe que sur mobile pour le scan en entrepôt.",
            solution: "Conception responsive avec des points de rupture adaptés et des tests sur plusieurs tailles d'écran." },
        ],
        niveaux: [
          { comp: 'realiser', avant: 'Intermédiaire', apres: 'Maîtrise' },
          { comp: 'gerer', avant: 'Intermédiaire', apres: 'Maîtrise' },
          { comp: 'collaborer', avant: 'Intermédiaire', apres: 'Maîtrise' },
          { comp: 'administrer', avant: 'Initiation', apres: 'Intermédiaire' },
          { comp: 'conduire', avant: 'Initiation', apres: 'Intermédiaire' },
        ],
        perspectives: "Avec du recul, je structurerais l'architecture front dès le début pour limiter les reprises. La suite du projet (S4.01) m'a justement permis de reprendre cette base et de l'améliorer.",
      },
      { id: 'S4.01', slug: 's4-01', title: "Développement d'une application complexe",
        summary: "Suite du projet Colis (S3.01) : reprise par un nouveau groupe, correction des bugs et améliorations ciblées.",
        github: 'https://github.com/My19a/Suite_Projet_Colis',
        skills: ['php', 'web', 'sql'],
        competences: ['realiser', 'collaborer', 'administrer'],
        objectifs: "Reprendre l'application Colis développée en S3.01, en analyser le code existant, en corriger les bugs et les incohérences, et l'améliorer selon les retours du commanditaire.",
        recit: "La SAÉ S4.01 est la continuité directe du projet S3.01 : un nouveau groupe récupère le code, doit le maîtriser, corriger les problèmes signalés et apporter des améliorations ciblées. Le défi est autant technique — reprendre un code qu'on n'a pas écrit — qu'organisationnel.",
        role: "Audit et amélioration de la partie front-end, correction des incohérences visuelles et adaptation de l'interface aux nouvelles fonctionnalités.",
        taches: {
          individuel: [
            "Audit du code front-end et recensement des incohérences visuelles.",
            "Corrections CSS et amélioration de l'accessibilité.",
            "Adaptation des templates aux nouvelles routes.",
          ],
          collectif: [
            "Analyse des bugs remontés par le commanditaire.",
            "Correction de la logique métier et des routes.",
            "Tests d'intégration et validation en environnement Docker.",
          ],
        },
        difficultes: [
          { probleme: "Prendre en main un code écrit par une autre équipe, sans documentation détaillée.", solution: "Lecture du code source, exécution pas à pas et rédaction progressive de la documentation manquante." },
          { probleme: "Distinguer les bugs liés à l'environnement (Docker, base de données) des bugs applicatifs.", solution: "Tests isolés en local puis dans le container pour identifier la couche concernée." },
        ],
        niveaux: [
          { comp: 'realiser', avant: 'Maîtrise', apres: 'Maîtrise' },
          { comp: 'collaborer', avant: 'Maîtrise', apres: 'Maîtrise' },
          { comp: 'administrer', avant: 'Intermédiaire', apres: 'Intermédiaire' },
        ],
        perspectives: "Documenter le code plus systématiquement dès le départ pour faciliter la reprise par les équipes suivantes." },
    ],
  },
};
