# Exigences

Cette partie transforme le game design en exigences auditables.
Le but est de pouvoir vérifier, page par page, ce qui est attendu du jeu.

## Hiérarchie

1. `feat` décrit l'intention produit.
2. `req` décrit une exigence vérifiable.
3. `dsn` décrit la décision d'architecture ou de conception.
4. `impl` décrit l'implémentation.
5. `utest` décrit la couverture par test.
6. `uman` et `oman` décrivent les usages attendus côté humain.

## Lecture rapide

- le [format OpenFastTrace](format.md) explique la syntaxe;
- les [besoins parties prenantes](stakeholder-needs.md) expliquent pourquoi le projet existe;
- les [exigences du jeu](game-requirements.md) décrivent le comportement visible;
- les [exigences des niveaux](level-requirements.md) décrivent la structure pédagogique;
- les [exigences techniques](software-requirements.md) décrivent la plateforme;
- les [exigences de vérification](verification-requirements.md) décrivent les preuves attendues;
- la [traçabilité](traceability.md) explique comment relier tout cela.

## Ce que cette couche doit garantir

`feat~cdm.requirements-layer~1`

Le dépôt doit contenir des exigences claires, versionnées et testables.

Needs: req

Critères d'acceptation :

- les exigences sont écrites en français clair;
- chaque exigence a un identifiant stable;
- les besoins, l'architecture et les tests se relient entre eux;
- la documentation reste lisible sans outil propriétaire.
