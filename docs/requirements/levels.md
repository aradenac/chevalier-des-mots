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
- Les niveaux avancés portent sur les temps, accords et homophones.
- Le dernier niveau combine plusieurs types de décisions.
- La structure des niveaux reste cohérente avec les métadonnées de `src/data/levels.js`.

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

Needs:
- impl
- utest
