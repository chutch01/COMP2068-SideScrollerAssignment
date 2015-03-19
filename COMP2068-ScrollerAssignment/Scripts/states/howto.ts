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

    export class HowTo {
        // INSTANCE VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++
        public game: createjs.Container;
        public background: objects.Background;
        public playButton: objects.Button;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            // Add ocean to game
            this.background = new objects.Background();
            this.game.addChild(this.background);

            var howto: objects.Label = new objects.Label("DODGE THE ENEMIES AND COLLECT THE BALLS", constants.SCREEN_CENTER_WIDTH, 100);
            howto.font = "80px Consolas";
            howto.regX = howto.getMeasuredWidth() * 0.5;
            howto.regY = howto.getMeasuredHeight() * 0.5;
            this.game.addChild(howto);

            this.playButton = new objects.Button("playButton", constants.SCREEN_CENTER_WIDTH, 400);
            this.game.addChild(this.playButton);
            this.playButton.on("click", this.playButtonClicked, this);


            stage.addChild(this.game);
        } // constructor end


        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++
        playButtonClicked() {
            this.game.removeAllChildren();
            stage.removeChild(this.game);
            currentState = constants.PLAY_STATE;
            stateChanged = true;
        }

        // UPDATE METHOD
        public update() {

            this.background.update();

        } // update method end

    }
}