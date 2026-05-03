# Statistiques

## Périmètre

Les statistiques sont associées aux comptes joueur locaux.
Les statistiques sont persistées dans la même base de données serveur que les comptes.
Les statistiques couvrent les scores par niveau accompli et le score global.
Les statistiques pédagogiques détaillées, comme les mots souvent ratés ou le temps de jeu, restent hors périmètre.

#### Score de niveau de zéro à cinq étoiles
`req~stats.level-score-five-stars~1`

Status: approved
Priority: high
Verification: test

Le système doit calculer une note finale de niveau comprise entre zéro et cinq étoiles pour chaque niveau accompli.

Rationale:
Le joueur doit pouvoir mesurer la qualité de sa réussite au-delà du simple fait d'avoir terminé le niveau.

Acceptance criteria:
- La note finale d'un niveau est un entier compris entre 0 et 5.
- Une partie parfaite, sans erreur, donne 5 étoiles.
- Une partie où le nombre d'erreurs est supérieur ou égal au nombre de coups réussis donne 0 étoile.
- La note finale est distincte des étoiles de progression utilisées pour terminer le niveau.
- La note finale est calculée à la fin du niveau.

Needs:
- impl
- utest

#### Définition des erreurs de niveau
`req~stats.level-error-counting~1`

Status: approved
Priority: high
Verification: test

Le système doit compter comme erreur le fait de trancher un mot correct ou de laisser tomber un mot erroné attendu comme cible.

Rationale:
La note finale doit pénaliser à la fois les mauvais coups et les cibles manquées.

Acceptance criteria:
- Trancher un mot correct ajoute une erreur.
- Laisser tomber un mot erroné attendu comme cible ajoute une erreur.
- Trancher un mot erroné attendu comme cible ajoute une réussite.
- Les erreurs sont comptabilisées jusqu'à la fin du niveau.
- Les erreurs sont utilisées dans le calcul de la note finale.

Needs:
- impl
- utest

#### Formule du score de niveau
`req~stats.level-score-formula~1`

Status: approved
Priority: high
Verification: test

Le système doit calculer la note finale d'un niveau avec une formule déterministe fondée sur le nombre de réussites et le nombre d'erreurs.

Rationale:
Le score doit être prévisible, testable et compréhensible.

Acceptance criteria:
- Si `successfulHits <= 0`, la note finale est 0.
- Si `errors == 0`, la note finale est 5.
- Sinon, la note finale est `max(0, 5 - ceil((5 * errors) / successfulHits))`.
- La formule donne 0 si `errors >= successfulHits`.
- La formule ne produit jamais une note inférieure à 0 ou supérieure à 5.

Needs:
- impl
- utest

#### Meilleur score par niveau accompli
`req~stats.best-level-score~1`

Status: approved
Priority: high
Verification: test

Le système doit conserver le meilleur score obtenu par un joueur pour chaque niveau accompli.

Rationale:
Le rejeu d'un niveau doit permettre au joueur d'améliorer son résultat sans perdre sa meilleure performance.

Acceptance criteria:
- Le premier accomplissement d'un niveau enregistre un score pour ce niveau.
- Si un niveau est rejoué avec un meilleur score, le meilleur score est remplacé.
- Si un niveau est rejoué avec un score inférieur ou égal, le meilleur score est conservé.
- Le meilleur score est associé au compte joueur actif.
- Le meilleur score est conservé après rechargement du jeu.

Needs:
- impl
- utest

#### Score global du joueur
`req~stats.global-score~1`

Status: approved
Priority: high
Verification: test

Le système doit calculer le score global d'un joueur comme la somme de ses meilleurs scores sur les niveaux accomplis.

Rationale:
Le Tableau des champions doit permettre de comparer simplement les joueurs.

Acceptance criteria:
- Le score global additionne uniquement les meilleurs scores des niveaux accomplis.
- Un niveau non accompli ne contribue pas au score global.
- Améliorer le meilleur score d'un niveau met à jour le score global.
- Le score global est associé au compte joueur actif.
- Le score global est conservé après rechargement du jeu.

Needs:
- impl
- utest

#### Persistance des statistiques en base serveur
`req~stats.server-database-persistence~1`

Status: approved
Priority: high
Verification: test

Le système doit stocker les statistiques des joueurs dans la même base de données serveur que les comptes joueur.

Rationale:
Les comptes, la progression et les scores doivent partager la même source de vérité persistante.

Acceptance criteria:
- Les scores par niveau sont persistés en base de données serveur.
- Le score global est reconstituable depuis les scores par niveau persistés.
- Les statistiques sont relues après rechargement de la page.
- Les statistiques sont associées à l'identifiant stable du compte joueur.
- Les statistiques ne sont pas stockées comme source de vérité dans le navigateur.

Needs:
- impl
- utest

#### Tableau des champions
`req~stats.champions-dashboard~1`

Status: approved
Priority: high
Verification: test

Le système doit fournir un menu nommé `Tableau des champions` qui affiche un résumé statistique des joueurs.

Rationale:
Les joueurs doivent pouvoir comparer leur progression et leur score global.

Acceptance criteria:
- Le menu affiche la liste des comptes joueur.
- Pour chaque joueur, le menu affiche le nom du joueur.
- Pour chaque joueur, le menu affiche le niveau atteint.
- Pour chaque joueur, le menu affiche le score global.
- Le menu permet d'ouvrir le détail statistique d'un joueur.

Needs:
- impl
- utest

#### Détail statistique d'un joueur
`req~stats.player-detail~1`

Status: approved
Priority: high
Verification: test

Depuis le Tableau des champions, le système doit permettre d'afficher le détail des niveaux accomplis par un joueur.

Rationale:
Le joueur doit pouvoir comprendre quels niveaux ont contribué à son score global.

Acceptance criteria:
- Le détail affiche uniquement les niveaux accomplis par le joueur.
- Pour chaque niveau accompli, le détail affiche le numéro du niveau.
- Pour chaque niveau accompli, le détail affiche le titre du niveau.
- Pour chaque niveau accompli, le détail affiche le meilleur score obtenu.
- Pour chaque niveau accompli, le détail permet de lancer le rejeu du niveau.

Needs:
- impl
- utest

#### Rejeu des niveaux accomplis
`req~stats.replay-completed-level~1`

Status: approved
Priority: high
Verification: test

Le système doit permettre à un joueur de rejouer un niveau qu'il a déjà accompli.

Rationale:
Le joueur doit pouvoir améliorer son meilleur score sur les niveaux déjà terminés.

Acceptance criteria:
- Un niveau accompli peut être sélectionné depuis le détail statistique du joueur.
- Un niveau non accompli ne peut pas être sélectionné pour rejeu depuis le Tableau des champions.
- Le rejeu utilise les règles normales du niveau.
- Le rejeu peut mettre à jour le meilleur score du niveau.
- Le rejeu ne diminue pas le meilleur score du niveau.

Needs:
- impl
- utest

#### Retour après rejeu
`req~stats.replay-return-flow~1`

Status: approved
Priority: medium
Verification: test

Après la fin d'un niveau rejoué depuis les statistiques, le système doit revenir au menu depuis lequel le rejeu a été lancé.

Rationale:
Le joueur doit pouvoir continuer à consulter et améliorer ses scores sans être redirigé dans la progression linéaire normale.

Acceptance criteria:
- Un niveau lancé depuis le détail statistique revient au détail statistique après sa fin.
- Le retour après rejeu ne fait pas démarrer automatiquement le niveau suivant.
- Le retour après rejeu conserve le compte joueur actif.
- Le retour après rejeu affiche le score mis à jour si le meilleur score a été amélioré.

Needs:
- impl
- utest

#### Rejeu sans régression de progression
`req~stats.replay-does-not-regress-progression~1`

Status: approved
Priority: high
Verification: test

Le système ne doit pas réduire le prochain niveau non terminé lorsqu'un joueur rejoue un ancien niveau accompli.

Rationale:
L'amélioration d'un score ne doit pas perturber la progression linéaire du joueur.

Acceptance criteria:
- Rejouer un niveau inférieur au niveau atteint ne modifie pas le prochain niveau non terminé.
- Rejouer un niveau inférieur au niveau atteint ne réduit pas le niveau atteint.
- Rejouer un niveau accompli peut améliorer le score de ce niveau.
- La progression linéaire reste fondée sur le plus haut niveau accompli.

Needs:
- impl
- utest

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-03 | 1.9.0 | 1.3.0 | docs/requirements/statistics.md | Added persistent statistics, champions dashboard and completed-level replay requirements without implementation | Specify score persistence and replay behavior before code changes |
