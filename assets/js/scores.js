function showScores() {
  highscores = document.getElementById("highscores");
  highscores.textContent = "";
  var userEntriesArr = localStorage.getItem("userEntries");
  if (userEntriesArr == null || userEntriesArr == undefined) {
    return;
  }
  userEntriesArr = JSON.parse(userEntriesArr);
  for (let i = 0; i < userEntriesArr.length; i++) {
    var entry = userEntriesArr[i];
    var liElement = document.createElement("li");
    liElement.textContent =
      "Initials: " + entry["initials"] + " Score: " + entry["score"];
    highscores.appendChild(liElement);
  }
}

function clearScores() {
  localStorage.setItem("userEntries", JSON.stringify([]));
  showScores();
}

showScores();
document.getElementById("clear").onclick = clearScores;
