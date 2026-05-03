# Comptes locaux et progression

## Périmètre

Le système de comptes couvre uniquement des comptes joueur sans authentification.
Il couvre une sauvegarde de progression dans une base de données côté serveur.
Il ne couvre pas les mots de passe, les comptes distants authentifiés, la synchronisation multi-appareil, ni les statistiques pédagogiques avancées.

La progression sauvegardée couvre le niveau atteint pour déterminer le prochain niveau non terminé.
La progression débloque les niveaux dans l'ordre.
Le rejeu est autorisé uniquement pour les niveaux déjà accomplis et ne modifie pas à la baisse le prochain niveau non terminé.
Les scores persistants et le Tableau des champions sont spécifiés dans [Statistiques](statistics.md).

## Traçabilité attendue

Ces exigences décrivent une cible produit approuvée.
La couverture `impl` et `utest` est portée par les modules de comptes, de stockage serveur, d'orchestration d'écran de démarrage et par les tests associés.

#### Comptes locaux joueur
`req~account.local-accounts~1`

Status: approved
Priority: high
Verification: test

Le système doit permettre de gérer plusieurs comptes joueur locaux dans le navigateur.

Rationale:
Plusieurs joueurs doivent pouvoir utiliser le même jeu sans partager la même progression.

Acceptance criteria:
- Le système permet d'avoir plusieurs comptes locaux.
- Chaque compte local possède un identifiant stable.
- Chaque compte local possède un nom affichable.
- Les comptes locaux sont conservés après fermeture et réouverture du navigateur grâce au stockage serveur.
- Les comptes locaux ne nécessitent pas de mot de passe.
- Les comptes locaux ne nécessitent pas d'authentification.

Needs:
- impl
- utest

#### Stockage en base de données serveur
`req~account.server-database-storage~1`

Status: approved
Priority: high
Verification: test

Le système doit stocker les comptes locaux et leur progression dans une base de données côté serveur.

Rationale:
La progression doit être persistante sans faire du navigateur la source de vérité.

Acceptance criteria:
- Le stockage utilise une base de données côté serveur.
- Les données de compte sont relues depuis le serveur après rechargement de la page.
- Le navigateur ne reste pas la source de vérité de la progression sauvegardée.
- L'accès au stockage serveur reste encapsulé dans un module dédié.

Needs:
- impl
- utest

#### Sélection du compte au démarrage
`req~account.start-selection~1`

Status: approved
Priority: high
Verification: test

Au démarrage, le système doit permettre au joueur de choisir un compte local existant avant de lancer une partie.

Rationale:
La progression sauvegardée doit être associée au bon joueur dès le début de la session.

Acceptance criteria:
- L'écran de démarrage affiche les comptes locaux existants.
- Le joueur peut sélectionner un compte local existant.
- Le système garde un compte actif pendant la session.
- Le jeu ne démarre pas une progression sauvegardée sans compte actif.

Needs:
- impl
- utest

#### Création d'un compte local
`req~account.creation~1`

Status: approved
Priority: high
Verification: test

Le système doit permettre au joueur de créer un nouveau compte local depuis l'écran de démarrage.

Rationale:
Un nouveau joueur doit pouvoir commencer une progression séparée sans modifier les comptes existants.

Acceptance criteria:
- Le joueur peut saisir un nom de compte.
- Le système crée un compte avec un identifiant stable.
- Le nouveau compte démarre au premier niveau.
- Le nouveau compte devient sélectionnable après création.
- La création d'un compte ne modifie pas la progression des autres comptes.

Needs:
- impl
- utest

#### Modification du nom d'un compte local
`req~account.rename~1`

Status: approved
Priority: medium
Verification: test

Le système doit permettre de modifier le nom affiché d'un compte local existant.

Rationale:
Un joueur doit pouvoir corriger ou personnaliser le nom de son compte sans perdre sa progression.

Acceptance criteria:
- Le joueur peut modifier le nom affiché d'un compte.
- La modification du nom conserve l'identifiant du compte.
- La modification du nom conserve la progression du compte.
- La modification du nom ne modifie pas les autres comptes.

Needs:
- impl
- utest

#### Réinitialisation d'un compte local
`req~account.reset~1`

Status: approved
Priority: medium
Verification: test

Le système doit permettre de réinitialiser la progression d'un compte local après confirmation.

Rationale:
Un joueur doit pouvoir recommencer la campagne sans supprimer les autres comptes locaux.

Acceptance criteria:
- Une action de réinitialisation existe pour un compte local.
- La réinitialisation demande une confirmation explicite.
- Après confirmation, le compte revient au premier niveau.
- La réinitialisation conserve le nom du compte.
- La réinitialisation ne modifie pas les autres comptes.

Needs:
- impl
- utest

#### Suppression d'un compte local
`req~account.deletion~1`

Status: approved
Priority: medium
Verification: test

Le système doit permettre de supprimer un compte local après confirmation.

Rationale:
Un joueur doit pouvoir retirer un compte devenu inutile sans affecter les autres comptes locaux.

Acceptance criteria:
- Une action de suppression existe pour un compte local.
- La suppression demande une confirmation explicite.
- Après confirmation, le compte supprimé n'apparaît plus dans la liste des comptes.
- La suppression d'un compte ne modifie pas les autres comptes.
- Si le compte supprimé était actif, le système revient à l'écran de choix de compte.

Needs:
- impl
- utest

#### Sauvegarde automatique après niveau terminé
`req~progress.auto-save-completed-level~1`

Status: approved
Priority: high
Verification: test

Lorsque le joueur termine un niveau, le système doit sauvegarder automatiquement le niveau atteint pour le compte local actif.

Rationale:
L'enfant ne doit pas avoir à déclencher une sauvegarde manuelle.

Acceptance criteria:
- La sauvegarde est déclenchée après la validation d'un niveau terminé.
- La sauvegarde est associée au compte local actif.
- La sauvegarde conserve le plus haut niveau atteint.
- Une fermeture puis réouverture du jeu conserve le niveau atteint.

Needs:
- impl
- utest

#### Reprise au prochain niveau non terminé
`req~progress.resume-next-unfinished-level~1`

Status: approved
Priority: high
Verification: test

Après sélection d'un compte local existant, le système doit proposer de reprendre au prochain niveau non terminé.

Rationale:
Le joueur doit pouvoir continuer la campagne sans rechercher manuellement son niveau.

Acceptance criteria:
- Un compte nouveau commence au niveau 1.
- Un compte ayant terminé le niveau N reprend au niveau N+1.
- Si le dernier niveau disponible est terminé, le système propose une reprise cohérente de fin de campagne.
- La reprise ne débloque pas de niveau au-delà de la progression sauvegardée.

Needs:
- impl
- utest

#### Progression linéaire
`req~progress.linear-progression~1`

Status: approved
Priority: high
Verification: test

Le système doit limiter le déblocage des niveaux non accomplis à un avancement linéaire dans la campagne.

Rationale:
La première version du suivi de progression doit rester simple et prévisible.

Acceptance criteria:
- Le système sauvegarde le plus haut niveau accompli pour déterminer le prochain niveau non terminé.
- Les niveaux non accomplis sont débloqués dans l'ordre.
- Les niveaux déjà accomplis peuvent être rejoués uniquement pour améliorer le score.
- Le rejeu ne permet pas de sélectionner un niveau non accompli.
- Le rejeu d'un niveau accompli ne diminue pas le plus haut niveau accompli.

Needs:
- impl
- utest

#### Isolation des progressions
`req~progress.account-isolation~1`

Status: approved
Priority: high
Verification: test

Le système doit isoler la progression sauvegardée de chaque compte local.

Rationale:
La progression d'un joueur ne doit pas modifier celle d'un autre joueur.

Acceptance criteria:
- Terminer un niveau avec un compte ne modifie pas les autres comptes.
- Réinitialiser un compte ne modifie pas les autres comptes.
- Supprimer un compte ne modifie pas les autres comptes.
- Renommer un compte ne modifie pas la progression des autres comptes.

Needs:
- impl
- utest

#### Échec de stockage non bloquant
`req~account.storage-failure-non-blocking~1`

Status: approved
Priority: medium
Verification: test

Si la base de données serveur est indisponible ou échoue, le système doit conserver le jeu utilisable pendant la session courante.

Rationale:
Le jeu doit rester jouable même si le stockage serveur est temporairement indisponible.

Acceptance criteria:
- Une erreur de lecture du stockage serveur n'empêche pas l'affichage du jeu.
- Une erreur d'écriture du stockage serveur n'arrête pas la partie en cours.
- Le système peut afficher un diagnostic lisible.
- La progression non sauvegardée peut rester disponible en mémoire pendant la session courante.

Needs:
- impl
- utest

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-03 | 1.7.0 | 1.2.0 | docs/requirements/accounts-progress.md | Added local account and saved progression requirements without implementation | Specify local multi-player progression before code changes |
| 2026-05-03 | 1.8.0 | 1.2.0 | docs/requirements/accounts-progress.md | Replaced browser-side database storage with server-side database storage | Correct the persistence boundary before implementation |
| 2026-05-03 | 1.8.0 | 1.3.0 | docs/requirements/accounts-progress.md | Updated traceability status after account progression implementation | Keep the requirements page aligned with delivered implementation and tests |
| 2026-05-03 | 1.9.0 | 1.3.0 | docs/requirements/accounts-progress.md | Updated progression scope for completed-level replay and statistics linkage | Keep linear unlock rules while allowing score improvement on accomplished levels |
