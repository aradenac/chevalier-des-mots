# Format des exigences

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

## Exemples de liens OpenFastTrace

- `// [impl->req~...~1]`
- `// [utest->req~...~1]`
