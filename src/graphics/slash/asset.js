// [impl->req~architecture.graphics.asset-module~1]
import "./asset.css";

export function createSlashEffect(documentRef, { character, x, y }) {
  const slash = documentRef.createElement("div");
  slash.className = "slash slash--" + character.strikeEffect;
  slash.style.left = x + "px";
  slash.style.top = y + "px";
  return slash;
}
