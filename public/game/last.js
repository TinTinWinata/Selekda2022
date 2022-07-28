const lastLifeTime = document.getElementById("last-lifetime");
const lastScore = document.getElementById("last-score");
const lastSave = document.getElementById("last-save");
const lastRestart = document.getElementById("last-restart");
const last = document.getElementById("last");
const lastUsername = document.getElementById("last-username");
const lastBack = document.getElementById("last-back");

function showLast(lifeTime, score) {
    // 28.	Show popup after game over to display the player username, life time, score, save high score button and restart button.
    last.style.display = "block";
    canvas.style.display = "none";
    lastUsername.innerHTML = "Name : " + USERNAME;
    lastScore.innerHTML = "Score : " + score;
    lastLifeTime.innerHTML = "Lifetime : " + lifeTime;
    saveLeaderboard(score, lifeTime);
    lastSave.addEventListener("click", function (e) {
        saveLeaderboard(score, lifeTime);
        // 29.	Highscore should be saved in database after player click Save high score button
    });
}

lastBack.addEventListener("click", function (e) {
    window.location.replace("/play");
});

lastRestart.addEventListener("click", function (e) {
    last.style.display = "none";
    runScript();
});
