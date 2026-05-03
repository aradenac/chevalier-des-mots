# Audit de traçabilité

## Objectif

Cette page fournit une matrice manuelle d'aide à l'audit de traçabilité bidirectionnelle.
Elle ne remplace pas OpenFastTrace, ne crée pas de validateur maison et ne constitue pas une preuve d'exécution.

Les identifiants de la matrice sont écrits avec des entités HTML afin que cette page ne soit pas interprétée comme une nouvelle définition OpenFastTrace.

## Chaîne de preuve locale

OpenFastTrace valide les liens statiques entre exigences, implémentation et tests.
Vitest valide l'exécution des tests automatisés.

Les artefacts locaux attendus sont :

- `npm run test:report` produit `build/test-results/vitest-junit.xml`.
- `npm run trace` produit `build/traceability/openfasttrace.txt`.
- `npm run trace` produit aussi `build/traceability/openfasttrace.html` si le format HTML est supporté par le JAR local.
- `npm run build` produit `dist/`.
- `npm run docs:build` produit `site/`.
- `npm run verify` enchaîne les tests, le build, la trace et la documentation.

## Lecture descendante

Pour auditer une exigence vers les preuves :

1. Partir de la ligne de matrice correspondant à l'exigence.
2. Vérifier les `Needs` attendus.
3. Utiliser `build/traceability/openfasttrace.txt` pour confirmer les liens statiques attendus.
4. Utiliser l'artefact indiqué pour confirmer la preuve d'exécution, de build, de documentation ou de revue.

## Lecture ascendante

Pour auditer une preuve vers les exigences :

1. Partir d'un test, d'un résultat JUnit, d'un rapport OpenFastTrace, de `dist/` ou de `site/`.
2. Identifier le lien statique ou la commande qui rattache cette preuve à une exigence.
3. Vérifier dans la matrice que l'exigence attend ce type de preuve.
4. Confirmer que la méthode de vérification correspond au champ `Verification`.

## Matrice d'audit

| Requirement | Verification | Needs | Expected impl links | Expected test links | Evidence artifact |
|---|---|---|---|---|---|
| <code>req&#126;game.target-only-slicing&#126;1</code> | test | impl, utest | At least one impl link to this requirement. | At least one utest link to this requirement. | `build/test-results/vitest-junit.xml`; `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html` |
| <code>req&#126;game.no-blocking-punishment&#126;1</code> | inspection | impl | At least one impl link to this requirement. | None expected by `Needs`. | `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html`; manual inspection notes |
| <code>req&#126;data.levels-separated-from-engine&#126;1</code> | test | impl, utest | At least one impl link to this requirement. | At least one utest link to this requirement. | `build/test-results/vitest-junit.xml`; `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html` |
| <code>req&#126;level.pedagogical-progression&#126;1</code> | test | impl, utest | At least one impl link to this requirement. | At least one utest link to this requirement. | `build/test-results/vitest-junit.xml`; `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html` |
| <code>req&#126;level.progression-model&#126;1</code> | test | impl, utest | At least one impl link to this requirement. | At least one utest link to this requirement. | `build/test-results/vitest-junit.xml`; `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html` |
| <code>req&#126;level.extended-campaign-worlds&#126;1</code> | test | impl, utest | At least one impl link to this requirement. | At least one utest link to this requirement. | `build/test-results/vitest-junit.xml`; `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html` |
| <code>req&#126;level.world-two-grammar-consolidation&#126;1</code> | test | impl, utest | At least one impl link to this requirement. | At least one utest link to this requirement. | `build/test-results/vitest-junit.xml`; `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html` |
| <code>req&#126;level.longer-play-session&#126;1</code> | inspection | impl | At least one impl link to this requirement. | None expected by `Needs`. | `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html`; manual inspection notes |
| <code>req&#126;character.start-selection&#126;1</code> | test | impl, utest | At least one impl link to this requirement. | At least one utest link to this requirement. | `build/test-results/vitest-junit.xml`; `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html` |
| <code>req&#126;character.cosmetic-only&#126;1</code> | test | impl, utest | At least one impl link to this requirement. | At least one utest link to this requirement. | `build/test-results/vitest-junit.xml`; `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html` |
| <code>req&#126;ui.visible-instruction&#126;1</code> | manual-review | impl | At least one impl link to this requirement. | None expected by `Needs`. | `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html`; manual UI review notes |
| <code>req&#126;input.normalized-state&#126;1</code> | test | impl, utest | At least one impl link to this requirement. | At least one utest link to this requirement. | `build/test-results/vitest-junit.xml`; `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html` |
| <code>req&#126;feedback.immediate-result&#126;1</code> | manual-review | impl | At least one impl link to this requirement. | None expected by `Needs`. | `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html`; manual UI review notes |
| <code>req&#126;speech.brave-failure-handling&#126;1</code> | test | impl, utest | At least one impl link to this requirement. | At least one utest link to this requirement. | `build/test-results/vitest-junit.xml`; `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html` |
| <code>req&#126;audio.service-failure-non-blocking&#126;1</code> | test | impl, utest | At least one impl link to this requirement. | At least one utest link to this requirement. | `build/test-results/vitest-junit.xml`; `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html` |
| <code>req&#126;tech.core-adapters-separation&#126;1</code> | test | impl, utest | At least one impl link to this requirement. | At least one utest link to this requirement. | `build/test-results/vitest-junit.xml`; `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html` |
| <code>req&#126;verify.traceability-validation&#126;1</code> | command | impl | At least one impl link to this requirement. | None expected by `Needs`. | `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html` |
| <code>req&#126;verify.unit-tests-pass&#126;1</code> | command | impl | At least one impl link to this requirement. | None expected by `Needs`. | `build/test-results/vitest-junit.xml` |
| <code>req&#126;verify.build-pass&#126;1</code> | command | impl | At least one impl link to this requirement. | None expected by `Needs`. | `dist/` |
| <code>req&#126;verify.docs-build-pass&#126;1</code> | command | impl | At least one impl link to this requirement. | None expected by `Needs`. | `site/` |
| <code>req&#126;verify.single-command&#126;1</code> | command | impl | At least one impl link to this requirement. | None expected by `Needs`. | `build/test-results/vitest-junit.xml`; `build/traceability/openfasttrace.txt`; `build/traceability/openfasttrace.html`; `dist/`; `site/` |

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-03 | 1.5.0 | 1.2.0 | docs/requirements/traceability-audit.md | Added bidirectional traceability audit matrix | Make requirement-to-evidence and evidence-to-requirement review explicit without replacing OpenFastTrace |
| 2026-05-03 | 1.6.0 | 1.2.0 | docs/requirements/traceability-audit.md | Added the OpenFastTrace HTML report artifact | Keep the audit matrix aligned with the detailed trace wrapper output |
