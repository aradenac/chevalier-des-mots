# APIs navigateur

Les APIs navigateur sont optionnelles.
Le jeu doit continuer à fonctionner si elles manquent ou se comportent mal.

## APIs utilisées

- `AudioContext` / `webkitAudioContext`;
- `speechSynthesis`;
- `SpeechSynthesisUtterance`;
- `navigator.getGamepads()`;
- événements clavier et pointeur.

## Cible navigateur

`dsn~cdm.brave-target~1`

Brave doit être considéré comme un navigateur cible.
La documentation doit expliquer ses limites sur la voix.

Needs: req

## SpeechSynthesis optionnelle

`dsn~cdm.browser-apis-optional~1`

La narration doit rester optionnelle parce que certains navigateurs exposent `speechSynthesis` sans voix exploitable.

Needs: impl, utest

## Comportement attendu

- si la voix manque, le jeu reste jouable;
- si `getVoices()` retourne `[]`, un diagnostic explicite apparaît;
- si l'audio manque, le feedback texte reste disponible;
- si la manette manque, le clavier et le tactile restent utilisables.
