# Exigences du jeu

Ces exigences décrivent le comportement visible du jeu.

### Le jeu affiche la consigne de mission pendant la partie
`req~game.visible-instruction~1`

Le jeu doit afficher la consigne de mission pendant la partie.

Rationale:
L'enfant doit savoir quoi faire sans ouvrir l'aide.

Covers: dsn~game.loop~1
Needs: impl, utest, doc

### Le joueur tranche uniquement les éléments de la mission active
`req~game.target-only-slicing~1`

Le joueur doit réussir en tranchant uniquement les éléments correspondant à la mission active.

Rationale:
Le jeu doit vérifier le tri entre cibles et distracteurs.

Covers: dsn~game.loop~1
Needs: impl, utest

### Le jeu répond juste après une frappe
`req~game.immediate-feedback~1`

Après une frappe, le jeu doit fournir un feedback immédiat.

Rationale:
Le retour rapide aide l'enfant à apprendre par essai et correction.

Covers: dsn~game.loop~1
Needs: impl, utest, doc

### Une erreur ne bloque jamais la partie
`req~game.no-hard-punishment~1`

Une erreur joueur ne doit pas déclencher de game over ou de sanction bloquante.

Rationale:
L'enfant doit pouvoir continuer à jouer après une erreur.

Covers: dsn~game.no-hard-punishment~1
Needs: impl, utest, doc

## Critères d'acceptation

- la consigne reste visible pendant la partie;
- une erreur ne bloque pas la progression;
- le feedback suit immédiatement l'action;
- le tri cible/distracteur reste observable.
