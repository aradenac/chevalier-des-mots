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

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/feedback-audio.md | Added feedback, narration, and audio requirements | Keep feedback and audio behaviors together for review |
| 2026-05-03 | 1.2.0 | 1.2.0 | docs/requirements/feedback-audio.md | Approved all requirements and normalized page structure | All listed requirements represent accepted product targets; page history must remain at the end |
| 2026-05-03 | 1.4.0 | 1.2.0 | docs/requirements/feedback-audio.md | Reworded feedback, speech and audio requirements with observable conditions | Apply writing rules without changing feedback or optional-audio behavior |
| 2026-05-03 | 2.0.0 | 1.3.0 | docs/requirements/feedback-audio.md | Replaced optional speech fallback with mandatory French voice requirement | Dictation levels require French speech synthesis to be playable |
| 2026-05-03 | 2.1.0 | 1.3.0 | docs/requirements/feedback-audio.md | Replaced progression speech gate with site launch French voice gate | Ensure mandatory dictation and debug levels cannot be reached without French speech synthesis |
