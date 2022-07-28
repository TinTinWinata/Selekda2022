const selectContainer = document.getElementById("select");
const selectLevel = document.getElementById("selectLevel");
const selectPlayBtn = document.getElementById("select-play-btn");

selectLevel.addEventListener("change", changeLevel);
selectPlayBtn.addEventListener("click", handleSelectPlay);

function select() {
  // 2.	Player can go to character select page after fill username field and click “Agree” button at the bottom of game instruction.

  selectContainer.style.display = "block";
  check();
}

function handleSelectPlay() {
  selectContainer.style.display = "none";
  runScript();
}

function check() {


  // 6.	The “Play” button should be disabled if the user did not choose character, stage and level.
  if (LEVEL == null || HERO == null || STAGE == null) {
    selectPlayBtn.style.display = "none";
  } else {
    selectPlayBtn.style.display = "block";
  }
}

function changeLevel() {
  LEVEL = selectLevel.value;
  check();
}

// 4.	User can choose one from four characters, one of four stages, level (easy, medium, hard) and click “Play” button at the bottom of characters select page.
function selectHero(n) {
  HERO = n;
  check();
}

function selectStage(n) {
  STAGE = n;
  check();
}
