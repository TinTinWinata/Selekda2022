// window.location.reload(true);

const LEADERBOARD_KEY = "MT857vOXHq8ZoEzlMT857vOXHq8ZoEzl";
const leaderboardHere = document.getElementById("leaderboard-here");
const sort = document.getElementById("leaderboard-sort");
const changeUsername = document.getElementById("change-username-here");
const changeLifetime = document.getElementById("change-lifetime-here");
const changeScore = document.getElementById("change-score-here");
const detailPopup = document.getElementById("detail-popup");
const closeDetailPopup = document.getElementById("close-detail-popup");
const lastText = document.getElementById("last-text");

sort.addEventListener("change", onChangeSort);
closeDetailPopup.addEventListener("click", closePopup);

let leaderboardData = null;

getLeaderboardData();

function closePopup() {
    removeBlack();
    detailPopup.style.display = "none";
}

function saveLeaderboard(score, lifetime) {
    const data = {
        score: score,
        lifetime: lifetime,
        userId: USER.id,
    };

    fetch(SAVE_LEADERBOARD_API, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + USER.token,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                const validation = response.json();
            } else {
                return response.json();
            }
        })
        .then((resp) => {
            lastText.style.color = "green";
            lastText.innerHTML = resp;
        })
        .catch((err) => {
            lastText.style.color = "red";
            lastText.innerHTML = err.response.message;
        });
}

function addBlack() {
    document.getElementById("add-black").style.display = "block";
}

function removeBlack() {
    document.getElementById("add-black").style.display = "none";
}

function bubbleSort(data, str) {
    if (str === "score") {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data.length - i - 1; j++) {
                if (data[j].score <= data[j + 1].score) {
                    var temp = data[j];
                    data[j] = data[j + 1];
                    data[j + 1] = temp;
                }
            }
        }
    } else if (str === "name") {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data.length - i - 1; j++) {
                if (data[j].user.username <= data[j + 1].user.username) {
                    var temp = data[j];
                    data[j] = data[j + 1];
                    data[j + 1] = temp;
                }
            }
        }
    }
}

function linearSearch(id) {
    for (let i = 0; i < leaderboardData.length; i++) {
        if (leaderboardData[i].id === id) {
            return leaderboardData[i];
        }
    }
    return false;
}

function seeDetail(id) {
    // 32.	Show popup detail to display the player username, life time and score after player click Detail button.
    const data = linearSearch(id);
    if (!data) {
        return;
    } else {
        addBlack();
        detailPopup.style.display = "block";
        changeUsername.innerHTML = data.user.username;
        changeLifetime.innerHTML = data.lifetime;
        changeScore.innerHTML = data.score;
    }
}

function onChangeSort(e) {
    // 31.	The leaderboard can be sorted by score and username.
    bubbleSort(leaderboardData, sort.value);
    setLeaderboardDataToHTML(leaderboardData);
}

function setLeaderboard(data) {
    localStorage.setItem(LEADERBOARD_API, data);
}

function setLeaderboardDataToHTML(data) {
    // 30.	Players can see the leaderboard on he right of the game board and see details of players on the leaderboard by pressing the details button.
    leaderboardData = data;

    let html = "";

    data.forEach(($el) => {
        const div = `<li>${$el.user.username} | ${$el.score} <button onclick="seeDetail(${$el.id})" style="padding: 3px; font-size: 12px;">See detail</button></li>`;
        html += div;
    });
    leaderboardHere.innerHTML = html;
}

function getLeaderboardData() {
    fetch(LEADERBOARD_API)
        .then(function (response) {
            return response.json();
        })
        .then((resp) => {
            setLeaderboardDataToHTML(resp);
        })
        .catch(function (err) {});
}

function getLeaderboard() {
    const leaderboardData = localStorage.getItem(LEADERBOARD_KEY);
    if (!leaderboardData) {
        getLeaderboard();
    } else {
        return leaderboardData;
    }
}
