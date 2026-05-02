# SOFTWARE REQUIREMENTS

#### Données de niveaux séparées du moteur
`swreq~data.levels-separated-from-engine~1`

Status: approved

Les données de niveaux doivent rester séparées du moteur de jeu.

Rationale:
Le contenu pédagogique doit pouvoir évoluer sans réécrire la logique du jeu.

Verification method:
utest

Acceptance criteria:
- `src/data/levels.js` contient les données.
- Le moteur ne mélange pas contenu et logique.

Covers:
sysreq~level.twenty-themed-levels~1

Needs:
- impl

#### Logique de tranchage des cibles
`swreq~game.target-only-slicing~1`

Status: approved

Le moteur doit distinguer une cible d'un distracteur au moment de la collision.

Rationale:
La règle du jeu repose sur une décision de tri fiable.

Verification method:
utest

Acceptance criteria:
- Une cible peut être identifiée comme telle.
- Un distracteur peut être identifié comme tel.

Covers:
sysreq~game.target-only-slicing~1

Needs:
- impl

#### Flux sans punition dure
`swreq~game.no-game-over-punishment~1`

Status: approved

Le moteur doit permettre une erreur sans déclencher de game over punitif.

Rationale:
Le joueur doit pouvoir continuer après une erreur.

Verification method:
utest

Acceptance criteria:
- Une erreur ne termine pas brutalement la partie.
- La progression reste récupérable.

Covers:
sysreq~game.no-game-over-punishment~1

Needs:
- impl
- utest

#### Modèle de progression de niveau
`swreq~level.progression-model~1`

Status: approved

Le moteur doit porter un modèle de progression lisible pour les niveaux.

Rationale:
La difficulté doit évoluer selon les thèmes et les paliers.

Verification method:
utest

Acceptance criteria:
- Les niveaux sont ordonnés.
- La progression reste stable.

Covers:
sysreq~level.progressive-difficulty~1

Needs:
- impl
- utest

#### Core sans dépendance directe aux APIs navigateur
`swreq~core.no-browser-api-dependency~1`

Status: approved

Le core du jeu ne doit pas dépendre directement de `document`, `window`, `navigator`, `localStorage`, `AudioContext` ou `speechSynthesis`.

Rationale:
Le core doit rester testable sans navigateur.

Verification method:
utest

Acceptance criteria:
- Le core est testable en isolation.
- Les APIs navigateur restent hors du core.

Covers:
sysreq~game.visible-instruction~1

Needs:
- impl
- utest

#### Adaptateurs isolant les APIs navigateur
`swreq~adapter.browser-api-isolation~1`

Status: approved

Les adaptateurs doivent contenir l'accès aux APIs navigateur.

Rationale:
Le code métier ne doit pas dépendre du DOM ou des APIs browser.

Verification method:
revue de code

Acceptance criteria:
- Les accès navigateur sont regroupés dans les adaptateurs.
- Le core reste indépendant des APIs browser.

Covers:
sysreq~input.keyboard~1

Needs:
- impl

#### État d'entrée normalisé
`swreq~input.normalized-input-state~1`

Status: approved

Le système doit exposer un état d'entrée normalisé pour clavier, tactile et manette.

Rationale:
La boucle de jeu doit consommer une forme unique d'entrée.

Verification method:
utest

Acceptance criteria:
- L'état contient gauche, droite, frappe et pause.
- Les trois périphériques sont lisibles par la même structure.

Covers:
sysreq~input.keyboard~1

Needs:
- impl

#### Mapping générique de manette
`swreq~gamepad.standard-and-generic-mapping~1`

Status: approved

Le système doit accepter un mapping standard et générique de manette USB type SNES via la Gamepad API.

Rationale:
Les manettes SNES USB se présentent souvent comme des pads standards.

Verification method:
utest

Acceptance criteria:
- Le d-pad déplace le chevalier.
- Les boutons standard déclenchent la frappe et la pause.

Covers:
sysreq~input.gamepad-snes~1

Needs:
- impl
- utest

#### Service audio non bloquant
`swreq~audio.service-failure-non-blocking~1`

Status: approved

Le service audio doit échouer sans bloquer le jeu.

Rationale:
Le feedback texte doit rester disponible même sans son.

Verification method:
utest

Acceptance criteria:
- L'absence d'AudioContext ne casse pas la partie.
- Une erreur audio ne coupe pas l'exécution.

Covers:
sysreq~audio.non-blocking-feedback~1

Needs:
- impl
- utest

#### Gestion des voix Brave
`swreq~speech.brave-failure-handling~1`

Status: approved

Le service vocal doit gérer Brave quand `speechSynthesis` existe mais que `getVoices()` retourne `[]` ou que `synthesis-failed` survient.

Rationale:
L'API vocale peut être présente sans voix exploitable.

Verification method:
utest

Acceptance criteria:
- Le jeu reste jouable sans voix.
- Un diagnostic lisible est produit.

Covers:
sysreq~speech.optional~1

Needs:
- impl
- utest

#### Rendu de la consigne
`swreq~ui.instruction-rendering~1`

Status: approved

L'interface doit rendre la consigne de mission visible pendant la partie.

Rationale:
La consigne est l'élément visuel principal du niveau.

Verification method:
revue de code

Acceptance criteria:
- La consigne apparaît dans l'interface.
- La consigne change quand le niveau change.

Covers:
sysreq~game.visible-instruction~1

Needs:
- impl

#### Rendu du feedback
`swreq~ui.feedback-rendering~1`

Status: approved

L'interface doit rendre un feedback court après la frappe.

Rationale:
Le retour doit être lisible rapidement.

Verification method:
revue de code

Acceptance criteria:
- Le feedback est visible immédiatement.
- Le feedback reste bref.

Covers:
sysreq~game.immediate-feedback~1

Needs:
- impl

#### Site statique
`swreq~build.static-site~1`

Status: approved

Le site documentaire doit être généré en HTML statique.

Rationale:
La documentation doit rester consultable via `site/index.html`.

Verification method:
commande de build

Acceptance criteria:
- `mkdocs build` produit un site lisible.
- `use_directory_urls: false` reste actif.

Covers:
verreq~docs.mkdocs-build-pass~1

Needs:
- impl
