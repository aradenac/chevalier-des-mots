# Le Chevalier des Mots

Le dépôt contient un système de spécifications versionnées pour le jeu éducatif.
Le but est de pouvoir lire, tester et maintenir le projet sans dépendre d'un prompt ponctuel.

Cette documentation est organisée pour rester :

- consultable directement dans GitHub;
- consultable directement via `site/index.html`;
- traçable avec OpenFastTrace;
- simple à modifier pour un LLM ou un humain.

## Comment lire ce site

1. Lire le [statut du projet](project-status.md).
2. Lire le [game design](game-design/index.md).
3. Lire les [exigences](requirements/index.md).
4. Lire l'[architecture](architecture/index.md).
5. Lire la [notice utilisateur](user-guide/index.md).
6. Lire le [guide de développement](development/index.md).

## Contrat du dépôt

`feat~cdm.documentation-system~1`

Le dépôt doit exposer des spécifications versionnées, auditables et reliées à leurs niveaux de conception, d'implémentation, de test et d'usage.

Needs: req

Critères d'acceptation :

- chaque grande famille de besoin a sa page dédiée;
- les pages utilisent des IDs stables;
- la génération HTML reste statique;
- les liens internes restent utilisables sans serveur HTTP.

## Ce qui change

Le contenu ne cherche pas à faire du marketing.
Il décrit :

- ce que fait le jeu;
- ce que le jeu doit garantir;
- comment le code est organisé;
- comment vérifier la couverture;
- comment reprendre la maintenance.

