# Modules

Cette page mappe les principaux modules du dépôt.

## `src/data/levels.js`

`dsn~cdm.level-data-model~1`

Contient les données pédagogiques.
Ce module ne doit pas contenir de logique de gameplay.

Needs: impl, utest

## `src/core/gameState.js`

`dsn~cdm.state-model~1`

Construit et réinitialise l'état de jeu.

Needs: impl, utest

## `src/core/collision.js`

`dsn~cdm.collision-core~1`

Détecte les collisions entre l'épée et les mots.

Needs: impl, utest

## `src/core/progression.js`

`dsn~cdm.progression-core~1`

Gère la sélection, le passage au niveau suivant et les conditions de réussite.

Needs: impl, utest

## `src/core/wordSpawner.js`

`dsn~cdm.word-spawner-core~1`

Gère le tirage, la vitesse et la densité des mots.

Needs: impl, utest

## `src/adapters/keyboardInput.js`

`dsn~cdm.input-adapters~1`

Normalise le clavier.

Needs: impl, utest

## `src/adapters/touchInput.js`

`dsn~cdm.input-adapters~1`

Normalise le tactile.

Needs: impl, utest

## `src/adapters/gamepadInput.js`

`dsn~cdm.input-adapters~1`

Normalise la manette.

Needs: impl, utest

## `src/adapters/audioService.js`

`dsn~cdm.audio-optional~1`

Encapsule les sons courts.

Needs: impl, utest

## `src/adapters/narrationService.js`

`dsn~cdm.speech-optional~1`

Encapsule la synthèse vocale.

Needs: impl, utest

## `src/diagnostics/speechDiagnostics.js`

`dsn~cdm.speech-diagnostics~1`

Traduit les erreurs de voix en diagnostic lisible.

Needs: impl, utest

## `src/main.js`

`dsn~cdm.main-runtime~1`

Orchestre la partie, les services et le DOM.

Needs: impl, utest

## Critères d'acceptation

- chaque module a une responsabilité lisible;
- les API navigateur restent hors du core;
- les tests peuvent viser un module sans ouvrir le navigateur;
- les données restent séparées du moteur.
