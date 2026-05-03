# Version history

Cette page relie les versions de specs aux versions du jeu.
Elle permet de suivre les changements globaux sans disperser l'historique dans le code ou dans des artefacts générés.

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/ | Split the monolithic requirements document into themed pages | Make the requirements easier to maintain while keeping the same meaning |
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/gameplay.md | Restored explicit utest linkage under Needs for target slicing | Keep traceability structurally valid for OpenFastTrace |
| 2026-05-02 | 1.1.0 | 1.0.0 | docs/requirements/levels.md, docs/requirements/index.md | Extended the campaign spec from one short world to two progressive worlds | Make the game longer while preserving a readable pedagogical progression |
| 2026-05-03 | 1.1.0 | 1.1.0 | src/data/levels.js, src/data/worlds.js, src/data/pedagogicalProgression.js, src/main.js, tests/levels.test.js, tests/worlds.test.js | Implemented the extended 40-level campaign with two progressive worlds | Deliver the new campaign length while keeping the progression and traceability coherent |
| 2026-05-03 | 1.1.0 | 1.1.0 | docs/requirements/inputs-ui.md, docs/requirements/index.md | Added character selection requirements to the interface spec | Let the player choose a cosmetic character before starting without changing gameplay rules |
| 2026-05-03 | 1.1.0 | 1.2.0 | index.html, src/data/characters.js, src/main.js, src/styles/game.css, tests/characters.test.js, tests/collision.test.js | Implemented character selection with cosmetic-only character variants | Add startup personalization while keeping score, collision and progression unchanged |
| 2026-05-03 | 1.2.0 | 1.2.0 | docs/requirements/ | Approved all existing requirements and normalized page structure with no code changes | All listed requirements represent accepted product targets; page history must remain at the end |
| 2026-05-03 | 1.3.0 | 1.2.0 | docs/requirements/writing-rules.md, docs/requirements/index.md, mkdocs.yml, AGENTS.md | Added versioned writing rules for requirements and agent workflow references | Avoid repeating authoring constraints in prompts while keeping spec changes governed by repository rules |
| 2026-05-03 | 1.4.0 | 1.2.0 | docs/requirements/ | Audited and normalized requirements against writing rules with no code changes | Apply the versioned requirement writing rules while preserving product meaning |

## Change history

| Date | Spec version | Game version | Location | Modification | Justification |
|---|---|---|---|---|---|
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/version-history.md | Introduced global version mapping | Keep a single cross-page view of spec and game versions |
| 2026-05-02 | 1.0.0 | 1.0.0 | docs/requirements/version-history.md | Recorded gameplay traceability fix | Keep version history aligned with spec edits |
| 2026-05-02 | 1.1.0 | 1.0.0 | docs/requirements/version-history.md | Recorded the extended campaign specification update | Keep the global spec-game mapping aligned with the new world structure |
| 2026-05-03 | 1.1.0 | 1.1.0 | docs/requirements/version-history.md | Recorded the 40-level world implementation | Keep the version history aligned with the delivered campaign extension |
| 2026-05-03 | 1.1.0 | 1.1.0 | docs/requirements/version-history.md | Recorded the character selection specification update | Keep the version history aligned with the new start-selection requirements |
| 2026-05-03 | 1.1.0 | 1.2.0 | docs/requirements/version-history.md | Recorded the character selection implementation | Keep the global history aligned with the cosmetic character release |
| 2026-05-03 | 1.2.0 | 1.2.0 | docs/requirements/version-history.md | Recorded approved status normalization with no code changes | Keep the global history aligned with the accepted product target status |
| 2026-05-03 | 1.3.0 | 1.2.0 | docs/requirements/version-history.md | Recorded the requirement writing rules update with no code changes | Keep the global history aligned with the new spec authoring process |
| 2026-05-03 | 1.4.0 | 1.2.0 | docs/requirements/version-history.md | Recorded the requirement writing-rules audit with no code changes | Keep the global history aligned with the normalized requirements |
