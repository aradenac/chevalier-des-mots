const item = (text, target, feedbackOk, feedbackKo, correction, category) => ({ text, target, feedbackOk, feedbackKo, correction, category });
const level = (id, title, instruction, shortInstruction, difficulty, starsToWin, maxActiveWords, fallSpeed, items) => ({ id, title, instruction, shortInstruction, difficulty, starsToWin, maxActiveWords, fallSpeed, items });

// [impl->req~data.levels-separated-from-engine~1]
// [impl->req~level.extended-campaign-worlds~1]
// [impl->req~level.world-two-grammar-consolidation~1]
// [impl->req~level.longer-play-session~1]
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
  ]),
  level(21, "Les mots presque corrects", "Tranche les mots qui sont presque écrits correctement.", "Tranche les mots presque corrects", "moyen", 6, 5, 84, [
    item("maizson", true, "Oui ! On écrit : maison", "Ce mot était presque correct mais faux.", "maison", "orthographe fine"),
    item("maison", false, "Maison est bien écrit.", "Oups, maison était correct", undefined, "mot correct"),
    item("chattaigne", true, "Oui ! On écrit : châtaigne", "Ce mot était presque correct mais faux.", "châtaigne", "orthographe fine"),
    item("châtaigne", false, "Châtaigne est bien écrit.", "Oups, châtaigne était correct", undefined, "mot correct"),
    item("apprendrre", true, "Oui ! On écrit : apprendre", "Ce mot était presque correct mais faux.", "apprendre", "orthographe fine"),
    item("apprendre", false, "Apprendre est bien écrit.", "Oups, apprendre était correct", undefined, "mot correct"),
    item("recolte", true, "Oui ! On écrit : récolte", "Ce mot était presque correct mais faux.", "récolte", "orthographe fine"),
    item("récolte", false, "Récolte est bien écrit.", "Oups, récolte était correct", undefined, "mot correct")
  ]),
  level(22, "Les accents et les cédilles", "Tranche les mots où un accent ou une cédille manque.", "Tranche les accents et cédilles", "moyen", 6, 5, 85, [
    item("garcon", true, "Oui ! On écrit : garçon", "Il manquait un accent ou une cédille.", "garçon", "accent"),
    item("garçon", false, "Garçon est bien écrit.", "Oups, garçon était correct", undefined, "accent correct"),
    item("francais", true, "Oui ! On écrit : français", "Il manquait un accent ou une cédille.", "français", "accent"),
    item("français", false, "Français est bien écrit.", "Oups, français était correct", undefined, "accent correct"),
    item("eleve", true, "Oui ! On écrit : élève", "Il manquait un accent ou une cédille.", "élève", "accent"),
    item("élève", false, "Élève est bien écrit.", "Oups, élève était correct", undefined, "accent correct"),
    item("facade", true, "Oui ! On écrit : façade", "Il manquait un accent ou une cédille.", "façade", "accent"),
    item("façade", false, "Façade est bien écrit.", "Oups, façade était correct", undefined, "accent correct")
  ]),
  level(23, "Le genre du nom", "Tranche les groupes nominaux au mauvais genre.", "Tranche le genre du nom", "moyen", 6, 5, 86, [
    item("la lion", true, "Oui ! On écrit : le lion", "Le genre était incorrect.", "le lion", "genre"),
    item("le lion", false, "Le lion a le bon genre.", "Oups, le lion était correct", undefined, "genre correct"),
    item("le girafe", true, "Oui ! On écrit : la girafe", "Le genre était incorrect.", "la girafe", "genre"),
    item("la girafe", false, "La girafe a le bon genre.", "Oups, la girafe était correct", undefined, "genre correct"),
    item("un pomme", true, "Oui ! On écrit : une pomme", "Le genre était incorrect.", "une pomme", "genre"),
    item("une pomme", false, "Une pomme a le bon genre.", "Oups, une pomme était correct", undefined, "genre correct"),
    item("la château", true, "Oui ! On écrit : le château", "Le genre était incorrect.", "le château", "genre"),
    item("le château", false, "Le château a le bon genre.", "Oups, le château était correct", undefined, "genre correct")
  ]),
  level(24, "Le nombre du nom", "Tranche les groupes nominaux qui n'ont pas le bon nombre.", "Tranche le nombre du nom", "moyen", 6, 5, 87, [
    item("le chats", true, "Oui ! On écrit : les chats", "Le nombre était incorrect.", "les chats", "nombre"),
    item("les chats", false, "Les chats ont le bon nombre.", "Oups, les chats étaient corrects", undefined, "nombre correct"),
    item("la fleurs", true, "Oui ! On écrit : les fleurs", "Le nombre était incorrect.", "les fleurs", "nombre"),
    item("les fleurs", false, "Les fleurs ont le bon nombre.", "Oups, les fleurs étaient correctes", undefined, "nombre correct"),
    item("un arbres", true, "Oui ! On écrit : un arbre", "Le nombre était incorrect.", "un arbre", "nombre"),
    item("un arbre", false, "Un arbre a le bon nombre.", "Oups, un arbre était correct", undefined, "nombre correct"),
    item("des cheval", true, "Oui ! On écrit : des chevaux", "Le nombre était incorrect.", "des chevaux", "nombre"),
    item("des chevaux", false, "Des chevaux ont le bon nombre.", "Oups, des chevaux étaient corrects", undefined, "nombre correct")
  ]),
  level(25, "L'accord déterminant-nom", "Tranche les groupes nominaux où le déterminant n'accorde pas avec le nom.", "Tranche l'accord déterminant-nom", "moyen", 6, 5, 88, [
    item("la chien", true, "Oui ! On écrit : le chien", "Le déterminant était incorrect.", "le chien", "déterminant-nom"),
    item("le chien", false, "Le chien est accordé.", "Oups, le chien était correct", undefined, "accord correct"),
    item("un maison", true, "Oui ! On écrit : une maison", "Le déterminant était incorrect.", "une maison", "déterminant-nom"),
    item("une maison", false, "Une maison est accordée.", "Oups, une maison était correcte", undefined, "accord correct"),
    item("les arbre", true, "Oui ! On écrit : les arbres", "Le déterminant était incorrect.", "les arbres", "déterminant-nom"),
    item("les arbres", false, "Les arbres sont accordés.", "Oups, les arbres étaient corrects", undefined, "accord correct"),
    item("des fleur", true, "Oui ! On écrit : des fleurs", "Le déterminant était incorrect.", "des fleurs", "déterminant-nom"),
    item("des fleurs", false, "Des fleurs sont accordées.", "Oups, des fleurs étaient correctes", undefined, "accord correct")
  ]),
  level(26, "L'accord adjectif-nom", "Tranche les groupes où l'adjectif n'accorde pas avec le nom.", "Tranche l'accord adjectif-nom", "moyen", 7, 5, 89, [
    item("la petit fille", true, "Oui ! On écrit : la petite fille", "L'adjectif était mal accordé.", "la petite fille", "adjectif-nom"),
    item("la petite fille", false, "La petite fille est accordée.", "Oups, la petite fille était correcte", undefined, "accord correct"),
    item("les grand arbres", true, "Oui ! On écrit : les grands arbres", "L'adjectif était mal accordé.", "les grands arbres", "adjectif-nom"),
    item("les grands arbres", false, "Les grands arbres sont accordés.", "Oups, les grands arbres étaient corrects", undefined, "accord correct"),
    item("un joli maison", true, "Oui ! On écrit : une jolie maison", "L'adjectif était mal accordé.", "une jolie maison", "adjectif-nom"),
    item("une jolie maison", false, "Une jolie maison est accordée.", "Oups, une jolie maison était correcte", undefined, "accord correct"),
    item("des chat noir", true, "Oui ! On écrit : des chats noirs", "L'adjectif était mal accordé.", "des chats noirs", "adjectif-nom"),
    item("des chats noirs", false, "Des chats noirs sont accordés.", "Oups, des chats noirs étaient corrects", undefined, "accord correct")
  ]),
  level(27, "Les pronoms sujets", "Tranche les pronoms personnels sujets.", "Tranche les pronoms sujets", "moyen", 7, 5, 90, [
    item("je", true, "Oui ! Je est un pronom sujet.", "Je était un pronom sujet.", undefined, "pronom sujet"),
    item("me", false, "Me est un pronom complément.", "Oups, me n'était pas un sujet", undefined, "pronom complément"),
    item("tu", true, "Oui ! Tu est un pronom sujet.", "Tu était un pronom sujet.", undefined, "pronom sujet"),
    item("le", false, "Le est un pronom complément.", "Oups, le n'était pas un sujet", undefined, "pronom complément"),
    item("nous", true, "Oui ! Nous est un pronom sujet.", "Nous était un pronom sujet.", undefined, "pronom sujet"),
    item("lui", false, "Lui est un pronom complément.", "Oups, lui n'était pas un sujet", undefined, "pronom complément"),
    item("vous", true, "Oui ! Vous est un pronom sujet.", "Vous était un pronom sujet.", undefined, "pronom sujet"),
    item("la", false, "La est un pronom complément.", "Oups, la n'était pas un sujet", undefined, "pronom complément")
  ]),
  level(28, "Les pronoms compléments", "Tranche les pronoms compléments simples.", "Tranche les pronoms compléments", "moyen", 7, 5, 91, [
    item("me", true, "Oui ! Me est un pronom complément.", "Me était un pronom complément.", undefined, "pronom complément"),
    item("je", false, "Je est un pronom sujet.", "Oups, je n'était pas un complément", undefined, "pronom sujet"),
    item("te", true, "Oui ! Te est un pronom complément.", "Te était un pronom complément.", undefined, "pronom complément"),
    item("il", false, "Il est un pronom sujet.", "Oups, il n'était pas un complément", undefined, "pronom sujet"),
    item("le", true, "Oui ! Le est un pronom complément.", "Le était un pronom complément.", undefined, "pronom complément"),
    item("nous", false, "Nous est un pronom sujet.", "Oups, nous n'était pas un complément", undefined, "pronom sujet"),
    item("lui", true, "Oui ! Lui est un pronom complément.", "Lui était un pronom complément.", undefined, "pronom complément"),
    item("elles", false, "Elles est un pronom sujet.", "Oups, elles n'était pas un complément", undefined, "pronom sujet")
  ]),
  level(29, "Les verbes du premier groupe", "Tranche les verbes réguliers en -er.", "Tranche les verbes en -er", "difficile", 7, 5, 92, [
    item("chanter", true, "Oui ! Chanter est un verbe du premier groupe.", "Chanter était un verbe du premier groupe.", undefined, "1er groupe"),
    item("finir", false, "Finir appartient au deuxième groupe.", "Oups, finir n'était pas du premier groupe", undefined, "2e groupe"),
    item("manger", true, "Oui ! Manger est un verbe du premier groupe.", "Manger était un verbe du premier groupe.", undefined, "1er groupe"),
    item("prendre", false, "Prendre appartient au troisième groupe.", "Oups, prendre n'était pas du premier groupe", undefined, "3e groupe"),
    item("jouer", true, "Oui ! Jouer est un verbe du premier groupe.", "Jouer était un verbe du premier groupe.", undefined, "1er groupe"),
    item("venir", false, "Venir appartient au troisième groupe.", "Oups, venir n'était pas du premier groupe", undefined, "3e groupe"),
    item("travailler", true, "Oui ! Travailler est un verbe du premier groupe.", "Travailler était un verbe du premier groupe.", undefined, "1er groupe"),
    item("être", false, "Être appartient au troisième groupe.", "Oups, être n'était pas du premier groupe", undefined, "3e groupe")
  ]),
  level(30, "Les verbes du deuxième groupe", "Tranche les verbes réguliers en -ir.", "Tranche les verbes en -ir", "difficile", 7, 5, 93, [
    item("finir", true, "Oui ! Finir est un verbe du deuxième groupe.", "Finir était un verbe du deuxième groupe.", undefined, "2e groupe"),
    item("manger", false, "Manger appartient au premier groupe.", "Oups, manger n'était pas du deuxième groupe", undefined, "1er groupe"),
    item("choisir", true, "Oui ! Choisir est un verbe du deuxième groupe.", "Choisir était un verbe du deuxième groupe.", undefined, "2e groupe"),
    item("aller", false, "Aller appartient au troisième groupe.", "Oups, aller n'était pas du deuxième groupe", undefined, "3e groupe"),
    item("grandir", true, "Oui ! Grandir est un verbe du deuxième groupe.", "Grandir était un verbe du deuxième groupe.", undefined, "2e groupe"),
    item("voir", false, "Voir appartient au troisième groupe.", "Oups, voir n'était pas du deuxième groupe", undefined, "3e groupe"),
    item("réussir", true, "Oui ! Réussir est un verbe du deuxième groupe.", "Réussir était un verbe du deuxième groupe.", undefined, "2e groupe"),
    item("faire", false, "Faire appartient au troisième groupe.", "Oups, faire n'était pas du deuxième groupe", undefined, "3e groupe")
  ]),
  level(31, "Les verbes fréquents du troisième groupe", "Tranche les verbes irréguliers les plus courants.", "Tranche les verbes du 3e groupe", "difficile", 8, 5, 94, [
    item("être", true, "Oui ! Être est un verbe fréquent du troisième groupe.", "Être était un verbe fréquent du troisième groupe.", undefined, "3e groupe"),
    item("chanter", false, "Chanter appartient au premier groupe.", "Oups, chanter n'était pas du troisième groupe", undefined, "1er groupe"),
    item("avoir", true, "Oui ! Avoir est un verbe fréquent du troisième groupe.", "Avoir était un verbe fréquent du troisième groupe.", undefined, "3e groupe"),
    item("finir", false, "Finir appartient au deuxième groupe.", "Oups, finir n'était pas du troisième groupe", undefined, "2e groupe"),
    item("aller", true, "Oui ! Aller est un verbe fréquent du troisième groupe.", "Aller était un verbe fréquent du troisième groupe.", undefined, "3e groupe"),
    item("jouer", false, "Jouer appartient au premier groupe.", "Oups, jouer n'était pas du troisième groupe", undefined, "1er groupe"),
    item("faire", true, "Oui ! Faire est un verbe fréquent du troisième groupe.", "Faire était un verbe fréquent du troisième groupe.", undefined, "3e groupe"),
    item("réussir", false, "Réussir appartient au deuxième groupe.", "Oups, réussir n'était pas du troisième groupe", undefined, "2e groupe")
  ]),
  level(32, "Le présent : terminaisons", "Tranche les verbes qui sont correctement conjugués au présent.", "Tranche le présent", "difficile", 8, 5, 95, [
    item("je parles", true, "Oui ! On écrit : je parle", "La terminaison du présent était incorrecte.", "je parle", "présent"),
    item("je parle", false, "Je parle est au présent.", "Oups, je parle était correct", undefined, "présent correct"),
    item("tu finit", true, "Oui ! On écrit : tu finis", "La terminaison du présent était incorrecte.", "tu finis", "présent"),
    item("tu finis", false, "Tu finis est au présent.", "Oups, tu finis était correct", undefined, "présent correct"),
    item("nous parlon", true, "Oui ! On écrit : nous parlons", "La terminaison du présent était incorrecte.", "nous parlons", "présent"),
    item("nous parlons", false, "Nous parlons est au présent.", "Oups, nous parlons était correct", undefined, "présent correct"),
    item("vous chante", true, "Oui ! On écrit : vous chantez", "La terminaison du présent était incorrecte.", "vous chantez", "présent"),
    item("vous chantez", false, "Vous chantez est au présent.", "Oups, vous chantez était correct", undefined, "présent correct")
  ]),
  level(33, "Le futur : terminaisons", "Tranche les verbes qui sont correctement conjugués au futur.", "Tranche le futur", "difficile", 8, 5, 96, [
    item("je parlerai", false, "Je parlerai est au futur.", "Oups, je parlerai était correct", undefined, "futur correct"),
    item("je parleras", true, "Oui ! On écrit : je parlerai", "La terminaison du futur était incorrecte.", "je parlerai", "futur"),
    item("tu finiras", false, "Tu finiras est au futur.", "Oups, tu finiras était correct", undefined, "futur correct"),
    item("tu finira", true, "Oui ! On écrit : tu finiras", "La terminaison du futur était incorrecte.", "tu finiras", "futur"),
    item("nous irons", false, "Nous irons est au futur.", "Oups, nous irons était correct", undefined, "futur correct"),
    item("nous iront", true, "Oui ! On écrit : nous irons", "La terminaison du futur était incorrecte.", "nous irons", "futur"),
    item("vous ferez", false, "Vous ferez est au futur.", "Oups, vous ferez était correct", undefined, "futur correct"),
    item("vous ferai", true, "Oui ! On écrit : vous ferez", "La terminaison du futur était incorrecte.", "vous ferez", "futur")
  ]),
  level(34, "L'imparfait", "Tranche les verbes correctement conjugués à l'imparfait.", "Tranche l'imparfait", "difficile", 8, 5, 97, [
    item("je parlait", true, "Oui ! On écrit : je parlais", "L'imparfait était mal formé.", "je parlais", "imparfait"),
    item("je parlais", false, "Je parlais est à l'imparfait.", "Oups, je parlais était correct", undefined, "imparfait correct"),
    item("tu finissais", false, "Tu finissais est à l'imparfait.", "Oups, tu finissais était correct", undefined, "imparfait correct"),
    item("tu finit", true, "Oui ! On écrit : tu finissais", "L'imparfait était mal formé.", "tu finissais", "imparfait"),
    item("nous parlions", false, "Nous parlions est à l'imparfait.", "Oups, nous parlions était correct", undefined, "imparfait correct"),
    item("nous parlion", true, "Oui ! On écrit : nous parlions", "L'imparfait était mal formé.", "nous parlions", "imparfait"),
    item("ils venaient", false, "Ils venaient est à l'imparfait.", "Oups, ils venaient était correct", undefined, "imparfait correct"),
    item("ils venais", true, "Oui ! On écrit : ils venaient", "L'imparfait était mal formé.", "ils venaient", "imparfait")
  ]),
  level(35, "Le passé composé avec avoir", "Tranche les verbes correctement conjugués au passé composé avec avoir.", "Tranche le passé composé avec avoir", "difficile", 8, 5, 98, [
    item("j'ai mangé", true, "Oui ! C'est du passé composé avec avoir.", "J'ai mangé était correct.", undefined, "passé composé"),
    item("je mange", false, "Je mange est au présent.", "Oups, je mange n'était pas au passé composé", undefined, "présent"),
    item("nous avons choisi", true, "Oui ! C'est du passé composé avec avoir.", "Nous avons choisi était correct.", undefined, "passé composé"),
    item("nous choisissons", false, "Nous choisissons est au présent.", "Oups, nous choisissons n'était pas au passé composé", undefined, "présent"),
    item("ils ont fini", true, "Oui ! C'est du passé composé avec avoir.", "Ils ont fini était correct.", undefined, "passé composé"),
    item("ils finissent", false, "Ils finissent est au présent.", "Oups, ils finissent n'était pas au passé composé", undefined, "présent"),
    item("vous avez vu", true, "Oui ! C'est du passé composé avec avoir.", "Vous avez vu était correct.", undefined, "passé composé"),
    item("vous verrez", false, "Vous verrez est au futur.", "Oups, vous verrez n'était pas au passé composé", undefined, "futur")
  ]),
  level(36, "Le passé composé avec être", "Tranche les verbes correctement conjugués au passé composé avec être.", "Tranche le passé composé avec être", "difficile", 8, 5, 99, [
    item("il est allé", true, "Oui ! C'est du passé composé avec être.", "Il est allé était correct.", undefined, "passé composé"),
    item("il va aller", false, "Il va aller est au futur proche.", "Oups, il va aller n'était pas au passé composé", undefined, "futur proche"),
    item("elle est venue", true, "Oui ! C'est du passé composé avec être.", "Elle est venue était correcte.", undefined, "passé composé"),
    item("elle vient", false, "Elle vient est au présent.", "Oups, elle vient n'était pas au passé composé", undefined, "présent"),
    item("nous sommes partis", true, "Oui ! C'est du passé composé avec être.", "Nous sommes partis était correct.", undefined, "passé composé"),
    item("nous partons", false, "Nous partons est au présent.", "Oups, nous partons n'était pas au passé composé", undefined, "présent"),
    item("elles sont arrivées", true, "Oui ! C'est du passé composé avec être.", "Elles sont arrivées était correct.", undefined, "passé composé"),
    item("elles arriveront", false, "Elles arriveront est au futur.", "Oups, elles arriveront n'était pas au passé composé", undefined, "futur")
  ]),
  level(37, "L'accord sujet-verbe au pluriel", "Tranche les phrases où le sujet pluriel et le verbe ne sont pas accordés.", "Tranche l'accord au pluriel", "difficile", 9, 5, 100, [
    item("Les chats dorment", false, "Les chats dorment est bien accordé.", "Oups, la phrase était correcte", undefined, "accord correct"),
    item("Les chats dort", true, "Oui ! On écrit : Les chats dorment", "L'accord sujet-verbe était faux.", "Les chats dorment", "accord pluriel"),
    item("Mes amis viennent", false, "Mes amis viennent est bien accordé.", "Oups, la phrase était correcte", undefined, "accord correct"),
    item("Mes amis vient", true, "Oui ! On écrit : Mes amis viennent", "L'accord sujet-verbe était faux.", "Mes amis viennent", "accord pluriel"),
    item("Les filles jouent", false, "Les filles jouent est bien accordé.", "Oups, la phrase était correcte", undefined, "accord correct"),
    item("Les filles joue", true, "Oui ! On écrit : Les filles jouent", "L'accord sujet-verbe était faux.", "Les filles jouent", "accord pluriel"),
    item("Nos parents travaillent", false, "Nos parents travaillent est bien accordé.", "Oups, la phrase était correcte", undefined, "accord correct"),
    item("Nos parents travaille", true, "Oui ! On écrit : Nos parents travaillent", "L'accord sujet-verbe était faux.", "Nos parents travaillent", "accord pluriel")
  ]),
  level(38, "Les homophones grammaticaux 1", "Tranche les phrases où a/à, et/est ou son/sont sont mal choisis.", "Tranche les homophones 1", "difficile", 9, 5, 101, [
    item("Il à un chien", true, "Oui ! On écrit : Il a un chien", "L'homophone était faux.", "Il a un chien", "homophone"),
    item("Il a un chien", false, "Il a un chien est correct.", "Oups, la phrase était correcte", undefined, "homophone correct"),
    item("Je vais a Paris", true, "Oui ! On écrit : Je vais à Paris", "L'homophone était faux.", "Je vais à Paris", "homophone"),
    item("Je vais à Paris", false, "Je vais à Paris est correct.", "Oups, la phrase était correcte", undefined, "homophone correct"),
    item("Le chat et noir", true, "Oui ! On écrit : Le chat est noir", "L'homophone était faux.", "Le chat est noir", "homophone"),
    item("Le chat est noir", false, "Le chat est noir est correct.", "Oups, la phrase était correcte", undefined, "homophone correct"),
    item("Sont frère est grand", true, "Oui ! On écrit : Son frère est grand", "L'homophone était faux.", "Son frère est grand", "homophone"),
    item("Son frère est grand", false, "Son frère est grand est correct.", "Oups, la phrase était correcte", undefined, "homophone correct")
  ]),
  level(39, "Les homophones grammaticaux 2", "Tranche les phrases où ou/où, ce/se ou ces/ses sont mal choisis.", "Tranche les homophones 2", "difficile", 9, 5, 102, [
    item("Je ne sais ou aller", true, "Oui ! On écrit : Je ne sais où aller", "L'homophone était faux.", "Je ne sais où aller", "homophone"),
    item("Je ne sais où aller", false, "Je ne sais où aller est correct.", "Oups, la phrase était correcte", undefined, "homophone correct"),
    item("Se chat dort", true, "Oui ! On écrit : Ce chat dort", "L'homophone était faux.", "Ce chat dort", "homophone"),
    item("Ce chat dort", false, "Ce chat dort est correct.", "Oups, la phrase était correcte", undefined, "homophone correct"),
    item("Ses fleurs sentent bon", true, "Oui ! On écrit : Ces fleurs sentent bon", "L'homophone était faux.", "Ces fleurs sentent bon", "homophone"),
    item("Ces fleurs sentent bon", false, "Ces fleurs sentent bon est correct.", "Oups, la phrase était correcte", undefined, "homophone correct"),
    item("La maison ou je dors", true, "Oui ! On écrit : La maison où je dors", "L'homophone était faux.", "La maison où je dors", "homophone"),
    item("La maison où je dors", false, "La maison où je dors est correct.", "Oups, la phrase était correcte", undefined, "homophone correct")
  ]),
  level(40, "Le boss chevalier", "Tranche les phrases qui mélangent plusieurs notions du monde 2.", "Tranche le boss chevalier", "expert", 10, 5, 104, [
    item("Les enfants a fini", true, "Oui ! On écrit : Les enfants ont fini", "Cette phrase mélangeait plusieurs notions.", "Les enfants ont fini", "boss"),
    item("Les enfants ont fini", false, "Les enfants ont fini est correct.", "Oups, la phrase était correcte", undefined, "boss correct"),
    item("La petit maison", true, "Oui ! On écrit : La petite maison", "Cette phrase mélangeait plusieurs notions.", "La petite maison", "boss"),
    item("La petite maison", false, "La petite maison est correct.", "Oups, la phrase était correcte", undefined, "boss correct"),
    item("Il est arrivé", false, "Il est arrivé est correct.", "Oups, la phrase était correcte", undefined, "boss correct"),
    item("Il a arrivé", true, "Oui ! On écrit : Il est arrivé", "Cette phrase mélangeait plusieurs notions.", "Il est arrivé", "boss"),
    item("Mes amis joue", true, "Oui ! On écrit : Mes amis jouent", "Cette phrase mélangeait plusieurs notions.", "Mes amis jouent", "boss"),
    item("Mes amis jouent", false, "Mes amis jouent est correct.", "Oups, la phrase était correcte", undefined, "boss correct"),
    item("Je vais a l'école", true, "Oui ! On écrit : Je vais à l'école", "Cette phrase mélangeait plusieurs notions.", "Je vais à l'école", "boss"),
    item("Je vais à l'école", false, "Je vais à l'école est correct.", "Oups, la phrase était correcte", undefined, "boss correct")
  ])
];
