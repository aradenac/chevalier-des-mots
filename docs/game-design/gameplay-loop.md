# Boucle de jeu

`dsn~game.loop~1`

La boucle principale est : lire la consigne, observer les mots qui tombent, se déplacer, trancher, recevoir un feedback.

Needs: req, doc

<!-- [doc->req~game.visible-instruction~1] -->
<!-- [doc->req~game.target-only-slicing~1] -->
<!-- [doc->req~game.immediate-feedback~1] -->
<!-- [doc->req~game.no-hard-punishment~1] -->

## Ce que la boucle doit garantir

- une consigne visible pendant la partie;
- une cible claire à trancher;
- une réponse immédiate après une bonne ou mauvaise frappe;
- un redémarrage rapide au niveau suivant;
- une difficulté qui monte sans casser la compréhension.

## Exemple concret

Si le niveau cible les accents, le joueur doit voir des mots comme `ecole` et `école`.
La bonne décision doit faire gagner une étoile, un son de réussite et un retour texte court.

## Critères d'acceptation

- le joueur sait toujours quoi faire;
- le feedback arrive en moins d'une action;
- une erreur n'empêche pas de continuer;
- le niveau peut être rejoué.
