﻿/// <reference path="../constants.ts" />
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
    //start state
    export class Start {
        // INSTANCE VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++
        public game: createjs.Container;
        public background: objects.Background;
        public playButton: objects.Button;
        public howtoButton: objects.Button;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            // Add ocean to game
            this.background = new objects.Background();
            this.game.addChild(this.background);

            var mailPilotLabel: objects.Label = new objects.Label("METROID FLYER", constants.SCREEN_CENTER_WIDTH, 100);
            mailPilotLabel.font = "80px Consolas";
            mailPilotLabel.regX = mailPilotLabel.getMeasuredWidth() * 0.5;
            mailPilotLabel.regY = mailPilotLabel.getMeasuredHeight() * 0.5;
            this.game.addChild(mailPilotLabel);

            this.playButton = new objects.Button("playButton", constants.SCREEN_CENTER_WIDTH, 400);
            this.game.addChild(this.playButton);
            this.playButton.on("click", this.playButtonClicked, this);

            this.howtoButton = new objects.Button("howtoButton", constants.SCREEN_CENTER_WIDTH, 300);
            this.game.addChild(this.howtoButton);
            this.howtoButton.on("click", this.howtoButtonClicked, this);

            stage.addChild(this.game);
        } // constructor end


        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++
        playButtonClicked() {
            this.game.removeAllChildren();
            stage.removeChild(this.game);
            currentState = constants.PLAY_STATE;
            stateChanged = true;
        }

        howtoButtonClicked() {
            this.game.removeAllChildren();
            stage.removeChild(this.game);
            currentState = constants.HOW_TO_STATE;
            stateChanged = true;
        }

        // UPDATE METHOD
        public update() {

            this.background.update();

        } // update method end

    }
}