# VERIFICATION REQUIREMENTS

#### Validation de traçabilité OpenFastTrace
`verreq~trace.openfasttrace-validation~1`

Status: approved

Le système doit valider la chaîne de traçabilité avec OpenFastTrace en CLI sous Linux.

Rationale:
La validation de couverture doit rester standard, gratuite et reproductible.

Verification method:
`npm run trace`

Acceptance criteria:
- La commande produit un rapport texte.
- La commande retourne un code non nul en cas d'échec.

Needs:
- impl

#### Tests unitaires verts
`verreq~test.unit-tests-pass~1`

Status: approved

Le système doit faire passer la suite de tests unitaires pertinente.

Rationale:
Les exigences fonctionnelles doivent rester vérifiées par les tests existants.

Verification method:
`npm test`

Acceptance criteria:
- Vitest retourne un code de succès.
- Les tests produisent un résultat d'exécution lisible.

Needs:
- impl

#### Build applicatif vert
`verreq~test.build-pass~1`

Status: approved

Le système doit permettre le build applicatif.

Rationale:
Le jeu doit rester compilable sans régression.

Verification method:
`npm run build`

Acceptance criteria:
- Vite produit le bundle attendu.
- Le build retourne un code de succès.

Needs:
- impl

#### Résultat d'exécution produit
`verreq~test.execution-results-produced~1`

Status: approved

Le système doit produire un résultat d'exécution consultable après les commandes de vérification.

Rationale:
Le mainteneur doit pouvoir relire l'effet d'une commande sans deviner.

Verification method:
sortie de commande, rapport texte

Acceptance criteria:
- Le résultat d'exécution est visible.
- Le rapport de trace est écrit sur disque.

Needs:
- impl

#### Build MkDocs vert
`verreq~docs.mkdocs-build-pass~1`

Status: approved

Le système doit permettre le build MkDocs.

Rationale:
La documentation rendue doit rester consultable comme site statique.

Verification method:
`npm run docs:build`

Acceptance criteria:
- MkDocs génère un site HTML.
- Le site reste consultable via `site/index.html`.

Needs:
- impl

#### Commande unique de vérification
`verreq~verify.single-command~1`

Status: approved

Le système doit fournir une commande unique de vérification avant commit.

Rationale:
Le mainteneur doit pouvoir lancer une seule commande pour vérifier l'état du dépôt.

Verification method:
`npm run verify`

Acceptance criteria:
- La commande enchaîne test, build et trace.
- La commande retourne un code non nul si une étape échoue.

Needs:
- impl
