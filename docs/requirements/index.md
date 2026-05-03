# Référentiel d'exigences

## Objet du système

Le jeu est un jeu éducatif web en Vanilla JS. Le joueur incarne un chevalier qui tranche des mots pour apprendre à reconnaître des formes linguistiques correctes ou incorrectes.

## Périmètre

Le périmètre couvre le jeu jouable dans un navigateur, la documentation d'exigences consultable dans MkDocs et la validation locale de la traçabilité avec OpenFastTrace. Le projet prévoit des comptes locaux sans authentification avec sauvegarde de progression en base de données serveur. Il ne prévoit pas de compte distant authentifié ni de synchronisation multi-appareil.

## Structure

Les exigences sont regroupées par thème pour rester faciles à éditer sans réintroduire de hiérarchie NEED / STKREQ / SYSREQ / SWREQ / VERREQ.

Le workflow attendu est en deux phases:
- `SPEC REVIEW` pour relire les exigences, détecter les ambiguïtés et modifier seulement les pages de specs;
- `IMPLEMENTATION` pour modifier le code uniquement après validation explicite de l'utilisateur.

Chaque page de `docs/requirements/` se termine par un `Change history` qui enregistre les modifications locales de cette page.
La page [Version history](version-history.md) relie les versions de specs et les versions du jeu pour garder un suivi global.
La page [Règles de rédaction](writing-rules.md) définit les règles obligatoires à appliquer avant toute création ou modification d'exigence.
La page [Audit de traçabilité](traceability-audit.md) donne une matrice manuelle pour relier exigences, liens statiques et artefacts d'exécution.

- [Format](format.md)
- [Règles de rédaction](writing-rules.md)
- [Audit de traçabilité](traceability-audit.md)
- [Gameplay](gameplay.md)
- [Niveaux](levels.md)
- [Interface et entrées](inputs-ui.md)
- [Comptes locaux et progression](accounts-progress.md)
- [Statistiques](statistics.md)
- [Feedback et audio](feedback-audio.md)
- [Technique](technical.md)
- [Vérification](verification.md)

La page [Niveaux](levels.md) rassemble les exigences de structure, une vue pédagogique synthétique des mondes, le Monde 1 — Écuyer, le Monde 2 — Chevalier et une table non exhaustive pour faciliter la lecture sans dupliquer `src/data/levels.js`.
Un Monde 3 — Maître chevalier pourra être spécifié dans une évolution ultérieure.
La page [Interface et entrées](inputs-ui.md) couvre aussi le choix du personnage au démarrage en plus des entrées et de la consigne visible.
La page [Comptes locaux et progression](accounts-progress.md) couvre les comptes sans authentification, le stockage serveur du niveau atteint et la reprise linéaire.
La page [Statistiques](statistics.md) couvre les scores persistants par niveau, le score global, le Tableau des champions et le rejeu des niveaux accomplis.

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/index.md | Added workflow explanation and history references | Clarify how to use the themed requirements set |
| 2026-05-02 | 1.1.0 | 1.0.0 | docs/requirements/index.md | Documented the extended campaign structure with worlds | Clarify how the level specification expands without duplicating level data |
| 2026-05-03 | 1.1.0 | 1.1.0 | docs/requirements/index.md | Documented the character selection entry point in the interface page | Keep the navigation aligned with the updated interface requirements |
| 2026-05-03 | 1.3.0 | 1.2.0 | docs/requirements/index.md | Added the requirement writing rules entry point | Make the spec authoring rules discoverable from the requirements overview |
| 2026-05-03 | 1.5.0 | 1.2.0 | docs/requirements/index.md | Added the traceability audit entry point | Make bidirectional traceability review discoverable from the requirements overview |
| 2026-05-03 | 1.7.0 | 1.2.0 | docs/requirements/index.md | Added local accounts and progression page to the overview | Keep the requirements index aligned with the new local progress specification |
| 2026-05-03 | 1.8.0 | 1.2.0 | docs/requirements/index.md | Updated the account progression scope to server-side persistence | Keep the overview aligned with the corrected storage boundary |
| 2026-05-03 | 1.9.0 | 1.3.0 | docs/requirements/index.md | Added the statistics page to the requirements overview | Make persistent scores and completed-level replay requirements discoverable |
