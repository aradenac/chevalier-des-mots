# Exigences de feedback et audio

#### Le résultat d'une action doit s'afficher immédiatement
`req~feedback.immediate-result~1`

Status: approved
Priority: high
Verification: manual-review

Lorsque le joueur effectue une frappe correcte ou incorrecte, le système doit afficher un message de feedback dans l'interface pendant le traitement de cette frappe.

Rationale:
Le joueur doit comprendre sans délai l'effet de son action.

Acceptance criteria:
- Une bonne frappe affiche un feedback positif.
- Une mauvaise frappe affiche un feedback négatif.
- Le message contient moins de 80 caractères.

Needs:
- impl

#### Une voix française doit être disponible pour jouer

`req~speech.french-voice-required~1`

Status: approved
Priority: high
Verification: test
Additional verification: manual-review

Au démarrage, le système doit empêcher l'accès au jeu si aucune voix française de synthèse vocale n'est disponible.

Rationale:
Les niveaux de dictée sont obligatoires et dépendent d'une lecture vocale française.

Acceptance criteria:
  * Le système détecte la disponibilité de l'API de synthèse vocale.
  * Le système détecte au moins une voix dont la langue commence par `fr` ou dont le nom indique une voix française.
  * Si aucune voix française n'est disponible, le système affiche un message d'erreur lisible.
  * Si aucune voix française n'est disponible, le système ne lance pas la progression de jeu.
  * Si une voix française est disponible, le système peut lancer la progression de jeu.
  * L'indisponibilité de WebAudio pour les effets sonores ne rend pas cette exigence échouée.

Needs:
  * impl
  * utest

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/feedback-audio.md | Added feedback, narration, and audio requirements | Keep feedback and audio behaviors together for review |
| 2026-05-03 | 1.2.0 | 1.2.0 | docs/requirements/feedback-audio.md | Approved all requirements and normalized page structure | All listed requirements represent accepted product targets; page history must remain at the end |
| 2026-05-03 | 1.4.0 | 1.2.0 | docs/requirements/feedback-audio.md | Reworded feedback, speech and audio requirements with observable conditions | Apply writing rules without changing feedback or optional-audio behavior |
| 2026-05-03 | 2.0.0 | 1.3.0 | docs/requirements/feedback-audio.md | Replaced optional speech fallback with mandatory French voice requirement | Dictation levels require French speech synthesis to be playable |
