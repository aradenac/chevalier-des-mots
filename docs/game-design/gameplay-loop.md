# Boucle de jeu

`feat~cdm.gameplay-loop~1`

La boucle doit rester lisible:

1. un niveau s'affiche;
2. des mots tombent;
3. le joueur se déplace;
4. le joueur frappe ou laisse passer;
5. le jeu donne un retour immédiat;
6. le score monte;
7. le niveau se termine quand le seuil d'étoiles est atteint.

Needs: req

## Ce que la boucle doit garantir

- une action claire à chaque tour de jeu;
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

