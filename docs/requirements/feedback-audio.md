# Exigences de feedback et audio

#### Le résultat d'une action doit s'afficher immédiatement
`req~feedback.immediate-result~1`

Status: draft
Priority: high
Verification: manual-review

Le système doit afficher immédiatement un feedback lisible après une frappe correcte ou incorrecte.

Rationale:
Le joueur doit comprendre sans délai l'effet de son action.

Acceptance criteria:
- Une bonne frappe affiche un feedback positif.
- Une mauvaise frappe affiche un feedback négatif.
- Le message reste court et lisible.

Needs:
- impl

#### La narration vocale doit rester optionnelle
`req~speech.brave-failure-handling~1`

Status: approved
Priority: high
Verification: test

Le système doit conserver un jeu jouable si la synthèse vocale est absente, vide ou échoue avec `synthesis-failed`.

Rationale:
Le jeu doit rester accessible dans les navigateurs où la voix n'est pas fiable.

Acceptance criteria:
- L'absence de voix n'empêche pas de jouer.
- Une erreur de synthèse vocale n'arrête pas la partie.
- Le diagnostic vocal peut être affiché sans bloquer l'interface.

Needs:
- impl
- utest
#### Le service audio ne doit pas bloquer le jeu
`req~audio.service-failure-non-blocking~1`

Status: approved
Priority: medium
Verification: test

Le système doit rester fonctionnel si WebAudio est indisponible ou si le contexte audio ne peut pas être créé.

Rationale:
Le son améliore l'expérience mais ne doit jamais empêcher la partie.

Acceptance criteria:
- L'initialisation audio échoue sans lever d'erreur visible.
- Les effets sonores renvoient un échec silencieux quand l'audio n'est pas disponible.
- Le jeu reste jouable sans audio.

Needs:
- impl
- utest
