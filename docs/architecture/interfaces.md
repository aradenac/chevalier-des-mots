# Interfaces

Le projet est écrit en JavaScript sans types TypeScript.
Cette page documente les contrats implicites observés dans `src/` et dans les tests.

## `Level`

Défini dans `src/data/levels.js`.
Un niveau décrit une mission pédagogique complète.

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

Champs attendus :

- `id` : identifiant unique affiché au joueur.
- `title` : titre court du niveau.
- `instruction` : consigne complète affichée et lue par la narration.
- `shortInstruction` : consigne compacte pour l'interface.
- `difficulty` : libellé de difficulté (`facile`, `moyen`, `difficile`, `expert`).
- `starsToWin` : nombre d'étoiles nécessaires pour réussir le niveau.
- `maxActiveWords` : nombre maximal de mots actifs à l'écran.
- `fallSpeed` : vitesse de chute de base.
- `items` : liste de mots ou phrases proposés au joueur.

## `LevelItem`

Élément pédagogique d'un niveau.
Il peut être une cible à trancher ou un distracteur à éviter.

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

Champs attendus :

- `text` : texte affiché dans le mot qui tombe.
- `target` : `true` si le joueur doit trancher cet élément.
- `feedbackOk` : message après une bonne action.
- `feedbackKo` : message après une erreur ou une cible manquée.
- `correction` : forme corrigée quand l'élément contient une erreur; peut être `undefined`.
- `category` : catégorie pédagogique utilisée pour comprendre le type d'item.

## `GameState`

Créé par `createGameState()` dans `src/core/gameState.js`.
Il représente l'état mutable principal de la partie.

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

Champs attendus :

- `state` : état d'écran, par exemple `menu` ou `playing`.
- `veryEasy` : active les aides de difficulté.
- `currentLevelIndex` : index du niveau dans `LEVELS`, pas l'id affiché.
- `stars` : score courant du niveau.
- `knightX` : position horizontale du chevalier.
- `activeWords` : instances de mots actuellement visibles.
- `spawnTimer` : compteur utilisé par la boucle de spawn.
- `wordIndex` : compteur pour produire des identifiants de mots.
- `targetRetryQueue` : file de cibles à reproposer si elles ont été manquées.

## `ActiveWord`

Instance runtime construite à partir d'un `LevelItem`.
Elle est présente dans `gameState.activeWords`.

```js
{
  id: 12,
  text: "arbbre",
  target: true,
  feedbackOk: "Oui ! Une lettre était en trop : arbre",
  feedbackKo: "Ce mot avait une lettre en trop.",
  correction: "arbre",
  category: "lettre en trop",
  x: 180,
  y: 96,
  speed: 44
}
```

Champs attendus :

- les champs pédagogiques viennent du `LevelItem`;
- `id` identifie l'instance affichée;
- `x` et `y` positionnent le mot dans l'écran;
- `speed` contrôle sa vitesse de chute.

## `InputState`

Contrat commun retourné par les adaptateurs clavier, tactile et manette.

```js
{
  left: false,
  right: true,
  strikePressed: false,
  pausePressed: false,
  connected: true
}
```

Champs attendus :

- `left` : déplacement vers la gauche maintenu.
- `right` : déplacement vers la droite maintenu.
- `strikePressed` : frappe déclenchée sur cette lecture uniquement.
- `pausePressed` : pause déclenchée sur cette lecture uniquement.
- `connected` : disponibilité de la source d'entrée.

## `CollisionResult`

La fonction `findSwordCollision()` retourne le mot touché ou `null`.
Le résultat est donc un `ActiveWord | null`.

```js
const hit = findSwordCollision({
  words: gameState.activeWords,
  swordCenterX: 320,
  swordCenterY: 420,
  veryEasy: false
});
```

Entrée attendue :

- `words` : liste d'`ActiveWord`.
- `swordCenterX` : centre horizontal de la frappe.
- `swordCenterY` : centre vertical de la frappe.
- `veryEasy` : élargit la hitbox si `true`.

Sortie attendue :

- `ActiveWord` le plus proche dans la zone de frappe;
- `null` si aucun mot n'est dans la hitbox.

## `AudioService`

Créé par `createAudioService()` dans `src/adapters/audioService.js`.
Il encapsule WebAudio et doit échouer silencieusement si l'API manque.

```js
{
  isAvailable() {},
  ensureReady() {},
  playSweetSound() {},
  playSwordSound() {}
}
```

Méthodes attendues :

- `isAvailable()` retourne `true` si un constructeur `AudioContext` existe.
- `ensureReady()` crée ou reprend le contexte audio.
- `playSweetSound()` joue un son de réussite et retourne `true` si le son est lancé.
- `playSwordSound()` joue le son de frappe et retourne `true` si le son est lancé.

## `NarrationService`

Créé par `createNarrationService()` dans `src/adapters/narrationService.js`.
Il encapsule `speechSynthesis` et doit préserver la jouabilité si la voix échoue.

```js
{
  init() {},
  loadVoices() {},
  speak(text, options) {},
  setEnabled(nextEnabled) {},
  toggleEnabled() {},
  getButtonLabel() {},
  getDiagnosticMessage() {},
  isAvailable() {},
  isEnabled() {},
  isUnlocked() {}
}
```

Méthodes attendues :

- `init()` charge la préférence utilisateur et les voix disponibles.
- `loadVoices()` lit `speechSynthesis.getVoices()` et choisit une voix française si possible.
- `speak(text, options)` tente de lire une consigne; retourne `false` si la narration ne peut pas parler.
- `setEnabled(nextEnabled)` active ou désactive la narration et persiste la préférence.
- `toggleEnabled()` inverse l'état de narration.
- `getButtonLabel()` fournit le texte du bouton de voix.
- `getDiagnosticMessage()` retourne le message affichable si la voix est indisponible.
- `isAvailable()` indique si l'API navigateur existe.
- `isEnabled()` indique si la narration est activée par préférence.
- `isUnlocked()` indique si une tentative de lecture a déjà été déclenchée.

## Règles pour modifier ces contrats

- Mettre à jour cette page quand un champ est ajouté, retiré ou renommé.
- Ajouter ou adapter un test si un contrat influence le comportement du jeu.
- Garder les adaptateurs tolérants aux APIs navigateur absentes ou incomplètes.
