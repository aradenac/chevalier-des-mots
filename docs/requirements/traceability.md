# Traçabilité

Cette page explique comment lire la traçabilité ascendante et descendante.

## Traçabilité ascendante

Une exigence remonte vers le besoin qui l'a motivée.

Exemple :

- `req~cdm.feedback-modalities~1`
- remonte vers `feat~cdm.feedback-loop~1`
- remonte vers `feat~cdm.game-concept~1`

## Traçabilité descendante

Une exigence redescend vers sa conception, ses tests et ses pages de documentation.

Exemple :

- `req~cdm.speech-optional~1`
- redescend vers `dsn~cdm.browser-apis-optional~1`
- redescend vers `impl~cdm.speech-optional~1`
- redescend vers `utest~cdm.speech-optional~1`
- redescend vers `uman~troubleshooting-audio-voice~1`

## Ce que OpenFastTrace doit vérifier

- qu'un besoin n'est pas orphelin;
- qu'une exigence a bien des descendants;
- qu'une implémentation ou un test ne flotte pas sans exigence;
- qu'un document n'annonce pas une capacité absente.

## Exemple de matrice

| Artefact | Rôle | Exemple |
| --- | --- | --- |
| `feat` | intention produit | jeu pédagogique pour enfant de 10 ans |
| `req` | exigence | narration optionnelle |
| `dsn` | architecture | séparation core/adapters |
| `impl` | code | services de narration et audio |
| `utest` | preuve | tests de narration et de collision |
| `uman` | notice | dépannage voix et contrôles |
| `oman` | maintenance | commandes de vérification |

## Critères d'acceptation

- la direction des liens reste explicite;
- les IDs ne changent pas au hasard;
- la validation trace le chemin entre besoins, code et usage;
- le rapport texte d'OpenFastTrace peut être relu sans outil supplémentaire.
