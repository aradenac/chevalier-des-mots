# Exigences techniques minimales

#### Le noyau du jeu doit rester séparé des adapters navigateur
`req~tech.core-adapters-separation~1`

Status: approved
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

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/technical.md | Added the core/adapters separation requirement | Keep technical separation explicit without over-specifying implementation |
| 2026-05-03 | 1.2.0 | 1.2.0 | docs/requirements/technical.md | Approved all requirements and normalized page structure | All listed requirements represent accepted product targets; page history must remain at the end |
