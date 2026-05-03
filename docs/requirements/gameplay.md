# Exigences de gameplay

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

Status: approved
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

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/gameplay.md | Added gameplay requirements for target slicing and non-blocking punishment | Preserve a compact, readable gameplay spec |
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/gameplay.md | Restored explicit utest linkage under Needs for target slicing | Keep traceability structurally valid for OpenFastTrace |
| 2026-05-03 | 1.2.0 | 1.2.0 | docs/requirements/gameplay.md | Approved all requirements and normalized page structure | All listed requirements represent accepted product targets; page history must remain at the end |
