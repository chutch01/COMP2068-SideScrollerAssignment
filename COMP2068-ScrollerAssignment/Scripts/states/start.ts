module states {
    export function startState() {

        background.update();
    }



    export function start() {
        stage.removeAllChildren();
        stage.removeAllEventListeners();

        //add the start screen to the game
        startScreen = new objects.Background();
        stage.addChild(background);

        startScreen = new createjs.Bitmap("assets/images/startScreen.png");
        stage.addChild(startScreen);

        //add a play button to the start screen
        playButton = new createjs.Bitmap("assets/images/playButton.png");
        playButton.x = 300;
        playButton.y = 300;
        stage.addChild(playButton);

        playButton.addEventListener("click", play)
        playButton.addEventListener("mouseover", playButtonOver)
        playButton.addEventListener("mouseout", playButtonOut)


        //add howTo button to the start screen
        howtoButton = new createjs.Bitmap("assets/images/howtoButton.png");
        howtoButton.addEventListener("click", howto)
        howtoButton.addEventListener("mouseover", playButtonOver)
        howtoButton.addEventListener("mouseout", playButtonOut)

    }



    //button functions+++++++++++++++
    export function playButtonOver() {
        playButton.alpha = 0.4;
        console.log("mouse over play");
    }
    export function playButtonOut() {
        playButton.alpha = 1.0;
        console.log("mouse out play");
    }

    export function play() {
        currentState = constants.PLAY_STATE;
        changeState(currentState);
    }
    export function howtoButtonOver() {
        howtoButton.alpha = 0.4;
        console.log("mouse over howto");
    }
    export function howtoButtonOut() {
        howtoButton.alpha = 1.0;
        console.log("mouse out howto");
    }
    export function howto() {
        currentState = constants.HOW_TO_STATE;
        changeState(currentState);
    }
}