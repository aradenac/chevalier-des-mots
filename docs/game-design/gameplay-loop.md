# Boucle de jeu

La boucle de jeu doit rester courte et répétable.

## Déroulé

1. le niveau démarre
2. une consigne est affichée
3. des mots tombent
4. le joueur se déplace
5. le joueur tranche
6. le jeu donne un feedback
7. le niveau se termine ou continue

## Feedbacks

Le jeu utilise plusieurs canaux en même temps :

- texte à l’écran
- son court positif
- confettis
- correction courte

Exemple :

- réussite : `Bien joué`
- erreur : `Ce mot ne correspond pas`

## Règle "aucune punition dure"

Une erreur ne doit pas casser le rythme du jeu.
Le système peut :

- corriger
- repousser un mot
- montrer un message bref
- laisser continuer

Il ne doit pas :

- bloquer la partie longtemps
- retirer brutalement le contrôle
- créer une sanction lourde

## Critères d’acceptation

- une erreur laisse le joueur en situation de rejouer
- un mot juste déclenche un retour immédiat
- les confettis ne masquent pas l’interface

