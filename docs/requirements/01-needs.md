# NEEDS

#### Apprentissage par l'action
`need~pedagogy.action-learning~1`

Status: approved

Le système doit apprendre par l'action directe : lire, décider, trancher, recevoir un retour.

Rationale:
L'enfant apprend mieux quand la correction suit immédiatement l'action.

Verification method:
Revue des exigences et des écrans de jeu.

Acceptance criteria:
- L'action du joueur produit un retour observable.
- L'apprentissage se fait en jouant.

Needs:
- stkreq

#### Erreur sans sanction dure
`need~pedagogy.no-hard-punishment~1`

Status: approved

Le système doit corriger les erreurs sans punition dure ni blocage irréversible.

Rationale:
L'erreur doit rester exploitable comme moment d'apprentissage.

Verification method:
Revue des exigences système et des tests liés au feedback.

Acceptance criteria:
- Une erreur ne ferme pas brutalement la partie.
- Le joueur peut continuer après un échec.

Needs:
- stkreq

#### Progression grammaticale
`need~pedagogy.progressive-grammar-learning~1`

Status: approved

Le système doit faire progresser l'enfant de la forme visible vers la grammaire plus fine.

Rationale:
Le jeu doit rester compréhensible tout en montant en difficulté.

Verification method:
Revue des niveaux et des exigences de difficulté.

Acceptance criteria:
- Les niveaux suivent une progression lisible.
- Les thèmes restent cohérents d'un niveau à l'autre.

Needs:
- stkreq

#### Jeu rapide
`need~user.quick-play~1`

Status: approved

Le système doit permettre une partie rapide à lancer et simple à comprendre.

Rationale:
L'enfant doit pouvoir jouer sans préparation longue.

Verification method:
Revue des écrans d'entrée et de sélection.

Acceptance criteria:
- La consigne est visible rapidement.
- Le joueur peut commencer sans configuration lourde.

Needs:
- stkreq

#### Entrées multiples
`need~user.keyboard-touch-gamepad~1`

Status: approved

Le système doit accepter clavier, tactile et manette.

Rationale:
Le jeu doit rester accessible sur plusieurs périphériques courants.

Verification method:
Revue des adaptateurs d'entrée et des tests associés.

Acceptance criteria:
- Le clavier fonctionne.
- Le tactile fonctionne.
- La manette fonctionne si disponible.

Needs:
- stkreq

#### Développement piloté par les specs
`need~maintainer.spec-driven-development~1`

Status: approved

Le système doit permettre un développement guidé par les exigences versionnées.

Rationale:
Le mainteneur doit travailler à partir d'une source de vérité stable.

Verification method:
Revue de la documentation de processus et de traçabilité.

Acceptance criteria:
- Les exigences existent avant les changements fonctionnels.
- Les changements sont rattachés à des IDs.

Needs:
- stkreq

#### Auditabilité
`need~maintainer.auditability~1`

Status: approved

Le système doit rester auditable de bout en bout.

Rationale:
Le mainteneur doit pouvoir reconstruire le chemin entre besoin, exigence, code, test et résultat.

Verification method:
OpenFastTrace et revue de la chaîne de preuve.

Acceptance criteria:
- La chaîne de traçabilité est lisible.
- La preuve de validation est reproductible.

Needs:
- stkreq
