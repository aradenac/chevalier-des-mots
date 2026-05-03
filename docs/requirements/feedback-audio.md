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

#### La narration vocale doit rester optionnelle
`req~speech.brave-failure-handling~1`

Status: approved
Priority: high
Verification: test

Si la synthèse vocale est absente, vide ou échoue avec `synthesis-failed`, le système doit conserver le démarrage, les entrées et la progression de niveau disponibles.

Rationale:
Le jeu doit rester accessible dans les navigateurs où la voix n'est pas fiable.

Acceptance criteria:
- L'absence de voix n'empêche pas le démarrage d'une partie.
- Une erreur de synthèse vocale n'arrête pas la progression en cours.
- Le diagnostic vocal peut être affiché sans bloquer l'interface.

Needs:
- impl
- utest

#### Le service audio ne doit pas bloquer le jeu
`req~audio.service-failure-non-blocking~1`

Status: approved
Priority: medium
Verification: test

Si WebAudio est indisponible ou si le contexte audio ne peut pas être créé, le système doit laisser la partie se lancer et continuer sans audio.

Rationale:
Le son améliore l'expérience mais ne doit jamais empêcher la partie.

Acceptance criteria:
- L'initialisation audio échoue sans lever d'erreur visible.
- Les effets sonores renvoient un échec silencieux quand l'audio n'est pas disponible.
- Le jeu reste jouable sans audio.

Needs:
- impl
- utest

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/feedback-audio.md | Added feedback, narration, and audio requirements | Keep feedback and audio behaviors together for review |
| 2026-05-03 | 1.2.0 | 1.2.0 | docs/requirements/feedback-audio.md | Approved all requirements and normalized page structure | All listed requirements represent accepted product targets; page history must remain at the end |
| 2026-05-03 | 1.4.0 | 1.2.0 | docs/requirements/feedback-audio.md | Reworded feedback, speech and audio requirements with observable conditions | Apply writing rules without changing feedback or optional-audio behavior |
