const aggreeBtn = document.getElementById("aggree");
const inputUsername = document.getElementById("input-username");
const start = document.getElementById("start");

const aggreeForm = document.getElementById("aggree-form");

aggreeForm.addEventListener("submit", aggreeClick);

// 1.	Show game instruction in the centre after page are loaded.

inputUsername.value = USER.username;
inputUsername.disabled = true;
aggreeBtn.style.display = "block";

function aggreeClick(e) {
    e.preventDefault();
    // getLeaderboardData();
    USERNAME = inputUsername.value;
    start.style.display = "none";
    select();
}
