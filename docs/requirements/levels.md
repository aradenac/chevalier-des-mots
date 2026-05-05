# Exigences de niveaux

#### Les niveaux doivent rester des données séparées du moteur
`req~data.levels-separated-from-engine~1`

Status: approved  
Priority: high  
Verification: test  

Le système doit définir les niveaux dans un module de données séparé de la logique d'exécution du jeu.

Rationale: La liste des niveaux doit rester éditable sans mélanger contenu pédagogique et moteur.

Acceptance criteria:

- Les niveaux sont listés dans un module de données dédié.
- Chaque niveau expose ses métadonnées et ses items.
- Les tests vérifient la présence des métadonnées obligatoires et des items de chaque niveau.

Needs: impl, utest

#### Chaque entrée de campagne doit représenter un niveau jouable autonome

`req~level.campaign-entry-is-playable-level~2`

Status: approved  
Priority: high  
Verification: test  
Additional verification: inspection  

Le système doit représenter chaque entrée de la campagne comme un niveau jouable autonome possédant un type unique.

Rationale: La campagne doit rester une progression de niveaux homogènes, même lorsque les niveaux utilisent des mécaniques différentes.

Acceptance criteria:

- Chaque entrée de campagne possède un identifiant ou index de niveau unique.
- Chaque entrée de campagne possède un titre affichable.
- Chaque entrée de campagne possède un type de niveau.
- Un niveau de tranchage possède le type `slicing`.
- Un niveau de dictée possède le type `dictation`.
- Un niveau cannon possède le type `cannon`.
- Le système sélectionne le moteur de jeu à lancer selon le type du niveau courant.
- Une entrée de campagne ne mélange pas simultanément les mécaniques `slicing`, `dictation` et `cannon`.
- Une entrée de campagne ne sert pas de conteneur à plusieurs sous-niveaux jouables.

Needs: impl, utest

## Niveaux 51 à 61
`req~level.tetris-mode~1`

Status: approved  
Priority: high  
Verification: test  
Additional verification: inspection  

Le jeu doit inclure une dizaine de niveaux avec un mode de jeu tetris.

Decription du mode de jeu tetris : un texte à trou est affiché en bas de l'écran.
Des mots tombent du haut de l'écran et le joueur peut contrôler leur position horizontale afin que ceux-ci tombent dans les bons trous du texte.
Si le bon mot est placé dans le trou correspondant, il s'incorpore à la phrase.
Si le mot n'est pas placé à l'endroit attendu, il sera reproposé en tombant du haut de l'écran à nouveau.
Une mot correctement éliminé ne sera plus proposé. Un mot injustement éliminé sera reproposé pour permettre de terminer la complétion du texte.
Des mots distracteurs sont également proposés, qui ne font pas partie de la phrase. Le joueur doit appuyer sur un bouton pour les éliminer.


Le texte doit être correctement rempli pour terminer le niveau.

Le score est calculé comme pour les autres niveaux de 0 à 5 et participe aux statistiques globales.
Le score est de 5 sur 5 si l'élève ne commet pas d'erreur. Il diminue en cas d'erreur.

La difficulté augmente graduellement:
- la vitesse de chute augmente.
- le nombre de trous dans le texte augmente.

Rationale: apprendre à l'enfant à constituer des phrases correctes.

Acceptance criteria:

- La position du texte à trou est dans le dernier tier de l'écran, avec une marge avec la limite basse du champ de vision.
- Le texte à trou doit tenir sur une seule ligne et ne doit pas dépasser de l'écran, ni être coupé.
- Le texte est centré horizontalement.
- Les mots ont une vitesse telle que leur descente met de 6 secondes à traverser l'écran pour les niveaux faciles. La vitesse augmente jusqu'à 3 secondes pour le niveau le plus dur.
- La trajectoire de chute des mots suit une direction verticale.
- Les mots qui tombent ont une largeur 10% inférieure à celle du trou. Ce pourcentage correspond à la marge d'acceptation de placement du mot.
- Le mot est validé quand il est correctement placé verticalement selon les marges de tolérence définies, et quand sa position hosrizontale égale celle de la phrase.
- Une animation et un son de succès sont joués par le jeu à chaque mot correctement placé.
- Une animation et un son d'échec sont joués par le jeu à chaque mot incorrectement placé, ou injustement éliminé.
- Un mot distracteur correctement éliminé s'accompagne d'un son et d'une animation d'explosion de feu d'artifice autour de l'élément.
- Aucun personnage n'apparait dans ce niveau.
- Les mots apparaissent à une position horizontale aléatoire.
- Les mots ne peuvent jamais tomber plus bas que le texte. Aucun dépassement inférieur n'est permis, ils doivent être validés ou invalidés automatiquement en atteignant cette limite basse.

Needs: impl, utest


## Contexte non normatif : vue pédagogique des niveaux

La campagne étendue prévoit deux mondes de 25 niveaux chacun.
Le Monde 1 — Écuyer installe les repères orthographiques, les premières catégories grammaticales et les premiers niveaux cannon.
Le Monde 2 — Chevalier consolide les accords, les temps, les homophones et les niveaux cannon les plus exigeants.

### Paliers de difficulté

#### Niveaux 1 à 9 : repères visuels et premiers trous

Objectif pédagogique:
Amener l'enfant à repérer des erreurs visibles et à compléter des mots familiers avec peu de lettres manquantes.

Type de décision demandée à l'enfant:
Reconnaître une erreur orthographique simple, puis viser un trou compatible avec la lettre attendue.

Types de distracteurs:
Fautes de lettres, lettres en trop, lettres manquantes, accents absents et trous sur des mots très connus.

Forme du feedback attendu:
Un feedback immédiat, très explicite et court, qui confirme la correction ou signale l'erreur de manière non punitive.

Difficulté attendue:
Faible, avec des contrastes orthographiques nets et des complétions très guidées.

#### Niveaux 10 à 19 : premières abstractions grammaticales

Objectif pédagogique:
Faire identifier les catégories grammaticales de base et compléter des mots plus structurés.

Type de décision demandée à l'enfant:
Décider si le mot appartient à la catégorie visée ou quelle lettre complète correctement le trou proposé.

Types de distracteurs:
Verbes, adjectifs, adverbes, déterminants, pronoms, prépositions, conjonctions et lettres proches dans des mots simples.

Forme du feedback attendu:
Un feedback bref qui nomme la catégorie correcte ou la lettre correcte attendue.

Difficulté attendue:
Modérée, avec une première abstraction grammaticale et des complétions plus nombreuses.

#### Niveaux 20 à 25 : synthèse du Monde 1

Objectif pédagogique:
Réinvestir l'orthographe, les premières catégories grammaticales, la dictée et les premiers niveaux cannon dans un même monde.

Type de décision demandée à l'enfant:
Reconnaître rapidement la nature de la consigne puis appliquer la mécanique propre au type du niveau.

Types de distracteurs:
Erreurs visibles, formes verbales proches, groupes de mots courts et phrases brèves à compléter.

Forme du feedback attendu:
Un feedback synthétique mais précis, qui relie clairement l'action du joueur à la correction attendue.

Difficulté attendue:
Élevée pour le Monde 1, avec une première synthèse multi-mécanique.

#### Niveaux 26 à 39 : consolidation grammaticale et morphologique

Objectif pédagogique:
Consolider les accords, les groupes verbaux, les pronoms, les temps et les complétions à trous plus exigeantes.

Type de décision demandée à l'enfant:
Identifier la structure grammaticale attendue ou compléter précisément plusieurs lettres en contexte.

Types de distracteurs:
Accords proches, terminaisons verbales voisines, pronoms de nature différente, homophones et lettres concurrentes dans des expressions courtes.

Forme du feedback attendu:
Un feedback qui explicite l'accord, la terminaison ou la lettre attendue sans interrompre durablement la progression.

Difficulté attendue:
Difficile, avec plus de mémoire de forme et de raisonnement morphologique.

#### Niveaux 40 à 50 : synthèse du Monde 2

Objectif pédagogique:
Réinvestir les homophones, les temps, les accords et les phrases à trous dans les séquences les plus complètes de la campagne.

Type de décision demandée à l'enfant:
Choisir rapidement la bonne mécanique mentale selon le niveau, puis exécuter une réponse précise jusqu'à la validation finale.

Types de distracteurs:
Homophones sensibles, accords fins, verbes à plusieurs temps et phrases comportant plusieurs trous répartis sur plusieurs mots.

Forme du feedback attendu:
Un feedback synthétique mais suffisamment précis pour soutenir la correction sans rendre le niveau punitif.

Difficulté attendue:
Maximale, avec plusieurs familles de notions croisées dans un même monde.

### Table synthétique non normative du Monde 1 — Écuyer

| Niveau | Type | Thème | Objectif pédagogique | Difficulté attendue |
| --- | --- | --- | --- | --- |
| 1 | slicing | Orthographe visible | Repérer une faute simple dans un mot isolé | facile |
| 2 | slicing | Lettre en trop | Repérer une lettre superflue | facile |
| 3 | slicing | Lettre manquante | Repérer une lettre absente dans un mot court | facile |
| 4 | cannon | Premiers trous | Compléter des mots familiers avec peu de lettres manquantes | facile |
| 5 | slicing | Accents visibles | Repérer un accent absent ou erroné | facile |
| 6 | dictation | Mots simples | Transcrire un mot simple entendu | facile |
| 7 | slicing | Noms communs | Identifier les noms communs | facile |
| 8 | slicing | Verbes simples | Identifier les verbes simples | facile |
| 9 | cannon | Voyelles manquantes | Replacer des voyelles dans des mots simples | facile |
| 10 | slicing | Adjectifs | Identifier les adjectifs qualificatifs | moyen |
| 11 | slicing | Déterminants | Identifier les déterminants courants | moyen |
| 12 | dictation | Accents et lettres muettes | Transcrire des mots avec accent ou lettre muette | moyen |
| 13 | slicing | Pronoms personnels | Identifier les pronoms personnels | moyen |
| 14 | cannon | Syllabes et lettres doubles | Compléter des mots avec plusieurs trous | moyen |
| 15 | slicing | Adverbes | Identifier les adverbes fréquents | moyen |
| 16 | slicing | Prépositions | Identifier les prépositions courantes | moyen |
| 17 | slicing | Conjonctions | Identifier les conjonctions simples | moyen |
| 18 | dictation | Groupes de mots | Transcrire des groupes de mots courts | moyen |
| 19 | cannon | Accents simples | Replacer des lettres accentuées dans des mots courts | moyen |
| 20 | slicing | Infinitif | Distinguer les verbes à l'infinitif | moyen |
| 21 | slicing | Verbe conjugué et infinitif | Distinguer verbe conjugué et infinitif | moyen |
| 22 | slicing | Présent | Identifier des formes verbales au présent | difficile |
| 23 | dictation | Phrase courte guidée | Transcrire une phrase courte simple | difficile |
| 24 | cannon | Petits groupes de mots | Compléter un groupe nominal court | difficile |
| 25 | slicing | Boss Écuyer | Réviser plusieurs notions du monde 1 | expert |

### Table synthétique non normative du Monde 2 — Chevalier

| Niveau | Type | Thème | Objectif pédagogique | Difficulté attendue |
| --- | --- | --- | --- | --- |
| 26 | slicing | Mots presque corrects | Repérer des mots très proches de la forme attendue | moyen |
| 27 | slicing | Genre du nom | Identifier le genre grammatical du nom | moyen |
| 28 | dictation | Phrase avec accords simples | Transcrire une phrase courte avec accords simples | moyen |
| 29 | cannon | Genre et nombre | Compléter des mots accordés en genre et en nombre | moyen à difficile |
| 30 | slicing | Nombre du nom | Identifier singulier et pluriel | moyen |
| 31 | slicing | Accord déterminant-nom | Vérifier l'accord dans un groupe nominal | moyen |
| 32 | slicing | Accord adjectif-nom | Vérifier l'accord de l'adjectif avec le nom | difficile |
| 33 | dictation | Phrases courtes variées | Transcrire des phrases courtes plus denses | difficile |
| 34 | cannon | Terminaisons du présent | Compléter des verbes courts au présent | difficile |
| 35 | slicing | Pronoms sujets | Identifier les pronoms sujets adaptés à la phrase | difficile |
| 36 | slicing | Pronoms compléments | Identifier des pronoms compléments simples | difficile |
| 37 | slicing | Verbes du 1er et 2e groupe | Reconnaître des familles verbales régulières | difficile |
| 38 | dictation | Ponctuation et groupes verbaux | Transcrire une phrase plus longue avec ponctuation | difficile |
| 39 | cannon | Temps simples | Compléter des formes verbales au futur ou à l'imparfait | difficile |
| 40 | slicing | Verbes fréquents du 3e groupe | Reconnaître des verbes irréguliers fréquents | difficile |
| 41 | slicing | Présent : terminaisons | Identifier les terminaisons du présent | difficile |
| 42 | slicing | Futur et imparfait | Distinguer des temps voisins | difficile |
| 43 | dictation | Phrases à structure grammaticale fine | Transcrire une phrase avec plusieurs pièges légers | difficile |
| 44 | cannon | Homophones guidés | Compléter des phrases avec des mots sensibles | difficile |
| 45 | slicing | Passé composé | Identifier et distinguer des formes du passé composé | difficile |
| 46 | slicing | Accord sujet-verbe pluriel | Vérifier l'accord sujet-verbe au pluriel | difficile |
| 47 | slicing | Homophones grammaticaux | Distinguer des homophones contextuels | difficile |
| 48 | dictation | Phrase longue avec homophones | Transcrire une phrase plus longue intégrant plusieurs indices | expert |
| 49 | cannon | Phrases à trous | Compléter plusieurs mots dans une phrase | expert |
| 50 | slicing | Boss Chevalier | Réviser plusieurs notions du monde 2 | expert |

### Table non normative de placement conseillé des dix niveaux cannon

| Position cible | Type | Thème | Objectif pédagogique | Contenu typique | Difficulté attendue |
| --- | --- | --- | --- | --- | --- |
| 4 | cannon | Premiers trous | Compléter des mots familiers avec peu de lettres manquantes | chat, lune, roi, fée | facile |
| 9 | cannon | Voyelles manquantes | Replacer des voyelles dans des mots simples | maison, cheval, dragon | facile |
| 14 | cannon | Syllabes et lettres doubles | Compléter des mots avec plusieurs trous | ballon, couronne, princesse | moyen |
| 19 | cannon | Accents simples | Replacer des lettres accentuées dans des mots courts | épée, forêt, château | moyen |
| 24 | cannon | Petits groupes de mots | Compléter un groupe nominal court | petit dragon, grande porte | moyen |
| 29 | cannon | Genre et nombre | Compléter des mots accordés | une petite maison, les grands arbres | moyen à difficile |
| 34 | cannon | Terminaisons du présent | Compléter des verbes courts en contexte | je parle, nous chantons | difficile |
| 39 | cannon | Temps simples | Compléter des formes verbales au futur ou à l’imparfait | il jouera, nous marchions | difficile |
| 44 | cannon | Homophones guidés | Compléter une phrase avec lettres manquantes dans des mots sensibles | Il est là. / Elle a faim. | difficile |
| 49 | cannon | Phrases à trous | Compléter plusieurs mots dans une phrase | Le chevalier ouvre la grande porte. | expert |

#### Progression pédagogique des niveaux
`req~level.pedagogical-progression~2`

Status: approved  
Priority: high  
Verification: test  
Additional verification: inspection  

Le système doit organiser les niveaux selon une progression allant de distinctions visuelles simples vers des distinctions grammaticales plus abstraites.

Rationale: L'enfant doit pouvoir construire ses compétences progressivement sans rupture brutale de difficulté.

Acceptance criteria:

- Les premiers niveaux portent sur des erreurs visibles ou familières.
- Les niveaux intermédiaires portent sur les catégories grammaticales, les premières dictées et les premiers niveaux cannon.
- Les niveaux avancés portent sur les accords dans le groupe nominal, les groupes verbaux, les temps, les homophones et les phrases à trous.
- La progression se fait par mondes, avec un Monde 1 centré sur les distinctions visibles puis un Monde 2 centré sur la consolidation grammaticale.
- Les dix niveaux cannon suivent une progression pédagogique allant des mots simples avec peu de trous vers les phrases à trous contenant plusieurs mots.
- Le dernier niveau combine plusieurs types de décisions.
- La structure des niveaux reste cohérente avec les métadonnées de `src/data/levels.js`.

Needs: impl, utest

#### La progression doit avancer après un niveau terminé

`req~level.progression-model~3`

Status: approved  
Priority: high  
Verification: test  

Le système doit gérer le niveau courant avec un indice borné et passer au niveau suivant après qu'un niveau est terminé selon les règles de son type.

Rationale: La progression doit couvrir les niveaux de tranchage, les niveaux de dictée et les niveaux cannon sans dépendre d'une seule mécanique de victoire.

Acceptance criteria:

- Un index trop petit est ramené au premier niveau.
- Un index trop grand est ramené au dernier niveau.
- Un niveau de tranchage terminé avec victoire sélectionne le niveau suivant.
- Un niveau de dictée validé sélectionne le niveau suivant quand le joueur choisit de continuer.
- Un niveau cannon terminé avec tous ses trous complétés sélectionne le niveau suivant.
- Un niveau final terminé renvoie au premier niveau ou à l'état de fin de campagne défini par l'interface.
- Le passage au niveau suivant conserve le compte joueur actif.
- Le passage d'un niveau à l'autre utilise les entrées de campagne, quel que soit leur type.
- Un niveau de dictée n'est pas sauté, fusionné avec le niveau précédent ou fusionné avec le niveau suivant.
- Un niveau cannon n'est pas sauté, fusionné avec le niveau précédent ou fusionné avec le niveau suivant.
- Le type du niveau suivant détermine l'écran et le moteur de jeu lancés.

Needs: impl, utest

## Campagne étendue

#### La campagne doit progresser par mondes
`req~level.extended-campaign-worlds~2`

Status: approved  
Priority: high  
Verification: test  
Additional verification: inspection  

Le système doit organiser la campagne en mondes progressifs afin d'augmenter la durée de jeu et de structurer l'apprentissage.

Rationale: Le découpage en mondes permet d'allonger la campagne, de clarifier l'intention pédagogique de chaque tranche de niveaux et de garder une progression lisible.

Acceptance criteria:

- Le Monde 1 contient les niveaux 1 à 25.
- Le Monde 2 contient les niveaux 26 à 50.
- Chaque monde a un titre et une intention pédagogique.
- Chaque monde contient des niveaux `slicing`, `dictation` et `cannon`.
- Les boss de monde révisent plusieurs familles de notions.
- Les mondes sont ordonnés selon leurs plages de niveaux.

Needs: impl, utest

#### Le second monde doit consolider l'orthographe et la grammaire
`req~level.world-two-grammar-consolidation~2`

Status: approved  
Priority: high  
Verification: test  
Additional verification: inspection  

Le système doit définir un second monde de niveaux centré sur la consolidation grammaticale et orthographique.

Rationale: Le second monde doit prolonger la courbe d'apprentissage sans recopier la base complète des items dans la documentation.

Acceptance criteria:

- Les niveaux 26 à 50 sont définis par thème.
- Les niveaux 26 à 50 couvrent orthographe fine, accords, pronoms, groupes verbaux, temps, homophones et phrases à trous.
- Le Monde 2 contient des niveaux `slicing`, `dictation` et `cannon`.
- Le niveau 50 mélange les notions du monde 2.
- Les niveaux du monde 2 utilisent des cibles, dictées, puzzles à trous et distracteurs représentatifs sans dupliquer toute la base d'items dans la spec.

Needs: impl, utest

#### La campagne complète doit durer plus longtemps
`req~level.longer-play-session~2`

Status: approved  
Priority: medium  
Verification: inspection  

Le système doit fournir une campagne complète contenant au moins 50 niveaux approuvés ou implémentés.

Rationale: Le jeu actuel est trop court pour installer suffisamment de répétition et de consolidation.

Acceptance criteria:

- La campagne complète contient au moins 50 niveaux approuvés ou implémentés.
- Les niveaux ajoutés ne dépassent pas la borne de `fallSpeed` définie par les tests de niveaux lorsqu'ils utilisent une mécanique de chute.
- Les niveaux ajoutés couvrent plusieurs familles pédagogiques distinctes.
- La campagne complète comprend dix niveaux `cannon` intercalés dans les deux mondes existants.

Needs: impl

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/levels.md | Added level structure, pedagogical overview, synthesis table, and progression requirement | Let readers understand progression without duplicating level data |
| 2026-05-02 | 1.1.0 | 1.0.0 | docs/requirements/levels.md | Added world-based campaign extension for levels 21 to 40 | Extend play duration while keeping the learning progression readable |
| 2026-05-03 | 1.2.0 | 1.2.0 | docs/requirements/levels.md | Approved all requirements and normalized page structure | All listed requirements represent accepted product targets; page history must remain at the end |
| 2026-05-03 | 1.4.0 | 1.2.0 | docs/requirements/levels.md | Normalized verification fields, separated progression concerns and marked overview sections as non-normative | Apply writing rules without changing the approved level model |
| 2026-05-03 | 2.1.0 | 1.3.0 | docs/requirements/levels.md | Added autonomous campaign entry requirement and clarified type-based progression | Prevent dictation from being implemented as an interstitial exercise between levels |
| 2026-05-03 | 2.2.0 | 1.3.0 | docs/requirements/levels.md | Extended the campaign to 50 levels across two 25-level worlds and integrated cannon as a third autonomous level type | Specify the placement and progression of cannon levels before implementation |
