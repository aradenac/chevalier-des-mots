// [impl->req~level.extended-campaign-worlds~1]
// [impl->req~level.world-two-grammar-consolidation~1]
export const CAMPAIGN_WORLDS = [
  {
    id: 1,
    title: "Monde 1 — Écuyer",
    startLevelId: 1,
    endLevelId: 20,
    intention: "Distinctions visibles, nature des mots et premières formes verbales."
  },
  {
    id: 2,
    title: "Monde 2 — Chevalier",
    startLevelId: 21,
    endLevelId: 40,
    intention: "Consolidation orthographique et grammaticale avec accords, temps et homophones."
  }
];

export function getWorldForLevel(levelId) {
  return CAMPAIGN_WORLDS.find(world => levelId >= world.startLevelId && levelId <= world.endLevelId) ?? CAMPAIGN_WORLDS[CAMPAIGN_WORLDS.length - 1];
}
