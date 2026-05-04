export function createChampionsController({
  championsList,
  playerStatsDetail,
  accountSession,
  levels,
  clearElement
}) {
  function renderChampionsDashboard(onReplay) {
    if (!championsList || !playerStatsDetail) return;
    clearElement(championsList);
    clearElement(playerStatsDetail);
    // [impl->req~stats.champions-dashboard~1]
    const champions = accountSession.getChampionsDashboard();
    if (champions.length === 0) {
      const empty = document.createElement("div");
      empty.className = "accountEmpty";
      empty.textContent = "Aucun joueur pour l'instant.";
      championsList.appendChild(empty);
      return;
    }

    champions.forEach(player => {
      const button = document.createElement("button");
      button.className = "championChoice";
      button.type = "button";
      button.dataset.accountId = player.id;
      const name = document.createElement("span");
      name.className = "championChoice__name";
      name.textContent = player.name;
      const progress = document.createElement("span");
      progress.textContent = "Niveau atteint : " + player.highestCompletedLevel;
      const score = document.createElement("span");
      score.textContent = "Score global : " + player.globalScore;
      button.appendChild(name);
      button.appendChild(progress);
      button.appendChild(score);
      button.addEventListener("click", () => renderPlayerStatsDetail(player.id, onReplay));
      championsList.appendChild(button);
    });
  }

  function renderPlayerStatsDetail(accountId, onReplay) {
    if (!playerStatsDetail) return;
    clearElement(playerStatsDetail);
    // [impl->req~stats.player-detail~1]
    const playerLevels = accountSession.getPlayerStatsDetail(accountId, levels);
    if (playerLevels.length === 0) {
      const empty = document.createElement("div");
      empty.className = "accountEmpty";
      empty.textContent = "Aucun niveau accompli.";
      playerStatsDetail.appendChild(empty);
      return;
    }

    playerLevels.forEach(level => {
      const row = document.createElement("div");
      row.className = "levelScoreRow";
      const summary = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = "Niveau " + level.levelNumber + " · " + level.title;
      const score = document.createElement("span");
      score.textContent = "Meilleur score : " + level.bestScore + " / 5";
      summary.appendChild(title);
      summary.appendChild(score);
      const replayBtn = document.createElement("button");
      replayBtn.className = "smallBtn secondary";
      replayBtn.type = "button";
      replayBtn.disabled = !level.replayAvailable;
      replayBtn.textContent = "Rejouer";
      replayBtn.addEventListener("click", () => onReplay(accountId, level.levelNumber));
      row.appendChild(summary);
      row.appendChild(replayBtn);
      playerStatsDetail.appendChild(row);
    });
  }

  return {
    renderChampionsDashboard,
    renderPlayerStatsDetail
  };
}
