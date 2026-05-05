import { applyCharacterGraphic } from "../graphics/characters/index.js";

export function createCharacterController({
  knight,
  characterGrid,
  characterStatus,
  defaultCharacterId,
  getCharacterById,
  getCharacters
}) {
  let selectedCharacterId = defaultCharacterId;

  function getSelectedCharacter() {
    return getCharacterById(selectedCharacterId);
  }

  function getSelectedCharacterId() {
    return selectedCharacterId;
  }

  function updateCharacterPreview() {
    const character = getSelectedCharacter();
    if (characterStatus) {
      characterStatus.textContent = "Personnage choisi : " + character.label + " · arme : " + character.weaponLabel;
    }
    if (!characterGrid) return;
    for (const button of characterGrid.querySelectorAll("button[data-character-id]")) {
      button.classList.toggle("is-selected", button.dataset.characterId === character.id);
      button.setAttribute("aria-pressed", button.dataset.characterId === character.id ? "true" : "false");
    }
  }

  function applySelectedCharacter() {
    const character = getSelectedCharacter();
    applyCharacterGraphic(knight, character);
    // [impl->req~character.cosmetic-only~1]
    updateCharacterPreview();
  }

  function chooseCharacter(characterId) {
    selectedCharacterId = getCharacterById(characterId).id;
    applySelectedCharacter();
  }

  function setSelectedCharacterId(characterId) {
    selectedCharacterId = getCharacterById(characterId).id;
  }

  function buildCharacterGrid() {
    if (!characterGrid) return;
    characterGrid.replaceChildren();
    // [impl->req~character.start-selection~1]
    getCharacters().forEach(character => {
      const button = document.createElement("button");
      button.className = "characterChoice";
      button.type = "button";
      button.dataset.characterId = character.id;
      button.setAttribute("aria-pressed", character.id === selectedCharacterId ? "true" : "false");
      const label = document.createElement("span");
      label.className = "characterChoice__label";
      label.textContent = character.label;
      const weapon = document.createElement("span");
      weapon.className = "characterChoice__weapon";
      weapon.textContent = "Arme : " + character.weaponLabel;
      button.appendChild(label);
      button.appendChild(weapon);
      button.addEventListener("click", () => chooseCharacter(character.id));
      characterGrid.appendChild(button);
    });
    updateCharacterPreview();
  }

  return {
    applySelectedCharacter,
    buildCharacterGrid,
    chooseCharacter,
    getSelectedCharacter,
    getSelectedCharacterId,
    setSelectedCharacterId,
    updateCharacterPreview
  };
}
