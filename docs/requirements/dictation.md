# Exigences de dictée

## Périmètre

Les niveaux de dictée sont des niveaux obligatoires de la progression principale. Ils utilisent la synthèse vocale française, la saisie clavier et une évaluation par comparaison caractère par caractère.

#### Les dictées doivent être des niveaux autonomes de la progression principale

`req~dictation.main-progression~2`

Status: approved
Priority: high
Verification: test
Additional verification: inspection

Le système doit intégrer chaque dictée de campagne comme un niveau autonome de la progression linéaire principale.

Rationale:
La dictée doit être jouée comme un niveau à part entière, au même titre que les niveaux de tranchage, et non comme un exercice intercalé entre deux niveaux ou à l'intérieur d'un autre niveau.

Acceptance criteria:
  * Chaque dictée de campagne occupe une entrée propre dans la liste ordonnée des niveaux.
  * Chaque niveau de dictée possède son propre index de niveau.
  * Chaque niveau de dictée possède son propre titre affichable.
  * Chaque niveau de dictée possède le type `dictation`.
  * Un niveau de dictée n'est pas stocké comme sous-exercice, interlude, étape interne ou écran intermédiaire d'un niveau de tranchage.
  * Lorsqu'un niveau de dictée est le prochain niveau de la progression, le système lance directement ce niveau de dictée.
  * Terminer le niveau précédent mène au niveau de dictée si celui-ci est le prochain niveau de la campagne.
  * Terminer un niveau de dictée permet d'avancer vers le niveau suivant de la même campagne lorsque le joueur choisit de continuer.
  * Le joueur ne peut pas terminer la campagne sans terminer les niveaux de dictée.
  * Après le premier niveau de dictée, la campagne ne contient pas plus de cinq niveaux non dictée consécutifs entre deux niveaux de dictée.

Needs:
  * impl
  * utest

#### Les données de dictée doivent être séparées du moteur

`req~dictation.data-model~1`

Status: approved
Priority: high
Verification: test

Le système doit définir les contenus de dictée dans les données de niveaux sans les mélanger à la logique d'exécution du jeu.

Rationale:
Les textes dictés doivent rester éditables comme contenu pédagogique sans modifier le moteur.

Acceptance criteria:
  * Un niveau de dictée possède un type identifiable `dictation`.
  * Un niveau de dictée contient au moins cinq dictées possibles.
  * Chaque dictée expose un texte principal utilisé comme texte lu et comme réponse attendue.
  * Chaque dictée peut exposer une liste de variantes acceptées.
  * Les variantes acceptées sont stockées avec les données de dictée.
  * Les dictées d'un même niveau appartiennent à la même famille de contenu parmi mot simple, mot avec accent ou lettre muette, groupe de mots, phrase courte.
  * Un niveau de dictée est représenté par une entrée de niveau complète dans le module de données des niveaux.
  * Un niveau de dictée n'est pas représenté comme une propriété secondaire d'un niveau de tranchage.

Needs:
  * impl
  * utest

#### Les dictées doivent être tirées dans une banque de niveau

`req~dictation.random-selection~1`

Status: approved
Priority: high
Verification: test

Au démarrage d'un niveau de dictée, le système doit choisir la dictée courante parmi les dictées disponibles pour ce niveau.

Rationale:
Un niveau de dictée ne doit pas être limité à un texte fixe afin de favoriser le rejeu et la mémorisation espacée.

Acceptance criteria:
  * Chaque niveau de dictée possède au moins cinq dictées candidates.
  * La dictée courante est sélectionnée depuis la banque du niveau courant.
  * Une dictée sélectionnée appartient au niveau lancé.
  * Le système peut sélectionner des dictées différentes lors de plusieurs lancements du même niveau.
  * Le choix d'une dictée ne modifie pas les données de niveau.

Needs:
  * impl
  * utest

#### La difficulté des dictées doit progresser par paliers

`req~dictation.content-progression~1`

Status: approved
Priority: high
Verification: test
Additional verification: inspection

Le système doit organiser les niveaux de dictée selon une progression allant des mots isolés vers les phrases courtes.

Rationale:
La difficulté de saisie doit augmenter progressivement pour rester cohérente avec le niveau CE1 visé.

Acceptance criteria:
  * Les trois premiers niveaux de dictée utilisent des mots simples.
  * Les niveaux de dictée quatre à six utilisent des mots avec accents ou lettres muettes.
  * Les niveaux de dictée sept à neuf utilisent des groupes de mots.
  * Les niveaux de dictée à partir du dixième utilisent des phrases courtes.
  * Les phrases courtes commencent par une majuscule et se terminent par une ponctuation finale.
  * Les contenus dictés restent compatibles avec un vocabulaire scolaire de niveau CE1 ou avec l'univers lexical du jeu.

Needs:
  * impl
  * utest

#### La dictée doit démarrer par une lecture vocale

`req~dictation.start-audio~1`

Status: approved
Priority: high
Verification: test
Additional verification: manual-review

Lorsque le joueur lance un niveau de dictée, le système doit lire automatiquement la dictée courante avec une voix française.

Rationale:
La dictée repose sur l'écoute du texte attendu avant la saisie.

Acceptance criteria:
  * Le texte attendu n'est pas affiché avant la validation.
  * La lecture vocale démarre au début du niveau de dictée.
  * La lecture vocale utilise une voix française sélectionnée par le service de synthèse vocale.
  * La saisie reste disponible après le lancement de la lecture.
  * Le niveau de dictée ne démarre pas sans service de synthèse vocale française disponible.

Needs:
  * impl
  * utest

#### Le bouton de répétition doit relire la dictée

`req~dictation.repeat-control~1`

Status: approved
Priority: high
Verification: test
Additional verification: manual-review

Lorsque le joueur active le bouton `Répéter`, le système doit relire la dictée courante sans modifier le score.

Rationale:
L'enfant doit pouvoir réécouter autant que nécessaire sans être pénalisé.

Acceptance criteria:
  * Le bouton `Répéter` est disponible pendant le niveau de dictée.
  * Le joueur peut utiliser le bouton `Répéter` plusieurs fois pendant la même tentative.
  * L'utilisation du bouton `Répéter` ne modifie pas le score.
  * L'utilisation du bouton `Répéter` n'ajoute pas d'erreur.
  * L'interface n'affiche pas de compteur de répétitions.
  * Si une lecture est en cours, une nouvelle lecture ne démarre pas avant la fin de la lecture courante.

Needs:
  * impl
  * utest

#### La saisie doit afficher uniquement la réponse du joueur

`req~dictation.input-display~1`

Status: approved
Priority: high
Verification: test
Additional verification: manual-review

Pendant un niveau de dictée, le système doit afficher la saisie du joueur sans afficher le texte attendu avant validation.

Rationale:
La dictée doit évaluer la transcription du texte entendu, pas une copie visuelle.

Acceptance criteria:
  * La zone de saisie affiche les caractères saisis par le joueur.
  * Le texte attendu reste masqué avant validation.
  * Le joueur peut modifier sa saisie avant validation.
  * Les corrections au clavier sont visibles dans la zone de saisie.
  * Le texte saisi reste affiché jusqu'à la validation ou l'effacement.

Needs:
  * impl
  * utest

#### Les contrôles de dictée doivent permettre valider et effacer

`req~dictation.validation-and-clear-controls~1`

Status: approved
Priority: high
Verification: test
Additional verification: manual-review

Pendant un niveau de dictée, le système doit permettre au joueur de valider la saisie et d'effacer toute la saisie.

Rationale:
L'enfant doit pouvoir terminer l'exercice ou recommencer sa saisie sans utiliser une mécanique de tranchage.

Acceptance criteria:
  * La touche `Entrée` valide la saisie.
  * Le bouton `Valider` valide la saisie.
  * Le bouton `Effacer` vide toute la zone de saisie.
  * La touche `Backspace` permet de corriger la saisie caractère par caractère.
  * Une validation vide produit une tentative évaluée avec la note minimale.
  * La validation déclenche la fin de la tentative de dictée.

Needs:
  * impl
  * utest

#### Les niveaux de dictée doivent désactiver la pression temporelle

`req~dictation.no-time-pressure~1`

Status: approved
Priority: high
Verification: test
Additional verification: manual-review

Pendant un niveau de dictée, le système doit désactiver les mécaniques de réflexe et attendre la validation du joueur pour terminer la tentative.

Rationale:
La dictée doit être une activité posée de transcription et de correction.

Acceptance criteria:
  * Le niveau de dictée n'utilise pas de mots qui tombent comme condition de réussite.
  * Le niveau de dictée n'utilise pas de limite de temps.
  * Le niveau de dictée n'exige pas d'action d'attaque.
  * Le niveau de dictée ne se termine pas tant que le joueur n'a pas validé sa saisie.
  * Les erreurs de saisie avant validation ne déclenchent pas de pénalité immédiate.
  * Le moteur de niveau de tranchage n'est pas actif pendant une tentative de dictée.

Needs:
  * impl
  * utest

#### La dictée doit conserver le cadre visuel du jeu

`req~dictation.shared-game-screen~1`

Status: approved
Priority: medium
Verification: manual-review

Le système doit afficher les niveaux de dictée dans le cadre visuel principal du jeu.

Rationale:
La dictée doit rester intégrée à l'univers du Chevalier des mots.

Acceptance criteria:
  * L'écran de dictée conserve l'univers visuel du jeu.
  * Le personnage sélectionné peut rester visible pendant la dictée.
  * Une animation du personnage peut être déclenchée lors d'un appui sur une touche.
  * L'animation du personnage ne modifie pas la saisie.
  * L'animation du personnage ne modifie pas le score.
  * L'animation du personnage ne modifie pas la progression.

Needs:
  * impl

#### Les variantes acceptées doivent valoir réponse parfaite

`req~dictation.accepted-variants~1`

Status: approved
Priority: high
Verification: test

Le système doit considérer chaque variante acceptée d'une dictée comme une réponse parfaite.

Rationale:
Une variante déclarée acceptée doit avoir la même valeur que le texte principal attendu.

Acceptance criteria:
  * Le texte principal attendu est une réponse parfaite.
  * Chaque variante acceptée est une réponse parfaite.
  * Une saisie identique à une variante acceptée donne un score de 5.
  * La comparaison de score utilise le meilleur résultat obtenu parmi le texte principal et les variantes acceptées.
  * Les variantes acceptées ne sont pas affichées avant validation.

Needs:
  * impl
  * utest

#### Les erreurs de dictée doivent être calculées par distance de Levenshtein

`req~dictation.character-error-distance~1`

Status: approved
Priority: high
Verification: test

Le système doit calculer le nombre d'erreurs d'une dictée avec la distance de Levenshtein minimale entre la saisie du joueur et les réponses acceptées.

Rationale:
Une comparaison par caractère permet de traiter les ajouts, suppressions et remplacements de manière déterministe.

Acceptance criteria:
  * Une insertion de caractère compte comme une erreur.
  * Une suppression de caractère compte comme une erreur.
  * Un remplacement de caractère compte comme une erreur.
  * Les majuscules et minuscules distinctes comptent dans la distance.
  * Les accents distincts comptent dans la distance.
  * Les espaces distincts comptent dans la distance.
  * La ponctuation distincte compte dans la distance.
  * Le nombre d'erreurs retenu est la distance minimale parmi le texte principal attendu et les variantes acceptées.

Needs:
  * impl
  * utest

#### Le score de dictée doit dépendre du ratio d'erreurs

`req~dictation.score-formula~1`

Status: approved
Priority: high
Verification: test

Le système doit calculer le score d'une dictée avec une formule déterministe fondée sur la distance de Levenshtein et la longueur de la meilleure réponse acceptée.

Rationale:
Le score doit rester modéré pour les petites erreurs tout en valorisant la précision orthographique.

Acceptance criteria:
  * Si la distance minimale est `0`, le score est `5`.
  * Si la saisie est vide et que le texte attendu n'est pas vide, le score est `0`.
  * Le système calcule `ratio = distance / longueur` avec `longueur` égale à la longueur de la réponse acceptée donnant la meilleure comparaison.
  * Si `distance > 0` et `ratio <= 0.10`, le score est `4`.
  * Si `distance > 0` et `ratio <= 0.25`, le score est `3`.
  * Si `distance > 0` et `ratio <= 0.40`, le score est `2`.
  * Si `distance > 0` et `ratio <= 0.60`, le score est `1`.
  * Si `ratio > 0.60`, le score est `0`.
  * Si `distance == 1` et que la saisie n'est pas vide, le score ne descend pas sous `1`.
  * Le score final est un entier compris entre `0` et `5`.

Needs:
  * impl
  * utest

#### Le feedback de dictée doit afficher les différences

`req~dictation.result-feedback~1`

Status: approved
Priority: high
Verification: test
Additional verification: manual-review

Après validation d'une dictée, le système doit afficher le texte attendu, le texte saisi et les différences détectées.

Rationale:
Le joueur doit comprendre la nature des écarts entre ce qu'il a entendu et ce qu'il a écrit.

Acceptance criteria:
  * Le résultat affiche le texte attendu.
  * Le résultat affiche le texte saisi.
  * Le résultat affiche les différences avec un marquage visuel coloré.
  * Chaque différence affichée indique un type parmi caractère ajouté, caractère supprimé, caractère remplacé, casse différente, accent différent, espace différent ou ponctuation différente.
  * Les différences affichées correspondent à la meilleure comparaison retenue pour le calcul du score.
  * Après validation, le système lit le texte attendu avec une voix française.

Needs:
  * impl
  * utest

#### La fin de dictée doit proposer recommencer ou continuer

`req~dictation.retry-or-continue~1`

Status: approved
Priority: high
Verification: test
Additional verification: manual-review

Après une dictée validée avec un score inférieur à cinq, le système doit permettre au joueur de recommencer la dictée ou de continuer la progression.

Rationale:
L'enfant doit pouvoir améliorer son score sans être bloqué par une erreur.

Acceptance criteria:
  * Un score inférieur à cinq affiche une option pour recommencer la dictée.
  * Un score inférieur à cinq affiche une option pour continuer la progression.
  * Recommencer relance une tentative de dictée pour le même niveau.
  * Continuer termine le niveau avec le score obtenu.
  * Continuer sauvegarde la progression selon les règles normales de fin de niveau.
  * Recommencer ne réduit pas le meilleur score déjà enregistré pour ce niveau.

Needs:
  * impl
  * utest

#### Les statistiques de dictée doivent rejoindre les statistiques globales

`req~dictation.statistics~1`

Status: approved
Priority: high
Verification: test

Lorsque le joueur termine une tentative de dictée, le système doit intégrer le score, le nombre d'erreurs et le nombre de tentatives aux statistiques du compte joueur actif.

Rationale:
La dictée doit contribuer au suivi de progression comme les autres niveaux.

Acceptance criteria:
  * Une tentative de dictée validée incrémente le nombre de tentatives du niveau.
  * Le nombre d'erreurs enregistré correspond à la distance de Levenshtein retenue.
  * Le score de dictée contribue au meilleur score du niveau.
  * Le score de dictée contribue au score global selon les règles statistiques existantes.
  * Les statistiques de dictée sont associées au compte joueur actif.
  * Les répétitions audio ne sont pas comptabilisées dans les statistiques.

Needs:
  * impl
  * utest

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-03 | 2.0.0 | 1.3.0 | docs/requirements/dictation.md | Added normative dictation requirements | Specify mandatory dictation levels before implementation |
| 2026-05-03 | 2.1.0 | 1.3.0 | docs/requirements/dictation.md | Replaced dictation progression requirement with autonomous dictation level requirement | Clarify that dictation is a full campaign level, not an intercalated exercise between levels |
