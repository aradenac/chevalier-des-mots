# Exigences de feedback et audio

#### Le résultat d'une action doit s'afficher immédiatement
`req~feedback.immediate-result~1`

Status: approved  
Priority: high  
Verification: manual-review  

Lorsque le joueur effectue une frappe correcte ou incorrecte, le système doit afficher un message de feedback dans l'interface pendant le traitement de cette frappe.

Rationale: Le joueur doit comprendre sans délai l'effet de son action.

Acceptance criteria:

- Une bonne frappe affiche un feedback positif.
- Une mauvaise frappe affiche un feedback négatif.
- Le message contient moins de 80 caractères.

Needs: impl

#### Une voix française doit être disponible avant l'accès au jeu

`req~speech.french-voice-required~2`

Status: approved  
Priority: high  
Verification: test  
Additional verification: manual-review  

Au lancement du site, le système doit vérifier la disponibilité d'une voix française de synthèse vocale avant de permettre l'accès aux menus de jeu.

Rationale: Les niveaux de dictée sont obligatoires dans la progression principale et le mode debug doit tester les niveaux dans les mêmes conditions techniques critiques que la campagne normale.

Acceptance criteria:

- La vérification de disponibilité de l'API de synthèse vocale fait partie des premières opérations de lancement du site.
- Le système détecte au moins une voix dont la langue commence par `fr` ou dont le nom indique une voix française.
- Si les voix ne sont pas disponibles immédiatement, le système attend l'événement navigateur permettant de réévaluer la liste des voix avant de conclure à l'indisponibilité.
- Si aucune voix française n'est disponible après la phase de détection, le système affiche un message d'erreur lisible.
- Si aucune voix française n'est disponible, le système ne permet pas d'accéder au menu principal.
- Si aucune voix française n'est disponible, le système ne permet pas d'accéder au menu debug.
- Si une voix française est disponible, le système permet d'accéder au menu principal.
- L'indisponibilité de WebAudio pour les effets sonores ne rend pas cette exigence échouée.

Needs: impl, utest

#### Le jeu doit sélectionner automatiquement une musique selon le contexte

`req~music.context-track-selection~1`

Status: approved
Priority: medium
Verification: test
Additional verification: manual-review

Le système doit lancer automatiquement une musique de fond adaptée au contexte courant du jeu.

Rationale: La musique doit renforcer l'identité sonore du jeu sans demander une action manuelle au joueur.

Acceptance criteria:
- Le menu principal utilise une musique de fond dédiée au menu.
- Un niveau de type `slicing` utilise une musique dédiée au tranchage.
- Un niveau de type `dictation` utilise une musique dédiée à la dictée.
- Un niveau de type `cannon` utilise une musique dédiée au cannon.
- La musique démarre automatiquement lorsqu'un menu ou un niveau concerné devient actif.
- La musique change lorsque le contexte actif change vers un autre contexte musical.
- Le système ne redémarre pas inutilement la même musique lorsque le contexte suivant utilise la même piste.
- La sélection musicale dépend du contexte ou du type de niveau, et non du numéro de niveau.
- L'absence ou l'échec d'une musique ne bloque pas l'accès au menu ou au niveau.

Needs: impl, utest

#### Les musiques doivent avoir une identité rétro 8-bit adaptée au contexte

`req~music.retro-style-by-context~1`

Status: approved
Priority: medium
Verification: manual-review

Le système doit associer à chaque contexte musical une ambiance rétro 8-bit adaptée à l'intention de l'écran ou du mode de jeu.

Rationale: Chaque mode doit être immédiatement reconnaissable par son ambiance sonore sans distraire l'enfant de l'objectif pédagogique.

Acceptance criteria:
- La musique du menu utilise une esthétique rétro 8-bit accueillante, légère et adaptée à un écran de sélection.
- La musique du mode `slicing` utilise une esthétique rétro 8-bit avec une ambiance médiévale.
- La musique du mode `slicing` reste dynamique et compatible avec une action de tranchage.
- La musique du mode `dictation` utilise une esthétique rétro 8-bit calme, douce et enfantine.
- La musique du mode `dictation` reste suffisamment discrète pour ne pas gêner l'écoute des mots dictés.
- La musique du mode `cannon` utilise une esthétique rétro 8-bit plus guerrière, martiale ou héroïque.
- La musique du mode `cannon` reste adaptée à un jeu pour enfant et ne doit pas être anxiogène.
- Les musiques ne contiennent pas de paroles.
- Les musiques sont conçues pour boucler sans coupure perceptible gênante.

Needs: impl

#### Les musiques doivent être générées ou remplaçables sans dépendance externe fragile

`req~music.generated-or-replaceable-source~1`

Status: approved
Priority: medium
Verification: inspection
Additional verification: test

Le système doit fournir les musiques de fond par une source locale, générée ou embarquée, sans dépendre d'un service externe au moment de jouer.

Rationale: Le jeu doit rester jouable hors ligne et permettre de remplacer facilement les musiques plus tard.

Acceptance criteria:
- Les musiques de fond peuvent être générées par code avec WebAudio.
- Le système expose une structure claire permettant d'associer un contexte musical à une source musicale.
- Le système permet de remplacer ultérieurement une musique générée par un asset audio local sans changer les règles de sélection musicale.
- Le jeu ne dépend pas d'un service externe pour charger les musiques.
- Les fichiers MP3 ne sont pas utilisés pour les musiques du jeu.
- Si des fichiers audio sont ajoutés ultérieurement, ils doivent être locaux, redistribuables et compatibles avec les navigateurs ciblés.
- Chaque musique ajoutée comme fichier doit avoir une origine ou une licence documentée lorsque cela est nécessaire.
- L'échec de WebAudio ou d'un asset musical ne bloque pas le jeu.

Needs: impl, utest

#### Le joueur doit pouvoir régler et couper la musique

`req~music.user-volume-control~1`

Status: approved
Priority: medium
Verification: test
Additional verification: manual-review

Le système doit proposer un contrôle utilisateur permettant de régler le volume de la musique et de l'activer ou la désactiver.

Rationale: La musique doit rester confortable pour l'enfant et pour l'adulte qui encadre la session.

Acceptance criteria:
- L'interface propose un curseur de volume dédié à la musique.
- L'interface propose un bouton permettant d'activer ou désactiver la musique.
- Le bouton d'activation ou désactivation est placé à proximité du curseur de volume musique.
- Le réglage de volume musique ne modifie pas le volume de la voix de dictée.
- Le réglage de volume musique ne modifie pas nécessairement le volume des effets sonores.
- Lorsque la musique est désactivée, aucune musique de menu ou de niveau n'est audible.
- Lorsque la musique est réactivée, la musique adaptée au contexte courant peut reprendre.
- Le réglage s'applique au menu, au mode `slicing`, au mode `dictation` et au mode `cannon`.
- Le jeu reste jouable si l'utilisateur ne modifie jamais ce réglage.

Needs: impl, utest

#### La voix de dictée doit rester prioritaire sur la musique

`req~music.dictation-ducking~1`

Status: approved
Priority: high
Verification: test
Additional verification: manual-review

Pendant un niveau de dictée, le système doit abaisser fortement la musique lorsque la voix de dictée parle.

Rationale: La musique ne doit jamais empêcher l'enfant d'entendre le mot ou la consigne dictée.

Acceptance criteria:
- La voix de dictée reste clairement audible par rapport à la musique.
- Lorsque la voix prononce une consigne ou un mot dicté, le volume effectif de la musique est fortement abaissé.
- La musique reste très faiblement audible pendant la voix, sauf si le navigateur impose une limitation technique.
- La musique ne couvre pas le début d'un mot dicté.
- La musique ne couvre pas la fin d'un mot dicté.
- Lorsque la voix se termine, la musique revient progressivement ou immédiatement à son volume précédent sans masquer la consigne suivante.
- Si la gestion simultanée de la voix et de la musique est instable, le système privilégie la voix et peut rendre la musique inaudible pendant la dictée.
- Le réglage utilisateur de volume musique reste respecté en dehors des périodes de voix.

Needs: impl, utest

#### La musique ne doit jamais bloquer le jeu

`req~music.failure-non-blocking~1`

Status: approved
Priority: high
Verification: test

Si la musique ne peut pas être initialisée, générée, chargée ou jouée, le système doit laisser le jeu fonctionner sans musique.

Rationale: La musique améliore l'expérience, mais elle ne doit jamais devenir un prérequis fonctionnel.

Acceptance criteria:
- Une erreur d'initialisation WebAudio ne bloque pas le menu principal.
- Une erreur d'initialisation WebAudio ne bloque pas le lancement d'un niveau.
- Une erreur de génération musicale ne bloque pas les entrées joueur.
- Une erreur de génération musicale ne bloque pas la progression de niveau.
- Une erreur de musique ne désactive pas la voix française si celle-ci reste disponible.
- Une erreur de musique ne désactive pas nécessairement les effets sonores si ceux-ci restent disponibles.
- Le système peut continuer sans aucune musique si l'audio du navigateur est indisponible.

Needs: impl, utest



## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/feedback-audio.md | Added feedback, narration, and audio requirements | Keep feedback and audio behaviors together for review |
| 2026-05-03 | 1.2.0 | 1.2.0 | docs/requirements/feedback-audio.md | Approved all requirements and normalized page structure | All listed requirements represent accepted product targets; page history must remain at the end |
| 2026-05-03 | 1.4.0 | 1.2.0 | docs/requirements/feedback-audio.md | Reworded feedback, speech and audio requirements with observable conditions | Apply writing rules without changing feedback or optional-audio behavior |
| 2026-05-03 | 2.0.0 | 1.3.0 | docs/requirements/feedback-audio.md | Replaced optional speech fallback with mandatory French voice requirement | Dictation levels require French speech synthesis to be playable |
| 2026-05-03 | 2.1.0 | 1.3.0 | docs/requirements/feedback-audio.md | Replaced progression speech gate with site launch French voice gate | Ensure mandatory dictation and debug levels cannot be reached without French speech synthesis |
| 2026-05-03 | 2.1.0 | 1.4.0 | docs/requirements/feedback-audio.md | Added generated retro music requirements by context | Give menus and each level type a distinct 8-bit musical identity while preserving speech priority |
