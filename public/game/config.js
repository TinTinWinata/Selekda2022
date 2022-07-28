const LEADERBOARD_API = "http://localhost:8000/api/leaderboard/10";
const SAVE_LEADERBOARD_API = "http://localhost:8000/api/save-leaderboard";
const DINO_URL = "./assets/Characters/dino/";
const JACK_URL = "./assets/Characters/jack/";
const KNIGHT_URL = "./assets/Characters/knight/";
const REDHAT_URL = "./assets/Characters/redhat/";

const STAGE_1_URL = "./assets/Stages/Stage 1/";
const STAGE_2_URL = "./assets/Stages/Stage 2/";
const STAGE_3_URL = "./assets/Stages/Stage 3/";
const STAGE_4_URL = "./assets/Stages/Stage 4/";

const FOOT_1_URL = "foot_1.png";
const FOOT_2_URL = "foot_2.png";
const FOOT_3_URL = "foot_3.png";
const EXPLOSION_URL = "./assets/explosion.png";

let LEADERBOARD_DATA;

const BIRD_URL = "./assets/Bird";
const BIRD_ALL_URL = [
    "./assets/Bird/bird-1.png",
    "./assets/Bird/bird-2.png",
    "./assets/Bird/bird-3.png",
    "./assets/Bird/bird-4.png",
];

const METEOR_URL = "./assets/Elements/meteor.png";
const BLUEBOX_URL = "./assets/Elements/bluebox.png";
const COIN_URL = "./assets/Elements/coin.png";
const GREEN_BOX_URL = "./assets/Elements/greenbox.png";
const HEARTH_URL = "./assets/Elements/love.png";
const ORANGEBOX_URL = "./assets/Elements/orangebox.png";
const REDBOX_URL = "./assets/Elements/redbox.png";
const STONE_BLOCK_URL = "./assets/Elements/StoneBlock.png";

const COIN_CONFIG = {
    w: 133,
    h: 132,
};

const HEARTH_CONFIG = {
    w: 505,
    h: 464,
};

const METEOR_CONFIG = {
    w: 1000,
    h: 1000,
};

const PET_CONFIG = {
    totalSprite: 4,
    w: 717,
    h: 610,
};

const HERO_URL = [DINO_URL, JACK_URL, KNIGHT_URL, REDHAT_URL];
const STAGE_URL = [STAGE_1_URL, STAGE_2_URL, STAGE_3_URL, STAGE_4_URL];
const ELEMENT_URL = [BLUEBOX_URL, ORANGEBOX_URL, GREEN_BOX_URL, REDBOX_URL];

const BLUEBOX_CONF = {
    w: 101,
    h: 101,
};

const ORANGEBOX_CONF = {
    w: 101,
    h: 99,
};

const GREENBOX_CONF = {
    w: 101,
    h: 101,
};

const REDBOX_CONF = {
    w: 101,
    h: 101,
};

const ELEMENT_CONF = [BLUEBOX_CONF, ORANGEBOX_CONF, GREENBOX_CONF, REDBOX_CONF];

const STAGE_1_CONF = {
    tileW: 128,
    tileH: 93,
};
const STAGE_2_CONF = {
    tileW: 128,
    tileH: 93,
};
const STAGE_3_CONF = {
    tileW: 128,
    tileH: 93,
};
const STAGE_4_CONF = {
    tileW: 128,
    tileH: 128,
};

const EXPLOSION_CONF = {
    total: 6,
    w: 32,
    h: 32,
};

const DINO_URL_AVATAR = "assets/Characters/dino/Run (3).png";
const JACK_URL_AVATAR = "assets/Characters/jack/Run (7).png";
const KNIGHT_URL_AVATAR = "assets/Characters/knight/Run (8).png";
const REDHAT_URL_AVATAR = "assets/Characters/redhat/Run (4).png";

const HERO_AVATAR_URL = [
    DINO_URL_AVATAR,
    JACK_URL_AVATAR,
    KNIGHT_URL_AVATAR,
    REDHAT_URL_AVATAR,
];

const BG_STAGE_1_URL = "assets/Stages/Stage 1/BG.png";
const BG_STAGE_2_URL = "assets/Stages/Stage 2/BG.png";
const BG_STAGE_3_URL = "assets/Stages/Stage 3/BG.png";
const BG_STAGE_4_URL = "assets/Stages/Stage 4/BG.png";

const BG_STAGE_AVATAR_URL = [
    BG_STAGE_1_URL,
    BG_STAGE_2_URL,
    BG_STAGE_3_URL,
    BG_STAGE_4_URL,
];

const STAGE_CONF = [STAGE_1_CONF, STAGE_2_CONF, STAGE_3_CONF, STAGE_4_CONF];

let HERO_NAME = ["dino", "jake", "knight", "red hat"];

let USERNAME;
let HERO = null;
// 0 -> dino
// 1 -> jakecanvas.height / 2
// 2 -> knight
// 3 -> redhat

let STAGE = null;
// 0 -> stage 1
// 1 -> stage 2
// 2 -> stage 3
// 3 -> stage 4

let LEVEL = null;
// easy
// medium
// hard

const DINO_CONF = {
    dead: 8,
    idle: 10,
    jump: 12,
    run: 8,
    w: 680,
    h: 472,
};

const JACK_CONF = {
    dead: 10,
    idle: 10,
    jump: 10,
    run: 8,
    w: 579,
    h: 763,
};

const KNIGHT_CONF = {
    dead: 10,
    idle: 10,
    jump: 10,
    run: 10,
    w: 587,
    h: 707,
};

const REDHAT_CONF = {
    dead: 10,
    idle: 10,
    jump: 12,
    run: 8,
    w: 669,
    h: 569,
};

const HERO_CONF = [DINO_CONF, JACK_CONF, KNIGHT_CONF, REDHAT_CONF];

let letGetExplosion = () => {
    const URL = EXPLOSION_URL;
    const image = new Image();
    image.src = URL;
    return image;
};

let getHeroWidthHeight = () => {
    return [HERO_CONF[HERO].w, HERO_CONF[HERO].h];
};

let getHeroConf = () => {
    return HERO_CONF[STAGE];
};

let getStageConf = () => {
    return STAGE_CONF[STAGE];
};

let letGetHeroDeath = () => {
    const HERO_URL = getHeroUrl();
    const howMany = HERO_CONF[HERO].dead;
    let spriteList = [];
    for (let i = 1; i <= howMany; i++) {
        const URL = HERO_URL + `Dead%20(${i}).png`;
        const img = new Image();
        img.src = URL;
        spriteList.push(img);
    }
    return spriteList;
};

let letGetHeroJumping = () => {
    const HERO_URL = getHeroUrl();
    const howMany = HERO_CONF[HERO].jump;
    let spriteList = [];
    for (let i = 1; i <= howMany; i++) {
        const URL = HERO_URL + `Jump%20(${i}).png`;
        const img = new Image();
        img.src = URL;
        spriteList.push(img);
    }
    return spriteList;
};

let letGetHeroRunning = () => {
    const HERO_URL = getHeroUrl();
    const howMany = HERO_CONF[HERO].run;
    let spriteList = [];
    for (let i = 1; i <= howMany; i++) {
        const URL = HERO_URL + `Run%20(${i}).png`;
        const img = new Image();
        img.src = URL;
        spriteList.push(img);
    }
    return spriteList;
};

let letGetPetFlying = () => {
    const len = BIRD_ALL_URL.length;
    let spriteList = [];

    for (let i = 0; i < len; i++) {
        const URL = BIRD_ALL_URL[i];
        console.log(URL);
        const img = new Image();
        img.src = URL;
        spriteList.push(img);
    }
    return spriteList;
};

let letGetHeroIdle = () => {
    const HERO_URL = getHeroUrl();
    const howMany = HERO_CONF[HERO].idle;
    let spriteList = [];
    for (let i = 1; i <= howMany; i++) {
        const URL = HERO_URL + `Idle%20(${i}).png`;
        const img = new Image();
        img.src = URL;
        spriteList.push(img);
    }
    return spriteList;
};

let getBgUrl = () => {
    const STAGE_URL = getStageUrl();
    return STAGE_URL + "/BG.png";
};

let getFootUrl = () => {
    const STAGE_URL = getStageUrl();
    return [
        STAGE_URL + FOOT_1_URL,
        STAGE_URL + FOOT_2_URL,
        STAGE_URL + FOOT_3_URL,
    ];
};

let getHeroUrl = () => {
    if (HERO !== null) return HERO_URL[HERO];
};

let getStageUrl = () => {
    if (STAGE !== null) return STAGE_URL[HERO];
};

let getLevel = () => {
    return LEVEL;
};
