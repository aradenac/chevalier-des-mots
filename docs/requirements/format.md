# Format des exigences

## Rôle de cette page

Cette page fournit un rappel court du format attendu.
La source de vérité complète des règles de rédaction est [Règles de rédaction](writing-rules.md).

## Rappel minimal

Chaque exigence produit utilise un identifiant OpenFastTrace unique au format `req~domaine.nom~1`.

Chaque exigence créée ou modifiée doit respecter le gabarit, le langage normatif, la cohérence `Verification` / `Needs` et les règles de modification définis dans [Règles de rédaction](writing-rules.md).

## Exemples de liens OpenFastTrace

- `// [impl->req~...~1]`
- `// [utest->req~...~1]`

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/format.md | Added required format and OpenFastTrace examples | Keep requirement formatting explicit and machine-readable |
| 2026-05-03 | 1.4.0 | 1.2.0 | docs/requirements/format.md | Reduced format page to a short reference to writing rules | Keep writing-rules.md as the single source of truth for authoring rules |
