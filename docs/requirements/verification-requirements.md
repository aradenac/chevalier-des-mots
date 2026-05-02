# Exigences de vérification

Cette page fixe les preuves minimales attendues avant de considérer un changement comme prêt.

### La traçabilité doit être validable par OpenFastTrace en CLI sous Linux
`req~traceability.openfasttrace-validation~1`

La traçabilité doit être validable par OpenFastTrace en CLI sous Linux.

Rationale:
Le projet doit garder une validation standard, gratuite et reproductible.

Needs: doc

### Un changement de code doit passer la suite de tests
`req~verification.unit-tests~1`

Un changement de code doit passer la suite Vitest pertinente.

Needs: impl, doc

### Un changement de code doit permettre le build applicatif
`req~verification.build-app~1`

Un changement de code doit permettre `npm run build`.

Needs: impl, doc

### Un changement documentaire doit permettre le build MkDocs
`req~verification.docs-build~1`

Un changement documentaire doit permettre `npm run docs:build`.

Needs: impl, doc

### Un changement lié aux exigences doit pouvoir être tracé
`req~verification.trace-run~1`

Un changement lié aux exigences doit pouvoir être vérifié avec `npm run trace` quand le JAR OpenFastTrace est présent.

Needs: impl, doc

### Aucun validateur maison ne doit être créé
`req~verification.no-custom-validator~1`

Le projet ne doit pas créer de validateur maison pour la traçabilité.

Needs: impl, doc

## Critères d'acceptation

- le changement est vérifié par des commandes reproductibles;
- la commande de trace reste un wrapper simple;
- les erreurs d'outillage sont expliquées clairement;
- les rapports se déposent dans `build/traceability/`.
