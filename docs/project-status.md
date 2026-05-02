# État du projet

Cette page décrit l'état actuel du dépôt.
Elle sert de point d'entrée rapide avant une modification.

## État actuel

Le jeu est jouable en Vanilla JS, servi par Vite.
Le joueur déplace un chevalier, tranche des mots, gagne des étoiles et avance dans une progression de 20 niveaux.

La documentation est écrite en Markdown et générée avec MkDocs Material.
La documentation est opérationnelle dans `site/index.html` sans serveur HTTP.
La validation de traçabilité doit passer par OpenFastTrace.

## État de validation

- documentation opérationnelle : oui;
- OpenFastTrace installé dans l'environnement courant : non;
- Java 17+ disponible dans l'environnement courant : non;
- commandes validées : `npm test`, `npm run build`, `npm run docs:build`;
- `npm run trace` : échec propre faute de Java et du JAR OpenFastTrace.

## Fonctionnalités terminées

- boucle principale jouable;
- 20 niveaux thématiques;
- déplacement clavier, tactile et manette;
- collision épée / mot;
- score par étoiles;
- progression de niveau;
- sons optionnels;
- narration optionnelle;
- documentation générée en HTML statique;
- liens de documentation compatibles avec `file://`.

## Fonctionnalités partielles

- la narration dépend de l'API navigateur et des voix système;
- la compatibilité manette dépend du navigateur et du mapping de la manette;
- il n'existe pas encore de persistance de progression;
- il n'existe pas encore de tableau de bord de traçabilité généré automatiquement;
- la validation OpenFastTrace doit encore être branchée avec le JAR local.

## Limites connues

- Brave peut exposer `speechSynthesis` sans voix exploitable;
- `getVoices()` peut retourner `[]` au démarrage;
- `synthesis-failed` peut survenir sans casser la jouabilité;
- la documentation ne doit pas être testée comme si elle était le moteur du jeu;
- un changement documentaire ne doit pas modifier `src/`.
- `npm run trace` ne peut pas réussir tant que `tools/openfasttrace/openfasttrace.jar` n'est pas présent et que Java 17+ n'est pas installé.

## Navigateurs testés

| Navigateur | État | Point de contrôle |
| --- | --- | --- |
| Chrome | Jouable | audio, voix, navigation docs |
| Brave | Jouable avec diagnostic | `speechSynthesis`, `getVoices()`, `file://` |
| Firefox | À confirmer | rendu et audio |
| Safari | À confirmer | voix et tactile |

## Prochaines étapes

1. Brancher OpenFastTrace dans `tools/trace.sh`.
2. Installer Java 17+ et le JAR OpenFastTrace localement.
3. Garder les spécifications synchronisées avec les tests.
4. Réduire les doublons entre exigences et guide utilisateur.
