# Architecture

L'architecture décrit comment les exigences sont matérialisées dans le code et dans le site de documentation.

## Organisation

- `src/data/` : données pédagogiques;
- `src/core/` : logique pure;
- `src/adapters/` : accès navigateur;
- `src/main.js` : orchestration DOM et boucle de jeu;
- `docs/` : spécifications versionnées et notice.

## Lecture rapide

- [Vue d'ensemble](overview.md)
- [Interfaces](interfaces.md)
- [Modules](modules.md)
- [Flux runtime](runtime-flow.md)
- [APIs navigateur](browser-apis.md)

## Principe

`dsn~architecture.layered-design~1`

Le projet doit conserver une séparation nette entre données, core, adapters et UI.

Needs: req, doc

## Critères d'acceptation

- la logique de jeu reste testable sans DOM;
- les APIs navigateur restent encapsulées;
- les données pédagogiques restent séparées du moteur;
- la documentation d'architecture reste cohérente avec les exigences.
