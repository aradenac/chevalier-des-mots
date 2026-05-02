# TOOLING

Les outils nécessaires au dépôt sont limités à quelques commandes standard.

- OpenFastTrace pour valider la traçabilité.
- Java 17+ pour exécuter le JAR OpenFastTrace.
- MkDocs pour rendre les exigences en HTML statique.
- `npm test` pour exécuter la suite Vitest.
- `npm run test:report` pour exécuter Vitest avec un rapport JUnit si le reporter est disponible.
- `npm run build` pour générer le jeu.
- `npm run docs:build` pour générer le site de documentation.
- `npm run trace` pour lancer OpenFastTrace.
- `npm run verify` pour enchaîner les vérifications principales.

Si le reporter JUnit de Vitest n'est pas disponible dans la version installée, la suite reste exécutable avec `npm test` et la limite doit être documentée dans ce référentiel.

Le dépôt ne prévoit pas de guide utilisateur du jeu dans cette zone. Cette page décrit seulement les outils et commandes utiles au maintien du référentiel d'exigences.
