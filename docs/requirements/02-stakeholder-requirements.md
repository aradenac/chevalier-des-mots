# STAKEHOLDER REQUIREMENTS

#### Mission claire pour l'enfant
`stkreq~child.clear-mission~1`

Status: approved

Le système doit présenter une mission claire et immédiate à l'enfant.

Rationale:
L'enfant doit savoir quoi trancher sans interprétation longue.

Verification method:
Revue des écrans de consigne et tests d'affichage.

Acceptance criteria:
- La mission est visible pendant la partie.
- La mission reste compréhensible en une lecture.

Needs:
- sysreq

Covers:
- need~pedagogy.action-learning~1

#### Erreurs récupérables
`stkreq~child.recoverable-errors~1`

Status: approved

Le système doit rendre les erreurs récupérables.

Rationale:
L'enfant doit pouvoir corriger sans repartir de zéro.

Verification method:
Revue des exigences de feedback et des tests de collision/feedback.

Acceptance criteria:
- Une erreur ne bloque pas la partie.
- Une erreur n'impose pas de game over punitif.

Needs:
- sysreq

Covers:
- need~pedagogy.no-hard-punishment~1

#### Entrées multiples
`stkreq~user.multiple-inputs~1`

Status: approved

Le système doit accepter clavier, tactile et manette.

Rationale:
Le jeu doit rester jouable sur les périphériques courants sans configuration supplémentaire.

Verification method:
Revue des adaptateurs d'entrée et des tests associés.

Acceptance criteria:
- Le clavier fonctionne.
- Le tactile fonctionne.
- La manette fonctionne si disponible.

Needs:
- sysreq

Covers:
- need~user.keyboard-touch-gamepad~1

#### Difficulté progressive
`stkreq~child.progressive-difficulty~1`

Status: approved

Le système doit proposer une difficulté progressive.

Rationale:
L'enfant doit découvrir des règles de plus en plus fines sans rupture brutale.

Verification method:
Revue des niveaux et de leur progression.

Acceptance criteria:
- Les premiers niveaux sont simples.
- Les derniers niveaux combinent plusieurs familles d'erreurs.

Needs:
- sysreq

Covers:
- need~pedagogy.progressive-grammar-learning~1

#### Objectif d'apprentissage visible
`stkreq~parent.visible-learning-goal~1`

Status: approved

Le système doit rendre l'objectif d'apprentissage visible pour un parent ou un adulte accompagnant.

Rationale:
L'adulte doit comprendre le but de la partie sans lire le code.

Verification method:
Revue de la description des niveaux et des exigences de jeu.

Acceptance criteria:
- Le thème de niveau est explicite.
- La progression pédagogique est visible.

Needs:
- sysreq

Covers:
- need~user.quick-play~1

#### Changement traçable
`stkreq~maintainer.traceable-changes~1`

Status: approved

Le système doit rendre chaque changement traçable.

Rationale:
Le mainteneur doit pouvoir remonter le fil d'une modification.

Verification method:
OpenFastTrace, revue des IDs et revue du journal de changements.

Acceptance criteria:
- Chaque évolution fonctionnelle pointe vers des exigences.
- Les annotations de traceabilité restent lisibles.

Needs:
- sysreq

Covers:
- need~maintainer.auditability~1

#### Travail LLM en spec-first
`stkreq~llm.spec-first-workflow~1`

Status: approved

Le système doit permettre à un LLM de travailler d'abord à partir des specs, puis du code.

Rationale:
Le dépôt doit rester gouvernable par documentation versionnée.

Verification method:
Revue de `AGENTS.md` et de la documentation de processus.

Acceptance criteria:
- Les specs sont lues avant le code.
- La contradiction entre specs et demande utilisateur est traitée par mise à jour des specs.

Needs:
- sysreq

Covers:
- need~maintainer.spec-driven-development~1
