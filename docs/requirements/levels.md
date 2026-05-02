# Exigences de niveaux

#### Les niveaux doivent rester des données séparées du moteur
`req~data.levels-separated-from-engine~1`

Status: approved
Priority: high
Verification: test

Le système doit définir les niveaux dans un module de données séparé de la logique d'exécution du jeu.

Rationale:
La liste des niveaux doit rester éditable sans mélanger contenu pédagogique et moteur.

Acceptance criteria:
- Les niveaux sont listés dans un module de données dédié.
- Chaque niveau expose ses métadonnées et ses items.
- Les tests vérifient la cohérence de la structure.

Needs:
- impl
- utest

## Vue pédagogique des niveaux

Les 20 niveaux actuels constituent le Monde 1 — Écuyer.
La campagne étendue introduit ensuite un Monde 2 — Chevalier pour prolonger la progression sans rendre le jeu punitif.

### Paliers de difficulté

#### Niveaux 1 à 4 : orthographe visible

Objectif pédagogique:
Amener l'enfant à repérer des erreurs visibles et familières dans des mots isolés.

Type de décision demandée à l'enfant:
Reconnaître si le mot affiché est correctement écrit ou s'il contient une faute simple.

Types de distracteurs:
Fautes de lettres, lettres en trop, lettres manquantes et accents absents ou incorrects.

Forme du feedback attendu:
Un feedback immédiat, très explicite et court, qui confirme la correction ou l'erreur sans ambiguïté.

Difficulté attendue:
Faible, avec des contrastes orthographiques nets.

#### Niveaux 5 à 12 : nature des mots

Objectif pédagogique:
Faire identifier les catégories grammaticales de base à partir de mots isolés.

Type de décision demandée à l'enfant:
Décider si le mot appartient à la catégorie visée du niveau.

Types de distracteurs:
Verbes, adjectifs, adverbes, déterminants, pronoms, prépositions, conjonctions et noms proches de la cible.

Forme du feedback attendu:
Un feedback bref qui nomme la catégorie correcte ou signale la catégorie incorrecte.

Difficulté attendue:
Modérée, avec une première abstraction grammaticale mais des indices encore clairs.

#### Niveaux 13 à 17 : formes verbales et temps

Objectif pédagogique:
Amener l'enfant à distinguer les formes verbales selon l'infinitif, la conjugaison et le temps.

Type de décision demandée à l'enfant:
Décider si la forme verbale correspond au temps ou à la structure recherchés.

Types de distracteurs:
Verbes conjugués, infinitifs, temps voisins, formes proches mais incorrectes et erreurs de conjugaison.

Forme du feedback attendu:
Un feedback qui indique la bonne forme verbale attendue et met en évidence l'écart observé.

Difficulté attendue:
Élevée, avec plus de mémoire de forme et de raisonnement morphologique.

#### Niveaux 18 à 19 : raisonnement grammatical en phrases

Objectif pédagogique:
Faire raisonner sur l'accord et sur les homophones dans une phrase complète.

Type de décision demandée à l'enfant:
Identifier si la phrase contient une erreur grammaticale ou orthographique liée au sens.

Types de distracteurs:
Faux accords sujet-verbe, homophones proches et phrases presque correctes.

Forme du feedback attendu:
Un feedback explicatif qui montre la phrase correcte ou l'erreur à corriger.

Difficulté attendue:
Très élevée, avec une lecture plus analytique de la phrase.

#### Niveau 20 : défi de synthèse

Objectif pédagogique:
Réinvestir l'ensemble des compétences acquises sur des décisions de nature différente dans une même séquence.

Type de décision demandée à l'enfant:
Reconnaître rapidement la nature de l'erreur puis décider s'il faut frapper la cible.

Types de distracteurs:
Erreurs d'accord, homophones, conjugaison, orthographe et mots corrects mélangés dans la même session.

Forme du feedback attendu:
Un feedback synthétique mais suffisamment précis pour relier l'action à la correction attendue.

Difficulté attendue:
Maximale, avec plusieurs types de décisions possibles au sein d'un même niveau.

### Table synthétique des 20 niveaux

| Niveau | Thème | Objectif pédagogique | Cibles typiques | Distracteurs typiques | Difficulté attendue |
| --- | --- | --- | --- | --- | --- |
| 1 | Orthographe visible | Repérer une faute simple dans un mot isolé | fautes d'orthographe simples, mots mal écrits | mot correct proche, lettre manquante, lettre en trop | facile |
| 2 | Orthographe visible | Repérer une lettre superflue | mots avec une lettre en trop | mot correct, forme fautive proche | facile |
| 3 | Orthographe visible | Repérer une lettre manquante | mots incomplets | mot complet, forme presque correcte | facile |
| 4 | Orthographe visible | Repérer un accent absent ou erroné | mots sans accent ou avec accent faux | mot correctement accentué, forme voisine | facile |
| 5 | Nature des mots | Identifier les noms communs | noms d'objets, d'êtres ou de lieux | verbes, adjectifs, adverbes, pronoms | facile |
| 6 | Nature des mots | Identifier les verbes simples | verbes d'action à l'infinitif | noms, adjectifs, mots de couleur | facile |
| 7 | Nature des mots | Identifier les adjectifs | adjectifs qualificatifs | noms, verbes, adverbes | facile |
| 8 | Nature des mots | Identifier les déterminants | articles et déterminants courants | noms, verbes, adjectifs, pronoms | moyen |
| 9 | Nature des mots | Identifier les pronoms personnels | je, tu, nous, elles | noms, verbes, adjectifs, prépositions | moyen |
| 10 | Nature des mots | Identifier les adverbes | mots qui modifient un verbe ou une action | adjectifs, noms, verbes, mots proches | moyen |
| 11 | Nature des mots | Identifier les prépositions | mots de relation spatiale ou logique | déterminants, verbes, noms, adjectifs | moyen |
| 12 | Nature des mots | Identifier les conjonctions | mots qui relient mots ou phrases | prépositions, adverbes, noms, pronoms | moyen |
| 13 | Formes verbales | Distinguer l'infinitif | verbes à l'infinitif | formes conjuguées proches | moyen |
| 14 | Formes verbales | Distinguer verbe conjugué et infinitif | verbes conjugués avec sujet | infinitifs proches | moyen |
| 15 | Formes verbales et temps | Identifier le présent | verbes au présent | futur, passé composé, formes proches | difficile |
| 16 | Formes verbales et temps | Identifier le futur | verbes au futur | présent, formes proches | difficile |
| 17 | Formes verbales et temps | Identifier le passé composé | verbes au passé composé | présent, futur, formes proches | difficile |
| 18 | Raisonnement grammatical | Corriger un accord sujet-verbe | phrases avec accord incorrect | phrase correcte, accord proche | difficile |
| 19 | Raisonnement grammatical | Corriger un homophone en contexte | phrases avec homophone erroné | phrase correcte, homophone proche | difficile |
| 20 | Défi de synthèse | Réinvestir plusieurs compétences à la fois | erreurs d'accord, d'orthographe, de conjugaison ou d'homophone | phrases correctes et erreurs mixtes | expert |

### Progression pédagogique des niveaux
`req~level.pedagogical-progression~1`

Status: approved
Priority: high
Verification: inspection, test

Le système doit organiser les niveaux selon une progression allant de distinctions visuelles simples vers des distinctions grammaticales plus abstraites.

Rationale:
L'enfant doit pouvoir construire ses compétences progressivement sans rupture brutale de difficulté.

Acceptance criteria:
- Les premiers niveaux portent sur des erreurs visibles ou familières.
- Les niveaux intermédiaires portent sur les catégories grammaticales.
- Les niveaux avancés portent sur les accords dans le groupe nominal, les groupes verbaux, l'imparfait, les autres temps et les homophones plus fins.
- La progression se fait par mondes, avec un Monde 1 centré sur les distinctions visibles puis un Monde 2 centré sur la consolidation grammaticale.
- Le dernier niveau combine plusieurs types de décisions.
- La structure des niveaux reste cohérente avec les métadonnées de `src/data/levels.js`.
- L'extension en mondes reste compatible avec la future spécification d'un Monde 3.

Needs:
- impl
- utest

#### La progression doit avancer niveau par niveau
`req~level.progression-model~1`

Status: approved
Priority: high
Verification: test

Le système doit gérer la sélection d'un niveau, la détection de victoire et le passage au niveau suivant à partir d'indices bornés.

Rationale:
La progression du joueur doit rester déterministe et simple à vérifier.

Acceptance criteria:
- Un index trop petit est ramené au premier niveau.
- Un index trop grand est ramené au dernier niveau.
- La victoire finale renvoie au premier niveau.
- La progression globale reste organisée par mondes.
- Le Monde 1 regroupe les distinctions visuelles simples et les premières catégories grammaticales.
- Le Monde 2 concentre les accords, les groupes verbaux, les temps et les homophones plus fins.
- La progression reste cohérente avec les métadonnées de `src/data/levels.js` et avec la future extension en mondes.

Needs:
- impl
- utest

## Campagne étendue

#### La campagne doit progresser par mondes
`req~level.extended-campaign-worlds~1`

Status: draft
Priority: high
Verification: inspection, test

Le système doit organiser la campagne en mondes progressifs afin d'augmenter la durée de jeu et de structurer l'apprentissage.

Rationale:
Le découpage en mondes permet d'allonger la campagne, de clarifier l'intention pédagogique de chaque tranche de niveaux et de garder une progression lisible.

Acceptance criteria:
- Le Monde 1 contient les niveaux 1 à 20.
- Le Monde 2 contient les niveaux 21 à 40.
- Chaque monde a un titre et une intention pédagogique.
- Les boss de monde révisent plusieurs familles de notions.
- La campagne reste jouable sans punition dure.

Needs:
- impl
- utest

#### Le second monde doit consolider l'orthographe et la grammaire
`req~level.world-two-grammar-consolidation~1`

Status: draft
Priority: high
Verification: inspection, test

Le système doit définir un second monde de niveaux centré sur la consolidation grammaticale et orthographique.

Rationale:
Le second monde doit prolonger la courbe d'apprentissage sans recopier la base complète des items dans la documentation.

Acceptance criteria:
- Les niveaux 21 à 40 sont définis par thème.
- Les niveaux 21 à 40 couvrent orthographe fine, accords, pronoms, groupes verbaux, temps et homophones.
- Le niveau 40 mélange les notions du monde 2.
- Les niveaux du monde 2 utilisent des cibles et distracteurs représentatifs sans dupliquer toute la base d'items dans la spec.

Needs:
- impl
- utest

#### La campagne complète doit durer plus longtemps
`req~level.longer-play-session~1`

Status: draft
Priority: medium
Verification: inspection

Le système doit augmenter la durée de jeu d'une campagne complète.

Rationale:
Le jeu actuel est trop court pour installer suffisamment de répétition et de consolidation.

Acceptance criteria:
- La campagne complète ne doit plus se limiter aux 20 niveaux initiaux.
- Les nouveaux niveaux doivent augmenter la durée sans augmenter brutalement la vitesse.
- L'allongement doit venir principalement de la variété pédagogique, du nombre de niveaux et du nombre d'items.

Needs:
- impl

### Monde 2 — Chevalier

Les niveaux 21 à 40 prolongent la campagne avec une consolidation grammaticale et orthographique plus fine.
Les cibles et distracteurs ci-dessous sont représentatifs et non exhaustifs.

| Niveau | Thème | Objectif pédagogique | Cibles typiques | Distracteurs typiques | Difficulté attendue |
| --- | --- | --- | --- | --- | --- |
| 21 | Mots presque corrects | Repérer des mots très proches de la forme attendue | mots avec une lettre manquante, lettre doublée, inversion légère | mot correctement orthographié, autre forme proche mais différente | moyen |
| 22 | Accents et cédilles | Repérer les erreurs d'accents et de cédilles | mots avec accent manquant, accent déplacé, cédille oubliée | mot correctement accentué, graphie proche sans erreur visible | moyen |
| 23 | Genre du nom | Identifier le genre grammatical du nom | noms associés à un déterminant ou adjectif de genre attendu | nom du genre opposé, mot de sens proche | moyen |
| 24 | Nombre du nom | Identifier le singulier et le pluriel | noms au pluriel ou au singulier selon la consigne | forme du nombre opposé, mot proche mais incorrect | moyen |
| 25 | Accord déterminant-nom | Vérifier l'accord entre déterminant et nom | groupes nominaux avec déterminant correct à choisir | déterminant du mauvais genre ou du mauvais nombre | moyen |
| 26 | Accord adjectif-nom | Vérifier l'accord de l'adjectif avec le nom | adjectifs accordés au genre et au nombre du nom | adjectif non accordé, forme presque correcte | moyen à difficile |
| 27 | Pronoms personnels sujets | Identifier les pronoms sujets adaptés à la phrase | je, tu, il, elle, nous, vous, ils, elles | nom sujet, pronom de complément, forme proche | difficile |
| 28 | Pronoms compléments simples | Repérer les pronoms compléments directs ou indirects simples | me, te, le, la, lui, nous, vous, les | pronom sujet, déterminant, mot proche mais faux | difficile |
| 29 | Verbes du 1er groupe | Reconnaître les verbes réguliers en -er | verbes réguliers ou formes de base en -er | nom proche, infinitif d'un autre groupe, forme conjuguée | difficile |
| 30 | Verbes du 2e groupe | Reconnaître les verbes réguliers en -ir | verbes réguliers du type finir | verbe du 1er groupe, verbe du 3e groupe, forme proche | difficile |
| 31 | Verbes fréquents du 3e groupe | Reconnaître les verbes irréguliers fréquents | être, avoir, aller, faire, dire, voir, prendre, venir | verbe régulier proche, forme conjuguée voisine | difficile |
| 32 | Présent : terminaisons | Identifier les terminaisons du présent | formes du présent avec terminaisons régulières | futur proche, infinitif, terminaisons voisines | difficile |
| 33 | Futur : terminaisons | Identifier les terminaisons du futur | formes du futur avec terminaisons régulières | présent voisin, infinitif, forme morphologiquement proche | difficile |
| 34 | Imparfait | Identifier l'imparfait et ses terminaisons | formes en -ais, -ait, -ions, -iez, -aient | présent proche, futur, passé composé | difficile |
| 35 | Passé composé avec avoir | Identifier le passé composé formé avec avoir | formes avec auxiliaire avoir et participe passé | présent proche, futur, autre auxiliaire | difficile |
| 36 | Passé composé avec être | Identifier le passé composé formé avec être | formes avec auxiliaire être et accord du participe passé | présent proche, passé composé avec avoir, forme non accordée | difficile |
| 37 | Accord sujet-verbe pluriel | Vérifier l'accord sujet-verbe au pluriel | phrases avec sujet pluriel et verbe accordé | accord singulier, forme proche mais incorrecte | difficile |
| 38 | Homophones grammaticaux 1 | Distinguer a/à, et/est, son/sont | phrases où l'homophone correct change le sens | homophone voisin, forme correcte de l'autre catégorie | difficile |
| 39 | Homophones grammaticaux 2 | Distinguer ou/où, ce/se, ces/ses | phrases avec homophone contextuel correct | homophone voisin, déterminant ou pronom proche | difficile |
| 40 | Boss Chevalier | Réviser plusieurs notions du monde 2 dans une séquence mixte | accords, pronoms, conjugaison, temps et homophones | phrases correctes mélangées à plusieurs erreurs proches | expert |

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/levels.md | Added level structure, pedagogical overview, synthesis table, and progression requirement | Let readers understand progression without duplicating level data |
| 2026-05-02 | 1.1.0 | 1.0.0 | docs/requirements/levels.md | Added world-based campaign extension for levels 21 to 40 | Extend play duration while keeping the learning progression readable |
