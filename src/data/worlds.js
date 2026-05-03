// [impl->req~level.extended-campaign-worlds~2]
// [impl->req~level.world-two-grammar-consolidation~2]
export const CAMPAIGN_WORLDS = [
  {
    id: 1,
    title: "Monde 1 — Écuyer",
    startLevelId: 1,
    endLevelId: 25,
    intention: "Distinctions visibles, premières catégories grammaticales, dictées guidées et premiers trous."
  },
  {
    id: 2,
    title: "Monde 2 — Chevalier",
    startLevelId: 26,
    endLevelId: 50,
    intention: "Consolidation orthographique et grammaticale avec accords, temps, homophones et phrases à trous."
  }
];

export function getWorldForLevel(levelId) {
  return CAMPAIGN_WORLDS.find(world => levelId >= world.startLevelId && levelId <= world.endLevelId) ?? CAMPAIGN_WORLDS[CAMPAIGN_WORLDS.length - 1];
}
