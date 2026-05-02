# Référentiel d'exigences

## Objet du système

Le jeu est un jeu éducatif web en Vanilla JS. Le joueur incarne un chevalier qui tranche des mots pour apprendre à reconnaître des formes linguistiques correctes ou incorrectes.

## Périmètre

Le périmètre couvre le jeu jouable dans un navigateur, la documentation d'exigences consultable dans MkDocs et la validation locale de la traçabilité avec OpenFastTrace. Le projet ne prévoit pas de compte utilisateur, pas de backend, pas de sauvegarde distante et pas de synchronisation réseau.

## Structure

Les exigences sont regroupées par thème pour rester faciles à éditer sans réintroduire de hiérarchie NEED / STKREQ / SYSREQ / SWREQ / VERREQ.

Le workflow attendu est en deux phases:
- `SPEC REVIEW` pour relire les exigences, détecter les ambiguïtés et modifier seulement les pages de specs;
- `IMPLEMENTATION` pour modifier le code uniquement après validation explicite de l'utilisateur.

Chaque page de `docs/requirements/` se termine par un `Change history` qui enregistre les modifications locales de cette page.
La page [Version history](version-history.md) relie les versions de specs et les versions du jeu pour garder un suivi global.

- [Format](format.md)
- [Gameplay](gameplay.md)
- [Niveaux](levels.md)
- [Interface et entrées](inputs-ui.md)
- [Feedback et audio](feedback-audio.md)
- [Technique](technical.md)
- [Vérification](verification.md)

La page [Niveaux](levels.md) rassemble les exigences de structure, une vue pédagogique synthétique des mondes, le Monde 1 — Écuyer, le Monde 2 — Chevalier et une table non exhaustive pour faciliter la lecture sans dupliquer `src/data/levels.js`.
Un Monde 3 — Maître chevalier pourra être spécifié dans une évolution ultérieure.
La page [Interface et entrées](inputs-ui.md) couvre aussi le choix du personnage au démarrage en plus des entrées et de la consigne visible.

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/index.md | Added workflow explanation and history references | Clarify how to use the themed requirements set |
| 2026-05-02 | 1.1.0 | 1.0.0 | docs/requirements/index.md | Documented the extended campaign structure with worlds | Clarify how the level specification expands without duplicating level data |
| 2026-05-03 | 1.1.0 | 1.1.0 | docs/requirements/index.md | Documented the character selection entry point in the interface page | Keep the navigation aligned with the updated interface requirements |
