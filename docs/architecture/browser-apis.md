# APIs navigateur

Le projet dépend de quelques APIs navigateur, mais toutes ne sont pas critiques.

## APIs essentielles

- DOM
- événements clavier
- événements tactiles
- `requestAnimationFrame`

## APIs optionnelles

- `navigator.getGamepads()`
- `AudioContext`
- `speechSynthesis`

## Règle de robustesse

Si une API optionnelle échoue, le jeu doit continuer.

Exemples :

- la manette est absente
- le son WebAudio n’est pas disponible
- la synthèse vocale est indisponible dans Brave

## Diagnostic attendu pour la voix

Quand la synthèse vocale ne peut pas fonctionner, le message attendu est :

> Voix indisponible dans ce navigateur. Le jeu reste jouable.

