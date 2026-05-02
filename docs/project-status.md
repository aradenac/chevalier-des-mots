# État du projet

Cette page décrit l'état observable du projet au moment de la documentation.
Elle sert de point d'entrée pour développer, tester ou reprendre la maintenance avec un LLM.

## État actuel

Le projet est un jeu éducatif web en Vanilla JS, servi par Vite.
La boucle principale est jouable : le joueur déplace le chevalier, tranche les mots qui tombent, gagne des étoiles et passe d'un niveau au suivant.

La documentation est maintenue en Markdown avec MkDocs Material.
La source de vérité des contenus pédagogiques reste `src/data/levels.js`.

## Fonctionnalités terminées

- Menu de lancement avec choix de niveau.
- 20 niveaux pédagogiques définis dans `src/data/levels.js`.
- Déplacement clavier, tactile et manette.
- Action de frappe avec détection de collision.
- Score par étoiles et condition de réussite par niveau.
- Mode très facile qui élargit la zone de frappe et réduit la densité de mots.
- Sons courts via WebAudio quand l'API est disponible.
- Narration optionnelle via `speechSynthesis`.
- Diagnostic utilisateur quand la voix est indisponible.
- Tests unitaires pour les niveaux, la progression, l'état de jeu, la collision, les entrées, l'audio et la narration.

## Fonctionnalités partielles

- La narration dépend des voix exposées par le navigateur et le système. Le jeu gère l'échec, mais ne fournit pas de voix embarquée.
- La compatibilité manette repose sur le Gamepad API standard et sur les index de boutons usuels.
- La difficulté est définie par niveau avec `starsToWin`, `maxActiveWords` et `fallSpeed`, mais il n'y a pas encore d'éditeur de niveaux.
- Les retours pédagogiques sont présents dans les données, mais il n'existe pas encore de rapport détaillé après partie.

## Limites connues

- Brave peut exposer `speechSynthesis` sans fournir de voix exploitable.
- `speechSynthesis.getVoices()` peut retourner `[]`, surtout au chargement ou sur une configuration système sans voix française.
- Une erreur `synthesis-failed` peut apparaître au moment de parler; le jeu doit alors rester jouable sans narration.
- Le projet ne persiste pas encore la progression de l'enfant entre deux sessions.
- Les niveaux sont codés en JavaScript; toute modification de contenu doit être testée avec `npm test`.
- Le build statique ne remplace pas les tests en navigateur réel pour l'audio, la voix et la manette.

## Navigateurs testés

| Navigateur | État attendu | Points à vérifier |
| --- | --- | --- |
| Chrome | Jouable | voix, clavier, tactile simulé, build Vite |
| Brave | Jouable | diagnostic voix, `getVoices() = []`, absence de blocage |
| Firefox | Jouable à vérifier | WebAudio, clavier, rendu CSS |
| Safari | Non validé | WebAudio, synthèse vocale, tactile |

## Prochaines étapes

1. Ajouter une checklist de test manuel par navigateur.
2. Ajouter un rapport de fin de niveau avec les erreurs fréquentes.
3. Ajouter une persistance locale de la progression.
4. Extraire les niveaux vers un format de données plus éditable si le contenu augmente.
5. Ajouter une page de diagnostic technique visible en développement.

## Exemple de reprise par LLM

Demande exploitable :

```text
Ajoute un niveau 21 sur les pluriels, sans changer la boucle de jeu.
Mets à jour src/data/levels.js, tests/levels.test.js si nécessaire et docs/game-design/levels.md.
Lance npm test et npm run build.
```

Avant de modifier, vérifier :

- la structure d'un `Level` dans `docs/architecture/interfaces.md`;
- les règles pédagogiques dans `docs/game-design/pedagogical-rules.md`;
- les commandes dans `docs/development/commands.md`.
