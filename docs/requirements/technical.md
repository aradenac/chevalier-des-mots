# Exigences techniques minimales

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
