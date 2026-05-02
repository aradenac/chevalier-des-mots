# Design des niveaux

Le jeu contient 20 niveaux thématiques.
Ils sont conçus comme une progression pédagogique, pas comme une simple montée de vitesse.

`dsn~level.grammar-progression~1`

<!-- [doc->req~level.twenty-themed-levels~1] -->
<!-- [doc->req~level.targets-and-distractors~1] -->

Needs: req, doc

## Table des 20 niveaux

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
| 13 | Les verbes à l'infinitif | infinitif vs conjugué |
| 14 | Les verbes conjugués | phrase avec sujet + verbe |
| 15 | Les verbes au présent | conjugaison au présent |
| 16 | Les verbes au futur | conjugaison au futur |
| 17 | Les verbes au passé composé | passé composé avec avoir ou être |
| 18 | Les accords sujet-verbe | accord dans la phrase |
| 19 | Les homophones | a / à, son / sont |
| 20 | Le défi du chevalier | synthèse de plusieurs erreurs |

## Logique de conception

- les 4 premiers niveaux corrigent l'orthographe visible;
- les 8 niveaux suivants classent les mots par nature grammaticale;
- les 4 niveaux suivants travaillent les temps verbaux;
- les 2 niveaux suivants forcent la correction de phrase;
- le dernier niveau combine plusieurs familles d'erreurs.

## Exemples concrets

- niveau 1 : `chatt`, `méson`, `chevau`;
- niveau 10 : `vite`, `lentement`, `demain`;
- niveau 19 : `Il à un chien`, `Je vais a Paris`;
- niveau 20 : `Le cheval courent vite`, `Le dragon magik`.

## Critères d'acceptation

- les 20 niveaux sont conservés;
- chaque niveau a un thème explicite;
- chaque niveau a des cibles et des distracteurs;
- la progression pédagogique reste lisible à la lecture du tableau.
