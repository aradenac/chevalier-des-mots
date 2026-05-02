# Commandes

Cette page regroupe les commandes utiles pour développer, tester et maintenir le projet.
Elles doivent rester simples à copier dans un terminal.

## Installation

```bash
npm install
```

À lancer après un clone ou après une modification des dépendances.

## Commandes npm

| Commande | Usage | Résultat attendu |
| --- | --- | --- |
| `npm run dev` | lancer le jeu en développement | serveur Vite sur `127.0.0.1` |
| `npm run build` | produire la version statique du jeu | dossier `dist/` généré |
| `npm run preview` | prévisualiser le build Vite | serveur de preview local |
| `npm test` | lancer les tests unitaires | suite Vitest verte |

Exemple de boucle courte pendant le développement :

```bash
npm test
npm run dev
```

## Commandes docs

| Commande | Usage | Résultat attendu |
| --- | --- | --- |
| `npm run docs:serve` | lancer la documentation en local | serveur MkDocs avec rechargement |
| `npm run docs:build` | générer la documentation statique | dossier `site/` généré |

Exemple après une modification Markdown :

```bash
npm run docs:build
```

## Vérification avant commit

Pour un changement de code du jeu :

```bash
npm test
npm run build
npm run docs:build
```

Pour un changement limité à la documentation :

```bash
npm run docs:build
```

Pour un changement de niveaux dans `src/data/levels.js` :

```bash
npm test
npm run build
npm run docs:build
```

## Contrôles git utiles

Avant commit :

```bash
git status --short
git diff --check
git diff -- mkdocs.yml docs/
```

Après commit :

```bash
git status --short
git log --oneline -1
```

## Règle de maintenance

Un changement documentaire ne doit pas modifier le code du jeu.
Un changement de gameplay doit être accompagné au minimum de `npm test` et `npm run build`.
