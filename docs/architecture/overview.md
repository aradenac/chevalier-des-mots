# Architecture actuelle

Le projet est une application Vanilla JS servie par Vite.
Le rendu final est une page HTML statique pour le jeu et un site MkDocs pour la documentation.

<!-- [doc->req~architecture.core-without-browser-api~1] -->

## État actuel

- `src/data/levels.js` contient les niveaux;
- `src/core/` contient la logique testable;
- `src/adapters/` contient les interfaces navigateur;
- `src/main.js` connecte tout au DOM;
- la documentation est versionnée dans `docs/`.

## Architecture cible

`dsn~architecture.layered-design~1`

Le code doit être séparé entre données, core testable, adaptateurs navigateur et orchestration UI.

Needs: req, doc

```mermaid
flowchart LR
  D[data] --> C[core]
  C --> A[adapters]
  A --> U[UI / DOM]
  U --> C
```

## Ce que cela garantit

- on peut changer les niveaux sans casser le moteur;
- on peut tester le core sans navigateur;
- on peut faire échouer une API optionnelle sans casser la partie;
- on peut lire la doc en parallèle du code.
