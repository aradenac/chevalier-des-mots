import { KNIGHT_GRAPHIC } from "./knight/asset.js";
import { PEPE_GRAPHIC } from "./pepe/asset.js";
import { LASER_GRAPHIC } from "./laser/asset.js";

export const CHARACTER_GRAPHIC_CLASSES = [
  KNIGHT_GRAPHIC.cssClass,
  PEPE_GRAPHIC.cssClass,
  LASER_GRAPHIC.cssClass
];

export function applyCharacterGraphic(knight, character) {
  if (!knight || !character) return;
  knight.classList.remove(...CHARACTER_GRAPHIC_CLASSES);
  knight.classList.add(character.cssClass);
  knight.dataset.characterId = character.id;
}
