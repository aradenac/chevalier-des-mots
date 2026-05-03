# Exigences de vérification

#### OpenFastTrace doit valider la traçabilité
`req~verify.traceability-validation~1`

Status: approved
Priority: high
Verification: command

Le système doit fournir une commande locale qui valide la traçabilité statique avec OpenFastTrace.

Rationale:
La preuve de couverture doit rester reproductible en local.

Acceptance criteria:
- `npm run trace` exécute OpenFastTrace.
- La commande retourne un code non nul en cas d'échec.
- Un rapport lisible est produit sur disque.

Needs:
- impl

#### Vitest doit produire des résultats d'exécution consultables
`req~verify.unit-tests-pass~1`

Status: approved
Priority: high
Verification: command

Le système doit exécuter la suite Vitest et produire un résultat d'exécution exploitable en local.

Rationale:
Le mainteneur doit pouvoir relire le résultat des tests sans dépendre uniquement de la console.

Acceptance criteria:
- `npm test` reste lisible dans la console.
- `npm run test:report` produit un fichier JUnit dans `build/test-results/`.
- La commande retourne un code non nul si un test échoue.

Needs:
- impl

#### Le build applicatif doit rester vert
`req~verify.build-pass~1`

Status: approved
Priority: high
Verification: command

Le système doit permettre le build applicatif local avec Vite.

Rationale:
Le jeu doit rester compilable sans régression.

Acceptance criteria:
- `npm run build` retourne un code de succès.
- Le bundle est généré correctement.

Needs:
- impl

#### Le build MkDocs doit rester vert
`req~verify.docs-build-pass~1`

Status: approved
Priority: medium
Verification: command

Le système doit permettre le rendu MkDocs du référentiel d'exigences.

Rationale:
La documentation consultable doit rester générable localement.

Acceptance criteria:
- `npm run docs:build` retourne un code de succès.
- Le site statique est généré dans `site/`.

Needs:
- impl

#### La commande de vérification doit tout enchaîner
`req~verify.single-command~1`

Status: approved
Priority: high
Verification: command

Le système doit fournir une commande unique qui enchaîne les vérifications locales principales.

Rationale:
Le mainteneur doit pouvoir valider le dépôt avec une seule commande.

Acceptance criteria:
- `npm run verify` exécute les tests, le build, la trace et la documentation.
- La commande retourne un code non nul si une étape échoue.

Needs:
- impl

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/verification.md | Added verification requirements for traceability, tests, build, docs and verify command | Keep local proof obligations explicit |
| 2026-05-03 | 1.2.0 | 1.2.0 | docs/requirements/verification.md | Approved all requirements and normalized page structure | All listed requirements represent accepted product targets; page history must remain at the end |
