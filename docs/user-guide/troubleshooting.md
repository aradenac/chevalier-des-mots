# Dépannage

Cette page aide à diagnostiquer les problèmes courants sans bloquer la partie.
Le principe général du jeu est le suivant : si une API optionnelle échoue, le jeu reste jouable.

## La voix ne parle pas

Cause probable :

- le navigateur ne fournit pas de voix exploitable;
- le navigateur bloque la synthèse vocale avant une interaction utilisateur;
- aucune voix système n'est installée;
- la narration a été désactivée par l'utilisateur;
- `speechSynthesis.getVoices()` retourne une liste vide.

Comportement attendu :

- le jeu reste jouable;
- les consignes restent affichées à l'écran;
- le message `Voix indisponible dans ce navigateur. Le jeu reste jouable.` peut apparaître.

Vérifications :

1. Cliquer dans le jeu ou appuyer sur une touche, puis relancer la consigne.
2. Vérifier que le bouton de voix n'indique pas `Voix indisponible`.
3. Essayer Chrome si le problème apparaît dans Brave.
4. Vérifier qu'une voix française ou système est installée dans l'OS.

## Diagnostic Brave / `speechSynthesis`

Brave peut exposer `window.speechSynthesis` tout en retournant aucune voix.
Dans ce cas, l'API existe, mais la narration ne peut pas produire de son fiable.

Exemple observable dans la console :

```js
window.speechSynthesis.getVoices()
// []
```

Interprétation :

- `speechSynthesis` existe;
- `SpeechSynthesisUtterance` peut exister aussi;
- aucune voix n'est disponible pour parler;
- le jeu affiche un diagnostic et continue sans voix.

Action recommandée :

- ne pas considérer ce cas comme un crash;
- tester la jouabilité clavier ou tactile;
- vérifier le même scénario dans Chrome pour isoler un comportement propre à Brave.

## `getVoices() = []`

`getVoices()` peut retourner `[]` au premier chargement.
Certains navigateurs remplissent la liste plus tard via l'événement `voiceschanged`.

Comportement attendu dans le jeu :

- la narration tente de charger les voix;
- si la liste reste vide, un diagnostic est affiché;
- la boucle de jeu, les contrôles et les feedbacks texte continuent de fonctionner.

Exemple de diagnostic manuel :

```js
const voices = window.speechSynthesis.getVoices();
console.log(voices.length);
```

Si la valeur reste `0`, le problème vient probablement du navigateur ou du système, pas des niveaux.

## Erreur `synthesis-failed`

`synthesis-failed` indique que le navigateur a accepté une demande de lecture, puis a échoué pendant la synthèse.
Cela peut arriver avec une voix indisponible, un moteur vocal instable ou une politique navigateur.

Comportement attendu :

- l'erreur est capturée par le service de narration;
- le message `Voix indisponible dans ce navigateur. Le jeu reste jouable.` peut être affiché;
- le jeu ne doit pas interrompre la partie;
- le joueur peut continuer avec les consignes écrites.

Exemple de lecture du symptôme :

```text
[Narration] error: synthesis-failed
```

Action recommandée :

- continuer le test fonctionnel sans voix;
- vérifier que les messages texte restent lisibles;
- tester dans un autre navigateur si la narration est un critère de recette.

## Le son est absent

Vérifications :

- le volume système n'est pas à zéro;
- le navigateur autorise l'audio;
- le jeu a déjà reçu une interaction utilisateur;
- le périphérique de sortie audio est correct;
- l'onglet n'est pas muet.

Comportement attendu :

- les sons WebAudio sont optionnels;
- une absence de son ne doit pas empêcher de jouer;
- les feedbacks visuels et textuels restent disponibles.

## La manette ne répond pas

Vérifications :

- la manette est branchée;
- un bouton a été pressé au moins une fois;
- l'onglet du navigateur est actif;
- le navigateur expose la manette via le Gamepad API.

Exemple de diagnostic manuel :

```js
navigator.getGamepads()
```

Si la liste est vide, le navigateur ne voit pas la manette.
Le jeu reste utilisable au clavier et au tactile.

## Vérification minimale après correction

Après une correction liée au dépannage :

```bash
npm test
npm run build
```

Si seule la documentation a changé :

```bash
npm run docs:build
```
