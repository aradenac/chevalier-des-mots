# Exigences techniques

Cette page décrit les contraintes techniques du projet.

## Site statique

`req~cdm.static-doc-site~1`

La documentation doit être générable en HTML statique avec MkDocs Material.

Needs: dsn, utest, uman

## Pas de serveur HTTP obligatoire

`req~cdm.file-url-docs~1`

Le site généré doit rester consultable directement via `site/index.html`.

Needs: dsn, utest, uman

## Architecture simple

`req~cdm.core-adapters-ui-separation~1`

Le code doit rester séparé entre data, core, adapters et interface DOM.

Needs: dsn, utest

## APIs navigateur optionnelles

`req~cdm.browser-apis-optional~1`

Les APIs navigateur optionnelles doivent échouer sans casser la partie.

Needs: dsn, utest, uman

## Brave comme navigateur cible

`req~cdm.brave-target~1`

Brave doit être traité comme un navigateur de test cible, notamment pour la voix.

Needs: dsn, utest, uman

## Validation traçable

`req~cdm.traceability-tooling~1`

La validation de couverture doit être faite avec OpenFastTrace et non avec un validateur maison.

Needs: dsn, utest, oman

## Critères d'acceptation

- la doc reste statique;
- le code reste en Vanilla JS;
- les APIs optionnelles ne créent pas de régression visible;
- la cible Brave est documentée;
- le projet conserve un outillage CLI standard.
