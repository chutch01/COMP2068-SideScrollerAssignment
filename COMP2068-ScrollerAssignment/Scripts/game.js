/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="constants.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/samus.ts" />
/// <reference path="objects/ball.ts" />
/// <reference path="objects/enemy.ts" />
/// <reference path="objects/background.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/button.ts" />
/// <reference path="objects/scoreboard.ts" />
/// <reference path="states/gameover.ts" />
/// <reference path="states/play.ts" />
/// <reference path="states/start.ts" />
//game variables
var stats = new Stats();
var canvas;
var stage;
var assetLoader;
// Score Variables
var finalScore = 0;
var score = 0;
//game objects
//var gameOver: states.GameOver;
var play;
var menu;
var gameOver;
var howto;
//game state variables
var currentState;
var currentStateFunction;
var stateChanged = false;
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
    currentState = constants.PLAY_STATE;
    changeState(currentState);
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
//reference for the on click attached to the background. setting the "on click" directly to samus.shoot causes an error
function gameLoop() {
    stats.begin(); // Begin metering
    //currentStateFunction.update();
    if (stateChanged) {
        changeState(currentState);
    }
    stage.update(); // Refreshes our stage
    stats.end(); // End metering
}
function changeState(state) {
    stateChanged = false;
    switch (state) {
        case constants.START_STATE:
            // Instantiate Menu State
            menu = new states.Start();
            currentStateFunction = menu;
            break;
        case constants.PLAY_STATE:
            // Instantiate Play State
            play = new states.Play();
            currentStateFunction = play;
            break;
        case constants.GAME_OVER_STATE:
            // Instantiate Game Over State
            gameOver = new states.GameOver();
            currentStateFunction = gameOver;
            break;
        case constants.HOW_TO_STATE:
            howto = new states.howto();
            currentStateFunction = howto;
            break;
    }
}
//# sourceMappingURL=game.js.map