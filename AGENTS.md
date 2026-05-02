# AGENTS.md

Ce dépôt est piloté par des spécifications versionnées. Codex doit travailler à partir de ces documents avant de modifier le code.

## 1. Source de vérité

- Les spécifications versionnées du repo sont la source de vérité.
- Avant toute modification fonctionnelle, lire :
  - `docs/requirements.md`
  - `docs/index.md`
- Si la demande utilisateur contredit les specs, ne pas modifier le code directement.
- Proposer d'abord une mise à jour des specs.

## 2. Workflow de modification fonctionnelle

Pour toute évolution fonctionnelle :

1. identifier les exigences impactées;
2. créer ou modifier les exigences si nécessaire;
3. modifier le code;
4. modifier ou ajouter les tests;
5. mettre à jour les annotations OpenFastTrace;
6. mettre à jour la documentation utilisateur si nécessaire;
7. lancer les vérifications;
8. commit et push.

## 3. Traçabilité

- Utiliser OpenFastTrace.
- Ne jamais créer de validateur maison.
- Les exigences sont identifiées par des ids comme `req~game.visible-instruction~1`.
- Les liens de code utilisent `// [impl->req~...~1]`.
- Les liens de test utilisent `// [utest->req~...~1]`.
- Les liens documentaires utilisent `<!-- [doc->req~...~1] -->`.

## 4. Commandes de vérification

Avant commit, exécuter autant que possible :

- `npm test`
- `npm run build`
- `npm run docs:build`
- `npm run trace`

Si `npm run trace` échoue parce que le JAR OpenFastTrace est absent, ne pas créer de validateur maison.
Afficher les instructions d'installation du JAR.

## 5. Architecture

Respecter la séparation :

- `src/data/` : données pédagogiques
- `src/core/` : logique pure testable
- `src/adapters/` : APIs navigateur
- `src/main.js` : orchestration UI
- `docs/` : référentiel d'exigences uniquement

## 6. Interdictions

- Ne pas faire de refactor big-bang.
- Ne pas modifier le gameplay sans exigence associée.
- Ne pas modifier les niveaux sans mettre à jour les specs.
- Ne pas rendre `speechSynthesis` obligatoire.
- Ne pas introduire de framework UI sans ADR.
- Ne pas mélanger contenu pédagogique et moteur de jeu.
- Ne pas mettre la vérité documentaire dans un PDF ou dans un artefact généré.

## 7. Brave

- Brave est un navigateur cible.
- La synthèse vocale peut échouer dans Brave avec `getVoices() = []` ou `synthesis-failed`.
- Le jeu doit rester jouable sans narration vocale.

## 8. Documentation

- Markdown est la source de vérité.
- MkDocs est seulement le rendu consultable.
- `site/` est un artefact généré.
- `use_directory_urls: false` doit rester configuré.
