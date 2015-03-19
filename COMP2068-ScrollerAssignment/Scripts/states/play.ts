/// <reference path="../constants.ts" />
/// <reference path="../objects/samus.ts" />
/// <reference path="../objects/laser.ts" />
/// <reference path="../objects/ball.ts" />
/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/background.ts" />
/// <reference path="../objects/enemy.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/button.ts" />


module states {
    //play state
    export class Play {

        //game variables
        public game: createjs.Container;
        public samus: objects.Samus;
        public ball: objects.Ball;
        public background: objects.Background;
        public enemy: objects.Enemy[] = [];
       
        public scoreboard: objects.ScoreBoard;
        public totalLasers;

        constructor() {

            //instantiate game container
            this.game = new createjs.Container();

            //add background to game
            this.background = new objects.Background();
            this.game.addChild(this.background);
            this.background.addEventListener("click", fire);
            //add ball to game
            this.ball = new objects.Ball();
            this.game.addChild(this.ball);

            //add samus to game
            this.samus = new objects.Samus();
            this.game.addChild(this.samus);

            //add enemy to game
            for (var cloud = constants.ENEMY_NUM; cloud > 0; cloud--) {
                this.enemy[cloud] = new objects.Enemy();
                this.game.addChild(this.enemy[cloud]);
            }
            //add laser to game
            for (var laser = this.samus.totalLasers - 1; laser >= 0; laser--) {
                this.samus.lasers[laser] = new this.samus.totalLasers(this.samus.x, this.samus.y);
                this.game.addChild(this.samus.lasers[laser]);


                this.scoreboard = new objects.ScoreBoard(this.game);

                function fire() {
                    this.samus.shoot();
                }

            }   this.game.addChild(this.game);
            }//constructor end
            //public methods+++++++++++++++++++++++
            public distance(p1: createjs.Point, p2: createjs.Point): number {

            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }//distance end
        //checking for collision
        checkCollision(collider1: objects.GameObject, hit1: boolean, collider2: objects.GameObject, hit2: boolean) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = collider1.x;
            p1.y = collider1.y;
            p2.x = collider2.x;
            p2.y = collider2.y;

            if (this.distance(p2, p1) < ((collider1.height * 0.5) + (collider2.height * 0.5))) {
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
            } else {
                collider2.isColliding = false;
                collider1.isColliding = false;
            }

        }//end checkCollision
        public update() {
            stats.begin();//begin metering

            currentStateFunction.update();
            stage.update(); // Refreshes our stage
            this.background.update();
            this.samus.update();
            this.ball.update();
            this.checkCollision(this.samus, false, this.ball, true);

            // console.log(totalLasers);
            for (var laser = this.samus.totalLasers - 1; laser >= 0; laser--) {
                this.samus.lasers[laser].update();
            }

            for (var cloud = constants.ENEMY_NUM; cloud > 0; cloud--) {
                this.enemy[cloud].update();
                this.checkCollision(this.samus, true, this.enemy[cloud], true);
                for (var laser = this.totalLasers - 1; laser >= 0; laser--) {
                    this.checkCollision(this.enemy[cloud], true, this.samus.lasers[laser], true);

                }
            }
            this.scoreboard.update();

            if (this.scoreboard.lives < 1) {
                createjs.Sound.stop();
                this.game.removeAllChildren();
                stage.removeAllChildren();
                finalScore = this.scoreboard.score;
                if (finalScore > score) {
                    score = finalScore;
                }
                currentState = constants.GAME_OVER_STATE;
                stateChanged = true;
            }
            stats.end();

        }
    }//update method
    }
    
    
