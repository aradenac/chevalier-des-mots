// [impl->req~architecture.graphics.asset-module~1]
import "./asset.css";

export function createCannonShotElement(documentRef, {
  letter,
  startX,
  startY,
  targetY,
  dropY,
  success
}) {
  const shot = documentRef.createElement("div");
  shot.className = "cannonShot " + (success ? "is-hit" : "is-miss");
  shot.textContent = letter;
  shot.style.left = startX + "px";
  shot.style.top = startY + "px";
  shot.style.setProperty("--dx", "0px");
  shot.style.setProperty("--dy", (targetY - startY) + "px");
  shot.style.setProperty("--dx-bounce", "-24px");
  shot.style.setProperty("--dy-bounce", (targetY - startY + 14) + "px");
  shot.style.setProperty("--dx-drop", "18px");
  shot.style.setProperty("--dy-drop", (dropY - startY - 36) + "px");
  return shot;
}

export function createCannonMuzzleEffects(documentRef, rigRect) {
  const position = {
    left: rigRect.left + 168 + "px",
    top: rigRect.top + 50 + "px"
  };
  const flame = documentRef.createElement("div");
  flame.className = "cannonMuzzle cannonMuzzle--flame";
  flame.style.left = position.left;
  flame.style.top = position.top;
  const smoke = documentRef.createElement("div");
  smoke.className = "cannonMuzzle cannonMuzzle--smoke";
  smoke.style.left = position.left;
  smoke.style.top = position.top;
  return { flame, smoke };
}

export function restartCannonRecoil(cannonRig) {
  if (!cannonRig?.classList) return;
  cannonRig.classList.remove("is-firing");
  void cannonRig.offsetWidth;
  cannonRig.classList.add("is-firing");
}
