# Exigences d'interface et d'entrées

#### La consigne courante doit rester visible
`req~ui.visible-instruction~1`

Status: draft
Priority: high
Verification: manual-review

Le système doit afficher la consigne du niveau courant dans l'interface et la mettre à jour quand le niveau change.

Rationale:
Le joueur doit savoir immédiatement quoi trancher.

Acceptance criteria:
- La consigne affichée correspond au niveau courant.
- Le texte change quand un nouveau niveau démarre.

Needs:
- impl

#### Les entrées clavier, tactiles et manette doivent être normalisées
`req~input.normalized-state~1`

Status: draft
Priority: high
Verification: test

Le système doit traduire le clavier, le tactile et la manette vers un état d'entrée commun avec déplacement gauche, déplacement droit, attaque et pause.

Rationale:
Le moteur du jeu ne doit pas dépendre du périphérique utilisé.

Acceptance criteria:
- Les trois périphériques exposent la même forme d'état.
- Les actions ponctuelles ne sont consommées qu'une fois par lecture.
- La manette standard et les variantes génériques restent utilisables.

Needs:
- impl
- utest
