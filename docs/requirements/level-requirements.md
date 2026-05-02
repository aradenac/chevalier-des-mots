# Exigences des niveaux

Cette page décrit les exigences des 20 niveaux.
Elle reste lisible par un humain et exploitable par un LLM.

### Le jeu doit proposer 20 niveaux thématiques
`req~level.twenty-themed-levels~1`

Le jeu doit proposer 20 niveaux thématiques.

Rationale:
La progression pédagogique repose sur une séquence complète et stable.

Covers: dsn~level.grammar-progression~1
Needs: impl, utest, doc

### Chaque niveau doit contenir au moins une cible et au moins un distracteur
`req~level.targets-and-distractors~1`

Chaque niveau doit contenir au moins une cible et au moins un distracteur.

Rationale:
Le joueur doit pouvoir apprendre à distinguer une bonne réponse d'une réponse piège.

Covers: dsn~level.grammar-progression~1
Needs: impl, utest

## Structure pédagogique des 20 niveaux

| Niv. | Thème | Fiche courte |
| --- | --- | --- |
| 1 | Les mots mal écrits | Orthographe visible, erreurs simples et faciles à lire. |
| 2 | Les lettres en trop | Lettre ajoutée par erreur à retirer. |
| 3 | Les lettres manquantes | Mot incomplet à corriger. |
| 4 | Les accents | Accent absent ou faux à identifier. |
| 5 | Les noms communs | Reconnaître un nom parmi d'autres natures. |
| 6 | Les verbes simples | Repérer une action. |
| 7 | Les adjectifs | Qualifier un nom. |
| 8 | Les déterminants | Mot placé devant un nom. |
| 9 | Les pronoms personnels | Je, tu, il, nous, etc. |
| 10 | Les adverbes | Préciser l'action ou le temps. |
| 11 | Les prépositions | Introduire un complément. |
| 12 | Les conjonctions | Relier des mots ou des propositions. |
| 13 | L'infinitif | Distinguer l'infinitif d'une forme conjuguée. |
| 14 | Le verbe conjugué | Associer un verbe à son sujet. |
| 15 | Le présent | Distinguer le présent des autres temps. |
| 16 | Le futur | Distinguer le futur du présent. |
| 17 | Le passé composé | Identifier auxiliaire et participe passé. |
| 18 | Les accords sujet-verbe | Voir un accord correct ou faux. |
| 19 | Les homophones | Choisir la bonne forme dans la phrase. |
| 20 | Le défi final | Mélanger plusieurs erreurs déjà rencontrées. |

## Critères de contrôle

- chaque niveau a un thème unique;
- chaque niveau a au moins une cible et un distracteur;
- les corrections sont courtes et lisibles;
- la montée de difficulté reste progressive;
- les 20 niveaux restent stables tant que le gameplay n'est pas modifié.
