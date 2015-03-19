/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="objects/samus.ts" />
/// <reference path="objects/laser.ts" />
/// <reference path="objects/ball.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/background.ts" />
/// <reference path="typings/stats/stats.d.ts" />
var stats = new Stats();
var canvas;
var stage;
var assetLoader;
//interactionable objects
var startBackground;
var gameoverBackground;
var howtoButton;
var howtoScreen;
var playButton;
var startScreen;
//game objects
var samus;
var ball;
var background;
var enemy = [];
var lasers = [];
var scoreboard;
//game state
var currentState;
var currentStateFunction;
var stateChanged = false;
//game text
var lifeTextBox;
var scoreTextBox;
//game variables
var totalLasers = 0;
var score = 0;
var startButton;
var instructionsButton;
// asset manifest - array of asset objects
var manifest = [
    { id: "enemy", src: "assets/images/enemy.png" },
    { id: "ball", src: "assets/images/ball.png" },
    { id: "background", src: "assets/images/hallway.png" },
    { id: "samus", src: "assets/images/samus.png" },
    { id: "laser", src: "assets/images/laser.png" },
    { id: "howtoButton", src: "assets/images/howtoButton.png" },
    { id: "playButton", src: "assets/images/playButton.png" },
    { id: "gameoverScreen", src: "assets/images/gameoverScreen.png" },
    { id: "howtoScreen", src: "assets/images/howtoScreen.png" },
    { id: "startScreen", src: "assets/images/startScreen.png" },
    { id: "brinstar", src: "assets/audio/brinstar.mp3" },
    { id: "explosion", src: "assets/audio/explosion.wav" },
    { id: "randomize", src: "assets/audio/randomize.wav" },
    { id: "lasersound", src: "assets/audio/laser_sound.wav" },
    { id: "enemyexplosion", src: "assets/audio/enemy_explosion.wav" }
];
// Game Objects 
function preload() {
    assetLoader = new createjs.LoadQueue(); // instantiated assetLoader
    assetLoader.installPlugin(createjs.Sound);
    assetLoader.on("complete", init, this); // event handler-triggers when loading done
    assetLoader.loadManifest(manifest); // loading my asset manifest
}
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    setupStats();
    createjs.Sound.play("brinstar", { loop: -1 });
}
//Utility methods++++++++++++++++++++++++++++++++++++++++++++
function setupStats() {
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '650px';
    stats.domElement.style.top = '440px';
    document.body.appendChild(stats.domElement);
}
//calculate distance between two points
function distance(p1, p2) {
    return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
}
function checkCollision(collider1, hit1, collider2, hit2) {
    var p1 = new createjs.Point();
    var p2 = new createjs.Point();
    p1.x = collider1.x;
    p1.y = collider1.y;
    p2.x = collider2.x;
    p2.y = collider2.y;
    if (distance(p2, p1) < ((collider1.height * 0.5) + (collider2.height * 0.5))) {
        if (!collider2.isColliding && !collider1.isColliding) {
            createjs.Sound.play(collider2.soundString);
            collider2.isColliding = true;
            collider1.isColliding = true;
            if (hit1) {
                collider1.hit();
            }
            if (hit2) {
                collider2.hit();
            }
        }
    }
    else {
        collider2.isColliding = false;
        collider1.isColliding = false;
    }
}
//reference for the on click attached to the background. setting the "on click" directly to samus.shoot causes an error
function fire() {
    samus.shoot();
}
function gameLoop() {
    stats.begin(); //begin metering
    currentStateFunction.update();
    stage.update(); // Refreshes our stage
    background.update();
    samus.update();
    ball.update();
    checkCollision(samus, false, ball, true);
    for (var laser = totalLasers - 1; laser >= 0; laser--) {
        lasers[laser].update();
    }
    for (var cloud = 10; cloud > 0; cloud--) {
        enemy[cloud].update();
        checkCollision(samus, true, enemy[cloud], true);
        for (var laser = totalLasers - 1; laser >= 0; laser--) {
            checkCollision(enemy[cloud], true, lasers[laser], true);
        }
    }
    lifeTextBox.text = samus.lifePoints.toString();
    scoreTextBox.text = score.toString();
    stats.end();
}
function createUI() {
    //life text box
    lifeTextBox = new createjs.Text(samus.lifePoints.toString(), "20px Impact", "#FFFF00");
    lifeTextBox.x = 0;
    lifeTextBox.y = 0;
    stage.addChild(lifeTextBox);
    //score text box
    scoreTextBox = new createjs.Text(score.toString(), "20px Impact", "#FFFF00");
    scoreTextBox.x = 300;
    scoreTextBox.y = 0;
    stage.addChild(scoreTextBox);
}
function changeState(state) {
    stateChanged = false;
    switch (state) {
        case constants.START_STATE:
            // instantiate menu screen
            currentStateFunction = states.startState;
            states.start();
            break;
        case constants.PLAY_STATE:
            // instantiate play screen
            currentStateFunction = states.playState;
            states.play();
            break;
        case constants.GAME_OVER_STATE:
            currentStateFunction = states.gameOverState;
            states.gameOver();
            break;
        case constants.HOW_TO_STATE:
            currentStateFunction = states.howtoState;
            states.howto();
            break;
    }
}
// Our Game Kicks off in here
function main() {
    //add background to game
    background = new objects.Background();
    stage.addChild(background);
    background.addEventListener("click", fire);
    //add island to game
    ball = new objects.Ball();
    stage.addChild(ball);
    //add place to game
    samus = new objects.Samus();
    stage.addChild(samus);
    for (var cloud = 10; cloud > 0; cloud--) {
        enemy[cloud] = new objects.Enemy();
        stage.addChild(enemy[cloud]);
    }
    for (var laser = totalLasers - 1; laser >= 0; laser--) {
        lasers[laser] = new objects.Laser(samus.x, samus.y);
        stage.addChild(lasers[laser]);
    }
    createUI();
    setupStats();
}
//# sourceMappingURL=game.js.map