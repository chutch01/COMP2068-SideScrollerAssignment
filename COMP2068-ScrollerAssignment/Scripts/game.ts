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







var stats: Stats = new Stats();
var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;

//game objects
var samus: objects.Samus;
var ball: objects.Ball;
var background: objects.Background;
var enemy:  objects.Enemy[] = [];
var lasers: objects.Laser[] = [];


//game variables
var totalLasers = 0;


// asset manifest - array of asset objects
var manifest = [
    { id: "enemy", src: "assets/images/enemy.png" },
    { id: "ball", src: "assets/images/ball.png" },
    { id: "background", src: "assets/images/hallway.png" },
    { id: "samus", src: "assets/images/samus.png" },
    { id: "laser", src: "assets/images/laser.png" },
    { id: "brinstar", src: "assets/audio/brinstar.mp3" },
    { id: "explosion", src: "assets/audio/explosion.wav" },
    { id: "randomize", src: "assets/audio/randomize.wav" },
    { id: "lasersound", src: "assets/audio/laser_sound.wav"}
   

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
    createjs.Sound.play("brinstar", { loop: -1 });

    main();
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
function distance(p1: createjs.Point, p2: createjs.Point): number {

    return Math.floor(Math.sqrt(Math.pow((p2.x-p1.x),2) + Math.pow((p2.y-p1.y),2)));
}


function checkCollision(collider1: objects.GameObject, collider2: objects.GameObject) {
    var p1: createjs.Point = new createjs.Point();
    var p2: createjs.Point = new createjs.Point();
    p1.x = collider1.x;
    p1.y = collider1.y;
    p2.x = collider2.x;
    p2.y = collider2.y;

    if (distance(p2, p1) < ((collider1.height * 0.5) + (collider2.height * 0.5))) {
        if (!collider2.isColliding) {
            createjs.Sound.play(collider2.soundString);
            collider2.isColliding = true;
        }
    } else {
        collider2.isColliding = false;
    }
}
function fire() {
    samus.shoot();
}



function gameLoop() {
    stats.begin();//begin metering
    stage.update(); // Refreshes our stage
    background.update();
    samus.update();
    ball.update();
    

    for (var cloud = 10; cloud > 0; cloud--) {
        enemy[cloud].update();
        checkCollision(enemy[cloud]);
    }
    console.log(totalLasers);
    for (var laser = totalLasers - 1; laser >= 0; laser--) {
        lasers[laser].update();
        checkCollision(lasers[laser]);
    }
    checkCollision(ball);
    checkCollision(samus);
    stats.end();
    
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

    //add clouds to game
    for (var cloud = 10; cloud > 0; cloud--) {
        enemy[cloud] = new objects.Enemy();
        stage.addChild(enemy[cloud]);
    }
    //add laser to game
    for (var laser = totalLasers - 1; laser >= 0; laser--) {
        lasers[laser] = new objects.Laser(samus.x, samus.y);
        stage.addChild(lasers[laser]);
    }
    setupStats();
}