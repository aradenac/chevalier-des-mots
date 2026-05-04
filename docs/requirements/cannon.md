# Exigences de mode cannon

## Périmètre

Les niveaux cannon sont des niveaux obligatoires de la progression principale. Ils utilisent un texte à trous affiché en haut de l'écran, un canon manipulé horizontalement par le joueur et une résolution de tir fondée à la fois sur la lettre courante et sur la visée verticale.

#### Les niveaux cannon doivent être des niveaux autonomes de la progression principale

`req~cannon.main-progression~1`

Status: approved  
Priority: high  
Verification: test  
Additional verification: inspection  

Le système doit intégrer chaque niveau cannon de campagne comme un niveau autonome de la progression linéaire principale.

Rationale: Le mode cannon doit être joué comme un niveau à part entière, au même titre que les niveaux de tranchage et les niveaux de dictée.

Acceptance criteria:

- Chaque niveau cannon occupe une entrée propre dans la liste ordonnée des niveaux.
- Chaque niveau cannon possède son propre index de niveau.
- Chaque niveau cannon possède son propre titre affichable.
- Chaque niveau cannon possède le type `cannon`.
- Un niveau cannon n'est pas stocké comme sous-exercice, interlude, étape interne ou écran intermédiaire d'un autre niveau.
- Lorsqu'un niveau cannon est le prochain niveau de la progression, le système lance directement ce niveau cannon.
- Terminer le niveau précédent mène au niveau cannon si celui-ci est le prochain niveau de la campagne.
- Terminer un niveau cannon permet d'avancer vers le niveau suivant de la même campagne.
- Le joueur ne peut pas terminer la campagne sans terminer les niveaux cannon.

Needs: impl, utest

#### Les données de niveaux cannon doivent être séparées du moteur

`req~cannon.data-model~1`

Status: approved  
Priority: high  
Verification: test  

Le système doit définir les contenus cannon dans les données de niveaux sans les mélanger à la logique d'exécution du jeu.

Rationale: Les puzzles à trous doivent rester éditables comme contenu pédagogique sans modifier le moteur.

Acceptance criteria:

- Un niveau cannon possède un type identifiable `cannon`.
- Un niveau cannon contient un ou plusieurs puzzles cannon.
- Un puzzle cannon expose un texte visible contenant un ou plusieurs trous.
- Chaque trou correspond à exactement une lettre attendue.
- Un puzzle cannon peut représenter un mot, un groupe de mots ou une phrase à trous.
- Les lettres manquantes nécessaires au puzzle sont déductibles des trous définis dans les données.
- Un niveau cannon est représenté par une entrée de niveau complète dans le module de données des niveaux.
- Un niveau cannon n'est pas représenté comme une propriété secondaire d'un niveau de tranchage ou de dictée.

Needs: impl, utest

#### Le texte à trous doit être affiché en haut de l'écran

`req~cannon.holed-text-display~1`

Status: approved  
Priority: high  
Verification: test  
Additional verification: manual-review  

Pendant un niveau cannon, le système doit afficher le texte à trous courant en haut de l'écran.

Rationale: Le joueur doit pouvoir identifier immédiatement les trous à compléter et leur position relative avant de tirer.

Acceptance criteria:

- Le texte affiché correspond au puzzle cannon courant.
- Le texte affiché contient des trous visibles à la place des lettres manquantes.
- Les lettres déjà complétées apparaissent à leur position correcte dans le texte.
- Les trous non complétés restent visibles tant qu'ils ne sont pas remplis.
- Le texte reste lisible sans être masqué par le canon ou par le personnage.

Needs: impl, utest

#### Le canon doit pouvoir être déplacé librement à l'horizontale

`req~cannon.free-horizontal-aim~1`

Status: approved  
Priority: high  
Verification: test  

Pendant un niveau cannon, le système doit permettre au joueur de déplacer librement le canon de gauche à droite.

Rationale: La réussite d'un tir dépend de la visée, donc le joueur doit pouvoir aligner finement le canon sous le trou souhaité.

Acceptance criteria:

- Le canon peut être déplacé vers la gauche.
- Le canon peut être déplacé vers la droite.
- Le canon n'est pas limité à des colonnes fixes prédéfinies.
- Le canon reste dans les bornes horizontales de l'aire de jeu.
- La position horizontale du canon détermine l'axe vertical du tir suivant.

Needs: impl, utest

#### L'indicateur de trajectoire doit rester vertical et pointillé

`req~cannon.vertical-trajectory-indicator~3`

Status: approved  
Priority: medium  
Verification: manual-review  

Pendant un niveau cannon, le système doit afficher un indicateur de trajectoire pointillé qui part du canon et reste vertical.

Rationale: Le joueur doit voir clairement l'axe de tir utilisé pour résoudre la visée, sans ambiguïté sur l'angle.

Acceptance criteria:

- Une ligne de trajectoire visible part du canon avant le tir.
- La ligne de trajectoire est rendue de manière pointillée ou équivalente.
- La ligne de trajectoire reste verticale.
- La ligne de trajectoire ne s'incline pas selon le déplacement du canon.
- La ligne de trajectoire se met à jour lorsque le canon se déplace horizontalement.
- La trajectoire de la lettre tirée par le cannnon suit le guide pointillé et le milieu de la lettre tirée et centré horizontalement sur le guide.

Needs: impl

#### Les niveaux cannon doivent conserver le cadre visuel principal du jeu

`req~cannon.shared-game-screen~1`

Status: approved  
Priority: medium  
Verification: manual-review  

Le système doit afficher les niveaux cannon dans le cadre visuel principal du jeu avec le décor du mode slicing.

Rationale: Le mode cannon doit rester intégré à l'univers du Chevalier des mots sans introduire un décor déconnecté du reste de la campagne.

Acceptance criteria:

- L'écran cannon conserve le décor principal déjà utilisé par le mode slicing.
- Le canon apparaît dans la partie basse de l'écran.
- Le texte à trous apparaît dans la partie haute de l'écran.
- Le niveau cannon ne remplace pas le cadre visuel principal par un écran externe au jeu.

Needs: impl

#### Le personnage sélectionné doit manipuler le canon

`req~cannon.selected-character-operates-cannon~1`

Status: approved  
Priority: high  
Verification: test  
Additional verification: manual-review  

Pendant un niveau cannon, le système doit afficher le personnage sélectionné et l'associer visuellement au canon.

Rationale: Le mode cannon doit réutiliser le personnage du joueur pour rester cohérent avec le reste de la campagne.

Acceptance criteria:

- Le personnage sélectionné reste visible pendant le niveau cannon.
- Le personnage visible manipule le canon ou est positionné avec lui de manière cohérente.
- Le personnage sélectionné ne modifie pas les règles de tir, de visée ou de score.
- Si aucun personnage n'est sélectionné dans un contexte autorisé à utiliser un personnage par défaut, le système utilise ce personnage par défaut.
- Un personnage déjà sélectionné reste utilisé lors du lancement d'un niveau cannon.

Needs: impl, utest

#### La résolution d'un tir doit dépendre de la visée et de la lettre

`req~cannon.shot-resolution~1`

Status: approved  
Priority: high  
Verification: test  

Lorsque le joueur tire la lettre courante dans un niveau cannon, le système doit résoudre le tir selon la visée verticale du canon et selon la lettre attendue par le trou visé.

Rationale: Le mode cannon doit évaluer à la fois la précision de la visée et la justesse linguistique de la lettre tirée.

Acceptance criteria:

- Un tir réussi exige qu'un trou non complété soit visé par l'axe vertical du canon.
- Un tir réussi exige que la lettre tirée corresponde à la lettre attendue dans le trou visé.
- Une visée légèrement décalée mais restant dans une tolérance latérale d'environ la moitié de la largeur du trou compte comme une visée valide.
- Si plusieurs trous non complétés attendent la même lettre, la lettre peut compléter n'importe quel trou compatible correctement visé.
- Un trou déjà complété ne peut pas être remplacé par un nouveau tir.
- Si le tir ne vise aucun trou valide, le tir compte comme une erreur.
- Si le tir vise un trou qui n'attend pas cette lettre, le tir compte comme une erreur.
- Un tir réussi complète exactement un trou.

Needs: impl, utest

#### Un tir raté doit produire un feedback visuel explicite

`req~cannon.failed-shot-feedback~1`

Status: approved  
Priority: high  
Verification: test  
Additional verification: manual-review  

Lorsqu'un tir est erroné dans un niveau cannon, le système doit afficher un feedback visuel de rebond puis de chute de la lettre tirée.

Rationale: Le joueur doit comprendre immédiatement que le tir n'a pas complété le trou attendu, sans perdre définitivement la lettre nécessaire.

Acceptance criteria:

- Une lettre tirée en erreur rebondit visuellement sur le mot ou près du mot.
- Après le rebond, la lettre retombe vers le sol.
- Le feedback visuel d'échec n'efface pas le texte déjà complété.
- Le feedback visuel d'échec n'empêche pas le joueur de poursuivre le niveau.

Needs: impl, utest

#### Les lettres manquantes doivent être proposées une par une dans un ordre aléatoire

`req~cannon.random-missing-letter-queue~1`

Status: approved  
Priority: high  
Verification: test  

Pendant un niveau cannon, le système doit proposer les lettres manquantes une par une dans un ordre aléatoire fondé uniquement sur les lettres réellement nécessaires au puzzle courant.

Rationale: Le mode cannon doit entraîner la complétion orthographique sans ajouter de distracteurs artificiels.

Acceptance criteria:

- La lettre courante proposée par le canon appartient aux lettres réellement manquantes du puzzle courant.
- Le système ne propose pas de distracteur qui ne corresponde à aucun trou restant.
- Si une même lettre manque plusieurs fois, elle peut être proposée plusieurs fois selon le nombre de trous restants correspondants.
- Un tir réussi retire une occurrence de la lettre correspondante des lettres restantes à proposer.
- Après un tir raté, la lettre tirée est réinsérée aléatoirement dans la file des lettres restantes.
- Le système continue de proposer des lettres tant qu'au moins un trou reste non complété.

Needs: impl, utest

#### Les niveaux cannon doivent rester terminables sans limite d'essais

`req~cannon.no-dead-end-after-errors~1`

Status: approved  
Priority: high  
Verification: test  

Pendant un niveau cannon, le système doit permettre de terminer le puzzle sans limite d'essais, même après plusieurs erreurs.

Rationale: Le mode cannon doit rester un exercice d'apprentissage non punitif, sans situation bloquante irréversible.

Acceptance criteria:

- Un tir erroné n'élimine pas définitivement une lettre encore nécessaire pour terminer le puzzle.
- Le niveau cannon ne définit pas de limite d'essais.
- Le niveau cannon reste gagnable après une ou plusieurs erreurs successives.
- Le niveau cannon se termine lorsque tous les trous sont complétés, même si plusieurs erreurs ont été commises auparavant.

Needs: impl, utest

#### Le score et le nombre d'erreurs ne doivent pas être affichés pendant le niveau

`req~cannon.no-live-score~1`

Status: approved  
Priority: high  
Verification: test  
Additional verification: manual-review  

Pendant un niveau cannon, le système ne doit pas afficher la note finale ni le nombre d'erreurs en cours.

Rationale: Le joueur doit se concentrer sur la complétion du puzzle pendant la partie et découvrir la note seulement à la fin.

Acceptance criteria:

- Le score n'est pas affiché pendant un niveau cannon.
- Le nombre d'erreurs n'est pas affiché pendant un niveau cannon.
- La note finale est affichée uniquement à la fin du niveau.
- L'absence d'affichage du score en direct n'empêche pas le calcul final de la note.

Needs: impl, utest

#### Le score final cannon doit dépendre du nombre total d'erreurs

`req~cannon.score-formula~1`

Status: approved  
Priority: high  
Verification: test  

Le système doit calculer la note finale d'un niveau cannon avec la formule `max(0, 5 - errors)`.

Rationale: Chaque erreur doit coûter exactement un point, afin de garder une notation simple et lisible pour ce mode.

Acceptance criteria:

- Le score final cannon est un entier compris entre `0` et `5`.
- Un niveau cannon terminé sans erreur donne `5`.
- Chaque erreur retire exactement `1` point.
- Le score final cannon est calculé avec `max(0, 5 - errors)`.
- Un mauvais alignement ajoute une erreur.
- Une bonne visée sur un trou qui n'attend pas la lettre tirée ajoute une erreur.
- Un tir réussi n'ajoute pas d'erreur.
- La note finale est calculée à la fin du niveau.

Needs: impl, utest

#### La progression pédagogique des niveaux cannon doit se faire par paliers

`req~cannon.content-progression~1`

Status: approved  
Priority: high  
Verification: test  
Additional verification: inspection  

Le système doit organiser les dix niveaux cannon selon une progression allant des mots simples vers les phrases à trous contenant plusieurs mots.

Rationale: La difficulté de complétion et de visée doit augmenter progressivement pour rester cohérente avec l'apprentissage visé.

Acceptance criteria:

- Le premier niveau cannon utilise des mots simples avec peu de trous.
- Le deuxième niveau cannon utilise des voyelles manquantes dans des mots simples.
- Le troisième niveau cannon utilise des mots avec plusieurs trous.
- Le quatrième niveau cannon utilise des mots avec accents simples.
- Le cinquième niveau cannon utilise de petits groupes de mots.
- Le sixième niveau cannon utilise des formes liées au genre et au nombre.
- Le septième niveau cannon utilise des terminaisons du présent.
- Le huitième niveau cannon utilise des temps simples.
- Le neuvième niveau cannon utilise des homophones guidés.
- Le dixième niveau cannon utilise des phrases à trous contenant des trous dans plusieurs mots.

Needs: impl, utest

#### Le tir de cannon doit déclencher une animation visuelle et audio

`req~cannon.animation~1`

Status: approved  
Priority: high  
Verification: test  
Additional verification: inspection  

Le tir de cannon doit produire des effets sonores et visuels.

Effet sonore : un bruit de tir de cannon, type canon à poudre, une déflagration.
Effets visuels : une flamme sort de l'embouchure du cannon au moment du tir, de la fumée sors brièvement et disparaît, et le cannon vibre avec un recul au moment du tir.

Rationale: les effets visuels et sonores améliorent l'expérience de jeu.

Acceptance criteria:

- Le cannon produit lors du tir un son de type tir de cannon à poudre, une déflagration.
- Au moment du tir une animation de flamme sors de l'embouchure du cannon.
- L'embouchure du canon laisse s'échapper de la fumée lors du tir, qui se disperse progressivement.
- Le cannon vibre brièvement lors du tir.
- Le cannon présente un mouvement de recul lors du tir tout en revenant à sa position de tir à la fin de l'animation

Needs: impl, utest

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-03 | 1.0.0 | 1.3.0 | docs/requirements/cannon.md | Added autonomous cannon mode requirements, scoring model and pedagogical progression | Specify the new cannon mode completely before implementation |
