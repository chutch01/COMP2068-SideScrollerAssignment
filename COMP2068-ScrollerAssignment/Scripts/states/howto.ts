module states {

    export class howto {
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

            var mailPilotLabel: objects.Label = new objects.Label("MAIL PILOT", constants.SCREEN_CENTER_WIDTH, 100);
            mailPilotLabel.font = "80px Consolas";
            mailPilotLabel.regX = mailPilotLabel.getMeasuredWidth() * 0.5;
            mailPilotLabel.regY = mailPilotLabel.getMeasuredHeight() * 0.5;
            this.game.addChild(mailPilotLabel);

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