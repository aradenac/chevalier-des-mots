# Exigences

Cette partie transforme le game design en exigences auditables.
Le but est de pouvoir vérifier, page par page, ce qui est attendu du jeu.

## Hiérarchie

1. `dsn` décrit une décision de design ou de specification.
2. `req` décrit une exigence vérifiable.
3. `impl` décrit l'implémentation.
4. `utest` décrit la couverture par test.
5. `itest` décrit une couverture d'intégration.
6. `doc` décrit une page ou une section de documentation.

## Lecture rapide

- le [format OpenFastTrace](format.md) explique la syntaxe;
- les [besoins parties prenantes](stakeholder-needs.md) expliquent pourquoi le projet existe;
- les [exigences du jeu](game-requirements.md) décrivent le comportement visible;
- les [exigences des niveaux](level-requirements.md) décrivent la structure pédagogique;
- les [exigences techniques](software-requirements.md) décrivent la plateforme;
- les [exigences de vérification](verification-requirements.md) décrivent les preuves attendues;
- la [traçabilité](traceability.md) explique comment relier tout cela.

## Ce que cette couche doit garantir

`dsn~requirements.layer~1`

Le dépôt doit contenir des exigences claires, versionnées et testables.

Needs: req, doc

Critères d'acceptation :

- les exigences sont écrites en français clair;
- chaque exigence a un identifiant stable;
- les besoins, l'architecture et les tests se relient entre eux;
- la documentation reste lisible sans outil propriétaire.
