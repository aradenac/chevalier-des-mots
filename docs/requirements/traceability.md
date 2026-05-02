# Traçabilité

Cette page explique comment lire la traçabilité ascendante et descendante.

## Traçabilité ascendante

Une exigence remonte vers le design ou la spécification qui l'a motivée.

Exemple :

- `req~game.immediate-feedback~1`
- `Covers: dsn~game.loop~1`
- `Covers: dsn~game.vision~1`

## Traçabilité descendante

Une exigence redescend vers son implémentation, ses tests et sa documentation.

Exemple :

- `req~speech.optional~1`
- `// [impl->req~speech.optional~1]`
- `// [utest->req~speech.optional~1]`
- `<!-- [doc->req~speech.optional~1] -->`

## Couverture actuelle

| Exigence | Impl | Utest | Doc | Statut |
| --- | --- | --- | --- | --- |
| `req~game.visible-instruction~1` | oui | non | oui | TODO utest |
| `req~game.target-only-slicing~1` | oui | non | oui | TODO utest |
| `req~game.immediate-feedback~1` | oui | non | oui | TODO utest |
| `req~game.no-hard-punishment~1` | oui | non | oui | TODO utest |
| `req~level.twenty-themed-levels~1` | oui | oui | oui | couvert |
| `req~level.targets-and-distractors~1` | oui | oui | oui | couvert |
| `req~input.keyboard~1` | oui | non | oui | TODO utest |
| `req~input.touch~1` | oui | non | oui | TODO utest |
| `req~input.gamepad~1` | oui | oui | oui | couvert |
| `req~audio.non-blocking~1` | oui | oui | oui | couvert |
| `req~speech.optional~1` | oui | oui | oui | couvert |
| `req~architecture.core-without-browser-api~1` | oui | partiel | oui | TODO utest |
| `req~documentation.markdown-source~1` | oui | non | oui | doc only |
| `req~documentation.static-readable-site~1` | oui | non | oui | doc only |
| `req~traceability.openfasttrace-validation~1` | oui | non | oui | doc only |

## TODO de couverture

- Ajouter des `// [utest->req~game.visible-instruction~1]` quand un test direct existera pour la consigne affichée.
- Ajouter des `// [utest->req~game.target-only-slicing~1]` quand un test direct existera pour la logique de tranchage cible/distracteur.
- Ajouter des `// [utest->req~game.immediate-feedback~1]` quand un test direct existera pour le feedback joueur.
- Ajouter des `// [utest->req~game.no-hard-punishment~1]` quand un test direct existera pour l'absence de punition dure.
- Ajouter des `// [utest->req~input.keyboard~1]` et `// [utest->req~input.touch~1]` quand des tests unitaires dédiés existeront.
- Ajouter des `// [utest->req~architecture.core-without-browser-api~1]` quand un test explicite du core isolé existera.

## Ce que OpenFastTrace doit vérifier

- qu'un design n'est pas orphelin;
- qu'une exigence a bien des descendants;
- qu'une implémentation ou un test ne flotte pas sans exigence;
- qu'un document n'annonce pas une capacité absente.

## Critères d'acceptation

- la direction des liens reste explicite;
- les IDs restent stables;
- la validation trace le chemin entre design, exigences, code et usage;
- le rapport texte d'OpenFastTrace peut être relu sans outil supplémentaire.
