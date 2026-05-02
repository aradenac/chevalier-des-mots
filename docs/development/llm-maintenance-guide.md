# Guide LLM

Ce guide explique comment Codex ou un autre LLM doit travailler sur le dépôt.

## Règle de base

Lire les exigences avant de modifier le code.
Ne pas supposer un comportement qui n'est pas écrit.

## Ordre de travail

1. lire `docs/requirements/`;
2. lire `docs/architecture/`;
3. lire `docs/user-guide/`;
4. lire les tests;
5. modifier le minimum;
6. vérifier avec les commandes du dépôt.

`oman~cdm.llm-rules~1`

Needs: req

## Ce que le LLM doit éviter

- réécrire le jeu pour faire plus simple;
- supprimer des exigences parce qu'elles sont longues;
- contourner OpenFastTrace avec une validation maison;
- toucher au gameplay pour faire passer une doc.

## Critères d'acceptation

- la demande du LLM est traçable vers une exigence;
- la modification garde les IDs utiles;
- le résultat reste relisible par un humain;
- les commandes de vérification restent exécutables.
