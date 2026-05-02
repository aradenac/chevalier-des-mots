# SOFTWARE REQUIREMENTS

#### Données de niveaux séparées du moteur
`swreq~data.levels-separated-from-engine~1`

Status: approved

Les données de niveaux doivent rester séparées du moteur de jeu.

Rationale:
Le contenu pédagogique doit pouvoir évoluer sans réécrire la logique du jeu.

Verification method:
itest

Acceptance criteria:
- `src/data/levels.js` contient les données.
- Le moteur ne mélange pas contenu et logique.

Needs:
- impl
- utest

Covers:
- sysreq~level.twenty-themed-levels~1

#### Logique de tranchage des cibles
`swreq~game.target-only-slicing~1`

Status: approved

Le moteur doit distinguer une cible d'un distracteur au moment de la collision.

Rationale:
La règle du jeu repose sur une décision de tri fiable.

Verification method:
itest

Acceptance criteria:
- Une cible peut être identifiée comme telle.
- Un distracteur peut être identifié comme tel.

Needs:
- impl

Covers:
- sysreq~game.target-only-slicing~1

#### Flux sans punition dure
`swreq~game.no-game-over-punishment~1`

Status: approved

Le moteur doit permettre une erreur sans déclencher de game over punitif.

Rationale:
Le joueur doit pouvoir continuer après une erreur.

Verification method:
itest

Acceptance criteria:
- Une erreur ne termine pas brutalement la partie.
- La progression reste récupérable.

Needs:
- impl

Covers:
- sysreq~game.no-game-over-punishment~1

#### Modèle de progression de niveau
`swreq~level.progression-model~1`

Status: approved

Le moteur doit porter un modèle de progression lisible pour les niveaux.

Rationale:
La difficulté doit évoluer selon les thèmes et les paliers.

Verification method:
itest

Acceptance criteria:
- Les niveaux sont ordonnés.
- La progression reste stable.

Needs:
- impl
- utest

Covers:
- sysreq~level.progressive-difficulty~1

#### Core sans dépendance directe aux APIs navigateur
`swreq~core.no-browser-api-dependency~1`

Status: approved

Le core du jeu ne doit pas dépendre directement de `document`, `window`, `navigator`, `localStorage`, `AudioContext` ou `speechSynthesis`.

Rationale:
Le core doit rester testable sans navigateur.

Verification method:
itest

Acceptance criteria:
- Le core est testable en isolation.
- Les APIs navigateur restent hors du core.

Needs:
- impl
- itest

Covers:
- sysreq~game.visible-instruction~1

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

Needs:
- impl

Covers:
- sysreq~input.keyboard~1

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

Needs:
- impl

Covers:
- sysreq~input.keyboard~1

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

Needs:
- impl
- utest

Covers:
- sysreq~input.gamepad-snes~1

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

Needs:
- impl
- utest

Covers:
- sysreq~audio.non-blocking-feedback~1

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

Needs:
- impl
- utest

Covers:
- sysreq~speech.optional~1

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

Needs:
- impl

Covers:
- sysreq~game.visible-instruction~1

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

Needs:
- impl

Covers:
- sysreq~game.immediate-feedback~1
