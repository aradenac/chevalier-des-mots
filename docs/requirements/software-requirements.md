# Exigences techniques

Cette page décrit les contraintes techniques du projet.

### Le jeu doit être jouable au clavier
`req~input.keyboard~1`

Le jeu doit être jouable au clavier.

Rationale:
Le clavier reste le mode d'entrée de base sur ordinateur.

Needs: impl, doc

### Le jeu doit être jouable avec des boutons tactiles
`req~input.touch~1`

Le jeu doit être jouable avec des boutons tactiles.

Rationale:
Une tablette ou un écran tactile doit permettre la même partie.

Needs: impl, doc

### Le jeu doit accepter une manette USB type SNES via la Gamepad API
`req~input.gamepad~1`

Le jeu doit supporter une manette USB type SNES via la Gamepad API quand elle est disponible.

Rationale:
Le projet vise une entrée simple et large, compatible avec une manette standard.

Needs: impl, doc

### L'absence d'API audio ne doit pas bloquer le jeu
`req~audio.non-blocking~1`

L'absence ou l'échec d'une API audio ne doit pas bloquer le jeu.

Rationale:
Le texte et la jouabilité doivent rester disponibles même sans son.

Needs: impl, utest, doc

### La synthèse vocale doit rester optionnelle
`req~speech.optional~1`

La synthèse vocale doit être optionnelle, car Brave peut exposer `speechSynthesis` sans fournir de voix utilisable.

Rationale:
L'API peut exister sans fournir de voix exploitable.

Needs: impl, utest, doc

### Le core du jeu ne doit pas dépendre directement des APIs navigateur
`req~architecture.core-without-browser-api~1`

Le core du jeu ne doit pas dépendre directement de `document`, `window`, `navigator`, `localStorage`, `AudioContext` ou `speechSynthesis`.

Rationale:
Le core doit rester testable sans navigateur.

Covers: dsn~architecture.layered-design~1
Needs: impl, utest, doc

### La documentation source doit rester en Markdown versionné
`req~documentation.markdown-source~1`

La documentation source doit rester en Markdown versionné.

Rationale:
Le dépôt doit rester lisible dans GitHub et modifiable par un LLM.

Needs: doc

### La documentation doit rester consultable via `site/index.html`
`req~documentation.static-readable-site~1`

La documentation doit être générable en site HTML statique consultable via `site/index.html`.

Rationale:
L'ouverture directe dans un navigateur doit fonctionner sans serveur HTTP.

Needs: doc

## Critères d'acceptation

- le clavier, le tactile et la manette restent documentés;
- les APIs optionnelles ne créent pas de régression visible;
- la cible Brave reste explicitement documentée;
- le core reste testable sans API navigateur;
- la documentation reste statique et versionnée.
