const spinWheel = document.getElementById("spin-wheel");
const spinContainer = document.getElementById("spin-container");

const okBtn = document.getElementById("okay-btn");

const imgOne = document.getElementById("spin-img-1");
const imgTwo = document.getElementById("spin-img-2");
const imgThree = document.getElementById("spin-img-3");
const imgFour = document.getElementById("spin-img-4");

const MAX_DEG = 20000;
const MIN_DEG = 5000;

okBtn.addEventListener("click", closeRandom);

function setImg(str) {
  if (str === "stage") {
    imgOne.src = BG_STAGE_AVATAR_URL[0];
    imgTwo.src = BG_STAGE_AVATAR_URL[1];
    imgThree.src = BG_STAGE_AVATAR_URL[2];
    imgFour.src = BG_STAGE_AVATAR_URL[3];
  } else if (str === "hero") {
    imgOne.src = HERO_AVATAR_URL[0];
    imgTwo.src = HERO_AVATAR_URL[1];
    imgThree.src = HERO_AVATAR_URL[2];
    imgFour.src = HERO_AVATAR_URL[3];
  }
}

// 5.	User can choose random character or stage with random button and show popup with wheels of characters or stage.
function randomStage() {
  setImg("stage");
  addBlack();
  spinContainer.style.visibility = "visible";
  let number = Math.round(Math.random() * (MAX_DEG - MIN_DEG) + MIN_DEG);

  const mod = number % 360;
  if (mod >= 0 && mod <= 90) {
    STAGE = 0;
  } else if (mod > 90 && mod <= 180) {
    STAGE = 1;
  } else if (mod > 180 && mod <= 270) {
    STAGE = 2;
  } else if (mod > 270 && mod <= 359) {
    STAGE = 3;
  }

  spinWheel.style.transform = "rotate(" + number + "deg)";
}

function randomCharacter() {
  setImg("hero");
  addBlack();
  spinContainer.style.visibility = "visible";
  let number = Math.round(Math.random() * (MAX_DEG - MIN_DEG) + MIN_DEG);

  const mod = number % 360;
  if (mod >= 0 && mod <= 90) {
    HERO = 0;
  } else if (mod > 90 && mod <= 180) {
    HERO = 1;
  } else if (mod > 180 && mod <= 270) {
    HERO = 2;
  } else if (mod > 270 && mod <= 359) {
    HERO = 3;
  }

  spinWheel.style.transform = "rotate(" + number + "deg)";
}

function closeRandom() {
  setTimeout(() => {
    removeBlack();
  }, 3000);
  spinContainer.style.visibility = "hidden";
}

function RandomOk() {
  spinContainer.style.display = "visible";
}
