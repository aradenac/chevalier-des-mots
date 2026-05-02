# Guide LLM

Ce guide indique où trouver les informations et comment modifier le projet sans casser l’existant.

## Où se trouvent les informations

- données pédagogiques : `src/data/levels.js`
- état et progression : `src/core/`
- entrées utilisateur : `src/adapters/`
- orchestration UI : `src/main.js`
- documentation : `docs/`

## Règles de modification

1. garder les changements petits
2. ne pas lancer un big-bang refactor
3. séparer données, core, adapters et UI
4. ne pas mélanger contenu pédagogique et moteur
5. conserver la jouabilité si une API navigateur échoue

## Après modification

L’agent doit lancer :

```bash
npm test
npm run build
```

## Principe de maintenance

Les données pédagogiques doivent rester séparées du code moteur.
Le moteur doit rester testable sans DOM.
Les adaptateurs doivent absorber les dépendances navigateur.

## Critères d’acceptation

- les changements n’altèrent pas le comportement visible sans raison
- la structure reste compréhensible à la lecture
- le projet continue de fonctionner même si une API optionnelle manque

