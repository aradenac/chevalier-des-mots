# Exigences de niveaux

#### Les niveaux doivent rester des données séparées du moteur
`req~data.levels-separated-from-engine~1`

Status: approved
Priority: high
Verification: test

Le système doit définir les niveaux dans un module de données séparé de la logique d'exécution du jeu.

Rationale:
La liste des niveaux doit rester éditable sans mélanger contenu pédagogique et moteur.

Acceptance criteria:
- Les niveaux sont listés dans un module de données dédié.
- Chaque niveau expose ses métadonnées et ses items.
- Les tests vérifient la cohérence de la structure.

Needs:
- impl
- utest
#### La progression doit avancer niveau par niveau
`req~level.progression-model~1`

Status: approved
Priority: high
Verification: test

Le système doit gérer la sélection d'un niveau, la détection de victoire et le passage au niveau suivant à partir d'indices bornés.

Rationale:
La progression du joueur doit rester déterministe et simple à vérifier.

Acceptance criteria:
- Un index trop petit est ramené au premier niveau.
- Un index trop grand est ramené au dernier niveau.
- La victoire finale renvoie au premier niveau.

Needs:
- impl
- utest
