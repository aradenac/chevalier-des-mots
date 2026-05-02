# AGENTS.md

Ce dépôt est piloté par des spécifications versionnées. Codex doit travailler à partir de ces documents avant de modifier le code.

## 1. Source de vérité

- Les spécifications versionnées du repo sont la source de vérité.
- Avant toute modification fonctionnelle, lire :
  - `docs/requirements/`
  - `docs/index.md`
- Si une évolution touche plusieurs thèmes, lire plusieurs sous-pages concernées.
- Si la demande utilisateur contredit les specs, ne pas modifier le code directement.
- Proposer d'abord une mise à jour des specs.

## 2. Workflow en deux phases

### Phase SPEC REVIEW

Pour toute demande fonctionnelle :

1. lire `docs/requirements/` et les sous-pages concernées ;
2. produire une revue des exigences impactées ;
3. identifier les ambiguïtés, trous de spec et impacts code/tests ;
4. ne pas modifier `src/` ni `tests/` ;
5. si la spec doit changer, modifier uniquement `docs/requirements/` ;
6. mettre à jour le `Change history` des pages modifiées ;
7. mettre à jour `docs/requirements/version-history.md`.

### Gate d'approbation

- Ne pas modifier le code sans validation explicite de l'utilisateur.
- La phrase de validation attendue est : `Spec validée. Passe à l’implémentation.`
- Sans cette validation, rester dans les specs.

### Phase IMPLEMENTATION

Après validation explicite :

1. modifier `src/` et `tests/` ;
2. ajouter ou mettre à jour les liens OpenFastTrace ;
3. lancer `npm run verify` ;
4. mettre à jour `docs/requirements/version-history.md` ;
5. commit et push.

## 3. Traçabilité

- Utiliser OpenFastTrace.
- Ne jamais créer de validateur maison.
- Les exigences sont identifiées par des ids comme `req~game.visible-instruction~1`.
- Les liens de code utilisent `// [impl->req~...~1]`.
- Les liens de test utilisent `// [utest->req~...~1]`.
- Les liens documentaires utilisent `<!-- [doc->req~...~1] -->`.

## 4. Historique des changements

- Chaque page dans `docs/requirements/` doit contenir une section `Change history`.
- Chaque modification de spec doit ajouter une ligne avec :
  - date ;
  - spec version ;
  - game version ;
  - location ;
  - modification ;
  - justification.
- `docs/requirements/version-history.md` est obligatoire et relie les versions de specs et les versions du jeu.
- Codex doit le maintenir à chaque changement de specs ou de code.
- Ne pas supprimer l'historique.
- La revue SPEC REVIEW ne peut pas modifier `src/` ni `tests/`.
- Le code ne peut être modifié qu'après validation explicite de l'utilisateur : `Spec validée. Passe à l’implémentation.`

## 5. Commandes de vérification

Avant commit, exécuter autant que possible :

- `npm test`
- `npm run build`
- `npm run docs:build`
- `npm run trace`

Si `npm run trace` échoue parce que le JAR OpenFastTrace est absent, ne pas créer de validateur maison.
Afficher les instructions d'installation du JAR.

## 6. Architecture

Respecter la séparation :

- `src/data/` : données pédagogiques
- `src/core/` : logique pure testable
- `src/adapters/` : APIs navigateur
- `src/main.js` : orchestration UI
- `docs/` : référentiel d'exigences uniquement

## 7. Interdictions

- Ne pas faire de refactor big-bang.
- Ne pas modifier le gameplay sans exigence associée.
- Ne pas modifier les niveaux sans mettre à jour les specs.
- Ne pas modifier `src/` ou `tests/` pendant la phase SPEC REVIEW.
- Ne pas modifier le code si une exigence correspondante n'existe pas.
- Ne pas rendre `speechSynthesis` obligatoire.
- Ne pas introduire de framework UI sans ADR.
- Ne pas mélanger contenu pédagogique et moteur de jeu.
- Ne pas mettre la vérité documentaire dans un PDF ou dans un artefact généré.

## 8. Brave

- Brave est un navigateur cible.
- La synthèse vocale peut échouer dans Brave avec `getVoices() = []` ou `synthesis-failed`.
- Le jeu doit rester jouable sans narration vocale.

## 9. Documentation

- Markdown est la source de vérité.
- MkDocs est seulement le rendu consultable.
- `site/` est un artefact généré.
- `use_directory_urls: false` doit rester configuré.
