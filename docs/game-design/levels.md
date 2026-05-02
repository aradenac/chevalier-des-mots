# Niveaux

Le projet contient 20 niveaux pédagogiques.
Ils sont définis dans `src/data/levels.js`.

## Structure d’un niveau

Chaque niveau contient au minimum :

- un identifiant
- un titre
- une instruction
- des mots cibles
- des mots non cibles
- un seuil d’étoiles
- une vitesse de chute
- une limite de mots actifs

## Les 20 niveaux

Les niveaux sont organisés comme une progression pédagogique, pas comme une simple montée de vitesse.

| Niv. | Titre | Focus |
| --- | --- | --- |
| 1 | Les mots mal écrits | orthographe de base |
| 2 | Les lettres en trop | lettres ajoutées par erreur |
| 3 | Les lettres manquantes | lettres oubliées |
| 4 | Les accents | accents absents ou faux |
| 5 | Les noms communs | reconnaître un nom |
| 6 | Les verbes simples | reconnaître une action |
| 7 | Les adjectifs | qualifier un nom |
| 8 | Les déterminants | mots placés devant un nom |
| 9 | Les pronoms personnels | je, tu, il, nous, etc. |
| 10 | Les adverbes | précision sur une action |
| 11 | Les prépositions | mots comme à, dans, avec |
| 12 | Les conjonctions | mots de liaison |
| 13 | Les verbes à l’infinitif | infinitif vs conjugué |
| 14 | Les verbes conjugués | phrase avec sujet + verbe |
| 15 | Les verbes au présent | conjugaison au présent |
| 16 | Les verbes au futur | conjugaison au futur |
| 17 | Les verbes au passé composé | passé composé avec avoir ou être |
| 18 | Les accords sujet-verbe | accord dans la phrase |
| 19 | Les homophones | a / à, son / sont |
| 20 | Le défi du chevalier | synthèse de plusieurs erreurs |

## Exemples concrets

- niveau ciblé sur les verbes : `mange`, `court`, `va`
- niveau ciblé sur les homophones : `a / à`, `son / sont`
- niveau ciblé sur les accords : `petit`, `petite`, `petits`

## Critères d’acceptation

- 20 niveaux sont présents
- chaque niveau a une mission lisible
- chaque niveau contient des mots cibles et non cibles
