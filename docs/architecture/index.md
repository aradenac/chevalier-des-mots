# Architecture

Cette section décrit l’organisation technique du projet.

## Résumé

Le projet suit une séparation simple :

- `data` pour les contenus pédagogiques
- `core` pour les règles testables
- `adapters` pour les entrées et services navigateur
- `main.js` pour l’orchestration UI

## Objectif de structure

Le code doit rester :

- lisible
- testable
- modifiable par petits lots
- compatible avec le navigateur cible

