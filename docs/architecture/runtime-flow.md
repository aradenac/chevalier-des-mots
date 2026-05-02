# Flux runtime

Cette page décrit le chemin des données pendant une partie.

## Flux principal

`dsn~cdm.main-runtime~1`

Le runtime doit suivre cet ordre:

1. charger les données de niveau;
2. créer l'état initial;
3. lire les entrées;
4. déplacer le chevalier;
5. faire tomber les mots;
6. détecter la collision;
7. mettre à jour les étoiles;
8. produire du feedback;
9. passer au niveau suivant si besoin.

Needs: impl, utest

## Ce qui ne doit pas arriver

- lire `speechSynthesis` directement dans le core;
- lire le DOM depuis `src/core/`;
- faire dépendre la logique de la présence d'un son;
- mélanger la donnée de niveau et la logique de collision.

## Exemple concret

Si le joueur tranche le mot cible, le runtime doit:

- retirer le mot actif;
- ajouter une étoile;
- afficher un retour court;
- éventuellement lancer un son;
- continuer la partie sans recharger la page.

