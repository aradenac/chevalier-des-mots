# CHANGE PROCESS

Le changement doit suivre un ordre strict.

1. Vérifier si l'évolution est déjà couverte par une exigence.
2. Si ce n'est pas le cas, mettre à jour les exigences avant le code.
3. Modifier ensuite le code ou les scripts nécessaires.
4. Modifier ou ajouter les tests utiles.
5. Mettre à jour les liens OpenFastTrace.
6. Lancer `npm run verify`.
7. Commit et push.

Si une contradiction apparaît entre la demande et les exigences, la mise à jour des exigences passe avant la modification du code.

Ce processus évite les changements fonctionnels non traçables et garde le dépôt gouverné par les specs.
