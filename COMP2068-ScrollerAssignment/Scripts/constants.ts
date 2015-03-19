module constants {
    // State Constants
    export var START_STATE: number = 0;
    export var PLAY_STATE: number = 1;
    export var GAME_OVER_STATE: number = 2;
    export var HOW_TO_STATE: number = 3;

    //font constants
    export var FONT_SIZE: string = "40px";
    export var FONT_FAMILY: string = "Consolas";
    export var FONT_COLOUR: string = "#FFFF00";
    //stage constants
    export var SCREEN_WIDTH: number = 640;
    export var SCREEN_HEIGHT: number = 480;
    export var SCREEN_CENTER_WIDTH: number = SCREEN_WIDTH * 0.5;
    export var SCREEN_CENTER_HEIGHT: number = SCREEN_HEIGHT * 0.5;
    export var OCEAN_RESET_HEIGHT: number = 960;
    //game constants
    export var PLAYER_LIVES: number = 5;
    export var ENEMY_NUM: number = 10;
}