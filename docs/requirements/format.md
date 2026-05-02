# Format OpenFastTrace

OpenFastTrace sert à relier les besoins, les exigences, la conception, le code, les tests et la documentation.
Le dépôt utilise du Markdown versionné comme source de vérité.

## Types d'éléments

- `dsn` : élément de design ou de specification. Il décrit une décision de conception, une vision produit ou un choix d'architecture.
- `req` : exigence vérifiable. Elle décrit un comportement attendu du jeu, de la doc ou de l'outillage.
- `impl` : implémentation dans le code source.
- `utest` : test unitaire qui vérifie une exigence.
- `itest` : test d'intégration ou de bout en bout.
- `doc` : documentation versionnée, lisible dans GitHub et dans MkDocs.

## Format d'un identifiant

Un identifiant suit la forme `type~domaine.sous-domaine~version`.

Exemple :

`req~game.visible-instruction~1`

Règles de nommage :

- le type reste en minuscules;
- le domaine reste court et stable;
- la version commence à `1`;
- une reformulation sans changement de sens garde la même version;
- un changement de comportement, de portée ou de critère d'acceptation impose une nouvelle version;
- si l'ancien sens doit rester traçable, on crée un nouvel identifiant versionné plutôt que de réécrire l'ancien.

## Signification de `Covers`

`Covers` relie un élément à l'élément amont qu'il couvre, précise ou matérialise.

Dans ce dépôt :

- un `req` couvre un `dsn`;
- un `impl` couvre un `req`;
- un `utest` couvre un `req`;
- un `doc` couvre un `req`.

Chaque ligne `Covers:` doit pointer vers un identifiant complet, par exemple `Covers: dsn~game.loop~1`.

## Signification de `Needs`

`Needs` liste les types d'artefacts attendus en aval.
Elle sert à dire ce qu'il faut retrouver pour considérer l'élément comme suffisamment couvert.

Exemples :

- `Needs: impl, utest` pour une exigence fonctionnelle;
- `Needs: req, doc` pour un élément de design;
- `Needs: doc` pour une exigence documentaire;
- `Needs: impl, utest, doc` quand il faut du code, des tests et une explication.

`Needs` ne contient pas d'identifiants complets dans ce dépôt. Il contient des types attendus.

## Exemple complet

### Le jeu affiche la consigne
`req~game.visible-instruction~1`

Le jeu doit afficher la consigne de mission pendant la partie.

Rationale:
L'enfant doit savoir quoi faire sans relire la page d'aide.

Covers: dsn~game.loop~1
Needs: impl, utest, doc

## Exemples de liens

Code :

```js
// [impl->req~game.visible-instruction~1]
```

Test :

```js
// [utest->req~game.visible-instruction~1]
```

Documentation :

```md
<!-- [doc->req~game.visible-instruction~1] -->
```

## Critères d'acceptation

- un humain peut lire le document sans connaître l'outil;
- un LLM peut retrouver le rôle d'un item;
- les IDs ne changent pas à chaque réécriture;
- les liens code, tests et docs suivent le même format;
- le format reste compatible avec OpenFastTrace.
