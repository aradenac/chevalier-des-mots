# ADR-0001 - Documentation as Code

## Statut

Accepté.

## Contexte

Le projet a besoin d’une documentation :

- versionnée avec le code
- lisible sur GitHub
- modifiable sans outil propriétaire

## Décision

La documentation est stockée en Markdown dans `docs/` et construite avec MkDocs Material.

## Conséquences

- la source reste lisible directement
- la documentation peut être revue comme du code
- le rendu HTML statique peut être généré plus tard

