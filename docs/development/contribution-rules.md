# Règles de contribution

<!-- [doc->req~traceability.openfasttrace-validation~1] -->
<!-- [doc->req~documentation.markdown-source~1] -->

## Règles simples

- garder les changements petits;
- ne pas mélanger gameplay et documentation dans un même objectif;
- ne pas réécrire le moteur pour corriger une page de doc;
- ne pas créer un validateur maison;
- ne pas introduire de framework UI;
- ne pas modifier les niveaux sans raison liée aux exigences.

## Critères d'acceptation

- un changement doit rester relisible dans `git diff`;
- un changement doit conserver le comportement visible sauf exigence contraire;
- les décisions doivent pouvoir être expliquées en une phrase;
- le dépôt doit rester maintenable par un LLM.
