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

Le script `tools/trace.sh` lance OpenFastTrace sur le dépôt et dépose un rapport texte dans `build/traceability/`.
