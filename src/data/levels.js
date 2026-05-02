// [impl->swreq~data.levels-separated-from-engine~1]
const item = (text, target, feedbackOk, feedbackKo, correction, category) => ({ text, target, feedbackOk, feedbackKo, correction, category });
const level = (id, title, instruction, shortInstruction, difficulty, starsToWin, maxActiveWords, fallSpeed, items) => ({ id, title, instruction, shortInstruction, difficulty, starsToWin, maxActiveWords, fallSpeed, items });

export const LEVELS = [
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
