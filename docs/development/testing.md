# Vérification

La vérification attendue avant intégration dépend du type de changement.

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

`oman~cdm.trace-commands~1`

Needs: req
