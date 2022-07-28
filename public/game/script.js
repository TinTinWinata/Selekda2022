const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const point = document.getElementById("myCoin");
const pauseRef = document.getElementById("pause");
const lifeTimeRef = document.getElementById("lifetime");

const writeInTheMiddleRef = document.getElementById("writeInTheMiddle");

let beforeCanvasW = 1000;
let beforeCanvasH = 600;

canvas.width = 2000;
canvas.height = 1200;

const canvasScaleX = canvas.width / beforeCanvasW;
const canvasScaleY = canvas.height / beforeCanvasH;

const COLLIDE_ANIMATION_TIME = 3;
const MAX_MIDDLE = 2;
const MIN_MIDDLE = 1;
const OFFSET_RANDOM = 0;
const HOW_MANY_BLOCK = 4;
const METEOR_SPEED = 3;
const METEOR_TIME_SPAWN = 0.5;
const ELEMENT_TIME_SPAWN = 2;
const SCORE_MULTIPLIER = 1;
const SPRITE_SPEED = 3;
const BLOCK_GENERATE_OFFSET_Y = 765;

const PLAYER_OFFSET_MID = 50;
const MAX_PLAYER_JUMP = 2;

function runScript() {
    canvas.style.display = "block";
    let GRAVITY = 0.5;
    let lastTime = new Date();
    let interval = 0;
    let fps = 60;

    // 8.	When the game starts, the player will get 3 hearts and get a life time of 20 seconds.
    const INITIAL_LIFE_TIME = 20;
    const STARTING_HEALTH = 3;

    let keys = [];
    let meteors = [];
    let elements = [];
    let explodes = [];
    const lvl = getLevel();
    let METEOR_MULTIPLIER = 1;
    let pause = false;
    let score = 0;
    const BLUE_BOX_SPEED = 3;
    const PAUSE_DELAY = 1;
    let firstFlag = true;
    let clearFlag = false;
    let xClick = 0;
    let yClick = 0;

    const gunMusic = document.getElementById("gun-play");
    const music = document.getElementById("audio-play");
    const deathMusic = document.getElementById("death-play");
    const hurtMusic = document.getElementById("hurt-play");

    function playAudio() {
        music.play();
        music.loop = true;
    }

    lifeTimeRef.style.display = "block";

    function first() {
        pause = true;
        firstFlag = false;
        writeInTheMiddleRef.style.display = "block";

        // 7.	Show countdown for three seconds in the center of screen after user clicked the play button before the game started playing.

        setTimeout(() => {
            writeInTheMiddle("2");
            setTimeout(() => {
                writeInTheMiddle("1");
                setTimeout(() => {
                    writeInTheMiddle("0");
                    playAudio();
                    writeInTheMiddleRef.style.display = "none";
                    pause = false;
                }, 1000);
            }, 1000);
        }, 1000);
    }

    function addScore(n) {
        // 19.	The score will be increased if player can collect coins.
        score += n * SCORE_MULTIPLIER;
        point.innerHTML = score;
    }

    function calculateMeteorSpawn() {
        // a.	‘2 meteors’ for easy level
        if (lvl === "easy") METEOR_MULTIPLIER = 2;
        // b.	‘3 meteors’ for medium level
        else if (lvl === "medium") METEOR_MULTIPLIER = 3;
        // c.	‘4 meteors’ for hard level
        else if (lvl === "hard") METEOR_MULTIPLIER = 4;
    }

    calculateMeteorSpawn();

    function getDeltaTime() {
        const currTime = new Date();
        const delta = (currTime - lastTime) / 1000;
        lastTime = currTime;
        return delta;
    }

    function random(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function isRun() {
        interval += getDeltaTime();
        if (interval >= 1 / fps) {
            // 1 Second
            interval = 0;
            return true;
        }
    }

    class Coin {
        constructor(x, y) {
            this.scale = 1;
            this.sprite = new Image();
            this.sprite.src = COIN_URL;
            this.x = x;
            this.y = y;
            this.w = COIN_CONFIG.w;
            this.h = COIN_CONFIG.h;
        }

        render() {
            ctx.drawImage(
                this.sprite,
                0,
                0,
                COIN_CONFIG.w,
                COIN_CONFIG.h,
                this.x,
                this.y,
                this.w,
                this.h
            );
        }
    }

    class Meteor {
        constructor() {
            this.scale = 0.1;
            this.sprite = new Image();
            this.sprite.src = METEOR_URL;
            this.speed = METEOR_SPEED;
            this.w = METEOR_CONFIG.w * this.scale;
            this.h = METEOR_CONFIG.h * this.scale;
            this.y = 0;
            this.x = this.getX();
            this.alreadyHit = false;
        }

        checkCollide(player) {
            const mid = (player.x + player.w) / 2;
            if (
                player.y + player.h - PLAYER_OFFSET_MID >= this.y &&
                player.y + PLAYER_OFFSET_MID <= this.y + this.h &&
                player.x + player.w - PLAYER_OFFSET_MID >= this.x &&
                player.x + PLAYER_OFFSET_MID <= this.x + this.w
            ) {
                this.alreadyHit = true;
                player.minHealth(1);
                player.collideAnimation();
            }
            return false;
        }

        getX() {
            return random(0, canvas.width);
        }

        move() {
            if (!this.alreadyHit) {
                this.checkCollide(player);
            }

            // 11.	Meteor and boxes should move down the border vertically at the exact given time.

            this.render();
            this.y += this.speed;

            // this.x -= this.speed;

            // if (random(0, 1) == 0) {
            //   this.x -= this.speed / 4;
            // } else {
            //   this.x += this.speed / 4;
            // }
        }

        render() {
            const dx = this.x;
            const dy = this.y;

            // ctx.fillRect();
            ctx.drawImage(
                this.sprite,
                0,
                0,
                METEOR_CONFIG.w,
                METEOR_CONFIG.h,
                dx,
                dy,
                this.w,
                this.h
            );
        }
    }

    function checkCollideElementPlayer(element, i, player) {
        if (
            element.y + element.h >= player.y &&
            element.y <= player.y + player.h &&
            element.x + element.w >= player.x &&
            element.x <= player.x + player.w
        ) {
            switch (element.item) {
                case 1:
                    player.addHealth(1);
                    break;
                case 2:
                    player.increaseLifetime(10);
                    break;
                case 3:
                    player.minHealth(1);
                    break;
                case 0:
                    player.speedX = BLUE_BOX_SPEED;
                    setTimeout(() => {
                        player.speedX = 0.1; // default speed
                    }, 3000);
                    break;
            }
            // 22.	The meteor, box and coin will be vanished when player hit at the right timing or it passed the border without hit.
            elements.splice(i, 1);
        }
    }

    class AllBlock {
        constructor() {
            this.blocks = [];
            this.generateBlock();
            this.coins = [];
            this.generateCoin();
        }

        checkCollideCoin(coin, i, player) {
            if (
                coin.y + coin.h >= player.y &&
                coin.y <= player.y + player.h &&
                coin.x + coin.w >= player.x &&
                coin.x <= player.x + player.w
            ) {
                // 21.	Score is served from total coins earned.
                addScore(1);
                // 22.	The meteor, box and coin will be vanished when player hit at the right timing or it passed the border without hit.;
                this.coins.splice(i, 1);
                // 20.	An additional random coin will appear when the coin is obtained.
                this.createCoin();
            }
        }

        createCoin() {
            const randomIdx = random(0, this.blocks.length - 1);
            const block = this.blocks[randomIdx];
            const x = (block.x + block.w) / 2;
            const y = block.y - COIN_CONFIG.h;
            const coin = new Coin(x, y);
            this.coins.push(coin);
        }

        generateCoin() {
            // 15.	When the game starts, there will be 3 random coin.
            for (let i = 1; i < HOW_MANY_BLOCK; i++) {
                const block = this.blocks[i];
                const x = (block.x + block.w) / 2;
                const y = block.y - COIN_CONFIG.h;
                const coin = new Coin(x, y);
                this.coins.push(coin);
            }
        }

        isCollideOtherBlock(checkBlock) {
            const length = this.blocks.length;
            for (let i = 0; i < length; i++) {
                const block = this.blocks[i];

                if (
                    checkBlock.isCollideBlock(
                        block.x,
                        block.y,
                        block.w,
                        block.h
                    )
                ) {
                    return true;
                }
            }
            return false;
        }

        checkInBound(block) {
            if (
                block.x >= 0 &&
                block.y >= 0 &&
                block.x + block.w <= canvas.width &&
                block.y + block.h <= canvas.height
            ) {
                return true;
            } else {
                return false;
            }
        }

        generateBlock() {
            // 10.	Game has a random four footholds.
            while (this.blocks.length != HOW_MANY_BLOCK) {
                const newBlock = new Block();
                if (
                    this.checkInBound(newBlock) &&
                    !this.isCollideOtherBlock(newBlock)
                ) {
                    this.blocks.push(newBlock);
                }
            }
        }
        renderCoin() {
            for (let i = 0; i < 3; i++) {
                this.checkCollideCoin(this.coins[i], i, player);
                this.coins[i].render();
            }
        }
        render() {
            this.renderCoin();
            for (let i = 0; i < HOW_MANY_BLOCK; i++) {
                this.blocks[i].render();
            }
        }
    }

    //14.	To move the character, player can use “WAD” and Space keys with the following :
    document.onkeydown = (e) => {
        keys[e.key] = true;
    };

    document.onkeyup = (e) => {
        keys[e.key] = false;
    };
    function checkKeys() {
        if (keys["a"]) {
            player.move("left", player.velocityX - player.speedX);
        } else if (keys["d"]) {
            player.move("right", player.velocityX + player.speedX);
        } else {
            player.velocityX = 0;
        }
    }
    document.onkeydown = (e) => {
        keys[e.key] = true;
        switch (e.key) {
            case "w":
                if (
                    player.isCollideBlock(
                        player.x + this.w / 2,
                        player.y + player.velocityY + this.h,
                        blocks
                    ) ||
                    player.jump < player.maxJump
                ) {
                    player.jump++;
                    player.move("up", player.velocityY - 15);
                }
                break;
            // case "a":
            //   player.move("left", player.velocityX - 2);
            //   break;
            case "s":
                player.move("down", player.velocityY + 1);
                break;
            // case "d":
            //   player.move("right", player.velocityX + 2);
            //   break;
        }
    };

    document.onkeyup = (e) => {
        keys[e.key] = false;
        switch (e.key) {
            case "w":
                player.move("up", 0);
                break;
            case "d":
                player.move("right", 0);
                break;
        }
    };

    class Block {
        constructor() {
            this.middle = this.getMiddle();
            this.y = this.getY();
            this.x = this.getX();
            this.sprite = getFootUrl();
            this.setImage(this.sprite);
            this.config = getStageConf();
            this.h = this.config.tileH;
            this.w = this.config.tileW * (2 + this.middle);
        }

        isCollideBlock(x, y, w, h) {
            const thisH = this.h + BLOCK_GENERATE_OFFSET_Y;

            if (
                this.y + thisH >= y &&
                this.y <= y + h &&
                this.x + this.w >= x &&
                this.x <= x + w
            ) {
                return true;
            }
            return false;
        }

        setImage(sprite) {
            this.leftSprite = new Image();
            this.leftSprite.src = sprite[0];

            this.middleSprite = new Image();
            this.middleSprite.src = sprite[1];

            this.rightSprite = new Image();
            this.rightSprite.src = sprite[2];
        }

        getY() {
            const height = canvas.height;
            let randomMin = height / 2;
            let randomMax = canvas.height;
            return random(randomMin, randomMax);
        }

        getX() {
            return random(0 + OFFSET_RANDOM, canvas.width + OFFSET_RANDOM);
        }

        getMiddle() {
            return random(MIN_MIDDLE, MAX_MIDDLE);
        }
        render() {
            let dx = this.x;
            let dy = this.y;
            drawSprite(this.leftSprite, dx, dy);
            dx += this.leftSprite.width;
            for (let i = 0; i < this.middle; i++) {
                drawSprite(this.middleSprite, dx, dy);
                dx += this.middleSprite.width;
            }
            drawSprite(this.rightSprite, dx, dy);
            dx += this.rightSprite.width;
        }
    }
    function renderCrosshair(x, y, w = 20, h = 20, color = "white") {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }

    function drawSprite(img, x, y) {
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            x,
            y,
            img.width,
            img.height
        );
    }

    class Bullet {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.w = 3;
            this.h = 50;
            this.color = "orange";
            this.bulletSpeed = 20;
            this.death = false;
            gunMusic.currentTime = 0;
            gunMusic.play();
        }

        checkMeteorCollide(x, y) {
            const len = meteors.length;
            for (let i = 0; i < len; i++) {
                const meteor = meteors[i];
                if (meteor) {
                    if (
                        meteor.y <= y &&
                        y <= meteor.y + meteor.h &&
                        meteor.x + meteor.w >= x &&
                        meteor.x <= x
                    ) {
                        this.death = true;
                        if (meteors[i]) {
                            meteors.splice(i, 1);
                            const explode = new Explosion(x, y);
                            explodes.push(explode);
                        }
                    }
                }
            }
        }

        shoot() {
            if (this.death) return;

            this.checkMeteorCollide(this.x, this.y - this.bulletSpeed);
            this.y -= this.bulletSpeed;
            this.render();
        }

        render() {
            ctx.fillStyle = this.color;
            ctx.fillRect(
                this.x - this.w / 2,
                this.y - this.h / 2,
                this.w,
                this.h
            );
        }
    }

    class Pet {
        constructor(x, y) {
            this.scale = 0.1;
            this.x = x;
            this.y = y;
            this.sprite = letGetPetFlying();
            this.totalSprite = PET_CONFIG.totalSprite;
            this.w = PET_CONFIG.w * this.scale;
            this.h = PET_CONFIG.h * this.scale;
            this.state = 0;
            this.countSpriteSpeed = 0;
            this.bullets = [];
        }

        shoot() {
            if (this.bullets.length == 1) {
                return;
            }
            const newBullet = new Bullet(
                this.x + this.w / 2,
                this.y + this.h / 2
            );
            this.bullets.push(newBullet);
        }

        renderBullet() {
            const len = this.bullets.length;
            for (let i = 0; i < len; i++) {
                if (this.bullets[i]) {
                    const y = this.bullets[i].y + this.bullets[i].h;
                    if (y <= 0) {
                        if (this.bullets[i]) {
                            this.bullets.splice(i, 1);
                        }
                    }
                }

                if (this.bullets[i]) {
                    this.bullets[i].shoot();
                }
                if (this.bullets[i] && this.bullets[i].death) {
                    this.bullets.splice(i, 1);
                }
            }
        }

        getState() {
            if (this.countSpriteSpeed < 3) {
                this.countSpriteSpeed += 1;
                return this.state % this.totalSprite;
            }
            this.countSpriteSpeed = 0;

            this.state += 1;
            return this.state % this.totalSprite;
        }

        going(x, y, backward, death) {
            if (death) return;

            this.x = x;
            this.y = y;

            this.render(backward);
        }

        render(backward) {
            this.renderBullet();
            const dx = this.x;
            const dy = this.y;
            if (backward) {
                ctx.save();
                ctx.scale(-1, 1);
                ctx.drawImage(
                    this.sprite[this.getState()],
                    0,
                    0,
                    PET_CONFIG.w,
                    PET_CONFIG.h,
                    -dx,
                    dy,
                    -this.w,
                    this.h
                );
                ctx.restore();
            } else {
                ctx.drawImage(
                    this.sprite[this.getState()],
                    0,
                    0,
                    PET_CONFIG.w,
                    PET_CONFIG.h,
                    dx,
                    dy,
                    this.w,
                    this.h
                );
            }
        }
    }
    class Explosion {
        constructor(x, y) {
            this.scale = 2;

            this.sprite = letGetExplosion();
            this.config = EXPLOSION_CONF;
            this.w = this.config.w * this.scale;
            this.h = this.config.h * this.scale;
            this.currState = 0;
            this.countSpriteSpeed = 0;
            this.spriteLength = this.config.total;
            this.dead = false;

            this.x = x - this.w / 2;
            this.y = y - this.h / 2;
        }

        getState() {
            if (this.countSpriteSpeed < 3) {
                this.countSpriteSpeed += 1;
                return this.currState % this.spriteLength;
            }
            this.countSpriteSpeed = 0;

            this.currState += 1;
            return this.currState % this.spriteLength;
        }

        explode() {
            if (this.currState + 1 == this.spriteLength) {
                this.death = true;
            }
            this.currState = this.getState();
            this.render();
        }

        render() {
            if (!this.death) {
                ctx.drawImage(
                    this.sprite,
                    this.currState * this.w,
                    0,
                    this.config.w,
                    this.config.h,
                    this.x,
                    this.y,
                    this.w,
                    this.h
                );
            }
        }
    }

    class Player {
        constructor(block) {
            this.lifeTime = INITIAL_LIFE_TIME;
            this.healthSprite = new Image();
            this.healthSprite.src = HEARTH_URL;
            this.healthScale = 0.3;
            this.health = STARTING_HEALTH;
            this.scale = 0.2;
            this.sprite = letGetHeroIdle();
            this.spriteLength = this.sprite.length;
            this.currState = 0;
            this.wAndH = getHeroWidthHeight();
            this.w = this.wAndH[0] * this.scale;
            this.h = this.wAndH[1] * this.scale;
            this.x = block.x;
            this.y = block.y - this.h;
            this.velocityY = 0;
            this.velocityX = 0;
            this.speed = 5;
            this.backward = false;
            this.speedX = 0.1;
            this.death = false;
            this.maxJump = MAX_PLAYER_JUMP;
            this.jump = 0;
            this.isAnimationCollide = false;
            this.countSpriteSpeed = 0;
        }

        collideAnimation() {
            // 23.	Characters will have animation effects when hit by meteors, boxes and coins.

            this.isAnimationCollide = true;
            this.setSprite("dead");
            setTimeout(() => {
                this.isAnimationCollide = false;
            }, 3000);
        }

        gameOver() {
            music.pause();
            deathMusic.play();
            this.death = true;
            this.velocityX = 0;
            this.velocityY = 0;
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            GRAVITY = 0;
            writeInTheMiddle("3");
            this.setSprite("dead");

            setTimeout(() => {
                this.x = -999;
                this.y = -999;
                setTimeout(() => {
                    clearFlag = true;
                    // 28.	Show popup after game over to display the player username, life time, score, save high score button and restart button.
                    showLast(this.lifeTime, score);
                }, 1000);
            }, 2000);
        }

        increaseLifetime(n) {
            this.lifeTime += n;
        }

        decreaseLifetime(n) {
            this.lifeTime -= n;
            if (this.lifeTime == 0) {
                this.gameOver();
            }
        }

        addHealth(n) {
            // 18.	The player max get 5 hearts.
            if (this.health === 5) {
                return;
            } else {
                this.health += n;
            }
        }

        minHealth(n) {
            hurtMusic.play();
            this.health -= n;
            if (this.health === 0) {
                this.gameOver();
            }
        }

        move(str, velocity) {
            if (this.death) return;
            if (str == "up") {
                if (
                    this.isCollideBlock(
                        this.x + this.w / 2,
                        this.y + velocity,
                        blocks
                    )
                ) {
                    return false;
                }
                this.velocityY = velocity;
            }
            if (str == "left") {
                this.backward = true;
                // renderCrosshair(this.x + velocity, this.y + PLAYER_OFFSET_MID);
                if (
                    this.isCollideBlock(
                        this.x + velocity,
                        this.y + PLAYER_OFFSET_MID,
                        blocks
                    )
                ) {
                    return false;
                }

                this.velocityX = velocity;
            }
            if (str == "down") {
                this.velocityY = velocity;
            }
            if (str == "right") {
                this.backward = false;
                // renderCrosshair(
                //     this.x + this.w + velocity,
                //     this.y + PLAYER_OFFSET_MID
                // );
                if (
                    this.isCollideBlock(
                        this.x + this.w + velocity,
                        this.y + PLAYER_OFFSET_MID,
                        blocks
                    )
                ) {
                    return false;
                }

                this.velocityX = velocity;
            }
        }

        setSprite(str) {
            // 16.	The character will have a different pose when moving right, left and jumping using the provided character sprites image.
            switch (str) {
                case "idle":
                    this.sprite = letGetHeroIdle();
                    this.spriteLength = this.sprite.length;
                    break;
                case "running":
                    // 17.	Running animation when the player is moving.
                    const sprite = letGetHeroRunning();
                    this.sprite = sprite;
                    this.spriteLength = sprite.length;
                    break;
                case "dead":
                    this.sprite = letGetHeroDeath();
                    this.spriteLength = this.sprite.length;
                    break;
                case "jump":
                    this.sprite = letGetHeroJumping();
                    this.spriteLength = this.sprite.length;
                    break;
            }
        }

        getState() {
            if (this.countSpriteSpeed < 3) {
                this.countSpriteSpeed += 1;
                return this.currState % this.spriteLength;
            }
            this.countSpriteSpeed = 0;

            this.currState += 1;
            return this.currState % this.spriteLength;
        }

        isDeathCanvas(x, y) {
            if (canvas.height <= y) {
                // 24.	When the character falls off the footing and touches the border, the character will return to the middle game board and display a death pose then disappear.
                return true;
            } else {
                return false;
            }
        }

        isCollideBlock(x, y, allBlock) {
            for (let i = 0; i < HOW_MANY_BLOCK; i++) {
                const block = allBlock.blocks[i];

                // renderCrosshair(block.x, block.y);

                let collideFirstPrinciple = block.y <= y;
                let collideSecondPrinciple = y <= block.y + block.h;
                let collideThirdPrinciple = block.x + block.w >= x;
                let collideFourthPrinciple = block.x <= x;

                if (
                    collideFirstPrinciple &&
                    collideThirdPrinciple &&
                    collideFourthPrinciple &&
                    collideSecondPrinciple
                ) {
                    this.jump = 0;
                    return true;
                }
            }
            return false;
        }

        logic() {
            if (this.velocityX >= this.speed) this.velocityX = this.speed;
            if (this.velocityX <= -this.speed) this.velocityX = -this.speed;

            if (this.velocityX != 0) {
                if (!this.death && !this.isAnimationCollide) {
                    this.setSprite("running");
                }
            } else {
                if (!this.death && !this.isAnimationCollide) {
                    this.setSprite("idle");
                }
            }

            this.x += this.velocityX;

            this.y += this.velocityY;
            if (this.isDeathCanvas(this.x, this.y)) {
                this.gameOver();
            }

            if (
                this.isCollideBlock(
                    this.x + this.w / 2,
                    this.y + this.h + this.velocityY,
                    blocks
                )
            ) {
                this.velocityY = 0;
            } else {
                if (!this.isAnimationCollide) this.setSprite("jump");
                this.velocityY += GRAVITY;
            }
        }

        renderHearth() {
            for (let i = 0; i < this.health; i++) {
                ctx.drawImage(
                    this.healthSprite,
                    0,
                    0,
                    HEARTH_CONFIG.w,
                    HEARTH_CONFIG.h,
                    i * (HEARTH_CONFIG.w * this.healthScale),
                    0,
                    HEARTH_CONFIG.w * this.healthScale,
                    HEARTH_CONFIG.h * this.healthScale
                );
            }
        }

        renderText() {
            ctx.font = "48px serif";
            ctx.fillStyle = "white";
            ctx.fillText(USERNAME, this.x + 10, this.y - 10);
        }

        render() {
            this.renderText();
            this.logic();

            const state = this.getState();
            const dw = this.sprite[state].width * this.scale;
            const dh = this.sprite[state].height * this.scale;

            const dx = this.x;
            const dy = this.y;

            if (this.backward) {
                // ctx.strokeStyle = "red";
                // ctx.strokeRect(dx, dy, dw, dh);
                ctx.save();
                ctx.scale(-1, 1);
                ctx.drawImage(
                    this.sprite[state],
                    0,
                    0,
                    this.sprite[state].width,
                    this.sprite[state].height,
                    -dx,
                    dy,
                    -dw,
                    dh
                );
                ctx.restore();
            } else {
                ctx.drawImage(
                    this.sprite[state],
                    0,
                    0,
                    this.sprite[state].width,
                    this.sprite[state].height,
                    dx,
                    dy,
                    dw,
                    dh
                );
            }

            this.renderHearth();
        }
    }

    class Element {
        constructor(x, y) {
            this.item = random(0, 3);
            this.x = x;
            this.y = y;
            this.timeout = false;
            this.timeoutElement = 10;
            this.sprite = new Image();
            this.sprite.src = ELEMENT_URL[this.item];
            this.w = ELEMENT_CONF[this.item].w;
            this.h = ELEMENT_CONF[this.item].h;
            setTimeout(() => {
                this.timeout = true;
            }, 10000);
        }

        render() {
            ctx.drawImage(
                this.sprite,
                0,
                0,
                this.w,
                this.h,
                this.x,
                this.y,
                this.w,
                this.h
            );
        }
    }

    class Background {
        constructor() {
            this.spriteUrl = getBgUrl();
            this.sprite = new Image();
            this.sprite.src = this.spriteUrl;
        }

        render() {
            const w = this.sprite.width;
            const h = this.sprite.height;
            ctx.drawImage(
                this.sprite,
                0,
                0,
                w,
                h,
                0,
                0,
                canvas.width,
                canvas.height
            );
        }
    }

    // Set Interval
    setInterval(() => {
        if (!pause && !player.death) {
            // 9.	Life time will count down.
            player.decreaseLifetime(1);
        }
    }, 1000);

    setInterval(() => {
        if (!pause) {
            // 12.	Meteor should show random every 0,5 second.
            for (let i = 0; i < METEOR_MULTIPLIER; i++) {
                const newMeteor = new Meteor();
                meteors.push(newMeteor);
            }
        }
    }, METEOR_TIME_SPAWN * 1000);

    setInterval(() => {
        if (!pause) {
            // 13.	Drops one of these four boxes randomly every 2 seconds.
            const x = random(0, canvas.width);
            const y = random(0, canvas.height);
            const newElement = new Element(x, y);
            elements.push(newElement);
        }
    }, ELEMENT_TIME_SPAWN * 1000);

    // Event Listener

    function getCursorPosition(event) {
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) * canvasScaleX;
        const y = (event.clientY - rect.top) * canvasScaleY;
        xClick = x;
        yClick = y;
        return { x: x, y: y };
    }

    function checkMeteor({ x, y }) {
        const lenMeteor = meteors.length;
        for (let i = 0; i < lenMeteor; i++) {
            const meteor = meteors[i];
            if (meteor) {
                if (
                    meteor.y <= y &&
                    y <= meteor.y + meteor.h &&
                    meteor.x + meteor.w >= x &&
                    meteor.x <= x
                ) {
                    if (meteors[i]) {
                        meteors.splice(i, 1);
                        const explode = new Explosion(x, y);
                        explodes.push(explode);
                    }
                }
            }
        }
    }

    window.addEventListener("mousedown", (e) => {
        let pos = getCursorPosition(e);

        checkMeteor(pos);
    });

    window.addEventListener("keypress", (e) => {
        if (e.key == " ") {
            if (pet) {
                pet.shoot();
            }
        }

        if (e.key === "p" || e.key === "Escape") {
            // 25.	Player can pause the game.
            // 26.	Press Esc to open the pause popup. The game should be in paused state when opening the popup.
            // 27.	Press Esc again to continue or click the continue button.
            if (pause) {
                pause = false;
                pauseRef.style.display = "none";
            } else {
                pauseRef.style.display = "block";
                pause = true;
            }
        }
    });

    pauseRef.addEventListener("click", () => {
        pause = false;
        pauseRef.style.display = "none";
    });

    function meteorsAlreadyOut(meteor) {
        if (meteor.alreadyHit) {
            return true;
        }
        if (meteor.y >= canvas.height) {
            return true;
        }
        return false;
    }

    function elementRender() {
        const len = elements.length;
        if (len === 0) return;
        for (let i = 0; i < len; i++) {
            if (elements[i]) {
                checkCollideElementPlayer(elements[i], i, player);
                if (elements[i] && elements[i].timeout === true) {
                    elements.splice(i, 1);
                    return;
                } else {
                    if (elements[i]) elements[i].render();
                }
            }
        }
    }

    function meteorsRender() {
        const len = meteors.length;
        if (len === 0) return;
        for (let i = 0; i < len; i++) {
            if (meteors[i]) {
                meteors[i].move();
                if (meteorsAlreadyOut(meteors[i])) {
                    // 22.	The meteor, box and coin will be vanished when player hit at the right timing or it passed the border without hit.
                    meteors.splice(i, 1);
                }
            }
        }
    }

    function writeInTheMiddle(txt) {
        writeInTheMiddleRef.innerHTML = txt;
    }

    const blocks = new AllBlock();
    const player = new Player(blocks.blocks[0]);
    const pet = new Pet(player.x + player.w, player.y);
    const background = new Background();

    function showLifetime(player) {
        lifeTimeRef.innerHTML =
            "Lifetime " + player.lifeTime + " <b>| Selekdash</b>";
    }

    function explodeRender() {
        const len = explodes.length;
        for (let i = 0; i < len; i++) {
            const explode = explodes[i];
            if (explode) {
                explode.explode();
                if (explode.death && explodes[i]) explodes.splice(i, 1);
            }
        }
    }

    animate();

    function animate() {
        if (clearFlag) return;
        requestAnimationFrame(animate);
        if (!pause) {
            checkKeys();

            if (isRun()) {
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                showLifetime(player);
                background.render();
                player.render();
                pet.going(
                    player.x + player.w,
                    player.y,
                    player.backward,
                    player.death
                );

                if (!player.death) {
                    blocks.render();
                    meteorsRender();
                    elementRender();
                    explodeRender();
                }

                if (firstFlag) {
                    first();
                }
            }
        }
    }
}
