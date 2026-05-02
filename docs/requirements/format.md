# Format OpenFastTrace

OpenFastTrace sert à relier les besoins, les exigences, l'architecture, les tests et les manuels.
Le dépôt utilise des fichiers Markdown comme source de vérité.

## Structure minimale

Un item OpenFastTrace contient :

- un identifiant stable;
- un texte descriptif;
- des liens `Needs`;
- éventuellement un statut;
- éventuellement une justification ou un commentaire.

## Exemple simple

```md
`req~cdm.gameplay-loop~1`

Le jeu doit afficher une boucle simple où le joueur coupe des mots, gagne des points et passe au niveau suivant.

Needs: dsn, utest, uman
```

## Types d'artefacts utilisés dans ce projet

- `feat` : fonction ou intention produit;
- `req` : exigence vérifiable;
- `dsn` : conception ou architecture;
- `impl` : implémentation dans le code;
- `utest` : test unitaire;
- `uman` : notice utilisateur;
- `oman` : guide de maintenance ou d'exploitation.

## Règles de rédaction

- un ID doit rester stable dans le temps;
- un item doit rester court et vérifiable;
- un item ne doit pas mélanger plusieurs intentions;
- une liste de `Needs` doit rester courte et lisible;
- les commentaires ne remplacent pas une exigence.

## Bon usage

Exemple avec une justification :

```md
`req~cdm.speech-optional~1`

La narration vocale doit rester optionnelle pour que le jeu reste jouable sans voix.

Needs: dsn, utest, uman

Comment:
Brave peut exposer speechSynthesis sans voix effective. Le jeu doit continuer.
```

## Critères d'acceptation

- un humain peut lire le document sans connaître l'outil;
- un LLM peut retrouver le rôle d'un item;
- les IDs ne changent pas à chaque réécriture;
- le format reste compatible avec OpenFastTrace.
