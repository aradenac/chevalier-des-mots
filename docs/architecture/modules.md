# Modules

Cette page mappe les principaux modules du dépôt.

## `src/data/levels.js`

`dsn~architecture.level~1`

Contient les données pédagogiques.
Ce module ne doit pas contenir de logique de gameplay.

Needs: impl, utest, doc

## `src/core/gameState.js`

`dsn~architecture.game-state~1`

Construit et réinitialise l'état de jeu.

Needs: impl, utest, doc

## `src/core/collision.js`

`dsn~architecture.collision-result~1`

Détecte les collisions entre l'épée et les mots.

Needs: impl, utest, doc

## `src/core/progression.js`

`dsn~architecture.progression~1`

Gère la sélection, le passage au niveau suivant et les conditions de réussite.

Needs: impl, utest, doc

## `src/core/wordSpawner.js`

`dsn~architecture.word-spawner~1`

Gère le tirage, la vitesse et la densité des mots.

Needs: impl, utest, doc

## `src/adapters/keyboardInput.js`

`dsn~architecture.input-adapters~1`

Normalise le clavier.

Needs: impl, utest, doc

## `src/adapters/touchInput.js`

`dsn~architecture.input-adapters~1`

Normalise le tactile.

Needs: impl, utest, doc

## `src/adapters/gamepadInput.js`

`dsn~architecture.input-adapters~1`

Normalise la manette.

Needs: impl, utest, doc

## `src/adapters/audioService.js`

`dsn~architecture.audio-service~1`

Encapsule les sons courts.

Needs: impl, utest, doc

## `src/adapters/narrationService.js`

`dsn~architecture.narration-service~1`

Encapsule la synthèse vocale.

Needs: impl, utest, doc

## `src/diagnostics/speechDiagnostics.js`

`dsn~architecture.speech-diagnostics~1`

Traduit les erreurs de voix en diagnostic lisible.

Needs: impl, utest, doc

## `src/main.js`

`dsn~architecture.main-runtime~1`

Orchestre la partie, les services et le DOM.

Needs: impl, utest, doc

## Critères d'acceptation

- chaque module a une responsabilité lisible;
- les API navigateur restent hors du core;
- les tests peuvent viser un module sans ouvrir le navigateur;
- les données restent séparées du moteur.
