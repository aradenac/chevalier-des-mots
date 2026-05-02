# Interfaces

Cette page décrit les contrats implicites du projet.
Ils sont écrits en JavaScript, sans TypeScript, mais doivent rester stables.

## `Level`

`dsn~architecture.level~1`

Un niveau décrit une mission pédagogique complète.

Needs: impl, utest, doc

```js
{
  id: 1,
  title: "Les mots mal écrits",
  instruction: "Tranche les mots qui ne sont pas bien orthographiés.",
  shortInstruction: "Tranche les mots mal écrits",
  difficulty: "facile",
  starsToWin: 5,
  maxActiveWords: 3,
  fallSpeed: 42,
  items: [LevelItem]
}
```

## `LevelItem`

`dsn~architecture.level-item~1`

Un item décrit un mot ou une phrase à afficher dans un niveau.

Needs: impl, utest, doc

```js
{
  text: "chatt",
  target: true,
  feedbackOk: "Bien joué ! On écrit : chat",
  feedbackKo: "Oups, ce mot était une cible.",
  correction: "chat",
  category: "orthographe"
}
```

## `GameState`

`dsn~architecture.game-state~1`

L'état de jeu doit rester simple et mutable par la boucle principale.

Needs: impl, utest, doc

```js
{
  state: "menu",
  veryEasy: false,
  currentLevelIndex: 0,
  stars: 0,
  knightX: 320,
  activeWords: [],
  spawnTimer: 0,
  wordIndex: 0,
  targetRetryQueue: []
}
```

## `ActiveWord`

`dsn~architecture.active-word~1`

Une `ActiveWord` est une instance runtime d'un `LevelItem`.
Elle ajoute des coordonnées et une vitesse.

Needs: impl, utest, doc

## `InputState`

`dsn~architecture.input-state~1`

L'état d'entrée doit être unifié pour le clavier, le tactile et la manette.

Needs: impl, utest, doc

```js
{
  left: false,
  right: true,
  strikePressed: false,
  pausePressed: false,
  connected: true
}
```

## `CollisionResult`

`dsn~architecture.collision-result~1`

`findSwordCollision()` retourne le mot touché ou `null`.

Needs: impl, utest, doc

## `AudioService`

`dsn~architecture.audio-service~1`

Le service audio doit encapsuler WebAudio et échouer silencieusement si l'API manque.

Needs: impl, utest, doc

## `NarrationService`

`dsn~architecture.narration-service~1`

Le service de narration doit encapsuler `speechSynthesis` et laisser le jeu jouable sans voix.

Needs: impl, utest, doc

## Critères d'acceptation

- les champs clés restent stables;
- les noms des services restent explicites;
- les contrats sont lisibles par un LLM;
- les tests peuvent s'appuyer sur ces formes.
