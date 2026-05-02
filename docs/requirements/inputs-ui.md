# Exigences d'interface et d'entrées

Le démarrage doit laisser choisir un personnage avant la partie. Ce choix ne change pas les règles du jeu, seulement l'apparence et l'arme affichées.

#### La sélection du personnage doit être proposée au démarrage
`req~character.start-selection~1`

Status: approved
Priority: high
Verification: test, manual-review

Le système doit permettre au joueur de choisir son personnage avant le démarrage d'une partie.

Rationale:
Le choix du personnage augmente l'appropriation du jeu par l'enfant sans modifier les règles pédagogiques.

Acceptance criteria:
- L'écran de démarrage propose au moins trois personnages.
- Les personnages disponibles sont :
  - le chevalier ;
  - le pépé à la canne ;
  - le maître laser ou sage galactique.
- Le personnage sélectionné est utilisé pendant la partie.
- Le changement de personnage ne modifie pas la logique de score, de collision ou de progression.
- Chaque personnage possède une animation ou un effet visuel cohérent avec son arme.
- Le choix reste simple et compréhensible par un enfant.
- Un personnage par défaut est sélectionné si le joueur ne fait aucun choix.

Needs:
- impl
- utest

#### Les personnages doivent rester cosmétiques
`req~character.cosmetic-only~1`

Status: approved
Priority: high
Verification: test, manual-review

Le système doit garantir que le choix du personnage est cosmétique et ne modifie pas les règles du jeu.

Rationale:
Les personnages doivent personnaliser l'expérience sans déséquilibrer la difficulté ni perturber l'apprentissage.

Acceptance criteria:
- Tous les personnages utilisent la même logique de déplacement.
- Tous les personnages utilisent la même logique de collision.
- Tous les personnages utilisent la même logique de score.
- Les différences entre personnages sont limitées au nom, à l'apparence, à l'arme et aux effets visuels ou sonores.

Needs:
- impl
- utest

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

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/inputs-ui.md | Added interface and input requirements | Keep input and visible instruction expectations in one themed page |
| 2026-05-03 | 1.1.0 | 1.1.0 | docs/requirements/inputs-ui.md | Added character selection and cosmetic-only character requirements | Let the player choose a character without changing gameplay rules |
