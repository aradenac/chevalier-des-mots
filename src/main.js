const item = (text, target, feedbackOk, feedbackKo, correction, category) => ({ text, target, feedbackOk, feedbackKo, correction, category });
const level = (id, title, instruction, shortInstruction, difficulty, starsToWin, maxActiveWords, fallSpeed, items) => ({ id, title, instruction, shortInstruction, difficulty, starsToWin, maxActiveWords, fallSpeed, items });

const LEVELS = [
  level(1, "Les mots mal écrits", "Tranche les mots qui ne sont pas bien orthographiés.", "Tranche les mots mal écrits", "facile", 5, 3, 42, [
    item("chatt", true, "Bien joué ! On écrit : chat", "Oups, ce mot était une cible.", "chat", "orthographe"),
    item("chat", false, "Ce mot était déjà correct.", "Oups, celui-ci était déjà correct", undefined, "orthographe"),
    item("méson", true, "Bien joué ! On écrit : maison", "Oups, ce mot était une cible.", "maison", "orthographe"),
    item("maison", false, "Ce mot était déjà correct.", "Oups, celui-ci était déjà correct", undefined, "orthographe"),
    item("chevau", true, "Bien joué ! On écrit : cheval", "Oups, ce mot était une cible.", "cheval", "orthographe"),
    item("cheval", false, "Ce mot était déjà correct.", "Oups, celui-ci était déjà correct", undefined, "orthographe"),
    item("lapain", true, "Bien joué ! On écrit : lapin", "Oups, ce mot était une cible.", "lapin", "orthographe"),
    item("lapin", false, "Ce mot était déjà correct.", "Oups, celui-ci était déjà correct", undefined, "orthographe")
  ]),
  level(2, "Les lettres en trop", "Tranche les mots qui ont une lettre en trop.", "Tranche les lettres en trop", "facile", 5, 3, 44, [
    item("arbbre", true, "Oui ! Une lettre était en trop : arbre", "Ce mot avait une lettre en trop.", "arbre", "lettre en trop"),
    item("arbre", false, "Arbre est bien écrit.", "Oups, arbre était déjà correct", undefined, "mot correct"),
    item("solleil", true, "Oui ! On écrit : soleil", "Ce mot avait une lettre en trop.", "soleil", "lettre en trop"),
    item("soleil", false, "Soleil est bien écrit.", "Oups, soleil était déjà correct", undefined, "mot correct"),
    item("ballon", false, "Ballon est bien écrit.", "Oups, ballon était déjà correct", undefined, "mot correct"),
    item("balllon", true, "Oui ! On écrit : ballon", "Ce mot avait une lettre en trop.", "ballon", "lettre en trop"),
    item("pomme", false, "Pomme est bien écrit.", "Oups, pomme était déjà correct", undefined, "mot correct"),
    item("pommme", true, "Oui ! On écrit : pomme", "Ce mot avait une lettre en trop.", "pomme", "lettre en trop")
  ]),
  level(3, "Les lettres manquantes", "Tranche les mots auxquels il manque une lettre.", "Tranche les lettres manquantes", "facile", 5, 3, 46, [
    item("cha", true, "Exact ! Il manquait t : chat", "Il manquait une lettre à ce mot.", "chat", "lettre manquante"),
    item("chat", false, "Chat est complet.", "Oups, chat était déjà complet", undefined, "mot complet"),
    item("maisn", true, "Exact ! Il manquait o : maison", "Il manquait une lettre à ce mot.", "maison", "lettre manquante"),
    item("maison", false, "Maison est complet.", "Oups, maison était déjà complet", undefined, "mot complet"),
    item("cheva", true, "Exact ! Il manquait l : cheval", "Il manquait une lettre à ce mot.", "cheval", "lettre manquante"),
    item("cheval", false, "Cheval est complet.", "Oups, cheval était déjà complet", undefined, "mot complet"),
    item("solei", true, "Exact ! Il manquait l : soleil", "Il manquait une lettre à ce mot.", "soleil", "lettre manquante"),
    item("soleil", false, "Soleil est complet.", "Oups, soleil était déjà complet", undefined, "mot complet")
  ]),
  level(4, "Les accents", "Tranche les mots où l'accent est absent ou incorrect.", "Tranche les accents faux", "facile", 5, 3, 48, [
    item("ecole", true, "Bravo ! On écrit : école", "Il fallait ajouter l'accent.", "école", "accent"),
    item("école", false, "École a le bon accent.", "Oups, école avait déjà son accent", undefined, "accent correct"),
    item("elephant", true, "Bravo ! On écrit : éléphant", "Il fallait ajouter les accents.", "éléphant", "accent"),
    item("éléphant", false, "Éléphant est bien accentué.", "Oups, éléphant était correct", undefined, "accent correct"),
    item("fenetre", true, "Bravo ! On écrit : fenêtre", "Il fallait ajouter l'accent.", "fenêtre", "accent"),
    item("fenêtre", false, "Fenêtre est bien accentué.", "Oups, fenêtre était correct", undefined, "accent correct"),
    item("gateau", true, "Bravo ! On écrit : gâteau", "Il fallait ajouter l'accent.", "gâteau", "accent"),
    item("gâteau", false, "Gâteau est bien accentué.", "Oups, gâteau était correct", undefined, "accent correct")
  ]),
  level(5, "Les noms communs", "Tranche les noms communs : une personne, un animal, un lieu ou une chose.", "Tranche les noms communs", "facile", 6, 3, 50, [
    item("dragon", true, "Oui ! Dragon est un nom commun.", "Dragon était un nom commun.", undefined, "nom"),
    item("courir", false, "Courir est un verbe.", "Oups, courir est un verbe", undefined, "verbe"),
    item("château", true, "Oui ! Château est un nom commun.", "Château était un nom commun.", undefined, "nom"),
    item("beau", false, "Beau est un adjectif.", "Oups, beau est un adjectif", undefined, "adjectif"),
    item("livre", true, "Oui ! Livre est un nom commun.", "Livre était un nom commun.", undefined, "nom"),
    item("vite", false, "Vite est un adverbe.", "Oups, vite est un adverbe", undefined, "adverbe"),
    item("jardin", true, "Oui ! Jardin est un nom commun.", "Jardin était un nom commun.", undefined, "nom"),
    item("elle", false, "Elle est un pronom.", "Oups, elle est un pronom", undefined, "pronom")
  ]),
  level(6, "Les verbes simples", "Tranche les verbes : les mots qui disent une action.", "Tranche les verbes", "facile", 6, 3, 52, [
    item("manger", true, "Oui ! Manger est un verbe.", "Manger était un verbe.", undefined, "verbe"),
    item("table", false, "Table est un nom.", "Oups, table est un nom", undefined, "nom"),
    item("sauter", true, "Oui ! Sauter est un verbe.", "Sauter était un verbe.", undefined, "verbe"),
    item("bleu", false, "Bleu est un adjectif.", "Oups, bleu est un adjectif", undefined, "adjectif"),
    item("dormir", true, "Oui ! Dormir est un verbe.", "Dormir était un verbe.", undefined, "verbe"),
    item("cartable", false, "Cartable est un nom.", "Oups, cartable est un nom", undefined, "nom"),
    item("chanter", true, "Oui ! Chanter est un verbe.", "Chanter était un verbe.", undefined, "verbe"),
    item("petit", false, "Petit est un adjectif.", "Oups, petit est un adjectif", undefined, "adjectif")
  ]),
  level(7, "Les adjectifs", "Tranche les adjectifs : ils donnent une précision sur un nom.", "Tranche les adjectifs", "facile", 6, 3, 54, [
    item("rapide", true, "Oui ! Rapide est un adjectif.", "Rapide était un adjectif.", undefined, "adjectif"),
    item("cheval", false, "Cheval est un nom.", "Oups, cheval est un nom", undefined, "nom"),
    item("joyeux", true, "Oui ! Joyeux est un adjectif.", "Joyeux était un adjectif.", undefined, "adjectif"),
    item("chanter", false, "Chanter est un verbe.", "Oups, chanter est un verbe", undefined, "verbe"),
    item("grand", true, "Oui ! Grand est un adjectif.", "Grand était un adjectif.", undefined, "adjectif"),
    item("forêt", false, "Forêt est un nom.", "Oups, forêt est un nom", undefined, "nom"),
    item("magique", true, "Oui ! Magique est un adjectif.", "Magique était un adjectif.", undefined, "adjectif"),
    item("lentement", false, "Lentement est un adverbe.", "Oups, lentement est un adverbe", undefined, "adverbe")
  ]),
  level(8, "Les déterminants", "Tranche les déterminants placés devant un nom.", "Tranche les déterminants", "moyen", 6, 4, 56, [
    item("le", true, "Oui ! Le est un déterminant.", "Le était un déterminant.", undefined, "déterminant"),
    item("dragon", false, "Dragon est un nom.", "Oups, dragon est un nom", undefined, "nom"),
    item("une", true, "Oui ! Une est un déterminant.", "Une était un déterminant.", undefined, "déterminant"),
    item("courir", false, "Courir est un verbe.", "Oups, courir est un verbe", undefined, "verbe"),
    item("des", true, "Oui ! Des est un déterminant.", "Des était un déterminant.", undefined, "déterminant"),
    item("joli", false, "Joli est un adjectif.", "Oups, joli est un adjectif", undefined, "adjectif"),
    item("mon", true, "Oui ! Mon est un déterminant.", "Mon était un déterminant.", undefined, "déterminant"),
    item("nous", false, "Nous est un pronom.", "Oups, nous est un pronom", undefined, "pronom")
  ]),
  level(9, "Les pronoms personnels", "Tranche les pronoms personnels : je, tu, il, nous...", "Tranche les pronoms", "moyen", 6, 4, 58, [
    item("je", true, "Oui ! Je est un pronom personnel.", "Je était un pronom personnel.", undefined, "pronom"),
    item("maison", false, "Maison est un nom.", "Oups, maison est un nom", undefined, "nom"),
    item("tu", true, "Oui ! Tu est un pronom personnel.", "Tu était un pronom personnel.", undefined, "pronom"),
    item("avec", false, "Avec est une préposition.", "Oups, avec est une préposition", undefined, "préposition"),
    item("nous", true, "Oui ! Nous est un pronom personnel.", "Nous était un pronom personnel.", undefined, "pronom"),
    item("rapide", false, "Rapide est un adjectif.", "Oups, rapide est un adjectif", undefined, "adjectif"),
    item("elles", true, "Oui ! Elles est un pronom personnel.", "Elles était un pronom personnel.", undefined, "pronom"),
    item("chanter", false, "Chanter est un verbe.", "Oups, chanter est un verbe", undefined, "verbe")
  ]),
  level(10, "Les adverbes", "Tranche les adverbes : ils précisent souvent un verbe.", "Tranche les adverbes", "moyen", 6, 4, 60, [
    item("vite", true, "Oui ! Vite est un adverbe.", "Vite était un adverbe.", undefined, "adverbe"),
    item("rapide", false, "Rapide est un adjectif.", "Oups, rapide est un adjectif", undefined, "adjectif"),
    item("lentement", true, "Oui ! Lentement est un adverbe.", "Lentement était un adverbe.", undefined, "adverbe"),
    item("dragon", false, "Dragon est un nom.", "Oups, dragon est un nom", undefined, "nom"),
    item("souvent", true, "Oui ! Souvent est un adverbe.", "Souvent était un adverbe.", undefined, "adverbe"),
    item("sauter", false, "Sauter est un verbe.", "Oups, sauter est un verbe", undefined, "verbe"),
    item("demain", true, "Oui ! Demain peut être un adverbe.", "Demain était la cible.", undefined, "adverbe"),
    item("petit", false, "Petit est un adjectif.", "Oups, petit est un adjectif", undefined, "adjectif")
  ]),
  level(11, "Les prépositions", "Tranche les prépositions : à, de, dans, avec...", "Tranche les prépositions", "moyen", 6, 4, 62, [
    item("dans", true, "Oui ! Dans est une préposition.", "Dans était une préposition.", undefined, "préposition"),
    item("courir", false, "Courir est un verbe.", "Oups, courir est un verbe", undefined, "verbe"),
    item("avec", true, "Oui ! Avec est une préposition.", "Avec était une préposition.", undefined, "préposition"),
    item("nous", false, "Nous est un pronom.", "Oups, nous est un pronom", undefined, "pronom"),
    item("chez", true, "Oui ! Chez est une préposition.", "Chez était une préposition.", undefined, "préposition"),
    item("le", false, "Le est un déterminant.", "Oups, le est un déterminant", undefined, "déterminant"),
    item("pour", true, "Oui ! Pour est une préposition.", "Pour était une préposition.", undefined, "préposition"),
    item("joyeux", false, "Joyeux est un adjectif.", "Oups, joyeux est un adjectif", undefined, "adjectif")
  ]),
  level(12, "Les conjonctions", "Tranche les conjonctions qui relient des mots ou des phrases.", "Tranche les conjonctions", "moyen", 6, 4, 64, [
    item("et", true, "Oui ! Et est une conjonction.", "Et était une conjonction.", undefined, "conjonction"),
    item("dans", false, "Dans est une préposition.", "Oups, dans est une préposition", undefined, "préposition"),
    item("mais", true, "Oui ! Mais est une conjonction.", "Mais était une conjonction.", undefined, "conjonction"),
    item("vite", false, "Vite est un adverbe.", "Oups, vite est un adverbe", undefined, "adverbe"),
    item("ou", true, "Oui ! Ou est une conjonction.", "Ou était une conjonction.", undefined, "conjonction"),
    item("maison", false, "Maison est un nom.", "Oups, maison est un nom", undefined, "nom"),
    item("car", true, "Oui ! Car est une conjonction.", "Car était une conjonction.", undefined, "conjonction"),
    item("elle", false, "Elle est un pronom.", "Oups, elle est un pronom", undefined, "pronom")
  ]),
  level(13, "Les verbes à l’infinitif", "Tranche les verbes à l'infinitif : ils finissent souvent par -er, -ir, -re.", "Tranche les infinitifs", "moyen", 7, 4, 66, [
    item("manger", true, "Oui ! Manger est à l'infinitif.", "Manger était à l'infinitif.", undefined, "infinitif"),
    item("je mange", false, "Je mange est conjugué.", "Oups, je mange est conjugué", undefined, "conjugué"),
    item("finir", true, "Oui ! Finir est à l'infinitif.", "Finir était à l'infinitif.", undefined, "infinitif"),
    item("nous finissons", false, "Nous finissons est conjugué.", "Oups, nous finissons est conjugué", undefined, "conjugué"),
    item("prendre", true, "Oui ! Prendre est à l'infinitif.", "Prendre était à l'infinitif.", undefined, "infinitif"),
    item("tu prends", false, "Tu prends est conjugué.", "Oups, tu prends est conjugué", undefined, "conjugué"),
    item("voir", true, "Oui ! Voir est à l'infinitif.", "Voir était à l'infinitif.", undefined, "infinitif"),
    item("ils voient", false, "Ils voient est conjugué.", "Oups, ils voient est conjugué", undefined, "conjugué")
  ]),
  level(14, "Les verbes conjugués", "Tranche les verbes conjugués avec un sujet.", "Tranche les verbes conjugués", "moyen", 7, 4, 68, [
    item("je joue", true, "Oui ! Je joue est conjugué.", "Je joue était conjugué.", undefined, "conjugué"),
    item("jouer", false, "Jouer est à l'infinitif.", "Oups, jouer est à l'infinitif", undefined, "infinitif"),
    item("tu lis", true, "Oui ! Tu lis est conjugué.", "Tu lis était conjugué.", undefined, "conjugué"),
    item("lire", false, "Lire est à l'infinitif.", "Oups, lire est à l'infinitif", undefined, "infinitif"),
    item("nous chantons", true, "Oui ! Nous chantons est conjugué.", "Nous chantons était conjugué.", undefined, "conjugué"),
    item("chanter", false, "Chanter est à l'infinitif.", "Oups, chanter est à l'infinitif", undefined, "infinitif"),
    item("elles courent", true, "Oui ! Elles courent est conjugué.", "Elles courent était conjugué.", undefined, "conjugué"),
    item("courir", false, "Courir est à l'infinitif.", "Oups, courir est à l'infinitif", undefined, "infinitif")
  ]),
  level(15, "Les verbes au présent", "Tranche les verbes conjugués au présent.", "Tranche le présent", "difficile", 7, 5, 70, [
    item("je chante", true, "Oui ! C'est du présent.", "Je chante était au présent.", undefined, "présent"),
    item("je chanterai", false, "Je chanterai est au futur.", "Oups, je chanterai est au futur", undefined, "futur"),
    item("nous lisons", true, "Oui ! C'est du présent.", "Nous lisons était au présent.", undefined, "présent"),
    item("nous avons lu", false, "Nous avons lu est au passé composé.", "Oups, nous avons lu est au passé composé", undefined, "passé composé"),
    item("tu regardes", true, "Oui ! C'est du présent.", "Tu regardes était au présent.", undefined, "présent"),
    item("tu regarderas", false, "Tu regarderas est au futur.", "Oups, tu regarderas est au futur", undefined, "futur"),
    item("elles jouent", true, "Oui ! C'est du présent.", "Elles jouent était au présent.", undefined, "présent"),
    item("elles ont joué", false, "Elles ont joué est au passé composé.", "Oups, elles ont joué est au passé composé", undefined, "passé composé")
  ]),
  level(16, "Les verbes au futur", "Tranche les verbes conjugués au futur.", "Tranche le futur", "difficile", 7, 5, 72, [
    item("je marcherai", true, "Oui ! C'est du futur.", "Je marcherai était au futur.", undefined, "futur"),
    item("je marche", false, "Je marche est au présent.", "Oups, je marche est au présent", undefined, "présent"),
    item("tu finiras", true, "Oui ! C'est du futur.", "Tu finiras était au futur.", undefined, "futur"),
    item("tu finis", false, "Tu finis est au présent.", "Oups, tu finis est au présent", undefined, "présent"),
    item("nous irons", true, "Oui ! C'est du futur.", "Nous irons était au futur.", undefined, "futur"),
    item("nous allons", false, "Nous allons est au présent.", "Oups, nous allons est au présent", undefined, "présent"),
    item("elles auront", true, "Oui ! C'est du futur.", "Elles auront était au futur.", undefined, "futur"),
    item("elles ont", false, "Elles ont est au présent.", "Oups, elles ont est au présent", undefined, "présent")
  ]),
  level(17, "Les verbes au passé composé", "Tranche les verbes au passé composé avec avoir ou être.", "Tranche le passé composé", "difficile", 7, 5, 74, [
    item("j'ai chanté", true, "Oui ! C'est du passé composé.", "J'ai chanté était au passé composé.", undefined, "passé composé"),
    item("je chante", false, "Je chante est au présent.", "Oups, je chante est au présent", undefined, "présent"),
    item("tu es parti", true, "Oui ! C'est du passé composé.", "Tu es parti était au passé composé.", undefined, "passé composé"),
    item("tu partiras", false, "Tu partiras est au futur.", "Oups, tu partiras est au futur", undefined, "futur"),
    item("nous avons vu", true, "Oui ! C'est du passé composé.", "Nous avons vu était au passé composé.", undefined, "passé composé"),
    item("nous voyons", false, "Nous voyons est au présent.", "Oups, nous voyons est au présent", undefined, "présent"),
    item("elles sont venues", true, "Oui ! C'est du passé composé.", "Elles sont venues était au passé composé.", undefined, "passé composé"),
    item("elles viendront", false, "Elles viendront est au futur.", "Oups, elles viendront est au futur", undefined, "futur")
  ]),
  level(18, "Les accords sujet-verbe", "Tranche les phrases où le sujet et le verbe ne sont pas accordés.", "Tranche les mauvais accords", "difficile", 7, 5, 76, [
    item("Les enfants joue", true, "Bien vu ! On écrit : Les enfants jouent", "L'accord était faux.", "Les enfants jouent", "accord faux"),
    item("Les enfants jouent", false, "Cette phrase est bien accordée.", "Oups, l'accord était déjà correct", undefined, "accord correct"),
    item("Le chat dorment", true, "Bien vu ! On écrit : Le chat dort", "L'accord était faux.", "Le chat dort", "accord faux"),
    item("Le chat dort", false, "Cette phrase est bien accordée.", "Oups, l'accord était déjà correct", undefined, "accord correct"),
    item("Nous mange", true, "Bien vu ! On écrit : Nous mangeons", "L'accord était faux.", "Nous mangeons", "accord faux"),
    item("Nous mangeons", false, "Cette phrase est bien accordée.", "Oups, l'accord était déjà correct", undefined, "accord correct"),
    item("Tu regardent", true, "Bien vu ! On écrit : Tu regardes", "L'accord était faux.", "Tu regardes", "accord faux"),
    item("Tu regardes", false, "Cette phrase est bien accordée.", "Oups, l'accord était déjà correct", undefined, "accord correct")
  ]),
  level(19, "Les homophones", "Tranche les phrases où l'homophone n'est pas le bon.", "Tranche les homophones faux", "difficile", 8, 5, 78, [
    item("Il a un chien", false, "Cette phrase utilise le bon a.", "Oups, cette phrase était correcte", undefined, "homophone correct"),
    item("Il à un chien", true, "Oui ! On écrit : Il a un chien", "L'homophone était faux.", "Il a un chien", "homophone faux"),
    item("Je vais à Paris", false, "Cette phrase utilise le bon à.", "Oups, cette phrase était correcte", undefined, "homophone correct"),
    item("Je vais a Paris", true, "Oui ! On écrit : Je vais à Paris", "L'homophone était faux.", "Je vais à Paris", "homophone faux"),
    item("Son vélo est rouge", false, "Cette phrase utilise le bon son.", "Oups, cette phrase était correcte", undefined, "homophone correct"),
    item("Sont vélo est rouge", true, "Oui ! On écrit : Son vélo est rouge", "L'homophone était faux.", "Son vélo est rouge", "homophone faux"),
    item("Ils sont contents", false, "Cette phrase utilise le bon sont.", "Oups, cette phrase était correcte", undefined, "homophone correct"),
    item("Ils son contents", true, "Oui ! On écrit : Ils sont contents", "L'homophone était faux.", "Ils sont contents", "homophone faux")
  ]),
  level(20, "Le défi du chevalier", "Tranche toutes les erreurs : orthographe, nature des mots, conjugaison et accords.", "Tranche toutes les erreurs", "expert", 10, 5, 82, [
    item("Le cheval courent vite", true, "Bravo ! On écrit : Le cheval court vite", "Il y avait une erreur d'accord.", "Le cheval court vite", "accord"),
    item("Le cheval court vite", false, "Phrase correcte, rien à trancher.", "Oups, cette phrase était correcte", undefined, "phrase correcte"),
    item("Les fleurs son belles", true, "Bravo ! On écrit : Les fleurs sont belles", "Il y avait un homophone faux.", "Les fleurs sont belles", "homophone"),
    item("Les fleurs sont belles", false, "Phrase correcte, rien à trancher.", "Oups, cette phrase était correcte", undefined, "phrase correcte"),
    item("J'ai mangé une pomme", false, "Phrase correcte, rien à trancher.", "Oups, cette phrase était correcte", undefined, "phrase correcte"),
    item("J'est mangé une pomme", true, "Bravo ! On écrit : J'ai mangé une pomme", "Il y avait une erreur de conjugaison.", "J'ai mangé une pomme", "conjugaison"),
    item("Le dragon magique", false, "Groupe de mots correct.", "Oups, c'était correct", undefined, "correct"),
    item("Le dragon magik", true, "Bravo ! On écrit : Le dragon magique", "Il y avait une erreur d'orthographe.", "Le dragon magique", "orthographe"),
    item("Nous irons au château", false, "Phrase correcte, rien à trancher.", "Oups, cette phrase était correcte", undefined, "phrase correcte"),
    item("Nous irons au chateau", true, "Bravo ! On écrit : Nous irons au château", "Il manquait un accent.", "Nous irons au château", "accent")
  ])
];

const game = document.getElementById("game");
const arena = document.getElementById("arena");
const knight = document.getElementById("knight");
const message = document.getElementById("message");
const starsEl = document.getElementById("stars");
const levelInfo = document.getElementById("levelInfo");
const instruction = document.getElementById("instruction");
const menuBtn = document.getElementById("menuBtn");
const pauseBtn = document.getElementById("pauseBtn");
const voiceBtn = document.getElementById("voiceBtn");
const startOverlay = document.getElementById("startOverlay");
const selectOverlay = document.getElementById("selectOverlay");
const levelOverlay = document.getElementById("levelOverlay");
const gamepadStatus = document.getElementById("gamepadStatus");
const levelGrid = document.getElementById("levelGrid");
const startSubtitle = document.getElementById("startSubtitle");

let state = "menu";
let veryEasy = false;
let currentLevelIndex = 0;
let stars = 0;
let knightX = window.innerWidth / 2;
let moveLeft = false;
let moveRight = false;
let activeWords = [];
let lastTime = 0;
let spawnTimer = 0;
let wordIndex = 0;
let targetRetryQueue = [];
let audioContext = null;
let previousPadStrike = false;
let previousPadStart = false;
const narration = {
  available: "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
  enabled: false,
  unlocked: false,
  voices: [],
  voice: null
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getLevel() {
  return LEVELS[currentLevelIndex];
}

function initNarration() {
  try {
    narration.enabled = localStorage.getItem("chevalierNarration") !== "off";
  } catch {
    narration.enabled = true;
  }
  console.log("[Narration] disponible:", narration.available);
  console.log("[Narration] activée:", narration.enabled);
  console.log("[Narration] déverrouillée:", narration.unlocked);
  updateNarrationButton();
  if (!narration.available) return;
  loadVoices();
  if (window.speechSynthesis.addEventListener) {
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
  } else {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

function unlockNarration() {
  if (!narration.available) return;
  narration.unlocked = true;
  window.speechSynthesis.resume();
  loadVoices();
  console.log("[Narration] déverrouillée:", narration.unlocked);
}

function loadVoices() {
  if (!narration.available) return [];
  narration.voices = window.speechSynthesis.getVoices();
  narration.voice = pickFrenchVoice();
  console.log("[Narration] voix disponibles:", narration.voices.length);
  if (narration.voice) {
    console.log("[Narration] voix choisie:", narration.voice.name, narration.voice.lang);
  } else {
    console.warn("[Narration] aucune voix disponible");
  }
  return narration.voices;
}

function pickFrenchVoice() {
  const voices = narration.voices || [];
  return voices.find(voice => voice.lang === "fr-FR")
    || voices.find(voice => voice.lang && voice.lang.toLowerCase().startsWith("fr"))
    || voices.find(voice => /french|français|francais/i.test(voice.name || ""))
    || voices.find(voice => voice.default)
    || voices[0]
    || null;
}

function narrate(text, options = {}) {
  if (!narration.available || !narration.enabled || !narration.unlocked || !text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = narration.voice || pickFrenchVoice();
  utterance.lang = voice && voice.lang ? voice.lang : "fr-FR";
  utterance.rate = options.rate || 0.95;
  utterance.pitch = options.pitch || 1;
  if (voice) utterance.voice = voice;
  utterance.onstart = () => console.log("[Narration] start");
  utterance.onend = () => console.log("[Narration] end");
  utterance.onerror = event => console.warn("[Narration] error:", event.error);
  console.log("[Narration] speak:", text);
  window.speechSynthesis.resume();
  if (options.mode === "queue") {
    window.speechSynthesis.speak(utterance);
  } else {
    window.speechSynthesis.cancel();
    setTimeout(() => window.speechSynthesis.speak(utterance), 40);
  }
}

function stopNarration() {
  if (narration.available) window.speechSynthesis.cancel();
}

function enableNarration() {
  narration.enabled = true;
  try {
    localStorage.setItem("chevalierNarration", "on");
  } catch {}
  updateNarrationButton();
  console.log("[Narration] activée:", narration.enabled);
  unlockNarration();
  narrate("Voix activée.");
}

function disableNarration() {
  narration.enabled = false;
  try {
    localStorage.setItem("chevalierNarration", "off");
  } catch {}
  stopNarration();
  updateNarrationButton();
  console.log("[Narration] activée:", narration.enabled);
}

function toggleNarration() {
  if (narration.enabled) {
    disableNarration();
  } else {
    enableNarration();
  }
}

function updateNarrationButton() {
  if (!voiceBtn) return;
  if (!narration.available) {
    voiceBtn.disabled = true;
    voiceBtn.textContent = "Voix indisponible";
    voiceBtn.setAttribute("aria-label", "Narration vocale indisponible");
    return;
  }
  voiceBtn.disabled = false;
  voiceBtn.textContent = narration.enabled ? "Désactiver la voix" : "Activer la voix";
  voiceBtn.setAttribute("aria-label", narration.enabled ? "Désactiver la narration vocale" : "Activer la narration vocale");
}

window.testNarration = function() {
  enableNarration();
  narrate("Bonjour chevalier. La voix fonctionne.");
};

function shortFeedback(text) {
  return (text || "").split(/[.!?]/)[0].trim() || text;
}

function setMessage(text) {
  message.textContent = text;
}

function updateHud() {
  const current = getLevel();
  levelInfo.textContent = "Niveau " + current.id + " · " + current.title;
  instruction.textContent = current.shortInstruction;
  starsEl.textContent = "⭐ " + stars + " / " + current.starsToWin;
  startSubtitle.textContent = "Niveau " + current.id + " : " + current.title;
}

function ensureAudio() {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === "suspended") audioContext.resume();
}

function playSweetSound() {
  ensureAudio();
  const now = audioContext.currentTime;
  [523.25, 659.25, 783.99].forEach((freq, i) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + i * 0.06);
    gain.gain.setValueAtTime(0, now + i * 0.06);
    gain.gain.linearRampToValueAtTime(0.12, now + i * 0.06 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.22);
    osc.connect(gain).connect(audioContext.destination);
    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 0.25);
  });
}

function playSwordSound() {
  ensureAudio();
  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1500, now);
  filter.Q.setValueAtTime(7, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.13, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

  osc.connect(filter).connect(gain).connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + 0.15);
}

function makeConfetti(x, y) {
  const colors = ["#ffd94a", "#ff75b7", "#43c55f", "#3e8cff", "#6849d8", "#ff8b3d"];
  for (let i = 0; i < 22; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = x + "px";
    piece.style.top = y + "px";
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--dx", (Math.random() * 180 - 90) + "px");
    piece.style.setProperty("--dy", (-40 - Math.random() * 120) + "px");
    game.appendChild(piece);
    setTimeout(() => piece.remove(), 900);
  }
}

function makeSlash(x, y) {
  const slash = document.createElement("div");
  slash.className = "slash";
  slash.style.left = x + "px";
  slash.style.top = y + "px";
  game.appendChild(slash);
  setTimeout(() => slash.remove(), 280);
}

function resetWords() {
  activeWords.forEach(w => w.el.remove());
  activeWords = [];
  spawnTimer = 0;
  targetRetryQueue = [];
}

function chooseLevel(index) {
  currentLevelIndex = clamp(index, 0, LEVELS.length - 1);
  startGame(veryEasy);
}

function nextWordData() {
  const current = getLevel();
  if (targetRetryQueue.length && Math.random() < 0.7) {
    return targetRetryQueue.shift();
  }
  const targetItems = current.items.filter(w => w.target);
  const safeItems = current.items.filter(w => !w.target);
  let pool = current.items;
  if (veryEasy && targetItems.length && safeItems.length) {
    pool = Math.random() < 0.76 ? targetItems : safeItems;
  }
  const data = pool[wordIndex % pool.length];
  wordIndex++;
  return data;
}

function spawnWord() {
  const current = getLevel();
  const data = nextWordData();
  const el = document.createElement("div");
  el.className = "word";
  el.textContent = data.text;
  arena.appendChild(el);
  const width = window.innerWidth;
  const speedBase = veryEasy ? Math.max(34, current.fallSpeed - 14) : current.fallSpeed;
  activeWords.push({
    el,
    data,
    x: 90 + Math.random() * Math.max(140, width - 180),
    y: -46,
    speed: speedBase + Math.random() * (veryEasy ? 12 : 24),
    bouncing: 0
  });
}

function bounceWord(word) {
  word.bouncing = .65;
  word.speed = -120;
  word.el.classList.add("bounce");
  setTimeout(() => word.el.classList.remove("bounce"), 580);
}

function strike() {
  if (state !== "playing") return;
  ensureAudio();
  playSwordSound();
  knight.classList.remove("striking");
  void knight.offsetWidth;
  knight.classList.add("striking");

  const swordRect = knight.querySelector(".sword").getBoundingClientRect();
  const swordCenterX = swordRect.left + swordRect.width / 2;
  const swordCenterY = swordRect.top + swordRect.height / 2;
  const hitRangeX = veryEasy ? 150 : 118;
  const hitRangeY = veryEasy ? 190 : 165;
  let hit = null;
  let best = Infinity;
  for (const word of activeWords) {
    const dx = Math.abs(word.x - swordCenterX);
    const dy = Math.abs(word.y - swordCenterY);
    const score = dx + dy * .35;
    if (dx < hitRangeX && dy < hitRangeY && score < best) {
      hit = word;
      best = score;
    }
  }
  makeSlash(knightX + 40, window.innerHeight - 185);
  if (!hit) return;

  const rect = hit.el.getBoundingClientRect();
  if (hit.data.target) {
    stars++;
    updateHud();
    setMessage(hit.data.feedbackOk + (hit.data.correction ? "" : ""));
    narrate(shortFeedback(hit.data.feedbackOk));
    playSweetSound();
    makeConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    hit.el.remove();
    activeWords = activeWords.filter(w => w !== hit);
    if (stars >= getLevel().starsToWin) finishLevel();
  } else {
    bounceWord(hit);
    setMessage(hit.data.feedbackKo);
    narrate(shortFeedback(hit.data.feedbackKo));
  }
}

function finishLevel() {
  const current = getLevel();
  state = "level";
  levelOverlay.classList.remove("hidden");
  resetWords();
  if (currentLevelIndex >= LEVELS.length - 1) {
    document.getElementById("levelTitle").textContent = "Victoire finale !";
    document.getElementById("levelText").textContent = "Le chevalier maîtrise les 20 niveaux des mots.";
    document.getElementById("nextBtn").textContent = "Rejouer";
  } else {
    document.getElementById("levelTitle").textContent = "Bravo !";
    document.getElementById("levelText").textContent = "Niveau " + current.id + " réussi. Prochaine mission : " + LEVELS[currentLevelIndex + 1].title + " !";
    document.getElementById("nextBtn").textContent = "Continuer";
  }
  narrate("Bravo, niveau terminé.");
}

function startGame(easy) {
  veryEasy = easy;
  state = "playing";
  stars = 0;
  knightX = window.innerWidth / 2;
  wordIndex = 0;
  resetWords();
  updateHud();
  startOverlay.classList.add("hidden");
  selectOverlay.classList.add("hidden");
  levelOverlay.classList.add("hidden");
  pauseBtn.classList.remove("paused");
  pauseBtn.textContent = "⏸";
  setMessage(getLevel().instruction);
  unlockNarration();
  narrate(getLevel().instruction);
  ensureAudio();
  spawnWord();
}

function continueLevel() {
  if (currentLevelIndex >= LEVELS.length - 1) {
    chooseLevel(0);
    return;
  }
  currentLevelIndex++;
  startGame(veryEasy);
}

function returnToMenu() {
  resetWords();
  stars = 0;
  state = "menu";
  updateHud();
  pauseBtn.classList.remove("paused");
  pauseBtn.textContent = "⏸";
  levelOverlay.classList.add("hidden");
  selectOverlay.classList.add("hidden");
  startOverlay.classList.remove("hidden");
  setMessage(getLevel().instruction);
}

function togglePause() {
  if (state === "playing") {
    state = "paused";
    pauseBtn.classList.add("paused");
    pauseBtn.textContent = "▶";
    setMessage("Pause");
    narrate("Pause");
  } else if (state === "paused") {
    state = "playing";
    pauseBtn.classList.remove("paused");
    pauseBtn.textContent = "⏸";
    setMessage(getLevel().instruction);
    narrate("C’est reparti.");
  }
}

function updateGamepadStatus() {
  const pads = navigator.getGamepads ? Array.from(navigator.getGamepads()).filter(Boolean) : [];
  if (pads.length) gamepadStatus.textContent = "Manette détectée";
  return pads[0];
}

function readGamepad() {
  const pad = updateGamepadStatus();
  if (!pad) return;
  const axisX = pad.axes[0] || 0;
  const dLeft = pad.buttons[14] && pad.buttons[14].pressed;
  const dRight = pad.buttons[15] && pad.buttons[15].pressed;
  moveLeft = moveLeft || axisX < -0.35 || dLeft;
  moveRight = moveRight || axisX > 0.35 || dRight;
  const strikePressed = [0, 1, 2, 3].some(i => pad.buttons[i] && pad.buttons[i].pressed);
  if (strikePressed && !previousPadStrike) strike();
  previousPadStrike = strikePressed;
  const startPressed = pad.buttons[9] && pad.buttons[9].pressed;
  if (startPressed && !previousPadStart) togglePause();
  previousPadStart = startPressed;
}

function tick(time) {
  const dt = Math.min(0.033, (time - lastTime) / 1000 || 0);
  lastTime = time;

  const keyboardLeft = keys.ArrowLeft || keys.KeyA;
  const keyboardRight = keys.ArrowRight || keys.KeyD;
  moveLeft = keyboardLeft || touch.left;
  moveRight = keyboardRight || touch.right;
  readGamepad();

  if (state === "playing") {
    const current = getLevel();
    const speed = 280 + current.id * 6;
    if (moveLeft) knightX -= speed * dt;
    if (moveRight) knightX += speed * dt;
    knightX = clamp(knightX, 52, window.innerWidth - 52);
    knight.style.left = knightX + "px";

    spawnTimer -= dt;
    const limit = veryEasy ? Math.max(2, current.maxActiveWords - 1) : current.maxActiveWords;
    if (spawnTimer <= 0 && activeWords.length < limit) {
      spawnWord();
      spawnTimer = veryEasy ? 2.05 : Math.max(1.1, 1.75 - current.id * 0.025);
    }

    const ground = window.innerHeight - 78;
    for (const word of [...activeWords]) {
      word.y += word.speed * dt;
      if (word.bouncing > 0) {
        word.bouncing -= dt;
        word.speed += 420 * dt;
      }
      word.el.style.transform = "translate(-50%, -50%) translate(" + word.x + "px, " + word.y + "px)";
      if (word.y > ground) {
        word.el.remove();
        activeWords = activeWords.filter(w => w !== word);
        if (word.data.target) targetRetryQueue.push(word.data);
      }
    }
  }

  requestAnimationFrame(tick);
}

function buildLevelGrid() {
  levelGrid.innerHTML = "";
  LEVELS.forEach((levelData, index) => {
    const button = document.createElement("button");
    button.className = "levelChoice";
    button.type = "button";
    button.innerHTML = "<span>Niveau " + levelData.id + " · " + levelData.difficulty + "</span>" + levelData.title;
    button.addEventListener("click", () => chooseLevel(index));
    levelGrid.appendChild(button);
  });
}

const keys = {};
const touch = { left: false, right: false };

window.addEventListener("keydown", (event) => {
  keys[event.code] = true;
  if (["ArrowLeft", "ArrowRight", "Space", "Enter"].includes(event.code)) event.preventDefault();
  if (event.code === "Space" || event.code === "Enter") strike();
});
window.addEventListener("keyup", (event) => { keys[event.code] = false; });

function bindHold(button, prop) {
  const on = (event) => { event.preventDefault(); touch[prop] = true; ensureAudio(); };
  const off = (event) => { event.preventDefault(); touch[prop] = false; };
  button.addEventListener("pointerdown", on);
  button.addEventListener("pointerup", off);
  button.addEventListener("pointercancel", off);
  button.addEventListener("pointerleave", off);
}

bindHold(document.getElementById("leftTouch"), "left");
bindHold(document.getElementById("rightTouch"), "right");
document.getElementById("touchStrike").addEventListener("pointerdown", (event) => { event.preventDefault(); strike(); });
document.getElementById("strikeBtnTop").addEventListener("click", strike);
menuBtn.addEventListener("click", returnToMenu);
pauseBtn.addEventListener("click", togglePause);
voiceBtn.addEventListener("click", toggleNarration);
document.getElementById("playBtn").addEventListener("click", () => startGame(false));
document.getElementById("easyBtn").addEventListener("click", () => startGame(true));
document.getElementById("chooseBtn").addEventListener("click", () => {
  startOverlay.classList.add("hidden");
  selectOverlay.classList.remove("hidden");
  state = "select";
});
document.getElementById("backBtn").addEventListener("click", () => {
  selectOverlay.classList.add("hidden");
  startOverlay.classList.remove("hidden");
  state = "menu";
});
document.getElementById("nextBtn").addEventListener("click", continueLevel);
document.getElementById("padBtn").addEventListener("click", () => {
  ensureAudio();
  const pad = updateGamepadStatus();
  gamepadStatus.textContent = pad ? "Manette détectée" : "Appuie sur un bouton de la manette";
});

window.addEventListener("gamepadconnected", () => { gamepadStatus.textContent = "Manette détectée"; });
window.addEventListener("gamepaddisconnected", () => { gamepadStatus.textContent = "Manette débranchée"; });
window.addEventListener("resize", () => { knightX = clamp(knightX, 52, window.innerWidth - 52); });

buildLevelGrid();
updateHud();
initNarration();
setMessage(getLevel().instruction);
knight.style.left = knightX + "px";
requestAnimationFrame(tick);
