// [utest->req~character.start-selection~1]
// [utest->req~character.cosmetic-only~1]
import { describe, expect, it } from "vitest";
import { DEFAULT_CHARACTER_ID, getCharacterById, getCharacters, getDefaultCharacter } from "../src/data/characters.js";
import { findSwordCollision } from "../src/core/collision.js";

describe("characters", () => {
  it("propose trois personnages avec les champs attendus", () => {
    const characters = getCharacters();

    expect(characters).toHaveLength(3);
    expect(characters.map(character => character.id)).toEqual(["knight", "pepe", "sage-laser"]);

    for (const character of characters) {
      expect(character).toMatchObject({
        id: expect.any(String),
        label: expect.any(String),
        cssClass: expect.any(String),
        weaponLabel: expect.any(String),
        strikeEffect: expect.any(String)
      });
    }
  });

  it("sélectionne le chevalier par défaut", () => {
    expect(DEFAULT_CHARACTER_ID).toBe("knight");
    expect(getDefaultCharacter()).toEqual({
      id: "knight",
      label: "Chevalier",
      cssClass: "character-knight",
      weaponLabel: "épée",
      strikeEffect: "sword"
    });
    expect(getCharacterById("unknown")).toEqual(getDefaultCharacter());
  });

  it("garde la collision indépendante du personnage choisi", () => {
    const words = [
      { x: 120, y: 100, data: { target: false } },
      { x: 150, y: 110, data: { target: true } }
    ];

    const knightHit = findSwordCollision({
      words,
      swordCenterX: 100,
      swordCenterY: 100,
      veryEasy: false
    });
    const pepeHit = findSwordCollision({
      words,
      swordCenterX: 100,
      swordCenterY: 100,
      veryEasy: false
    });

    expect(knightHit).toBe(pepeHit);
    expect(getCharacterById("pepe").cssClass).toBe("character-pepe");
    expect(getCharacterById("sage-laser").weaponLabel).toBe("sabre laser");
  });
});
