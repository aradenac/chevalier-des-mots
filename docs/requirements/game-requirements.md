# Exigences du jeu

Ces exigences décrivent le comportement visible du jeu.

## Boucle de jeu

`req~cdm.gameplay-loop~1`

Le jeu doit présenter une boucle claire: lire un niveau, observer les mots, couper les cibles, corriger immédiatement, puis passer au niveau suivant.

Needs: dsn, utest, uman

## Aucune punition dure

`req~cdm.no-hard-punishment~1`

Une erreur ne doit jamais bloquer la partie ni fermer le niveau de manière punitive.

Needs: dsn, utest, uman

## Feedback multimodal

`req~cdm.feedback-modalities~1`

Chaque action importante doit produire un feedback court: texte, son si disponible, effet visuel léger et correction courte.

Needs: dsn, utest, uman

## Progression de difficulté

`req~cdm.difficulty-progression~1`

La difficulté doit augmenter progressivement par la vitesse, la densité des mots et la complexité grammaticale.

Needs: dsn, utest, uman

## 20 niveaux thématiques

`req~cdm.level-theming~1`

Le jeu doit exposer 20 niveaux cohérents couvrant l'orthographe, la nature des mots, la conjugaison et les accords.

Needs: dsn, utest, uman

## Narration optionnelle

`req~cdm.speech-optional~1`

La narration vocale doit rester optionnelle pour que le jeu soit jouable même si la synthèse vocale échoue.

Needs: dsn, utest, uman

## Diagnostic Brave

`req~cdm.brave-diagnostics~1`

Le jeu doit expliquer clairement quand Brave expose `speechSynthesis` sans voix exploitable.

Needs: dsn, utest, uman

## Docs consultables sans serveur

`req~cdm.documentation-file-url~1`

La documentation générée doit rester lisible via `file://` en ouvrant `site/index.html`.

Needs: dsn, utest, uman

## Critères d'acceptation

- l'enfant comprend quoi faire;
- l'erreur reste réversible;
- le feedback est immédiat;
- la narration ne bloque pas le jeu;
- la documentation ne dépend pas d'un serveur HTTP.
