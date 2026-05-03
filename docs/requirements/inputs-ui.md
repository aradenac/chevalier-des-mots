# Exigences d'interface et d'entrées

Contexte non normatif:
Le démarrage présente un choix de personnage avant la partie. Ce choix concerne l'apparence et l'arme affichées.

#### La sélection du personnage doit être proposée au démarrage
`req~character.start-selection~1`

Status: approved  
Priority: high  
Verification: test  
Additional verification: manual-review  

Le système doit permettre au joueur de choisir son personnage avant le démarrage d'une partie.

Rationale: Le choix du personnage augmente l'appropriation du jeu par l'enfant sans modifier les règles pédagogiques.

Acceptance criteria:

- L'écran de démarrage propose au moins trois personnages.
- Les personnages disponibles incluent `Chevalier`, `Pépé` et `Maître laser` ou `Sage galactique`.
- Le personnage sélectionné est utilisé pendant la partie.
- Chaque option affiche un nom court et une arme associée.
- Chaque personnage possède une animation ou un effet visuel déclenché lors d'une frappe.
- Un personnage par défaut est sélectionné si le joueur ne fait aucun choix.

Needs: impl, utest

#### Les personnages doivent rester cosmétiques
`req~character.cosmetic-only~1`

Status: approved  
Priority: high  
Verification: test  
Additional verification: manual-review  

Le système doit garantir que le choix du personnage est cosmétique et ne modifie pas les règles du jeu.

Rationale: Les personnages doivent personnaliser l'expérience sans déséquilibrer la difficulté ni perturber l'apprentissage.

Acceptance criteria:

- Tous les personnages utilisent la même logique de déplacement.
- Tous les personnages utilisent la même logique de collision.
- Tous les personnages utilisent la même logique de score.
- Les différences entre personnages sont limitées au nom, à l'apparence, à l'arme et aux effets visuels ou sonores.

Needs: impl, utest

#### La consigne courante doit rester visible
`req~ui.visible-instruction~1`

Status: approved  
Priority: high  
Verification: manual-review  

Le système doit afficher la consigne du niveau courant dans l'interface et la mettre à jour quand le niveau change.

Rationale: Le joueur doit savoir immédiatement quoi trancher.

Acceptance criteria:

- La consigne affichée correspond au niveau courant.
- Le texte change quand un nouveau niveau démarre.

Needs: impl

#### Les entrées clavier, tactiles et manette doivent être normalisées
`req~input.normalized-state~1`

Status: approved  
Priority: high  
Verification: test  

Le système doit traduire le clavier, le tactile et la manette vers un état d'entrée commun avec déplacement gauche, déplacement droit, attaque et pause.

Rationale: Le moteur du jeu ne doit pas dépendre du périphérique utilisé.

Acceptance criteria:

- Les trois périphériques exposent la même forme d'état.
- Les actions ponctuelles ne sont consommées qu'une fois par lecture.
- La manette standard et les variantes génériques restent utilisables.

Needs: impl, utest

#### Les niveaux cannon doivent utiliser l'état d'entrée normalisé
`req~cannon.normalized-inputs~1`

Status: approved  
Priority: high  
Verification: test  

Pendant un niveau cannon, le système doit utiliser l'état d'entrée normalisé existant pour déplacer le canon, tirer la lettre courante et gérer la pause.

Rationale: Le mode cannon doit réutiliser les conventions d'entrée déjà établies au lieu d'introduire un schéma de contrôle séparé selon le périphérique.

Acceptance criteria:

- L'action gauche de l'état normalisé déplace le canon vers la gauche.
- L'action droite de l'état normalisé déplace le canon vers la droite.
- L'action attaque de l'état normalisé tire la lettre courante.
- L'action pause de l'état normalisé conserve le comportement de pause existant.
- Au clavier, `Flèche gauche` et `Flèche droite` déplacent le canon.
- Au clavier, `Espace` ou `Entrée` tirent la lettre courante.
- À la manette, la croix directionnelle ou le stick gauche déplacent le canon.
- À la manette, le bouton principal tire la lettre courante.
- À la manette, le bouton pause ou start conserve le comportement de pause existant.

Needs: impl, utest

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/inputs-ui.md | Added interface and input requirements | Keep input and visible instruction expectations in one themed page |
| 2026-05-03 | 1.1.0 | 1.1.0 | docs/requirements/inputs-ui.md | Added character selection and cosmetic-only character requirements | Let the player choose a character without changing gameplay rules |
| 2026-05-03 | 1.2.0 | 1.2.0 | docs/requirements/inputs-ui.md | Approved all requirements and normalized page structure | All listed requirements represent accepted product targets; page history must remain at the end |
| 2026-05-03 | 1.4.0 | 1.2.0 | docs/requirements/inputs-ui.md | Normalized character verification fields and separated startup selection from cosmetic gameplay invariants | Apply writing rules while preserving character selection behavior |
| 2026-05-03 | 1.5.0 | 1.3.0 | docs/requirements/inputs-ui.md | Added cannon input mapping on top of the normalized input state | Reuse the existing control model for the new cannon mode |
