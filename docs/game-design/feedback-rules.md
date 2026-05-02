# Règles de feedback

Le jeu n'applique pas de punition dure.
Il corrige, il montre et il laisse rejouer.

`dsn~game.no-hard-punishment~1`

Les erreurs ne doivent jamais bloquer brutalement l'enfant ni provoquer de game over punitif.

Needs: req, doc

## Modalités de feedback

- texte court à l'écran;
- son de réussite ou d'erreur;
- confettis ou effet visuel léger;
- correction courte quand le mot est erroné;
- retour immédiat après l'action.

## Règle "aucune punition dure"

Une erreur ne doit pas :

- fermer le niveau;
- bloquer la progression;
- afficher un message culpabilisant;
- masquer la correction;
- couper la partie.

## Exemple concret

Si le joueur tranche `Le cheval courent vite`, le retour doit expliquer la correction attendue, par exemple `Le cheval court vite`.

Si le joueur laisse passer un distracteur, le jeu doit simplement continuer.

## Critères d'acceptation

- le texte de feedback est court;
- le son est optionnel mais cohérent;
- la correction est lisible;
- le joueur peut reprendre immédiatement.
