# SYSTEM REQUIREMENTS

#### Consigne visible pendant la partie
`sysreq~game.visible-instruction~1`

Status: approved

Le système doit afficher la consigne de mission pendant toute la durée d'une partie.

Rationale:
L'enfant doit toujours savoir quel type d'élément il doit trancher.

Verification method:
utest, manual-review

Acceptance criteria:
- La consigne est visible pendant la chute des mots.
- La consigne est mise à jour quand le niveau change.
- La consigne reste lisible sur desktop et mobile.

Needs:
- swreq
- impl

Covers:
- stkreq~child.clear-mission~1

#### Tranchage des cibles seulement
`sysreq~game.target-only-slicing~1`

Status: approved

Le système doit gagner uniquement lorsque le joueur tranche les éléments correspondant à la mission active.

Rationale:
Le tri entre cible et distracteur est la base de l'apprentissage.

Verification method:
stest

Acceptance criteria:
- Une cible correcte est comptée comme réussite.
- Un distracteur ne compte pas comme réussite.
- Le niveau reste cohérent avec sa règle.

Needs:
- swreq
- impl

Covers:
- stkreq~child.clear-mission~1

#### Feedback immédiat
`sysreq~game.immediate-feedback~1`

Status: approved

Le système doit fournir un feedback immédiat après chaque frappe.

Rationale:
Le retour rapide aide l'enfant à apprendre par essai et correction.

Verification method:
utest, manual-review

Acceptance criteria:
- Le feedback apparaît juste après l'action.
- Le feedback indique réussite ou erreur.
- Le feedback reste court.

Needs:
- swreq
- impl

Covers:
- stkreq~child.clear-mission~1

#### Pas de game over punitif
`sysreq~game.no-game-over-punishment~1`

Status: approved

Le système ne doit pas transformer une erreur en game over punitif.

Rationale:
L'erreur doit rester récupérable.

Verification method:
utest, manual-review

Acceptance criteria:
- Une erreur ne coupe pas la partie.
- Le joueur peut continuer après un échec.

Needs:
- swreq
- impl
- utest

Covers:
- stkreq~child.recoverable-errors~1

#### Vingt niveaux thématiques
`sysreq~level.twenty-themed-levels~1`

Status: approved

Le système doit proposer vingt niveaux thématiques stables.

Rationale:
La progression pédagogique repose sur un ensemble complet et fixe.

Verification method:
stest

Acceptance criteria:
- Le nombre de niveaux est 20.
- Les titres reflètent des thèmes distincts.

Needs:
- swreq
- impl
- stest

Covers:
- stkreq~child.progressive-difficulty~1

#### Cibles et distracteurs
`sysreq~level.targets-and-distractors~1`

Status: approved

Chaque niveau doit contenir au moins une cible et au moins un distracteur.

Rationale:
Le joueur doit pouvoir distinguer une bonne réponse d'une fausse.

Verification method:
itest

Acceptance criteria:
- Chaque niveau a au moins une cible.
- Chaque niveau a au moins un distracteur.

Needs:
- swreq
- impl
- itest

Covers:
- stkreq~child.progressive-difficulty~1

#### Difficulté progressive
`sysreq~level.progressive-difficulty~1`

Status: approved

Le système doit faire progresser la difficulté entre les niveaux.

Rationale:
Le jeu doit aller d'indices simples à des distinctions plus fines.

Verification method:
utest

Acceptance criteria:
- La difficulté augmente de manière lisible.
- Les derniers niveaux combinent plusieurs familles d'erreurs.

Needs:
- swreq
- impl
- utest

Covers:
- stkreq~child.progressive-difficulty~1

#### Entrée clavier
`sysreq~input.keyboard~1`

Status: approved

Le système doit permettre le jeu au clavier.

Rationale:
Le clavier est le mode d'entrée de base sur ordinateur.

Verification method:
utest

Acceptance criteria:
- Gauche et droite déplacent le chevalier.
- Une touche de frappe déclenche l'action.

Needs:
- swreq
- impl
- utest

Covers:
- stkreq~user.multiple-inputs~1

#### Entrée tactile
`sysreq~input.touch~1`

Status: approved

Le système doit permettre le jeu avec des boutons tactiles.

Rationale:
Une tablette ou un écran tactile doit permettre la partie.

Verification method:
utest

Acceptance criteria:
- Les boutons tactiles déplacent le chevalier.
- Un bouton tactile déclenche la frappe.

Needs:
- swreq
- impl
- utest

Covers:
- stkreq~user.multiple-inputs~1

#### Manette SNES USB
`sysreq~input.gamepad-snes~1`

Status: approved

Le système doit accepter une manette USB type SNES via la Gamepad API quand elle est disponible.

Rationale:
Le jeu doit rester jouable avec une manette standard et simple.

Verification method:
utest

Acceptance criteria:
- Une manette standard déplace le chevalier.
- Une manette standard déclenche la frappe.
- L'absence de manette ne bloque pas le jeu.

Needs:
- swreq
- impl
- utest

Covers:
- stkreq~user.multiple-inputs~1

#### Feedback audio non bloquant
`sysreq~audio.non-blocking-feedback~1`

Status: approved

L'absence ou l'échec d'une API audio ne doit pas bloquer le feedback de jeu.

Rationale:
Le texte doit rester disponible même sans son.

Verification method:
utest

Acceptance criteria:
- Le jeu reste jouable sans audio.
- Le feedback texte reste visible.

Needs:
- swreq
- impl
- utest

Covers:
- stkreq~child.recoverable-errors~1

#### Synthèse vocale optionnelle
`sysreq~speech.optional~1`

Status: approved

La synthèse vocale doit rester optionnelle.

Rationale:
Brave peut exposer `speechSynthesis` sans voix exploitable.

Verification method:
utest

Acceptance criteria:
- Le jeu reste jouable si aucune voix n'est disponible.
- L'échec de synthèse ne bloque pas la partie.

Needs:
- swreq
- impl
- utest

Covers:
- stkreq~child.recoverable-errors~1
