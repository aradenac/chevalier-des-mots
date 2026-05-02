# Vérification

La vérification attendue avant intégration dépend du type de changement.

<!-- [doc->req~verification.unit-tests~1] -->
<!-- [doc->req~verification.build-app~1] -->
<!-- [doc->req~verification.docs-build~1] -->
<!-- [doc->req~traceability.openfasttrace-validation~1] -->

## Changement de code

```bash
npm test
npm run build
```

## Changement de documentation

```bash
npm run docs:build
```

## Changement de traçabilité

```bash
npm run trace
```

## Ce qui doit être vérifié

- les tests passent;
- le build du jeu passe;
- le build de la doc passe;
- la trace passe si le JAR est présent;
- un échec d'outillage est expliqué clairement.
