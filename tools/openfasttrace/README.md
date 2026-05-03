# OpenFastTrace

OpenFastTrace est l'outil officiel de validation de traçabilité du projet.

Il sert à vérifier les liens entre :

- les besoins;
- les exigences;
- l'architecture;
- les tests;
- la documentation utilisateur;
- les notes de maintenance.

## Pré-requis

- Java 17 ou plus récent;
- un JAR OpenFastTrace placé dans `tools/openfasttrace/openfasttrace.jar`.

## Obtenir le JAR

Le JAR peut être téléchargé depuis :

- Maven Central;
- les releases GitHub du projet OpenFastTrace.

Référence Maven Central :

```text
org.itsallcode:openfasttrace
```

## Emplacement attendu

Le wrapper du dépôt s'attend à trouver :

```text
tools/openfasttrace/openfasttrace.jar
```

## Règle du projet

Ne pas créer de validateur maison.
La validation de traçabilité doit passer par OpenFastTrace uniquement.

## Usage local

Le script `tools/trace.sh` lance OpenFastTrace sur le dépôt et dépose les rapports dans `build/traceability/`.

Rapports générés :

- `build/traceability/openfasttrace.txt` : rapport texte détaillé avec `trace -o plain -v all`;
- `build/traceability/openfasttrace.html` : rapport HTML détaillé avec `trace -o html -v all --details-section-display expand`.

La commande `npm run trace` affiche les chemins des rapports et les commandes OpenFastTrace exactes utilisées.

## Formats vérifiés localement

La version locale du JAR annonce les formats de trace suivants :

- `plain`;
- `html`;
- `aspec`.

La commande `convert` annonce aussi le format de sortie `specobject`.
Le wrapper du projet ne convertit pas les rapports et ne réinterprète pas leur contenu.
