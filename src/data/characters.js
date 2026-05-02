// [impl->req~character.start-selection~1]
// [impl->req~character.cosmetic-only~1]
const CHARACTER_LIST = [
  {
    id: "knight",
    label: "Chevalier",
    cssClass: "character-knight",
    weaponLabel: "épée",
    strikeEffect: "sword"
  },
  {
    id: "pepe",
    label: "Pépé",
    cssClass: "character-pepe",
    weaponLabel: "canne",
    strikeEffect: "cane"
  },
  {
    id: "sage-laser",
    label: "Sage galactique",
    cssClass: "character-laser",
    weaponLabel: "sabre laser",
    strikeEffect: "laser"
  }
];

export const DEFAULT_CHARACTER_ID = "knight";

export function getCharacters() {
  return CHARACTER_LIST.slice();
}

export function getCharacterById(characterId) {
  return CHARACTER_LIST.find(character => character.id === characterId) || CHARACTER_LIST[0];
}

export function getDefaultCharacter() {
  return getCharacterById(DEFAULT_CHARACTER_ID);
}
