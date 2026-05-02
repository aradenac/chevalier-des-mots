# Exigences de vérification

Cette page fixe les preuves minimales attendues avant de considérer un changement comme prêt.

## Tests unitaires

`req~cdm.test-suite~1`

Un changement de code doit passer la suite Vitest pertinente.

Needs: dsn, utest, oman

## Build applicatif

`req~cdm.build-app~1`

Un changement de code doit permettre `npm run build`.

Needs: dsn, utest, oman

## Build documentaire

`req~cdm.docs-build~1`

Un changement documentaire doit permettre `npm run docs:build`.

Needs: dsn, utest, oman

## Traçabilité

`req~cdm.trace-run~1`

Un changement lié aux exigences doit pouvoir être vérifié avec `npm run trace` quand le JAR OpenFastTrace est présent.

Needs: dsn, utest, oman

## Règle de sécurité

`req~cdm.no-custom-validator~1`

Le projet ne doit pas créer de validateur maison pour la traçabilité.

Needs: dsn, utest, oman

## Critères d'acceptation

- le changement est vérifié par des commandes reproductibles;
- la commande de trace reste un wrapper simple;
- les erreurs d'outillage sont expliquées clairement;
- les rapports se déposent dans `build/traceability/`.
