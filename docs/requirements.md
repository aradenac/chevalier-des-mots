# Référentiel d'exigences

## Objet du système

Le jeu est un jeu éducatif web en Vanilla JS. Le joueur incarne un chevalier qui tranche des mots pour apprendre à reconnaître des formes linguistiques correctes ou incorrectes.

## Périmètre

Le périmètre couvre le jeu jouable dans un navigateur, la documentation d'exigences consultable dans MkDocs et la validation locale de la traçabilité avec OpenFastTrace. Le projet ne prévoit pas de compte utilisateur, pas de backend, pas de sauvegarde distante et pas de synchronisation réseau.

## Règles de format

Chaque exigence utilise un identifiant OpenFastTrace unique au format `req~domaine.nom~1`.

Chaque exigence contient au minimum :
- un titre humain ;
- un identifiant OpenFastTrace ;
- `Status` ;
- `Priority` ;
- `Verification` ;
- un énoncé normatif avec le verbe "doit" ;
- `Rationale` ;
- `Acceptance criteria` ;
- `Needs`.

Les exigences qui sont implémentées doivent indiquer `Needs: impl, utest`.
Les exigences purement documentaires ou de processus sont évitées.

## Exigences de gameplay

#### Le joueur doit trancher les mots cibles
`req~game.target-only-slicing~1`

Status: approved
Priority: high
Verification: test

Le système doit résoudre une frappe en choisissant le mot le plus pertinent dans la zone d'épée, puis considérer la frappe comme réussie uniquement si le mot résolu est une cible.

Rationale:
La mécanique centrale du jeu repose sur la distinction entre le mot touché et la réussite liée à la propriété `target`.

Acceptance criteria:
- Un mot non cible peut être résolu par la frappe mais ne compte pas comme réussite.
- Si plusieurs mots sont dans la zone d'épée, le plus plausible est retenu.
- Un mot cible résolu compte comme réussite.

Needs:
- impl
- utest

#### Une erreur ne doit pas bloquer la partie
`req~game.no-blocking-punishment~1`

Status: draft
Priority: medium
Verification: inspection

Le système doit traiter une frappe sur un mot non cible sans arrêter la partie ni bloquer la progression.

Rationale:
Une erreur doit rester corrective et immédiate, pas punitive.

Acceptance criteria:
- La partie continue après une mauvaise frappe.
- Le mot erroné rebondit ou reste en jeu.
- Le joueur peut rejouer immédiatement.

Needs:
- impl

## Exigences de niveaux

#### Les niveaux doivent rester des données séparées du moteur
`req~data.levels-separated-from-engine~1`

Status: approved
Priority: high
Verification: test

Le système doit définir les niveaux dans un module de données séparé de la logique d'exécution du jeu.

Rationale:
La liste des niveaux doit rester éditable sans mélanger contenu pédagogique et moteur.

Acceptance criteria:
- Les niveaux sont listés dans un module de données dédié.
- Chaque niveau expose ses métadonnées et ses items.
- Les tests vérifient la cohérence de la structure.

Needs:
- impl
- utest

#### La progression doit avancer niveau par niveau
`req~level.progression-model~1`

Status: approved
Priority: high
Verification: test

Le système doit gérer la sélection d'un niveau, la détection de victoire et le passage au niveau suivant à partir d'indices bornés.

Rationale:
La progression du joueur doit rester déterministe et simple à vérifier.

Acceptance criteria:
- Un index trop petit est ramené au premier niveau.
- Un index trop grand est ramené au dernier niveau.
- La victoire finale renvoie au premier niveau.

Needs:
- impl
- utest

## Exigences d'interface et d'entrées

#### La consigne courante doit rester visible
`req~ui.visible-instruction~1`

Status: draft
Priority: high
Verification: manual-review

Le système doit afficher la consigne du niveau courant dans l'interface et la mettre à jour quand le niveau change.

Rationale:
Le joueur doit savoir immédiatement quoi trancher.

Acceptance criteria:
- La consigne affichée correspond au niveau courant.
- Le texte change quand un nouveau niveau démarre.

Needs:
- impl

#### Les entrées clavier, tactiles et manette doivent être normalisées
`req~input.normalized-state~1`

Status: draft
Priority: high
Verification: test

Le système doit traduire le clavier, le tactile et la manette vers un état d'entrée commun avec déplacement gauche, déplacement droit, attaque et pause.

Rationale:
Le moteur du jeu ne doit pas dépendre du périphérique utilisé.

Acceptance criteria:
- Les trois périphériques exposent la même forme d'état.
- Les actions ponctuelles ne sont consommées qu'une fois par lecture.
- La manette standard et les variantes génériques restent utilisables.

Needs:
- impl
- utest

## Exigences de feedback

#### Le résultat d'une action doit s'afficher immédiatement
`req~feedback.immediate-result~1`

Status: draft
Priority: high
Verification: manual-review

Le système doit afficher immédiatement un feedback lisible après une frappe correcte ou incorrecte.

Rationale:
Le joueur doit comprendre sans délai l'effet de son action.

Acceptance criteria:
- Une bonne frappe affiche un feedback positif.
- Une mauvaise frappe affiche un feedback négatif.
- Le message reste court et lisible.

Needs:
- impl

#### La narration vocale doit rester optionnelle
`req~speech.brave-failure-handling~1`

Status: approved
Priority: high
Verification: test

Le système doit conserver un jeu jouable si la synthèse vocale est absente, vide ou échoue avec `synthesis-failed`.

Rationale:
Le jeu doit rester accessible dans les navigateurs où la voix n'est pas fiable.

Acceptance criteria:
- L'absence de voix n'empêche pas de jouer.
- Une erreur de synthèse vocale n'arrête pas la partie.
- Le diagnostic vocal peut être affiché sans bloquer l'interface.

Needs:
- impl
- utest

## Exigences techniques minimales

#### Le service audio ne doit pas bloquer le jeu
`req~audio.service-failure-non-blocking~1`

Status: approved
Priority: medium
Verification: test

Le système doit rester fonctionnel si WebAudio est indisponible ou si le contexte audio ne peut pas être créé.

Rationale:
Le son améliore l'expérience mais ne doit jamais empêcher la partie.

Acceptance criteria:
- L'initialisation audio échoue sans lever d'erreur visible.
- Les effets sonores renvoient un échec silencieux quand l'audio n'est pas disponible.
- Le jeu reste jouable sans audio.

Needs:
- impl
- utest

#### Le noyau du jeu doit rester séparé des adapters navigateur
`req~tech.core-adapters-separation~1`

Status: draft
Priority: medium
Verification: test

Le système doit conserver la logique de jeu pure dans `src/core/` et les accès aux API navigateur dans `src/adapters/`.

Rationale:
La séparation réduit le couplage et simplifie les tests.

Acceptance criteria:
- Les modules core restent testables sans DOM.
- Les fichiers de `src/core/` n'utilisent pas directement `document`, `window`, `navigator`, `localStorage`, `AudioContext` ou `speechSynthesis`.
- `src/main.js` orchestre sans réimplémenter la logique métier.

Needs:
- impl
- utest

## Exigences de vérification

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
