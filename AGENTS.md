# AGENTS.md

Ce dépôt est piloté par des exigences versionnées. L'agent doit lire les exigences, analyser la traçabilité, implémenter le code correspondant, maintenir les tests et mettre à jour l'audit de traçabilité sans modifier les exigences.

## 1. Source de vérité

- Les exigences versionnées situées dans `docs/requirements/` sont la source de vérité fonctionnelle, technique et documentaire du projet.
- Avant toute modification de code ou de test, lire les exigences concernées dans `docs/requirements/`.
- Si une demande utilisateur contredit les exigences, ne pas modifier le code.
- Si une exigence manque, est ambiguë, contradictoire ou obsolète, arrêter l'implémentation et signaler précisément le problème à l'utilisateur.
- L'agent ne doit pas inventer de comportement produit pour combler une lacune d'exigence.
- L'agent ne doit pas déplacer la source de vérité vers un commentaire de code, un artefact généré, un prompt ou une convention implicite.

## 2. Rôle de l'agent

L'agent intervient après mise à jour des exigences par l'utilisateur.

L'agent doit :

1. lire les exigences applicables ;
2. utiliser OpenFastTrace pour évaluer l'état initial de la traçabilité ;
3. identifier les exigences impactées ;
4. inspecter le code et les tests existants ;
5. modifier le code pour satisfaire les exigences ;
6. ajouter ou mettre à jour les tests nécessaires ;
7. créer ou mettre à jour les liens OpenFastTrace dans le code et les tests ;
8. mettre à jour l'audit de traçabilité ;
9. exécuter les vérifications disponibles ;
10. utiliser OpenFastTrace pour valider l'état final de la traçabilité ;
11. rapporter les résultats, limites et écarts restants.

L'agent ne doit pas :

1. rédiger de nouvelles exigences ;
2. modifier les exigences existantes ;
3. modifier les règles de rédaction des exigences ;
4. modifier l'historique de version des exigences ;
5. modifier `docs/requirements/version-history.md` ;
6. modifier les documents normatifs situés dans `docs/requirements/` ;
7. remplacer une exigence manquante par une hypothèse implicite ;
8. implémenter une fonctionnalité sans exigence correspondante.

## 3. Périmètre d'écriture

L'agent peut modifier :

- le code source ;
- les tests ;
- les fixtures et données nécessaires à l'implémentation ;
- les scripts de build ou de vérification lorsque c'est nécessaire et justifié ;
- les liens OpenFastTrace dans le code et les tests ;

L'agent ne doit pas modifier :

- `docs/requirements/` ;
- `docs/requirements/version-history.md` ;
- les fichiers générés dans `site/` ;
- les artefacts de build générés ;
- les documents explicitement présentés comme validés par l'utilisateur.

En cas d'écart détecté dans une exigence, l'agent doit produire un rapport de correction attendu plutôt que modifier l'exigence.

## 4. Workflow d'implémentation

Pour toute demande d'implémentation, l'agent doit commencer par une phase de cadrage fondée sur les exigences et la traçabilité.

Avant toute modification de code ou de test, l'agent doit :

1. lire `docs/requirements/index.md` ;
2. lire les pages d'exigences directement concernées ;
3. lire les exigences liées par références croisées, `Needs` ou dépendances fonctionnelles ;
4. exécuter `npm run trace` lorsque OpenFastTrace est disponible ;
5. examiner le rapport OpenFastTrace pour identifier :
   - les exigences déjà couvertes ;
   - les exigences non couvertes ;
   - les liens `impl` ou `utest` existants ;
   - les liens `orphaned` ;
   - les liens `outdated` ;
   - les incohérences de couverture ;
6. utiliser les exigences et le rapport OpenFastTrace pour déterminer les fichiers de code, de test et d'audit à modifier.

Après cette phase de cadrage seulement, l'agent peut :

1. inspecter le code existant ;
2. identifier les exigences couvertes par les fichiers à modifier ;
3. appliquer des modifications ciblées ;
4. ajouter ou mettre à jour les tests correspondant aux exigences ;
5. ajouter ou mettre à jour les liens OpenFastTrace ;
6. exécuter les vérifications disponibles ;
7. corriger les échecs liés aux modifications courantes ;
8. résumer les exigences couvertes, les liens de traçabilité et les vérifications exécutées.

L'agent doit privilégier les modifications incrémentales et localisées.  
L'agent ne doit pas effectuer de refonte globale sans demande explicite et exigence associée.

## 5. Gestion des ambiguïtés

Si les exigences ne permettent pas de déterminer le comportement attendu, l'agent doit poser le problème avant d'implémenter.

Le rapport d'ambiguïté doit contenir :

- l'identifiant de l'exigence concernée ;
- le passage problématique ;
- la raison de l'ambiguïté ;
- les options possibles ;
- l'impact probable sur le code et les tests.

L'agent peut proposer une rédaction ou une clarification à l'utilisateur, mais ne doit pas l'intégrer lui-même dans `docs/requirements/`.

## 6. Traçabilité OpenFastTrace

- Utiliser OpenFastTrace pour la traçabilité.
- OpenFastTrace doit être utilisé au début d'une tâche pour évaluer l'état initial de la couverture, puis à la fin pour valider l'état final.
- Ne pas créer de validateur de traçabilité maison.
- Les exigences sont identifiées par des identifiants du type `req~domain.name~1`.
- Les liens d'implémentation utilisent le format `// [impl->req~...~1]`.
- Les liens de tests unitaires utilisent le format `// [utest->req~...~1]`.
- Les liens doivent pointer vers des exigences existantes et actives.
- Ne pas conserver de lien vers une exigence supprimée, remplacée ou absente.
- Si un lien existant devient `orphaned` ou `outdated`, l'agent doit corriger le lien lorsque la nouvelle exigence applicable est claire.
- Si la nouvelle exigence applicable n'est pas claire, l'agent doit signaler le cas à l'utilisateur.

## 7. Critère de validation par traçabilité

Une tâche d'implémentation n'est considérée comme terminée que si la traçabilité OpenFastTrace est complète, cohérente et sans défaut connu pour le périmètre modifié.

Avant de déclarer une tâche terminée, l'agent doit vérifier que :

- chaque exigence applicable modifiée, ajoutée ou impactée possède les liens de couverture attendus ;
- chaque comportement implémenté est rattaché à une exigence active ;
- chaque test ajouté ou modifié est rattaché à une exigence active ;
- aucun lien `impl` ou `utest` ne pointe vers une exigence absente, supprimée ou remplacée ;
- aucun lien `orphaned`, `outdated`, incohérent ou suspect n'est laissé sans justification explicite ;
- le rapport OpenFastTrace ne contient pas de défaut non traité dans le périmètre de la tâche ;

Si la traçabilité ne peut pas être rendue complète, l'agent doit arrêter la validation de la tâche et signaler :

- les exigences concernées ;
- les liens manquants ou défectueux ;
- la raison du blocage ;
- les actions nécessaires pour atteindre une traçabilité complète.

L'agent ne doit pas déclarer une implémentation prête si la traçabilité OpenFastTrace du périmètre modifié est incomplète, incohérente ou non vérifiée.

## 9. Vérifications

Avant de considérer une implémentation terminée, exécuter les vérifications suivantes lorsque l'environnement local le permet :

~~~bash
npm test
npm run build
npm run docs:build
npm run trace
npm run verify
~~~

`npm run trace` est obligatoire pour valider la traçabilité lorsque l'outil OpenFastTrace est disponible.

Si une commande échoue :

1. identifier si l'échec est lié aux modifications courantes ;
2. corriger les échecs liés aux modifications courantes ;
3. signaler les échecs non liés ou impossibles à corriger dans le contexte de la tâche.

Si `npm run trace` échoue parce que le JAR OpenFastTrace est absent :

- ne pas créer de validateur alternatif ;
- signaler l'absence du JAR ;
- indiquer l'action nécessaire pour rétablir l'outil officiel lorsqu'elle est documentée dans le dépôt.

## 10. Documentation générée

- Markdown est la source documentaire.
- MkDocs est le rendu consultable.
- `site/` est un artefact généré.
- Ne pas traiter un fichier généré comme source de vérité.
- Ne pas modifier manuellement `site/`.
- Régénérer la documentation avec la commande prévue lorsque la vérification documentaire l'exige.

## 11. Discipline de modification

L'agent doit :

- éviter les changements sans rapport avec la tâche ;
- conserver le style de code existant ;
- ne pas introduire de dépendance sans nécessité justifiée ;
- ne pas introduire de framework sans exigence ou décision documentée ;
- ne pas renommer massivement les fichiers ou symboles sans nécessité ;
- ne pas mélanger correction fonctionnelle, refactorisation et changement de comportement dans une même modification non justifiée ;
- maintenir ou ajouter les tests correspondant aux exigences implémentées ;
- préserver les comportements existants couverts par des exigences actives.

## 12. Rapport final attendu

À la fin d'une tâche, l'agent doit fournir un résumé contenant :

- les exigences implémentées ou impactées ;
- les principaux fichiers modifiés ;
- les tests ajoutés ou modifiés ;
- les liens OpenFastTrace ajoutés ou modifiés ;
- les commandes exécutées ;
- le résultat des vérifications ;
- l'état final de la traçabilité OpenFastTrace ;
- les écarts restants, s'il y en a ;
- les exigences ambiguës ou manquantes détectées, s'il y en a.

L'agent ne doit pas déclarer une tâche terminée si une exigence applicable reste non couverte sans le signaler.
